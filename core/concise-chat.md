# Core Law 10: Token-Saving Concise Chat & Studio-First Reporting

> **Prime Directive:** Chat is a control channel, not a dump of raw Markdown walls. Keep every routine chat message razor-sharp (**5–8 lines max**) while writing full structured details into `.zerodrift/` and refreshing **ZeroDrift Studio** so the user reads them cleanly in the browser.

---

## 1. The 5–8 Line Routine Chat Budget

During normal stage transitions, Gate prompts, vertical slice completions, and verification summaries, structure every chat response in **4 compact parts (max 5–8 lines total)**:

1. **Completed (1–2 crisp bullets):** Exact milestone or slice finished.
2. **Deterministic Verification Badge:** `PASS` / `FAIL` + exact counts (e.g., `tsc 0 | tests 14/14 | token-drift 0 | security 0 P0/P1`).
3. **ZeroDrift Studio Pointer:** Direct local URL (`http://127.0.0.1:<port>`) + exact tab to open (e.g., `Decision Inbox`, `Map & Contracts`, `Design & Tokens`).
4. **Single Next Action:** One unmistakable prompt telling the user what to do next (e.g., *"Approve Gate 3 in Studio, then type `continue` here"*).

---

## 2. Strictly Forbidden Chat Bloat

Unless the user **explicitly asks** to inspect, read, or explain full details directly inside chat:
- **NEVER** paste full PRDs, full `CONTRACTS.md` route tables, multi-page security audit matrices, or raw JSON payloads into chat.
- **NEVER** echo back entire files you just wrote or re-summarize an artifact you just generated.
- **NEVER** output repetitive filler paragraphs ("I have carefully analyzed...", "Here is a comprehensive breakdown of everything we just accomplished...").

---

## 3. Studio-First Synchronization Rule

Before ending any stage or slice turn:
1. Write full details cleanly in English inside `.zerodrift/*.md` / `.zerodrift/memory/*`.
2. Refresh Studio live via `node scripts/build-studio.mjs --project .`.
3. Reply in the user's preferred chat language (Arabic, English, etc.) using the concise 5–8 line format above.

---

## 4. Explicit Override Rule

When the user asks *"explain X in chat"*, *"show me the full diff/table here"*, or is operating in **Web Chat Mode (`adapters/WEB-CHAT-MASTER.md`)** without a local filesystem/browser Studio, provide the full requested artifact cleanly in chat.

