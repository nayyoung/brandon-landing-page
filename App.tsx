import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Guides } from './pages/Guides';
import { GuideArticle } from './pages/GuideArticle';
import { TechAffordabilityCalculator } from './components/TechAffordabilityCalculator';
import { Footer } from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-charcoal-900 text-white selection:bg-copper-500 selection:text-white">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/tools/tech-affordability-calculator" element={<TechAffordabilityCalculator />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;