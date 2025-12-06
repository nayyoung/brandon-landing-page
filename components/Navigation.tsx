import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

const CONTACT_EMAIL = "brandeauxmedia@gmail.com";
const SUBJECT = "Real Estate Strategy Call";
const BODY = "Hi Brandon,\n\nI'd like to schedule a call to talk about my real estate goals.\n\nMy name:\nPhone number:\nBest time to reach me:\n\nThanks!";

const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#story' },
    { name: 'Who I Help', href: '#audience' },
    { name: 'Results', href: '#results' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl md:text-2xl tracking-tight text-white z-50">
            Brandon<span className="text-copper-500">Young</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+12065550123" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Call/Text</span>
            </a>
            <a 
              href={mailtoLink}
              className="group inline-flex items-center bg-white/10 hover:bg-copper-500 text-white px-5 py-2.5 transition-all duration-300 rounded-sm text-sm font-semibold uppercase tracking-wide"
            >
              Book Strategy Call
              <ArrowUpRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-charcoal-900 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="font-display text-3xl font-bold text-white hover:text-copper-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <div className="h-px w-24 bg-white/10 my-8"></div>
        <a 
          href={mailtoLink}
          className="text-xl font-medium text-copper-500"
          onClick={() => setMobileMenuOpen(false)}
        >
          Book Strategy Call
        </a>
      </div>
    </>
  );
};