import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Section } from '../Section';

// Track calls to observer methods
let intersectionCallback: IntersectionObserverCallback;
let observedElements: Element[] = [];
const mockObserve = vi.fn((element: Element) => {
  observedElements.push(element);
});
const mockUnobserve = vi.fn((element: Element) => {
  observedElements = observedElements.filter(el => el !== element);
});
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    intersectionCallback = callback;
    if (options) {
      this.rootMargin = options.rootMargin || '';
      this.thresholds = options.threshold ?
        (Array.isArray(options.threshold) ? options.threshold : [options.threshold]) :
        [];
    }
  }

  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
  takeRecords = vi.fn(() => []);
}

describe('Section', () => {
  beforeEach(() => {
    observedElements = [];
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Section><div>Test Content</div></Section>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders as a section element', () => {
      render(<Section>Content</Section>);
      expect(document.querySelector('section')).toBeInTheDocument();
    });

    it('applies id prop correctly', () => {
      render(<Section id="test-section">Content</Section>);
      expect(document.getElementById('test-section')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Section className="custom-class">Content</Section>);
      const section = document.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('padding', () => {
    it('applies default padding classes when noPadding is false', () => {
      render(<Section>Content</Section>);
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-16');
      expect(section).toHaveClass('sm:py-20');
      expect(section).toHaveClass('md:py-32');
    });

    it('does not apply padding classes when noPadding is true', () => {
      render(<Section noPadding>Content</Section>);
      const section = document.querySelector('section');
      expect(section).not.toHaveClass('py-16');
      expect(section).not.toHaveClass('sm:py-20');
      expect(section).not.toHaveClass('md:py-32');
    });
  });

  describe('visibility animation', () => {
    it('initially renders without is-visible class', () => {
      render(<Section>Content</Section>);
      const revealDiv = document.querySelector('.reveal-on-scroll');
      expect(revealDiv).toBeInTheDocument();
      expect(revealDiv).not.toHaveClass('is-visible');
    });

    it('adds is-visible class when element intersects', () => {
      render(<Section>Content</Section>);

      // Simulate intersection
      act(() => {
        const mockObserver = { unobserve: mockUnobserve };
        intersectionCallback(
          [{ isIntersecting: true, target: observedElements[0] } as IntersectionObserverEntry],
          mockObserver as unknown as IntersectionObserver
        );
      });

      const revealDiv = document.querySelector('.reveal-on-scroll');
      expect(revealDiv).toHaveClass('is-visible');
    });

    it('does not add is-visible class when element is not intersecting', () => {
      render(<Section>Content</Section>);

      // Simulate non-intersection
      act(() => {
        const mockObserver = { unobserve: mockUnobserve };
        intersectionCallback(
          [{ isIntersecting: false, target: observedElements[0] } as IntersectionObserverEntry],
          mockObserver as unknown as IntersectionObserver
        );
      });

      const revealDiv = document.querySelector('.reveal-on-scroll');
      expect(revealDiv).not.toHaveClass('is-visible');
    });
  });

  describe('IntersectionObserver setup', () => {
    it('creates IntersectionObserver on mount', () => {
      render(<Section>Content</Section>);
      expect(mockObserve).toHaveBeenCalled();
      expect(observedElements.length).toBe(1);
    });

    it('unobserves element when it becomes visible', () => {
      render(<Section>Content</Section>);

      act(() => {
        const mockObserver = { unobserve: mockUnobserve };
        intersectionCallback(
          [{ isIntersecting: true, target: observedElements[0] } as IntersectionObserverEntry],
          mockObserver as unknown as IntersectionObserver
        );
      });

      expect(mockUnobserve).toHaveBeenCalled();
    });

    it('cleans up observer on unmount', () => {
      const { unmount } = render(<Section>Content</Section>);

      unmount();

      expect(mockUnobserve).toHaveBeenCalled();
    });
  });

  describe('base styles', () => {
    it('has relative positioning', () => {
      render(<Section>Content</Section>);
      const section = document.querySelector('section');
      expect(section).toHaveClass('relative');
    });

    it('has full width', () => {
      render(<Section>Content</Section>);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full');
    });

    it('has overflow hidden', () => {
      render(<Section>Content</Section>);
      const section = document.querySelector('section');
      expect(section).toHaveClass('overflow-hidden');
    });
  });
});
