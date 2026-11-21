---
name: zerodrift-research
description: Stage 2A Domain Intelligence, Standards/Compliance Lookup & Live Stack Verification skill. Actively researches official industry standards (IFRS, ZATCA, ETA, HIPAA, Egyptian Labor Law, PCI-DSS, GDPR, etc.), verifies current stable package versions and non-deprecated APIs, identifies domain failure modes, and produces a verifiable 02-RESEARCH-SOURCES.md provenance ledger with zero fabricated citations. Use before architecture whenever domain rules, compliance, or modern framework APIs matter.
---

# ZeroDrift Research — Domain Intelligence & Standards Verification (Stage 2A)

## Purpose & Triggers

`zerodrift-research` eliminates outdated training-data hallucinations and naive business logic by verifying authoritative industry standards, compliance rules, and live package APIs BEFORE architecture and contracts are locked.

**Activate when:**
- Stage 1 (`01-PRD.md`) is complete and the project involves domain rules (accounting, invoicing, tax, HR/payroll, healthcare, e-commerce, booking, multi-tenant SaaS, fintech, logistics).
- Selecting or upgrading frameworks, ORMs, auth libraries, or third-party SDKs whose APIs change across major versions.
- The user asks to research standards, verify compliance requirements, or audit library versions before building.

**Template Resolution Order:** `./references/templates/02-RESEARCH-SOURCES.md` -> `../../templates/02-RESEARCH-SOURCES.md` -> embedded structure below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** NEVER fabricate URLs, RFCs, tax percentages, labor law articles, or package versions. Every claim must be backed by a live tool query or explicitly tagged `[UNVERIFIED — REQUIRES CONFIRMATION]`.
- **Deterministic Gate Machine (`core/state-machine.md`):** Feed verified rules directly into Stage 3 (`03-ARCHITECTURE.md` & `CONTRACTS.md`) and Stage 7 (`06-HANDOVER-REPORT.md`).
- **Security Baseline (`core/security-baseline.md`):** Research domain-specific threat models and compliance data-handling mandates (PII encryption, retention, audit immutability).

---

## Execution Algorithm (Step-by-Step)

### Step 1: Extract Research Targets from `01-PRD.md`
1. Read `.zerodrift/STATE.md` and `.zerodrift/01-PRD.md` (or inspect user prompt if running standalone).
2. Classify:
   - **Primary Industry Domain & Sub-Modules** (e.g., Double-Entry Accounting, Inventory FIFO/Weighted Average, Clinic EMR & Scheduling, HR Payroll & Leave Accrual).
   - **Jurisdiction(s)** (e.g., Egypt, Saudi Arabia, UAE, EU, US, Global).
   - **Candidate Technology Stack** (runtime, frontend, backend, DB/ORM, validation, auth, payments/integrations).

### Step 2: Live Domain Standards & Compliance Lookup
Using web search / official documentation tools (when available):
1. Query authoritative primary sources for every regulated or domain-critical module:
   - **Accounting / Tax:** IFRS / GAAP double-entry invariants, immutability of posted journals, VAT/e-invoicing specifications (e.g., Saudi ZATCA Phase 2, Egypt ETA e-Invoicing/e-Receipt, EU VAT).
   - **HR / Payroll:** Statutory leave calculations, social insurance / tax bracket structures, overtime multipliers, payslip retention rules for the specified jurisdiction.
   - **Healthcare:** HIPAA / local patient privacy, audit logging on PHI access, appointment conflict prevention, clinical record versioning.
   - **E-Commerce / Payments:** PCI-DSS scope minimization (hosted tokenization via Stripe/Paymob/PayTabs, never storing raw PAN/CVV), webhook signature verification, idempotent checkout.
   - **Multi-Tenant SaaS:** Tenant isolation models, GDPR data export/deletion workflows, RBAC & audit compliance.
2. Extract **concrete, code-enforceable rules and formulas** (not vague paragraphs)—e.g., *"Every posted journal entry MUST satisfy `SUM(debit_minor_units) === SUM(credit_minor_units)` and cannot be hard-deleted; corrections require a linked reversal entry."*

