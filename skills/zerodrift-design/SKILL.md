---
name: zerodrift-design
description: Stage 4 Anti-AI-Slop Design System, Interactive Multi-Layout UI/UX & Typography Showcase, Tokens & Bilingual RTL/LTR Specification skill. Generates 3 interactive live UI/UX layout concepts + 5 curated Arabic/English font pairings inside ZeroDrift Studio (DESIGN-SHOWCASE.json), enforces Natural Business Arabic copy & Anti-Clipped Data Tables, and locks the user's chosen Layout + Font Pairing + Color Palette into 04-DESIGN-SYSTEM.md, DESIGN-TOKENS.json, and COPY-STYLE.json before UI coding begins.
---

# ZeroDrift Design — Interactive UI/UX Showcase, Typography & Token Lock (Stage 4)

## Purpose & Triggers

`zerodrift-design` replaces blind design guessing and tiny color swatches with a live, interactive **3-Concept UI/UX & 5-Font-Pairing Showcase** inside ZeroDrift Studio—locking exact layout architecture, typography, WCAG AA tokens, Natural Business Arabic copy, and anti-clipped table ergonomics before Stage 5 UI coding begins.

**Activate when:**
- Stage 3 (`03-ARCHITECTURE.md` & `CONTRACTS.md`) is approved for any application with a user interface.
- Upgrading visual hierarchy, typography, dark/light parity, or natural Arabic RTL polish of an existing frontend.
- Invoked by `zerodrift` as Stage 4 or standalone to design a cohesive UI system.

**Template Resolution Order:** `./references/templates/{04-DESIGN-SYSTEM.md,DESIGN-SHOWCASE.json,memory/DESIGN-TOKENS.json,memory/COPY-STYLE.json}` -> `../../templates/...` -> embedded rules below.

---

## Core Laws Referenced

- **Design Excellence (`core/design-excellence.md`):** Intentional palette & WCAG AA contrast (`>= 4.5:1` body, `>= 3:1` controls), tabular numerals, logical CSS RTL/LTR mirroring, **Natural Business Arabic Glossary** (zero robotic AI Arabic), **Anti-Clipped Data Tables** (sticky trailing Action column), and all 6 interactive states.
- **Living Memory (`core/memory-and-regression.md`):** Lock exact hex codes, forbidden colors, chosen layout concept, and font pairing inside `.zerodrift/memory/DESIGN-TOKENS.json` and `.zerodrift/memory/COPY-STYLE.json`.
- **Concise Chat (`core/concise-chat.md`):** Populate `.zerodrift/DESIGN-SHOWCASE.json`, refresh Studio, and invite the user in <= 8 lines to pick their Layout + Font + Palette visually in **ZeroDrift Studio → Design & Tokens**.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Author Project-Tailored Interactive Showcase (`.zerodrift/DESIGN-SHOWCASE.json`)
1. Read `.zerodrift/01-PRD.md`, `.zerodrift/03-ARCHITECTURE.md`, and `.zerodrift/CONTRACTS.md`.
2. Populate `.zerodrift/DESIGN-SHOWCASE.json` with 3 tailored full-page UI/UX concepts populated with realistic domain sample records:
   - **Concept A — Warm Editorial Calm** (layered warm cards, soft hairline borders, editorial hierarchy, low eye-strain).
   - **Concept B — Modern Glass & Floating Navigation** (frosted glass floating bar/rail, crisp depth, emerald/mint active accents).
   - **Concept C — Executive High-Density Workspace** (compact sidebar, dense ERP KPI strip, scannable tables with pinned sticky Action columns).
3. Include the **5 Curated Arabic + English Font Pairings** (`IBM Plex Sans Arabic + Plus Jakarta Sans`, `Cairo + Inter`, `Alexandria + Manrope`, `Readex Pro + DM Sans`, `Tajawal + Outfit`) and 3 WCAG AA verified color palettes.
4. Refresh Studio via `node scripts/build-studio.mjs --project .` so the user can toggle **Layout A/B/C**, **5 Font Pairings**, **Light/Dark**, and **Arabic RTL / English LTR** live in their browser!

