
import { LocalNotifications } from '@capacitor/local-notifications'
import { PRAYER_TIMES } from '@/lib/prayer'

const PRAYER_KEYS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const

const PRAYER_NAMES = {
    fajr: { no: 'Fajr', en: 'Fajr', ar: 'الفجر' },
    dhuhr: { no: 'Dhuhr', en: 'Dhuhr', ar: 'الظهر' },
    asr: { no: 'Asr', en: 'Asr', ar: 'العصر' },
    maghrib: { no: 'Maghrib', en: 'Maghrib', ar: 'المغرب' },
    isha: { no: 'Isha', en: 'Isha', ar: 'العشاء' },
}

function getOsloDateString(date: Date): string {
    return date.toLocaleDateString('en-CA', { timeZone: 'Europe/Oslo' })
}

export async function scheduleAdhanNotifications(lang: 'no' | 'en' | 'ar' = 'no') {
    try {
        const { display } = await LocalNotifications.requestPermissions()
        if (display !== 'granted') return

        const pending = await LocalNotifications.getPending()
        if (pending.notifications.length > 0) {
            await LocalNotifications.cancel({ notifications: pending.notifications })
        }

        const notifications: any[] = []
        const now = new Date()
        const todayStr = getOsloDateString(now)
        const tomorrowStr = getOsloDateString(new Date(now.getTime() + 86400000))

        const togglesRaw = localStorage.getItem('prayerToggles')
        const toggles = togglesRaw ? JSON.parse(togglesRaw) : {
            fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true
        }

        for (const dateStr of [todayStr, tomorrowStr]) {
            const dayData = PRAYER_TIMES.find(p => p.date === dateStr)
            if (!dayData) continue

            for (const key of PRAYER_KEYS) {
                if (!toggles[key]) continue

                const time = dayData[key]
                const scheduleDate = new Date(`${dateStr}T${time}:00+01:00`)
                if (scheduleDate <= now) continue

                const prayerName = PRAYER_NAMES[key][lang]
                const dateNum = parseInt(dateStr.replace(/-/g, ''))
                const prayerIndex = PRAYER_KEYS.indexOf(key)
                const id = dateNum * 10 + prayerIndex

                notifications.push({
                    id,
                    title: `🕌 ${prayerName}`,
                    body: lang === 'ar'
                        ? `حان وقت ${prayerName} — ${time}`
                        : lang === 'no'
                            ? `Tid for ${prayerName} — ${time}`
                            : `Time for ${prayerName} — ${time}`,
                    schedule: { at: scheduleDate, allowWhileIdle: true },

                    // ✅ sound handled by channel in MainActivity.java
                    smallIcon: 'ic_stat_mosque',
                    channelId: 'adhan',
                })
            }
        }

        if (notifications.length > 0) {
            await LocalNotifications.schedule({ notifications })
            console.log(`Scheduled ${notifications.length} adhan notifications`)
        }
    } catch (err) {
        console.error('scheduleAdhanNotifications error:', err)
    }
}

export async function cancelAdhanNotifications() {
    try {
        const pending = await LocalNotifications.getPending()
        if (pending.notifications.length > 0) {
            await LocalNotifications.cancel({ notifications: pending.notifications })
        }
    } catch (err) {
        console.error('cancelAdhanNotifications error:', err)
    }
}