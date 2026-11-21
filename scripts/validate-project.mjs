#!/usr/bin/env node
/**
 * ZeroDrift v3.0 Project Gate & Deterministic Security/Quality Scanner (Zero-Dep Node.js 18+ ESM)
 * Deterministically inspects `<target>/.zerodrift/` and project source files for:
 *  - STATE.md integrity & gate readiness (Gates 1, 2, 3, 4, 6, 7)
 *  - CONTRACTS.md completeness & 05-SECURITY-AUDIT.md P0/P1 sign-off
 *  - Living Memory JSON schemas (REGRESSION-LEDGER, DESIGN-TOKENS, COPY-STYLE, CHECKPOINTS)
 *  - Color Token Drift against DESIGN-TOKENS.json
 *  - UTF-8 Mojibake corruption scanner (double-encoded Arabic/Latin + U+FFFD)
 *  - .env.example Parity scanner (undocumented process.env / import.meta.env references)
 *  - High-confidence Hardcoded Secret scanner
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const VALID_STAGE_STATUSES = new Set([
  'PENDING',
  'IN_PROGRESS',
  'BLOCKED',
  'APPROVED',
  'COMPLETED',
  'SKIPPED',
]);

const STAGE_ARTIFACT_MAP = [
  { stageKey: 'Stage 1', gate: 1, files: ['00-BRIEF.md', '01-PRD.md'] },
  { stageKey: 'Stage 2A', gate: 2, files: ['02-RESEARCH-SOURCES.md'] },
  { stageKey: 'Stage 2B', gate: 2, files: ['02B-REVERSE-ANALYSIS.md'], optional: true },
  { stageKey: 'Stage 3', gate: 3, files: ['03-ARCHITECTURE.md', 'CONTRACTS.md', '05-TASKS.md'] },
  { stageKey: 'Stage 4', gate: 4, files: ['04-DESIGN-SYSTEM.md'], optional: true },
  { stageKey: 'Stage 6B', gate: 6, files: ['05-SECURITY-AUDIT.md'] },
  { stageKey: 'Stage 7', gate: 7, files: ['06-HANDOVER-REPORT.md'] },
];

const UNRESOLVED_TOKEN_REGEX = /\{\{(FILL:[^}]*|PROJECT_NAME|PROJECT_MODE|DATE)\}\}/g;

const REQUIRED_CONTRACT_SECTIONS = [
  '## 1. Environment Variables Contract',
  '## 2. HTTP API Route Registry',
  '## 3. Shared Data Transfer Objects',
  '## 4. Database Schema, Constraints & Indexes',
  '## 5. Contract Amendments Log',
];

const SCAN_IGNORE_DIRS = new Set([
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

const TOKEN_SCAN_EXTENSIONS = new Set(['.css', '.scss', '.sass', '.less', '.tsx', '.jsx', '.ts', '.js', '.mjs', '.html', '.vue', '.svelte']);
const MOJIBAKE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.html', '.css', '.json', '.md']);
const CODE_SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

// Unicode-escaped mojibake patterns (double-encoded UTF-8 Arabic & Latin + U+FFFD replacement char)
const MOJIBAKE_REGEX = new RegExp(
  [
    '\\uFFFD',
    '\\u00D8[\\u00A1-\\u00BA]',
    '\\u00D9[\\u0080-\\u008A]',
    '\\u00C3[\\u00A0-\\u00BF]',
    '\\u00E2\\u20AC[\\u2122\\u0153\\u009D\\u2013\\u2014]',
  ].join('|')
);

const BUILTIN_ENV_VARS = new Set([
  'NODE_ENV',
  'PWD',
  'HOME',
  'USERPROFILE',
  'PATH',
  'CI',
  'TZ',
  'DEBUG',
  'MODE',
  'DEV',
  'PROD',
  'SSR',
  'BASE_URL',
  'TERM',
  'TEMP',
  'TMP',
]);

const SECRET_PATTERNS = [
  { label: 'Private Key PEM Block', regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { label: 'AWS Access Key ID', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { label: 'GitHub Personal Access Token', regex: /\bgh[pousr]_[A-Za-z0-9]{36}\b/ },
  { label: 'Stripe Secret Key', regex: /\bsk_(?:live|test)_[0-9A-Za-z]{20,}\b/ },
  { label: 'OpenAI API Key', regex: /\bsk-(?:proj-)?[A-Za-z0-9]{24,}\b/ },
  { label: 'Slack API Token', regex: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/ },
  {
    label: 'Hardcoded Password Literal',
    regex: /\b(?:password|dbPassword|db_password|secretKey|apiSecret)\s*[:=]\s*['"](?!changeme|your[_-]|example|placeholder|test|dummy|\$\{)[^'"\s]{6,}['"]/i,
  },
];

function normalizeHex(hex) {
  const upper = hex.toUpperCase();
  if (upper.length === 4) {
    return `#${upper[1]}${upper[1]}${upper[2]}${upper[2]}${upper[3]}${upper[3]}`;
  }
  return upper;
}

function printHelp() {
  console.log(`ZeroDrift v3.0 Project Gate & Deterministic Security/Quality Scanner

Usage:
  node scripts/validate-project.mjs [--target <dir>] [--gate <1|2|3|4|6|7>] [--json]

Options:
  --target <dir>   Target project directory containing .zerodrift/ (default: cwd)
  --gate <num>     Require readiness up through Gate N (1, 2, 3, 4, 6, or 7)
  --json           Output machine-readable JSON report
  --help, -h       Show this help message
`);
}

function parseArgs(argv) {
  const args = { target: process.cwd(), gate: null, json: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--json') args.json = true;
    else if (token === '--target' && argv[i + 1]) args.target = path.resolve(argv[++i]);
    else if (token === '--gate' && argv[i + 1]) {
      args.gate = Number(argv[++i]);
      if (![1, 2, 3, 4, 6, 7].includes(args.gate)) {
        throw new Error(`Invalid --gate "${args.gate}". Valid gates: 1, 2, 3, 4, 6, 7.`);
      }
    } else if (!token.startsWith('-')) {
      args.target = path.resolve(token);
    } else {
      throw new Error(`Unknown or incomplete argument: ${token}`);
    }
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

function findUnresolvedTokens(content) {
  return [...content.matchAll(UNRESOLVED_TOKEN_REGEX)].map((m) => m[0]);
}

function parseStageStatuses(stateContent) {
  const statuses = new Map();
  for (const line of stateContent.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;
    const stageCell = cells[0].replace(/\*\*/g, '');
    const statusCell = cells[2].replace(/`/g, '').trim();
    const stageMatch = stageCell.match(/^(Stage\s+\d+[AB]?)/i);
    if (stageMatch) statuses.set(stageMatch[1], statusCell);
  }
  return statuses;
}

function validateContractsContent(content) {
  const issues = [];
  for (const heading of REQUIRED_CONTRACT_SECTIONS) {
    if (!content.includes(heading)) issues.push(`CONTRACTS.md missing required section: "${heading}"`);
  }
  const unresolved = findUnresolvedTokens(content);
  if (unresolved.length > 0) {
    issues.push(`CONTRACTS.md has ${unresolved.length} unresolved placeholder(s): ${unresolved.slice(0, 3).join(', ')}`);
  }

  let inRouteSection = false;
  let routeRowsChecked = 0;
  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith('## 2. HTTP API Route Registry')) {
      inRouteSection = true;
      continue;
    }
    if (inRouteSection && line.startsWith('## ')) break;
    if (!inRouteSection || !line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 6) continue;
    if (cells[0].startsWith('Route ID') || cells[0].startsWith(':---') || cells[0].startsWith('---')) continue;
    routeRowsChecked += 1;
    const authCell = cells[3].replace(/`/g, '').trim();
    if (!authCell || authCell === '-' || authCell.includes('{{')) {
      issues.push(`CONTRACTS.md route "${cells[0]}" has missing or placeholder Auth & RBAC policy`);
    }
  }
  if (routeRowsChecked === 0) issues.push('CONTRACTS.md has zero registered API routes in Section 2');
  return issues;
}

