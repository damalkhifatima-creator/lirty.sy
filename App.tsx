
import React, { useState } from 'react';
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
          <div className="space-y-12 animate-in fade-in duration-500">
            <Hero />
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveView('market')} className="glass p-6 rounded-3xl text-center space-y-2 hover:bg-white/10 transition-all border-emerald-500/20">
                <span className="text-3xl">💹</span>
                <span className="block font-bold">نبض السوق</span>
              </button>
              <button onClick={() => setActiveView('calculator')} className="glass p-6 rounded-3xl text-center space-y-2 hover:bg-white/10 transition-all border-indigo-500/20">
                <span className="text-3xl">🧮</span>
                <span className="block font-bold">الحاسبة</span>
              </button>
              <button onClick={() => setActiveView('gallery')} className="glass p-6 rounded-3xl text-center space-y-2 hover:bg-white/10 transition-all border-amber-500/20">
                <span className="text-3xl">💵</span>
                <span className="block font-bold">الفئات</span>
              </button>
              <button onClick={() => setActiveView('verify')} className="glass p-6 rounded-3xl text-center space-y-2 hover:bg-white/10 transition-all border-rose-500/20">
                <span className="text-3xl">📸</span>
                <span className="block font-bold">تحقق سريع</span>
              </button>
            </div>
            <MarketPulse settings={settings} numberSystem={numberSystem} />
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
    <div className="min-h-screen relative selection:bg-emerald-500/30 bg-[#020617] pb-24">
      <div className="fixed inset-0 z-[-1] overflow-hidden no-print opacity-20">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#10b98133,transparent_50%)]"></div>
      </div>

      <Header 
        settings={settings} 
        onAdminClick={() => setShowAdmin(true)} 
        onToggleNumbers={toggleNumberSystem}
        numberSystem={numberSystem}
      />

      {alertMessage && !showAdmin && activeView === 'home' && (
        <div className="pt-24 px-4 animate-in slide-in-from-top duration-500 no-print">
          <div className="glass border-emerald-500/30 p-3 rounded-2xl text-center text-sm font-semibold text-emerald-400 flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            {alertMessage}
            <button onClick={() => setAlertMessage(null)} className="mr-auto hover:text-white">&times;</button>
          </div>
        </div>
      )}

      <main className={`pt-${showAdmin || activeView !== 'home' ? '24' : '4'} pb-10 px-4 max-w-lg mx-auto transition-all`}>
        {renderView()}
      </main>

      {!showAdmin && <BottomNav activeView={activeView} setActiveView={setActiveView} />}
    </div>
  );
};

export default App;
