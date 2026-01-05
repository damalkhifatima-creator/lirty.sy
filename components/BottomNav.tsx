
import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const tabs: { id: AppView, label: string, icon: string }[] = [
    { id: 'home', label: 'الرئيسية', icon: '🏠' },
    { id: 'market', label: 'السوق', icon: '💹' },
    { id: 'verify', label: 'تحقق', icon: '📸' },
    { id: 'calculator', label: 'حاسبة', icon: '🧮' },
    { id: 'gallery', label: 'الفئات', icon: '💵' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 px-2 pb-6 pt-2 no-print">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${activeView === tab.id ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] font-bold">{tab.label}</span>
            {activeView === tab.id && <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
