# Core Law 5: Wiring Discipline & Zero-Drift Architecture

> **Prime Directive:** Most AI-generated applications fail not because individual functions are syntax-broken, but because the seams between layers drift—mismatched API URLs, duplicate servers, silent `catch {}` blocks, partial DB writes, and orphaned files. ZeroDrift eliminates seam drift by construction.

---

## 1. Single Source of Truth (`CONTRACTS.md`)

1. **Contract-First Wiring:** Every backend endpoint, HTTP method, request/response DTO, database table, and environment variable MUST be registered in `.zerodrift/CONTRACTS.md` before implementation begins.
2. **1:1 Frontend-to-Backend Parity:**
   - Every frontend `fetch` / API client call MUST match a real registered backend route by exact path, HTTP method, query/body schema, and response shape.
   - Define API paths and DTO types in a shared constants/schema module (or generated client) rather than repeating raw URL strings across components.
3. **Contract Amendment Protocol:** Never silently change a route path, field name, or status code in one layer. Update `CONTRACTS.md` first, then update both producer (backend) and consumer (frontend/tests) in the same slice.

---

## 2. Single-Source Routing & Server Topology

1. **No Duplicate Servers or Shadow Apps:** A project must have ONE clearly defined backend entry point and ONE frontend router registry (unless multi-service architecture is explicitly justified in `03-ARCHITECTURE.md`). Never create stray `server2.js`, `api-old/`, or duplicate route mounts on conflicting ports.
2. **Declarative Route Table:** Mount all feature routers from a single central registry file (`routes/index.*` or framework router tree) so static wiring audits can enumerate every live endpoint deterministically.
3. **Graceful 404 & Error Middleware:** Always register a typed JSON `404 Not Found` fallback and a single centralized error-handling middleware so unhandled exceptions never hang requests or leak raw HTML/stack traces.

---

## 3. Atomic Transactions & Idempotent Persistence

1. **Transactional Multi-Step Writes:** Any operation modifying 2+ tables or updating a balance alongside a ledger/audit record (e.g., creating an invoice + line items + journal entry + stock movement) MUST execute inside a single database transaction (`BEGIN ... COMMIT / ROLLBACK`).
2. **Idempotent Mutations & Upserts:**
   - Seed scripts, sync jobs, webhook handlers, and payment/order submissions MUST be idempotent (using unique constraints, `ON CONFLICT DO UPDATE/NOTHING`, or idempotency keys).
   - Running a seed or migration twice must produce the exact same database state without duplicate rows or crashes.
3. **Server-Computed Truth:** Totals, taxes, discounts, inventory stock, account balances, and timestamps (`createdAt`, `updatedAt`) MUST be computed and enforced server-side—never blindly accepted from client JSON payloads.

---

## 4. Zero Silent Failures & Safe State Management

1. **No Silent `catch {}` Blocks:**
   - Empty `catch {}` or `catch (e) { console.log(e); return []; }` that hides a real server/network/DB failure as "empty data" is strictly forbidden.
   - Every `catch` block must either: (a) map the error to a typed domain error and propagate/surface it to the user UI, (b) perform an explicitly documented fallback with structured warning logs, or (c) rethrow with context.
2. **Safe Async & React State Updates:**
   - Cancel or guard in-flight async requests (`AbortController` or request sequence IDs) so stale responses never overwrite fresher state on rapid navigation/filtering.
   - Handle loading, error, empty, and success states explicitly in every data-fetching view.
3. **Zero Dead Code & Layer Inversions:**
   - Keep dependency flow strictly unidirectional: `UI / Routes -> Application Services / Use Cases -> Domain Logic -> Data Access / Repositories`.
   - Domain logic must never import HTTP/Express/React UI modules.
   - Remove unused files, dead exports, and orphaned routes caught by `knip` or static graph audits before closing a slice.

