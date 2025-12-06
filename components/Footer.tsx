import React from 'react';
import { Instagram, Linkedin, Mail, AtSign, Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-900 border-t border-white/5 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h4 className="font-display font-bold text-lg sm:text-xl text-white">Brandon Young</h4>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Seattle, WA | Licensed Real Estate Broker</p>
        </div>

        <div className="flex items-center space-x-5 sm:space-x-6">
          <a href="https://www.instagram.com/_brandonjyoung" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-copper-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" title="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.threads.net/@_brandonjyoung" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-copper-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" title="Threads">
            <AtSign className="w-5 h-5" />
          </a>
          <a href="https://www.tiktok.com/@_brandonjyoung" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-copper-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" title="TikTok">
            <Video className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/brandon-young-0669b21ab" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-copper-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:brandeauxmedia@gmail.com" className="text-gray-500 hover:text-copper-500 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center" title="Email">
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