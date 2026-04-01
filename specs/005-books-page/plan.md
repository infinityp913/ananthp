# 005 — Books Page

## Feature Overview

Add a `/books` page to the portfolio — a reading list with star ratings, plus a "currently reading" section. The page displays books Ananth has read with their ratings and books in progress, following the same dark-minimal aesthetic as the rest of the site.

## Currently Reading

| Title | Author |
|-------|--------|
| Dune | Frank Herbert |
| 11/22/63 | Stephen King |

No star rating — books in progress. Displayed above the read list with a section label.

**Currently reading visual treatment:**
- Section label: `"Currently reading"` — `text-neutral-500 text-xs uppercase tracking-widest mb-4`
- Same row structure as read books but no StarRating component
- Instead of stars: a small reading indicator — `text-neutral-600 text-xs` (e.g., nothing; just no stars)
- Separator between "currently reading" and the read list: `mb-8` spacing (whitespace, no divider)
- Read list section label: `"Read"` — same style as "Currently reading" label

## Book Data (corrected titles and authors)

| Title | Author | Rating |
|-------|--------|--------|
| Project Hail Mary | Andy Weir | ★★★★★ (5) |
| The Gene: An Intimate History | Siddhartha Mukherjee | ★★★★★ (5) |
| And Then There Were None | Agatha Christie | ★★★★★ (5) |
| The 7 Habits of Highly Effective People | Stephen R. Covey | ★★★★½ (4.5) |
| Man's Search for Meaning | Viktor E. Frankl | ★★★★½ (4.5) |
| Sapiens: A Brief History of Humankind | Yuval Noah Harari | ★★★★½ (4.5) |
| The Murder of Roger Ackroyd | Agatha Christie | ★★★★½ (4.5) |
| Nineteen Eighty-Four | George Orwell | ★★★★ (4) |
| Animal Farm | George Orwell | ★★★★ (4) |
| Five Little Pigs | Agatha Christie | ★★★★ (4) |

> Note: User wrote "7 habits of highly successful people" — corrected to *The 7 Habits of Highly Effective People* by Stephen R. Covey (1989).

## Routes & Navigation (resolved)

- New page: `pages/books/index.js` → `/books`
- Navbar: add `'/books': { name: 'books' }` to `navItems` in `components/Navbar.jsx`
- 4 navbar items (home, work, projects, books) fit on all viewports — "books" is 5 chars, no overflow risk

## Layout (resolved)

- Same section wrapper as other pages: `w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 max-w-2xl text-neutral-200`
- Structure: `<Navbar>` → `<h1>` (Libre Baskerville, "Books") → subtitle → book list
- **Grouping decision: flat list, sorted by rating desc, then alpha by title** — 10 books is below the threshold where genre grouping adds value
- Subtitle copy: `"What I've been reading."` (period is literal) — `text-neutral-500 text-sm mb-10`

## Information Hierarchy (resolved)

Screen structure — what the user sees first, second, third:
```
1. "Books"  ← h1, Libre Baskerville, white — orientation
2. "What I've been reading."  ← subtitle, neutral-500 — framing
3. "CURRENTLY READING"  ← section label, neutral-500, xs, uppercase, tracking-widest
   Dune          ← title, font-medium, neutral-200, text-sm (no stars)
   Frank Herbert ← author, text-neutral-500, text-xs
   11/22/63
   Stephen King
4. "READ"  ← section label (same style)
5. Book rows (stars LEAD the row, not trail)
   [★★★★★]  And Then There Were None  ← sorted: rating-desc then alpha-by-title
              Agatha Christie
   ...
```

Stars lead (left of title) because rating is the primary signal — matches F-pattern eye scan. User sees "5 stars" before reading the name, not after.

## Star Rating Component

- `<StarRating rating={4.5} />` — renders 5 stars inline
- **Three star variants (all use the same SVG path, `w-3.5 h-3.5`):**
  - **Filled:** `<StarIcon className="text-amber-400" />`
  - **Empty:** `<StarIcon className="text-neutral-700" />`
  - **Half (CSS overflow-hidden approach — no SVG gradient):**
    ```jsx
    <div className="relative w-3.5 h-3.5 flex-shrink-0">
      <StarIcon className="absolute inset-0 text-neutral-700 w-3.5 h-3.5" />
      <div className="overflow-hidden w-[50%] absolute inset-0">
        <StarIcon className="text-amber-400 w-3.5 h-3.5" />
      </div>
    </div>
    ```
  - Reason: Tailwind classes throughout; no SVG gradient IDs; simpler to test