function validateSecurityAuditContent(content) {
  const issues = [];
  const unresolved = findUnresolvedTokens(content);
  if (unresolved.length > 0) issues.push(`05-SECURITY-AUDIT.md has ${unresolved.length} unresolved placeholder(s)`);
  if (!/Unresolved P0 Findings:\*\*\s*`?0`?/i.test(content)) issues.push('05-SECURITY-AUDIT.md does not verify "Unresolved P0 Findings: 0"');
  if (!/Unresolved P1 Findings:\*\*\s*`?0`?/i.test(content)) issues.push('05-SECURITY-AUDIT.md does not verify "Unresolved P1 Findings: 0"');
  if (/\|\s*`?FAIL`?\s*\|/i.test(content)) issues.push('05-SECURITY-AUDIT.md still contains an unresolved FAIL control row');
  return issues;
}

async function collectFiles(dir, extensions, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SCAN_IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(full, extensions, acc);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.has(ext) && entry.name !== 'zerodrift-report.html') {
        acc.push(full);
      }
    }
  }
  return acc;
}

export async function checkTokenDrift(targetDir) {
  const absTarget = path.resolve(targetDir);
  const tokensPath = path.join(absTarget, '.zerodrift', 'memory', 'DESIGN-TOKENS.json');
  if (!(await pathExists(tokensPath))) {
    return { enabled: false, ok: true, filesScanned: 0, violations: [] };
  }

  let tokens;
  try {
    tokens = JSON.parse(await fs.readFile(tokensPath, 'utf8'));
  } catch (err) {
    return {
      enabled: true,
      ok: false,
      filesScanned: 0,
      violations: [{ file: '.zerodrift/memory/DESIGN-TOKENS.json', line: 1, color: 'INVALID_JSON', reason: err.message }],
    };
  }

  const forbiddenSet = new Set((tokens.forbiddenColors || []).map(normalizeHex));
  const approvedSet = new Set([
    ...(tokens.approvedColors || []).map(normalizeHex),
    ...Object.values(tokens.palette || {})
      .filter((v) => typeof v === 'string' && v.startsWith('#'))
      .map(normalizeHex),
  ]);
  const strictPaletteOnly = Boolean(tokens.strictPaletteOnly);

  if (forbiddenSet.size === 0 && !strictPaletteOnly) {
    return { enabled: true, ok: true, filesScanned: 0, violations: [] };
  }

  const files = await collectFiles(absTarget, TOKEN_SCAN_EXTENSIONS);
  const violations = [];

  for (const file of files) {
    const rel = path.relative(absTarget, file).replace(/\\/g, '/');
    const lines = (await fs.readFile(file, 'utf8')).split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes('zerodrift-token-ignore')) continue;
      const matches = lines[i].match(HEX_COLOR_REGEX);
      if (!matches) continue;
      for (const rawHex of matches) {
        const norm = normalizeHex(rawHex);
        if (forbiddenSet.has(norm)) {
          violations.push({ file: rel, line: i + 1, color: norm, reason: `Forbidden color ${norm} banned by DESIGN-TOKENS.json` });
        } else if (strictPaletteOnly && approvedSet.size > 0 && !approvedSet.has(norm)) {
          violations.push({ file: rel, line: i + 1, color: norm, reason: `Unapproved color ${norm} outside locked DESIGN-TOKENS.json palette` });
        }
      }
    }
  }

  return { enabled: true, ok: violations.length === 0, filesScanned: files.length, violations };
}

