import { render, screen } from '@testing-library/react';
import { StarRating } from '@/components/StarRating';

// Helper: count standalone filled stars (amber-400 NOT inside a [data-half] wrapper)
function countFilled(container) {
  return Array.from(container.querySelectorAll('.text-amber-400')).filter(
    (el) => !el.closest('[data-half]'),
  ).length;
}

// Helper: count standalone empty stars (neutral-700 NOT inside a [data-half] wrapper)
function countEmpty(container) {
  return Array.from(container.querySelectorAll('.text-neutral-700')).filter(
    (el) => !el.closest('[data-half]'),
  ).length;
}

describe('StarRating — filled/empty/half counts', () => {
  it('rating=5 renders 5 filled stars, 0 half, 0 empty', () => {
    const { container } = render(<StarRating rating={5} />);
    expect(countFilled(container)).toBe(5);
    expect(container.querySelectorAll('[data-half="true"]')).toHaveLength(0);
    expect(countEmpty(container)).toBe(0);
  });

  it('rating=4 renders 4 filled stars, 0 half, 1 empty', () => {
    const { container } = render(<StarRating rating={4} />);
    expect(countFilled(container)).toBe(4);
    expect(container.querySelectorAll('[data-half="true"]')).toHaveLength(0);
    expect(countEmpty(container)).toBe(1);
  });

  it('rating=4.5 renders 4 filled stars, 1 half, 0 empty', () => {
    const { container } = render(<StarRating rating={4.5} />);
    expect(countFilled(container)).toBe(4);
    expect(container.querySelectorAll('[data-half="true"]')).toHaveLength(1);
    expect(countEmpty(container)).toBe(0);
  });

  it('rating=0 renders 5 empty stars', () => {
    const { container } = render(<StarRating rating={0} />);
    expect(countFilled(container)).toBe(0);
    expect(countEmpty(container)).toBe(5);
  });

  it('rating=3.5 renders 3 filled, 1 half, 1 empty', () => {
    const { container } = render(<StarRating rating={3.5} />);
    expect(countFilled(container)).toBe(3);
    expect(container.querySelectorAll('[data-half="true"]')).toHaveLength(1);
    expect(countEmpty(container)).toBe(1);
  });

  it('always renders exactly 5 star slots (filled + half + empty = 5)', () => {
    [0, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5].forEach((rating) => {
      const { container, unmount } = render(<StarRating rating={rating} />);
      const filledCount = Math.floor(rating);
      const halfCount = rating % 1 >= 0.5 ? 1 : 0;
      expect(countFilled(container)).toBe(filledCount);
      expect(container.querySelectorAll('[data-half="true"]').length).toBe(halfCount);
      unmount();
    });
  });
});

describe('StarRating — half-star structure', () => {
  it('half star has overflow-hidden clip wrapper with w-[50%]', () => {
    const { container } = render(<StarRating rating={4.5} />);
    const half = container.querySelector('[data-half="true"]');
    const clip = half.querySelector('.overflow-hidden');
    expect(clip).toBeTruthy();
    expect(clip.className).toContain('w-[50%]');
  });

  it('half star has empty (neutral-700) base star', () => {
    const { container } = render(<StarRating rating={4.5} />);
    const half = container.querySelector('[data-half="true"]');
    const base = half.querySelector('.text-neutral-700');
    expect(base).toBeTruthy();
  });

  it('half star clip wrapper contains a filled (amber-400) star', () => {
    const { container } = render(<StarRating rating={4.5} />);
    const half = container.querySelector('[data-half="true"]');
    const clip = half.querySelector('.overflow-hidden');
    expect(clip.querySelector('.text-amber-400')).toBeTruthy();
  });
});

describe('StarRating — accessibility', () => {
  it('wrapper has role="img"', () => {
    render(<StarRating rating={4.5} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('aria-label is "4.5 out of 5 stars" for rating=4.5', () => {
    render(<StarRating rating={4.5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '4.5 out of 5 stars');
  });

  it('aria-label is "5 out of 5 stars" for rating=5', () => {
    render(<StarRating rating={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '5 out of 5 stars');
  });

  it('aria-label is "4 out of 5 stars" for rating=4', () => {
    render(<StarRating rating={4} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', '4 out of 5 stars');
  });

  it('sr-only span contains the accessible label text', () => {
    render(<StarRating rating={4.5} />);
    const srOnly = document.querySelector('.sr-only');
    expect(srOnly).toBeTruthy();
    expect(srOnly.textContent).toBe('4.5 out of 5 stars');
  });
});
