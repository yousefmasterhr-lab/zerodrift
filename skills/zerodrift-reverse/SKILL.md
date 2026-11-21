---
name: zerodrift-reverse
description: Stage 2B Reverse Engineering, Legacy Brownfield X-Ray & Competitive/Screenshot Deconstruction skill. Dissects existing local codebases, live SaaS websites/APIs, uploaded UI screenshots/videos, or legacy desktop processes into an evidence-backed 02B-REVERSE-ANALYSIS.md with exact file:line citations, Keep/Kill/Redesign teardown, and an opinionated Superiority Blueprint. Use when modernizing legacy code, auditing a messy repo, cloning/out-engineering a competitor app, or reconstructing architecture from screenshots.
---

# ZeroDrift Reverse — Deep Reverse Engineering & Superiority Deconstruction (Stage 2B)

## Purpose & Triggers

`zerodrift-reverse` performs forensic architectural X-rays and competitive teardowns—never stopping at passive description, always delivering a concrete **Superiority Blueprint** that eliminates legacy flaws and out-engineers the original.

**Activate when:**
- Working on an existing/legacy local codebase (**Brownfield X-Ray**).
- The user shares a live website, SaaS product URL, or public API docs and says "build something better than X" or "analyze how X works".
- The user uploads UI screenshots, screen recordings, Figma exports, or screen descriptions and wants the underlying component tree, state model, and database schema reconstructed.
- Migrating legacy desktop software (e.g., VB6, WinForms, Access, Excel macros, old PHP/ERP) to a modern web/cloud architecture.

**Template Resolution Order:** `./references/templates/02B-REVERSE-ANALYSIS.md` -> `../../templates/02B-REVERSE-ANALYSIS.md` -> embedded structure below.

---

## Core Laws Referenced

- **Anti-Hallucination (`core/anti-hallucination.md`):** Every codebase defect, dead route, or security flaw MUST cite exact `relative/path:line`. For screenshots/external apps, clearly separate *directly observed UI facts* from *inferred backend entities*.
- **Challenger Mindset (`core/challenger-mindset.md`):** Do not faithfully copy legacy bad UX, insecure auth, or broken schemas! Challenge and redesign every bottleneck.
- **Security Baseline (`core/security-baseline.md`):** Hunt proactively for hardcoded secrets, unauthenticated routes, SQLi, reflective CORS, plaintext passwords, and destructive boot scripts in legacy repos.
- **Wiring Discipline (`core/wiring-discipline.md`):** Detect duplicate servers, mismatched frontend/backend endpoints, orphan files, circular imports, and silent `catch {}` blocks.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Identify Analysis Mode(s) & Inventory Evidence
Determine which of the 4 input modes apply (multiple may combine):
1. **Mode A — Existing / Legacy Local Codebase (Brownfield X-Ray)**
2. **Mode B — Live Website / SaaS URL / Public API Docs**
3. **Mode C — UI Screenshots / Videos / Wireframes / Screen Descriptions**
4. **Mode D — Legacy Desktop Apps / Spreadsheets / Manual Business Processes**

### Step 2: Execute Mode-Specific Deep Dissection

#### Mode A: Brownfield Local Codebase X-Ray
1. Map project entry points, manifests (`package.json`, `tsconfig.json`, Docker/env files), build scripts, and directory topology.
2. If `floorplan/architecture.json` exists, read it first to map modules and routes. For huge monolith files (`> 1,000` lines), leverage `understand-anything` if installed; otherwise perform targeted structural reads.
3. Audit 5 critical structural planes with exact `file:line` citations:
   - **Topology & Server Hygiene:** Duplicate servers, conflicting ports, shadow routers, dead scripts.
   - **Frontend-to-Backend Wiring:** Broken URLs, mismatched HTTP methods/DTOs, unmounted routes.
   - **Data Layer & Transactions:** Missing transactions, non-idempotent seeds, raw SQL string interpolation, floating-point money, missing indexes/FKs.
   - **Security Exposures:** Missing auth/RBAC middleware, password hash leaks, hardcoded keys/backdoors, permissive CORS, XSS sinks.
   - **Dead Code & Debt:** Unused files/components, silent `catch {}`, `as any` / `@ts-ignore` hotspots.

#### Mode B: Live Website / SaaS URL / Public API Deconstruction (`Safe Read-Only Mode` Default)
**MANDATORY SAFETY POLICY:** Whenever analyzing any live authenticated web application or production SaaS URL, operate strictly in **`Safe Read-Only Mode`** by default:
1. **Passive Inspection Only:** Explore via read-only `GET` navigation, DevTools Network response capture, loaded client JS bundle/route inspection, and opening/canceling drawers or modals **WITHOUT submitting forms**.
2. **Zero Mutating/Destructive Clicks on Production:** Strictly forbid clicking `Save`, `Delete`, `Approve`, `Pay`, `Post`, `Void`, `Submit`, or any state-changing action on a live production environment. If request-payload capture is needed, recommend network request interception (`abort` before send) or an explicit user-authorized Staging/Test account.
3. **Credential Hygiene:** NEVER ask the user to paste production Admin passwords into chat. Recommend that the user log in manually in their visible browser session or supply a temporary Read-Only viewer account.
4. Deconstruct:
   - Information architecture & navigation tree
   - Core workflows (click count, friction points, form ergonomics, clipped table actions)
   - Public API/data patterns and integration touchpoints
   - Gaps, slow UX, robotic Arabic copy, missing RTL/localization, or over-complicated flows.