export async function checkMojibake(targetDir) {
  const absTarget = path.resolve(targetDir);
  const files = await collectFiles(absTarget, MOJIBAKE_EXTENSIONS);
  const violations = [];

  for (const file of files) {
    const rel = path.relative(absTarget, file).replace(/\\/g, '/');
    const lines = (await fs.readFile(file, 'utf8')).split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes('zerodrift-mojibake-ignore')) continue;
      const m = lines[i].match(MOJIBAKE_REGEX);
      if (m) {
        violations.push({
          file: rel,
          line: i + 1,
          sequence: m[0],
          reason: `Corrupted UTF-8 mojibake sequence detected ("${m[0]}")`,
        });
      }
    }
  }

  return { ok: violations.length === 0, filesScanned: files.length, violations };
}

export async function checkEnvParity(targetDir) {
  const absTarget = path.resolve(targetDir);
  const envExamplePath = path.join(absTarget, '.env.example');
  const hasEnvExample = await pathExists(envExamplePath);
  const documentedVars = new Set();

  if (hasEnvExample) {
    const raw = await fs.readFile(envExamplePath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.trim().match(/^([A-Z][A-Z0-9_]*)\s*=/);
      if (m) documentedVars.add(m[1]);
    }
  }

  const files = await collectFiles(absTarget, CODE_SCAN_EXTENSIONS);
  const envRefRegex = /\b(?:process\.env|import\.meta\.env|env)\.([A-Z][A-Z0-9_]{2,})\b/g;
  const violations = [];
  const referencedVars = new Set();

  for (const file of files) {
    const rel = path.relative(absTarget, file).replace(/\\/g, '/');
    if (rel.startsWith('tests/') || rel.includes('.test.') || rel.includes('.spec.')) continue;
    const lines = (await fs.readFile(file, 'utf8')).split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes('zerodrift-env-ignore')) continue;
      for (const match of lines[i].matchAll(envRefRegex)) {
        const varName = match[1];
        if (BUILTIN_ENV_VARS.has(varName)) continue;
        referencedVars.add(varName);
        if (!documentedVars.has(varName)) {
          violations.push({
            file: rel,
            line: i + 1,
            variable: varName,
            reason: hasEnvExample
              ? `Environment variable "${varName}" is referenced in code but missing from .env.example`
              : `Environment variable "${varName}" is referenced in code but .env.example does not exist`,
          });
        }
      }
    }
  }

  return {
    ok: violations.length === 0,
    hasEnvExample,
    referencedCount: referencedVars.size,
    documentedCount: documentedVars.size,
    violations,
  };
}

