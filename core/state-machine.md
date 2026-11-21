# Core Law 2: Deterministic Gate Machine & Persistent State Protocol

> **Prime Directive:** Complex software fails when context drifts across turns, sessions, or models. Every ZeroDrift project runs on a deterministic stage gate machine anchored to `.zerodrift/STATE.md` and `.zerodrift/CONTRACTS.md`.

---

## 1. The ZeroDrift Lifecycle Stage Machine

```text
STAGE 0 (Bootstrap)
   │  Detect Greenfield vs Brownfield vs Resume
   ▼
STAGE 1 (Intake & PRD)         ──▶ Outputs: 00-BRIEF.md, 01-PRD.md
   │  [GATE 1: Clarity >= 90% & User Approval in Guided Mode]
   ▼
STAGE 2A (Domain Research)     ──▶ Output:  02-RESEARCH-SOURCES.md
STAGE 2B (Reverse Engineering) ──▶ Output:  02B-REVERSE-ANALYSIS.md (when brownfield/competitor/screenshots exist)
   │  [GATE 2: Domain Rules & Stack Versions Verified]
   ▼
STAGE 3 (Architecture)         ──▶ Outputs: 03-ARCHITECTURE.md, CONTRACTS.md, 05-TASKS.md
   │  [GATE 3: Red-Team Challenge Resolved & Contracts Locked]
   ▼
STAGE 4 (Design System)        ──▶ Output:  04-DESIGN-SYSTEM.md (required for UI apps; N/A for pure CLI/API)
   │  [GATE 4: Tokens, Flows & RTL/LTR Spec Locked]
   ▼
STAGE 5 (Vertical Slice Build) ──▶ Loop over slices in 05-TASKS.md (Code + Critical Tests)
   │  Per-slice micro-gate: tsc/lint/unit pass + STATE.md updated
   ▼
STAGE 6A (Zero-Error Verify)   ──▶ Compiler + Build + Knip + Graph + Wiring + Runtime/Browser
STAGE 6B (Security Audit)      ──▶ Output:  05-SECURITY-AUDIT.md (Zero P0/P1 findings)
   │  [GATE 6: All Verifications Exit 0 & Zero Unresolved P0/P1 Security Issues]
   ▼
STAGE 7 (Handover Pack)        ──▶ Output:  06-HANDOVER-REPORT.md
   │  [DONE]
```

---

## 2. Execution Modes

| Mode | Behavior | When to Use |
| :--- | :--- | :--- |
| **Guided Mode** *(default)* | Pauses for brief, crisp human sign-off at **Gate 1 (PRD)**, **Gate 3 (Architecture & Contracts)**, **Gate 4 (Design System)**, and **Gate 6 (Security & Verification)**. | New products, high-stakes business software, ambiguous requirements. |
| **Autonomous Build Mode** | Once Gate 3 (and Gate 4 for UI apps) is approved, executes Stage 5 → Stage 6A → Stage 6B → Stage 7 slice-by-slice without interrupting the user unless a P0 blocker or ambiguity occurs. | Clear approved specs where the user wants end-to-end delivery. |
| **Standalone Skill Mode** | Runs a single ZeroDrift skill (e.g., `zerodrift-reverse`, `zerodrift-security`, `zerodrift-verify`) against an existing project, writing only its own artifact and updating `STATE.md` if `.zerodrift/` exists. | Audits, brownfield rescues, targeted verification, or design upgrades. |

---

## 3. `.zerodrift/STATE.md` Schema & Update Laws

`STATE.md` is the crash-proof memory ledger that allows **any model** (Gemini, Claude, GPT, Codex, local LLM) to resume work cleanly after a context compaction, IDE restart, or model switch.

### Mandatory Fields in `STATE.md`
1. **Project Identity:** Name, Project Mode (`greenfield` | `brownfield`), Execution Mode (`guided` | `autonomous`), Primary Language(s), Target Stack.
2. **Stage Progress Matrix:** Exact status of Stages `0` through `7` using strict tokens: `PENDING`, `IN_PROGRESS`, `BLOCKED`, `APPROVED`, `COMPLETED`, `SKIPPED`.
3. **Current Active Pointer:** Exact `Current Stage`, `Active Slice ID`, and `Next Deterministic Action`.
4. **Slice Ledger:** Every vertical slice from `05-TASKS.md` with status (`QUEUED`, `IN_PROGRESS`, `VERIFIED`, `BLOCKED`), last verification command, and date.
5. **Locked Decisions & Constraints Log:** Bullet ledger of irreversible or high-impact user approvals (so a later model never reverses them).
6. **Open Blockers & Risks:** Active P0/P1 issues or `[UNVERIFIED]` items awaiting confirmation.
7. **Session Handoff Notes:** Concise, factual summary written at the end of every completed stage or vertical slice.

### Update Rules
- **Read first:** Every skill MUST read `.zerodrift/STATE.md` (if present) before taking action.
- **Write atomically after every milestone:** Update `STATE.md` immediately after completing any stage, locking any gate, finishing any vertical slice, or hitting a blocker.
- **Never skip a gate backward silently:** If implementation reveals a flaw in `CONTRACTS.md` or `03-ARCHITECTURE.md`, explicitly log a **Contract Amendment** in `CONTRACTS.md` and `STATE.md` before changing dependent code.

---

## 4. Crash Recovery & Cross-Model Handoff Protocol

When resuming an existing `.zerodrift/` workspace:
1. Read `.zerodrift/STATE.md` first.
2. Read `.zerodrift/CONTRACTS.md` (if Stage 3 is `APPROVED` or `COMPLETED`) and `.zerodrift/05-TASKS.md` (if in Stage 5).
3. Run a quick workspace sanity check (`git status` + verify the last claimed `VERIFIED` slice files exist).
4. Resume from the exact `Next Deterministic Action` in `STATE.md`—never restart Stage 1 or rewrite already-verified slices unless the user explicitly asks to pivot.

---

## 5. Self-Healing Loop Cap (Anti-Infinite-Loop Law)

During Stage 5 or Stage 6 verification/fix loops:
- **Maximum 3 automated root-cause repair iterations** per failing check.
- Each iteration MUST diagnose a concrete root cause (never blind trial-and-error edits).
- If the failure persists after 3 iterations, set the slice/stage to `BLOCKED` in `STATE.md`, present the exact command, error output, attempted root-cause fixes, and concrete next options to the user, and stop.
