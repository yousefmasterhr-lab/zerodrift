# Core Law 8: Mid-Build Change Control & Drift Prevention Gate

> **Prime Directive:** Mid-project feature requests and "quick tweaks" during Stage 5 (`Build`) are the #1 cause of spec/contract/code desynchronization. ZeroDrift enforces a lightweight, deterministic **Change Impact Gate** so every mid-build evolution updates contracts first and protects every existing invariant.

---

## 1. Trigger Conditions (When a Change Request Is Mandatory)

Any of the following occurring **after Gate 3 (`CONTRACTS.md`) is locked** triggers the Change Control Gate:
- Adding a new feature, screen, API route, background job, or database table/column.
- Modifying an existing business formula, RBAC role permission, status enum, or validation constraint.
- Altering a locked visual/copy convention in `DESIGN-TOKENS.json` or `COPY-STYLE.json`.

*(Pure internal refactors or bug fixes that preserve 100% of `CONTRACTS.md` and `01-PRD.md` do NOT need a CR, though they still require the Pre-Edit Ripple Check and `REGRESSION-LEDGER.json` logging.)*

---

## 2. The 4-Step Mandatory Change Impact Gate

Before editing a single line of application code for a mid-build change:

### Step 1: Open a Lightweight Change Request (`.zerodrift/CHANGE-REQUEST.md`)
Assign the next sequential ID (`CR-001`, `CR-002`, ...) in crisp **English** containing:
- Request summary & business rationale
- Affected stage(s) (`PRD`, `Architecture`, `CONTRACTS`, `Design`, `Slices`)
- Approval status (`PROPOSED` -> `APPROVED` -> `IMPLEMENTED`)

### Step 2: Compute Exact Ripple / Blast Radius
Inspect all 4 truth anchors BEFORE touching code:
1. **`.zerodrift/CONTRACTS.md`:** List every affected API route (`API-*`), DTO schema, DB table/index, and environment variable.
2. **`.zerodrift/03-ARCHITECTURE.md`:** Check if module boundaries, transactions, or Red-Team mitigations change.
3. **`.zerodrift/memory/REGRESSION-LEDGER.json`:** List every existing `BUG-*` entry whose `filesTouched` overlaps the blast radius and every `invariantToProtect` that must remain unbroken.
4. **`.zerodrift/05-TASKS.md` & `floorplan/architecture.json` (if present):** List every existing vertical slice, screen, and test impacted.

### Step 3: Contract-First & Task-First Synchronization
1. Append a **Contract Amendment** entry in `.zerodrift/CONTRACTS.md` Section 5 AND update the affected route/DTO/table rows in Sections 1–4.
2. Add or amend the corresponding vertical slice (`S-CR-01` or updated slice deliverables) in `.zerodrift/05-TASKS.md`.
3. Create a **Time Machine Checkpoint** via `scripts/checkpoint.mjs create --project . --label "pre-CR-001"` before editing source files.

### Step 4: Execute, Re-Verify & Close
1. Implement backend, frontend, migration, and tests in exact parity with the amended `CONTRACTS.md`.
2. Re-run ALL linked regression tests from Step 2 plus `scripts/validate-project.mjs`, typecheck, and build.
3. Mark the CR `IMPLEMENTED` in `.zerodrift/CHANGE-REQUEST.md`, update `.zerodrift/STATE.md`, and refresh ZeroDrift Studio (`scripts/build-studio.mjs`).

---

## 3. Forbidden Shortcuts

- Never implement a "quick" new endpoint or DB column first and promise to update `CONTRACTS.md` later.
- Never silently drop or weaken an existing RBAC check, Zod constraint, or locked rule in `LOCKED-RULES.md` to accommodate a new request without explicit user sign-off.

