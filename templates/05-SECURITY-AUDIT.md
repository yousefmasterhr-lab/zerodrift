# 05 — Red-Team Security & Exposure Audit

> **Stage 6B Artifact (`zerodrift-security`).** Gate 6 requires **zero unresolved P0 and P1 findings** before Stage 7 handover. Every finding MUST cite exact `file:line`.

## 1. Audit Metadata

- **Project:** `{{PROJECT_NAME}}`
- **Audit Date:** `{{DATE}}`
- **Scope Audited:** `{{FILL: Backend routes, auth/RBAC middleware, DB queries, frontend bundle, env/CORS/storage config}}`
- **Overall Gate Verdict:** `{{FILL: PASS | FAIL — BLOCKED ON P0/P1}}`

---

## 2. OWASP Top 10 & ZeroDrift Security Baseline Checklist

| # | Control Area | Status (`PASS` \| `FAIL` \| `N/A`) | Verified Evidence (`file:line` or Command) |
| :-: | :--- | :---: | :--- |
| 1 | Deny-by-default authentication on all non-public routes | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 2 | Server-side RBAC & tenant/ownership IDOR protection | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 3 | Password hashing (Argon2id/scrypt/bcrypt) & zero hash/secret leaks | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 4 | Zero hardcoded secrets, backdoors, or dev auth bypasses | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 5 | Parameterized SQL & allowlisted dynamic identifiers (zero SQLi) | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 6 | Strict runtime input validation (Zod) & mass-assignment defense | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 7 | XSS, safe URL schemes & sanitized rich HTML | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 8 | Strict CORS allowlist (never reflective origin + credentials) | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 9 | Path traversal / SSRF defense & auth rate-limiting | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |
| 10 | Destructive action guards & zero auto-purge on startup/load | `{{FILL: PASS/FAIL}}` | `{{FILL: file:line}}` |

---

## 3. Findings Ledger (P0 / P1 / P2 / P3)

| Finding ID | Severity | Title | Exact Evidence (`file:line`) | Attack Vector / Impact | Remediation Applied & Re-Verification | Status (`OPEN` \| `FIXED` \| `ACCEPTED_P2_P3`) |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| `SEC-01` | `{{FILL: P0-P3 or NONE}}` | `{{FILL: Finding summary}}` | `{{FILL: path/file.ts:12}}` | `{{FILL: Concrete exploit path}}` | `{{FILL: Fix + re-test evidence}}` | `{{FILL: FIXED}}` |

---

## 4. Unresolved Risk Sign-Off

- **Unresolved P0 Findings:** `0` *(Must be 0 to pass Gate 6)*
- **Unresolved P1 Findings:** `0` *(Must be 0 to pass Gate 6)*
- **Deferred P2/P3 Hardening Items:** `{{FILL: None or itemized list with post-launch owners}}`

