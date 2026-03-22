# Design Polish Plan: Portfolio Visual & UX Improvements

**Branch**: `004-design-polish` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)

## Summary

Visual and UX polish pass across all three pages of the portfolio (home, work, projects).
Based on design audit conducted 2026-03-22. Covers touch target accessibility, mobile
layout bugs, active nav state, spacing cleanup, and content improvements.

All decisions have been reviewed and locked in via /plan-design-review.

---

## Decisions Made

| Finding | Decision |
|---------|----------|
| F-001: Social icon touch targets 24px | Fix: `min-h-[44px] min-w-[44px] flex items-center justify-center` on `<a>` wrappers |
| F-002: Work page mobile padding | Fix: `px-20` → `px-6 sm:px-20 lg:px-0` |
| F-003: Nav link touch targets 32px | Fix: `py-1` → `py-3` |
| F-004: `<br>` spacing anti-pattern | Fix: replace with `<div className="mt-4">` wrapper |
| F-005: Memoji on all pages | **Remove from Work and Projects** (amend constitution §IV) |
| F-006: Homepage footer dead zone | Fix: `py-24` → `py-12` |
| F-007: No active nav indicator | Fix: color-only (`text-neutral-200` active, `text-neutral-500` inactive) |
| F-008: "[link to project]" generic label | Fix: destination-aware — `GitHub ↗` / `Devpost ↗` / `Open ↗` |

---

## NOT In Scope

- DESIGN.md creation — **decided: run `/design-consultation` as a follow-up PR** to formally capture design tokens and system docs
- Any changes to page content (bio text, work bullets, project descriptions)
- Animation changes (existing scroll animations on Projects are intentional)
- Light mode (site is always-dark by constitution)
- New pages or routes

---

## Responsive & Accessibility Specs

### Viewport behavior per fix

| Fix | 375px mobile | 768px tablet | 1280px desktop |
|-----|-------------|-------------|----------------|
| Social icon tap targets | 44×44px hit area, 24px icon visual | same | same |
| Nav touch targets | 44px tall links (py-3) | same | same |
| Work page padding | 24px each side → 327px content | 80px each side | 0 + max-w-2xl centers |
| Footer spacing | py-12 (48px each side) | same | same |
| Active nav color | text-neutral-200 on active | same | same |

### Accessibility checklist
- [ ] No `outline: none` on any interactive element (preserve browser defaults)
- [ ] Social icon `<a>` wrappers: preserve existing `aria-label` and `title` attributes
- [ ] Touch targets ≥ 44px on all tappable elements post-fix
- [ ] `router.pathname` exact-match comparison (no partial matches)
- [ ] `text-neutral-200` on `#0d1117` bg: contrast ~14:1 ✓

---

## Interaction States

| Element | Default | Hover | Active/Current | Focus |
|---------|---------|-------|----------------|-------|
| Nav links | `text-neutral-500` | `text-neutral-200` (existing) | `text-neutral-200` | browser focus-visible (preserve) |
| Social icons | `text-neutral-500` | `text-neutral-200` (existing) | — | browser focus-visible (preserve) |
| "Persevering" link | `text-neutral-200` underlined | unchanged | — | browser focus-visible |
| `<details>` accordion | closed, cursor-pointer | — | open: list revealed | browser focus-visible on `<summary>` |
| Project link labels | `text-neutral-500` | `text-neutral-300` (existing) | — | browser focus-visible |

**Active nav implementation**: Use `useRouter()` from `next/router` (Pages Router — NOT `usePathname` from `next/navigation` which is App Router only). Read `router.pathname`. Apply `text-neutral-200` when `router.pathname === path`, else `text-neutral-500`. Color-only — no underline, no font-weight change.

---

## Information Architecture

### Homepage visual hierarchy (post-fix)
```
PRIMARY:   Avatar (home only) → Name (Libre Baskerville, 24px)
SECONDARY: Subtitle → Social icons (44px tap targets)
TERTIARY:  Persevering link → Notes accordion
FOOTER:    Jobs quote (py-12, deliberate coda)
```

### Work page visual hierarchy
```
PRIMARY:   Name/role heading (H1 "My work")
SECONDARY: Company names (H2, 20px)
TERTIARY:  Role/date (muted) → bullet points
```
No avatar on this page (F-005 decision).

### Projects page visual hierarchy
```
PRIMARY:   "Projects" heading (H1)
SECONDARY: Year markers (timeline spine)
TERTIARY:  Project title → destination-aware link label → description → tech tags
```
No avatar on this page (F-005 decision).

### Navigation
Active page = `text-neutral-200`, inactive = `text-neutral-500`. Color-only, no decoration.

---

## User Journey & Emotional Arc

The site's emotional intent: **quiet, personal, human**. Every fix reduces friction without removing personality.

