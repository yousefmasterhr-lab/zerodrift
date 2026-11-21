---
name: zerodrift-verify
description: Stage 6A Zero-Error Wiring & Runtime Verification Engine. Executes a strict deterministic verification ladder — compiler/typecheck, production build, dead-code/orphan audit (knip), circular dependency/layering audit (depcruise or static graph), 1:1 frontend-to-backend CONTRACTS.md wiring parity, automated test suite, live runtime/browser smoke verification (zero console/404/500/CORS errors), and incremental floorplan refresh — with a 3-iteration root-cause self-healing loop. Use after building slices or before shipping any change.
---

# ZeroDrift Verify — Zero-Error Wiring & Runtime Verification (Stage 6A)

## Purpose & Triggers

`zerodrift-verify` enforces the Zero-Error Guarantee: nothing is claimed "done" or "verified" until every compiler, bundler, dead-code analyzer, dependency graph check, API wiring audit, automated test, and live runtime/browser probe actually runs and exits cleanly with code `0`.

**Activate when:**
- All vertical slices in Stage 5 (`05-TASKS.md`) are built and ready for full-system verification.
- After any multi-file refactor, API/DB modification, or security remediation fix.
- Standalone whenever a developer asks to verify a codebase, hunt dead code/wiring bugs, or ensure zero build/runtime errors.

**Reference Resolution Order:** `./references/core/{anti-hallucination.md,wiring-discipline.md,state-machine.md}` -> `../../core/...` -> embedded ladder below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** Strict honesty—NEVER claim a check passed unless the exact command ran *after the final edit* and exited `0`.
- **Wiring Discipline (`core/wiring-discipline.md`):** Zero 404/405 route mismatches, zero duplicate servers, zero layer inversions, zero unintended orphan files, zero silent `catch {}`.
- **Deterministic Gate Machine (`core/state-machine.md`):** Root-cause self-healing capped at 3 iterations per failing gate; record exact commands and verdicts in `.zerodrift/STATE.md`.

---

## Execution Algorithm (Step-by-Step)

Run the **7-Step Deterministic Verification Ladder** in exact order. If any step fails, jump to the **Root-Cause Self-Healing Loop**, fix cleanly, and re-run from Step 1 (or the invalidated earliest step) so final verification reflects the untouched final code.

### Step 1: Compiler, Typecheck & Linter Gate
- Execute the project's strict static checks (e.g., `npx tsc --noEmit`, `npm run lint`, `mypy`, `go vet`, `cargo check`).
- **Pass Criteria:** Exit code `0` with zero type errors and zero newly introduced `@ts-ignore` / `@ts-expect-error` / `as any` suppressions.

### Step 2: Production Build Gate
- Execute the project's full production build (e.g., `npm run build`, `vite build`, `next build`, `tsc`).
- **Pass Criteria:** Exit code `0`; production bundles emit cleanly with zero unresolved imports or missing client env errors.

### Step 3: Dead Code, Broken Imports & Orphan File Audit
- Run `npx knip` if configured/available; otherwise perform a deterministic static import/export graph scan across `src/` (and frontend/backend entry points).
- **Pass Criteria:** Zero broken imports, zero unmounted route modules, zero unintended orphan source files or unused critical exports.

### Step 4: Dependency Graph & Circular Dependency Audit
- Run `dependency-cruiser` (`npx depcruise ...`) if installed/configured; otherwise run a static ESM/TS import-cycle check across source modules.
- **Pass Criteria:** Zero runtime circular dependencies and zero layer inversions (e.g., Domain layer importing HTTP/React UI modules).

### Step 5: 1:1 Frontend-to-Backend `CONTRACTS.md` Wiring Parity Audit
Cross-verify all 3 layers deterministically:
1. Enumerate every registered backend route (method + path + auth/RBAC middleware) from the central router.
2. Enumerate every frontend API call (`fetch`, `axios`, custom API client, form action) across client modules.
3. Compare both against `.zerodrift/CONTRACTS.md` (if present):
   - Every frontend call MUST hit an existing backend route with the exact matching HTTP method and compatible request/response DTO shape.
   - Every backend route MUST exist in `CONTRACTS.md` (no shadow/undocumented endpoints).
   - Confirm only ONE active backend server entry point and zero duplicate port listeners exist.
   - Scan for forbidden empty `catch {}` blocks or swallowed API errors returning `[]` silently.

