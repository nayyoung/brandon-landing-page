import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, EMAIL_SUBJECTS, EMAIL_BODIES, createMailtoLink } from '../constants';

const mailtoLink = createMailtoLink(CONTACT_EMAIL, EMAIL_SUBJECTS.STRATEGY_CALL, EMAIL_BODIES.STRATEGY_CALL);

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup: restore overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#story', homeOnly: true },
    { name: 'Who I Help', href: '#audience', homeOnly: true },
    { name: 'Results', href: '#results', homeOnly: true },
    { name: 'Tools', href: '/tools/tech-affordability-calculator', homeOnly: false },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl md:text-2xl tracking-tight text-white z-50">
            Brandon<span className="text-copper-500">Young</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.homeOnly && !isHomePage) return null;
              const isExternal = link.href.startsWith('#');
              return isExternal && isHomePage ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={isExternal ? `/${link.href}` : link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
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
            className="md:hidden z-50 text-white p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-charcoal-900 z-40 flex flex-col items-center justify-center space-y-6 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {navLinks.map((link) => {
          if (link.homeOnly && !isHomePage) return null;
          const isExternal = link.href.startsWith('#');
          return isExternal && isHomePage ? (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-display text-2xl sm:text-3xl font-bold text-white hover:text-copper-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ) : (
            <Link 
              key={link.name} 
              to={isExternal ? `/${link.href}` : link.href}
              className="font-display text-2xl sm:text-3xl font-bold text-white hover:text-copper-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="h-px w-24 bg-white/10 my-4"></div>
        <a 
          href={mailtoLink}
          className="text-lg sm:text-xl font-medium text-copper-500 py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          Book Strategy Call
        </a>
      </div>
    </>
  );
};