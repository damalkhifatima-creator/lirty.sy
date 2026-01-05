
import React, { useState, useEffect } from 'react';
import { AppSettings, NumberSystem } from '../types';
import { convertNumbers } from '../utils/numbers';

interface HeaderProps {
  settings: AppSettings;
  onAdminClick: () => void;
  onToggleNumbers: () => void;
  numberSystem: NumberSystem;
}

const Header: React.FC<HeaderProps> = ({ settings, onAdminClick, onToggleNumbers, numberSystem }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass shadow-2xl backdrop-blur-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl font-bold hidden sm:block tracking-tight">
            {settings.platformName}
          </h1>
        </div>

        <nav className="flex items-center gap-2 sm:gap-6">
          <button 
            onClick={onToggleNumbers}
            className="px-3 py-1.5 rounded-lg glass text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            {numberSystem === NumberSystem.LATIN ? '١٢٣' : '123'}
          </button>
          
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all text-sm font-bold shadow-lg shadow-emerald-900/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="hidden sm:inline">دخول الإدارة</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
