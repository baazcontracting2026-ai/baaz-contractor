# Pillar 4: Git Commits & Version Control in VS Code (48:28)

Proper version control guarantees that your code is backed up safely, every deployment is traceable, and you never accidentally expose private API keys or client credentials.

---

## 1. Setup Safe `.gitignore`

Before making your initial commit, ensure you have a comprehensive `.gitignore` in your project root.

Copy [templates/git/.gitignore](../templates/git/.gitignore) to the root of your project.

### Critical Rules:
1. **Never track environment secrets**:
   - `.env`, `.env.local`, `.env.*.local`, `*.pem`, `*.key`
2. **Never track package dependencies**:
   - `node_modules/`
3. **Never track build artifacts**:
   - `dist/`, `build/`, `.astro/`, `.cache/`, `.next/`
4. **Never track OS junk**:
   - `Thumbs.db`, `.DS_Store`, `ehthumbs.db`

---

## 2. Using Version Control in VS Code (GUI Method)

VS Code provides a visual interface for Git that makes review and staging simple:

### Step 1: Open Source Control
- Press `Ctrl + Shift + G` (or click the branched icon on the left Activity Bar).
- If the repository has not been initialized yet, click the blue **Initialize Repository** button.

### Step 2: Review File Changes
- The **Changes** list shows all modified (`M`), added (`U`), or deleted (`D`) files.
- Click any file to open the **Diff Viewer**:
  - Left pane = Original code.
  - Right pane = Your new changes (highlighted in green/red).

### Step 3: Staging Changes
- Hover over a file and click the **`+` (Stage Changes)** icon to stage it.
- To stage all changes at once, click the **`+`** icon on the **Changes** section header.
- The staged files move to the **Staged Changes** section.

### Step 4: Write Conventional Commit Message
- In the message box at the top, enter a clear, standardized commit message (see format below).
- Click the blue **Commit** button (or press `Ctrl + Enter`).

### Step 5: Publish / Push to Remote (GitHub)
- If you haven't connected GitHub: Click **Publish Branch**. VS Code will prompt you to authenticate and pick a public or private GitHub repository.
- If already connected: Click the **Sync Changes** button (or circular arrow in the bottom status bar) to push to `origin/main`.

---

## 3. Command Line (CLI) Workflow

For developers who prefer PowerShell or Git Bash:

```powershell
# 1. Initialize repository and set default branch
git init
git branch -M main

# 2. Check status of untracked and modified files
git status

# 3. Stage changes
git add .

# 4. Commit with a conventional message
git commit -m "feat(launch): complete on-page SEO, FAQ accordion, and error pages"

# 5. Link to your GitHub repository
git remote add origin https://github.com/YourUsername/your-repo-name.git

# 6. Push to main branch
git push -u origin main
```

---

## 4. Conventional Commit Standards

Write commit messages that make your project history professional and searchable:

| Prefix | When to Use | Example |
| :--- | :--- | :--- |
| `feat:` | Adding a new feature or component | `feat: implement accessible FAQ accordion with FAQPage schema` |
| `fix:` | Fixing a bug or broken layout | `fix: resolve mobile overflow on contact form` |
| `docs:` | Documentation changes only | `docs: add client handoff instructions and SEO audit checklist` |
| `style:` | Cosmetic styling, formatting, CSS tweaks | `style: polish hero section button hover glow` |
| `refactor:` | Code changes that neither fix a bug nor add a feature | `refactor: extract SeoHead into reusable component` |
| `perf:` | Changes that improve performance | `perf: convert hero image to WebP and enable lazy loading` |
| `chore:` | Updating dependencies, build scripts, configs | `chore: update tailwind config and clean gitignore` |

---

## 5. Windows Gotchas & Line Endings (`.gitattributes`)

On Windows, Git may warn about CRLF vs LF line endings:
`warning: CRLF will be replaced by LF in ...`

To prevent line ending churn across team members, add a `.gitattributes` file in your root:

```text
# Auto-detect text files and normalize line endings to LF on commit
* text=auto eol=lf

# Explicit binary files
*.png binary
*.jpg binary
*.jpeg binary
*.webp binary
*.svg text
*.ico binary
```

---

## 6. Undo & Recovery Cheatsheet

```powershell
# Unstage a file without losing changes
git restore --staged <filename>

# Discard all local uncommitted changes in working directory (CAUTION)
git restore .

# Amend the last commit message
git commit --amend -m "feat: corrected commit message"

# View concise commit history
git log --oneline -n 10
```
