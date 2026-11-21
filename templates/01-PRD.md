# 01 — Product Requirements Document (PRD)

> **Stage 1B Artifact (`zerodrift-intake`).** Gate 1 requires human sign-off on this specification before deep architecture or implementation begins.

## 1. Executive Summary

- **Product Name:** `{{PROJECT_NAME}}`
- **Problem Statement:** `{{FILL: Clear 2–3 sentence problem definition}}`
- **Target Audience & Deployment Context:** `{{FILL: Who uses it, where, and on what devices}}`
- **Success Metrics (Measurable Outcomes):**
  1. `{{FILL: Quantifiable metric 1}}`
  2. `{{FILL: Quantifiable metric 2}}`

---

## 2. User Roles & Permissions Matrix (RBAC Seed)

| Role | Description | Core Permissions | Explicitly Denied Actions |
| :--- | :--- | :--- | :--- |
| `ADMIN` | `{{FILL: System owner/administrator}}` | `{{FILL: Full tenant config, user management}}` | `{{FILL: Hard-deleting posted financial/audit logs}}` |
| `OPERATOR` | `{{FILL: Daily staff role}}` | `{{FILL: CRUD on assigned operational records}}` | `{{FILL: Role escalation, system settings, bulk purge}}` |
| `VIEWER` | `{{FILL: Read-only stakeholder/auditor}}` | `{{FILL: Read dashboards & export authorized reports}}` | `{{FILL: All state mutations}}` |

---

## 3. Functional Modules & User Stories

### Module M1: `{{FILL: Module Name}}`
- **Objective:** `{{FILL: Business goal of this module}}`
- **Primary Workflows:**
  1. `{{FILL: Step-by-step operator workflow}}`
- **Acceptance Criteria:**
  - [ ] `{{FILL: Concrete, testable behavior 1}}`
  - [ ] `{{FILL: Concrete, testable behavior 2}}`
- **Critical Edge Cases & Business Rules:**
  - `{{FILL: Edge case and exact expected system response}}`

---

## 4. Non-Functional Requirements (NFRs)

| Category | Requirement | Verification Method |
| :--- | :--- | :--- |
| **Security** | Deny-by-default auth, server-side RBAC, Zod validation, salted password hashing, zero secret leaks | `zerodrift-security` audit |
| **Localization & Direction** | `{{FILL: e.g., Arabic RTL + English LTR toggle, logical CSS}}` | Visual & RTL layout inspection |
| **Performance** | `{{FILL: e.g., P95 API response < 250ms, paginated tables <= 50 rows/page}}` | Runtime profiling / query review |
| **Reliability & Integrity** | Atomic DB transactions for multi-table writes; idempotent mutations | Integration tests |
| **Accessibility** | WCAG AA contrast, keyboard navigation, semantic forms | `zerodrift-design` & browser check |

---

## 5. External Integrations & Compliance Scope

- **Regulatory / Industry Standards to Verify in Stage 2A:**
  - `{{FILL: e.g., IFRS double-entry accounting, Egyptian ETA e-invoicing, HIPAA, GDPR, PCI-DSS, or None}}`
- **Third-Party Integrations:**
  - `{{FILL: e.g., Stripe, WhatsApp Business API, SMTP, S3/GCS, or None}}`

---

## 6. Gate 1 Approval Record

- **Clarity Score Achieved:** `{{FILL: >= 90%}}`
- **Approved By:** `{{FILL: User / Stakeholder}}`
- **Approval Date:** `{{DATE}}`

