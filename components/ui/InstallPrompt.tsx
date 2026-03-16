/* 
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

           
                <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.7 }}>
                    {l.iosInstructions}
                </div>

               
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
} */
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const IconThreeDots = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
)

const IconShare = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
)

const IconChevronDown = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
)

const IconPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
    </svg>
)

const IconTap = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11V6a3 3 0 0 1 6 0v5" />
        <path d="M13 11h1a3 3 0 0 1 3 3v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3a3 3 0 0 1 3-3h1" />
    </svg>
)

const labels = {
    no: {
        title: 'Installer Ålesund Masjid',
        sub: 'Legg til på hjemskjermen for rask tilgang',
        btn: 'Installer',
        dismiss: 'Ikke nå',
        iosTitle: 'Installer appen på iPhone',
        safariLabel: 'Safari',
        chromeLabel: 'Chrome',
        safariSteps: [
            { icon: 'dots', text: 'Trykk ••• (tre prikker) nederst til høyre' },
            { icon: 'chevron', text: 'Trykk "Mer" for å se flere valg' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'tap', text: 'Trykk "Legg til" for å bekrefte' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Trykk "Del" øverst til høyre' },
            { icon: 'chevron', text: 'Trykk "Mer" for å se flere valg' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'tap', text: 'Trykk "Legg til" for å bekrefte' },
        ],
    },
    en: {
        title: 'Install Ålesund Masjid',
        sub: 'Add to home screen for quick access',
        btn: 'Install',
        dismiss: 'Not now',
        iosTitle: 'Install app on iPhone',
        safariLabel: 'Safari',
        chromeLabel: 'Chrome',
        safariSteps: [
            { icon: 'dots', text: 'Tap ••• (three dots) bottom right' },
            { icon: 'chevron', text: 'Tap "More" to see more options' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'tap', text: 'Tap "Add" to confirm' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Tap "Share" top right' },
            { icon: 'chevron', text: 'Tap "More" to see more options' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'tap', text: 'Tap "Add" to confirm' },
        ],
    },
    ar: {
        title: 'تثبيت مسجد أولسند',
        sub: 'أضف إلى الشاشة الرئيسية للوصول السريع',
        btn: 'تثبيت',
        dismiss: 'ليس الآن',
        iosTitle: 'تثبيت التطبيق على iPhone',
        safariLabel: 'Safari',
        chromeLabel: 'Chrome',
        safariSteps: [
            { icon: 'dots', text: 'اضغط ••• (ثلاث نقاط) أسفل اليمين' },
            { icon: 'chevron', text: 'اضغط "المزيد" لعرض المزيد من الخيارات' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'tap', text: 'اضغط "إضافة" للتأكيد' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'اضغط "مشاركة" أعلى اليمين' },
            { icon: 'chevron', text: 'اضغط "المزيد" لعرض المزيد من الخيارات' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'tap', text: 'اضغط "إضافة" للتأكيد' },
        ],
    },
}

function StepIcon({ type }: { type: string }) {
    const style = {
        width: '32px', height: '32px', borderRadius: '8px',
        background: 'rgba(22,101,52,0.15)', border: '1px solid rgba(22,101,52,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#22a052', flexShrink: 0,
    }
    return (
        <div style={style}>
            {type === 'dots' && <IconThreeDots />}
            {type === 'share' && <IconShare />}
            {type === 'chevron' && <IconChevronDown />}
            {type === 'plus' && <IconPlus />}
            {type === 'tap' && <IconTap />}
        </div>
    )
}

export default function InstallPrompt() {
    const { lang } = useLang()
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [activeTab, setActiveTab] = useState<'safari' | 'chrome'>('safari')
    const l = labels[lang]

    useEffect(() => {
        const wasDismissed = sessionStorage.getItem('installDismissed')
        if (wasDismissed) return

        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches

        if (ios && !isStandalone) {
            setIsIOS(true)
            setTimeout(() => setVisible(true), 3000)
            return
        }

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

    if (isIOS) {
        const steps = activeTab === 'safari' ? l.safariSteps : l.chromeSteps
        return (
            <div style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2000,
                width: 'calc(100% - 32px)',
                maxWidth: '420px',
                background: '#111e2d',
                border: '1px solid rgba(22,101,52,0.4)',
                borderRadius: '20px',
                padding: '16px 18px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
                direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <img src="/logo.png" alt="logo" style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8', flex: 1 }}>
                        {l.iosTitle}
                    </div>
                    <button
                        onClick={handleDismiss}
                        style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '22px', lineHeight: 1, flexShrink: 0 }}
                    >
                        ×
                    </button>
                </div>

                {/* Browser tabs */}
                <div style={{
                    display: 'flex', gap: '6px', marginBottom: '14px',
                    background: '#0b1520', borderRadius: '10px', padding: '4px',
                }}>
                    {(['safari', 'chrome'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1, padding: '7px', borderRadius: '7px',
                                border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                                background: activeTab === tab ? '#166534' : 'transparent',
                                color: activeTab === tab ? '#fff' : '#607080',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tab === 'safari' ? l.safariLabel : l.chromeLabel}
                        </button>
                    ))}
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <StepIcon type={step.icon} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                <span style={{
                                    width: '18px', height: '18px', borderRadius: '50%',
                                    background: 'rgba(22,101,52,0.2)', color: '#22a052',
                                    fontSize: '11px', fontWeight: 700,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {i + 1}
                                </span>
                                <span style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.4 }}>
                                    {step.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Android / Desktop
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