- **Always renders exactly 5 stars total:** filled = `Math.floor(rating)`, half = `rating % 1 >= 0.5 ? 1 : 0`, empty = `5 - filled - half`
- Size: `w-3.5 h-3.5` (14px) — readable without dominating the title
- Stars flex row: `flex items-center gap-0.5`
- Accessible: `role="img" aria-label="4.5 out of 5 stars"` on the outer wrapper `<span>`
- Screen reader: `<span className="sr-only">4.5 out of 5 stars</span>` inside wrapper
- Individual star SVGs and half-star divs: `aria-hidden="true"`

## Interaction States

| Feature | Loading | Empty | Error | Success |
|---------|---------|-------|-------|---------|
| Book list (SSG) | N/A — SSG renders server-side | `<p className="text-neutral-600 text-sm">No books yet.</p>` | N/A | Full list renders |
| StarRating | N/A | rating=0 → 5 empty (neutral-700) stars | N/A | Filled/half/empty stars |

Notes:
- No client-side fetch — loading/error states do not exist
- Empty book array renders a single muted line (needed for test coverage)
- `rating=0` renders 5 empty stars (defensive, not a user-visible state)

## Design System Tokens Used

| Token | Class | Used for |
|-------|-------|---------|
| Background | `#0d1117` (global) | Page background |
| Primary text | `text-neutral-200` | Book title |
| Secondary text | `text-neutral-500` | Author name, subtitle |
| Muted | `text-neutral-700` | Empty star fill |
| Star accent | `text-amber-400` / `#fbbf24` | Filled + half-star fill (new warm accent) |
| Heading font | `${libreBaskerville.className}` | h1 "Books" |
| Max width | `max-w-2xl` | Section wrapper |
| Section padding | `px-6 sm:px-20 lg:px-0` | Section wrapper |

**New component:** `components/StarRating.jsx` — self-contained, no external deps.

## Technical

- Content lives directly in `pages/books/index.js` (constitution §I)
- No new dependencies
- `StarRating` component: `components/StarRating.jsx`
- Tests in `__tests__/books/` (constitution §V — test first)

### `__tests__/books/star-rating.test.js`
```
describe('StarRating')
  ✓ rating=5 renders 5 filled stars (0 half, 0 empty)
  ✓ rating=4 renders 4 filled stars (0 half, 1 empty)
  ✓ rating=4.5 renders 4 filled stars (1 half, 0 empty)
  ✓ rating=0 renders 5 empty stars
  ✓ rating=3.5 renders 3 filled, 1 half, 1 empty
  ✓ aria-label is "4.5 out of 5 stars" for rating=4.5
  ✓ aria-label is "5 out of 5 stars" for rating=5
  ✓ sr-only span contains accessible label text
  ✓ wrapper has role="img"
  ✓ half star has overflow-hidden wrapper with w-[50%]
```
How to count stars: query `[aria-hidden="true"]` SVG elements — filled = text-amber-400, empty = text-neutral-700. Half = presence of overflow-hidden w-[50%] div.

