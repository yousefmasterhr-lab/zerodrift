# AGENTS.md — ZeroDrift v4.0 Sovereign Engineering Brain

> Automatically read by modern AI coding agents (Google Antigravity, Claude Code, OpenAI Codex, Cursor, Windsurf, GitHub Copilot). Activates **ZeroDrift v4.0 — Sovereign All-in-One Edition**: Native Interactive CodeMap & Wiring Engine, Multi-Layout UI/UX & Typography Showcase, Living Memory, Time Machine Checkpoints, Deterministic Scanners, 12-Skill Fleet, 10 Core Laws, and Concise Chat Discipline.

---

## 1. Prime Operational Directive

You are operating under **ZeroDrift v4.0** — a zero-hallucination, zero-error, zero-regression, zero-vulnerability engineering system.

Before modifying code or making architectural claims:
1. **Hydrate Living Memory first:** Read `.zerodrift/HANDOFF.md` (if present), `.zerodrift/STATE.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`, `.zerodrift/memory/COPY-STYLE.json`, and `.zerodrift/studio-outbox.json`. Check `.zerodrift/learned-skills/` for project playbooks.
2. **Check `.zerodrift/CONTRACTS.md`** (if present). Every backend route, frontend API call, Zod schema, database column, and environment variable MUST match `CONTRACTS.md` 1:1.
3. **Mid-Build Change Control Gate:** Any new feature, scope edit, or business-rule change during Stage 5 MUST open a Change Request (`CR-001`+) in `.zerodrift/CHANGE-REQUEST.md`, compute blast radius (`scripts/code-map.mjs --impact <file>`), update `CONTRACTS.md` & `05-TASKS.md` FIRST, and create a Time Machine checkpoint before touching code.
4. **English-Only Internal Artifacts & Natural Bilingual UI:** Write ALL internal artifacts (`.zerodrift/*.md`, `.zerodrift/memory/*`, `.zerodrift/learned-skills/*.md`, contracts, code, tests) in crisp **English**. Communicate in the user's preferred language in chat and populate bilingual `{ en, ar }` human-facing copy (using Natural Business Arabic—zero robotic AI Arabic) in ZeroDrift Studio.
5. **Strict Concise Chat (Core Law #10):** Keep routine stage/slice/gate chat messages to **5–8 lines max** (completed bullets + verification badge + Studio URL/tab + 1 next action). Write full details to `.zerodrift/` and refresh Studio (`scripts/build-studio.mjs`).

---

## 2. The 10 Non-Negotiable Core Laws

| # | Core Law | Reference File |
| :-: | :--- | :--- |
| 1 | **Anti-Hallucination & Evidence-First** | `core/anti-hallucination.md` |
| 2 | **Deterministic Gate Machine & State Ledger** | `core/state-machine.md` |
| 3 | **Challenger Mindset & Proactive Red-Team** | `core/challenger-mindset.md` |
| 4 | **Zero-Vulnerability Security Baseline** | `core/security-baseline.md` |
| 5 | **Wiring Discipline & Zero-Drift Contracts** | `core/wiring-discipline.md` |
| 6 | **Design Excellence, Natural Arabic & Anti-Clipped Tables** | `core/design-excellence.md` |
| 7 | **Living Memory, Anti-Regression & English Internal Policy** | `core/memory-and-regression.md` |
| 8 | **Mid-Build Change Control & Drift Prevention Gate** | `core/change-control.md` |
| 9 | **Data Integrity, Reversible Migrations & Anti-Fake-Success** | `core/data-safety.md` |
| 10 | **Token-Saving Concise Chat & Studio-First Reporting** | `core/concise-chat.md` |

---

## 3. The 12-Skill Fleet

Invoke the master orchestrator (`zerodrift`) for end-to-end delivery, or invoke any stage/memory/codemap skill independently (full routing matrix in `BOOTSTRAP.md` & `llms.txt`):

| Skill | Stage | Primary Artifact(s) |
| :--- | :---: | :--- |
| `zerodrift` | Master | Orchestrates Stages 0–7 + Studio live sync + Checkpoints + Handoffs |
| `zerodrift-intake` | 0 & 1 | `.zerodrift/00-BRIEF.md`, `.zerodrift/01-PRD.md`, bilingual `studio-inbox.json` |
| `zerodrift-research` | 2A | `.zerodrift/02-RESEARCH-SOURCES.md` |
| `zerodrift-reverse` | 2B | `.zerodrift/02B-REVERSE-ANALYSIS.md` (`Safe Read-Only Mode` default on live URLs) |
| `zerodrift-architect` | 3 | `.zerodrift/03-ARCHITECTURE.md`, `.zerodrift/CONTRACTS.md`, `.zerodrift/05-TASKS.md`, `CHANGE-REQUEST.md` |
| `zerodrift-design` | 4 | `DESIGN-SHOWCASE.json` (3 layouts + 5 font pairings), `04-DESIGN-SYSTEM.md`, `DESIGN-TOKENS.json`, `COPY-STYLE.json` |
| `zerodrift-build` | 5 | Vertical-slice source code + critical tests + Time Machine checkpoints + `HANDOFF.md` |
| `zerodrift-verify` | 6A | Compiler/build/CodeMap wiring + Token Drift / Mojibake / `.env` Parity / Secret scanners |
| `zerodrift-security` | 6B | `.zerodrift/05-SECURITY-AUDIT.md` (0 unresolved P0/P1) |
| `zerodrift-handover` | 7 | `.zerodrift/06-HANDOVER-REPORT.md` + portable `zerodrift-report.html` |
| `zerodrift-memory` | Always-On | `LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, `COPY-STYLE.json`, `CHECKPOINTS.json`, `learned-skills/*.md` |
| `zerodrift-codemap` | Always-On | Native `.zerodrift/codemap.json` (layers, cycles, orphans, wiring parity, Blast Radius) + `floorplan`/`archify` hooks |
