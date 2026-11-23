# Changelog

All notable changes to this project will be documented in this file.

## [0.0.2.0] - 2026-11-22

### Added
- **"On the shelf, yet to read"** section on the Books page, between Currently reading and Read
- **"Foundational models for Life"** note
- **X profile link** in the home page social icons
- **Bio links** to Sid, Matherium, TARP Field and TARP Lab

### Changed
- **Home page:** heading now reads "Hi, I'm Ananth."; the bio lists what Ananth and Sid have built as bullets, including the Roman archaeology project; latest notes moved to the top; perseverance video updated
- **Design pass:** more readable home page, higher-contrast text, Inter loaded properly
- **Navbar order:** Notes is now second (home, notes, projects, work, books)
- **Currently reading:** The Hard Thing About Hard Things (Ben Horowitz) and I Don't Want to Talk About It (Terrence Real); Ingenuity Gap moved to the shelf
- **Site name:** browser tab titles, README and package name now use "ananthpreetham"
- **Notes page** subtitle shortened; "Notes to myself" dated from its original 2024 commits

### Removed
- Food festival photo and hobbies paragraph from the home page
- Per-machine Obsidian settings (`appearance.json`, `core-plugins.json`) are now gitignored

## [0.0.1.0] - 2026-04-08

### Added
- **Agentic GIS** project entry (2026): AI-powered pipeline that automates urban bike lane planset creation in under 40 seconds, built with brother Sid

### Changed
- **I-JEPA**: Shortened description, links paper title directly to arXiv; adds training time improvements (parallelized embeddings, mixed precision) and ongoing RoPE/Muon optimizer exploration
- **Project link arrows**: Fixed `↗` rendering on mobile — appended U+FE0E text variation selector so iOS/Android display the same minimal arrow as desktop instead of an emoji glyph