### Step 3: Live Tech Stack & Package Verification
For every core library in the planned stack:
1. Verify the **current stable major/minor version** via web search, official docs, or local registry checks (`npm view <pkg> version` when online).
2. Verify **non-deprecated API patterns & breaking changes** for that exact major version (e.g., Next.js App Router async `params`, Tailwind v4 CSS-first config vs v3, Prisma/Drizzle transaction API, Zod v3 vs v4, Argon2/Node `crypto.scrypt` usage).
3. Record exact official documentation URLs.

### Step 4: Domain Failure Modes & Security Pitfalls Analysis
Identify the **top 5–8 real-world engineering failure modes** for this exact domain (e.g., floating-point currency drift, double-booking race conditions, negative stock race conditions, timezone midnight boundary bugs, webhook replay attacks, stale tax-rate recalculations on historical invoices) and map each to a concrete architectural safeguard for Stage 3.

### Step 5: Write `.zerodrift/02-RESEARCH-SOURCES.md` & Update `STATE.md`
1. Populate the **Verifiable Sources Table** with: `Ref ID`, `Standard/Doc Name`, `Publisher & Official URL/Ref`, `Effective Date/Version`, `Key Rule Extracted`, `Dependent Module(s)`, `Verification Status`.
2. Explicitly list any offline/unconfirmed items in Section 5 marked `[UNVERIFIED — REQUIRES CONFIRMATION]`.
3. Update `.zerodrift/STATE.md` (`Stage 2A: COMPLETED` or `BLOCKED` if critical compliance rules require user confirmation).

---

## Adaptive Intelligence Rules

- **Offline / No-Web Graceful Honesty:** If web search is unavailable or blocked in the environment, NEVER pretend you fetched live docs. Clearly note the offline constraint, rely only on verifiable local manifests/standards knowledge, and tag all volatile facts (current tax rates, latest npm minor versions, recent statutory changes) with `[UNVERIFIED — REQUIRES CONFIRMATION]` so the user can confirm or supply official docs.
- **Primary Sources Only:** Prefer official specifications, government portals, RFCs, OWASP Cheat Sheets, and official framework documentation over random blog posts or outdated forum answers.
- **No Research Paralysis:** Focus strictly on facts that impact database schema, formulas, security controls, or library API correctness—skip encyclopedic essays.

---

## Hard Gate / Stop Criteria

- **MUST NOT** emit a single fabricated URL, statute number, or unverified version labeled as `VERIFIED`.
- **MUST PAUSE** and notify the user if a business-critical legal/financial calculation (e.g., exact statutory tax brackets or mandatory government API schema) is `[UNVERIFIED — REQUIRES CONFIRMATION]`.

---

## Output Contract

1. `.zerodrift/02-RESEARCH-SOURCES.md` containing:
   - Domain classification & jurisdiction
   - Verifiable Domain Standards & Rules Table (`STD-01`..)
   - Technology Stack & Live Package Verification Table
   - Domain-Specific Failure Modes & Architectural Preventions (`PIT-01`..)
   - Explicit Unverified Items ledger (or explicit `None`)
2. `.zerodrift/STATE.md` updated with Stage 2A completion and any open `[UNVERIFIED]` blockers.

---

## Tool Integrations

- **`search_web` tool:** Primary tool for verifying official standards, compliance docs, OWASP guidance, and current library releases.
- **Package registries / local CLI:** Inspect `package.json` / `node_modules` (in brownfield) or check official docs for version-accurate APIs.
- **Living Memory, Concise Chat & Studio Sync (`core/memory-and-regression.md`, `core/concise-chat.md`):** Author `02-RESEARCH-SOURCES.md` strictly in crisp English. Record critical verified compliance/stack invariants into `.zerodrift/memory/LOCKED-RULES.md`, refresh ZeroDrift Studio via `scripts/build-studio.mjs --project .`, and keep routine chat summaries to <= 8 lines pointing to Studio.
- **Stage 7 Handoff:** Every `STD-*` entry in `02-RESEARCH-SOURCES.md` flows directly into the Provenance Ledger of `06-HANDOVER-REPORT.md`.

