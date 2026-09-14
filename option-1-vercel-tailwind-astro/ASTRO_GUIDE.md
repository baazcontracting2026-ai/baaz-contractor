# Astro Architecture Guide: Baaz Contractor

## 1. Project Component Tree & Island Architecture
Astro powers Baaz Contractor's high-speed web application using **Partial Hydration (Astro Islands)** to ensure 0-KB default JavaScript overhead for static architectural galleries, while hydrating interactive islands on demand:

```
src/
├── components/
│   ├── Navbar.astro               # Server-rendered sticky navigation bar
│   ├── Hero.astro                 # Above-the-fold high-impact hero header
│   ├── ServicesGrid.astro         # The 7 core contractor services matrix
│   ├── CostEstimator.astro        # Interactive Edge calculator island (client:load)
│   ├── BeforeAfterSlider.astro    # Interactive renovation slider (client:visible)
│   ├── WhyChooseUs.astro          # The 7 Hallmarks of Baaz Contractor
│   ├── CommitmentPillars.astro    # The 4 Foundations of Excellence
│   ├── ConsultationModal.astro    # Dynamic appointment booking drawer (client:idle)
│   └── Footer.astro               # Rich footer with schema.org local business markup
├── layouts/
│   └── BaseLayout.astro           # Global HTML shell, SEO metadata, OpenGraph tags
└── pages/
    ├── index.astro                # Main entry point showcasing all core sections
    └── api/
        ├── estimate.ts            # Serverless Edge project calculator
        └── consultation.ts        # Lead ingestion & instant notification webhook
```

---

## 2. Astro Islands Hydration Strategy

| Component | Directive | Hydration Rationale |
| :--- | :--- | :--- |
| `CostEstimator` | `client:load` | Needs immediate responsiveness for clients wanting project quotes |
| `BeforeAfterSlider` | `client:visible` | Heavy visual comparison logic loads only when scrolled into view |
| `ConsultationModal` | `client:idle` | Hydrated during main thread idle time before user triggers modal |
| `ServicesGrid` | Pure Astro | Zero client JavaScript; clean semantic HTML & CSS grid |
| `CommitmentPillars` | Pure Astro | Ultra-fast static rendering with CSS hover transitions |

---

## 3. Production Deployment Script
```bash
# Clean build for Vercel Edge
npm run build

# Deploy directly via Vercel CLI
vercel --prod
```
