---
description: Visual QA — screenshots only modified pages and checks for layout issues. Skip for minor copy/content-only edits; run for layout, CSS, or component changes.
---

# /visual-check

**When to run:** structural/CSS/component changes. Skip for copy-only edits.

**Which pages to screenshot:** only the routes affected by the change.
- `pages/index.js` → `/`
- `pages/work/index.js` → `/work`
- `pages/projects/index.js` → `/projects`
- `components/Navbar.jsx` → all routes (`/`, `/work`, `/projects`)

## Steps

**1. Find dev server** (ports 3000–3003):
```bash
for p in 3000 3001 3002 3003; do curl -s --max-time 1 http://localhost:$p > /dev/null && echo $p && break; done
```
If none respond: `npm run dev &` then wait 5s, re-check.

**2. Screenshot affected pages only:**
```bash
B=~/.claude/skills/gstack/browse/dist/browse
$B goto http://localhost:PORT/ROUTE   # always goto before screenshot
$B screenshot /tmp/vc-SLUG.png
```

**3. Read screenshot and check:**
- Dark background (`#0d1117`) — if white, CSS failed
- Nav links visible, correct active state
- One `<h1>`, content legible
- No clipped/overlapping content

If blank/white: retry `goto` + `screenshot` (hydration issue).

**4.** Report **PASS** or **ISSUE: [description]**. Fix issues, re-screenshot to confirm.

---
**Invariants:** Always `goto` before `screenshot`. `dark:` classes never activate — use base dark color directly (e.g. `text-neutral-400` not `text-neutral-600 dark:text-neutral-400`).
