'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/lib/context'
import { getTodayPrayers } from '@/lib/prayer'
import { IconBell, IconBellOff } from '@/components/ui/Icons'

const labels = {
    no: {
        enable: 'Aktiver bønnevarsler',
        enabled: 'Varsler aktivert',
        denied: 'Varsler blokkert',
        prayerTime: (name: string) => `Tid for ${name}`,
        body: 'Måtte Allah akseptere din bønn',
    },
    en: {
        enable: 'Enable prayer alerts',
        enabled: 'Alerts enabled',
        denied: 'Notifications blocked',
        prayerTime: (name: string) => `Time for ${name}`,
        body: 'May Allah accept your prayer',
    },
    ar: {
        enable: 'تفعيل تنبيهات الصلاة',
        enabled: 'التنبيهات مفعّلة',
        denied: 'التنبيهات محظورة',
        prayerTime: (name: string) => `حان وقت ${name}`,
        body: 'تقبل الله صلاتك',
    },
}

export default function PrayerNotification() {
    const { lang } = useLang()
    const [permission, setPermission] = useState<NotificationPermission>('default')
    const [enabled, setEnabled] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const firedRef = useRef<Set<string>>(new Set())
    const l = labels[lang]

    useEffect(() => {
        if (typeof Notification !== 'undefined') {
            setPermission(Notification.permission)
        }
        const saved = localStorage.getItem('prayerNotifications')
        if (saved === 'true') setEnabled(true)
    }, [])

    useEffect(() => {
        if (!enabled) return

        const check = () => {
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
                    triggerNotification(key)
                }
            })
        }

        check()
        const interval = setInterval(check, 10000)
        return () => clearInterval(interval)
    }, [enabled, lang])

    const triggerNotification = (prayerKey: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/adhan.mp3')
        }
        audioRef.current.play().catch(() => { })

        if (Notification.permission === 'granted') {
            new Notification(l.prayerTime(prayerKey), {
                body: l.body,
                icon: '/web-app-manifest-192.png',
            })
        }
    }

    const handleEnable = async () => {
        const result = await Notification.requestPermission()
        setPermission(result)
        if (result === 'granted') {
            setEnabled(true)
            localStorage.setItem('prayerNotifications', 'true')
        }
    }

    const handleDisable = () => {
        setEnabled(false)
        localStorage.setItem('prayerNotifications', 'false')
        firedRef.current.clear()
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current = null
        }
    }

    if (typeof Notification === 'undefined') return null
    if (permission === 'denied') return (
        <div style={{ fontSize: '12px', color: '#607080', textAlign: 'center', padding: '8px' }}>
            {l.denied}
        </div>
    )

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <audio ref={audioRef} src="/adhan.mp3" preload="none" />
            <button
                onClick={enabled ? handleDisable : handleEnable}
                style={{
                    background: enabled
                        ? 'rgba(22,101,52,0.15)'
                        : 'linear-gradient(135deg, #166534, #1a7a40)',
                    color: enabled ? '#22a052' : '#fff',
                    border: enabled ? '1px solid rgba(22,101,52,0.4)' : 'none',
                    borderRadius: '14px',
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: enabled ? 'none' : '0 4px 20px rgba(22,101,52,0.35)',
                }}
            >
                {enabled ? <IconBellOff size={20} /> : <IconBell size={20} />}
                {enabled ? l.enabled : l.enable}
            </button>
        </div>
    )
}