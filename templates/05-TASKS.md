# 05 — Vertical Slice Execution Plan (`05-TASKS.md`)

> **Stage 3C / Stage 5 Artifact (`zerodrift-architect` -> `zerodrift-build`).** Every slice delivers a thin, complete, independently verifiable end-to-end vertical capability (DB + Service + API + UI + Critical Test) against `CONTRACTS.md`.

## Slice Execution Rules

1. Complete slices strictly in dependency order unless explicitly marked parallel-safe.
2. Never mark a slice `VERIFIED` until its exact verification commands exit `0` and `.zerodrift/STATE.md` is updated.
3. Every slice touching money, balances, inventory, permissions, or state transitions MUST include automated unit/integration tests.

---

## Slice Queue

### Slice `S-01`: Foundation, Database Schema, Auth & RBAC Core
- **Status:** `QUEUED`
- **Depends On:** None
- **Contract Scope:** `API-001`..`API-004`, `users` & `audit_logs` tables, env validation, centralized error middleware
- **Deliverables:**
  - [ ] Project scaffold, TypeScript strict config, lint/test scripts, `.env.example`
  - [ ] Database schema + idempotent migration & seed script
  - [ ] Password hashing (Argon2id/scrypt/bcrypt), signed session/JWT auth, deny-by-default RBAC middleware
  - [ ] Automated tests for login, invalid credentials, unauthenticated 401, and forbidden 403
- **Slice Verification Gate:** `{{FILL: e.g., npx tsc --noEmit && npm test}}`

### Slice `S-02`: `{{FILL: Primary Core Domain Vertical Slice}}`
- **Status:** `QUEUED`
- **Depends On:** `S-01`
- **Contract Scope:** `{{FILL: API IDs & Tables from CONTRACTS.md}}`
- **Deliverables:**
  - [ ] Repository + transactional service with Zod validation & server-side calculations
  - [ ] Backend routes mounted in single central router matching `CONTRACTS.md`
  - [ ] Frontend screen(s) implementing all 6 UI states + RTL/LTR parity
  - [ ] Critical business logic unit/integration tests
- **Slice Verification Gate:** `{{FILL: Exact test & build commands}}`

### Slice `S-03`: `{{FILL: Secondary Module / Polish / Exports}}`
- **Status:** `QUEUED`
- **Depends On:** `S-02`
- **Contract Scope:** `{{FILL: API IDs & Tables}}`
- **Deliverables:**
  - [ ] `{{FILL: Concrete deliverables}}`
- **Slice Verification Gate:** `{{FILL: Exact verification commands}}`

