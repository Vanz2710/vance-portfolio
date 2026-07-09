# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run all commands from the repo root (this folder).

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # ESLint over all .js/.jsx files
```

Deployment target is Vercel (auto-detected Vite static build, output `dist/`). No router, so no rewrites/vercel.json needed.

## Architecture

Single-page React app with no router — all sections are in one scrollable page.

**Entry point:** `index.html` → `src/main.jsx` → `src/App.jsx`

**`src/App.jsx`** is the shell. It owns all cross-cutting UI state (mobile menu, case-study modal, "view all" projects, command palette + its filtered command list, toast, accent-color override) plus:
- `SETTINGS` at the top — accent color default, `cursorFx` toggle, `showAiSection` toggle
- body scroll-lock while any overlay is open
- global keyboard shortcuts: `Ctrl/Cmd+K` and `/` open the command palette, `Escape` closes palette → modal → menu

**`src/fx.js`** — all imperative page effects, initialized once from App via `useEffect` and driven by data-attributes (returns a cleanup function; StrictMode-safe):
boot overlay timeline (`data-boot`/`data-bl`), hero glitch (`data-gl`), divider draw-in (`data-line`), card tilt (`data-hov`), magnetic buttons (`data-mag`), scroll reveals (`data-rv`/`data-rvd`), heading scramble (`data-scr`), counters (`data-cnt`), typing loop (`data-typed`), scroll progress/nav shrink/back-to-top (`data-prog`/`data-nav`/`data-top`), background + section parallax (`data-grid`/`data-bgp`/`data-bgr`/`data-plx`), custom cursor + spotlight (`data-cur-dot`/`data-spot`), active nav-link tracking (`data-nl-t`). All effects respect `prefers-reduced-motion`.

**`src/data/projects.js`** — the five case studies (card copy + modal copy, metrics, bullets, tags, GitHub links).

**`src/components/`** — one file per piece, rendered in this order inside App:
`Boot → Background → SocialRail → Navbar (+ MobileMenu) → Hero → Quote → Marquee → Projects → Skills → About → Experience → Resume → AIWorkflow → Contact → Footer`, plus overlays `CommandPalette`, `ProjectModal`, and the toast (inline in App). `Icons.jsx` holds shared SVGs + logo mark.

## Styling

Plain CSS (no Tailwind). Everything lives in `src/index.css` using semantic class names (`.pcard`, `.exp-item`, `.pal-item`, …).

- **Font:** Fira Code via Google Fonts (`index.html`).
- **Palette:** One Dark — bg `#282C33`, panels `#23272E`/`#21252B`, fg `#ABB2BF`, dim `#5C6370`, red `#E06C75`, yellow `#E5C07B`, green `#98C379`.
- **Accent theming:** every accent usage goes through `var(--ac, #C778DD)`, set inline on `.site` from React state. The command palette's `accent purple|blue|green|yellow` commands swap it at runtime. Hover fills/shadows use `color-mix(in oklab, var(--ac) N%, transparent)`.
- **Breakpoints:** `max-width: 920px` (single-column hero/skills/about/contact/ai, hide social rail + skills deco) and `max-width: 820px` (burger menu replaces nav links, single-column experience, `.pad-x` gutters drop to 22px).
- Reveal/tilt/parallax styling is applied by `src/fx.js` via inline styles on the data-attributed elements; keyframes live in `index.css`.

## Key files

| File | Purpose |
|---|---|
| `src/index.css` | All CSS — reset, keyframes, component classes, responsive breakpoints |
| `src/fx.js` | All imperative effects (see above) |
| `src/data/projects.js` | Project/case-study content |
| `public/vance.jpg` | Hero profile photo |
| `public/vance-tindoc-cv.pdf` | CV served by the Resume section + `download cv` palette command (generated placeholder — replace with the real CV) |
| `public/projects/` | Optional project screenshots: `<slug>.png` or `.jpg` (e.g. `fortiroom.png`); cards fall back to a labelled placeholder when missing |
| `index.html` | Title, meta/OG tags, Fira Code font link |
| `public/favicon.svg` | Two-squares logo mark |

## Gotchas

- The contact form POSTs to FormSubmit's AJAX endpoint (`FORM_ENDPOINT` in `src/components/Contact.jsx`) — no backend or API key. FormSubmit requires a one-time activation: the first submission emails an activation link to the inbox; until it's clicked, submissions aren't delivered.
- `initPageEffects` measures element positions on mount for reveals/parallax — keep fixed heights on hero photo (440px) and card shots (172px) so measurements don't shift.
- Special glyphs (▪ ⟫ ↗ → ↵ ✕ ≡) are literal UTF-8 in source; keep files UTF-8 encoded.
