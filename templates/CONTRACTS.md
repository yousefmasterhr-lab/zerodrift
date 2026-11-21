# CONTRACTS — Single Source of Truth Registry

> **Stage 3B Artifact (`zerodrift-architect`).** INVIOLABLE CONTRACT REGISTRY. Every backend route, frontend API call, Zod schema, database table, and environment variable MUST match this document 1:1. Any change during build requires an explicit **Contract Amendment** entry below before modifying code.

---

## 1. Environment Variables Contract

| Variable | Scope (`SERVER` \| `CLIENT`) | Required | Format / Validation Rule | Purpose |
| :--- | :---: | :---: | :--- | :--- |
| `NODE_ENV` | `SERVER` | Yes | `development \| test \| production` | Runtime mode |
| `PORT` | `SERVER` | Yes | Integer `1024..65535` | Single backend listen port |
| `DATABASE_URL` | `SERVER` | Yes | Valid connection URI | Primary database connection |
| `AUTH_SECRET` | `SERVER` | Yes | `>= 32` random chars | Session / JWT signing secret |
| `ALLOWED_ORIGINS` | `SERVER` | Yes | Comma-separated origins | Strict CORS allowlist |

---

## 2. HTTP API Route Registry

**Default Security Policy:** DENY-BY-DEFAULT. Only routes explicitly marked `PUBLIC` are accessible without a verified session.

| Route ID | Method | Path | Auth & RBAC | Request Schema (Params / Query / Body) | Success Response (`2xx`) | Error Codes |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `API-001` | `GET` | `/api/health` | `PUBLIC` | None | `200 { status: "ok", timestamp }` | `503` |
| `API-002` | `POST` | `/api/auth/login` | `PUBLIC` *(rate-limited)* | `{ email: string.email, password: string.min(8) }` | `200 { user: UserPublicDTO }` + `HttpOnly` cookie | `400`, `401`, `429` |
| `API-003` | `POST` | `/api/auth/logout` | `AUTHENTICATED` | None | `204 No Content` | `401` |
| `API-004` | `GET` | `/api/auth/me` | `AUTHENTICATED` | None | `200 { user: UserPublicDTO }` | `401` |
| `API-005` | `{{FILL: METHOD}}` | `{{FILL: /api/v1/resource}}` | `{{FILL: ROLE(S)}}` | `{{FILL: Exact Zod schema}}` | `{{FILL: Exact DTO}}` | `400`, `401`, `403`, `404` |

---

## 3. Shared Data Transfer Objects (DTOs & Schemas)

```ts
// Canonical DTO shapes — zero passwordHash, salt, or internal secrets permitted
export interface UserPublicDTO {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "OPERATOR" | "VIEWER";
  createdAt: string; // ISO-8601 UTC
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    requestId: string;
  };
}
```

*(Add all domain Zod schemas and DTO definitions below before Stage 5 begins.)*

`{{FILL: Domain DTOs and Zod schema specifications}}`

---

## 4. Database Schema, Constraints & Indexes

| Table | Primary Key | Required Columns & Types | Unique / Check / FK Constraints | Performance Indexes |
| :--- | :--- | :--- | :--- | :--- |
| `users` | `id (UUID)` | `email TEXT NOT NULL`, `password_hash TEXT NOT NULL`, `name TEXT NOT NULL`, `role TEXT NOT NULL`, `created_at TIMESTAMPTZ NOT NULL` | `UNIQUE(email)`, `CHECK(role IN (...))` | `idx_users_email` |
| `audit_logs` | `id (UUID)` | `actor_id UUID`, `action TEXT NOT NULL`, `resource_type TEXT NOT NULL`, `resource_id TEXT`, `metadata JSONB`, `created_at TIMESTAMPTZ NOT NULL` | `FK(actor_id -> users.id)` | `idx_audit_created_at`, `idx_audit_resource` |
| `{{FILL: table_name}}` | `{{FILL: id}}` | `{{FILL: columns}}` | `{{FILL: constraints}}` | `{{FILL: indexes}}` |

---

## 5. Contract Amendments Log

*(Empty at Gate 3 lock. Any mid-build contract change MUST be logged here before editing backend or frontend code.)*

| Date | Amendment ID | Route / Table / Schema Changed | Reason | Producer & Consumer Synced? |
| :--- | :---: | :--- | :--- | :---: |
| `{{DATE}}` | `INIT` | Initial contract lock | Stage 3 Gate approval | `N/A` |

