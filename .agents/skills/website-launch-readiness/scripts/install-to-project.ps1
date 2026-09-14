<#
.SYNOPSIS
    Installs the unified Website Launch Readiness & Deployment skill into any target website project.

.DESCRIPTION
    Copies the complete website-launch-readiness skill package (covering all 8 pillars:
    SEO, FAQs, Legal Pages, Git, 404/500 Pages, Google Analytics, GitHub, and Cloudflare)
    into the target project's '.agents/skills/' directory.

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

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$SourceSkillDir = Resolve-Path (Join-Path $ScriptDir "..")

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " Complete Website Launch & Deployment Skill Installer" -ForegroundColor Green
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

Write-Host "`nInstalling all 8 launch & deploy pillars to: $DestinationSkillDir" -ForegroundColor Cyan

# Create destination directory if needed
if (-not (Test-Path $DestinationSkillDir)) {
    New-Item -ItemType Directory -Path $DestinationSkillDir -Force | Out-Null
}

# Copy files recursively
Copy-Item -Path "$SourceSkillDir\*" -Destination $DestinationSkillDir -Recurse -Force

# Verify installation
if (Test-Path (Join-Path $DestinationSkillDir "SKILL.md")) {
    Write-Host "`n[SUCCESS] Unified Website Launch Readiness skill installed successfully!" -ForegroundColor Green
    Write-Host "Target Project: $ResolvedTarget" -ForegroundColor White
    Write-Host "Skill Location: $DestinationSkillDir" -ForegroundColor White
    Write-Host "`nAll 8 pillars are now active in that project:" -ForegroundColor Yellow
    Write-Host " 1. On-Page SEO with AI" -ForegroundColor Gray
    Write-Host " 2. FAQ Section & Schema" -ForegroundColor Gray
    Write-Host " 3. Privacy Policy, Terms & Required Pages" -ForegroundColor Gray
    Write-Host " 4. Git Commits & Version Control" -ForegroundColor Gray
    Write-Host " 5. Custom 404 & 500 Error Pages" -ForegroundColor Gray
    Write-Host " 6. Google Analytics 4 & Search Console Mapping (Gmail ID)" -ForegroundColor Gray
    Write-Host " 7. Move Entire Code to GitHub.com (Gmail ID)" -ForegroundColor Gray
    Write-Host " 8. Deploy to Cloudflare Pages (Gmail ID)`n" -ForegroundColor Gray
} else {
    Write-Error "Installation failed: SKILL.md was not copied properly."
}
