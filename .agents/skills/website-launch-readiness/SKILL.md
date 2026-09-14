---
name: website-launch-readiness
description: >-
  All-in-one pre-launch & deployment checklist for web projects: On-Page SEO with AI,
  accessible FAQ sections with FAQPage schema, required legal and core pages (Privacy Policy,
  Terms, About Us, Contact Us), Git commits & version control in VS Code, custom branded 404/500
  error pages, Google Analytics (GA4) & Search Console mapping via Gmail ID, pushing entire
  codebase to GitHub.com, and deploying live to Cloudflare Pages. Use this master skill for any
  website to ensure full production launch readiness.
---

# Complete Website Launch & Deployment Checklist

This master skill provides an end-to-end, battle-tested 8-pillar workflow to take any web project (Astro, Next.js, Vite, or standalone HTML/CSS/JS) from local development to a fully optimized, search-ranked, legally compliant, version-controlled, analytics-tracked, and edge-deployed website.

---

## The 8 Launch & Deployment Pillars

| Phase | Milestone | Focus Areas | Key Output / Artifact |
| :--- | :--- | :--- | :--- |
| **1** | **On-Page SEO with AI** | Title, Meta Description, OG/Twitter tags, Canonical, JSON-LD Schemas, Sitemap & Robots.txt | `SeoHead` component / meta tags, `sitemap.xml`, `robots.txt`, Schema script |
| **2** | **Adding the FAQ Section** | User objection handling, accessible accordion UI, Google Rich Snippets | `FaqSection` component with inline `FAQPage` JSON-LD |
| **3** | **Required & Legal Pages** | Legal compliance (GDPR/CCPA), business trust signals, contact accessibility | `/privacy-policy`, `/terms`, `/about`, `/contact` |
| **4** | **Git Commits & Version Control** | Safe `.gitignore`, atomic commits, conventional commit syntax, VS Code GUI & CLI | Clean Git history, local commit before remote push |
| **5** | **Adding Error Pages (404, 500)** | Custom branded error pages, navigation recovery, proper HTTP response codes | `/404` (Page Not Found), `/500` (Server Error), hosting redirect config |
| **6** | **Google Analytics & Search Console** | Active Chrome Gmail mapping, GA4 Measurement ID (`G-XXXXXXXXXX`), GSC verification, conversion tracking | `GoogleAnalytics` component / snippet, `click_to_call` & lead events, GSC paired |
| **7** | **Move Code to GitHub.com** | Gmail ID attribution, remote repo creation, upstream push to `main` | Remote repo on `github.com/<user>/<repo>`, all code backed up |
| **8** | **Deploy to Cloudflare Pages** | Cloudflare login via Gmail SSO, automated build (`dist/`), edge deployment | Live `https://<project>.pages.dev` URL, custom domain & SSL |

---

## Detailed Step-by-Step Procedures

### Phase 1: On-Page SEO with AI
Follow [references/01-onpage-seo-ai.md](./references/01-onpage-seo-ai.md).
1. **AI Generation**: Prompt AI for primary title tag (50–60 chars), meta description (150–160 chars), target keywords, and semantic headings.
2. **Meta & Social Tags**: Inject [templates/seo/SeoHead.astro](./templates/seo/SeoHead.astro) or [templates/seo/seo-head.html](./templates/seo/seo-head.html).
3. **Structured Data**: Implement `LocalBusiness`, `Organization`, or `WebSite` JSON-LD schema.
4. **Sitemap & Robots**: Ensure `sitemap.xml` and `robots.txt` exist in the public root.

---

### Phase 2: Adding the FAQ Section (44:28)
Follow [references/02-faq-section.md](./references/02-faq-section.md).
1. **Brainstorm 6–10 FAQs**: Target objections: pricing, turnaround times, guarantees, booking procedures.
2. **Accessible Accordion**: Embed [templates/faq/FaqSection.astro](./templates/faq/FaqSection.astro) or [templates/faq/faq-section.html](./templates/faq/faq-section.html) with ARIA attributes and keyboard navigation.
3. **FAQPage Schema**: Inject valid Schema.org `FAQPage` JSON-LD matching the visible text verbatim for Google search snippets.

---

### Phase 3: Privacy Policy, About Us & Required Pages (47:33)
Follow [references/03-required-legal-pages.md](./references/03-required-legal-pages.md).
1. **Core Trust Pages**:
   - `/about`: Company story, real founder photos, experience metrics, testimonials.
   - `/contact`: Direct phone (`tel:`), email (`mailto:`), physical address, Google Maps embed, validated contact form.
2. **Legal Pages**:
   - `/privacy-policy`: Data collection, cookies, third-party analytics/payments, GDPR/CCPA user rights. Template: [templates/pages/privacy-policy.astro](./templates/pages/privacy-policy.astro).
   - `/terms`: Service agreements, booking/cancellation rules, liability limits, governing jurisdiction. Template: [templates/pages/terms.astro](./templates/pages/terms.astro).
3. **Footer Navigation**: Ensure every page links to Privacy Policy, Terms, About, and Contact.

---

### Phase 4: Git Commits & Version Control in VS Code (48:28)
Follow [references/04-git-version-control.md](./references/04-git-version-control.md).
1. **Ensure Safe `.gitignore`**: Use [templates/git/.gitignore](./templates/git/.gitignore) to exclude `.env`, `node_modules/`, `dist/`, `.astro/`.
2. **Initialize Git**: Run `git init` and `git branch -M main`.
3. **Conventional Commits**: Stage all files and commit with descriptive messages (`feat: ...`, `fix: ...`, `chore: ...`).

