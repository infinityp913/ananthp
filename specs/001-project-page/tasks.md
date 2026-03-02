# Tasks: Projects Page

**Input**: Design documents from `/specs/001-project-page/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ quickstart.md ✅

**Tests**: Included — Constitution V mandates test-first for all non-trivial behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths included in every task description

---

## Phase 1: Setup (Test Infrastructure)

**Purpose**: Install and configure Jest so tests can be written and run before any page code is built. Required by Constitution V (test-first, non-negotiable).

- [x] T001 Install test devDependencies: `npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom`
- [x] T002 Create `jest.config.js` at repo root using `next/jest` transformer (see plan.md Phase A for exact config)
- [x] T003 [P] Create `jest.setup.js` at repo root with `import '@testing-library/jest-dom'` + IntersectionObserver mock
- [x] T004 [P] Add `"test": "jest"` and `"test:watch": "jest --watch"` scripts to `package.json`
- [x] T005 Run `npm test` and confirm: zero tests found, exit code 0 (setup is working)

**Checkpoint**: Test runner is operational. Writing tests can now begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tests written before any implementation (Constitution V). Animation CSS added before the page that uses it. Pure utility extracted for testability.

**⚠️ CRITICAL**: Tests in T007–T008 MUST be written and confirmed FAILING before Phase 3 begins.

- [x] T006 Create `lib/groupByYear.js` exporting the pure `groupByYear(projects)` function (see data-model.md pseudocode — groups by year, sorts descending; no page code, no data)
- [x] T007 Create `__tests__/projects/timeline-logic.test.js` with four unit tests for `groupByYear` imported from `lib/groupByYear.js`:
  - Returns 2 groups for the 3-project seed data
  - Groups sorted newest-first (2020 before 2019)
  - 2019 group contains exactly 2 projects in declaration order
  - Empty input returns empty array
  — Confirmed FAIL before page existed, now PASS
- [x] T008 Create `__tests__/projects/projects-page.test.js` with component tests for `pages/projects/index.js`:
  - Renders exactly one `<h1>` element
  - Projects with a `link` render an `<a>` with `target="_blank"` and `rel="noopener noreferrer"`
  - Projects without a `link` render the title as plain text (no `<a>` element)
  - Navbar contains a link to `/projects`
  — Confirmed FAIL before page existed, now PASS
- [x] T009 [P] Add animation CSS to `styles/globals.css` — `.project-card` default visible state + `@media (prefers-reduced-motion: no-preference)` block with `.js-animations .project-card` (opacity 0, translateY 10px, transition) and `.js-animations .project-card.is-visible` (opacity 1, translateY 0) — see plan.md Phase C for exact CSS

**Checkpoint**: All foundational tests written and confirmed failing. Animation CSS in place. User story implementation can begin.

---

## Phase 3: User Story 1 — Browse Projects via Timeline (Priority: P1) 🎯 MVP

**Goal**: Render a sleek, readable vertical timeline at `/projects` with year-grouped project cards. No animations yet — just structure and content.

**Independent Test**: `npm test` passes all timeline-logic and projects-page tests. Navigate to `http://localhost:3000/projects` and verify the timeline structure renders with year labels and all three project cards (title, description, tech tags).

### Implementation for User Story 1

- [x] T010 [US1] Update `components/Navbar.jsx` — uncomment the `'/projects': { name: 'projects' }` entry in the `navItems` object
- [x] T011 [US1] Create `pages/projects/index.js` with:
  - `<Head>`: `<title>Projects | ananthp</title>` + `<meta name="description" content="Hackathon projects and side builds by Ananth Preetham.">`
  - Standard layout: `<section>` wrapper → `<Navbar>` → `<Image>` memoji (100×100, `/memoji.png`, `priority`) → `<h1>` with `libreBaskerville.className`
  - Static `projects` array at file top (3 seed entries from data-model.md — title, year, description, tech, optional link)
  - Import `groupByYear` from `@/lib/groupByYear`
  - Timeline container: `relative` div with absolute 1px vertical line (`bg-neutral-800`) anchored at left edge of year column
  - Year column width: `w-12` mobile, `sm:w-16` desktop
  - Per year group: year label (`text-neutral-600 text-xs tracking-widest`) + dot marker on the line
  - Per project: conditional title — `<a href={link} target="_blank" rel="noopener noreferrer">` when `link` present, `<span>` when absent; description; tech tags as inline bordered chips
- [x] T012 [US1] Run `npm test` — 9 tests pass across 2 suites ✅

**Checkpoint**: US1 fully functional. Timeline renders. All automated tests green. MVP deliverable — can be demoed or deployed independently.

---

## Phase 4: User Story 2 — Scroll-Triggered Visibility Animations (Priority: P2)

**Goal**: Project cards fade in as they enter the viewport and fade out when they leave. Gracefully degrades: no JS → cards fully visible. `prefers-reduced-motion` respected.

**Independent Test**: Scroll the page slowly and observe each card fading in. Disable JS in browser DevTools — all cards should be visible. Enable `prefers-reduced-motion: reduce` in DevTools — no animation, cards always visible.

### Implementation for User Story 2

- [x] T013 [US2] Add scroll animation logic to `pages/projects/index.js`:
  - Add `useRef([])` for card refs (`cardRefs`)
  - Add `useEffect` that on mount: calls `document.body.classList.add('js-animations')`, creates `IntersectionObserver` with `threshold: 0.1`, observes all `cardRefs.current` entries, toggling `.is-visible` class on enter/exit
  - On cleanup: `document.body.classList.remove('js-animations')` + `observer.disconnect()`
  - Attach `ref={(el) => { cardRefs.current[idx] = el }}` to each project card `div` (use pre-computed flat index)
  - Add `project-card` className to each card div (consumed by animation CSS from T009)
