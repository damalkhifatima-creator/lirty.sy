
import React, { useState } from 'react';
import { INITIAL_SETTINGS, BANKNOTES_DATA } from './constants';
import { AppSettings, NumberSystem } from './types';
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

  const [bgElements] = useState(() => Array.from({ length: 12 }));

  const toggleNumberSystem = () => {
    setNumberSystem(prev => prev === NumberSystem.LATIN ? NumberSystem.ARABIC : NumberSystem.LATIN);
  };

  if (settings.maintenanceMode && !showAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-center">
        <div className="glass p-12 rounded-[40px] max-w-md space-y-6 border-amber-500/20">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-4xl">🚧</div>
          <h1 className="text-3xl font-black text-amber-400">المنصة في وضع الصيانة</h1>
          <p className="text-slate-400">نعمل حالياً على تحديث البيانات المالية لضمان أدق النتائج. يرجى العودة لاحقاً.</p>
          <button 
            onClick={() => setShowAdmin(true)}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            دخول المشرف
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30">
      <div className="fixed inset-0 z-[-1] overflow-hidden no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
        
        {bgElements.map((_, i) => (
          <div 
            key={i} 
            className="absolute opacity-[0.03] floating-bill select-none pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
              fontSize: `${Math.random() * 30 + 20}px`
            }}
          >
            {['💸', '🏦', '💹', '💎'][i % 4]}
          </div>
        ))}
      </div>

      <div className="no-print">
        <Header 
          settings={settings} 
          onAdminClick={() => setShowAdmin(true)} 
          onToggleNumbers={toggleNumberSystem}
          numberSystem={numberSystem}
        />
      </div>

      {alertMessage && !showAdmin && (
        <div className="fixed top-24 left-0 right-0 z-40 px-4 animate-in slide-in-from-top duration-500 no-print">
          <div className="max-w-4xl mx-auto glass border-emerald-500/30 p-3 rounded-full text-center text-sm font-semibold text-emerald-400 flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            {alertMessage}
            <button onClick={() => setAlertMessage(null)} className="mr-4 hover:text-white">&times;</button>
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
            <section id="market" className="scroll-mt-28 no-print">
              <MarketPulse settings={settings} numberSystem={numberSystem} />
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <section id="calculator" className="scroll-mt-28">
                <ValuationCalculator settings={settings} numberSystem={numberSystem} />
              </section>
              <section id="converter" className="scroll-mt-28 no-print">
                <QuickConverter settings={settings} numberSystem={numberSystem} />
              </section>
            </div>

            <section id="gallery" className="scroll-mt-28 no-print">
              <BanknoteGallery banknotes={BANKNOTES_DATA} numberSystem={numberSystem} />
            </section>
          </>
        )}
      </main>

      <div className="no-print">
        <Footer settings={settings} />
      </div>
    </div>
  );
};

export default App;
