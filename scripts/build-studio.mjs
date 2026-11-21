#!/usr/bin/env node
/**
 * ZeroDrift v4.0 Studio Data Builder & Portable Single-File HTML Exporter
 * Compiles `.zerodrift/`, Native CodeMap, Design Showcase, Living Memory, Checkpoints,
 * Copy Style, Learned Skills, Archify Plates, Floorplan, Workspace Tree, Fresh Handoff
 * & All 4 Enterprise Scanners into `.zerodrift/studio-data.json` + portable HTML.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkTokenDrift,
  checkMojibake,
  checkEnvParity,
  checkHardcodedSecrets,
} from './validate-project.mjs';
import { generateHandoff } from './handoff.mjs';
import { buildCodeMap } from './code-map.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const TREE_IGNORE = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.nuxt',
  'coverage',
  '.DS_Store',
  'Thumbs.db',
]);

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readTextSafe(filePath, fallback = '') {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return fallback;
  }
}

async function readJsonSafe(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

export async function resolveStudioAssetDir() {
  const candidates = [
    path.join(REPO_ROOT, 'studio'),
    path.join(REPO_ROOT, 'references', 'studio'),
  ];
  for (const dir of candidates) {
    if (await pathExists(path.join(dir, 'index.html'))) {
      return dir;
    }
  }
  throw new Error('ZeroDrift Studio assets directory (studio/index.html) not found.');
}

async function loadDefaultShowcaseTemplate() {
  const candidates = [
    path.join(REPO_ROOT, 'templates', 'DESIGN-SHOWCASE.json'),
    path.join(REPO_ROOT, 'references', 'templates', 'DESIGN-SHOWCASE.json'),
  ];
  for (const p of candidates) {
    const parsed = await readJsonSafe(p, null);
    if (parsed) return parsed;
  }
  return { layouts: [], fontPairings: [], palettes: [] };
}

/**
 * Strips raw Markdown formatting (backticks, bold **, italic *) from parsed cells
 * so Studio badges, pills, and tables render cleanly with zero Markdown artifacts.
 */
export function cleanMarkdownCell(raw) {
  return String(raw ?? '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();
}

function hasPlaceholder(str) {
  return /\{\{[^}]+\}\}/.test(String(str ?? ''));
}

function inferFileBadge(relPath) {
  const lower = relPath.toLowerCase();
  if (lower.includes('contracts.md') || lower.includes('.zerodrift/')) return 'Contract';
  if (lower.includes('test') || lower.includes('.spec.')) return 'Test';
  if (lower.includes('schema') || lower.includes('migration') || lower.endsWith('.sql') || lower.includes('prisma')) return 'DB';
  if (lower.endsWith('.tsx') || lower.endsWith('.jsx') || lower.endsWith('.css') || lower.endsWith('.html') || lower.includes('components/')) return 'Frontend';
  if (lower.includes('server') || lower.includes('api/') || lower.includes('routes/') || lower.includes('controllers/')) return 'Backend';
  if (lower.endsWith('.json') || lower.endsWith('.yml') || lower.endsWith('.yaml') || lower.endsWith('.env.example')) return 'Config';
  return '';
}

export async function scanWorkspaceTree(projectDir, maxDepth = 5) {
  const absRoot = path.resolve(projectDir);
  let fileCount = 0;

  async function walk(dir, depth) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    const children = [];
    for (const entry of entries) {
      if (TREE_IGNORE.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      const rel = path.relative(absRoot, full).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        if (depth >= maxDepth) {
          children.push({ name: entry.name, path: rel, type: 'dir', children: [] });
        } else {
          const sub = await walk(full, depth + 1);
          children.push({ name: entry.name, path: rel, type: 'dir', children: sub });
        }
      } else if (entry.isFile()) {
        fileCount += 1;
        children.push({
          name: entry.name,
          path: rel,
          type: 'file',
          badge: inferFileBadge(rel),
        });
      }
    }
    return children;
  }

  const children = (await pathExists(absRoot)) ? await walk(absRoot, 0) : [];
  return { root: path.basename(absRoot), fileCount, children };
}

