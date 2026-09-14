# Pillar 8: Deploying to Cloudflare Pages (via Gmail ID)

How to compile, deploy, and host your production website on Cloudflare's global edge network using Wrangler CLI and the specified Gmail ID / Google login.

---

## 1. Authentication via Google Single Sign-On (SSO)

Run:
```powershell
npx wrangler login
```

1. Wrangler will open your active default browser (Chrome).
2. Choose **Log in with Google** and select the profile matching the **Gmail ID** specified in your prompt.
3. Click **Allow** on the authorization screen.
4. Terminal will display: `Successfully logged in.`

Verify your identity:
```powershell
npx wrangler whoami
```

---

## 2. Compiling the Production Build

Before deploying, ensure your production bundle builds with zero errors:

- **For Astro**:
  ```powershell
  npm run build
  ```
  *(Output folder: `dist/`)*
- **For Vite / React / Vue**:
  ```powershell
  npm run build
  ```
  *(Output folder: `dist/`)*
- **For Static HTML/CSS**:
  *(Use current directory `./` or `public/`)*

---

## 3. Creating the Cloudflare Pages Project & Deploying

Choose a URL-friendly project name (e.g. `baaz-contracting` or `dhamal-garba`):

```powershell
# 1. Create project on Cloudflare Pages (run once per project)
npx wrangler pages project create <project-name> --production-branch main

# 2. Deploy the build output
npx wrangler pages deploy dist --project-name <project-name> --commit-dirty=true
```

Upon completion, Wrangler will output your live URL:
```text
✨ Deployment complete! Take a peek over at:
👉 https://<project-name>.pages.dev
```

---

## 4. Custom Domain & DNS Mapping

To attach your client's custom domain (e.g., `baazcontracting.com`):

1. Go to: [https://dash.cloudflare.com](https://dash.cloudflare.com).
2. Navigate to **Workers & Pages** &rarr; Select your project &rarr; **Custom domains**.
3. Click **Set up a custom domain** and enter `www.yourdomain.com` or `yourdomain.com`.
4. If your domain is on Cloudflare DNS, records are added automatically with one click.
5. If on external registrars (GoDaddy, Namecheap, Google Domains), create a **CNAME** record:
   - **Name**: `www` (or subdomain)
   - **Target**: `<project-name>.pages.dev`
   - **Proxy**: Enabled (Proxied)

---

## 5. Automated Helper Script

You can run the included deployment helper:
```powershell
.\scripts\deploy-to-cloudflare.ps1 -ProjectName "my-client-site"
```