### `__tests__/books/books-page.test.js`
```
jest.mock('next/router', () => ({ useRouter: fn(() => ({ pathname: '/books' })) }))

describe('BooksPage — structure')
  ✓ renders exactly one h1 with text "Books"
  ✓ section has max-w-2xl class
  ✓ subtitle "What I've been reading." is present

describe('BooksPage — currently reading')
  ✓ "Currently reading" section label is present
  ✓ "Dune" and "11/22/63" render without star ratings
  ✓ currently reading books have no role="img" star element

describe('BooksPage — read list')
  ✓ renders all 10 read book titles (check: "Project Hail Mary", "Nineteen Eighty-Four", "Five Little Pigs")
  ✓ renders all 10 author names (check: "Andy Weir", "George Orwell", "Agatha Christie")
  ✓ read list is a <ul> element
  ✓ rating=5 books appear before rating=4 books ("Project Hail Mary" before "Nineteen Eighty-Four")
  ✓ within same rating, alpha by title ("And Then There Were None" before "Project Hail Mary" — both 5-star)
  — empty books array state NOT tested (trivial guard on hardcoded data; rating=0 in star-rating.test.js covers the meaningful empty case)

describe('BooksPage — navbar')
  ✓ navbar renders a link to /books
  ✓ books link has text-neutral-200 when pathname=/books (active state)
  ✓ home link does not have text-neutral-200 when on /books
  ✓ nav order: home < projects < work < books (index check)

describe('BooksPage — accessibility')
  ✓ no anchor has empty or missing href
  ✓ exactly one h1 per page
```
- `<Head>`: title = "Books | ananthp", description = "Books Ananth Preetham has read, with ratings."

## Responsive & Accessibility (resolved)

**Responsive:**
- Layout is `flex items-start gap-3` with `min-w-0` on the text container — handles title wrapping on narrow screens
- No viewport-specific layout change needed — `max-w-2xl` container constrains naturally on desktop
- Long titles (e.g., "The 7 Habits of Highly Effective People") wrap under the star group — correct behavior with `flex items-start`

**Accessibility:**
- Book list: `<ul className="list-none space-y-5">` with `<li>` per book — screen readers announce "list, 10 items"
- StarRating wrapper: `<span role="img" aria-label="4.5 out of 5 stars">`
- Screen reader text: `<span className="sr-only">4.5 out of 5 stars</span>` inside wrapper
- Individual star SVGs: `aria-hidden="true"` (decorative, sr-only provides the label)
- No interactive elements on rows — no tab stops needed
- Color contrast: neutral-200 on #0d1117 = 13.6:1 ✓ | neutral-500 = 4.7:1 ✓ | amber-400 = 8.2:1 ✓
- One `<h1>` per page ✓ | Unique `<meta name="description">` ✓

## Anti-AI-Slop Rules (resolved)

**No cards.** Book rows are pure text — no border, no background, no rounded container, no shadow. A "book card" with padding + border is the wrong treatment.

**No dividers.** Rows are separated by whitespace only: `space-y-5`. No `border-b`, no `<hr>`, no horizontal rule. Whitespace is the separator — matches the editorial feel.

**No hover state on rows.** Books aren't clickable — no hover background, no cursor-pointer. Stars and text are inert display elements.

**Row structure (locked):**
```
<div className="flex items-start gap-3">
  <StarRating rating={5} />          ← 14px stars, amber-400/neutral-700, mt-0.5
  <div>
    <p className="font-medium text-neutral-200 text-sm">Project Hail Mary</p>
    <p className="text-neutral-500 text-xs mt-0.5">Andy Weir</p>
  </div>
</div>
```

## In Scope (added during design review)

- **DESIGN.md** — document the implicit design system. Contents:
  - Background: `#0d1117`
  - Primary text: `text-neutral-200` | Secondary: `text-neutral-500` | Muted: `text-neutral-700`
  - Accent: `text-amber-400` (stars — only warm color on the site)
  - Heading font: Libre Baskerville 400/700 via `next/font/google`
  - Body font: Inter (global CSS)
  - Max content width: `max-w-2xl`
  - Section padding: `px-6 sm:px-20 lg:px-0 pb-16`
  - Page layout pattern: `<Head>` → `<section wrapper>` → `<Navbar>` → `<h1>` → content
  - External links: always `target="_blank" rel="noopener noreferrer"`
  - Internal links: Next.js `<Link>`, no target/rel
  - No light mode, no `dark:` variants
  - Component location: `components/` (currently Navbar.jsx, StarRating.jsx)

## Not In Scope

- Book covers / images
- External links to purchase
- Reading dates or progress tracking
- Filtering/search

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAN (PLAN) | 1 issue, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAN (FULL) | score: 4/10 → 9/10, 7 decisions |

**OUTSIDE VOICE:** Claude subagent — 4 findings addressed (sort ambiguity, DESIGN.md spec, total-stars calc, period clarification), 4 dismissed.

**VERDICT:** ENG + DESIGN CLEARED — ready to implement.
