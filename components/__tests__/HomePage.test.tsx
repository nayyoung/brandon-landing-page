import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the supabase module BEFORE importing HomePage
vi.mock('../../lib/supabase', () => {
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  const mockFrom = vi.fn(() => ({ insert: mockInsert }));
  return {
    supabase: { from: mockFrom },
  };
});

import { HomePage } from '../HomePage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
  it('renders Hero component', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Real estate for/i)).toBeInTheDocument();
  });

  it('renders results section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Occupancy Growth/i)).toBeInTheDocument();
  });

  it('renders results id for anchor linking', () => {
    const { container } = renderWithRouter(<HomePage />);
    const resultsSection = container.querySelector('#results');
    expect(resultsSection).toBeInTheDocument();
  });
});
