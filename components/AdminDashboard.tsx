
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
      if (newPin === '123456') { // Mock PIN
        setIsAuthenticated(true);
        setError('');
      } else if (newPin.length === 6) {
        setError('رمز الدخول غير صحيح!');
        setTimeout(() => setPin(''), 1000);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black">بوابة الإدارة الآمنة</h2>
          <p className="text-slate-400 italic">أدخل رمز الدخول المكون من 6 أرقام للمتابعة</p>
        </div>

        <div className="space-y-6 max-w-xs w-full">
          <div className="flex justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-full transition-all duration-300 ${pin.length > i ? 'bg-emerald-500 scale-125' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm text-center font-bold animate-bounce">{error}</p>}

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'X'].map((val) => (
              <button
                key={val}
                onClick={() => {
                  if (val === 'C') setPin('');
                  else if (val === 'X') onClose();
                  else handlePinSubmit(val.toString());
                }}
                className="h-16 glass rounded-2xl flex items-center justify-center text-2xl font-bold hover:bg-white/10 transition-colors active:scale-95"
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-[40px] p-8 sm:p-12 space-y-12 border-emerald-500/20 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl font-black flex items-center gap-4">
          <span className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          لوحة التحكم المركزية
        </h2>
        <div className="flex gap-4">
          <button onClick={() => { setIsAuthenticated(false); setPin(''); }} className="px-6 py-3 glass rounded-xl font-bold hover:text-red-400 transition-colors">تسجيل الخروج</button>
          <button onClick={onClose} className="px-6 py-3 bg-emerald-600 rounded-xl font-bold shadow-lg shadow-emerald-900/40 transition-transform active:scale-95">العودة للمنصة</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
        {[
          { id: 'system', label: 'تبويب النظام' },
          { id: 'identity', label: 'تبويب الهوية' },
          { id: 'banknotes', label: 'تبويب النماذج' },
          { id: 'alerts', label: 'تبويب التنبيهات' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[40vh]">
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold">المؤشرات الحيوية</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">إجمالي الزوار الفريدين</span>
                  <span className="font-bold text-emerald-400">14,292 زائر</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">حالة قاعدة البيانات</span>
                  <span className="text-green-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    متصلة (Supabase)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold">إعدادات عامة</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">وضع الصيانة</span>
                  <button 
                    onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'right-7' : 'right-1'}`}></div>
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-bold block">سعر الصرف الرسمي الثابت ($)</label>
                  <input 
                    type="number" 
                    value={settings.officialUsdRate}
                    onChange={(e) => setSettings({ ...settings, officialUsdRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="glass p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm text-slate-400 font-bold block">اسم المنصة</label>
                  <input 
                    type="text" 
                    value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm text-slate-400 font-bold block">رابط الشعار</label>
                  <input 
                    type="text" 
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm text-slate-400 font-bold block">نص تعريفي عن المنصة</label>
                  <textarea 
                    rows={4}
                    value={settings.description}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
              <button className="px-8 py-3 bg-emerald-600 rounded-xl font-bold">حفظ التغييرات</button>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold">بث رسالة فورية للمستخدمين</h3>
              <p className="text-sm text-slate-400">ستظهر هذه الرسالة في أعلى الموقع لجميع الزوار.</p>
              <div className="space-y-4">
                <textarea 
                  rows={3}
                  placeholder="اكتب التنبيه هنا..."
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                  id="alertInput"
                />
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const input = document.getElementById('alertInput') as HTMLTextAreaElement;
                      setAlertMessage(input.value || null);
                    }}
                    className="px-8 py-3 bg-indigo-600 rounded-xl font-bold"
                  >
                    بث الرسالة الآن
                  </button>
                  <button 
                    onClick={() => setAlertMessage(null)}
                    className="px-8 py-3 glass rounded-xl font-bold text-red-400"
                  >
                    إيقاف البث
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banknotes' && (
          <div className="text-center py-20 text-slate-500 animate-in fade-in duration-300">
             <p className="italic text-lg">قائمة إدارة الفئات النقدية (banknotes) ستكون متاحة قريباً في تحديث Supabase القادم.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
