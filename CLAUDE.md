# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ananth Preetham — built with Next.js 13 (Pages Router), React 18, and Tailwind CSS. Deployed on Vercel at https://ananthp.vercel.app.

## Development Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (next/core-web-vitals config)
npm run test         # Run Jest test suite
npm run test:watch   # Run Jest in watch mode
```

## Architecture

**Framework:** Next.js 13 with Pages Router (not App Router). `reactStrictMode: true` is set in `next.config.js`.

**Node version:** 24.x (specified in `package.json` engines field).

**Key directories:**
- `pages/` — Route pages (`_app.js`, `_document.js`, `index.js`, `work/index.js`, `projects/index.js`)
- `components/` — Reusable components (currently only `Navbar.jsx`)
- `lib/` — Utility functions (`groupByYear.js`)
- `styles/globals.css` — Global Tailwind + custom CSS (dark-themed, `#0d1117` background)
- `public/` — Static assets (`memoji.png`, `prof-pic.png`, favicons)
- `__tests__/` — Jest + Testing Library unit tests (`home/`, `work/`, `projects/`)
- `specs/` — Feature specs, plans, and task breakdowns (speckit workflow)
- `.specify/` — Speckit templates, scripts, and project constitution
- `.claude/commands/` — Claude Code slash command definitions (speckit.*)

**Path alias:** `@/*` maps to the project root via `jsconfig.json`.

**Styling:** Tailwind CSS utility classes throughout. Dark mode is the only mode — the site uses a dark `#0d1117` background. No light mode toggle or `dark:` variant classes. Libre Baskerville is used for headings via `next/font/google`.

**Content:** Page content (bio, work history, project data) lives directly in the page files — there is no CMS or data layer. Work history is in `pages/work/index.js`; bio/intro is in `pages/index.js`; project list is in `pages/projects/index.js`.

**Navbar:** The shared navigation lives in `components/Navbar.jsx` and is rendered globally via `pages/_app.js`. Active state is detected via `useRouter().pathname`.

**Navbar items and destinations:**
- `Home` → `/` (`pages/index.js`)
- `Projects` → `/projects` (`pages/projects/index.js`)
- `Work` → `/work` (`pages/work/index.js`)

## Page Structure Convention

Every page follows this layout pattern:

1. `<Head>` — unique `<title>`, `<meta name="description">`, favicon link
2. `<section>` wrapper — responsive padding + `max-w-2xl` centered layout
3. `<Navbar />` at the top of page content
4. Page-specific content
5. Footer (home page only)

## Styling Conventions

**Color palette (Tailwind neutrals on dark background):**
- Background: `#0d1117` (set in `globals.css`)
- Primary text / active nav: `text-neutral-200`
- Secondary text / descriptions: `text-neutral-400`
- Inactive nav: `text-neutral-500`
- Subtle / metadata: `text-neutral-600`
- Borders / dividers: `border-neutral-800`

**Typography:**
- Body font: Inter (set in `globals.css`)
- Heading font: Libre Baskerville (loaded via `next/font/google`, className applied inline)
- `<h1>` always uses Libre Baskerville className — never apply it as a string literal

**Responsive layout:**
- Mobile: `px-6`
- Tablet: `sm:px-20`
- Desktop: `lg:px-0` with `max-w-2xl mx-auto` centering

**Navbar sticky behavior:** `lg:sticky lg:top-20` (sticky only on large screens).

## Link Conventions

- External links: always `target="_blank" rel="noopener noreferrer"`
- Internal nav: `<Link href="/path">` (no target/rel)
- Touch targets: minimum `min-h-[44px] min-w-[44px]` for interactive icons (accessibility)
- Destination-aware labels on project links: "GitHub ↗", "Devpost ↗", "Open ↗"

## Projects Page — Key Details

**Data structure:** Array of project objects with `{ title, year, description, tech, link? }`.

**Timeline layout:**
- Vertical spine: `w-px bg-neutral-800` absolute line on the left
- Year column: `w-12` (mobile), `sm:w-16` (tablet+), labels right-aligned
- Projects grouped by year (newest-first) via `lib/groupByYear.js`
- Tech stack tags: `border border-neutral-800 rounded px-1.5 py-1.5 text-xs`

**Scroll animations:**
- Driven by `IntersectionObserver` in a `useEffect`
- On mount: `document.body.classList.add('js-animations')`
- CSS in `globals.css`: `.project-card` transitions opacity/translateY when `.is-visible` is added
- Respects `prefers-reduced-motion` — cards always visible if motion is reduced or JS is disabled
- `IntersectionObserver` is mocked in `jest.setup.js` (not available in jsdom)

## Utility: `lib/groupByYear.js`

```js
groupByYear(projects)
// Returns: [{ year: 2026, projects: [...] }, { year: 2025, projects: [...] }, ...]
// Sorted newest-first; preserves declaration order within each year
```

## Testing

**Stack:** Jest 30 + React Testing Library + `@testing-library/jest-dom`.

**Test locations:**
- `__tests__/home/home-page.test.js` — home page layout, nav state, social icons, footer
- `__tests__/work/work-page.test.js` — work page padding, nav state, fonts, no memoji
- `__tests__/projects/projects-page.test.js` — projects page links, nav state, h1, link labels
- `__tests__/projects/timeline-logic.test.js` — unit tests for `groupByYear()`

**Key test patterns:**
- `next/router` is mocked to return a pathname (e.g. `{ pathname: '/projects' }`)
- `IntersectionObserver` is globally mocked in `jest.setup.js`
- Tests assert exactly one `<h1>`, correct nav active state, WCAG touch targets, and link attributes
- **Write tests before implementation** — this is a non-negotiable project convention

**Test configuration:** `jest.config.js` uses `next/jest` with `testEnvironment: 'jsdom'`.

## Speckit Workflow

Feature development follows the speckit workflow stored in `specs/` and `.specify/`:

1. **Specify** — create `specs/<id>-<name>/spec.md` with user stories and acceptance criteria
2. **Clarify** — refine ambiguous requirements
3. **Plan** — create `plan.md` with implementation phases
4. **Tasks** — break plan into `tasks.md` with actionable items
5. **Implement** — execute tasks; test-first
6. **Analyze** — cross-artifact consistency check

Active feature specs:
- `specs/001-project-page/` — Projects timeline page (complete)
- `specs/003-project-links-nav/` — Project links and nav (in progress)
- `specs/004-design-polish/` — Design polish (in progress)

## Project Governance (from `.specify/memory/constitution.md`)

- Content always lives in page files — no CMS, no external data layer
- Accessibility baseline: one `<h1>` per page, semantic HTML, WCAG contrast, metadata in `<Head>`
- Always-dark theme — no light mode
- External links always open in new tab
- Test-first discipline — tests are written before or alongside feature implementation
- No bare `<br>` elements — use margin/padding for spacing

## Dependencies

**Runtime:** `next@13.2.4`, `react@18.2.0`, `react-dom@18.2.0`

**Dev:** `jest@^30`, `@testing-library/react@^16`, `@testing-library/jest-dom@^6`, `tailwindcss@^3.2.7`, `eslint@9`, `eslint-config-next@16`

## Deployment

- **Platform:** Vercel — automatic deployments on push to default branch
- **Live URL:** https://ananthp.vercel.app
- No CI/CD configuration files (`.github/workflows/`) exist in the repository

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
