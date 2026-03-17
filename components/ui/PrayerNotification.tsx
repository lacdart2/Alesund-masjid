
'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/lib/context'
import { getTodayPrayers } from '@/lib/prayer'
import { IconBell, IconBellOff, IconX, IconMosque } from '@/components/ui/Icons'

const labels = {
    no: {
        enable: 'Aktiver bønnevarsler',
        enabled: 'Varsler aktivert',
        denied: 'Varsler blokkert',
        prayerTime: (name: string) => `Tid for ${name}`,
        body: 'Måtte Allah akseptere din bønn',
        stop: 'Stopp',
        dua: 'Måtte Allah akseptere din bønn 🤲',
    },
    en: {
        enable: 'Enable prayer alerts',
        enabled: 'Alerts enabled',
        denied: 'Notifications blocked',
        prayerTime: (name: string) => `Time for ${name}`,
        body: 'May Allah accept your prayer',
        stop: 'Stop',
        dua: 'May Allah accept your prayer 🤲',
    },
    ar: {
        enable: 'تفعيل تنبيهات الصلاة',
        enabled: 'التنبيهات مفعّلة',
        denied: 'التنبيهات محظورة',
        prayerTime: (name: string) => `حان وقت ${name}`,
        body: 'تقبل الله صلاتك',
        stop: 'إيقاف',
        dua: 'تقبل الله صلاتك 🤲',
    },
}

export default function PrayerNotification() {
    const { lang } = useLang()
    const [permission, setPermission] = useState<NotificationPermission>('default')
    const [enabled, setEnabled] = useState(false)
    const [banner, setBanner] = useState<{ prayerKey: string; time: string } | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const firedRef = useRef<Set<string>>(new Set())
    const bannerTimerRef = useRef<NodeJS.Timeout | null>(null)
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
                    triggerNotification(key, prayerTime)
                }
            })
        }

        check()
        const interval = setInterval(check, 10000)
        return () => clearInterval(interval)
    }, [enabled, lang])

    // Auto dismiss banner after 60 seconds
    useEffect(() => {
        if (banner) {
            if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
            bannerTimerRef.current = setTimeout(() => {
                stopAdhan()
            }, 60000)
        }
        return () => {
            if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
        }
    }, [banner])

    const triggerNotification = (prayerKey: string, prayerTime: string) => {
        // Play adhan
        if (!audioRef.current) {
            audioRef.current = new Audio('/adhan.mp3')
        }
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => { })

        // Show in-app banner
        setBanner({ prayerKey, time: prayerTime })

        // OS push notification
        if (Notification.permission === 'granted') {
            new Notification(l.prayerTime(prayerKey), {
                body: l.body,
                icon: '/web-app-manifest-192.png',
            })
        }
    }

    const stopAdhan = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        setBanner(null)
        if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
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
        stopAdhan()
    }

    if (typeof Notification === 'undefined') return null

    return (
        <>
            {/* Adhan Banner */}
            {banner && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 4000,
                    width: 'calc(100% - 32px)',
                    maxWidth: '420px',
                    background: 'linear-gradient(135deg, #0e5027, #166534)',
                    border: '1px solid rgba(34,160,82,0.4)',
                    borderRadius: '20px',
                    padding: '18px 20px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,160,82,0.2)',
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                    animation: 'slideDown 0.4s ease',
                }}>
                    <style>{`
                        @keyframes slideDown {
                            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                            to { opacity: 1; transform: translateX(-50%) translateY(0); }
                        }
                    `}</style>

                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                <IconMosque size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                                    {l.prayerTime(banner.prayerKey)}
                                </div>
                                <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1 }}>
                                    {banner.time}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={stopAdhan}
                            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}
                        >
                            <IconX size={18} />
                        </button>
                    </div>

                    {/* Dua */}
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px', fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : 'inherit' }}>
                        {l.dua}
                    </div>

                    {/* Stop button */}
                    <button
                        onClick={stopAdhan}
                        style={{
                            width: '100%', padding: '11px', borderRadius: '12px',
                            background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: '#fff', fontSize: '14px', fontWeight: 700,
                            cursor: 'pointer', transition: 'all 0.2s',
                            letterSpacing: '-0.2px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                    >
                        {l.stop} ■
                    </button>
                </div>
            )}

            {/* Enable/Disable button */}
            {permission === 'denied' ? (
                <div style={{ fontSize: '12px', color: '#607080', textAlign: 'center', padding: '8px' }}>
                    {l.denied}
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                    <audio ref={audioRef} src="/adhan.mp3" preload="none" />
                    <button
                        onClick={enabled ? handleDisable : handleEnable}
                        style={{
                            background: enabled ? 'rgba(22,101,52,0.15)' : 'linear-gradient(135deg, #166534, #1a7a40)',
                            color: enabled ? '#22a052' : '#fff',
                            border: enabled ? '1px solid rgba(22,101,52,0.4)' : 'none',
                            borderRadius: '14px', padding: '14px 28px',
                            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: enabled ? 'none' : '0 4px 20px rgba(22,101,52,0.35)',
                        }}
                    >
                        {enabled ? <IconBellOff size={20} /> : <IconBell size={20} />}
                        {enabled ? l.enabled : l.enable}
                    </button>
                </div>
            )}
        </>
    )
}