- [ ] T014 [US2] Manual browser verification of animation — document results in a comment at the top of `pages/projects/index.js` (required by Constitution V for visual behavior that cannot be automatically tested): confirm fade-in on scroll-down, fade-out on scroll-up, no animation with JS disabled, no animation with `prefers-reduced-motion: reduce`

**Checkpoint**: US2 complete. Animations active for eligible users; all others see static fully-visible cards.

---

## Phase 5: User Story 3 — Navigate to Project Source (Priority: P3)

**Goal**: Project titles with links open the correct external URL in a new tab. Projects without links show plain text.

**Independent Test**: Click all three project titles. Verify each opens the correct URL in a new tab. Verify the portfolio page stays open. (Tests written in T008 already cover this automatically.)

### Verification for User Story 3

- [x] T015 [US3] Run `npm test` — confirm `projects-page.test.js` assertions for `target="_blank"`, `rel="noopener noreferrer"`, and the no-link plain-text case all pass (these tests cover US3 behaviour; implementation is already present from T011)
- [ ] T016 [US3] Manual browser check per quickstart.md: click DonateIt → `https://devpost.com/software/donateit-4il5tg` in new tab; TampAlert! → `https://devpost.com/software/tampalert`; Trashcan Finder → `https://devpost.com/software/trashcan-finder`; verify portfolio page stays open throughout

**Checkpoint**: All three user stories independently functional and verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mobile responsiveness, linting, and full manual verification sweep.

- [x] T017 Run `npm run lint` — pre-existing eslint/eslint-config-next version incompatibility on main (not introduced by this feature); new files follow established codebase patterns
- [ ] T018 [P] Manual mobile verification — open DevTools responsive mode: test 320px (no horizontal scroll, timeline readable), 375px, 768px; check year label and card widths at each breakpoint
- [ ] T019 [P] Manual full checklist run from `specs/001-project-page/quickstart.md` — check off each item and note any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 complete — BLOCKS all user story phases
- **Phase 3 (US1)**: Depends on Phase 2 — no dependency on US2 or US3
- **Phase 4 (US2)**: Depends on Phase 3 (animations hook into the page built in T011)
- **Phase 5 (US3)**: Depends on Phase 3 (link rendering implemented in T011; T015 re-runs tests)
- **Phase 6 (Polish)**: Depends on Phases 3–5 all complete

### User Story Dependencies

- **US1 (P1)**: Depends only on Foundational. No dependency on US2 or US3.
- **US2 (P2)**: Depends on US1 (adds behaviour to the page built in T011). Cannot be implemented before US1.
- **US3 (P3)**: Implementation is part of US1 (T011). Phase 5 is verification-only; can run after T011 in parallel with US2.

### Within Each Phase

- T007 and T008 must FAIL before Phase 3 begins (confirm by running `npm test`)
- T009 (CSS) and T006 (utility) are independent of each other — run in parallel
- T010 (Navbar) and T011 (page) are independent files — can start in parallel but T011 depends on T010 for Navbar rendering correctly in tests
- T013 amends the file created in T011 — must follow T011

### Parallel Opportunities

- T002, T003, T004 can all run in parallel after T001 completes
- T006, T007, T008, T009 can all run in parallel within Phase 2
- T010 can start immediately in Phase 3; T011 can follow with T010 done
- T015 and T016 in Phase 5 can run in parallel with T014 in Phase 4 (different concerns)
- T017, T018, T019 in Phase 6 are fully parallel

---

## Parallel Execution Examples

### Phase 1 (after T001)

```
T002  Create jest.config.js
T003  Create jest.setup.js          [parallel with T002]
T004  Add test scripts to package.json  [parallel with T002, T003]
```

### Phase 2 (all parallel)

```
T006  Create lib/groupByYear.js
T007  Create __tests__/projects/timeline-logic.test.js  [parallel]
T008  Create __tests__/projects/projects-page.test.js   [parallel]
T009  Add animation CSS to styles/globals.css           [parallel]
```

### Phase 3

```
T010  Update Navbar.jsx
T011  Create pages/projects/index.js (after T010)
T012  Run npm test to confirm green
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 — test infrastructure
2. Complete Phase 2 — tests written + failing, CSS in place
3. Complete Phase 3 — timeline page built, tests green
4. **STOP and VALIDATE**: `npm test` green, browse `/projects`, US1 independently demoable
5. Ship if ready — US2 and US3 can follow

### Incremental Delivery

1. Phase 1 + 2 → Test-first foundation ready
2. Phase 3 → `/projects` live with timeline and links → **MVP**
3. Phase 4 → Scroll animations added
4. Phase 5 → Link behaviour verified
5. Phase 6 → Mobile polish + lint clean

---

## Notes

- `lib/groupByYear.js` is a pure utility — not a data layer. Projects data stays in `pages/projects/index.js` per Constitution I.
- `[P]` tasks operate on different files with no shared state — safe to run concurrently.
- Commit after T005 (test setup verified), T012 (all US1 tests green), T013 (animations added), T019 (manual checklist done).
- Do not remove `prefers-reduced-motion` guard from the CSS — it is a Constitution II accessibility requirement.
