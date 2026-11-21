#!/usr/bin/env node
/**
 * ZeroDrift v4.0 Native CodeMap, Dependency Graph, Route Wiring Parity & Blast Radius Engine
 * 100% Original, MIT-Licensed, Zero External Runtime Dependencies (Node.js 18+ ESM).
 * Scans any workspace to classify architecture layers, detect circular dependencies,
 * orphan/dead files, layer boundary violations, frontend-to-backend route wiring parity,
 * and transitive Blast Radius cross-referenced with REGRESSION-LEDGER.json.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.zerodrift',
  'floorplan',
  'dist',
  'build',
  '.next',
  '.nuxt',
  'coverage',
  '.understand-anything',
]);

const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte']);
const RESOLVE_CANDIDATE_EXTS = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '/index.ts', '/index.tsx', '/index.js', '/index.mjs'];

const LAYER_ORDER = ['ui', 'api-client', 'routes', 'services', 'database', 'shared', 'tests'];

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readTextSafe(p, fallback = '') {
  try {
    return await fs.readFile(p, 'utf8');
  } catch {
    return fallback;
  }
}

async function readJsonSafe(p, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(p, 'utf8'));
  } catch {
    return fallback;
  }
}

async function collectCodeFiles(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectCodeFiles(full, acc);
    } else if (entry.isFile()) {
      if (CODE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        acc.push(full);
      }
    }
  }
  return acc;
}

export function classifyLayer(relPath) {
  const p = relPath.replace(/\\/g, '/').toLowerCase();
  if (p.includes('.test.') || p.includes('.spec.') || p.startsWith('tests/') || p.includes('/tests/') || p.includes('/__tests__/')) {
    return 'tests';
  }
  if (
    p.includes('/db/') ||
    p.includes('/database/') ||
    p.includes('/repositories/') ||
    p.includes('.repository.') ||
    p.includes('/schema') ||
    p.includes('/migrations/') ||
    p.includes('prisma')
  ) {
    return 'database';
  }
  if (
    p.includes('/routes/') ||
    p.includes('.route.') ||
    p.includes('.routes.') ||
    p.includes('/controllers/') ||
    p.includes('/handlers/') ||
    p.startsWith('functions/api/') ||
    p.includes('/api/') && !p.includes('/client/')
  ) {
    return 'routes';
  }
  if (
    p.includes('/services/') ||
    p.includes('.service.') ||
    p.includes('/use-cases/') ||
    p.includes('/domain/')
  ) {
    return p.includes('/client/') || p.includes('/frontend/') ? 'api-client' : 'services';
  }
  if (
    p.includes('apiclient') ||
    p.includes('api-client') ||
    p.includes('api.client') ||
    p.includes('/client/api') ||
    p.includes('/frontend/api')
  ) {
    return 'api-client';
  }
  if (
    p.endsWith('.tsx') ||
    p.endsWith('.jsx') ||
    p.endsWith('.vue') ||
    p.endsWith('.svelte') ||
    p.includes('/pages/') ||
    p.includes('/components/') ||
    p.includes('/views/') ||
    p.includes('/client/') ||
    p.includes('/frontend/')
  ) {
    return 'ui';
  }
  return 'shared';
}

function isEntrypointFile(relPath, layer) {
  const p = relPath.replace(/\\/g, '/').toLowerCase();
  const base = path.basename(p);
  if (layer === 'tests') return true;
  if (
    base === 'index.ts' ||
    base === 'index.js' ||
    base === 'index.mjs' ||
    base === 'main.ts' ||
    base === 'main.tsx' ||
    base === 'app.tsx' ||
    base === 'app.ts' ||
    base === 'server.ts' ||
    base === 'server.js' ||
    base === 'server.mjs' ||
    p.startsWith('scripts/') ||
    p.startsWith('functions/api/') ||
    p.includes('/pages/') ||
    p.includes('/routes/')
  ) {
    return true;
  }
  return false;
}

function extractRelativeImports(content) {
  const specs = new Set();
  const patterns = [
    /\bimport\s+(?:[\s\S]*?\s+from\s+)?['"](\.[^'"]+)['"]/g,
    /\bexport\s+(?:[\s\S]*?\s+from\s+)['"](\.[^'"]+)['"]/g,
    /\bimport\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g,
    /\brequire\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g,
  ];
  for (const re of patterns) {
    for (const m of content.matchAll(re)) {
      if (m[1]) specs.add(m[1]);
    }
  }
  return [...specs];
}

function normalizeRoutePath(raw) {
  let cleaned = String(raw || '').trim().split('?')[0];
  cleaned = cleaned.replace(/\$\{[^}]+\}/g, ':param');
  cleaned = cleaned.replace(/\/:[A-Za-z0-9_]+/g, '/:param');
  cleaned = cleaned.replace(/\/\[[^\]]+\]/g, '/:param');
  cleaned = cleaned.replace(/\/+$/, '') || '/';
  return cleaned;
}

function extractFrontendApiCalls(relPath, content) {
  const calls = [];
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    // Match fetch('/api/...' , { method: 'POST' }) or fetch(`/api/...`)
    const fetchRe = /\bfetch\s*\(\s*['"`](\/api\/[^'"`]+)['"`]([^)]*)\)/g;
    for (const m of line.matchAll(fetchRe)) {
      const rest = m[2] || '';
      const methodMatch = rest.match(/method\s*:\s*['"]([A-Za-z]+)['"]/i);
      const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';
      calls.push({
        file: relPath,
        line: i + 1,
        method,
        rawPath: m[1],
        normalizedPath: normalizeRoutePath(m[1]),
      });
    }

    // Match apiClient.get('/api/...'), axios.post('/api/...'), api.delete('/api/...')
    const clientRe = /\b(?:apiClient|axios|httpClient|api)\.(get|post|put|patch|delete)\s*\(\s*['"`](\/api\/[^'"`]+)['"`]/gi;
    for (const m of line.matchAll(clientRe)) {
      calls.push({
        file: relPath,
        line: i + 1,
        method: m[1].toUpperCase(),
        rawPath: m[2],
        normalizedPath: normalizeRoutePath(m[2]),
      });
    }
  }
  return calls;
}

function extractBackendRoutes(relPath, content) {
  const routes = [];
  const lines = content.split(/\r?\n/);

  // Express / Fastify / Hono route handlers: router.post('/api/...', requireAuth, handler)
  const routeRe = /\b(?:app|router|server|fastify)\.(get|post|put|patch|delete)\s*\(\s*['"`](\/[^'"`]+)['"`]([^;\n]*)/gi;
  for (let i = 0; i < lines.length; i += 1) {
    for (const m of lines[i].matchAll(routeRe)) {
      const method = m[1].toUpperCase();
      const rawPath = m[2];
      const tail = m[3] || '';
      const isPublic = rawPath.includes('/health') || rawPath.includes('/login') || rawPath.includes('/register') || /public/i.test(tail);
      const hasAuth = /(?:auth|rbac|require|guard|protect|verify|session|jwt|role)/i.test(tail) || /(?:router\.use|app\.use)\s*\([^)]*(?:auth|rbac|require|guard)/i.test(content);
      routes.push({
        file: relPath,
        line: i + 1,
        method,
        rawPath,
        normalizedPath: normalizeRoutePath(rawPath),
        authenticated: isPublic ? 'PUBLIC' : hasAuth ? 'PROTECTED' : 'UNAUTHENTICATED_RISK',
      });
    }
  }

  // Cloudflare Pages Functions: functions/api/invoices/[id].ts with export async function onRequestPost
  const normRel = relPath.replace(/\\/g, '/');
  if (normRel.startsWith('functions/api/')) {
    const cfPath = '/' + normRel.replace(/^functions\//, '').replace(/\.(?:ts|js|mjs)$/, '').replace(/\/index$/, '');
    const cfMethods = [
      ['onRequestGet', 'GET'],
      ['onRequestPost', 'POST'],
      ['onRequestPut', 'PUT'],
      ['onRequestPatch', 'PATCH'],
      ['onRequestDelete', 'DELETE'],
    ];
    for (const [fnName, method] of cfMethods) {
      if (content.includes(fnName)) {
        const isPublic = cfPath.includes('/health') || cfPath.includes('/login');
        const hasAuth = /(?:auth|rbac|require|guard|session|jwt)/i.test(content);
        routes.push({
          file: relPath,
          line: 1,
          method,
          rawPath: cfPath,
          normalizedPath: normalizeRoutePath(cfPath),
          authenticated: isPublic ? 'PUBLIC' : hasAuth ? 'PROTECTED' : 'UNAUTHENTICATED_RISK',
        });
      }
    }
  }

  return routes;
}

function parseContractRoutes(contractsMd) {
  const routes = [];
  let inSection = false;
  for (const line of contractsMd.split(/\r?\n/)) {
    if (line.startsWith('## 2. HTTP API Route Registry')) {
      inSection = true;
      continue;
    }
    if (inSection && line.startsWith('## ')) break;
    if (!inSection || !line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim().replace(/^`|`$/g, ''));
    if (cells.length < 4 || cells[0].startsWith('Route ID') || cells[0].startsWith('---') || cells[0].startsWith(':---') || cells[0].includes('{{')) {
      continue;
    }
    routes.push({
      id: cells[0],
      method: cells[1].toUpperCase(),
      rawPath: cells[2],
      normalizedPath: normalizeRoutePath(cells[2]),
      auth: cells[3],
    });
  }
  return routes;
}

function detectCycles(nodes, adjacency) {
  const visited = new Set();
  const stack = new Set();
  const pathStack = [];
  const cycles = [];
  const cycleKeys = new Set();

  function dfs(u) {
    visited.add(u);
    stack.add(u);
    pathStack.push(u);

    for (const v of adjacency.get(u) || []) {
      if (!visited.has(v)) {
        dfs(v);
      } else if (stack.has(v)) {
        const idx = pathStack.indexOf(v);
        if (idx >= 0) {
          const cycle = [...pathStack.slice(idx), v];
          const key = cycle.slice(0, -1).sort().join('|');
          if (!cycleKeys.has(key)) {
            cycleKeys.add(key);
            cycles.push(cycle);
          }
        }
      }
    }

    pathStack.pop();
    stack.delete(u);
  }

  for (const n of nodes) {
    if (!visited.has(n.id)) dfs(n.id);
  }
  return cycles;
}

export async function buildCodeMap(projectDir, { writeFile = true } = {}) {
  const absProject = path.resolve(projectDir);
  const zdDir = path.join(absProject, '.zerodrift');
  const codeFiles = (await pathExists(absProject)) ? await collectCodeFiles(absProject) : [];
  const fileSet = new Set(codeFiles.map((f) => path.relative(absProject, f).replace(/\\/g, '/')));

  const nodes = [];
  const edges = [];
  const adjacency = new Map();
  const reverseAdj = new Map();
  const inboundCount = new Map();

  const frontendCalls = [];
  const backendRoutes = [];

  for (const absFile of codeFiles) {
    const rel = path.relative(absProject, absFile).replace(/\\/g, '/');
    const layer = classifyLayer(rel);
    nodes.push({
      id: rel,
      label: path.basename(rel),
      layer,
      entrypoint: isEntrypointFile(rel, layer),
    });
    adjacency.set(rel, new Set());
    reverseAdj.set(rel, new Set());
    inboundCount.set(rel, 0);
  }

  const layerMap = new Map(nodes.map((n) => [n.id, n.layer]));
  const layerViolations = [];

  for (const absFile of codeFiles) {
    const rel = path.relative(absProject, absFile).replace(/\\/g, '/');
    const content = await readTextSafe(absFile);
    const fromLayer = layerMap.get(rel);

    // 1. Resolve relative imports
    for (const spec of extractRelativeImports(content)) {
      const baseDir = path.dirname(absFile);
      let resolvedRel = null;
      for (const ext of RESOLVE_CANDIDATE_EXTS) {
        const stripped = spec.endsWith('.js') && ext === '.ts' ? spec.slice(0, -3) : spec;
        const candidateAbs = path.resolve(baseDir, stripped + ext);
        const candidateRel = path.relative(absProject, candidateAbs).replace(/\\/g, '/');
        if (fileSet.has(candidateRel)) {
          resolvedRel = candidateRel;
          break;
        }
      }
      if (resolvedRel && resolvedRel !== rel) {
        adjacency.get(rel).add(resolvedRel);
        reverseAdj.get(resolvedRel).add(rel);
        inboundCount.set(resolvedRel, (inboundCount.get(resolvedRel) || 0) + 1);
        edges.push({ from: rel, to: resolvedRel, kind: 'import' });

        const toLayer = layerMap.get(resolvedRel);
        if (fromLayer === 'ui' && (toLayer === 'database' || toLayer === 'routes')) {
          layerViolations.push({
            from: rel,
            to: resolvedRel,
            rule: `UI module "${rel}" imports ${toLayer} module "${resolvedRel}" directly (bypassing API client/service boundary)`,
          });
        } else if (fromLayer === 'services' && toLayer === 'ui') {
          layerViolations.push({
            from: rel,
            to: resolvedRel,
            rule: `Domain service "${rel}" imports UI module "${resolvedRel}" (layer inversion)`,
          });
        } else if (fromLayer === 'database' && (toLayer === 'ui' || toLayer === 'routes')) {
          layerViolations.push({
            from: rel,
            to: resolvedRel,
            rule: `Database module "${rel}" imports ${toLayer} module "${resolvedRel}" (layer inversion)`,
          });
        }
      }
    }

    // 2. Extract frontend calls & backend routes
    if (fromLayer === 'ui' || fromLayer === 'api-client' || fromLayer === 'shared') {
      frontendCalls.push(...extractFrontendApiCalls(rel, content));
    }
    if (fromLayer === 'routes' || fromLayer === 'services' || fromLayer === 'shared') {
      backendRoutes.push(...extractBackendRoutes(rel, content));
    }
  }

  // 3. Detect Circular Dependencies & Orphan Files
  const circularDependencies = detectCycles(nodes, adjacency);
  const orphanFiles = nodes
    .filter((n) => !n.entrypoint && (inboundCount.get(n.id) || 0) === 0)
    .map((n) => n.id);

  // 4. Frontend-to-Backend Route Wiring Parity (cross-checked with CONTRACTS.md)
  const contractsMd = await readTextSafe(path.join(zdDir, 'CONTRACTS.md'));
  const contractRoutes = parseContractRoutes(contractsMd);

  const backendKeyMap = new Map();
  for (const br of backendRoutes) {
    backendKeyMap.set(`${br.method} ${br.normalizedPath}`, br);
  }
  const contractKeyMap = new Map();
  for (const cr of contractRoutes) {
    contractKeyMap.set(`${cr.method} ${cr.normalizedPath}`, cr);
  }

  const matchedWires = [];
  const brokenWires = [];
  const usedBackendKeys = new Set();

  for (const call of frontendCalls) {
    const key = `${call.method} ${call.normalizedPath}`;
    const targetRoute = backendKeyMap.get(key);
    if (targetRoute) {
      usedBackendKeys.add(key);
      matchedWires.push({
        from: call.file,
        to: targetRoute.file,
        method: call.method,
        path: call.rawPath,
        inContracts: contractKeyMap.has(key),
      });
      edges.push({
        from: call.file,
        to: targetRoute.file,
        kind: 'http',
        label: `${call.method} ${call.rawPath}`,
        status: 'ok',
      });
    } else {
      brokenWires.push({
        from: call.file,
        line: call.line,
        method: call.method,
        path: call.rawPath,
        reason: `Frontend calls "${call.method} ${call.rawPath}" but no matching backend route handler was found`,
      });
    }
  }

  const orphanRoutes = backendRoutes
    .filter((br) => {
      const key = `${br.method} ${br.normalizedPath}`;
      return !usedBackendKeys.has(key) && !br.normalizedPath.endsWith('/health');
    })
    .map((br) => ({
      file: br.file,
      line: br.line,
      method: br.method,
      path: br.rawPath,
    }));

  const unauthenticatedRoutes = backendRoutes
    .filter((br) => br.authenticated === 'UNAUTHENTICATED_RISK')
    .map((br) => ({
      file: br.file,
      line: br.line,
      method: br.method,
      path: br.rawPath,
    }));

  // Annotate nodes with inbound/outbound counts
  const enrichedNodes = nodes.map((n) => ({
    ...n,
    inboundCount: (reverseAdj.get(n.id) || new Set()).size,
    outboundCount: (adjacency.get(n.id) || new Set()).size,
  }));

  const codemap = {
    schemaVersion: '4.0.0',
    generatedAt: new Date().toISOString(),
    projectDir: absProject,
    layers: LAYER_ORDER,
    summary: {
      totalNodes: enrichedNodes.length,
      totalEdges: edges.length,
      circularCount: circularDependencies.length,
      orphanFileCount: orphanFiles.length,
      layerViolationCount: layerViolations.length,
      matchedWireCount: matchedWires.length,
      brokenWireCount: brokenWires.length,
      orphanRouteCount: orphanRoutes.length,
      unauthenticatedRouteCount: unauthenticatedRoutes.length,
    },
    nodes: enrichedNodes,
    edges,
    diagnostics: {
      circularDependencies,
      orphanFiles,
      layerViolations,
      matchedWires,
      brokenWires,
      orphanRoutes,
      unauthenticatedRoutes,
    },
  };

  if (writeFile && (await pathExists(zdDir))) {
    await fs.writeFile(path.join(zdDir, 'codemap.json'), `${JSON.stringify(codemap, null, 2)}\n`, 'utf8');
  }

  return codemap;
}

export async function computeBlastRadius(projectDir, targetFile) {
  const absProject = path.resolve(projectDir);
  const normTarget = targetFile.replace(/\\/g, '/').replace(/^\.\//, '');
  const map = await buildCodeMap(absProject, { writeFile: false });

  const reverseAdj = new Map();
  for (const e of map.edges) {
    if (!reverseAdj.has(e.to)) reverseAdj.set(e.to, new Set());
    reverseAdj.get(e.to).add(e.from);
  }

  const directDependents = [...(reverseAdj.get(normTarget) || [])];
  const transitive = new Set();
  const queue = [...directDependents];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (transitive.has(cur) || cur === normTarget) continue;
    transitive.add(cur);
    for (const parent of reverseAdj.get(cur) || []) {
      if (!transitive.has(parent) && parent !== normTarget) {
        queue.push(parent);
      }
    }
  }

  // Cross-reference REGRESSION-LEDGER.json for protected invariants
  const regLedger = await readJsonSafe(
    path.join(absProject, '.zerodrift', 'memory', 'REGRESSION-LEDGER.json'),
    { entries: [] }
  );
  const affectedSet = new Set([normTarget, ...transitive]);
  const linkedRegressions = (Array.isArray(regLedger?.entries) ? regLedger.entries : []).filter((entry) =>
    (entry.filesTouched || []).some((f) => affectedSet.has(String(f).replace(/\\/g, '/')))
  );

  return {
    targetFile: normTarget,
    directDependents,
    transitiveDependents: [...transitive],
    totalImpactedFiles: transitive.size,
    linkedRegressions,
  };
}

function parseArgs(argv) {
  const args = { project: process.cwd(), impact: null, json: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--json') args.json = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
    else if (t === '--impact' && argv[i + 1]) args.impact = argv[++i];
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log('Usage: node scripts/code-map.mjs --project <dir> [--impact <relative-file>] [--json]');
      process.exit(0);
    }

    if (args.impact) {
      const impact = await computeBlastRadius(args.project, args.impact);
      console.log(JSON.stringify(impact, null, 2));
    } else {
      const map = await buildCodeMap(args.project, { writeFile: true });
      if (args.json) {
        console.log(JSON.stringify(map, null, 2));
      } else {
        const s = map.summary;
        console.log(`ZeroDrift CodeMap generated (.zerodrift/codemap.json):`);
        console.log(`  Nodes: ${s.totalNodes} | Edges: ${s.totalEdges} | Matched Wires: ${s.matchedWireCount}`);
        console.log(
          `  Cycles: ${s.circularCount} | Orphans: ${s.orphanFileCount} | Layer Violations: ${s.layerViolationCount} | Broken Wires: ${s.brokenWireCount}`
        );
      }
    }
  } catch (err) {
    console.error(`[ZeroDrift CodeMap Error] ${err.message}`);
    process.exit(1);
  }
}

