import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { TechAffordabilityCalculator } from './components/TechAffordabilityCalculator';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-charcoal-900 text-white selection:bg-copper-500 selection:text-white">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/tech-affordability-calculator" element={<TechAffordabilityCalculator />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;