# ananthp Portfolio Constitution

## Core Principles

### I. Content Lives in Page Files
All bio, work history, and link content is authored directly in page JSX files — no CMS, database, or separate data layer.

### II. Accessibility & SEO Baseline
Every page must meet a minimum standard for accessibility and SEO. Use semantic HTML, ensure keyboard-accessible interactions, and provide `robots.txt` and `sitemap.xml` for search engines.

- Headings: exactly one `<h1>` per page with logical `h2`/`h3` structure.
- Images: provide meaningful `alt` text or an empty `alt` for decorative images.
- Contrast: maintain sufficient color contrast against the `#0d1117` background.
- Metadata: each page must define a unique `<title>` and `<meta name="description">` that accurately describe its content.

### III. Always-Dark, No Light Mode
The site is permanently dark-themed (`background: #0d1117`). There is no light mode toggle. Do not add `dark:` variant classes unless they already exist in the file being edited.

### IV. External Links Open in New Tabs
All links pointing to external URLs must include `target="_blank"` and `rel="noopener noreferrer"`. Internal navigation (same-site routes) uses Next.js `<Link>` without these attributes.

### V. Test-first (Non-Negotiable)
All non-trivial behavior or layout changes must be accompanied by tests written or updated **before** implementation. No feature, refactor, or bugfix is considered complete without an appropriate test.

- New behavior: add or extend tests that would fail without the change.
- Bugfixes: write a regression test that reproduces the bug first.
- Refactors: keep the existing test suite green throughout; do not delete tests without replacing equivalent coverage.

If it cannot be tested automatically (purely visual or copy-only), perform an explicit manual check in the browser and document it in the pull request description. Skipping tests for the sake of speed is not allowed.

## Page Layout Pattern

Both pages (`index.js`, `work/index.js`) follow this structure:
1. `<Head>` — title, viewport, favicon
2. `<section>` wrapper with padding and flex layout
3. `<Navbar>` component
4. `<Image>` memoji (100×100, `/memoji.png`)
5. `<h1>` with Libre Baskerville applied via inline className
6. Page body content
7. Footer (home page only) — Steve Jobs quote + "Inspired by leerob.io"

New pages must follow a similar structure with appropriate adjustments for their specific content.

## Development Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Governance

This constitution supersedes ad-hoc decisions. All changes to structure, dependencies, or styling approach must comply with these principles. Content-only edits (bio text, work bullets, links) do not require principle review.

**Version**: 1.0.0 | **Ratified**: 2026-02-27 | **Last Amended**: 2026-02-27
