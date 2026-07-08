# vance-portfolio

Personal portfolio of **Vance Luke Tindoc** — full-stack developer (Laravel · Vue 3 · IoT), Kuala Lumpur.
Single-page React + Vite app with a One Dark / terminal aesthetic: boot sequence, command palette (`Ctrl+K` or `/`), case-study modals, scroll reveals, custom cursor and accent theming.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the built site locally
npm run lint
```

## Deploy (Vercel)

Push the repo and import it in Vercel — the Vite preset is auto-detected (build `npm run build`, output `dist/`). No extra config needed.

## Project screenshots

Cards in the projects section look for images in `public/projects/` and show a labelled placeholder until you add them. Drop files named after each project slug (`.png` or `.jpg`):

```
public/projects/dbm-bluedale-crm.png
public/projects/fortiroom.png
public/projects/service-day-dashboard.png
public/projects/concert-ticket-booking.png
public/projects/library-book-rental.png
```

## Notes

- Content (projects, experience, skills) lives in `src/data/projects.js` and the section components in `src/components/`.
- Site-wide toggles (accent color, custom cursor, AI-workflow section) are in `SETTINGS` at the top of `src/App.jsx`.
- The contact form delivers for real via [FormSubmit](https://formsubmit.co) (`FORM_ENDPOINT` in `src/components/Contact.jsx`) — no account or backend needed. **One-time setup:** the first submission sends an activation email to vancetindoc@gmail.com; click the link in it once and all future messages land in the inbox.
