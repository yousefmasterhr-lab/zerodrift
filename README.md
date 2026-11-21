# ZeroDrift v4.0 (`zerodrift`)

**Self-contained engineering workflow and skill fleet for AI coding agents: native interactive CodeMap and wiring analyzer, multi-layout UI/UX and typography showcase, living project memory, Git Time Machine checkpoints, bilingual AR/EN Studio, 12 modular skills, and 10 engineering laws.**

[![Zero Runtime Dependencies](https://img.shields.io/badge/dependencies-0%20runtime-10B981?style=flat-square)](#)
[![Node.js 18+ ESM](https://img.shields.io/badge/node-%3E%3D18%20ESM-243324?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Skills Fleet: 12](https://img.shields.io/badge/skills-12%20one--level-243324?style=flat-square)](#the-12-skill-fleet)
[![Core Laws: 10](https://img.shields.io/badge/core%20laws-10%20enforced-1B6B4D?style=flat-square)](#the-10-core-engineering-laws)
[![Try Live Demo](https://img.shields.io/badge/ZeroDrift%20Studio-Try%20Live%20Demo%20%E2%86%97-10B981?style=flat-square)](https://yousefmasterhr-lab.github.io/zerodrift/demo/)

> **Live Interactive Demo (Zero Install):** Open **[`https://yousefmasterhr-lab.github.io/zerodrift/demo/`](https://yousefmasterhr-lab.github.io/zerodrift/demo/)** (or [`docs/demo/index.html`](docs/demo/index.html) locally) to explore the SVG CodeMap canvas, compare 3 page layouts and 5 Arabic/English font pairings, switch between Arabic RTL and English LTR, test interactive Q&A cards, inspect Time Machine checkpoints, and copy a single-line session resume prompt.

---

## One-Line Start: Just Paste This Repo URL to Your AI Agent

ZeroDrift ships with [`llms.txt`](llms.txt) and [`BOOTSTRAP.md`](BOOTSTRAP.md) so **any AI coding agent** (Antigravity, Claude Code, Codex, Cursor, Windsurf, Copilot, ChatGPT/Gemini/Claude Web) self-installs, initializes `.zerodrift/`, launches **ZeroDrift Studio**, and selects the exact right skill automatically:

- **Greenfield (Empty Folder -> Full App):**
  > `Install ZeroDrift from https://github.com/yousefmasterhr-lab/zerodrift (read BOOTSTRAP.md & llms.txt), initialize this folder, launch ZeroDrift Studio, and build a bilingual clinic management system.`
- **Greenfield (Arabic / Egyptian Dialect — Auto-Opens Studio in Arabic RTL):**
  > `ثبّت ZeroDrift من https://github.com/yousefmasterhr-lab/zerodrift (اقرأ BOOTSTRAP.md و llms.txt)، جهّز المشروع بـ --lang ar وشغّل ZeroDrift Studio، وعايز نبني نظام عيادات احترافي.`
- **Brownfield (Existing Legacy Repo Rescue + CodeMap):**
  > `Use ZeroDrift from https://github.com/yousefmasterhr-lab/zerodrift on this repo: run zerodrift-codemap and zerodrift-reverse, create a Time Machine checkpoint, and launch ZeroDrift Studio.`
- **Live SaaS / Website Safe Read-Only Audit:**
  > `Using ZeroDrift (https://github.com/yousefmasterhr-lab/zerodrift), run zerodrift-reverse in Safe Read-Only Mode on this app to produce a Keep/Kill/Redesign teardown and Superiority Blueprint.`
- **Solo Verification & Security Armor Pass:**
  > `Using ZeroDrift (https://github.com/yousefmasterhr-lab/zerodrift), run zerodrift-codemap, zerodrift-verify, and zerodrift-security on this project and export zerodrift-report.html.`

---

> **ملخص سريع بالعربية (Arabic Highlight):**
> **ZeroDrift v4.0** نظام تشغيل هندسي مستقل بالكامل (صفر مكتبات خارجية) يجمع كل ما تحتاجه لبناء أو تطوير أي برنامج احترافي مع أي وكيل ذكاء اصطناعي:
> - **خريطة ربط تفاعلية مدمجة (`CodeMap`):** تكشف تلقائياً طبقات المشروع، المسارات المقطوعة بين الواجهة والسيرفر، الحلقات الدائرية، الملفات الميتة، ونطاق التأثير قبل أي تعديل — وتعمل بانسجام تام مع `floorplan` و `archify` لو مثبتين.
> - **معرض تصميم وخطوط حي (`UI/UX Showcase`):** جرّب 3 تصاميم صفحات كاملة و5 أزواج خطوط عربية/إنجليزية (مع تبديل فاتح/داكن وعربي/إنجليزي) داخل المتصفح قبل كتابة كود الواجهات.
> - **عربي طبيعي واحترافي + شات مختصر موفّر للتوكنز:** شات الوكيل لا يتجاوز 5–8 سطور في الرد العادي، بينما كل التفاصيل والموافقات والأسئلة والخرائط تظهر بشكل نظيف في **ZeroDrift Studio** بلغة عربية طبيعية بدون صياغة روبوتية.

---

## What's New in ZeroDrift v4.0

| Pillar | What It Solves | Engine / Files |
| :--- | :--- | :--- |
| **1. Native Interactive CodeMap & Wiring Engine** | Full visual architecture map, cycle/orphan detection, 1:1 frontend-to-backend route wiring parity & Blast Radius with zero external installs | `skills/zerodrift-codemap/SKILL.md`, `scripts/code-map.mjs`, Studio SVG Canvas (`/api/codemap`) |
| **2. Interactive 3-Layout UI/UX & 5-Font Showcase** | Pick a full-page layout architecture, Arabic+English font pairing & palette visually in Studio before Stage 5 coding | `templates/DESIGN-SHOWCASE.json`, `skills/zerodrift-design/SKILL.md`, Studio Showcase (`/api/design-lock`) |
| **3. Auto-Bilingual Studio & Natural Business Arabic** | Studio auto-opens in Arabic RTL (`--lang ar`), supports `{ en, ar }` Inbox/Stage/Slice copy, bans robotic AI Arabic & pins sticky table Action columns | `core/design-excellence.md`, `templates/memory/COPY-STYLE.json`, `studio/app.js` |
| **4. Token-Saving Concise Chat Law** | Eliminates bloated multi-page chat dumps — enforces crisp 5–8 line chat turns while syncing full details to Studio | `core/concise-chat.md` (Core Law #10) |
| **5. Safe Read-Only Mode for Live Site Audits** | Protects live production SaaS apps during reverse engineering (passive `GET` & modal preview only, zero mutating clicks, zero Admin password sharing) | `skills/zerodrift-reverse/SKILL.md` |
| **6. Field-Tested UX & Reliability Hardening** | Honest post-submit resume callout, human-readable Decision History cards, clean empty states with zero `{{FILL}}` leakage, Git `index.lock` retry backoff | `studio/app.js`, `scripts/build-studio.mjs`, `scripts/checkpoint.mjs` |

---

## The 10 Core Engineering Laws (`core/`)

1. **`core/anti-hallucination.md`** — Evidence-first; read before write; live verification; `[UNVERIFIED]` honesty markers.
2. **`core/state-machine.md`** — Deterministic 8-stage gate machine anchored to `.zerodrift/STATE.md` + 3-iteration self-healing cap.
3. **`core/challenger-mindset.md`** — Constructive pushback, 6-plane Red-Team Challenge, and `[OPTIONAL UPGRADE]` opportunity mining.
4. **`core/security-baseline.md`** — Deny-by-default auth, server-side RBAC & IDOR scoping, Zod validation, Argon2id/scrypt/bcrypt, strict CORS, 0 P0/P1 hard block.
5. **`core/wiring-discipline.md`** — Single-source `CONTRACTS.md`, 1:1 route parity, single server entry point, atomic transactions, zero silent `catch {}`.
6. **`core/design-excellence.md`** — Anti-AI-slop tokens, WCAG AA contrast, logical CSS RTL/LTR, **Natural Business Arabic Glossary**, and **Anti-Clipped Sticky Action Data Tables**.
7. **`core/memory-and-regression.md`** — `LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, Pre-Edit Ripple Check, `.zerodrift/learned-skills/`, English-only internal artifacts.
8. **`core/change-control.md`** — Mid-build Change Requests (`CR-001`+), blast-radius analysis, contract-first & task-first updates.
9. **`core/data-safety.md`** — Zero auto-destructive boot hooks, reversible migrations, atomic idempotent upserts, zero fake-success HTTP 200 fallbacks, staging vs. prod isolation.
10. **`core/concise-chat.md`** — Token-saving 5–8 line routine chat responses + Studio-first detail reporting.

---

## The 12-Skill Fleet

| Skill | Stage | Primary Deliverable(s) |
| :--- | :---: | :--- |
| **`zerodrift`** | Master | End-to-end orchestrator (Guided or Autonomous), Studio sync, Time Machine & Handoffs |
| **`zerodrift-intake`** | 0 & 1 | Bilingual Socratic discovery, 7-dimension Clarity Score, Studio Interactive Q&A -> `00-BRIEF.md`, `01-PRD.md` |
| **`zerodrift-research`** | 2A | Live compliance/standards lookup & stable stack verification -> `02-RESEARCH-SOURCES.md` |
| **`zerodrift-reverse`** | 2B | Brownfield codebase, live SaaS URL (`Safe Read-Only Mode`), screenshots -> `02B-REVERSE-ANALYSIS.md` |
| **`zerodrift-architect`** | 3 | Topology, ERD, ADRs, inviolable `CONTRACTS.md`, Red-Team Top 5, `05-TASKS.md`, `CHANGE-REQUEST.md` |
| **`zerodrift-design`** | 4 | Interactive 3-Layout & 5-Font Showcase -> `DESIGN-SHOWCASE.json`, `04-DESIGN-SYSTEM.md`, `DESIGN-TOKENS.json`, `COPY-STYLE.json` |
| **`zerodrift-build`** | 5 | Pre-Edit Ripple Check + Time Machine checkpoint + vertical slice code + tests + `HANDOFF.md` |
| **`zerodrift-verify`** | 6A | `tsc`, `build`, CodeMap wiring, Token Drift, UTF-8 Mojibake, `.env` Parity, Secret Scan, runtime/browser |
| **`zerodrift-security`** | 6B | Adversarial OWASP Top 10 & ZeroDrift Security Baseline audit (0 P0/P1 hard block) -> `05-SECURITY-AUDIT.md` |
| **`zerodrift-handover`** | 7 | Provenance ledger, module user/dev guide, Mermaid/+`archify` diagram, ops runbook -> `06-HANDOVER-REPORT.md` + `zerodrift-report.html` |
| **`zerodrift-memory`** | Always-On | `LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, `COPY-STYLE.json`, `CHECKPOINTS.json`, `learned-skills/*.md` |
| **`zerodrift-codemap`** | Always-On | Native `.zerodrift/codemap.json` (layers, cycles, orphans, wiring parity, Blast Radius) + Studio SVG Canvas + `floorplan`/`archify` hooks |

---

## 30-Second Installation & CLI Reference

```powershell
# Windows — installs all 12 one-level skills + native CodeMap + Studio bundle into ~/.gemini/config/skills/
.\scripts\install-global.ps1                  # Optional: -AllAgents, -WithCompanions
```
```bash
# macOS / Linux
chmod +x ./scripts/install-global.sh && ./scripts/install-global.sh   # Optional: --all-agents, --with-companions
```

| Command | Purpose |
| :--- | :--- |
| `npm run doctor` | Validates all 12 skills, 10 core laws, 20 templates, 6 adapters, Studio UI, GitHub Pages demo & all 10 `.mjs` CLIs |
| `npm run init -- --target <dir> --lang ar` | Scaffolds `.zerodrift/`, Living Memory, Design Showcase, Change Control, Studio inbox/outbox & `.gitignore` |
| `npm run codemap -- --project <dir> [--impact <file>]` | Runs native CodeMap scanner (layers, cycles, orphans, route wiring parity & Blast Radius) |
| `npm run validate -- --target <dir> [--gate 3]` | Runs Gate validator + Token Drift + UTF-8 Mojibake + `.env` Parity + Hardcoded Secret scanners |
| `npm run studio -- --project <dir>` | Launches live local SSE **ZeroDrift Studio** (`127.0.0.1:4310`, supports `--stop`) |
| `npm run checkpoint -- create --project <dir> --label "pre-S-02"` | Creates non-destructive Time Machine checkpoint (with `index.lock` retry resilience) |
| `npm run handoff -- --project <dir>` | Compiles ultra-compact `.zerodrift/HANDOFF.md` (<120 lines) + 1-line fresh session resume prompt |
| `npm run studio:export -- --project <dir>` | Exports single-file shareable `zerodrift-report.html` |
| `npm run demo:build` | Rebuilds the interactive GitHub Pages demo (`docs/demo/index.html`) |
| `npm test` | Runs the native `node --test` verification suite |

---

## Enable GitHub Pages Live Demo in 30 Seconds

1. Push to `https://github.com/yousefmasterhr-lab/zerodrift.git` (`main` branch).
2. Open **Settings -> Pages -> Source: Deploy from a branch -> Branch `main` / Folder `/docs` -> Save**.
3. Your live interactive ZeroDrift v4.0 Studio demo goes online at **[`https://yousefmasterhr-lab.github.io/zerodrift/demo/`](https://yousefmasterhr-lab.github.io/zerodrift/demo/)**.

### Recommended GitHub Repository Topics
`ai-engineering` · `agent-skills` · `antigravity` · `claude-code` · `openai-codex` · `cursor-rules` · `codemap` · `zero-hallucination` · `anti-regression` · `software-architecture` · `owasp-security` · `mission-control`

---

## License

MIT — see [`LICENSE`](LICENSE).
