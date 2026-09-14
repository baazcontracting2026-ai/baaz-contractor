# Pillar 6: Google Analytics 4 (GA4) & Search Console Mapping

Connect any website to Google Analytics (GA4) and Google Search Console (GSC) using your active logged-in Chrome session and a Gmail ID specified in your prompt.

---

## 1. Prompt Format for the Agent

When preparing a site for analytics mapping, use this prompt structure:

```markdown
Please map this website to Google Analytics (GA4) and Google Search Console:
- Website Name: [e.g., Baaz Contracting / Dhamal Group Garba]
- Production Domain: [e.g., https://baazcontracting.com]
- Google / Gmail ID: [e.g., clientname@gmail.com or youragency@gmail.com]
- Core Conversion Actions:
  1. Phone call clicks (tel: links)
  2. Contact form submissions
  3. Booking or class inquiry clicks
```

---

## 2. Chrome Browser Session Workflow

Since your Chrome browser is already logged in to Google, follow these steps to extract or generate your **Measurement ID** (`G-XXXXXXXXXX`):

### Step 1: Verify Active Google Profile
1. Navigate to: [https://analytics.google.com/](https://analytics.google.com/)
2. In the top-right corner, check the profile avatar and ensure the active account matches the specified **Gmail ID**.
3. If multiple accounts are logged in, switch to the target account using the Google profile switcher (or URL parameter `?authuser=1`, `?authuser=2`).

### Step 2: Create or Select the GA4 Property
If this is a **new site**:
1. Click **Admin** (gear icon in the bottom-left).
2. Under **Account**, click **+ Create Account** (or select existing Account for your business/agency).
   - Account Name: `[Business Name]`
3. Under **Property**, click **+ Create Property**:
   - Property Name: `[Business Name] Website`
   - Reporting Time Zone: Select your client's local time zone (e.g., *United States - Eastern Time*).
   - Currency: `USD ($)`.
4. Click **Next**, choose your Industry Category and Business Size.
5. Under **Business Objectives**, select **Generate leads** and **Examine user behavior**.

### Step 3: Create Web Data Stream & Get Measurement ID
1. Choose platform: **Web**.
2. Enter:
   - **Website URL**: `https://baazcontracting.com` (select `https://` protocol).
   - **Stream Name**: `[Business Name] Web Stream`.
   - Keep **Enhanced Measurement** enabled (tracks Page views, Scrolls, Outbound clicks, Site search, Video engagement, File downloads automatically).
3. Click **Create Stream**.
4. You will immediately see the **Web stream details** modal:
   - Copy the **Measurement ID** in the top-right: `G-XXXXXXXXXX` (starts with `G-`).

---

## 3. Pairing Google Search Console (GSC)

Google Search Console monitors organic search performance, indexing status, and sitemap crawling.

1. Navigate to: [https://search.google.com/search-console](https://search.google.com/search-console) (using the same Gmail account).
2. Click **+ Add Property**:
   - Choose **URL prefix**: `https://yourdomain.com/` (enter full canonical URL).
   - Click **Continue**.
3. **Verification Method**:
   - **Method A (Instant via GA4)**: If GA4 is already installed on the site, Google Search Console can verify ownership automatically with one click!
   - **Method B (HTML Tag)**: Select **HTML tag**, copy the meta verification code:
     ```html
     <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN_HERE" />
     ```
     Place this tag in your `<head>` component (inside `SeoHead.astro` or `seo-head.html`).
4. **Submit Sitemap**:
   - Once verified, go to **Sitemaps** in the left sidebar.
   - Enter `sitemap.xml` and click **Submit**.

---

## 4. Codebase Implementation

### Option A: In Astro Projects (Recommended)

1. **Direct component**: Import [templates/analytics/GoogleAnalytics.astro](../templates/analytics/GoogleAnalytics.astro) into your root layout (`src/layouts/Layout.astro`):

```astro
---
import GoogleAnalytics from '../components/GoogleAnalytics.astro';
---

<head>
  <!-- Other head tags -->
  <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
</head>
```

2. **Via Environment Variable (`.env`)**:
   In your `.env` file:
   ```env
   PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   In Astro:
   ```astro
   <GoogleAnalytics measurementId={import.meta.env.PUBLIC_GA_MEASUREMENT_ID} />
   ```

3. **Or inside `SeoHead.astro`**:
   ```astro
   <SeoHead
     title="Baaz Contracting | Home Renovation & Remodeling"
     description="Top-rated general contractors..."
     gaMeasurementId="G-XXXXXXXXXX"
   />
   ```

### Option B: In Vanilla HTML / Static Sites

Add this directly before the closing `</head>` tag:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    page_path: window.location.pathname,
  });
</script>
```

---

## 5. Automated Conversion Event Tracking

High-value local business websites convert via **phone calls** and **contact forms**. The `GoogleAnalytics.astro` component automatically listens for these actions and fires standard GA4 events:

1. **Phone Call Clicks (`tel:` links)**:
   - When a visitor clicks `(732) 555-0199`, fires event `click_to_call` with parameters `{ phone_number: '+17325550199', page: '/services' }`.
2. **Contact Form Submissions**:
   - When a visitor submits the contact or estimate form, fires event `generate_lead` with `{ form_id: 'contact-form' }`.
3. **Outbound Booking Clicks**:
   - External links to Calendly, Vagaro, or booking software fire `outbound_booking_click`.

---

## 6. Realtime Verification Test

Verify that tracking works before shipping to production:

1. Open your website in Chrome (or preview server `http://localhost:3000` / `dist`).
2. In Google Analytics, go to: **Reports** &rarr; **Realtime**.
3. You should see:
   - **Users in Last 30 Minutes**: `1` (or more).
   - **Device Category**: Desktop / Mobile.
   - **Event count by Event name**: `page_view`, `session_start`, `first_visit`.
4. Click a phone number link or submit a test form, and verify that `click_to_call` or `generate_lead` appears in the **Event Count** table in real time!
