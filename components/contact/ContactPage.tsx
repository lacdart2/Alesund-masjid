
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconMapPin, IconBuilding, IconClock, IconMap, IconMail, IconPhone, IconWhatsapp } from '@/components/ui/Icons'

export default function ContactPage() {
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
                    {t.contact.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div
                    style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '26px' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#22a052', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <IconMapPin size={16} /> {t.contact.findUs}
                    </div>
                    {[
                        { icon: <IconBuilding size={15} />, text: 'Ålesund Jamii Islamic Center' },
                        { icon: <IconMapPin size={15} />, text: t.contact.address },
                        { icon: <IconClock size={15} />, text: t.contact.hours },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#162538', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22a052', flexShrink: 0 }}>
                                {row.icon}
                            </div>
                            <span style={{ fontSize: '13.5px', color: '#a8b8c8' }}>{row.text}</span>
                        </div>
                    ))}
                    <a href="https://maps.google.com/?q=Latinskolegata+1,+6004+Ålesund" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', background: '#162538', border: '1px dashed rgba(22,101,52,0.28)', borderRadius: '10px', height: '112px', marginTop: '14px', fontSize: '13px', fontWeight: 600, color: '#22a052', textDecoration: 'none' }}>
                        <IconMap size={16} /> {t.contact.openMap}
                    </a>
                </div>

                <div
                    style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '26px' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#22a052', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <IconMail size={16} /> {t.contact.getInTouch}
                    </div>
                    {[
                        { icon: <IconBuilding size={15} />, text: 'Ålesund Jamii Islamic Center' },
                        { icon: <IconPhone size={15} />, text: t.contact.phone },
                        { icon: <IconWhatsapp size={15} />, text: t.contact.whatsapp },
                        { icon: <IconMail size={15} />, text: t.contact.email },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#162538', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22a052', flexShrink: 0 }}>
                                {row.icon}
                            </div>
                            <span style={{ fontSize: '13.5px', color: '#a8b8c8' }}>{row.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}