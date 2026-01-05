
import React, { useState, useEffect } from 'react';
import { INITIAL_SETTINGS, BANKNOTES_DATA } from './constants';
import { AppSettings, NumberSystem, AppView } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuationCalculator from './components/ValuationCalculator';
import QuickConverter from './components/QuickConverter';
import MarketPulse from './components/MarketPulse';
import BanknoteGallery from './components/BanknoteGallery';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CurrencyVerify from './components/CurrencyVerify';

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [numberSystem, setNumberSystem] = useState<NumberSystem>(NumberSystem.LATIN);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [alertMessage, setAlertMessage] = useState<string | null>("تنبيه: سيتم اعتماد الفئات الجديدة رسمياً ابتداءً من ١ يناير ٢٠٢٦.");

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView, showAdmin]);

  const toggleNumberSystem = () => {
    setNumberSystem(prev => prev === NumberSystem.LATIN ? NumberSystem.ARABIC : NumberSystem.LATIN);
  };

  const renderView = () => {
    if (showAdmin) {
      return (
        <AdminDashboard 
          settings={settings} 
          setSettings={setSettings} 
          onClose={() => setShowAdmin(false)}
          setAlertMessage={setAlertMessage}
        />
      );
    }

    switch (activeView) {
      case 'market':
        return <MarketPulse settings={settings} numberSystem={numberSystem} />;
      case 'calculator':
        return <ValuationCalculator settings={settings} numberSystem={numberSystem} />;
      case 'converter':
        return <QuickConverter settings={settings} numberSystem={numberSystem} />;
      case 'gallery':
        return <BanknoteGallery banknotes={BANKNOTES_DATA} numberSystem={numberSystem} />;
      case 'verify':
        return <CurrencyVerify />;
      case 'home':
      default:
        return (
          <div className="space-y-10 animate-in fade-in duration-500 pb-12">
            <Hero />
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveView('market')} className="glass p-6 rounded-[32px] text-center space-y-3 hover:bg-white/10 transition-all border-emerald-500/20 active:scale-95">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl">💹</div>
                <span className="block font-bold text-sm">نبض السوق</span>
              </button>
              <button onClick={() => setActiveView('calculator')} className="glass p-6 rounded-[32px] text-center space-y-3 hover:bg-white/10 transition-all border-indigo-500/20 active:scale-95">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl">🧮</div>
                <span className="block font-bold text-sm">الحاسبة</span>
              </button>
              <button onClick={() => setActiveView('gallery')} className="glass p-6 rounded-[32px] text-center space-y-3 hover:bg-white/10 transition-all border-amber-500/20 active:scale-95">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl">💵</div>
                <span className="block font-bold text-sm">الفئات</span>
              </button>
              <button onClick={() => setActiveView('verify')} className="glass p-6 rounded-[32px] text-center space-y-3 hover:bg-white/10 transition-all border-rose-500/20 active:scale-95">
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto text-2xl">📸</div>
                <span className="block font-bold text-sm">تحقق ذكي</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <h3 className="text-lg font-bold mb-6 pr-2">نظرة سريعة على السوق</h3>
              <MarketPulse settings={settings} numberSystem={numberSystem} />
            </div>
            
            <Footer settings={settings} />
          </div>
        );
    }
  };

  if (settings.maintenanceMode && !showAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 text-center">
        <div className="glass p-12 rounded-[40px] max-w-md space-y-6 border-amber-500/20">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-4xl">🚧</div>
          <h1 className="text-3xl font-black text-amber-400">المنصة في وضع الصيانة</h1>
          <p className="text-slate-400">نعمل حالياً على تحديث البيانات المالية لضمان أدق النتائج. يرجى العودة لاحقاً.</p>
          <button onClick={() => setShowAdmin(true)} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">دخول المشرف</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30 bg-[#020617] text-white">
      {/* Fixed Header */}
      <Header 
        settings={settings} 
        onAdminClick={() => setShowAdmin(true)} 
        onToggleNumbers={toggleNumberSystem}
        numberSystem={numberSystem}
      />

      {/* Main Content Area with padding to account for fixed header (approx 80px) */}
      <main className="pt-24 pb-28 px-4 max-w-lg mx-auto min-h-screen">
        {alertMessage && !showAdmin && activeView === 'home' && (
          <div className="mb-6 animate-in slide-in-from-top duration-500 no-print">
            <div className="glass border-emerald-500/30 p-3 rounded-2xl text-center text-xs font-semibold text-emerald-400 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{alertMessage}</span>
              </div>
              <button onClick={() => setAlertMessage(null)} className="px-2 hover:text-white text-lg">&times;</button>
            </div>
          </div>
        )}

        {renderView()}
      </main>

      {/* Bottom Navigation */}
      {!showAdmin && <BottomNav activeView={activeView} setActiveView={setActiveView} />}
    </div>
  );
};

export default App;
