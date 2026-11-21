#!/usr/bin/env node
/**
 * ZeroDrift v4.0 Interactive GitHub Pages Demo Generator
 * Builds a fictional bilingual dataset ("NexusCare ERP & Clinic Operations")
 * demonstrating the SVG CodeMap canvas, 3-layout UI/UX and 5-font-pairing showcase,
 * bilingual Arabic/English Studio, human-readable decision history, and verification checks.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPortableHtmlFromData } from './build-studio.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

export async function buildDemoDataset(repoRoot = REPO_ROOT) {
  const showcaseRaw = JSON.parse(
    await fs.readFile(path.join(repoRoot, 'templates', 'DESIGN-SHOWCASE.json'), 'utf8')
  );
  showcaseRaw.projectName = 'NexusCare ERP & Clinic Operations';
  showcaseRaw.updatedAt = '2026-11-21';

  return {
    schemaVersion: '4.0.0',
    demoMode: true,
    defaultLocale: 'en',
    generatedAt: '2026-11-21T10:30:00.000Z',
    project: {
      name: { en: 'NexusCare ERP & Clinic Operations', ar: 'نظام NexusCare لإدارة العيادات والمالية' },
      mode: 'greenfield',
      stack: 'TypeScript 5.8 · Node 22 · PostgreSQL 17 · React 19 · Zod',
      path: '/workspaces/nexuscare-erp',
    },
    pipeline: {
      currentStage: { en: 'STAGE 5 — Vertical Slice Build (78%)', ar: 'المرحلة 5 — بناء الشرائح (78%)' },
      activeSlice: 'S-06',
      nextAction: {
        en: 'Complete Slice S-06 (Insurance Claims Reconciliation + Unit Tests) then run Stage 6A Verification.',
        ar: 'إكمال الشريحة S-06 (تسوية مطالبات التأمين + اختبارات الوحدة) ثم تشغيل التحقق الشامل.',
      },
      clarityScore: '96%',
      stages: [
        { code: 'Stage 0', label: { en: 'Bootstrap & Memory', ar: 'التهيئة والذاكرة' }, status: 'COMPLETED', date: '2026-11-15' },
        { code: 'Stage 1', label: { en: 'Intake & PRD', ar: 'جمع المتطلبات' }, status: 'APPROVED', date: '2026-11-15' },
        { code: 'Stage 2A', label: { en: 'Domain Research', ar: 'بحث المعايير' }, status: 'COMPLETED', date: '2026-11-16' },
        { code: 'Stage 2B', label: { en: 'Reverse Analysis', ar: 'تحليل النظام القديم' }, status: 'COMPLETED', date: '2026-11-16' },
        { code: 'Stage 3', label: { en: 'Architecture & Contracts', ar: 'المعمارية والعقود' }, status: 'APPROVED', date: '2026-11-17' },
        { code: 'Stage 4', label: { en: 'UI Showcase & Tokens', ar: 'معرض التصميم والألوان' }, status: 'APPROVED', date: '2026-11-17' },
        { code: 'Stage 5', label: { en: 'Vertical Slice Build', ar: 'بناء الشرائح الرأسية' }, status: 'IN_PROGRESS', date: '2026-11-21' },
        { code: 'Stage 6A', label: { en: 'Zero-Error Verify', ar: 'التحقق والربط' }, status: 'PENDING', date: '-' },
        { code: 'Stage 6B', label: { en: 'Security Audit', ar: 'التدقيق الأمني' }, status: 'PENDING', date: '-' },
        { code: 'Stage 7', label: { en: 'Handover Pack', ar: 'تقرير التسليم' }, status: 'PENDING', date: '-' },
      ],
      slices: [
        { id: 'S-01', name: { en: 'Foundation, PostgreSQL Schema, Argon2id Auth & RBAC', ar: 'البنية الأساسية، قاعدة البيانات، المصادقة والصلاحيات' }, status: 'VERIFIED', verification: 'tsc + 18 auth tests (exit 0)', updated: '2026-11-17' },
        { id: 'S-02', name: { en: 'Patient Registry, Medical Profiles & Tenant Scoping', ar: 'سجل المرضى والملفات الطبية وعزل الفروع' }, status: 'VERIFIED', verification: 'tsc + 14 IDOR tests (exit 0)', updated: '2026-11-18' },
        { id: 'S-03', name: { en: 'Doctor Scheduling & Conflict-Free Slot Locking', ar: 'جدول الأطباء وحجز المواعيد بدون تضارب' }, status: 'VERIFIED', verification: 'tsc + concurrency tests (exit 0)', updated: '2026-11-18' },
        { id: 'S-04', name: { en: 'Double-Entry Clinic Billing, Invoices & Minor-Unit Ledger', ar: 'فواتير العيادات والقيد المزدوج بدون كسور عشرية' }, status: 'VERIFIED', verification: 'tsc + 22 ledger tests (exit 0)', updated: '2026-11-19' },
        { id: 'S-05', name: { en: 'Pharmacy Inventory & Atomic Stock Movements', ar: 'مخزون الصيدلية وحركات الصرف الذرية' }, status: 'VERIFIED', verification: 'tsc + stock lock tests (exit 0)', updated: '2026-11-20' },
        { id: 'S-06', name: { en: 'Insurance Claims Reconciliation & Bilingual PDF Receipts', ar: 'تسوية مطالبات التأمين وإيصالات PDF ثنائية اللغة' }, status: 'IN_PROGRESS', verification: 'In progress (CR-002 synced)', updated: '2026-11-21' },
      ],
    },
    verification: {
      scorecard: [
        { label: { en: 'Typecheck (tsc)', ar: 'فحص الأنواع (tsc)' }, status: 'PASS', detail: '0 errors · strict mode' },
        { label: { en: 'Production Build', ar: 'بناء الإنتاج' }, status: 'PASS', detail: 'Vite + ESM bundle clean' },
        { label: { en: 'CodeMap Wiring', ar: 'خريطة الربط CodeMap' }, status: 'PASS', detail: '11 nodes · 0 broken · 0 cycles' },
        { label: { en: 'Security Audit', ar: 'التدقيق الأمني' }, status: 'PASS', detail: 'P0: 0 | P1: 0' },
        { label: { en: 'Token Drift Guard', ar: 'فحص انحراف الألوان' }, status: 'PASS', detail: '48 UI files clean' },
        { label: { en: 'UTF-8 Mojibake', ar: 'سلامة الترميز العربي' }, status: 'PASS', detail: '64 files clean' },
        { label: { en: '.env Parity', ar: 'تطابق متغيرات البيئة' }, status: 'PASS', detail: '9/9 vars documented' },
        { label: { en: 'Secret Scanner', ar: 'كشف الأسرار' }, status: 'PASS', detail: '0 hardcoded secrets' },
      ],
    },
    inbox: {
      schemaVersion: '4.0.0',
      batches: [
        {
          batchId: 'BATCH-CR-002',
          title: {
            en: 'Change Request (CR-002): Insurance Co-Pay & Export Preferences',
            ar: 'طلب تعديل (CR-002): نسبة تحمل التأمين وصيغ التصدير',
          },
          summary: {
            en: 'Pick your preferred options below and click Submit to see how ZeroDrift records clean human-readable answers for your AI agent.',
            ar: 'اختر التفضيلات المناسبة واضغط حفظ لمعاينة ملخص الإجابات الجاهز للوكيل.',
          },
          gate: { en: 'CR-002 Change Impact Approval', ar: 'الموافقة على التعديل CR-002' },
          status: 'PENDING',
          questions: [
            {
              id: 'copayRoundingPolicy',
              type: 'single-choice',
              prompt: {
                en: 'How should patient vs. insurer co-pay splits round odd minor units?',
                ar: 'كيف يتم تقريب الكسور الفردية بين حصة المريض وشركة التأمين؟',
              },
              context: {
                en: 'Applies to src/modules/billing/ledger.service.ts and API-014.',
                ar: 'يؤثر على حساب الفواتير في وحدة المالية (API-014).',
              },
              default: 'bankers-half-even',
              options: [
                {
                  value: 'bankers-half-even',
                  label: { en: 'Half-Even Rounding (IFRS Standard)', ar: 'التقريب المصرفي المتوازن (IFRS)' },
                  description: {
                    en: 'Zero cumulative rounding bias across high-volume monthly claims.',
                    ar: 'يمنع تراكم فروق القروش في التسويات الشهرية الكبيرة.',
                  },
                  recommended: true,
                },
                {
                  value: 'patient-favor',
                  label: { en: 'Round Down Patient Share', ar: 'التقريب لصالح المريض' },
                  description: {
                    en: 'Insurer absorbs any 0.01 remainder automatically.',
                    ar: 'تتحمل شركة التأمين أي فرق قرش تلقائياً.',
                  },
                },
              ],
            },
            {
              id: 'exportFormats',
              type: 'multi-select',
              prompt: {
                en: 'Select authorized statement export formats for S-06:',
                ar: 'اختر صيغ تصدير كشوفات الحساب المطلوبة في الشريحة S-06:',
              },
              default: ['pdf-bilingual', 'csv-utf8-bom'],
              options: [
                { value: 'pdf-bilingual', label: { en: 'Bilingual PDF (AR/EN)', ar: 'ملف PDF عربي/إنجليزي' } },
                { value: 'csv-utf8-bom', label: { en: 'UTF-8 BOM CSV (Excel Safe)', ar: 'ملف CSV متوافق مع إكسل العربي' } },
                { value: 'json-audit', label: { en: 'Signed JSON Audit Pack', ar: 'ملف JSON موثّق للمراجعة' } },
              ],
            },
            {
              id: 'operatorNote',
              type: 'text',
              prompt: {
                en: 'Optional note for the AI engineer:',
                ar: 'ملاحظة إضافية للوكيل (اختياري):',
              },
              placeholder: {
                en: 'e.g., Ensure receptionists cannot view insurer payout margins...',
                ar: 'مثال: إخفاء هامش شركة التأمين عن موظف الاستقبال...',
              },
            },
          ],
        },
      ],
    },
    outbox: {
      schemaVersion: '4.0.0',
      submissions: [
        {
          batchId: 'BATCH-GATE-3',
          gateDecision: 'APPROVE',
          answers: {
            architectureTopology: 'Modular Monolith + PostgreSQL 17',
            moneyStorage: 'BIGINT Minor Units (Zero Float)',
            rtlSupport: 'Full Arabic RTL + Logical CSS',
          },
          lockAsRules: true,
          submittedAt: '2026-11-17T11:20:00.000Z',
        },
      ],
    },
    wiring: {
      hasFloorplan: false,
      archifyPlates: [],
      codemap: {
        schemaVersion: '4.0.0',
        generatedAt: '2026-11-21T10:30:00.000Z',
        summary: {
          totalNodes: 11,
          totalEdges: 12,
          circularCount: 0,
          orphanFileCount: 0,
          layerViolationCount: 0,
          matchedWireCount: 3,
          brokenWireCount: 0,
          orphanRouteCount: 0,
          unauthenticatedRouteCount: 0,
        },
        nodes: [
          { id: 'src/client/pages/ScheduleBoard.tsx', label: 'ScheduleBoard.tsx', layer: 'ui', inboundCount: 0, outboundCount: 1 },
          { id: 'src/client/pages/InvoiceDesk.tsx', label: 'InvoiceDesk.tsx', layer: 'ui', inboundCount: 0, outboundCount: 1 },
          { id: 'src/client/pages/PharmacyQueue.tsx', label: 'PharmacyQueue.tsx', layer: 'ui', inboundCount: 0, outboundCount: 1 },
          { id: 'src/client/api/apiClient.ts', label: 'apiClient.ts', layer: 'api-client', inboundCount: 3, outboundCount: 3 },
          { id: 'src/routes/appointments.routes.ts', label: 'appointments.routes.ts', layer: 'routes', inboundCount: 1, outboundCount: 1 },
          { id: 'src/routes/invoices.routes.ts', label: 'invoices.routes.ts', layer: 'routes', inboundCount: 1, outboundCount: 1 },
          { id: 'src/routes/pharmacy.routes.ts', label: 'pharmacy.routes.ts', layer: 'routes', inboundCount: 1, outboundCount: 1 },
          { id: 'src/services/booking.service.ts', label: 'booking.service.ts', layer: 'services', inboundCount: 1, outboundCount: 1 },
          { id: 'src/services/ledger.service.ts', label: 'ledger.service.ts', layer: 'services', inboundCount: 1, outboundCount: 1 },
          { id: 'src/db/appointments.repository.ts', label: 'appointments.repo.ts', layer: 'database', inboundCount: 1, outboundCount: 0 },
          { id: 'src/db/ledger.repository.ts', label: 'ledger.repo.ts', layer: 'database', inboundCount: 2, outboundCount: 0 },
        ],
        edges: [
          { from: 'src/client/pages/ScheduleBoard.tsx', to: 'src/client/api/apiClient.ts', kind: 'import' },
          { from: 'src/client/pages/InvoiceDesk.tsx', to: 'src/client/api/apiClient.ts', kind: 'import' },
          { from: 'src/client/pages/PharmacyQueue.tsx', to: 'src/client/api/apiClient.ts', kind: 'import' },
          { from: 'src/client/api/apiClient.ts', to: 'src/routes/appointments.routes.ts', kind: 'http', label: 'POST /api/v1/appointments', status: 'ok' },
          { from: 'src/client/api/apiClient.ts', to: 'src/routes/invoices.routes.ts', kind: 'http', label: 'POST /api/v1/invoices', status: 'ok' },
          { from: 'src/client/api/apiClient.ts', to: 'src/routes/pharmacy.routes.ts', kind: 'http', label: 'POST /api/v1/pharmacy/dispense', status: 'ok' },
          { from: 'src/routes/appointments.routes.ts', to: 'src/services/booking.service.ts', kind: 'import' },
          { from: 'src/routes/invoices.routes.ts', to: 'src/services/ledger.service.ts', kind: 'import' },
          { from: 'src/routes/pharmacy.routes.ts', to: 'src/db/ledger.repository.ts', kind: 'import' },
          { from: 'src/services/booking.service.ts', to: 'src/db/appointments.repository.ts', kind: 'import' },
          { from: 'src/services/ledger.service.ts', to: 'src/db/ledger.repository.ts', kind: 'import' },
        ],
        diagnostics: {
          circularDependencies: [],
          orphanFiles: [],
          layerViolations: [],
          brokenWires: [],
          orphanRoutes: [],
          unauthenticatedRoutes: [],
        },
      },
      routes: [
        { id: 'API-001', method: 'GET', path: '/api/health', auth: 'PUBLIC', request: 'None', response: '200 { status: "ok", db: "up" }', errors: '503' },
        { id: 'API-002', method: 'POST', path: '/api/auth/login', auth: 'PUBLIC (rate-limited)', request: 'LoginSchema { email, password }', response: '200 { user: UserPublicDTO } + HttpOnly cookie', errors: '400, 401, 429' },
        { id: 'API-005', method: 'POST', path: '/api/v1/appointments', auth: 'ADMIN, RECEPTION, DOCTOR', request: 'CreateAppointmentSchema', response: '201 { appointment: AppointmentDTO }', errors: '400, 401, 403, 409' },
        { id: 'API-011', method: 'POST', path: '/api/v1/invoices', auth: 'ADMIN, CASHIER', request: 'CreateInvoiceSchema { idempotencyKey, lines[] }', response: '201 { invoice, journalEntryId }', errors: '400, 401, 403, 409' },
        { id: 'API-014', method: 'POST', path: '/api/v1/invoices/:id/reverse', auth: 'ADMIN, ACCOUNTANT', request: 'ReverseInvoiceSchema { reason }', response: '201 { reversalVoucherId }', errors: '400, 401, 403, 404' },
        { id: 'API-018', method: 'POST', path: '/api/v1/pharmacy/dispense', auth: 'ADMIN, PHARMACIST', request: 'DispenseSchema { prescriptionId, items[] }', response: '201 { movementIds[] }', errors: '400, 401, 403, 409' },
      ],
      tables: [
        { table: 'users', pk: 'id (UUID)', columns: 'tenant_id, email, password_hash, role, active', constraints: 'UNIQUE(tenant_id, email)', indexes: 'idx_users_tenant_email' },
        { table: 'appointments', pk: 'id (UUID)', columns: 'tenant_id, doctor_id, patient_id, slot_start_utc, status', constraints: 'UNIQUE(doctor_id, slot_start_utc) WHERE status != CANCELLED', indexes: 'idx_appt_doctor_slot' },
        { table: 'journal_entries', pk: 'id (UUID)', columns: 'tenant_id, ref_type, ref_id, posted_at, reversed_by_id', constraints: 'CHECK(balanced_debits_credits)', indexes: 'idx_journal_tenant_posted' },
        { table: 'stock_movements', pk: 'id (UUID)', columns: 'tenant_id, sku_id, delta_qty, unit_cost_minor, created_at', constraints: 'CHECK(delta_qty != 0)', indexes: 'idx_stock_sku_created' },
      ],
      tree: {
        root: 'nexuscare-erp',
        fileCount: 18,
        children: [
          {
            name: '.zerodrift',
            path: '.zerodrift',
            type: 'dir',
            children: [
              { name: 'STATE.md', path: '.zerodrift/STATE.md', type: 'file', badge: 'Contract' },
              { name: 'CONTRACTS.md', path: '.zerodrift/CONTRACTS.md', type: 'file', badge: 'Contract' },
              { name: 'codemap.json', path: '.zerodrift/codemap.json', type: 'file', badge: 'Contract' },
              { name: 'DESIGN-SHOWCASE.json', path: '.zerodrift/DESIGN-SHOWCASE.json', type: 'file', badge: 'Contract' },
            ],
          },
          {
            name: 'src',
            path: 'src',
            type: 'dir',
            children: [
              {
                name: 'client',
                path: 'src/client',
                type: 'dir',
                children: [
                  { name: 'pages/ScheduleBoard.tsx', path: 'src/client/pages/ScheduleBoard.tsx', type: 'file', badge: 'Frontend' },
                  { name: 'pages/InvoiceDesk.tsx', path: 'src/client/pages/InvoiceDesk.tsx', type: 'file', badge: 'Frontend' },
                  { name: 'pages/PharmacyQueue.tsx', path: 'src/client/pages/PharmacyQueue.tsx', type: 'file', badge: 'Frontend' },
                  { name: 'api/apiClient.ts', path: 'src/client/api/apiClient.ts', type: 'file', badge: 'Frontend' },
                ],
              },
              {
                name: 'routes',
                path: 'src/routes',
                type: 'dir',
                children: [
                  { name: 'appointments.routes.ts', path: 'src/routes/appointments.routes.ts', type: 'file', badge: 'Backend' },
                  { name: 'invoices.routes.ts', path: 'src/routes/invoices.routes.ts', type: 'file', badge: 'Backend' },
                  { name: 'pharmacy.routes.ts', path: 'src/routes/pharmacy.routes.ts', type: 'file', badge: 'Backend' },
                ],
              },
              {
                name: 'services',
                path: 'src/services',
                type: 'dir',
                children: [
                  { name: 'booking.service.ts', path: 'src/services/booking.service.ts', type: 'file', badge: 'Backend' },
                  { name: 'ledger.service.ts', path: 'src/services/ledger.service.ts', type: 'file', badge: 'Backend' },
                ],
              },
              {
                name: 'db',
                path: 'src/db',
                type: 'dir',
                children: [
                  { name: 'appointments.repository.ts', path: 'src/db/appointments.repository.ts', type: 'file', badge: 'DB' },
                  { name: 'ledger.repository.ts', path: 'src/db/ledger.repository.ts', type: 'file', badge: 'DB' },
                ],
              },
            ],
          },
          {
            name: 'tests',
            path: 'tests',
            type: 'dir',
            children: [
              { name: 'auth-rbac.test.ts', path: 'tests/auth-rbac.test.ts', type: 'file', badge: 'Test' },
              { name: 'ledger-invariants.test.ts', path: 'tests/ledger-invariants.test.ts', type: 'file', badge: 'Test' },
            ],
          },
          { name: '.env.example', path: '.env.example', type: 'file', badge: 'Config' },
        ],
      },
    },
    design: {
      showcase: showcaseRaw,
      tokens: {
        themeName: 'Warm Ivory & Royal Olive (Locked)',
        strictPaletteOnly: true,
        palette: {
          canvas: '#FBF9F5',
          surface: '#F3EFE6',
          surfaceElevated: '#FAF7F0',
          borderSubtle: '#E5DFD3',
          inkPrimary: '#1C241E',
          inkMuted: '#556058',
          brandPrimary: '#243324',
          brandAccent: '#10B981',
          statusSuccess: '#115E3B',
          statusWarning: '#8C410A',
          statusDanger: '#991B1B',
        },
        forbiddenColors: ['#FFFFFF', '#000000'],
        typography: {
          latinFont: 'Plus Jakarta Sans, system-ui, sans-serif',
          arabicFont: 'IBM Plex Sans Arabic, Cairo, sans-serif',
          monoFont: 'JetBrains Mono, ui-monospace, monospace',
          tabularNumerals: true,
        },
        directionality: { supportsRtl: true, logicalCssOnly: true },
      },
      copyStyle: {
        tone: { voice: 'Concise, direct, natural business copy (zero robotic AI Arabic)' },
        locales: { primary: 'en', supported: ['en', 'ar'], numeralStyle: 'western-0-9' },
      },
      driftViolations: [],
    },
    memory: {
      lockedRules: [
        { id: 'RULE-001', category: 'Language', rule: 'Author all internal .zerodrift/ files, memory ledgers, contracts, and code strictly in English; translate in user-facing UI/chat only.', status: 'ACTIVE' },
        { id: 'RULE-002', category: 'Data Safety', rule: 'Store all invoice, co-pay, and journal monetary figures in BIGINT minor units; never use floating-point math.', status: 'ACTIVE' },
        { id: 'RULE-003', category: 'Security', rule: 'Scope every single-record patient and invoice query by authenticated tenant_id to prevent cross-clinic IDOR.', status: 'ACTIVE' },
        { id: 'RULE-004', category: 'Design Lock', rule: 'Never use stark #FFFFFF or #000000; pin trailing table Action columns sticky so actions never clip.', status: 'ACTIVE' },
        { id: 'RULE-005', category: 'Change Control', rule: 'Log every mid-build scope change in CHANGE-REQUEST.md and update CONTRACTS.md BEFORE touching source code.', status: 'ACTIVE' },
      ],
      regressions: [
        {
          id: 'BUG-001',
          date: '2026-11-18',
          severity: 'P1',
          symptom: 'Two receptionists could book the exact same 10:30 AM doctor slot simultaneously',
          rootCause: 'Application-level SELECT check before INSERT allowed a 12ms race window',
          filesTouched: ['src/services/booking.service.ts', 'migrations/003_appointments.sql'],
          fixSummary: 'Added partial UNIQUE(doctor_id, slot_start_utc) WHERE status != CANCELLED + 409 Conflict mapping',
          invariantToProtect: 'At most one non-cancelled appointment can exist per (doctor_id, slot_start_utc)',
          regressionTestRef: 'tests/slot-concurrency.test.ts#L28',
          recurrenceCount: 0,
        },
        {
          id: 'BUG-002',
          date: '2026-11-19',
          severity: 'P1',
          symptom: 'Partial stock dispense succeeded even when 1 of 3 prescribed items lacked stock',
          rootCause: 'Repository looped over line items outside a single DB transaction',
          filesTouched: ['src/db/ledger.repository.ts'],
          fixSummary: 'Wrapped entire prescription dispense in SERIALIZABLE transaction with SELECT FOR UPDATE row locks',
          invariantToProtect: 'Multi-item prescription dispense MUST commit atomically or roll back completely on shortage',
          regressionTestRef: 'tests/stock-atomicity.test.ts#L51',
          recurrenceCount: 0,
        },
      ],
      checkpoints: [
        {
          id: 'CP-001',
          timestamp: '2026-11-17T09:15:00.000Z',
          label: 'pre-S-01-foundation-auth',
          gitTag: 'zd-cp-20261117091500-pre-s-01',
          dirtyFilesCount: 0,
          rollbackCommand: 'git stash push -u -m "pre-rollback-CP-001" && git checkout -b restore-cp-001 zd-cp-20261117091500-pre-s-01',
        },
        {
          id: 'CP-002',
          timestamp: '2026-11-18T14:40:00.000Z',
          label: 'pre-S-04-double-entry-billing',
          gitTag: 'zd-cp-20261118144000-pre-s-04',
          dirtyFilesCount: 0,
          rollbackCommand: 'git stash push -u -m "pre-rollback-CP-002" && git checkout -b restore-cp-002 zd-cp-20261118144000-pre-s-04',
        },
        {
          id: 'CP-003',
          timestamp: '2026-11-21T09:10:00.000Z',
          label: 'pre-CR-002-insurance-copay',
          gitTag: 'zd-cp-20261121091000-pre-cr-002',
          dirtyFilesCount: 1,
          rollbackCommand: 'git stash push -u -m "pre-rollback-CP-003" && git checkout -b restore-cp-003 zd-cp-20261121091000-pre-cr-002',
        },
      ],
      learnedSkills: [
        {
          fileName: 'postgres-advisory-slot-locking.md',
          domain: 'scheduling',
          content: '### Verified Pattern\nAlways enforce scheduling exclusivity with a PostgreSQL partial unique index (`WHERE status != \'CANCELLED\'`) and map error code `23505` directly to HTTP `409 Conflict`.\n\n### Pitfall Avoided\nNever rely on application-side `SELECT COUNT(*)` checks before `INSERT` under concurrent receptionists.',
        },
        {
          fileName: 'immutable-reversal-ledger.md',
          domain: 'accounting',
          content: '### Verified Pattern\nPosted invoices and journal entries are immutable. Corrections create a linked counter-entry (`reversed_by_id`) inside one atomic transaction verifying `SUM(debit_minor) === SUM(credit_minor)`.\n\n### Pitfall Avoided\nNever execute `DELETE` on posted accounting rows.',
        },
      ],
    },
    handoff: {
      lineCount: 44,
      resumePrompt: 'Resume ZeroDrift project "NexusCare ERP & Clinic Operations" cleanly: read .zerodrift/HANDOFF.md, .zerodrift/STATE.md, .zerodrift/CONTRACTS.md, and .zerodrift/memory/LOCKED-RULES.md, then execute Slice S-06 (Insurance Claims Reconciliation + Unit Tests) with full Pre-Edit Ripple Checks and zero regressions.',
    },
    hub: {
      sources: [
        { ref: 'STD-01', standard: 'IFRS Double-Entry Accounting Invariants', source: 'https://www.ifrs.org/issued-standards/', version: '2026', rule: 'Posted journals MUST balance (debits == credits) and remain immutable; corrections use reversal vouchers.', modules: 'billing', status: 'VERIFIED' },
        { ref: 'STD-02', standard: 'OWASP ASVS v4.0.3 (Access Control & Crypto)', source: 'https://owasp.org/www-project-application-security-verification-standard/', version: '4.0.3', rule: 'Deny-by-default server-side RBAC, Argon2id password hashing, HttpOnly SameSite cookies, strict CORS allowlist.', modules: 'auth, all', status: 'VERIFIED' },
        { ref: 'STD-03', standard: 'PostgreSQL 17 Partial Unique Indexes & Transactions', source: 'https://www.postgresql.org/docs/17/indexes-partial.html', version: '17.x', rule: 'Enforce concurrent slot exclusivity and atomic multi-table inventory commits at the DB engine boundary.', modules: 'appointments, pharmacy', status: 'VERIFIED' },
      ],
      security: {
        p0: 0,
        p1: 0,
        verdict: 'PASS',
        controls: [
          { num: '1', control: 'Deny-by-default authentication on all non-public routes', status: 'PASS', evidence: 'src/routes/appointments.routes.ts:14' },
          { num: '2', control: 'Server-side RBAC & tenant/ownership IDOR protection', status: 'PASS', evidence: 'src/services/ledger.service.ts:48' },
          { num: '3', control: 'Argon2id password hashing & zero hash/secret leaks', status: 'PASS', evidence: 'src/services/auth.password.ts:9' },
          { num: '4', control: 'Zero hardcoded secrets, backdoors, or dev bypasses', status: 'PASS', evidence: 'validate-project.mjs scanner/hardcoded-secrets (0 hits)' },
          { num: '5', control: 'Parameterized SQL & zero auto-destructive boot hooks', status: 'PASS', evidence: 'core/data-safety.md verified across repositories' },
        ],
      },
      handoverMarkdown: `# NexusCare ERP — Module User & Developer Guide

## 1. Clinic Scheduling Module (\`S-03\`)
- **Authorized Roles:** \`ADMIN\`, \`RECEPTION\`, \`DOCTOR\`
- **Operator Workflow:** Select clinic branch -> choose doctor -> pick available 15-min slot -> confirm booking (real-time conflict protection returns \`409\` if another desk books simultaneously).
- **Protected Invariant:** Enforced via PostgreSQL partial unique index \`idx_appt_doctor_slot\`.

## 2. Double-Entry Billing & Reversals (\`S-04\`)
- **Authorized Roles:** \`ADMIN\`, \`CASHIER\` (create), \`ACCOUNTANT\` (reversal vouchers)
- **Business Rule:** All amounts stored in integer minor units; posted invoices cannot be deleted—use \`POST /api/v1/invoices/:id/reverse\` with an audit reason.

## 3. Pharmacy Dispensing (\`S-05\`)
- **Authorized Roles:** \`ADMIN\`, \`PHARMACIST\`
- **Business Rule:** Multi-item prescriptions execute inside an atomic DB transaction with row locks so partial stock shortages never leave corrupted inventory.`,
    },
  };
}

export async function buildLiveDemo(repoRoot = REPO_ROOT) {
  const data = await buildDemoDataset(repoRoot);
  const demoHtmlPath = path.join(repoRoot, 'docs', 'demo', 'index.html');
  const exported = await renderPortableHtmlFromData(data, demoHtmlPath);

  const rootRedirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=./demo/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZeroDrift v4.0 — Sovereign Interactive Studio Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #FBF9F5; color: #1C241E; display: grid; place-items: center; min-height: 100vh; margin: 0; }
    a { color: #243324; font-weight: 700; }
  </style>
</head>
<body>
  <p>Opening ZeroDrift v4.0 Interactive Studio Demo... <a href="./demo/">Click here if not redirected automatically</a>.</p>
</body>
</html>
`;
  const rootDocsPath = path.join(repoRoot, 'docs', 'index.html');
  await fs.writeFile(rootDocsPath, rootRedirectHtml, 'utf8');

  return { demoHtmlPath: exported.outPath, rootDocsPath, sizeBytes: exported.sizeBytes };
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  const res = await buildLiveDemo(REPO_ROOT);
  console.log(`ZeroDrift v4.0 Live Interactive Demo built cleanly:`);
  console.log(`  Demo:     ${res.demoHtmlPath} (${res.sizeBytes} bytes)`);
  console.log(`  Redirect: ${res.rootDocsPath}`);
}
