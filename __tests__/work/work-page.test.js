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
