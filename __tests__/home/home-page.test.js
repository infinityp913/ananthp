import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/', push: jest.fn() })),
}));

describe('Home page — layout alignment', () => {
  it('section does not use the old h-screen layout', () => {
    const { container } = render(<Home />);
    const section = container.querySelector('section');
    expect(section.className).not.toContain('h-screen');
  });

  it('section uses max-w-2xl to align with Work and Projects pages', () => {
    const { container } = render(<Home />);
    const section = container.querySelector('section');
    expect(section.className).toContain('max-w-2xl');
  });
});

describe('Home page — social icon touch targets', () => {
  it('LinkedIn icon wrapper has min-h-[44px]', () => {
    render(<Home />);
    const linkedinLink = screen.getByTitle('LinkedIn');
    expect(linkedinLink.className).toContain('min-h-[44px]');
  });

  it('LinkedIn icon wrapper has min-w-[44px]', () => {
    render(<Home />);
    const linkedinLink = screen.getByTitle('LinkedIn');
    expect(linkedinLink.className).toContain('min-w-[44px]');
  });

  it('GitHub icon wrapper has min-h-[44px]', () => {
    render(<Home />);
    const githubLink = screen.getByTitle('GitHub');
    expect(githubLink.className).toContain('min-h-[44px]');
  });

  it('GitHub icon wrapper has min-w-[44px]', () => {
    render(<Home />);
    const githubLink = screen.getByTitle('GitHub');
    expect(githubLink.className).toContain('min-w-[44px]');
  });
});

describe('Home page — footer spacing', () => {
  it('footer has py-12 (not py-24)', () => {
    const { container } = render(<Home />);
    const footer = container.querySelector('footer');
    expect(footer.className).toContain('py-12');
    expect(footer.className).not.toContain('py-24');
  });
});

describe('Home page — br cleanup', () => {
  it('homepage has no bare <br> elements', () => {
    const { container } = render(<Home />);
    const brElements = container.querySelectorAll('br');
    expect(brElements).toHaveLength(0);
  });
});

describe('Home page — memoji present', () => {
  it('memoji image renders on home page', () => {
    render(<Home />);
    const memoji = screen.getByAltText('Ananth Preetham');
    expect(memoji).toBeInTheDocument();
  });
});

describe('Home page — active nav state', () => {
  it('home nav link has text-neutral-200 when pathname is /', () => {
    render(<Home />);
    const homeLink = screen.getByRole('link', { name: /^home$/i });
    expect(homeLink.className).toContain('text-neutral-200');
  });

  it('projects nav link does not have text-neutral-200 when on home page', () => {
    render(<Home />);
    const projectsLink = screen.getByRole('link', { name: /^projects$/i });
    expect(projectsLink.className).not.toContain('text-neutral-200');
  });

  it('work nav link does not have text-neutral-200 when on home page', () => {
    render(<Home />);
    const workLink = screen.getByRole('link', { name: /^work$/i });
    expect(workLink.className).not.toContain('text-neutral-200');
  });
});
