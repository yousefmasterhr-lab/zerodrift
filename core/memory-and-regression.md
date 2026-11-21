# Core Law 7: Living Memory, Anti-Regression Shield & English-Only Internal Artifacts

> **Prime Directive:** AI agents fail across long projects because they forget user rules, break Feature B while fixing Feature A, drift off locked design tokens, and repeat solved mistakes across sessions. ZeroDrift eliminates amnesia and regressions via a structured, machine-readable Living Memory inside `.zerodrift/memory/` and `.zerodrift/learned-skills/`.

---

## 1. Strict Language Policy (English-Only Internal Artifacts)

- **ALL internal engineering artifacts MUST ALWAYS be written in crisp, precise English** for maximum LLM reasoning accuracy, deterministic parsing, and cross-model portability:
  - `.zerodrift/STATE.md`, `00-BRIEF.md`, `01-PRD.md`, `02-RESEARCH-SOURCES.md`, `02B-REVERSE-ANALYSIS.md`, `03-ARCHITECTURE.md`, `CONTRACTS.md`, `04-DESIGN-SYSTEM.md`, `05-TASKS.md`, `05-SECURITY-AUDIT.md`, `06-HANDOVER-REPORT.md`
  - `.zerodrift/memory/LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, `PROMPTS-AND-DECISIONS.md`
  - `.zerodrift/learned-skills/*.md`
  - All source code identifiers, comments, commit messages, and test assertions (except explicit UI localization dictionaries such as `locales/ar.json`).
- **User-Facing Translation Only:** Communicate, explain, and summarize in the user's preferred language (e.g., Arabic / Egyptian Arabic) in chat replies or when the user toggles the UI language in ZeroDrift Studio. Never write raw internal rules, ledgers, or contracts in mixed colloquial text.

---

## 2. The 5 Pillars of Living Project Memory

Every ZeroDrift-managed project maintains its persistent brain in `.zerodrift/memory/` and `.zerodrift/learned-skills/`:

### Pillar 1: `.zerodrift/memory/LOCKED-RULES.md` (Anti-Forgetting Guard)
- Compact, numbered imperative directives (`RULE-001`, `RULE-002`, ...) extracted automatically from user instructions, README constraints, security requirements, and architectural approvals.
- **Mandatory Law:** Read `LOCKED-RULES.md` at the start of **every session** and **before every multi-file edit**. Never violate a locked rule unless the user explicitly revokes or amends it (and log the amendment with date and reason).

### Pillar 2: `.zerodrift/memory/REGRESSION-LEDGER.json` (Anti-"Fix A Breaks B" Shield)
- Structured JSON array recording every non-trivial bug, failure, or recurrence:
  ```json
  {
    "id": "BUG-001",
    "date": "2026-11-19",
    "severity": "P1",
    "symptom": "Invoice totals diverged by 0.01 on multi-line discounts",
    "rootCause": "Floating-point multiplication before rounding",
    "filesTouched": ["src/modules/invoices/calculator.ts"],
    "brokenByChange": "Added per-line discount percentage in S-03",
    "fixSummary": "Switched all intermediate calculations to integer minor units",
    "invariantToProtect": "Sum of line totals in minor units MUST equal invoice grandTotalMinor",
    "regressionTestRef": "tests/invoices.test.ts#L42",
    "recurrenceCount": 0
  }
  ```
- Increment `recurrenceCount` immediately if a previously fixed bug ever reappears; any `recurrenceCount >= 1` triggers a mandatory structural hardening pass.

### Pillar 3: `.zerodrift/memory/DESIGN-TOKENS.json` (Anti-Color / Style Drift Lock)
- Machine-readable source of truth locking approved palette hex codes, `forbiddenColors` (e.g., banning stark `#FFFFFF` or `#000000` when a warm/tinted palette is locked), typography families, spacing/radii, surface rules, and RTL/LTR direction policy.
- Verified deterministically by `scripts/validate-project.mjs` against CSS/Tailwind/TSX/HTML source files. Any unapproved or forbidden color override fails the gate until corrected or explicitly approved.

### Pillar 4: `.zerodrift/memory/PROMPTS-AND-DECISIONS.md` (Context Recovery Log)
- Chronological, curated record of high-signal user prompts, README constraint references, trade-off analyses, and rationale for major pivots—allowing a new session or different AI model to recover full "why" context in seconds.

### Pillar 5: `.zerodrift/learned-skills/<skill-name>.md` (Auto-Evolving Project Playbooks)
- Whenever the agent solves a tricky domain rule, non-obvious third-party SDK quirk, performance trap, or recurring workflow in the repository, it distills a compact, reusable **English** playbook in `.zerodrift/learned-skills/<skill-name>.md` (with YAML frontmatter, verified code pattern, and pitfall warnings) and registers it in `.zerodrift/STATE.md`.

---

## 3. Mandatory Pre-Edit Ripple Check Protocol

Before modifying ANY existing application file, execute this 3-step shield:
1. **Check Locked Rules:** Read `.zerodrift/memory/LOCKED-RULES.md` to ensure the planned edit violates zero active rules.
2. **Check Regression History & Blast Radius:**
   - Search `.zerodrift/memory/REGRESSION-LEDGER.json` for every entry whose `filesTouched` overlaps the files you plan to edit (or their direct dependents).
   - Inspect `floorplan/architecture.json` (if present) or static imports to enumerate every downstream screen, service, or route depending on the touched module.
3. **Post-Edit Invariant Re-Verification:** After applying the edit, explicitly verify every linked `invariantToProtect` and re-run every linked `regressionTestRef` (plus `validate-project.mjs` token drift check for UI edits) before marking the edit complete.

---

## 4. Two-Way Mission Control Sync (`ZeroDrift Studio`)

- Whenever the user adds a permanent rule via **ZeroDrift Studio** (`POST /api/rules`) or submits interactive decisions (`POST /api/responses` -> `.zerodrift/studio-outbox.json`), the agent MUST treat those entries as authoritative user directives.
- After every completed stage, vertical slice, bug fix, or rule update, refresh `.zerodrift/studio-data.json` via `scripts/build-studio.mjs` so the live browser Mission Control dashboard stays 100% synchronized.

