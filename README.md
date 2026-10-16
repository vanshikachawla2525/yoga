# Stress Buster Station — Premium Wellness & Stress-Relief (Gurugram)

A scroll-driven, cinematic demo experience for **Stress Buster Station** ("Five Minutes of Quiet™"), crafted with React, Vite, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis smooth scrolling, and the Web Audio API.

---

## ✦ Getting Started

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Vercel Deployment
1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. The included `vercel.json` automatically manages Single Page Application (SPA) rewrites.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.

---

## ✦ Owner Handoff & Verification

All business information, service menus, pricing, operational hours, locations, and copy are centralized in a single file for easy editing:

📁 `src/data/content.ts`

### Items Owner Must Supply for Live Launch:
1. **Authentic Photography**: Replace the stand-in images in `src/data/content.ts` (`IMAGES` object) with authentic high-resolution studio photographs of the Gurugram sanctuaries and therapists.
2. **Verified Pricing & Durations**: Update all prices (`demoPriceINR`) and treatment durations (`durationMinutes`) with verified menu rates.
3. **Operational Hours**: Verify opening and closing hours per outlet.
4. **Official Contact Number**: Confirm or update the WhatsApp constant `PROVISIONAL_WHATSAPP_NUMBER`.
5. **Authentic Reviews**: Replace sample testimonials with real verified guest words.
6. **Live Booking API**: Connect Step 5 of `src/sections/Booking.tsx` to your backend booking or CRM software (e.g. Zenoti, Fresha, or WhatsApp Business Cloud API).
7. **Production SEO**: Remove `<meta name="robots" content="noindex, nofollow" />` in `index.html` to enable search engine indexing.

---

## ✦ Stack Highlights
- **Vite + React 18 + TypeScript**
- **Lenis Smooth Scroll** with velocity-reactive ticker
- **GSAP & ScrollTrigger** for scroll-scrub animations, pin effects, and cursor tracking
- **Web Audio API** synthesized Tibetan Singing Bowl harmonics with real-time concentric waveform canvas
- **Tailwind CSS** with bespoke luxury palette (Ink `#111110`, Charcoal `#1B1A18`, Warm Bone `#EFE9DF`, Soft Gold `#C8A45D`)
