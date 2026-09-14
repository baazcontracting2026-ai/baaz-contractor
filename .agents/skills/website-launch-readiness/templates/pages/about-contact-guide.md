# Guide: High-Converting "About Us" and "Contact Us" Pages

## 1. About Us Architecture (`src/pages/about.astro`)

The About page is one of the most visited pages by high-intent clients looking to verify whether your business is authentic, trustworthy, and experienced.

### Key Sections to Include:
1. **Hero Banner**:
   - Compelling Headline: "Our Story: Passion for [Niche/Art/Service]".
   - Brief 2-sentence mission statement.
2. **Founder & Instructor Spotlight**:
   - High-quality professional portrait (avoid generic stock photos).
   - Bio emphasizing credentials, years in industry, awards, and philosophy.
3. **Key Stats / Trust Numbers**:
   ```html
   <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
     <div><span class="text-3xl font-extrabold text-indigo-600">10+</span><p>Years Experience</p></div>
     <div><span class="text-3xl font-extrabold text-indigo-600">500+</span><p>Happy Students</p></div>
     <div><span class="text-3xl font-extrabold text-indigo-600">100%</span><p>Authentic Tradition</p></div>
     <div><span class="text-3xl font-extrabold text-indigo-600">5.0 ★</span><p>Client Rating</p></div>
   </div>
   ```
4. **Core Values / Philosophy**:
   - 3 cards detailing what makes your approach unique compared to competitors.
5. **Call to Action (CTA)**:
   - "Ready to Join Us? Enroll in Our Next Session" with a high-contrast button.

---

## 2. Contact Us Architecture (`src/pages/contact.astro`)

The Contact page must reduce friction to zero for users wanting to reach you.

### Essential Elements:
1. **Direct Communication Channels**:
   - **Phone**: `<a href="tel:+17325550199" class="font-semibold text-indigo-600">(732) 555-0199</a>`
   - **Email**: `<a href="mailto:info@example.com" class="font-semibold text-indigo-600">info@example.com</a>`
   - **Address**: Full physical address with link to Google Maps directions.
   - **Hours of Operation**: e.g., Mon–Fri: 9:00 AM – 7:00 PM, Sat–Sun: 10:00 AM – 5:00 PM.
2. **Accessible Contact Form**:
   - Name field (`autocomplete="name" required`)
   - Email field (`type="email" autocomplete="email" required`)
   - Phone field (`type="tel" autocomplete="tel"`)
   - Service Interest / Dropdown
   - Message textarea (`required minlength="10"`)
   - Submit button with loading state indicator
3. **Interactive Map Embed**:
   - Responsive `<iframe>` with `loading="lazy"` and `title="Google Maps Location"`.
