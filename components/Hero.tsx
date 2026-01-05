
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative text-center space-y-6 pt-4">
      <div className="inline-block px-4 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
        رؤية نقدية مستقبلية ٢٠٢٦
      </div>
      
      <h2 className="text-3xl font-black leading-tight tracking-tight">
        مستقبلك المالي <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
          يبدأ بالدقة والوعي
        </span>
      </h2>
      
      <p className="text-slate-400 text-sm leading-relaxed px-4">
        المنصة التقنية الأولى في سوريا لتقييم وتحويل العملة الجديدة لعام 2026. كل ما تحتاجه في متناول يدك.
      </p>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
    </div>
  );
};

export default Hero;
