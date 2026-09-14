---
name: website-launch-readiness
description: >-
  Essential pre-launch checklist and step-by-step procedure for web development projects:
  On-Page SEO with AI (meta tags, OpenGraph, JSON-LD schemas, sitemap, robots.txt),
  adding accessible FAQ sections with FAQPage schema, building required legal and core pages
  (Privacy Policy, Terms of Service, About Us, Contact Us), Git commits & version control in VS Code,
  creating custom branded 404 and 500 error pages, and mapping the site to Google Analytics (GA4) &
  Google Search Console using an active Chrome profile and Gmail ID. Use this skill whenever preparing
  a website for production or auditing a client site before launch.
---

# Website Launch Readiness Skill

This skill provides a battle-tested, repeatable 6-step workflow to take any web project (Astro, Next.js, Vite, or standalone HTML/CSS/JS) from a raw development build to a production-ready, search-engine-optimized, legally compliant, analytics-tracked, and version-controlled website.

## Overview of the 6 Launch Pillars

| Phase | Milestone | Focus Areas | Key Output / Artifact |
| :--- | :--- | :--- | :--- |
| **1** | **On-Page SEO with AI** | Title, Meta Description, OG/Twitter tags, Canonical, JSON-LD Schemas, Sitemap & Robots.txt | `SeoHead` component / meta tags, `sitemap.xml`, `robots.txt`, Schema script |
| **2** | **Adding the FAQ Section** | User objection handling, accessible accordion UI, Google Rich Snippets | `FaqSection` component with inline `FAQPage` JSON-LD |
| **3** | **Required & Legal Pages** | Legal compliance (GDPR/CCPA), business trust signals, contact accessibility | `/privacy-policy`, `/terms`, `/about`, `/contact` |
| **4** | **Git Commits & Version Control** | Safe `.gitignore`, atomic commits, conventional commit syntax, VS Code GUI & CLI | Clean Git history, remote push to GitHub/GitLab |
| **5** | **Adding Error Pages (404, 500)** | Custom branded error pages, navigation recovery, proper HTTP response codes | `/404` (Page Not Found), `/500` (Server Error), hosting redirect config |
| **6** | **Google Analytics & Search Console** | Active Chrome Gmail mapping, GA4 Measurement ID (`G-XXXXXXXXXX`), GSC verification, conversion tracking | `GoogleAnalytics` component / snippet, `click_to_call` & lead events, GSC paired |

---

## Detailed Procedures

### Phase 1: On-Page SEO with AI

Follow the full guide in [references/01-onpage-seo-ai.md](./references/01-onpage-seo-ai.md).

1. **AI Keyword & Snippet Generation**:
   - Use the prompt in Section 1 of the guide with the client's business name, location, and core services.
   - Generate:
     - Primary Title Tag: 50–60 characters, `[Primary Keyword] | [Brand Name] - [Location/USP]`.
     - Meta Description: 150–160 characters, high CTR action-oriented summary with call to action.
     - Target Focus Keywords & Secondary Semantic LSI keywords.
2. **Inject Meta & Social Tags**:
   - For Astro projects: Use [templates/seo/SeoHead.astro](./templates/seo/SeoHead.astro).
   - For HTML/CSS projects: Use [templates/seo/seo-head.html](./templates/seo/seo-head.html).
   - Ensure `og:image` is an absolute URL pointing to a 1200x630px high-resolution banner.
3. **Structured Data (JSON-LD)**:
   - Implement `LocalBusiness` (or `Organization` / `ProfessionalService`), `WebSite`, and `BreadcrumbList`.
   - Validate with Google's Rich Results Test or Schema Markup Validator.
4. **Sitemap & Robots**:
   - Place or generate `robots.txt` in `/public` referencing the sitemap URL.
   - Configure `@astrojs/sitemap` or generate static `sitemap.xml`.

---

### Phase 2: Adding the FAQ Section (44:28)

Follow the full guide in [references/02-faq-section.md](./references/02-faq-section.md).

1. **Generate 6–10 High-Intent FAQs**:
   - Use the prompt in Section 2 of the guide to brainstorm top friction points: pricing, turnaround time, guarantee/refund, booking process, service areas.
2. **Implement Accessible Accordion UI**:
   - Astro: Import [templates/faq/FaqSection.astro](./templates/faq/FaqSection.astro).
   - HTML: Embed [templates/faq/faq-section.html](./templates/faq/faq-section.html).
   - Must support:
     - Keyboard accessibility (`Tab` to focus, `Enter` or `Space` to toggle).
     - Proper ARIA attributes (`aria-expanded="false"`, `aria-controls`, `role="region"`).
     - Smooth slide/height transition.
3. **Embed `FAQPage` JSON-LD**:
   - Ensure questions and answers in the JSON-LD schema exactly match the visible text on the page to comply with Google search guidelines.

---

### Phase 3: Privacy Policy, About Us & Required Pages (47:33)

Follow the full guide in [references/03-required-legal-pages.md](./references/03-required-legal-pages.md).

1. **Verify Mandatory Page Routes**:
   - `/about`: Company story, founder background, credentials, certifications, reviews/social proof.
   - `/contact`: Interactive form, direct phone link (`tel:`), email link (`mailto:`), physical address, Google Maps embed or link, business hours.
   - `/privacy-policy`: Data collection practices, cookies, third-party services (Google Analytics, Stripe, Meta Pixel), user rights. Use template: [templates/pages/privacy-policy.astro](./templates/pages/privacy-policy.astro).
   - `/terms`: Terms of service, intellectual property, disclaimer of warranties, governing law. Use template: [templates/pages/terms.astro](./templates/pages/terms.astro).
