
import React from 'react';
import { AppSettings, NumberSystem } from '../types';
import { convertNumbers } from '../utils/numbers';

interface MarketPulseProps {
  settings: AppSettings;
  numberSystem: NumberSystem;
}

const MarketPulse: React.FC<MarketPulseProps> = ({ settings, numberSystem }) => {
  return (
    <div className="space-y-4">
      {/* Main card */}
      <div className="glass p-6 rounded-[32px] border-emerald-500/20 relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">صرف الدولار الرسمي</span>
            <div className="text-4xl font-black">
              1$ = {convertNumbers(settings.officialUsdRate, numberSystem)} <span className="text-sm font-bold opacity-50">ل.س</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl">🇺🇸</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-[24px] border-indigo-500/10 text-center">
          <span className="text-[10px] font-bold text-indigo-400 block mb-1">استقرار السوق</span>
          <div className="text-sm font-black flex items-center justify-center gap-2">
            مستقر 
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
        <div className="glass p-4 rounded-[24px] border-amber-500/10 text-center">
          <span className="text-[10px] font-bold text-amber-400 block mb-1">معامل التحويل</span>
          <div className="text-sm font-black">
            1 : {convertNumbers(settings.newToOldRatio, numberSystem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
