---
name: zerodrift
description: Master orchestrator for the ZeroDrift AI Engineering Operating System. Drives any greenfield empty folder or brownfield codebase end-to-end from vague bilingual ideas through Socratic intake, live domain standards research, reverse engineering, Red-Team architecture & CONTRACTS.md, anti-slop design, vertical-slice implementation, zero-error verification, OWASP security audit, and final provenance handover. Use when the user invokes /zerodrift, asks to build a complete production-grade application from scratch, rescue/modernize an existing codebase, or resume an active .zerodrift/ project.
---

# ZeroDrift — Master AI Engineering Operating System

## Purpose & Triggers

`zerodrift` is the master orchestrator that turns any coding agent into a disciplined, zero-hallucination, zero-vulnerability engineering organization.

**Activate when:**
- The user starts in an empty folder with as little as 2 vague words (Arabic, Egyptian dialect, English, or mixed messy notes) and wants a complete, verified application.
- The user points at an existing/legacy repository, competitor URL, or UI screenshots and wants a deep X-ray, modernization, or superior rebuild.
- The workspace already contains `.zerodrift/STATE.md` and the user wants to resume cleanly across sessions or models.
- The user explicitly asks for `/zerodrift`, "end-to-end build", "ZeroDrift lifecycle", or "guided/autonomous ZeroDrift mode".

**Resolution Order for Core Protocols & Templates:**
When reading referenced laws or templates, resolve in this exact order:
1. `./references/core/<file>` and `./references/templates/<file>` (global skill install bundle)
2. `../../core/<file>` and `../../templates/<file>` (inside a cloned `zerodrift` repo)
3. The embedded inline specifications inside each `SKILL.md` (guaranteed offline/standalone fallback).

---

## Core Laws Referenced