### Step 2: Capture Gate 4 Selection from ZeroDrift Studio (or Chat)
- Present the Studio URL (`Design & Tokens` tab) in <= 8 lines so the user clicks **"Lock Chosen Design"** directly in the Showcase (persisting to `DESIGN-TOKENS.json` + `studio-outbox.json`), OR accepts the recommended default in chat.

### Step 3: Lock Design Tokens, Copy Style & Specification Artifacts
1. Update `.zerodrift/memory/DESIGN-TOKENS.json` with:
   - Chosen `layoutConcept` (`editorial-calm` | `modern-glass` | `executive-dense`)
   - Chosen `fontPairing` (Arabic + Latin + tabular Mono stacks)
   - Exact `palette`, `approvedColors`, `forbiddenColors` (e.g., banning stark `#FFFFFF` on Warm Ivory systems), `radii`, and `directionality`.
2. Update `.zerodrift/memory/COPY-STYLE.json` with domain voice, Western `0-9` tabular numeral policy, currency/date format, and **Natural Business Arabic Glossary** (zero robotic AI terms).
3. Write `.zerodrift/04-DESIGN-SYSTEM.md` in crisp English locking:
   - Chosen Layout Concept & Font Pairing
   - Color Tokens & WCAG AA verification
   - Logical CSS RTL/LTR & BiDi isolation rules (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`)
   - **Anti-Clipped Data Tables Spec:** compact column budget (`<= 6` core columns) + `position: sticky; inset-inline-end: 0` on the Action column + mobile stacked card view
   - Screen Inventory (`SCR-01`..`SCR-N`) and full 6-State Interactive & Accessibility Matrix.
4. Update `.zerodrift/STATE.md` (`Stage 4: APPROVED`) and refresh Studio (`scripts/build-studio.mjs --project .`).

---

## Adaptive Intelligence Rules

- **Pure CLI / Headless API Exception:** If the project has zero UI screens, explicitly mark Stage 4 `SKIPPED (Headless API/CLI)` in `STATE.md` and proceed straight to Stage 5.
- **Offline Font Resilience:** Always pair online Google Fonts `<link>` declarations with high-craft local system font fallbacks so offline rendering remains razor-sharp.

---

## Hard Gate / Stop Criteria

- **MUST NOT** lock a design system without verifying WCAG AA contrast (`>= 4.5:1`), specifying logical CSS for RTL/LTR, enforcing Anti-Clipped Sticky Action Columns on data tables, and locking `DESIGN-TOKENS.json` + `COPY-STYLE.json`.
- **Gate 4:** Obtain user sign-off on the chosen Layout Concept + Font Pairing + Palette before Stage 5 UI coding begins.

---

## Output Contract

1. `.zerodrift/DESIGN-SHOWCASE.json` — Interactive 3-concept & 5-font-pairing showcase configuration.
2. `.zerodrift/04-DESIGN-SYSTEM.md` — Complete design tokens, chosen layout/fonts, RTL/LTR rules, anti-clipped tables spec, screen map, and 6-state matrix.
3. `.zerodrift/memory/DESIGN-TOKENS.json` & `.zerodrift/memory/COPY-STYLE.json` — Machine-readable visual & natural copy locks.
4. `.zerodrift/STATE.md` & `.zerodrift/studio-data.json` updated.

---

## Tool Integrations

- **ZeroDrift Studio (`Design & Tokens` tab):** Live 3-layout previewer, 5-font switcher, Light/Dark & RTL/LTR toggles, and 1-click **Lock Chosen Design** (`POST /api/design-lock`).
- **`scripts/validate-project.mjs`:** Deterministically checks UI source code for Color Token Drift & UTF-8 Mojibake against `DESIGN-TOKENS.json`.
- **Browser subagent (Stage 6A downstream):** Visually verifies breakpoints, sticky action columns, and RTL rendering.
