import { Announcement, MasjidEvent } from '@/types'

export const ANNOUNCEMENTS: Announcement[] = [
    {
        id: '1',
        icon: 'moon-stars',
        colorClass: 'gold',
        tag: 'Ramadan',
        title: {
            no: 'Ramadan 2026 — Konto & Vipps',
            en: 'Ramadan 2026 — Bank & Vipps',
            ar: 'رمضان 2026 — الحساب والفيبس',
        },
        body: {
            no: 'Konto nr. 6550.05.90771 · Vipps: 553705. Fredagsbønn kl. 14:30 hele Ramadan. Zakat Al-fitr betales senest før Eid-bønn. Stopp matinntak 10 min før Fajr.',
            en: 'Account: 6550.05.90771 · Vipps: 553705. Friday prayer 14:30 all Ramadan. Zakat Al-fitr before Eid prayer. Stop eating 10 min before Fajr.',
            ar: 'حساب: 6550.05.90771 · فيبس: 553705. صلاة الجمعة 14:30 طوال رمضان. زكاة الفطر قبل صلاة العيد.',
        },
        date: 'Februar 2026',
    },
    {
        id: '2',
        icon: 'book',
        colorClass: 'green',
        tag: 'Utdanning',
        title: {
            no: 'Korankurs — Ny Sesjon',
            en: 'Quran Classes — New Session',
            ar: 'فصول القرآن — دورة جديدة',
        },
        body: {
            no: 'Påmelding åpen for vårens Koranresitasjonskurs for voksne og barn. Begrenset antall plasser.',
            en: 'Registration open for the spring Quran recitation course for adults and children.',
            ar: 'التسجيل مفتوح لدورة تلاوة القرآن الربيعية للكبار والأطفال.',
        },
        date: 'Mars 2026',
    },
    {
        id: '3',
        icon: 'tool',
        colorClass: 'blue',
        tag: 'Melding',
        title: {
            no: 'Vedlikehold av wudu-fasiliteter',
            en: 'Wudu Facilities Maintenance',
            ar: 'صيانة مرافق الوضوء',
        },
        body: {
            no: 'Wudu-rommet stenges midlertidig lørdag morgen for vedlikehold. Takk for forståelsen.',
            en: 'The wudu area will be briefly closed Saturday morning for maintenance.',
            ar: 'سيتم إغلاق منطقة الوضوء مؤقتاً للصيانة صباح السبت.',
        },
        date: '5 mars 2026',
    },
]

export const EVENTS: MasjidEvent[] = [
    {
        id: '1',
        day: '20', month: 'Mar',
        type: { no: 'Ramadan', en: 'Ramadan', ar: 'رمضان' },
        name: { no: 'Siste Ramadan-dag (tentativt)', en: 'Last Day of Ramadan (tentative)', ar: 'آخر يوم من رمضان' },
        time: '—',
        location: 'Ålesund Masjid',
    },
    {
        id: '2',
        day: '21', month: 'Mar',
        type: { no: 'Eid', en: 'Eid', ar: 'عيد' },
        name: { no: 'Eid Al-Fitr 1447', en: 'Eid Al-Fitr 1447', ar: 'عيد الفطر 1447' },
        time: '08:00',
        location: 'Ålesund Masjid',
    },
    {
        id: '3',
        day: '28', month: 'Mar',
        type: { no: 'Fellesskap', en: 'Community', ar: 'مجتمع' },
        name: { no: 'Fellesskapets iftaar-middag', en: 'Community Iftaar Dinner', ar: 'عشاء إفطار المجتمع' },
        time: '18:30',
        location: 'Fellesskapsrom',
    },
]