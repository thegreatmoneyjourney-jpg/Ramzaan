import React, { useState } from 'react';
import {
  Moon,
  Clock,
  Calendar,
  Sparkles,
  BookOpen,
  CheckSquare,
  Calculator,
  CalendarDays,
  X,
  Heart,
  Share2,
} from 'lucide-react';
import { CITIES, City, RAMADAN_DUAS, DuaItem } from './data/ramadanData';
import { Header } from './components/Header';
import { CountdownHero } from './components/CountdownHero';
import { FastingTracker } from './components/FastingTracker';
import { TasbeehCounter } from './components/TasbeehCounter';
import { DuasSection } from './components/DuasSection';
import { DailyDeedsTracker } from './components/DailyDeedsTracker';
import { ZakatCalculator } from './components/ZakatCalculator';
import { RamadanTimetable } from './components/RamadanTimetable';

export function App() {
  const [currentCity, setCurrentCity] = useState<City>(CITIES[0]); // Karachi by default
  const [lang, setLang] = useState<'ur' | 'en'>('ur');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    'home' | 'tracker' | 'tasbeeh' | 'duas' | 'deeds' | 'zakat' | 'timetable'
  >('home');

  // Modal for quick dua
  const [activeModalDua, setActiveModalDua] = useState<DuaItem | null>(null);

  const handleOpenDua = (duaId: string) => {
    const found = RAMADAN_DUAS.find((d) => d.id === duaId);
    if (found) {
      setActiveModalDua(found);
    } else {
      setActiveTab('duas');
    }
  };

  const navItems = [
    { id: 'home', ur: 'سحر و افطار', en: 'Home', icon: Clock },
    { id: 'tracker', ur: 'روزہ ٹریکر', en: 'Fasting Tracker', icon: Calendar },
    { id: 'tasbeeh', ur: 'تسبیح', en: 'Tasbeeh', icon: Sparkles },
    { id: 'duas', ur: 'مسنون دعائیں', en: 'Duas', icon: BookOpen },
    { id: 'deeds', ur: 'روزانہ عبادات', en: 'Deeds', icon: CheckSquare },
    { id: 'zakat', ur: 'زکوٰۃ کیلکولیٹر', en: 'Zakat', icon: Calculator },
    { id: 'timetable', ur: 'مکمل ٹائم ٹیبل', en: 'Timetable', icon: CalendarDays },
  ] as const;

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${lang === 'ur' ? 'direction-rtl' : ''}`}>
      {/* Top Header */}
      <Header
        currentCity={currentCity}
        onSelectCity={setCurrentCity}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'ur' ? 'en' : 'ur'))}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-emerald-900/30 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-emerald-600/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{lang === 'ur' ? item.ur : item.en}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Contents */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Live Hero Countdown */}
            <CountdownHero city={currentCity} lang={lang} onOpenDua={handleOpenDua} />

            {/* Quick 2-column overview widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyDeedsTracker lang={lang} soundEnabled={soundEnabled} />
              <TasbeehCounter lang={lang} soundEnabled={soundEnabled} />
            </div>

            {/* Quick Fasting Tracker preview */}
            <FastingTracker lang={lang} soundEnabled={soundEnabled} />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="animate-fadeIn">
            <FastingTracker lang={lang} soundEnabled={soundEnabled} />
          </div>
        )}

        {activeTab === 'tasbeeh' && (
          <div className="animate-fadeIn">
            <TasbeehCounter lang={lang} soundEnabled={soundEnabled} />
          </div>
        )}

        {activeTab === 'duas' && (
          <div className="animate-fadeIn">
            <DuasSection lang={lang} />
          </div>
        )}

        {activeTab === 'deeds' && (
          <div className="animate-fadeIn">
            <DailyDeedsTracker lang={lang} soundEnabled={soundEnabled} />
          </div>
        )}

        {activeTab === 'zakat' && (
          <div className="animate-fadeIn">
            <ZakatCalculator lang={lang} />
          </div>
        )}

        {activeTab === 'timetable' && (
          <div className="animate-fadeIn">
            <RamadanTimetable city={currentCity} lang={lang} />
          </div>
        )}
      </main>

      {/* Quick Dua Pop-up Modal */}
      {activeModalDua && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModalDua(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-amber-300 mb-2">
              {lang === 'ur' ? activeModalDua.titleUrdu : activeModalDua.titleEnglish}
            </h3>
            <span className="text-xs text-slate-400 block mb-4">
              حوالہ: {activeModalDua.reference}
            </span>

            <div className="text-right p-4 rounded-2xl bg-slate-950/80 border border-slate-800 my-4">
              <p className="text-2xl font-arabic font-bold text-amber-200 leading-loose">
                {activeModalDua.arabic}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Transliteration
                </span>
                <p className="text-slate-300 italic">{activeModalDua.transliteration}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-amber-400 tracking-wider block">
                  اردو ترجمہ
                </span>
                <p className="font-arabic text-slate-200 text-base">{activeModalDua.urdu}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  English Translation
                </span>
                <p className="text-slate-300">{activeModalDua.english}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalDua(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                {lang === 'ur' ? 'بند کریں' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-emerald-950/60 bg-slate-950/90 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Moon className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">رمضان المبارک مبارک ہو</span>
            <span>• Ramadan Mubarak</span>
          </div>
          <p className="text-slate-500">
            May Allah accept our fasts, prayers, and supplications. آمین
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