### Step 6: Automated Test Suite Execution
- Run the full automated test suite (`npm test`, `vitest run`, `jest`, `pytest`, etc.).
- **Pass Criteria:** Exit code `0`, zero skipped critical tests, 100% pass across unit, auth/RBAC, and domain integration tests.

### Step 7: Live Runtime / Browser Smoke Verification & Floorplan Sync
1. **API & Server Boot Probe:** Start the server cleanly and probe `/api/health`, unauthenticated protected route (`401`), valid login, and core CRUD flow (stopping any temporary test server cleanly afterward).
2. **Browser UI Verification (for web apps):** Verify critical routes live in a real browser (using the `browser` subagent or Playwright when available):
   - Zero uncaught `console.error` or page exceptions.
   - Zero unexpected `404`, `500`, or CORS network failures.
   - Verify RTL/LTR layout rendering (no broken horizontal overflow) and key interactive states (loading/empty/error/form submit).
3. **Incremental Floorplan Refresh:** If `floorplan/` exists in the workspace, refresh it incrementally so the architectural map stays synced with the verified codebase.

### Root-Cause Self-Healing Loop (Max 3 Iterations)
When any step fails:
1. Capture the exact failing command, exit code, and stack trace / offending `file:line`.
2. Identify the **structural root cause** (e.g., contract field mismatch, missing await/transaction, broken relative import, CORS origin misconfiguration).
3. Apply a clean, minimal, root-cause fix (NEVER suppress warnings, delete failing tests, or swallow exceptions).
4. Re-run the failing check AND any upstream checks affected by the edit.
5. Increment `Self-Healing Iteration Count` in `.zerodrift/STATE.md`. If iteration `3` still fails, STOP immediately, set `Stage 6A: BLOCKED` in `STATE.md`, and present a full diagnostic report to the user.

---

## Adaptive Intelligence Rules

- **Windows Sandbox Server Awareness:** On Windows sandboxes, a test server started in a sandboxed command is reachable only inside that same command—start the server, run HTTP probes, and terminate it cleanly within the same command (or run an in-process test harness like `supertest` / Node `http.createServer` on port `0`).
- **Right-Sized Tooling:** Use `knip` and `depcruise` automatically if available in the project or global environment; never hang trying to download external packages offline—fall back cleanly to Node/TypeScript static inspection scripts.
- **Git Hygiene:** Never commit generated `floorplan/` artifacts unless explicitly requested.

---

## Hard Gate / Stop Criteria

- **MUST NOT** mark Stage 6A `COMPLETED` if ANY of Steps 1–7 failed, was skipped without valid cause (e.g., CLI-only skipping browser check), or was not re-run after the last code edit.
- **MUST STOP** after 3 failed self-healing iterations on the same issue.

---

## Output Contract

1. Exact verification ledger recorded in `.zerodrift/STATE.md` (every command executed, exact exit code, pass/fail verdict, and timestamp).
2. Clean, zero-error codebase ready for Stage 6B (`zerodrift-security`).
3. Concise executive verification table reported to the user (without overstating what was tested).

---

## Tool Integrations

- **Static & Build Tools:** `tsc --noEmit`, `npm run build`, `knip`, `dependency-cruiser`.
- **Test Runners:** `node --test`, `vitest`, `jest`, `playwright`, `pytest`.
- **Visual & Wiring Tools:** `browser` subagent for live UI verification, `floorplan` for incremental map sync.
- **`scripts/code-map.mjs` & `scripts/validate-project.mjs`:** Run `node scripts/code-map.mjs --project .` to deterministically verify zero circular dependencies, zero layer inversions, zero unintended orphan files, and 1:1 frontend-to-backend route wiring parity (`0` broken wires), alongside all 4 deterministic v3.0 scanners (**Color Token Drift**, **UTF-8 Mojibake**, **`.env.example` Parity**, **Hardcoded Secrets**) and `core/data-safety.md` compliance. Report summary in <= 8 lines per `core/concise-chat.md`.
- **Anti-Regression & Studio Refresh (`core/memory-and-regression.md`):** Record every root-cause bug caught during self-healing into `.zerodrift/memory/REGRESSION-LEDGER.json` (and re-verify all existing regression tests for touched files), then run `scripts/build-studio.mjs --project .` so the Verification Scorecard in ZeroDrift Studio updates live.

