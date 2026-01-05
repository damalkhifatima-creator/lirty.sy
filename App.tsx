
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_SETTINGS, BANKNOTES_DATA } from './constants';
import { AppSettings, NumberSystem, Banknote } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuationCalculator from './components/ValuationCalculator';
import QuickConverter from './components/QuickConverter';
import MarketPulse from './components/MarketPulse';
import BanknoteGallery from './components/BanknoteGallery';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [numberSystem, setNumberSystem] = useState<NumberSystem>(NumberSystem.LATIN);
  const [showAdmin, setShowAdmin] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>("تنبيه: سيتم اعتماد الفئات الجديدة رسمياً ابتداءً من ١ يناير ٢٠٢٦.");

  // Background floating effect elements
  const [bgElements] = useState(() => Array.from({ length: 8 }));

  const toggleNumberSystem = () => {
    setNumberSystem(prev => prev === NumberSystem.LATIN ? NumberSystem.ARABIC : NumberSystem.LATIN);
  };

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full"></div>
        
        {bgElements.map((_, i) => (
          <div 
            key={i} 
            className="absolute opacity-5 floating-bill"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              fontSize: `${Math.random() * 40 + 20}px`
            }}
          >
            💸
          </div>
        ))}
      </div>

      <Header 
        settings={settings} 
        onAdminClick={() => setShowAdmin(true)} 
        onToggleNumbers={toggleNumberSystem}
        numberSystem={numberSystem}
      />

      {alertMessage && (
        <div className="fixed top-20 left-0 right-0 z-40 px-4 animate-bounce">
          <div className="max-w-4xl mx-auto glass border-emerald-500/30 p-3 rounded-full text-center text-sm font-semibold text-emerald-400 flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            {alertMessage}
            <button onClick={() => setAlertMessage(null)} className="ml-4 hover:text-white">&times;</button>
          </div>
        </div>
      )}

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {showAdmin ? (
          <AdminDashboard 
            settings={settings} 
            setSettings={setSettings} 
            onClose={() => setShowAdmin(false)}
            setAlertMessage={setAlertMessage}
          />
        ) : (
          <>
            <Hero />
            <section id="market" className="scroll-mt-28">
              <MarketPulse settings={settings} numberSystem={numberSystem} />
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <section id="calculator" className="scroll-mt-28">
                <ValuationCalculator settings={settings} numberSystem={numberSystem} />
              </section>
              <section id="converter" className="scroll-mt-28">
                <QuickConverter settings={settings} numberSystem={numberSystem} />
              </section>
            </div>

            <section id="gallery" className="scroll-mt-28">
              <BanknoteGallery banknotes={BANKNOTES_DATA} numberSystem={numberSystem} />
            </section>
          </>
        )}
      </main>

      <Footer settings={settings} />
    </div>
  );
};

export default App;
