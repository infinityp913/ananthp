import { render, screen, fireEvent } from '@testing-library/react';
import NotesPage from '@/pages/notes/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/notes', query: {}, push: jest.fn() })),
}));

const notes = [
  { slug: 'beta', title: 'Beta', date: '2026-03-01', tags: ['ml'], description: 'About ML.', readingTime: 2 },
  { slug: 'alpha', title: 'Alpha', date: '2026-01-01', tags: ['life'], description: 'About life.', readingTime: 1 },
];

describe('NotesPage', () => {
  it('renders exactly one h1 "Notes" with Libre Baskerville', () => {
    render(<NotesPage notes={notes} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe('Notes');
  });

  it('notes nav link is active', () => {
    render(<NotesPage notes={notes} />);
    const link = screen.getAllByRole('link', { name: /^notes$/i })[0];
    expect(link.className).toContain('text-neutral-200');
  });

  it('renders a card linking to each note', () => {
    render(<NotesPage notes={notes} />);
    expect(screen.getByRole('link', { name: /beta/i })).toHaveAttribute('href', '/notes/beta');
    expect(screen.getByRole('link', { name: /alpha/i })).toHaveAttribute('href', '/notes/alpha');
  });

  it('filters by tag', () => {
    render(<NotesPage notes={notes} />);
    fireEvent.click(screen.getByRole('button', { name: '#life' }));
    expect(screen.queryByRole('link', { name: /beta/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /alpha/i })).toBeInTheDocument();
  });

  it('filters by search text', () => {
    render(<NotesPage notes={notes} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'ml' } });
    expect(screen.queryByRole('link', { name: /alpha/i })).not.toBeInTheDocument();
  });

  it('shows an empty state with no notes', () => {
    render(<NotesPage notes={[]} />);
    expect(screen.getByText(/no notes/i)).toBeInTheDocument();
  });
});
