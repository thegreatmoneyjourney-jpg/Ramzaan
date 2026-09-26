import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Award, Flame, Sparkles } from 'lucide-react';
import { playGoalChime } from '../utils/audio';

interface FastingTrackerProps {
  lang: 'ur' | 'en';
  soundEnabled: boolean;
}

type FastStatus = 'fasted' | 'missed' | 'unmarked';

interface DayRecord {
  status: FastStatus;
  notes?: string;
}

export const FastingTracker: React.FC<FastingTrackerProps> = ({ lang, soundEnabled }) => {
  const [records, setRecords] = useState<Record<number, DayRecord>>(() => {
    try {
      const saved = localStorage.getItem('ramadan_fasting_tracker');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.debug('Failed to parse tracker', e);
    }
    // Default initial mock data: days 1 to 5 fasted
    const initial: Record<number, DayRecord> = {};
    for (let i = 1; i <= 30; i++) {
      initial[i] = { status: i <= 4 ? 'fasted' : 'unmarked' };
    }
    return initial;
  });

  const [activeAshraTab, setActiveAshraTab] = useState<1 | 2 | 3>(1);
  const [selectedDay, setSelectedDay] = useState<number>(5);

  useEffect(() => {
    try {
      localStorage.setItem('ramadan_fasting_tracker', JSON.stringify(records));
    } catch (e) {
      console.debug('Failed to save tracker', e);
    }
  }, [records]);

  const toggleDayStatus = (day: number, newStatus: FastStatus) => {
    setRecords((prev) => {
      const updated = {
        ...prev,
        [day]: { ...prev[day], status: newStatus },
      };
      if (newStatus === 'fasted' && soundEnabled) {
        playGoalChime();
      }
      return updated;
    });
  };

  const updateDayNotes = (day: number, notes: string) => {
    setRecords((prev) => ({
      ...prev,
      [day]: { ...prev[day], notes },
    }));
  };

  const totalFasted = Object.values(records).filter((r) => r.status === 'fasted').length;
  const totalMissed = Object.values(records).filter((r) => r.status === 'missed').length;
  const fastingPercentage = Math.round((totalFasted / 30) * 100);

  // Compute current streak
  let currentStreak = 0;
  for (let i = 1; i <= 30; i++) {
    if (records[i]?.status === 'fasted') {
      currentStreak++;
    } else {
      break;
    }
  }

  const ashraDays = {
    1: Array.from({ length: 10 }, (_, i) => i + 1),
    2: Array.from({ length: 10 }, (_, i) => i + 11),
    3: Array.from({ length: 10 }, (_, i) => i + 21),
  };

  const ashraNames = {
    1: { ur: 'عشرۂ رحمت (1 تا 10)', en: '1st Ashra of Mercy (1-10)' },
    2: { ur: 'عشرۂ مغفرت (11 تا 20)', en: '2nd Ashra of Forgiveness (11-20)' },
    3: { ur: 'عشرۂ نجات (21 تا 30)', en: '3rd Ashra of Refuge (21-30)' },
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? '30 روزہ ٹریکر (روزوں کا ریکارڈ)' : '30-Day Fasting Tracker'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ur'
              ? 'اپنے ہر روزے کی کیفیت ریکارڈ کریں اور تسلسل برقرار رکھیں'
              : 'Track your fasting journey and maintain your Ramadan consistency'}
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{currentStreak} {lang === 'ur' ? 'دن مسلسل' : 'Day Streak'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>{totalFasted}/30 {lang === 'ur' ? 'مکمل' : 'Fasted'}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-slate-300 font-medium">
            {lang === 'ur' ? 'ماہِ رمضان کی مجموعی تکمیل' : 'Overall Ramadan Fasting Progress'}
          </span>
          <span className="text-amber-400 font-bold">{fastingPercentage}%</span>
        </div>
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
            style={{ width: `${fastingPercentage}%` }}
          />
        </div>
      </div>

      {/* Ashra Tabs */}
      <div className="flex border-b border-slate-800 mb-6 gap-2">
        {([1, 2, 3] as const).map((ashra) => {
          const count = ashraDays[ashra].filter((d) => records[d]?.status === 'fasted').length;
          return (
            <button
              key={ashra}
              onClick={() => setActiveAshraTab(ashra)}
              className={`flex-1 py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 text-center ${
                activeAshraTab === ashra
                  ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{lang === 'ur' ? ashraNames[ashra].ur : ashraNames[ashra].en}</span>
              <span className="block text-[11px] text-slate-500 mt-0.5 font-normal">
                {count}/10 {lang === 'ur' ? 'روزے' : 'Fasts'}
              </span>
            </button>
          );
        })}
      </div>

      {/* 10 Days Grid for Selected Ashra */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {ashraDays[activeAshraTab].map((day) => {
          const rec = records[day] || { status: 'unmarked' };
          const isFasted = rec.status === 'fasted';
          const isMissed = rec.status === 'missed';
          const isSelected = selectedDay === day;

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer rounded-2xl p-3 border transition-all relative ${
                isSelected
                  ? 'ring-2 ring-amber-400 border-amber-400 bg-slate-800/90'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-slate-400">Day {day}</span>
                {isFasted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                ) : isMissed ? (
                  <XCircle className="w-4 h-4 text-red-400 fill-red-400/20" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700 mt-1" />
                )}
              </div>

              <div className="text-center py-1">
                <span className="text-lg font-bold text-slate-100">{day} رمضان</span>
              </div>

              {/* Status Badge */}
              <div className="mt-2 text-center">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                    isFasted
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : isMissed
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isFasted
                    ? (lang === 'ur' ? 'الحمدللہ روزہ رکھا' : 'Fasted')
                    : isMissed
                    ? (lang === 'ur' ? 'قضا / رخصت' : 'Missed / Qaza')
                    : (lang === 'ur' ? 'غیر معین' : 'Pending')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail / Action Box for Selected Day */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-emerald-950/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {lang === 'ur' ? `${selectedDay} رمضان المبارک کی تفصیل` : `Details for Day ${selectedDay} of Ramadan`}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ur'
                ? 'اپنے روزے کی حالت تبدیل کریں اور آج کے روحانی احساسات لکھیں'
                : 'Update status and write your personal reflections'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleDayStatus(selectedDay, 'fasted')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                records[selectedDay]?.status === 'fasted'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/30'
                  : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ur' ? 'روزہ مکمل کیا' : 'Mark Fasted'}</span>
            </button>

            <button
              onClick={() => toggleDayStatus(selectedDay, 'missed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                records[selectedDay]?.status === 'missed'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-700/30'
                  : 'bg-red-950/40 text-red-300 hover:bg-red-900/60 border border-red-900/50'
              }`}
            >
              <XCircle className="w-4 h-4" />
              <span>{lang === 'ur' ? 'قضا / عذر' : 'Mark Missed/Qaza'}</span>
            </button>
          </div>
        </div>

        {/* Reflection Note Input */}
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1">
            {lang === 'ur' ? 'آج کا روحانی نوٹ / دعا کی درخواست:' : 'Daily Ramadan Note / Spiritual Reflection:'}
          </label>
          <input
            type="text"
            value={records[selectedDay]?.notes || ''}
            onChange={(e) => updateDayNotes(selectedDay, e.target.value)}
            placeholder={
              lang === 'ur'
                ? 'مثلاً: آج سورت رحمن کی تلاوت کی، والدین کے لیے خصوصی دعا...'
                : 'e.g., Read Surah Rahman today, special dua for parents...'
            }
            className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>
    </div>
  );
};
