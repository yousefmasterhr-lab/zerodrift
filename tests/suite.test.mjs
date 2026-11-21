import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import {
  runDoctor,
  parseYamlFrontmatter,
  EXPECTED_SKILLS,
  REQUIRED_SKILL_SECTIONS,
} from '../scripts/doctor.mjs';
import { initProject } from '../scripts/init-project.mjs';
import {
  validateProject,
  checkTokenDrift,
  checkMojibake,
  checkEnvParity,
  checkHardcodedSecrets,
} from '../scripts/validate-project.mjs';
import { exportPortableStudio, buildStudioData, cleanMarkdownCell } from '../scripts/build-studio.mjs';
import { startStudioServer } from '../scripts/studio-server.mjs';
import { waitForStudioBatch } from '../scripts/wait-for-studio.mjs';
import {
  createCheckpoint,
  listCheckpoints,
  diffCheckpoint,
  buildRollbackPlan,
} from '../scripts/checkpoint.mjs';
import { generateHandoff } from '../scripts/handoff.mjs';
import { buildLiveDemo } from '../scripts/build-demo.mjs';
import { buildCodeMap, computeBlastRadius } from '../scripts/code-map.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

async function makeTempDir(prefix) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

function httpRequest(urlStr, { method = 'GET', body = null } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method,
        headers: payload
          ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
          : {},
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            text: Buffer.concat(chunks).toString('utf8'),
          });
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

describe('ZeroDrift v2.0 Self-Diagnostics & 11-Skill Integrity', () => {
  it('doctor.mjs passes all required v2.0 checks with exit code 0', async () => {
    const result = await runDoctor(REPO_ROOT);
    assert.equal(result.ok, true, `Doctor failed with errors:\n${result.errors.join('\n')}`);
    assert.equal(result.summary.failed, 0);

    const stdout = execFileSync(process.execPath, [path.join(REPO_ROOT, 'scripts/doctor.mjs'), '--json'], {
      encoding: 'utf8',
    });
    const parsed = JSON.parse(stdout);
    assert.equal(parsed.ok, true);
  });

  it('all 12 SKILL.md files have valid YAML frontmatter, zero placeholders, and all 7 required sections', async () => {
    assert.equal(EXPECTED_SKILLS.length, 12);
    assert.ok(EXPECTED_SKILLS.includes('zerodrift-memory'));
    assert.ok(EXPECTED_SKILLS.includes('zerodrift-codemap'));
    const placeholderRegex = /\b(TODO|TBD|FIXME|XXX)\b/;

    for (const skillName of EXPECTED_SKILLS) {
      const skillPath = path.join(REPO_ROOT, 'skills', skillName, 'SKILL.md');
      const content = await fs.readFile(skillPath, 'utf8');
      const fm = parseYamlFrontmatter(content);

      assert.ok(fm, `${skillName}: missing YAML frontmatter`);
      assert.equal(fm.name, skillName, `${skillName}: frontmatter name mismatch`);
      assert.ok(fm.description && fm.description.length >= 40, `${skillName}: description too short`);
      assert.equal(placeholderRegex.test(content), false, `${skillName}: contains TODO/TBD placeholder`);

      for (const section of REQUIRED_SKILL_SECTIONS) {
        assert.ok(content.includes(section), `${skillName}: missing section "${section}"`);
      }
    }
  });
});

