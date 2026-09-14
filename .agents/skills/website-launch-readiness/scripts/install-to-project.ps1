<#
.SYNOPSIS
    Installs the 'website-launch-readiness' skill into any target website project.

.DESCRIPTION
    Copies the website-launch-readiness skill package into the target project's
    '.agents/skills/' directory so Antigravity and AI agents can automatically
    recognize and use it for On-Page SEO, FAQs, Legal Pages, Git, and Error Pages.

.PARAMETER TargetProjectPath
    Path to the target website project (relative or absolute).
    If omitted, an interactive menu of sibling projects in the parent folder is displayed.

.EXAMPLE
    .\install-to-project.ps1 -TargetProjectPath "..\Garba\option-1-astro-tailwind"
    .\install-to-project.ps1
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$TargetProjectPath
)

$ErrorActionPreference = "Stop"

# Locate source skill folder
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$SourceSkillDir = Resolve-Path (Join-Path $ScriptDir "..")

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " Website Launch Readiness Skill Installer" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Cyan
Write-Host "Source Skill Path: $SourceSkillDir`n" -ForegroundColor Gray

# If TargetProjectPath is not provided, prompt with detected projects
if (-not $TargetProjectPath) {
    $ParentDir = Resolve-Path (Join-Path $ScriptDir "..\..\..\..") # Points to 'website development'
    $AvailableProjects = Get-ChildItem -Path $ParentDir -Directory | Where-Object { $_.Name -ne "Skills" }

    Write-Host "Detected sibling website projects in '$ParentDir':" -ForegroundColor Yellow
    $index = 1
    $projectList = @()
    foreach ($proj in $AvailableProjects) {
        Write-Host " [$index] $($proj.Name)" -ForegroundColor White
        $projectList += $proj.FullName
        $index++
    }
    Write-Host " [C] Enter custom path" -ForegroundColor White
    Write-Host " [Q] Quit`n" -ForegroundColor DarkGray

    $selection = Read-Host "Select a project number to install into (or 'C' for custom path)"

    if ($selection -match "^[Qq]$") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
    elseif ($selection -match "^[Cc]$") {
        $TargetProjectPath = Read-Host "Enter target project folder path"
    }
    elseif ($selection -match "^\d+$" -and [int]$selection -le $projectList.Count -and [int]$selection -gt 0) {
        $TargetProjectPath = $projectList[[int]$selection - 1]
    }
    else {
        Write-Error "Invalid selection."
    }
}

# Resolve and validate target path
if (-not (Test-Path $TargetProjectPath)) {
    Write-Error "Target project path '$TargetProjectPath' does not exist."
}

$ResolvedTarget = Resolve-Path $TargetProjectPath
$DestinationSkillDir = Join-Path $ResolvedTarget ".agents\skills\website-launch-readiness"

Write-Host "`nInstalling skill to: $DestinationSkillDir" -ForegroundColor Cyan

# Create destination directory if needed
if (-not (Test-Path $DestinationSkillDir)) {
    New-Item -ItemType Directory -Path $DestinationSkillDir -Force | Out-Null
}

# Copy files recursively
Copy-Item -Path "$SourceSkillDir\*" -Destination $DestinationSkillDir -Recurse -Force

# Verify installation
if (Test-Path (Join-Path $DestinationSkillDir "SKILL.md")) {
    Write-Host "`n[SUCCESS] 'website-launch-readiness' skill installed successfully!" -ForegroundColor Green
    Write-Host "`nTarget Project: $ResolvedTarget" -ForegroundColor White
    Write-Host "Skill Location: $DestinationSkillDir" -ForegroundColor White
    Write-Host "`nHow to use in that project:" -ForegroundColor Yellow
    Write-Host " 1. Open the project in Antigravity or VS Code." -ForegroundColor Gray
    Write-Host " 2. Ask the agent: 'Run website launch readiness checklist' or 'Audit on-page SEO and add FAQ section'." -ForegroundColor Gray
    Write-Host " 3. The agent will automatically detect and load the skill!`n" -ForegroundColor Gray
} else {
    Write-Error "Installation failed: SKILL.md was not copied properly."
}
