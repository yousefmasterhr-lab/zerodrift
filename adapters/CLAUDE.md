# CLAUDE.md — Claude Code Adapter for ZeroDrift

This repository uses the **ZeroDrift AI Engineering Operating System**.

## Session Boot Protocol
1. Hydrate Living Memory first: read `.zerodrift/STATE.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`, `.zerodrift/studio-outbox.json`, and `.zerodrift/learned-skills/` (if present).
2. Read `.zerodrift/CONTRACTS.md` before modifying any route, DTO, Zod schema, database table, or environment variable.
3. If ZeroDrift v4.0 skills are installed in `~/.claude/skills/zerodrift*` (or `skills/zerodrift*`), follow the active stage's `SKILL.md` (12 skills total, including `zerodrift-memory` and `zerodrift-codemap`).
4. **English-Only Internal Artifacts & Concise Chat:** Write all `.zerodrift/` files, memory ledgers, learned skills, contracts, and code in crisp English; keep routine chat updates to 5–8 lines max (`core/concise-chat.md`) and point to ZeroDrift Studio.
5. **Pre-Edit Ripple Check, Checkpoints & Studio Sync:** Before modifying existing files, run `scripts/code-map.mjs --impact <file>` + `scripts/checkpoint.mjs create`; after milestones, refresh ZeroDrift Studio via `scripts/build-studio.mjs`.

## Non-Negotiable Engineering Laws
1. **Anti-Hallucination:** Read files before editing; verify external docs/package versions before writing version-sensitive code; cite exact `file:line`; tag unverified rules `[UNVERIFIED — REQUIRES CONFIRMATION]`.
2. **Gate Machine:** Never write greenfield application code before Gate 3 (`03-ARCHITECTURE.md`, `CONTRACTS.md`, `05-TASKS.md` + Red-Team Challenge) is approved. Update `.zerodrift/STATE.md` atomically after every completed slice.
3. **Security Baseline:** Enforce deny-by-default auth, server-side RBAC + tenant/owner scoping (anti-IDOR), Zod validation rejecting unknown fields, Argon2id/scrypt/bcrypt hashing, strict CORS allowlists, parameterized SQL, and zero backdoors or startup auto-purges.
4. **Wiring Discipline:** Maintain 1:1 frontend-to-backend parity against `CONTRACTS.md`, a single server entry point, atomic multi-table DB transactions, idempotent seeds/upserts, and zero silent `catch {}` blocks.
5. **Design Excellence:** Implement `04-DESIGN-SYSTEM.md` tokens, WCAG AA contrast, logical CSS for RTL/LTR parity, and all 6 states (default, loading skeleton, empty + CTA, error + retry, submitting guard, 403/404).
6. **Zero-Error Verification:** Before reporting done, run typecheck (`npx tsc --noEmit`), production build (`npm run build`), dead-code check (`knip`), test suite, and security checks. Cap automated self-healing at 3 root-cause iterations before escalating.

