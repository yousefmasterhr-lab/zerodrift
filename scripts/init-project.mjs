#!/usr/bin/env node
/**
 * ZeroDrift v2.0 Project Initializer (Zero-Dependency Node.js 18+ ESM)
 * Safely scaffolds `.zerodrift/` lifecycle templates, `.zerodrift/memory/` Living Memory vault,
 * `.zerodrift/learned-skills/`, Studio inbox/outbox + portable launcher, IDE adapter(s),
 * and `.gitignore` hygiene inside any empty or existing directory without overwriting source code.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const TEMPLATE_FILES = [
  'STATE.md',
  '00-BRIEF.md',
  '01-PRD.md',
  '02-RESEARCH-SOURCES.md',
  '02B-REVERSE-ANALYSIS.md',
  '03-ARCHITECTURE.md',
  'CONTRACTS.md',
  '04-DESIGN-SYSTEM.md',
  '05-TASKS.md',
  '05-SECURITY-AUDIT.md',
  '06-HANDOVER-REPORT.md',
  'CHANGE-REQUEST.md',
  'DESIGN-SHOWCASE.json',
];

const MEMORY_TEMPLATE_FILES = [
  'LOCKED-RULES.md',
  'REGRESSION-LEDGER.json',
  'DESIGN-TOKENS.json',
  'COPY-STYLE.json',
  'CHECKPOINTS.json',
  'PROMPTS-AND-DECISIONS.md',
];

const ADAPTER_MAP = {
  antigravity: [
    { src: 'adapters/GEMINI.md', dest: 'GEMINI.md' },
    { src: 'AGENTS.md', dest: 'AGENTS.md' },
  ],
  claude: [{ src: 'adapters/CLAUDE.md', dest: 'CLAUDE.md' }],
  codex: [
    { src: 'adapters/CODEX.md', dest: 'CODEX.md' },
    { src: 'AGENTS.md', dest: 'AGENTS.md' },
  ],
  cursor: [{ src: 'adapters/cursor.mdc', dest: '.cursor/rules/zerodrift.mdc' }],
  copilot: [{ src: 'adapters/copilot-instructions.md', dest: '.github/copilot-instructions.md' }],
};

const GITIGNORE_ENTRIES = [
  '# ZeroDrift local generated maps & transient Studio runtime files',
  'floorplan/',
  '.understand-anything/intermediate/',
  '.understand-anything/diff-overlay.json',
  '.zerodrift/.studio.pid',
  '.zerodrift/studio-data.json',
];

function printHelp() {
  console.log(`ZeroDrift v2.0 Project Initializer

Usage:
  node scripts/init-project.mjs [options]

Options:
  --target <dir>       Target project directory (default: current working directory)
  --mode <mode>        Project mode: greenfield | brownfield (auto-detected if omitted)
  --adapter <name>     IDE adapter: antigravity | claude | codex | cursor | copilot | all | none (default: antigravity)
  --name <name>        Project display name (default: target directory basename)
  --lang <en|ar>       Default ZeroDrift Studio UI language (default: en)
  --force              Overwrite existing .zerodrift/ templates or adapter files
  --help, -h           Show this help message
`);
}

function parseArgs(argv) {
  const args = {
    target: process.cwd(),
    mode: null,
    adapter: 'antigravity',
    name: null,
    lang: 'en',
    force: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
    } else if (token === '--force') {
      args.force = true;
    } else if (token === '--target' && argv[i + 1]) {
      args.target = path.resolve(argv[++i]);
    } else if (token === '--mode' && argv[i + 1]) {
      args.mode = argv[++i].toLowerCase();
    } else if (token === '--adapter' && argv[i + 1]) {
      args.adapter = argv[++i].toLowerCase();
    } else if (token === '--name' && argv[i + 1]) {
      args.name = argv[++i];
    } else if (token === '--lang' && argv[i + 1]) {
      args.lang = argv[++i].toLowerCase();
    } else {
      throw new Error(`Unknown or incomplete argument: ${token}`);
    }
  }

  if (!['en', 'ar'].includes(args.lang)) {
    throw new Error(`Invalid --lang "${args.lang}". Expected "en" or "ar".`);
  }

  if (args.mode && !['greenfield', 'brownfield'].includes(args.mode)) {
    throw new Error(`Invalid --mode "${args.mode}". Expected "greenfield" or "brownfield".`);
  }

  const validAdapters = [...Object.keys(ADAPTER_MAP), 'all', 'none'];
  if (!validAdapters.includes(args.adapter)) {
    throw new Error(`Invalid --adapter "${args.adapter}". Expected one of: ${validAdapters.join(', ')}.`);
  }

  return args;
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveAssetPath(relativePath) {
  const candidates = [
    path.join(REPO_ROOT, relativePath),
    path.join(REPO_ROOT, 'references', relativePath),
  ];
  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Required ZeroDrift asset not found: ${relativePath}`);
}

async function detectMode(targetDir) {
  if (!(await pathExists(targetDir))) {
    return 'greenfield';
  }
  const entries = await fs.readdir(targetDir);
  const meaningful = entries.filter(
    (entry) => !['.git', '.gitignore', '.zerodrift', '.DS_Store', 'Thumbs.db'].includes(entry)
  );
  return meaningful.length > 0 ? 'brownfield' : 'greenfield';
}

async function writeSafe(destPath, content, force, report) {
  const exists = await pathExists(destPath);
  if (exists && !force) {
    report.skipped.push(destPath);
    return;
  }
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, content, 'utf8');
  if (exists) {
    report.overwritten.push(destPath);
  } else {
    report.created.push(destPath);
  }
}

async function updateGitignore(targetDir, report) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  const existing = (await pathExists(gitignorePath))
    ? await fs.readFile(gitignorePath, 'utf8')
    : '';
  const existingLines = new Set(existing.split(/\r?\n/).map((line) => line.trim()));

  const missingEntries = GITIGNORE_ENTRIES.filter((entry) => !existingLines.has(entry));
  if (missingEntries.length === 0) {
    report.skipped.push(gitignorePath);
    return;
  }

  const prefix = existing.length > 0 && !existing.endsWith('\n') ? '\n\n' : existing.length > 0 ? '\n' : '';
  const updated = `${existing}${prefix}${missingEntries.join('\n')}\n`;
  await fs.writeFile(gitignorePath, updated, 'utf8');
  if (existing.length > 0) {
    report.updated.push(gitignorePath);
  } else {
    report.created.push(gitignorePath);
  }
}

function buildPortableLauncherScript() {
  return `#!/usr/bin/env node
/**
 * Portable ZeroDrift Studio Launcher for this project.
 * Resolves the globally installed ZeroDrift studio-server.mjs (Antigravity, Claude, or Codex)
 * and launches Mission Control pointed at this workspace.
 */
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..');