function parseMarkdownTableRows(md, sectionHeading = null) {
  const lines = md.split(/\r?\n/);
  let active = sectionHeading === null;
  const rows = [];

  for (const line of lines) {
    if (sectionHeading !== null) {
      if (line.startsWith(sectionHeading)) {
        active = true;
        continue;
      }
      if (active && line.startsWith('## ')) break;
    }
    if (!active || !line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => cleanMarkdownCell(c));
    if (cells.length === 0) continue;
    if (cells[0].startsWith('---') || cells[0].startsWith(':---')) continue;
    rows.push(cells);
  }
  return rows;
}

function extractField(md, labelRegex, fallback = '') {
  const match = md.match(labelRegex);
  if (!match) return fallback;
  const cleaned = cleanMarkdownCell(match[1]);
  return hasPlaceholder(cleaned) ? fallback : cleaned;
}

function parsePipelineFromState(stateMd, briefMd) {
  const stageRows = parseMarkdownTableRows(stateMd, '## 3. Stage Gate Matrix').slice(1);
  const stages = stageRows.map((cells) => {
    const rawStage = cells[0] || '';
    const [code, ...rest] = rawStage.split(':');
    return {
      code: (code || rawStage).trim(),
      label: rest.join(':').trim() || rawStage,
      artifacts: cells[1] || '',
      status: (cells[2] || 'PENDING').trim(),
      date: cells[3] || '-',
      notes: cells[4] || '',
    };
  });

  const sliceRows = parseMarkdownTableRows(stateMd, '## 4. Vertical Slice Ledger').slice(1);
  const slices = sliceRows
    .filter((c) => c[0] && !c[0].startsWith('(') && !hasPlaceholder(c[0]) && !hasPlaceholder(c[1]))
    .map((c) => ({
      id: c[0],
      name: c[1] || '',
      status: c[2] || 'QUEUED',
      verification: c[3] || '-',
      updated: c[4] || '-',
    }));

  const clarityMatch = briefMd.match(/Weighted Clarity Score\*\*.*?\|\s*\*\*`?([^|]+?)`?\*\*/i);
  const clarityScore = clarityMatch && !hasPlaceholder(clarityMatch[1]) ? cleanMarkdownCell(clarityMatch[1]) : 'Pending';

  return {
    currentStage: extractField(stateMd, /\*\*Current Stage:\*\*\s*`?([^\n`]+)`?/i, 'STAGE 0 — Bootstrap'),
    activeSlice: extractField(stateMd, /\*\*Active Slice ID:\*\*\s*`?([^\n`]+)`?/i, 'NONE'),
    nextAction: extractField(stateMd, /\*\*Next Deterministic Action:\*\*\s*`?([^\n`]+)`?/i, 'Run zerodrift-intake'),
    clarityScore,
    stages,
    slices,
  };
}

function parseContracts(contractsMd) {
  const routeRows = parseMarkdownTableRows(contractsMd, '## 2. HTTP API Route Registry').slice(1);
  const routes = routeRows
    .filter((c) => c.length >= 6 && !c.some(hasPlaceholder))
    .map((c) => ({
      id: c[0],
      method: c[1],
      path: c[2],
      auth: c[3],
      request: c[4],
      response: c[5],
      errors: c[6] || '',
    }));

  const tableRows = parseMarkdownTableRows(contractsMd, '## 4. Database Schema').slice(1);
  const tables = tableRows
    .filter((c) => c.length >= 4 && !c.some(hasPlaceholder))
    .map((c) => ({
      table: c[0],
      pk: c[1],
      columns: c[2],
      constraints: c[3],
      indexes: c[4] || '',
    }));

  return { routes, tables };
}

function parseLockedRules(rulesMd) {
  const rows = parseMarkdownTableRows(rulesMd, '## Active Rules').slice(1);
  return rows
    .filter((c) => c.length >= 3 && c[0].startsWith('RULE-') && !hasPlaceholder(c[2]))
    .map((c) => ({
      id: c[0],
      category: c[1],
      rule: c[2],
      source: c[3] || '',
      status: c[4] || 'ACTIVE',
    }));
}

function parseSources(researchMd) {
  const rows = parseMarkdownTableRows(researchMd, '## 2. Verifiable Domain Standards').slice(1);
  return rows
    .filter((c) => c.length >= 6 && !c.slice(0, 6).some(hasPlaceholder))
    .map((c) => ({
      ref: c[0],
      standard: c[1],
      source: c[2],
      version: c[3],
      rule: c[4],
      modules: c[5],
      status: c[6] || 'VERIFIED',
    }));
}

function parseSecurityAudit(secMd) {
  const controlRows = parseMarkdownTableRows(secMd, '## 2. OWASP Top 10').slice(1);
  const controls = controlRows
    .filter((c) => c.length >= 4 && !c.slice(0, 4).some(hasPlaceholder))
    .map((c) => ({
      num: c[0],
      control: c[1],
      status: c[2],
      evidence: c[3],
    }));

  const p0Match = secMd.match(/Unresolved P0 Findings:\*\*\s*`?(\d+)`?/i);
  const p1Match = secMd.match(/Unresolved P1 Findings:\*\*\s*`?(\d+)`?/i);
  const verdict = extractField(secMd, /\*\*Overall Gate Verdict:\*\*\s*`?([^\n`]+)`?/i, 'PENDING');

  return {
    p0: p0Match ? Number(p0Match[1]) : 0,
    p1: p1Match ? Number(p1Match[1]) : 0,
    verdict,
    controls,
  };
}

async function loadLearnedSkills(zdDir) {
  const dir = path.join(zdDir, 'learned-skills');
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const skills = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'README.md') continue;
    const content = await readTextSafe(path.join(dir, entry.name));
    const domainMatch = content.match(/^domain:\s*["']?([^"'\r\n]+)["']?/m);
    skills.push({
      fileName: entry.name,
      domain: domainMatch ? domainMatch[1].trim() : 'project',
      content,
    });
  }
  return skills;
}

