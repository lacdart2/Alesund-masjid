/* 'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

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

const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const IconThreeDots = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
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
        safariQuestion: 'Hva ser du nederst i Safari?',
        optionDots: '•••',
        optionShare: '□↑',
        dotsSteps: [
            { icon: 'dots', text: 'Trykk ••• nederst til høyre' },
            { icon: 'share', text: 'Trykk "Del"' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'Trykk Del-knappen (□↑) nederst' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Trykk Del-knappen (□↑) øverst til høyre' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
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
        safariQuestion: 'What do you see at the bottom of Safari?',
        optionDots: '•••',
        optionShare: '□↑',
        dotsSteps: [
            { icon: 'dots', text: 'Tap ••• bottom right' },
            { icon: 'share', text: 'Tap "Share"' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'Tap Share (□↑) at the bottom' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Tap Share (□↑) at the top right' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
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
        safariQuestion: 'ماذا ترى في أسفل Safari؟',
        optionDots: '•••',
        optionShare: '□↑',
        dotsSteps: [
            { icon: 'dots', text: 'اضغط ••• أسفل اليمين' },
            { icon: 'share', text: 'اضغط "مشاركة"' },
            { icon: 'chevron', text: 'مرر للأسفل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'اضغط زر المشاركة (□↑) في الأسفل' },
            { icon: 'chevron', text: 'مرر للأسفل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'اضغط زر المشاركة (□↑) أعلى اليمين' },
            { icon: 'chevron', text: 'مرر للأسفل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
    },
}

function StepIcon({ type }: { type: string }) {
    const style = {
        width: '32px', height: '32px', borderRadius: '8px',
        background: type === 'check' ? 'rgba(22,101,52,0.3)' : 'rgba(22,101,52,0.15)',
        border: '1px solid rgba(22,101,52,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#22a052', flexShrink: 0,
    }
    return (
        <div style={style}>
            {type === 'dots' && <IconThreeDots />}
            {type === 'share' && <IconShare />}
            {type === 'chevron' && <IconChevronDown />}
            {type === 'plus' && <IconPlus />}
            {type === 'check' && <IconCheck />}
        </div>
    )
}

type SafariVariant = 'dots' | 'share' | null

export default function InstallPrompt() {
    const { lang } = useLang()
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [activeTab, setActiveTab] = useState<'safari' | 'chrome'>('safari')
    const [safariVariant, setSafariVariant] = useState<SafariVariant>(null)
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
        const getSteps = () => {
            if (activeTab === 'chrome') return l.chromeSteps
            if (safariVariant === 'dots') return l.dotsSteps
            if (safariVariant === 'share') return l.shareSteps
            return null
        }

        const steps = getSteps()

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
              
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <img src="/logo.png" alt="logo" style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8', flex: 1 }}>
                        {l.iosTitle}
                    </div>
                    <button onClick={handleDismiss} style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>
                        ×
                    </button>
                </div>

             
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', background: '#0b1520', borderRadius: '10px', padding: '4px' }}>
                    {(['safari', 'chrome'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setSafariVariant(null) }}
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

           
                {activeTab === 'safari' && safariVariant === null && (
                    <div>
                        <div style={{ fontSize: '12px', color: '#607080', marginBottom: '10px', textAlign: 'center' }}>
                            {l.safariQuestion}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setSafariVariant('dots')}
                                style={{
                                    flex: 1, padding: '14px 8px', borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: '#162538', cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '6px',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                                <span style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '2px' }}>•••</span>
                                <span style={{ fontSize: '11px', color: '#607080' }}>{l.optionDots}</span>
                            </button>
                            <button
                                onClick={() => setSafariVariant('share')}
                                style={{
                                    flex: 1, padding: '14px 8px', borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: '#162538', cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '6px',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                                <span style={{ color: '#f0f4f8' }}><IconShare /></span>
                                <span style={{ fontSize: '11px', color: '#607080' }}>{l.optionShare}</span>
                            </button>
                        </div>
                    </div>
                )}

            
                {steps && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {activeTab === 'safari' && (
                            <button
                                onClick={() => setSafariVariant(null)}
                                style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '11px', textAlign: lang === 'ar' ? 'right' : 'left', padding: 0, marginBottom: '2px' }}
                            >
                                ← {lang === 'ar' ? 'رجوع' : lang === 'no' ? 'Tilbake' : 'Back'}
                            </button>
                        )}
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
                )}
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
            background: '#0d1b2a',
            border: '1px solid rgba(22,101,52,0.5)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.9)',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
        }}>
            <img src="/logo.png" alt="logo" style={{ width: '50px', height: '50px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {l.title}
                </div>
                <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.5 }}>
                    {l.sub}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                <button
                    onClick={handleInstall}
                    style={{
                        background: '#166534', color: '#fff', border: 'none',
                        borderRadius: '12px', padding: '12px 22px',
                        fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                        whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(22,101,52,0.5)',
                    }}
                >
                    {l.btn}
                </button>
                <button
                    onClick={handleDismiss}
                    style={{
                        background: 'none', border: 'none', color: '#607080',
                        cursor: 'pointer', fontSize: '12px', padding: 0,
                    }}
                >
                    {l.dismiss}
                </button>
            </div>
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

const IconShare = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const IconThreeDots = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
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
        safariQuestion: 'Hva ser du nederst i Safari?',
        dotsSteps: [
            { icon: 'dots', text: 'Trykk ••• nederst til høyre' },
            { icon: 'share', text: 'Trykk "Del"' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'Trykk Del-knappen nederst i Safari' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Trykk Del-knappen øverst til høyre' },
            { icon: 'chevron', text: 'Scroll ned og trykk "Mer"' },
            { icon: 'plus', text: 'Trykk "Legg til på startskjermen"' },
            { icon: 'check', text: 'Trykk "Legg til"' },
        ],
        back: 'Tilbake',
    },
    en: {
        title: 'Install Ålesund Masjid',
        sub: 'Add to home screen for quick access',
        btn: 'Install',
        dismiss: 'Not now',
        iosTitle: 'Install app on iPhone',
        safariLabel: 'Safari',
        chromeLabel: 'Chrome',
        safariQuestion: 'What do you see at the bottom of Safari?',
        dotsSteps: [
            { icon: 'dots', text: 'Tap ••• bottom right' },
            { icon: 'share', text: 'Tap "Share"' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'Tap the Share button at the bottom' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'Tap the Share button top right' },
            { icon: 'chevron', text: 'Scroll down and tap "More"' },
            { icon: 'plus', text: 'Tap "Add to Home Screen"' },
            { icon: 'check', text: 'Tap "Add"' },
        ],
        back: 'Back',
    },
    ar: {
        title: 'تثبيت مسجد أولسند',
        sub: 'أضف إلى الشاشة الرئيسية للوصول السريع',
        btn: 'تثبيت',
        dismiss: 'ليس الآن',
        iosTitle: 'تثبيت التطبيق على iPhone',
        safariLabel: 'Safari',
        chromeLabel: 'Chrome',
        safariQuestion: 'ماذا ترى في أسفل Safari؟',
        dotsSteps: [
            { icon: 'dots', text: 'اضغط ••• أسفل اليمين' },
            { icon: 'share', text: 'اضغط "مشاركة"' },
            { icon: 'chevron', text: 'انزل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
        shareSteps: [
            { icon: 'share', text: 'اضغط زر المشاركة في الأسفل' },
            { icon: 'chevron', text: 'انزل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
        chromeSteps: [
            { icon: 'share', text: 'اضغط زر المشاركة أعلى اليمين' },
            { icon: 'chevron', text: 'انزل واضغط "المزيد"' },
            { icon: 'plus', text: 'اضغط "أضف إلى الشاشة الرئيسية"' },
            { icon: 'check', text: 'اضغط "إضافة"' },
        ],
        back: 'رجوع',
    },
}

function StepIcon({ type }: { type: string }) {
    const style = {
        width: '32px', height: '32px', borderRadius: '8px',
        background: type === 'check' ? 'rgba(22,101,52,0.3)' : 'rgba(22,101,52,0.15)',
        border: '1px solid rgba(22,101,52,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#22a052', flexShrink: 0,
    }
    return (
        <div style={style}>
            {type === 'dots' && <IconThreeDots />}
            {type === 'share' && <IconShare />}
            {type === 'chevron' && <IconChevronDown />}
            {type === 'plus' && <IconPlus />}
            {type === 'check' && <IconCheck />}
        </div>
    )
}

type SafariVariant = 'dots' | 'share' | null

export default function InstallPrompt() {
    const { lang } = useLang()
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [activeTab, setActiveTab] = useState<'safari' | 'chrome'>('safari')
    const [safariVariant, setSafariVariant] = useState<SafariVariant>(null)
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
        const getSteps = () => {
            if (activeTab === 'chrome') return l.chromeSteps
            if (safariVariant === 'dots') return l.dotsSteps
            if (safariVariant === 'share') return l.shareSteps
            return null
        }
        const steps = getSteps()

        return (
            <div style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2000,
                width: 'calc(100% - 32px)',
                maxWidth: '420px',
                background: '#0d1b2a',
                border: '1px solid rgba(22,101,52,0.5)',
                borderRadius: '20px',
                padding: '18px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.9)',
                direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <img src="/logo.png" alt="logo" style={{ width: '36px', height: '36px', objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', flex: 1 }}>
                        {l.iosTitle}
                    </div>
                    <button onClick={handleDismiss} style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>
                        ×
                    </button>
                </div>

                {/* Browser tabs */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', background: '#0b1520', borderRadius: '10px', padding: '4px' }}>
                    {(['safari', 'chrome'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setSafariVariant(null) }}
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

                {/* Safari variant picker — icons only, no text symbols */}
                {activeTab === 'safari' && safariVariant === null && (
                    <div>
                        <div style={{ fontSize: '12px', color: '#a8b8c8', marginBottom: '10px', textAlign: 'center' }}>
                            {l.safariQuestion}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {/* Share icon option */}
                            <button
                                onClick={() => setSafariVariant('share')}
                                style={{
                                    flex: 1, padding: '18px 8px', borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: '#162538', cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '8px',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                                <span style={{ color: '#ffffff' }}><IconShare /></span>
                            </button>
                            {/* Three dots option */}
                            <button
                                onClick={() => setSafariVariant('dots')}
                                style={{
                                    flex: 1, padding: '18px 8px', borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: '#162538', cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '8px',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                                <span style={{ color: '#ffffff' }}><IconThreeDots /></span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Steps */}
                {steps && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {activeTab === 'safari' && (
                            <button
                                onClick={() => setSafariVariant(null)}
                                style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', fontSize: '11px', textAlign: lang === 'ar' ? 'right' : 'left', padding: 0, marginBottom: '2px' }}
                            >
                                {lang === 'ar' ? '→' : '←'} {l.back}
                            </button>
                        )}
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
                )}
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
            background: '#0d1b2a',
            border: '1px solid rgba(22,101,52,0.5)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.9)',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
        }}>
            <img src="/logo.png" alt="logo" style={{ width: '50px', height: '50px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {l.title}
                </div>
                <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.5 }}>
                    {l.sub}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                <button
                    onClick={handleInstall}
                    style={{
                        background: '#166534', color: '#fff', border: 'none',
                        borderRadius: '12px', padding: '12px 22px',
                        fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                        whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(22,101,52,0.5)',
                    }}
                >
                    {l.btn}
                </button>
                <button
                    onClick={handleDismiss}
                    style={{
                        background: 'none', border: 'none', color: '#607080',
                        cursor: 'pointer', fontSize: '12px', padding: 0,
                    }}
                >
                    {l.dismiss}
                </button>
            </div>
        </div>
    )
}