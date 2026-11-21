# CODEX.md — OpenAI Codex Adapter for ZeroDrift

This workspace is governed by the **ZeroDrift AI Engineering Operating System** (also compatible with root `AGENTS.md`).

## Mandatory Startup Sequence
1. Inspect `.zerodrift/STATE.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`, `.zerodrift/studio-outbox.json`, and `.zerodrift/learned-skills/` to hydrate full project memory.
2. Inspect `.zerodrift/CONTRACTS.md` (if Stage 3 is locked) and treat it as the inviolable source of truth for all HTTP endpoints, DTOs, Zod schemas, DB tables, and environment variables.
3. Load the corresponding ZeroDrift v4.0 skill from `~/.codex/skills/zerodrift*/SKILL.md` (12 skills including `zerodrift-memory` and `zerodrift-codemap`).
4. Author ALL internal `.zerodrift/` artifacts, memory ledgers, learned skills, contracts, and code in crisp **English**; keep routine chat turns concise (5–8 lines max per `core/concise-chat.md`); run `scripts/code-map.mjs --impact` & `scripts/checkpoint.mjs` before edits and refresh Studio (`scripts/build-studio.mjs`) after milestones.

## Execution Invariants
- **Stage Order:** `0 Bootstrap -> 1 Intake/PRD -> 2A Research & 2B Reverse -> 3 Architecture/Contracts/Red-Team -> 4 Design -> 5 Vertical Slices -> 6A Zero-Error Verify & 6B Security Audit -> 7 Handover`.
- **Evidence-First:** Read existing files before editing. Never fabricate APIs, flags, or citations. Mark unverified external rules `[UNVERIFIED — REQUIRES CONFIRMATION]`.
- **Vertical Slices:** Deliver one thin, complete slice at a time (Schema -> Service -> API -> UI -> Critical Tests), verify it exits `0`, and update `.zerodrift/STATE.md` before starting the next slice.
- **Security Hard Block:** Zero P0 or P1 vulnerabilities (auth bypass, missing server-side RBAC, cross-tenant IDOR, SQLi, hash/secret leak, reflective CORS + credentials, mass assignment, startup auto-purge).
- **Honest Verification:** Never report checks as passing unless actually executed after the final edit with exit code `0`. Stop and escalate after 3 failed root-cause repair attempts.

