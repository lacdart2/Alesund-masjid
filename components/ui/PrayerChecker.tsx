'use client'

import { useEffect, useRef } from 'react'
import { getTodayPrayers } from '@/lib/prayer'

interface PrayerCheckerProps {
    onPrayerTime: (prayerKey: string, time: string) => void
}

export default function PrayerChecker({ onPrayerTime }: PrayerCheckerProps) {
    const firedRef = useRef<Set<string>>(new Set())
    const enabledRef = useRef<boolean>(false)

    // Read enabled state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('prayerNotifications')
        enabledRef.current = saved === 'true'

        // Listen for changes (user enables/disables on prayers page)
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'prayerNotifications') {
                enabledRef.current = e.newValue === 'true'
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    // Reset fired prayers at midnight
    useEffect(() => {
        const resetAtMidnight = () => {
            const now = new Date()
            const msUntilMidnight =
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime()
            setTimeout(() => {
                firedRef.current.clear()
                resetAtMidnight()
            }, msUntilMidnight)
        }
        resetAtMidnight()
    }, [])

    useEffect(() => {
        const check = () => {
            // ✅ Only fire if user has enabled notifications
            if (!enabledRef.current) return

            const now = new Date()
            const hours = now.getHours().toString().padStart(2, '0')
            const mins = now.getMinutes().toString().padStart(2, '0')
            const currentTime = `${hours}:${mins}`

            const today = getTodayPrayers()
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const

            prayers.forEach(key => {
                const prayerTime = today[key]
                const fireKey = `${prayerTime}-${key}`

                if (prayerTime === currentTime && !firedRef.current.has(fireKey)) {
                    firedRef.current.add(fireKey)
                    // ✅ Notify parent (page.tsx) to show banner + play adhan
                    onPrayerTime(key, prayerTime)
                }
            })
        }

        check()
        const interval = setInterval(check, 10000)
        return () => clearInterval(interval)
    }, [onPrayerTime])

    // No UI — invisible component
    return null
}