---
name: zerodrift-handover
description: Stage 7 Final Provenance, Standards Ledger, Module User/Developer Guide & Deployment Runbook skill. Synthesizes the verified application and all .zerodrift/ artifacts into a complete 06-HANDOVER-REPORT.md — including executive overview, interactive Archify architecture diagram (with inline Mermaid fallback), complete module-by-module user & developer guide, consolidated standards/compliance provenance ledger from 02-RESEARCH-SOURCES.md, exact verification & security sign-off table, and operations/rollback runbook. Use at the end of a ZeroDrift build or to document a completed system.
---

# ZeroDrift Handover — Provenance, Module Guide & Operations Pack (Stage 7)

## Purpose & Triggers

`zerodrift-handover` transforms a verified, security-hardened application into an executive-grade, maintainable deliverable that clients, auditors, operators, and future engineers can immediately understand, trust, operate, and extend.

**Activate when:**
- Stage 6A (`zerodrift-verify`) has passed with all checks exiting `0` AND Stage 6B (`zerodrift-security`) has passed with `0` unresolved P0/P1 findings.
- Standalone when a developer wants to generate a comprehensive Provenance, Module Usage, and Operations Handover Pack for an existing project.

**Template Resolution Order:** `./references/templates/06-HANDOVER-REPORT.md` -> `../../templates/06-HANDOVER-REPORT.md` -> embedded structure below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** Every cited file path, API endpoint, environment variable, standard URL, and verification exit code in `06-HANDOVER-REPORT.md` MUST match the actual final repository state and verified artifacts—zero copied stale drafts or invented citations.
- **Deterministic Gate Machine (`core/state-machine.md`):** Gate 6 MUST be `COMPLETED` / `PASS` before writing final handover sign-off; close `STATE.md` cleanly to `STAGE 7 — COMPLETED`.
- **Security Baseline (`core/security-baseline.md`):** Never write real secrets, production passwords, or live API keys into the handover report—reference `.env.example` variable names only.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Verify Gate 6 Readiness & Consolidate Artifacts
1. Read `.zerodrift/STATE.md`, `.zerodrift/01-PRD.md`, `.zerodrift/02-RESEARCH-SOURCES.md`, `.zerodrift/03-ARCHITECTURE.md`, `.zerodrift/CONTRACTS.md`, `.zerodrift/04-DESIGN-SYSTEM.md` (if present), and `.zerodrift/05-SECURITY-AUDIT.md`.
2. Confirm Stage 6A and Stage 6B are both `COMPLETED` with zero unresolved P0/P1 security issues. If Gate 6 is not passed, STOP and run `zerodrift-verify` / `zerodrift-security` first.

### Step 2: Executive Overview & Visual Architecture Diagram
1. Summarize the delivered product, verified stack versions, single backend/frontend entry points, and deployment architecture.
2. **Architecture Diagram:**
   - If the `archify` skill is installed and appropriate for a standalone interactive visual architecture/explainer page, offer or generate an interactive `archify` diagram alongside the handover pack.
   - ALWAYS include a clean, accurate inline **Mermaid architecture diagram** inside `06-HANDOVER-REPORT.md` so the document renders natively on GitHub, GitLab, VS Code, and any Markdown viewer with zero external dependencies.

### Step 3: Author the Complete Module-by-Module User & Developer Guide
For EVERY delivered module in the application, document both operator and engineer perspectives clearly:
- **What It Does:** Crisp business purpose in plain language.
- **Who Uses It (RBAC):** Exact authorized roles and explicitly restricted actions.
- **Step-by-Step User Workflow:** Concrete screen-by-screen / action-by-action guide an end user or QA tester can follow immediately.
- **Key Source Files & Live Endpoints:** Exact relative file paths and `METHOD /path` routes verified against `CONTRACTS.md` and the live codebase.
- **Enforced Business Rules & Safeguards:** Concrete invariants implemented server-side (e.g., double-entry balance checks, stock transaction locks, immutable audit trails, RTL/BiDi handling).

### Step 4: Consolidate the Standards, Compliance & Sources Provenance Ledger
Pull every verified entry from `.zerodrift/02-RESEARCH-SOURCES.md` into Section 3 of `06-HANDOVER-REPORT.md`:
- `Ref ID`, `Standard / Regulation / Library Doc`, `Official Source / URL`, `Exact Rule Implemented`, `Dependent Module(s)`, and `Verification Status`.
- If any `[UNVERIFIED — REQUIRES CONFIRMATION]` item remained explicitly accepted by the user, list it transparently with the user's sign-off date so auditors have 100% honesty.

