---
name: zerodrift-architect
description: Stage 3 System Architecture, Single-Source CONTRACTS.md, Vertical Slice Plan (05-TASKS.md) & Mandatory Red-Team Challenger skill. Designs clean modular architectures, ERDs, ADRs, inviolable API/DTO/DB/Env contracts, and runs a 6-plane Red-Team risk review before a single line of application code is written. Optionally generates a pre-code Floorplan blueprint. Use after intake/research/reverse analysis or whenever designing a new system or major module.
---

# ZeroDrift Architect — Contracts, Blueprints & Red-Team Challenger (Stage 3)

## Purpose & Triggers

`zerodrift-architect` locks the exact technical blueprint and inviolable interface contracts (`CONTRACTS.md`) before implementation starts—eliminating split-brain APIs, schema rework, security afterthoughts, and over-engineered infrastructure.

**Activate when:**
- Stage 1 (`01-PRD.md`) and Stage 2 (`02-RESEARCH-SOURCES.md` / `02B-REVERSE-ANALYSIS.md`) are ready.
- Designing a new application architecture, major refactor, or multi-module API/database schema.
- Invoked by `zerodrift` at Stage 3 or standalone to author/review system architecture and `CONTRACTS.md`.

**Template Resolution Order:** `./references/templates/{03-ARCHITECTURE.md,CONTRACTS.md,05-TASKS.md}` -> `../../templates/...` -> embedded structure below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** Use only verified package versions and APIs from `02-RESEARCH-SOURCES.md` (or inspect local `package.json` in brownfield).
- **Challenger Mindset (`core/challenger-mindset.md`):** Mandatory 6-plane Red-Team Challenge Pass before requesting Gate 3 approval.
- **Security Baseline (`core/security-baseline.md`):** Bake deny-by-default auth, server-side RBAC, tenant scoping, Zod schemas, salted hashing, CORS allowlisting, and audit trails directly into `CONTRACTS.md`.
- **Wiring Discipline (`core/wiring-discipline.md`):** Single backend entry point, single central route registry, unidirectional layer dependencies, atomic transactions, and 1:1 `CONTRACTS.md` parity.
- **Mid-Build Change Control (`core/change-control.md`):** Initialize `.zerodrift/CHANGE-REQUEST.md` (`templates/CHANGE-REQUEST.md`) at Gate 3 lock; any mid-build scope or rule change must compute blast radius across `CONTRACTS.md`, `03-ARCHITECTURE.md`, `REGRESSION-LEDGER.json`, and `05-TASKS.md` before coding.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Load Upstream Ground Truth
1. Read `.zerodrift/STATE.md`, `.zerodrift/01-PRD.md`, `.zerodrift/02-RESEARCH-SOURCES.md`, and `.zerodrift/02B-REVERSE-ANALYSIS.md` (if present).
2. Extract every non-negotiable business rule (`STD-*`), industry pitfall (`PIT-*`), RBAC role, and legacy fix (`REV-*`).

### Step 2: Design System Architecture (`.zerodrift/03-ARCHITECTURE.md`)
Author a concrete, YAGNI-disciplined architecture covering:
1. **System Topology & Runtime Diagram (Mermaid):** Single backend entry point, single frontend entry point, primary DB, background jobs (only if strictly justified).
2. **Module Boundaries & Unidirectional Dependency Rules:** Explicit directory map (`Routes/UI -> Services/Use Cases -> Domain Logic -> Repositories/DB`) with allowed/forbidden imports per module.
3. **Entity-Relationship Diagram (Mermaid ERD):** All core entities, primary keys, foreign keys, unique constraints, soft-delete/immutability rules, and composite indexes for real query patterns.
4. **Architecture Decision Records (ADRs):** Every major choice (stack, DB engine, auth mechanism, money representation, state management) with rejected alternatives and clear trade-offs.
5. **Error Handling, Transaction & Observability Strategy:** Canonical error envelope (`{ error: { code, message, details?, requestId } }`), DB transaction boundaries for multi-table writes, and structured audit logging.

### Step 3: Lock the Inviolable Contract Registry (`.zerodrift/CONTRACTS.md`)
Define every seam explicitly so frontend, backend, database, and tests cannot drift:
1. **Environment Variables Contract:** Every server/client env var, scope (`SERVER` vs `CLIENT`), required flag, format validation rule, and purpose.
2. **HTTP API Route Registry:** Every single endpoint with `Route ID`, `Method`, `Path`, `Auth & RBAC` (`PUBLIC` explicitly allowlisted; all others require auth + roles), exact Request Zod schema (params/query/body), exact Success `2xx` response DTO, and expected error status codes.
3. **Shared DTOs & Schemas:** Canonical TypeScript/Zod shapes proving zero sensitive fields (`passwordHash`, `salt`, tokens) ever cross API boundaries.
4. **Database Tables, Constraints & Indexes:** Exact table names, column types (integer minor units / `DECIMAL` for money—never binary float!), `UNIQUE`, `CHECK`, `FK`, and query indexes.
5. **Contract Amendments Log:** Initialized with `INIT` lock record.