#### Mode C: UI Screenshots / Videos / Screen Descriptions
1. Reconstruct the exact **Component Hierarchy** (layout shell, nav, filters, tables, drawers, modals, KPI cards).
2. Derive the **Frontend State Model** (URL params, filter/sort/pagination state, form validation states, optimistic updates, missing error/empty states).
3. Infer the **Underlying Database Entities & Relations** (tables, foreign keys, status enums, computed totals) and explicitly tag inferred fields as `[INFERRED FROM UI]` for user validation.
4. Surface every hidden edge case screenshots hide (concurrency, permissions, edit-after-submit, partial failures, mobile/RTL layout).

#### Mode D: Legacy Desktop / Spreadsheet / Manual Process Mapping
1. Map legacy forms, reports, database tables/sheets, and manual approvals to clean modern web equivalents.
2. Identify data normalization debt (e.g., repeating columns, denormalized CSV strings, Excel formula drift) and design a lossless migration path.

### Step 3: Build the Strategic Teardown (Keep / Kill / Redesign)
Classify every major module, flow, and technical pattern into:
- **KEEP:** Battle-tested domain logic or ergonomic conventions worth preserving.
- **KILL:** Duplicate servers, dead modules, insecure legacy auth, redundant approval clicks, anti-patterns.
- **REDESIGN:** High-value capabilities crippled by poor schema, unsafe endpoints, or clunky UX.

### Step 4: Author the Superiority Blueprint
Produce concrete, measurable architectural upgrades showing exactly how the ZeroDrift target design out-engineers the original across:
1. Architecture & Data Integrity (transactions, contracts, strict typing)
2. Security Hardening (closing every discovered P0/P1 hole)
3. Operator UX & Speed (e.g., collapsing multi-screen legacy workflows, live search, keyboard shortcuts, first-class RTL/LTR)
4. Safe Cutover / Migration Strategy (for brownfield: strangler-fig or atomic schema migration with zero data loss).

### Step 5: Write `.zerodrift/02B-REVERSE-ANALYSIS.md` & Update `STATE.md`
1. Save complete structured analysis in `.zerodrift/02B-REVERSE-ANALYSIS.md`.
2. Update `.zerodrift/STATE.md` (`Stage 2B: COMPLETED`, logging critical P0/P1 legacy defects found under Blockers/Risks).

---

## Adaptive Intelligence Rules

- **Non-Destructive Inspection:** Stage 2B is strictly READ-ONLY on existing source code. Never edit legacy application files until Stage 3 (`03-ARCHITECTURE.md` + `CONTRACTS.md`) is approved.
- **Compliance with Access Boundaries:** When analyzing external URLs, inspect only public pages/docs or authenticated views the user explicitly opens—never bypass paywalls, auth gates, or anti-bot challenges.
- **Separate Observation from Inference:** Always tag screenshot-derived schema assumptions clearly so Stage 3 confirms them with the user.

---

## Hard Gate / Stop Criteria

- **MUST NOT** produce vague generic criticism ("code is messy", "UX could be better")—every claim requires `file:line`, screen reference, or concrete click/data evidence.
- **MUST FLAG IMMEDIATELY** any active P0 security exposure or data-loss bug discovered in a live brownfield codebase.

---

## Output Contract

1. `.zerodrift/02B-REVERSE-ANALYSIS.md` containing:
   - Subject & Evidence Scope
   - System & Module Inventory with health ratings (`SOLID | FRAGILE | BROKEN | DEAD`)
   - Inferred/Observed Entities & Defect Table (`REV-01`.. with exact `file:line` & `P0`–`P3` severity)
   - Strategic Teardown (`KEEP | KILL | REDESIGN`)
   - Superiority Blueprint & Safe Migration Strategy
2. `.zerodrift/STATE.md` updated with Stage 2B completion and key findings feeding Stage 3.

---

## Tool Integrations

- **`floorplan`:** Inspect `floorplan/architecture.json` if present to accelerate module/route discovery.
- **`understand-anything`:** Invoke only for huge legacy files (`> 1,000` lines) or dedicated architecture audits.
- **`browser` subagent:** Inspect live web URLs visually and trace interactive UX flows when the user requests analysis of a live site.
- **Living Memory & Studio Sync (`core/memory-and-regression.md`):** Write `02B-REVERSE-ANALYSIS.md` strictly in crisp English. Seed discovered P0/P1 legacy defects into `.zerodrift/memory/REGRESSION-LEDGER.json` (and legacy preservation constraints into `.zerodrift/memory/LOCKED-RULES.md`) so modernization never repeats old failures, then run `scripts/build-studio.mjs --project .`.
- **`read_file`:** Inspect screenshots (multimodal image reading) and exact source files directly.

