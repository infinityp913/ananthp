# Tasks: Project Links, Nav Reorder & Layout Consistency

**Input**: Design documents from `specs/003-project-links-nav/`
**Branch**: `003-project-links-nav`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)

---

## Phase 1: Setup

**Purpose**: Confirm baseline before any changes.

- [x] T001 Run `npm test` and confirm all existing tests pass on the current branch (baseline)

---

## Phase 2: Foundational — Test-First (Constitution §V)

**Purpose**: Write/update all tests to reflect new expected behaviour **before** touching any implementation file. Tests MUST be red (failing) at the end of this phase.

**⚠️ CRITICAL**: No user story implementation can begin until T002–T006 are written and T007 confirms they fail.

- [x] T002 In `__tests__/projects/projects-page.test.js` — replace "project titles with a link render as anchors" test: assert `screen.getByText('DonateIt')` is NOT inside an `<a>`; assert a `[link to project]` anchor exists in the same card with correct `href`, `target="_blank"`, and `rel="noopener noreferrer"`
- [x] T003 In `__tests__/projects/projects-page.test.js` — replace "no-link rendering" test: for each title in `['DonateIt', 'TampAlert!', 'Trashcan Finder']` assert `.closest('a')` is `null`; for titles with a link assert a sibling `[link to project]` anchor is present; for titles without a link assert no `[link to project]` anchor exists in that card
- [x] T004 In `__tests__/projects/projects-page.test.js` — add new test "Navbar renders items in order: home, projects, work": query all nav links, verify the order of their text content matches `['home', 'projects', 'work']`
- [x] T005 [P] Create `__tests__/work/work-page.test.js` — add test "Work page h1 does not have invalid font class": render WorkPage, get the `<h1>` by role, assert its `className` does NOT contain `[object Object]`
- [x] T006 [P] Create `__tests__/home/home-page.test.js` — add test "Home page section uses max-w-2xl layout": render Home, query the outermost `<section>`, assert it has class `max-w-2xl` and does NOT have class `h-screen`
- [x] T007 Run `npm test` — confirm T002–T006 tests are red (failing); all pre-existing tests must still pass

**Checkpoint**: All new/updated tests failing as expected — safe to begin implementation

---

## Phase 3: User Story 1 — Project Link Visibility (Priority: P1) 🎯 MVP

**Goal**: Surface external project links as a distinct `[link to project]` element separate from the project title.

**Independent Test**: Load `/projects` — every project title is plain text; every project with a link shows a `[link to project]` anchor below the title that opens in a new tab; every project without a link shows no anchor at all.

- [x] T008 [US1] In `pages/projects/index.js` — refactor the conditional link block (lines 218–233): replace `<a href={project.link}>…title…</a>` / `<span>…title…</span>` with an unconditional `<span className="font-medium text-neutral-200">{project.title}</span>` followed by `{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">[link to project]</a>}`
- [x] T009 [US1] Run `npm test` — confirm all US1 project-link tests pass (T002, T003); confirm no regressions in other tests

**Checkpoint**: `/projects` shows `[link to project]` labels; titles are plain text; opens in new tab ✅

---

## Phase 4: User Story 2 — Navbar Reorder (Priority: P2)

**Goal**: Move "projects" before "work" in the site-wide navigation.

**Independent Test**: Load any page — nav links appear left-to-right as: home · projects · work.

- [x] T010 [US2] In `components/Navbar.jsx` — reorder the `navItems` object entries: move `'/projects': { name: 'projects' }` to appear before `'/work': { name: 'work' }` so the order is `/`, `/projects`, `/work`
- [x] T011 [US2] Run `npm test` — confirm navbar order test (T004) passes; no regressions

**Checkpoint**: All pages show nav order home · projects · work ✅

---

## Phase 5: User Story 3 — Consistent Heading Font (Priority: P2)

**Goal**: Work page "My Work" heading uses the same Libre Baskerville typeface as headings on Home and Projects.

**Independent Test**: Load `/work` — "My Work" heading is visually identical in typeface and weight to headings on `/` and `/projects`. No `[object Object]` string in the `<h1>` className.

*Note: US3 and US4 (Phases 5 and 6) touch different files and can be worked in parallel.*

- [x] T012 [US3] In `pages/work/index.js` line 35 — fix `h1` className: replace `${libreBaskerville}` with `${libreBaskerville.className}` (the font object must use `.className` to produce a valid CSS class string)
- [x] T013 [US3] Run `npm test` — confirm work page font test (T005) passes; no regressions

