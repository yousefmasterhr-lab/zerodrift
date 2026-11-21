<#
.SYNOPSIS
  Installs or uninstalls the 12 ZeroDrift v4.0 one-level Agent Skills globally on Windows.

.DESCRIPTION
  Installs all 12 `zerodrift*` skills (including native `zerodrift-codemap` + Studio bundle)
  at strict one-level depth into Google Antigravity (`~\.gemini\config\skills\`) by default,
  and optionally into Claude Code (`~\.claude\skills\`) and OpenAI Codex (`~\.codex\skills\`)
  via `-AllAgents`.
  Use `-WithCompanions` to inspect and report optional companion tooling (`knip`,
  `dependency-cruiser`, `floorplan`, `archify`, `understand-anything`) without ever modifying
  or overwriting existing user skills.
  Strictly NEVER modifies or removes non-ZeroDrift skills (floorplan, archify, understand*, etc.).

.EXAMPLE
  .\scripts\install-global.ps1
  .\scripts\install-global.ps1 -AllAgents
  .\scripts\install-global.ps1 -WithCompanions
  .\scripts\install-global.ps1 -DryRun
  .\scripts\install-global.ps1 -Uninstall
#>

[CmdletBinding()]
param(
  [switch]$AllAgents,
  [switch]$WithCompanions,
  [switch]$Uninstall,
  [switch]$DryRun,
  [string]$TargetDir
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent $ScriptDir

$Skills = @(
  'zerodrift',
  'zerodrift-intake',
  'zerodrift-research',
  'zerodrift-reverse',
  'zerodrift-architect',
  'zerodrift-design',
  'zerodrift-build',
  'zerodrift-verify',
  'zerodrift-security',
  'zerodrift-handover',
  'zerodrift-memory',
  'zerodrift-codemap'
)

$Destinations = @()
if ($TargetDir) {
  $Destinations += $TargetDir
} else {
  $Destinations += (Join-Path $HOME '.gemini\config\skills')
  if ($AllAgents) {
    $Destinations += (Join-Path $HOME '.claude\skills')
    $Destinations += (Join-Path $HOME '.codex\skills')
  }
}

function Copy-DirectoryClean {
  param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Destination,
    [switch]$IsDryRun
  )
  if ($IsDryRun) {
    Write-Host "  [DRY-RUN] Copy $Source -> $Destination"
    return
  }
  if (Test-Path -LiteralPath $Destination) {
    Remove-Item -LiteralPath $Destination -Recurse -Force
  }
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  Copy-Item -Path (Join-Path $Source '*') -Destination $Destination -Recurse -Force
}

Write-Host '=== ZeroDrift v4.0 Global Skill Fleet Installer (Windows) ==='
Write-Host "Repository: $RepoRoot"
if ($DryRun) { Write-Host 'Mode: DRY-RUN (no files will be modified)' }
if ($Uninstall) { Write-Host 'Action: UNINSTALL (scoped strictly to zerodrift* folders)' }
Write-Host ''

foreach ($DestRoot in $Destinations) {
  Write-Host "Target Skills Directory: $DestRoot"

  if ($Uninstall) {
    foreach ($SkillName in $Skills) {
      $SkillDest = Join-Path $DestRoot $SkillName
      if (Test-Path -LiteralPath $SkillDest) {
        if ($DryRun) {
          Write-Host "  [DRY-RUN] Remove $SkillDest"
        } else {
          Remove-Item -LiteralPath $SkillDest -Recurse -Force
          Write-Host "  [REMOVED] $SkillName"
        }
      } else {
        Write-Host "  [SKIP]    $SkillName (not installed)"
      }
    }
    Write-Host ''
    continue
  }

  if (-not $DryRun) {
    New-Item -ItemType Directory -Path $DestRoot -Force | Out-Null
  }

  foreach ($SkillName in $Skills) {
    $SkillSrcFile = Join-Path $RepoRoot "skills\$SkillName\SKILL.md"
    if (-not (Test-Path -LiteralPath $SkillSrcFile)) {
      throw "Missing source skill file: $SkillSrcFile"
    }

    $SkillDestDir = Join-Path $DestRoot $SkillName
    $SkillDestFile = Join-Path $SkillDestDir 'SKILL.md'
    $RefCoreDest = Join-Path $SkillDestDir 'references\core'
    $RefTemplatesDest = Join-Path $SkillDestDir 'references\templates'

    if ($DryRun) {
      Write-Host "  [DRY-RUN] Install $SkillName -> $SkillDestDir (SKILL.md + references/core + references/templates)"
    } else {
      New-Item -ItemType Directory -Path $SkillDestDir -Force | Out-Null
      Copy-Item -LiteralPath $SkillSrcFile -Destination $SkillDestFile -Force
      Copy-DirectoryClean -Source (Join-Path $RepoRoot 'core') -Destination $RefCoreDest
      Copy-DirectoryClean -Source (Join-Path $RepoRoot 'templates') -Destination $RefTemplatesDest

      if ($SkillName -eq 'zerodrift') {
        Copy-DirectoryClean -Source (Join-Path $RepoRoot 'scripts') -Destination (Join-Path $SkillDestDir 'scripts')
        Copy-DirectoryClean -Source (Join-Path $RepoRoot 'studio') -Destination (Join-Path $SkillDestDir 'studio')
        Copy-DirectoryClean -Source (Join-Path $RepoRoot 'adapters') -Destination (Join-Path $SkillDestDir 'references\adapters')
        Copy-Item -LiteralPath (Join-Path $RepoRoot 'AGENTS.md') -Destination (Join-Path $SkillDestDir 'references\AGENTS.md') -Force
      }

      Write-Host "  [INSTALLED] $SkillName -> $SkillDestDir"
    }
  }
  Write-Host ''
}

if ($WithCompanions) {
  Write-Host '--- Optional Companion Ecosystem Probe (Read-Only, Never Overwrites Existing Skills) ---'
  $DefaultRoot = Join-Path $HOME '.gemini\config\skills'
  $HasFloorplan = Test-Path -LiteralPath (Join-Path $DefaultRoot 'floorplan')
  $HasArchify = Test-Path -LiteralPath (Join-Path $DefaultRoot 'archify')
  $HasUnderstand = @(Get-ChildItem -Path $DefaultRoot -Filter 'understand*' -ErrorAction SilentlyContinue).Count
  $HasKnip = [bool](Get-Command knip -ErrorAction SilentlyContinue)
  $HasDepcruise = [bool](Get-Command depcruise -ErrorAction SilentlyContinue)
  Write-Host "  floorplan:          $HasFloorplan (built-in fallback: zerodrift-codemap)"
  Write-Host "  archify:            $HasArchify (Windows-safe workflow: validate -> deliver -> check)"
  Write-Host "  understand*:        $HasUnderstand skill(s)"
  Write-Host "  knip CLI:           $HasKnip (optional: npm i -g knip)"
  Write-Host "  depcruise CLI:      $HasDepcruise (optional: npm i -g dependency-cruiser)"
  Write-Host ''
}

if ($Uninstall) {
  Write-Host 'ZeroDrift uninstall complete. All non-ZeroDrift skills were left untouched.'
} else {
  Write-Host 'ZeroDrift v4.0 installed cleanly (12 one-level skills + native CodeMap + Studio bundle). Existing non-ZeroDrift skills were left untouched.'
}
