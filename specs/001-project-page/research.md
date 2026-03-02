# Research: Projects Page (001-project-page)

**Date**: 2026-02-27
**Branch**: `001-project-page`

---

## Decision 1: Scroll Animation with Graceful Degradation

**Decision**: Default CSS state is fully visible (`opacity: 1`, `transform: none`). JS adds a sentinel class to `document.body` to opt cards into the animation system. The animation CSS is scoped inside `@media (prefers-reduced-motion: no-preference)` so users who prefer reduced motion see static, fully-visible cards.

**Rationale**:
- Graceful degradation is automatic: without JS, no sentinel class is added, cards remain visible.
- `prefers-reduced-motion` is respected per WCAG 2.1 guidelines.
- `IntersectionObserver` drives the in-view/out-of-view class toggle — widely supported and has no dependencies.

**Pattern**:
```css
/* Default: fully visible */
.project-card {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: no-preference) {
  /* JS adds .js-animations to <body> on mount */
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

**Alternatives considered**:
- CSS-only scroll animations (`@keyframes` + `animation-timeline`): not widely supported in 2024–2025 and can't animate out on scroll-past.
- Default hidden state (no JS class): fails graceful degradation — cards stay invisible if JS errors or is disabled.

---

## Decision 2: Test Framework Setup

**Decision**: Install Jest with the `next/jest` transformer + React Testing Library. No TypeScript needed (project uses plain JS). Tests live in `__tests__/` at the repo root (placing them inside `pages/` would create unwanted routes).

**Packages to add (devDependencies)**:
```
jest
jest-environment-jsdom
@testing-library/react
@testing-library/dom
@testing-library/jest-dom
```

**Config files required**:
- `jest.config.js` — uses `next/jest` for SWC transforms, CSS mocking, path alias support
- `jest.setup.js` — imports `@testing-library/jest-dom` matchers

**What is testable automatically**:
- Year grouping logic (groupByYear): pure function, easily unit-tested
- Sort order (newest-first): pure function
- Link attributes (`target="_blank"`, `rel="noopener noreferrer"`): React Testing Library
- Single `<h1>` per page (accessibility): React Testing Library
- `<title>` and `<meta name="description">` presence: React Testing Library + jest-dom

**What requires manual browser verification**:
- Visual timeline rendering (line, dots, year label positions)
- Animation timing and motion feel
- Mobile layout at 320px, 375px, 768px breakpoints

**Alternatives considered**:
- Playwright (E2E): overkill for this feature scope, adds setup complexity
- Vitest: not the standard for Next.js Pages Router; `next/jest` is the documented approach

---

## Decision 3: Timeline Layout Approach

**Decision**: Flexbox layout for the overall structure + `position: relative` on the container with an absolutely positioned vertical line element. Year label column is a fixed-width flex child. Cards are in a flex-grow container to the right. Mobile-first: column widths shrink at narrow breakpoints.

**Rationale**:
- Flexbox handles responsive stacking naturally.
- The absolute-position line is simpler and more maintainable than pseudo-element tricks.
- CSS Grid adds unnecessary 2D complexity for a strictly left-to-right layout.

**Responsive breakpoints**:
- `< 640px` (mobile): Year column width `w-12` (48px), reduced card padding, full-width cards
- `≥ 640px` (desktop): Year column width `w-16` (64px), more breathing room

**Alternatives considered**:
- CSS Grid: More complex, no meaningful advantage for a 1D left-column + card-column layout
- `::before`/`::after` pseudo-elements for the line: harder to control exact position across breakpoints
