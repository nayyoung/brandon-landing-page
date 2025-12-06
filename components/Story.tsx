import React from 'react';
import { Section } from './ui/Section';

export const Story: React.FC = () => {
  return (
    <Section id="story" className="bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative aspect-[4/5] bg-gray-800 rounded-sm overflow-hidden">
                 {/* Aesthetic Street Art / Neighborhood Image - Fremont */}
                 <img 
                    src="https://file-service.aistudio.google.com/file/10b9f338-0857-4148-89c0-9d08e5399580" 
                    alt="Seattle Neighborhood Vibes" 
                    className="w-full h-full object-cover filter grayscale-[0.1] contrast-110 hover:grayscale-0 transition-all duration-500"
                 />
                 <div className="absolute inset-0 bg-copper-500/10 mix-blend-multiply"></div>
            </div>
        </div>
        
        <div className="md:col-span-7 order-1 md:order-2 md:pl-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
            The <span className="text-copper-500">Minister of Music</span> who closes million-dollar deals.
          </h2>
          
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-sans font-light">
            <p>
              I spent a decade as a musician, DJ, and performer before I ever wrote an offer. I know what it's like to chase a check, to build a brand from scratch, and to have a career that doesn't fit in a checkbox on a mortgage application.
            </p>
            <p>
              When I pivoted to real estate, I brought that same energy. I sold million-dollar homes in my first year and turned around commercial properties that others couldn't fill.
            </p>
            <p className="text-white font-medium border-l-2 border-copper-500 pl-4">
              Now, I work as an acquisition agent for Sound Transit and help people like you—creatives, tech workers, and hustlers—navigate a market that wasn't built for us.
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-8">
             <div>
                <h4 className="text-2xl font-display font-bold text-white">10+ Years</h4>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">Entrepreneurship</p>
             </div>
             <div>
                <h4 className="text-2xl font-display font-bold text-white">$1M+</h4>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">Deals closed Yr 1</p>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};