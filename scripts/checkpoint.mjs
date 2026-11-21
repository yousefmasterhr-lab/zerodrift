#!/usr/bin/env node
/**
 * ZeroDrift v3.0 Time Machine & Git Checkpoints CLI (Zero-Dependency Node.js 18+ ESM)
 * Creates non-destructive checkpoints logged to `.zerodrift/memory/CHECKPOINTS.json`
 * (with annotated git tags when inside a git repository), lists timelines, diffs changes,
 * and outputs safe human-confirmed rollback plans without ever destroying uncommitted work.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

function sleepSync(ms) {
  const shared = new SharedArrayBuffer(4);
  const view = new Int32Array(shared);
  Atomics.wait(view, 0, 0, ms);
}

/**
 * Runs a git command with automatic exponential backoff retry on `index.lock`
 * or exit 128 lock contention (up to 4 retries over ~2.5s).
 */
export function runGitWithRetry(projectDir, args, maxRetries = 4) {
  const safeDir = path.resolve(projectDir).replace(/\\/g, '/');
  const delays = [150, 350, 750, 1250];
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return execFileSync('git', ['-c', `safe.directory=${safeDir}`, ...args], {
        cwd: projectDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim();
    } catch (err) {
      lastError = err;
      const stderr = String(err.stderr || err.message || '');
      const isLockError = /index\.lock|Unable to create .*\.lock|Another git process/i.test(stderr) || err.status === 128;
      if (!isLockError || attempt === maxRetries) {
        throw err;
      }
      sleepSync(delays[attempt] || 500);
    }
  }
  throw lastError;
}

function runGit(projectDir, args) {
  return runGitWithRetry(projectDir, args);
}

function isGitRepo(projectDir) {
  try {
    return runGit(projectDir, ['rev-parse', '--is-inside-work-tree']) === 'true';
  } catch {
    return false;
  }
}

function slugify(str) {
  return (
    String(str || 'checkpoint')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32) || 'checkpoint'
  );
}

async function readLedger(projectDir) {
  const filePath = path.join(path.resolve(projectDir), '.zerodrift', 'memory', 'CHECKPOINTS.json');
  try {
    const parsed = JSON.parse(await fs.readFile(filePath, 'utf8'));
    if (!Array.isArray(parsed.checkpoints)) parsed.checkpoints = [];
    return { filePath, data: parsed };
  } catch {
    return {
      filePath,
      data: {
        schemaVersion: '3.0.0',
        projectName: path.basename(path.resolve(projectDir)),
        updatedAt: new Date().toISOString(),
        checkpoints: [],
      },
    };
  }
}

export async function createCheckpoint(projectDir, label = 'milestone') {
  const absProject = path.resolve(projectDir);
  const { filePath, data } = await readLedger(absProject);
  const now = new Date();
  const iso = now.toISOString();
  const stamp = iso.replace(/[-:T]/g, '').slice(0, 14);
  const slug = slugify(label);
  const nextIdx = data.checkpoints.length + 1;
  const id = `CP-${String(nextIdx).padStart(3, '0')}`;

  const inGit = isGitRepo(absProject);
  let gitHead = null;
  let branch = null;
  let dirtyFilesCount = 0;
  let gitTag = null;

  if (inGit) {
    try {
      gitHead = runGit(absProject, ['rev-parse', 'HEAD']);
    } catch {
      gitHead = null;
    }
    try {
      branch = runGit(absProject, ['rev-parse', '--abbrev-ref', 'HEAD']);
    } catch {
      branch = null;
    }
    try {
      const porcelain = runGit(absProject, ['status', '--porcelain']);
      dirtyFilesCount = porcelain ? porcelain.split(/\r?\n/).filter(Boolean).length : 0;
    } catch {
      dirtyFilesCount = 0;
    }

    if (gitHead) {
      const candidateTag = `zd-cp-${stamp}-${slug}`;
      try {
        runGit(absProject, [
          '-c',
          'user.name=ZeroDrift Time Machine',
          '-c',
          'user.email=checkpoint@zerodrift.dev',
          'tag',
          '-a',
          candidateTag,
          '-m',
          `ZeroDrift Checkpoint ${id}: ${label}`,
        ]);
        gitTag = candidateTag;
      } catch {
        // Fallback to lightweight tag if annotated tag fails
        try {
          runGit(absProject, ['tag', candidateTag]);
          gitTag = candidateTag;
        } catch {
          gitTag = null;
        }
      }
    }
  }

  const entry = {
    id,
    timestamp: iso,
    label: String(label).trim() || 'milestone',
    isGitRepo: inGit,
    gitHead,
    branch,
    dirtyFilesCount,
    gitTag,
  };

  data.checkpoints.push(entry);
  data.updatedAt = iso;
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  return entry;
}

export async function listCheckpoints(projectDir) {
  const { data } = await readLedger(projectDir);
  return data.checkpoints;
}