### Step 4: Slice Into Vertical Implementation Units (`.zerodrift/05-TASKS.md`)
Decompose the entire build into small, dependency-ordered **Vertical Slices** (`S-01`, `S-02`, ...):
- **`S-01` (Always Foundation + Auth + RBAC):** Project scaffold, env validation, DB schema + idempotent migration/seed, password hashing, signed session auth, RBAC middleware, centralized error handler, and auth/RBAC integration tests.
- **`S-02`..`S-N` (Core Domain -> Secondary Modules -> Polish):** Each slice delivers complete DB + Service + API + UI + critical automated tests for one cohesive vertical flow, with an explicit verification command.

### Step 5: Execute the Mandatory Red-Team Challenge Pass
Before presenting to the user, adversarially review your own `03-ARCHITECTURE.md` and `CONTRACTS.md` across all 6 planes:
1. **Data Integrity & Concurrency** (race conditions, double-submits, immutable ledgers)
2. **Security & Blast Radius** (IDOR, tenant leaks, privilege escalation, CORS, mass assignment)
3. **Scale & Operational Bottlenecks** ($N+1$ queries, unbounded lists, slow sync calls)
4. **Split-Brain & Wiring Drift** (client vs server truth, duplicated enums/formulas)
5. **UX Friction & Edge Cases** (RTL/BiDi, network drops, expired sessions, 403/empty states)
6. **Scope & Simplicity (YAGNI)** (eliminating unnecessary microservices, caches, or abstractions)

Record the **Top 5 Risks & Concrete Mitigations** inside Section 6 of `03-ARCHITECTURE.md`, and immediately patch `CONTRACTS.md` to bake every mitigation in.

### Step 6: Optional Pre-Code Blueprint Map & Gate 3 Sign-Off
1. If the `floorplan` skill is available and the project is a multi-module app, offer or generate a pre-code Blueprint Map (`floorplan/index.html`) from `03-ARCHITECTURE.md` + `CONTRACTS.md`.
2. Populate the Vertical Slice Ledger inside `.zerodrift/STATE.md` and mark `Stage 3: IN_PROGRESS` awaiting Gate 3 approval.
3. Present a crisp executive summary of the Architecture, Contracts count, Red-Team Top 5 Mitigations, and Vertical Slice plan, and ask the user for **Gate 3 approval**.

---

## Adaptive Intelligence Rules

- **Monolith-First Simplicity:** Default to a clean, strongly-typed modular monolith with a relational database (PostgreSQL or SQLite) unless the PRD proves a genuine distributed-systems requirement.
- **Financial & Inventory Precision:** Whenever money, tax, or stock quantities appear, mandate integer minor units or fixed-precision `DECIMAL` plus immutable ledger/movement entries—never floating-point `NUMBER`/`FLOAT` or mutable-only balance columns.
- **Brownfield Respect:** In brownfield projects, align `CONTRACTS.md` with existing live production routes unless an explicit versioned migration (`v2` or strangler cutover) is documented in `02B-REVERSE-ANALYSIS.md`.

---

## Hard Gate / Stop Criteria

- **MANDATORY GATE 3:** NEVER proceed to Stage 5 (`zerodrift-build`) until `03-ARCHITECTURE.md`, `CONTRACTS.md`, and `05-TASKS.md` are complete (zero unresolved placeholders), the 6-plane Red-Team Challenge Pass is documented, AND the user explicitly approves Gate 3.
- **MUST NOT** leave any protected route with ambiguous `Auth & RBAC` (empty or placeholder values are a hard fail).

---

## Output Contract

1. `.zerodrift/03-ARCHITECTURE.md` — Topology, module boundaries, ERD, ADRs, error/transaction strategy, and Top 5 Red-Team Mitigations.
2. `.zerodrift/CONTRACTS.md` — Complete Env, API Route, DTO/Zod, DB Schema, and Amendment Ledger.
3. `.zerodrift/05-TASKS.md` — Dependency-ordered vertical slices (`S-01`..`S-N`) with concrete verification gates.
4. `.zerodrift/STATE.md` — Updated with Stage 3 status and populated Vertical Slice Ledger.

---

## Tool Integrations

- **`floorplan` skill:** Optional pre-code visual blueprint directly from the approved spec.
- **Living Memory, Concise Chat & Two-Way Studio Gate 3 (`core/memory-and-regression.md`, `core/concise-chat.md`):** Author `03-ARCHITECTURE.md`, `CONTRACTS.md`, and `05-TASKS.md` strictly in crisp English. Log major ADRs into `.zerodrift/memory/PROMPTS-AND-DECISIONS.md` and inviolable architectural constraints into `.zerodrift/memory/LOCKED-RULES.md`. Populate `.zerodrift/studio-inbox.json` with a bilingual Gate 3 approval card, refresh `scripts/build-studio.mjs --project .`, and ask for sign-off in <= 8 crisp chat lines pointing to Studio.
- **`scripts/validate-project.mjs`:** Validates `CONTRACTS.md` completeness and zero unresolved placeholders before Gate 3 lock.
