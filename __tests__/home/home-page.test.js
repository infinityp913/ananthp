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
