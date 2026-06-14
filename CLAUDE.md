# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from `c:\vance_portfolio\vance-portfolio\` (the project root, not the parent folder).

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # ESLint over all .js/.jsx files
```

If npm registry is unreachable (SSL/network error), install offline from cache:
```bash
npm install --offline --no-audit --no-fund
```

## Architecture

Single-page React app with no router — all sections are in one scrollable page.

**Entry point:** `index.html` → `src/main.jsx` → `src/App.jsx`

**`src/App.jsx`** is the shell. It owns two global side-effects via `useEffect`:
1. **Custom cursor** — animates `.cursor` (snaps) and `.cursor-ring` (0.12 easing lag) via `requestAnimationFrame`. Re-attaches hover listeners on DOM mutations via `MutationObserver`.
2. **Scroll reveal** — `IntersectionObserver` watches all `.reveal` and `.reveal-left` elements and adds `.visible` when they enter the viewport. Also re-observes on DOM mutations so dynamically-rendered elements (e.g. opened project drawers) are picked up.

**`src/components/`** — one file per page section, rendered in order:
`Navbar → Hero → About → Projects → Skills → AITools → Experience → Contact → Footer`

**`src/hooks/useInView.js`** — custom `IntersectionObserver` hook (replaces `react-intersection-observer` which isn't in cache). Returns `{ ref, inView }`. Used by individual components for their own entrance animations via inline `opacity`/`transform` styles.

## Styling

**Tailwind CSS v4** — not v3. Key differences:
- Config is in `src/index.css` via `@import "tailwindcss"` + `@theme {}` block, **not** `tailwind.config.js` + PostCSS
- Vite plugin: `@tailwindcss/vite` in `vite.config.js` (no PostCSS config needed — `postcss.config.js` must return empty object if it exists to avoid autoprefixer conflicts)
- Design tokens in `@theme {}` are exposed as CSS custom properties (`--color-bg`, `--color-orange`, etc.)

**CSS class approach:** Components use semantic class names (`.sec-label`, `.stat-box`, `.exp-item`, etc.) defined in `src/index.css`, not Tailwind utilities. All section and component styles live in `index.css` — this is intentional to mirror the original HTML prototype.

**Light/dark theme:** `html.light` class toggled on `<html>` by Navbar; persisted in `localStorage`. All colors use `var(--color-*)` CSS custom properties overridden in the `html.light {}` block.

**Scroll reveal classes:**
- `.reveal` — fade up (used on most elements)
- `.reveal-left` — slide in from left (used on project accordion rows)
- Both need `.visible` added (done by the `IntersectionObserver` in `App.jsx`)

## Key files

| File | Purpose |
|---|---|
| `src/index.css` | All CSS — theme tokens, component classes, animations, responsive breakpoints |
| `public/vance.jpg` | Hero profile photo (extracted from base64 in original HTML prototype) |
| `public/vance-cv.pdf` | CV download (must be placed manually; linked from Hero "Download CV ↓") |
| `index.html` | Page title, meta/OG tags, Google Fonts preload (Barlow + Barlow Condensed) |

## Offline / network constraints

This project was set up without npm registry access. All packages were installed from local npm cache. Do not add new npm dependencies without confirming they are available offline or the network is available.
