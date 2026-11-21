#!/usr/bin/env node
/**
 * ZeroDrift Studio Local HTTP + SSE Server (Zero-Dependency Node.js 18+ ESM)
 * Serves the interactive Mission Control Web App on 127.0.0.1 with auto-port selection,
 * live SSE file watching, two-way Q&A Inbox/Outbox APIs, and live LOCKED-RULES.md updates.
 */

import http from 'node:http';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStudioData, scanWorkspaceTree, resolveStudioAssetDir } from './build-studio.mjs';
import { listCheckpoints, buildRollbackPlan } from './checkpoint.mjs';
import { generateHandoff } from './handoff.mjs';
import { buildCodeMap } from './code-map.mjs';

const __filename = fileURLToPath(import.meta.url);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const MAX_BODY_BYTES = 256 * 1024;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('Request body exceeds 256KB limit'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8').trim();
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

async function appendLockedRule(projectDir, category, ruleText, source = 'ZeroDrift Studio') {
  const rulesPath = path.join(projectDir, '.zerodrift', 'memory', 'LOCKED-RULES.md');
  await fs.mkdir(path.dirname(rulesPath), { recursive: true });
  let content = '';
  try {
    content = await fs.readFile(rulesPath, 'utf8');
  } catch {
    content = `# Locked Project Rules (Anti-Forgetting Guard)\n\n## Active Rules\n\n| Rule ID | Category | Imperative Rule | Source / Added On | Status |\n| :--- | :--- | :--- | :--- | :---: |\n`;
  }

  const matches = [...content.matchAll(/RULE-(\d{3,})/g)].map((m) => Number(m[1]));
  const nextNum = matches.length ? Math.max(...matches) + 1 : 1;
  const ruleId = `RULE-${String(nextNum).padStart(3, '0')}`;
  const today = new Date().toISOString().slice(0, 10);
  const safeCategory = String(category || 'General').replace(/\|/g, '/').trim();
  const safeRule = String(ruleText).replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();
  const newRow = `| \`${ruleId}\` | ${safeCategory} | ${safeRule} | ${source} (\`${today}\`) | \`ACTIVE\` |`;

  const revokedIdx = content.indexOf('## Revoked / Amended Rules Log');
  let updated;
  if (revokedIdx !== -1) {
    const before = content.slice(0, revokedIdx).replace(/\s*---\s*$/, '').trimEnd();
    const after = content.slice(revokedIdx);
    updated = `${before}\n${newRow}\n\n---\n\n${after}`;
  } else {
    updated = `${content.trimEnd()}\n${newRow}\n`;
  }

  await fs.writeFile(rulesPath, updated, 'utf8');
  return { ruleId, category: safeCategory, rule: safeRule, addedAt: today };
}

async function saveStudioResponse(projectDir, body) {
  const zdDir = path.join(projectDir, '.zerodrift');
  await fs.mkdir(zdDir, { recursive: true });

  const batchId = String(body.batchId || '').trim();
  if (!batchId) {
    throw new Error('batchId is required');
  }
  const answers = body.answers && typeof body.answers === 'object' ? body.answers : {};
  const submittedAt = new Date().toISOString();

  const outboxPath = path.join(zdDir, 'studio-outbox.json');
  let outbox = { schemaVersion: '2.0.0', submissions: [] };
  try {
    outbox = JSON.parse(await fs.readFile(outboxPath, 'utf8'));
    if (!Array.isArray(outbox.submissions)) outbox.submissions = [];
  } catch {
    // Initialize fresh outbox
  }

  const submission = {
    batchId,
    gateDecision: body.gateDecision || null,
    answers,
    lockAsRules: Boolean(body.lockAsRules),
    submittedAt,
  };

  const existingIdx = outbox.submissions.findIndex((s) => s.batchId === batchId);
  if (existingIdx >= 0) outbox.submissions[existingIdx] = submission;
  else outbox.submissions.push(submission);
  outbox.updatedAt = submittedAt;

  await fs.writeFile(outboxPath, `${JSON.stringify(outbox, null, 2)}\n`, 'utf8');

  // Mark matching batch RESOLVED in studio-inbox.json if present
  const inboxPath = path.join(zdDir, 'studio-inbox.json');
  try {
    const inbox = JSON.parse(await fs.readFile(inboxPath, 'utf8'));
    if (Array.isArray(inbox.batches)) {
      for (const b of inbox.batches) {
        if (b.batchId === batchId) b.status = 'RESOLVED';
      }
      await fs.writeFile(inboxPath, `${JSON.stringify(inbox, null, 2)}\n`, 'utf8');
    } else if (inbox.batchId === batchId) {
      inbox.status = 'RESOLVED';
      await fs.writeFile(inboxPath, `${JSON.stringify(inbox, null, 2)}\n`, 'utf8');
    }
  } catch {
    // Inbox optional
  }

  // Optionally persist answers into LOCKED-RULES.md
  const lockedAdded = [];
  if (body.lockAsRules) {
    for (const [key, val] of Object.entries(answers)) {
      const formatted = Array.isArray(val) ? val.join(', ') : String(val || '').trim();
      if (!formatted) continue;
      const added = await appendLockedRule(
        projectDir,
        'User Decision',
        `Honor user Studio selection for "${key}": ${formatted}`,
        `Studio Inbox ${batchId}`
      );
      lockedAdded.push(added.ruleId);
    }
  }

  return { batchId, submittedAt, lockedAdded };
}

function listenWithFallback(server, startPort, strictPort) {
  return new Promise((resolve, reject) => {
    let port = startPort;
    const onError = (err) => {
      if (err.code === 'EADDRINUSE' && !strictPort && port < startPort + 40) {
        port += 1;
        server.listen(port, '127.0.0.1');
      } else {
        server.off('error', onError);
        reject(err);
      }
    };
    server.on('error', onError);
    server.once('listening', () => {
      server.off('error', onError);
      const addr = server.address();
      resolve(typeof addr === 'object' && addr ? addr.port : port);
    });
    server.listen(port, '127.0.0.1');
  });
}

export async function startStudioServer({ projectDir = process.cwd(), port = 4310, strictPort = false, writePid = false } = {}) {
  const absProject = path.resolve(projectDir);
  const zdDir = path.join(absProject, '.zerodrift');
  const studioDir = await resolveStudioAssetDir();
  const sseClients = new Set();

  const broadcastUpdate = (reason = 'change') => {
    const payload = `event: update\ndata: ${JSON.stringify({ reason, at: new Date().toISOString() })}\n\n`;
    for (const res of sseClients) {
      try {
        res.write(payload);
      } catch {
        sseClients.delete(res);
      }
    }
  };

  let watcher = null;
  let debounceTimer = null;
  if (fsSync.existsSync(zdDir)) {
    try {
      watcher = fsSync.watch(zdDir, { recursive: true }, (_ev, fileName) => {
        if (fileName && (fileName.endsWith('.studio.pid') || fileName.endsWith('studio-data.json'))) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => broadcastUpdate(fileName || 'fs'), 180);
      });
      watcher.on('error', () => {});
    } catch {
      // Recursive fs.watch unsupported on some platforms; manual refresh & POST triggers still work
    }
  }

  const heartbeat = setInterval(() => {
    for (const res of sseClients) {
      try {
        res.write(': keepalive\n\n');
      } catch {
        sseClients.delete(res);
      }
    }
  }, 20000);
  heartbeat.unref();

  const server = http.createServer(async (req, res) => {
    try {
      const reqUrl = new URL(req.url || '/', 'http://127.0.0.1');
      const pathname = decodeURIComponent(reqUrl.pathname);

      // Static Studio UI routes
      if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
        const html = await fs.readFile(path.join(studioDir, 'index.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': MIME_TYPES['.html'], 'Cache-Control': 'no-store' });
        res.end(html);
        return;
      }

      if (req.method === 'GET' && (pathname === '/styles.css' || pathname === '/app.js')) {
        const assetPath = path.join(studioDir, pathname.slice(1));
        const ext = path.extname(assetPath);
        const content = await fs.readFile(assetPath, 'utf8');
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain', 'Cache-Control': 'no-store' });
        res.end(content);
        return;
      }

      // Optional Floorplan deep-link serving (strict canonical prefix containment)
      if (req.method === 'GET' && pathname.startsWith('/floorplan/')) {
        const floorplanRoot = path.resolve(absProject, 'floorplan');
        const rel = pathname.slice('/floorplan/'.length) || 'index.html';
        const candidate = path.resolve(floorplanRoot, rel);
        if (!candidate.startsWith(floorplanRoot + path.sep) && candidate !== floorplanRoot) {
          sendJson(res, 403, { error: 'Path traversal blocked' });
          return;
        }
        try {
          const buf = await fs.readFile(candidate);
          const ext = path.extname(candidate).toLowerCase();
          res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
          res.end(buf);
        } catch {
          sendJson(res, 404, { error: 'Floorplan asset not found' });
        }
        return;
      }

      // Optional Archify Plate serving (strict canonical prefix containment)
      if (req.method === 'GET' && pathname.startsWith('/archify/')) {
        const archifyRoot = path.resolve(absProject, '.zerodrift', 'archify');
        const rel = pathname.slice('/archify/'.length);
        const candidate = path.resolve(archifyRoot, rel);
        if (!rel || (!candidate.startsWith(archifyRoot + path.sep) && candidate !== archifyRoot)) {
          sendJson(res, 403, { error: 'Path traversal blocked' });
          return;
        }
        try {
          const buf = await fs.readFile(candidate);
          const ext = path.extname(candidate).toLowerCase();
          res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/html; charset=utf-8' });
          res.end(buf);
        } catch {
          sendJson(res, 404, { error: 'Archify plate not found' });
        }
        return;
      }

      // API: Native CodeMap & Wiring Graph
      if (req.method === 'GET' && pathname === '/api/codemap') {
        const map = await buildCodeMap(absProject, { writeFile: true });
        sendJson(res, 200, { ok: true, codemap: map });
        return;
      }

      // API: Lock Chosen UI/UX Layout + Font Pairing + Palette from Showcase
      if (req.method === 'POST' && pathname === '/api/design-lock') {
        const body = await readJsonBody(req);
        const tokensPath = path.join(absProject, '.zerodrift', 'memory', 'DESIGN-TOKENS.json');
        const showcasePath = path.join(absProject, '.zerodrift', 'DESIGN-SHOWCASE.json');
        let tokens = {};
        try {
          tokens = JSON.parse(await fs.readFile(tokensPath, 'utf8'));
        } catch {}
        tokens.layoutConcept = body.layoutId || tokens.layoutConcept || 'editorial-calm';
        tokens.fontPairing = body.fontPairingId || tokens.fontPairing || 'ibm-plex-jakarta';
        if (body.typography && typeof body.typography === 'object') {
          tokens.typography = { ...(tokens.typography || {}), ...body.typography };
        }
        if (body.palette && typeof body.palette === 'object') {
          tokens.palette = { ...(tokens.palette || {}), ...body.palette };
          tokens.approvedColors = [...new Set([...(tokens.approvedColors || []), ...Object.values(body.palette)])];
        }
        tokens.updatedAt = new Date().toISOString().slice(0, 10);
        await fs.mkdir(path.dirname(tokensPath), { recursive: true });
        await fs.writeFile(tokensPath, `${JSON.stringify(tokens, null, 2)}\n`, 'utf8');

        try {
          const sc = JSON.parse(await fs.readFile(showcasePath, 'utf8'));
          if (body.layoutId) sc.selectedLayout = body.layoutId;
          if (body.fontPairingId) sc.selectedFontPairing = body.fontPairingId;
          if (body.paletteId) sc.selectedPalette = body.paletteId;
          sc.updatedAt = tokens.updatedAt;
          await fs.writeFile(showcasePath, `${JSON.stringify(sc, null, 2)}\n`, 'utf8');
        } catch {}

        await saveStudioResponse(absProject, {
          batchId: body.batchId || 'GATE-4-DESIGN-LOCK',
          gateDecision: 'APPROVE',
          answers: {
            layoutConcept: tokens.layoutConcept,
            fontPairing: tokens.fontPairing,
            palette: body.paletteId || 'custom',
          },
          lockAsRules: false,
        });
        await buildStudioData(absProject, { writeFile: true });
        broadcastUpdate('design-lock');
        sendJson(res, 200, { ok: true, layoutConcept: tokens.layoutConcept, fontPairing: tokens.fontPairing });
        return;
      }

      // API: Live State Snapshot
      if (req.method === 'GET' && pathname === '/api/state') {
        const data = await buildStudioData(absProject, { writeFile: true });
        sendJson(res, 200, data);
        return;
      }

      // API: Workspace File Tree
      if (req.method === 'GET' && pathname === '/api/tree') {
        const tree = await scanWorkspaceTree(absProject);
        sendJson(res, 200, tree);
        return;
      }

      // API: Time Machine Checkpoints Timeline
      if (req.method === 'GET' && pathname === '/api/checkpoints') {
        const list = await listCheckpoints(absProject);
        const enriched = [];
        for (const cp of list) {
          const plan = await buildRollbackPlan(absProject, cp.id);
          enriched.push({
            ...cp,
            rollbackCommand: plan.recommendedSafeCommand || null,
            nonDestructiveRevertCommand: plan.nonDestructiveRevertCommand || null,
          });
        }
        sendJson(res, 200, { ok: true, count: enriched.length, checkpoints: enriched });
        return;
      }

      // API: Fresh Session Handoff (Context Rot Prevention)
      if (req.method === 'GET' && pathname === '/api/handoff') {
        const handoff = await generateHandoff(absProject, { writeFile: true });
        sendJson(res, 200, { ok: true, ...handoff });
        return;
      }

      // API: Server-Sent Events (SSE)
      if (req.method === 'GET' && pathname === '/api/events') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        });
        res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
        sseClients.add(res);
        req.on('close', () => sseClients.delete(res));
        return;
      }

      // API: Submit Interactive Q&A / Gate Answers
      if (req.method === 'POST' && pathname === '/api/responses') {
        const body = await readJsonBody(req);
        const saved = await saveStudioResponse(absProject, body);
        await buildStudioData(absProject, { writeFile: true });
        broadcastUpdate('responses');
        sendJson(res, 200, { ok: true, ...saved });
        return;
      }

      // API: Add Permanent Rule to LOCKED-RULES.md
      if (req.method === 'POST' && pathname === '/api/rules') {
        const body = await readJsonBody(req);
        if (!body.rule || !String(body.rule).trim()) {
          sendJson(res, 400, { error: 'Field "rule" is required' });
          return;
        }
        const added = await appendLockedRule(absProject, body.category, body.rule);
        await buildStudioData(absProject, { writeFile: true });
        broadcastUpdate('rules');
        sendJson(res, 201, { ok: true, ...added });
        return;
      }

      sendJson(res, 404, { error: 'Not Found' });
    } catch (err) {
      sendJson(res, 400, { error: err.message || 'Bad Request' });
    }
  });

  const boundPort = await listenWithFallback(server, port, strictPort);
  const url = `http://127.0.0.1:${boundPort}`;
  const pidPath = path.join(zdDir, '.studio.pid');

  if (writePid && fsSync.existsSync(zdDir)) {
    await fs.writeFile(pidPath, JSON.stringify({ pid: process.pid, port: boundPort, url }), 'utf8');
  }

  const close = () =>
    new Promise((resolve) => {
      clearInterval(heartbeat);
      clearTimeout(debounceTimer);
      if (watcher) {
        try {
          watcher.close();
        } catch {}
      }
      for (const client of sseClients) {
        try {
          client.end();
        } catch {}
      }
      sseClients.clear();
      server.close(() => {
        if (writePid) {
          fs.unlink(pidPath).catch(() => {});
        }
        resolve();
      });
    });

  return { server, port: boundPort, url, close };
}

