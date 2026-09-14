# Vercel Architecture & Deployment Guide: Baaz Contractor

## 1. Project Overview & Brand Architecture
- **Brand**: Baaz Contractor
- **Architecture Philosophy**: Modern Architectural Precision, High-Tech Engineering, Transparent Craftsmanship
- **Tagline**: *"Building Homes with Quality, Integrity & Excellence — From Foundation to Finish"*
- **Motto**: *"Your Vision. Our Commitment. Your Dream Home."*
- **Primary Channels**:
  - Direct Phone: `(800) 555-BAAZ`
  - Client Desk: `contact@baazcontractor.com`
  - Operational Scope: Tri-State & Metropolitan Residential Architecture

---

## 2. Vercel Edge Runtime Configuration (`vercel.json`)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/estimate", "destination": "/api/estimate.ts" },
    { "source": "/api/consultation", "destination": "/api/consultation.ts" }
  ]
}
```

---

## 3. Serverless Edge API Routes

### `/api/estimate.ts`
High-speed edge calculation engine providing instant budgetary projections for residential builds:
```typescript
export const config = { runtime: 'edge' };

interface EstimatePayload {
  service: string;
  squareFootage: number;
  finishTier: 'signature' | 'architectural' | 'masterpiece';
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const { service, squareFootage, finishTier }: EstimatePayload = await req.json();

  const baseRates: Record<string, number> = {
    'new-home': 285,
    'additions': 240,
    'kitchen': 175,
    'bathroom': 195,
    'basement': 110,
    'roofing': 45,
    'flooring': 28
  };

  const tierMultipliers = { signature: 1.0, architectural: 1.35, masterpiece: 1.8 };
  const rate = (baseRates[service] || 200) * (tierMultipliers[finishTier] || 1.0);
  const estimatedTotal = Math.round(rate * squareFootage);

  return new Response(JSON.stringify({
    service,
    squareFootage,
    finishTier,
    estimatedTotal,
    rangeLow: Math.round(estimatedTotal * 0.92),
    rangeHigh: Math.round(estimatedTotal * 1.08),
    timelineWeeks: Math.max(3, Math.round(squareFootage / 120))
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## 4. Performance & Core Web Vitals SLA
| Metric | Benchmark Target | Optimization Strategy |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 0.7s | Zero render-blocking scripts, preconnected font CDNs |
| **Largest Contentful Paint (LCP)** | < 1.1s | Preloaded critical hero image with modern WebP compression |
| **Cumulative Layout Shift (CLS)** | 0.000 | Explicit aspect-ratio boxes on all media containers |
| **Interaction to Next Paint (INP)**| < 45ms | Hardware-accelerated CSS transforms and passive event listeners |
| **Lighthouse Performance** | 100/100 | Micro-bundled asset delivery via Vercel Global Edge Network |