async function detectArchifyPlates(zdDir) {
  const dir = path.join(zdDir, 'archify');
  if (!(await pathExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => ({ name: e.name, href: `/archify/${encodeURIComponent(e.name)}` }));
}

export async function buildStudioData(projectDir, { writeFile = true } = {}) {
  const absProject = path.resolve(projectDir);
  const zdDir = path.join(absProject, '.zerodrift');

  const [
    stateMd,
    briefMd,
    researchMd,
    contractsMd,
    secMd,
    handoverMd,
    rulesMd,
    regLedger,
    designTokens,
    copyStyle,
    checkpointsJson,
    showcaseRaw,
    inbox,
    outbox,
    learnedSkills,
    tokenDrift,
    mojibake,
    envParity,
    secrets,
    tree,
    hasFloorplan,
    archifyPlates,
    handoff,
    codemap,
  ] = await Promise.all([
    readTextSafe(path.join(zdDir, 'STATE.md')),
    readTextSafe(path.join(zdDir, '00-BRIEF.md')),
    readTextSafe(path.join(zdDir, '02-RESEARCH-SOURCES.md')),
    readTextSafe(path.join(zdDir, 'CONTRACTS.md')),
    readTextSafe(path.join(zdDir, '05-SECURITY-AUDIT.md')),
    readTextSafe(path.join(zdDir, '06-HANDOVER-REPORT.md')),
    readTextSafe(path.join(zdDir, 'memory', 'LOCKED-RULES.md')),
    readJsonSafe(path.join(zdDir, 'memory', 'REGRESSION-LEDGER.json'), { entries: [] }),
    readJsonSafe(path.join(zdDir, 'memory', 'DESIGN-TOKENS.json'), {}),
    readJsonSafe(path.join(zdDir, 'memory', 'COPY-STYLE.json'), {}),
    readJsonSafe(path.join(zdDir, 'memory', 'CHECKPOINTS.json'), { checkpoints: [] }),
    readJsonSafe(path.join(zdDir, 'DESIGN-SHOWCASE.json'), null),
    readJsonSafe(path.join(zdDir, 'studio-inbox.json'), { batches: [] }),
    readJsonSafe(path.join(zdDir, 'studio-outbox.json'), { submissions: [] }),
    loadLearnedSkills(zdDir),
    checkTokenDrift(absProject),
    checkMojibake(absProject),
    checkEnvParity(absProject),
    checkHardcodedSecrets(absProject),
    scanWorkspaceTree(absProject),
    pathExists(path.join(absProject, 'floorplan', 'index.html')),
    detectArchifyPlates(zdDir),
    generateHandoff(absProject, { writeFile: false }),
    buildCodeMap(absProject, { writeFile: false }),
  ]);

  const showcase = showcaseRaw || (await loadDefaultShowcaseTemplate());
  const projectName = extractField(stateMd, /\|\s*\*\*Project Name\*\*\s*\|\s*`?([^|\n`]+)`?/i, path.basename(absProject));
  const projectModeRaw = extractField(stateMd, /\|\s*\*\*Project Mode\*\*\s*\|\s*`?([^|\n`]+)`?/i, 'greenfield');
  const projectMode = projectModeRaw.split(/\s+/)[0] || 'greenfield';
  const stack = extractField(stateMd, /\|\s*\*\*Target Stack\*\*\s*\|\s*`?([^|\n`]+)`?/i, 'Pending Stage 2/3');
  const localeRaw = extractField(stateMd, /\|\s*\*\*Default Studio Locale\*\*\s*\|\s*`?([^|\n`]+)`?/i, copyStyle?.locales?.primary || 'en');
  const defaultLocale = localeRaw.toLowerCase().startsWith('ar') ? 'ar' : 'en';

  const pipeline = parsePipelineFromState(stateMd, briefMd);
  const contracts = parseContracts(contractsMd);
  const lockedRules = parseLockedRules(rulesMd);
  const sources = parseSources(researchMd);
  const security = parseSecurityAudit(secMd);

  const stageMap = new Map(pipeline.stages.map((s) => [s.code, s.status]));
  const verifyDone = stageMap.get('Stage 6A') === 'COMPLETED';
  const cmSum = codemap.summary;

  const scorecard = [
    { label: 'Typecheck (tsc)', status: verifyDone ? 'PASS' : 'PENDING', detail: verifyDone ? 'Exit 0 verified' : 'Runs in Stage 6A' },
    { label: 'Production Build', status: verifyDone ? 'PASS' : 'PENDING', detail: verifyDone ? 'Exit 0 verified' : 'Runs in Stage 6A' },
    {
      label: 'CodeMap Wiring',
      status: cmSum.brokenWireCount === 0 && cmSum.circularCount === 0 && cmSum.layerViolationCount === 0 ? 'PASS' : 'FAIL',
      detail: `${cmSum.totalNodes} nodes · ${cmSum.brokenWireCount} broken · ${cmSum.circularCount} cycles`,
    },
    {
      label: 'Security Audit',
      status: security.verdict === 'PASS' ? 'PASS' : security.p0 > 0 || security.p1 > 0 ? 'FAIL' : 'PENDING',
      detail: `P0: ${security.p0} | P1: ${security.p1}`,
    },
    {
      label: 'Token Drift Guard',
      status: tokenDrift.ok ? 'PASS' : 'FAIL',
      detail: tokenDrift.ok ? `${tokenDrift.filesScanned} file(s) clean` : `${tokenDrift.violations.length} violation(s)`,
    },
    {
      label: 'UTF-8 Mojibake',
      status: mojibake.ok ? 'PASS' : 'FAIL',
      detail: mojibake.ok ? `${mojibake.filesScanned} file(s) clean` : `${mojibake.violations.length} corrupted hit(s)`,
    },
    {
      label: '.env Parity',
      status: envParity.ok ? 'PASS' : 'FAIL',
      detail: envParity.ok ? `${envParity.referencedCount}/${envParity.documentedCount} synced` : `${envParity.violations.length} undocumented`,
    },
    {
      label: 'Secret Scanner',
      status: secrets.ok ? 'PASS' : 'FAIL',
      detail: secrets.ok ? `${secrets.filesScanned} file(s) clean` : `${secrets.violations.length} secret alert(s)`,
    },
  ];

  const checkpoints = (Array.isArray(checkpointsJson?.checkpoints) ? checkpointsJson.checkpoints : []).map((cp) => {
    const ref = cp.gitTag || cp.gitHead || 'HEAD';
    const branchSlug = `restore-${String(cp.id || 'cp').toLowerCase()}`;
    return {
      ...cp,
      rollbackCommand: cp.gitTag || cp.gitHead
        ? `git stash push -u -m "pre-rollback-${cp.id}" && git checkout -b ${branchSlug} ${ref}`
        : `echo "Checkpoint ${cp.id} has no git ref; restore from project backup"`,
    };
  });

  const data = {
    schemaVersion: '4.0.0',
    demoMode: false,
    defaultLocale,
    generatedAt: new Date().toISOString(),
    project: {
      name: projectName,
      mode: projectMode,
      stack,
      path: absProject,
    },
    pipeline,
    verification: {
      scorecard,
      scanners: { tokenDrift, mojibake, envParity, secrets },
    },
    inbox: inbox || { batches: [] },
    outbox: outbox || { submissions: [] },
    wiring: {
      hasFloorplan,
      archifyPlates,
      routes: contracts.routes,
      tables: contracts.tables,
      tree,
      codemap,
    },
    design: {
      tokens: designTokens || {},
      copyStyle: copyStyle || {},
      showcase,
      driftViolations: tokenDrift.violations || [],
    },
    memory: {
      lockedRules,
      regressions: Array.isArray(regLedger?.entries) ? regLedger.entries : [],
      learnedSkills,
      checkpoints,
    },
    handoff: {
      lineCount: handoff.lineCount,
      resumePrompt: handoff.resumePrompt,
    },
    hub: {
      sources,
      security,
      handoverMarkdown: handoverMd,
    },
  };

  if (writeFile && (await pathExists(zdDir))) {
    await fs.writeFile(path.join(zdDir, 'studio-data.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  }

  return data;
}

export async function renderPortableHtmlFromData(data, outPath) {
  const studioDir = await resolveStudioAssetDir();
  const [html, css, js] = await Promise.all([
    fs.readFile(path.join(studioDir, 'index.html'), 'utf8'),
    fs.readFile(path.join(studioDir, 'styles.css'), 'utf8'),
    fs.readFile(path.join(studioDir, 'app.js'), 'utf8'),
  ]);

  const safeJson = JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>');
  const bundled = html
    .replace('<link rel="stylesheet" href="./styles.css" />', `<style>\n${css}\n</style>`)
    .replace(
      '<script src="./app.js"></script>',
      `<script>window.__ZERODRIFT_DATA__ = ${safeJson};</script>\n<script>\n${js}\n</script>`
    );

  const finalOut = path.resolve(outPath);
  await fs.mkdir(path.dirname(finalOut), { recursive: true });
  await fs.writeFile(finalOut, bundled, 'utf8');
  return { outPath: finalOut, sizeBytes: Buffer.byteLength(bundled, 'utf8') };
}

export async function exportPortableStudio(projectDir, outPath = null) {
  const absProject = path.resolve(projectDir);
  const data = await buildStudioData(absProject, { writeFile: true });
  const finalOut = outPath ? path.resolve(outPath) : path.join(absProject, 'zerodrift-report.html');
  return renderPortableHtmlFromData(data, finalOut);
}

function parseCliArgs(argv) {
  const args = { project: process.cwd(), exportFlag: false, exportPath: null, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
    else if (t === '--export') {
      args.exportFlag = true;
      if (argv[i + 1] && !argv[i + 1].startsWith('-')) {
        args.exportPath = path.resolve(argv[++i]);
      }
    }
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseCliArgs(process.argv.slice(2));
    if (args.help) {
      console.log('Usage: node scripts/build-studio.mjs --project <dir> [--export [output.html]]');
      process.exit(0);
    }
    if (args.exportFlag) {
      const res = await exportPortableStudio(args.project, args.exportPath);
      console.log(`ZeroDrift portable report exported: ${res.outPath} (${res.sizeBytes} bytes)`);
    } else {
      const data = await buildStudioData(args.project, { writeFile: true });
      console.log(`ZeroDrift Studio snapshot refreshed for "${data.project.name}" (.zerodrift/studio-data.json)`);
    }
  } catch (err) {
    console.error(`[ZeroDrift Build Studio Error] ${err.message}`);
    process.exit(1);
  }
}