const candidates = [
  path.join(os.homedir(), '.gemini', 'config', 'skills', 'zerodrift', 'scripts', 'studio-server.mjs'),
  path.join(os.homedir(), '.claude', 'skills', 'zerodrift', 'scripts', 'studio-server.mjs'),
  path.join(os.homedir(), '.codex', 'skills', 'zerodrift', 'scripts', 'studio-server.mjs'),
  path.join(os.homedir(), '.zerodrift-os', 'scripts', 'studio-server.mjs'),
];

const serverScript = candidates.find((p) => fs.existsSync(p));
if (!serverScript) {
  console.error('ZeroDrift Studio server not found in global skills. Run install-global.ps1 or install-global.sh from your zerodrift repo.');
  process.exit(1);
}

const child = spawn(process.execPath, [serverScript, '--project', projectDir, ...process.argv.slice(2)], {
  stdio: 'inherit',
});
child.on('exit', (code) => process.exit(code ?? 0));
`;
}

export async function initProject(options) {
  const targetDir = path.resolve(options.target || process.cwd());
  await fs.mkdir(targetDir, { recursive: true });

  const detectedMode = options.mode || (await detectMode(targetDir));
  const projectName = options.name || path.basename(targetDir);
  const defaultLocale = options.lang === 'ar' ? 'ar' : 'en';
  const today = new Date().toISOString().slice(0, 10);

  const report = {
    targetDir,
    projectName,
    mode: detectedMode,
    defaultLocale,
    adapter: options.adapter || 'antigravity',
    created: [],
    updated: [],
    overwritten: [],
    skipped: [],
  };

  // 1. Scaffold `.zerodrift/` lifecycle templates
  const zerodriftDir = path.join(targetDir, '.zerodrift');
  await fs.mkdir(zerodriftDir, { recursive: true });

  for (const fileName of TEMPLATE_FILES) {
    const srcPath = await resolveAssetPath(path.join('templates', fileName));
    const raw = await fs.readFile(srcPath, 'utf8');
    const rendered = raw
      .replaceAll('{{PROJECT_NAME}}', projectName)
      .replaceAll('{{PROJECT_MODE}}', detectedMode)
      .replaceAll('{{DEFAULT_LOCALE}}', defaultLocale)
      .replaceAll('{{DATE}}', today);

    await writeSafe(path.join(zerodriftDir, fileName), rendered, Boolean(options.force), report);
  }

  // 2. Scaffold `.zerodrift/memory/` Living Memory Vault & `.zerodrift/learned-skills/`
  const memoryDir = path.join(zerodriftDir, 'memory');
  const learnedDir = path.join(zerodriftDir, 'learned-skills');
  await fs.mkdir(memoryDir, { recursive: true });
  await fs.mkdir(learnedDir, { recursive: true });

  for (const fileName of MEMORY_TEMPLATE_FILES) {
    const srcPath = await resolveAssetPath(path.join('templates', 'memory', fileName));
    const raw = await fs.readFile(srcPath, 'utf8');
    const rendered = raw
      .replaceAll('{{PROJECT_NAME}}', projectName)
      .replaceAll('{{PROJECT_MODE}}', detectedMode)
      .replaceAll('{{DATE}}', today);

    await writeSafe(path.join(memoryDir, fileName), rendered, Boolean(options.force), report);
  }

  await writeSafe(
    path.join(learnedDir, 'README.md'),
    `# Learned Project Skills\n\nAuto-evolving, verified English playbooks distilled from solved domain challenges in \`${projectName}\`.\n`,
    Boolean(options.force),
    report
  );

  // 3. Initialize ZeroDrift Studio Inbox / Outbox & Portable Launcher
  await writeSafe(
    path.join(zerodriftDir, 'studio-inbox.json'),
    `${JSON.stringify({ schemaVersion: '2.0.0', projectName, updatedAt: today, batches: [] }, null, 2)}\n`,
    Boolean(options.force),
    report
  );
  await writeSafe(
    path.join(zerodriftDir, 'studio-outbox.json'),
    `${JSON.stringify({ schemaVersion: '2.0.0', projectName, updatedAt: today, submissions: [] }, null, 2)}\n`,
    Boolean(options.force),
    report
  );
  await writeSafe(
    path.join(zerodriftDir, 'launch-studio.mjs'),
    buildPortableLauncherScript(),
    Boolean(options.force),
    report
  );

  // 4. Install selected IDE adapter(s)
  const selectedAdapter = options.adapter || 'antigravity';
  if (selectedAdapter !== 'none') {
    const adapterKeys = selectedAdapter === 'all' ? Object.keys(ADAPTER_MAP) : [selectedAdapter];
    const seenDest = new Set();

    for (const key of adapterKeys) {
      for (const mapping of ADAPTER_MAP[key]) {
        if (seenDest.has(mapping.dest)) continue;
        seenDest.add(mapping.dest);

        const srcPath = await resolveAssetPath(mapping.src);
        const content = await fs.readFile(srcPath, 'utf8');
        await writeSafe(path.join(targetDir, mapping.dest), content, Boolean(options.force), report);
      }
    }
  }

  // 5. Ensure `.gitignore` contains ZeroDrift local-map & Studio hygiene rules
  await updateGitignore(targetDir, report);

  return report;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      printHelp();
      process.exit(0);
    }

    const result = await initProject(args);
    console.log('ZeroDrift v2.0 initialized successfully.');
    console.log(`  Target:   ${result.targetDir}`);
    console.log(`  Project:  ${result.projectName}`);
    console.log(`  Mode:     ${result.mode}`);
    console.log(`  Adapter:  ${result.adapter}`);
    console.log(`  Created:  ${result.created.length} file(s)`);
    if (result.updated.length > 0) console.log(`  Updated:  ${result.updated.length} file(s)`);
    if (result.overwritten.length > 0) console.log(`  Replaced: ${result.overwritten.length} file(s)`);
    if (result.skipped.length > 0) console.log(`  Skipped:  ${result.skipped.length} existing file(s) (use --force to overwrite)`);
    console.log('\nNext steps:');
    console.log('  1. Launch Mission Control: node .zerodrift/launch-studio.mjs');
    console.log('  2. Open your AI agent and run /zerodrift (or Stage 1: zerodrift-intake).');
  } catch (err) {
    console.error(`[ZeroDrift Init Error] ${err.message}`);
    process.exit(1);
  }
}
