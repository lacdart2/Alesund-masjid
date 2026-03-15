'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { EVENTS } from '@/lib/data'
import { IconClock, IconMapPin } from '@/components/ui/Icons'

export default function EventsPage() {
    const { lang } = useLang()
    const t = translations[lang]
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const cols = mounted && isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))'
    const pad = mounted && isMobile ? '40px 20px' : '64px 40px'

    return (
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: pad }}>

            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.6px' }}>
                    {t.events.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '16px' }}>
                {EVENTS.map(ev => (
                    <div
                        key={ev.id}
                        style={{
                            background: '#111e2d',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        {/* Card top — date + badge */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(22,101,52,0.1), rgba(22,101,52,0.03))',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            padding: '22px 24px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 800, color: '#22a052', lineHeight: 1, letterSpacing: '-1px' }}>
                                    {ev.day}
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#607080', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {ev.month}
                                </div>
                            </div>
                            <span style={{
                                fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px',
                                textTransform: 'uppercase', color: '#22a052',
                                background: 'rgba(22,101,52,0.14)',
                                border: '1px solid rgba(22,101,52,0.28)',
                                padding: '5px 12px', borderRadius: '20px',
                            }}>
                                {ev.type[lang]}
                            </span>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: '18px 24px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px' }}>
                                {ev.name[lang]}
                            </div>
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '13px', color: '#a8b8c8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <IconClock size={14} /> {ev.time || '—'}
                                </span>
                                <span style={{ fontSize: '13px', color: '#a8b8c8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <IconMapPin size={14} /> {ev.location}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}