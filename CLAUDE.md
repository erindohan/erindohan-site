# erindohan.com — Claude Code Context

## What this is
Author website for **Erin Dohan** — debut memoir *I Think I'm Ready to Talk*, releasing September 2026.
Live at: **erindohan.com**
GitHub: **github.com/pd-sudo/erindohan-site**
Deployed via: **Netlify** (auto-deploys on every `git push` to `main`)

---

## Tech stack
- **Astro 5.18.0** — static site generator
- **Tailwind CSS v4** — CSS-native config (`@theme {}` in `src/styles/global.css`), NO `tailwind.config.js`
- **MDX** — blog posts in `src/content/blog/`
- **Node.js v22.14.0** — at `~/.local/share/node-v22.14.0-darwin-x64/bin/`

### Running the site
```bash
# Dev server
~/.local/share/node-v22.14.0-darwin-x64/bin/npm run dev

# Production build
~/.local/share/node-v22.14.0-darwin-x64/bin/npm run build
```

> Note: `npm` may not be on PATH. Use the full path above, or add `~/.local/bin` to PATH.

---

## Key file locations

| File | Purpose |
|------|---------|
| `src/styles/global.css` | All CSS — Tailwind theme, custom homepage CSS, media queries |
| `src/layouts/Layout.astro` | Shared HTML shell, meta tags, Google Analytics |
| `src/components/Nav.astro` | Navigation with mobile hamburger toggle |
| `src/components/Footer.astro` | Footer with social links |
| `src/pages/index.astro` | Homepage |
| `src/pages/about.astro` | About page |
| `src/pages/the-book.astro` | Book page |
| `src/pages/blog/index.astro` | Blog index |
| `src/pages/blog/[slug].astro` | Individual blog post template |
| `src/pages/contact.astro` | Contact page |
| `src/content/blog/*.mdx` | Blog post content (5 posts) |
| `src/content/config.ts` | Content collection schema |
| `public/images/` | All site images |
| `public/admin/` | Decap CMS (not yet activated) |

---

## Design system

### Colors (use CSS vars or Tailwind classes)
| Var | Tailwind | Value |
|-----|----------|-------|
| `--dark` | `bg-dark`, `text-dark` | `#2C2420` (near-black) |
| `--cream` | `bg-cream` | `#FAF6F1` |
| `--warm-white` | `bg-warm-white` | `#FDF9F5` |
| `--terracotta` | `text-terracotta` | `#C4836A` |
| `--terracotta-light` | | `#D9A08A` |
| `--mid` | `text-mid` | `#6B5B52` (body text) |
| `--light-mid` | `text-light-mid` | `#9E8D85` |
| `--border` | | `#E8DED6` |

### Fonts
- `font-playfair` → Playfair Display (headings)
- `font-cormorant` → Cormorant Garamond (italic subheadings, pull quotes)
- `font-dm` → DM Sans (body, labels, buttons)

### Important CSS note
The `*, *::before, *::after` reset is wrapped in `@layer base` — this is intentional and critical. Do not move it outside the layer or Tailwind spacing utilities will break on inner pages.

---

## Content

### Author
Erin Dohan — accounting controller, writer, wife, and mother. Western suburbs of Chicago.
Survived a ruptured brain aneurysm on May 29, 2019 (age 27).

### Book
- **Title:** I Think I'm Ready to Talk
- **Subtitle:** The Messy, Honest Story of Coming Back to Myself After a Ruptured Brain Aneurysm
- **Release:** September 2026
- **Publisher:** TBD

### Social
- Instagram: @erindohanthings — https://www.instagram.com/erindohanthings/
- TikTok: @erindohanthings — https://www.tiktok.com/@erindohanthings
- Facebook: https://www.facebook.com/p/Erindohanthings-61576684822463/
- Email: Erin@erindohan.com

### Blog posts (5 published)
1. `when-illness-outlasts-empathy.mdx` — Feb 23, 2026 — Personal Essay (featured)
2. `when-your-body-betrays-you-medical-gaslighting-and-womens-health.mdx` — Jan 22, 2026 — Advocacy
3. `why-i-wrote-this-book.mdx` — Dec 29, 2025 — On Writing
4. `postpartum-ocd-and-anxiety.mdx` — Nov 28, 2025 — Mental Health
5. `survival.mdx` — Nov 17, 2025 — Personal Essay

---

## What's already done
- [x] Full site built and live at erindohan.com
- [x] All 6 pages: `/`, `/about`, `/the-book`, `/blog`, `/blog/[slug]`, `/contact`
- [x] 5 real blog posts with full content
- [x] Real author photo and book cover image
- [x] Mobile responsive layout with hamburger nav
- [x] Google Analytics 4 via gtag (env var: `PUBLIC_GA_MEASUREMENT_ID` set in Netlify)
- [x] Netlify deployment with auto-deploy on push
- [x] Custom domain erindohan.com via Squarespace nameservers → Netlify DNS
- [x] SSL certificate (auto-provisioned by Netlify)
- [x] Kit email signup forms connected (Homepage + Blog page)
- [x] Contact form connected via Netlify Forms — submissions emailed to Erin@erindohan.com (set notification in Netlify dashboard → Forms → contact → Form notifications)

---

## Remaining tasks

### Priority 1 — Review blog post content
Review the remaining 2 blog posts to confirm the content matches the originals:
- `when-illness-outlasts-empathy.mdx` — Feb 23, 2026 — Personal Essay
- `why-i-wrote-this-book.mdx` — Dec 29, 2025 — On Writing

The other 3 posts (Survival, Postpartum OCD, Medical Gaslighting) have been verified and updated with correct original content.

### Priority 2 — RSS feed
Add an RSS feed at `/rss.xml` so Kit can auto-send new blog posts to subscribers.

Astro has a built-in RSS helper: `@astrojs/rss`. Install and create `src/pages/rss.xml.ts`.

```bash
npm install @astrojs/rss
```

Then set `site` in `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://erindohan.com',
  // ...
})
```

### Priority 3 — Decap CMS (optional, for in-browser editing)
Already scaffolded in `public/admin/`. To activate:
1. Enable **Netlify Identity** in Netlify dashboard
2. Enable **Git Gateway** under Identity → Services
3. Invite Erin via the Identity tab
4. Visit `https://erindohan.com/admin/` to log in and write posts from the browser

### Priority 4 — Kit email notifications
In the Kit dashboard, set the sender email to Erin@erindohan.com so subscribers receive emails from her address (not the default). Also set up a welcome email sequence for new subscribers.

---

## Environment variables (set in Netlify dashboard)
| Key | Value |
|-----|-------|
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (G-XXXXXXXX) |

---

## Deployment workflow
```bash
# Make changes, then:
git add .
git commit -m "description of changes"
git push
# Netlify auto-deploys within ~60 seconds
```