| Step | User does | Emotional goal | What this plan protects |
|------|-----------|----------------|------------------------|
| Lands on home | Sees avatar, name, subtitle | "This is a real person" | Memoji stays on home; no slick hero overlay |
| Scans social links | Clicks LinkedIn/GitHub | Confidence, accessibility | Touch targets fixed without changing visual icon size |
| Reads "Persevering" link | Curiosity | Authenticity | Link preserved as-is; spacing cleanup only |
| Expands "Notes to myself" | Reward for the curious | Intimacy/character | No content changes |
| Reaches footer quote | Reflection | Quiet aspiration | Gap reduced (py-12); quote remains a deliberate coda |
| Navigates to Work/Projects | Evaluating competence | Credibility | Mobile layout fixed; Memoji removed (cleaner header) |

---

## Constitution Amendment Required

F-005 decision (remove Memoji from interior pages) conflicts with current constitution §IV
(Page Layout Pattern), which lists `<Image> memoji` as item 4 in the required page structure.

**Amendment needed**: Update `.specify/memory/constitution.md` §IV to read:
> `<Image> memoji (100×100, /memoji.png)` — **home page only**. Interior pages (work, projects) omit the memoji.

This should be done before implementation.

---

## Implementation Checklist

### Constitution
- [ ] Amend `.specify/memory/constitution.md` §IV — Memoji home-only

### `components/Navbar.jsx`
- [ ] Import `useRouter` from `next/router`
- [ ] Apply `text-neutral-200` to active route, `text-neutral-500` to others
- [ ] Change `py-1` → `py-3` on link className
- [ ] Tests (add to existing page test files, not a new file — mocks already in place):
  - `home-page.test.js`: 'home' link has `text-neutral-200`; 'work' and 'projects' links do NOT
  - `work-page.test.js`: 'work' link has `text-neutral-200`; others do NOT
  - `projects-page.test.js`: 'projects' link has `text-neutral-200`; others do NOT
  - Any of the 3 files: nav link element has `py-3` in className

### `pages/index.js`
- [ ] Social icons: add `min-h-[44px] min-w-[44px] flex items-center justify-center` to each `<a>` wrapper
- [ ] Remove `<br>` tags; wrap `<details>` in `<div className="mt-4">`
- [ ] Footer: change `py-24` → `py-12`
- [ ] Write/update test: social icon wrappers have min-height/min-width classes

### `pages/work/index.js`
- [ ] Section: change `px-20` → `px-6 sm:px-20 lg:px-0`
- [ ] Remove `<Image>` memoji block
- [ ] Write/update test: section does not have `px-20` class; no memoji rendered

### `pages/projects/index.js`
- [ ] **FIRST: Update existing test assertions in `__tests__/projects/projects-page.test.js`** before touching the page code (constitution §V):
  - `within(donateitCard).getByText('[link to project]')` → `within(donateitCard).getByText('Devpost ↗')`
  - `within(donateitCard).getByText('[link to project]').tagName` → same with 'Devpost ↗'
  - `within(gpuCard).queryByText('[link to project]')` → `within(gpuCard).queryByText('Open ↗')` (GPU Server has no link, still null — but update to avoid stale description)
  - Add: GitHub-linked project shows 'GitHub ↗'; netlify-linked project shows 'Open ↗'
- [ ] Remove `<Image>` memoji block
- [ ] Link labels: replace `[link to project]` with destination-aware helper:
  ```js
  function linkLabel(href) {
    if (href.includes('github.com')) return 'GitHub ↗';
    if (href.includes('devpost.com')) return 'Devpost ↗';
    return 'Open ↗';
  }
  ```
- [ ] Write/update test: GitHub links show "GitHub ↗"; Devpost links show "Devpost ↗"; no memoji rendered

### Test requirement (constitution §V)
All implementation changes require tests written before the code change. Each checklist
item above has a corresponding test item. Tests must be written first.

---

## What Already Exists

- `useRouter` pattern: not yet used in Navbar, but the pattern is standard Next.js Pages Router
- `text-neutral-*` color scale: used throughout all pages
- `min-h-[44px]` / `min-w-[44px]`: Tailwind utilities available, not yet used
- `aria-label` / `title` on social icons: already present, preserve
- `libreBaskerville.className`: already correctly used on Projects and Work `<h1>`

---

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAN | 3 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAN | score: 2/10 → 9/10, 8 decisions |

**UNRESOLVED:** 0
**VERDICT:** ENG + DESIGN CLEARED — ready to implement.

## Pages In Scope

- `components/Navbar.jsx` — F-003 (touch targets), F-007 (active state)
- `pages/index.js` — F-001 (icon targets), F-004 (br cleanup), F-005 (memoji home only), F-006 (footer spacing)
- `pages/work/index.js` — F-002 (mobile padding), F-005 (remove memoji)
- `pages/projects/index.js` — F-005 (remove memoji), F-008 (link labels)
- `.specify/memory/constitution.md` — constitution amendment
