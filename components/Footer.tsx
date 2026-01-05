
import React from 'react';
import { AppSettings } from '../types';

interface FooterProps {
  settings: AppSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h4 className="font-bold text-lg">{settings.platformName}</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto md:mx-0">
            {settings.description}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">روابط سريعة</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li><a href="#market" className="hover:text-emerald-400 transition-colors">نبض السوق</a></li>
            <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">حاسبة التدقيق</a></li>
            <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">دليل الفئات</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">سياسة الخصوصية</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">تواصل معنا</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors text-slate-400 hover:text-emerald-400">
              𝕏
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors text-slate-400 hover:text-emerald-400">
              FB
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors text-slate-400 hover:text-emerald-400">
              IG
            </a>
          </div>
          <p className="text-[10px] text-slate-600 mt-4">
            جميع الحقوق محفوظة © 2026. تصميم وتنفيذ فريق الخبير المالي السوري.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
