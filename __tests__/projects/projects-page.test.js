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

  it('[link to project] anchor exists for a project with a link and has correct attributes', () => {
    render(<ProjectsPage />);
    // Find the DonateIt title, walk up to its card, then find the link label within
    const titleEl = screen.getByText('DonateIt');
    const card = titleEl.closest('.project-card');
    const linkLabel = within(card).getByText('[link to project]');
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

describe('ProjectsPage — no-link rendering', () => {
  it('project titles are never rendered as anchors', () => {
    render(<ProjectsPage />);
    ['DonateIt', 'TampAlert!', 'Trashcan Finder'].forEach((title) => {
      const el = screen.getByText(title);
      expect(el.closest('a')).toBeNull();
    });
  });

  it('projects with a link show a [link to project] anchor; projects without do not', () => {
    render(<ProjectsPage />);

    // DonateIt has a link — expect [link to project] in its card
    const donateitCard = screen.getByText('DonateIt').closest('.project-card');
    expect(within(donateitCard).getByText('[link to project]').tagName).toBe('A');

    // "GPU Server" has no link — expect no [link to project] in its card
    const gpuCard = screen.getByText('GPU Server').closest('.project-card');
    expect(within(gpuCard).queryByText('[link to project]')).toBeNull();
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
