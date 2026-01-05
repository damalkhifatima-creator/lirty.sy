
import React, { useState } from 'react';
import { Banknote, NumberSystem } from '../types';
import { convertNumbers } from '../utils/numbers';

interface BanknoteGalleryProps {
  banknotes: Banknote[];
  numberSystem: NumberSystem;
}

const BanknoteGallery: React.FC<BanknoteGalleryProps> = ({ banknotes, numberSystem }) => {
  const [selectedNote, setSelectedNote] = useState<Banknote | null>(null);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-black">دليل الفئات النقدية الجديدة</h3>
        <p className="text-slate-400">استكشف التصاميم الجديدة وميزات الأمان المتقدمة لكل فئة.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {banknotes.map((note) => (
          <button 
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="group relative glass rounded-3xl overflow-hidden text-right border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-2"
          >
            <div className="aspect-[2/1] relative overflow-hidden">
              <img src={note.imageUrlFront} alt={note.value.toString()} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-4xl font-black">
                {convertNumbers(note.value, numberSystem)}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2">فئة {convertNumbers(note.value, numberSystem)} ليرة</h4>
              <p className="text-sm text-slate-400 line-clamp-2">تتميز هذه الفئة باللون {note.color.replace('bg-', '').split('-')[0]} وتحتوي على {note.securityFeatures.length} ميزات أمان رئيسية.</p>
              <div className="mt-4 text-emerald-400 font-bold text-xs flex items-center gap-2">
                عرض التفاصيل الكاملة
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedNote(null)}></div>
          <div className="relative glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border-emerald-500/20 p-8 sm:p-12 space-y-12 shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedNote(null)}
              className="absolute top-6 left-6 p-2 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h2 className="text-5xl font-black text-emerald-400">
                  {convertNumbers(selectedNote.value, numberSystem)} <span className="text-2xl text-white">ليرة جديدة</span>
                </h2>
                <p className="text-lg text-slate-300">تصميم هندسي يجمع بين التاريخ والحداثة السورية.</p>
              </div>
              <div className={`px-6 py-2 rounded-full ${selectedNote.color} text-white font-bold`}>
                الإصدار الأول 2026
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold border-b border-white/10 pb-2">الوجه الأمامي</h4>
                <img src={selectedNote.imageUrlFront} alt="Front" className="rounded-2xl shadow-xl border border-white/10" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold border-b border-white/10 pb-2">الوجه الخلفي</h4>
                <img src={selectedNote.imageUrlBack} alt="Back" className="rounded-2xl shadow-xl border border-white/10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-2xl font-black flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  ميزات الأمان
                </h4>
                <ul className="space-y-4">
                  {selectedNote.securityFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-1">
                        {i + 1}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-2xl font-black flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  القوة الشرائية
                </h4>
                <div className="glass p-6 rounded-3xl border-indigo-500/20 text-slate-300 leading-relaxed italic">
                  &quot;{selectedNote.purchasingPower}&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanknoteGallery;