### Step 5: Record Exact Verification & Security Sign-Off Summary
Populate Section 4 with the **actual final commands executed** during Stage 6A and Stage 6B:
- Typecheck / Compiler command + exit code `0`
- Production build command + exit code `0`
- Dead code / orphan check (`knip` or static scan) + result
- Dependency graph / circular dependency check + result
- `CONTRACTS.md` 1:1 wiring parity verdict
- Automated test suite command + pass count + exit code `0`
- Live runtime / browser verification verdict
- Security audit (`05-SECURITY-AUDIT.md`) verdict (`0` P0, `0` P1 unresolved)

### Step 6: Write the Deployment, Environment & Operations Runbook
Document copy-paste-ready commands verified against `package.json` / project manifests:
- Required environment variables (referencing `.env.example`, zero secret values)
- Install, migration, idempotent seed, build, test, and production start commands
- Backup, restore, and safe rollback procedures
- Explicit list of deferred P2/P3 hardening or v2 backlog items (or `None`)

### Step 7: Finalize `.zerodrift/06-HANDOVER-REPORT.md` & Close `STATE.md`
1. Write `.zerodrift/06-HANDOVER-REPORT.md`.
2. Update `.zerodrift/STATE.md`:
   - `Stage 7: COMPLETED`
   - `Current Stage: STAGE 7 — COMPLETED`
   - `Next Deterministic Action: Ready for user review, deployment, or v2 iteration.`
3. Run `scripts/validate-project.mjs` (if available) to confirm full lifecycle integrity and zero unresolved placeholders across `.zerodrift/`.

---

## Adaptive Intelligence Rules

- **English-Only Internal Artifacts + Bilingual User Delivery:** Author `06-HANDOVER-REPORT.md` strictly in crisp **English** for maximum precision and LLM readability. When the user prefers Arabic (or another language), deliver a concise translated executive walkthrough in chat and direct them to the EN/AR UI toggle in **ZeroDrift Studio** (`zerodrift-report.html`).
- **Concise Executive Presentation:** After writing `.zerodrift/06-HANDOVER-REPORT.md`, present a tight executive summary in chat pointing directly to the handover report, key verification results, and the exact next commands to run or deploy.

---

## Hard Gate / Stop Criteria

- **MUST NOT** issue a passing handover sign-off if Stage 6A verification has any failing command or Stage 6B has any unresolved P0/P1 vulnerability.
- **MUST NOT** include real credentials, tokens, or `.env` secrets inside `06-HANDOVER-REPORT.md`.

---

## Output Contract

1. `.zerodrift/06-HANDOVER-REPORT.md` — Complete executive overview, Mermaid (+ optional `archify`) diagram, module-by-module user & developer guide, standards provenance ledger, exact verification & security sign-off table, and deployment/operations runbook.
2. `.zerodrift/STATE.md` — Closed cleanly at `STAGE 7 — COMPLETED`.

---

## Tool Integrations

- **`archify` skill:** Optional interactive standalone HTML architecture/explainer diagram generated from verified codebase evidence into `.zerodrift/archify/*.html` (on Windows ALWAYS use the Windows-safe **`validate → deliver → check`** workflow instead of `finalize` to avoid hardlink `nlink` errors).
- **`floorplan` & `zerodrift-codemap`:** Reference the synced `floorplan/index.html` and native `.zerodrift/codemap.json` interactive canvas inside ZeroDrift Studio.
- **`core/concise-chat.md`:** Deliver final chat sign-off in <= 8 crisp lines pointing to `06-HANDOVER-REPORT.md` and `zerodrift-report.html`.
- **`scripts/validate-project.mjs`:** Final deterministic integrity check across all `.zerodrift/` artifacts, memory ledgers, and design tokens.
- **Portable ZeroDrift Studio Report (`scripts/build-studio.mjs --project . --export`):** Author `06-HANDOVER-REPORT.md` strictly in crisp English (providing user-facing translations in chat or Studio UI only), then bundle the complete interactive dashboard into a single shareable offline `zerodrift-report.html` alongside `06-HANDOVER-REPORT.md`.

