import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Home } from 'lucide-react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';

// Mortgage calculation constants
const INTEREST_RATE = 0.07; // 7% annual interest rate
const LOAN_TERM_YEARS = 30;
const HOUSING_COST_RATIO = 0.28; // 28% of gross monthly income

export const TechAffordabilityCalculator: React.FC = () => {
  const [baseSalary, setBaseSalary] = useState<string>('');
  const [rsuYear1, setRsuYear1] = useState<string>('');
  const [rsuYear2, setRsuYear2] = useState<string>('');
  const [rsuYear3, setRsuYear3] = useState<string>('');
  const [rsuYear4, setRsuYear4] = useState<string>('');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  // Calculate affordability
  const calculateAffordability = () => {
    const salary = parseFloat(baseSalary) || 0;
    const year1 = parseFloat(rsuYear1) || 0;
    const year2 = parseFloat(rsuYear2) || 0;
    const year3 = parseFloat(rsuYear3) || 0;
    const year4 = parseFloat(rsuYear4) || 0;

    // Average RSU over 4 years
    const avgAnnualRSU = (year1 + year2 + year3 + year4) / 4;
    
    // Total annual income
    const totalAnnualIncome = salary + avgAnnualRSU;
    
    // Traditional rule: 28% of gross monthly income for housing
    const monthlyIncome = totalAnnualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * HOUSING_COST_RATIO;
    
    // Estimate home price using mortgage calculation
    // Formula: Payment = P * [r(1+r)^n]/[(1+r)^n-1]
    const monthlyRate = INTEREST_RATE / 12;
    const numPayments = LOAN_TERM_YEARS * 12;
    
    // Solve for principal: P = Payment * [(1+r)^n-1] / [r(1+r)^n]
    const factor = Math.pow(1 + monthlyRate, numPayments);
    const loanAmount = maxMonthlyPayment * ((factor - 1) / (monthlyRate * factor));
    
    // Add down payment
    const homePrice = loanAmount / (1 - downPaymentPercent / 100);
    
    return {
      totalAnnualIncome,
      maxMonthlyPayment,
      maxHomePrice: homePrice,
      downPayment: homePrice * (downPaymentPercent / 100),
      loanAmount,
    };
  };

  const results = calculateAffordability();
  const hasInput = parseFloat(baseSalary) > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-copper-500/10 rounded-full mb-6">
            <Calculator className="w-8 h-8 text-copper-500" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Seattle Tech Worker
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 to-copper-600">
              Home Affordability Calculator
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Calculate how much home you can afford with your Amazon, Microsoft, or other tech company compensation including RSU vesting schedules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-charcoal-800 border border-white/10 rounded-sm p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-copper-500" />
              Your Compensation
            </h2>

            <div className="space-y-6">
              {/* Base Salary */}
              <div>
                <label htmlFor="base-salary" className="block text-sm font-medium text-gray-300 mb-2">
                  Base Salary (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="base-salary"
                    type="number"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    placeholder="150000"
                    className="w-full bg-charcoal-700 border border-white/20 rounded-sm px-4 pl-8 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors"
                  />
                </div>
              </div>

              {/* RSU Vesting Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  RSU Vesting Schedule (Annual)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-16">Year 1:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={rsuYear1}
                        onChange={(e) => setRsuYear1(e.target.value)}
                        placeholder="50000"
                        className="w-full bg-charcoal-700 border border-white/20 rounded-sm px-4 pl-8 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-16">Year 2:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={rsuYear2}
                        onChange={(e) => setRsuYear2(e.target.value)}
                        placeholder="75000"
                        className="w-full bg-charcoal-700 border border-white/20 rounded-sm px-4 pl-8 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-16">Year 3:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={rsuYear3}
                        onChange={(e) => setRsuYear3(e.target.value)}
                        placeholder="100000"
                        className="w-full bg-charcoal-700 border border-white/20 rounded-sm px-4 pl-8 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 w-16">Year 4:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={rsuYear4}
                        onChange={(e) => setRsuYear4(e.target.value)}
                        placeholder="125000"
                        className="w-full bg-charcoal-700 border border-white/20 rounded-sm px-4 pl-8 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label htmlFor="down-payment" className="block text-sm font-medium text-gray-300 mb-2">
                  Down Payment: {downPaymentPercent}%
                </label>
                <input
                  id="down-payment"
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                  className="w-full h-2 bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-copper-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span>20%</span>
                  <span>40%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-copper-500/20 to-copper-600/10 border border-copper-500/30 rounded-sm p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center">
                <Home className="w-6 h-6 mr-2 text-copper-500" />
                Your Buying Power
              </h2>

              {hasInput ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Maximum Home Price</div>
                    <div className="font-display text-4xl font-bold text-white">
                      {formatCurrency(results.maxHomePrice)}
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Annual Income</div>
                      <div className="font-display text-xl font-bold text-white">
                        {formatCurrency(results.totalAnnualIncome)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Monthly Payment</div>
                      <div className="font-display text-xl font-bold text-white">
                        {formatCurrency(results.maxMonthlyPayment)}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Down Payment</div>
                      <div className="font-display text-lg font-bold text-white">
                        {formatCurrency(results.downPayment)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Loan Amount</div>
                      <div className="font-display text-lg font-bold text-white">
                        {formatCurrency(results.loanAmount)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-copper-500/50 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Enter your compensation details to see how much home you can afford.
                  </p>
                </div>
              )}
            </div>

            {/* Assumptions */}
            <div className="bg-charcoal-800/50 border border-white/5 rounded-sm p-6">
              <h3 className="font-display text-lg font-bold text-white mb-3">Assumptions</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• {INTEREST_RATE * 100}% interest rate on {LOAN_TERM_YEARS}-year fixed mortgage</li>
                <li>• {HOUSING_COST_RATIO * 100}% of gross monthly income for housing costs</li>
                <li>• Average RSU value over 4-year vesting schedule</li>
                <li>• Does not include property taxes, insurance, or HOA fees</li>
                <li>• Actual approval depends on credit score and debt-to-income ratio</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-charcoal-800 border border-white/10 rounded-sm p-6 text-center">
              <p className="text-gray-300 mb-4">
                Ready to start your home buying journey?
              </p>
              <Button href="/#contact" className="w-full justify-center">
                Talk to Brandon
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-charcoal-800/30 border border-white/5 rounded-sm p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-white mb-4">
            Why Tech Compensation is Different
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h4 className="text-copper-500 font-semibold mb-2">RSU Complexity</h4>
              <p className="text-sm">
                Unlike traditional salaries, RSUs vest over time and fluctuate with stock prices. 
                Many lenders don't know how to properly evaluate this income, which can hurt your buying power.
              </p>
            </div>
            <div>
              <h4 className="text-copper-500 font-semibold mb-2">Specialized Expertise</h4>
              <p className="text-sm">
                I work with tech professionals daily and understand how to present your compensation 
                to lenders in the best light. This often means qualifying for significantly more house than you'd get elsewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
