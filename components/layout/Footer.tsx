
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { getTodayPrayers } from '@/lib/prayer'
import { PageKey } from '@/app/page'

interface FooterProps {
    navigate: (page: PageKey) => void
}

export default function Footer({ navigate }: FooterProps) {
    const { lang } = useLang()
    const t = translations[lang]
    const today = getTodayPrayers()
    const prayerKeys = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <footer style={{
            background: '#111e2d',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: isMobile ? '40px 20px 24px' : '44px 40px 24px',
        }}>
            <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

                {/* Top grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
                    gap: isMobile ? '28px' : '36px',
                    marginBottom: '32px',
                }}>
                    {/* Brand — full width on mobile */}
                    <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '11px' }}>
                            <img src="/logo.png" alt="logo" style={{ width: '52px', height: '52px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(22,101,52,0.3))' }} />
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8' }}>Ålesund Masjid</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#607080', lineHeight: 1.7, maxWidth: '210px' }}>
                            {t.footer.desc}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '13px' }}>
                            {t.footer.navigation}
                        </div>
                        {(['home', 'prayers', 'announcements', 'events'] as PageKey[]).map(key => (
                            <button
                                key={key}
                                onClick={() => navigate(key)}
                                style={{ display: 'block', fontSize: '13px', color: '#a8b8c8', marginBottom: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#22a052'}
                                onMouseLeave={e => e.currentTarget.style.color = '#a8b8c8'}
                            >
                                {t.nav[key as keyof typeof t.nav] ?? key}
                            </button>
                        ))}
                    </div>

                    {/* More */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '13px' }}>
                            {t.footer.more}
                        </div>
                        {(['about', 'donate', 'contact'] as PageKey[]).map(key => (
                            <button
                                key={key}
                                onClick={() => navigate(key)}
                                style={{ display: 'block', fontSize: '13px', color: '#a8b8c8', marginBottom: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#22a052'}
                                onMouseLeave={e => e.currentTarget.style.color = '#a8b8c8'}
                            >
                                {t.nav[key as keyof typeof t.nav] ?? key}
                            </button>
                        ))}
                    </div>

                    {/* Today's prayers */}
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '13px' }}>
                            {t.footer.prayersToday}
                        </div>
                        {prayerKeys.map(k => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                                <span style={{ fontSize: '12px', color: '#607080' }}>{t.prayers.names[k]}</span>
                                <span style={{ fontSize: '12px', color: '#a8b8c8', fontWeight: 600 }}>{today[k]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '18px' }} />

                {/* Bottom */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#607080' }}>
                        © 2026 <span style={{ color: '#22a052' }}>Ålesund Masjid</span>. {t.footer.copy}
                    </span>
                    <span style={{ fontSize: '12px', color: '#607080' }}>Ålesund, Norge 🇳🇴</span>
                </div>
            </div>
        </footer>
    )
}