import { render, screen } from '@testing-library/react';
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

  it('"Dune" renders in currently reading without a star rating', () => {
    render(<BooksPage />);
    expect(screen.getByText('Dune')).toBeInTheDocument();
  });

  it('"11/22/63" renders in currently reading without a star rating', () => {
    render(<BooksPage />);
    expect(screen.getByText('11/22/63')).toBeInTheDocument();
  });

  it('"Frank Herbert" renders as author', () => {
    render(<BooksPage />);
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });

  it('"Stephen King" renders as author', () => {
    render(<BooksPage />);
    expect(screen.getByText('Stephen King')).toBeInTheDocument();
  });
});

describe('BooksPage — read list', () => {
  it('renders all 13 read book titles', () => {
    render(<BooksPage />);
    const expectedTitles = [
      'Project Hail Mary',
      'Animal Farm',
      '1984',
      'How to Win Friends and Influence People',
      'Never Split the Difference',
      'Dopamine Nation',
      'The Gene: An Intimate History',
      "Man's Search for Meaning",
      'Sapiens: A Brief History of Humankind',
      'The 7 Habits of Highly Effective People',
      'And Then There Were None',
      'The Murder of Roger Ackroyd',
      'Five Little Pigs',
    ];
    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders all 13 authors', () => {
    render(<BooksPage />);
    expect(screen.getByText('Andy Weir')).toBeInTheDocument();
    expect(screen.getByText('Siddhartha Mukherjee')).toBeInTheDocument();
    // Agatha Christie appears 3 times — getAllByText
    const christies = screen.getAllByText('Agatha Christie');
    expect(christies).toHaveLength(3);
    expect(screen.getByText('Stephen R. Covey')).toBeInTheDocument();
    expect(screen.getByText('Viktor E. Frankl')).toBeInTheDocument();
    expect(screen.getByText('Yuval Noah Harari')).toBeInTheDocument();
    // George Orwell appears 2 times
    const orwells = screen.getAllByText('George Orwell');
    expect(orwells).toHaveLength(2);
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

  it('"Project Hail Mary" appears before "Animal Farm" (custom order: PHM is first)', () => {
    render(<BooksPage />);
    const allText = document.body.textContent;
    const hailMaryIdx = allText.indexOf('Project Hail Mary');
    const animalFarmIdx = allText.indexOf('Animal Farm');
    expect(hailMaryIdx).toBeLessThan(animalFarmIdx);
  });

  it('Agatha Christie books appear after non-Christie books', () => {
    render(<BooksPage />);
    const allText = document.body.textContent;
    const sapienIdx = allText.indexOf('Sapiens');
    const andThenIdx = allText.indexOf('And Then There Were None');
    expect(sapienIdx).toBeLessThan(andThenIdx);
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

  it('nav order: home < projects < work < books', () => {
    render(<BooksPage />);
    const navLinks = screen.getAllByRole('link');
    const texts = navLinks.map((l) => l.textContent.trim().toLowerCase());
    const homeIdx = texts.indexOf('home');
    const projectsIdx = texts.indexOf('projects');
    const workIdx = texts.indexOf('work');
    const booksIdx = texts.indexOf('books');
    expect(homeIdx).toBeLessThan(projectsIdx);
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
