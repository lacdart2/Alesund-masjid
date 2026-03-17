/* 
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconHeart } from '@/components/ui/Icons'

export default function DonatePage() {
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
                    {t.donate.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '24px', padding: isMobile ? '28px 20px' : '48px', maxWidth: '680px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.08), transparent)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: 'rgba(22,101,52,0.14)', borderRadius: '14px', marginBottom: '20px', color: '#22a052' }}>
                    <IconHeart size={26} />
                </div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px', letterSpacing: '-0.4px' }}>{t.donate.title}</div>
                <div style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.75, marginBottom: '32px' }}>{t.donate.sub}</div>

                <div style={{ background: '#162538', border: '1px solid rgba(22,101,52,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>Betalingsinfo</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#607080' }}>Kontonummer</span>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.5px' }}>6550.05.90771</span>
                        </div>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#607080' }}>Vipps</span>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.5px' }}>553705</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {[
                        { label: t.donate.bank, primary: true },
                        { label: t.donate.vipps, primary: false },
                        { label: t.donate.monthly, primary: false },
                    ].map(btn => (
                        <button
                            key={btn.label}
                            style={{ background: btn.primary ? '#166534' : '#162538', color: btn.primary ? '#fff' : '#a8b8c8', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: btn.primary ? 'none' : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; if (btn.primary) { e.currentTarget.style.background = '#1a7a40'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,101,52,0.4)' } else { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.color = '#f0f4f8' } }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; if (btn.primary) { e.currentTarget.style.background = '#166534' } else { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#a8b8c8' } }}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
} */

'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconHeart } from '@/components/ui/Icons'

interface DonatePageProps {
    openModal: () => void
}

export default function DonatePage({ openModal }: DonatePageProps) {
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
                    {t.donate.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            <div style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '24px', padding: isMobile ? '28px 20px' : '48px', maxWidth: '680px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.08), transparent)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: 'rgba(22,101,52,0.14)', borderRadius: '14px', marginBottom: '20px', color: '#22a052' }}>
                    <IconHeart size={26} />
                </div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#f0f4f8', marginBottom: '10px', letterSpacing: '-0.4px' }}>{t.donate.title}</div>
                <div style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.75, marginBottom: '32px' }}>{t.donate.sub}</div>

                <div style={{ background: '#162538', border: '1px solid rgba(22,101,52,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>Betalingsinfo</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#607080' }}>Kontonummer</span>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.5px' }}>6550.05.90771</span>
                        </div>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#607080' }}>Vipps</span>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.5px' }}>553705</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Bank button — unchanged */}
                    <button
                        style={{ background: '#166534', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1a7a40'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#166534'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        {t.donate.bank}
                    </button>

                    {/* ✅ Vipps button — now triggers modal */}
                    <button
                        onClick={openModal}
                        style={{ background: '#FF5B24', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '13px 26px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontStyle: 'italic', letterSpacing: '-0.3px' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,91,36,0.4)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        vipps →
                    </button>

                    {/* Monthly button — unchanged */}
                    <button
                        style={{ background: '#162538', color: '#a8b8c8', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.color = '#f0f4f8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#a8b8c8'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        {t.donate.monthly}
                    </button>
                </div>
            </div>
        </div>
    )
}