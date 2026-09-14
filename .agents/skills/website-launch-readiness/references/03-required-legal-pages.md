# Pillar 3: Privacy Policy, About Us & Required Pages (47:33)

Every credible website requires specific core and legal pages. Omitting them leads to:
- Ad accounts rejected or banned by Google Ads and Meta Ads.
- Merchant accounts (Stripe, Square, PayPal) flagged or suspended.
- Poor Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) ranking signals.
- Legal vulnerabilities under privacy regulations (GDPR, CCPA, CalOPPA).

---

## 1. The 4 Essential Required Pages Checklist

| Page | URL Slug | Purpose | Mandatory Elements |
| :--- | :--- | :--- | :--- |
| **Privacy Policy** | `/privacy-policy` | Legal compliance (GDPR/CCPA/CalOPPA) | Data collected, cookies, 3rd-party analytics (Google, Meta, Stripe), user rights, opt-out, contact DPO email, effective date. |
| **Terms of Service** | `/terms` or `/terms-of-service` | Protects business from liability & disputes | Acceptance, usage rules, IP/copyright rights, payment & cancellation policy, limitation of liability, governing jurisdiction. |
| **About Us** | `/about` or `/about-us` | Builds trust, conversions, & Google E-E-A-T | Brand story, founder/team bios with real credentials, high-quality photos, mission statement, social proof/reviews. |
| **Contact Us** | `/contact` or `/contact-us` | Lead capture & verified business entity | Contact form, phone (`tel:+1...`), email (`mailto:...`), physical business address, hours of operation, interactive map embed. |

---

## 2. AI Prompt to Generate Customized Legal Pages

Use this prompt to generate clean, tailored legal policies:

```markdown
Act as a digital compliance specialist and business attorney.
Generate comprehensive, professional, and readable website policies for:
- Company/Legal Entity Name: [e.g., Dhamal Group LLC / Visionary K9s LLC]
- Website URL: [e.g., https://garbaclasses.com]
- Contact Email: [e.g., info@garbaclasses.com]
- Physical Address & State/Country: [e.g., Edison, New Jersey, USA]
- Services/Products Sold: [e.g., Dance instruction classes, event ticket bookings, workshops]
- 3rd-Party Tools Used: [e.g., Google Analytics, Meta Pixel, Stripe payment gateway, Formspree]

Please generate two separate documents formatted in clean Markdown with H1, H2, and H3 headings:
Document 1: Privacy Policy
- Information We Collect (personal information, usage data, device data).
- How We Use Your Information.
- Cookies & Tracking Technologies.
- Third-Party Sharing (payment processors, marketing tools).
- Data Retention and Security.
- Your Privacy Rights (GDPR rights, CCPA "Do Not Sell My Info").
- Children's Privacy (COPPA).
- Changes to this Policy & Contact Information.

Document 2: Terms of Service
- Acceptance of Agreement.
- Permitted Use of Site and Intellectual Property.
- Class Bookings, Attendance, and Cancellation/Refund Policy.
- Disclaimer of Warranties & "As-Is" Service.
- Limitation of Liability.
- Indemnification.
- Governing Law and Dispute Resolution (specify jurisdiction).
```

---

## 3. High-Converting "About Us" Structure

Google algorithms and human customers look for concrete proof of credibility on `/about`:

1. **Hero Section**: Catchy headline emphasizing your brand's unique mission (e.g., *"Preserving Authentic Cultural Heritage in New Jersey"*).
2. **The Origin Story**: Why the business was created and the problem it solves.
3. **Leadership / Founder Credibility**:
   - High-resolution founder/team photo.
   - Years of experience, certifications, award recognitions.
4. **Core Values**: 3–4 bullet points (Integrity, Excellence, Community, Results).
5. **Key Milestones / Metrics**:
   - `500+ Students Trained` • `10+ Years Experience` • `5-Star Average Rating`
6. **Call to Action**: A clear link directing users to browse classes or schedule a consultation.

---

## 4. "Contact Us" Structure & Trust Signals

Ensure the `/contact` page has:
- **Direct Action Links**:
  - `<a href="tel:+17325550199">(732) 555-0199</a>`
  - `<a href="mailto:info@example.com">info@example.com</a>`
- **Validated Contact Form**:
  - Name, Email, Phone, Preferred Class/Service, Message.
  - Client-side validation (`required`, `type="email"`).
  - CSRF protection and spam honeypot or reCAPTCHA/Turnstile.
- **Operating Hours**:
  - Clearly display days and times when customer support is available.
- **Physical Address & Google Map Embed**:
  - Helps local SEO ranking and confirms the business is legitimate.

---

## 5. Navigation Placement Rules

- **Footer**:
  - Every page must have the footer linking to:
    - [Privacy Policy](/privacy-policy)
    - [Terms of Service](/terms)
    - [About Us](/about)
    - [Contact Us](/contact)
    - Copyright notice: `© {new Date().getFullYear()} [Company Name]. All rights reserved.`
- **Header**:
  - Must include top-level navigation items: `Home`, `About`, `Services/Classes`, `FAQs`, `Contact`.
