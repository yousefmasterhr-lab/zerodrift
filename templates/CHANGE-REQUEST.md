# Change Requests & Mid-Build Ripple Log (`CHANGE-REQUEST.md`)

> **MANDATORY ENGLISH-ONLY INTERNAL ARTIFACT (`core/change-control.md`).** Every mid-build scope addition, schema tweak, or business-rule change after Gate 3 MUST be logged and impact-analyzed here BEFORE modifying application code.

## Change Request Ledger

| CR ID | Date | Summary & Rationale | Affected Contracts (`CONTRACTS.md`) | Blast Radius (Tables / Routes / Screens / Regression Guards) | Status (`PROPOSED` \| `APPROVED` \| `IMPLEMENTED`) |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `CR-000` | `{{DATE}}` | Initial baseline locked at Gate 3 for `{{PROJECT_NAME}}` | All initial routes & tables | None (baseline lock) | `IMPLEMENTED` |

---

## Active Change Request Details

*(Copy this compact block for each new `CR-001`, `CR-002`, ... before coding.)*

### Template Block (Reference)
- **CR ID:** `CR-001`
- **Requested Change:** Concise English description of the feature or rule change.
- **Ripple / Blast Radius:**
  - `CONTRACTS.md` updates required: Route IDs / DTOs / DB tables
  - `03-ARCHITECTURE.md` / `05-TASKS.md` slice updates: Slice ID(s)
  - Linked `REGRESSION-LEDGER.json` invariants to re-verify: `BUG-*` or `None`
- **Pre-Edit Checkpoint ID:** `CP-...` (created via `scripts/checkpoint.mjs create`)
- **Verification Exit 0 Evidence:** Exact test & validator commands run after implementation.

