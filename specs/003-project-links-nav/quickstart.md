# Quickstart: Project Links, Nav Reorder & Layout Consistency

**Branch**: `003-project-links-nav`

## Prerequisites

- Node 24.x, npm
- `npm install` already run

## Development

```bash
npm run dev        # http://localhost:3000
npm run lint       # ESLint check
npm test           # Jest test suite
npm run test:watch # Jest in watch mode
```

## Implementation order (test-first)

Per the project constitution, tests must be written/updated before changing implementation code.

### Step 1 — Update tests first (`__tests__/projects/projects-page.test.js`)

The existing link-rendering tests assert the old behaviour (title inside `<a>`). Update them to assert the new behaviour before touching `pages/projects/index.js`:

1. **"project titles with a link render as anchors"** → replace with: title is plain text (not wrapped in `<a>`); a `[link to project]` anchor exists in the same card with correct `href`, `target="_blank"`, `rel="noopener noreferrer"`.
2. **"no-link rendering"** → replace with: title is NOT inside an `<a>`; a project without a link has no `[link to project]` anchor.

Add new tests:
3. **Navbar order**: nav links render in order home → projects → work.
4. **Work page h1 font**: the `<h1>` on the Work page does not have a class containing `[object Object]`.
5. **Home page section layout**: the `<section>` on the Home page has class `max-w-2xl` and does not have class `h-screen`.

Run `npm test` — these new/updated tests should fail at this point (red).

### Step 2 — Implement changes

Apply changes in this order (each should turn its corresponding tests green):

1. **`components/Navbar.jsx`** — swap `/work` and `/projects` entries in `navItems`
2. **`pages/work/index.js`** — fix `h1` className: `${libreBaskerville}` → `${libreBaskerville.className}`; also remove `mb-5` if needed (already absent on projects page; keep if it doesn't affect test)
3. **`pages/index.js`** — fix `h1` className: `${libreBaskerville}` → `${libreBaskerville.className}`, remove redundant `font-serif`; align `<section>` and content `<div>` layout classes with Work/Projects
4. **`pages/projects/index.js`** — refactor link rendering: title always `<span>`, add `[link to project]` anchor below title when link exists

### Step 3 — Manual browser verification

After all tests pass:

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Verify Navbar shows: home · projects · work (left to right)
4. Click between all three pages — memoji must not visibly shift position
5. Compare heading typeface on Home, Projects, and Work — should look identical
6. On `/projects`: for a project with a link (e.g. "DonateIt") confirm title is plain text and "[link to project]" appears below it; click it — opens in new tab
7. For a project without a link (e.g. "GPU Server") confirm no "[link to project]" appears
8. Check on mobile viewport (DevTools → 375px): layout must not overflow; "[link to project]" must be tappable

## Files changed

| File | Change |
|------|--------|
| `components/Navbar.jsx` | Reorder nav items |
| `pages/work/index.js` | Fix h1 font class |
| `pages/index.js` | Fix h1 font class; align layout |
| `pages/projects/index.js` | Refactor link rendering |
| `__tests__/projects/projects-page.test.js` | Update + add tests |