export async function diffCheckpoint(projectDir, cpId) {
  const absProject = path.resolve(projectDir);
  const checkpoints = await listCheckpoints(absProject);
  const cp = checkpoints.find((c) => c.id === cpId || c.gitTag === cpId);
  if (!cp) {
    throw new Error(`Checkpoint "${cpId}" not found in .zerodrift/memory/CHECKPOINTS.json`);
  }

  if (!cp.isGitRepo || !cp.gitHead) {
    return {
      checkpoint: cp,
      ref: null,
      changedFiles: [],
      note: 'Checkpoint was recorded without a Git HEAD commit; file diff unavailable.',
    };
  }

  const ref = cp.gitTag || cp.gitHead;
  const changedMap = new Map();

  try {
    const committed = runGit(absProject, ['diff', '--name-status', `${ref}..HEAD`]);
    for (const line of committed.split(/\r?\n/).filter(Boolean)) {
      const [status, ...rest] = line.split(/\t+/);
      const file = rest.join('\t');
      if (file) changedMap.set(file, { status, file, scope: 'committed' });
    }
  } catch {
    // Ignore if HEAD equals ref
  }

  try {
    const working = runGit(absProject, ['status', '--porcelain']);
    for (const line of working.split(/\r?\n/).filter(Boolean)) {
      const status = line.slice(0, 2).trim() || 'M';
      const file = line.slice(3).trim();
      if (file) changedMap.set(file, { status, file, scope: 'working-tree' });
    }
  } catch {
    // Ignore
  }

  return {
    checkpoint: cp,
    ref,
    changedFiles: [...changedMap.values()],
  };
}

export async function buildRollbackPlan(projectDir, cpId) {
  const absProject = path.resolve(projectDir);
  const checkpoints = await listCheckpoints(absProject);
  const cp = checkpoints.find((c) => c.id === cpId || c.gitTag === cpId);
  if (!cp) {
    throw new Error(`Checkpoint "${cpId}" not found in .zerodrift/memory/CHECKPOINTS.json`);
  }

  const ref = cp.gitTag || cp.gitHead;
  if (!ref) {
    return {
      checkpoint: cp,
      safe: true,
      note: 'No Git commit reference captured for this checkpoint; restore manually from backups.',
      commands: [],
    };
  }

  const branchName = `restore-${cp.id.toLowerCase()}-${slugify(cp.label).slice(0, 16)}`;
  return {
    checkpoint: cp,
    safe: true,
    warning: 'ZeroDrift NEVER runs destructive rollbacks automatically. Review and run one of these safe commands explicitly:',
    recommendedSafeCommand: `git stash push -u -m "pre-rollback-${cp.id}" && git checkout -b ${branchName} ${ref}`,
    nonDestructiveRevertCommand: `git revert --no-commit ${ref}..HEAD`,
    commands: [
      `# Option A (Recommended — zero data loss): stash uncommitted edits and inspect/resume on a fresh restore branch`,
      `git stash push -u -m "pre-rollback-${cp.id}"`,
      `git checkout -b ${branchName} ${ref}`,
      `# Option B (Linear history safe revert): revert commits after ${ref} without rewriting history`,
      `git revert --no-commit ${ref}..HEAD`,
    ],
  };
}

function printHelp() {
  console.log(`ZeroDrift v3.0 Time Machine & Checkpoints CLI

Usage:
  node scripts/checkpoint.mjs create --project <dir> --label "<slice-or-milestone>"
  node scripts/checkpoint.mjs list --project <dir>
  node scripts/checkpoint.mjs diff --project <dir> --id <CP-001>
  node scripts/checkpoint.mjs rollback-plan --project <dir> --id <CP-001>
`);
}

function parseArgs(argv) {
  const sub = argv[0];
  const args = { sub, project: process.cwd(), label: 'milestone', id: null, help: false };
  if (!sub || sub === '--help' || sub === '-h') {
    args.help = true;
    return args;
  }
  for (let i = 1; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
    else if (t === '--label' && argv[i + 1]) args.label = argv[++i];
    else if (t === '--id' && argv[i + 1]) args.id = argv[++i];
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      printHelp();
      process.exit(0);
    }

    if (args.sub === 'create') {
      const cp = await createCheckpoint(args.project, args.label);
      console.log(JSON.stringify(cp, null, 2));
    } else if (args.sub === 'list') {
      const list = await listCheckpoints(args.project);
      console.log(JSON.stringify(list, null, 2));
    } else if (args.sub === 'diff') {
      if (!args.id) throw new Error('--id <CP-XXX> is required for diff');
      const diff = await diffCheckpoint(args.project, args.id);
      console.log(JSON.stringify(diff, null, 2));
    } else if (args.sub === 'rollback-plan') {
      if (!args.id) throw new Error('--id <CP-XXX> is required for rollback-plan');
      const plan = await buildRollbackPlan(args.project, args.id);
      console.log(JSON.stringify(plan, null, 2));
    } else {
      throw new Error(`Unknown subcommand "${args.sub}". Use create | list | diff | rollback-plan.`);
    }
  } catch (err) {
    console.error(`[ZeroDrift Checkpoint Error] ${err.message}`);
    process.exit(1);
  }
}

