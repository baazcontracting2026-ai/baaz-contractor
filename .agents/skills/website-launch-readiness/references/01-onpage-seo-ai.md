# Pillar 1: On-Page SEO with AI

A comprehensive guide to optimizing web pages for search engines, social media crawlers, and AI search engines (ChatGPT Search, Perplexity, Google SGE).

---

## 1. AI Prompt for SEO Keyword & Metadata Generation

Run this prompt with your AI assistant (Antigravity or any LLM) tailored for the target website:

```markdown
Act as a world-class Technical SEO and Conversion Copywriting specialist.
I am building a website for:
- Business Name: [e.g., Dhamal Group Garba Classes / Visionary K9s Dog Training]
- Industry/Niche: [e.g., Traditional Indian Dance Academy / Professional Dog Training]
- Primary Location/Service Area: [e.g., Edison, New Jersey / Austin, TX]
- Target Audience: [e.g., Families and youth wanting authentic Garba dance / Dog owners dealing with reactivity]
- Core Offerings: [e.g., Weekend Garba workshops, Navratri crash courses, private lessons]

Please provide:
1. Target Keywords:
   - 1 Primary High-Intent Keyword
   - 4 Secondary / LSI Keywords
   - 3 Long-tail Local Search Queries
2. Page Title Tag (between 50 and 60 characters):
   - Format: [Primary Keyword] | [Brand Name] - [Location or Key Differentiator]
3. Meta Description (between 150 and 160 characters):
   - Must include primary keyword, clear value proposition, and an explicit Call to Action (CTA).
4. Social Media Sharing (Open Graph / Twitter):
   - og:title (Punchy, under 60 chars)
   - og:description (Compelling hook, under 120 chars)
5. Semantic Heading Structure (H1, H2s, H3s) for the homepage.
6. JSON-LD Schema (LocalBusiness or Organization) with complete details.
```

---

## 2. Essential On-Page Tags Architecture

Every production page must have these tags within `<head>`:

```html
<!-- Primary Meta Tags -->
<title>Garba Classes in New Jersey | Dhamal Group - Authentic Traditional Garba</title>
<meta name="title" content="Garba Classes in New Jersey | Dhamal Group - Authentic Traditional Garba" />
<meta name="description" content="Join Dhamal Group for authentic traditional Garba classes in New Jersey. Expert training for all ages, energetic sessions, and Navratri prep. Enroll today!" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://example.com/" />

<!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:title" content="Garba Classes in New Jersey | Dhamal Group" />
<meta property="og:description" content="Join Dhamal Group for authentic traditional Garba classes in NJ. Expert choreography for all skill levels. Sign up now!" />
<meta property="og:image" content="https://example.com/images/og-banner.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dhamal Group Garba Dance Workshop in New Jersey" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://example.com/" />
<meta name="twitter:title" content="Garba Classes in New Jersey | Dhamal Group" />
<meta name="twitter:description" content="Authentic Garba dance training in New Jersey. Learn traditional steps, Sanedo, and Dodhiya. Enroll today!" />
<meta name="twitter:image" content="https://example.com/images/og-banner.jpg" />

<!-- Favicon & Icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#b91c1c" />
```

---

## 3. Structured Data (JSON-LD)

Search engines use Schema.org JSON-LD to understand entities, local address, ratings, and business type.

### Local Business / Organization Schema Template

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dhamal Group Garba Classes",
  "image": "https://example.com/images/logo.png",
  "url": "https://example.com",
  "telephone": "+1-732-555-0199",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Oak Tree Road",
    "addressLocality": "Edison",
    "addressRegion": "NJ",
    "postalCode": "08820",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.5698,
    "longitude": -74.3649
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/dhamalgroup",
    "https://instagram.com/dhamalgroup"
  ]
}
</script>
```

---

## 4. Image SEO Checklist

1. **Descriptive Filenames**:
   - ❌ `IMG_20260913_1502.jpg`
   - ✅ `traditional-garba-dance-class-edison-nj.webp`
2. **Accurate Alt Text**:
   - `alt="Students practicing authentic 3-taali Garba dance steps in studio"`
3. **Specify Explicit Width & Height**:
   - Always set `width` and `height` attributes on `<img>` to prevent Cumulative Layout Shift (CLS).
4. **Modern Formats & Lazy Loading**:
   - Convert large JPG/PNG banners to WebP or AVIF.
   - Use `loading="lazy"` on below-the-fold images.
   - Use `fetchpriority="high"` and `loading="eager"` on the Hero banner.

---

## 5. Robots.txt and Sitemap.xml

### `public/robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### In Astro:
Install the official sitemap integration:
```bash
npx astro add sitemap
```
Add your production site URL to `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [tailwind(), sitemap()],
});
```

---

## 6. Verification Tools

- **Google Rich Results Test**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- **Schema Validator**: [https://validator.schema.org](https://validator.schema.org)
- **Meta Tags Inspector**: [https://metatags.io](https://metatags.io)
- **PageSpeed Insights**: [https://pagespeed.web.dev](https://pagespeed.web.dev)
