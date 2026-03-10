# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build (required before deploying)
npm run start    # Start production server
npm run lint     # ESLint check
```

## Deployment

The site runs on **LXC 105** (`nh-construction`) on Proxmox node `pve750G` (`172.10.10.16`).

```bash
# Deploy after pushing to GitHub
ssh -i ~/.ssh/id_ed25519 root@172.10.10.16 "pct exec 105 -- bash -c 'cd /var/www/nh-construction-plus && git pull && npm run build && pm2 restart nh-construction'"
```

- **Public URL** : `https://nh-construction.taile3e6c4.ts.net` (Tailscale Funnel)
- **Process manager** : PM2 (`pm2 restart nh-construction`)
- **Reverse proxy** : nginx → `127.0.0.1:3000`

## Architecture

**OnePage site** for NH CONSTRUCTION PLUS, a BTP company in Abidjan, Côte d'Ivoire.

Stack: Next.js 16 (App Router) · Tailwind CSS 4 · Framer Motion · Lucide React

### Page flow (`src/app/page.tsx`)
```
Header → Hero → Services → TrustBanner → Apropos → Portfolio → Contact → Footer
+ WhatsAppButton (floating)
```

### Key design tokens (`globals.css`)
- `--navy: #001F3F` — main background
- `--orange: #FF8C00` — CTA / accents
- Font: Montserrat (Google Fonts, loaded in `layout.tsx`)

### Data persistence (no database)
- **Contact form submissions** → `data/demandes.json` (via `POST /api/contact`)
- **Portfolio photos** → `public/images/portfolio/` + metadata in `data/photos.json` (via `POST /api/photos`)
- Both `data/` and `public/images/portfolio/` are gitignored — they live only on the server.

### Admin panel (`/admin`)
No authentication — accessible publicly. Allows uploading portfolio photos (with title + category) and viewing contact form submissions. Protect with middleware if needed.

### `AnimatedCounter` component
Scroll-triggered count-up animation using `useInView` from framer-motion. Triggers once when the element enters the viewport. Used in `Apropos.tsx` for key stats.

## Contacts & Legal (hardcoded)
- RCCM: `CI-ABJ-03-2024-B12-09431`
- Address: Koumassi, Face Cité Pangolin — BP 526 Abidjan 26
- WhatsApp number: currently `+225XXXXXXXXXX` → to be replaced in `WhatsAppButton.tsx` and `Contact.tsx`
- Email: `contact@nh-construction-plus.ci` → to be verified/updated in `Contact.tsx`
