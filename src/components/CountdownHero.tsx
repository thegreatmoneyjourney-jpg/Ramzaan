import React, { useState, useEffect } from 'react';
import { Sunrise, Sunset, Clock, Sparkles, BookOpen, CheckCircle, HeartHandshake } from 'lucide-react';
import { City } from '../data/ramadanData';

interface CountdownHeroProps {
  city: City;
  lang: 'ur' | 'en';
  onOpenDua: (duaId: string) => void;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  targetName: string;
  isFastingActive: boolean;
  progressPercent: number;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({ city, lang, onOpenDua }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    targetName: 'Iftar',
    isFastingActive: true,
    progressPercent: 65,
  });

  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const [fajrH, fajrM] = city.baseFajr.split(':').map(Number);
      const [magH, magM] = city.baseMaghrib.split(':').map(Number);

      const todayFajr = new Date(now);
      todayFajr.setHours(fajrH, fajrM, 0, 0);

      const todayMaghrib = new Date(now);
      todayMaghrib.setHours(magH, magM, 0, 0);

      let targetTime: Date;
      let targetName = 'Iftar';
      let isFasting = false;
      let progress = 0;

      if (now < todayFajr) {
        // Before Fajr today: countdown to Sehr closing
        targetTime = todayFajr;
        targetName = lang === 'ur' ? 'سحری کا اختتام' : 'Sehri Ends';
        isFasting = false;
        // Progress toward Fajr
        const prevMaghrib = new Date(todayMaghrib);
        prevMaghrib.setDate(prevMaghrib.getDate() - 1);
        const totalNightMs = todayFajr.getTime() - prevMaghrib.getTime();
        const elapsedMs = now.getTime() - prevMaghrib.getTime();
        progress = Math.min(100, Math.max(0, Math.round((elapsedMs / totalNightMs) * 100)));
      } else if (now >= todayFajr && now < todayMaghrib) {
        // Fasting period: countdown to Iftar!
        targetTime = todayMaghrib;
        targetName = lang === 'ur' ? 'افطار کا وقت' : 'Iftar Time';
        isFasting = true;
        const totalFastingMs = todayMaghrib.getTime() - todayFajr.getTime();
        const elapsedFastingMs = now.getTime() - todayFajr.getTime();
        progress = Math.min(100, Math.max(0, Math.round((elapsedFastingMs / totalFastingMs) * 100)));
      } else {
        // After Maghrib: countdown to tomorrow's Sehri
        const tomorrowFajr = new Date(todayFajr);
        tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
        targetTime = tomorrowFajr;
        targetName = lang === 'ur' ? 'اگلی سحری' : 'Next Sehri';
        isFasting = false;
        const totalNightMs = tomorrowFajr.getTime() - todayMaghrib.getTime();
        const elapsedMs = now.getTime() - todayMaghrib.getTime();
        progress = Math.min(100, Math.max(0, Math.round((elapsedMs / totalNightMs) * 100)));
      }

      const diffMs = Math.max(0, targetTime.getTime() - now.getTime());
      const totalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setTimeRemaining({
        hours,
        minutes,
        seconds,
        targetName,
        isFastingActive: isFasting,
        progressPercent: progress,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [city, lang]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/80 border border-emerald-800/40 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-950/40">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top bar with city status & live time */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                timeRemaining.isFastingActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {timeRemaining.isFastingActive
                ? (lang === 'ur' ? 'روزہ جاری ہے (روزہ دار)' : 'Currently Fasting (Roza Active)')
                : (lang === 'ur' ? 'سحر کا وقت قریب ہے' : 'Fast Ended / Night Time')}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {city.name}, {city.country}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 px-3 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentTimeStr || '--:--:--'}</span>
          </div>
        </div>

        {/* Central Countdown Display */}
        <div className="text-center my-6">
          <p className="text-sm sm:text-base font-semibold text-emerald-300 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {timeRemaining.targetName}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto">
            {/* Hours */}
            <div className="bg-slate-950/70 border border-emerald-900/60 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm shadow-inner">
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 font-mono tracking-tight">
                {pad(timeRemaining.hours)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'ur' ? 'گھنٹے' : 'Hours'}
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-slate-950/70 border border-emerald-900/60 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm shadow-inner">
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-300 font-mono tracking-tight">
                {pad(timeRemaining.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'ur' ? 'منٹ' : 'Minutes'}
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-slate-950/70 border border-emerald-900/60 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-sm shadow-inner">
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 font-mono tracking-tight">
                {pad(timeRemaining.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'ur' ? 'سیکنڈ' : 'Seconds'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
              <span>{lang === 'ur' ? 'روزے کی تکمیل' : 'Daily Fasting Progress'}</span>
              <span className="text-amber-300 font-bold">{timeRemaining.progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-1000 ease-out"
                style={{ width: `${timeRemaining.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Times & Quick Dua Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          {/* Sehri Timing Card */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-emerald-950 hover:border-emerald-800/60 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sunrise className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  {lang === 'ur' ? 'سحری ختم / اذانِ فجر' : 'Sehri Ends / Fajr'}
                </p>
                <p className="text-xl font-bold text-slate-100">{city.baseFajr} AM</p>
              </div>
            </div>
            <button
              onClick={() => onOpenDua('sehri')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'سحری کی دعا' : 'Sehri Dua'}</span>
            </button>
          </div>

          {/* Iftar Timing Card */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-emerald-950 hover:border-emerald-800/60 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sunset className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  {lang === 'ur' ? 'افطار کا وقت / اذانِ مغرب' : 'Iftar Time / Maghrib'}
                </p>
                <p className="text-xl font-bold text-slate-100">{city.baseMaghrib} PM</p>
              </div>
            </div>
            <button
              onClick={() => onOpenDua('iftar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'افطار کی دعا' : 'Iftar Dua'}</span>
            </button>
          </div>
        </div>

        {/* 5 Daily Prayers Bar */}
        <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="block text-slate-400">{lang === 'ur' ? 'فجر' : 'Fajr'}</span>
            <span className="font-bold text-amber-300">{city.baseFajr}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="block text-slate-400">{lang === 'ur' ? 'ظہر' : 'Zuhr'}</span>
            <span className="font-bold text-slate-200">{city.baseZuhr}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="block text-slate-400">{lang === 'ur' ? 'عصر' : 'Asr'}</span>
            <span className="font-bold text-slate-200">{city.baseAsr}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="block text-slate-400">{lang === 'ur' ? 'مغرب' : 'Maghrib'}</span>
            <span className="font-bold text-emerald-300">{city.baseMaghrib}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="block text-slate-400">{lang === 'ur' ? 'عشاء' : 'Isha'}</span>
            <span className="font-bold text-slate-200">{city.baseIsha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