---

### Phase 5: Adding Error Pages (404 & 500) (51:19)
Follow [references/05-error-pages-404-500.md](./references/05-error-pages-404-500.md).
1. **Custom 404 (Page Not Found)**:
   - Deploy [templates/pages/404.astro](./templates/pages/404.astro) or [templates/pages/404.html](./templates/pages/404.html).
   - Must have empathetic messaging, prominent "Back to Homepage" button, and quick navigation links.
2. **Custom 500 (Server Error)**:
   - Deploy [templates/pages/500.astro](./templates/pages/500.astro) or [templates/pages/500.html](./templates/pages/500.html).

---

### Phase 6: Google Analytics 4 & Search Console Mapping
Follow [references/06-google-analytics-mapping.md](./references/06-google-analytics-mapping.md).
1. **Chrome Session Mapping**: In your logged-in Chrome browser, open [analytics.google.com](https://analytics.google.com/) under the specified **Gmail ID**.
2. **Property & Web Stream**: Locate or create the GA4 Property and Web Data Stream for the production URL. Extract Measurement ID `G-XXXXXXXXXX`.
3. **Inject Tracking Code**:
   - Astro: Add [templates/analytics/GoogleAnalytics.astro](./templates/analytics/GoogleAnalytics.astro) or pass `gaMeasurementId` to `SeoHead.astro`.
   - HTML: Inject [templates/analytics/google-analytics.html](./templates/analytics/google-analytics.html) before `</head>`.
   - Automated conversion tracking: phone calls (`click_to_call`), emails (`click_to_email`), and form submissions (`generate_lead`).
4. **Google Search Console (GSC)**: Add the URL prefix in [search.google.com/search-console](https://search.google.com/search-console), auto-verify via GA4, and submit `sitemap.xml`.
5. **Realtime Verification**: Confirm live visitor count in GA4 Realtime dashboard.

---

### Phase 7: Move Entire Code to GitHub.com (Gmail ID)
Follow [references/07-github-repo-deploy.md](./references/07-github-repo-deploy.md).
1. **Configure Git Identity**:
   ```powershell
   git config user.email "your-client@gmail.com"
   git config user.name "Your Name or Business"
   ```
2. **Create Remote Repository**:
   - Web: In Chrome, go to [https://github.com/new](https://github.com/new). Enter repository name (do NOT initialize with README/.gitignore). Click **Create repository**.
   - CLI: `gh repo create <repo-name> --public --source=. --remote=origin --push`
3. **Link & Push**:
   ```powershell
   git remote remove origin 2>$null
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
   *(Windows Git Credential Manager will use your active Chrome profile to authorize with 1 click).*
4. **Automation Helper**: Run `.\scripts\push-to-github.ps1 -GmailId "your-client@gmail.com"`.

---

### Phase 8: Deploy to Cloudflare Pages (Gmail ID)
Follow [references/08-cloudflare-pages-deploy.md](./references/08-cloudflare-pages-deploy.md).
1. **Authenticate Wrangler**:
   ```powershell
   npx wrangler login
   ```
   In Chrome, authorize with the Google account matching the specified Gmail ID.
2. **Compile Production Build**:
   ```powershell
   npm run build
   ```
   *(Verifies `dist/` is created without errors).*
3. **Deploy to Cloudflare Pages**:
   ```powershell
   npx wrangler pages project create <project-name> --production-branch main
   npx wrangler pages deploy dist --project-name <project-name> --commit-dirty=true
   ```
4. **Live URL**: Note the live production URL: `https://<project-name>.pages.dev`.
5. **Custom Domain (Optional)**: In [dash.cloudflare.com](https://dash.cloudflare.com), go to **Workers & Pages** &rarr; Select Project &rarr; **Custom domains** &rarr; add `www.yourdomain.com`.
6. **Automation Helper**: Run `.\scripts\deploy-to-cloudflare.ps1 -ProjectName "my-project-name"`.

---

## Complete Launch & Deployment Verification Checklist

Before client handoff, verify every box:

- [ ] **SEO**: All pages have unique `<title>` (50–60 chars) and `<meta name="description">` (150–160 chars).
- [ ] **Social**: Open Graph & Twitter cards point to valid 1200x630px images.
- [ ] **Schema**: JSON-LD structured data is valid with zero errors on [validator.schema.org](https://validator.schema.org/).
- [ ] **Sitemap & Robots**: `robots.txt` and `sitemap.xml` accessible at domain root.
- [ ] **FAQ**: Accordion expands/collapses smoothly with keyboard accessibility (`Tab`/`Enter`) and `FAQPage` schema.
- [ ] **Legal & Core Pages**: Real business info populated on `/privacy-policy`, `/terms`, `/about`, and `/contact`.
- [ ] **Error Pages**: Custom branded `/404` and `/500` error pages display with working recovery links.
- [ ] **Google Analytics**: GA4 Measurement ID (`G-XXXXXXXXXX`) active; Realtime report registers live visits and phone/form clicks.
- [ ] **Google Search Console**: Ownership verified and `sitemap.xml` submitted.
- [ ] **Version Control**: Working tree clean; all changes committed with conventional commit syntax.
- [ ] **GitHub**: Code pushed to remote repository (`github.com/<user>/<repo>`) with author email matching the Gmail ID.
- [ ] **Cloudflare Pages**: Deployed live at `https://<project>.pages.dev` with active SSL/TLS padlock and custom domain mapped.
