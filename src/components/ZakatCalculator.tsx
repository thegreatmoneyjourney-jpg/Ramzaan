import React, { useState } from 'react';
import { Calculator, DollarSign, Info, ShieldCheck, HelpCircle, Coins } from 'lucide-react';

interface ZakatCalculatorProps {
  lang: 'ur' | 'en';
}

export const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ lang }) => {
  const [currency, setCurrency] = useState<'PKR' | 'USD' | 'SAR' | 'AED' | 'GBP' | 'INR'>('PKR');

  // Input states
  const [cash, setCash] = useState<string>('');
  const [goldGrams, setGoldGrams] = useState<string>('');
  const [goldPricePerGram, setGoldPricePerGram] = useState<string>('24000'); // default PKR approx
  const [silverGrams, setSilverGrams] = useState<string>('');
  const [silverPricePerGram, setSilverPricePerGram] = useState<string>('280'); // default PKR approx
  const [businessStock, setBusinessStock] = useState<string>('');
  const [investments, setInvestments] = useState<string>('');
  const [moneyOwedToYou, setMoneyOwedToYou] = useState<string>('');
  const [debtsOwedByYou, setDebtsOwedByYou] = useState<string>('');

  // Currency symbols
  const currencySymbols: Record<string, string> = {
    PKR: 'Rs.',
    USD: '$',
    SAR: 'SAR',
    AED: 'AED',
    GBP: '£',
    INR: '₹',
  };

  const num = (v: string) => Number(v) || 0;

  const totalGoldVal = num(goldGrams) * num(goldPricePerGram);
  const totalSilverVal = num(silverGrams) * num(silverPricePerGram);
  const totalGrossAssets =
    num(cash) +
    totalGoldVal +
    totalSilverVal +
    num(businessStock) +
    num(investments) +
    num(moneyOwedToYou);

  const totalDeductions = num(debtsOwedByYou);
  const netZakatAssets = Math.max(0, totalGrossAssets - totalDeductions);
  const zakatPayable = netZakatAssets * 0.025; // 2.5%

  // Nisab threshold based on silver (approx 612.36g)
  const silverNisabValue = 612.36 * (num(silverPricePerGram) || 280);
  const isNisabReached = netZakatAssets >= silverNisabValue;

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-emerald-900/50 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              {lang === 'ur' ? 'زکوٰۃ کیلکولیٹر' : 'Ramadan Zakat Calculator'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ur'
              ? 'اپنے تمام مال، سونا چاندی اور نقدی پر شرعی زکوٰۃ (2.5%) کا آسان حساب'
              : 'Calculate your exact 2.5% annual Zakat on wealth, gold, and savings'}
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            {lang === 'ur' ? 'کرنسی:' : 'Currency:'}
          </span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="PKR">PKR (Pakistani Rupee)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="SAR">SAR (Saudi Riyal)</option>
            <option value="AED">AED (UAE Dirham)</option>
            <option value="GBP">GBP (British Pound)</option>
            <option value="INR">INR (Indian Rupee)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Inputs Section (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Cash & Bank */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              {lang === 'ur' ? '1. نقدی و بینک بیلنس' : '1. Cash & Bank Savings'}
            </h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                {lang === 'ur' ? 'گھر میں موجود نقد رقم اور بینک اکاؤنٹ بیلنس' : 'Cash in hand, bank accounts, savings & deposits'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">
                  {currencySymbols[currency]}
                </span>
                <input
                  type="number"
                  min="0"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Gold & Silver */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {lang === 'ur' ? '2. سونا اور چاندی' : '2. Gold & Silver'}
            </h3>

            {/* Gold */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'سونے کا وزن (گرام میں)' : 'Gold Weight (in grams)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'فی گرام سونے کی قیمت' : 'Current Gold Price / Gram'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">
                    {currencySymbols[currency]}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={goldPricePerGram}
                    onChange={(e) => setGoldPricePerGram(e.target.value)}
                    placeholder="Rate"
                    className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Silver */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'چاندی کا وزن (گرام میں)' : 'Silver Weight (in grams)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={silverGrams}
                  onChange={(e) => setSilverGrams(e.target.value)}
                  placeholder="e.g. 200"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'فی گرام چاندی کی قیمت' : 'Current Silver Price / Gram'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-mono">
                    {currencySymbols[currency]}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={silverPricePerGram}
                    onChange={(e) => setSilverPricePerGram(e.target.value)}
                    placeholder="Rate"
                    className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Business & Receivables */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-200">
              {lang === 'ur' ? '3. تجارتی مال و سرمایہ کاری' : '3. Business Assets & Receivables'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'تجارتی مال برائے فروخت' : 'Business Inventory (Resale Value)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={businessStock}
                  onChange={(e) => setBusinessStock(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ur' ? 'حصص (شیئرز) اور دیگر سرمایہ کاری' : 'Shares, Mutual Funds & Investments'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Deductions (Debts) */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-red-950/40">
            <h3 className="text-sm font-bold text-red-300 mb-2">
              {lang === 'ur' ? '4. واجب الادا قرضے (منہائی)' : '4. Deductible Liabilities & Debts'}
            </h3>
            <label className="block text-xs text-slate-400 mb-1">
              {lang === 'ur' ? 'قرضے یا فوری واجب الادا واجبات جو آپ نے ادا کرنے ہیں' : 'Immediate personal debts & urgent liabilities to be paid'}
            </label>
            <input
              type="number"
              min="0"
              value={debtsOwedByYou}
              onChange={(e) => setDebtsOwedByYou(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-red-900/40 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Right Summary Card (1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 border border-emerald-800/60 shadow-xl sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>{lang === 'ur' ? 'زکوٰۃ کا خلاصہ' : 'Zakat Summary'}</span>
              <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                2.5%
              </span>
            </h3>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between text-slate-400">
                <span>{lang === 'ur' ? 'کل اموال (اثاثے):' : 'Total Assets:'}</span>
                <span className="font-semibold text-slate-200">
                  {currencySymbols[currency]} {totalGrossAssets.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>{lang === 'ur' ? 'منہا شدہ قرضے:' : 'Total Deductions:'}</span>
                <span>
                  - {currencySymbols[currency]} {totalDeductions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-bold">
                <span>{lang === 'ur' ? 'خالص قابلِ زکوٰۃ مال:' : 'Net Zakatable Wealth:'}</span>
                <span className="text-amber-300">
                  {currencySymbols[currency]} {netZakatAssets.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Payable Box */}
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 text-center mb-6">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest block mb-1">
                {lang === 'ur' ? 'واجب الادا زکوٰۃ' : 'Total Zakat Payable'}
              </span>
              <div className="text-3xl font-black text-white font-mono">
                {currencySymbols[currency]} {Math.round(zakatPayable).toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400/80 block mt-1">
                {lang === 'ur' ? 'سالانہ 2.5 فیصد کی شرح سے' : 'Calculated at 2.5% annual rate'}
              </span>
            </div>

            {/* Nisab Guidance */}
            <div className="text-xs p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Info className="w-3.5 h-3.5" />
                <span>{lang === 'ur' ? 'نصاب کی رہنمائی' : 'Nisab Standard'}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {lang === 'ur'
                  ? `چاندی کا نصاب 612.36 گرام (52.5 تولہ) ہے، جس کی موجودہ مالیت لگ بھگ ${currencySymbols[currency]} ${Math.round(silverNisabValue).toLocaleString()} بنتی ہے۔ اگر آپ کے پاس سال بھر نصاب سے زائد رقم رہی تو زکوٰۃ فرض ہے۔`
                  : `Silver Nisab is 612.36g (~52.5 tolas), valued at approx ${currencySymbols[currency]} ${Math.round(silverNisabValue).toLocaleString()}. If wealth exceeds this for one lunar year, Zakat is obligatory.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
