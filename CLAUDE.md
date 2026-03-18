# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Personal portfolio website for Ananth Preetham — built with Next.js 13 (Pages Router), React 18, and Tailwind CSS.

## Development Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint (next/core-web-vitals config)
```

## Architecture

**Framework:** Next.js 13 with Pages Router (not App Router).

**Key directories:**
- `pages/` — Route pages (`_app.js`, `_document.js`, `index.js`, `work/index.js`)
- `components/` — Reusable components (currently only `Navbar.jsx`)
- `styles/globals.css` — Global Tailwind + custom CSS (dark-themed, `#0d1117` background)
- `public/` — Static assets (images, favicon)

**Path alias:** `@/*` maps to the project root via `jsconfig.json`.

**Styling:** Tailwind CSS utility classes throughout. Dark mode is the default — the site uses a dark `#0d1117` background. Libre Baskerville is used for headings via Google Fonts.

**Content:** Page content (bio, work history, links) lives directly in the page files — there is no separate CMS or data layer. Work history is in `pages/work/index.js`; bio/intro is in `pages/index.js`.

**Navbar:** The shared navigation lives in `components/Navbar.jsx` and is rendered globally via `pages/_app.js`.

**Navbar items and destinations:**
- `Home` → `/` (main landing page, `pages/index.js`)
- `Work` → `/work` (work history page, `pages/work/index.js`)
- `Projects` → `/projects` (projects page, `pages/projects/index.js`)

