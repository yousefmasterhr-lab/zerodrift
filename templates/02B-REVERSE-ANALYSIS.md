# 02B — Reverse Engineering & Competitive Deconstruction

> **Stage 2B Artifact (`zerodrift-reverse`).** Deep structural X-ray of an existing codebase, live competitor app, UI screenshots, or legacy business system—paired with an opinionated Superiority Blueprint.

## 1. Subject & Evidence Scope

- **Analysis Mode:** `{{FILL: Brownfield Codebase | Live Web App / API | UI Screenshots / Flows | Legacy Desktop / Manual Process}}`
- **Target Inspected:** `{{FILL: Repo path, URLs, screenshot count, or legacy app name}}`
- **Inspection Date:** `{{DATE}}`

---

## 2. Current-State Structural X-Ray

### 2.1 System & Module Inventory
| Component / Screen / Module | Location (`file:line` or URL/Screen) | Purpose | Health Rating (`SOLID` \| `FRAGILE` \| `BROKEN` \| `DEAD`) |
| :--- | :--- | :--- | :--- |
| `{{FILL: Module / Screen}}` | `{{FILL: Exact path or screen ref}}` | `{{FILL: What it does}}` | `{{FILL: Rating}}` |

### 2.2 Inferred or Observed Data Entities & Relationships
- `{{FILL: Entity name, key fields, relationships, and observed data integrity flaws}}`

### 2.3 Observed Defects, Wiring Drift & Security Exposures
*(Every codebase finding MUST cite exact `file:line`.)*

| Finding ID | Severity (`P0`–`P3`) | Category (Wiring / Security / Perf / UX / Dead Code) | Evidence (`file:line` or Screen) | Concrete Impact |
| :--- | :---: | :--- | :--- | :--- |
| `REV-01` | `P0` | `{{FILL: Category}}` | `{{FILL: path/file.ts:42}}` | `{{FILL: Exact failure or exposure}}` |

---

## 3. Strategic Teardown: Keep / Kill / Redesign

| Element | Decision (`KEEP` \| `KILL` \| `REDESIGN`) | Engineering Rationale |
| :--- | :---: | :--- |
| `{{FILL: Existing pattern or feature}}` | `KEEP` | `{{FILL: Why it works and should be preserved}}` |
| `{{FILL: Legacy bottleneck or duplicate server}}` | `KILL` | `{{FILL: Why removing it eliminates drift or risk}}` |
| `{{FILL: Clunky multi-step UX or unsafe endpoint}}` | `REDESIGN` | `{{FILL: Exact target architecture}}` |

---

## 4. Superiority Blueprint (How We Out-Engineer the Original)

1. **Architectural Upgrade:** `{{FILL: Structural improvement over the legacy/competitor design}}`
2. **Workflow & UX Leapfrog:** `{{FILL: Measurable reduction in operator clicks, errors, or latency}}`
3. **Security & Data Integrity Hardening:** `{{FILL: Exact invariants added that the original lacked}}`
4. **Migration / Cutover Strategy (if Brownfield):** `{{FILL: Safe incremental strangler-fig or clean-room migration steps with zero data loss}}`

