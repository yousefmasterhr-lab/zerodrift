---
name: zerodrift-intake
description: Stage 0 & 1 Chaos-to-Clarity Socratic Intake skill. Transforms 2 vague words, messy bilingual voice-note brain-dumps (Arabic, Egyptian dialect, English, or mixed), or partial specs into a crisp, high-signal 00-BRIEF.md and 01-PRD.md using a 7-dimension Clarity Score, smart defaults, and proactive opportunity mining. Use when starting a new software idea, clarifying ambiguous requirements, or scoping an MVP before architecture.
---

# ZeroDrift Intake — Chaos-to-Clarity Adaptive Discovery (Stages 0 & 1)

## Purpose & Triggers

`zerodrift-intake` converts unstructured human intent into an unambiguous, approval-ready Product Requirements Document (`01-PRD.md`) without burying the user in a 30-question form.

**Activate when:**
- The user starts with a minimal or messy prompt (e.g., `"عايز نظام عيادات"`, `"build me a SaaS for gyms"`, or a 500-word rambling voice transcript).
- Requirements have hidden gaps in roles, workflows, scale, compliance, or localization.
- Invoked by `zerodrift` as Stage 1 or standalone before planning a new feature/product.

**Template Resolution Order:** `./references/templates/{00-BRIEF.md,01-PRD.md,STATE.md}` -> `../../templates/...` -> embedded structure below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** Never invent unstated business rules or legal rates; label every assumption clearly and ask or propose a recommended default.
- **Deterministic Gate Machine (`core/state-machine.md`):** Do not advance to Stage 2/3 until Clarity Score >= 90% and `STATE.md` reflects Stage 1 status.
- **Challenger Mindset (`core/challenger-mindset.md`):** Surface hidden edge cases, scope traps, and 3–5 `[OPTIONAL UPGRADE]` opportunities.
- **Design Excellence (`core/design-excellence.md`):** Capture language(s), RTL/LTR needs, target devices, and operator density upfront.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Parse Raw Input & Detect Language/Mode
1. Read `.zerodrift/STATE.md` if present; otherwise create `.zerodrift/` and initialize `STATE.md`.
2. Preserve the user's raw intent faithfully inside `.zerodrift/00-BRIEF.md` (Section 1).
3. Detect input language/dialect (Arabic, Egyptian Arabic, English, or mixed). **Mirror the user's language in conversation** while keeping technical field names, role IDs, and schema terminology crisp and unambiguous.

### Step 2: Compute the 7-Dimension Clarity Score (0–100%)
Score the current understanding objectively across 7 weighted dimensions:
1. **Core Problem & Value Proposition (15%):** What painful workflow is being solved and what defines success?
2. **Target Users, Personas & Roles / RBAC (15%):** Who logs in, what can each role do, and what must be denied?
3. **Core Modules & Primary Workflows (20%):** What are the exact 3–7 core user journeys in v1?
4. **Data Model, Scale & Persistence Needs (15%):** Single-tenant vs multi-tenant, rough volume, offline/online, attachments?
5. **Integrations, Hosting & Deployment (10%):** Payments, WhatsApp/SMS/email, local vs cloud hosting, preferred stack?
6. **Industry Compliance & Domain Rules (15%):** Accounting/tax standards (IFRS, ZATCA, ETA), healthcare privacy, labor law, audit trails?
7. **UI Language, RTL/LTR & Aesthetic Bar (10%):** Arabic RTL, English LTR, bilingual toggle, desktop vs mobile-first, dark/light mode?

Compute the weighted total and record every dimension's score and open gap in `.zerodrift/00-BRIEF.md`.

### Step 3: Run Adaptive Socratic Rounds (If Clarity < 90%)
- **If Clarity >= 90%** (e.g., user supplied a comprehensive PRD): Skip interrogation! Confirm key interpretations concisely, surface `[OPTIONAL UPGRADE]` suggestions, and draft `01-PRD.md` immediately.
- **If Clarity < 90%:**
  - Group the highest-leverage gaps into **3 to 5 surgical questions per round** (maximum **2–3 rounds** total—NEVER dump 15–30 questions at once).
  - For EVERY question, provide **multiple-choice options** AND a clearly marked **Smart Default**:
    > *"If you don't specify, I recommend **Option A** because [1-sentence engineering rationale]."*
  - Allow the user to reply with a single line like `"accept all defaults"` or `"1B, 2A, rest defaults"`.
  - After each reply, recompute the 7-dimension Clarity Score and log answers in `00-BRIEF.md`.

