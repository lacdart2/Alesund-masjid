
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { getTodayPrayers } from '@/lib/prayer'
import PrayerGrid from '@/components/prayer/PrayerGrid'
import PrayerNotification from '@/components/ui/PrayerNotification'

export default function PrayersPage() {
    const { lang } = useLang()
    const t = translations[lang]
    const today = getTodayPrayers()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '40px 20px' : '64px 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#22a052', marginBottom: '8px' }}>
                    {t.prayers.eyebrow}
                </div>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.6px' }}>
                    {t.prayers.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <PrayerNotification />
            <PrayerGrid data={today} />

            <div style={{
                background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)',
                borderRadius: '24px', padding: isMobile ? '22px 20px' : '28px 32px',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between', gap: '16px',
                position: 'relative', overflow: 'hidden', marginTop: '8px',
            }}>
                <div style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', fontSize: '72px', color: 'rgba(22,101,52,0.05)', fontFamily: "'Noto Sans Arabic', sans-serif", pointerEvents: 'none' }}>الجمعة</div>
                <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#22a052', marginBottom: '4px' }}>{t.jumuah.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.4px', marginBottom: '3px' }}>{t.jumuah.title}</div>
                    <div style={{ fontSize: '14px', color: '#a8b8c8' }}>{t.jumuah.sub}</div>
                </div>
                <div style={{ textAlign: isMobile ? 'left' : 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: '#607080', marginBottom: '3px' }}>{t.jumuah.iqamah}</div>
                    <div style={{ fontSize: '44px', fontWeight: 700, color: '#22a052', letterSpacing: '-2px', lineHeight: 1 }}>14:30</div>
                    <div style={{ fontSize: '12px', color: '#607080', marginTop: '3px' }}>{t.jumuah.note}</div>
                </div>
            </div>
        </div>
    )
}