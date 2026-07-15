import { render, screen, within, fireEvent } from '@testing-library/react';
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

describe('ProjectsPage — project screenshots', () => {
  it('shows a screenshot toggle button only for projects that have an image', () => {
    render(<ProjectsPage />);

    // Pomelo has a screenshot
    const pomeloCard = screen.getByText('Pomelo').closest('.project-card');
    expect(within(pomeloCard).getByRole('button', { name: /screenshot/i })).toBeInTheDocument();

    // GPU Server has no image
    const gpuCard = screen.getByText('GPU Server').closest('.project-card');
    expect(within(gpuCard).queryByRole('button', { name: /screenshot/i })).toBeNull();
  });

  it('image is not rendered until the toggle is clicked, and hides again on second click', () => {
    render(<ProjectsPage />);

    const pomeloCard = screen.getByText('Pomelo').closest('.project-card');
    expect(within(pomeloCard).queryByRole('img')).toBeNull();

    const toggle = within(pomeloCard).getByRole('button', { name: /screenshot/i });
    fireEvent.click(toggle);
    expect(within(pomeloCard).getByRole('img')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(within(pomeloCard).queryByRole('img')).toBeNull();
  });

  it('revealed image has non-empty, descriptive alt text', () => {
    render(<ProjectsPage />);

    const pomeloCard = screen.getByText('Pomelo').closest('.project-card');
    const toggle = within(pomeloCard).getByRole('button', { name: /screenshot/i });
    fireEvent.click(toggle);

    const img = within(pomeloCard).getByRole('img');
    expect(img.getAttribute('alt')).toBeTruthy();
    expect(img.getAttribute('alt').length).toBeGreaterThan(5);
  });

  it('toggle button reflects state via aria-expanded', () => {
    render(<ProjectsPage />);

    const pomeloCard = screen.getByText('Pomelo').closest('.project-card');
    const toggle = within(pomeloCard).getByRole('button', { name: /screenshot/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('expanding one project image does not reveal another project image', () => {
    render(<ProjectsPage />);

    const pomeloCard = screen.getByText('Pomelo').closest('.project-card');
    const habitCard = screen.getByText('HabitTracker').closest('.project-card');

    const pomeloToggle = within(pomeloCard).getByRole('button', { name: /screenshot/i });
    fireEvent.click(pomeloToggle);

    expect(within(pomeloCard).getByRole('img')).toBeInTheDocument();
    expect(within(habitCard).queryByRole('img')).toBeNull();
  });
});

describe('ProjectsPage — Street Image Stitcher', () => {
  it('description opens by framing the tool for urban planners', () => {
    render(<ProjectsPage />);

    const card = screen
      .getByText('Street Image Stitcher')
      .closest('.project-card');
    const description = within(card).getByText(/Built for urban planners/i);
    expect(description.textContent.startsWith('Built for urban planners')).toBe(true);
    expect(description.textContent).toMatch(/inception report/i);
    expect(description.textContent).toMatch(/Mumbai/i);
    expect(description.textContent).toMatch(/Boston/i);
  });
});

describe('ProjectsPage — TARP Lab and TARP Field', () => {
  it('renders TARP Lab and TARP Field as separate cards, each with a GitHub link', () => {
    render(<ProjectsPage />);

    const labCard = screen
      .getAllByText('TARP Lab')
      .find((el) => el.tagName === 'SPAN')
      .closest('.project-card');
    const fieldCard = screen
      .getAllByText('TARP Field')
      .find((el) => el.tagName === 'SPAN')
      .closest('.project-card');
    expect(labCard).not.toBe(fieldCard);

    expect(within(labCard).getByText('GitHub ↗︎')).toHaveAttribute(
      'href',
      'https://github.com/infinityp913/tarp-lab',
    );
    expect(within(fieldCard).getByText('GitHub ↗︎')).toHaveAttribute(
      'href',
      'https://github.com/infinityp913/tarp-field',
    );
  });
});

describe('ProjectsPage — TARP pipeline visualization', () => {
  function getTarpCard() {
    return screen
      .getAllByText('TARP Lab')
      .find((el) => el.tagName === 'SPAN')
      .closest('.project-card');
  }

  it('shows a "Show pipeline" toggle instead of a screenshot toggle', () => {
    render(<ProjectsPage />);

    const tarpCard = getTarpCard();
    expect(within(tarpCard).getByRole('button', { name: /pipeline/i })).toBeInTheDocument();
    expect(within(tarpCard).queryByRole('button', { name: /^show screenshot/i })).toBeNull();
  });

  it('reveals four pipeline step images with descriptive alt text when toggled', () => {
    render(<ProjectsPage />);

    const tarpCard = getTarpCard();
    expect(within(tarpCard).queryAllByRole('img')).toHaveLength(0);

    const toggle = within(tarpCard).getByRole('button', { name: /pipeline/i });
    fireEvent.click(toggle);

    const images = within(tarpCard).getAllByRole('img');
    expect(images).toHaveLength(4);
    images.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('alt').length).toBeGreaterThan(5);
    });
  });

  it('pipeline toggle reflects state via aria-expanded and hides on second click', () => {
    render(<ProjectsPage />);

    const tarpCard = getTarpCard();
    const toggle = within(tarpCard).getByRole('button', { name: /pipeline/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(within(tarpCard).getAllByRole('img')).toHaveLength(4);

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(within(tarpCard).queryAllByRole('img')).toHaveLength(0);
  });
});
