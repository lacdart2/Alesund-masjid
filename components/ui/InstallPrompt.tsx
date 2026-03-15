'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const labels = {
    no: {
        title: 'Installer Ålesund Masjid',
        sub: 'Legg til på hjemskjermen for rask tilgang',
        btn: 'Installer',
        dismiss: 'Ikke nå',
    },
    en: {
        title: 'Install Ålesund Masjid',
        sub: 'Add to home screen for quick access',
        btn: 'Install',
        dismiss: 'Not now',
    },
    ar: {
        title: 'تثبيت مسجد أولسند',
        sub: 'أضف إلى الشاشة الرئيسية للوصول السريع',
        btn: 'تثبيت',
        dismiss: 'ليس الآن',
    },
}

export default function InstallPrompt() {
    const { lang } = useLang()
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const l = labels[lang]

    useEffect(() => {
        // Don't show if already dismissed this session
        const wasDismissed = sessionStorage.getItem('installDismissed')
        if (wasDismissed) return

        const handler = (e: Event) => {
            e.preventDefault()
            setInstallEvent(e as BeforeInstallPromptEvent)
            // Small delay so it doesn't pop immediately on load
            setTimeout(() => setVisible(true), 3000)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstall = async () => {
        if (!installEvent) return
        await installEvent.prompt()
        const result = await installEvent.userChoice
        if (result.outcome === 'accepted') {
            setVisible(false)
        }
    }

    const handleDismiss = () => {
        setVisible(false)
        setDismissed(true)
        sessionStorage.setItem('installDismissed', 'true')
    }

    if (!visible || dismissed) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
            width: 'calc(100% - 32px)',
            maxWidth: '400px',
            background: '#111e2d',
            border: '1px solid rgba(22,101,52,0.4)',
            borderRadius: '20px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(22,101,52,0.1)',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            animation: 'slideUp 0.3s ease',
        }}>
            {/* Logo */}
            <img
                src="/logo.png"
                alt="logo"
                style={{ width: '46px', height: '46px', objectFit: 'contain', flexShrink: 0 }}
            />

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8', marginBottom: '2px' }}>
                    {l.title}
                </div>
                <div style={{ fontSize: '12px', color: '#607080', lineHeight: 1.4 }}>
                    {l.sub}
                </div>
            </div>

            {/* Dismiss */}
            <button
                onClick={handleDismiss}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#607080',
                    cursor: 'pointer',
                    fontSize: '12px',
                    flexShrink: 0,
                    padding: '4px',
                }}
            >
                {l.dismiss}
            </button>

            {/* Install */}
            <button
                onClick={handleInstall}
                style={{
                    background: '#166534',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(22,101,52,0.4)',
                }}
            >
                {l.btn}
            </button>
        </div>
    )
}