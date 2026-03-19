import { Announcement, MasjidEvent } from '@/types'

export const ANNOUNCEMENTS: Announcement[] = [
    {
        id: '0',
        icon: 'moon-stars',
        colorClass: 'gold',
        tag: 'Eid Al-Fitr',
        title: {
            no: '🌙 Eid Al-Fitr — Fredag 20. Mars 2026',
            en: '🌙 Eid Al-Fitr — Friday March 20, 2026',
            ar: '🌙 عيد الفطر — الجمعة 20 مارس 2026',
        },
        body: {
            no: 'Tekbirat kl. 09:30 · Eid-bønn kl. 10:00 · Herd Hallen i Moa, Vestmoa 21, 6018 Ålesund. Det blir servert kake og saft. Aktiviteter for barna. Ta gjerne med mat eller søtsaker 😊 Zakat Al-Fitr betales FØR Eid-bønnen.',
            en: 'Takbeer at 09:30 · Eid prayer at 10:00 · Herd Hallen i Moa, Vestmoa 21, 6018 Ålesund. Cake and juice will be served. Activities for children. Feel free to bring food or sweets 😊 Zakat Al-Fitr must be paid BEFORE the Eid prayer.',
            ar: 'التكبيرات الساعة 09:30 · صلاة العيد الساعة 10:00 · Herd Hallen i Moa، Vestmoa 21، 6018 Ålesund. ستُقدَّم الكعك والعصير. أنشطة للأطفال. يُرحَّب بإحضار الطعام أو الحلوى 😊 يجب دفع زكاة الفطر قبل صلاة العيد.',
        },
        date: '20 mars 2026',
        mapUrl: 'https://maps.google.com/?q=Vestmoa+21,+6018+%C3%85lesund',
    },
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
    }
]

export const EVENTS: MasjidEvent[] = [
    // Mar 20 first — Eid is the main event
    {
        id: '2',
        day: '20', month: 'Mar', year: 2026,
        type: { no: 'Eid Al-Fitr', en: 'Eid Al-Fitr', ar: 'عيد الفطر' },
        name: { no: 'Eid Al-Fitr 1447 🎉', en: 'Eid Al-Fitr 1447 🎉', ar: 'عيد الفطر 1447 🎉' },
        time: 'Tekbirat 09:30 · Bønn 10:00',
        location: 'Herd Hallen i Moa',
    },
    {
        id: '3',
        day: '20', month: 'Mar', year: 2026,
        type: { no: 'Eid-bønn', en: 'Eid Prayer', ar: 'صلاة العيد' },
        name: { no: 'Eid Al-Fitr bønn 1447', en: 'Eid Al-Fitr Prayer 1447', ar: 'صلاة عيد الفطر 1447' },
        time: '10:00',
        location: 'Herd Hallen i Moa',
    },
    {
        id: '1',
        day: '19', month: 'Mar', year: 2026,
        type: { no: 'Ramadan', en: 'Ramadan', ar: 'رمضان' },
        name: { no: 'Siste dag av Ramadan', en: 'Last Day of Ramadan', ar: 'آخر يوم من رمضان' },
        time: '—',
        location: 'Ålesund Masjid',
    },
]

const MONTH_MAP: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
}

export function getUpcomingEvents(): MasjidEvent[] {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return EVENTS.filter(ev => {
        const year = ev.year ?? now.getFullYear()
        const month = MONTH_MAP[ev.month] ?? 0
        const eventDate = new Date(year, month, parseInt(ev.day))
        return eventDate >= today
    })
}