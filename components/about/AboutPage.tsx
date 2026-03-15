
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'

export default function AboutPage() {
    const { lang } = useLang()
    const t = translations[lang]
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
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.6px' }}>
                    {t.about.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '48px', alignItems: 'center' }}>
                <div>
                    <p style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.85, marginBottom: '14px' }}>{t.about.p1}</p>
                    <p style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.85, marginBottom: '14px' }}>{t.about.p2}</p>
                    <p style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.85 }}>{t.about.p3}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '28px' }}>
                        {[
                            { number: '5', label: t.about.s1 },
                            { number: '7×', label: t.about.s2 },
                            { number: '4.6★', label: t.about.s3 },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
                                <div style={{ fontSize: '26px', fontWeight: 800, color: '#22a052', letterSpacing: '-1px' }}>{stat.number}</div>
                                <div style={{ fontSize: '11px', color: '#607080', marginTop: '4px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px' }}>
                    <img src="/logo.png" alt="Ålesund Masjid" style={{ width: '150px', height: '150px', objectFit: 'contain', opacity: 0.8 }} />
                    <div style={{ fontFamily: "'Noto Sans Arabic', sans-serif", fontSize: '17px', color: '#22a052', opacity: 0.7, letterSpacing: '2px' }}>
                        بسم الله الرحمن الرحيم
                    </div>
                </div>
            </div>
        </div>
    )
}