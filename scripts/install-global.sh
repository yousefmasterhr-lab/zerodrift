#!/usr/bin/env bash
# ZeroDrift v4.0 Global Skill Fleet Installer (macOS / Linux)
# Installs all 12 one-level ZeroDrift skills + native CodeMap + Studio bundle into ~/.gemini/config/skills/,
# plus optional ~/.claude/skills/ and ~/.codex/skills/ with --all-agents, and optional companion probe
# with --with-companions. Strictly NEVER touches non-ZeroDrift skills (floorplan, archify, understand*, etc.).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

ALL_AGENTS=0
WITH_COMPANIONS=0
UNINSTALL=0
DRY_RUN=0
CUSTOM_TARGET=""

SKILLS=(
  "zerodrift"
  "zerodrift-intake"
  "zerodrift-research"
  "zerodrift-reverse"
  "zerodrift-architect"
  "zerodrift-design"
  "zerodrift-build"
  "zerodrift-verify"
  "zerodrift-security"
  "zerodrift-handover"
  "zerodrift-memory"
  "zerodrift-codemap"
)

usage() {
  cat <<'EOF'
ZeroDrift v4.0 Global Skill Fleet Installer (macOS / Linux)

Usage:
  ./scripts/install-global.sh [options]

Options:
  --all-agents         Also install into ~/.claude/skills and ~/.codex/skills
  --with-companions    Detect optional companion tools (knip, depcruise, floorplan, archify, understand*)
  --uninstall          Remove ONLY zerodrift* skill directories
  --dry-run            Preview operations without modifying disk
  --target-dir <dir>   Install/uninstall in a custom skills directory
  --help, -h           Show this help message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --all-agents) ALL_AGENTS=1; shift ;;
    --with-companions) WITH_COMPANIONS=1; shift ;;
    --uninstall) UNINSTALL=1; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    --target-dir)
      if [[ $# -lt 2 ]]; then
        echo "Error: --target-dir requires a directory path" >&2
        exit 1
      fi
      CUSTOM_TARGET="$2"
      shift 2
      ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

DESTINATIONS=()
if [[ -n "${CUSTOM_TARGET}" ]]; then
  DESTINATIONS+=("${CUSTOM_TARGET}")
else
  DESTINATIONS+=("${HOME}/.gemini/config/skills")
  if [[ "${ALL_AGENTS}" -eq 1 ]]; then
    DESTINATIONS+=("${HOME}/.claude/skills")
    DESTINATIONS+=("${HOME}/.codex/skills")
  fi
fi

echo "=== ZeroDrift v4.0 Global Skill Fleet Installer (Unix) ==="
echo "Repository: ${REPO_ROOT}"
[[ "${DRY_RUN}" -eq 1 ]] && echo "Mode: DRY-RUN (no files will be modified)"
[[ "${UNINSTALL}" -eq 1 ]] && echo "Action: UNINSTALL (scoped strictly to zerodrift* folders)"
echo ""

for DEST_ROOT in "${DESTINATIONS[@]}"; do
  echo "Target Skills Directory: ${DEST_ROOT}"

  if [[ "${UNINSTALL}" -eq 1 ]]; then
    for SKILL in "${SKILLS[@]}"; do
      SKILL_DEST="${DEST_ROOT}/${SKILL}"
      if [[ -d "${SKILL_DEST}" ]]; then
        if [[ "${DRY_RUN}" -eq 1 ]]; then
          echo "  [DRY-RUN] rm -rf ${SKILL_DEST}"
        else
          rm -rf "${SKILL_DEST}"
          echo "  [REMOVED] ${SKILL}"
        fi
      else
        echo "  [SKIP]    ${SKILL} (not installed)"
      fi
    done
    echo ""
    continue
  fi

  [[ "${DRY_RUN}" -eq 0 ]] && mkdir -p "${DEST_ROOT}"

  for SKILL in "${SKILLS[@]}"; do
    SKILL_SRC="${REPO_ROOT}/skills/${SKILL}/SKILL.md"
    if [[ ! -f "${SKILL_SRC}" ]]; then
      echo "Error: missing source skill file: ${SKILL_SRC}" >&2
      exit 1
    fi

    SKILL_DEST="${DEST_ROOT}/${SKILL}"
    if [[ "${DRY_RUN}" -eq 1 ]]; then
      echo "  [DRY-RUN] Install ${SKILL} -> ${SKILL_DEST} (SKILL.md + references/core + references/templates)"
    else
      mkdir -p "${SKILL_DEST}/references"
      cp -f "${SKILL_SRC}" "${SKILL_DEST}/SKILL.md"
      rm -rf "${SKILL_DEST}/references/core" "${SKILL_DEST}/references/templates"
      cp -R "${REPO_ROOT}/core" "${SKILL_DEST}/references/core"
      cp -R "${REPO_ROOT}/templates" "${SKILL_DEST}/references/templates"

      if [[ "${SKILL}" == "zerodrift" ]]; then
        rm -rf "${SKILL_DEST}/scripts" "${SKILL_DEST}/studio" "${SKILL_DEST}/references/adapters"
        cp -R "${REPO_ROOT}/scripts" "${SKILL_DEST}/scripts"
        cp -R "${REPO_ROOT}/studio" "${SKILL_DEST}/studio"
        cp -R "${REPO_ROOT}/adapters" "${SKILL_DEST}/references/adapters"
        cp -f "${REPO_ROOT}/AGENTS.md" "${SKILL_DEST}/references/AGENTS.md"
      fi

      echo "  [INSTALLED] ${SKILL} -> ${SKILL_DEST}"
    fi
  done
  echo ""
done

if [[ "${WITH_COMPANIONS}" -eq 1 ]]; then
  echo "--- Optional Companion Ecosystem Probe (Never Overwrites Existing Skills) ---"
  DEF_ROOT="${HOME}/.gemini/config/skills"
  [[ -d "${DEF_ROOT}/floorplan" ]] && echo "  floorplan:     installed" || echo "  floorplan:     not installed (built-in fallback: zerodrift-codemap)"
  [[ -d "${DEF_ROOT}/archify" ]] && echo "  archify:       installed" || echo "  archify:       not installed"
  command -v knip >/dev/null 2>&1 && echo "  knip CLI:      installed" || echo "  knip CLI:      optional (npm i -g knip)"
  command -v depcruise >/dev/null 2>&1 && echo "  depcruise CLI: installed" || echo "  depcruise CLI: optional (npm i -g dependency-cruiser)"
  echo ""
fi

if [[ "${UNINSTALL}" -eq 1 ]]; then
  echo "ZeroDrift uninstall complete. All non-ZeroDrift skills were left untouched."
else
  echo "ZeroDrift v4.0 installed cleanly (12 one-level skills + native CodeMap + Studio bundle). Existing non-ZeroDrift skills were left untouched."
fi
