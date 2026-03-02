# Implementation Plan: Projects Page

**Branch**: `001-project-page` | **Date**: 2026-02-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-project-page/spec.md`

---

## Summary

Add a `/projects` page to the portfolio that displays hackathon projects on a vertical timeline, grouped and sorted by year (newest first). Project cards animate in/out as they enter/leave the viewport. The page is responsive (320px–1440px), fully accessible without JS, and respects `prefers-reduced-motion`. External project links open in a new tab; link is optional per project.

---

## Technical Context

**Language/Version**: JavaScript (ES2020+), Node 24.x
**Primary Dependencies**: Next.js 13.2.4 (Pages Router), React 18.2.0, Tailwind CSS 3.x
**Storage**: N/A — all project data is static, declared in the page file
**Testing**: Jest (via `next/jest`) + React Testing Library + jest-dom — to be set up as part of this feature
**Target Platform**: Web (desktop + mobile, 320px–1440px)
**Project Type**: Web application page (Next.js Pages Router)
**Performance Goals**: Smooth 60fps animations; standard web page load
**Constraints**: No JS graceful degradation (cards visible), `prefers-reduced-motion` respected, no horizontal overflow at 320px
**Scale/Scope**: Single page, 3 initial projects, designed for easy addition of future entries

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Content in page files | ✅ Pass | Project data declared as static array in `pages/projects/index.js` |
| II. Accessibility & SEO | ✅ Pass | One `<h1>`, semantic `<article>`/`<ul>` structure, unique `<title>` + `<meta name="description">`, sufficient contrast |
| III. Always-Dark | ✅ Pass | No light mode variants; dark background `#0d1117` inherited globally |
| IV. External links → new tab | ✅ Pass | All project links use `target="_blank" rel="noopener noreferrer"` |
| V. Test-first | ✅ Pass | Jest setup + tests written before page implementation (Tasks 1–2 gate Task 3) |

No violations. Complexity Tracking table omitted.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-project-page/
├── plan.md              ← this file
├── research.md          ← Phase 0 (animation, testing, layout decisions)
├── data-model.md        ← Phase 1 (Project entity, groupByYear logic)
├── quickstart.md        ← Phase 1 (dev commands, manual test checklist)
├── checklists/
│   └── requirements.md
└── tasks.md             ← Phase 2 output (/speckit.tasks — not yet created)
```

### Source Code

```text
pages/
└── projects/
    └── index.js         ← NEW: projects page

components/
└── Navbar.jsx           ← MODIFY: uncomment /projects nav entry

styles/
└── globals.css          ← MODIFY: add animation CSS (.project-card, .js-animations)

__tests__/
└── projects/
    ├── timeline-logic.test.js   ← NEW: unit tests for groupByYear, sort order
    └── projects-page.test.js    ← NEW: RTL tests for link attrs, heading, no-link case

jest.config.js           ← NEW: next/jest config
jest.setup.js            ← NEW: imports @testing-library/jest-dom
```

**Structure Decision**: Single Next.js project layout. No backend or API routes needed. Tests live in `__tests__/` (not `pages/`) to avoid Next.js treating them as routes.

---

## Implementation Phases

### Phase A — Test Infrastructure (prerequisite for all code tasks)

Set up Jest so tests can be written and run before the page is built.

**Tasks**:
1. Install test devDependencies: `jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom`
2. Create `jest.config.js` using `next/jest` transformer
3. Create `jest.setup.js` importing `@testing-library/jest-dom`
4. Add `"test": "jest"` and `"test:watch": "jest --watch"` to `package.json` scripts
5. Verify `npm test` runs (zero tests, exit 0)

---

### Phase B — Write Tests First (before page implementation)

Per Constitution V, tests are written before the implementation they cover.

**`__tests__/projects/timeline-logic.test.js`** — pure logic unit tests:
- `groupByYear` returns 2 groups for the 3-project seed data
- Groups are sorted newest-first (2020 before 2019)
- 2019 group contains exactly 2 projects in declaration order
- Empty input returns empty array

**`__tests__/projects/projects-page.test.js`** — component tests (will fail until Phase C):
- Page renders exactly one `<h1>`
- Projects with a `link` render an `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
- Projects without a `link` render the title as plain text (no `<a>`)
- Nav link to `/projects` is present in the Navbar

---

### Phase C — Animation CSS

Add to `styles/globals.css` before implementing the page:

```css
/* Project card scroll animations */
.project-card {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: no-preference) {
  .js-animations .project-card {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .js-animations .project-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Phase D — Navbar Update

In `components/Navbar.jsx`, uncomment the `/projects` entry in `navItems`:

```js
const navItems = {
  '/': { name: 'home' },
  '/work': { name: 'work' },
  '/projects': { name: 'projects' },
};
```

---

### Phase E — Projects Page Implementation

Create `pages/projects/index.js` following the established page layout pattern (Constitution §Page Layout Pattern):

1. **`<Head>`**: `<title>Projects | ananthp</title>` + `<meta name="description" content="...">`
2. **`<section>`** wrapper matching work page layout
3. **`<Navbar />`**
4. **`<Image>`** memoji 100×100
5. **`<h1>`** with Libre Baskerville className
6. **Timeline structure**:
   - Relative container with absolute 1px vertical line
   - `groupByYear(projects)` for year groups, newest-first
   - Year label column: `w-12` (mobile) → `w-16` (≥ sm)
   - Per project: conditional `<a>` (if link) or plain `<span>` (if no link), description, tech tags
   - `useRef` array + `IntersectionObserver` in `useEffect` for `.is-visible` class toggle
   - `document.body.classList.add('js-animations')` on mount; remove on unmount

**Link rendering rule**:
```jsx
{project.link
  ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
  : <span>{project.title}</span>
}
```

**Responsive layout**:
- Mobile (default): `px-6`, `w-12` year column, full-width cards
- `sm:` and up: `px-0`, `w-16` year column, `max-w-2xl` container centered

---

### Phase F — Verify Tests Pass

Run `npm test` — all tests written in Phase B must now pass.

---

### Phase G — Manual Browser Verification

Follow checklist in `quickstart.md`. Document results in PR description (required by Constitution V for visual/animation behavior that cannot be automatically tested).
