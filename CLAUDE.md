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
- `pages/` — Route pages (`_app.js`, `_document.js`, `index.js`, `work/index.js`, `projects/index.js`)
- `components/` — Reusable components (currently only `Navbar.jsx`)
- `styles/globals.css` — Global Tailwind + custom CSS (dark-themed, `#0d1117` background)
- `public/` — Static assets (images, favicon)
- `__tests__/` — Jest + Testing Library unit tests (`home/`, `work/`, `projects/`)
- `specs/` — Feature specs, plans, and task breakdowns (gstack speckit workflow)

**Path alias:** `@/*` maps to the project root via `jsconfig.json`.

**Styling:** Tailwind CSS utility classes throughout. Dark mode is the default — the site uses a dark `#0d1117` background. Libre Baskerville is used for headings via Google Fonts.

**Content:** Page content (bio, work history, links) lives directly in the page files — there is no separate CMS or data layer. Work history is in `pages/work/index.js`; bio/intro is in `pages/index.js`.

**Navbar:** The shared navigation lives in `components/Navbar.jsx` and is rendered globally via `pages/_app.js`.

**Navbar items and destinations:**
- `Home` → `/` (main landing page, `pages/index.js`)
- `Work` → `/work` (work history page, `pages/work/index.js`)
- `Projects` → `/projects` (projects page, `pages/projects/index.js`)

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
