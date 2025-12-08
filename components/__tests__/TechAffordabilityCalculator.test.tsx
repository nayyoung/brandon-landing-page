import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TechAffordabilityCalculator } from '../TechAffordabilityCalculator';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TechAffordabilityCalculator', () => {
  describe('rendering', () => {
    it('renders the calculator title', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      expect(screen.getByText(/Seattle Tech Worker/i)).toBeInTheDocument();
      expect(screen.getByText(/Home Affordability Calculator/i)).toBeInTheDocument();
    });

    it('renders all input fields', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      expect(screen.getByLabelText(/Base Salary/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Down Payment/i)).toBeInTheDocument();
    });

    it('renders RSU year inputs', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      const inputs = screen.getAllByPlaceholderText(/\d+/);
      expect(inputs.length).toBeGreaterThan(4); // At least 5 inputs (base salary + 4 RSU years)
    });

    it('renders the results panel', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      const buyingPowerElements = screen.getAllByText(/Your Buying Power/i);
      expect(buyingPowerElements.length).toBeGreaterThan(0);
    });

    it('shows placeholder text when no input', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      expect(screen.getByText(/Enter your compensation details/i)).toBeInTheDocument();
    });
  });

  describe('calculation', () => {
    it('calculates home affordability when base salary is entered', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      
      const baseSalaryInput = screen.getByLabelText(/Base Salary/i);
      fireEvent.change(baseSalaryInput, { target: { value: '150000' } });

      // Should show maximum home price
      expect(screen.getByText(/Maximum Home Price/i)).toBeInTheDocument();
      expect(screen.getByText(/Annual Income/i)).toBeInTheDocument();
    });

    it('includes RSU values in calculation', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      
      const baseSalaryInput = screen.getByLabelText(/Base Salary/i);
      fireEvent.change(baseSalaryInput, { target: { value: '150000' } });

      // Find and fill RSU inputs
      const inputs = screen.getAllByPlaceholderText(/\d+/);
      // Assuming first input is base salary, next 4 are RSU years
      fireEvent.change(inputs[1], { target: { value: '50000' } });
      fireEvent.change(inputs[2], { target: { value: '75000' } });
      fireEvent.change(inputs[3], { target: { value: '100000' } });
      fireEvent.change(inputs[4], { target: { value: '125000' } });

      // Results should be displayed
      expect(screen.getByText(/Maximum Home Price/i)).toBeInTheDocument();
    });

    it('updates calculation when down payment percentage changes', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      
      const baseSalaryInput = screen.getByLabelText(/Base Salary/i);
      fireEvent.change(baseSalaryInput, { target: { value: '150000' } });

      const downPaymentSlider = screen.getByLabelText(/Down Payment/i);
      fireEvent.change(downPaymentSlider, { target: { value: '30' } });

      // Check that percentage is displayed
      expect(screen.getByText(/30%/)).toBeInTheDocument();
    });
  });

  describe('CTA', () => {
    it('renders a link to contact Brandon', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      const ctaButton = screen.getByText(/Talk to Brandon/i);
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.closest('a')).toHaveAttribute('href', '/#contact');
    });
  });

  describe('assumptions section', () => {
    it('displays calculation assumptions', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      expect(screen.getByText(/Assumptions/i)).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.tagName === 'LI' && content.includes('% interest rate on') && content.includes('-year fixed mortgage');
      })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element?.tagName === 'LI' && content.includes('% of gross monthly income for housing costs');
      })).toBeInTheDocument();
    });
  });

  describe('educational content', () => {
    it('displays information about tech compensation', () => {
      renderWithRouter(<TechAffordabilityCalculator />);
      expect(screen.getByText(/Why Tech Compensation is Different/i)).toBeInTheDocument();
      expect(screen.getByText(/RSU Complexity/i)).toBeInTheDocument();
      expect(screen.getByText(/Specialized Expertise/i)).toBeInTheDocument();
    });
  });
});