All 10 Non-Negotiable Engineering Laws govern every orchestrated stage:
1. **Anti-Hallucination (`core/anti-hallucination.md`):** Read before write; verify package versions and domain rules live; cite `file:line`; label unverified facts `[UNVERIFIED — REQUIRES CONFIRMATION]`; never fake command outputs.
2. **Deterministic Gate Machine (`core/state-machine.md`):** Anchor progress in `.zerodrift/STATE.md`; never skip a hard gate; cap self-healing retries at 3 iterations before escalating.
3. **Challenger Mindset (`core/challenger-mindset.md`):** Push back constructively on weak assumptions, security risks, or bloat; bring concrete alternatives with trade-offs.
4. **Zero-Vulnerability Baseline (`core/security-baseline.md`):** Deny-by-default auth, server-side RBAC, Zod boundary validation, Argon2id/scrypt/bcrypt password hashing, strict CORS, zero backdoors, zero hash leaks, zero auto-purge.
5. **Wiring Discipline (`core/wiring-discipline.md`):** `CONTRACTS.md` is the single source of truth; 1:1 frontend/backend route parity via native `scripts/code-map.mjs`; single server entry point; atomic DB transactions; idempotent upserts; zero silent `catch {}`.
6. **Design Excellence (`core/design-excellence.md`):** Interactive 3-layout & 5-font Showcase (`DESIGN-SHOWCASE.json`), WCAG AA contrast, Natural Business Arabic (zero robotic phrasing), Anti-Clipped Sticky Action Tables, RTL/LTR logical CSS, and all 6 interactive states.
7. **Living Memory, Anti-Regression & English Internal Artifacts (`core/memory-and-regression.md`):** Hydrate `LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, `COPY-STYLE.json`, and `.zerodrift/learned-skills/` at session start; run Pre-Edit Ripple Checks (`code-map.mjs --impact`); write ALL internal artifacts in crisp **English**; keep **ZeroDrift Studio** synced live via bilingual `studio-inbox.json`, `studio-outbox.json`, and `build-studio.mjs`.
8. **Mid-Build Change Control (`core/change-control.md`):** Any mid-build feature or business-rule change MUST open a Change Request (`CR-001`+) in `.zerodrift/CHANGE-REQUEST.md`, compute blast radius, and update `CONTRACTS.md` & `05-TASKS.md` FIRST before editing code.
9. **Data Integrity & Anti-Fake-Success (`core/data-safety.md`):** Zero auto-destructive boot hooks, reversible migrations, atomic idempotent upserts, zero silent fake HTTP 200/mock fallbacks in production, and strict dev/test vs. prod seed separation.
10. **Token-Saving Concise Chat (`core/concise-chat.md`):** Keep every normal stage/gate/slice chat message to **5–8 lines max** (completed bullets + verification badge + Studio URL/tab + 1 next action). Never paste raw PRD/contract/audit walls into chat—write them to `.zerodrift/` and refresh Studio.

---

## Execution Algorithm (Step-by-Step)

### Step 0: Workspace Auto-Detection & Bootstrap
1. Inspect the workspace directory:
   - **Case A — Active ZeroDrift Project (`.zerodrift/STATE.md` exists):** Read `.zerodrift/STATE.md` and `.zerodrift/CONTRACTS.md` (if present). Verify the last claimed milestone on disk, summarize current state in 4 concise bullets, and jump directly to the active stage/slice. Never restart Stage 1 unless the user requests a pivot.
   - **Case B — Empty Folder (Greenfield):** Initialize `.zerodrift/` (using `./scripts/init-project.mjs --target . --mode greenfield` if available, or creating `.zerodrift/STATE.md` directly from the template). Set `Project Mode = greenfield`.
   - **Case C — Existing Codebase (Brownfield):** Inspect manifest files (`package.json`, `pyproject.toml`, `go.mod`, etc.) without mutating source files. Initialize `.zerodrift/STATE.md` with `Project Mode = brownfield` and schedule **Stage 2B (`zerodrift-reverse`)** before architectural changes.
2. Determine **Execution Mode** (default: **Guided Mode**):
   - **Guided Mode:** Pauses briefly for user sign-off at **Gate 1 (PRD)**, **Gate 3 (Architecture & Contracts)**, **Gate 4 (Design System)**, and **Gate 6 (Verification & Security)**.
   - **Autonomous Build Mode:** If the user explicitly requests autonomous/autopilot execution, pause only at **Gate 1** (if Clarity < 90%) and **Gate 3** (Contracts & Architecture sign-off), then autonomously loop through Stage 4 → Stage 5 (all vertical slices) → Stage 6A → Stage 6B → Stage 7 until complete or a P0 blocker hits.

### Step 1: Stage 1 — Chaos-to-Clarity Intake (`zerodrift-intake`)
- Run the `zerodrift-intake` protocol to turn raw/vague input into `.zerodrift/00-BRIEF.md` and `.zerodrift/01-PRD.md`.
- Compute the 7-dimension Clarity Score; ask surgical rounds (3–5 questions with smart defaults) until Clarity >= 90%.
- Surface 3–5 `[OPTIONAL UPGRADE]` opportunities.
- Update `.zerodrift/STATE.md`. **Gate 1:** Obtain user confirmation on `01-PRD.md` in Guided Mode.

### Step 2: Stage 2A & 2B — Intelligence & Reverse Engineering
- **Stage 2A (`zerodrift-research`):** Verify domain regulations, compliance formulas, and live stable package versions. Produce `.zerodrift/02-RESEARCH-SOURCES.md`.
- **Stage 2B (`zerodrift-reverse`):** Execute whenever the workspace is brownfield OR the user provided a competitor URL, legacy app, or UI screenshots. Produce `.zerodrift/02B-REVERSE-ANALYSIS.md` with Keep/Kill/Redesign and Superiority Blueprint. Otherwise mark Stage 2B `SKIPPED` in `STATE.md`.
- Update `.zerodrift/STATE.md`.

### Step 3: Stage 3 — Architecture, Contracts & Red-Team Challenge (`zerodrift-architect`)
- Author `.zerodrift/03-ARCHITECTURE.md`, `.zerodrift/CONTRACTS.md`, and `.zerodrift/05-TASKS.md`.
- Execute the mandatory 6-plane Red-Team Challenge Pass and document top 5 risks + mitigations.
- If `floorplan` is available, generate a pre-code Blueprint Map (`floorplan/index.html`).
- Update `.zerodrift/STATE.md`. **Gate 3 (MANDATORY in all modes):** Present Architecture + Contracts summary + Red-Team findings for explicit human approval before writing application code.

### Step 4: Stage 4 — Anti-Slop Design System (`zerodrift-design`)
- For any app with a UI, produce `.zerodrift/04-DESIGN-SYSTEM.md` (color/type tokens, WCAG AA, RTL/LTR logical CSS rules, screen inventory, 6-state matrix).
- For pure CLI/headless API projects, explicitly mark Stage 4 `SKIPPED` in `STATE.md`.
- **Gate 4:** Confirm design direction in Guided Mode.

### Step 5: Stage 5 — Vertical Slice Implementation Loop (`zerodrift-build`)
- Execute slices in `.zerodrift/05-TASKS.md` strictly in dependency order (`S-01` Foundation/Auth/RBAC first, then core domain slices, then secondary modules).
- For each slice:
  1. Build DB + Service + API + UI strictly matching `CONTRACTS.md`.
  2. Write automated unit/integration tests for critical business logic.
  3. Run slice-level verification (`tsc --noEmit` / compiler + unit tests).
  4. If a check fails, run root-cause self-healing (max 3 iterations).
  5. Mark slice `VERIFIED` and update `.zerodrift/STATE.md`.

### Step 6: Stage 6A & 6B — Zero-Error Verification & Red-Team Security Audit
- **Stage 6A (`zerodrift-verify`):** Run the full deterministic verification ladder (compiler/typecheck, production build, dead code/`knip`, dependency graph/cycles, 1:1 frontend-backend wiring audit, automated tests, live runtime/browser check, incremental `floorplan` refresh).
- **Stage 6B (`zerodrift-security`):** Execute OWASP Top 10 & ZeroDrift Security Baseline audit and produce `.zerodrift/05-SECURITY-AUDIT.md`. Fix every P0 and P1 finding immediately and re-verify Stage 6A after fixes.
- **Gate 6:** Proceed to Stage 7 ONLY when all Stage 6A checks exit `0` AND `05-SECURITY-AUDIT.md` has `0` unresolved P0 and `0` unresolved P1 findings.

### Step 7: Stage 7 — Provenance, Module Guide & Handover (`zerodrift-handover`)
- Produce `.zerodrift/06-HANDOVER-REPORT.md` consolidating executive overview, architecture diagram (`archify` if available + Mermaid), module-by-module user & developer guide, compliance/sources provenance ledger, exact verification sign-off table, and deployment runbook.
- Update `.zerodrift/STATE.md` to `STAGE 7 — COMPLETED`.

---

## Adaptive Intelligence Rules

- **Language Mirroring & English-Only Internal Law:** Communicate with the user in their preferred language/dialect (e.g., Arabic/Egyptian Arabic, English, or bilingual) in chat, while authoring **100% of internal `.zerodrift/` artifacts, memory ledgers, learned skills, contracts, and source identifiers in crisp English** for maximum LLM reasoning accuracy.
- **Two-Way ZeroDrift Studio Sync:** Whenever interactive user decisions or Gate approvals are needed, populate `.zerodrift/studio-inbox.json`, ensure `scripts/studio-server.mjs` is running, and provide the clean browser URL (`http://127.0.0.1:<port>`) alongside chat fallback. Refresh `.zerodrift/studio-data.json` via `scripts/build-studio.mjs` after every completed stage, slice, bug fix, or rule lock, and check `.zerodrift/studio-outbox.json` before advancing.
- **Living Memory Stewardship (`zerodrift-memory`):** Extract every permanent user directive into `.zerodrift/memory/LOCKED-RULES.md`, log every non-trivial bug fix into `.zerodrift/memory/REGRESSION-LEDGER.json`, and distill solved project patterns into `.zerodrift/learned-skills/<skill-name>.md`.
- **Time Machine Checkpoints & Context Rot Prevention:** Automatically run `node scripts/checkpoint.mjs create --project . --label "pre-<slice>"` before starting each vertical slice or risky refactor, and run `node scripts/handoff.mjs --project .` after every 2 completed slices (or at any stage transition) so `.zerodrift/HANDOFF.md` (<120 lines) is always ready for instant fresh-session resume.
- **Right-Sized Scope:** Do not over-engineer a small single-purpose tool with enterprise ceremony; keep every artifact tight, concrete, and proportional while preserving 100% of the security, contract, and verification invariants.
- **Cross-Model Continuity:** Never rely on chat history alone for locked decisions—every approval, contract amendment, and slice result MUST live in `.zerodrift/STATE.md` and `.zerodrift/CONTRACTS.md`.
- **Single-Skill Detour Support:** If the user asks mid-project to jump into a focused audit or design refresh, run the relevant standalone skill and reconcile `.zerodrift/STATE.md` afterward.

