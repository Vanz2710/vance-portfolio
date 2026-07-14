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

**`src/App.jsx`** is the shell. It owns all cross-cutting UI state (mobile menu, case-study modal, "view all" projects, command palette + its filtered command list, toast, accent-color override, dark/light theme, auto-tour) plus:
- `SETTINGS` at the top — accent name default, theme default, `cursorFx` toggle, `showAiSection` toggle
- theme state: persisted to `localStorage['vt-theme']`, reflected as `data-theme` on `<html>` (an inline script in `index.html` applies it pre-paint to avoid a flash), and switched through `themeGlitch()` from fx.js; `ACCENTS[name][theme]` picks the accent hex per theme (One Dark accents on dark, One Light on light)
- body scroll-lock while any overlay is open
- global keyboard shortcuts: `Ctrl/Cmd+K` and `/` open the command palette, `Escape` closes palette → modal → menu

**`src/fx.js`** — all imperative page effects, initialized once from App via `useEffect` and driven by data-attributes (returns a cleanup function; StrictMode-safe):
boot overlay timeline + typed login (`data-boot`/`data-bl`/`data-bt`), hero glitch (`data-gl`), divider draw-in (`data-line`), card tilt (`data-hov`), magnetic buttons (`data-mag`), scroll reveals (`data-rv`/`data-rvd`), heading scramble (`data-scr`), counters (`data-cnt`), typing loop (`data-typed`), marquee ambient glitch pulses + scroll-velocity skew (`data-mqi`/`data-mq-row`), scroll progress/nav shrink/back-to-top (`data-prog`/`data-nav`/`data-top`), background + section parallax (`data-grid`/`data-bgp`/`data-bgr`/`data-plx`), custom cursor + spotlight + velocity RGB trail (`data-cur-dot`/`data-spot`), active nav-link tracking + hover scramble (`data-nl-t`), throwable chips with bounce/spring physics (`data-chip`/`data-chip-zone`, desktop pointers only), section-aware background glyph swaps (`data-glyph`, driven by the same observer as nav tracking). All effects respect `prefers-reduced-motion`.

fx.js also exports `runTour({ onDone })` — the auto-tour behind the navbar ▶ button and the palette's `run tour` command: glitch-hops through every `section[id]` in DOM order (HUD path scramble → eased rAF scroll → `.glitch-veil--mini` + heading re-scramble on arrival, ~2.1s dwell) with a fixed `cd ~/<id>` HUD; any real user input (wheel/touch/pointer/key) exits it, except on `[data-tour-toggle]` so the navbar button's own click can stop it. Returns a stop(); `onDone(completed)` fires exactly once. App tracks it in `tourRef`/`touring` and closes the mobile menu + modal before starting (their body scroll-lock would freeze the glide).

fx.js also exports `meltdown(apply)` — the Konami-code (↑↑↓↓←→←→BA, handled in App, ignored while typing in inputs) "system meltdown": the themeGlitch storm run twice (`.glitch-veil--melt` + `.is-melting`, ~1.24s) with `apply` swapping the accent to the secret `crimson` entry in `ACCENTS` (absent from palette/terminal accent commands on purpose); running the code again reverts.

**`src/sound.js`** — synthesized WebAudio SFX, no assets: `tick()` (boot/terminal keys, tour hops), `click()` (every button/link press — a delegated `pointerdown` listener in fx.js matching `button, a[href]` drives it, no per-component wiring), `chime()` (speaker-toggle confirm — deliberately louder than the ticks), `crackle()` (meltdown only — the plain theme glitch is intentionally silent), `humStart()/stopHum()` (tour drone), `setSound(on)`. Off by default; every entry point no-ops while disabled so callers never guard. Autoplay policy is handled inside the module: first-gesture unlock listeners resume a suspended context, and SFX are never scheduled into one (a `play()` wrapper drops effects that can't start within 150ms, so timer-driven boot ticks don't pile up and burst on the first click). Toggled by the navbar speaker button / `sound on|off` palette commands, persisted to `localStorage['vt-sound']`.

fx.js also exports `themeGlitch(apply)` — the dark/light transition: it appends a `.glitch-veil` (two `backdrop-filter` slice bands + scanline/noise static), adds `.is-glitching` to `<html>` (jitters `.main`/`.nav`/`.footer`), re-scrambles the headings currently in view (marquee items and SFX are deliberately excluded — the heavier everything-scrambles version belongs to `meltdown()` only), runs `apply()` (the actual theme flip) at 230ms under the full-screen invert flash, and cleans up at 640ms. Guarded against re-entry; falls back to an instant flip under reduced motion.

