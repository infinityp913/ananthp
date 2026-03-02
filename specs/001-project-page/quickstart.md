# Quickstart: Projects Page (001-project-page)

## Dev Server

```bash
npm run dev       # http://localhost:3000/projects
```

## Running Tests

After the test setup task is complete:

```bash
npm test                        # Run all tests once
npm run test:watch              # Watch mode (re-runs on file changes)
npm test -- --testPathPattern projects   # Run only projects page tests
```

## Adding a New Project

1. Open `pages/projects/index.js`
2. Add a new object to the `projects` array at the top of the file:

```js
{
  title: "Your Project Name",
  year: 2025,                // 4-digit year
  description: "One or two sentence description of what it does and why it matters.",
  tech: ["Tech1", "Tech2"],
  link: "https://example.com/your-project",  // optional — any URL; omit the field entirely if no link
}
```

3. The timeline automatically regroups and re-sorts — no other changes needed.

## Manual Browser Verification Checklist

Run these checks before merging (required by Constitution V):

- [ ] Vertical timeline line is visible and spans all projects
- [ ] Year labels (2020, 2019) appear at the correct positions
- [ ] "2019" label appears once, not twice, for the two 2019 projects
- [ ] All project cards render title, description, and tech tags
- [ ] All three project links open in a new tab (link can be any URL, not just Devpost)
- [ ] A project without a `link` field renders its title as plain text (no anchor/underline)
- [ ] Scroll down slowly — each card fades in as it enters the viewport
- [ ] Scroll back up — cards that exit the viewport fade out
- [ ] Test at 320px width — no horizontal scroll, timeline still readable
- [ ] Test at 768px width — layout looks comfortable
- [ ] Test with JS disabled — all cards are fully visible
- [ ] Test with `prefers-reduced-motion: reduce` in DevTools — no animation, cards always visible
- [ ] Nav bar shows "projects" link and routes correctly
