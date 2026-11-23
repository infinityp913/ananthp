# Design System — ananthp

This document captures the implicit design system for this portfolio site. All UI decisions should align with these tokens and conventions.

## Colors

| Role | Class | Hex |
|------|-------|-----|
| Page background | (global CSS) | `#0d1117` |
| Primary text | `text-neutral-200` | `#e5e7eb` |
| Body text (long prose) | `text-neutral-300` | `#d4d4d4` |
| Secondary text | `text-neutral-400` | `#a3a3a3` |
| Muted text / metadata | `text-neutral-500` | `#8a8a8a` (tuned in `tailwind.config.js`; 5.5:1) |
| Decorative / disabled | `text-neutral-700` | `#374151` |
| Borders (light) | `border-neutral-800` | `#1f2937` |
| Star accent (only warm color) | `text-amber-400` | `#fbbf24` |

**Rules:**
- Always-dark theme. No light mode. Do not add `dark:` variant classes.
- No new accent colors without a clear reason. `amber-400` is the only warm color on the site.
- Text must reach 4.5:1 on `#0d1117`. Never use `text-neutral-600` or darker for text; use `neutral-600`+ only for borders and decoration.
- Inline prose links (an `<a>` with no class) are styled globally: `neutral-200`, 1px underline in `#525252`, 3px offset.
- Disclosure toggles use `components/Chevron.jsx` (SVG), never Unicode glyphs like ▶ ▼.
- Inter is loaded with `next/font` in `pages/_app.js`.

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
- `/notes` → notes
- `/books` → books

## Cards

Shared surface: `components/Card.jsx` → `rounded-xl border border-neutral-800 bg-neutral-900/40 p-5`. Pass `interactive` (and `as={Link}`) when the whole card is clickable: adds `hover:border-neutral-700 hover:bg-neutral-900/80`. Lists of cards use `space-y-3`/`space-y-4` or `grid sm:grid-cols-2 gap-3`.

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
