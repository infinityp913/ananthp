# Obsidian → /notes setup

You write in Obsidian. The **Obsidian Git** plugin commits and pushes your notes. Vercel sees the push and rebuilds the site. Git is also your backup.

```
Obsidian (notes/ vault) --Obsidian Git--> GitHub (main) --auto deploy--> Vercel /notes
```

## One-time setup (desktop)

1. Clone the repo (skip if you already have it):

   ```bash
   git clone https://github.com/infinityp913/ananthp.git
   ```

2. In Obsidian: **Open folder as vault** → select `ananthp/notes` (the `notes` folder, not the repo root). The vault settings in `notes/.obsidian/` are already in the repo: attachments go to `attachments/`, links use `[[wikilinks]]`, templates live in `_templates/`.
3. **Settings → Community plugins** → turn on community plugins → **Browse** → install **Git** (by Vinzent / "obsidian-git") → **Enable**. Its settings are pre-filled from the repo:
   - commit and push 10 minutes after you stop editing,
   - pull every 10 minutes and on start-up.
4. Make sure git can push from your machine (`git push` works in a terminal in the repo). On macOS the GitHub CLI (`gh auth login`) or an SSH key is the simplest.
5. Optional: **Settings → Core plugins → Templates** → on. Use the `Note` template for new notes.

Manual sync any time: command palette → **Git: Commit-and-sync**.

## Writing a note

Any `.md` file in the vault is published at `/notes/<file-name-slug>`. Frontmatter is optional:

```yaml
---
title: My note          # default: the file name
date: 2026-11-22        # used for sorting; newest first
updated: 2026-11-30     # optional
tags: [ml, life]
description: One line for the list and SEO   # default: first paragraph
draft: true             # keep it off the site (still backed up)
---
```

Supported Obsidian syntax: `[[Note]]`, `[[Note|alias]]`, `[[Note#Heading]]`, `![[image.png]]`, callouts (`> [!tip] Title`), tags, tables, code blocks. Backlinks show at the bottom of each note. Links to notes that do not exist (or are drafts) render as dashed text, not broken links.

Not published: `draft: true` / `publish: false`, anything in a folder or file that starts with `_` or `.`, and `README.md`.

## Important

- **The GitHub repo is public.** Drafts are hidden from the site but anyone can read them on GitHub. Keep private notes in a separate vault, or make the repo private (Vercel still deploys private repos).
- Each push triggers a Vercel build. The 10-minute idle delay keeps this low.
- Obsidian Git pushes to the branch you have checked out. Keep the vault on `main`.
- Mobile: Obsidian Git works on iOS/Android but is slow and limited. Prefer the desktop app for publishing.

## How it works in the code

- `lib/notes.js` — reads `notes/`, parses frontmatter (gray-matter), renders Markdown (markdown-it) with wikilinks, callouts, heading anchors and backlinks.
- `pages/notes/index.js` — card list with search and tag filter.
- `pages/notes/[slug].js` — one note, statically generated.
- `scripts/copy-note-assets.js` — runs before `dev`/`build`, copies vault images to `public/note-assets/` (git-ignored).