describe('ZeroDrift v2.0 init-project.mjs (Living Memory, Studio & Adapters)', () => {
  it('initializes greenfield directory with Living Memory vault, learned-skills, Studio files & all adapters', async () => {
    const tmpDir = await makeTempDir('zerodrift-v2-greenfield-');
    try {
      const result = await initProject({
        target: tmpDir,
        adapter: 'all',
        name: 'ClinicOS',
      });

      assert.equal(result.mode, 'greenfield');
      assert.equal(result.projectName, 'ClinicOS');

      const requiredFiles = [
        '.zerodrift/STATE.md',
        '.zerodrift/memory/LOCKED-RULES.md',
        '.zerodrift/memory/REGRESSION-LEDGER.json',
        '.zerodrift/memory/DESIGN-TOKENS.json',
        '.zerodrift/memory/PROMPTS-AND-DECISIONS.md',
        '.zerodrift/learned-skills/README.md',
        '.zerodrift/studio-inbox.json',
        '.zerodrift/studio-outbox.json',
        '.zerodrift/launch-studio.mjs',
        'GEMINI.md',
        'AGENTS.md',
        'CLAUDE.md',
        'CODEX.md',
        '.cursor/rules/zerodrift.mdc',
        '.github/copilot-instructions.md',
        '.gitignore',
      ];
      for (const rel of requiredFiles) {
        const stat = await fs.stat(path.join(tmpDir, rel));
        assert.ok(stat.size > 0, `Missing or empty initialized file: ${rel}`);
      }

      const ledger = JSON.parse(await fs.readFile(path.join(tmpDir, '.zerodrift/memory/REGRESSION-LEDGER.json'), 'utf8'));
      assert.equal(ledger.projectName, 'ClinicOS');
      assert.ok(Array.isArray(ledger.entries));

      const tokens = JSON.parse(await fs.readFile(path.join(tmpDir, '.zerodrift/memory/DESIGN-TOKENS.json'), 'utf8'));
      assert.equal(tokens.projectName, 'ClinicOS');
      assert.equal(tokens.palette.canvas, '#FBF9F5');

      // Idempotent second run skips all existing files
      const second = await initProject({ target: tmpDir, adapter: 'all', name: 'ClinicOS' });
      assert.equal(second.created.length, 0);
      assert.equal(second.overwritten.length, 0);
      assert.ok(second.skipped.length >= 24);
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('auto-detects brownfield directory and never overwrites existing source code', async () => {
    const tmpDir = await makeTempDir('zerodrift-v2-brownfield-');
    try {
      await fs.mkdir(path.join(tmpDir, 'src'), { recursive: true });
      const originalCode = 'export const importantBusinessLogic = () => 42;\n';
      await fs.writeFile(path.join(tmpDir, 'src/index.ts'), originalCode, 'utf8');
      await fs.writeFile(path.join(tmpDir, '.gitignore'), 'node_modules/\ndist/\n', 'utf8');

      const result = await initProject({ target: tmpDir, adapter: 'claude' });
      assert.equal(result.mode, 'brownfield');

      const afterCode = await fs.readFile(path.join(tmpDir, 'src/index.ts'), 'utf8');
      assert.equal(afterCode, originalCode);

      const gitignore = await fs.readFile(path.join(tmpDir, '.gitignore'), 'utf8');
      assert.ok(gitignore.includes('node_modules/'));
      assert.ok(gitignore.includes('floorplan/'));
      assert.ok(gitignore.includes('.zerodrift/.studio.pid'));
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('ZeroDrift v2.0 validate-project.mjs (Gate Validation & Deterministic Color Token Drift)', () => {
  it('catches intentional forbidden & unapproved color token drift violations and passes when clean', async () => {
    const tmpDir = await makeTempDir('zerodrift-v2-drift-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'WarmApp' });

      // Configure strict DESIGN-TOKENS.json banning stark #FFFFFF
      const tokensPath = path.join(tmpDir, '.zerodrift/memory/DESIGN-TOKENS.json');
      const tokens = JSON.parse(await fs.readFile(tokensPath, 'utf8'));
      tokens.forbiddenColors = ['#FFFFFF', '#000000'];
      tokens.strictPaletteOnly = true;
      await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2), 'utf8');

      // Write violating CSS file using banned #FFFFFF and unapproved #FF00AA
      await fs.mkdir(path.join(tmpDir, 'src'), { recursive: true });
      const cssPath = path.join(tmpDir, 'src/theme.css');
      await fs.writeFile(
        cssPath,
        '.card { background: #ffffff; border-color: #FF00AA; color: #1F2937; }\n',
        'utf8'
      );

      const driftFail = await checkTokenDrift(tmpDir);
      assert.equal(driftFail.ok, false);
      assert.equal(driftFail.violations.length, 2);
      assert.ok(driftFail.violations.some((v) => v.color === '#FFFFFF' && v.reason.includes('Forbidden')));
      assert.ok(driftFail.violations.some((v) => v.color === '#FF00AA' && v.reason.includes('Unapproved')));

      const valFail = await validateProject(tmpDir);
      assert.equal(valFail.ok, false);
      assert.ok(valFail.errors.some((e) => e.includes('DESIGN-TOKENS.json')));

      // Fix CSS to use approved warm ivory tokens only
      await fs.writeFile(
        cssPath,
        '.card { background: #FBF9F5; border-color: #E3DDD1; color: #1F2937; }\n',
        'utf8'
      );

      const driftClean = await checkTokenDrift(tmpDir);
      assert.equal(driftClean.ok, true);
      assert.equal(driftClean.violations.length, 0);

      const valClean = await validateProject(tmpDir);
      assert.equal(valClean.ok, true, `Expected clean validation, got: ${valClean.errors.join('; ')}`);
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('rejects incomplete Gate 3 and passes once Gate 3 artifacts & CONTRACTS.md are complete', async () => {
    const tmpDir = await makeTempDir('zerodrift-v2-gate3-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'LedgerPro' });

      const incompleteGate3 = await validateProject(tmpDir, 3);
      assert.equal(incompleteGate3.ok, false);
      assert.ok(incompleteGate3.errors.some((e) => e.includes('CONTRACTS.md')));

      const completeState = `# ZeroDrift Project State Ledger

## 1. Project Identity
| Field | Value |
| :--- | :--- |
| **Project Name** | \`LedgerPro\` |
| **Project Mode** | \`greenfield\` |
| **Execution Mode** | \`guided\` |
| **Primary Language(s)** | \`Arabic (RTL) + English (LTR)\` |
| **Target Stack** | \`TypeScript, Node 22, PostgreSQL\` |
| **Initialized On** | \`2026-11-19\` |
| **Last Updated** | \`2026-11-19\` |

## 2. Active Pointer
- **Current Stage:** \`STAGE 3 — Architecture & Contracts\`
- **Active Slice ID:** \`S-01\`
- **Next Deterministic Action:** \`Start Stage 4 Design System.\`

## 3. Stage Gate Matrix
| Stage | Artifact(s) | Status | Approved / Completed On | Gate Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 0: Bootstrap** | \`.zerodrift/STATE.md\` | \`COMPLETED\` | \`2026-11-19\` | Ready |
| **Stage 1: Intake & PRD** | \`00-BRIEF.md\`, \`01-PRD.md\` | \`APPROVED\` | \`2026-11-19\` | Clarity 95% |
| **Stage 2A: Domain Research** | \`02-RESEARCH-SOURCES.md\` | \`COMPLETED\` | \`2026-11-19\` | Verified |
| **Stage 2B: Reverse Engineering** | \`02B-REVERSE-ANALYSIS.md\` | \`SKIPPED\` | \`2026-11-19\` | Greenfield |
| **Stage 3: Architecture & Contracts** | \`03-ARCHITECTURE.md\`, \`CONTRACTS.md\`, \`05-TASKS.md\` | \`APPROVED\` | \`2026-11-19\` | Locked |
| **Stage 4: Design System** | \`04-DESIGN-SYSTEM.md\` | \`PENDING\` | \`-\` | Next |
| **Stage 5: Vertical Slice Build** | Source code | \`PENDING\` | \`-\` | Queued |
| **Stage 6A: Zero-Error Verify** | Checks | \`PENDING\` | \`-\` | Queued |
| **Stage 6B: Security Audit** | \`05-SECURITY-AUDIT.md\` | \`PENDING\` | \`-\` | Queued |
| **Stage 7: Handover Pack** | \`06-HANDOVER-REPORT.md\` | \`PENDING\` | \`-\` | Queued |
`;

      const completeContracts = `# CONTRACTS — Single Source of Truth Registry

## 1. Environment Variables Contract
| Variable | Scope | Required | Format | Purpose |
| :--- | :---: | :---: | :--- | :--- |
| \`DATABASE_URL\` | \`SERVER\` | Yes | Postgres URI | Primary DB |

## 2. HTTP API Route Registry
| Route ID | Method | Path | Auth & RBAC | Request Schema | Success Response | Error Codes |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| \`API-001\` | \`GET\` | \`/api/health\` | \`PUBLIC\` | None | \`200 { status: "ok" }\` | \`503\` |

## 3. Shared Data Transfer Objects (DTOs & Schemas)
\`\`\`ts
export interface HealthDTO { status: "ok"; }
\`\`\`

## 4. Database Schema, Constraints & Indexes
| Table | Primary Key | Required Columns | Constraints | Indexes |
| :--- | :--- | :--- | :--- | :--- |
| \`users\` | \`id (UUID)\` | \`email TEXT NOT NULL\` | \`UNIQUE(email)\` | \`idx_users_email\` |

## 5. Contract Amendments Log
| Date | Amendment ID | Route / Table Changed | Reason | Synced? |
| :--- | :---: | :--- | :--- | :---: |
| \`2026-11-19\` | \`INIT\` | Initial contract lock | Gate 3 approved | \`N/A\` |
`;

      await fs.writeFile(path.join(tmpDir, '.zerodrift/STATE.md'), completeState, 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/00-BRIEF.md'), '# Brief\nClarity: 95%.\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/01-PRD.md'), '# PRD\nApproved.\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/02-RESEARCH-SOURCES.md'), '# Sources\nIFRS verified.\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/03-ARCHITECTURE.md'), '# Architecture\nMonolith.\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/CONTRACTS.md'), completeContracts, 'utf8');
      await fs.writeFile(path.join(tmpDir, '.zerodrift/05-TASKS.md'), '# Tasks\nS-01 Auth.\n', 'utf8');

      const completeGate3 = await validateProject(tmpDir, 3);
      assert.equal(completeGate3.ok, true, `Expected Gate 3 pass, got: ${completeGate3.errors.join('; ')}`);
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('ZeroDrift Studio — Live HTTP/SSE Server, Two-Way Inbox & Portable Export', () => {
  it('serves all 6 tabs, Warm Ivory theme, /api/state, /api/tree, POST /api/responses, POST /api/rules, SSE /api/events, and portable export', async () => {
    const tmpDir = await makeTempDir('zerodrift-v2-studio-');
    let instance = null;
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'StudioDemo' });
      await fs.mkdir(path.join(tmpDir, 'src/routes'), { recursive: true });
      await fs.writeFile(path.join(tmpDir, 'src/routes/health.ts'), 'export const health = () => "ok";\n', 'utf8');

      // Seed an interactive inbox batch
      await fs.writeFile(
        path.join(tmpDir, '.zerodrift/studio-inbox.json'),
        JSON.stringify(
          {
            schemaVersion: '2.0.0',
            batches: [
              {
                batchId: 'BATCH-001',
                title: 'Stage 1 Quick Decisions',
                gate: 'Gate 1 — PRD Approval',
                status: 'PENDING',
                questions: [
                  {
                    id: 'database',
                    type: 'single-choice',
                    prompt: 'Choose primary database',
                    options: [{ value: 'postgres', label: 'PostgreSQL', recommended: true }],
                  },
                ],
              },
            ],
          },
          null,
          2
        ),
        'utf8'
      );

      // Start live server on ephemeral port 0
      instance = await startStudioServer({ projectDir: tmpDir, port: 0, strictPort: true, writePid: false });
      assert.ok(instance.port > 0);

      // 1. GET / -> HTTP 200 HTML containing all 6 Studio tabs
      const htmlRes = await httpRequest(`${instance.url}/`);
      assert.equal(htmlRes.status, 200);
      for (const tabMarker of [
        'panel-command',
        'panel-inbox',
        'panel-wiring',
        'panel-design',
        'panel-memory',
        'panel-hub',
        'warm-ivory',
      ]) {
        assert.ok(htmlRes.text.includes(tabMarker), `Studio HTML missing "${tabMarker}"`);
      }

      // 2. GET /styles.css -> Warm Ivory & Royal Olive luxury tokens
      const cssRes = await httpRequest(`${instance.url}/styles.css`);
      assert.equal(cssRes.status, 200);
      assert.ok(cssRes.text.includes('#FBF9F5'));
      assert.ok(cssRes.text.includes('#F3EFE6'));
      assert.ok(cssRes.text.includes('#243324'));
      assert.ok(cssRes.text.includes('#10B981'));

      // 3. GET /api/state & /api/tree -> valid JSON
      const stateRes = await httpRequest(`${instance.url}/api/state`);
      assert.equal(stateRes.status, 200);
      const stateJson = JSON.parse(stateRes.text);
      assert.equal(stateJson.project.name, 'StudioDemo');
      assert.ok(Array.isArray(stateJson.memory.lockedRules));

      const treeRes = await httpRequest(`${instance.url}/api/tree`);
      assert.equal(treeRes.status, 200);
      const treeJson = JSON.parse(treeRes.text);
      assert.ok(treeJson.fileCount > 0);

      // 4. POST /api/responses -> writes .zerodrift/studio-outbox.json
      const respPost = await httpRequest(`${instance.url}/api/responses`, {
        method: 'POST',
        body: {
          batchId: 'BATCH-001',
          gateDecision: 'APPROVE',
          answers: { database: 'postgres' },
          lockAsRules: true,
        },
      });
      assert.equal(respPost.status, 200);
      const respJson = JSON.parse(respPost.text);
      assert.equal(respJson.ok, true);
      assert.equal(respJson.batchId, 'BATCH-001');

      const outbox = JSON.parse(await fs.readFile(path.join(tmpDir, '.zerodrift/studio-outbox.json'), 'utf8'));
      assert.equal(outbox.submissions.length, 1);
      assert.equal(outbox.submissions[0].answers.database, 'postgres');
      assert.equal(outbox.submissions[0].gateDecision, 'APPROVE');

      // Verify waitForStudioBatch picks up the submitted batch immediately
      const waited = await waitForStudioBatch({ projectDir: tmpDir, batchId: 'BATCH-001', timeoutSeconds: 2 });
      assert.ok(waited);
      assert.equal(waited.batchId, 'BATCH-001');

      // 5. POST /api/rules -> appends next numbered rule to LOCKED-RULES.md
      const rulePost = await httpRequest(`${instance.url}/api/rules`, {
        method: 'POST',
        body: {
          category: 'Design Lock',
          rule: 'Never use stark white #FFFFFF on canvas surfaces.',
        },
      });
      assert.equal(rulePost.status, 201);
      const ruleJson = JSON.parse(rulePost.text);
      assert.equal(ruleJson.ok, true);
      assert.match(ruleJson.ruleId, /^RULE-\d{3}$/);

      const lockedRulesMd = await fs.readFile(path.join(tmpDir, '.zerodrift/memory/LOCKED-RULES.md'), 'utf8');
      assert.ok(lockedRulesMd.includes(ruleJson.ruleId));
      assert.ok(lockedRulesMd.includes('Never use stark white #FFFFFF on canvas surfaces.'));

      // 6. GET /api/events -> valid text/event-stream SSE connection
      const sseResult = await new Promise((resolve, reject) => {
        const u = new URL(`${instance.url}/api/events`);
        const req = http.get(
          { hostname: u.hostname, port: u.port, path: u.pathname },
          (res) => {
            const contentType = res.headers['content-type'] || '';
            res.once('data', (chunk) => {
              const firstChunk = chunk.toString('utf8');
              res.destroy();
              req.destroy();
              resolve({ status: res.statusCode, contentType, firstChunk });
            });
          }
        );
        req.on('error', (err) => {
          if (err.code !== 'ECONNRESET') reject(err);
        });
      });
      assert.equal(sseResult.status, 200);
      assert.ok(sseResult.contentType.includes('text/event-stream'));
      assert.ok(sseResult.firstChunk.includes('event: connected'));

      // 7. GET /api/checkpoints, /api/handoff, /api/codemap & POST /api/design-lock
      const cpRes = await httpRequest(`${instance.url}/api/checkpoints`);
      assert.equal(cpRes.status, 200);
      const cpJson = JSON.parse(cpRes.text);
      assert.equal(cpJson.ok, true);
      assert.ok(Array.isArray(cpJson.checkpoints));

      const handoffRes = await httpRequest(`${instance.url}/api/handoff`);
      assert.equal(handoffRes.status, 200);
      const handoffJson = JSON.parse(handoffRes.text);
      assert.equal(handoffJson.ok, true);
      assert.ok(handoffJson.lineCount > 0 && handoffJson.lineCount < 120);
      assert.ok(handoffJson.resumePrompt.includes('StudioDemo'));

      const cmRes = await httpRequest(`${instance.url}/api/codemap`);
      assert.equal(cmRes.status, 200);
      const cmJson = JSON.parse(cmRes.text);
      assert.equal(cmJson.ok, true);
      assert.ok(cmJson.codemap.summary.totalNodes >= 1);

      const lockRes = await httpRequest(`${instance.url}/api/design-lock`, {
        method: 'POST',
        body: {
          layoutId: 'modern-glass',
          fontPairingId: 'cairo-inter',
          paletteId: 'warm-ivory-olive',
        },
      });
      assert.equal(lockRes.status, 200);
      const lockedTokens = JSON.parse(await fs.readFile(path.join(tmpDir, '.zerodrift/memory/DESIGN-TOKENS.json'), 'utf8'));
      assert.equal(lockedTokens.layoutConcept, 'modern-glass');
      assert.equal(lockedTokens.fontPairing, 'cairo-inter');

      // 8. Portable single-file HTML export
      const exported = await exportPortableStudio(tmpDir);
      const reportHtml = await fs.readFile(exported.outPath, 'utf8');
      assert.ok(reportHtml.includes('window.__ZERODRIFT_DATA__'));
      assert.ok(reportHtml.includes('StudioDemo'));
      assert.ok(reportHtml.includes('#FBF9F5'));
      assert.equal(reportHtml.includes('<script src="./app.js"></script>'), false);
    } finally {
      if (instance) await instance.close();
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('ZeroDrift v3.0 Enterprise Armor (Mojibake, .env Parity, Secrets, Time Machine, Handoff & Demo)', () => {
  it('validate-project.mjs catches intentional UTF-8 Mojibake, undocumented process.env var, and hardcoded secret, then passes when clean', async () => {
    const tmpDir = await makeTempDir('zerodrift-v3-scanners-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'ArmorApp' });
      await fs.mkdir(path.join(tmpDir, 'src'), { recursive: true });
      await fs.writeFile(path.join(tmpDir, '.env.example'), 'DATABASE_URL=postgres://localhost/app\n', 'utf8');

      // 1. Inject intentional UTF-8 mojibake (double-encoded Arabic + replacement char), undocumented env var, and fake AWS key
      const badCode = [
        `export const brokenLabel = "${'\u00D8\u00A3\u00D8\u00A7'} corrupted ${'\uFFFD'}";`,
        'export const apiKey = process.env.STRIPE_WEBHOOK_SECRET;',
        'export const leakedAws = "AKIA' + 'IOSFODNN7EXAMPLE";',
      ].join('\n');
      await fs.writeFile(path.join(tmpDir, 'src/config.ts'), `${badCode}\n`, 'utf8');

      const [mojiFail, envFail, secFail, fullFail] = await Promise.all([
        checkMojibake(tmpDir),
        checkEnvParity(tmpDir),
        checkHardcodedSecrets(tmpDir),
        validateProject(tmpDir),
      ]);

      assert.equal(mojiFail.ok, false);
      assert.ok(mojiFail.violations.some((v) => v.file === 'src/config.ts'));

      assert.equal(envFail.ok, false);
      assert.ok(envFail.violations.some((v) => v.variable === 'STRIPE_WEBHOOK_SECRET'));

      assert.equal(secFail.ok, false);
      assert.ok(secFail.violations.some((v) => v.pattern.includes('AWS')));

      assert.equal(fullFail.ok, false);

      // 2. Fix all three violations and verify clean PASS
      await fs.writeFile(
        path.join(tmpDir, '.env.example'),
        'DATABASE_URL=postgres://localhost/app\nSTRIPE_WEBHOOK_SECRET=\n',
        'utf8'
      );
      await fs.writeFile(
        path.join(tmpDir, 'src/config.ts'),
        'export const cleanLabel = "Clinic ERP";\nexport const apiKey = process.env.STRIPE_WEBHOOK_SECRET;\n',
        'utf8'
      );

      const fullPass = await validateProject(tmpDir);
      assert.equal(fullPass.ok, true, `Expected clean v3.0 scanner pass, got: ${fullPass.errors.join('; ')}`);
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('checkpoint.mjs creates git checkpoints, lists timeline, diffs changes, and produces safe rollback plan without destroying files', async () => {
    const tmpDir = await makeTempDir('zerodrift-v3-checkpoint-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'TimeMachineApp' });
      await fs.writeFile(path.join(tmpDir, 'app.js'), 'export const v = 1;\n', 'utf8');

      const safeDir = tmpDir.replace(/\\/g, '/');
      const git = (args) =>
        execFileSync('git', ['-c', `safe.directory=${safeDir}`, ...args], {
          cwd: tmpDir,
          stdio: 'pipe',
        });

      git(['init', '-b', 'main']);
      git(['add', '-A']);
      git(['-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-m', 'init']);

      const cp = await createCheckpoint(tmpDir, 'pre-S-02-billing');
      assert.equal(cp.id, 'CP-001');
      assert.equal(cp.isGitRepo, true);
      assert.ok(cp.gitHead);
      assert.ok(cp.gitTag && cp.gitTag.startsWith('zd-cp-'));

      // Modify file after checkpoint (uncommitted edit)
      await fs.writeFile(path.join(tmpDir, 'app.js'), 'export const v = 2;\n', 'utf8');

      const list = await listCheckpoints(tmpDir);
      assert.equal(list.length, 1);

      const diff = await diffCheckpoint(tmpDir, 'CP-001');
      assert.ok(diff.changedFiles.some((f) => f.file === 'app.js'));

      const plan = await buildRollbackPlan(tmpDir, 'CP-001');
      assert.equal(plan.safe, true);
      assert.ok(plan.recommendedSafeCommand.includes('git stash'));
      assert.ok(plan.recommendedSafeCommand.includes(cp.gitTag));

      // Verify uncommitted user work was NEVER destroyed
      assert.equal(await fs.readFile(path.join(tmpDir, 'app.js'), 'utf8'), 'export const v = 2;\n');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('handoff.mjs compiles .zerodrift/HANDOFF.md under 120 lines with locked rules, active slice & resume prompt', async () => {
    const tmpDir = await makeTempDir('zerodrift-v3-handoff-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'HandoffApp' });
      const res = await generateHandoff(tmpDir, { writeFile: true });
      assert.ok(res.lineCount > 10 && res.lineCount < 120, `Expected < 120 lines, got ${res.lineCount}`);
      const content = await fs.readFile(path.join(tmpDir, '.zerodrift/HANDOFF.md'), 'utf8');
      assert.ok(content.includes('RULE-001'));
      assert.ok(content.includes('Active Slice'));
      assert.ok(content.includes('1-Line Fresh Session Resume Prompt'));
      assert.ok(content.includes('HandoffApp'));
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('build-demo.mjs generates valid self-contained docs/demo/index.html with CodeMap, Showcase, 6 tabs and zero broken tokens', async () => {
    const res = await buildLiveDemo(REPO_ROOT);
    const html = await fs.readFile(res.demoHtmlPath, 'utf8');
    assert.ok(html.includes('window.__ZERODRIFT_DATA__'));
    assert.ok(html.includes('NexusCare ERP'));
    assert.ok(html.includes('codemap-svg'));
    assert.ok(html.includes('showcase-layouts-grid'));
    assert.ok(html.includes('IBM Plex Sans Arabic'));
    assert.ok(html.includes('الأسئلة والموافقات'));
    assert.ok(html.includes('panel-command'));
    assert.ok(html.includes('panel-inbox'));
    assert.ok(html.includes('panel-wiring'));
    assert.ok(html.includes('panel-design'));
    assert.ok(html.includes('panel-memory'));
    assert.ok(html.includes('panel-hub'));
    assert.ok(html.includes('checkpoints-container'));
    assert.equal(html.includes('{{FILL:'), false);
    assert.equal(html.includes('<script src="./app.js"></script>'), false);
  });
});

describe('ZeroDrift v4.0 Sovereign Features (Native CodeMap, Bilingual --lang ar & Clean Studio Parsing)', () => {
  it('code-map.mjs detects valid wires, broken wire, circular import, orphan file, layer violation & exact blast radius', async () => {
    const tmpDir = await makeTempDir('zerodrift-v4-codemap-');
    try {
      await initProject({ target: tmpDir, adapter: 'none', name: 'CodeMapApp' });
      await fs.mkdir(path.join(tmpDir, 'src/client/pages'), { recursive: true });
      await fs.mkdir(path.join(tmpDir, 'src/client/api'), { recursive: true });
      await fs.mkdir(path.join(tmpDir, 'src/routes'), { recursive: true });
      await fs.mkdir(path.join(tmpDir, 'src/services'), { recursive: true });
      await fs.mkdir(path.join(tmpDir, 'src/db'), { recursive: true });

      await fs.writeFile(path.join(tmpDir, 'src/db/invoices.repository.ts'), 'export const saveInvoice = () => true;\n', 'utf8');
      await fs.writeFile(
        path.join(tmpDir, 'src/services/invoice.service.ts'),
        'import { saveInvoice } from "../db/invoices.repository";\nexport const createInvoice = () => saveInvoice();\n',
        'utf8'
      );
      await fs.writeFile(
        path.join(tmpDir, 'src/routes/invoices.routes.ts'),
        'import { createInvoice } from "../services/invoice.service";\nrouter.post("/api/invoices", requireAuth, () => createInvoice());\n',
        'utf8'
      );
      await fs.writeFile(
        path.join(tmpDir, 'src/client/api/apiClient.ts'),
        'export const postInv = () => fetch("/api/invoices", { method: "POST" });\nexport const broken = () => fetch("/api/missing-endpoint");\n',
        'utf8'
      );
      await fs.writeFile(
        path.join(tmpDir, 'src/client/pages/InvoicesPage.tsx'),
        'import { postInv } from "../api/apiClient";\nimport { saveInvoice } from "../../db/invoices.repository";\nexport const Page = () => [postInv, saveInvoice];\n',
        'utf8'
      );
      // Circular dependency pair + orphan dead file
      await fs.writeFile(path.join(tmpDir, 'src/services/cycleA.ts'), 'import { b } from "./cycleB";\nexport const a = () => b;\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, 'src/services/cycleB.ts'), 'import { a } from "./cycleA";\nexport const b = () => a;\n', 'utf8');
      await fs.writeFile(path.join(tmpDir, 'src/services/orphanHelper.ts'), 'export const unused = 123;\n', 'utf8');

      // Seed linked regression entry on invoices.repository.ts
      await fs.writeFile(
        path.join(tmpDir, '.zerodrift/memory/REGRESSION-LEDGER.json'),
        JSON.stringify({
          schemaVersion: '4.0.0',
          entries: [{ id: 'BUG-099', severity: 'P1', filesTouched: ['src/db/invoices.repository.ts'], invariantToProtect: 'Atomic commit' }],
        }),
        'utf8'
      );

      const map = await buildCodeMap(tmpDir, { writeFile: true });
      assert.equal(map.summary.matchedWireCount, 1);
      assert.equal(map.summary.brokenWireCount, 1);
      assert.ok(map.summary.circularCount >= 1);
      assert.ok(map.diagnostics.orphanFiles.includes('src/services/orphanHelper.ts'));
      assert.ok(map.summary.layerViolationCount >= 1);

      const blast = await computeBlastRadius(tmpDir, 'src/db/invoices.repository.ts');
      assert.ok(blast.directDependents.includes('src/services/invoice.service.ts'));
      assert.ok(blast.transitiveDependents.includes('src/routes/invoices.routes.ts'));
      assert.equal(blast.linkedRegressions.length, 1);
      assert.equal(blast.linkedRegressions[0].id, 'BUG-099');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('init-project.mjs --lang ar sets defaultLocale: "ar" and build-studio strips {{FILL:...}} & raw Markdown', async () => {
    const tmpDir = await makeTempDir('zerodrift-v4-lang-');
    try {
      const initRes = await initProject({ target: tmpDir, adapter: 'none', name: 'ArabicERP', lang: 'ar' });
      assert.equal(initRes.defaultLocale, 'ar');

      const data = await buildStudioData(tmpDir, { writeFile: true });
      assert.equal(data.defaultLocale, 'ar');
      // Template placeholder rows (API-005 {{FILL:...}} and {{FILL: table_name}}) MUST be filtered out cleanly
      assert.equal(data.wiring.routes.some((r) => r.path.includes('{{')), false);
      assert.equal(data.wiring.tables.some((tb) => tb.table.includes('{{')), false);
      assert.equal(cleanMarkdownCell('**`PUBLIC`** *(rate-limited)*'), 'PUBLIC (rate-limited)');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('Cross-Platform Script Syntax & 12-Skill Installer Coexistence', () => {
  it('all .mjs files pass `node --check` syntax verification', () => {
    const mjsFiles = [
      'scripts/init-project.mjs',
      'scripts/doctor.mjs',
      'scripts/validate-project.mjs',
      'scripts/build-studio.mjs',
      'scripts/studio-server.mjs',
      'scripts/wait-for-studio.mjs',
      'scripts/checkpoint.mjs',
      'scripts/handoff.mjs',
      'scripts/build-demo.mjs',
      'scripts/code-map.mjs',
      'tests/suite.test.mjs',
    ];
    for (const rel of mjsFiles) {
      execFileSync(process.execPath, ['--check', path.join(REPO_ROOT, rel)], { stdio: 'pipe' });
    }
  });

  it('install-global.ps1 passes PowerShell AST parse check and isolated 11-skill install preserves sibling skills', async () => {
    const psScript = path.join(REPO_ROOT, 'scripts/install-global.ps1');

    if (process.platform === 'win32') {
      const parseCmd = `$errors = $null; [System.Management.Automation.Language.Parser]::ParseFile('${psScript.replace(/'/g, "''")}', [ref]$null, [ref]$errors) | Out-Null; if ($errors -and $errors.Count -gt 0) { $errors | ForEach-Object { Write-Error $_.Message }; exit 1 }`;
      execFileSync('powershell.exe', ['-NoProfile', '-Command', parseCmd], { stdio: 'pipe' });

      const tmpSkills = await makeTempDir('zerodrift-v2-skills-test-');
      try {
        const siblingDir = path.join(tmpSkills, 'floorplan');
        await fs.mkdir(siblingDir, { recursive: true });
        await fs.writeFile(path.join(siblingDir, 'SKILL.md'), 'sentinel-floorplan', 'utf8');

        execFileSync(
          'powershell.exe',
          ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psScript, '-TargetDir', tmpSkills],
          { stdio: 'pipe' }
        );

        for (const skillName of EXPECTED_SKILLS) {
          await fs.access(path.join(tmpSkills, skillName, 'SKILL.md'));
          await fs.access(path.join(tmpSkills, skillName, 'references/core/memory-and-regression.md'));
          await fs.access(path.join(tmpSkills, skillName, 'references/templates/memory/LOCKED-RULES.md'));
        }
        await fs.access(path.join(tmpSkills, 'zerodrift', 'scripts/studio-server.mjs'));
        await fs.access(path.join(tmpSkills, 'zerodrift', 'studio/index.html'));

        assert.equal(await fs.readFile(path.join(siblingDir, 'SKILL.md'), 'utf8'), 'sentinel-floorplan');

        execFileSync(
          'powershell.exe',
          ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psScript, '-TargetDir', tmpSkills, '-Uninstall'],
          { stdio: 'pipe' }
        );
        await assert.rejects(fs.access(path.join(tmpSkills, 'zerodrift-memory')));
        assert.equal(await fs.readFile(path.join(siblingDir, 'SKILL.md'), 'utf8'), 'sentinel-floorplan');
      } finally {
        await fs.rm(tmpSkills, { recursive: true, force: true });
      }
    }
  });

  it('install-global.sh contains valid POSIX bash structure and all 11 skill names', async () => {
    const shContent = await fs.readFile(path.join(REPO_ROOT, 'scripts/install-global.sh'), 'utf8');
    assert.ok(shContent.startsWith('#!/usr/bin/env bash'));
    assert.ok(shContent.includes('set -euo pipefail'));
    for (const skillName of EXPECTED_SKILLS) {
      assert.ok(shContent.includes(`"${skillName}"`), `install-global.sh missing skill ${skillName}`);
    }
  });
});
