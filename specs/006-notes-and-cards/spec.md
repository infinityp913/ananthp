# 006 — Notes section and card-based design

## User stories
1. As Ananth, I write notes in Obsidian and they appear on `/notes` after an automatic git push, with no manual deploy step.
2. As a visitor, I browse notes as cards, search them, filter by tag, and open a note.
3. As a visitor, I follow `[[wikilinks]]` between notes and see which notes link to the one I read (backlinks).
4. As a visitor, I see a consistent card style across Projects, Work, Books, Notes, and the home page "Latest notes".

## Acceptance criteria
- `/notes` lists published notes newest-first as cards; one `<h1>`; nav item "notes" active on `/notes` and `/notes/*`.
- Notes with `draft: true` or `publish: false`, and `_`/`.` paths, are not built.
- Wikilinks resolve by file name or title; unresolved links render as non-link text.
- `![[image]]` embeds load from `/note-assets/`.
- External links in notes open in a new tab with `rel="noopener noreferrer"`.
- Raw HTML in Markdown is escaped.
- Shared `Card` component: `rounded-xl border border-neutral-800 bg-neutral-900/40 p-5`.

## Tests
`__tests__/notes/` (lib, index page, note page) and `__tests__/home/` (latest notes).
