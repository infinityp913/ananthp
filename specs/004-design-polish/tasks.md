# Tasks: Design Polish

Generated from `plan.md` after /plan-design-review + /plan-eng-review.
All decisions locked. Constitution §V requires tests written before each code change.

## Phase 0 — Constitution Amendment

- [x] **T-01** Amend `.specify/memory/constitution.md` §IV "Page Layout Pattern" — change memoji item from "all pages" to "home page only"

## Phase 1 — Tests First (write before code)

- [x] **T-02** `__tests__/home/home-page.test.js` — add tests:
  - Social icon `<a>` wrappers have `min-h-[44px]` and `min-w-[44px]` in className
  - Footer element has `py-12` in className (not `py-24`)
  - No `<br>` elements in rendered homepage
  - Memoji image still renders on home page (src `/memoji.png`)

- [x] **T-03** `__tests__/work/work-page.test.js` — add tests:
  - Section element has `px-6` in className, NOT `px-20`
  - No image with src `/memoji.png` rendered

- [x] **T-04** `__tests__/projects/projects-page.test.js` — update + add tests:
  - UPDATE: `within(donateitCard).getByText('[link to project]')` → `getByText('Devpost ↗')`
  - UPDATE: `within(donateitCard).getByText('[link to project]').tagName` → `'Devpost ↗'`
  - UPDATE: `within(gpuCard).queryByText('[link to project]')` → `queryByText('Open ↗')` (still null)
  - ADD: GitHub-linked project (e.g. I-JEPA) shows `'GitHub ↗'`
  - ADD: Devpost-linked project (DonateIt) shows `'Devpost ↗'`
  - ADD: Netlify-linked project (PALP) shows `'Open ↗'`
  - ADD: No-link project (GPU Server) renders no link label
  - ADD: No image with src `/memoji.png` rendered
  - ADD: `'projects'` nav link has `text-neutral-200` in className
  - ADD: `'home'` and `'work'` nav links do NOT have `text-neutral-200` (have `text-neutral-500`)

- [x] **T-05** `__tests__/home/home-page.test.js` — add nav active state tests:
  - `'home'` nav link has `text-neutral-200` (pathname mocked as `/`)
  - `'projects'` and `'work'` nav links do NOT have `text-neutral-200`

- [x] **T-06** `__tests__/work/work-page.test.js` — add nav active state tests:
  - `'work'` nav link has `text-neutral-200` (pathname mocked as `/work`)
  - `'home'` and `'projects'` nav links do NOT have `text-neutral-200`

- [x] **T-07** Run `npm test` — confirm all new tests FAIL (red phase, not yet implemented)

## Phase 2 — Implementation

- [x] **T-08** `components/Navbar.jsx` — active state + touch targets:
  - Import `useRouter` from `next/router`
  - Compute active className: `router.pathname === path ? 'text-neutral-200' : 'text-neutral-500'`
  - Add to link className alongside existing classes
  - Change `py-1` → `py-3`

- [x] **T-09** `pages/index.js` — social icons, br cleanup, footer:
  - Add `min-h-[44px] min-w-[44px] flex items-center justify-center` to LinkedIn `<a>` wrapper
  - Add `min-h-[44px] min-w-[44px] flex items-center justify-center` to GitHub `<a>` wrapper
  - Remove both `<br>` tags; wrap `<details>` in `<div className="mt-4">`
  - Change footer `py-24` → `py-12`
  - (Memoji stays on home page — no change needed)

- [x] **T-10** `pages/work/index.js` — mobile padding + remove memoji:
  - Change section `px-20` → `px-6 sm:px-20 lg:px-0`
  - Remove `<Image alt="Ananth Preetham" src="/memoji.png" ...>` block and surrounding div

- [x] **T-11** `pages/projects/index.js` — remove memoji + destination-aware link labels:
  - Remove `<Image alt="Ananth Preetham" src="/memoji.png" ...>` block and surrounding div
  - Add `linkLabel` helper function above the component:
    ```js
    function linkLabel(href) {
      if (href.includes('github.com')) return 'GitHub ↗';
      if (href.includes('devpost.com')) return 'Devpost ↗';
      return 'Open ↗';
    }
    ```
  - Replace `[link to project]` text in the JSX with `{linkLabel(project.link)}`

## Phase 3 — Validation

- [x] **T-12** Run `npm test` — confirm ALL tests pass (green phase)
- [x] **T-13** Run `npm run build` — confirm no build errors
- [x] **T-14** Run `npm run lint` — pre-existing ESLint v9 incompatibility (not introduced by this spec)
- [ ] **T-15** Manual browser check (constitution §V note for visual changes):
  - Mobile 375px: Work page content not squeezed
  - All pages: active nav link visually brighter
  - Projects page: GitHub/Devpost/Open labels correct
  - Home page: social icons have larger tap area (44px), footer gap reduced
