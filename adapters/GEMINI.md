# GEMINI.md — Google Antigravity & Gemini CLI Adapter for ZeroDrift

This project runs on **ZeroDrift**, a deterministic AI Engineering Operating System.

## Activation Rules
1. Always hydrate Living Memory first: inspect `.zerodrift/STATE.md`, `.zerodrift/CONTRACTS.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`, `.zerodrift/studio-outbox.json`, and `.zerodrift/learned-skills/` (if present) before editing files.
2. When ZeroDrift v4.0 skills are installed globally (`~/.gemini/config/skills/zerodrift*`), load the matching `SKILL.md` for the active stage (`zerodrift`, `zerodrift-intake`, `zerodrift-research`, `zerodrift-reverse`, `zerodrift-architect`, `zerodrift-design`, `zerodrift-build`, `zerodrift-verify`, `zerodrift-security`, `zerodrift-handover`, `zerodrift-memory`, `zerodrift-codemap`).
3. Enforce all 10 ZeroDrift Core Laws (including `core/concise-chat.md`: max 5–8 lines per routine chat turn, writing full details to `.zerodrift/` & ZeroDrift Studio; `core/change-control.md`; `core/data-safety.md`; and Natural Business Arabic + Anti-Clipped Sticky Action Tables):
   - **Evidence-First:** Read before write; verify external docs/versions via `search_web`; label unverified facts `[UNVERIFIED — REQUIRES CONFIRMATION]`.
   - **Gate Discipline:** Lock `CONTRACTS.md` + Red-Team Challenge before coding; update `.zerodrift/STATE.md` and refresh ZeroDrift Studio (`build-studio.mjs`) after every milestone.
   - **Living Memory & Pre-Edit Ripple Check:** Never violate `LOCKED-RULES.md`; check `REGRESSION-LEDGER.json` & dependent imports before editing; log bug fixes in `REGRESSION-LEDGER.json`; distill tricky solved patterns into `.zerodrift/learned-skills/`.
   - **English-Only Internal Artifacts:** Write all `.zerodrift/` files, memory ledgers, learned skills, contracts, and code strictly in English; communicate in the user's preferred language in chat or Studio UI only.
   - **Security Baseline:** Deny-by-default auth, server-side RBAC, Zod validation, Argon2id/scrypt/bcrypt hashing, strict CORS, zero secret/hash leaks, zero auto-purge.
   - **Wiring & Token Discipline:** 1:1 `CONTRACTS.md` parity, single backend server, atomic DB transactions, zero silent `catch {}`, and zero Color Token Drift against `DESIGN-TOKENS.json`.
   - **Strict Verification Honesty:** Run compiler, build, dead-code (`knip`), `validate-project.mjs`, tests, and live browser/API verification after final edits; never claim pass without exit code `0`.

## Ecosystem Tool Synergy
- Inspect `floorplan/architecture.json` (if present) before multi-file, API, DB, or routing changes; refresh `floorplan` incrementally after verified features.
- Use the `browser` subagent for live UI, console, network, and RTL visual verification.
- Use `archify` in Stage 7 for interactive standalone architecture explainers when requested or appropriate.
- Reserve `understand-anything` exclusively for files > 1,000 lines or explicit architecture audits.

