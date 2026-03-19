'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { getTodayPrayers } from '@/lib/prayer'
import { ANNOUNCEMENTS, EVENTS, getUpcomingEvents } from '@/lib/data'
import { PageKey } from '@/app/page'
import PrayerGrid from '@/components/prayer/PrayerGrid'
import PhoneMockup from '@/components/prayer/PhoneMockup'
import { IconMosque, IconSpeakerphone, IconCalendar, IconMapPin, IconHeart, AnnouncementIcon, IconClock } from '@/components/ui/Icons'
import ZakatBanner from '@/components/ui/ZakatBanner'
import EidBanner from '@/components/ui/EidBanner'

interface HomePageProps {
    navigate: (page: PageKey) => void
    openModal: () => void
}

export default function HomePage({ navigate, openModal }: HomePageProps) {
    const { lang } = useLang()
    const t = translations[lang]
    const today = getTodayPrayers()
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    if (isMobile === null) return (
        <div style={{ minHeight: '100vh', background: '#0b1520' }} />
    )

    return (
        <>
            {isMobile ? (
                <section style={{ padding: '24px 20px 40px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div style={{ position: 'absolute', top: '5%', right: '3%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.1), transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <PhoneMockup />
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', color: '#22a052', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', marginBottom: '20px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                            <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22a052', flexShrink: 0 }} />
                            {t.hero.badge}
                        </div>
                        <h1 style={{ fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 700, color: '#f0f4f8', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '16px' }}>
                            {t.hero.line1}<br />
                            {t.hero.line2}<br />
                            <em style={{ fontStyle: 'normal', color: '#22a052' }}>{t.hero.line3}</em>
                        </h1>
                        <p style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.75, marginBottom: '24px' }}>
                            {t.hero.sub}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button onClick={() => navigate('prayers')} style={{ background: '#166534', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                                {t.hero.cta1}
                            </button>
                            <button onClick={() => navigate('contact')} style={{ background: 'transparent', color: '#a8b8c8', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s' }}>
                                {t.hero.cta2}
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <section style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <div style={{ position: 'absolute', top: '5%', right: '3%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.1), transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
                    <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.06), transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
                    <div style={{
                        maxWidth: '1120px', width: '100%', padding: '80px 40px 60px',
                        display: 'grid', gridTemplateColumns: '1fr minmax(0, 1fr)',
                        alignItems: 'center', gap: '40px', position: 'relative', zIndex: 1,
                    }}>
                        <div>
                            <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', color: '#22a052', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', marginBottom: '28px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                                <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22a052', flexShrink: 0 }} />
                                {t.hero.badge}
                            </div>
                            <h1 className="animate-fade-up-1" style={{ fontSize: 'clamp(24px, 2.8vw, 48px)', fontWeight: 700, color: '#f0f4f8', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '20px' }}>
                                {t.hero.line1}<br />
                                {t.hero.line2}<br />
                                <em style={{ fontStyle: 'normal', color: '#22a052' }}>{t.hero.line3}</em>
                            </h1>
                            <p className="animate-fade-up-2" style={{ fontSize: '15px', color: '#a8b8c8', lineHeight: 1.75, maxWidth: '400px', marginBottom: '32px' }}>
                                {t.hero.sub}
                            </p>
                            <div className="animate-fade-up-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => navigate('prayers')}
                                    style={{ background: '#166534', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#1a7a40'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,101,52,0.4)' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#166534'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                                >
                                    {t.hero.cta1}
                                </button>
                                <button
                                    onClick={() => navigate('contact')}
                                    style={{ background: 'transparent', color: '#a8b8c8', fontSize: '14px', fontWeight: 600, padding: '13px 26px', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.color = '#f0f4f8' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a8b8c8' }}
                                >
                                    {t.hero.cta2}
                                </button>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <PhoneMockup />
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ Eid Banner — shows Mar 19-21 only, auto-hides after */}
            <EidBanner />

            <ZakatBanner />

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
                <div style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px', marginBottom: '20px' }}>
                    {t.quickLinks.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                    {[
                        { key: 'prayers' as PageKey, icon: <IconMosque size={26} />, label: t.quickLinks.prayers },
                        { key: 'announcements' as PageKey, icon: <IconSpeakerphone size={26} />, label: t.quickLinks.announcements },
                        { key: 'events' as PageKey, icon: <IconCalendar size={26} />, label: t.quickLinks.events },
                        { key: 'contact' as PageKey, icon: <IconMapPin size={26} />, label: t.quickLinks.location },
                    ].map(item => (
                        <button
                            key={item.key}
                            onClick={() => navigate(item.key)}
                            style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <span style={{ color: '#22a052' }}>{item.icon}</span>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#a8b8c8' }}>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '48px 20px 0' : '48px 40px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px' }}>{t.prayers.title}</span>
                    <button onClick={() => navigate('prayers')} style={{ fontSize: '13px', fontWeight: 600, color: '#22a052', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {t.announcements.seeAll}
                    </button>
                </div>
                <PrayerGrid data={today} />
            </div>

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
                <div style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '24px', padding: isMobile ? '22px 20px' : '28px 32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', fontSize: '72px', color: 'rgba(22,101,52,0.05)', fontFamily: "'Noto Sans Arabic', sans-serif", pointerEvents: 'none' }}>الجمعة</div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#22a052', marginBottom: '4px' }}>{t.jumuah.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#f0f4f8', marginBottom: '3px' }}>{t.jumuah.title}</div>
                        <div style={{ fontSize: '14px', color: '#a8b8c8' }}>{t.jumuah.sub}</div>
                    </div>
                    <div style={{ textAlign: isMobile ? 'left' : 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '11px', color: '#607080', marginBottom: '3px' }}>{t.jumuah.iqamah}</div>
                        <div style={{ fontSize: '44px', fontWeight: 700, color: '#22a052', letterSpacing: '-2px', lineHeight: 1 }}>14:30</div>
                        <div style={{ fontSize: '12px', color: '#607080', marginTop: '3px' }}>{t.jumuah.note}</div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '48px 20px 0' : '48px 40px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8' }}>{t.announcements.title}</span>
                    <button onClick={() => navigate('announcements')} style={{ fontSize: '13px', fontWeight: 600, color: '#22a052', background: 'none', border: 'none', cursor: 'pointer' }}>{t.announcements.seeAll}</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {ANNOUNCEMENTS.slice(0, 2).map(a => (
                        <div
                            key={a.id}
                            style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px 22px', display: 'flex', gap: '16px', alignItems: 'flex-start', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)' }}
                        >
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#22a052', background: a.colorClass === 'gold' ? 'rgba(200,169,107,0.1)' : a.colorClass === 'green' ? 'rgba(22,101,52,0.12)' : 'rgba(59,130,246,0.1)' }}>
                                <AnnouncementIcon icon={a.icon} size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#22a052', marginBottom: '3px' }}>{a.tag}</div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '3px' }}>{a.title[lang]}</div>
                                <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.65 }}>{a.body[lang]}</div>
                                <div style={{ fontSize: '11px', color: '#607080', marginTop: '7px' }}>{a.date}</div>

                                {/* ✅ Google Maps button — only for announcements with mapUrl */}
                                {a.mapUrl && (
                                    <a href={a.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            marginTop: '12px',
                                            background: 'rgba(22,101,52,0.14)',
                                            border: '1px solid rgba(22,101,52,0.28)',
                                            color: '#22a052',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            padding: '7px 14px',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <IconMapPin size={14} />
                                        {lang === 'ar' ? 'الاتجاهات' : lang === 'no' ? 'Veibeskrivelse' : 'Get Directions'}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '48px 20px 0' : '48px 40px 0' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8' }}>{t.events.title}</span>
                    <button onClick={() => navigate('events')} style={{ fontSize: '13px', fontWeight: 600, color: '#22a052', background: 'none', border: 'none', cursor: 'pointer' }}>{t.events.seeAll}</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(270px, 1fr))', gap: '13px' }}>
                    {getUpcomingEvents().slice(0, 2).map(ev => (
                        <div
                            key={ev.id}
                            style={{
                                background: '#111e2d',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <div style={{ background: 'linear-gradient(135deg, rgba(22,101,52,0.1), rgba(22,101,52,0.03))', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 22px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '30px', fontWeight: 800, color: '#22a052', lineHeight: 1, letterSpacing: '-1px' }}>{ev.day}</div>
                                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#607080', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ev.month}</div>
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#22a052', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', padding: '4px 10px', borderRadius: '20px' }}>
                                    {ev.type[lang]}
                                </span>
                            </div>
                            <div style={{ padding: '16px 22px' }}>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', marginBottom: '9px' }}>{ev.name[lang]}</div>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '48px 20px' : '48px 40px' }}>
                <div style={{ background: '#111e2d', border: '1px solid rgba(22,101,52,0.28)', borderRadius: '24px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,101,52,0.08), transparent)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'rgba(22,101,52,0.14)', borderRadius: '14px', marginBottom: '16px', color: '#22a052' }}>
                        <IconHeart size={24} />
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4f8', marginBottom: '7px', letterSpacing: '-0.4px' }}>{t.donate.title}</div>
                    <div style={{ fontSize: '14px', color: '#a8b8c8', lineHeight: 1.7, maxWidth: '520px', marginBottom: '22px' }}>{t.donate.sub}</div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            style={{ background: '#166534', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '11px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = '#1a7a40' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#166534' }}
                        >
                            {t.donate.bank}
                        </button>
                        <button
                            onClick={openModal}
                            style={{ background: '#FF5B24', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '11px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontStyle: 'italic', letterSpacing: '-0.3px' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,91,36,0.4)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                            vipps →
                        </button>
                        <button
                            style={{ background: '#162538', color: '#a8b8c8', fontSize: '13px', fontWeight: 600, padding: '11px 22px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                        >
                            {t.donate.monthly}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}