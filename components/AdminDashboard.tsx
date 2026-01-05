
import React, { useState } from 'react';
import { AppSettings, AdminTab } from '../types';

interface AdminDashboardProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  onClose: () => void;
  setAlertMessage: (msg: string | null) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ settings, setSettings, onClose, setAlertMessage }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('system');
  const [error, setError] = useState('');

  const handlePinSubmit = (digit: string) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin === '123456') {
        setIsAuthenticated(true);
        setError('');
      } else if (newPin.length === 6) {
        setError('رمز الدخول غير صحيح!');
        setTimeout(() => {
          setPin('');
          setError('');
        }, 1500);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black tracking-tight">بوابة الإدارة</h2>
          <p className="text-slate-400 font-medium">الوصول مقيد للمشرفين فقط</p>
        </div>

        <div className="space-y-8 max-w-xs w-full">
          <div className="flex justify-center gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border ${pin.length > i ? 'bg-emerald-500 border-emerald-400 scale-125 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-800 border-white/5'}`}
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm text-center font-bold animate-pulse">{error}</p>}

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map((val) => (
              <button
                key={val}
                onClick={() => {
                  if (val === 'C') setPin('');
                  else if (val === '⌫') setPin(pin.slice(0, -1));
                  else handlePinSubmit(val.toString());
                }}
                className={`h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all active:scale-90 ${typeof val === 'number' ? 'glass hover:bg-white/10' : 'bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400'}`}
              >
                {val}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-full py-4 text-slate-500 hover:text-white transition-colors text-sm font-bold">إلغاء الأمر</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-[40px] p-8 sm:p-12 space-y-12 border-white/5 shadow-2xl animate-in slide-in-from-bottom duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-black">لوحة التحكم</h2>
            <p className="text-slate-500 text-sm font-bold">إدارة النظام والهوية البصرية</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { setIsAuthenticated(false); setPin(''); }} className="px-6 py-3 glass rounded-2xl font-bold hover:text-red-400 transition-colors">خروج</button>
          <button onClick={onClose} className="px-8 py-3 bg-emerald-600 rounded-2xl font-black shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all">حفظ والعودة</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-2xl w-fit">
        {[
          { id: 'system', label: 'إعدادات النظام' },
          { id: 'identity', label: 'هوية المنصة' },
          { id: 'alerts', label: 'مركز التنبيهات' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[30vh]">
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right duration-500">
            <div className="glass p-8 rounded-[32px] space-y-8 border-white/5">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4">المراقبة والتشغيل</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                  <div>
                    <span className="text-slate-400 text-sm block">وضع الصيانة</span>
                    <span className="text-[10px] text-slate-500">إغلاق المنصة أمام الزوار</span>
                  </div>
                  <button 
                    onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                    className={`w-14 h-8 rounded-full transition-all relative p-1 ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="text-xs text-slate-400 font-bold block px-2">سعر صرف الدولار (ثابت)</label>
                  <input 
                    type="number" 
                    value={settings.officialUsdRate}
                    onChange={(e) => setSettings({ ...settings, officialUsdRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 font-black focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-[32px] space-y-8 border-white/5">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4">إحصائيات فورية</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-3xl text-center space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold">زوار اليوم</span>
                  <span className="text-3xl font-black block">١،٤٢٩</span>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl text-center space-y-2">
                  <span className="text-[10px] text-slate-500 font-bold">عمليات التقييم</span>
                  <span className="text-3xl font-black block text-emerald-400">٨،٥٠٢</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="glass p-10 rounded-[32px] space-y-10 border-white/5 animate-in fade-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-sm text-slate-400 font-bold block px-2">اسم المنصة الرسمي</label>
                <input 
                  type="text" 
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 font-bold focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm text-slate-400 font-bold block px-2">شعار المنصة (URL)</label>
                <input 
                  type="text" 
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 font-bold focus:border-emerald-500/50 transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm text-slate-400 font-bold block px-2">النص التعريفي الشامل</label>
                <textarea 
                  rows={4}
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 font-medium focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="glass p-10 rounded-[32px] space-y-8 border-white/5 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center gap-4 text-indigo-400 font-bold">
              <span className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">📢</span>
              بث إعلان عام للمستخدمين
            </div>
            <textarea 
              rows={3}
              id="alertInput"
              placeholder="اكتب التنبيه أو الرسالة التي ستظهر في أعلى الموقع..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-3xl px-6 py-5 font-bold focus:border-indigo-500/50 transition-all resize-none"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const input = document.getElementById('alertInput') as HTMLTextAreaElement;
                  setAlertMessage(input.value || null);
                }}
                className="px-10 py-4 bg-indigo-600 rounded-2xl font-black shadow-xl shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all"
              >
                تفعيل البث المباشر
              </button>
              <button 
                onClick={() => setAlertMessage(null)}
                className="px-10 py-4 glass rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-colors"
              >
                إيقاف جميع التنبيهات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
