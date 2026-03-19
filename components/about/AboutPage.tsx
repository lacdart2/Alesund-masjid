
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconMosque, IconBook, IconCalendar, IconLock, IconUsers } from '@/components/ui/Icons'

const IconDroplet = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
)

const IconDoor = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <circle cx="14" cy="13" r="1" fill="currentColor" />
    </svg>
)

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

    const facilities = {
        no: [
            { icon: <IconMosque size={18} />, label: 'Daglige bønner (5x)' },
            { icon: <IconMosque size={18} />, label: "Fredagsbønn (Jumu'ah) — 14:30" },
            { icon: <IconBook size={18} />, label: 'Koranundervisning' },
            { icon: <IconCalendar size={18} />, label: 'Fellesskapsarrangementer' },
            { icon: <IconUsers size={18} />, label: 'Bønnerom for kvinner' },
            { icon: <IconDroplet size={18} />, label: 'Wudu-fasiliteter for kvinner' },
            { icon: <IconDoor size={18} />, label: 'Toaletter' },
        ],
        en: [
            { icon: <IconMosque size={18} />, label: 'Daily prayers (5x)' },
            { icon: <IconMosque size={18} />, label: "Friday prayer (Jumu'ah) — 14:30" },
            { icon: <IconBook size={18} />, label: 'Quran classes' },
            { icon: <IconCalendar size={18} />, label: 'Community events' },
            { icon: <IconUsers size={18} />, label: 'Female prayer section' },
            { icon: <IconDroplet size={18} />, label: 'Wudu facilities for ladies' },
            { icon: <IconDoor size={18} />, label: 'Toilets' },
        ],
        ar: [
            { icon: <IconMosque size={18} />, label: 'الصلوات اليومية (5x)' },
            { icon: <IconMosque size={18} />, label: 'صلاة الجمعة — 14:30' },
            { icon: <IconBook size={18} />, label: 'دروس القرآن الكريم' },
            { icon: <IconCalendar size={18} />, label: 'الفعاليات المجتمعية' },
            { icon: <IconUsers size={18} />, label: 'قسم الصلاة للنساء' },
            { icon: <IconDroplet size={18} />, label: 'مرافق الوضوء للنساء' },
            { icon: <IconDoor size={18} />, label: 'دورات المياه' },
        ],
    }

    const community = {
        no: {
            sectionTitle: 'Fellesskap',
            name: 'Muslimske søstre i Ålesund og omegn',
            badge: 'Kun for kvinner',
            members: '85 medlemmer',
            desc: 'En privat gruppe for muslimske kvinner i Ålesund og omegn. Her kan du få informasjon om aktiviteter, bli kjent med søstre og dele erfaringer. Målet er å bygge fellesskap og gjøre det enklere å delta i muslimsk liv i Ålesund.',
            btn: 'Se gruppe på Facebook',
        },
        en: {
            sectionTitle: 'Community',
            name: 'Muslim Sisters in Ålesund and surroundings',
            badge: 'Women only',
            members: '85 members',
            desc: 'A private group for Muslim women in Ålesund and the surrounding area. Get information about activities, connect with sisters, and share experiences. The goal is to build community and make it easier to participate in Muslim life in Ålesund.',
            btn: 'View group on Facebook',
        },
        ar: {
            sectionTitle: 'المجتمع',
            name: 'الأخوات المسلمات في أولسند والمناطق المحيطة',
            badge: 'للنساء فقط',
            members: '85 عضوة',
            desc: 'مجموعة خاصة للمرأة المسلمة في أولسند والمناطق المجاورة. احصلي على معلومات عن الأنشطة، وتعرفي على الأخوات، وشاركي تجاربك. الهدف بناء مجتمع وتسهيل المشاركة في الحياة الإسلامية في أولسند.',
            btn: 'عرض المجموعة على فيسبوك',
        },
    }

    const c = community[lang]

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
                <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', minHeight: '340px', maxHeight: isMobile ? 'none' : '380px' }}>
                    <img
                        src="/images/prayer-hall.jpg"
                        alt="Ålesund Masjid prayer hall"
                        style={{ width: '100%', height: '100%', minHeight: '340px', maxHeight: isMobile ? 'none' : '380px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(11,21,32,0.9), transparent)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '20px' }}>
                        <div style={{ fontFamily: "'Noto Sans Arabic', sans-serif", fontSize: '26px', color: 'rgba(200,169,107,0.55)', letterSpacing: '3px', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                            بسم الله الرحمن الرحيم
                        </div>
                    </div>
                </div>
            </div>

            {/* Facilities & Services */}
            <div style={{ marginTop: '48px' }}>
                <div style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px', marginBottom: '20px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    {lang === 'ar' ? 'الخدمات والمرافق' : lang === 'no' ? 'Tjenester og fasiliteter' : 'Services & Facilities'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '10px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    {facilities[lang].map((f, i) => (
                        <div
                            key={i}
                            style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                        >

                            <span style={{ color: '#22a052', flexShrink: 0, alignSelf: 'center', display: 'flex' }}>{f.icon}</span>
                            <span style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.4 }}>{f.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Groups */}
            <div style={{ marginTop: '56px', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                <div style={{ fontSize: '19px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px', marginBottom: '20px' }}>
                    {c.sectionTitle}
                </div>
                <div
                    style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                    <div style={{ width: isMobile ? '100%' : '200px', height: isMobile ? '160px' : 'auto', flexShrink: 0 }}>
                        <img
                            src="/images/womens-group.png"
                            alt="Muslimske søstre"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                        />
                    </div>
                    <div style={{ padding: '20px 24px', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#22a052', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', padding: '4px 10px', borderRadius: '20px' }}>
                                {c.members}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#607080', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>
                                <IconLock size={11} />
                                {c.badge}
                            </span>
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8', marginBottom: '8px' }}>{c.name}</div>
                        <p style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.65, marginBottom: '16px' }}>{c.desc}</p>
                        <a href="https://www.facebook.com/groups/902368229190714"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', color: '#22a052', fontSize: '13px', fontWeight: 700, padding: '9px 16px', borderRadius: '10px', textDecoration: 'none' }}
                        >
                            <IconUsers size={15} />
                            {c.btn}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}