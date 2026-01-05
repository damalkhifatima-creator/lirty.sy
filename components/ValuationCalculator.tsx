
import React, { useState, useMemo } from 'react';
import { AppSettings, NumberSystem } from '../types';
import { DENOMINATIONS } from '../constants';
import { convertNumbers, formatCurrency } from '../utils/numbers';

interface ValuationCalculatorProps {
  settings: AppSettings;
  numberSystem: NumberSystem;
}

const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ settings, numberSystem }) => {
  const [counts, setCounts] = useState<Record<number, number>>(
    DENOMINATIONS.reduce((acc, d) => ({ ...acc, [d]: 0 }), {})
  );

  const handleCountChange = (denom: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [denom]: Math.max(0, num) }));
  };

  const totals = useMemo(() => {
    // Fix: Explicitly use DENOMINATIONS to calculate the total to ensure all variables are treated as numbers
    // This avoids potential issues with string keys from Object.entries(counts)
    const newSYP = DENOMINATIONS.reduce((sum, denom) => sum + (denom * (counts[denom] || 0)), 0);
    const oldSYP = newSYP * settings.newToOldRatio;
    const usd = newSYP / settings.officialUsdRate;
    return { newSYP, oldSYP, usd };
  }, [counts, settings]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 space-y-8 border-emerald-500/10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <span className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </span>
          حاسبة التدقيق والتقييم
        </h3>
        <button onClick={handlePrint} className="text-emerald-400 hover:text-emerald-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {DENOMINATIONS.map(denom => (
          <div key={denom} className="space-y-2">
            <label className="text-xs text-slate-400 font-bold block pr-1">
              فئة {convertNumbers(denom, numberSystem)} ل.س جديدة
            </label>
            <div className="relative">
              <input 
                type="number" 
                value={counts[denom] || ''} 
                onChange={(e) => handleCountChange(denom, e.target.value)}
                placeholder="0"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all text-center font-bold"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="flex justify-between items-center p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <span className="text-sm text-emerald-400 font-bold">الإجمالي (ليرة جديدة)</span>
          <span className="text-2xl font-black text-white">{formatCurrency(totals.newSYP, numberSystem)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">المقابل (ليرة قديمة)</span>
            <span className="text-lg font-bold text-white">{formatCurrency(totals.oldSYP, numberSystem)}</span>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">القيمة بالدولار ($)</span>
            <span className="text-lg font-bold text-white">{formatCurrency(totals.usd, numberSystem)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;
