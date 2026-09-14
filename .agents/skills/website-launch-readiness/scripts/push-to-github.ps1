<#
.SYNOPSIS
    Automates configuring Git with a Gmail ID and pushing to GitHub.com.

.DESCRIPTION
    Sets local Git author email to the specified Gmail ID, initializes git if needed,
    commits local files, prompts for or creates the remote GitHub repository URL,
    and pushes to the 'main' branch with upstream tracking.

.PARAMETER GmailId
    The Gmail ID associated with the GitHub account (e.g. client@gmail.com).

.PARAMETER RepoUrl
    The HTTPS clone URL of the GitHub repository (e.g. https://github.com/user/repo.git).

.PARAMETER CommitMessage
    Custom commit message (defaults to 'feat: production website build ready for launch').
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$GmailId,

    [Parameter(Mandatory = $false)]
    [string]$RepoUrl,

    [Parameter(Mandatory = $false)]
    [string]$CommitMessage = "feat: production website build ready for launch"
)

$ErrorActionPreference = "Stop"

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " GitHub Codebase Synchronization & Deploy Helper" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Cyan

# 1. Obtain Gmail ID
if (-not $GmailId) {
    $GmailId = Read-Host "Enter your Gmail ID for GitHub attribution"
}

if (-not $GmailId) {
    Write-Error "Gmail ID cannot be empty."
}

# 2. Configure Git Identity
Write-Host "`n[1/4] Configuring Git author email to: $GmailId" -ForegroundColor Yellow
git config user.email $GmailId

$currentName = git config user.name
if (-not $currentName) {
    $userName = ($GmailId -split "@")[0]
    git config user.name $userName
}

# 3. Initialize & Commit
Write-Host "[2/4] Verifying local repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "Initializing new Git repository..." -ForegroundColor Gray
    git init | Out-Null
}

git branch -M main | Out-Null

# Check status
git add .
$status = git status --porcelain
if ($status) {
    Write-Host "Creating commit: '$CommitMessage'..." -ForegroundColor Gray
    git commit -m $CommitMessage | Out-Null
} else {
    Write-Host "Working tree already clean, no new changes to commit." -ForegroundColor Gray
}

# 4. Determine Remote URL
Write-Host "[3/4] Connecting to GitHub remote repository..." -ForegroundColor Yellow
$existingRemote = git remote get-url origin 2>$null

if (-not $RepoUrl) {
    if ($existingRemote) {
        Write-Host "Detected existing remote: $existingRemote" -ForegroundColor Gray
        $useExisting = Read-Host "Use existing remote? (Y/n)"
        if ($useExisting -notmatch "^[Nn]$") {
            $RepoUrl = $existingRemote
        }
    }
}

if (-not $RepoUrl) {
    Write-Host "`nTo link your repository:" -ForegroundColor White
    Write-Host " 1. Open your browser: https://github.com/new" -ForegroundColor Cyan
    Write-Host " 2. Create an empty repository (do NOT add README or .gitignore)" -ForegroundColor Cyan
    Write-Host " 3. Copy the HTTPS URL (e.g. https://github.com/username/my-site.git)`n" -ForegroundColor Cyan
    $RepoUrl = Read-Host "Enter GitHub repository HTTPS URL"
}

if (-not $RepoUrl) {
    Write-Error "GitHub repository URL is required to push."
}

# Set remote origin
if ($existingRemote) {
    git remote set-url origin $RepoUrl
} else {
    git remote add origin $RepoUrl
}

# 5. Push
Write-Host "[4/4] Pushing codebase to $RepoUrl (branch: main)..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n[SUCCESS] Code successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "Repository URL: $RepoUrl" -ForegroundColor Cyan
Write-Host "Author Email:   $GmailId`n" -ForegroundColor White
