<#
.SYNOPSIS
    Automates building and deploying any project to Cloudflare Pages.

.DESCRIPTION
    Verifies Wrangler CLI authentication with Cloudflare, builds the project
    using 'npm run build', ensures the Cloudflare Pages project exists,
    and deploys the compiled output to Cloudflare's global edge network.

.PARAMETER ProjectName
    The name of the project on Cloudflare Pages (e.g. baaz-contracting).
    If omitted, defaults to the current folder name or package.json name.

.PARAMETER OutputDir
    The build output directory to deploy (defaults to 'dist').

.PARAMETER ProductionBranch
    The production Git branch (defaults to 'main').
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$ProjectName,

    [Parameter(Mandatory = $false)]
    [string]$OutputDir = "dist",

    [Parameter(Mandatory = $false)]
    [string]$ProductionBranch = "main"
)

$ErrorActionPreference = "Stop"

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " Cloudflare Pages Edge Deployment Helper" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Cyan

# 1. Infer or prompt for ProjectName
if (-not $ProjectName) {
    if (Test-Path "package.json") {
        try {
            $pkg = Get-Content "package.json" | ConvertFrom-Json
            if ($pkg.name) {
                $ProjectName = $pkg.name.ToLower() -replace "[^a-z0-9-]", "-"
            }
        } catch {}
    }
    if (-not $ProjectName) {
        $ProjectName = (Get-Item .).Name.ToLower() -replace "[^a-z0-9-]", "-"
    }
    $ProjectName = Read-Host "Enter Cloudflare Pages Project Name [$ProjectName]" -or $ProjectName
}

# 2. Check Wrangler Authentication
Write-Host "`n[1/3] Checking Cloudflare authentication..." -ForegroundColor Yellow
$whoami = npx wrangler whoami 2>&1 | Out-String
if ($whoami -match "not logged in" -or $whoami -match "Please log in") {
    Write-Host "Not currently logged into Cloudflare. Launching browser login..." -ForegroundColor Yellow
    npx wrangler login
} else {
    Write-Host "Cloudflare session verified." -ForegroundColor Gray
}

# 3. Build project if package.json has a build script
Write-Host "`n[2/3] Building production bundle..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $hasBuild = (Get-Content "package.json" | Select-String '"build":')
    if ($hasBuild) {
        Write-Host "Executing 'npm run build'..." -ForegroundColor Gray
        npm run build
    }
}

if (-not (Test-Path $OutputDir)) {
    if (Test-Path "index.html") {
        Write-Host "No '$OutputDir' directory found, deploying current directory as static site." -ForegroundColor Yellow
        $OutputDir = "."
    } else {
        Write-Error "Build output directory '$OutputDir' was not found."
    }
}

# 4. Create Project on Cloudflare Pages (if not already created)
Write-Host "`n[3/3] Deploying to Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "Ensuring project '$ProjectName' exists..." -ForegroundColor Gray
npx wrangler pages project create $ProjectName --production-branch $ProductionBranch 2>$null | Out-Null

# 5. Direct Deploy
Write-Host "Uploading artifacts from '$OutputDir' to Cloudflare edge..." -ForegroundColor Gray
npx wrangler pages deploy $OutputDir --project-name $ProjectName --commit-dirty=true

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " [SUCCESS] Site Deployed to Cloudflare Pages!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Production URL: https://$ProjectName.pages.dev" -ForegroundColor Cyan
Write-Host "Dashboard:      https://dash.cloudflare.com`n" -ForegroundColor White
