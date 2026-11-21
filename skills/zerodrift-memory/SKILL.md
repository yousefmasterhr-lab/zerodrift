---
name: zerodrift-memory
description: Living Project Memory, Anti-Regression Shield & Learned Skills Vault manager. Extracts permanent imperative rules into LOCKED-RULES.md, executes mandatory Pre-Edit Ripple Checks against REGRESSION-LEDGER.json and dependency graphs so fixing A never breaks B, enforces DESIGN-TOKENS.json color/style locks, logs key trade-offs in PROMPTS-AND-DECISIONS.md, and distills solved project challenges into reusable English playbooks inside .zerodrift/learned-skills/. Use before any sensitive edit, after fixing any bug, when the user gives a permanent constraint, or when switching sessions/models.
---

# ZeroDrift Memory — Living Memory, Anti-Regression Shield & Learned Skills Vault

## Purpose & Triggers

`zerodrift-memory` protects every ZeroDrift project from AI amnesia, recurring bugs, accidental side-effects ("fix A breaks B"), and visual token drift across long sessions and model switches.

**Activate when:**
- Starting or resuming any session in a `.zerodrift/` workspace (read `LOCKED-RULES.md` + `REGRESSION-LEDGER.json` + `.zerodrift/learned-skills/`).
- The user states a permanent preference, constraint, or correction (extract into `LOCKED-RULES.md` immediately).
- Before editing any existing file (run the **Pre-Edit Ripple Check**).
- Immediately after fixing any non-trivial bug or regression (record in `REGRESSION-LEDGER.json`).
- After solving a tricky domain rule, third-party integration quirk, or repeating workflow (distill into `.zerodrift/learned-skills/<skill-name>.md`).

**Reference Resolution Order:** `./references/core/memory-and-regression.md` & `./references/templates/memory/*` -> `../../core/...` & `../../templates/memory/...` -> embedded protocol below.

---

## Core Laws Referenced

- **Living Memory & Anti-Regression (`core/memory-and-regression.md`):** Strict English-only internal artifacts, `LOCKED-RULES.md`, `REGRESSION-LEDGER.json`, `DESIGN-TOKENS.json`, `PROMPTS-AND-DECISIONS.md`, `.zerodrift/learned-skills/`, and Pre-Edit Ripple Check.
- **Anti-Hallucination (`core/anti-hallucination.md`):** Never log unverified root causes or fake regression test paths; cite exact `file:line` and verified test references.
- **Wiring Discipline (`core/wiring-discipline.md`):** Cross-check dependency graphs (`floorplan/architecture.json` or static imports) during ripple checks so downstream callers stay synchronized.
- **Design Excellence (`core/design-excellence.md`):** Lock and verify palette hex codes, forbidden colors, typography, and RTL/LTR rules via `DESIGN-TOKENS.json`.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Session Memory Hydration (Read-First)
1. Read `.zerodrift/memory/LOCKED-RULES.md`, `.zerodrift/memory/REGRESSION-LEDGER.json`, and `.zerodrift/memory/DESIGN-TOKENS.json` (if present).
2. Scan `.zerodrift/learned-skills/` for any project-specific playbooks relevant to the active module or task.
3. Read `.zerodrift/studio-outbox.json` (if present) to absorb any pending interactive user answers or rules submitted through **ZeroDrift Studio**.

### Step 2: Rule Extraction & Locking (`LOCKED-RULES.md`)
Whenever the user gives a lasting directive (e.g., *"never use stark white #FFFFFF"*, *"always compute VAT server-side in minor units"*, *"never modify legacy table X"*):
1. Distill the directive into one crisp, unambiguous **English** imperative sentence.
2. Assign the next sequential ID (`RULE-005`, `RULE-006`, ...) in `.zerodrift/memory/LOCKED-RULES.md` with Category, Source/Date, and `ACTIVE` status.
3. Also record the surrounding trade-off or rationale in `.zerodrift/memory/PROMPTS-AND-DECISIONS.md`.
4. Never silently override or delete an `ACTIVE` rule; if the user explicitly changes their mind later, move the rule to the `Revoked / Amended Rules Log` with date and rationale.

### Step 3: Mandatory Pre-Edit Ripple Check (Before Touching Code)
Before editing any existing source file(s) `F`:
1. Scan `.zerodrift/memory/LOCKED-RULES.md` for any rule governing `F`'s module, security, contracts, or styling.
2. Query `.zerodrift/memory/REGRESSION-LEDGER.json` for all entries where `filesTouched` intersects `F` or its direct callers.
3. Inspect `floorplan/architecture.json` (if present) or static `import` statements to list every dependent screen, route, service, or test affected by `F`.
4. List the active **Protected Invariants** to re-verify immediately after editing.

