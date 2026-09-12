# Phase 1 — Digital Computers & Cyber Cafe (front-end)

Rebuild the two attached templates as a proper multi-page site, keeping the exact look, Bengali/English copy, shop data, and blue-on-navy styling from `digital_computer.html`.

## What gets built

**Home page** (the address visitors land on)
- Sticky top navigation: logo, links to Services, About, Pricing, Reviews, Contact, plus a WhatsApp button and a Login button.
- Hero: badge, headline "আপনার সকল ডিজিটাল সমাধানের বিশ্বস্ত অংশীদার", subtitle, WhatsApp + View Services buttons, the three counters (5000+, 7+, 100%), and the four floating service cards.
- Services: all 7 cards (e-Passport, NID, Birth Registration, Job Application, Visa, Printing, Land Records) with icons, descriptions and tags.
- About / owner: Tuhidul Islam, role, bio, location, hours, trust badges, the 10+/7 floating stats, and the four feature points.
- Pricing: all 8 services with starting prices (৳300, ৳200, ৳150, ৳500, ৳100, ৳30, ৳200, ৳10) and the pricing note.
- Reviews (new, not in the template): customer rating summary plus a grid of review cards with star ratings, name, service used and comment. Seeded with sample Bengali reviews as placeholder content — real reviews can be swapped in later.
- Why Us: the three cards.
- Contact: address, WhatsApp/phone, business hours, WhatsApp and Gmail buttons, Google Maps link and map panel.
- Footer with copyright and proprietor line.

**Separate pages** so each can be shared and found on Google: Services, Pricing, Reviews, About, Contact — each reusing the same sections with its own page title and description.

**Login page** — one entry with a toggle between Customer and Admin. Form layout styled like the admin template's login screen (username/password, error state, back-to-home link). Phase 1 is the screen only; real accounts and the admin dashboard come in Phase 2.

**Quick reachout** — floating WhatsApp button on every page (wa.me/8801690052743) and a Gmail compose link pre-filled with the shop subject line. An email address is still needed; a placeholder is used until you provide it.

## Technical notes

- New route files under `src/routes/`: `index.tsx` (replaces the placeholder), `services.tsx`, `pricing.tsx`, `reviews.tsx`, `about.tsx`, `contact.tsx`, `login.tsx`. Each defines its own `head()` metadata.
- Shop content (services, prices, reviews, contact details, owner info) lives in one typed data file, `src/data/shop.ts`, so Phase 2's admin panel can later write to the same shape.
- Section components under `src/components/sections/` (Hero, Services, About, Pricing, Reviews, WhyUs, Contact) plus `SiteHeader`, `SiteFooter`, `FloatingContact`.
- Design tokens added to `src/styles.css` in oklch: primary `#0A66C2`, accent `#00A0DC`, dark `#0d1b2a`, plus surface/muted tokens. Hind Siliguri + Noto Sans Bengali loaded via `<link>` in `__root.tsx`; `lang="bn"`. Icons via `lucide-react` instead of Font Awesome.
- The shop logo from the template is extracted and served as a hosted asset.
- No backend in this phase: no database, no real authentication, no admin dashboard.

## Out of scope for Phase 1

Admin dashboard panels, content editing, print studio, saved configuration, and real login — all Phase 2.