**`src/data/projects.js`** — the five case studies (card copy + modal copy, metrics, bullets, tags, GitHub links).

**`src/components/`** — one file per piece, rendered in this order inside App:
`Boot → Background → SocialRail → Navbar (+ MobileMenu) → Hero → Quote → Marquee → Projects → Skills → About → Experience → Education → Resume → AIWorkflow → Terminal → Contact → Footer (+ SysMon)`, plus overlays `CommandPalette`, `ProjectModal`, and the toast (inline in App). `Icons.jsx` holds shared SVGs + logo mark. `Terminal.jsx` is an interactive shell (section `#terminal`, so the auto-tour and `cd terminal` pick it up automatically) — its commands dispatch through App's `execAction`, the same `[verb, arg]` dispatcher the palette's `runCmd` wraps. `SysMon.jsx` is the footer's live client readout (fps/session only tick while on screen via IntersectionObserver).

## Styling

Plain CSS (no Tailwind). Everything lives in `src/index.css` using semantic class names (`.pcard`, `.exp-item`, `.pal-item`, …).

- **Font:** Fira Code via Google Fonts (`index.html`).
- **Palette:** One Dark by default — bg `#282C33`, panels `#23272E`/`#21252B`, fg `#ABB2BF`, dim `#5C6370`, red `#E06C75`, yellow `#E5C07B`, green `#98C379`. All colors are `:root` custom properties (`--bg`, `--panel`, `--fg`, `--dim`, `--bright`, `--red`, …); `:root[data-theme="light"]` swaps the whole set to One Light (`#FAFAFA` bg, `#24292E` bright, `#A626A4` purple, …). `--line` is an `R, G, B` triplet so borders keep per-use alphas via `rgba(var(--line), .35)`. Never hardcode a hex in a rule — add or reuse a token so both themes stay covered.
- **Theme switching:** `data-theme` on `<html>` (set pre-paint by an inline `index.html` script from `localStorage['vt-theme']`, then owned by App state). Toggled from the navbar sun/moon button or the palette's `theme light|dark` commands, always through `themeGlitch()`.
- **Accent theming:** every accent usage goes through `var(--ac, #C778DD)`, set inline on `.site` from React state (`--ac` lives on `.site`, not `:root` — nodes outside `.site` only see the fallback). The command palette's `accent purple|blue|green|yellow` commands swap it at runtime; the hex differs per theme via `ACCENTS[name][theme]` in App.jsx. Hover fills/shadows use `color-mix(in oklab, var(--ac) N%, transparent)`.
- **Breakpoints:** `max-width: 920px` (single-column hero/skills/about/contact/ai, hide social rail + skills deco) and `max-width: 820px` (burger menu replaces nav links, single-column experience, `.pad-x` gutters drop to 22px).
- Reveal/tilt/parallax styling is applied by `src/fx.js` via inline styles on the data-attributed elements; keyframes live in `index.css`.

## Key files

| File | Purpose |
|---|---|
| `src/index.css` | All CSS — reset, keyframes, component classes, responsive breakpoints |
| `src/fx.js` | All imperative effects (see above) |
| `src/sound.js` | Opt-in synthesized UI SFX (see above) |
| `src/data/projects.js` | Project/case-study content |
| `public/vance.jpg` | Hero profile photo |
| `public/vance-tindoc-cv.pdf` | CV served by the Resume section + `download cv` palette command (generated placeholder — replace with the real CV) |
| `public/projects/` | Optional project screenshots: `<slug>.png` or `.jpg` (e.g. `fortiroom.png`); cards fall back to a labelled placeholder when missing |
| `index.html` | Title, meta/OG tags, Fira Code font link |
| `public/favicon.svg` | Two-squares logo mark |

## Gotchas

- For `-webkit-`-prefixed + standard property pairs (e.g. `backdrop-filter` on the glitch veil), the standard property must come LAST: the production CSS minifier dedupes the pair keeping the final declaration, and a `-webkit-backdrop-filter`-only rule renders nothing in Chromium — dev looks fine while the deployed site silently loses the effect. Verify visual effects against `npm run preview`, not just the dev server.

- The contact form POSTs to FormSubmit's AJAX endpoint (`FORM_ENDPOINT` in `src/components/Contact.jsx`) — no backend or API key. FormSubmit requires a one-time activation: the first submission emails an activation link to the inbox; until it's clicked, submissions aren't delivered.
- `initPageEffects` measures element positions on mount for reveals/parallax — keep fixed heights on hero photo (440px) and card shots (172px) so measurements don't shift.
- Special glyphs (▪ ⟫ ↗ → ↵ ✕ ≡) are literal UTF-8 in source; keep files UTF-8 encoded.
