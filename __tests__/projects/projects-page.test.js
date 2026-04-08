import { render, screen, within } from '@testing-library/react';
import ProjectsPage from '@/pages/projects/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/projects', push: jest.fn() })),
}));

describe('ProjectsPage', () => {
  it('renders exactly one h1', () => {
    render(<ProjectsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('project title with a link is plain text — NOT an anchor', () => {
    render(<ProjectsPage />);
    const titleEl = screen.getByText('DonateIt');
    expect(titleEl.closest('a')).toBeNull();
  });

  it('destination-aware link label exists for a Devpost project and has correct attributes', () => {
    render(<ProjectsPage />);
    // DonateIt links to Devpost — label should be 'Devpost ↗︎'
    const titleEl = screen.getByText('DonateIt');
    const card = titleEl.closest('.project-card');
    const linkLabel = within(card).getByText('Devpost ↗︎');
    expect(linkLabel.tagName).toBe('A');
    expect(linkLabel).toHaveAttribute('href', 'https://devpost.com/software/donateit-4il5tg');
    expect(linkLabel).toHaveAttribute('target', '_blank');
    expect(linkLabel).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('no anchor element has an empty or missing href', () => {
    render(<ProjectsPage />);
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach((a) => {
      expect(a.getAttribute('href')).toBeTruthy();
    });
  });

  it('Navbar renders a link to /projects', () => {
    render(<ProjectsPage />);
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    expect(projectsLink).toBeInTheDocument();
  });
});

describe('ProjectsPage — destination-aware link labels', () => {
  it('GitHub-linked project shows "GitHub ↗︎"', () => {
    render(<ProjectsPage />);
    // I-JEPA links to github.com — use the title span (exact match) to find the card
    const ijepaCard = screen.getAllByText('I-JEPA').find(
      (el) => el.tagName === 'SPAN'
    ).closest('.project-card');
    expect(within(ijepaCard).getByText('GitHub ↗︎').tagName).toBe('A');
  });

  it('Devpost-linked project shows "Devpost ↗︎"', () => {
    render(<ProjectsPage />);
    const donateitCard = screen.getByText('DonateIt').closest('.project-card');
    expect(within(donateitCard).getByText('Devpost ↗︎').tagName).toBe('A');
  });

  it('other-linked project shows "Open ↗︎"', () => {
    render(<ProjectsPage />);
    // PALP links to palp-art.netlify.app
    const palpCard = screen.getByText('Pompeii Artistic Landscape Project').closest('.project-card');
    expect(within(palpCard).getByText('Open ↗︎').tagName).toBe('A');
  });

  it('no-link project renders no link label', () => {
    render(<ProjectsPage />);
    // GPU Server has no link property
    const gpuCard = screen.getByText('GPU Server').closest('.project-card');
    expect(within(gpuCard).queryByText('GitHub ↗︎')).toBeNull();
    expect(within(gpuCard).queryByText('Devpost ↗︎')).toBeNull();
    expect(within(gpuCard).queryByText('Open ↗︎')).toBeNull();
  });
});

describe('ProjectsPage — no-link rendering', () => {
  it('project titles are never rendered as anchors', () => {
    render(<ProjectsPage />);
    ['DonateIt', 'TampAlert!', 'Trashcan Finder'].forEach((title) => {
      const el = screen.getByText(title);
      expect(el.closest('a')).toBeNull();
    });
  });

  it('projects with a link show a destination label anchor; projects without do not', () => {
    render(<ProjectsPage />);

    // DonateIt has a link — expect 'Devpost ↗︎' in its card
    const donateitCard = screen.getByText('DonateIt').closest('.project-card');
    expect(within(donateitCard).getByText('Devpost ↗︎').tagName).toBe('A');

    // GPU Server has no link — expect no link label in its card
    const gpuCard = screen.getByText('GPU Server').closest('.project-card');
    expect(within(gpuCard).queryByText('Open ↗︎')).toBeNull();
  });
});

describe('ProjectsPage — memoji removed', () => {
  it('memoji image is not rendered on projects page', () => {
    render(<ProjectsPage />);
    const memoji = screen.queryByAltText('Ananth Preetham');
    expect(memoji).toBeNull();
  });
});

describe('ProjectsPage — active nav state', () => {
  it('projects nav link has text-neutral-200 when pathname is /projects', () => {
    render(<ProjectsPage />);
    const projectsLink = screen.getByRole('link', { name: /^projects$/i });
    expect(projectsLink.className).toContain('text-neutral-200');
  });

  it('home nav link does not have text-neutral-200 when on projects page', () => {
    render(<ProjectsPage />);
    const homeLink = screen.getByRole('link', { name: /^home$/i });
    expect(homeLink.className).not.toContain('text-neutral-200');
  });

  it('work nav link does not have text-neutral-200 when on projects page', () => {
    render(<ProjectsPage />);
    const workLink = screen.getByRole('link', { name: /^work$/i });
    expect(workLink.className).not.toContain('text-neutral-200');
  });
});

describe('ProjectsPage — Navbar order', () => {
  it('renders nav links in order: home, projects, work', () => {
    render(<ProjectsPage />);
    const navLinks = screen.getAllByRole('link');
    const navTexts = navLinks.map((l) => l.textContent.trim().toLowerCase());
    const homeIdx = navTexts.indexOf('home');
    const projectsIdx = navTexts.indexOf('projects');
    const workIdx = navTexts.indexOf('work');
    expect(homeIdx).toBeLessThan(projectsIdx);
    expect(projectsIdx).toBeLessThan(workIdx);
  });
});
