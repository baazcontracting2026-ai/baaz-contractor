# Pillar 2: Adding the FAQ Section (44:28)

The FAQ (Frequently Asked Questions) section serves two major business functions:
1. **Conversion Optimization**: Directly dismantles customer hesitation, friction, and objections (pricing, guarantees, timelines, skill prerequisites).
2. **SEO Dominance**: Unlocks expandable accordion rich snippets on Google Search SERP via Schema.org `FAQPage` JSON-LD markup.

---

## 1. AI Prompt for High-Converting FAQs

Use this prompt to generate 6–10 questions tailored specifically to target customer doubts:

```markdown
Act as a Senior Conversion Rate Optimization (CRO) and Customer Experience expert.
I am building a website for: [Business Name, e.g. Visionary K9s Dog Training / Garba Dance Academy]
Target Audience: [e.g., Busy pet parents struggling with dog aggression or leash pulling]
Key Offerings: [e.g., In-home private training, board & train, puppy foundation]
Price point / Commitment level: [e.g., Premium 1-on-1 coaching]

Generate 8 high-impact FAQ items categorized into:
1. Suitability & Prerequisites ("Is this right for me / my dog / my beginner skill level?")
2. Process & Duration ("How does the program work and how long until results?")
3. Pricing, Investment & Guarantee ("What is the cost and what if I don't see results?")
4. Logistics & Scheduling ("Where do sessions take place and what is the cancellation policy?")

Requirements for each FAQ:
- Question: Phrased exactly how a real customer would speak or search in Google.
- Answer: Crisp, reassuring, transparent, and finishes with a clear next action or confidence boost (between 40 and 80 words per answer).
- Format: JSON array of objects with `question` and `answer` fields.
```

---

## 2. Google Schema Compliance Guidelines

Google has strict rules for `FAQPage` structured data:
- **Verbatim Match**: The question and answer text inside the JSON-LD script **must match the visible text** rendered on the webpage.
- **No Ads/Spam**: Do not use FAQs for purely promotional spam or affiliate link insertion.
- **One FAQPage per URL**: Aggregate all FAQs on that page into a single `FAQPage` JSON-LD block.

### FAQPage JSON-LD Format

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What experience level is required for the Garba classes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior dance experience is needed! We have specialized beginner tracks where instructors break down fundamental steps (such as 2-Taali, 3-Taali, and Dodhiya) step-by-step in a welcoming, fun environment."
      }
    },
    {
      "@type": "Question",
      "name": "How long are the training sessions and what should I bring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each session lasts 90 minutes. We recommend comfortable athletic wear, a personal water bottle, and traditional Dandiya sticks (or you can purchase a pair at the studio)."
      }
    }
  ]
}
</script>
```

---

## 3. UI/UX Accessibility Standards for Accordions

When implementing the accordion UI:
1. **Interactive Trigger**: Use a `<button>` element (not a `<div>` with an `onclick`) for each question.
2. **ARIA Attributes**:
   - `aria-expanded="true"` or `aria-expanded="false"` on the toggle button.
   - `aria-controls="faq-answer-1"` pointing to the ID of the answer container.
   - `id="faq-answer-1"` and `role="region"` on the answer container.
3. **Keyboard Controls**:
   - `Tab` / `Shift+Tab`: Focus through each question button.
   - `Enter` or `Space`: Toggle the accordion open/closed.
4. **Smooth Transitions**:
   - Use CSS grid expansion (`grid-template-rows: 0fr` to `grid-template-rows: 1fr`) or `max-height` transitions so answers expand smoothly without jarring jumps.
5. **Icon Indicator**:
   - Include a rotating Chevron (▼) or Plus/Minus (+/-) icon with CSS `transform: rotate(180deg)` on open.

---

## 4. Ready-to-Use Components

- **For Astro**: See [templates/faq/FaqSection.astro](../templates/faq/FaqSection.astro) (features automatic JSON-LD script generation from props).
- **For Vanilla HTML/JS**: See [templates/faq/faq-section.html](../templates/faq/faq-section.html).
