import React, { useState } from 'react';
import { BookOpen, Copy, Check, Volume2, Sparkles, Share2 } from 'lucide-react';
import { RAMADAN_DUAS, DuaItem } from '../data/ramadanData';

interface DuasSectionProps {
  lang: 'ur' | 'en';
}

export const DuasSection: React.FC<DuasSectionProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'ashra' | 'special'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDuas = RAMADAN_DUAS.filter(
    (dua) => filter === 'all' || dua.category === filter
  );

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.titleUrdu} / ${dua.titleEnglish}\n\n${dua.arabic}\n\nTransliteration: ${dua.transliteration}\n\nاردو ترجمہ: ${dua.urdu}\n\nEnglish: ${dua.english}\n\n(حوالہ: ${dua.reference})`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakArabic = (arabicText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? 'رمضان المبارک کی مسنون دعائیں' : 'Authentic Ramadan Duas'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ur'
              ? 'سحر، افطار، تینوں عشروں اور شبِ قدر کی مستند دعائیں مع ترجمہ و تشریح'
              : 'Daily fast, Ashra & Laylatul Qadr supplications with translations & audio'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          {(
            [
              { key: 'all', ur: 'تمام', en: 'All' },
              { key: 'daily', ur: 'سحر و افطار', en: 'Daily' },
              { key: 'ashra', ur: 'تین عشرے', en: '3 Ashras' },
              { key: 'special', ur: 'شبِ قدر و تراویح', en: 'Special' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === item.key
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ur' ? item.ur : item.en}
            </button>
          ))}
        </div>
      </div>

      {/* Duas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDuas.map((dua) => {
          const isCopied = copiedId === dua.id;
          return (
            <div
              key={dua.id}
              id={`dua-${dua.id}`}
              className="rounded-3xl bg-slate-950/70 border border-emerald-950/80 p-6 flex flex-col justify-between hover:border-emerald-800/60 transition-all shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      {lang === 'ur' ? dua.titleUrdu : dua.titleEnglish}
                    </h3>
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      {dua.reference}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSpeakArabic(dua.arabic)}
                      title="Listen Arabic pronunciation"
                      className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/50 border border-slate-800 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(dua)}
                      title="Copy dua"
                      className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-amber-300 hover:bg-amber-950/50 border border-slate-800 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Arabic Calligraphy */}
                <div className="text-right my-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/50">
                  <p className="text-2xl sm:text-3xl font-arabic font-bold text-amber-200 leading-loose drop-shadow">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                    Transliteration
                  </span>
                  <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                    {dua.transliteration}
                  </p>
                </div>

                {/* Urdu Translation */}
                <div className="mb-3 text-right">
                  <span className="text-[10px] font-bold text-amber-400 tracking-wider block mb-1">
                    اردو ترجمہ
                  </span>
                  <p className="text-sm font-arabic font-medium text-slate-200 leading-relaxed">
                    {dua.urdu}
                  </p>
                </div>

                {/* English Translation */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    English Meaning
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {dua.english}
                  </p>
                </div>
              </div>

              {/* Benefits / Fazeelat footer */}
              {dua.benefits && (
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-emerald-400/90 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-900/30">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                  <span>{dua.benefits}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
