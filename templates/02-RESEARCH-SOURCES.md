# 02 — Domain Research, Standards & Stack Verification Ledger

> **Stage 2A Artifact (`zerodrift-research`).** Ground truth for every regulatory standard, industry formula, and technology version used in this project. Unverified claims MUST carry `[UNVERIFIED — REQUIRES CONFIRMATION]`.

## 1. Domain Classification & Compliance Scope

- **Primary Industry Domain:** `{{FILL: e.g., Healthcare Clinic Management / B2B ERP / E-Commerce}}`
- **Jurisdiction(s):** `{{FILL: e.g., Egypt / Saudi Arabia / EU / US / Global}}`
- **Research Date:** `{{DATE}}`

---

## 2. Verifiable Domain Standards & Rules Table

| Ref ID | Standard / Regulation / Authoritative Doc | Publisher & Official URL / Reference | Effective Date / Version | Key Rule / Formula Extracted | Dependent Module(s) | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `STD-01` | `{{FILL: Standard Name}}` | `{{FILL: Official URL or Statute Ref}}` | `{{FILL: Year/Version}}` | `{{FILL: Exact rule implemented in code}}` | `{{FILL: M1, M2}}` | `VERIFIED` |

---

## 3. Technology Stack & Live Package Verification

Every major runtime, framework, ORM, and validation library verified against official documentation before writing architecture or code:

| Layer | Technology / Package | Verified Stable Version | Official Docs URL | Key Non-Deprecated API Notes / Breaking Changes |
| :--- | :--- | :--- | :--- | :--- |
| Runtime | `{{FILL: Node.js / Python}}` | `{{FILL: e.g., 22.x LTS}}` | `{{FILL: Docs URL}}` | `{{FILL: e.g., Native ESM, node:test}}` |
| Frontend | `{{FILL: Framework}}` | `{{FILL: Version}}` | `{{FILL: Docs URL}}` | `{{FILL: Verified API pattern}}` |
| Backend | `{{FILL: Framework}}` | `{{FILL: Version}}` | `{{FILL: Docs URL}}` | `{{FILL: Verified API pattern}}` |
| Database / ORM | `{{FILL: DB + ORM}}` | `{{FILL: Version}}` | `{{FILL: Docs URL}}` | `{{FILL: Verified transaction & migration pattern}}` |
| Validation / Auth | `{{FILL: Zod / Argon2 / Jose}}` | `{{FILL: Version}}` | `{{FILL: Docs URL}}` | `{{FILL: Verified API pattern}}` |

---

## 4. Domain-Specific Failure Modes & Security Pitfalls

Concrete failure modes researched for this exact industry and how ZeroDrift prevents them in Stage 3:

| Pitfall ID | Common Industry Failure Mode | Architectural Prevention (Fed into Stage 3) |
| :--- | :--- | :--- |
| `PIT-01` | `{{FILL: e.g., Floating-point rounding drift in currency totals}}` | `{{FILL: Store monetary amounts in integer minor units / DECIMAL(18,4)}}` |
| `PIT-02` | `{{FILL: e.g., Race condition on concurrent slot/stock booking}}` | `{{FILL: Row-level lock / unique composite constraint inside DB transaction}}` |

---

## 5. Unverified Items Requiring Human Confirmation

*(List every item marked `[UNVERIFIED — REQUIRES CONFIRMATION]`, or explicitly write `None — all critical standards and package versions verified live.`)*

- `{{FILL: None or itemized list}}`
