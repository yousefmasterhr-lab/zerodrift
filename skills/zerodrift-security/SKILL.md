---
name: zerodrift-security
description: Stage 6B Red-Team Security & Exposure Auditor. Conducts an adversarial, evidence-backed code and configuration audit against OWASP Top 10 and ZeroDrift's Security Baseline — inspecting auth/session integrity, server-side RBAC, cross-tenant IDOR, salted password hashing, zero hash/secret leaks, SQL/NoSQL injection, Zod mass-assignment defense, XSS/CSRF/SSRF/path traversal, strict CORS allowlisting, rate limiting, and destructive-op guards — outputting 05-SECURITY-AUDIT.md with P0/P1/P2/P3 severity and exact file:line citations. Use before release or whenever auditing any app for vulnerabilities.
---

# ZeroDrift Security — Red-Team Security & Exposure Auditor (Stage 6B)

## Purpose & Triggers

`zerodrift-security` puts on an attacker's hat to break the application before real users or adversaries do—producing an auditable, file-and-line-cited security report (`.zerodrift/05-SECURITY-AUDIT.md`) and enforcing a **zero unresolved P0/P1** release gate.

**Activate when:**
- Stage 6A (`zerodrift-verify`) has passed and the project is approaching handover.
- Auditing any existing codebase, pull request, API server, auth flow, or deployment config for vulnerabilities.
- Invoked standalone by a user asking for a security audit, penetration review, or OWASP check.

**Template Resolution Order:** `./references/templates/05-SECURITY-AUDIT.md` & `./references/core/security-baseline.md` -> `../../templates/...` -> embedded checklist below.

---

## Core Laws Referenced

- **Zero-Vulnerability Security Baseline (`core/security-baseline.md`):** Full 10-control baseline and P0/P1/P2/P3 severity classification.
- **Anti-Hallucination (`core/anti-hallucination.md`):** Every single finding AND every single `PASS` control MUST cite exact `relative/path:line` evidence actually read during the audit. Zero guessed passes.
- **Challenger Mindset (`core/challenger-mindset.md`):** Assume every client payload, header, cookie, URL parameter, and uploaded filename is attacker-controlled.

---

## Execution Algorithm (Step-by-Step)

### Step 1: Map the Attack Surface
1. Read `.zerodrift/CONTRACTS.md` (if present), the central backend router, auth/session middleware, database access layer, file upload/download handlers, CORS/helmet config, environment loader, and frontend auth/API client.
2. Build a complete **Route-to-Guard Matrix** listing every live HTTP/RPC/WS endpoint and whether it enforces authentication, role checks, ownership checks, and input validation.

### Step 2: Execute the 10-Point Adversarial Audit

Inspect actual code lines for each control:

1. **Authentication & Session Integrity (`A07`):**
   - Are passwords hashed with Argon2id, scrypt, or bcrypt (`cost >= 12`)? Flag plaintext, MD5, bare SHA-256, or hardcoded salts as **P0**.
   - Are JWTs/sessions signed with an env-provided secret (`>= 32` chars) and explicit algorithm (never `alg: none`, never hardcoded fallback like `"dev-secret"` in production)?
   - Are session cookies `HttpOnly`, `Secure` (prod), `SameSite=Lax|Strict`, with bounded expiration?
   - **Backdoor Hunt:** Search for master passwords, bypass headers (`x-admin`, `x-bypass`), unauthenticated `/seed`, `/reset`, `/debug`, or dev-login routes active in production (**P0**).
2. **Server-Side RBAC & Broken Access Control / IDOR (`A01`):**
   - Does every non-`PUBLIC` route enforce authentication + explicit RBAC server-side (never client-only)?
   - For every `:id` read/update/delete endpoint, does the DB query scope by `tenantId` / `organizationId` / `ownerId` (or verified admin role)? If User A can read/mutate User B's record by swapping UUID/ID, flag **P0**.
3. **Sensitive Data & Secret Hygiene (`A02`):**
   - Inspect all user queries and serializers: can `passwordHash`, `salt`, `resetToken`, `mfaSecret`, or internal API keys ever leak in API responses or logs? (**P0**).
   - Search source files and frontend env references (`VITE_*`, `NEXT_PUBLIC_*`) for hardcoded API keys, DB passwords, private keys, or secrets committed to repo (**P0**).
   - Check error handler: are stack traces, raw SQL queries, or internal file paths hidden in production responses?
4. **SQL / NoSQL / Command Injection (`A03`):**
   - Verify 100% parameterized queries / prepared statements / typed ORM builders.
   - Check any dynamic `ORDER BY`, table/column names, `exec`/`spawn` calls, or regexes (ReDoS): verify strict allowlist validation (**P0** if injectable).
5. **Runtime Input Validation & Mass Assignment (`A04`):**
   - Verify every mutation endpoint validates `params`, `query`, and `body` with strict Zod (or equivalent) schemas that strip/reject unknown properties (preventing `{ role: "ADMIN", isVerified: true }` injection) (**P1**).
   - Verify financial totals, prices, discounts, and balances are computed server-side, never trusted from client request bodies (**P0/P1**).
