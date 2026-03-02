import '@testing-library/jest-dom';

// IntersectionObserver is not implemented in jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
