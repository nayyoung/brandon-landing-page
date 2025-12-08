import React from 'react';
import { Button } from './ui/Button';
import { ArrowDown } from 'lucide-react';

const CONTACT_EMAIL = "brandeauxmedia@gmail.com";
const SUBJECT = "Real Estate Strategy Call";
const BODY = "Hi Brandon,\n\nI'd like to schedule a call to talk about my real estate goals.\n\nMy name:\nPhone number:\nBest time to reach me:\n\nThanks!";

const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-900 pt-20 pb-8 sm:pb-0">
      {/* Background with abstract shapes/gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(194,124,75,0.15),transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-copper-900/20 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8 md:pr-12">
          <div className="inline-block px-3 py-1 border border-copper-500/30 rounded-full bg-copper-500/10 backdrop-blur-sm">
            <span className="text-copper-400 text-xs font-bold uppercase tracking-widest">Seattle Real Estate Broker</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Real estate for <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 to-copper-600">
              unconventional
            </span>
            <br />
            careers.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
            You didn't follow the traditional path. Neither did I. I help creatives, founders, and entrepreneurs build wealth through real estate—even if you have to explain your income.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Button href={mailtoLink} className="w-full sm:w-auto justify-center">
              Book a Strategy Call
            </Button>
            <Button variant="outline" href="#story" className="w-full sm:w-auto justify-center">
              Read My Story
            </Button>
          </div>
        </div>

        {/* Hero Image / Visual */}
        <div className="relative h-[350px] sm:h-[450px] md:h-[650px] w-full rounded-sm overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent z-10 opacity-60"></div>
          {/* Aesthetic Seattle Skyline/Mood Image - Sunset Dusk */}
          <img 
            src="/images/seattle-skyline.svg" 
            alt="Seattle Skyline at Dusk" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[0.2] contrast-110"
          />
          
          {/* Floating Card */}
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-sm max-w-[200px] sm:max-w-xs">
            <p className="text-white font-display font-bold text-xl sm:text-2xl">80%</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-1">Occupancy rate achieved for commercial clients in 12 months.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block text-gray-500">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};