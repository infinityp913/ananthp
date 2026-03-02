# Feature Specification: Project Links, Nav Reorder & Layout Consistency

**Feature Branch**: `003-project-links-nav`
**Created**: 2026-03-02
**Status**: Draft
**Input**: User description: "update the spec such that the links are shown as [link to project] separate from the project title for better visibility for the existence of a link. and also move the projects page to be before the work page in the navbar. Also make sure the work page's heading 'my work' matches the font of the other pages. Also edit the home page structure such that it matches spacing layout of the work and projects page to avoid the memoji and the header from appearing 'to move' when switching pages."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover Project Links at a Glance (Priority: P1)

A visitor browses the Projects page and wants to know at a glance which projects have an external resource they can visit. Currently links are embedded in the project title, making them easy to miss. With this change, projects that have a link display a distinct "[link to project]" element below the title — visually separate and immediately recognisable as a clickable action.

**Why this priority**: This is the primary UX improvement requested. It directly addresses discoverability of external links, which is a core affordance of the page.

**Independent Test**: Load `/projects`. For every project with a link, confirm a "[link to project]" element appears below the title. For every project without a link, confirm no such element appears. The title itself must no longer be a clickable anchor.

**Acceptance Scenarios**:

1. **Given** a project has an external link, **When** I view its card, **Then** I see the project title as plain text (not a link) and a separate "[link to project]" element below it that is clickable.
2. **Given** I click "[link to project]", **When** the link opens, **Then** the linked URL opens in a new tab and the portfolio page remains open.
3. **Given** a project has no external link, **When** I view its card, **Then** neither the title nor any "[link to project]" element is a clickable anchor — the card contains no links.
4. **Given** I hover over "[link to project]", **When** I inspect it visually, **Then** it looks distinct from the surrounding description text (e.g., different colour, underline, or label style) so it is clearly interactive.

---

### User Story 2 - Navigate to Projects Before Work (Priority: P2)

A visitor lands on the site and wants to explore Ananth's projects. In the current nav order (home → work → projects), "projects" appears after "work", which deprioritises it visually. After this change the order becomes home → projects → work, making projects easier to find.

**Why this priority**: A single-file ordering change with clear intent. Lower than P1 because it does not affect content — only navigation discoverability.

**Independent Test**: Load any page that renders the Navbar. Verify the nav items render in the order: home, projects, work — left to right.

**Acceptance Scenarios**:

1. **Given** I load any page on the site, **When** the Navbar renders, **Then** the nav items appear in order: home, projects, work — with "projects" before "work".
2. **Given** I click "projects" in the nav, **When** the page loads, **Then** I arrive at `/projects`.
3. **Given** I click "work" in the nav, **When** the page loads, **Then** I arrive at `/work`.

---

### User Story 3 - Consistent Heading Font on Work Page (Priority: P2)

A visitor navigating to the Work page notices that the "My Work" heading looks visually different from headings on the Home and Projects pages. After this change the heading uses the same typeface as the rest of the site, creating a cohesive typographic style across all pages.

**Why this priority**: A visual polish fix that affects branding consistency. It is independently valuable but does not affect content or navigation.

**Independent Test**: Load `/work` and compare the "My Work" heading visually against the page headings on `/` and `/projects`. All three must appear to use the same typeface and weight.

**Acceptance Scenarios**:

1. **Given** I load the Work page, **When** I look at the "My Work" heading, **Then** it uses the same typeface and weight as the headings on the Home and Projects pages.
2. **Given** I switch between Home, Projects, and Work pages, **When** I observe the page headings, **Then** they all appear visually consistent — same font family and weight.

---

### User Story 4 - Stable Memoji & Header Position Across Pages (Priority: P3)

A visitor clicks between Home, Projects, and Work in the navigation. Currently the memoji image and page heading appear to shift or "jump" because the Home page uses a different structural layout than the other pages. After this change all three pages share the same spacing structure, so the memoji and heading remain visually anchored during page transitions.

