# GitHub Copilot Instructions — ZeroDrift Engineering Standard

This repository follows the **ZeroDrift AI Engineering Operating System**.

## Required Context Files
Before suggesting or editing code, inspect:
- `.zerodrift/STATE.md` — Active stage, current vertical slice, learned skills index, and locked architectural decisions.
- `.zerodrift/memory/LOCKED-RULES.md` & `REGRESSION-LEDGER.json` — Permanent user rules and protected bug invariants (never violate or regress them).
- `.zerodrift/memory/DESIGN-TOKENS.json` — Locked palette hex codes & forbidden colors (verified by `scripts/validate-project.mjs`).
- `.zerodrift/CONTRACTS.md` — Single source of truth for HTTP routes, Auth/RBAC rules, Zod DTO schemas, DB tables, and environment variables.
- `.zerodrift/04-DESIGN-SYSTEM.md` — Color/typography tokens, RTL/LTR logical CSS rules, and 6-state UI specifications.
- **Language & Concise Chat Law:** Write all internal artifacts, comments, contracts, memory ledgers, and code strictly in crisp **English**; keep routine chat updates concise (5–8 lines max) and use Natural Business Arabic (zero robotic AI phrasing) + pinned sticky Action columns in Arabic/bilingual UIs.

## Mandatory Code Generation Rules
1. **Contract Parity:** Never invent API routes, request fields, or env vars missing from `.zerodrift/CONTRACTS.md`.
2. **Security-by-Default:**
   - Protect every non-public backend route with server-side authentication and explicit RBAC checks.
   - Scope single-record DB reads/mutations by authenticated `tenantId` / `ownerId` to prevent IDOR.
   - Validate all external input (`params`, `query`, `body`) with Zod (or project validator) and strip unknown keys.
   - Hash passwords only with Argon2id, scrypt, or bcrypt (`cost >= 12`); never return `passwordHash` or secrets in DTOs.
   - Use parameterized SQL exclusively; allowlist dynamic `ORDER BY` identifiers; enforce explicit `ALLOWED_ORIGINS` CORS.
3. **Reliability & Wiring:**
   - Wrap multi-table mutations and financial/stock updates inside database transactions.
   - Compute totals, taxes, and balances strictly server-side.
   - Never write empty `catch {}` blocks or swallow API errors silently as empty arrays.
4. **UI & Accessibility:**
   - Use CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) for RTL/LTR compatibility.
   - Implement Loading skeletons, Empty states with CTA, Error states with Retry, and double-submit button guards.
5. **Verification:**
   - Never report code as verified without running typecheck, build, and automated tests and observing exit code `0`.

