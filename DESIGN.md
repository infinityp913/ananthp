# Design System — ananthp

This document captures the implicit design system for this portfolio site. All UI decisions should align with these tokens and conventions.

## Colors

| Role | Class | Hex |
|------|-------|-----|
| Page background | (global CSS) | `#0d1117` |
| Primary text | `text-neutral-200` | `#e5e7eb` |
| Secondary / muted text | `text-neutral-500` | `#6b7280` |
| Decorative / disabled | `text-neutral-700` | `#374151` |
| Borders (light) | `border-neutral-800` | `#1f2937` |
| Star accent (only warm color) | `text-amber-400` | `#fbbf24` |

**Rules:**
- Always-dark theme. No light mode. Do not add `dark:` variant classes.
- No new accent colors without a clear reason. `amber-400` is the only warm color on the site.

## Typography

| Role | Font | Class |
|------|------|-------|
| Page headings (h1) | Libre Baskerville | `font-semibold text-2xl text-white ${libreBaskerville.className}` |
| Body / paragraph | Inter (global) | default `text-base` |
| Subtitle / secondary | Inter | `text-neutral-500 text-sm` |
| Small label | Inter | `text-neutral-500 text-xs` |
| Section label | Inter uppercase | `text-neutral-500 text-xs uppercase tracking-widest` |

Import Libre Baskerville in every page that uses it:
```js
import { Libre_Baskerville } from "next/font/google";
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
```

## Layout

| Token | Value |
|-------|-------|
| Max content width | `max-w-2xl` |
| Section padding (horizontal) | `px-6 sm:px-20 lg:px-0` |
| Section padding (bottom) | `pb-16` |
| Top margin (content start) | `mt-[5rem]` |

**Section wrapper (all pages):**
```jsx
<section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 max-w-2xl text-neutral-200">
  <div className="flex w-full">
    <div className="mt-[5rem] w-full">
      ...
    </div>
  </div>
</section>
```

## Page Layout Pattern

Every page follows this structure:
1. `<Head>` — unique `title`, `viewport`, `description`, `favicon`
2. `<section>` wrapper (above)
3. `<Navbar>` — shared nav component
4. `<h1>` with Libre Baskerville (no memoji on interior pages)
5. Subtitle paragraph (`text-neutral-500 text-sm mb-10`)
6. Page content

## Navigation

`components/Navbar.jsx` — add new pages to `navItems` object. Current items:
- `/` → home
- `/projects` → projects
- `/work` → work
- `/books` → books

## Links

| Type | Treatment |
|------|-----------|
| External links | `target="_blank" rel="noopener noreferrer"` always |
| Internal links | Next.js `<Link>`, no target/rel |
| Minimum touch target | `min-h-[44px] min-w-[44px]` on interactive icons |

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navbar` | `components/Navbar.jsx` | Shared navigation |
| `StarRating` | `components/StarRating.jsx` | Filled/half/empty star display |

## Lists & Data Display

- Use `<ul className="list-none space-y-N">` with `<li>` for semantic lists
- Whitespace is the separator — no `border-b`, no `<hr>`, no dividers
- No cards (no border + background + padding containers)
- No hover states on non-interactive rows
- Stars lead the row (left of title), not trail

## Scroll Animations

Optional: `.project-card` pattern with IntersectionObserver (see `globals.css`):
```css
.project-card { opacity: 0; transform: translateY(10px); transition: ... }
.project-card.is-visible { opacity: 1; transform: translateY(0); }
```
Respects `prefers-reduced-motion`. Apply to new pages if scroll reveal is desired.
