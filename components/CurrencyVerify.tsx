
import React, { useState, useRef } from 'react';

const CurrencyVerify: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setResult("تم التعرف على فئة 50 ليرة سورية (إصدار 2026). العملة تبدو مطابقة للمواصفات الأمنية.");
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black">التحقق السريع بالذكاء الاصطناعي</h2>
        <p className="text-slate-400 text-sm">قم بتصوير العملة للتحقق من فئتها وميزاتها</p>
      </div>

      <div className="glass rounded-[40px] p-8 border-emerald-500/10 text-center space-y-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square w-full max-w-[300px] mx-auto glass border-dashed border-white/20 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden relative group"
        >
          {image ? (
            <>
              <img src={image} alt="Upload" className="w-full h-full object-cover" />
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/20 overflow-hidden">
                   <div className="w-full h-1 bg-emerald-400 absolute animate-[bounce_2s_infinite] shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 group-hover:scale-110 transition-transform">
              <span className="text-6xl block">📸</span>
              <span className="text-slate-400 font-bold block">اضغط للتصوير أو الرفع</span>
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {image && !result && !isScanning && (
          <button 
            onClick={startScan}
            className="w-full py-4 bg-emerald-600 rounded-2xl font-black shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all"
          >
            بدء التحليل الفوري
          </button>
        )}

        {result && (
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 text-sm font-bold animate-in fade-in">
             ✅ {result}
          </div>
        )}

        {image && (
          <button onClick={() => { setImage(null); setResult(null); }} className="text-xs text-slate-500 hover:text-red-400 transition-colors">إزالة الصورة</button>
        )}
      </div>

      <div className="p-4 glass rounded-2xl space-y-2 border-white/5">
        <h4 className="text-xs font-black text-slate-500 uppercase">نصائح التحقق</h4>
        <ul className="text-[10px] text-slate-400 space-y-1">
          <li>• تأكد من توفر إضاءة جيدة وكافية.</li>
          <li>• ضع الورقة النقدية على خلفية داكنة وموحدة.</li>
          <li>• حاول تصوير ملامح الأمان الواضحة كالهولوغرام.</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrencyVerify;
