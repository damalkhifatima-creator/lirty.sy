
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-12 text-center space-y-8">
      <div className="inline-block px-4 py-1 rounded-full glass border-emerald-500/20 text-emerald-400 text-sm font-medium animate-pulse">
        رؤية نقدية جديدة لعام 2026
      </div>
      
      <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
        نظامك الموثوق <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
          لتقييم العملة السورية
        </span>
      </h2>
      
      <p className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl">
        منصة تقنية متطورة صممت لمواكبة التحول النقدي في سوريا، توفر لك أدوات دقيقة للتقييم، التحويل، والتحقق من أمان فئاتك النقدية.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="#calculator" className="px-8 py-4 bg-emerald-600 rounded-2xl font-bold shadow-xl shadow-emerald-900/40 hover:scale-105 transition-transform">
          ابدأ التقييم الآن
        </a>
        <a href="#gallery" className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-colors">
          تصفح الفئات الجديدة
        </a>
      </div>
    </div>
  );
};

export default Hero;
