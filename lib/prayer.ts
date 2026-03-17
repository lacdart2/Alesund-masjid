import { PrayerTime, PrayerKey } from '@/types'

export const PRAYER_TIMES: Omit<PrayerTime, 'id'>[] = [
    { date: '2026-02-18', fajr: '06:43', sunrise: '08:14', dhuhr: '12:49', asr: '14:49', maghrib: '17:26', isha: '18:56' },
    { date: '2026-02-19', fajr: '06:40', sunrise: '08:10', dhuhr: '12:49', asr: '14:51', maghrib: '17:29', isha: '18:58' },
    { date: '2026-02-20', fajr: '06:37', sunrise: '08:07', dhuhr: '12:49', asr: '14:54', maghrib: '17:32', isha: '19:01' },
    { date: '2026-02-21', fajr: '06:34', sunrise: '08:04', dhuhr: '12:49', asr: '14:56', maghrib: '17:35', isha: '19:04' },
    { date: '2026-02-22', fajr: '06:31', sunrise: '08:01', dhuhr: '12:49', asr: '14:58', maghrib: '17:38', isha: '19:07' },
    { date: '2026-02-23', fajr: '06:28', sunrise: '07:58', dhuhr: '12:49', asr: '15:00', maghrib: '17:41', isha: '19:10' },
    { date: '2026-02-24', fajr: '06:25', sunrise: '07:55', dhuhr: '12:49', asr: '15:02', maghrib: '17:44', isha: '19:13' },
    { date: '2026-02-25', fajr: '06:22', sunrise: '07:52', dhuhr: '12:49', asr: '15:04', maghrib: '17:46', isha: '19:16' },
    { date: '2026-02-26', fajr: '06:19', sunrise: '07:48', dhuhr: '12:48', asr: '15:06', maghrib: '17:49', isha: '19:19' },
    { date: '2026-02-27', fajr: '06:16', sunrise: '07:45', dhuhr: '12:48', asr: '15:08', maghrib: '17:52', isha: '19:22' },
    { date: '2026-02-28', fajr: '06:13', sunrise: '07:42', dhuhr: '12:48', asr: '15:10', maghrib: '17:55', isha: '19:25' },
    { date: '2026-03-01', fajr: '06:10', sunrise: '07:39', dhuhr: '12:48', asr: '15:12', maghrib: '17:58', isha: '19:29' },
    { date: '2026-03-02', fajr: '06:07', sunrise: '07:36', dhuhr: '12:48', asr: '15:14', maghrib: '18:01', isha: '19:30' },
    { date: '2026-03-03', fajr: '06:03', sunrise: '07:32', dhuhr: '12:47', asr: '15:16', maghrib: '18:04', isha: '19:32' },
    { date: '2026-03-04', fajr: '06:00', sunrise: '07:29', dhuhr: '12:47', asr: '15:18', maghrib: '18:06', isha: '19:34' },
    { date: '2026-03-05', fajr: '05:56', sunrise: '07:26', dhuhr: '12:47', asr: '15:20', maghrib: '18:09', isha: '19:36' },
    { date: '2026-03-06', fajr: '05:53', sunrise: '07:23', dhuhr: '12:47', asr: '15:22', maghrib: '18:12', isha: '19:39' },
    { date: '2026-03-07', fajr: '05:49', sunrise: '07:19', dhuhr: '12:47', asr: '15:24', maghrib: '18:15', isha: '19:41' },
    { date: '2026-03-08', fajr: '05:46', sunrise: '07:16', dhuhr: '12:46', asr: '15:26', maghrib: '18:18', isha: '19:42' },
    { date: '2026-03-09', fajr: '05:42', sunrise: '07:13', dhuhr: '12:46', asr: '15:28', maghrib: '18:20', isha: '19:44' },
    { date: '2026-03-10', fajr: '05:38', sunrise: '07:09', dhuhr: '12:46', asr: '15:32', maghrib: '18:23', isha: '19:46' },
    { date: '2026-03-11', fajr: '05:35', sunrise: '07:06', dhuhr: '12:46', asr: '15:34', maghrib: '18:26', isha: '19:49' },
    { date: '2026-03-12', fajr: '05:31', sunrise: '07:03', dhuhr: '12:45', asr: '15:36', maghrib: '18:29', isha: '19:51' },
    { date: '2026-03-13', fajr: '05:27', sunrise: '07:00', dhuhr: '12:45', asr: '15:37', maghrib: '18:32', isha: '19:53' },
    { date: '2026-03-14', fajr: '05:23', sunrise: '06:56', dhuhr: '12:45', asr: '15:39', maghrib: '18:34', isha: '19:55' },
    { date: '2026-03-15', fajr: '05:19', sunrise: '06:53', dhuhr: '12:44', asr: '15:41', maghrib: '18:37', isha: '19:57' },
    { date: '2026-03-16', fajr: '05:15', sunrise: '06:50', dhuhr: '12:44', asr: '15:43', maghrib: '18:40', isha: '20:00' },
    { date: '2026-03-17', fajr: '05:11', sunrise: '06:46', dhuhr: '12:44', asr: '15:45', maghrib: '18:43', isha: '23:59' },
    { date: '2026-03-18', fajr: '05:07', sunrise: '06:43', dhuhr: '12:44', asr: '15:47', maghrib: '18:45', isha: '20:06' },
    { date: '2026-03-19', fajr: '05:03', sunrise: '06:40', dhuhr: '12:43', asr: '15:49', maghrib: '18:48', isha: '20:08' },
    { date: '2026-03-20', fajr: '05:00', sunrise: '06:36', dhuhr: '12:43', asr: '15:50', maghrib: '18:51', isha: '20:10' },
]


function getLocalDateString(): string {
    // Use Norway timezone explicitly — works correctly after midnight
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Oslo' })
    // en-CA gives us YYYY-MM-DD format natively
}

export function getTodayPrayers(): Omit<PrayerTime, 'id'> {
    const today = getLocalDateString()
    return PRAYER_TIMES.find(p => p.date === today) ?? PRAYER_TIMES[PRAYER_TIMES.length - 1]
}
export function toMinutes(time: string): number {
    if (!time || time === '--:--') return 9999
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

const IQAMA_MINUTES = 10

export function getNextPrayer(data: Omit<PrayerTime, 'id'>): { key: PrayerKey; time: string; isNow?: boolean } {
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    const keys: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

    // Check if we're inside any prayer's 10 min window
    for (const key of keys) {
        const prayerMin = toMinutes(data[key])
        if (current >= prayerMin && current < prayerMin + IQAMA_MINUTES) {
            // ✅ We're in the "Now" window for this prayer
            return { key, time: data[key], isNow: true }
        }
    }

    // Special case: after Fajr iqama window → show Shurooq as next
    const fajrEnd = toMinutes(data.fajr) + IQAMA_MINUTES
    const sunriseMin = toMinutes(data.sunrise)
    if (current >= fajrEnd && current < sunriseMin) {
        return { key: 'sunrise', time: data.sunrise }
    }

    // Normal case: find next upcoming prayer
    const found = keys.find(k => toMinutes(data[k]) > current)
    const key = found ?? keys[0]
    return { key, time: data[key] }
}
export function formatCountdown(targetTime: string): string {
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    let diff = toMinutes(targetTime) - current
    if (diff < 0) diff += 24 * 60
    const h = Math.floor(diff / 60)
    const m = diff % 60
    const s = 59 - now.getSeconds()
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}