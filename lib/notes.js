import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

// Notes are plain Markdown files in /notes (an Obsidian vault).
// Files and folders that start with "." or "_" are never published.
export const NOTES_DIR = path.join(process.cwd(), "notes");
export const ASSET_URL = "/note-assets";

const WIKILINK = /^(!?)\[\[([^\]\n]+)\]\]/;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export { formatDate } from "./formatDate";

function toIsoDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const m = String(value).match(/^\d{4}-\d{2}-\d{2}/);
  return m ? m[0] : null;
}

function toTags(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : String(value).split(",");
  return list.map((t) => String(t).trim().replace(/^#/, "")).filter(Boolean);
}

// Split "Note#Heading|Alias" into its parts.
function parseTarget(inner) {
  const [target, alias] = inner.split("|");
  const [name, heading] = target.split("#");
  return { name: name.trim(), heading: heading && heading.trim(), alias: alias && alias.trim() };
}

function plainText(markdown) {
  return markdown
    .replace(/!\[\[[^\]]*\]\]/g, "")
    .replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
      const { name, alias } = parseTarget(inner);
      return alias || name;
    })
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(content) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim());
  const para = blocks.find((b) => b && !/^(#|>|```|-|\*|\d+\.|!\[|\||---)/.test(b));
  if (!para) return "";
  const text = plainText(para);
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

export function extractWikilinks(content) {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  const names = [];
  for (const m of withoutCode.matchAll(/(!?)\[\[([^\]\n]+)\]\]/g)) {
    if (m[1]) continue; // embeds are not links
    names.push(parseTarget(m[2]).name);
  }
  return names;
}

export function parseNote(name, raw, folder = "") {
  const { data, content } = matter(raw);
  const words = plainText(content).split(" ").filter(Boolean).length;
  return {
    name,
    slug: slugify(name),
    title: data.title ? String(data.title) : name,
    date: toIsoDate(data.date || data.created),
    updated: toIsoDate(data.updated || data.modified),
    tags: toTags(data.tags),
    folder,
    description: data.description ? String(data.description) : firstParagraph(content),
    readingTime: Math.max(1, Math.round(words / 220)),
    published: data.draft !== true && data.publish !== false,
    content,
  };
}

// ---------- Markdown rendering ----------

function wikilinkRule(resolve) {
  return (state, silent) => {
    const src = state.src.slice(state.pos);
    const m = src.match(WIKILINK);
    if (!m) return false;
    if (!silent) {
      const isEmbed = m[1] === "!";
      const { name, heading, alias } = parseTarget(m[2]);
      if (isEmbed && IMAGE_EXT.test(name)) {
        const token = state.push("image", "img", 0);
        token.attrs = [["src", `${ASSET_URL}/${encodeURIComponent(path.basename(name))}`], ["alt", alias || ""], ["loading", "lazy"]];
        token.children = [];
        token.content = alias || "";
      } else {
        const slug = name ? resolve(name) : null;
        const label = alias || (name ? name : heading) || "";
        if (slug !== null || (!name && heading)) {
          const href = `${name ? `/notes/${slug}` : ""}${heading ? `#${slugify(heading)}` : ""}`;
          const open = state.push("link_open", "a", 1);
          open.attrs = [["href", href], ["class", "wikilink"]];
          state.push("text", "", 0).content = label;
          state.push("link_close", "a", -1);
        } else {
          const open = state.push("span_open", "span", 1);
          open.attrs = [["class", "wikilink-missing"]];
          state.push("text", "", 0).content = label;
          state.push("span_close", "span", -1);
        }
      }
    }
    state.pos += m[0].length;
    return true;
  };
}

// "> [!tip] Title" becomes <blockquote class="callout callout-tip">.
function calloutRule(state) {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== "blockquote_open") continue;
    const inline = tokens[i + 2];
    if (!inline || inline.type !== "inline") continue;
    const m = inline.content.match(/^\[!(\w+)\][+-]?[ \t]*([^\n]*)\n?/);
    if (!m) continue;
    const type = m[1].toLowerCase();
    tokens[i].attrJoin("class", `callout callout-${type}`);
    inline.content = inline.content.slice(m[0].length);
    const title = new state.Token("html_block", "", 0);
    title.content = `<p class="callout-title">${state.md.utils.escapeHtml(m[2] || type[0].toUpperCase() + type.slice(1))}</p>\n`;
    tokens.splice(i + 1, 0, title);
    if (!inline.content.trim()) {
      tokens.splice(i + 2, 3); // drop the now-empty paragraph
    }
  }
}

function headingIdRule(state) {
  const seen = {};
  state.tokens.forEach((token, i) => {
    if (token.type !== "heading_open") return;
    const base = slugify(plainText(state.tokens[i + 1].content)) || "section";
    seen[base] = (seen[base] || 0) + 1;
    token.attrSet("id", seen[base] > 1 ? `${base}-${seen[base] - 1}` : base);
  });
}

function createRenderer(resolve) {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
  md.inline.ruler.before("link", "wikilink", wikilinkRule(resolve));
  md.core.ruler.after("block", "callout", calloutRule);
  md.core.ruler.after("inline", "heading_ids", headingIdRule);

  const defaultLinkOpen =
    md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = tokens[idx].attrGet("href") || "";
    if (/^https?:\/\//.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return defaultLinkOpen(tokens, idx, options, env, self);
  };
  return md;
}

export function renderMarkdown(content, resolve = () => null) {
  return createRenderer(resolve).render(content);
}

// ---------- Collection ----------

// entries: [{ name, raw, folder? }]
export function buildNotes(entries) {
  const notes = entries.map((e) => parseNote(e.name, e.raw, e.folder)).filter((n) => n.published);

  const byName = new Map();
  notes.forEach((n) => {
    byName.set(n.name.toLowerCase(), n.slug);
    byName.set(n.title.toLowerCase(), n.slug);
  });
  const resolve = (name) => {
    const key = path.basename(name.replace(/\.md$/i, "")).toLowerCase();
    return byName.has(key) ? byName.get(key) : null;
  };

  const backlinks = new Map(notes.map((n) => [n.slug, []]));
  notes.forEach((n) => {
    const targets = new Set(extractWikilinks(n.content).map(resolve).filter(Boolean));
    targets.forEach((slug) => {
      if (slug !== n.slug) backlinks.get(slug).push({ slug: n.slug, title: n.title });
    });
  });

  return notes
    .map(({ content, published, name, ...n }) => ({
      ...n,
      html: renderMarkdown(content, resolve),
      backlinks: backlinks.get(n.slug),
    }))
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
}

function readEntries(dir, folder = "") {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (/^[._]/.test(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return readEntries(full, folder ? `${folder}/${entry.name}` : entry.name);
    if (!entry.name.endsWith(".md") || /^readme\.md$/i.test(entry.name)) return [];
    return [{ name: entry.name.replace(/\.md$/, ""), raw: fs.readFileSync(full, "utf8"), folder }];
  });
}

export function getAllNotes() {
  return buildNotes(readEntries(NOTES_DIR));
}

// Small shape for lists (no HTML body).
export function toSummary({ slug, title, date, tags, description, readingTime, folder }) {
  return { slug, title, date, tags, description, readingTime, folder };
}
