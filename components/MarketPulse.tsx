
import React from 'react';
import { AppSettings, NumberSystem } from '../types';
import { convertNumbers } from '../utils/numbers';

interface MarketPulseProps {
  settings: AppSettings;
  numberSystem: NumberSystem;
}

const MarketPulse: React.FC<MarketPulseProps> = ({ settings, numberSystem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass p-6 rounded-3xl border-emerald-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">سعر الصرف الرسمي</span>
          <div className="text-3xl font-black mb-2">
            1$ = {convertNumbers(settings.officialUsdRate, numberSystem)} ل.س
          </div>
          <p className="text-xs text-slate-400">سعر ثابت معتمد من قبل البنك المركزي لعام 2026.</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border-indigo-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">حالة استقرار السوق</span>
          <div className="text-3xl font-black mb-2 flex items-center gap-2">
            مستقر تماماً
            <span className="flex h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-xs text-slate-400">لا توجد تذبذبات متوقعة خلال الربع الأول من العام.</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border-amber-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">معامل التحويل</span>
          <div className="text-3xl font-black mb-2">
            1 : {convertNumbers(settings.newToOldRatio, numberSystem)}
          </div>
          <p className="text-xs text-slate-400">كل ليرة جديدة واحدة تقابل مائة ليرة من الإصدار القديم.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
