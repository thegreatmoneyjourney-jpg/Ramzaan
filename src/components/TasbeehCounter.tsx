import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, Check, Plus, Hash } from 'lucide-react';
import { TASBEEH_PRESETS, TasbeehPreset } from '../data/ramadanData';
import { playTasbeehClick, playGoalChime } from '../utils/audio';

interface TasbeehCounterProps {
  lang: 'ur' | 'en';
  soundEnabled: boolean;
}

export const TasbeehCounter: React.FC<TasbeehCounterProps> = ({ lang, soundEnabled }) => {
  const [selectedPreset, setSelectedPreset] = useState<TasbeehPreset>(TASBEEH_PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(TASBEEH_PRESETS[0].defaultTarget);
  const [roundsCompleted, setRoundsCompleted] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('ramadan_tasbeeh_total') || 0);
    } catch {
      return 0;
    }
  });

  const [isPressing, setIsPressing] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('ramadan_tasbeeh_total', totalCount.toString());
    } catch (e) {
      console.debug('Failed to save total tasbeeh', e);
    }
  }, [totalCount]);

  const handlePresetChange = (preset: TasbeehPreset) => {
    setSelectedPreset(preset);
    setCount(0);
    setTarget(preset.defaultTarget);
  };

  const handleIncrement = () => {
    if (soundEnabled) {
      playTasbeehClick();
    }

    const nextCount = count + 1;
    setTotalCount((prev) => prev + 1);

    if (nextCount >= target) {
      setCount(0);
      setRoundsCompleted((prev) => prev + 1);
      if (soundEnabled) {
        playGoalChime();
      }
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setRoundsCompleted(0);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? 'ڈیجیٹل تسبیح کاؤنٹر' : 'Digital Tasbeeh Counter'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ur' ? 'رمضان المبارک کے مسنون اذکار و تسبیحات' : 'Daily Azkar, Salawat & Glorification'}
          </p>
        </div>

        {/* Total lifetime count */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300">
          <Hash className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'ur' ? 'کل اذکار:' : 'Total Azkar:'}</span>
          <span className="font-bold text-amber-300 font-mono">{totalCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Preset selector pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {TASBEEH_PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handlePresetChange(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {lang === 'ur' ? preset.nameUrdu : preset.name}
            </button>
          );
        })}
      </div>

      {/* Active Zikr Display Card */}
      <div className="text-center p-6 rounded-2xl bg-slate-950/60 border border-emerald-950 mb-8">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-arabic font-bold text-amber-200 leading-relaxed sm:leading-loose drop-shadow mb-3">
          {selectedPreset.arabic}
        </p>
        <p className="text-sm font-semibold text-emerald-300 tracking-wide mb-1">
          {selectedPreset.transliteration}
        </p>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {selectedPreset.meaningUrdu}
        </p>
      </div>

      {/* Interactive Tasbeeh Machine UI */}
      <div className="max-w-xs mx-auto text-center">
        {/* Device outer shell */}
        <div className="relative p-6 sm:p-8 rounded-[40px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-emerald-800/40 shadow-2xl shadow-emerald-950/80">
          {/* LCD Counter Screen */}
          <div className="bg-[#0f1712] border-2 border-emerald-900/60 rounded-2xl p-4 mb-6 shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-600 mb-1">
              <span>ROUND {roundsCompleted}</span>
              <span>GOAL {target}</span>
            </div>

            <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 tracking-wider">
              {count.toString().padStart(3, '0')}
            </div>

            {/* Circular/Linear progress inside screen */}
            <div className="w-full bg-emerald-950/50 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Main Giant Tap Button */}
          <button
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onTouchStart={() => setIsPressing(true)}
            onTouchEnd={() => setIsPressing(false)}
            onClick={handleIncrement}
            className={`w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-emerald-700 text-slate-950 font-black shadow-xl shadow-amber-500/25 border-4 border-amber-300/40 flex flex-col items-center justify-center transition-transform active:scale-95 cursor-pointer select-none ${
              isPressing ? 'scale-90 shadow-none' : 'hover:scale-105'
            }`}
            aria-label="Count Tasbeeh"
          >
            <Plus className="w-8 h-8 stroke-[3]" />
            <span className="text-xs uppercase font-extrabold tracking-widest mt-1">
              {lang === 'ur' ? 'پڑھیں' : 'TAP'}
            </span>
          </button>

          {/* Small Reset Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
              title="Reset current count"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'دوبارہ شروع' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Target setter */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>{lang === 'ur' ? 'ہدف:' : 'Target:'}</span>
          {[33, 100, 313, 1000].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t);
                setCount(0);
              }}
              className={`px-2 py-0.5 rounded-lg border ${
                target === t
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
