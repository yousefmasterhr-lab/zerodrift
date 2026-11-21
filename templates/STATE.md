# ZeroDrift Project State Ledger

> **Single-Source Session Memory.** Every AI agent or model MUST read this file before acting and update it atomically after every completed stage, approved gate, or verified vertical slice.

## 1. Project Identity

| Field | Value |
| :--- | :--- |
| **Project Name** | `{{PROJECT_NAME}}` |
| **Project Mode** | `{{PROJECT_MODE}}` *(greenfield \| brownfield)* |
| **Execution Mode** | `guided` *(guided \| autonomous)* |
| **Default Studio Locale** | `{{DEFAULT_LOCALE}}` *(en \| ar)* |
| **Primary Language(s)** | `{{FILL: e.g., Arabic (RTL) + English (LTR)}}` |
| **Target Stack** | `{{FILL: e.g., TypeScript, Next.js 15, PostgreSQL, Prisma}}` |
| **Initialized On** | `{{DATE}}` |
| **Last Updated** | `{{DATE}}` |

---

## 2. Active Pointer

- **Current Stage:** `STAGE 0 — Bootstrap`
- **Active Slice ID:** `NONE`
- **Next Deterministic Action:** `Run zerodrift-intake to capture project brief and achieve >= 90% Clarity Score.`
- **Self-Healing Iteration Count:** `0 / 3`

---

## 3. Stage Gate Matrix

Valid statuses: `PENDING`, `IN_PROGRESS`, `BLOCKED`, `APPROVED`, `COMPLETED`, `SKIPPED`.

| Stage | Artifact(s) | Status | Approved / Completed On | Gate Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Stage 0: Bootstrap** | `.zerodrift/STATE.md` | `COMPLETED` | `{{DATE}}` | Workspace initialized |
| **Stage 1: Intake & PRD** | `00-BRIEF.md`, `01-PRD.md` | `PENDING` | `-` | Target Clarity >= 90% |
| **Stage 2A: Domain Research** | `02-RESEARCH-SOURCES.md` | `PENDING` | `-` | Live standards & stack versions |
| **Stage 2B: Reverse Engineering** | `02B-REVERSE-ANALYSIS.md` | `PENDING` | `-` | Required if brownfield/competitor/screenshots exist; else `SKIPPED` |
| **Stage 3: Architecture & Contracts** | `03-ARCHITECTURE.md`, `CONTRACTS.md`, `05-TASKS.md` | `PENDING` | `-` | Red-Team Challenge + Contracts lock |
| **Stage 4: Design System** | `04-DESIGN-SYSTEM.md` | `PENDING` | `-` | Tokens, flows, RTL/LTR; `SKIPPED` for pure CLI/API |
| **Stage 5: Vertical Slice Build** | Source code + critical tests | `PENDING` | `-` | Built slice-by-slice from `05-TASKS.md` |
| **Stage 6A: Zero-Error Verify** | Compiler, Build, Knip, Wiring, Runtime | `PENDING` | `-` | All checks must exit 0 |
| **Stage 6B: Security Audit** | `05-SECURITY-AUDIT.md` | `PENDING` | `-` | Zero unresolved P0/P1 findings |
| **Stage 7: Handover Pack** | `06-HANDOVER-REPORT.md` | `PENDING` | `-` | Provenance, Module Guide & Runbook |

---

## 4. Vertical Slice Ledger

Valid slice statuses: `QUEUED`, `IN_PROGRESS`, `VERIFIED`, `BLOCKED`.

| Slice ID | Slice Name | Status | Verification Command & Exit Code | Updated |
| :--- | :--- | :--- | :--- | :--- |
| `S-01` | `{{FILL: Foundation, Schema, Auth & RBAC}}` | `QUEUED` | `-` | `-` |

---

## 5. Locked Decisions & Constraints

- `{{DATE}}`: Initialized ZeroDrift project state ledger (`{{PROJECT_MODE}}`).

---

## 6. Learned Project Skills Index (`.zerodrift/learned-skills/`)

*(Auto-populated whenever a non-trivial domain rule, tricky integration, or recurring workflow is solved.)*

| Skill File | Domain | Verified Pattern Summary | Added On |
| :--- | :--- | :--- | :--- |
| *(None yet)* | `-` | `-` | `-` |

---

## 7. Open Blockers, Risks & Unverified Items

- None currently recorded.

---

## 8. Session Handoff Notes

- **Last Completed Milestone:** Project `.zerodrift/` v2.0 scaffold & Living Memory vault initialized.
- **Files Touched Recently:** `.zerodrift/STATE.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, `.zerodrift/memory/DESIGN-TOKENS.json`
- **Resume Instruction for Next Agent/Model:** Read `STATE.md`, `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, and `.zerodrift/studio-outbox.json` (if present), then execute `Next Deterministic Action`.

