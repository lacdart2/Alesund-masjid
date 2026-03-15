
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { ANNOUNCEMENTS } from '@/lib/data'
import { AnnouncementIcon } from '@/components/ui/Icons'

export default function AnnouncementsPage() {
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
                    {t.announcements.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ANNOUNCEMENTS.map(a => (
                    <div
                        key={a.id}
                        style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: isMobile ? '16px' : '22px 24px', display: 'flex', gap: '18px', alignItems: 'flex-start', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.transform = lang === 'ar' ? 'translateX(-4px)' : 'translateX(4px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)' }}
                    >
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#22a052', background: a.colorClass === 'gold' ? 'rgba(200,169,107,0.1)' : a.colorClass === 'green' ? 'rgba(22,101,52,0.12)' : 'rgba(59,130,246,0.1)' }}>
                            <AnnouncementIcon icon={a.icon} size={22} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#22a052', marginBottom: '4px' }}>{a.tag}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8', marginBottom: '5px' }}>{a.title[lang]}</div>
                            <div style={{ fontSize: '14px', color: '#a8b8c8', lineHeight: 1.65 }}>{a.body[lang]}</div>
                            <div style={{ fontSize: '12px', color: '#607080', marginTop: '10px' }}>{a.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}