---

## Hard Gate / Stop Criteria

You MUST STOP and present a crisp decision prompt to the user when ANY of the following occurs:
1. **Clarity Score < 90%** during Stage 1 (do not guess core business rules).
2. **Gate 3 (Architecture & `CONTRACTS.md`)** is not yet approved before writing application code.
3. **Self-Healing Cap Reached:** Any compiler, build, wiring, test, or security check fails after 3 root-cause repair iterations.
4. **Unresolved P0/P1 Security Finding** or **Irreversible Data-Loss Action** (destructive DB drop/truncate, production deletion, secret rotation).
5. **External Compliance Ambiguity:** Critical regulatory/tax/legal formula cannot be verified live and is flagged `[UNVERIFIED — REQUIRES CONFIRMATION]`.

---

## Output Contract

At completion of the orchestrated lifecycle, the target repository contains:
- `.zerodrift/STATE.md` (all stages `COMPLETED` or `SKIPPED`, all slices `VERIFIED`)
- `.zerodrift/00-BRIEF.md` & `.zerodrift/01-PRD.md`
- `.zerodrift/02-RESEARCH-SOURCES.md` (and `.zerodrift/02B-REVERSE-ANALYSIS.md` when applicable)
- `.zerodrift/03-ARCHITECTURE.md`, `.zerodrift/CONTRACTS.md`, & `.zerodrift/05-TASKS.md`
- `.zerodrift/04-DESIGN-SYSTEM.md` (for UI applications)
- Verified, tested, security-hardened application source code
- `.zerodrift/05-SECURITY-AUDIT.md` (0 unresolved P0/P1)
- `.zerodrift/06-HANDOVER-REPORT.md`

---

## Tool Integrations

ZeroDrift automatically amplifies installed ecosystem tools and gracefully degrades when any tool is absent:

| Ecosystem Tool | When Invoked | Graceful Fallback When Absent |
| :--- | :--- | :--- |
| `floorplan` | Stage 3 (pre-code blueprint) & Stage 6A (incremental map refresh) | Inline Mermaid topology + static route/import audit |
| `archify` | Stage 7 (interactive executive architecture diagrams) | Inline Mermaid diagrams in `03-ARCHITECTURE.md` & `06-HANDOVER-REPORT.md` |
| `understand-anything` | Stage 2B / Stage 6A (only for brownfield files > 1,000 lines or major refactors) | Targeted AST/ripgrep structural reads |
| `knip` & `dependency-cruiser` | Stage 6A (dead code, orphan files, circular dependency checks) | TypeScript compiler graph + Node ESM import scanner |
| Browser subagent / Playwright | Stage 6A (live UI rendering, console/network/RTL verification) | Live server startup + HTTP/curl endpoint probes |
| `scripts/validate-project.mjs` | Before closing Gates 1, 3, 6, and 7 | Manual checklist verification against `STATE.md` & `CONTRACTS.md` |

