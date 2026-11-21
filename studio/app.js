/* ZeroDrift Studio v4.0 — Sovereign Client Engine (Zero Deps, Interactive CodeMap, UI/UX Showcase, Natural Bilingual AR/EN, Live SSE) */
(() => {
  const I18N = {
    en: {
      appearanceBtn: 'Appearance',
      themeLabel: 'Theme',
      themeIvory: 'Warm Ivory',
      themeSand: 'Soft Sand',
      themeMidnight: 'Midnight',
      brightnessLabel: 'Ambiance Tone',
      languageLabel: 'Interface Language',
      copyHandoffBtn: 'Fresh Handoff',
      tabCommand: 'Command Center',
      tabInbox: 'Questions & Approvals',
      tabWiring: 'Map, Tree & Contracts',
      tabDesign: 'Design & Tokens',
      tabMemory: 'Memory & Immunity',
      tabHub: 'Sources, Security & Guides',
      metricProgress: 'Pipeline Completion',
      metricClarity: 'Intake Clarity Score',
      clarityTarget: 'Target ≥ 90%',
      metricActiveSlice: 'Active Stage & Slice',
      metricShield: 'Memory & Drift Shield',
      pipelineTitle: 'Deterministic Lifecycle Pipeline (10 Checkpoints)',
      scorecardTitle: 'Verification & Scanner Scorecard',
      scorecardSub: 'Compiler, CodeMap wiring, security & deterministic scanners',
      slicesTitle: 'Vertical Slice Ledger',
      slicesSub: 'Independently verified end-to-end capabilities',
      inboxTitle: 'Questions & Gate Approvals',
      inboxSub: 'Answer agent questions or approve gates cleanly in-browser. Saved directly to .zerodrift/studio-outbox.json.',
      copyResumeBtn: 'Copy Resume Signal',
      outboxHistoryTitle: 'Submitted Decisions History',
      postSubmitBanner: 'Saved locally — go back to your AI agent chat and type "continue" (or click Copy Resume Signal) to proceed.',
      codemapTitle: 'Interactive Architecture CodeMap & Wiring Canvas',
      codemapSearchPh: 'Highlight module...',
      treeTitle: 'Workspace File & Module Tree',
      contractsTitle: 'Contracts Explorer (CONTRACTS.md)',
      dbTablesTitle: 'Database Schema Tables',
      contractsEmptyStage3: 'API & DB contracts will populate in Stage 3 (zerodrift-architect).',
      showcaseTitle: 'Interactive UI/UX Layout & Typography Showcase (Gate 4)',
      showcaseSub: 'Explore 3 full-page layout concepts & 5 curated Arabic/English font pairings live before locking Stage 5 UI code',
      lockDesignBtn: 'Lock Chosen Design (Gate 4)',
      showcaseLightDark: 'Light / Dark',
      showcaseRtlLtr: 'RTL / LTR',
      tokensTitle: 'Locked Design Palette & Token Guard',
      forbiddenTitle: 'Forbidden Colors, Copy Style & RTL Lock',
      componentsTitle: 'Live Typography Specimen',
      memAll: 'All Vault Views',
      memRules: 'Locked Rules',
      memRegressions: 'Regression Shield',
      memCheckpoints: 'Time Machine',
      memSkills: 'Learned Skills',
      rulesTitle: 'Locked Rules (Anti-Forgetting Guard)',
      rulesSub: 'Permanent rules appended directly to LOCKED-RULES.md',
      addRuleBtn: '+ Add Rule',
      regressionTitle: 'Regression Immunity Ledger',
      regressionSub: 'Protected invariants preventing "fix A breaks B"',
      checkpointsTitle: 'Time Machine Checkpoints Timeline',
      checkpointsSub: 'Non-destructive Git checkpoints with safe 1-click rollback command copy',
      learnedSkillsTitle: 'Auto-Evolving Learned Project Skills',
      learnedSkillsSub: 'Verified English playbooks distilled during development',
      sourcesTitle: 'Standards, Compliance & Sources Provenance',
      sourcesSub: 'Authoritative rules verified live and mapped to modules',
      securityTitle: 'Red-Team Security Audit Dashboard',
      securitySub: 'OWASP Top 10 & ZeroDrift Security Baseline evidence',
      guidesTitle: 'Module User & Developer Guide',
      guidesSub: 'Rendered cleanly from 06-HANDOVER-REPORT.md',
      thId: 'ID',
      thSlice: 'Slice',
      thStatus: 'Status',
      thCheck: 'Verification',
      thCategory: 'Category',
      thRule: 'Imperative Rule',
      thRef: 'Ref',
      thStandard: 'Standard / Doc',
      thSource: 'Official Source',
      thRuleExtracted: 'Rule Extracted',
      thModules: 'Modules',
      thTable: 'Table',
      thPk: 'PK',
      thColumns: 'Columns',
      thConstraints: 'Constraints',
      thControl: 'Control Area',
      thEvidence: 'Evidence',
      catArch: 'Architecture',
      catDesign: 'Design Lock',
      catSec: 'Security',
      catDomain: 'Domain',
      catWorkflow: 'Workflow',
      sevAll: 'All Severities',
      sevP0: 'P0 Critical',
      sevP1: 'P1 High',
      sevP2: 'P2 Medium',
      sevP3: 'P3 Low',
      treeSearchPh: 'Filter files by name or badge...',
      contractsSearchPh: 'Search routes, methods, RBAC roles, or tables...',
      ruleInputPh: 'Add permanent English rule...',
      rulesSearchPh: 'Search locked rules...',
      regressionSearchPh: 'Filter by file path, symptom, or invariant...',
      sourcesSearchPh: 'Search standards, rules, modules...',
      liveSse: 'Live SSE',
      interactiveDemo: 'Interactive Demo',
      portableHtml: 'Portable Snapshot',
      reconnecting: 'Reconnecting...',
      demoBanner: 'Interactive Demo Mode — Try CodeMap, UI Showcase, Q&A & Rules',
      exportBanner: 'Portable Snapshot (Read-Only)',
      allClear: 'All Clear',
      savedLocally: 'Saved Locally',
      pendingPrefix: 'Pending',
      recommended: 'Recommended',
      approveGate: 'Approve Gate',
      requestChanges: 'Request Changes',
      lockRuleLabel: 'Also save selected preferences into LOCKED-RULES.md',
      submitDemoBtn: 'Preview Payload & Submit (Demo)',
      submitLiveBtn: 'Save Answers for Agent',
      answeredOf: 'answered',
      noPendingTitle: 'No pending questions or gate approvals.',
      noPendingSub: 'When your agent needs intake answers, design choices, or a Gate sign-off, interactive cards will appear here live via SSE.',
      noOutbox: 'No submitted decisions recorded yet.',
      rawJsonLabel: 'View raw JSON payload',
      floorplanReady: 'Open Floorplan Map ↗',
      floorplanNone: 'Floorplan: Optional',
      openArchify: 'Open Archify Plate ↗',
      noMatchingRoutes: 'No matching API routes in CONTRACTS.md.',
      noMatchingTables: 'No matching database tables.',
      tokenClean: 'Token Drift: Clean',
      tokenViolations: 'Token Drift Violation(s)',
      noForbidden: 'No forbidden colors configured yet in DESIGN-TOKENS.json.',
      copyRollback: 'Copy Rollback Command',
      noCheckpoints: 'No Time Machine checkpoints recorded yet.',
      noRegressions: 'Zero regressions logged yet. Every solved bug strengthens this shield.',
      noSkills: 'No project-specific learned skills distilled yet.',
      noSources: 'No verified research sources populated yet.',
      noSecControls: 'Security audit checklist will populate during Stage 6B.',
      rootCause: 'Root Cause',
      protectedInvariant: 'Protected Invariant',
      recurrence: 'Recurrence',
      verdictLabel: 'Verdict',
      activeRulesWord: 'Active Rules',
      regressionsWord: 'Regressions',
      checkpointsWord: 'Checkpoints',
      filesScannedWord: 'files scanned',
      apiRoutesWord: 'API routes',
      dbTablesWord: 'DB tables',
      dirtyWord: 'dirty',
      slicePrefix: 'Slice',
      nextPrefix: 'Next',
      updatedPrefix: 'Updated',
      selectedFile: 'Selected File',
      layerAll: 'All Layers',
      brokenWiresWord: 'Broken Wire(s)',
      cyclesWord: 'Cycles',
      layerViolationsWord: 'Layer Violations',
      codemapHint: 'Drag canvas to pan · Click any node to trace incoming/outgoing wires',
      clearFocusBtn: 'Clear Focus',
      cmNodesWord: 'nodes',
      cmEdgesWord: 'edges',
      cmHttpWiresWord: 'HTTP wires',
      cmBrokenWord: 'broken',
      cmCyclesShortWord: 'cycles',
      cmInPrefix: 'in:',
      cmOutPrefix: 'out:',
      cmBlastRadius: 'Blast Radius',
      cmIncomingWord: 'incoming',
      cmOutgoingWord: 'outgoing',
      cmEmpty: 'CodeMap populates automatically once source modules exist in Stage 5.',
      cmEmptyHint: 'Run node scripts/code-map.mjs --project . to scan codebase wiring.',
      stackPending: 'Stack pending',
      defaultStage: 'Stage 0',
      defaultNextAction: 'Run zerodrift-intake',
      noSlices: 'No vertical slices planned yet.',
      noContent: 'No content authored yet.',
      pendingDecisions: 'Pending Decisions',
      noMatchingFiles: 'No matching files.',
      noWorkspaceFiles: 'No workspace files detected yet.',
      reqLabel: 'Req',
      resLabel: 'Res',
      strictLabel: 'Strict',
      strictOn: 'ON',
      strictForbiddenOnly: 'Forbidden-Only',
      copyPrefix: 'Copy',
      noTokens: 'No palette tokens found in DESIGN-TOKENS.json.',
      copyStyleLockTitle: 'Copy Style & Directionality Lock',
      voiceLabel: 'Voice',
      numeralsLabel: 'Numerals',
      tabularLabel: 'Tabular 0-9',
      rtlParityLabel: 'RTL Parity',
      logicalCssLabel: 'Logical CSS',
      onWord: 'ON',
      offWord: 'OFF',
      enabledWord: 'ENABLED',
      enforcedWord: 'ENFORCED',
      standardWord: 'Standard',
      noMatchingRules: 'No matching locked rules.',
      guideSections: 'Guide sections',
      thFile: 'File',
      thLine: 'Line',
      thColor: 'Color',
      thReason: 'Reason',
      toastRefreshed: 'Studio refreshed',
      toastResumeCopied: 'Resume signal copied — paste in your AI agent chat',
      toastHandoffCopied: 'Fresh Session Resume Prompt copied',
      toastRollbackCopied: 'Safe rollback command copied (never auto-executes)',
      toastCopiedHex: 'Copied',
      toastDemoSubmitted: 'Saved in Demo Mode — check the summary card below',
      toastLiveSubmitted: 'Saved locally — go back to your AI agent chat and type "continue"',
      toastRuleLocked: 'Locked into LOCKED-RULES.md',
      toastDesignLocked: 'Design System locked (Layout + Font + Palette)',
      toastReadOnly: 'Portable snapshot is read-only.',
      toastErrorPrefix: 'Error',
      toastRefreshError: 'Refresh error',
      modeMap: {
        greenfield: 'Greenfield',
        brownfield: 'Brownfield',
      },
      fileBadgeMap: {
        contract: 'Contract',
        frontend: 'Frontend',
        backend: 'Backend',
        db: 'DB',
        test: 'Test',
        config: 'Config',
        docs: 'Docs',
      },
      questionTypeMap: {
        'single-choice': 'single-choice',
        'multi-select': 'multi-select',
        text: 'text',
        palette: 'palette',
      },
      categoryMap: {
        Language: 'Language',
        'Data Safety': 'Data Safety',
        Security: 'Security',
        'Design Lock': 'Design Lock',
        'Change Control': 'Change Control',
        Architecture: 'Architecture',
        Domain: 'Domain',
        Workflow: 'Workflow',
        'Demo Decision': 'Demo Decision',
      },
      statusMap: {
        COMPLETED: 'Completed',
        APPROVED: 'Approved',
        APPROVE: 'Approved',
        REQUEST_CHANGES: 'Changes Requested',
        IN_PROGRESS: 'In Progress',
        PENDING: 'Pending',
        SKIPPED: 'Skipped',
        BLOCKED: 'Blocked',
        VERIFIED: 'Verified',
        QUEUED: 'Queued',
        ACTIVE: 'Active',
        PASS: 'Pass',
        FAIL: 'Fail',
      },
    },
    ar: {
      appearanceBtn: 'المظهر',
      themeLabel: 'الألوان',
      themeIvory: 'عاجي دافئ',
      themeSand: 'رملي هادئ',
      themeMidnight: 'ليلي داكن',
      brightnessLabel: 'الإضاءة',
      languageLabel: 'لغة الواجهة',
      copyHandoffBtn: 'جلسة جديدة',
      tabCommand: 'ملخص الأداء',
      tabInbox: 'الأسئلة والموافقات',
      tabWiring: 'الخريطة والعقود',
      tabDesign: 'التصميم والخطوط',
      tabMemory: 'القواعد والحماية',
      tabHub: 'المصادر والأمان والأدلة',
      metricProgress: 'نسبة الإنجاز',
      metricClarity: 'وضوح المتطلبات',
      clarityTarget: 'الهدف ≥ 90%',
      metricActiveSlice: 'المرحلة والشريحة الحالية',
      metricShield: 'القواعد وفحص الألوان',
      pipelineTitle: 'مراحل بناء المشروع (10 محطات)',
      scorecardTitle: 'فحوصات الجودة والأمان',
      scorecardSub: 'المترجم، خريطة الربط، الأمان، وفحص الألوان والأسرار',
      slicesTitle: 'سجل الشرائح الرأسية',
      slicesSub: 'وحدات كاملة تم بناؤها واختبارها',
      inboxTitle: 'الأسئلة والموافقات',
      inboxSub: 'أجب على أسئلة الوكيل أو اعتمد المراحل من هنا ليتم حفظها فوراً للوكيل.',
      copyResumeBtn: 'نسخ رسالة المتابعة',
      outboxHistoryTitle: 'سجل الإجابات المحفوظة',
      postSubmitBanner: 'تم حفظ إجابتك — ارجع لشات الوكيل واكتب «تم» (أو انسخ رسالة المتابعة) عشان يكمل.',
      codemapTitle: 'خريطة الربط والمعمارية التفاعلية (CodeMap)',
      codemapSearchPh: 'ابحث عن ملف في الخريطة...',
      treeTitle: 'ملفات ومجلدات المشروع',
      contractsTitle: 'عقود المسارات والجداول (CONTRACTS.md)',
      dbTablesTitle: 'جداول قاعدة البيانات',
      contractsEmptyStage3: 'هتظهر العقود والجداول تلقائياً في المرحلة 3 (المعمارية).',
      showcaseTitle: 'معرض التصميم والخطوط التفاعلي (البوابة 4)',
      showcaseSub: 'جرّب 3 تصاميم كاملة و5 أزواج خطوط عربية وإنجليزية قبل تثبيت كود الواجهات',
      lockDesignBtn: 'تثبيت التصميم المختار',
      showcaseLightDark: 'فاتح / داكن',
      showcaseRtlLtr: 'عربي / إنجليزي',
      tokensTitle: 'لوحة الألوان المقفلة وحارس الانحراف',
      forbiddenTitle: 'الألوان المحظورة وأسلوب النصوص',
      componentsTitle: 'معاينة الخطوط والأرقام',
      memAll: 'الكل',
      memRules: 'القواعد المقفلة',
      memRegressions: 'درع الأخطاء',
      memCheckpoints: 'نقاط الاستعادة',
      memSkills: 'مهارات المشروع',
      rulesTitle: 'القواعد الدائمة (منع النسيان)',
      rulesSub: 'أي قاعدة تضيفها هنا تُحفظ فوراً ويلتزم بها الوكيل دائماً',
      addRuleBtn: '+ إضافة قاعدة',
      regressionTitle: 'سجل الأخطاء المحمية',
      regressionSub: 'ثوابت تمنع عودة أي خطأ قديم عند تعديل الكود',
      checkpointsTitle: 'نقاط الاستعادة (Time Machine)',
      checkpointsSub: 'لقطات Git آمنة مع نسخ أمر الاستعادة بدون مسح أي شغل',
      learnedSkillsTitle: 'مهارات المشروع المتعلمة',
      learnedSkillsSub: 'حلول وأنماط مجرّبة حفظها الوكيل لهذا المشروع',
      sourcesTitle: 'المعايير والمصادر الموثّقة',
      sourcesSub: 'القواعد الرسمية والمكتبات المعتمدة في النظام',
      securityTitle: 'تقرير الأمان (OWASP)',
      securitySub: 'فحص الصلاحيات والأسرار والحماية ضد الثغرات',
      guidesTitle: 'دليل استخدام الوحدات',
      guidesSub: 'شرح عملي لخطوات التشغيل لكل وحدة في النظام',
      thId: 'المعرّف',
      thSlice: 'الشريحة',
      thStatus: 'الحالة',
      thCheck: 'التحقق',
      thCategory: 'التصنيف',
      thRule: 'القاعدة',
      thRef: 'المرجع',
      thStandard: 'المعيار / التوثيق',
      thSource: 'المصدر الرسمي',
      thRuleExtracted: 'القاعدة المطبّقة',
      thModules: 'الوحدات',
      thTable: 'الجدول',
      thPk: 'المفتاح',
      thColumns: 'الأعمدة',
      thConstraints: 'القيود',
      thControl: 'ضابط الأمان',
      thEvidence: 'الدليل البرمجي',
      catArch: 'معماري',
      catDesign: 'تصميم',
      catSec: 'أمان',
      catDomain: 'قواعد عمل',
      catWorkflow: 'سير عمل',
      sevAll: 'كل المستويات',
      sevP0: 'P0 حرج',
      sevP1: 'P1 مرتفع',
      sevP2: 'P2 متوسط',
      sevP3: 'P3 منخفض',
      treeSearchPh: 'ابحث باسم الملف أو النوع...',
      contractsSearchPh: 'ابحث في المسارات أو الجداول...',
      ruleInputPh: 'اكتب قاعدة دائمة (تُحفظ بالإنجليزية)...',
      rulesSearchPh: 'ابحث في القواعد...',
      regressionSearchPh: 'ابحث بالملف أو الخطأ...',
      sourcesSearchPh: 'ابحث في المعايير...',
      liveSse: 'مباشر',
      interactiveDemo: 'عرض تفاعلي',
      portableHtml: 'نسخة محمولة',
      reconnecting: 'جاري الاتصال...',
      demoBanner: 'عرض تفاعلي — جرّب الخريطة والتصاميم والأسئلة والقواعد',
      exportBanner: 'نسخة محمولة للعرض فقط',
      allClear: 'لا توجد أسئلة معلّقة',
      savedLocally: 'تم الحفظ',
      pendingPrefix: 'بانتظار ردك',
      recommended: 'مقترح',
      approveGate: 'موافق',
      requestChanges: 'تعديلات مطلوبة',
      lockRuleLabel: 'حفظ الاختيارات أيضاً كقواعد دائمة',
      submitDemoBtn: 'معاينة الحفظ (تجريبي)',
      submitLiveBtn: 'حفظ الإجابات للوكيل',
      answeredOf: 'مُجابة',
      noPendingTitle: 'لا توجد أسئلة أو موافقات معلّقة حالياً.',
      noPendingSub: 'عندما يحتاج الوكيل قرارك أو موافقتك على مرحلة، ستظهر البطاقات هنا مباشرة.',
      noOutbox: 'لا توجد إجابات محفوظة بعد.',
      rawJsonLabel: 'عرض بيانات JSON الخام',
      floorplanReady: 'فتح خريطة Floorplan ↗',
      floorplanNone: 'Floorplan: اختياري',
      openArchify: 'فتح مخطط Archify ↗',
      noMatchingRoutes: 'لا توجد مسارات مطابقة للبحث.',
      noMatchingTables: 'لا توجد جداول مطابقة للبحث.',
      tokenClean: 'الألوان: سليمة',
      tokenViolations: 'مخالفات ألوان',
      noForbidden: 'لا توجد ألوان محظورة مسجلة.',
      copyRollback: 'نسخ أمر الاستعادة',
      noCheckpoints: 'لم تُسجّل نقاط استعادة بعد.',
      noRegressions: 'لا توجد أعطال مسجلة حتى الآن.',
      noSkills: 'لا توجد مهارات متعلمة مسجلة بعد.',
      noSources: 'لا توجد مصادر بحثية مسجلة بعد.',
      noSecControls: 'تظهر ضوابط الأمان في المرحلة 6B.',
      rootCause: 'السبب',
      protectedInvariant: 'الشرط المحمي',
      recurrence: 'التكرار',
      verdictLabel: 'النتيجة',
      activeRulesWord: 'قواعد نشطة',
      regressionsWord: 'أخطاء محمية',
      checkpointsWord: 'نقاط استعادة',
      filesScannedWord: 'ملف مفحوص',
      apiRoutesWord: 'مسارات API',
      dbTablesWord: 'جداول بيانات',
      dirtyWord: 'تعديل معلّق',
      slicePrefix: 'الشريحة',
      nextPrefix: 'الخطوة التالية',
      updatedPrefix: 'آخر تحديث',
      selectedFile: 'الملف المحدد',
      layerAll: 'كل الطبقات',
      brokenWiresWord: 'مسارات مقطوعة',
      cyclesWord: 'حلقات دائرية',
      layerViolationsWord: 'تجاوزات طبقات',
      codemapHint: 'اسحب الخريطة للتحريك · اضغط على أي ملف لتتبع ارتباطاته',
      clearFocusBtn: 'إلغاء التحديد',
      cmNodesWord: 'عقدة',
      cmEdgesWord: 'رابط',
      cmHttpWiresWord: 'مسارات HTTP',
      cmBrokenWord: 'مقطوع',
      cmCyclesShortWord: 'حلقات',
      cmInPrefix: 'وارد:',
      cmOutPrefix: 'صادر:',
      cmBlastRadius: 'نطاق التأثير',
      cmIncomingWord: 'وارد',
      cmOutgoingWord: 'صادر',
      cmEmpty: 'تظهر خريطة الربط تلقائياً فور إنشاء ملفات الكود في المرحلة 5.',
      cmEmptyHint: 'شغّل الأمر node scripts/code-map.mjs --project . لفحص ارتباطات الكود.',
      stackPending: 'جاري تحديد التقنيات',
      defaultStage: 'المرحلة 0',
      defaultNextAction: 'ابدأ جمع المتطلبات (zerodrift-intake)',
      noSlices: 'لم تُخطّط شرائح رأسية بعد.',
      noContent: 'لا يوجد محتوى مسجّل بعد.',
      pendingDecisions: 'قرارات بانتظار ردك',
      noMatchingFiles: 'لا توجد ملفات مطابقة للبحث.',
      noWorkspaceFiles: 'لم تُكتشف ملفات في المشروع بعد.',
      reqLabel: 'الطلب',
      resLabel: 'الاستجابة',
      strictLabel: 'وضع الالتزام',
      strictOn: 'صارم',
      strictForbiddenOnly: 'المحظورات فقط',
      copyPrefix: 'نسخ',
      noTokens: 'لا توجد ألوان مسجلة في DESIGN-TOKENS.json.',
      copyStyleLockTitle: 'قفل أسلوب النصوص واتجاه الواجهة',
      voiceLabel: 'الأسلوب',
      numeralsLabel: 'الأرقام',
      tabularLabel: 'أرقام جدولية 0-9',
      rtlParityLabel: 'دعم العربية RTL',
      logicalCssLabel: 'تنسيق منطقي CSS',
      onWord: 'مفعّل',
      offWord: 'متوقف',
      enabledWord: 'مفعّل',
      enforcedWord: 'إلزامي',
      standardWord: 'قياسي',
      noMatchingRules: 'لا توجد قواعد مطابقة للبحث.',
      guideSections: 'أقسام الدليل',
      thFile: 'الملف',
      thLine: 'السطر',
      thColor: 'اللون',
      thReason: 'السبب',
      toastRefreshed: 'تم تحديث اللوحة',
      toastResumeCopied: 'تم نسخ رسالة المتابعة — الصقها في شات الوكيل',
      toastHandoffCopied: 'تم نسخ أمر بدء جلسة جديدة',
      toastRollbackCopied: 'تم نسخ أمر الاستعادة الآمن',
      toastCopiedHex: 'تم نسخ',
      toastDemoSubmitted: 'تم الحفظ في الوضع التجريبي — راجع الملخص بالأسفل',
      toastLiveSubmitted: 'تم الحفظ — ارجع لشات الوكيل واكتب «تم» عشان يكمل',
      toastRuleLocked: 'تم حفظ القاعدة الدائمة',
      toastDesignLocked: 'تم تثبيت التصميم والخط والألوان للبوابة 4',
      toastReadOnly: 'النسخة المحمولة للعرض فقط.',
      toastErrorPrefix: 'خطأ',
      toastRefreshError: 'تعذّر التحديث',
      modeMap: {
        greenfield: 'مشروع جديد',
        brownfield: 'مشروع قائم',
      },
      fileBadgeMap: {
        contract: 'عقد',
        frontend: 'واجهة',
        backend: 'خادم',
        db: 'قاعدة بيانات',
        test: 'اختبار',
        config: 'إعدادات',
        docs: 'توثيق',
      },
      questionTypeMap: {
        'single-choice': 'اختيار واحد',
        'multi-select': 'اختيار متعدد',
        text: 'نص حر',
        palette: 'لوحة ألوان',
      },
      categoryMap: {
        Language: 'لغة',
        'Data Safety': 'سلامة البيانات',
        Security: 'أمان',
        'Design Lock': 'تصميم',
        'Change Control': 'ضبط التعديلات',
        Architecture: 'معماري',
        Domain: 'قواعد عمل',
        Workflow: 'سير عمل',
        'Demo Decision': 'قرار تجريبي',
      },
      statusMap: {
        COMPLETED: 'مكتمل',
        APPROVED: 'معتمد',
        APPROVE: 'موافق',
        REQUEST_CHANGES: 'تعديلات مطلوبة',
        IN_PROGRESS: 'شغّال الآن',
        PENDING: 'معلّق',
        SKIPPED: 'متجاوز',
        BLOCKED: 'متوقف',
        VERIFIED: 'تم التحقق',
        QUEUED: 'بالانتظار',
        ACTIVE: 'نشط',
        PASS: 'ناجح',
        FAIL: 'فشل',
      },
    },
  };

  const LAYER_META = {
    ui: { label: { en: 'UI Pages', ar: 'الواجهات' }, color: '#1E4E79', bg: '#E2EFF9' },
    'api-client': { label: { en: 'API Client', ar: 'عميل API' }, color: '#0F6E65', bg: '#DCEEEB' },
    routes: { label: { en: 'Backend Routes', ar: 'المسارات' }, color: '#115E3B', bg: '#DCF2E7' },
    services: { label: { en: 'Services', ar: 'الخدمات' }, color: '#8C410A', bg: '#FBF0DC' },
    database: { label: { en: 'Database', ar: 'قاعدة البيانات' }, color: '#5B2C82', bg: '#EFE7F7' },
    shared: { label: { en: 'Shared / Core', ar: 'مشترك' }, color: '#556058', bg: '#F3EFE6' },
  };

  const SVG = {
    chevron: '<svg class="ico-sm tree-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',
    folder: '<svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
    file: '<svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    check: '<svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    clock: '<svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    spark: '<svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>',
  };

  const state = {
    data: null,
    tree: null,
    lang: localStorage.getItem('zd-lang-manual') ? localStorage.getItem('zd-lang') || 'en' : null,
    theme: localStorage.getItem('zd-theme') || 'warm-ivory',
    tone: Number(localStorage.getItem('zd-tone') || 0),
    isExportMode: Boolean(window.__ZERODRIFT_DATA__),
    inboxDraft: {},
    inboxGateDecision: 'APPROVE',
    inboxLockAsRule: false,
    justSubmitted: false,
    selectedFile: null,
    memoryView: 'all',
    // CodeMap interactive state
    cmLayer: 'all',
    cmSelectedNode: null,
    cmZoom: 1,
    cmPanX: 0,
    cmPanY: 0,
    cmSearch: '',
    // Design Showcase interactive state
    scLayout: 'editorial-calm',
    scFont: 'ibm-plex-jakarta',
    scPalette: 'warm-ivory-olive',
    scDark: false,
    scDir: null,
    loadedFontUrls: new Set(),
    eventSource: null,
  };

  const $ = (id) => document.getElementById(id);
  const currentLang = () => state.lang || state.data?.defaultLocale || 'en';
  const t = (key) => (I18N[currentLang()] && I18N[currentLang()][key]) || I18N.en[key] || key;
  const loc = (val) => {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      return val[currentLang()] || val.en || val.ar || '';
    }
    return String(val ?? '');
  };
  const tStatus = (raw) => {
    const key = String(raw || '').trim().toUpperCase();
    return (I18N[currentLang()]?.statusMap?.[key]) || (I18N.en.statusMap[key]) || raw;
  };
  const tMode = (raw) => {
    const key = String(raw || 'greenfield').trim().toLowerCase();
    return (I18N[currentLang()]?.modeMap?.[key]) || (I18N.en.modeMap[key]) || raw || 'greenfield';
  };
  const tFileBadge = (raw) => {
    const key = String(raw || '').trim().toLowerCase();
    return (I18N[currentLang()]?.fileBadgeMap?.[key]) || (I18N.en.fileBadgeMap[key]) || raw;
  };
  const tQuestionType = (raw) => {
    const key = String(raw || 'text').trim().toLowerCase();
    return (I18N[currentLang()]?.questionTypeMap?.[key]) || (I18N.en.questionTypeMap[key]) || raw;
  };
  const tCategory = (raw) => {
    const key = String(raw || '').trim();
    return (I18N[currentLang()]?.categoryMap?.[key]) || (I18N.en.categoryMap[key]) || raw;
  };

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(msg) {
    const el = $('toast');
    if (!el) return;
    el.innerHTML = `${SVG.check}<span>${esc(msg)}</span>`;
    el.classList.add('visible');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('visible'), 3200);
  }

  function loadGoogleFontGracefully(url) {
    if (!url || state.loadedFontUrls.has(url) || typeof document === 'undefined') return;
    state.loadedFontUrls.add(url);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onerror = () => {}; // Offline fallback is instant & silent
    document.head.appendChild(link);
  }

  function applyPreferences() {
    const lang = currentLang();
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const dimOp = state.tone < 0 ? Math.min(0.24, Math.abs(state.tone) * 0.011) : 0;
    const warmOp = state.tone > 0 ? Math.min(0.18, state.tone * 0.008) : 0;
    document.documentElement.style.setProperty('--zd-dim-opacity', dimOp.toFixed(3));
    document.documentElement.style.setProperty('--zd-warm-opacity', warmOp.toFixed(3));

    const slider = $('brightness-slider');
    if (slider) slider.value = String(state.tone);
    const readout = $('brightness-readout');
    if (readout) readout.textContent = `${state.tone > 0 ? '+' : ''}${state.tone}%`;

    document.querySelectorAll('[data-theme-opt]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.themeOpt === state.theme);
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val) el.setAttribute('placeholder', val);
    });

    if (state.data) renderAll();
  }

  function formatInline(text) {
    return esc(text)
      .replace(/->/g, '→')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  function renderSimpleMarkdown(md, { collectToc = false } = {}) {
    if (!md || !md.trim()) {
      return { html: `<div class="empty-state">${esc(t('noContent'))}</div>`, toc: [] };
    }
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inCode = false;
    let codeBuf = [];
    let inList = false;
    const toc = [];

    const closeList = () => {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
    };

    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        closeList();
        if (!inCode) {
          inCode = true;
          codeBuf = [];
        } else {
          html += `<pre><code>${esc(codeBuf.join('\n'))}</code></pre>`;
          inCode = false;
        }
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        continue;
      }
      const trimmed = line.trim();
      if (!trimmed) {
        closeList();
        continue;
      }
      if (trimmed.startsWith('### ')) {
        closeList();
        html += `<h4>${formatInline(trimmed.slice(4))}</h4>`;
      } else if (trimmed.startsWith('## ')) {
        closeList();
        const headingText = trimmed.slice(3);
        const slug = `guide-sec-${toc.length + 1}`;
        if (collectToc) toc.push({ id: slug, label: headingText.replace(/`/g, '') });
        html += `<h3 id="${slug}">${formatInline(headingText)}</h3>`;
      } else if (trimmed.startsWith('# ')) {
        closeList();
        if (!collectToc) html += `<h3>${formatInline(trimmed.slice(2))}</h3>`;
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          html += '<ul style="margin:6px 0;padding-inline-start:20px;">';
          inList = true;
        }
        html += `<li>${formatInline(trimmed.slice(2))}</li>`;
      } else {
        closeList();
        html += `<p style="margin:6px 0;">${formatInline(trimmed)}</p>`;
      }
    }
    closeList();
    return { html, toc };
  }

  function fileBadgeClass(badge) {
    const b = String(badge || '').toLowerCase();
    if (b === 'backend' || b === 'contract') return 'ok';
    if (b === 'frontend') return 'info';
    if (b === 'db') return 'purple';
    if (b === 'test') return 'warn';
    return '';
  }

  function methodBadgeClass(method) {
    const m = String(method || '').toUpperCase();
    if (m === 'GET') return 'info';
    if (m === 'POST') return 'ok';
    if (m === 'PUT' || m === 'PATCH') return 'warn';
    if (m === 'DELETE') return 'err';
    return '';
  }

  function renderCommandCenter() {
    const d = state.data;
    if (!d) return;

    $('project-title').textContent = loc(d.project.name) || 'ZeroDrift Studio';
    $('project-meta').innerHTML = `${esc(tMode(d.project.mode))} · <bdi dir="ltr">${esc(d.project.stack || t('stackPending'))}</bdi> · ${esc(t('updatedPrefix'))} <bdi dir="ltr">${esc(d.generatedAt.slice(0, 16).replace('T', ' '))}</bdi>`;

    const stages = d.pipeline.stages || [];
    const doneCount = stages.filter((s) => ['COMPLETED', 'APPROVED', 'SKIPPED'].includes(s.status)).length;
    const pct = stages.length ? Math.round((doneCount / stages.length) * 100) : 0;

    $('metric-progress').textContent = `${pct}%`;
    $('metric-progress-bar').style.width = `${pct}%`;

    const clarityStr = d.pipeline.clarityScore || '—';
    $('metric-clarity').textContent = clarityStr;
    const clarityNum = parseInt(clarityStr, 10);
    const ring = $('clarity-ring');
    if (ring) {
      const circ = 119.38;
      const clamped = Number.isFinite(clarityNum) ? Math.max(0, Math.min(100, clarityNum)) : 0;
      ring.style.strokeDashoffset = String(circ - (circ * clamped) / 100);
    }

    $('metric-stage').textContent = loc(d.pipeline.currentStage) || t('defaultStage');
    $('metric-slice').innerHTML = `${esc(t('slicePrefix'))}: <span class="mono">${esc(d.pipeline.activeSlice || 'NONE')}</span>`;
    $('next-action-text').textContent = `${t('nextPrefix')}: ${loc(d.pipeline.nextAction) || t('defaultNextAction')}`;

    const rulesCount = (d.memory.lockedRules || []).filter((r) => r.status === 'ACTIVE').length;
    const bugsCount = (d.memory.regressions || []).length;
    const driftCount = (d.design.driftViolations || []).length;
    $('metric-shield').innerHTML = `${rulesCount} <span style="font-size:14px;font-weight:650;color:var(--zd-ink-muted);">${esc(t('activeRulesWord'))}</span>`;
    $('metric-shield-sub').textContent = `${bugsCount} ${t('regressionsWord')} · ${driftCount === 0 ? t('tokenClean') : `${driftCount} ${t('tokenViolations')}`}`;

    if (state.isExportMode) {
      $('export-mode-banner').innerHTML = d.demoMode
        ? `<span class="pill ok">${esc(t('demoBanner'))}</span>`
        : `<span class="pill warn">${esc(t('exportBanner'))}</span>`;
    } else {
      $('export-mode-banner').innerHTML = '';
    }

    $('pipeline-grid').innerHTML = stages
      .map((s) => {
        const icon =
          s.status === 'COMPLETED' || s.status === 'APPROVED'
            ? SVG.check
            : s.status === 'IN_PROGRESS'
              ? SVG.spark
              : SVG.clock;
        return `
          <div class="stage-node status-${esc(s.status)}">
            <div>
              <div class="stage-top">
                <span class="stage-code">${esc(s.code)}</span>
                <span style="color:var(--zd-ink-muted);">${icon}</span>
              </div>
              <div class="stage-name">${esc(loc(s.label))}</div>
            </div>
            <div><span class="pill ${esc(s.status)}">${esc(tStatus(s.status))}</span></div>
          </div>`;
      })
      .join('');

    const checks = d.verification.scorecard || [];
    const passChecks = checks.filter((c) => c.status === 'PASS').length;
    $('scorecard-summary').textContent = `${passChecks}/${checks.length} ${tStatus('PASS')}`;
    $('scorecard-grid').innerHTML = checks
      .map(
        (c) => `
        <div class="score-tile">
          <div class="score-tile-top">
            <span class="score-tile-label">${esc(loc(c.label))}</span>
            <span class="pill ${esc(c.status)}">${esc(tStatus(c.status))}</span>
          </div>
          <div class="score-tile-detail ltr-block">${esc(loc(c.detail || ''))}</div>
        </div>`
      )
      .join('');

    const slices = d.pipeline.slices || [];
    $('slices-tbody').innerHTML = slices.length
      ? slices
          .map(
            (sl) => `
            <tr>
              <td class="mono col-nowrap"><strong>${esc(sl.id)}</strong></td>
              <td class="col-slice-name">${esc(loc(sl.name))}</td>
              <td class="col-nowrap"><span class="pill ${esc(sl.status)}">${esc(tStatus(sl.status))}</span></td>
              <td class="mono col-nowrap" style="font-size:11.5px;">${esc(sl.verification || '-')}</td>
            </tr>`
          )
          .join('')
      : `<tr><td colspan="4" style="color:var(--zd-ink-muted);">${esc(t('noSlices'))}</td></tr>`;
  }

  function findQuestionLabel(batchId, qKey, rawVal) {
    const inbox = state.data?.inbox || {};
    const batches = Array.isArray(inbox.batches) ? inbox.batches : inbox.batchId ? [inbox] : [];
    const batch = batches.find((b) => b.batchId === batchId);
    const q = batch?.questions?.find((item) => item.id === qKey);
    const qLabel = q ? loc(q.prompt || q.question) : qKey;

    const formatOption = (val) => {
      if (!q || !Array.isArray(q.options)) return String(val ?? '');
      const opt = q.options.find((o) => (typeof o === 'string' ? o : o.value || o.label) === val);
      return opt ? (typeof opt === 'string' ? opt : loc(opt.label)) : String(val ?? '');
    };

    const answerDisplay = Array.isArray(rawVal)
      ? rawVal.map(formatOption).join(' · ')
      : formatOption(rawVal);

    return { qLabel, answerDisplay };
  }

  function renderInbox() {
    const d = state.data;
    if (!d) return;

    const inbox = d.inbox || {};
    const outbox = d.outbox || { submissions: [] };
    const batches = Array.isArray(inbox.batches) ? inbox.batches : inbox.batchId ? [inbox] : [];
    const submittedIds = new Set((outbox.submissions || []).map((s) => s.batchId));
    const pendingBatches = batches.filter((b) => b && b.status !== 'RESOLVED' && !submittedIds.has(b.batchId));

    const badge = $('inbox-badge');
    if (pendingBatches.length > 0) {
      badge.textContent = String(pendingBatches.length);
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }

    const activeBatch = pendingBatches[0];
    const container = $('inbox-container');
    const postBanner = state.justSubmitted || submittedIds.size > 0
      ? `<div class="handoff-callout"><span>${SVG.check} ${esc(t('postSubmitBanner'))}</span><button type="button" class="btn btn-sm btn-primary" id="inline-copy-resume">${esc(t('copyResumeBtn'))}</button></div>`
      : '';

    if (!activeBatch) {
      $('inbox-delivery-status').textContent = submittedIds.size > 0 ? t('savedLocally') : t('allClear');
      $('inbox-delivery-status').className = 'pill ok';
      container.innerHTML = `
        ${postBanner}
        <div class="empty-state">
          <strong>${esc(t('noPendingTitle'))}</strong>
          <p style="margin:6px 0 0;">${esc(t('noPendingSub'))}</p>
        </div>`;
    } else {
      $('inbox-delivery-status').innerHTML = `${esc(t('pendingPrefix'))}: <bdi dir="ltr">${esc(activeBatch.batchId)}</bdi>`;
      $('inbox-delivery-status').className = 'pill warn';

      const questions = activeBatch.questions || [];
      questions.forEach((q) => {
        if (state.inboxDraft[q.id] === undefined && q.default !== undefined) {
          state.inboxDraft[q.id] = Array.isArray(q.default) ? [...q.default] : q.default;
        }
      });

      const answeredCount = questions.filter((q) => {
        const v = state.inboxDraft[q.id];
        if (Array.isArray(v)) return v.length > 0;
        return typeof v === 'string' && v.trim().length > 0;
      }).length;
      const pct = questions.length ? Math.round((answeredCount / questions.length) * 100) : 100;

      const qHtml = questions
        .map((q, idx) => {
          const val = state.inboxDraft[q.id];
          let controlHtml = '';

          if (q.type === 'single-choice' || q.type === 'palette') {
            controlHtml = `<div class="choice-grid" role="radiogroup" aria-label="${esc(loc(q.prompt || q.id))}">${(q.options || [])
              .map((opt) => {
                const optVal = typeof opt === 'string' ? opt : opt.value || loc(opt.label);
                const optLabel = typeof opt === 'string' ? opt : loc(opt.label);
                const optDesc = typeof opt === 'object' ? loc(opt.description || '') : '';
                const rec = typeof opt === 'object' && opt.recommended;
                const swatches = typeof opt === 'object' && Array.isArray(opt.swatches) ? opt.swatches : [];
                const isSelected = val === optVal;
                return `
                  <button type="button" role="radio" aria-checked="${isSelected ? 'true' : 'false'}" class="choice-option ${isSelected ? 'selected' : ''}" data-qid="${esc(q.id)}" data-val="${esc(optVal)}" data-kind="single">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;">
                      <span style="display:inline-flex;align-items:center;gap:8px;font-weight:700;">
                        <span class="radio-dot" aria-hidden="true"></span>
                        <span>${esc(optLabel)}</span>
                      </span>
                      ${rec ? `<span class="pill ok">${esc(t('recommended'))}</span>` : ''}
                    </div>
                    ${optDesc ? `<span style="font-size:12px;color:var(--zd-ink-muted);padding-inline-start:24px;">${esc(optDesc)}</span>` : ''}
                    ${
                      swatches.length
                        ? `<div style="display:flex;gap:6px;margin-top:6px;padding-inline-start:24px;">${swatches
                            .map(
                              (hex) =>
                                `<span title="${esc(hex)}" style="width:22px;height:22px;border-radius:6px;background:${esc(hex)};border:1px solid var(--zd-border-strong);"></span>`
                            )
                            .join('')}</div>`
                        : ''
                    }
                  </button>`;
              })
              .join('')}</div>`;
          } else if (q.type === 'multi-select') {
            const selectedArr = Array.isArray(val) ? val : [];
            controlHtml = `<div class="chip-row">${(q.options || [])
              .map((opt) => {
                const optVal = typeof opt === 'string' ? opt : opt.value || loc(opt.label);
                const optLabel = typeof opt === 'string' ? opt : loc(opt.label);
                const isSelected = selectedArr.includes(optVal);
                return `<button type="button" aria-pressed="${isSelected ? 'true' : 'false'}" class="chip-toggle ${isSelected ? 'selected' : ''}" data-qid="${esc(q.id)}" data-val="${esc(optVal)}" data-kind="multi">${isSelected ? SVG.check : ''}<span>${esc(optLabel)}</span></button>`;
              })
              .join('')}</div>`;
          } else {
            const fieldId = `inbox-field-${q.id}`;
            controlHtml = `<textarea id="${esc(fieldId)}" name="${esc(fieldId)}" dir="auto" class="textarea" data-qid="${esc(q.id)}" data-kind="text" placeholder="${esc(loc(q.placeholder || ''))}">${esc(val || '')}</textarea>`;
          }

          return `
            <div class="question-card">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span class="pill">Q${idx + 1}</span>
                <span class="mono" style="font-size:11px;color:var(--zd-ink-muted);">${esc(tQuestionType(q.type || 'text'))}</span>
              </div>
              <div style="font-weight:700;">${esc(loc(q.prompt || q.question))}</div>
              ${q.context ? `<div style="font-size:12px;color:var(--zd-ink-muted);margin-top:3px;">${esc(loc(q.context))}</div>` : ''}
              ${controlHtml}
            </div>`;
        })
        .join('');

      const gateBlock = activeBatch.gate
        ? `
          <div class="question-card" style="border-color:var(--zd-olive);">
            <div style="font-weight:750;margin-bottom:10px;">${esc(loc(activeBatch.gate))}</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn ${state.inboxGateDecision === 'APPROVE' ? 'btn-accent' : ''}" id="gate-approve-btn">${SVG.check}<span>${esc(t('approveGate'))}</span></button>
              <button type="button" class="btn ${state.inboxGateDecision === 'REQUEST_CHANGES' ? 'btn-danger' : ''}" id="gate-changes-btn">${esc(t('requestChanges'))}</button>
            </div>
          </div>`
        : '';

      container.innerHTML = `
        <div class="inbox-progress-bar">
          <div>
            <strong>${esc(loc(activeBatch.title || t('pendingDecisions')))}</strong>
            <div style="font-size:12px;color:var(--zd-ink-muted);">${esc(loc(activeBatch.summary || ''))}</div>
          </div>
          <div style="min-width:140px;text-align:end;">
            <span class="pill ok">${answeredCount}/${questions.length} ${esc(t('answeredOf'))}</span>
            <div class="progress-track" style="margin-top:6px;"><div class="progress-fill" style="width:${pct}%;"></div></div>
          </div>
        </div>
        ${qHtml}
        ${gateBlock}
        <div class="sticky-submit-bar">
          <label for="lock-as-rule-cb" style="display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;cursor:pointer;">
            <input type="checkbox" id="lock-as-rule-cb" name="lockAsRules" ${state.inboxLockAsRule ? 'checked' : ''} />
            <span>${esc(t('lockRuleLabel'))}</span>
          </label>
          <button type="button" id="submit-inbox-btn" class="btn btn-primary" ${state.isExportMode && !d.demoMode ? 'disabled' : ''}>
            ${esc(d.demoMode ? t('submitDemoBtn') : t('submitLiveBtn'))}
          </button>
        </div>`;

      container.querySelectorAll('[data-kind="single"]').forEach((el) => {
        el.addEventListener('click', () => {
          state.inboxDraft[el.dataset.qid] = el.dataset.val;
          renderInbox();
        });
      });

      container.querySelectorAll('[data-kind="multi"]').forEach((el) => {
        el.addEventListener('click', () => {
          const cur = Array.isArray(state.inboxDraft[el.dataset.qid]) ? [...state.inboxDraft[el.dataset.qid]] : [];
          const i = cur.indexOf(el.dataset.val);
          if (i >= 0) cur.splice(i, 1);
          else cur.push(el.dataset.val);
          state.inboxDraft[el.dataset.qid] = cur;
          renderInbox();
        });
      });

      container.querySelectorAll('[data-kind="text"]').forEach((el) => {
        el.addEventListener('input', () => {
          state.inboxDraft[el.dataset.qid] = el.value;
        });
      });

      const approveBtn = $('gate-approve-btn');
      const changesBtn = $('gate-changes-btn');
      if (approveBtn) approveBtn.addEventListener('click', () => { state.inboxGateDecision = 'APPROVE'; renderInbox(); });
      if (changesBtn) changesBtn.addEventListener('click', () => { state.inboxGateDecision = 'REQUEST_CHANGES'; renderInbox(); });

      const lockCb = $('lock-as-rule-cb');
      if (lockCb) lockCb.addEventListener('change', () => { state.inboxLockAsRule = lockCb.checked; });

      const submitBtn = $('submit-inbox-btn');
      if (submitBtn) submitBtn.addEventListener('click', () => submitInboxBatch(activeBatch));
    }

    const inlineCopy = $('inline-copy-resume');
    if (inlineCopy) {
      inlineCopy.addEventListener('click', () => {
        const msg = currentLang() === 'ar'
          ? 'تم — حفظت إجاباتي في ZeroDrift Studio (.zerodrift/studio-outbox.json)، تقدر تكمل الآن.'
          : 'continue — I saved my ZeroDrift Studio decisions in .zerodrift/studio-outbox.json.';
        if (navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});
        showToast(t('toastResumeCopied'));
      });
    }

    // Human-Readable Decision History Cards + Optional Collapsed Raw JSON
    const subs = outbox.submissions || [];
    $('outbox-container').innerHTML = subs.length
      ? subs
          .slice()
          .reverse()
          .map((sub) => {
            const entries = Object.entries(sub.answers || {});
            const qaCards = entries
              .map(([k, v]) => {
                const { qLabel, answerDisplay } = findQuestionLabel(sub.batchId, k, v);
                return `
                  <div class="decision-qa-item">
                    <div style="font-size:11px;color:var(--zd-ink-muted);margin-bottom:3px;">${esc(qLabel)}</div>
                    <div style="font-weight:700;">${esc(answerDisplay || '—')}</div>
                  </div>`;
              })
              .join('');

            return `
              <div style="padding:14px 16px;border-radius:12px;background:var(--zd-surface);border:1px solid var(--zd-border);margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                  <strong class="mono">${esc(sub.batchId)}</strong>
                  <span class="pill ok">${esc(tStatus(sub.gateDecision || 'APPROVED'))} · <bdi dir="ltr">${esc((sub.submittedAt || '').slice(0, 16).replace('T', ' '))}</bdi></span>
                </div>
                <div class="decision-qa-grid">${qaCards}</div>
                <details style="margin-top:10px;font-size:12px;">
                  <summary style="cursor:pointer;color:var(--zd-ink-muted);font-weight:600;">${esc(t('rawJsonLabel'))}</summary>
                  <pre style="margin:8px 0 0;font-size:11.5px;overflow:auto;direction:ltr;background:var(--zd-canvas);padding:10px;border-radius:8px;border:1px solid var(--zd-border);">${esc(JSON.stringify(sub.answers, null, 2))}</pre>
                </details>
              </div>`;
          })
          .join('')
      : `<div style="font-size:13px;color:var(--zd-ink-muted);">${esc(t('noOutbox'))}</div>`;
  }

  async function submitInboxBatch(batch) {
    const isDemo = Boolean(state.data && state.data.demoMode);
    if (state.isExportMode && !isDemo) {
      showToast(t('toastReadOnly'));
      return;
    }
    const payload = {
      batchId: batch.batchId,
      gateDecision: batch.gate ? state.inboxGateDecision : undefined,
      answers: { ...state.inboxDraft },
      lockAsRules: state.inboxLockAsRule,
    };

    if (isDemo) {
      const submittedAt = new Date().toISOString();
      state.data.outbox = state.data.outbox || { submissions: [] };
      state.data.outbox.submissions.push({ ...payload, submittedAt });
      batch.status = 'RESOLVED';
      if (payload.lockAsRules) {
        for (const [k, v] of Object.entries(payload.answers)) {
          const nextId = `RULE-${String((state.data.memory.lockedRules || []).length + 1).padStart(3, '0')}`;
          state.data.memory.lockedRules.push({
            id: nextId,
            category: 'Demo Decision',
            rule: `Honor Studio selection for "${k}": ${Array.isArray(v) ? v.join(', ') : v}`,
            status: 'ACTIVE',
          });
        }
      }
      state.inboxDraft = {};
      state.justSubmitted = true;
      showToast(t('toastDemoSubmitted'));
      renderAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      state.inboxDraft = {};
      state.justSubmitted = true;
      showToast(t('toastLiveSubmitted'));
      await fetchAllData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      showToast(`${t('toastErrorPrefix')}: ${err.message}`);
    }
  }

  /* ======================== v4.0 INTERACTIVE SVG CODEMAP ======================== */
  function renderCodeMap() {
    const d = state.data;
    const cm = d?.wiring?.codemap;
    const svg = $('codemap-svg');
    const filtersEl = $('codemap-layer-filters');
    const inspectorEl = $('codemap-inspector');
    if (!svg || !filtersEl || !inspectorEl) return;

    const nodes = (cm?.nodes || []).filter((n) => n.layer !== 'tests');
    const edges = cm?.edges || [];
    const sum = cm?.summary || { totalNodes: 0, totalEdges: 0, brokenWireCount: 0, circularCount: 0, layerViolationCount: 0 };

    $('codemap-stats').innerHTML = `${sum.totalNodes} ${esc(t('cmNodesWord'))} · ${sum.totalEdges} ${esc(t('cmEdgesWord'))} · ${sum.matchedWireCount || 0} ${esc(t('cmHttpWiresWord'))} · ${sum.brokenWireCount || 0} ${esc(t('cmBrokenWord'))} · ${sum.circularCount || 0} ${esc(t('cmCyclesShortWord'))}`;

    // Archify & Floorplan toolbar buttons
    const archSlot = $('archify-links-slot');
    const plates = d?.wiring?.archifyPlates || [];
    if (archSlot) {
      archSlot.innerHTML = plates
        .map((pl) => `<a class="btn btn-sm" href="${esc(pl.href)}" target="_blank" rel="noopener">${esc(t('openArchify'))} (${esc(pl.name)})</a>`)
        .join('');
    }
    const fpSlot = $('floorplan-link-slot');
    if (fpSlot) {
      fpSlot.innerHTML = d?.wiring?.hasFloorplan
        ? `<a class="btn btn-sm btn-accent" href="/floorplan/index.html" target="_blank" rel="noopener">${esc(t('floorplanReady'))}</a>`
        : `<span class="pill">${esc(t('floorplanNone'))}</span>`;
    }

    const activeLayers = ['ui', 'api-client', 'routes', 'services', 'database', 'shared'].filter((ly) =>
      nodes.some((n) => n.layer === ly)
    );
    filtersEl.innerHTML = [
      `<button type="button" class="sub-tab-btn ${state.cmLayer === 'all' ? 'active' : ''}" data-cm-layer="all">${esc(t('layerAll'))}</button>`,
      ...activeLayers.map(
        (ly) =>
          `<button type="button" class="sub-tab-btn ${state.cmLayer === ly ? 'active' : ''}" data-cm-layer="${esc(ly)}">${esc(loc(LAYER_META[ly]?.label || ly))}</button>`
      ),
    ].join('');

    filtersEl.querySelectorAll('[data-cm-layer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.cmLayer = btn.dataset.cmLayer;
        renderCodeMap();
      });
    });

    if (nodes.length === 0) {
      svg.setAttribute('viewBox', '0 0 960 360');
      svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" fill="var(--zd-ink-muted)" font-size="14" font-family="var(--zd-font-sans)">${esc(t('cmEmpty'))}</text>`;
      inspectorEl.innerHTML = `<span>${esc(t('cmEmptyHint'))}</span>`;
      return;
    }

    const visibleNodes = state.cmLayer === 'all' ? nodes : nodes.filter((n) => n.layer === state.cmLayer);
    const visibleSet = new Set(visibleNodes.map((n) => n.id));
    const colOrder = ['ui', 'api-client', 'routes', 'services', 'database', 'shared'].filter((ly) =>
      visibleNodes.some((n) => n.layer === ly)
    );

    const colW = 268;
    const nodeW = 218;
    const nodeH = 48;
    const rowGap = 68;
    const startX = 28;
    const startY = 56;

    let maxRows = 1;
    const positions = new Map();
    colOrder.forEach((ly, cIdx) => {
      const colNodes = visibleNodes.filter((n) => n.layer === ly);
      if (colNodes.length > maxRows) maxRows = colNodes.length;
      colNodes.forEach((n, rIdx) => {
        positions.set(n.id, {
          x: startX + cIdx * colW,
          y: startY + rIdx * rowGap,
          node: n,
        });
      });
    });

    const vbW = Math.max(960, startX * 2 + Math.max(0, colOrder.length - 1) * colW + nodeW);
    const vbH = Math.max(360, startY + maxRows * rowGap + 24);
    svg.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Determine highlighted set when a node is selected or searched
    const sel = state.cmSelectedNode;
    const searchQ = state.cmSearch.trim().toLowerCase();
    const connectedSet = new Set();
    if (sel && positions.has(sel)) {
      connectedSet.add(sel);
      for (const e of edges) {
        if (e.from === sel) connectedSet.add(e.to);
        if (e.to === sel) connectedSet.add(e.from);
      }
    }

    const isAr = currentLang() === 'ar';
    const headersSvg = colOrder
      .map((ly, cIdx) => {
        const x = startX + cIdx * colW;
        const meta = LAYER_META[ly] || { label: ly, color: '#556058' };
        const hdrText = isAr ? loc(meta.label) : loc(meta.label).toUpperCase();
        return `<text x="${x + 4}" y="28" fill="var(--zd-ink-muted)" font-size="11.5" font-weight="700" font-family="var(--zd-font-sans)" letter-spacing="${isAr ? '0' : '0.05em'}">${esc(hdrText)}</text>`;
      })
      .join('');

    const edgesSvg = edges
      .filter((e) => visibleSet.has(e.from) && visibleSet.has(e.to))
      .map((e) => {
        const p1 = positions.get(e.from);
        const p2 = positions.get(e.to);
        if (!p1 || !p2) return '';
        const x1 = p1.x + nodeW;
        const y1 = p1.y + nodeH / 2;
        const x2 = p2.x;
        const y2 = p2.y + nodeH / 2;
        const dx = Math.max(40, Math.abs(x2 - x1) * 0.48);
        const dPath = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        const isHttp = e.kind === 'http';
        const isBroken = e.status === 'broken';
        const stroke = isBroken ? '#B91C1C' : isHttp ? '#10B981' : '#8A948C';
        const dash = isBroken ? 'stroke-dasharray="5 4"' : '';
        const isHi = sel && (e.from === sel || e.to === sel);
        const cls = sel ? (isHi ? 'cm-edge highlighted' : 'cm-edge dimmed') : 'cm-edge';
        return `<path d="${dPath}" stroke="${stroke}" ${dash} class="${cls}" />`;
      })
      .join('');

    const degFont = isAr ? 'var(--zd-font-sans)' : 'var(--zd-font-mono)';
    const nodesSvg = [...positions.values()]
      .map(({ x, y, node }) => {
        const meta = LAYER_META[node.layer] || { color: '#556058', bg: '#F3EFE6' };
        const isSelected = sel === node.id;
        const matchesSearch = searchQ && node.id.toLowerCase().includes(searchQ);
        const isDimmed = (sel && !connectedSet.has(node.id)) || (searchQ && !matchesSearch);
        const stroke = isSelected || matchesSearch ? 'var(--zd-olive)' : 'var(--zd-border-strong)';
        const sw = isSelected || matchesSearch ? 2.4 : 1.2;
        const shortLabel = node.label.length > 28 ? `${node.label.slice(0, 26)}…` : node.label;
        const degText = `${t('cmInPrefix')} ${node.inboundCount ?? 0} · ${t('cmOutPrefix')} ${node.outboundCount ?? 0}`;
        return `
          <g class="cm-node ${isDimmed ? 'dimmed' : ''}" data-cm-node="${esc(node.id)}" transform="translate(${x}, ${y})">
            <title>${esc(node.id)}</title>
            <rect width="${nodeW}" height="${nodeH}" rx="10" fill="var(--zd-elevated)" stroke="${stroke}" stroke-width="${sw}" />
            <rect x="0" y="0" width="6" height="${nodeH}" rx="3" fill="${meta.color}" />
            <text x="14" y="20" fill="var(--zd-ink)" font-size="11.5" font-weight="700" font-family="var(--zd-font-mono)">${esc(shortLabel)}</text>
            <text x="14" y="37" fill="var(--zd-ink-muted)" font-size="10.5" font-family="${degFont}">${esc(degText)}</text>
          </g>`;
      })
      .join('');

    svg.innerHTML = `
      <g id="cm-transform-group" transform="translate(${state.cmPanX}, ${state.cmPanY}) scale(${state.cmZoom})">
        ${headersSvg}
        ${edgesSvg}
        ${nodesSvg}
      </g>`;

    $('cm-zoom-reset').textContent = `${Math.round(state.cmZoom * 100)}%`;

    svg.querySelectorAll('[data-cm-node]').forEach((g) => {
      g.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const id = g.dataset.cmNode;
        state.cmSelectedNode = state.cmSelectedNode === id ? null : id;
        renderCodeMap();
      });
    });

    // Inspector bar
    const broken = cm?.diagnostics?.brokenWires || [];
    if (sel && positions.has(sel)) {
      const incoming = edges.filter((e) => e.to === sel).map((e) => e.from);
      const outgoing = edges.filter((e) => e.from === sel).map((e) => e.to);
      inspectorEl.innerHTML = `
        <div>
          <strong class="mono">${esc(sel)}</strong>
          <span style="margin-inline-start:8px;color:var(--zd-ink-muted);">${esc(t('cmBlastRadius'))}: <strong>${incoming.length}</strong> ${esc(t('cmIncomingWord'))} · <strong>${outgoing.length}</strong> ${esc(t('cmOutgoingWord'))}</span>
        </div>
        <button type="button" class="btn btn-sm" id="cm-clear-sel">${esc(t('clearFocusBtn'))}</button>`;
      const clr = $('cm-clear-sel');
      if (clr) clr.addEventListener('click', () => { state.cmSelectedNode = null; renderCodeMap(); });
    } else {
      inspectorEl.innerHTML = `
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span class="pill ${broken.length === 0 ? 'ok' : 'err'}">${broken.length} ${esc(t('brokenWiresWord'))}</span>
          <span class="pill ${(sum.circularCount || 0) === 0 ? 'ok' : 'err'}">${sum.circularCount || 0} ${esc(t('cyclesWord'))}</span>
          <span class="pill ${(sum.layerViolationCount || 0) === 0 ? 'ok' : 'err'}">${sum.layerViolationCount || 0} ${esc(t('layerViolationsWord'))}</span>
        </div>
        <span style="color:var(--zd-ink-muted);">${esc(t('codemapHint'))}</span>`;
    }
  }

  function renderTreeNode(node, query) {
    const q = (query || '').trim().toLowerCase();
    if (node.type === 'file') {
      const badgeLoc = node.badge ? tFileBadge(node.badge) : '';
      const match =
        !q ||
        node.path.toLowerCase().includes(q) ||
        (node.badge || '').toLowerCase().includes(q) ||
        badgeLoc.toLowerCase().includes(q);
      if (!match) return { html: '', count: 0 };
      const isSel = state.selectedFile && state.selectedFile.path === node.path;
      const html = `
        <li>
          <button type="button" class="tree-file-btn ${isSel ? 'selected' : ''}" data-file-path="${esc(node.path)}" data-file-badge="${esc(node.badge || '')}">
            <span style="display:inline-flex;align-items:center;gap:7px;min-width:0;">
              ${SVG.file}
              <bdi dir="ltr" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(node.name)}</bdi>
            </span>
            ${node.badge ? `<span class="pill ${fileBadgeClass(node.badge)}">${esc(badgeLoc)}</span>` : ''}
          </button>
        </li>`;
      return { html, count: 1 };
    }

    const renderedChildren = (node.children || []).map((c) => renderTreeNode(c, q)).filter((r) => r.html);
    const totalMatches = renderedChildren.reduce((acc, r) => acc + r.count, 0);
    if (q && totalMatches === 0 && !node.name.toLowerCase().includes(q)) return { html: '', count: 0 };
    const html = `
      <li>
        <details open>
          <summary class="tree-summary">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              ${SVG.chevron}
              ${SVG.folder}
              <bdi dir="ltr">${esc(node.name)}</bdi>
            </span>
            <span class="pill">${totalMatches}</span>
          </summary>
          <ul class="tree-list">${renderedChildren.map((r) => r.html).join('')}</ul>
        </details>
      </li>`;
    return { html, count: totalMatches };
  }

  function renderWiring() {
    const d = state.data;
    if (!d) return;

    renderCodeMap();

    const insp = $('file-inspector-slot');
    if (state.selectedFile) {
      insp.innerHTML = `
        <div class="file-inspector-bar">
          <div><strong>${esc(t('selectedFile'))}:</strong> <span class="mono">${esc(state.selectedFile.path)}</span></div>
          ${state.selectedFile.badge ? `<span class="pill ${fileBadgeClass(state.selectedFile.badge)}">${esc(tFileBadge(state.selectedFile.badge))}</span>` : ''}
        </div>`;
    } else {
      insp.innerHTML = '';
    }

    const treeData = state.tree || d.wiring.tree;
    const query = ($('tree-search') && $('tree-search').value) || '';
    if (treeData && treeData.children) {
      $('tree-stats').textContent = `${treeData.fileCount || 0} ${t('filesScannedWord')}`;
      const rendered = treeData.children.map((c) => renderTreeNode(c, query)).filter((r) => r.html);
      $('tree-container').innerHTML = rendered.length
        ? `<ul class="tree-list tree-root">${rendered.map((r) => r.html).join('')}</ul>`
        : `<div class="empty-state">${esc(t('noMatchingFiles'))}</div>`;

      $('tree-container').querySelectorAll('[data-file-path]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.selectedFile = { path: btn.dataset.filePath, badge: btn.dataset.fileBadge };
          renderWiring();
        });
      });
    } else {
      $('tree-container').innerHTML = `<div class="empty-state">${esc(t('noWorkspaceFiles'))}</div>`;
    }

    const cq = (($('contracts-search') && $('contracts-search').value) || '').trim().toLowerCase();
    const allRoutes = d.wiring.routes || [];
    const routes = allRoutes.filter(
      (r) => !cq || `${r.id} ${r.method} ${r.path} ${r.auth} ${r.request}`.toLowerCase().includes(cq)
    );

    $('contracts-stats').textContent = `${allRoutes.length} ${t('apiRoutesWord')} · ${(d.wiring.tables || []).length} ${t('dbTablesWord')}`;
    if (allRoutes.length === 0) {
      $('contracts-routes-container').innerHTML = `<div class="empty-state">${esc(t('contractsEmptyStage3'))}</div>`;
    } else {
      $('contracts-routes-container').innerHTML = routes.length
        ? routes
            .map((r) => {
              const isPub = String(r.auth || '').toUpperCase().startsWith('PUBLIC');
              return `
                <div style="padding:12px 14px;border-radius:12px;background:var(--zd-surface);border:1px solid var(--zd-border);margin-bottom:9px;">
                  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:center;">
                    <div style="display:inline-flex;align-items:center;gap:8px;min-width:0;">
                      <span class="pill ${methodBadgeClass(r.method)}">${esc(r.method)}</span>
                      <strong class="mono">${esc(r.path)}</strong>
                    </div>
                    <span class="pill ${isPub ? 'warn' : 'ok'}">${esc(r.auth)}</span>
                  </div>
                  <div class="ltr-block" style="font-size:12px;color:var(--zd-ink-muted);margin-top:7px;">
                    <strong>${esc(t('reqLabel'))}:</strong> <span class="mono">${esc(r.request)}</span> · <strong>${esc(t('resLabel'))}:</strong> <span class="mono">${esc(r.response)}</span>
                  </div>
                </div>`;
            })
            .join('')
        : `<div class="empty-state">${esc(t('noMatchingRoutes'))}</div>`;
    }

    const allTables = d.wiring.tables || [];
    const tables = allTables.filter(
      (tb) => !cq || `${tb.table} ${tb.columns} ${tb.constraints}`.toLowerCase().includes(cq)
    );
    $('contracts-tables-container').innerHTML = tables.length
      ? `<div class="table-wrap"><table><thead><tr><th>${esc(t('thTable'))}</th><th>${esc(t('thPk'))}</th><th>${esc(t('thColumns'))}</th><th>${esc(t('thConstraints'))}</th></tr></thead><tbody>${tables
          .map(
            (tb) =>
              `<tr><td class="mono col-nowrap"><strong>${esc(tb.table)}</strong></td><td class="mono col-nowrap">${esc(tb.pk)}</td><td class="ltr-block" style="font-size:12px;">${esc(tb.columns)}</td><td class="ltr-block" style="font-size:12px;">${esc(tb.constraints)}</td></tr>`
          )
          .join('')}</tbody></table></div>`
      : `<div style="font-size:13px;color:var(--zd-ink-muted);">${esc(allTables.length > 0 && cq ? t('noMatchingTables') : t('contractsEmptyStage3'))}</div>`;
  }

  /* ======================== v4.0 UI/UX & TYPOGRAPHY SHOWCASE ======================== */
  function renderShowcase() {
    const d = state.data;
    const sc = d?.design?.showcase;
    const layoutsEl = $('showcase-layouts-grid');
    const fontsEl = $('showcase-fonts-row');
    const palettesEl = $('showcase-palette-pills');
    const frameEl = $('showcase-preview-frame');
    if (!sc || !layoutsEl || !fontsEl || !frameEl) return;

    const layouts = sc.layouts || [];
    const fonts = sc.fontPairings || [];
    const palettes = sc.palettes || [];

    const activeLayout = layouts.find((l) => l.id === state.scLayout) || layouts[0];
    const activeFont = fonts.find((f) => f.id === state.scFont) || fonts[0];
    const activePalette = palettes.find((p) => p.id === state.scPalette) || palettes[0];
    if (activeFont?.googleFontsUrl) loadGoogleFontGracefully(activeFont.googleFontsUrl);

    layoutsEl.innerHTML = layouts
      .map(
        (l) => `
        <button type="button" class="showcase-choice ${l.id === activeLayout?.id ? 'active' : ''}" data-sc-layout="${esc(l.id)}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;width:100%;">
            <strong>${esc(loc(l.name))}</strong>
            ${l.recommended ? `<span class="pill ok">${esc(t('recommended'))}</span>` : ''}
          </div>
          <span style="font-size:12px;color:var(--zd-ink-muted);">${esc(loc(l.tagline))}</span>
        </button>`
      )
      .join('');

    fontsEl.innerHTML = fonts
      .map(
        (f) => `
        <button type="button" class="font-pill-btn ${f.id === activeFont?.id ? 'active' : ''}" data-sc-font="${esc(f.id)}">
          <span class="ltr-inline" style="font-family:inherit;">${esc(f.label)}</span>
          <span class="font-vibe">${esc(loc(f.vibe))}</span>
        </button>`
      )
      .join('');

    palettesEl.innerHTML = palettes
      .map(
        (p) => `
        <button type="button" class="btn btn-sm ${p.id === activePalette?.id ? 'btn-primary' : ''}" data-sc-palette="${esc(p.id)}">
          <span style="width:12px;height:12px;border-radius:4px;background:${esc(p.primary)};border:1px solid rgba(255,255,255,0.4);"></span>
          <span>${esc(loc(p.name))}</span>
        </button>`
      )
      .join('');

    const dir = state.scDir || (currentLang() === 'ar' ? 'rtl' : 'ltr');
    const isAr = dir === 'rtl';
    const dark = state.scDark || activePalette?.id === 'obsidian-emerald';
    const bgCanvas = dark ? '#0F1412' : activePalette?.canvas || '#FBF9F5';
    const bgSurface = dark ? '#18211E' : activePalette?.surface || '#F3EFE6';
    const primary = dark ? '#34D399' : activePalette?.primary || '#243324';
    const onPrimary = dark ? '#08150F' : '#FBF9F5';
    const ink = dark ? '#EEF3F0' : activePalette?.ink || '#1C241E';
    const muted = dark ? '#9AA9A1' : '#556058';
    const fontFamily = activeFont?.cssStack || 'var(--zd-font-sans)';
    const layoutId = activeLayout?.id || 'editorial-calm';

    const copy = isAr
      ? {
          brand: 'نظام العيادات',
          nav: ['ملخص الأداء', 'المواعيد', 'الفواتير', 'سجل الحركات'],
          cta: '+ حجز جديد',
          kpis: [
            ['إيراد اليوم', 'EGP 28,450'],
            ['حجوزات اليوم', '42'],
            ['فواتير معلّقة', '3'],
          ],
          cols: ['الرقم', 'المريض', 'القسم', 'المبلغ', 'الحالة', 'إجراء'],
          rows: [
            ['INV-401', 'أحمد منصور', 'الباطنة', 'EGP 650.00', 'مدفوعة'],
            ['INV-402', 'سارة إبراهيم', 'الأسنان', 'EGP 1,400.00', 'قيد المراجعة'],
          ],
          action: 'التفاصيل',
          quickPh: 'ابحث برقم الملف أو اسم المريض...',
        }
      : {
          brand: 'NexusCare Desk',
          nav: ['Overview', 'Schedule', 'Invoices', 'Activity Log'],
          cta: '+ New Booking',
          kpis: [
            ['Today Revenue', 'EGP 28,450'],
            ['Appointments', '42'],
            ['Pending Claims', '3'],
          ],
          cols: ['Ref', 'Patient', 'Department', 'Amount', 'Status', 'Action'],
          rows: [
            ['INV-401', 'Ahmed Mansour', 'Internal Med', 'EGP 650.00', 'Paid'],
            ['INV-402', 'Sara Ibrahim', 'Dental', 'EGP 1,400.00', 'Pending'],
          ],
          action: 'Details',
          quickPh: 'Search patient name or file ID...',
        };

    const navHtml =
      layoutId === 'executive-dense'
        ? `<aside class="mini-app-sidebar" style="background:${bgSurface};">
            <strong style="margin-bottom:6px;color:${primary};">${esc(copy.brand)}</strong>
            ${copy.nav
              .map(
                (item, idx) =>
                  `<span style="padding:7px 10px;border-radius:8px;font-size:12px;font-weight:650;${idx === 0 ? `background:${primary};color:${onPrimary};` : `color:${muted};`}">${esc(item)}</span>`
              )
              .join('')}
          </aside>`
        : `<div class="mini-app-topnav ${layoutId === 'modern-glass' ? 'glass-nav' : ''}" style="background:${bgSurface};">
            <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
              <strong style="color:${primary};">${esc(copy.brand)}</strong>
              <div style="display:flex;gap:10px;font-size:12px;font-weight:600;color:${muted};">
                ${copy.nav.map((item, idx) => `<span style="${idx === 0 ? `color:${ink};font-weight:750;` : ''}">${esc(item)}</span>`).join('')}
              </div>
            </div>
            <span style="padding:5px 11px;border-radius:9px;background:${primary};color:${onPrimary};font-size:11.5px;font-weight:700;">${esc(copy.cta)}</span>
          </div>`;

    const bodyHtml = `
      <div class="mini-app-body">
        <div class="mini-kpi-row">
          ${copy.kpis
            .map(
              ([lbl, val]) => `
              <div class="mini-kpi-box" style="background:${bgSurface};">
                <div style="font-size:11px;color:${muted};font-weight:650;">${esc(lbl)}</div>
                <div style="font-size:19px;font-weight:800;margin-top:3px;font-variant-numeric:tabular-nums;"><bdi dir="ltr">${esc(val)}</bdi></div>
              </div>`
            )
            .join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          <input id="showcase-quick-input" name="showcaseQuickInput" aria-label="Preview search" readonly value="${esc(copy.quickPh)}" style="flex:1 1 120px;min-width:0;padding:7px 10px;border-radius:9px;border:1px solid rgba(128,128,128,0.28);background:${bgSurface};color:${muted};font-family:inherit;font-size:12px;" />
          <span style="padding:7px 12px;border-radius:9px;background:${primary};color:${onPrimary};font-size:12px;font-weight:700;white-space:nowrap;">${esc(copy.cta)}</span>
        </div>
        <div class="mini-table-wrap" style="background:${bgSurface};">
          <table>
            <thead>
              <tr>
                ${copy.cols.map((c, idx) => `<th class="${idx === copy.cols.length - 1 ? 'sticky-action' : ''}" style="background:${bgSurface};color:${muted};">${esc(c)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${copy.rows
                .map(
                  (row) => `
                  <tr>
                    <td class="mono col-nowrap">${esc(row[0])}</td>
                    <td><strong>${esc(row[1])}</strong></td>
                    <td>${esc(row[2])}</td>
                    <td class="mono col-nowrap" style="font-variant-numeric:tabular-nums;">${esc(row[3])}</td>
                    <td><span class="pill ok">${esc(row[4])}</span></td>
                    <td class="sticky-action" style="background:${bgSurface};"><span style="padding:4px 9px;border-radius:7px;background:${primary};color:${onPrimary};font-size:11px;font-weight:700;">${esc(copy.action)}</span></td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>`;

    frameEl.innerHTML = `
      <div dir="${dir}" class="mini-app-shell layout-${esc(layoutId)}" style="background:${bgCanvas};color:${ink};font-family:${fontFamily};">
        ${layoutId === 'executive-dense' ? `${navHtml}${bodyHtml}` : `<div style="display:flex;flex-direction:column;">${navHtml}${bodyHtml}</div>`}
      </div>`;

    layoutsEl.querySelectorAll('[data-sc-layout]').forEach((b) =>
      b.addEventListener('click', () => { state.scLayout = b.dataset.scLayout; renderDesign(); })
    );
    fontsEl.querySelectorAll('[data-sc-font]').forEach((b) =>
      b.addEventListener('click', () => { state.scFont = b.dataset.scFont; renderDesign(); })
    );
    palettesEl.querySelectorAll('[data-sc-palette]').forEach((b) =>
      b.addEventListener('click', () => { state.scPalette = b.dataset.scPalette; state.scDark = b.dataset.scPalette === 'obsidian-emerald'; renderDesign(); })
    );
  }

  function renderDesign() {
    const d = state.data;
    if (!d) return;

    renderShowcase();

    const tokens = d.design.tokens || {};
    const palette = tokens.palette || {};
    const violations = d.design.driftViolations || [];

    $('tokens-meta').innerHTML = `<bdi dir="ltr">${esc(tokens.themeName || t('tokensTitle'))}</bdi> · ${esc(t('strictLabel'))}: ${esc(tokens.strictPaletteOnly ? t('strictOn') : t('strictForbiddenOnly'))}`;

    const badge = $('token-drift-badge');
    if (violations.length === 0) {
      badge.textContent = `${t('tokenClean')} (0)`;
      badge.className = 'pill ok';
      $('token-drift-violations').innerHTML = '';
    } else {
      badge.textContent = `${violations.length} ${t('tokenViolations')}`;
      badge.className = 'pill err';
      $('token-drift-violations').innerHTML = `<div class="table-wrap"><table><thead><tr><th>${esc(t('thFile'))}</th><th>${esc(t('thLine'))}</th><th>${esc(t('thColor'))}</th><th>${esc(t('thReason'))}</th></tr></thead><tbody>${violations
        .map(
          (v) =>
            `<tr><td class="mono col-nowrap">${esc(v.file)}</td><td class="mono col-nowrap">${esc(v.line)}</td><td class="mono col-nowrap"><strong>${esc(v.color)}</strong></td><td class="ltr-block">${esc(v.reason)}</td></tr>`
        )
        .join('')}</tbody></table></div>`;
    }

    const entries = Object.entries(palette);
    $('swatch-grid').innerHTML = entries.length
      ? entries
          .map(
            ([name, hex]) => `
            <button type="button" class="swatch-card" data-copy-hex="${esc(hex)}" title="${esc(t('copyPrefix'))} ${esc(hex)}">
              <div class="swatch-color" style="background:${esc(hex)};"></div>
              <div class="swatch-meta">
                <div style="font-weight:700;" class="ltr-block">${esc(name)}</div>
                <div class="swatch-hex">${esc(hex)}</div>
              </div>
            </button>`
          )
          .join('')
      : `<div class="empty-state">${esc(t('noTokens'))}</div>`;

    $('swatch-grid').querySelectorAll('[data-copy-hex]').forEach((el) => {
      el.addEventListener('click', () => {
        const hex = el.dataset.copyHex;
        if (navigator.clipboard) navigator.clipboard.writeText(hex).catch(() => {});
        showToast(`${t('toastCopiedHex')} ${hex}`);
      });
    });

    const forbidden = tokens.forbiddenColors || [];
    $('forbidden-colors-container').innerHTML = forbidden.length
      ? `<div style="display:flex;flex-wrap:wrap;gap:8px;">${forbidden
          .map(
            (hex) =>
              `<span class="banned-chip"><span style="width:12px;height:12px;border-radius:3px;background:${esc(hex)};border:1px solid currentColor;"></span><bdi dir="ltr">${esc(hex)}</bdi></span>`
          )
          .join('')}</div>`
      : `<div style="font-size:13px;color:var(--zd-ink-muted);">${esc(t('noForbidden'))}</div>`;

    const typo = tokens.typography || {};
    const dir = tokens.directionality || {};
    const copy = d.design.copyStyle || {};
    $('typography-preview').innerHTML = `
      <div style="padding:14px;border-radius:12px;background:var(--zd-surface);border:1px solid var(--zd-border);">
        <div style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--zd-ink-muted);">${esc(t('copyStyleLockTitle'))}</div>
        ${copy.tone ? `<div style="font-size:12.5px;margin:8px 0;">${esc(t('voiceLabel'))}: <bdi dir="ltr">${esc(copy.tone.voice || '')}</bdi> · ${esc(t('numeralsLabel'))}: <span class="mono">${esc(copy.locales?.numeralStyle || 'western-0-9')}</span></div>` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <span class="pill ok">${esc(t('tabularLabel'))}: ${esc(typo.tabularNumerals ? t('onWord') : t('offWord'))}</span>
          <span class="pill ok">${esc(t('rtlParityLabel'))}: ${esc(dir.supportsRtl ? t('enabledWord') : 'LTR')}</span>
          <span class="pill ok">${esc(t('logicalCssLabel'))}: ${esc(dir.logicalCssOnly ? t('enforcedWord') : t('standardWord'))}</span>
        </div>
      </div>`;

    const activeFont = (d.design.showcase?.fontPairings || []).find((f) => f.id === state.scFont);
    const specFont = activeFont?.cssStack || 'var(--zd-font-sans)';
    $('component-preview').innerHTML = `
      <div style="padding:16px;border-radius:14px;background:var(--zd-surface);border:1px solid var(--zd-border);font-family:${specFont};display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
          <strong class="ltr-inline">${esc(activeFont?.label || 'IBM Plex Sans Arabic + Plus Jakarta Sans')}</strong>
          <span class="pill ok">Tabular 0-9</span>
        </div>
        <div style="font-size:22px;font-weight:800;line-height:1.25;">لوحة التحكم المالية · Financial Clarity</div>
        <div style="font-size:13.5px;color:var(--zd-ink-muted);">سجل الحركات وخطوات الموافقة بوضوح تام — Clean bilingual rhythm with zero clipped actions.</div>
        <div style="font-size:18px;font-weight:750;font-variant-numeric:tabular-nums;" class="ltr-block">EGP 1,245,890.00 · 0123456789 · 2026-11-21</div>
      </div>`;
  }

  function applyMemorySubView() {
    document.querySelectorAll('[data-mem-view]').forEach((btn) => {
      const active = btn.dataset.memView === state.memoryView;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    const topGrid = $('mem-top-grid');
    if (topGrid) {
      topGrid.style.gridTemplateColumns =
        state.memoryView === 'rules' || state.memoryView === 'regressions' ? '1fr' : '';
    }
    document.querySelectorAll('[data-mem-section]').forEach((sec) => {
      const show = state.memoryView === 'all' || sec.dataset.memSection === state.memoryView;
      sec.style.display = show ? '' : 'none';
    });
  }

  function renderMemory() {
    const d = state.data;
    if (!d) return;

    const rq = (($('rules-search') && $('rules-search').value) || '').trim().toLowerCase();
    const rules = (d.memory.lockedRules || []).filter(
      (r) => !rq || `${r.id} ${r.category} ${r.rule}`.toLowerCase().includes(rq)
    );
    $('rules-tbody').innerHTML = rules.length
      ? rules
          .map(
            (r) => `
            <tr>
              <td class="mono col-nowrap"><strong>${esc(r.id)}</strong></td>
              <td class="col-nowrap"><span class="pill">${esc(tCategory(r.category))}</span></td>
              <td class="ltr-block">${esc(r.rule)}</td>
              <td class="col-nowrap"><span class="pill ${esc(r.status)}">${esc(tStatus(r.status))}</span></td>
            </tr>`
          )
          .join('')
      : `<tr><td colspan="4" style="color:var(--zd-ink-muted);">${esc(t('noMatchingRules'))}</td></tr>`;

    const sev = ($('regression-severity-filter') && $('regression-severity-filter').value) || 'ALL';
    const bq = (($('regression-search') && $('regression-search').value) || '').trim().toLowerCase();
    const bugs = (d.memory.regressions || []).filter((b) => {
      if (sev !== 'ALL' && b.severity !== sev) return false;
      if (!bq) return true;
      return JSON.stringify(b).toLowerCase().includes(bq);
    });

    $('regression-list').innerHTML = bugs.length
      ? bugs
          .map(
            (b) => `
            <div class="regression-card">
              <div class="regression-head">
                <div class="ltr-block"><strong class="mono">${esc(b.id)}</strong> · ${esc(b.symptom)}</div>
                <div class="regression-badges">
                  <span class="pill ${esc(b.severity)}">${esc(b.severity)}</span>
                  <span class="pill">${esc(t('recurrence'))}: ${esc(b.recurrenceCount ?? 0)}</span>
                </div>
              </div>
              <div style="font-size:12.5px;margin-top:8px;"><strong>${esc(t('rootCause'))}:</strong> <bdi dir="ltr">${esc(b.rootCause)}</bdi></div>
              <div style="font-size:12.5px;margin-top:5px;color:var(--zd-ok-ink);"><strong>${esc(t('protectedInvariant'))}:</strong> <bdi dir="ltr">${esc(b.invariantToProtect)}</bdi></div>
              <div style="font-size:11.5px;color:var(--zd-ink-muted);margin-top:7px;" class="ltr-block">
                <span class="mono">${(b.filesTouched || []).map(esc).join(', ')}</span> · <span class="mono">${esc(b.regressionTestRef || '-')}</span>
              </div>
            </div>`
          )
          .join('')
      : `<div class="empty-state">${esc(t('noRegressions'))}</div>`;

    const checkpoints = d.memory.checkpoints || [];
    const cpCountPill = $('checkpoints-count-pill');
    if (cpCountPill) cpCountPill.textContent = `${checkpoints.length} ${t('checkpointsWord')}`;
    const cpContainer = $('checkpoints-container');
    if (cpContainer) {
      cpContainer.innerHTML = checkpoints.length
        ? `<div class="timeline-list">${checkpoints
            .slice()
            .reverse()
            .map(
              (cp) => `
              <div class="timeline-item">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <strong class="mono">${esc(cp.id)}</strong>
                    <span class="ltr-inline" style="font-family:var(--zd-font-sans);font-weight:700;">${esc(cp.label)}</span>
                    <span class="pill">${esc(cp.dirtyFilesCount ?? 0)} ${esc(t('dirtyWord'))}</span>
                  </div>
                  <div style="font-size:12px;color:var(--zd-ink-muted);margin-top:4px;" class="ltr-block">
                    <span class="mono">${esc((cp.timestamp || '').slice(0, 16).replace('T', ' '))}</span> · <span class="mono">${esc(cp.gitTag || cp.gitHead || 'local')}</span>
                  </div>
                </div>
                <button type="button" class="btn btn-sm" data-copy-rollback="${esc(cp.rollbackCommand || '')}">${esc(t('copyRollback'))}</button>
              </div>`
            )
            .join('')}</div>`
        : `<div class="empty-state">${esc(t('noCheckpoints'))}</div>`;

      cpContainer.querySelectorAll('[data-copy-rollback]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const cmd = btn.dataset.copyRollback;
          if (navigator.clipboard && cmd) navigator.clipboard.writeText(cmd).catch(() => {});
          showToast(t('toastRollbackCopied'));
        });
      });
    }

    const skills = d.memory.learnedSkills || [];
    $('learned-skills-container').innerHTML = skills.length
      ? `<div class="grid-2">${skills
          .map(
            (sk) => `
            <div style="padding:15px;border-radius:12px;background:var(--zd-surface);border:1px solid var(--zd-border);">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
                <h3 class="mono" style="margin:0;font-size:13.5px;font-weight:750;">${esc(sk.fileName)}</h3>
                <span class="pill ok">${esc(sk.domain || 'project-skill')}</span>
              </div>
              <div class="md-body ltr-block">${renderSimpleMarkdown(sk.content).html}</div>
            </div>`
          )
          .join('')}</div>`
      : `<div class="empty-state">${esc(t('noSkills'))}</div>`;

    applyMemorySubView();
  }

  function renderSourceCell(src) {
    const raw = String(src || '').trim();
    if (/^https?:\/\//i.test(raw)) {
      return `<a class="link-ext ltr-inline" href="${esc(raw)}" target="_blank" rel="noopener noreferrer">${esc(raw)}</a>`;
    }
    return `<span class="ltr-block">${esc(raw)}</span>`;
  }

  function renderHub() {
    const d = state.data;
    if (!d) return;

    const sq = (($('sources-search') && $('sources-search').value) || '').trim().toLowerCase();
    const sources = (d.hub.sources || []).filter((s) => !sq || JSON.stringify(s).toLowerCase().includes(sq));
    $('sources-tbody').innerHTML = sources.length
      ? sources
          .map(
            (s) => `
            <tr>
              <td class="mono col-nowrap"><strong>${esc(s.ref)}</strong></td>
              <td class="ltr-block"><strong>${esc(s.standard)}</strong></td>
              <td style="font-size:12px;">${renderSourceCell(s.source)}</td>
              <td class="ltr-block">${esc(s.rule)}</td>
              <td class="mono col-nowrap">${esc(s.modules)}</td>
              <td class="col-nowrap"><span class="pill ${esc(s.status)}">${esc(tStatus(s.status))}</span></td>
            </tr>`
          )
          .join('')
      : `<tr><td colspan="6" style="color:var(--zd-ink-muted);">${esc(t('noSources'))}</td></tr>`;

    const sec = d.hub.security || { p0: 0, p1: 0, verdict: 'PENDING', controls: [] };
    $('security-pills').innerHTML = `
      <span class="pill ${sec.p0 === 0 ? 'ok' : 'err'}">P0: ${esc(sec.p0)}</span>
      <span class="pill ${sec.p1 === 0 ? 'ok' : 'err'}">P1: ${esc(sec.p1)}</span>
      <span class="pill ${sec.verdict === 'PASS' ? 'ok' : 'warn'}">${esc(t('verdictLabel'))}: ${esc(tStatus(sec.verdict))}</span>`;

    $('security-controls-container').innerHTML = (sec.controls || []).length
      ? `<div class="table-wrap"><table><thead><tr><th>#</th><th>${esc(t('thControl'))}</th><th>${esc(t('thStatus'))}</th><th>${esc(t('thEvidence'))}</th></tr></thead><tbody>${sec.controls
          .map(
            (c) =>
              `<tr><td class="mono col-nowrap">${esc(c.num)}</td><td class="ltr-block">${esc(c.control)}</td><td class="col-nowrap"><span class="pill ${esc(c.status)}">${esc(tStatus(c.status))}</span></td><td class="mono" style="font-size:12px;">${esc(c.evidence)}</td></tr>`
          )
          .join('')}</tbody></table></div>`
      : `<div style="font-size:13px;color:var(--zd-ink-muted);">${esc(t('noSecControls'))}</div>`;

    const renderedGuide = renderSimpleMarkdown(d.hub.handoverMarkdown || '', { collectToc: true });
    $('handover-container').innerHTML = `<div class="ltr-block">${renderedGuide.html}</div>`;
    const tocEl = $('handover-toc');
    if (tocEl) {
      tocEl.innerHTML = renderedGuide.toc.length
        ? renderedGuide.toc.map((item) => `<a href="#${esc(item.id)}" class="ltr-block">${esc(item.label)}</a>`).join('')
        : `<span style="font-size:12px;color:var(--zd-ink-muted);">${esc(t('guideSections'))}</span>`;
    }
  }

  function renderAll() {
    renderCommandCenter();
    renderInbox();
    renderWiring();
    renderDesign();
    renderMemory();
    renderHub();
  }

  async function fetchAllData() {
    if (state.isExportMode) {
      state.data = window.__ZERODRIFT_DATA__;
      state.tree = state.data.wiring ? state.data.wiring.tree : null;
      if (!state.lang && state.data.defaultLocale) state.lang = state.data.defaultLocale;
      if (state.data.design?.showcase) {
        state.scLayout = state.data.design.showcase.selectedLayout || state.scLayout;
        state.scFont = state.data.design.showcase.selectedFontPairing || state.scFont;
        state.scPalette = state.data.design.showcase.selectedPalette || state.scPalette;
      }
      $('live-indicator').classList.toggle('offline', !state.data.demoMode);
      $('live-indicator-text').textContent = state.data.demoMode ? t('interactiveDemo') : t('portableHtml');
      applyPreferences();
      return;
    }

    try {
      const [stateRes, treeRes] = await Promise.all([fetch('/api/state'), fetch('/api/tree')]);
      state.data = await stateRes.json();
      state.tree = await treeRes.json();
      if (!state.lang && state.data.defaultLocale) state.lang = state.data.defaultLocale;
      if (state.data.design?.showcase) {
        state.scLayout = state.data.design.showcase.selectedLayout || state.scLayout;
        state.scFont = state.data.design.showcase.selectedFontPairing || state.scFont;
        state.scPalette = state.data.design.showcase.selectedPalette || state.scPalette;
      }
      applyPreferences();
    } catch (err) {
      showToast(`${t('toastRefreshError')}: ${err.message}`);
    }
  }

  function connectSSE() {
    if (state.isExportMode || typeof EventSource === 'undefined') return;
    const ind = $('live-indicator');
    const txt = $('live-indicator-text');
    const es = new EventSource('/api/events');
    state.eventSource = es;

    es.onopen = () => {
      ind.classList.remove('offline');
      txt.textContent = t('liveSse');
    };
    es.addEventListener('update', () => fetchAllData());
    es.onerror = () => {
      ind.classList.add('offline');
      txt.textContent = t('reconnecting');
    };
  }

  function bindEvents() {
    document.querySelectorAll('.nav-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        document.querySelectorAll('.nav-tab').forEach((b) => {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        document.querySelectorAll('.tab-panel').forEach((panel) => {
          panel.classList.toggle('active', panel.id === `panel-${target}`);
        });
      });
    });

    const appBtn = $('appearance-btn');
    const appPop = $('appearance-popover');
    const closePop = () => {
      appPop.classList.remove('open');
      appBtn.setAttribute('aria-expanded', 'false');
    };
    appBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !appPop.classList.contains('open');
      appPop.classList.toggle('open', willOpen);
      appBtn.setAttribute('aria-expanded', String(willOpen));
    });
    appPop.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', closePop);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePop();
    });

    document.querySelectorAll('[data-theme-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.theme = btn.dataset.themeOpt;
        localStorage.setItem('zd-theme', state.theme);
        applyPreferences();
      });
    });

    $('brightness-slider').addEventListener('input', (e) => {
      state.tone = Number(e.target.value);
      localStorage.setItem('zd-tone', String(state.tone));
      applyPreferences();
    });

    $('lang-toggle').addEventListener('click', () => {
      state.lang = currentLang() === 'en' ? 'ar' : 'en';
      localStorage.setItem('zd-lang', state.lang);
      localStorage.setItem('zd-lang-manual', '1');
      applyPreferences();
      if (state.isExportMode && state.data) {
        $('live-indicator-text').textContent = state.data.demoMode ? t('interactiveDemo') : t('portableHtml');
      }
    });

    $('refresh-btn').addEventListener('click', () => {
      fetchAllData();
      showToast(t('toastRefreshed'));
    });

    $('copy-resume-btn').addEventListener('click', () => {
      const msg = currentLang() === 'ar'
        ? 'تم — حفظت إجاباتي في ZeroDrift Studio (.zerodrift/studio-outbox.json)، تقدر تكمل الآن.'
        : 'continue — I saved my ZeroDrift Studio decisions in .zerodrift/studio-outbox.json.';
      if (navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});
      showToast(t('toastResumeCopied'));
    });

    $('copy-handoff-btn').addEventListener('click', async () => {
      try {
        let prompt = state.data?.handoff?.resumePrompt || '';
        if (!state.isExportMode) {
          const res = await fetch('/api/handoff');
          const json = await res.json();
          if (res.ok && json.resumePrompt) prompt = json.resumePrompt;
        }
        if (!prompt) {
          prompt = 'Resume ZeroDrift project cleanly: read .zerodrift/HANDOFF.md, .zerodrift/STATE.md, .zerodrift/CONTRACTS.md, and .zerodrift/memory/LOCKED-RULES.md.';
        }
        if (navigator.clipboard) navigator.clipboard.writeText(prompt).catch(() => {});
        showToast(t('toastHandoffCopied'));
      } catch (err) {
        showToast(`${t('toastErrorPrefix')}: ${err.message}`);
      }
    });

    // CodeMap zoom, pan & search
    $('cm-zoom-in').addEventListener('click', () => {
      state.cmZoom = Math.min(1.6, Number((state.cmZoom + 0.15).toFixed(2)));
      renderCodeMap();
    });
    $('cm-zoom-out').addEventListener('click', () => {
      state.cmZoom = Math.max(0.55, Number((state.cmZoom - 0.15).toFixed(2)));
      renderCodeMap();
    });
    $('cm-zoom-reset').addEventListener('click', () => {
      state.cmZoom = 1;
      state.cmPanX = 0;
      state.cmPanY = 0;
      state.cmSelectedNode = null;
      renderCodeMap();
    });
    $('codemap-search').addEventListener('input', (e) => {
      state.cmSearch = e.target.value;
      renderCodeMap();
    });

    const vp = $('codemap-viewport');
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    vp.addEventListener('pointerdown', (e) => {
      if (e.target.closest('[data-cm-node]')) return;
      dragging = true;
      dragStartX = e.clientX - state.cmPanX;
      dragStartY = e.clientY - state.cmPanY;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      state.cmPanX = e.clientX - dragStartX;
      state.cmPanY = e.clientY - dragStartY;
      const g = $('cm-transform-group');
      if (g) g.setAttribute('transform', `translate(${state.cmPanX}, ${state.cmPanY}) scale(${state.cmZoom})`);
    });
    window.addEventListener('pointerup', () => { dragging = false; });

    // Design Showcase toggles & 1-click Gate 4 lock
    $('showcase-mode-toggle').addEventListener('click', () => {
      state.scDark = !state.scDark;
      renderShowcase();
    });
    $('showcase-dir-toggle').addEventListener('click', () => {
      const cur = state.scDir || (currentLang() === 'ar' ? 'rtl' : 'ltr');
      state.scDir = cur === 'rtl' ? 'ltr' : 'rtl';
      renderShowcase();
    });
    $('lock-design-btn').addEventListener('click', async () => {
      const sc = state.data?.design?.showcase || {};
      const font = (sc.fontPairings || []).find((f) => f.id === state.scFont);
      const pal = (sc.palettes || []).find((p) => p.id === state.scPalette);
      const body = {
        layoutId: state.scLayout,
        fontPairingId: state.scFont,
        paletteId: state.scPalette,
        typography: font ? { arabicFont: font.arabicFont, latinFont: font.latinFont } : undefined,
        palette: pal ? { canvas: pal.canvas, surface: pal.surface, brandPrimary: pal.primary, brandAccent: pal.accent, inkPrimary: pal.ink } : undefined,
      };
      if (state.isExportMode) {
        if (state.data?.demoMode) {
          state.data.outbox = state.data.outbox || { submissions: [] };
          state.data.outbox.submissions.push({
            batchId: 'GATE-4-DESIGN-LOCK',
            gateDecision: 'APPROVE',
            answers: { layoutConcept: state.scLayout, fontPairing: state.scFont, palette: state.scPalette },
            submittedAt: new Date().toISOString(),
          });
          showToast(t('toastDesignLocked'));
          renderInbox();
        } else {
          showToast(t('toastReadOnly'));
        }
        return;
      }
      try {
        const res = await fetch('/api/design-lock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('Design lock failed');
        showToast(t('toastDesignLocked'));
        await fetchAllData();
      } catch (err) {
        showToast(`${t('toastErrorPrefix')}: ${err.message}`);
      }
    });

    document.querySelectorAll('[data-mem-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.memoryView = btn.dataset.memView;
        applyMemorySubView();
      });
    });

    $('add-rule-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const category = $('rule-category').value;
      const rule = $('rule-text').value.trim();
      if (!rule) return;
      if (state.isExportMode) {
        if (state.data && state.data.demoMode) {
          const nextId = `RULE-${String((state.data.memory.lockedRules || []).length + 1).padStart(3, '0')}`;
          state.data.memory.lockedRules.push({ id: nextId, category, rule, status: 'ACTIVE' });
          $('rule-text').value = '';
          showToast(`${nextId} — ${t('toastRuleLocked')}`);
          renderAll();
        } else {
          showToast(t('toastReadOnly'));
        }
        return;
      }
      try {
        const res = await fetch('/api/rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, rule }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to add rule');
        $('rule-text').value = '';
        showToast(`${json.ruleId} — ${t('toastRuleLocked')}`);
        await fetchAllData();
      } catch (err) {
        showToast(`${t('toastErrorPrefix')}: ${err.message}`);
      }
    });

    ['tree-search', 'contracts-search'].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener('input', renderWiring);
    });

    ['rules-search', 'regression-search', 'regression-severity-filter'].forEach((id) => {
      const el = $(id);
      if (el) {
        el.addEventListener('input', renderMemory);
        el.addEventListener('change', renderMemory);
      }
    });

    const srcSearch = $('sources-search');
    if (srcSearch) srcSearch.addEventListener('input', renderHub);
  }

  applyPreferences();
  bindEvents();
  fetchAllData();
  connectSSE();
})();
