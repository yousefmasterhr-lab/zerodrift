# Core Law 4: Zero-Vulnerability Security Baseline

> **Prime Directive:** Security is not a post-launch polish pass—it is a structural invariant enforced from the first line of `CONTRACTS.md` through the final `05-SECURITY-AUDIT.md` gate. Zero P0 or P1 vulnerabilities may ship.

---

## 1. Deny-by-Default Authentication & Server-Side RBAC

1. **Default Deny:** Every API route, server action, RPC procedure, WebSocket channel, and file/storage endpoint MUST require authentication and explicit role/permission verification by default. Public endpoints (e.g., `/api/health`, `/api/auth/login`) must be explicitly allowlisted in `CONTRACTS.md`.
2. **Never trust client-only guards:** Hiding a button or redirecting in React/Next.js/Vue is UX—not security. Authorization MUST be enforced server-side on every request before reading or mutating data.
3. **Tenant & Resource Ownership (IDOR Defense):** Every single-record read/update/delete MUST scope the database query by the authenticated user's `tenantId` / `organizationId` / `ownerId` (or verified elevated role). Never fetch by raw `id` alone and assume the caller owns it.
4. **Real Session & Token Cryptography:**
   - Sign JWTs/session cookies with strong environment-provided secrets (`>= 32` random bytes) using explicit algorithms (`HS256` / `EdDSA` / `RS256`; never `alg: none`).
   - Set cookies with `HttpOnly`, `Secure` (in production), `SameSite=Lax` (or `Strict`), and bounded expiration (`maxAge` + refresh rotation or server-side revocation).
   - **Zero universal backdoors:** Never leave hardcoded master passwords, bypass headers (`x-bypass-auth`), dev-only admin logins active in production, or unauthenticated debug/seed/reset routes.

---

## 2. Password, Secret & PII Hygiene

1. **Modern Salted Password Hashing:** Hash passwords exclusively with **Argon2id**, **scrypt**, or **bcrypt** (cost `>= 12`). Never store plaintext, reversible encryption, MD5, or bare SHA-256 hashes.
2. **Zero Hash or Secret Leaks:** Strip `passwordHash`, `salt`, `resetToken`, `mfaSecret`, and internal API keys at the repository/serializer boundary using explicit column allowlists (e.g., `SELECT id, email, role` instead of `SELECT *`).
3. **Zero Hardcoded Secrets:** API keys, database URLs, JWT secrets, and SMTP/OAuth credentials MUST come exclusively from environment variables, validated at startup (fail fast if missing in production), and never bundled into frontend code (`VITE_*` / `NEXT_PUBLIC_*` must contain ONLY intentionally public values).
4. **Safe Error Responses & Logging:** Never expose stack traces, SQL errors, internal file paths, or raw auth tokens in HTTP responses or client logs. Log structured error codes server-side with redacted Authorization headers and PII.

---

## 3. Injection, XSS, CSRF & SSRF Defense

1. **SQL & NoSQL Injection:**
   - Use parameterized queries / prepared statements / typed ORM builders 100% of the time.
   - Where dynamic SQL identifiers (`ORDER BY`, table/column names) are unavoidable, validate against a strict hardcoded allowlist `Set`—never interpolate user input.
2. **Runtime Boundary Validation:** Validate every `params`, `query`, `body`, `headers`, and webhook payload at the API boundary using a strict schema validator (e.g., Zod, Valibot, Pydantic). Strip or reject unknown fields to prevent Mass Assignment (`isAdmin: true`, `role: "SUPERADMIN"`).
3. **XSS & Template Injection:**
   - Never use `dangerouslySetInnerHTML`, `innerHTML`, or `v-html` on user-controlled or untrusted HTML without a proven sanitizer (e.g., DOMPurify with strict allowlist).
   - Validate all user-supplied URLs to allow only `https:` / `http:` / `mailto:` (block `javascript:` and `data:` schemes).
4. **CORS Strict Allowlisting:**
   - Never combine `Access-Control-Allow-Origin: *` or blindly reflected `Origin` headers with `Access-Control-Allow-Credentials: true`.
   - Maintain an explicit `ALLOWED_ORIGINS` list from environment config.
5. **SSRF & Path Traversal Defense:**
   - For any user-supplied upload/download filename or storage path, reject `..`, null bytes, and absolute paths; resolve and assert the canonical path starts inside the designated storage root.
   - For server-side outbound HTTP fetches of user-supplied URLs, block private/loopback/link-local/metadata IP ranges (`127.0.0.0/8`, `10.0.0.0/8`, `169.254.169.254`, `::1`, `fc00::/7`).
6. **Abuse & Rate Limiting:** Protect authentication (`/login`, `/register`, `/forgot-password`), OTP verification, file uploads, and expensive search/export endpoints with rate limiting and body-size caps.

---

## 4. Destructive Operation & Data-Loss Guards

1. **Never auto-purge on startup or client load:** Application boot, migrations, and page loads must NEVER execute `TRUNCATE`, `DROP`, `DELETE FROM` without a narrow verified key, or wipe user state.
2. **Explicit Confirmation for Irreversible Actions:** Destructive administrative actions (deleting tenants, purging records, resetting ledgers) require:
   - Elevated RBAC role verification server-side
   - Explicit confirmation payload/token
   - Audit trail entry (`actorId`, `action`, `targetId`, `timestamp`, `reason`)
3. **Immutable Financial & Audit Records:** Financial journals, invoices, payments, and compliance logs should use reversal/credit-note workflows or soft-deletes rather than hard `DELETE`.

---

## 5. Security Audit Severity Scale (`05-SECURITY-AUDIT.md`)

| Severity | Definition | Gate Impact |
| :--- | :--- | :--- |
| **P0 — Critical** | Auth bypass, unauthenticated write/admin/storage access, SQLi/RCE, hardcoded secret/backdoor, password hash leak, cross-tenant IDOR, destructive auto-purge. | **HARD BLOCK** — Must fix & re-verify before handover. |
| **P1 — High** | Missing server-side RBAC on sensitive read, mass assignment, reflective CORS + credentials, missing input validation on mutations, stored XSS, path traversal, weak hashing. | **HARD BLOCK** — Must fix & re-verify before handover. |
| **P2 — Medium** | Missing rate limit on auth, overly verbose error messages, missing security headers (`CSP`, `HSTS`, `X-Content-Type-Options`), non-critical dependency advisories. | Fix if low-cost; otherwise document with mitigation plan in `05-SECURITY-AUDIT.md`. |
| **P3 — Low / Hardening** | Defense-in-depth improvements, stricter lint rules, key rotation runbooks. | Document as post-launch hardening recommendation. |

