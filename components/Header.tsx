
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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 glass shadow-2xl backdrop-blur-2xl px-4 border-b border-white/5">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden glass border border-white/10">
             <img 
               src={settings.logoUrl} 
               alt="Logo" 
               className="w-full h-full object-cover" 
               style={{ 
                 transform: `scale(${settings.logoScale / 100})`,
                 objectPosition: `${settings.logoX}% ${settings.logoY}%` 
               }} 
             />
          </div>
          <h1 className="text-lg font-black tracking-tight text-white whitespace-nowrap">
            {settings.platformName.split(' ')[0]} <span className="text-emerald-400">2026</span>
          </h1>
        </div>

        <nav className="flex items-center gap-3">
          <button 
            onClick={onToggleNumbers}
            className="px-3 py-1.5 rounded-xl glass text-xs font-bold hover:bg-white/10 transition-colors"
          >
            {numberSystem === NumberSystem.LATIN ? '١٢٣' : '123'}
          </button>
          
          <button 
            onClick={onAdminClick}
            className="w-10 h-10 rounded-xl glass hover:bg-emerald-500/20 flex items-center justify-center transition-all text-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
