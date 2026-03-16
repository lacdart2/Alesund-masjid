
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { Lang } from '@/types'
import { PageKey } from '@/app/page'
import { IconMenu, IconX } from '@/components/ui/Icons'

interface NavbarProps {
    currentPage: PageKey
    navigate: (page: PageKey) => void
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
    const { lang, setLang } = useLang()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isMobile, setIsMobile] = useState<boolean | null>(null)
    const n = translations[lang].nav

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const navLinks: { key: PageKey; label: string }[] = [
        { key: 'home', label: n.home },
        { key: 'prayers', label: n.prayers },
        { key: 'announcements', label: n.announcements },
        { key: 'events', label: n.events },
        { key: 'about', label: n.about },
        { key: 'contact', label: n.contact },
    ]

    const handleNav = (page: PageKey) => {
        navigate(page)
        setMobileOpen(false)
    }

    const langButtons: Lang[] = ['no', 'en', 'ar']

    // Render nothing until we know screen size — just the shell
    /*  if (isMobile === null) return (
         <nav style={{
             direction: 'ltr',
             background: 'rgba(11,21,32,0.97)',
             borderBottom: '1px solid rgba(255,255,255,0.06)',
             position: 'sticky',
             top: 0,
             zIndex: 1000,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between',
             height: '64px',
             padding: '0 28px',
         }}>
             <button style={{
                 display: 'flex', alignItems: 'center', gap: '10px',
                 background: 'none', border: 'none', cursor: 'pointer',
                 flexShrink: 0, padding: 0,
             }}>
                 <img
                     src="/logo.png"
                     alt="Ålesund Masjid"
                     style={{
                         width: '48px', height: '48px', objectFit: 'contain',
                         filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(522%) hue-rotate(95deg) brightness(96%) contrast(96%)'
                     }}
                 />
                 <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                     Ålesund Masjid
                 </div>
             </button>
         </nav>
     ) */
    if (isMobile === null) return (
        <>
            <style>{`
            .nav-sk-desktop { display: flex; }
            .nav-sk-mobile  { display: none;  }
            @media (max-width: 1023px) {
                .nav-sk-desktop { display: none !important; }
                .nav-sk-mobile  { display: flex !important; }
            }
        `}</style>
            <nav style={{
                direction: 'ltr',
                background: 'rgba(11,21,32,0.97)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px',
                padding: '0 28px',
            }}>
                {/* Logo — always visible */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                        src="/logo.png"
                        alt="Ålesund Masjid"
                        style={{
                            width: '48px', height: '48px', objectFit: 'contain',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(522%) hue-rotate(95deg) brightness(96%) contrast(96%)'
                        }}
                    />
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                        Ålesund Masjid
                    </div>
                </div>

                {/* Desktop skeleton — nav link placeholders */}
                <div className="nav-sk-desktop" style={{ gap: '2px', marginLeft: '16px' }}>
                    {['home', 'prayers', 'announcements', 'events', 'about', 'contact'].map(k => (
                        <div key={k} style={{
                            width: '70px', height: '32px', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.03)',
                        }} />
                    ))}
                </div>

                {/* Desktop skeleton — lang + donate placeholders */}
                <div className="nav-sk-desktop" style={{ alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    <div style={{ width: '100px', height: '32px', borderRadius: '9px', background: 'rgba(255,255,255,0.03)' }} />
                    <div style={{ width: '80px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }} />
                </div>

                {/* Mobile skeleton — hamburger placeholder */}
                {/*  <div className="nav-sk-mobile" style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                }} /> */}
                {/* Mobile skeleton — hamburger with icon */}
                <div className="nav-sk-mobile" style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0f4f8" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </div>
            </nav>
        </>
    )
    return (
        <>
            <nav style={{
                direction: 'ltr',
                background: scrolled ? 'rgba(11,21,32,0.99)' : 'rgba(11,21,32,0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: isMobile ? '70px' : '64px',
                padding: isMobile ? '0 16px' : '0 28px',
                boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.8)' : 'none',
                transition: 'all 0.3s',
            }}>

                <button
                    onClick={() => handleNav('home')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        flexShrink: 0, padding: 0,
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Ålesund Masjid"
                        style={{
                            width: isMobile ? '52px' : '48px',
                            height: isMobile ? '52px' : '48px',
                            objectFit: 'contain',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(522%) hue-rotate(95deg) brightness(96%) contrast(96%)'
                        }}
                    />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{
                            fontSize: isMobile ? '17px' : '15px',
                            fontWeight: 700, color: '#f0f4f8',
                            letterSpacing: '-0.3px', lineHeight: 1.2,
                        }}>
                            Ålesund Masjid
                        </div>
                        {!isMobile && (
                            <div style={{ fontSize: '10px', fontWeight: 500, color: '#22a052', letterSpacing: '0.4px' }}>
                                {translations[lang].brand.sub}
                            </div>
                        )}
                    </div>
                </button>

                <div style={{ display: isMobile ? 'none' : 'flex', gap: '2px', marginLeft: '16px' }}>
                    {navLinks.map(link => (
                        <button
                            key={link.key}
                            onClick={() => handleNav(link.key)}
                            style={{
                                fontSize: '13.5px', fontWeight: 500,
                                color: currentPage === link.key ? '#fff' : '#a8b8c8',
                                padding: '7px 13px', borderRadius: '8px',
                                border: 'none', cursor: 'pointer',
                                background: currentPage === link.key ? '#166534' : 'transparent',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => {
                                if (currentPage !== link.key) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                    e.currentTarget.style.color = '#f0f4f8'
                                }
                            }}
                            onMouseLeave={e => {
                                if (currentPage !== link.key) {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.color = '#a8b8c8'
                                }
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    <div style={{
                        display: 'flex', gap: '1px', background: '#162538',
                        borderRadius: '9px', border: '1px solid rgba(255,255,255,0.06)', padding: '3px',
                    }}>
                        {langButtons.map(l => (
                            <button key={l} onClick={() => setLang(l)} style={{
                                fontSize: '11.5px', fontWeight: 600,
                                color: lang === l ? '#fff' : '#607080',
                                padding: '5px 9px', borderRadius: '6px',
                                border: 'none', cursor: 'pointer',
                                background: lang === l ? '#166534' : 'transparent',
                                letterSpacing: '0.3px', transition: 'all 0.2s',
                                textTransform: 'uppercase',
                            }}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handleNav('donate')}
                        style={{
                            fontSize: '13px', fontWeight: 600,
                            background: '#166534', color: '#fff',
                            padding: '8px 18px', borderRadius: '10px',
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1a7a40'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#166534'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        {n.donate}
                    </button>
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    style={{
                        display: isMobile ? 'flex' : 'none',
                        alignItems: 'center', justifyContent: 'center',
                        width: '48px', height: '48px', borderRadius: '14px',
                        background: mobileOpen ? 'rgba(22,101,52,0.25)' : 'rgba(255,255,255,0.07)',
                        border: `1px solid ${mobileOpen ? 'rgba(22,101,52,0.4)' : 'rgba(255,255,255,0.1)'}`,
                        cursor: 'pointer', color: '#f0f4f8', flexShrink: 0, transition: 'all 0.2s',
                    }}
                >
                    {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
                </button>
            </nav>

            {mobileOpen && isMobile && (
                <div style={{
                    position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0,
                    zIndex: 999, background: 'rgba(9,18,28,0.98)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    display: 'flex', flexDirection: 'column',
                    padding: '12px 20px 40px', overflowY: 'auto',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
                        {navLinks.map(link => (
                            <button
                                key={link.key}
                                onClick={() => handleNav(link.key)}
                                style={{
                                    fontSize: '18px', fontWeight: 600,
                                    color: currentPage === link.key ? '#fff' : '#a8b8c8',
                                    padding: '16px 18px', borderRadius: '14px',
                                    border: 'none', cursor: 'pointer', textAlign: 'left',
                                    background: currentPage === link.key
                                        ? 'linear-gradient(135deg, #166534, #0e5027)'
                                        : 'transparent',
                                    transition: 'all 0.2s', letterSpacing: '-0.2px',
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />

                    <div style={{ marginBottom: '16px' }}>
                        <div style={{
                            fontSize: '12px', fontWeight: 600, letterSpacing: '1.2px',
                            textTransform: 'uppercase', color: '#607080',
                            marginBottom: '12px', paddingLeft: '4px',
                        }}>
                            {lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : 'Språk'}
                        </div>
                        <div style={{
                            display: 'flex', gap: '8px', background: '#111e2d',
                            borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', padding: '6px',
                        }}>
                            {langButtons.map(l => (
                                <button key={l} onClick={() => setLang(l)} style={{
                                    flex: 1, fontSize: '15px', fontWeight: 600,
                                    color: lang === l ? '#fff' : '#607080',
                                    padding: '12px 8px', borderRadius: '10px',
                                    border: 'none', cursor: 'pointer',
                                    background: lang === l ? '#166534' : 'transparent',
                                    textTransform: 'uppercase', letterSpacing: '0.5px', transition: 'all 0.2s',
                                }}>
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleNav('donate')}
                        style={{
                            width: '100%', fontSize: '16px', fontWeight: 700,
                            background: 'linear-gradient(135deg, #166534, #1a7a40)',
                            color: '#fff', padding: '18px', borderRadius: '14px',
                            border: 'none', cursor: 'pointer', letterSpacing: '-0.2px',
                            boxShadow: '0 4px 20px rgba(22,101,52,0.35)',
                            transition: 'all 0.2s', marginTop: '8px',
                        }}
                    >
                        {n.donate}
                    </button>
                </div>
            )}
        </>
    )
}