import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as a button element when no href is provided', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as an anchor element when href is provided', () => {
      render(<Button href="https://example.com">Link</Button>);
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-copper-500');
      expect(button).toHaveClass('text-white');
    });

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('text-charcoal-900');
    });

    it('applies outline variant styles', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-white/20');
    });
  });

  describe('fullWidth prop', () => {
    it('does not apply w-full class by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });

    it('applies w-full class when fullWidth is true', () => {
      render(<Button fullWidth>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('external link behavior', () => {
    it('does not add target and rel attributes for internal links', () => {
      render(<Button href="/about">Internal</Button>);
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('adds target="_blank" for external links', () => {
      render(<Button href="https://example.com" external>External</Button>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('adds rel="noopener noreferrer" for external links', () => {
      render(<Button href="https://example.com" external>External</Button>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('className prop', () => {
    it('appends custom className to existing classes', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      // Should still have base styles
      expect(button).toHaveClass('inline-flex');
    });
  });

  describe('button props spreading', () => {
    it('spreads additional button props', () => {
      render(<Button type="submit" disabled>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
    });

    it('handles onClick events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has minimum touch target size (min-h-[48px])', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-h-[48px]');
    });
  });
});
