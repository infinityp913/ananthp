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

## Active Technologies
- JavaScript (ES2020+), Node 24.x + Next.js 13.2.4 (Pages Router), React 18.2.0, Tailwind CSS 3.x (001-project-page)
- N/A — all project data is static, declared in the page file (001-project-page)
- N/A — all movie data is statically declared in the page file (001-movies-ranking)
- N/A — all content is static, declared in page files (003-project-links-nav)

## Recent Changes
- 001-project-page: Added JavaScript (ES2020+), Node 24.x + Next.js 13.2.4 (Pages Router), React 18.2.0, Tailwind CSS 3.x
