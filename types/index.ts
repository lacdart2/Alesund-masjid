export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
export type Lang = 'no' | 'en' | 'ar'

export type PrayerTime = {
    id?: string
    date: string
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
}

export type Announcement = {
    id: string
    icon: string
    colorClass: 'gold' | 'green' | 'blue'
    tag: string
    title: Record<Lang, string>
    body: Record<Lang, string>
    date: string
}

export type MasjidEvent = {
    id: string
    day: string
    month: string
    type: Record<Lang, string>
    name: Record<Lang, string>
    time: string
    location: string
    tentative?: boolean
    tentativeNote?: Record<Lang, string>
}