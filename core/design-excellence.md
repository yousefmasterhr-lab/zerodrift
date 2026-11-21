# Core Law 6: Design Excellence & Anti-AI-Slop Standards

> **Prime Directive:** Every user-facing interface built with ZeroDrift must look and feel like it was crafted by a senior product designer for real daily operators—never a generic boilerplate dashboard with muddy colors, cramped tables, broken RTL, or missing states.

---

## 1. Anti-AI-Slop Visual Laws

1. **Intentional Palette & Hierarchy:**
   - Define a cohesive, domain-appropriate token system in `04-DESIGN-SYSTEM.md` (primary brand accent, neutral surface ramp, semantic success/warning/danger/info tokens).
   - Avoid default unstyled browser controls, raw neon gradients on clashing backgrounds, or decorative rainbow badges everywhere. Use color purposefully to signal status, hierarchy, and primary actions.
   - Guarantee **WCAG AA contrast (`>= 4.5:1` for body text, `>= 3:1` for large text and UI controls)** across both Light and Dark themes (if dark mode is enabled).
2. **Disciplined Typography & Rhythm:**
   - Pair intentional fonts suited to the script(s): e.g., `Inter` / `Plus Jakarta Sans` / `IBM Plex Sans` for Latin, paired with `Cairo` / `IBM Plex Sans Arabic` / `Tajawal` for Arabic, and `JetBrains Mono` / `IBM Plex Mono` for tabular numbers, codes, and IDs.
   - Apply `font-variant-numeric: tabular-nums` to all financial amounts, tables, KPIs, timestamps, and counters so digits align vertically.
   - Establish a clear type scale (`xs`, `sm`, `base`, `lg`, `xl`, `2xl`) and strict spacing grid (`4px` / `8px` multiples).
3. **Visual Calm & Density Calibration:**
   - Calibrate information density to the user's domain: high-clarity structured density for ERPs/admin consoles/POS; generous breathing room for consumer/patient/marketing portals.
   - One primary CTA per view or modal; secondary actions visually subordinate; destructive actions clearly separated and visually distinct.

---

## 2. First-Class Bilingual RTL / LTR Parity

Whenever the product supports Arabic (or Hebrew/Persian/Urdu) alongside English—or is Arabic-first:

1. **Logical CSS Properties Only:** Use CSS logical properties and utility equivalents (`margin-inline-start` / `ms-*`, `margin-inline-end` / `me-*`, `padding-inline-start` / `ps-*`, `text-start`, `text-end`, `border-s`, `rounded-s`) instead of hardcoded `left`/`right` utilities (`ml-`, `mr-`, `pl-`, `pr-`, `text-left`).
2. **Directional Semantics:**
   - Set `<html dir="rtl" lang="ar">` or `<html dir="ltr" lang="en">` dynamically at the root.
   - Mirror directional icons (chevrons, back/next arrows, sidebar drawers, breadcrumbs) in RTL, while keeping non-directional icons (checkmarks, clocks, search magnifying glass, charts) unmirrored.
   - Isolate embedded LTR strings inside RTL text (`dir="ltr"` with `unicode-bidi: isolate`) for phone numbers, emails, SKUs, IBANs, URLs, and negative currency amounts.
3. **Zero Hardcoded Mixed Strings:** Externalize UI copy into clean locale dictionaries (`ar` / `en`) or consistent language constants with complete parity—no half-translated menus or broken placeholders.

### 2.1 Natural Business Arabic Law (Anti-Robotic AI Copy)

Never emit stiff, literal, archaic, or AI-translated Arabic in UI buttons, menus, headers, or alerts. Use concise, everyday modern business Arabic that real operators expect:

| Banned Robotic / Heavy Arabic | Required Natural Business Arabic |
| :--- | :--- |
| `سجل التدقيق غير القابل للتعديل` | `سجل الحركات` |
| `حوكمة مسار الاعتماد التشغيلي` | `خطوات الموافقة` |
| `صندوق القرارات التفاعلي` | `الأسئلة والموافقات` |
| `تمكين التحول السلس للبيانات` | `نقل البيانات` |
| `لوحة المؤشرات التحليلية التنفيذية` | `ملخص الأداء` |
| `تأكيد إتمام عملية الحفظ بنجاح` | `تم الحفظ` |
| `إلغاء الإجراء الحالي والعودة` | `إلغاء` |

---

## 3. Anti-Clipped Data Tables Law

Desktop data tables in generated web apps MUST NEVER clip or hide the primary Action column (`التفاصيل` / `Edit` / `Actions`) behind a horizontal scrollbar:
1. **Column Budgeting:** Show only high-signal operator columns by default (`<= 6` core columns); move secondary metadata into a detail drawer or expandable row.
2. **Pinned Sticky Action Column:** Apply `position: sticky; inset-inline-end: 0;` with matching opaque surface background and subtle leading shadow on the trailing Action column so operators can always click primary actions without scrolling right/left.
3. **Responsive Mobile Card View:** Below `720px`, transform multi-column data tables into stacked summary cards (or cleanly contained horizontal scroll with pinned action button).

---

## 4. Mandatory Interactive States (Every Screen & Component)

No screen or async widget is complete until all **6 states** are deliberately designed and implemented:

1. **Default / Populated:** Clear hierarchy, scannable layout, responsive across desktop, tablet, and mobile.
2. **Loading:** Structural skeletons or subtle inline progress indicators matching the layout geometry (preventing jarring layout shift / CLS).
3. **Empty:** Purposeful empty-state illustration/icon, clear explanation, and a direct primary action button to create the first record (never a blank white box).
4. **Error:** Human-readable message explaining what failed and a concrete **Retry** (or recovery) action—never a silent freeze or raw JSON dump.
5. **Interactive Feedback:** Distinct `hover`, `active`, `focus-visible` keyboard ring, and `disabled` styles; optimistic or disabled-while-submitting buttons preventing double-submission.
6. **Permission / Boundary States:** Graceful `403 Forbidden` and `404 Not Found` views with clear navigation back to safe ground.

---

## 4. Accessibility & Ergonomics Baseline

- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<button>`, `<table>` with `<thead>`/`<th>`).
- Every form input has an explicit `<label>` (or `aria-label`), inline validation error tied via `aria-describedby`, and Enter-key submit support.
- Modals and drawers trap focus, close on `Escape`, and restore focus to the triggering element on close.
- Touch targets `>= 40x40px` on mobile; tables scroll horizontally gracefully inside bounded containers without breaking viewport width.

