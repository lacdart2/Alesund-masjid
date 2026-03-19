'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { IconMapPin } from '@/components/ui/Icons'

export default function EidBanner() {
    const now = new Date()
    const start = new Date(2026, 2, 19)
    const end = new Date(2026, 2, 21, 23, 59)
    const { lang } = useLang()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    if (now < start || now > end) return null

    const labels = {
        no: { date: 'Fredag 20. Mars 2026', times: 'Tekbirat 09:30 · Bønn 10:00', address: 'Vestmoa 21, 6018 Ålesund — Herd Hallen i Moa', btn: 'Veibeskrivelse' },
        en: { date: 'Friday March 20, 2026', times: 'Takbeer 09:30 · Prayer 10:00', address: 'Vestmoa 21, 6018 Ålesund — Herd Hallen i Moa', btn: 'Get Directions' },
        ar: { date: 'الجمعة 20 مارس 2026', times: 'التكبيرات 09:30 · صلاة العيد 10:00', address: 'Vestmoa 21، 6018 Ålesund — Herd Hallen i Moa', btn: 'الاتجاهات' },
    }
    const l = labels[lang]

    return (
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 20px 32px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(234,179,8,0.25)', boxShadow: '0 8px 40px rgba(234,179,8,0.08)', position: 'relative' }}>
                <img
                    src="/images/id-fitr-congrats.png"
                    alt="عيد فطر مبارك — Ålesund Masjid"
                    style={{ width: '100%', display: 'block', maxHeight: isMobile ? '480px' : '500px', objectFit: isMobile ? 'cover' : 'contain', objectPosition: 'center', background: '#0a1628' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)', padding: '24px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <div style={{ background: isMobile ? 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)' : undefined, borderRadius: '10px', padding: isMobile ? '8px 12px' : '0' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#eab308', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {l.date}
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                            {l.times}
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '3px' }}>
                            {l.address}
                        </div>
                    </div>
                    <a href="https://maps.google.com/?q=Vestmoa+21,+6018+%C3%85lesund"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: '#eab308', color: '#000', fontSize: '13px', fontWeight: 700, padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <IconMapPin size={16} />
                        {l.btn}
                    </a>
                </div>
            </div>
        </div>
    )
}
