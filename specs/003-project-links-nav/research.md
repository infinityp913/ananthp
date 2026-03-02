# Research: Project Links, Nav Reorder & Layout Consistency

**Branch**: `003-project-links-nav` | **Date**: 2026-03-02

All decisions below resolve directly from reading the existing source code. No external research was required.

---

## Decision 1: Font application pattern

**Question**: Why does the Work page heading not render in Libre Baskerville, even though the font is imported?

**Finding**: Next.js Google Font imports return a font object with a `.className` property containing the generated CSS class string. Using `${libreBaskerville}` in a template literal interpolates the object itself (`[object Object]`), which is not a valid CSS class. Using `${libreBaskerville.className}` is the correct pattern.

- **Projects page** (`pages/projects/index.js:167`): Uses `.className` — correct ✅
- **Work page** (`pages/work/index.js:35`): Missing `.className` — broken ❌
- **Home page** (`pages/index.js:34`): Missing `.className`, also has a redundant `font-serif` class — broken ❌

**Decision**: Replace `${libreBaskerville}` with `${libreBaskerville.className}` on both Work and Home `<h1>` elements. Remove the redundant `font-serif` from Home.

**Rationale**: Matches the correct pattern already in use on the Projects page.

**Alternatives considered**: None — this is a clear bug, not a choice.

---

## Decision 2: Home page layout alignment approach

**Question**: What minimal set of class changes aligns the Home page top-of-content area with Work and Projects?

**Finding**: Three layout layers diverge:

| Layer | Home | Work | Projects |
|-------|------|------|----------|
| `<section>` | `h-screen flex-col px-20` | `w-screen m-auto pb-16 px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200` | same as Work but `px-6 sm:px-20` |
| Outer `<div>` | `flex` | `flex` | `flex w-full` |
| Inner content `<div>` | `m-auto mt-[5rem]` | `mt-[5rem]` | `mt-[5rem] w-full` |

The `m-auto` on Home's inner div horizontally centers it independently of the outer section, producing a different offset. The `h-screen` (viewport-height) section also differs from `w-screen` (viewport-width + scrollable) on other pages.

**Decision**: Update Home's `<section>` to use the Work/Projects pattern: `w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200`. Update inner `<div>` from `m-auto mt-[5rem]` to `mt-[5rem]`. The `<footer>` stays inside `<section>` as-is.

**Rationale**: Adopts the canonical layout used on Work and Projects, which are already consistent with each other. Uses the mobile-first `px-6 sm:px-20` from Projects (not the fixed `px-20` from Work) for better mobile handling.

**Alternatives considered**:
- Keep `h-screen`: Would preserve full-viewport scroll lock on Home but the memoji would still shift because of the different centering model.
- Adjust only the inner `<div>`: Insufficient — the section-level class differences also contribute to the positional shift.

---

## Decision 3: "[link to project]" label text and placement

**Question**: What exact text and DOM placement for the project link element?

**Finding**: The user specified the label text as `[link to project]`. The current link wraps the title; moving it to below the title (between title and description) keeps it visually grouped with the project without competing with the title text.

**Decision**: Plain anchor text `[link to project]`, rendered between the title `<span>` and the description `<p>`, styled to be visually distinct (small text, muted colour or underline consistent with the site's link style).

**Rationale**: Matches the user's specified label verbatim. Position between title and description follows natural reading order: title → action → detail.

**Alternatives considered**:
- "→ view project" or "open ↗": Different wording — rejected to honour the user's exact specification.
- Below the description: Would be easy to miss when scanning; placing it before the description keeps it prominent.

---

## Decision 4: Navbar reorder mechanism

**Question**: Does `Object.entries()` preserve insertion order for the `navItems` object?

**Finding**: Yes. In JavaScript (ES2015+), string-keyed object properties maintain insertion order when iterated via `Object.entries()`, `Object.keys()`, or `for...in` (for non-integer keys). The `Navbar.jsx` iterates `navItems` via `Object.entries(...).map(...)`. Reordering the object's key declarations is sufficient to reorder the rendered links.

**Decision**: Swap the `/work` and `/projects` entries in `navItems` so the order is `/`, `/projects`, `/work`.

**Rationale**: The simplest correct solution with no logic changes.

**Alternatives considered**: Convert to an array — not needed; object ordering is reliable for these string keys.

---

## Decision 5: Test update strategy for link rendering change

**Question**: How to update existing tests without losing coverage?

**Finding**: Two existing test cases assert that titles (`DonateIt`, `TampAlert!`, `Trashcan Finder`) are wrapped in `<a>` elements. After the refactor, titles will be plain text — these assertions must be inverted. New assertions needed:

1. For a project with a link: title is NOT an anchor; a `[link to project]` anchor exists with correct `href`, `target="_blank"`, and `rel="noopener noreferrer"`.
2. For a project without a link: title is NOT an anchor; no `[link to project]` anchor exists.
3. Navbar order test: nav links appear in order home → projects → work.
4. Work page `<h1>` font class test: className does not contain `[object Object]`.
5. Home page layout class test: `<section>` has `max-w-2xl` and does not have `h-screen`.

The constitution (§V) requires tests to be written/updated before implementation code changes.