### Step 4: Proactive Opportunity Mining
Before finalizing `01-PRD.md`, propose **3 to 5 high-value, non-obvious capabilities** tailored to the user's exact domain (e.g., immutable audit trail, WhatsApp appointment reminders, automatic low-stock alerts, CSV/PDF bilingual receipts, role-scoped dashboards).
- Label every single suggestion `[OPTIONAL UPGRADE]` with **Impact** and **Effort**.
- Only fold opted-in upgrades into v1 scope; log declined/deferred ones under **Explicit Non-Goals** to kill scope creep.

### Step 5: Author `01-PRD.md` & Request Gate 1 Sign-Off
1. Write `.zerodrift/01-PRD.md` containing:
   - Executive Summary & measurable success metrics
   - RBAC Seed Matrix (Roles, Permissions, Explicitly Denied Actions)
   - Module-by-Module User Stories, exact workflows, testable Acceptance Criteria, and critical edge cases
   - Non-Functional Requirements (Security, RTL/LTR, Performance, Reliability, Accessibility)
   - Regulatory/Domain Standards queued for Stage 2A (`zerodrift-research`)
   - Explicit Non-Goals for v1
2. Update `.zerodrift/STATE.md` (`Stage 1: IN_PROGRESS` awaiting approval, or `APPROVED` once user confirms).
3. Present a tight executive summary of `01-PRD.md` and ask for Gate 1 confirmation.

---

## Adaptive Intelligence Rules

- **Bilingual & Dialect Mastery:** Understand colloquial phrases accurately (e.g., Egyptian Arabic `"خزنة"`, `"كشف حساب"`, `"حجز كشوفات"`, `"شيفتات"`, `"صلاحيات الكاشير"`) and map them to clean domain concepts (`Treasury/Cashbox`, `Account Statement`, `Appointment Booking`, `Work Shifts`, `Cashier RBAC`) without losing business nuance.
- **Smart Stack Defaults:** If the user is non-technical or indifferent to tech stack, recommend a proven, maintainable, strictly typed default (e.g., TypeScript + React/Next.js + Node/PostgreSQL or SQLite for local-first) and explain why in plain language.
- **Anti-Scope-Creep Guard:** If a user asks for 20 massive modules in v1 (e.g., full SAP ERP + mobile apps + AI + hardware POS), constructively propose a phased roadmap (Phase 1 Core MVP vs Phase 2 Expansion) rather than silently producing a shallow prototype.

---

## Hard Gate / Stop Criteria

- **MUST NOT** finalize `01-PRD.md` with Clarity Score < 90% unless the user explicitly instructs `"lock defaults and proceed"`.
- **MUST NOT** write application code during Stage 1.
- **MUST STOP** at Gate 1 for user confirmation of `01-PRD.md` before transitioning to Stage 2/3 in Guided Mode.

---

## Output Contract

1. `.zerodrift/00-BRIEF.md` — Verbatim context, 7-dimension Clarity Score table (`>= 90%`), Q&A & defaults log, `[OPTIONAL UPGRADE]` table, explicit non-goals.
2. `.zerodrift/01-PRD.md` — Complete, testable PRD with RBAC seed matrix, module acceptance criteria, NFRs, and compliance scope.
3. `.zerodrift/STATE.md` — Updated with Stage 1 status, Clarity Score, locked decisions, and next action (`Stage 2A: zerodrift-research`).

---

## Tool Integrations

- **`ask_question` tool (when available):** Use structured multiple-choice questions with `(Recommended)` first options for ultra-fast interactive intake rounds.
- **Living Memory & English Internal Law (`core/memory-and-regression.md`):** Author `00-BRIEF.md`, `01-PRD.md`, `LOCKED-RULES.md`, and `PROMPTS-AND-DECISIONS.md` strictly in crisp **English**, even when conversing with the user in Arabic or mixed dialect. Extract any lasting user constraint directly into `.zerodrift/memory/LOCKED-RULES.md`.
- **Two-Way Bilingual ZeroDrift Studio Q&A & Concise Chat (`core/concise-chat.md`):** Whenever asking Socratic round questions or requesting Gate 1 approval, write structured bilingual `{ en, ar }` questions/choices/defaults into `.zerodrift/studio-inbox.json` (using Natural Business Arabic—zero robotic phrasing), auto-set `Default Studio Locale: ar` in `STATE.md` when the user prompts in Arabic, refresh `scripts/build-studio.mjs --project .`, and reply in chat in <= 8 lines pointing to ZeroDrift Studio (while also accepting direct chat replies).
- **`scripts/validate-project.mjs`:** Run to verify `00-BRIEF.md`, `01-PRD.md`, and `STATE.md` contain zero unresolved `{{FILL:...}}` placeholders before closing Gate 1.