export async function checkHardcodedSecrets(targetDir) {
  const absTarget = path.resolve(targetDir);
  const files = await collectFiles(absTarget, CODE_SCAN_EXTENSIONS);
  const violations = [];

  for (const file of files) {
    const rel = path.relative(absTarget, file).replace(/\\/g, '/');
    if (
      rel.startsWith('tests/') ||
      rel.includes('.test.') ||
      rel.includes('.spec.') ||
      rel.includes('.example') ||
      rel.startsWith('docs/demo/')
    ) {
      continue;
    }

    const lines = (await fs.readFile(file, 'utf8')).split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes('zerodrift-secret-ignore')) continue;
      for (const pat of SECRET_PATTERNS) {
        if (pat.regex.test(lines[i])) {
          violations.push({
            file: rel,
            line: i + 1,
            pattern: pat.label,
            reason: `Potential hardcoded secret (${pat.label}) detected`,
          });
        }
      }
    }
  }

  return { ok: violations.length === 0, filesScanned: files.length, violations };
}

export async function validateProject(targetDir, requestedGate = null) {
  const absTarget = path.resolve(targetDir);
  const zdDir = path.join(absTarget, '.zerodrift');
  const errors = [];
  const warnings = [];
  const checks = [];

  const record = (name, ok, detail) => {
    checks.push({ name, status: ok ? 'PASS' : 'FAIL', detail });
    if (!ok) errors.push(`${name}: ${detail}`);
  };

  if (!(await pathExists(zdDir))) {
    record('.zerodrift/', false, `Directory not found at ${zdDir}. Run init-project.mjs first.`);
    return { ok: false, targetDir: absTarget, requestedGate, checks, errors, warnings, stages: {}, scanners: {} };
  }
  record('.zerodrift/', true, 'Directory exists');

  const statePath = path.join(zdDir, 'STATE.md');
  if (!(await pathExists(statePath))) {
    record('STATE.md', false, 'Missing .zerodrift/STATE.md');
    return { ok: false, targetDir: absTarget, requestedGate, checks, errors, warnings, stages: {}, scanners: {} };
  }

  const stateContent = await fs.readFile(statePath, 'utf8');
  const stageStatuses = parseStageStatuses(stateContent);

  if (stageStatuses.size < 6) {
    record('STATE.md/stage-matrix', false, `Expected >= 6 stage rows, parsed ${stageStatuses.size}`);
  } else {
    const invalidStatuses = [...stageStatuses.entries()]
      .filter(([, status]) => !VALID_STAGE_STATUSES.has(status))
      .map(([stage, status]) => `${stage}=${status}`);
    record(
      'STATE.md/stage-matrix',
      invalidStatuses.length === 0,
      invalidStatuses.length === 0
        ? `${stageStatuses.size} stages parsed with valid status tokens`
        : `Invalid status token(s): ${invalidStatuses.join(', ')}`
    );
  }

  const hasPointer =
    stateContent.includes('**Current Stage:**') &&
    stateContent.includes('**Active Slice ID:**') &&
    stateContent.includes('**Next Deterministic Action:**');
  record(
    'STATE.md/active-pointer',
    hasPointer,
    hasPointer ? 'Active Pointer fields present' : 'Missing Current Stage / Active Slice ID / Next Deterministic Action'
  );

  // Living Memory JSON schemas
  for (const [memFile, arrKey] of [
    ['REGRESSION-LEDGER.json', 'entries'],
    ['CHECKPOINTS.json', 'checkpoints'],
    ['COPY-STYLE.json', null],
  ]) {
    const p = path.join(zdDir, 'memory', memFile);
    if (await pathExists(p)) {
      try {
        const parsed = JSON.parse(await fs.readFile(p, 'utf8'));
        const ok = arrKey ? Array.isArray(parsed[arrKey]) : typeof parsed === 'object' && parsed !== null;
        record(`memory/${memFile}`, ok, ok ? (arrKey ? `${parsed[arrKey].length} item(s)` : 'Valid JSON') : `Missing ${arrKey}[]`);
      } catch (err) {
        record(`memory/${memFile}`, false, `Invalid JSON: ${err.message}`);
      }
    }
  }

  // Deterministic Scanners: Token Drift, Mojibake, .env Parity, Hardcoded Secrets
  const [tokenDrift, mojibake, envParity, secrets] = await Promise.all([
    checkTokenDrift(absTarget),
    checkMojibake(absTarget),
    checkEnvParity(absTarget),
    checkHardcodedSecrets(absTarget),
  ]);

  if (tokenDrift.enabled) {
    record(
      'scanner/token-drift',
      tokenDrift.ok,
      tokenDrift.ok
        ? `Clean (${tokenDrift.filesScanned} file(s) scanned against DESIGN-TOKENS.json)`
        : `${tokenDrift.violations.length} DESIGN-TOKENS.json violation(s): ${tokenDrift.violations
            .slice(0, 3)
            .map((v) => `${v.file}:${v.line} (${v.color})`)
            .join(', ')}`
    );
  }

  record(
    'scanner/utf8-mojibake',
    mojibake.ok,
    mojibake.ok
      ? `Clean (${mojibake.filesScanned} file(s) scanned)`
      : `${mojibake.violations.length} mojibake hit(s): ${mojibake.violations
          .slice(0, 3)
          .map((v) => `${v.file}:${v.line}`)
          .join(', ')}`
  );

  record(
    'scanner/env-parity',
    envParity.ok,
    envParity.ok
      ? `Clean (${envParity.referencedCount} referenced / ${envParity.documentedCount} documented)`
      : `${envParity.violations.length} undocumented env var(s): ${envParity.violations
          .slice(0, 3)
          .map((v) => `${v.variable}@${v.file}:${v.line}`)
          .join(', ')}`
  );

  record(
    'scanner/hardcoded-secrets',
    secrets.ok,
    secrets.ok
      ? `Clean (${secrets.filesScanned} file(s) scanned)`
      : `${secrets.violations.length} secret finding(s): ${secrets.violations
          .slice(0, 3)
          .map((v) => `${v.pattern}@${v.file}:${v.line}`)
          .join(', ')}`
  );

  // Stage gate artifacts
  for (const spec of STAGE_ARTIFACT_MAP) {
    const status = stageStatuses.get(spec.stageKey) || 'PENDING';
    const isCompletedOrApproved = status === 'APPROVED' || status === 'COMPLETED';
    const requiredByGate =
      requestedGate !== null &&
      spec.gate <= requestedGate &&
      !(spec.optional && status === 'SKIPPED');

    if (requiredByGate && !isCompletedOrApproved) {
      record(
        `gate-${spec.gate}/${spec.stageKey}`,
        false,
        `Gate ${requestedGate} requires ${spec.stageKey} to be APPROVED or COMPLETED (found: ${status})`
      );
    }

    if (!isCompletedOrApproved && !requiredByGate) continue;

    for (const fileName of spec.files) {
      const artifactPath = path.join(zdDir, fileName);
      if (!(await pathExists(artifactPath))) {
        record(`artifact/${fileName}`, false, `Required by ${spec.stageKey} (${status}) but missing`);
        continue;
      }

      const content = await fs.readFile(artifactPath, 'utf8');
      const unresolved = findUnresolvedTokens(content);
      if (fileName === 'CONTRACTS.md') {
        const contractIssues = validateContractsContent(content);
        record(
          'artifact/CONTRACTS.md',
          contractIssues.length === 0,
          contractIssues.length === 0
            ? 'All 5 sections, routes, Auth/RBAC & schemas verified'
            : contractIssues.join('; ')
        );
      } else if (fileName === '05-SECURITY-AUDIT.md') {
        const secIssues = validateSecurityAuditContent(content);
        record(
          'artifact/05-SECURITY-AUDIT.md',
          secIssues.length === 0,
          secIssues.length === 0 ? 'Zero unresolved P0/P1 findings & zero FAIL controls' : secIssues.join('; ')
        );
      } else {
        record(
          `artifact/${fileName}`,
          unresolved.length === 0,
          unresolved.length === 0
            ? 'Complete (zero unresolved template placeholders)'
            : `${unresolved.length} unresolved placeholder(s): ${unresolved.slice(0, 3).join(', ')}`
        );
      }
    }
  }

  const beyondStage0 = [...stageStatuses.entries()].some(
    ([stage, status]) => stage !== 'Stage 0' && (status === 'APPROVED' || status === 'COMPLETED')
  );
  const stateUnresolved = findUnresolvedTokens(stateContent);
  if (beyondStage0 && stateUnresolved.length > 0) {
    record(
      'STATE.md/placeholders',
      false,
      `STATE.md still contains ${stateUnresolved.length} unresolved placeholder(s) after Stage 0`
    );
  } else if (stateUnresolved.length > 0) {
    warnings.push(`STATE.md has ${stateUnresolved.length} template placeholder(s) (normal during Stage 0 Bootstrap)`);
  }

  return {
    ok: errors.length === 0,
    targetDir: absTarget,
    requestedGate,
    checks,
    errors,
    warnings,
    stages: Object.fromEntries(stageStatuses.entries()),
    tokenDrift,
    scanners: { tokenDrift, mojibake, envParity, secrets },
  };
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      printHelp();
      process.exit(0);
    }

    const result = await validateProject(args.target, args.gate);
    if (args.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`=== ZeroDrift v3.0 Project & Enterprise Scanner (${result.targetDir}) ===`);
      if (result.requestedGate !== null) console.log(`Target Gate: Gate ${result.requestedGate}`);
      console.log('');
      for (const check of result.checks) {
        const tag = check.status === 'PASS' ? '[PASS]' : '[FAIL]';
        console.log(`${tag} ${check.name.padEnd(32)} ${check.detail}`);
      }
      if (result.warnings.length > 0) {
        console.log('\nWarnings:');
        for (const w of result.warnings) console.log(`  - ${w}`);
      }
      console.log(`\nVerdict: ${result.ok ? 'PASS' : 'FAIL'} (${result.errors.length} error(s))`);
    }

    process.exit(result.ok ? 0 : 1);
  } catch (err) {
    console.error(`[ZeroDrift Validate Error] ${err.message}`);
    process.exit(1);
  }
}