### Step 4: Post-Fix Regression Recording (`REGRESSION-LEDGER.json`)
After diagnosing and fixing any bug (new or recurring):
1. Append a structured English JSON object to `entries[]` in `.zerodrift/memory/REGRESSION-LEDGER.json`:
   - `id` (`BUG-001`, ...), `date` (`YYYY-MM-DD`), `severity` (`P0`–`P3`)
   - `symptom`, `rootCause`, `filesTouched[]`, `brokenByChange`
   - `fixSummary`, `invariantToProtect`, `regressionTestRef`, `recurrenceCount` (`0` for new; increment on recurrence)
2. Ensure an automated test covering `invariantToProtect` exists and passes (`exit 0`).
3. Re-run every other `regressionTestRef` linked to overlapping `filesTouched` to confirm zero collateral regression.

### Step 5: Design Token Lock Maintenance (`DESIGN-TOKENS.json`)
1. When Stage 4 (`zerodrift-design`) locks the palette, typography, radii, and `forbiddenColors`, synchronize `.zerodrift/memory/DESIGN-TOKENS.json` immediately.
2. Run `node scripts/validate-project.mjs --target .` after UI edits to detect unapproved or forbidden color overrides deterministically.

### Step 6: Distill Auto-Evolving Learned Skills (`.zerodrift/learned-skills/`)
Whenever the agent solves a non-trivial domain formula, tricky library/API integration, deployment quirk, or repeatable project workflow:
1. Create `.zerodrift/learned-skills/<kebab-case-skill-name>.md` in crisp **English** with YAML frontmatter (`name`, `domain`, `created`, `verified: true`), Problem & Trigger, Verified Solution Pattern, Pitfalls to Avoid, and anchoring source/test paths.
2. Index the newly created skill inside `.zerodrift/STATE.md` under `Learned Project Skills`.

### Step 7: Sync ZeroDrift Studio
- Run `node scripts/build-studio.mjs --project .` (or refresh `.zerodrift/studio-data.json`) so the Memory Vault, Rules table, Regression Timeline, and Learned Skills viewer update live in the user's browser.

---

## Adaptive Intelligence Rules

- **Strict English Internal Discipline:** Even if the user speaks Arabic, Egyptian dialect, French, or mixed language in chat, translate every extracted rule, bug ledger entry, decision log, and learned skill into precise English before saving to `.zerodrift/memory/` or `.zerodrift/learned-skills/`.
- **High-Signal Compression:** Keep `LOCKED-RULES.md` concise and scannable—merge duplicate rules rather than letting the file bloat into noisy prose.
- **Recurrence Escalation:** If any bug reaches `recurrenceCount >= 2`, invoke the Challenger Mindset (`core/challenger-mindset.md`) to propose a structural redesign rather than another point patch.

---

## Hard Gate / Stop Criteria

- **MUST NOT** modify a file linked to a `P0`/`P1` entry in `REGRESSION-LEDGER.json` without first listing and subsequently re-verifying its `invariantToProtect` and `regressionTestRef`.
- **MUST NOT** violate an `ACTIVE` rule in `LOCKED-RULES.md` silently.
- **MUST NOT** ship UI changes that fail the `DESIGN-TOKENS.json` drift check in `validate-project.mjs`.

---

## Output Contract

1. `.zerodrift/memory/LOCKED-RULES.md` — Up-to-date numbered imperative rules in English.
2. `.zerodrift/memory/REGRESSION-LEDGER.json` — Valid JSON ledger of bugs, root causes, protected invariants, and test refs.
3. `.zerodrift/memory/DESIGN-TOKENS.json` — Machine-readable visual token and forbidden-color lock.
4. `.zerodrift/memory/PROMPTS-AND-DECISIONS.md` — Curated chronological decision & trade-off log.
5. `.zerodrift/learned-skills/<name>.md` — Verified reusable project playbooks indexed in `STATE.md`.

---

## Tool Integrations

- **`scripts/validate-project.mjs`:** Deterministically validates `REGRESSION-LEDGER.json` schema, `DESIGN-TOKENS.json` color-drift compliance across project source files, and memory vault integrity.
- **`scripts/build-studio.mjs` & `scripts/studio-server.mjs`:** Visualizes rules, regression timeline, token gallery, and learned skills live in **ZeroDrift Studio** and accepts new permanent rules via `POST /api/rules`.
- **`scripts/code-map.mjs` & `floorplan/architecture.json`:** Used during Pre-Edit Ripple Checks (`code-map.mjs --impact <file>`) to compute exact transitive dependents and linked regression invariants before editing. Keep routine memory chat confirmations to <= 5 lines per `core/concise-chat.md`.

