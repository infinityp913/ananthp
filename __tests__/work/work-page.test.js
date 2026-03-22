import { render, screen } from '@testing-library/react';
import WorkPage from '@/pages/work/index';
import { Libre_Baskerville } from 'next/font/google';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/work', push: jest.fn() })),
}));

// Resolve the expected class name the same way the page does
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

describe('WorkPage — mobile padding', () => {
  it('section has px-6 class for mobile base padding', () => {
    const { container } = render(<WorkPage />);
    const section = container.querySelector('section');
    expect(section.className).toContain('px-6');
  });

  it('section does not have bare px-20 without responsive prefix', () => {
    const { container } = render(<WorkPage />);
    const section = container.querySelector('section');
    const classes = section.className.split(' ');
    expect(classes).not.toContain('px-20');
  });
});

describe('WorkPage — memoji removed', () => {
  it('memoji image is not rendered on work page', () => {
    render(<WorkPage />);
    const memoji = screen.queryByAltText('Ananth Preetham');
    expect(memoji).toBeNull();
  });
});

describe('WorkPage — active nav state', () => {
  it('work nav link has text-neutral-200 when pathname is /work', () => {
    render(<WorkPage />);
    const workLink = screen.getByRole('link', { name: /^work$/i });
    expect(workLink.className).toContain('text-neutral-200');
  });

  it('home nav link does not have text-neutral-200 when on work page', () => {
    render(<WorkPage />);
    const homeLink = screen.getByRole('link', { name: /^home$/i });
    expect(homeLink.className).not.toContain('text-neutral-200');
  });

  it('projects nav link does not have text-neutral-200 when on work page', () => {
    render(<WorkPage />);
    const projectsLink = screen.getByRole('link', { name: /^projects$/i });
    expect(projectsLink.className).not.toContain('text-neutral-200');
  });
});

describe('WorkPage — heading font', () => {
  it('Work page h1 className does not contain [object Object]', () => {
    render(<WorkPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.className).not.toContain('[object Object]');
  });

  it('Work page h1 applies the Libre Baskerville className', () => {
    render(<WorkPage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.className).toContain(libreBaskerville.className);
  });
});
