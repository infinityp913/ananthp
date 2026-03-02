# Data Model: Projects Page (001-project-page)

**Date**: 2026-02-27

---

## Entities

### Project

A single project entry. All data is static and lives in the page file (Constitution I).

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | yes | Display name; rendered as the card heading |
| `year` | number | yes | 4-digit year of project start; used for grouping and ordering |
| `description` | string | yes | 1–2 sentence summary displayed on the card |
| `tech` | string[] | yes | Ordered list of technologies; rendered as inline tags |
| `link` | string | **no** | Optional external URL (any host — Devpost, GitHub, live site, etc.); opens in new tab when present |

**Validation rules**:
- `year` must be a 4-digit integer ≥ 2000
- `link`, when provided, must be a fully-qualified URL (starts with `https://`)
- `tech` must have at least one entry
- `title` and `description` must be non-empty strings
- When `link` is absent or `undefined`, the title renders as plain text — no anchor element

---

### YearGroup

A computed grouping of one or more `Project` objects sharing the same `year`. Not stored — derived at render time.

| Field | Type | Notes |
|-------|------|-------|
| `year` | number | The shared year; rendered as the timeline label |
| `projects` | Project[] | All projects in this year, in insertion order |

**Derivation**: `groupByYear(projects: Project[]): YearGroup[]`
- Groups projects by `year`
- Returns groups ordered newest-first (descending `year`)
- Within a year, projects maintain their original declaration order

---

### Timeline (visual structure)

Not a data entity — the rendered output of `YearGroup[]`.

- A continuous vertical line spans the full height of the timeline container
- Each `YearGroup` renders one year label at its top
- Each `Project` within a group renders a card to the right of the line

---

## Initial Seed Data

Declared as a static array in `pages/projects/index.js`:

```js
const projects = [
  {
    title: "DonateIt",
    year: 2020,
    description: "A charitable donation platform that helps donors understand the real-world impact of their contributions by contextualizing donations against local cost-of-living data across countries.",
    tech: ["HTML5", "CSS", "JavaScript", "jQuery", "SCSS"],
    link: "https://devpost.com/software/donateit-4il5tg",  // optional field — omit if no link
  },
  {
    title: "TampAlert!",
    year: 2019,
    description: "A mobile app that connects users facing period emergencies with nearby community members willing to supply sanitary products — peer-to-peer, like a ride-share for menstrual supplies.",
    tech: ["Android Studio", "Firebase", "Google Maps API", "Java"],
    link: "https://devpost.com/software/tampalert",
  },
  {
    title: "Trashcan Finder",
    year: 2019,
    description: "Helps users locate nearby trashcans via real-time mapping, and enables sustainability organizations to identify areas lacking waste disposal infrastructure.",
    tech: ["Android Studio", "Firebase", "Google Maps API", "Java", "GCP"],
    link: "https://devpost.com/software/trashcan-finder",
  },
  // Example of a project with no link:
  // { title: "Internal Tool", year: 2018, description: "...", tech: ["Python"] }
];
```

---

## Derived Logic

### `groupByYear(projects)`

Pure function — must be independently unit-tested before implementation.

**Input**: `Project[]` (may be in any order)
**Output**: `{ year: number, projects: Project[] }[]` sorted descending by `year`

**Pseudocode**:
```
acc = {}
for each project:
  if acc[project.year] is empty: acc[project.year] = []
  acc[project.year].push(project)

return Object.keys(acc)
  .map(Number)
  .sort((a, b) => b - a)
  .map(year => ({ year, projects: acc[year] }))
```

**Test cases**:
1. Three projects → 2 year groups (2020 with 1 project, 2019 with 2 projects)
2. Year groups ordered newest-first (2020 before 2019)
3. Within 2019 group, DonateIt is NOT present; TampAlert! comes before Trashcan Finder
