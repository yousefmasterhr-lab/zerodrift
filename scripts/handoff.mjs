#!/usr/bin/env node
/**
 * ZeroDrift v3.0 Fresh Session Handoff Generator (Context Rot Prevention)
 * Compiles an ultra-compact (<120 lines), high-signal `.zerodrift/HANDOFF.md`
 * containing active stage/slice, locked rules, design/copy locks, top regression
 * invariants, last checkpoint, and a 1-line cross-agent Fresh Session Resume Prompt.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

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

function extractField(md, regex, fallback = 'Unknown') {
  const m = md.match(regex);
  return m ? m[1].trim().replace(/^`|`$/g, '') : fallback;
}

function parseActiveRules(rulesMd) {
  const lines = rulesMd.split(/\r?\n/);
  const rules = [];
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim().replace(/^`|`$/g, ''));
    if (cells.length >= 5 && cells[0].startsWith('RULE-') && cells[4] === 'ACTIVE') {
      rules.push({ id: cells[0], category: cells[1], rule: cells[2] });
    }
  }
  return rules;
}

export async function generateHandoff(projectDir, { writeFile = true } = {}) {
  const absProject = path.resolve(projectDir);
  const zdDir = path.join(absProject, '.zerodrift');

  const [stateMd, rulesMd, regJson, tokensJson, copyJson, cpJson] = await Promise.all([
    readTextSafe(path.join(zdDir, 'STATE.md')),
    readTextSafe(path.join(zdDir, 'memory', 'LOCKED-RULES.md')),
    readJsonSafe(path.join(zdDir, 'memory', 'REGRESSION-LEDGER.json'), { entries: [] }),
    readJsonSafe(path.join(zdDir, 'memory', 'DESIGN-TOKENS.json'), {}),
    readJsonSafe(path.join(zdDir, 'memory', 'COPY-STYLE.json'), {}),
    readJsonSafe(path.join(zdDir, 'memory', 'CHECKPOINTS.json'), { checkpoints: [] }),
  ]);

  const projectName = extractField(stateMd, /\|\s*\*\*Project Name\*\*\s*\|\s*`?([^|\n`]+)`?/i, path.basename(absProject));
  const currentStage = extractField(stateMd, /\*\*Current Stage:\*\*\s*`?([^\n`]+)`?/i, 'STAGE 0 — Bootstrap');
  const activeSlice = extractField(stateMd, /\*\*Active Slice ID:\*\*\s*`?([^\n`]+)`?/i, 'NONE');
  const nextAction = extractField(stateMd, /\*\*Next Deterministic Action:\*\*\s*`?([^\n`]+)`?/i, 'Run zerodrift-intake');

  const activeRules = parseActiveRules(rulesMd).slice(0, 12);
  const regressions = (Array.isArray(regJson?.entries) ? regJson.entries : [])
    .slice()
    .sort((a, b) => {
      const rank = { P0: 0, P1: 1, P2: 2, P3: 3 };
      return (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9);
    })
    .slice(0, 6);

  const checkpoints = Array.isArray(cpJson?.checkpoints) ? cpJson.checkpoints : [];
  const lastCp = checkpoints.length ? checkpoints[checkpoints.length - 1] : null;

  const paletteSummary = tokensJson?.palette
    ? Object.entries(tokensJson.palette)
        .slice(0, 6)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')
    : 'Not locked yet';
  const forbiddenSummary =
    Array.isArray(tokensJson?.forbiddenColors) && tokensJson.forbiddenColors.length
      ? tokensJson.forbiddenColors.join(', ')
      : 'None';

  const copySummary = copyJson?.locales
    ? `Voice="${copyJson.tone?.voice || 'Concise'}", Locales=[${(copyJson.locales.supported || []).join(',')}], Numerals=${copyJson.locales.numeralStyle || 'western-0-9'}`
    : 'Default English internal artifacts';

  const resumePrompt = `Resume ZeroDrift project "${projectName}" cleanly: read .zerodrift/HANDOFF.md, .zerodrift/STATE.md, .zerodrift/CONTRACTS.md, and .zerodrift/memory/LOCKED-RULES.md, then execute the next step (${activeSlice !== 'NONE' ? `Slice ${activeSlice}: ` : ''}${nextAction}) with full Pre-Edit Ripple Checks and zero regressions.`;

  const lines = [
    `# ZeroDrift Fresh Session Handoff — ${projectName}`,
    '',
    `> Generated: \`${new Date().toISOString()}\` | Ultra-compact context-rot prevention brief (<120 lines).`,
    '',
    '## 1. Active Pointer',
    `- **Current Stage:** \`${currentStage}\``,
    `- **Active Slice:** \`${activeSlice}\``,
    `- **Next Deterministic Action:** ${nextAction}`,
    `- **Last Time Machine Checkpoint:** ${lastCp ? `\`${lastCp.id}\` (${lastCp.label} · tag \`${lastCp.gitTag || 'local'}\`)` : '`NONE`'}`,
    '',
    '## 2. Active Locked Rules (Non-Negotiable)',
    ...(activeRules.length
      ? activeRules.map((r) => `- **${r.id}** [${r.category}]: ${r.rule}`)
      : ['- No locked rules recorded yet.']),
    '',
    '## 3. Design & Copy Style Locks',
    `- **Theme:** ${tokensJson?.themeName || 'Default'} | **Strict Palette:** ${tokensJson?.strictPaletteOnly ? 'ON' : 'Forbidden-Only'}`,
    `- **Core Palette:** \`${paletteSummary}\``,
    `- **Forbidden Colors:** \`${forbiddenSummary}\``,
    `- **Copy Style:** ${copySummary}`,
    '',
    '## 4. Top Regression Invariants to Protect',
    ...(regressions.length
      ? regressions.map(
          (b) =>
            `- **${b.id}** (${b.severity}): ${b.invariantToProtect} — Files: \`${(b.filesTouched || []).join(', ')}\` | Test: \`${b.regressionTestRef || '-'}\``
        )
      : ['- No regressions logged yet.']),
    '',
    '## 5. 1-Line Fresh Session Resume Prompt (Copy-Paste Into Any AI Agent)',
    '```text',
    resumePrompt,
    '```',
    '',
  ];

  // Enforce strict < 120 line ceiling
  const markdown = `${lines.slice(0, 118).join('\n')}\n`;
  const lineCount = markdown.split(/\r?\n/).length - 1;
  const outPath = path.join(zdDir, 'HANDOFF.md');

  if (writeFile) {
    await fs.mkdir(zdDir, { recursive: true });
    await fs.writeFile(outPath, markdown, 'utf8');
  }

  return {
    outPath,
    lineCount,
    projectName,
    currentStage,
    activeSlice,
    nextAction,
    lastCheckpoint: lastCp,
    resumePrompt,
    markdown,
  };
}

function parseArgs(argv) {
  const args = { project: process.cwd(), json: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--json') args.json = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log('Usage: node scripts/handoff.mjs [--project <dir>] [--json]');
      process.exit(0);
    }
    const result = await generateHandoff(args.project, { writeFile: true });
    if (args.json) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`ZeroDrift Fresh Session Handoff generated: ${result.outPath} (${result.lineCount} lines)`);
      console.log(`\n1-Line Fresh Session Resume Prompt:\n${result.resumePrompt}`);
    }
  } catch (err) {
    console.error(`[ZeroDrift Handoff Error] ${err.message}`);
    process.exit(1);
  }
}

