export interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
  baseFajr: string; // "05:04"
  baseMaghrib: string; // "18:42"
  baseZuhr: string;
  baseAsr: string;
  baseIsha: string;
}

export const CITIES: City[] = [
  { id: 'karachi', name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:22', baseMaghrib: '18:43', baseZuhr: '12:38', baseAsr: '16:01', baseIsha: '19:58' },
  { id: 'lahore', name: 'Lahore', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:02', baseMaghrib: '18:24', baseZuhr: '12:20', baseAsr: '15:45', baseIsha: '19:42' },
  { id: 'islamabad', name: 'Islamabad / Rawalpindi', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:05', baseMaghrib: '18:28', baseZuhr: '12:24', baseAsr: '15:50', baseIsha: '19:47' },
  { id: 'peshawar', name: 'Peshawar', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:09', baseMaghrib: '18:32', baseZuhr: '12:28', baseAsr: '15:54', baseIsha: '19:51' },
  { id: 'quetta', name: 'Quetta', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:28', baseMaghrib: '18:50', baseZuhr: '12:44', baseAsr: '16:09', baseIsha: '20:05' },
  { id: 'multan', name: 'Multan', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:14', baseMaghrib: '18:34', baseZuhr: '12:30', baseAsr: '15:55', baseIsha: '19:51' },
  { id: 'faisalabad', name: 'Faisalabad', country: 'Pakistan', timezone: 'Asia/Karachi', baseFajr: '05:06', baseMaghrib: '18:27', baseZuhr: '12:23', baseAsr: '15:48', baseIsha: '19:44' },
  { id: 'makkah', name: 'Makkah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', baseFajr: '05:15', baseMaghrib: '18:36', baseZuhr: '12:31', baseAsr: '15:54', baseIsha: '20:06' },
  { id: 'madinah', name: 'Madinah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', baseFajr: '05:16', baseMaghrib: '18:38', baseZuhr: '12:32', baseAsr: '15:56', baseIsha: '20:08' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', baseFajr: '05:10', baseMaghrib: '18:31', baseZuhr: '12:26', baseAsr: '15:50', baseIsha: '19:46' },
  { id: 'london', name: 'London', country: 'UK', timezone: 'Europe/London', baseFajr: '04:35', baseMaghrib: '18:15', baseZuhr: '12:12', baseAsr: '15:25', baseIsha: '19:45' },
  { id: 'newyork', name: 'New York', country: 'USA', timezone: 'America/New_York', baseFajr: '05:30', baseMaghrib: '19:05', baseZuhr: '13:02', baseAsr: '16:32', baseIsha: '20:30' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', baseFajr: '05:40', baseMaghrib: '19:18', baseZuhr: '13:14', baseAsr: '16:42', baseIsha: '20:50' },
  { id: 'dhaka', name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', baseFajr: '04:55', baseMaghrib: '18:08', baseZuhr: '12:05', baseAsr: '15:28', baseIsha: '19:22' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', baseFajr: '05:25', baseMaghrib: '18:48', baseZuhr: '12:43', baseAsr: '16:05', baseIsha: '20:01' },
];

export interface DuaItem {
  id: string;
  category: 'daily' | 'ashra' | 'special';
  titleUrdu: string;
  titleEnglish: string;
  arabic: string;
  transliteration: string;
  urdu: string;
  english: string;
  reference: string;
  benefits?: string;
}

export const RAMADAN_DUAS: DuaItem[] = [
  {
    id: 'sehri',
    category: 'daily',
    titleUrdu: 'روزہ رکھنے کی نیت (سحری کی دعا)',
    titleEnglish: 'Intention for Fasting (Sehri Dua)',
    arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    transliteration: 'Wa bisawmi ghadin nawaytu min shahri Ramadan',
    urdu: 'اور میں نے ماہِ رمضان کے کل کے روزے کی نیت کی۔',
    english: 'I intend to keep the fast tomorrow for the month of Ramadan.',
    reference: 'Abu Dawud',
    benefits: 'سحری کے وقت دل میں ارادہ اور زبان سے یہ دعا پڑھنا سنت ہے۔'
  },
  {
    id: 'iftar',
    category: 'daily',
    titleUrdu: 'افطار کی مسنون دعا',
    titleEnglish: 'Dua for Breaking the Fast (Iftar)',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ',
    transliteration: 'Allahumma inni laka sumtu wa bika aamantu wa \'ala rizq-ika aftartu',
    urdu: 'اے اللہ! میں نے تیرے ہی لیے روزہ رکھا، تجھ پر ہی ایمان لایا اور تیرے ہی دیے ہوئے رزق سے افطار کیا۔',
    english: 'O Allah! I fasted for You, I believe in You, and with Your provision I break my fast.',
    reference: 'Abu Dawud (2358)',
    benefits: 'افطار کے وقت مانگی گئی دعا رد نہیں ہوتی۔'
  },
  {
    id: 'iftar-after',
    category: 'daily',
    titleUrdu: 'افطار کے بعد کی دعا',
    titleEnglish: 'Dua After Breaking Fast',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahaba adh-dhama\'u wabtallati al-\'urooqu wa thabata al-ajru in sha Allah',
    urdu: 'پیاس بجھ گئی، رگیں تر ہو گئیں اور اللہ کے فضل سے اجر ثابت ہو گیا۔',
    english: 'The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
    reference: 'Sunan Abi Dawud (2357)',
    benefits: 'رسول اللہ ﷺ افطار کے فوراً بعد یہ دعا پڑھتے تھے۔'
  },
  {
    id: 'ashra-1',
    category: 'ashra',
    titleUrdu: 'پہلے عشرے کی دعا (رحمت کا عشرہ: 1 تا 10 رمضان)',
    titleEnglish: '1st Ashra Dua (Days of Mercy: 1-10 Ramadan)',
    arabic: 'رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi-ghfir war-ham wa Anta khayrur-rahimeen',
    urdu: 'اے میرے رب! مجھے بخش دے، مجھ پر رحم فرما اور تو سب سے بہترین رحم فرمانے والا ہے۔',
    english: 'My Lord! Forgive and have mercy, for You are the Best of those who show mercy.',
    reference: 'Surah Al-Mu\'minun (23:118)',
    benefits: 'پہلا عشرہ اللہ کی رحمت کا ہے۔ کثرت سے رحمت طلب کریں۔'
  },
  {
    id: 'ashra-2',
    category: 'ashra',
    titleUrdu: 'دوسرے عشرے کی دعا (مغفرت کا عشرہ: 11 تا 20 رمضان)',
    titleEnglish: '2nd Ashra Dua (Days of Forgiveness: 11-20 Ramadan)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha Rabbi min kulli dhambin wa atoobu ilayh',
    urdu: 'میں اللہ سے اپنے تمام گناہوں کی معافی مانگتا ہوں جو میرا رب ہے اور اسی کی طرف رجوع کرتا ہوں۔',
    english: 'I seek forgiveness from Allah, my Lord, for every sin and I repent unto Him.',
    reference: 'Tawbah & Istighfar',
    benefits: 'دوسرا عشرہ بخشش اور گناہوں کی معافی کا ہے۔'
  },
  {
    id: 'ashra-3',
    category: 'ashra',
    titleUrdu: 'تیسرے عشرے کی دعا (جہنم سے نجات کا عشرہ: 21 تا 30 رمضان)',
    titleEnglish: '3rd Ashra Dua (Seeking Refuge from Hellfire: 21-30 Ramadan)',
    arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
    transliteration: 'Allahumma ajirni minan-naar',
    urdu: 'اے اللہ! مجھے جہنم کی آگ سے پناہ عطا فرما۔',
    english: 'O Allah! Save me from the fire of Hell.',
    reference: 'Sunan an-Nasa\'i',
    benefits: 'تیسرا عشرہ آگ سے آزادی کا ہے۔ کثرت سے یہ التجا کریں۔'
  },
  {
    id: 'qadr',
    category: 'special',
    titleUrdu: 'شبِ قدر کی خاص دعا (لیلۃ القدر)',
    titleEnglish: 'Dua for Laylatul Qadr (The Night of Power)',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allahumma innaka \'afuwwun tuhibbul-\'afwa fa\'fu \'anni',
    urdu: 'اے اللہ! بیشک تو بہت معاف فرمانے والا ہے، معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔',
    english: 'O Allah! You are Most Forgiving, and You love forgiveness; so forgive me.',
    reference: 'Jami` at-Tirmidhi (3513) - Taught to Hazrat Aisha (R.A)',
    benefits: 'رمضان کی طاق راتوں (21, 23, 25, 27, 29) میں کثرت سے پڑھیں۔'
  },
  {
    id: 'taraweeh',
    category: 'special',
    titleUrdu: 'تسبیحِ تراویح',
    titleEnglish: 'Tasbeeh of Taraweeh',
    arabic: 'سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ، سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ، سُبُّوحٌ قُدُّوسٌ رَبُّنَا وَرَبُّ الْمَلَائِكَةِ وَالرُّوحِ',
    transliteration: 'Subhana dhil Mulki wal Malakoot, Subhana dhil \'Izzati wal \'Azamati wal Haybati wal Qudrati wal Kibriyaa-i wal Jabaroot, Subhanal Malikil Hayyil Ladhi la yanamu wa la yamoot, Subboohun Quddoosun Rabbuna wa Rabbul Malaa-ikati war-Rooh',
    urdu: 'پاک ہے وہ ذات جو بادشاہت اور ملکوت کی مالک ہے، پاک ہے وہ عزت، عظمت، ہیبت، قدرت، بڑائی اور غلبے والا، پاک ہے وہ زندہ بادشاہ جسے نہ نیند آتی ہے نہ موت، وہ بے حد پاک اور مقدس ہے ہمارا رب اور فرشتوں اور روح کا رب۔',
    english: 'Glory be to the Owner of Dominion and Sovereignty; Glory be to the Possessor of Honor, Greatness, Awe, Power, Majesty and Might; Glory be to the Ever-Living Sovereign who never sleeps nor dies; All-Glorious, All-Holy, our Lord and the Lord of the Angels and the Spirit.',
    reference: 'Traditional Taraweeh Interval Tasbeeh',
    benefits: 'تراویح کی ہر چار رکعتوں کے درمیانی وقفے میں پڑھی جاتی ہے۔'
  }
];

export interface TasbeehPreset {
  id: string;
  name: string;
  nameUrdu: string;
  arabic: string;
  transliteration: string;
  meaningUrdu: string;
  defaultTarget: number;
}

export const TASBEEH_PRESETS: TasbeehPreset[] = [
  {
    id: 'subhanallah',
    name: 'SubhanAllah',
    nameUrdu: 'سبحان الله',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaningUrdu: 'اللہ ہر عیب سے پاک ہے',
    defaultTarget: 33
  },
  {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    nameUrdu: 'الحمد لله',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    meaningUrdu: 'تمام تعریفیں اللہ کے لیے ہیں',
    defaultTarget: 33
  },
  {
    id: 'allahuakbar',
    name: 'Allahu Akbar',
    nameUrdu: 'الله أكبر',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaningUrdu: 'اللہ سب سے بڑا ہے',
    defaultTarget: 34
  },
  {
    id: 'istighfar',
    name: 'Astaghfirullah',
    nameUrdu: 'استغفار',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atoobu ilayh',
    meaningUrdu: 'میں اللہ سے بخشش طلب کرتا ہوں اور توبہ کرتا ہوں',
    defaultTarget: 100
  },
  {
    id: 'durood',
    name: 'Durood Shareef',
    nameUrdu: 'درود شریف',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala aali Muhammad',
    meaningUrdu: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور ان کی آل پر',
    defaultTarget: 100
  },
  {
    id: 'kalima',
    name: 'Third Kalima (Tamjeed)',
    nameUrdu: 'تیسرا کلمہ',
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
    transliteration: 'SubhanAllahi wal-Hamdu Lillahi wa laa ilaha ill-Allahu w-Allahu Akbar',
    meaningUrdu: 'اللہ پاک ہے اور سب تعریف اللہ ہی کے لیے ہے اور اللہ کے سوا کوئی معبود نہیں اور اللہ سب سے بڑا ہے',
    defaultTarget: 100
  },
  {
    id: 'ayatulkursi',
    name: 'Ayat-ul-Kursi (Short Zikr)',
    nameUrdu: 'یا حی یا قیوم',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
    transliteration: 'Ya Hayyu Ya Qayyoomu bi-rahmatika astagheeth',
    meaningUrdu: 'اے زندہ اور سب کو قائم رکھنے والے، تیری رحمت کے ذریعے فریاد کرتا ہوں',
    defaultTarget: 100
  }
];

export interface DailyDeed {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  category: 'prayer' | 'quran' | 'charity' | 'sunnah';
}

export const DAILY_DEEDS: DailyDeed[] = [
  { id: 'fajr', titleUrdu: 'فجر کی نماز باجماعت', titleEnglish: 'Fajr Prayer (in congregation)', category: 'prayer' },
  { id: 'zuhr', titleUrdu: 'ظہر کی نماز', titleEnglish: 'Zuhr Prayer', category: 'prayer' },
  { id: 'asr', titleUrdu: 'عصر کی نماز', titleEnglish: 'Asr Prayer', category: 'prayer' },
  { id: 'maghrib', titleUrdu: 'مغرب کی نماز', titleEnglish: 'Maghrib Prayer', category: 'prayer' },
  { id: 'isha_taraweeh', titleUrdu: 'عشاء و نمازِ تراویح', titleEnglish: 'Isha & Taraweeh Prayers', category: 'prayer' },
  { id: 'quran_recitation', titleUrdu: 'قرآن پاک کی تلاوت (کم از کم 1 پارہ یا رکوع)', titleEnglish: 'Quran Recitation (Daily Portion)', category: 'quran' },
  { id: 'sehri_dua', titleUrdu: 'سحری کے وقت دعا و استغفار (تہجد)', titleEnglish: 'Tahajjud & Pre-Dawn Dua', category: 'prayer' },
  { id: 'sadaqah', titleUrdu: 'آج کا صدقہ یا کسی کی مالی مدد', titleEnglish: 'Daily Sadaqah / Charity', category: 'charity' },
  { id: 'azkar_morning_evening', titleUrdu: 'صبح و شام کے مسنون اذکار', titleEnglish: 'Morning & Evening Masnoon Azkar', category: 'sunnah' },
  { id: 'good_deed', titleUrdu: 'مسکراہٹ، حسنِ اخلاق یا کسی روزہ دار کا روزہ افطار کروانا', titleEnglish: 'Feeding a fasting person or act of kindness', category: 'sunnah' }
];

export interface DaySchedule {
  day: number;
  hijriDate: string;
  ashra: 1 | 2 | 3;
  ashraNameUrdu: string;
  ashraNameEnglish: string;
  sehrTime: string;
  iftarTime: string;
}

export function generateRamadanSchedule(city: City): DaySchedule[] {
  // Generates 30 days schedule with natural 1-minute daily daylight adjustments
  const [fajrH, fajrM] = city.baseFajr.split(':').map(Number);
  const [magH, magM] = city.baseMaghrib.split(':').map(Number);

  const schedule: DaySchedule[] = [];

  for (let i = 1; i <= 30; i++) {
    // Ramadan days: slightly earlier sehr as days progress, slightly later iftar
    const sehrDelta = -Math.floor((i - 1) * 0.8);
    const iftarDelta = Math.floor((i - 1) * 0.7);

    const sTotalMin = fajrH * 60 + fajrM + sehrDelta;
    const iTotalMin = magH * 60 + magM + iftarDelta;

    const sH = Math.floor(sTotalMin / 60);
    const sM = sTotalMin % 60;
    const iH = Math.floor(iTotalMin / 60);
    const iM = iTotalMin % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    const sehrStr = `${pad(sH)}:${pad(sM)}`;
    const iftarStr = `${pad(iH)}:${pad(iM)}`;

    const ashra = i <= 10 ? 1 : i <= 20 ? 2 : 3;
    const ashraNameUrdu =
      ashra === 1 ? 'پہلا عشرہ (رحمت)' : ashra === 2 ? 'دوسرا عشرہ (مغفرت)' : 'تیسرا عشرہ (نجات من النار)';
    const ashraNameEnglish =
      ashra === 1 ? '1st Ashra (Mercy)' : ashra === 2 ? '2nd Ashra (Forgiveness)' : '3rd Ashra (Refuge from Fire)';

    schedule.push({
      day: i,
      hijriDate: `${i} Ramadan 1446 AH`,
      ashra,
      ashraNameUrdu,
      ashraNameEnglish,
      sehrTime: sehrStr,
      iftarTime: iftarStr,
    });
  }

  return schedule;
}
