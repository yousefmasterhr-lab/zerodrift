# 04 — Design System & Interaction Specification

> **Stage 4 Artifact (`zerodrift-design`).** Anti-AI-Slop visual architecture, design tokens, RTL/LTR rules, and full 6-state interactive coverage.

## 1. Visual Direction & Aesthetic Personality

- **Domain Tone:** `{{FILL: e.g., Clinical Calm Precision / Executive Financial Clarity / Modern Retail Energy}}`
- **Theme Support:** `{{FILL: Light-first + Optional Dark Mode | Dark-first}}`
- **Information Density:** `{{FILL: High-clarity operational | Balanced SaaS | Spacious consumer}}`
- **Language & Directionality:** `{{FILL: Arabic (RTL) + English (LTR) with live direction toggle}}`

---

## 2. Design Tokens

### 2.1 Color System (WCAG AA Verified >= 4.5:1 Body Contrast)
| Token | Light Value | Dark Value | Semantic Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg-canvas` | `{{FILL: #F8FAFC}}` | `{{FILL: #0B1120}}` | App page background |
| `--color-bg-surface` | `{{FILL: #FFFFFF}}` | `{{FILL: #111827}}` | Cards, panels, modals |
| `--color-border-subtle` | `{{FILL: #E2E8F0}}` | `{{FILL: #1F2937}}` | Dividers, table lines |
| `--color-text-primary` | `{{FILL: #0F172A}}` | `{{FILL: #F8FAFC}}` | Headings, body text |
| `--color-text-muted` | `{{FILL: #475569}}` | `{{FILL: #94A3B8}}` | Labels, metadata |
| `--color-brand-primary` | `{{FILL: #0F766E}}` | `{{FILL: #14B8A6}}` | Primary CTA, active nav |
| `--color-status-success` | `#15803D` | `#22C55E` | Confirmed / Paid / Active |
| `--color-status-warning` | `#B45309` | `#F59E0B` | Pending / Attention |
| `--color-status-danger` | `#B91C1C` | `#EF4444` | Destructive / Error / Overdue |

### 2.2 Typography & Tabular Numerals
- **Arabic Font Stack:** `{{FILL: "IBM Plex Sans Arabic", "Cairo", sans-serif}}`
- **Latin Font Stack:** `{{FILL: "Inter", "Plus Jakarta Sans", system-ui, sans-serif}}`
- **Monospace / Financial Numerals:** `"JetBrains Mono", "IBM Plex Mono", monospace` + `font-variant-numeric: tabular-nums`
- **Spacing Scale:** `4px` base grid (`4, 8, 12, 16, 20, 24, 32, 40, 48px`)
- **Border Radius:** `sm: 6px`, `md: 10px`, `lg: 14px`, `full: 9999px`

---

## 3. RTL / LTR Mirroring & BiDi Rules

1. **Logical CSS Only:** Strictly enforce `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `start-*`, `end-*`. Zero hardcoded `ml-*`, `mr-*`, `text-left`, `text-right`.
2. **Directional Icons:** Mirror navigation chevrons, back buttons, and drawer animations in RTL; keep search, checkmarks, clocks, and charts unmirrored.
3. **BiDi Isolation:** Wrap phone numbers, emails, SKUs, IBANs, and signed currency codes in `dir="ltr"` with `unicode-bidi: isolate`.

---

## 4. Screen Inventory & Navigation Map

| Screen ID | Route | Allowed Roles | Primary Task | Key Components |
| :--- | :--- | :--- | :--- | :--- |
| `SCR-01` | `/login` | `PUBLIC` | Authenticate safely | Auth form, validation banner, language switch |
| `SCR-02` | `{{FILL: /dashboard}}` | `{{FILL: ALL AUTH}}` | `{{FILL: Daily KPIs & priority actions}}` | `{{FILL: KPI cards, recent table, quick actions}}` |

---

## 5. Mandatory 6-State Coverage Matrix

Every async screen and form MUST implement:
- **Default:** Responsive layout across `>= 1280px` (desktop), `768–1279px` (tablet), and `< 768px` (mobile).
- **Loading:** Layout-matched skeleton placeholders (no spinner-only blank flashes).
- **Empty:** Contextual icon + clear explanation + direct primary creation CTA.
- **Error:** Clear error banner with actionable **Retry** button (never raw JSON or silent freeze).
- **Submitting / Focus:** Disabled button with inline spinner to prevent double-submit; visible `focus-visible` rings; Escape closes modals.
- **Permission / 404:** Graceful `403` and `404` fallback views with safe return link.

