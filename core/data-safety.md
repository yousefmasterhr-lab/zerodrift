# Core Law 9: Data Integrity, Reversible Migrations & Anti-Fake-Success Safety

> **Prime Directive:** Production data is sacred and error honesty is non-negotiable. ZeroDrift bans auto-destructive boot hooks, irreversible ad-hoc schema edits, fake HTTP 200 fallbacks, and production mock contamination.

---

## 1. Zero Auto-Destructive Boot Operations

1. **No Client-Triggered Purges on Page Load:** Strictly forbid any frontend boot effect, missing `localStorage` flag, auth mount, or health check from invoking `DELETE`, `TRUNCATE`, `DROP`, `/api/reset`, or state-wiping mutations automatically.
2. **No Startup Auto-Wipes on Server Boot:** Application startup and migration runners MUST NEVER drop tables, truncate user data, or reset admin accounts automatically—even when an environment flag is missing.
3. **Guarded Destructive Actions Only:** Any administrative purge or bulk delete MUST require:
   - Server-side elevated RBAC verification
   - Explicit interactive confirmation token/payload
   - Immutable audit log entry (`actorId`, `action`, `target`, `timestamp`, `reason`).

---

## 2. Reversible Migrations & Idempotent Atomic Upserts

1. **Versioned, Reversible Schema Changes:**
   - Every database schema change must be expressed as a timestamped/versioned migration file with a clear rollback/down strategy (or expand-and-contract zero-downtime sequence for column renames/drops).
   - Never rely on `synchronize: true` or destructive `prisma db push --force-reset` in production.
2. **Atomic Idempotent Upserts:**
   - State mutations on existing IDs, seed scripts, webhook processors, and sync imports MUST use atomic `UPSERT` (`INSERT ... ON CONFLICT DO UPDATE` / `MERGE`) inside explicit database transactions (`BEGIN ... COMMIT / ROLLBACK`).
   - Re-running any migration, seed, or idempotent webhook twice MUST yield the exact same database state with zero duplicate rows and zero crashes.
3. **Immutable Financial & Audit Ledgers:** Posted accounting journals, invoices, payments, stock movements, and security audit logs MUST be append-only (corrections use reversal/credit entries rather than destructive `DELETE` or silent in-place overwrites).

---

## 3. Zero Silent Fake-Success Fallbacks

1. **Ban Fake HTTP 200 Responses:** Interceptors, API clients, and `catch` blocks are strictly forbidden from swallowing real backend/database/network failures and returning fake HTTP `200 { success: true }`, fake saved records, or silently substituting hardcoded mock arrays in production code paths.
2. **Explicit Failure Propagation:** When persistence or an upstream service fails:
   - Roll back the active database transaction cleanly.
   - Log a structured server-side error with `requestId` (redacting credentials/PII).
   - Return a canonical non-`2xx` `ApiErrorEnvelope` (`4xx`/`5xx`) so the UI surfaces the real error state with a Retry control.

---

## 4. Strict Staging / Dev vs. Production Separation

1. **Isolated Seed & Fixture Data:** Demo fixtures, mock login helpers, and synthetic seed datasets MUST live exclusively behind explicit dev/test commands or `NODE_ENV === 'test'` / dedicated CLI scripts—NEVER bundled into production runtime routes or auto-seeded into production databases.
2. **Fail-Fast Environment Validation:** Production boot MUST validate every required variable in `.zerodrift/CONTRACTS.md` (and `.env.example`) at startup and exit non-zero immediately if critical secrets (`DATABASE_URL`, `AUTH_SECRET`, `ALLOWED_ORIGINS`) are missing or default placeholders.

