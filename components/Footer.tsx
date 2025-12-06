import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h4 className="font-display font-bold text-xl text-white">Brandon Young</h4>
          <p className="text-gray-500 text-sm mt-1">Seattle, WA | Licensed Real Estate Broker</p>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-500 hover:text-copper-500 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-copper-500 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:brandeauxmedia@gmail.com" className="text-gray-500 hover:text-copper-500 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center md:text-right text-gray-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Brandon Young. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};