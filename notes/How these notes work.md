---
title: How these notes work
date: 2026-11-22
tags: [meta]
---

I write these notes in [Obsidian](https://obsidian.md). Each note is a plain Markdown file. When I save, a plugin commits the file to git and pushes it. The site rebuilds and the note goes live.

## What works here

- Links between notes, like [[Notes to myself]]. A note shows which other notes link to it at the bottom.
- Links to a heading: [[How these notes work#Drafts|the drafts section]].
- Images: drop a file into the note and it shows up here.
- Tags from the frontmatter.
- Callouts:

> [!tip] Keep it rough
> A note does not have to be finished to be useful.

## Drafts

Add `draft: true` to the frontmatter and the note stays out of the site. Git still backs it up.
