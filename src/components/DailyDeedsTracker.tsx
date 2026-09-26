import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, CheckCircle, Heart, Star, BookMarked } from 'lucide-react';
import { DAILY_DEEDS } from '../data/ramadanData';
import { playGoalChime } from '../utils/audio';

interface DailyDeedsTrackerProps {
  lang: 'ur' | 'en';
  soundEnabled: boolean;
}

export const DailyDeedsTracker: React.FC<DailyDeedsTrackerProps> = ({ lang, soundEnabled }) => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const todayKey = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`ramadan_deeds_${todayKey}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['fajr', 'sehri_dua', 'quran_recitation'];
  });

  useEffect(() => {
    try {
      const todayKey = new Date().toISOString().split('T')[0];
      localStorage.setItem(`ramadan_deeds_${todayKey}`, JSON.stringify(completedIds));
    } catch (e) {
      console.debug('Failed to save daily deeds', e);
    }
  }, [completedIds]);

  const toggleDeed = (id: string) => {
    setCompletedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (!exists && updated.length === DAILY_DEEDS.length && soundEnabled) {
        playGoalChime();
      }
      return updated;
    });
  };

  const percentage = Math.round((completedIds.length / DAILY_DEEDS.length) * 100);

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? 'روزانہ عبادات و اعمال چیک لسٹ' : 'Daily Ramadan Deeds Checklist'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ur'
              ? 'نمازیں، تلاوتِ قرآن، صدقہ و تراویح کی روزانہ نگرانی'
              : 'Keep track of your 5 prayers, Taraweeh, Quran & Sunnah habits'}
          </p>
        </div>

        {/* Completion Ring / Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">{lang === 'ur' ? 'آج کی پیشرفت' : 'Today\'s Progress'}</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {completedIds.length}/{DAILY_DEEDS.length}
            </span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-950 border border-slate-800">
            <span className="text-xs font-black text-amber-300 font-mono">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 mb-6">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Deeds List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {DAILY_DEEDS.map((deed) => {
          const isDone = completedIds.includes(deed.id);
          return (
            <div
              key={deed.id}
              onClick={() => toggleDeed(deed.id)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-700/60 shadow-md shadow-emerald-950/20'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'border border-slate-700 bg-slate-900 text-transparent hover:border-slate-500'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 fill-current stroke-current" />
                </button>
                <div>
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      isDone ? 'text-emerald-200 line-through' : 'text-slate-200'
                    }`}
                  >
                    {lang === 'ur' ? deed.titleUrdu : deed.titleEnglish}
                  </p>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                    {deed.category}
                  </span>
                </div>
              </div>

              {isDone && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {lang === 'ur' ? 'مکمل' : 'Done'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Hadith of the day */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 border border-amber-500/30 flex items-start gap-3">
        <BookMarked className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
            {lang === 'ur' ? 'فرمانِ مصطفیٰ ﷺ' : 'Hadith on Ramadan'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            {lang === 'ur'
              ? '«مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ» — جس نے ایمان اور ثواب کی نیت سے رمضان کے روزے رکھے، اس کے پچھلے گناہ معاف کر دیے جاتے ہیں۔ (صحیح بخاری 38)'
              : '“Whoever observes fasts during the month of Ramadan out of sincere faith, and hoping to attain Allah\'s rewards, then all his past sins will be forgiven.” (Sahih al-Bukhari 38)'}
          </p>
        </div>
      </div>
    </div>
  );
};
