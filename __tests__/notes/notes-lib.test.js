/**
 * @jest-environment node
 */
import {
  slugify,
  parseNote,
  buildNotes,
  renderMarkdown,
  formatDate,
} from '@/lib/notes';

const raw = (fm, body) => `---\n${fm}\n---\n${body}`;

describe('slugify', () => {
  it('lowercases and hyphenates note names', () => {
    expect(slugify('Notes to Myself')).toBe('notes-to-myself');
  });
  it('drops punctuation', () => {
    expect(slugify("What's a [[thing]]?")).toBe('whats-a-thing');
  });
});

describe('parseNote', () => {
  it('uses frontmatter title, date and tags', () => {
    const n = parseNote('file name', raw('title: Hello\ndate: 2026-01-05\ntags: [ml, life]', 'Body text.'));
    expect(n.title).toBe('Hello');
    expect(n.slug).toBe('file-name');
    expect(n.date).toBe('2026-01-05');
    expect(n.tags).toEqual(['ml', 'life']);
  });
  it('falls back to the file name for the title', () => {
    expect(parseNote('My Note', 'Just text').title).toBe('My Note');
  });
  it('accepts a comma-separated tags string', () => {
    expect(parseNote('a', raw('tags: ml, life', 'x')).tags).toEqual(['ml', 'life']);
  });
  it('builds a plain-text description from the first paragraph', () => {
    const n = parseNote('a', '# Heading\n\nFirst **bold** [[Other|line]].\n\nSecond.');
    expect(n.description).toBe('First bold line.');
  });
  it('marks drafts and publish:false as unpublished', () => {
    expect(parseNote('a', raw('draft: true', 'x')).published).toBe(false);
    expect(parseNote('a', raw('publish: false', 'x')).published).toBe(false);
    expect(parseNote('a', 'x').published).toBe(true);
  });
});

describe('buildNotes', () => {
  const notes = buildNotes([
    { name: 'Alpha', raw: raw('date: 2026-01-01', 'See [[Beta]] and [[Beta#Part two|part two]].') },
    { name: 'Beta', raw: raw('date: 2026-03-01', '## Part two\n\nNo links.') },
    { name: 'Secret', raw: raw('draft: true', 'Links [[Alpha]].') },
  ]);

  it('drops unpublished notes', () => {
    expect(notes.map((n) => n.slug)).not.toContain('secret');
  });
  it('sorts newest first', () => {
    expect(notes.map((n) => n.slug)).toEqual(['beta', 'alpha']);
  });
  it('computes backlinks from published notes only', () => {
    const alpha = notes.find((n) => n.slug === 'alpha');
    const beta = notes.find((n) => n.slug === 'beta');
    expect(beta.backlinks).toEqual([{ slug: 'alpha', title: 'Alpha' }]);
    expect(alpha.backlinks).toEqual([]);
  });
  it('renders wikilinks as internal links with heading anchors', () => {
    const alpha = notes.find((n) => n.slug === 'alpha');
    expect(alpha.html).toContain('href="/notes/beta"');
    expect(alpha.html).toContain('href="/notes/beta#part-two"');
    expect(alpha.html).toContain('>part two</a>');
  });
  it('adds ids to headings', () => {
    const beta = notes.find((n) => n.slug === 'beta');
    expect(beta.html).toContain('<h2 id="part-two">');
  });
});

describe('renderMarkdown', () => {
  const resolve = (name) => (name.toLowerCase() === 'known' ? 'known' : null);

  it('renders unresolved wikilinks as plain text, not links', () => {
    const html = renderMarkdown('Go to [[Missing note]].', resolve);
    expect(html).not.toContain('href');
    expect(html).toContain('wikilink-missing');
  });
  it('renders image embeds from note assets', () => {
    expect(renderMarkdown('![[photo 1.png]]', resolve)).toContain('src="/note-assets/photo%201.png"');
  });
  it('leaves wikilinks inside code alone', () => {
    expect(renderMarkdown('`[[Known]]`', resolve)).toContain('<code>[[Known]]</code>');
  });
  it('renders Obsidian callouts', () => {
    const html = renderMarkdown('> [!tip] Remember\n> Keep going.', resolve);
    expect(html).toContain('class="callout callout-tip"');
    expect(html).toContain('Remember');
    expect(html).not.toContain('[!tip]');
  });
  it('escapes raw HTML', () => {
    expect(renderMarkdown('<script>x</script>', resolve)).not.toContain('<script>');
  });
  it('opens external links in a new tab', () => {
    const html = renderMarkdown('[x](https://example.com)', resolve);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});

describe('formatDate', () => {
  it('formats ISO dates without locale drift', () => {
    expect(formatDate('2026-11-02')).toBe('Nov 2, 2026');
    expect(formatDate(null)).toBe('');
  });
});