async function stopRunningStudio(projectDir) {
  const pidPath = path.join(path.resolve(projectDir), '.zerodrift', '.studio.pid');
  try {
    const info = JSON.parse(await fs.readFile(pidPath, 'utf8'));
    if (info.pid) {
      process.kill(info.pid, 'SIGTERM');
      await fs.unlink(pidPath).catch(() => {});
      console.log(`Stopped ZeroDrift Studio (PID ${info.pid}, ${info.url || ''}).`);
    }
  } catch {
    console.log('No active ZeroDrift Studio PID found for this project.');
  }
}

function parseCliArgs(argv) {
  const args = { project: process.cwd(), port: 4310, strictPort: false, stop: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--stop') args.stop = true;
    else if (t === '--strict-port') args.strictPort = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
    else if (t === '--port' && argv[i + 1]) args.port = Number(argv[++i]);
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  const args = parseCliArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Usage: node scripts/studio-server.mjs [--project <dir>] [--port <num>] [--strict-port] [--stop]');
    process.exit(0);
  }
  if (args.stop) {
    await stopRunningStudio(args.project);
    process.exit(0);
  }
  const instance = await startStudioServer({
    projectDir: args.project,
    port: args.port,
    strictPort: args.strictPort,
    writePid: true,
  });
  console.log(`ZeroDrift Studio Mission Control running at: ${instance.url}`);
  console.log(`Project: ${args.project}`);
  console.log('Press Ctrl+C to stop (or run with --stop).');

  const handleShutdown = async () => {
    await instance.close();
    process.exit(0);
  };
  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
}

