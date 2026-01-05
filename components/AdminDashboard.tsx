
import React, { useState, useRef } from 'react';
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
  const logoInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black tracking-tight">بوابة الإدارة</h2>
        </div>

        <div className="space-y-8 max-w-xs w-full">
          <div className="flex justify-center gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-300 border ${pin.length > i ? 'bg-emerald-500 border-emerald-400 scale-125' : 'bg-slate-800 border-white/5'}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map((val) => (
              <button
                key={val}
                onClick={() => {
                  if (val === 'C') setPin('');
                  else if (val === '⌫') setPin(pin.slice(0, -1));
                  else handlePinSubmit(val.toString());
                }}
                className={`h-14 rounded-2xl flex items-center justify-center text-lg font-black transition-all active:scale-90 ${typeof val === 'number' ? 'glass hover:bg-white/10' : 'bg-white/5 hover:bg-red-500/10'}`}
              >
                {val}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-full py-4 text-slate-500 hover:text-white transition-colors text-sm font-bold">إلغاء</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-[40px] p-6 space-y-8 border-white/5 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">لوحة التحكم</h2>
        <button onClick={onClose} className="px-4 py-2 bg-emerald-600 rounded-xl font-bold text-xs">خروج</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['system', 'identity', 'alerts'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as AdminTab)}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${activeTab === tab ? 'bg-emerald-500 text-white' : 'glass text-slate-400'}`}
          >
            {tab === 'system' ? 'النظام' : tab === 'identity' ? 'الهوية' : 'التنبيهات'}
          </button>
        ))}
      </div>

      <div className="min-h-[40vh]">
        {activeTab === 'system' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="glass p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">وضع الصيانة</span>
                <button 
                  onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                  className={`w-12 h-6 rounded-full relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-bold block uppercase">سعر الصرف ($)</label>
                <input 
                  type="number" 
                  value={settings.officialUsdRate}
                  onChange={(e) => setSettings({ ...settings, officialUsdRate: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm font-black"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="glass p-6 rounded-3xl space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-400">تخصيص الشعار</label>
                <div className="flex flex-col items-center gap-6">
                   <div className="w-24 h-24 rounded-2xl glass border border-white/10 overflow-hidden relative">
                      <img 
                        src={settings.logoUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        style={{ 
                          transform: `scale(${settings.logoScale / 100})`,
                          objectPosition: `${settings.logoX}% ${settings.logoY}%` 
                        }} 
                      />
                   </div>
                   <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                   <button 
                    onClick={() => logoInputRef.current?.click()}
                    className="px-6 py-2 glass rounded-xl text-xs font-bold hover:bg-white/10"
                   >
                     تغيير الصورة
                   </button>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                      <span>تكبير/تصغير</span>
                      <span>{settings.logoScale}%</span>
                    </div>
                    <input 
                      type="range" min="50" max="250" value={settings.logoScale}
                      onChange={(e) => setSettings({...settings, logoScale: parseInt(e.target.value)})}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                      <span>تحريك أفقي</span>
                      <span>{settings.logoX}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={settings.logoX}
                      onChange={(e) => setSettings({...settings, logoX: parseInt(e.target.value)})}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                      <span>تحريك رأسي</span>
                      <span>{settings.logoY}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={settings.logoY}
                      onChange={(e) => setSettings({...settings, logoY: parseInt(e.target.value)})}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-bold block">اسم المنصة</label>
                  <input 
                    type="text" value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="glass p-6 rounded-3xl space-y-4 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold">رسالة التنبيه العلوية</h3>
            <textarea 
              rows={3} id="alertInput"
              placeholder="اكتب التنبيه هنا..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none"
            />
            <button 
              onClick={() => {
                const input = document.getElementById('alertInput') as HTMLTextAreaElement;
                setAlertMessage(input.value || null);
              }}
              className="w-full py-3 bg-indigo-600 rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/40"
            >
              بث الرسالة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
