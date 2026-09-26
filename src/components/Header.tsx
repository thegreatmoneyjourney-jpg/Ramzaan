import React from 'react';
import { Moon, MapPin, Volume2, VolumeX, Globe } from 'lucide-react';
import { CITIES, City } from '../data/ramadanData';

interface HeaderProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
  lang: 'ur' | 'en';
  onToggleLang: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onSelectCity,
  lang,
  onToggleLang,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
            <Moon className="w-6 h-6 fill-slate-950 stroke-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-emerald-300 to-amber-100 bg-clip-text text-transparent">
                {lang === 'ur' ? 'رمضان المبارک' : 'Ramzaan Kareem'}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 uppercase tracking-widest hidden sm:inline-block">
                1446 AH
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'ur' ? 'سحر و افطار، روزے کا ٹریکر، دعائیں و تسبیح' : 'Daily Sehri, Iftar, Fasting Tracker & Duas'}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* City Selector */}
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-emerald-400 absolute left-2.5 pointer-events-none" />
            <select
              value={currentCity.id}
              onChange={(e) => {
                const found = CITIES.find((c) => c.id === e.target.value);
                if (found) onSelectCity(found);
              }}
              className="pl-8 pr-7 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-900/90 text-slate-200 border border-emerald-900/60 hover:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 appearance-none font-medium cursor-pointer transition-colors"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                  {c.name} ({c.country})
                </option>
              ))}
            </select>
            <span className="absolute right-2 text-slate-400 text-[10px] pointer-events-none">▼</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-emerald-800 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950/60 text-slate-200 border border-emerald-900/50 hover:border-emerald-700 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ur' ? 'English' : 'اردو'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
