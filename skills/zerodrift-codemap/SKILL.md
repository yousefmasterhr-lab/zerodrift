---
name: zerodrift-codemap
description: Built-in Native CodeMap, Architecture Dependency Graph, Route Wiring Parity & Blast Radius Engine (Skill #12). Scans any codebase via scripts/code-map.mjs to generate .zerodrift/codemap.json — detecting architecture layers, circular dependencies, orphan files, layer boundary violations, broken frontend-to-backend route wires, and transitive blast radius — while integrating cleanly with external floorplan and archify (Windows-safe validate-deliver-check workflow) when installed. Use before multi-file edits, during Stage 3/6A, or whenever mapping how an app is wired.
---

# ZeroDrift CodeMap — Native Architecture Map, Wiring Parity & Blast Radius (Skill #12)

## Purpose & Triggers

`zerodrift-codemap` makes ZeroDrift 100% sovereign for visual architecture mapping, import dependency analysis, 1:1 frontend-to-backend wiring verification, and pre-edit blast-radius protection—requiring zero external tools while harmonizing cleanly with `floorplan` and `archify` when installed.

**Activate when:**
- Mapping an unfamiliar or brownfield codebase to see how UI, API clients, backend routes, services, and database schemas connect.
- Computing exact **Blast Radius (`--impact <file>`)** before any multi-file, API, database, or routing change.
- Verifying 1:1 frontend-to-backend route wiring parity, circular imports, dead/orphan files, and layer boundary violations in Stage 6A (`zerodrift-verify`).
- Refreshing the interactive SVG CodeMap canvas inside **ZeroDrift Studio**.

**Reference Resolution Order:** `./references/core/{wiring-discipline.md,memory-and-regression.md,concise-chat.md}` -> `../../core/...` -> embedded rules below.

---

## Core Laws Referenced

- **Wiring Discipline (`core/wiring-discipline.md`):** 1:1 `CONTRACTS.md` route parity, unidirectional layering (`UI -> API Clients -> Routes -> Services -> DB`), zero circular imports, zero broken wires.
- **Living Memory & Pre-Edit Ripple Check (`core/memory-and-regression.md`):** Cross-reference Blast Radius dependents against `.zerodrift/memory/REGRESSION-LEDGER.json` before editing existing files.
- **Anti-Hallucination (`core/anti-hallucination.md`):** Every detected cycle, orphan file, broken wire, or layer violation is computed deterministically from actual source files on disk—never guessed.
- **Concise Chat (`core/concise-chat.md`):** Write full map JSON to `.zerodrift/codemap.json`, refresh Studio (`scripts/build-studio.mjs`), and report a tight 5–8 line summary in chat.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Run the Native Zero-Dep CodeMap Scanner
Execute `scripts/code-map.mjs` against the target project directory:
```bash
node scripts/code-map.mjs --project .
```
The scanner deterministically inspects workspace files (ignoring `node_modules`, `.git`, `dist`, `build`, `.zerodrift`) and emits `.zerodrift/codemap.json` containing:
1. **Layered Module Inventory:** Classifies every source file into `ui`, `api-client`, `routes`, `services`, `database`, `shared`, or `tests`.
2. **Import Graph & Cycle Detection:** Resolves relative ESM/TypeScript/JS imports and detects exact **Circular Dependencies**, **Orphan/Dead Files**, and **Layer Boundary Violations** (e.g., UI importing database repositories directly).
3. **Frontend-to-Backend Wiring Parity:** Extracts frontend `fetch()`/`apiClient` calls and matches them against backend route registrations (Express/Fastify/Hono/Cloudflare Pages) AND `.zerodrift/CONTRACTS.md`, flagging **Broken Wires**, **Orphan Routes**, and **Unauthenticated Routes**.

### Step 2: Pre-Edit Blast Radius Analysis (When Planning Edits)
Before modifying any sensitive file `src/path/file.ts`, run:
```bash
node scripts/code-map.mjs --project . --impact src/path/file.ts
```
Review every direct dependent, transitive dependent, and linked `REGRESSION-LEDGER.json` `invariantToProtect` before editing code.

### Step 3: Companion Ecosystem Harmonization (Optional External Tools)
- **If `floorplan` is installed:** Offer or invoke `floorplan` during Stage 3 (pre-code blueprint) and Stage 6A (incremental map refresh). ZeroDrift Studio automatically displays a 1-click **"Open Floorplan Map"** button whenever `floorplan/index.html` exists.
- **If `archify` is installed:** When generating standalone executive architecture plates inside `.zerodrift/archify/*.html` (Stage 7), ALWAYS follow the **Windows-safe `validate → deliver → check` workflow** (avoiding `finalize` hardlink `nlink` errors on Windows). ZeroDrift Studio automatically exposes **"Open Archify Plate"** buttons whenever `.zerodrift/archify/*.html` files exist.

### Step 4: Refresh ZeroDrift Studio Canvas & Report Concisely
1. Run `node scripts/build-studio.mjs --project .` so the **Interactive SVG CodeMap Canvas** inside ZeroDrift Studio (`Map & Contracts` tab) renders the updated nodes, curved wires, layer filters, and click-to-trace Blast Radius highlights live via SSE.
2. Reply in chat in <= 8 lines with exact counts (`nodes`, `edges`, `cycles`, `orphans`, `brokenWires`, `layerViolations`) and direct Studio link.

---

## Adaptive Intelligence Rules

- **Graceful Greenfield Behavior:** On an empty greenfield repo prior to Stage 5, `code-map.mjs` cleanly emits an empty graph seeded with `CONTRACTS.md` planned routes so Studio never errors.
- **Zero External Dependency Guarantee:** Never fail if `floorplan`, `archify`, `knip`, or `depcruise` are absent—ZeroDrift's built-in `code-map.mjs` + SVG Studio Canvas provides full architectural visibility natively out of the box.

---

## Hard Gate / Stop Criteria

- **MUST FLAG AS BLOCKING** in Stage 6A (`zerodrift-verify`) any **Broken Frontend-to-Backend Wire**, **Runtime Circular Dependency**, or **UI-to-DB Layer Inversion** discovered by `code-map.mjs`.
- **MUST NOT** commit generated local `floorplan/` directories unless explicitly requested by the user.

---

## Output Contract

1. `.zerodrift/codemap.json` — Machine-readable layered graph, edges, cycles, orphan files, layer violations, route wiring parity, and blast radius metadata.
2. Updated `.zerodrift/studio-data.json` rendering the live interactive SVG CodeMap Canvas inside ZeroDrift Studio.
3. Concise 5–8 line chat report citing exact scanner counts.

---

## Tool Integrations

- **`scripts/code-map.mjs`:** Primary zero-dep scanner & Blast Radius calculator (`--project`, `--impact`, `--json`).
- **`scripts/build-studio.mjs` & `scripts/studio-server.mjs`:** Serves `/api/codemap`, `/floorplan/*`, `/archify/*`, and interactive SVG CodeMap canvas.
- **Optional External Companions:** `floorplan`, `archify` (Windows-safe `validate → deliver → check`), `knip`, `dependency-cruiser`.

