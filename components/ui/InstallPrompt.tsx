
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
        iosTitle: 'Installer appen',
        iosInstructions: <>Trykk <strong style={{ color: '#22a052' }}>Del</strong> og deretter <strong style={{ color: '#22a052' }}>Legg til på Hjem-skjerm</strong></>,
    },
    en: {
        title: 'Install Ålesund Masjid',
        sub: 'Add to home screen for quick access',
        btn: 'Install',
        dismiss: 'Not now',
        iosTitle: 'Install the app',
        iosInstructions: <>Tap <strong style={{ color: '#22a052' }}>Share</strong> then <strong style={{ color: '#22a052' }}>Add to Home Screen</strong></>,
    },
    ar: {
        title: 'تثبيت مسجد أولسند',
        sub: 'أضف إلى الشاشة الرئيسية للوصول السريع',
        btn: 'تثبيت',
        dismiss: 'ليس الآن',
        iosTitle: 'تثبيت التطبيق',
        iosInstructions: <>اضغط <strong style={{ color: '#22a052' }}>مشاركة</strong> ثم <strong style={{ color: '#22a052' }}>أضف إلى الشاشة الرئيسية</strong></>,
    },
}

export default function InstallPrompt() {
    const { lang } = useLang()
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const l = labels[lang]

    useEffect(() => {
        const wasDismissed = sessionStorage.getItem('installDismissed')
        if (wasDismissed) return

        // ✅ Detect iOS
        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches

        if (ios && !isStandalone) {
            setIsIOS(true)
            setTimeout(() => setVisible(true), 3000)
            return
        }

        // Android / desktop — use beforeinstallprompt
        const handler = (e: Event) => {
            e.preventDefault()
            setInstallEvent(e as BeforeInstallPromptEvent)
            setTimeout(() => setVisible(true), 3000)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstall = async () => {
        if (!installEvent) return
        await installEvent.prompt()
        const result = await installEvent.userChoice
        if (result.outcome === 'accepted') setVisible(false)
    }

    const handleDismiss = () => {
        setVisible(false)
        setDismissed(true)
        sessionStorage.setItem('installDismissed', 'true')
    }

    if (!visible || dismissed) return null

    // ✅ iOS — show manual instructions
    if (isIOS) {
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
                boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
                direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <img src="/logo.png" alt="logo" style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8', flex: 1 }}>
                        {l.iosTitle}
                    </div>
                    <button
                        onClick={handleDismiss}
                        style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '20px', lineHeight: 1, flexShrink: 0 }}
                    >
                        ×
                    </button>
                </div>

                {/* Instructions */}
                <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.7 }}>
                    {l.iosInstructions}
                </div>

                {/* Share icon hint */}
                <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#607080' }}>
                    {lang === 'ar' ? '↓ زر المشاركة في الأسفل' : lang === 'en' ? '↓ Share button at the bottom' : '↓ Del-knappen nederst'}
                </div>
            </div>
        )
    }

    // ✅ Android / Desktop — show install button
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
            boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
        }}>
            <img src="/logo.png" alt="logo" style={{ width: '46px', height: '46px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8', marginBottom: '2px' }}>
                    {l.title}
                </div>
                <div style={{ fontSize: '12px', color: '#607080', lineHeight: 1.4 }}>
                    {l.sub}
                </div>
            </div>
            <button
                onClick={handleDismiss}
                style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '12px', flexShrink: 0, padding: '4px' }}
            >
                {l.dismiss}
            </button>
            <button
                onClick={handleInstall}
                style={{ background: '#166534', color: '#fff', border: 'none', borderRadius: '10px', padding: '9px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(22,101,52,0.4)' }}
            >
                {l.btn}
            </button>
        </div>
    )
}