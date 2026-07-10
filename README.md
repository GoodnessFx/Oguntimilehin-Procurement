# Oguntimehin Procurement & Energy Services

A React + Vite single-page site for a Lagos-based procurement consultant and power/energy
solutions provider. Built on the same architecture as the BuySmart reference repo
(React/Vite, hash-free pushState routing, content-driven pages) but with its own
color identity, copy, and voice.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react icons
- No backend required; optional Brevo-powered `/api/quote` and `/api/newsletter` for Vercel

## Structure

```
index.html
package.json
vite.config.ts
tsconfig.json
api/                 quote.js, newsletter.js (optional Brevo email)
public/brand/         logo.svg, favicon.svg
src/
  main.tsx
  styles/             fonts, tailwind, theme, globals
  content/
    blog/             *.mdx guides (imported as raw by src/app/blog.ts)
  app/
    App.tsx          routing, meta tags, JSON-LD schemas, analytics gating
    content.ts         all business copy + data
    layout.tsx        Header, Footer, QuoteForm, shared section components
    pages.tsx         HomePage, Services, Service Information, Projects,
                        FAQ, Blog, Privacy, Why Choose, How It Works,
                        Contact, Cookie/Company Policy, Testimonials
    assistant.tsx      floating WhatsApp + back-to-top + chat assistant
    cookie-consent.tsx Accept/Reject consent banner
    blog.ts            MDX loader for the blog/guides section
```

## Features reused from the reference architecture

- Cinematic hero (crossfading gradient scenes + scrim + grid overlay)
- Cookie consent banner with Accept / Reject non-essential (gates analytics + marketing)
- Floating WhatsApp button, back-to-top button
- Quote form (WhatsApp / email handoff)
- Blog & guides section (MDX)
- Analytics gating: GA4 / Meta / TikTok pixels only load after consent

## Brand / palette

Graphite `#14181D` base with amber `#F2A60C` accent — distinct from the
reference site's navy + gold.

## Business details (verified)

- Address: 11 Fagbayi Street, off Cash Street, Alimosho, Ipaja, Lagos 100278
- Phone / WhatsApp: 0810 738 0672 (https://wa.me/2348107380672)
- Hours: shown as "Open · Closes 6pm" on Google Maps. The site uses
  "Mon–Sat, closes 6pm" as a placeholder — **confirm with the client before publishing.**

## Notes for the client

- The hero crossfades **real media** from `public/media/`: `hero.mp4` (video),
  `hero-solar.jpg`, and `hero-consult.jpg`. `hero-generator.jpg` is the video
  poster. Replace these with your own generator, solar, and consulting footage/photos.
- `public/media/` also holds real photos used across the site: project cards
  (`proj-*.jpg`), blog cards (`blog-*.jpg`), the service-information
  points (`svc-*.jpg`), and the company-policy page (`policy-office.jpg`).
  Swap them for your own shots. All load locally (copied from `public/`
  into `dist/` at build) so nothing depends on an external host.
- Every `<img>` has an `onError` handler that hides a broken image, so a
  missing file degrades gracefully instead of breaking the layout.
- "Recent projects" uses gradient cards with factual descriptions. Add real photos
  and numbers once permission is given — do not invent project counts.
- Google rating is 5.0 from a single review; the testimonials section is kept minimal
  on purpose. Feature it more once more reviews exist.
- Fill `[X years in business]` and `[certifications, if any]` placeholders before launch.
- Add Brevo keys (see `.env.example`) to enable the quote/newsletter email routes.

## Develop

```
npm install
npm run dev
npm run build
```
