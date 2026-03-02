# Feature Specification: Projects Page

**Feature Branch**: `001-project-page`
**Created**: 2026-02-27
**Status**: Draft
**Input**: User description: "i am building a projects page. i want it to look sleek. I want it to have a timeline graphic that is a straight vertical line on the left hand with years/months (only displaying those corresponding to a project's start date). Minimal scrolling animation to show and hide timelines of projects that are scrolled into view and out of view."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Projects via Timeline (Priority: P1)

A visitor arrives on the Projects page and sees Ananth's hackathon projects organized chronologically on a vertical timeline. Each project is anchored to its year on the timeline. The visitor scrolls through to understand what was built, when, and what recognition it received.

**Why this priority**: This is the core purpose of the page — presenting projects in a readable, visually engaging format. Without this, the page delivers no value.

**Independent Test**: Navigate to `/projects`, verify a vertical timeline renders with year labels (2020, 2019) on the left and project cards on the right. Each card must show title, description, and tech stack.

**Acceptance Scenarios**:

1. **Given** I load the Projects page, **When** the page renders, **Then** I see a continuous vertical line on the left with year labels (2020, 2019) positioned next to their respective project entries.
2. **Given** multiple projects share the same year (2019), **When** I view that year group, **Then** the year label appears once at the top of the group, not once per project.
3. **Given** I view a project card, **When** I read it, **Then** I can see: project title (linked to a project page, if applicable), a brief description, and the technologies used.

---

### User Story 2 - Scroll-Triggered Visibility Animations (Priority: P2)

As the visitor scrolls down the page, each project card fades in as it enters the viewport and fades out as it leaves. This creates a focused, immersive reading experience.

**Why this priority**: Enhances the sleek aesthetic and draws attention to each project as it comes into view. Doesn't affect core content delivery so ranks below P1.

**Independent Test**: Scroll the page slowly. Each project card should be invisible (or nearly so) before it enters the viewport, become fully visible as it crosses the threshold, and fade back out if scrolled past.

**Acceptance Scenarios**:

1. **Given** a project card is below the viewport, **When** I have not scrolled to it yet, **Then** the card is not fully visible (opacity near zero).
2. **Given** I scroll a project card into view, **When** it crosses the visibility threshold, **Then** it smoothly transitions to fully visible.
3. **Given** a project card has been scrolled fully past (above the viewport), **When** it exits the viewport, **Then** it fades back out.
4. **Given** animations are playing, **When** I observe them, **Then** they feel subtle and non-distracting — not bouncy or dramatic.

---

### User Story 3 - Navigate to Project Source (Priority: P3)

The visitor clicks a project title or link and is taken to the project's project page in a new browser tab, allowing them to see full details, demo, and team information without losing their place on the portfolio.

**Why this priority**: External links enrich the page but are supplementary — the page is valuable even without clicking through.

**Independent Test**: Click each project title that has a link. Verify it opens the correct URL in a new tab without navigating away from the portfolio. For projects without a link, verify the title is plain text (not a clickable link).

**Acceptance Scenarios**:

1. **Given** a project has a link, **When** I click its title, **Then** the linked URL opens in a new tab and the portfolio page remains.
2. **Given** a project has no link, **When** I view its card, **Then** the title is displayed as plain text with no clickable anchor.
3. **Given** I click the "DonateIt" project title, **When** the link opens, **Then** I land on `https://devpost.com/software/donateit-4il5tg` in a new tab.
4. **Given** I click the "TampAlert!" project title, **When** the link opens, **Then** I land on `https://devpost.com/software/tampalert` in a new tab.
5. **Given** I click the "Trashcan Finder" project title, **When** the link opens, **Then** I land on `https://devpost.com/software/trashcan-finder` in a new tab.

---

### Edge Cases

- What if a user has JavaScript disabled or the IntersectionObserver API is unavailable? All project cards must still be readable (default to fully visible).
- What if the viewport is very narrow (mobile)? The timeline layout must remain legible without horizontal overflow.
- What if future projects are added? The timeline must order them correctly by year (newest first) without layout changes.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST display a continuous vertical line on the left side as the timeline spine.
- **FR-002**: Year labels MUST appear on the timeline only for years in which at least one project started — no empty year markers.
- **FR-003**: Projects MUST be ordered newest-first (descending by year).
- **FR-004**: When multiple projects share a year, the year label MUST appear once at the top of that group.
- **FR-005**: Each project entry MUST display: title, a short description, and a list of technologies used. If the project has a link, the title MUST be rendered as a clickable anchor; if no link is provided, the title is plain text.
- **FR-005a**: Project links MAY point to any URL (Devpost, GitHub, a live site, etc.) — they are not restricted to a specific host.
- **FR-006**: External project links MUST open in a new browser tab and MUST NOT expose the referrer or allow the opened page to access the opener. This applies only when a link is present.
- **FR-007**: Project cards MUST animate in (fade + subtle upward motion) as they enter the viewport and animate out when they leave.
- **FR-008**: Animations MUST be minimal — no bouncing, elastic, or dramatic effects. Transition duration should feel snappy, not slow.
- **FR-009**: If the browser does not support scroll-based animation, all project cards MUST be fully visible by default (graceful degradation).
- **FR-010**: The page MUST be accessible via the site's main navigation (nav bar).
- **FR-011**: The page MUST follow the site's established layout structure: nav bar, profile image, page heading, then content.
- **FR-012**: The page MUST include a unique `<title>` and `<meta name="description">` tag.

### Key Entities

- **Project**: A single project. Attributes: title, year, description, tech stack (list), external link (optional; any URL).
- **Year Group**: A logical grouping of one or more projects sharing the same year. Rendered as a single year label on the timeline with its projects beneath it.
- **Timeline**: The full visual structure — a vertical line with year groups and their project cards ordered newest-first.

### Initial Project Data

| Title | Year | Award | Hackathon | Project Link (if given. maybe null) |
|-------|------|-------|-----------|--------------|
| DonateIt | 2020 | Mastercard Best Hack for Social Good | HackHolyoke | https://devpost.com/software/donateit-4il5tg |
| TampAlert! | 2019 | Best Community Prize | HackHolyoke | https://devpost.com/software/tampalert |
| Trashcan Finder | 2019 | Best Community Impact Hack | BrickHacks | https://devpost.com/software/trashcan-finder |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All three projects are visible and readable on first load without any interaction, across desktop and mobile viewports.
- **SC-002**: Each project card becomes visible within one scroll gesture of entering the viewport — no project remains hidden after the user has clearly scrolled past the midpoint of the card.
- **SC-003**: Every project that has a link opens it in a new tab; zero links navigate away from the portfolio page. Projects without a link render a plain-text title with no anchor element.
- **SC-004**: The timeline year labels are positioned accurately — no year label appears for a year with no projects.
- **SC-005**: The page renders correctly on screen widths from 320px (small mobile) up to 1440px (desktop) with no horizontal scroll or overflow.
- **SC-006**: With animations disabled (or JS unavailable), all project cards are fully visible and the page is entirely usable.
