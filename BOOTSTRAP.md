# BOOTSTRAP.md — ZeroDrift v4.0 Agent Onboarding & 12-Skill Routing Playbook

> **For AI Agents (Antigravity, Claude Code, Codex, Cursor, Windsurf, Copilot, Web Chat):**
> When a user shares `https://github.com/yousefmasterhr-lab/zerodrift` and asks to install ZeroDrift or build/audit a project, execute the exact 4-step sequence below and keep chat messages concise (**5–8 lines max** per `core/concise-chat.md`).

---

## 1. Automated 4-Step Bootstrap Sequence

### Step 1: Verify or Install ZeroDrift v4.0 Fleet (12 One-Level Skills)
```bash
git clone https://github.com/yousefmasterhr-lab/zerodrift.git ~/.zerodrift-os

# Windows (PowerShell):
powershell -NoProfile -ExecutionPolicy Bypass -File ~/.zerodrift-os/scripts/install-global.ps1

# macOS / Linux:
chmod +x ~/.zerodrift-os/scripts/install-global.sh && ~/.zerodrift-os/scripts/install-global.sh
```
*(Optional flags: `-AllAgents` / `--all-agents` for Claude Code & Codex; `-WithCompanions` / `--with-companions` to probe optional external tools `knip`, `dependency-cruiser`, `floorplan`, `archify`, `understand*` without ever touching existing skills.)*

### Step 2: Initialize Target Project (Auto-Detect Language & Mode)
```bash
# Pass --lang ar if the user prompts in Arabic so Studio opens in natural Arabic RTL automatically!
node scripts/init-project.mjs --target <project-dir> --adapter antigravity --lang <en|ar>
```

### Step 3: Build CodeMap & Launch ZeroDrift Studio
```bash
node scripts/code-map.mjs --project <project-dir>
node scripts/build-studio.mjs --project <project-dir>
node scripts/studio-server.mjs --project <project-dir>
```

### Step 4: Enforce v4.0 Sovereign Laws Immediately
1. **Concise Chat (`core/concise-chat.md`):** Max 5–8 lines per routine chat reply; write full specs/reports into `.zerodrift/` and point the user to ZeroDrift Studio.
2. **English Internal / Natural Bilingual UI:** Write `.zerodrift/*.md`, memory files, contracts, and code in English; use Natural Business Arabic (zero robotic AI phrasing) in Studio `{ en, ar }` copy and chat.
3. **Pre-Edit Safety Net:** Run `scripts/code-map.mjs --impact <file>` + `scripts/checkpoint.mjs create --label "pre-<slice>"` before risky edits; run `scripts/handoff.mjs` every 2 slices.
4. **Safe Read-Only Mode (`zerodrift-reverse`):** Never click mutating/destructive controls (`Save`, `Delete`, `Approve`, `Pay`) on live production URLs; never ask for production Admin passwords in chat.

---

## 2. Master 12-Skill & Companion Tool Routing Matrix

| User Scenario | Primary Skill | Companion Tools (Auto-Detected) | Required Output / Gate |
| :--- | :--- | :--- | :--- |
| Full end-to-end app build or resume `STATE.md` | `zerodrift` | Studio SSE + CodeMap + Checkpoints + Handoff | Verified app + `06-HANDOVER-REPORT.md` |
| Clarify vague idea / write PRD | `zerodrift-intake` | Bilingual Studio Q&A (`studio-inbox.json`) | `00-BRIEF.md`, `01-PRD.md` (Clarity >= 90%) |
| Verify tax/compliance rules or package versions | `zerodrift-research` | `search_web` + official docs | `02-RESEARCH-SOURCES.md` |
| Audit legacy repo, live SaaS URL, or screenshots | `zerodrift-reverse` | `Safe Read-Only Mode` + CodeMap + `understand` (>1k lines) | `02B-REVERSE-ANALYSIS.md` + Superiority Blueprint |
| Architecture, ERD, `CONTRACTS.md`, Change Control | `zerodrift-architect` | `validate-project.mjs --gate 3` + optional `floorplan` | `03-ARCHITECTURE.md`, `CONTRACTS.md`, `05-TASKS.md` |
| Visual UI/UX layout, 5 font pairings & token lock | `zerodrift-design` | Studio Interactive Showcase (`DESIGN-SHOWCASE.json`) | `04-DESIGN-SYSTEM.md`, `DESIGN-TOKENS.json`, `COPY-STYLE.json` |
| Implement next vertical slice | `zerodrift-build` | `checkpoint.mjs` + `code-map.mjs --impact` + `handoff.mjs` | Layered code + tests + updated `STATE.md` |
| Map codebase layers, wiring parity & blast radius | `zerodrift-codemap` | Native `code-map.mjs` + Studio SVG Canvas (+ `floorplan`/`archify`) | `.zerodrift/codemap.json` |
| Zero-error verification & deterministic scanners | `zerodrift-verify` | `tsc`, `build`, `code-map.mjs`, `validate-project.mjs`, `browser` | All checks exit `0` |
| OWASP Top 10 & data-safety audit | `zerodrift-security` | Secret/`.env` scanners + regression tests | `05-SECURITY-AUDIT.md` (0 P0/P1) |
| Final handover pack & portable HTML | `zerodrift-handover` | `build-studio.mjs --export` + `archify` (`validate→deliver→check`) | `06-HANDOVER-REPORT.md`, `zerodrift-report.html` |
| Lock permanent rules, bug immunity & learned skills | `zerodrift-memory` | Studio `/api/rules` + `REGRESSION-LEDGER.json` | `LOCKED-RULES.md`, `learned-skills/*.md` |
