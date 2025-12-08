import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navigation', () => {
  let scrollY: number;

  beforeEach(() => {
    scrollY = 0;
    Object.defineProperty(window, 'scrollY', {
      get: () => scrollY,
      configurable: true,
    });
    document.body.style.overflow = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  describe('rendering', () => {
    it('renders the brand name correctly', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getByText('Brandon')).toBeInTheDocument();
      expect(screen.getByText('Young')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getAllByText('About')).toHaveLength(2); // Desktop and mobile
      expect(screen.getAllByText('Who I Help')).toHaveLength(2);
      expect(screen.getAllByText('Results')).toHaveLength(2);
    });

    it('renders the "Book Strategy Call" button', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getAllByText('Book Strategy Call')).toHaveLength(2); // Desktop and mobile
    });

    it('renders mobile menu toggle button', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
    });
  });

  describe('scroll behavior', () => {
    it('starts with transparent background', () => {
      renderWithRouter(<Navigation />);
      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('bg-transparent');
      expect(nav).toHaveClass('py-6');
    });

    it('adds scrolled styles when scrollY > 50', () => {
      renderWithRouter(<Navigation />);

      act(() => {
        scrollY = 51;
        window.dispatchEvent(new Event('scroll'));
      });

      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('bg-charcoal-900/90');
      expect(nav).toHaveClass('backdrop-blur-md');
      expect(nav).toHaveClass('py-4');
    });

    it('removes scrolled styles when scrollY <= 50', () => {
      renderWithRouter(<Navigation />);

      // First scroll down
      act(() => {
        scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
      });

      // Then scroll back up
      act(() => {
        scrollY = 30;
        window.dispatchEvent(new Event('scroll'));
      });

      const nav = document.querySelector('nav');
      expect(nav).toHaveClass('bg-transparent');
    });

    it('cleans up scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderWithRouter(<Navigation />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('mobile menu', () => {
    it('mobile menu is initially hidden (translated up)', () => {
      renderWithRouter(<Navigation />);
      const mobileMenu = document.querySelector('.fixed.inset-0.bg-charcoal-900');
      expect(mobileMenu).toHaveClass('-translate-y-full');
    });

    it('opens mobile menu on toggle click', () => {
      renderWithRouter(<Navigation />);

      fireEvent.click(screen.getByLabelText('Open menu'));

      const mobileMenu = document.querySelector('.fixed.inset-0.bg-charcoal-900');
      expect(mobileMenu).toHaveClass('translate-y-0');
    });

    it('closes mobile menu on second toggle click', () => {
      renderWithRouter(<Navigation />);

      // Open menu
      fireEvent.click(screen.getByLabelText('Open menu'));
      // Close menu
      fireEvent.click(screen.getByLabelText('Close menu'));

      const mobileMenu = document.querySelector('.fixed.inset-0.bg-charcoal-900');
      expect(mobileMenu).toHaveClass('-translate-y-full');
    });

    it('closes mobile menu when a nav link is clicked', () => {
      renderWithRouter(<Navigation />);

      // Open menu
      fireEvent.click(screen.getByLabelText('Open menu'));

      // Click a nav link in mobile menu
      const mobileAboutLink = screen.getAllByText('About')[1]; // Mobile version
      fireEvent.click(mobileAboutLink);

      const mobileMenu = document.querySelector('.fixed.inset-0.bg-charcoal-900');
      expect(mobileMenu).toHaveClass('-translate-y-full');
    });

    it('changes toggle button icon when menu is open', () => {
      renderWithRouter(<Navigation />);

      expect(screen.getByLabelText('Open menu')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Open menu'));

      expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    });
  });

  describe('body overflow management', () => {
    it('sets body overflow to hidden when mobile menu is open', () => {
      renderWithRouter(<Navigation />);

      fireEvent.click(screen.getByLabelText('Open menu'));

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('sets body overflow to unset when mobile menu is closed', () => {
      renderWithRouter(<Navigation />);

      // Open menu
      fireEvent.click(screen.getByLabelText('Open menu'));
      // Close menu
      fireEvent.click(screen.getByLabelText('Close menu'));

      expect(document.body.style.overflow).toBe('unset');
    });

    it('restores body overflow on unmount', () => {
      const { unmount } = renderWithRouter(<Navigation />);

      // Open menu
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('navigation links', () => {
    it('has correct href for About link', () => {
      renderWithRouter(<Navigation />);
      const aboutLinks = screen.getAllByText('About');
      expect(aboutLinks[0].closest('a')).toHaveAttribute('href', '#story');
    });

    it('has correct href for Who I Help link', () => {
      renderWithRouter(<Navigation />);
      const links = screen.getAllByText('Who I Help');
      expect(links[0].closest('a')).toHaveAttribute('href', '#audience');
    });

    it('has correct href for Results link', () => {
      renderWithRouter(<Navigation />);
      const links = screen.getAllByText('Results');
      expect(links[0].closest('a')).toHaveAttribute('href', '#results');
    });
  });

  describe('mailto link', () => {
    it('Book Strategy Call has mailto link with correct email', () => {
      renderWithRouter(<Navigation />);
      const strategyButtons = screen.getAllByText('Book Strategy Call');
      const desktopButton = strategyButtons[0].closest('a');
      expect(desktopButton).toHaveAttribute('href', expect.stringContaining('mailto:brandeauxmedia@gmail.com'));
    });

    it('mailto link includes strategy call subject', () => {
      renderWithRouter(<Navigation />);
      const strategyButtons = screen.getAllByText('Book Strategy Call');
      const desktopButton = strategyButtons[0].closest('a');
      expect(desktopButton).toHaveAttribute('href', expect.stringContaining('subject='));
    });
  });

  describe('responsive visibility', () => {
    it('desktop nav is hidden on mobile (md:flex hidden)', () => {
      renderWithRouter(<Navigation />);
      const desktopNav = document.querySelector('.hidden.md\\:flex.items-center.space-x-8');
      expect(desktopNav).toBeInTheDocument();
    });

    it('mobile menu button is visible on mobile (md:hidden)', () => {
      renderWithRouter(<Navigation />);
      const mobileButton = document.querySelector('button.md\\:hidden');
      expect(mobileButton).toBeInTheDocument();
    });

    it('mobile overlay is hidden on desktop (md:hidden)', () => {
      renderWithRouter(<Navigation />);
      const mobileOverlay = document.querySelector('.fixed.inset-0.bg-charcoal-900.z-40');
      expect(mobileOverlay).toHaveClass('md:hidden');
    });
  });
});
