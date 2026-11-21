# Core Law 1: Anti-Hallucination & Evidence-First Engineering

> **Prime Directive:** Never fabricate a file path, symbol, API signature, package version, compliance statute, or verification result. If it has not been directly observed or verified, it is unknown—and must be labeled as such.

---

## 1. Read-Before-Write Protocol

1. **Inspect before editing:** Before modifying any existing file, read the relevant section of the file in full. Never guess line numbers, imports, export names, or schema definitions from memory.
2. **Verify filesystem existence:** Before referencing or importing a module, verify that the file exists on disk (or is explicitly queued for creation in the current vertical slice).
3. **Check `package.json` / lockfiles first:** Never import a third-party library unless it is listed in the project manifest or explicitly installed in the current step. Verify the installed major version before using version-sensitive APIs (e.g., React 19 vs 18, Next.js App Router vs Pages, Zod v3 vs v4, Express v4 vs v5, Tailwind v3 vs v4).

---

## 2. Live Verification of External Facts

When making claims about external libraries, cloud services, tax/accounting regulations, healthcare compliance, or labor laws:

1. **Query live authoritative sources** (official docs, RFCs, government portals, npm/PyPI registries) whenever web or CLI search tools are available.
2. **Record provenance immediately:** Every external rule or API contract used in architecture or code must be logged in `.zerodrift/02-RESEARCH-SOURCES.md` with:
   - Source name & publisher
   - Exact URL or official document/statute identifier
   - Version or effective date
   - Concrete engineering rule extracted
   - Dependent module(s)
3. **Hard Honesty Marker:** If a tool is offline or a primary source cannot be reached, you MUST mark the item explicitly as:
   `[UNVERIFIED — REQUIRES CONFIRMATION]`
   Never invent a plausible-sounding URL, RFC number, tax rate, or article number.

---

## 3. Exact Citation Discipline

- **Codebase findings** (audits, reverse engineering, bug reports, security reviews) MUST cite exact `relative/path/to/file.ext:line` (or `:start-end`) and quote the offending symbol or construct.
- **Verification claims** MUST quote the exact command executed and its exit code. Never write "tests pass", "builds cleanly", or "no TypeScript errors" unless the command was actually executed after the final edit and exited with code `0`.
- **No phantom diffs:** Never describe changes you "planned" to make as if they were already applied.

---

## 4. Forbidden Anti-Patterns

| Forbidden Pattern | Required Replacement |
| :--- | :--- |
| Inventing undocumented flags, CLI options, or SDK methods | Check `--help`, local type definitions (`node_modules/**/*.d.ts`), or official docs first |
| Assuming an API endpoint exists on the backend | Cross-check `.zerodrift/CONTRACTS.md` and the actual route registration file |
| Silencing compiler errors with `@ts-ignore`, `@ts-expect-error`, or `as any` | Fix the underlying type mismatch or contract drift at its root |
| Returning fake/mocked success responses in production code paths | Implement the real persistence/service call or fail explicitly with a typed `501 Not Implemented` / domain error during scaffolding |
| Guessing user preferences on business-critical rules (tax, billing, RBAC) | Ask via `zerodrift-intake` with a clearly labeled recommended default, or record the assumption in `01-PRD.md` for explicit approval |

---

## 5. Unknown-State Escalation Rule

When you hit a genuine ambiguity or missing dependency that cannot be resolved from the workspace or live documentation:
1. State exactly what you checked (files, commands, docs).
2. State the exact gap or contradiction found.
3. Propose 2 concrete options with a clear recommendation and trade-offs.
4. Pause at the gate instead of guessing silently.

