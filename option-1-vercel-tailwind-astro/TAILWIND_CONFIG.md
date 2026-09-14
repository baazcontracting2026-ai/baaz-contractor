# Tailwind CSS Configuration & Design Tokens: Baaz Contractor

## 1. Overview
The Baaz Contractor Option 1 frontend leverages Tailwind CSS v4 `@theme` architecture. It implements a stark, high-trust developer/architectural palette featuring high contrast between deep obsidian / stark white, precision hairline borders, and energetic electric cyan/azure accents.

---

## 2. Core Theme Token Definitions (`@theme`)

```css
@theme {
  /* Font Families */
  --font-sans: "Inter", "Geist", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: "Plus Jakarta Sans", -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Geist Mono", monospace;

  /* Architectural Canvas & Inks */
  --color-canvas: #ffffff;
  --color-canvas-subtle: #fafafa;
  --color-canvas-card: #ffffff;
  --color-ink-primary: #171717;
  --color-ink-secondary: #4b5563;
  --color-ink-tertiary: #9ca3af;
  --color-hairline: #e5e7eb;
  --color-hairline-strong: #d1d5db;

  /* Dark Mode Obsidian Variant */
  --color-dark-canvas: #09090b;
  --color-dark-subtle: #121215;
  --color-dark-card: #18181b;
  --color-dark-ink: #f4f4f5;
  --color-dark-body: #a1a1aa;
  --color-dark-hairline: #27272a;

  /* Brand Accents (Falcon Precision) */
  --color-accent-cyan: #00dfd8;
  --color-accent-blue: #0070f3;
  --color-accent-purple: #7928ca;
  --color-accent-emerald: #10b981;

  /* Border Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Elevation Shadows */
  --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
  --shadow-float: 0 20px 40px -15px rgba(0, 0, 0, 0.12);
  --shadow-glow-cyan: 0 0 35px -5px rgba(0, 223, 216, 0.35);
  --shadow-glow-blue: 0 0 35px -5px rgba(0, 112, 243, 0.35);
}
```

---

## 3. High-Precision Utility Classes

### Mesh Gradient Headline
```css
.bg-gradient-mesh {
  background: linear-gradient(135deg, #0070f3 0%, #00dfd8 50%, #7928ca 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Frosted Glassmorphism Card
```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(229, 231, 235, 0.8);
}
```

### Dark Mode Frosted Glassmorphism
```css
.dark .frosted-glass {
  background: rgba(24, 24, 27, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(39, 39, 42, 0.8);
}
```
