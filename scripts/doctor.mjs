#!/usr/bin/env node
/**
 * ZeroDrift v4.0 Self-Diagnostics CLI (Zero-Dependency Node.js 18+ ESM)
 * Validates all 12 SKILL.md files, 10 core laws, 13 stage templates, 7 memory templates,
 * 6 adapters, llms.txt, BOOTSTRAP.md, Studio assets, live demo, all scripts, and local tooling.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

export const EXPECTED_SKILLS = [
  'zerodrift',
  'zerodrift-intake',
  'zerodrift-research',
  'zerodrift-reverse',
  'zerodrift-architect',
  'zerodrift-design',
  'zerodrift-build',
  'zerodrift-verify',
  'zerodrift-security',
  'zerodrift-handover',
  'zerodrift-memory',
  'zerodrift-codemap',
];

export const REQUIRED_SKILL_SECTIONS = [
  '## Purpose & Triggers',
  '## Core Laws Referenced',
  '## Execution Algorithm (Step-by-Step)',
  '## Adaptive Intelligence Rules',
  '## Hard Gate / Stop Criteria',
  '## Output Contract',
  '## Tool Integrations',
];

export const EXPECTED_CORE_FILES = [
  'anti-hallucination.md',
  'state-machine.md',
  'challenger-mindset.md',
  'security-baseline.md',
  'wiring-discipline.md',
  'design-excellence.md',
  'memory-and-regression.md',
  'change-control.md',
  'data-safety.md',
  'concise-chat.md',
];

export const EXPECTED_TEMPLATE_FILES = [
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

export const EXPECTED_MEMORY_TEMPLATES = [
  'LOCKED-RULES.md',
  'REGRESSION-LEDGER.json',
  'DESIGN-TOKENS.json',
  'COPY-STYLE.json',
  'CHECKPOINTS.json',
  'PROMPTS-AND-DECISIONS.md',
  'LEARNED-SKILL-TEMPLATE.md',
];

export const EXPECTED_ADAPTER_FILES = [
  'GEMINI.md',
  'CLAUDE.md',
  'CODEX.md',
  'cursor.mdc',
  'copilot-instructions.md',
  'WEB-CHAT-MASTER.md',
];

const EXPECTED_STUDIO_ASSETS = ['index.html', 'styles.css', 'app.js'];
const EXPECTED_DEMO_ASSETS = ['docs/demo/index.html', 'docs/index.html'];
const EXPECTED_ROOT_FILES = ['AGENTS.md', 'README.md', 'LICENSE', 'package.json', '.gitignore', 'llms.txt', 'BOOTSTRAP.md'];
const EXPECTED_MJS_SCRIPTS = [
  'init-project.mjs',
  'doctor.mjs',
  'validate-project.mjs',
  'build-studio.mjs',
  'studio-server.mjs',
  'wait-for-studio.mjs',
  'checkpoint.mjs',
  'handoff.mjs',
  'build-demo.mjs',
  'code-map.mjs',
];
const EXPECTED_SHELL_SCRIPTS = ['install-global.ps1', 'install-global.sh'];

const PLACEHOLDER_REGEX = /\b(TODO|TBD|FIXME|XXX)\b/;

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export function parseYamlFrontmatter(content) {
  const normalized = content.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;

  const fields = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    fields[key] = val;
  }
  return fields;
}

function probeBinary(binName, args = ['--version']) {
  try {
    const out = execFileSync(binName, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 3000,
    });
    return { installed: true, detail: out.trim().split(/\r?\n/)[0] || 'detected' };
  } catch {
    return { installed: false, detail: 'not found on PATH' };
  }
}

async function detectGlobalSkills() {
  const skillsRoot = path.join(os.homedir(), '.gemini', 'config', 'skills');
  if (!(await pathExists(skillsRoot))) {
    return { skillsRoot, exists: false, floorplan: false, archify: false, understandCount: 0, zerodriftCount: 0 };
  }
  const entries = await fs.readdir(skillsRoot, { withFileTypes: true });
  const dirs = [];
  for (const entry of entries) {
    if (entry.isDirectory() || entry.isSymbolicLink()) {
      dirs.push(entry.name);
    }
  }
  return {
    skillsRoot,
    exists: true,
    floorplan: dirs.includes('floorplan'),
    archify: dirs.includes('archify'),
    understandCount: dirs.filter((d) => d.startsWith('understand')).length,
    zerodriftCount: dirs.filter((d) => d === 'zerodrift' || d.startsWith('zerodrift-')).length,
  };
}

export async function runDoctor(repoRoot = REPO_ROOT) {
  const errors = [];
  const warnings = [];
  const checks = [];

  const record = (name, ok, detail) => {
    checks.push({ name, status: ok ? 'PASS' : 'FAIL', detail });
    if (!ok) errors.push(`${name}: ${detail}`);
  };

  // 1. Root files (including llms.txt & BOOTSTRAP.md)
  for (const file of EXPECTED_ROOT_FILES) {
    const full = path.join(repoRoot, file);
    if (!(await pathExists(full))) {
      record(`root/${file}`, false, 'Missing required root file');
      continue;
    }
    const stat = await fs.stat(full);
    record(`root/${file}`, stat.size > 0, `${stat.size} bytes`);
  }

  // 2. Core protocols (7)
  for (const file of EXPECTED_CORE_FILES) {
    const full = path.join(repoRoot, 'core', file);
    if (!(await pathExists(full))) {
      record(`core/${file}`, false, 'Missing core protocol file');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    const hasPlaceholder = PLACEHOLDER_REGEX.test(content);
    record(
      `core/${file}`,
      content.trim().length >= 400 && !hasPlaceholder,
      hasPlaceholder ? 'Contains forbidden TODO/TBD placeholder' : `${content.length} chars`
    );
  }

  // 3. Stage Templates (11)
  for (const file of EXPECTED_TEMPLATE_FILES) {
    const full = path.join(repoRoot, 'templates', file);
    if (!(await pathExists(full))) {
      record(`templates/${file}`, false, 'Missing template file');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    const hasPlaceholder = PLACEHOLDER_REGEX.test(content);
    record(
      `templates/${file}`,
      content.trim().length >= 300 && !hasPlaceholder,
      hasPlaceholder ? 'Contains forbidden TODO/TBD stub' : `${content.length} chars`
    );
  }

  // 4. Living Memory Templates (5)
  for (const file of EXPECTED_MEMORY_TEMPLATES) {
    const full = path.join(repoRoot, 'templates', 'memory', file);
    if (!(await pathExists(full))) {
      record(`templates/memory/${file}`, false, 'Missing memory template');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    let ok = content.trim().length >= 60 && !PLACEHOLDER_REGEX.test(content);
    let detail = `${content.length} chars`;
    if (file.endsWith('.json')) {
      try {
        JSON.parse(content);
        detail = `Valid JSON (${content.length} chars)`;
      } catch (err) {
        ok = false;
        detail = `Invalid JSON: ${err.message}`;
      }
    }
    record(`templates/memory/${file}`, ok, detail);
  }

  // 5. Adapters (6)
  for (const file of EXPECTED_ADAPTER_FILES) {
    const full = path.join(repoRoot, 'adapters', file);
    if (!(await pathExists(full))) {
      record(`adapters/${file}`, false, 'Missing adapter file');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    const hasPlaceholder = PLACEHOLDER_REGEX.test(content);
    record(
      `adapters/${file}`,
      content.trim().length >= 300 && !hasPlaceholder,
      hasPlaceholder ? 'Contains forbidden TODO/TBD stub' : `${content.length} chars`
    );
  }

  // ZeroDrift Studio UI assets
  for (const file of EXPECTED_STUDIO_ASSETS) {
    const full = path.join(repoRoot, 'studio', file);
    if (!(await pathExists(full))) {
      record(`studio/${file}`, false, 'Missing Studio UI asset');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    let ok = content.trim().length >= 500;
    let detail = `${content.length} chars`;
    if (file.endsWith('.js')) {
      try {
        execFileSync(process.execPath, ['--check', full], { stdio: 'pipe' });
        detail = `Syntax OK (${content.length} chars)`;
      } catch (err) {
        ok = false;
        detail = `JS syntax error: ${err.message}`;
      }
    }
    record(`studio/${file}`, ok, detail);
  }

  // GitHub Pages interactive demo assets
  for (const rel of EXPECTED_DEMO_ASSETS) {
    const full = path.join(repoRoot, rel);
    if (!(await pathExists(full))) {
      record(rel, false, 'Missing GitHub Pages live demo file (run node scripts/build-demo.mjs)');
      continue;
    }
    const content = await fs.readFile(full, 'utf8');
    const ok = rel.endsWith('demo/index.html')
      ? content.includes('window.__ZERODRIFT_DATA__') && !content.includes('{{FILL:')
      : content.includes('./demo/');
    record(rel, ok, ok ? `Verified (${content.length} chars)` : 'Incomplete demo bundle or unresolved tokens');
  }

  // CLI scripts (node --check) and shell installers
  for (const file of EXPECTED_MJS_SCRIPTS) {
    const full = path.join(repoRoot, 'scripts', file);
    if (!(await pathExists(full))) {
      record(`scripts/${file}`, false, 'Missing script');
      continue;
    }
    try {
      execFileSync(process.execPath, ['--check', full], { stdio: 'pipe' });
      record(`scripts/${file}`, true, 'Syntax OK (node --check)');
    } catch (err) {
      record(`scripts/${file}`, false, `Syntax error: ${err.message}`);
    }
  }
  for (const file of EXPECTED_SHELL_SCRIPTS) {
    const full = path.join(repoRoot, 'scripts', file);
    const exists = await pathExists(full);
    record(`scripts/${file}`, exists, exists ? 'Present' : 'Missing installer');
  }

  // One-level SKILL.md manifests and internal references
  for (const skillName of EXPECTED_SKILLS) {
    const skillPath = path.join(repoRoot, 'skills', skillName, 'SKILL.md');
    if (!(await pathExists(skillPath))) {
      record(`skills/${skillName}`, false, 'Missing SKILL.md');
      continue;
    }
    const content = await fs.readFile(skillPath, 'utf8');
    const fm = parseYamlFrontmatter(content);
    const issues = [];

    if (!fm) {
      issues.push('Missing or invalid YAML frontmatter');
    } else {
      if (fm.name !== skillName) {
        issues.push(`Frontmatter name "${fm.name || ''}" does not match directory "${skillName}"`);
      }
      if (!fm.description || fm.description.length < 40) {
        issues.push('Frontmatter description missing or too short (< 40 chars)');
      }
    }

    for (const section of REQUIRED_SKILL_SECTIONS) {
      if (!content.includes(section)) {
        issues.push(`Missing required section "${section}"`);
      }
    }

    if (PLACEHOLDER_REGEX.test(content)) {
      issues.push('Contains forbidden TODO/TBD/FIXME placeholder');
    }

    const refMatches = content.matchAll(/\b(core|templates)\/([A-Za-z0-9._/-]+\.(?:md|json))\b/g);
    for (const m of refMatches) {
      const refRel = `${m[1]}/${m[2]}`;
      const refAbs = path.join(repoRoot, refRel);
      if (!(await pathExists(refAbs))) {
        issues.push(`Broken internal reference: ${refRel}`);
      }
    }

    record(
      `skills/${skillName}`,
      issues.length === 0,
      issues.length === 0 ? 'Frontmatter, 7 sections & refs valid' : issues.join('; ')
    );
  }

  // 9. Verify strict one-level depth inside skills/
  const skillsDirEntries = await fs.readdir(path.join(repoRoot, 'skills'), { withFileTypes: true });
  const unexpectedSkillDirs = skillsDirEntries
    .filter((d) => d.isDirectory() && !EXPECTED_SKILLS.includes(d.name))
    .map((d) => d.name);
  record(
    'skills/one-level-structure',
    unexpectedSkillDirs.length === 0,
    unexpectedSkillDirs.length === 0
      ? `Exact ${EXPECTED_SKILLS.length} one-level skill directories verified`
      : `Unexpected directories: ${unexpectedSkillDirs.join(', ')}`
  );

  const toolchain = {
    node: probeBinary('node', ['--version']),
    git: probeBinary('git', ['--version']),
    agy: probeBinary(process.platform === 'win32' ? 'agy.cmd' : 'agy', ['--version']),
    knip: probeBinary(process.platform === 'win32' ? 'knip.cmd' : 'knip', ['--version']),
    depcruise: probeBinary(process.platform === 'win32' ? 'depcruise.cmd' : 'depcruise', ['--version']),
    globalSkills: await detectGlobalSkills(),
  };

  if (!toolchain.node.installed) {
    warnings.push('Node.js binary not detected on PATH');
  }

  return {
    ok: errors.length === 0,
    summary: {
      totalChecks: checks.length,
      passed: checks.filter((c) => c.status === 'PASS').length,
      failed: errors.length,
      warnings: warnings.length,
    },
    checks,
    errors,
    warnings,
    toolchain,
  };
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  const jsonMode = process.argv.includes('--json');
  const result = await runDoctor(REPO_ROOT);

  if (jsonMode) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('=== ZeroDrift v4.0 Self-Diagnostics (doctor.mjs) ===\n');
    for (const check of result.checks) {
      const tag = check.status === 'PASS' ? '[PASS]' : '[FAIL]';
      console.log(`${tag} ${check.name.padEnd(40)} ${check.detail}`);
    }

    console.log('\n--- Local Toolchain & Ecosystem Detection (Informational) ---');
    console.log(`  node:             ${result.toolchain.node.detail}`);
    console.log(`  git:              ${result.toolchain.git.detail}`);
    console.log(`  agy:              ${result.toolchain.agy.detail}`);
    console.log(`  knip:             ${result.toolchain.knip.detail}`);
    console.log(`  depcruise:        ${result.toolchain.depcruise.detail}`);
    const gs = result.toolchain.globalSkills;
    console.log(
      `  global skills:    floorplan=${gs.floorplan}, archify=${gs.archify}, understand*=${gs.understandCount}, zerodrift*=${gs.zerodriftCount}`
    );

    console.log(
      `\nResult: ${result.ok ? 'PASS' : 'FAIL'} (${result.summary.passed}/${result.summary.totalChecks} checks passed)`
    );
  }

  process.exit(result.ok ? 0 : 1);
}
