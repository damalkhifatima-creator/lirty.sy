
import React, { useState, useMemo } from 'react';
import { AppSettings, NumberSystem } from '../types';
import { DENOMINATIONS } from '../constants';
import { convertNumbers, formatCurrency } from '../utils/numbers';

interface ValuationCalculatorProps {
  settings: AppSettings;
  numberSystem: NumberSystem;
}

const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ settings, numberSystem }) => {
  const initialCounts = useMemo(() => 
    DENOMINATIONS.reduce((acc, d) => ({ ...acc, [d]: 0 }), {}), 
  []);

  const [counts, setCounts] = useState<Record<number, number>>(initialCounts);

  const handleCountChange = (denom: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [denom]: Math.max(0, num) }));
  };

  const handleReset = () => {
    setCounts(initialCounts);
  };

  const totals = useMemo(() => {
    const newSYP = DENOMINATIONS.reduce((sum, denom) => sum + (denom * (counts[denom] || 0)), 0);
    const oldSYP = newSYP * settings.newToOldRatio;
    const usd = newSYP / settings.officialUsdRate;
    return { newSYP, oldSYP, usd };
  }, [counts, settings]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass rounded-[40px] p-8 sm:p-10 space-y-10 border-emerald-500/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20 no-print"></div>
      
      {/* Interactive UI Header (Hidden on Print) */}
      <div className="flex items-center justify-between no-print">
        <h3 className="text-2xl font-black flex items-center gap-4">
          <span className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </span>
          حاسبة تدقيق الأوراق النقدية
        </h3>
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="p-2.5 rounded-xl glass hover:text-red-400 transition-all"
            title="إعادة تعيين"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            onClick={handlePrint} 
            className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-emerald-900/20"
            title="تصدير تقرير"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Print-Only Professional Report Content */}
      <div className="hidden print:block text-slate-900 space-y-8">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <img src={settings.logoUrl} alt="Logo" className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <h1 className="text-2xl font-black">{settings.platformName}</h1>
              <p className="text-sm text-slate-500">منصة التقييم النقدي الرسمي - إصدار ٢٠٢٦</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">تاريخ التقرير</p>
            <p className="text-lg font-black">{convertNumbers(new Date().toLocaleDateString('ar-SY'), numberSystem)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold bg-slate-100 p-2 rounded-lg pr-4">تفاصيل الجرد المالي</h2>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-3 px-4 font-black">الفئة النقدية</th>
                <th className="py-3 px-4 font-black text-center">العدد (ورقة)</th>
                <th className="py-3 px-4 font-black text-left">الإجمالي الفرعي</th>
              </tr>
            </thead>
            <tbody>
              {DENOMINATIONS.filter(d => counts[d] > 0).map(denom => (
                <tr key={denom} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold">{convertNumbers(denom, numberSystem)} ل.س جديدة</td>
                  <td className="py-3 px-4 text-center font-bold">{convertNumbers(counts[denom], numberSystem)}</td>
                  <td className="py-3 px-4 text-left font-black">{formatCurrency(denom * counts[denom], numberSystem)}</td>
                </tr>
              ))}
              {DENOMINATIONS.filter(d => counts[d] > 0).length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400 italic">لا يوجد أوراق نقدية مدخلة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <p className="text-xs font-bold text-emerald-700 mb-1">الإجمالي العام (ليرة جديدة)</p>
            <p className="text-3xl font-black text-emerald-900">{formatCurrency(totals.newSYP, numberSystem)} <span className="text-sm">ل.س</span></p>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600">القيمة المعادلة بالليرة القديمة</span>
              <span className="font-black">{formatCurrency(totals.oldSYP, numberSystem)}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600">القيمة بالدولار الأمريكي</span>
              <span className="font-black">{formatCurrency(totals.usd, numberSystem, '$')}</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between italic">
          <p>هذا التقرير تم إنشاؤه عبر منصة خبير العملة السورية.</p>
          <p>كل ١٠٠ ليرة قديمة = ١ ليرة جديدة | سعر الصرف الرسمي المعتمد: {convertNumbers(settings.officialUsdRate, numberSystem)} ل.س/$</p>
        </div>
      </div>

      {/* Interactive Input Grid (Hidden on Print) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 no-print">
        {DENOMINATIONS.map(denom => (
          <div key={denom} className="space-y-3">
            <label className="text-xs text-slate-400 font-bold block pr-2 uppercase tracking-wide">
              {convertNumbers(denom, numberSystem)} ل.س جديدة
            </label>
            <div className="relative group">
              <input 
                type="number" 
                value={counts[denom] || ''} 
                onChange={(e) => handleCountChange(denom, e.target.value)}
                placeholder="٠"
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:border-emerald-500/50 transition-all text-center text-lg font-black group-hover:border-white/20"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Summary Cards (Hidden on Print) */}
      <div className="pt-10 border-t border-white/5 space-y-6 no-print">
        <div className="relative p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12"></div>
          <span className="text-xs text-emerald-400 font-black uppercase tracking-[0.2em] block mb-2">إجمالي الرصيد الجديد</span>
          <span className="text-4xl font-black text-white tracking-tight">
            {formatCurrency(totals.newSYP, numberSystem)}
            <span className="text-lg text-emerald-400 mr-2 font-bold">ل.س</span>
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">بالنظام القديم</span>
              <span className="text-xl font-black text-slate-300">{formatCurrency(totals.oldSYP, numberSystem)}</span>
            </div>
            <div className="text-2xl opacity-20">🏛️</div>
          </div>
          <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">بالدولار الأمريكي</span>
              <span className="text-xl font-black text-slate-300">{formatCurrency(totals.usd, numberSystem, '$')}</span>
            </div>
            <div className="text-2xl opacity-20">🇺🇸</div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-center text-slate-500 no-print">
        * يتم حساب النتائج فوراً بناءً على عدد الأوراق النقدية المدخلة لكل فئة.
      </p>
    </div>
  );
};

export default ValuationCalculator;