6. **XSS & Unsafe HTML/URL Sinks (`A03`):**
   - Search frontend for `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `document.write`, `v-html`, `eval`, `new Function`, and unsanitized `href={userUrl}` (`javascript:` URI injection) (**P1**).
7. **CORS & Security Headers (`A05`):**
   - Verify CORS uses an explicit `ALLOWED_ORIGINS` allowlist—NEVER `origin: "*"` or blindly reflected `req.headers.origin` combined with `credentials: true` (**P1**).
   - Check standard hardening headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`, `HSTS` in prod).
8. **Path Traversal, File Upload & SSRF (`A01` / `A10`):**
   - Check file upload/download handlers for `..` traversal, missing canonical root-prefix checks, unbounded file sizes, or dangerous executable MIME types (**P0/P1**).
   - Check server-side `fetch()` on user-provided URLs for private/loopback/cloud-metadata IP blocking (`169.254.169.254`, `127.0.0.1`, `10.0.0.0/8`) (**P1**).
9. **Abuse Prevention & Rate Limiting (`A07`):**
   - Check `/login`, `/register`, password reset, OTP, and expensive export endpoints for rate limiting and request body-size limits (**P2**, or **P1** on public credential endpoints without lockout/throttling).
10. **Destructive Operations & Auto-Purge Guards:**
    - Verify startup scripts, migrations, and client loaders NEVER run `DROP`, `TRUNCATE`, or broad `DELETE` automatically (**P0**).
    - Verify administrative destructive actions require elevated RBAC, explicit confirmation, and write an audit log entry.

### Step 3: Author `.zerodrift/05-SECURITY-AUDIT.md`
Document:
- Full 10-control checklist with `PASS` / `FAIL` / `N/A` and exact `file:line` evidence for EVERY row.
- Findings Ledger (`SEC-01`..) with Severity (`P0`–`P3`), exact `file:line`, concrete exploit/attack vector, and required remediation.

### Step 4: Remediate All P0 & P1 Findings & Re-Verify
1. If any **P0** or **P1** finding exists:
   - Fix every P0 and P1 cleanly at the root cause.
   - Add a regression test proving the exploit is now blocked (e.g., cross-tenant IDOR returns `403`/`404`, mass-assignment `role` field is stripped, unauthenticated route returns `401`).
   - Re-run **Stage 6A (`zerodrift-verify`)** so compiler, build, and tests all exit `0` after security edits.
   - Update each finding in `05-SECURITY-AUDIT.md` to `FIXED` with remediation & re-test evidence.
2. Update `.zerodrift/STATE.md` (`Stage 6B: COMPLETED`, `Overall Gate Verdict: PASS`).

---

## Adaptive Intelligence Rules

- **Real Code Evidence Only:** Never fabricate vulnerabilities to look thorough, and never rubber-stamp `PASS` without reading the exact file lines proving the control exists.
- **Dependency Hygiene:** When lockfiles exist and tooling permits, check for known high/critical dependency vulnerabilities (`npm audit --omit=dev` or manifest review) and log actionable advisories as P2 (or P1 if directly exploitable in app code).

---

## Hard Gate / Stop Criteria

- **HARD BLOCK ON P0 & P1:** Stage 6B CANNOT pass and Stage 7 (`zerodrift-handover`) CANNOT start while `Unresolved P0 Findings > 0` OR `Unresolved P1 Findings > 0`.
- **Self-Healing Cap:** If a complex P0/P1 architectural flaw requires a breaking contract or auth redesign that exceeds 3 fix iterations, set `Stage 6B: BLOCKED` in `STATE.md` and escalate with the full attack path and options.

---

## Output Contract

1. `.zerodrift/05-SECURITY-AUDIT.md` — Complete 10-control evidence table, Findings Ledger (`P0`–`P3`) with exact `file:line` citations, remediations, and zero unresolved P0/P1 sign-off.
2. Regression security tests for every remediated P0/P1 issue.
3. Updated `.zerodrift/STATE.md` reflecting Gate 6 pass verdict.

---

## Tool Integrations

- **Codebase Search & Reads:** Targeted searches for auth middleware, SQL builders, CORS config, `dangerouslySetInnerHTML`, `eval`, hardcoded secrets, and destructive SQL statements.
- **Stage 6A Re-Verification Loop:** Always re-run `zerodrift-verify` checks after applying security fixes.
- **`scripts/validate-project.mjs`:** Confirms `05-SECURITY-AUDIT.md` passes Gate 6 requirements (`0` unresolved P0/P1) and enforces `core/data-safety.md` + deterministic **Hardcoded Secret**, **`.env.example` Parity**, and **UTF-8 Mojibake** scans (zero auto-destructive boot purges, zero fake HTTP 200 fallbacks, strict dev/test vs. prod seed isolation).
- **Living Memory, Concise Chat & Studio Sync (`core/memory-and-regression.md`, `core/concise-chat.md`):** Write `05-SECURITY-AUDIT.md` strictly in crisp English, log every remediated P0/P1 vulnerability into `.zerodrift/memory/REGRESSION-LEDGER.json` with its regression test reference, run `scripts/build-studio.mjs --project .`, and summarize the audit verdict in <= 8 chat lines pointing to Studio's Security Audit Dashboard.

