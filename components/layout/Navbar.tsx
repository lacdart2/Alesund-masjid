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
    const [isMobile, setIsMobile] = useState(false)
    const n = translations[lang].nav

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // JS-driven mobile detection — reliable, no Tailwind conflicts
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

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

    return (
        <>
            <nav
                style={{
                    direction: 'ltr',
                    background: 'rgba(11,21,32,0.93)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '64px',
                    padding: '0 28px',
                    boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
                    transition: 'box-shadow 0.3s',
                }}
            >
                {/* Brand / Logo */}
                <button
                    onClick={() => handleNav('home')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Ålesund Masjid logo"
                        style={{ width: '88px', height: '88px', margin: '0', objectFit: 'contain', filter: 'brightness(1.9) contrast(1.1)' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#f0f4f8',
                            letterSpacing: '-0.3px',
                            lineHeight: 1.2,
                        }}>
                            Ålesund Masjid
                        </div>
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#22a052',
                            letterSpacing: '0.4px',
                        }}>
                            {translations[lang].brand.sub}
                        </div>
                    </div>
                </button>

                {/* Desktop nav links — hidden on mobile */}
                <div style={{
                    display: isMobile ? 'none' : 'flex',
                    gap: '2px',
                    marginLeft: '16px',
                }}>
                    {navLinks.map(link => (
                        <button
                            key={link.key}
                            onClick={() => handleNav(link.key)}
                            style={{
                                fontSize: '13.5px',
                                fontWeight: 500,
                                color: currentPage === link.key ? '#fff' : '#a8b8c8',
                                padding: '7px 13px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
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

                {/* Right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>

                    {/* Language selector */}
                    <div style={{
                        display: 'flex',
                        gap: '1px',
                        background: '#162538',
                        borderRadius: '9px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '3px',
                    }}>
                        {langButtons.map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                style={{
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    color: lang === l ? '#fff' : '#607080',
                                    padding: '5px 9px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: lang === l ? '#166534' : 'transparent',
                                    letterSpacing: '0.3px',
                                    transition: 'all 0.2s',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    {/* Donate button — desktop only */}
                    <button
                        onClick={() => handleNav('donate')}
                        style={{
                            display: isMobile ? 'none' : 'block',
                            fontSize: '13px',
                            fontWeight: 600,
                            background: '#166534',
                            color: '#fff',
                            padding: '8px 18px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = '#1a7a40'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = '#166534'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {n.donate}
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            display: isMobile ? 'flex' : 'none',
                            alignItems: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#f0f4f8',
                        }}
                    >
                        {mobileOpen ? <IconX size={22} /> : <IconMenu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown — only when open on mobile */}
            {mobileOpen && isMobile && (
                <div style={{
                    position: 'fixed',
                    top: '64px',
                    left: 0,
                    right: 0,
                    zIndex: 99,
                    background: 'rgba(11,21,32,0.97)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '12px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                }}>
                    {navLinks.map(link => (
                        <button
                            key={link.key}
                            onClick={() => handleNav(link.key)}
                            style={{
                                fontSize: '15px',
                                fontWeight: 500,
                                color: currentPage === link.key ? '#fff' : '#a8b8c8',
                                padding: '12px 14px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                background: currentPage === link.key ? '#166534' : 'transparent',
                                transition: 'all 0.2s',
                            }}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Mobile bottom row — lang + donate */}
                    <div style={{
                        marginTop: '12px',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '1px',
                            background: '#162538',
                            borderRadius: '9px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            padding: '3px',
                        }}>
                            {langButtons.map(l => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    style={{
                                        fontSize: '11.5px',
                                        fontWeight: 600,
                                        color: lang === l ? '#fff' : '#607080',
                                        padding: '5px 9px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: lang === l ? '#166534' : 'transparent',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNav('donate')}
                            style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                background: '#166534',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {n.donate}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}