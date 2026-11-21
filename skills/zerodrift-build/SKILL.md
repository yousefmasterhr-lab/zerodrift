---
name: zerodrift-build
description: Stage 5 Vertical Slice Implementation Engine. Builds the application slice-by-slice from 05-TASKS.md with strict 1:1 CONTRACTS.md parity, Zod boundary validation, server-side Auth/RBAC, atomic DB transactions, idempotent upserts, zero silent catch blocks, anti-slop 6-state UI, critical automated unit/integration tests, and atomic STATE.md updates after every verified slice. Use during implementation once Stage 3 Architecture & CONTRACTS.md are approved.
---

# ZeroDrift Build — Vertical Slice Implementation Engine (Stage 5)

## Purpose & Triggers

`zerodrift-build` turns locked specifications (`CONTRACTS.md`, `03-ARCHITECTURE.md`, `04-DESIGN-SYSTEM.md`, `05-TASKS.md`) into clean, tested, contract-compliant production code—one small, independently verifiable vertical slice at a time.

**Activate when:**
- Stage 3 (`CONTRACTS.md` & `05-TASKS.md`) is approved (and Stage 4 `04-DESIGN-SYSTEM.md` is approved for UI apps).
- Executing a single vertical slice (`S-01`, `S-02`, ...) or looping autonomously through all remaining slices in `05-TASKS.md`.
- Resuming an interrupted build from `.zerodrift/STATE.md`.

**Reference Resolution Order:** `./references/core/{wiring-discipline.md,security-baseline.md,design-excellence.md}` -> `../../core/...` -> embedded build laws below.

---

## Core Laws Referenced

- **Wiring Discipline (`core/wiring-discipline.md`):** 1:1 `CONTRACTS.md` route/DTO parity, single backend server entry point, single central router, unidirectional dependencies, atomic transactions, idempotent upserts, zero silent `catch {}`.
- **Security Baseline (`core/security-baseline.md`):** Deny-by-default auth, server-side RBAC + tenant/ownership predicates, Zod validation stripping unknown fields, Argon2id/scrypt/bcrypt hashing, zero hash leaks, strict CORS, zero auto-purge on startup.
- **Anti-Hallucination (`core/anti-hallucination.md`):** Read existing files before editing; use only installed/verified APIs; never silence errors with `@ts-ignore` or `as any`; never fake passing tests.
- **Design Excellence (`core/design-excellence.md`):** Apply exact tokens from `04-DESIGN-SYSTEM.md` & `DESIGN-TOKENS.json`, copy tone/glossary from `COPY-STYLE.json`, logical CSS for RTL/LTR, and all 6 interactive UI states.
- **Change Control, Data Safety & Concise Chat (`core/change-control.md`, `core/data-safety.md`, `core/concise-chat.md`):** Never code a mid-build feature change without first opening `CR-00N` in `.zerodrift/CHANGE-REQUEST.md` and updating `CONTRACTS.md` & `05-TASKS.md`. Run `node scripts/code-map.mjs --project . --impact <file>` before sensitive edits. Never emit auto-destructive boot hooks, irreversible ad-hoc migrations, fake HTTP 200/mock fallbacks, or production seed leaks. Keep routine slice chat updates to <= 8 lines pointing to Studio.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Pre-Flight Gate, Living Memory Hydration & Pre-Edit Ripple Check
1. Read `.zerodrift/STATE.md`, `.zerodrift/CONTRACTS.md`, `.zerodrift/05-TASKS.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`, `.zerodrift/studio-outbox.json`, and relevant `.zerodrift/learned-skills/*.md` playbooks (plus `.zerodrift/04-DESIGN-SYSTEM.md` for UI slices).
2. Confirm Gate 3 (`CONTRACTS.md`) is `APPROVED` or `COMPLETED`. If not, STOP and invoke `zerodrift-architect` first.
3. **Mandatory Pre-Edit Ripple Check (`core/memory-and-regression.md`):** Before modifying ANY existing file, check `REGRESSION-LEDGER.json` and dependent imports (`floorplan/architecture.json` or static imports) to list every protected invariant tied to those files; re-verify all linked invariants after editing so fixing A never breaks B.
4. Pick the next dependency-ready `QUEUED` or `IN_PROGRESS` slice from `05-TASKS.md` (always starting with `S-01`: Foundation, Schema, Auth & RBAC).
5. **Time Machine Safety Net:** Run `node scripts/checkpoint.mjs create --project . --label "pre-<slice-id>"` before modifying source files so a non-destructive Git checkpoint is logged in `.zerodrift/memory/CHECKPOINTS.json`.
6. Mark the slice `IN_PROGRESS` in `.zerodrift/STATE.md`.

### Step 2: Implement the Vertical Slice Bottom-Up (Strict Layering)
Build every layer inside the slice in clean dependency order:

1. **Shared Contracts & Schemas Layer:**
   - Implement exact Zod request/response schemas and TypeScript DTOs matching `.zerodrift/CONTRACTS.md`.
   - Export canonical route path constants so frontend and backend share one source of truth.
2. **Database & Repository Layer:**
   - Define migrations/schema matching `CONTRACTS.md` Section 4 (constraints, FKs, indexes, minor-unit integer or `DECIMAL` money).
   - Use parameterized queries/ORM builders 100% of the time; allowlist any dynamic sort column.
   - Select explicit safe columns (never leak `passwordHash`, `salt`, or internal tokens).
   - Ensure all seed/migration routines are idempotent (`ON CONFLICT` / upsert) and NEVER auto-purge data on startup.