**Why this priority**: Improves perceived quality and reduces visual noise when navigating. Lower than font consistency because it requires structural layout work across multiple pages.

**Independent Test**: Navigate rapidly between Home, Projects, and Work using the Navbar. The memoji and the area immediately below it (where the page heading appears) must not visibly shift position between pages.

**Acceptance Scenarios**:

1. **Given** I am on the Home page, **When** I click "projects" in the nav, **Then** the memoji image and heading do not appear to jump or reflow.
2. **Given** I am on the Projects page, **When** I click "work" in the nav, **Then** the memoji and heading remain visually stable.
3. **Given** I am on the Work page, **When** I click "home", **Then** the memoji and heading remain visually stable.
4. **Given** I view all three pages side-by-side, **When** I compare the top-of-content area, **Then** the memoji position and the spacing above/below it are identical across all three pages.

---

### Edge Cases

- What if a project's link is malformed or the URL is very long? The "[link to project]" element must still render without breaking the card layout.
- What if a future project has multiple links? This spec covers the single-link case only; multi-link support is out of scope.
- What if the visitor is on mobile? The "[link to project]" element must remain tappable and not overlap adjacent content.
- What if the browser renders fonts with fallbacks? The heading typeface must still match across pages even if the custom font fails to load.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Project titles MUST be rendered as plain text on all project cards, regardless of whether a link is present.
- **FR-002**: For projects that have an external link, a "[link to project]" label MUST appear as a separate, clickable element positioned below the project title and above the description.
- **FR-003**: The "[link to project]" element MUST open the associated URL in a new browser tab and MUST NOT expose the referrer or allow the opened page to access the opener.
- **FR-004**: For projects that have no external link, no "[link to project]" element MUST appear — the card contains no anchor elements.
- **FR-005**: The "[link to project]" element MUST be visually distinct from surrounding text (description, tech tags) so a visitor can immediately identify it as an interactive link.
- **FR-006**: The Navbar MUST render nav items in the order: home → projects → work.
- **FR-007**: All existing Navbar functionality (hover styles, routing) MUST be preserved after the reorder.
- **FR-008**: The visual appearance of project cards (description, tech stack tags, scroll animations) MUST remain unchanged — only the title rendering and link presentation change.
- **FR-009**: The Work page's primary heading MUST use the same typeface and weight as the primary headings on the Home and Projects pages.
- **FR-010**: The Home page's top-of-content layout (memoji position, spacing above/below) MUST match the equivalent layout on the Work and Projects pages so that switching between pages produces no visible positional shift in the memoji or heading area.
- **FR-011**: No existing content on the Home page (bio text, links, social icons) MUST be removed or reordered as a result of the layout alignment change.

### Key Entities

- **Project Card**: A single project displayed on the Projects page. Attributes: title (always plain text), optional "[link to project]" element (present only when a link exists), description, tech stack tags.
- **Nav Item**: A single entry in the site-wide Navbar. Attributes: label, route. Order is now: home, projects, work.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On the Projects page, every project that has a link displays a "[link to project]" element; zero project titles are rendered as clickable anchors.
- **SC-002**: Every "[link to project]" element opens its URL in a new tab; zero clicks navigate away from the portfolio page.
- **SC-003**: Every project without a link renders zero anchor elements in its card.
- **SC-004**: The Navbar renders "projects" before "work" on every page of the site, verified across at least home, projects, and work pages.
- **SC-005**: All previously passing tests for the Projects page continue to pass after the changes.
- **SC-006**: The "My Work" heading on the Work page is visually indistinguishable in typeface and weight from the headings on the Home and Projects pages.
- **SC-007**: Navigating between Home, Projects, and Work produces zero visible positional shift in the memoji image across all three pages, verified on both desktop and mobile viewports.
- **SC-008**: All existing Home page content (bio, links, social icons) is present and unchanged after the layout alignment update.