**Checkpoint**: Work page heading renders in Libre Baskerville ✅

---

## Phase 6: User Story 4 — Stable Memoji & Header Position (Priority: P3)

**Goal**: Home page top-of-content layout matches Work and Projects so the memoji and nav don't shift position during page transitions.

**Independent Test**: Navigate between `/`, `/projects`, and `/work` — the memoji position and heading area remain visually stable (no jump or reflow). Home page `<section>` has `max-w-2xl`, not `h-screen`.

- [x] T014 [US4] In `pages/index.js` — make four coordinated changes: (1) replace `<section className="h-screen flex-col px-20">` with `<section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200">`; (2) add `w-full` to the outer `<div className="flex">`; (3) replace `m-auto mt-[5rem]` with `mt-[5rem]` on the inner content `<div>`; (4) fix the `<h1>` className — remove `font-serif` and replace `${libreBaskerville}` with `${libreBaskerville.className}`
- [x] T015 [US4] Run `npm test` — confirm home page layout test (T006) passes; full suite green

**Checkpoint**: All four pages consistent; memoji stable across navigation ✅

---

## Phase 7: Polish & Verification

**Purpose**: Final quality gates before the feature is considered complete.

- [x] T016 [P] Run `npm run lint` — verify no new ESLint errors introduced by any of the implementation tasks (pre-existing ESLint config issue unrelated to this feature)
- [x] T017 [P] Run `npm run build` — verify production build compiles successfully
- [ ] T018 Perform manual browser verification per `specs/003-project-links-nav/quickstart.md` steps 1–8: confirm nav order, memoji stability across pages, heading font consistency, `[link to project]` label behaviour (click → new tab), and no `[link to project]` for projects without links

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS** all user story phases
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: Depends on Phase 2 completion — **parallel with Phase 3**
- **Phase 5 (US3)**: Depends on Phase 2 completion — **parallel with Phases 3 & 4**
- **Phase 6 (US4)**: Depends on Phase 2 completion — **parallel with Phases 3, 4 & 5**
- **Phase 7 (Polish)**: Depends on all desired user story phases being complete

### User Story Dependencies

- **US1 (P1)**: Independent — no dependency on US2, US3, or US4
- **US2 (P2)**: Independent — different file from US1 (`Navbar.jsx`); no dependency on US1
- **US3 (P2)**: Independent — different file (`pages/work/index.js`); no dependency on US1 or US2
- **US4 (P3)**: Independent — different file (`pages/index.js`); no dependency on other stories

### Within Each User Story

- Tests MUST be written (Phase 2) and confirmed failing before implementation
- Implementation task before `npm test` verification task
- Story complete before moving to polish phase

### Parallel Opportunities

- T005 and T006 (Phase 2): different test files — can be written in parallel
- Phases 3, 4, 5, 6: all different source files — can be implemented fully in parallel
- T016 and T017 (Phase 7): different commands — can run in parallel

---

## Parallel Example: Phases 3–6

```bash
# Once Phase 2 (Foundational) is complete, all four user stories can proceed simultaneously:
Task A: T008–T009 (US1) — pages/projects/index.js
Task B: T010–T011 (US2) — components/Navbar.jsx
Task C: T012–T013 (US3) — pages/work/index.js
Task D: T014–T015 (US4) — pages/index.js
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup baseline check
2. Complete Phase 2: Write failing tests (all stories)
3. Complete Phase 3: Implement US1 — `[link to project]` rendering
4. **STOP and VALIDATE**: Run tests, do quick browser check on `/projects`
5. Ship if ready — US1 is independently deliverable

### Incremental Delivery

1. Phase 1 + Phase 2 → tests ready (baseline)
2. Phase 3 → US1 complete and tested (MVP ✅)
3. Phase 4 → US2 complete and tested
4. Phase 5 → US3 complete and tested
5. Phase 6 → US4 complete and tested
6. Phase 7 → Polish and ship

---

## Notes

- [P] = different files or commands, no incomplete dependencies — safe to parallelise
- Constitution §V (test-first) is **non-negotiable**: Phase 2 must complete before any Phase 3–6 work
- `pages/index.js` changes (US4) are all in one task (T014) to avoid mid-file conflicts
- T007 is a sanity gate: if tests are still passing after Phase 2, the test updates are wrong
- Manual check (T018) is required for purely visual concerns per constitution §V note
