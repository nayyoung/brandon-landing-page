import React from 'react';
import { Hero } from './Hero';
import { Story } from './Story';
import { Audience } from './Audience';
import { Contact } from './Contact';

const SEO_TITLE = 'Brandon Young | Seattle Real Estate Broker';
const SEO_DESCRIPTION = 'Seattle real estate broker for creatives, founders, and entrepreneurs. Build wealth through real estate with Brandon Young.';
const SEO_DESCRIPTION_FULL = 'Seattle real estate broker for creatives, founders, and entrepreneurs. Build wealth through real estate with Brandon Young. Specializing in non-traditional income and investment properties.';

export const HomePage: React.FC = () => {
  return (
    <>
      <title>{SEO_TITLE}</title>
      <meta name="description" content={SEO_DESCRIPTION_FULL} />
      <meta property="og:title" content={SEO_TITLE} />
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta name="twitter:title" content={SEO_TITLE} />
      <meta name="twitter:description" content={SEO_DESCRIPTION} />
      
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
                <div className="text-xs text-gray-500 uppercase tracking-widest">Occupancy Growth</div>
             </div>
             <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Top 10%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">First Year Sales</div>
             </div>
             <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Sound Transit</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Acquisition Agent</div>
             </div>
             <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">Musician</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Turned Broker</div>
             </div>
          </div>
        </div>
      </div>

      <Contact />
    </main>
    </>
  );
};
