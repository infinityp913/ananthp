import { render, screen } from '@testing-library/react';
import NotePage from '@/pages/notes/[slug]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/notes/[slug]', query: {}, push: jest.fn() })),
}));

const note = {
  slug: 'beta',
  title: 'Beta',
  date: '2026-03-01',
  tags: ['ml'],
  description: 'About ML.',
  readingTime: 2,
  html: '<p>Hello body</p>',
  backlinks: [{ slug: 'alpha', title: 'Alpha' }],
};

describe('NotePage', () => {
  it('renders the note title as the only h1', () => {
    render(<NotePage note={note} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe('Beta');
  });

  it('keeps the notes nav item active on a note page', () => {
    render(<NotePage note={note} />);
    expect(screen.getByRole('link', { name: /^notes$/i }).className).toContain('text-neutral-200');
  });

  it('renders the note body', () => {
    render(<NotePage note={note} />);
    expect(screen.getByText('Hello body')).toBeInTheDocument();
  });

  it('lists backlinks', () => {
    render(<NotePage note={note} />);
    expect(screen.getByRole('link', { name: /alpha/i })).toHaveAttribute('href', '/notes/alpha');
  });

  it('links tags back to the filtered index', () => {
    render(<NotePage note={note} />);
    expect(screen.getByRole('link', { name: '#ml' })).toHaveAttribute('href', '/notes?tag=ml');
  });

  it('has a link back to all notes', () => {
    render(<NotePage note={note} />);
    expect(screen.getByRole('link', { name: /all notes/i })).toHaveAttribute('href', '/notes');
  });
});
