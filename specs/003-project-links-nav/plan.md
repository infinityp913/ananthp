# Implementation Plan: Project Links, Nav Reorder & Layout Consistency

**Branch**: `003-project-links-nav` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)

## Summary

Four independent visual/UX improvements to the portfolio site: (1) detach project external links from titles and surface them as a distinct "[link to project]" label, (2) reorder Navbar items so "projects" precedes "work", (3) fix the Work page heading to use the same Libre Baskerville typeface as the Home and Projects headings, and (4) align the Home page's top-of-content layout with the Work and Projects pages so the memoji and navbar do not shift position during navigation. All changes are in existing page and component files; no new pages or data layers are introduced.

## Technical Context

**Language/Version**: JavaScript (ES2020+), Node 24.x
**Primary Dependencies**: Next.js 13.2.4 (Pages Router), React 18.2.0, Tailwind CSS 3.x
**Storage**: N/A — all content is static, declared in page files
**Testing**: Jest 30 + @testing-library/react 14 + jest-environment-jsdom
**Target Platform**: Web (dark-themed portfolio, desktop + mobile)
**Project Type**: Web application (static portfolio)
**Performance Goals**: Standard web page — no special performance constraints
**Constraints**: Always-dark theme; Pages Router only; Tailwind-only styling; test-first (constitution §V)
**Scale/Scope**: 3 pages, 1 shared component, 2 existing test files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Content in page files | ✅ Pass | All changes remain in `pages/` files and `components/Navbar.jsx`; no new data layer |
| II — Accessibility & SEO | ✅ Pass | "[link to project]" will be a proper `<a>` element with meaningful text; one `<h1>` per page preserved |
| III — Always dark | ✅ Pass | No light-mode classes introduced |
| IV — External links in new tabs | ✅ Pass | "[link to project]" must carry `target="_blank" rel="noopener noreferrer"` — same rule as existing links |
| V — Test-first | ⚠️ Action required | Two existing tests assert that project titles are inside `<a>` elements — these will fail after the link-rendering refactor. Tests must be updated to cover the new "[link to project]" pattern **before** the page code changes. |

**Complexity Tracking**: No constitution violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/003-project-links-nav/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── quickstart.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks — not created here)
```

No `data-model.md` (no new entities) and no `contracts/` (no external interfaces).

### Source Code (files touched by this feature)

```text
components/
└── Navbar.jsx                           # Reorder nav items: projects before work

pages/
├── index.js                             # Align section/div layout classes with work & projects pages
├── work/index.js                        # Fix h1 className: libreBaskerville → libreBaskerville.className
└── projects/index.js                    # Refactor link rendering: title always plain text + "[link to project]" label

__tests__/
└── projects/
    └── projects-page.test.js            # Update link-related assertions for new rendering model
```

**Structure Decision**: Single-project layout (Option 1). All changes are within the existing `pages/`, `components/`, and `__tests__/` directories — no new directories needed.

---

## Phase 0 — Research

*All questions resolve directly from reading the source code. No external research needed.*

See [research.md](./research.md).

---

## Phase 1 — Design

### 1. Navbar Reorder (`components/Navbar.jsx`)

The `navItems` object currently declares keys in the order: `/`, `/work`, `/projects`. Since `Object.entries()` preserves insertion order in modern JS, swapping the entries to `/`, `/projects`, `/work` is sufficient.

**Test coverage needed**: A new test asserting that the three nav links appear in the DOM in the order home → projects → work (by checking their index among all nav links).

---

### 2. Work Page Heading Font (`pages/work/index.js`)

The `<h1>` className on the Work page uses `${libreBaskerville}` (the font *object*) instead of `${libreBaskerville.className}` (the CSS class *string*). This means the template literal interpolates `[object Object]`, which is not a valid CSS class — the Libre Baskerville font is silently not applied.

The Projects page already uses `libreBaskerville.className` correctly. The fix is a single-token change on the Work page's `<h1>`.

The Home page has the same bug (`${libreBaskerville}` without `.className`) and also adds a redundant `font-serif` class. Both issues should be fixed in the same pass.

**Test coverage needed**: Assert that the Work page `<h1>` has a className that does not contain `[object Object]` and does contain the expected Libre Baskerville class token (which can be identified at test time via `libreBaskerville.className`).

---

### 3. Home Page Layout Alignment (`pages/index.js`)

The structural diff between Home and Work/Projects reveals three divergences that cause the memoji/navbar to appear to shift:

| Layer | Home (current) | Work/Projects (target) |
|-------|---------------|----------------------|
| `<section>` classes | `h-screen flex-col px-20` | `w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200` |
| Outer `<div>` | `flex` | `flex w-full` |
| Inner `<div>` | `m-auto mt-[5rem]` | `mt-[5rem] w-full` |

The `m-auto` on the inner div (Home) overrides the top margin effect and centers differently than the `mt-[5rem]` used on Work/Projects. The `h-screen` on the `<section>` (Home) also differs from the `w-screen` + scrolling layout of other pages.

The Home page must retain its `<footer>` (Steve Jobs quote), which is absent from Work/Projects. The footer remains inside the `<section>` after the layout update.

**Test coverage needed**: Structural alignment is a visual concern; automated test should assert the `<section>` does not have class `h-screen` (which signals the old layout) and does have `max-w-2xl` (which signals alignment with the other pages). A manual browser check across all three pages is required per constitution §V note.

---

### 4. Project Link Rendering (`pages/projects/index.js`)

**Current rendering** (simplified):
```
{project.link ? <a href={link}>{project.title}</a> : <span>{project.title}</span>}
```

**New rendering** (simplified):
```
<span>{project.title}</span>
{project.link && <a href={link} target="_blank" rel="noopener noreferrer">[link to project]</a>}
```

The `[link to project]` element sits between the title and the description (same vertical position as the current anchor wrapping the title).

**Existing tests that break** (must be updated before the page change):
- `projects-page.test.js` — "project titles with a link render as anchors": Asserts `getByText('DonateIt').closest('a')` is non-null. After the change, `DonateIt` is plain text — this assertion will fail. **New assertion**: `getByText('[link to project]', { selector: 'a' })` for a project card that has a link; verify `target` and `rel` attributes; verify the title itself is NOT an anchor.
- `projects-page.test.js` — "no-link rendering": Asserts that `['DonateIt', 'TampAlert!', 'Trashcan Finder']` are each inside an `<a>`. After the change, none of the titles are anchors. **New assertion**: for each title, verify `.closest('a')` is `null`; verify sibling "[link to project]" anchor exists for titles with links and is absent for titles without.

---

## Agent Context Update

Run after plan is written:

```bash
.specify/scripts/bash/update-agent-context.sh claude
```
