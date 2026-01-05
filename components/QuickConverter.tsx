
import React, { useState, useEffect } from 'react';
import { AppSettings, NumberSystem } from '../types';
import { convertNumbers } from '../utils/numbers';

interface QuickConverterProps {
  settings: AppSettings;
  numberSystem: NumberSystem;
}

const QuickConverter: React.FC<QuickConverterProps> = ({ settings, numberSystem }) => {
  const [vals, setVals] = useState({ newSYP: '', oldSYP: '', usd: '' });
  const [activeField, setActiveField] = useState<string | null>(null);

  const updateValues = (field: string, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setVals({ newSYP: '', oldSYP: '', usd: '' });
      return;
    }

    if (field === 'newSYP') {
      setVals({
        newSYP: value,
        oldSYP: (num * settings.newToOldRatio).toFixed(0),
        usd: (num / settings.officialUsdRate).toFixed(2)
      });
    } else if (field === 'oldSYP') {
      const newS = num / settings.newToOldRatio;
      setVals({
        oldSYP: value,
        newSYP: newS.toFixed(2),
        usd: (newS / settings.officialUsdRate).toFixed(2)
      });
    } else if (field === 'usd') {
      const newS = num * settings.officialUsdRate;
      setVals({
        usd: value,
        newSYP: newS.toFixed(0),
        oldSYP: (newS * settings.newToOldRatio).toFixed(0)
      });
    }
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 space-y-8 border-indigo-500/10">
      <h3 className="text-2xl font-bold flex items-center gap-3">
        <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </span>
        المحول السريع (3 في 1)
      </h3>

      <div className="space-y-6">
        {[
          { id: 'newSYP', label: 'ليرة جديدة', icon: '🇸🇾' },
          { id: 'oldSYP', label: 'ليرة قديمة', icon: '🏛️' },
          { id: 'usd', label: 'دولار أمريكي', icon: '🇺🇸' }
        ].map((field) => (
          <div key={field.id} className="group">
            <label className="text-xs text-slate-400 font-bold block mb-2 px-1 transition-colors group-focus-within:text-indigo-400">
              {field.label}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">{field.icon}</span>
              <input 
                type="number"
                value={vals[field.id as keyof typeof vals]}
                onChange={(e) => updateValues(field.id, e.target.value)}
                onFocus={() => setActiveField(field.id)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-indigo-500/50 transition-all text-xl font-bold"
                placeholder="أدخل القيمة..."
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-slate-500 italic">
        * يتم التحديث بشكل لحظي ثنائي الاتجاه بناءً على المعاملات الرسمية.
      </p>
    </div>
  );
};

export default QuickConverter;