3. **Domain & Application Service Layer:**
   - Wrap multi-table writes and financial/stock mutations inside explicit DB transactions.
   - Compute totals, taxes, discounts, stock balances, and timestamps strictly server-side.
   - Enforce tenant/resource ownership (`tenantId` / `ownerId`) on every single-record read/write.
   - Throw typed domain errors (mapped to canonical `ApiErrorEnvelope`)—never silent `catch {}`.
4. **Backend API Route Layer:**
   - Mount routes exclusively through the single central route registry.
   - Apply auth middleware + explicit RBAC role guard on every non-`PUBLIC` route.
   - Validate `params`, `query`, and `body` via Zod at entry (rejecting/stripping unknown mass-assignment fields).
   - Enforce rate limiting on auth/sensitive endpoints and strict `ALLOWED_ORIGINS` CORS.
5. **Frontend UI Layer (for UI slices):**
   - Consume the exact shared route paths and DTO types from `CONTRACTS.md`.
   - Apply `04-DESIGN-SYSTEM.md` tokens, logical CSS (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`), and BiDi isolation (`dir="ltr"` for codes/phones/emails).
   - Implement all 6 states: Default, Loading skeleton, Empty with CTA, Error with Retry, Submitting/Disabled double-submit guard, and 403/404 handling.
   - Use `AbortController` or stale-request guards on async fetches; zero silent catches hiding failed requests as empty lists.

### Step 3: Write Critical Automated Tests (Mandatory per Slice)
Write focused, deterministic unit and integration tests for the slice:
- **Slice `S-01` (Auth/RBAC):** Password hashing verification, login success/failure, `401` on unauthenticated protected route, `403` on insufficient role, zero `passwordHash` in response JSON.
- **Domain Slices (`S-02`..`S-N`):** Money/tax/balance calculations, double-entry/inventory invariants, state transitions, idempotency on duplicate requests, cross-tenant/IDOR denial, and invalid Zod payload `400` rejection.

### Step 4: Per-Slice Micro-Verification & Root-Cause Self-Healing
1. Run the slice's verification commands:
   - Typecheck (`npx tsc --noEmit` or language compiler)
   - Automated tests (`npm test` / slice test command)
2. **If any error occurs:** Diagnose the true root cause, fix cleanly (never add `@ts-ignore`, `as any`, or skip assertions), and re-run. Cap at **3 root-cause iterations**; if still failing, mark the slice `BLOCKED` in `STATE.md` and escalate with exact diagnostics.

### Step 5: Atomic State Commit, Living Memory Capture & Studio Sync
1. If any non-trivial bug was resolved during the slice, log it in `.zerodrift/memory/REGRESSION-LEDGER.json` with `invariantToProtect` and `regressionTestRef`; if a tricky domain/SDK pattern was solved, distill a crisp English playbook in `.zerodrift/learned-skills/<skill-name>.md` and index it in `STATE.md`.
2. Update `05-TASKS.md` checkboxes and mark the slice `VERIFIED` in `.zerodrift/STATE.md` with the exact verification command and exit code `0`.
3. Refresh `.zerodrift/studio-data.json` via `scripts/build-studio.mjs --project .` so ZeroDrift Studio reflects the completed slice live via SSE.
4. **Context Rot Prevention:** After every 2 completed slices (or at the final slice before Stage 6A), run `node scripts/handoff.mjs --project .` to refresh `.zerodrift/HANDOFF.md` (<120 lines) with an up-to-date 1-line fresh session resume prompt.
5. If in **Autonomous Build Mode**, immediately proceed to the next slice in `05-TASKS.md`. Once all slices are `VERIFIED`, automatically hand off to **Stage 6A (`zerodrift-verify`)** and **Stage 6B (`zerodrift-security`)**.

---

## Adaptive Intelligence Rules

- **Contract Amendment Discipline:** If real implementation uncovers a missing field, pagination param, or edge-case status code in `CONTRACTS.md`, STOP editing blindly—record a **Contract Amendment** in `.zerodrift/CONTRACTS.md` Section 5 first, update `STATE.md`, and sync both backend and frontend in the same slice.
- **Existing Codebase Hygiene (Brownfield):** Inspect `floorplan/architecture.json` (if present) before multi-file edits to map full blast radius, and respect existing project conventions where they do not violate `core/security-baseline.md` or `core/wiring-discipline.md`.

---

## Hard Gate / Stop Criteria

- **MUST NOT** invent API routes, database columns, or environment variables not registered in `.zerodrift/CONTRACTS.md`.
- **MUST NOT** advance to slice `S-(N+1)` while slice `S-N` has failing typechecks or failing unit/integration tests.
- **MUST NOT** leave stub handlers returning hardcoded fake success data in a slice marked `VERIFIED`.
- **MUST STOP** and escalate if self-healing exceeds 3 iterations or if an unapproved destructive schema migration is needed.

---

## Output Contract

For every completed vertical slice:
1. Clean, layered, contract-compliant source files (DB + Service + API + UI where applicable).
2. Passing automated unit/integration tests covering critical business rules, auth/RBAC, and validation boundaries.
3. Updated `.zerodrift/05-TASKS.md` and `.zerodrift/STATE.md` with exact verification command and exit code `0`.

---

## Tool Integrations

- **Local compiler & test runner:** `npx tsc --noEmit`, `npm test`, `node --test`, `pytest`, `go test`, `cargo test` depending on stack.
- **`floorplan/architecture.json`:** Checked prior to multi-file edits when present in workspace.
- **Downstream Handoff:** Once all slices in `05-TASKS.md` are `VERIFIED`, transitions directly into `zerodrift-verify` (Stage 6A).

