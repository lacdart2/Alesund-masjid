'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { getUpcomingEvents } from '@/lib/data'
import { IconClock, IconMapPin } from '@/components/ui/Icons'

export default function EventsPage() {
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
                    {t.events.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {getUpcomingEvents().map(ev => (
                    <div
                        key={ev.id}
                        style={{
                            background: '#111e2d',
                            border: `1px solid ${ev.tentative ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.06)'}`,
                            borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = ev.tentative ? 'rgba(234,179,8,0.4)' : 'rgba(22,101,52,0.28)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = ev.tentative ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        {/* Card header */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(22,101,52,0.1), rgba(22,101,52,0.03))', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '22px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, color: '#22a052', lineHeight: 1, letterSpacing: '-1px' }}>{ev.day}</div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#607080', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ev.month}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#22a052', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', padding: '5px 12px', borderRadius: '20px' }}>
                                    {ev.type[lang]}
                                </span>
                                {/* Tentative badge */}
                                {ev.tentative && (
                                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#eab308', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)', padding: '4px 10px', borderRadius: '20px' }}>
                                        {lang === 'ar' ? 'غير مؤكد' : lang === 'no' ? 'Tentativt' : 'Tentative'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: '18px 24px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px' }}>{ev.name[lang]}</div>
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '13px', color: '#a8b8c8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <IconClock size={14} /> {ev.time || '—'}
                                </span>
                                <span style={{ fontSize: '13px', color: '#a8b8c8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <IconMapPin size={14} /> {ev.location}
                                </span>
                            </div>
                            {/* Tentative note */}
                            {ev.tentative && ev.tentativeNote && (
                                <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.15)', borderRadius: '10px', fontSize: '12px', color: '#eab308' }}>
                                    ⚠️ {ev.tentativeNote[lang]}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}