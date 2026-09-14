# Pillar 7: Moving Entire Code to GitHub.com (via Gmail ID)

How to link your local codebase to GitHub.com using the Gmail ID provided in your prompt and your active Chrome browser session.

---

## 1. Setting Up Git Author Identity with Gmail ID

Git links all commits to a user's GitHub profile using the **email address** stored in the commit metadata.

Run these commands in your project root:
```powershell
# Configure commit author email to match the specified Gmail ID
git config user.email "your-client@gmail.com"

# Set author name
git config user.name "Your Name or Business"
```

Verify:
```powershell
git config user.email
```

---

## 2. Remote Repository Creation

### Method A: Web Browser (Using Active Chrome Profile)
1. Open Chrome (already logged in with your Gmail/Google account):
   👉 [https://github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: e.g., `baaz-contracting` or `dhamal-garba`
   - **Visibility**: Public or Private
   - **Important**: Do **NOT** select "Add a README file", "Add .gitignore", or "Choose a license" (this keeps the repository empty so your local project pushes smoothly without merge conflicts).
3. Click **Create repository**.
4. Copy the HTTPS repository URL:
   `https://github.com/<username>/<repo-name>.git`

### Method B: GitHub CLI (`gh`) (Headless)
If `gh` is installed (`winget install --id GitHub.cli`):
```powershell
gh repo create <repo-name> --public --source=. --remote=origin --push
```

---

## 3. Staging and Pushing the Local Codebase

```powershell
# 1. Ensure working tree is committed
git add .
git commit -m "feat: complete website codebase ready for deployment"

# 2. Ensure default branch is main
git branch -M main

# 3. Add or update remote origin
git remote remove origin 2>$null
git remote add origin https://github.com/<username>/<repo-name>.git

# 4. Push code with upstream tracking
git push -u origin main
```

When Git pushes, Windows **Git Credential Manager (GCM)** will automatically recognize your active Chrome session for one-click browser authorization.

---

## 4. Automated Helper Script

You can also run the PowerShell helper script in `scripts/`:
```powershell
.\scripts\push-to-github.ps1 -GmailId "your-client@gmail.com"
```