2. **Link in Site Navigation**:
   - Footer must contain links to Privacy Policy, Terms & Conditions, Contact Us, and About Us.
   - Header must have accessible navigation to About and Contact.

---

### Phase 4: Git Commits & Version Control in VS Code (48:28)

Follow the full guide in [references/04-git-version-control.md](./references/04-git-version-control.md).

1. **Setup Safe `.gitignore`**:
   - Copy [templates/git/.gitignore](./templates/git/.gitignore) to the project root.
   - Never commit `.env`, `.env.local`, `node_modules/`, `.astro/`, `dist/`, or OS files (`.DS_Store`, `Thumbs.db`).
2. **Initialize Repository (if not already done)**:
   ```bash
   git init
   git branch -M main
   ```
3. **Stage & Commit using Conventional Commits**:
   - In VS Code: Open the Source Control tab (`Ctrl+Shift+G` on Windows).
   - Review changes, stage desired files (`+`), and write a conventional commit message:
     - `feat: add SEO meta tags, OpenGraph images, and JSON-LD schema`
     - `feat: add accessible FAQ accordion with FAQPage schema`
     - `feat: add privacy policy, terms of service, and about us pages`
     - `feat: add custom 404 and 500 error pages`
4. **Connect Remote & Push**:
   ```bash
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

---

### Phase 5: Adding Error Pages (404 & 500) (51:19)

Follow the full guide in [references/05-error-pages-404-500.md](./references/05-error-pages-404-500.md).

1. **Deploy Custom 404 Page (Page Not Found)**:
   - Astro: Create `src/pages/404.astro` from [templates/pages/404.astro](./templates/pages/404.astro).
   - Static HTML: Place `404.html` from [templates/pages/404.html](./templates/pages/404.html) in the web root / public folder.
   - Requirements:
     - Clear, friendly notice that the page was moved or does not exist.
     - Quick navigation links back to Home, Services, Contact, and FAQs.
     - Search bar or primary call-to-action button ("Back to Homepage").
2. **Deploy Custom 500 Page (Server Error)**:
   - For SSR or server routes: Place `500.astro` from [templates/pages/500.astro](./templates/pages/500.astro) or `500.html`.
   - Friendly notice reassuring the user that the error is on our end, with a "Refresh Page" and "Report Issue" button.
3. **Hosting Configuration**:
   - For Netlify: Verify `404.html` in dist automatically catches unmatched paths.
   - For Vercel: Standard `pages/404.astro` or static `404.html` in root/output.
   - For Apache/Nginx: Set `ErrorDocument 404 /404.html` in `.htaccess` or `error_page 404 /404.html;` in Nginx config.

---

### Phase 6: Google Analytics (GA4) & Search Console Mapping

Follow the full guide in [references/06-google-analytics-mapping.md](./references/06-google-analytics-mapping.md).

1. **Profile Mapping via Active Chrome Session**:
   - Verify that your Chrome browser is signed in with the Gmail ID provided in the prompt.
   - Open [analytics.google.com](https://analytics.google.com/) and confirm or switch to the matching profile.
   - Create or locate the GA4 Property and Web Data Stream for the client's production domain.
   - Copy the **Measurement ID**: `G-XXXXXXXXXX`.
2. **Inject Analytics Component & Conversion Listeners**:
   - Astro: Add [templates/analytics/GoogleAnalytics.astro](./templates/analytics/GoogleAnalytics.astro) to `Layout.astro` or set `gaMeasurementId` in `SeoHead.astro`.
   - HTML: Inject [templates/analytics/google-analytics.html](./templates/analytics/google-analytics.html) before `</head>`.
   - Verify automated tracking for high-value actions:
     - `click_to_call` on `tel:` link clicks.
     - `click_to_email` on `mailto:` link clicks.
     - `generate_lead` on form submissions.
3. **Google Search Console (GSC) Pairing**:
   - Open [search.google.com/search-console](https://search.google.com/search-console).
   - Add the website URL prefix and verify ownership instantly via the linked GA4 property or meta tag.
   - Submit the XML sitemap (`/sitemap.xml`).
4. **Realtime Verification**:
   - Visit the site in Chrome and check the **Realtime** report in Google Analytics to confirm active users and `page_view` events are registering live.

---

## Pre-Launch Verification Checklist

Before delivering the site to a client or pushing to live production, check each box:

- [ ] All pages have unique `<title>` (50–60 chars) and `<meta name="description">` (150–160 chars).
- [ ] Open Graph and Twitter Card tags are populated with working image URLs (1200x630px).
- [ ] Schema.org JSON-LD is valid with zero errors on [validator.schema.org](https://validator.schema.org/).
- [ ] `robots.txt` and `sitemap.xml` are accessible at the domain root.
- [ ] FAQ accordion toggles smoothly and is keyboard navigable via `Tab` and `Enter/Space`.
- [ ] Privacy Policy and Terms have real business information (no placeholder `[COMPANY_NAME]` text).
- [ ] Contact details (phone, email, address, working contact form) are tested and verified.
- [ ] Navigating to `/non-existent-page-url` displays the branded 404 page with working home links.
- [ ] GA4 Measurement ID (`G-XXXXXXXXXX`) is injected, and Realtime dashboard confirms live traffic.
- [ ] Google Search Console property is added and sitemap submitted.
- [ ] Working tree is clean: all changes committed with descriptive conventional commit messages.
- [ ] `.env` and sensitive credentials are NOT tracked in git.
