import React, { useState } from 'react';
import { CalendarDays, Download, Printer, Filter, Sunrise, Sunset, MapPin } from 'lucide-react';
import { City, generateRamadanSchedule, DaySchedule } from '../data/ramadanData';

interface RamadanTimetableProps {
  city: City;
  lang: 'ur' | 'en';
}

export const RamadanTimetable: React.FC<RamadanTimetableProps> = ({ city, lang }) => {
  const [filterAshra, setFilterAshra] = useState<number>(0); // 0 = all
  const [searchDay, setSearchDay] = useState<string>('');

  const fullSchedule = generateRamadanSchedule(city);

  const filteredSchedule = fullSchedule.filter((item) => {
    const matchesAshra = filterAshra === 0 || item.ashra === filterAshra;
    const matchesSearch =
      !searchDay ||
      item.day.toString().includes(searchDay) ||
      item.hijriDate.toLowerCase().includes(searchDay.toLowerCase());
    return matchesAshra && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const headers = 'Day,Hijri Date,Ashra,Sehri End (Fajr),Iftar Time (Maghrib)\n';
    const rows = fullSchedule
      .map(
        (s) =>
          `Day ${s.day},${s.hijriDate},${s.ashraNameEnglish},${s.sehrTime} AM,${s.iftarTime} PM`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ramadan_Calendar_${city.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? 'رمضان المبارک کا مکمل ٹائم ٹیبل' : '30-Day Ramadan Timetable'}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{city.name}, {city.country} (1446 AH)</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'پرنٹ' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          {[
            { id: 0, ur: 'تمام 30 دن', en: 'All 30 Days' },
            { id: 1, ur: 'عشرۂ اول (رحمت)', en: '1st Ashra' },
            { id: 2, ur: 'عشرۂ ثانی (مغفرت)', en: '2nd Ashra' },
            { id: 3, ur: 'عشرۂ ثالث (نجات)', en: '3rd Ashra' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterAshra(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterAshra === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ur' ? tab.ur : tab.en}
            </button>
          ))}
        </div>

        <div>
          <input
            type="text"
            value={searchDay}
            onChange={(e) => setSearchDay(e.target.value)}
            placeholder={lang === 'ur' ? 'دن تلاش کریں (مثلاً: 15)...' : 'Search day...'}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Timetable Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4 font-bold">{lang === 'ur' ? 'روزه / دن' : 'Roza #'}</th>
              <th className="py-3 px-4 font-bold">{lang === 'ur' ? 'تاریخ' : 'Date'}</th>
              <th className="py-3 px-4 font-bold">{lang === 'ur' ? 'عشرہ' : 'Ashra'}</th>
              <th className="py-3 px-4 font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <Sunrise className="w-3.5 h-3.5" />
                  {lang === 'ur' ? 'سحری اختتام' : 'Sehri Ends'}
                </span>
              </th>
              <th className="py-3 px-4 font-bold text-emerald-300">
                <span className="flex items-center gap-1">
                  <Sunset className="w-3.5 h-3.5" />
                  {lang === 'ur' ? 'افطار' : 'Iftar'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredSchedule.map((row) => {
              const isFirstTen = row.ashra === 1;
              const isSecondTen = row.ashra === 2;
              return (
                <tr
                  key={row.day}
                  className="hover:bg-slate-800/40 transition-colors text-slate-300 font-sans"
                >
                  <td className="py-3 px-4 font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono">
                      {row.day}
                    </span>
                    <span>{row.day} رمضان</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{row.hijriDate}</td>
                  <td className="py-3 px-4 text-xs font-medium">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isFirstTen
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : isSecondTen
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      }`}
                    >
                      {lang === 'ur' ? row.ashraNameUrdu : row.ashraNameEnglish}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-300 text-sm">
                    {row.sehrTime} AM
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300 text-sm">
                    {row.iftarTime} PM
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
