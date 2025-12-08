import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the supabase module BEFORE importing Contact
vi.mock('../../lib/supabase', () => {
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  const mockFrom = vi.fn(() => ({ insert: mockInsert }));
  return {
    supabase: { from: mockFrom },
    __mockInsert: mockInsert,
    __mockFrom: mockFrom,
  };
});

// Import after mock setup
import { Contact } from '../Contact';
import * as supabaseMock from '../../lib/supabase';

// Get the mock functions
const getMockInsert = () => (supabaseMock as unknown as { __mockInsert: ReturnType<typeof vi.fn> }).__mockInsert;
const getMockFrom = () => (supabaseMock as unknown as { __mockFrom: ReturnType<typeof vi.fn> }).__mockFrom;

// Mock window.location.href for mailto fallback
const originalLocation = window.location;

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getMockInsert().mockResolvedValue({ error: null });

    // Mock window.location for mailto testing
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
      configurable: true,
    });

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      configurable: true,
    });
    vi.useRealTimers();
  });

  describe('form rendering', () => {
    it('renders the contact form heading', () => {
      render(<Contact />);
      expect(screen.getByText('Quick Question?')).toBeInTheDocument();
    });

    it('renders name input field', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    });

    it('renders contact input field', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText('how can I reach you?')).toBeInTheDocument();
    });

    it('renders message textarea', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText(/I'm thinking about buying/)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<Contact />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('renders Schedule Now button with mailto', () => {
      render(<Contact />);
      const scheduleButton = screen.getByText('Schedule Now');
      expect(scheduleButton.closest('a')).toHaveAttribute('href', expect.stringContaining('mailto:'));
    });
  });

  describe('form field binding', () => {
    it('updates name field on input', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByPlaceholderText('Your name');
      await user.type(nameInput, 'John Doe');

      expect(nameInput).toHaveValue('John Doe');
    });

    it('updates contact field on input', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const contactInput = screen.getByPlaceholderText('how can I reach you?');
      await user.type(contactInput, 'john@example.com');

      expect(contactInput).toHaveValue('john@example.com');
    });

    it('updates message field on input', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const messageInput = screen.getByPlaceholderText(/I'm thinking about buying/);
      await user.type(messageInput, 'I want to buy a house');

      expect(messageInput).toHaveValue('I want to buy a house');
    });
  });

  describe('form submission - success', () => {
    it('calls Supabase insert on form submission', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      // Fill out the form
      await user.type(screen.getByPlaceholderText('Your name'), 'John Doe');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test message');

      // Submit
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(getMockFrom()).toHaveBeenCalledWith('leads');
      });

      expect(getMockInsert()).toHaveBeenCalledWith([
        expect.objectContaining({
          name: 'John Doe',
          contact: 'john@example.com',
          message: 'Test message',
          client_fingerprint: expect.any(String),
        }),
      ]);
    });

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'John Doe');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test message');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText('Message Received!')).toBeInTheDocument();
      });
    });

    it('displays user name and contact in success message', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'Jane');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'jane@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Hello');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/Thanks Jane/)).toBeInTheDocument();
        expect(screen.getByText(/jane@test.com/)).toBeInTheDocument();
      });
    });

    it('includes browser fingerprint in submission', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'test@example.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test message');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        const insertCall = getMockInsert().mock.calls[0][0][0];
        expect(insertCall.client_fingerprint).toBeDefined();
        expect(insertCall.client_fingerprint).not.toBe('');
      });
    });

    it('persists fingerprint in localStorage', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'test@example.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(localStorage.getItem('visitor_fingerprint')).toBeDefined();
        expect(localStorage.getItem('visitor_fingerprint')).not.toBe('');
      });
    });

    it('reuses existing fingerprint from localStorage', async () => {
      // Set a fingerprint in localStorage first
      const existingFingerprint = 'test-fingerprint-123';
      localStorage.setItem('visitor_fingerprint', existingFingerprint);

      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'Test User');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'test@example.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        const insertCall = getMockInsert().mock.calls[0][0][0];
        expect(insertCall.client_fingerprint).toBe(existingFingerprint);
      });
    });
  });

  describe('loading state', () => {
    it('shows loading state during submission', async () => {
      // Make the insert take some time
      getMockInsert().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100)));

      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'John');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    it('disables submit button during loading', async () => {
      getMockInsert().mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ error: null }), 100)));

      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'John');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      // The button should be disabled during loading
      const loadingButton = screen.getByRole('button');
      expect(loadingButton).toBeDisabled();
    });
  });

  describe('form submission - error handling', () => {
    it('shows error message when Supabase fails', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      getMockInsert().mockResolvedValue({ error: new Error('Database error') });

      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'John');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      await waitFor(() => {
        expect(screen.getByText(/Failed to save to database/i)).toBeInTheDocument();
      });
    });

    it('triggers mailto fallback after error', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      getMockInsert().mockResolvedValue({ error: new Error('Database error') });

      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<Contact />);

      await user.type(screen.getByPlaceholderText('Your name'), 'John');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Failed to save to database/i)).toBeInTheDocument();
      });

      // Advance timers past the 1500ms setTimeout
      vi.advanceTimersByTime(1600);

      // Check that mailto was triggered
      expect(window.location.href).toContain('mailto:');
    });
  });

  describe('reset functionality', () => {
    it('allows sending another message after success', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      // Submit form
      await user.type(screen.getByPlaceholderText('Your name'), 'John');
      await user.type(screen.getByPlaceholderText('how can I reach you?'), 'john@test.com');
      await user.type(screen.getByPlaceholderText(/I'm thinking about buying/), 'Test');
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for success
      await waitFor(() => {
        expect(screen.getByText('Message Received!')).toBeInTheDocument();
      });

      // Click "Send another message"
      await user.click(screen.getByText('Send another message'));

      // Form should be back with empty fields
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      });
      expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
    });
  });

  describe('form validation', () => {
    it('name field is required', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText('Your name')).toHaveAttribute('required');
    });

    it('contact field is required', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText('how can I reach you?')).toHaveAttribute('required');
    });

    it('message field is required', () => {
      render(<Contact />);
      expect(screen.getByPlaceholderText(/I'm thinking about buying/)).toHaveAttribute('required');
    });
  });

  describe('section heading', () => {
    it('renders the main heading', () => {
      render(<Contact />);
      expect(screen.getByText(/Let's talk about/)).toBeInTheDocument();
      expect(screen.getByText('your goals')).toBeInTheDocument();
    });

    it('renders the subheading', () => {
      render(<Contact />);
      expect(screen.getByText(/No pressure. No sales pitch./)).toBeInTheDocument();
    });
  });
});
