#!/usr/bin/env node
/**
 * ZeroDrift Studio Response Waiter (Zero-Dependency Node.js 18+ ESM)
 * Waits cleanly until a user submits interactive answers for `<batchId>` in ZeroDrift Studio
 * (`.zerodrift/studio-outbox.json`) and prints the JSON response payload to stdout.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

async function readSubmission(outboxPath, batchId) {
  try {
    const outbox = JSON.parse(await fs.readFile(outboxPath, 'utf8'));
    if (!Array.isArray(outbox.submissions)) return null;
    if (!batchId) return outbox.submissions[outbox.submissions.length - 1] || null;
    return outbox.submissions.find((s) => s.batchId === batchId) || null;
  } catch {
    return null;
  }
}

export async function waitForStudioBatch({ projectDir = process.cwd(), batchId = null, timeoutSeconds = 300, pollMs = 400 } = {}) {
  const outboxPath = path.join(path.resolve(projectDir), '.zerodrift', 'studio-outbox.json');
  const deadline = Date.now() + timeoutSeconds * 1000;

  while (Date.now() <= deadline) {
    const found = await readSubmission(outboxPath, batchId);
    if (found) return found;
    await new Promise((r) => setTimeout(r, pollMs));
  }
  return null;
}

function parseCliArgs(argv) {
  const args = { project: process.cwd(), batch: null, timeout: 300, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === '--help' || t === '-h') args.help = true;
    else if (t === '--project' && argv[i + 1]) args.project = path.resolve(argv[++i]);
    else if (t === '--batch' && argv[i + 1]) args.batch = argv[++i];
    else if (t === '--timeout' && argv[i + 1]) args.timeout = Number(argv[++i]);
  }
  return args;
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  const args = parseCliArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Usage: node scripts/wait-for-studio.mjs --project <dir> --batch <id> [--timeout <seconds>]');
    process.exit(0);
  }
  const submission = await waitForStudioBatch({
    projectDir: args.project,
    batchId: args.batch,
    timeoutSeconds: args.timeout,
  });
  if (!submission) {
    console.error(`[ZeroDrift Wait Timeout] No submission received for batch "${args.batch || 'latest'}" within ${args.timeout}s.`);
    process.exit(2);
  }
  console.log(JSON.stringify(submission, null, 2));
  process.exit(0);
}

