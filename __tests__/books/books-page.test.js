import { render, screen, within } from '@testing-library/react';
import BooksPage from '@/pages/books/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/books', push: jest.fn() })),
}));

describe('BooksPage — structure', () => {
  it('renders exactly one h1 with text "Books"', () => {
    render(<BooksPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe('Books');
  });

  it('section has max-w-2xl class', () => {
    const { container } = render(<BooksPage />);
    const section = container.querySelector('section');
    expect(section.className).toContain('max-w-2xl');
  });

  it('subtitle "What I\'ve been reading." is present', () => {
    render(<BooksPage />);
    expect(screen.getByText("What I've been reading.")).toBeInTheDocument();
  });
});

describe('BooksPage — currently reading', () => {
  it('"Currently reading" section label is present', () => {
    render(<BooksPage />);
    expect(screen.getByText(/currently reading/i)).toBeInTheDocument();
  });

  it('lists the two current books with their authors', () => {
    render(<BooksPage />);
    const list = screen.getByRole('list', { name: /currently reading/i });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(within(list).getByText('The Hard Thing About Hard Things')).toBeInTheDocument();
    expect(within(list).getByText('Ben Horowitz')).toBeInTheDocument();
    expect(within(list).getByText("I Don't Want to Talk About It")).toBeInTheDocument();
    expect(within(list).getByText('Terrence Real')).toBeInTheDocument();
  });
});

describe('BooksPage — on the shelf', () => {
  it('lists Ingenuity Gap as yet to read', () => {
    render(<BooksPage />);
    const list = screen.getByRole('list', { name: /on the shelf, yet to read/i });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(within(list).getByText('Ingenuity Gap')).toBeInTheDocument();
    expect(within(list).getByText('Thomas Homer-Dixon')).toBeInTheDocument();
  });

  it('sits between currently reading and read', () => {
    render(<BooksPage />);
    const labels = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent.toLowerCase());
    expect(labels).toEqual(['currently reading', 'on the shelf, yet to read', 'read']);
  });
});

describe('BooksPage — read list', () => {
  it('renders representative read book titles', () => {
    render(<BooksPage />);
    const expectedTitles = [
      'Project Hail Mary',
      '1984',
      'Five Little Pigs',
    ];
    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders representative authors from the read list', () => {
    render(<BooksPage />);
    expect(screen.getByText('Andy Weir')).toBeInTheDocument();
    expect(screen.getByText('Siddhartha Mukherjee')).toBeInTheDocument();
    expect(screen.getAllByText('Agatha Christie').length).toBeGreaterThan(0);
    expect(screen.getByText('Stephen R. Covey')).toBeInTheDocument();
    expect(screen.getByText('Viktor E. Frankl')).toBeInTheDocument();
    expect(screen.getByText('Yuval Noah Harari')).toBeInTheDocument();
    expect(screen.getAllByText('George Orwell').length).toBeGreaterThan(0);
    expect(screen.getByText('Dale Carnegie')).toBeInTheDocument();
    expect(screen.getByText('Chris Voss')).toBeInTheDocument();
    expect(screen.getByText('Anna Lembke')).toBeInTheDocument();
  });

  it('read list is a <ul> element', () => {
    const { container } = render(<BooksPage />);
    const lists = container.querySelectorAll('ul');
    // At least one ul for the read list (currently reading may also be a ul)
    expect(lists.length).toBeGreaterThanOrEqual(1);
  });
});

describe('BooksPage — navbar', () => {
  it('navbar renders a link to /books', () => {
    render(<BooksPage />);
    const booksLink = screen.getByRole('link', { name: /^books$/i });
    expect(booksLink).toHaveAttribute('href', '/books');
  });

  it('books link has text-neutral-200 when pathname is /books (active state)', () => {
    render(<BooksPage />);
    const booksLink = screen.getByRole('link', { name: /^books$/i });
    expect(booksLink.className).toContain('text-neutral-200');
  });

  it('home link does not have text-neutral-200 when on /books', () => {
    render(<BooksPage />);
    const homeLink = screen.getByRole('link', { name: /^home$/i });
    expect(homeLink.className).not.toContain('text-neutral-200');
  });

  it('nav order: home < notes < projects < work < books', () => {
    render(<BooksPage />);
    const navLinks = screen.getAllByRole('link');
    const texts = navLinks.map((l) => l.textContent.trim().toLowerCase());
    const homeIdx = texts.indexOf('home');
    const notesIdx = texts.indexOf('notes');
    const projectsIdx = texts.indexOf('projects');
    const workIdx = texts.indexOf('work');
    const booksIdx = texts.indexOf('books');
    expect(homeIdx).toBe(0);
    expect(notesIdx).toBe(1);
    expect(notesIdx).toBeLessThan(projectsIdx);
    expect(projectsIdx).toBeLessThan(workIdx);
    expect(workIdx).toBeLessThan(booksIdx);
  });
});

describe('BooksPage — accessibility', () => {
  it('renders exactly one h1', () => {
    render(<BooksPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('no anchor has an empty or missing href', () => {
    render(<BooksPage />);
    document.querySelectorAll('a[href]').forEach((a) => {
      expect(a.getAttribute('href')).toBeTruthy();
    });
  });
});
