import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Audience } from './components/Audience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-white selection:bg-copper-500 selection:text-white">
      <Navigation />
      
      <main>
        <Hero />
        <Story />
        <Audience />
        
        {/* Credibility / Results Strip - embedded here for simplicity */}
        <div id="results" className="border-y border-white/5 bg-charcoal-800/50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
               <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">50% &rarr; 80%</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Occupancy Growth</div>
               </div>
               <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Top 10%</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">First Year Sales</div>
               </div>
               <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Sound Transit</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Acquisition Agent</div>
               </div>
               <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Musician</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Turned Broker</div>
               </div>
            </div>
          </div>
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;