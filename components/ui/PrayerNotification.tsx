
'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/lib/context'
import { IconBell, IconBellOff, IconSettings, IconX } from '@/components/ui/Icons'

const ADHANS = [
    { id: 'abdul-rahman', label: 'Abdul Rahman Al Arake', file: '/adhan/abdul-rahman-al-arake.mp3' },
    { id: 'adan-al-jazaer', label: 'Adan Al Jazaer', file: '/adhan/adan-al-jazaer.mp3' },
    { id: 'adham', label: 'Adham Al Sharqawe', file: '/adhan/adham-al-sharqawe.mp3' },
    { id: 'hamza', label: 'Hamza Al Majale', file: '/adhan/hamza-al-majale.mp3' },
    { id: 'tamer', label: 'Tamer Islam', file: '/adhan/tamer-islam.mp3' },
]
const PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const

const labels = {
    no: {
        settings: 'Adhan-innstillinger',
        enable: 'Aktiver varsler',
        enabled: 'Varsler aktivert',
        denied: 'Varsler blokkert',
        adhanSelect: 'Velg adhan',
        preview: 'Forhåndsvis',
        silent: 'Stille modus',
        silentDesc: 'Kun varsling, ingen lyd',
        prayers: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
        perPrayer: 'Aktiver per bønn',
        close: 'Lukk',
        save: 'Lagre',
    },
    en: {
        settings: 'Adhan Settings',
        enable: 'Enable alerts',
        enabled: 'Alerts enabled',
        denied: 'Notifications blocked',
        adhanSelect: 'Select adhan',
        preview: 'Preview',
        silent: 'Silent mode',
        silentDesc: 'Notification only, no sound',
        prayers: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
        perPrayer: 'Enable per prayer',
        close: 'Close',
        save: 'Save',
    },
    ar: {
        settings: 'إعدادات الأذان',
        enable: 'تفعيل التنبيهات',
        enabled: 'التنبيهات مفعّلة',
        denied: 'التنبيهات محظورة',
        adhanSelect: 'اختر الأذان',
        preview: 'معاينة',
        silent: 'الوضع الصامت',
        silentDesc: 'إشعار فقط، بدون صوت',
        prayers: { fajr: 'الفجر', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء' },
        perPrayer: 'تفعيل لكل صلاة',
        close: 'إغلاق',
        save: 'حفظ',
    },
}

export default function PrayerNotification() {
    const { lang } = useLang()
    const l = labels[lang]
    const [permission, setPermission] = useState<NotificationPermission>('default')
    const [enabled, setEnabled] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedAdhan, setSelectedAdhan] = useState('adhan1')
    const [silentMode, setSilentMode] = useState(false)
    const [playingId, setPlayingId] = useState<string | null>(null)
    const currentAudioRef = useRef<HTMLAudioElement | null>(null)
    const [prayerToggles, setPrayerToggles] = useState<Record<string, boolean>>({
        fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true,
    })


    useEffect(() => {
        if (typeof Notification !== 'undefined') setPermission(Notification.permission)
        const saved = localStorage.getItem('prayerNotifications')
        if (saved === 'true') setEnabled(true)
        const savedAdhan = localStorage.getItem('selectedAdhan')
        if (savedAdhan) setSelectedAdhan(savedAdhan)
        const savedSilent = localStorage.getItem('silentMode')
        if (savedSilent === 'true') setSilentMode(true)
        const savedToggles = localStorage.getItem('prayerToggles')
        if (savedToggles) setPrayerToggles(JSON.parse(savedToggles))
    }, [])
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [modalOpen])
    const requestPermission = async () => {
        alert('Button tapped! Permission: ' + (typeof Notification !== 'undefined' ? Notification.permission : 'undefined'))
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            setEnabled(true)
            localStorage.setItem('prayerNotifications', 'true')
            window.dispatchEvent(new StorageEvent('storage', { key: 'prayerNotifications', newValue: 'true' }))
            return
        }
        const isCapacitor = typeof (window as any).Capacitor !== 'undefined'
        if (isCapacitor) {
            try {
                const { LocalNotifications } = await import('@capacitor/local-notifications')
                const result = await LocalNotifications.requestPermissions()
                if (result.display === 'granted') {
                    setEnabled(true)
                    setPermission('granted')
                    localStorage.setItem('prayerNotifications', 'true')
                    window.dispatchEvent(new StorageEvent('storage', { key: 'prayerNotifications', newValue: 'true' }))
                }
            } catch (e) { console.error(e) }
        } else {
            const result = await Notification.requestPermission()
            setPermission(result)
            if (result === 'granted') {
                setEnabled(true)
                localStorage.setItem('prayerNotifications', 'true')
                window.dispatchEvent(new StorageEvent('storage', { key: 'prayerNotifications', newValue: 'true' }))
            }
        }
    }

    const handleDisable = () => {
        setEnabled(false)
        localStorage.setItem('prayerNotifications', 'false')
        window.dispatchEvent(new StorageEvent('storage', { key: 'prayerNotifications', newValue: 'false' }))
    }

    const handleSave = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause()
            currentAudioRef.current.remove()
            currentAudioRef.current = null
        }
        setPlayingId(null)
        localStorage.setItem('selectedAdhan', selectedAdhan)
        localStorage.setItem('silentMode', String(silentMode))
        localStorage.setItem('prayerToggles', JSON.stringify(prayerToggles))
        setModalOpen(false)
    }


    const togglePrayer = (key: string) => {
        setPrayerToggles(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const isCapacitor = typeof (window as any).Capacitor !== 'undefined'
    if (typeof Notification === 'undefined' && !isCapacitor) return null
    if (permission === 'denied') return (
        <div style={{ fontSize: '12px', color: '#607080', textAlign: 'center', padding: '8px' }}>
            {l.denied}
        </div>
    )

    return (
        <>

            {/* Main button row */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px 0' }}>
                <button
                    onClick={enabled ? handleDisable : requestPermission}
                    style={{
                        background: enabled ? 'rgba(22,101,52,0.15)' : 'linear-gradient(135deg, #166534, #1a7a40)',
                        color: enabled ? '#22a052' : '#fff',
                        border: enabled ? '1px solid rgba(22,101,52,0.4)' : 'none',
                        borderRadius: '14px', padding: '14px 28px',
                        fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px',
                        boxShadow: enabled ? 'none' : '0 4px 20px rgba(22,101,52,0.35)',
                    }}
                >
                    {enabled ? <IconBellOff size={20} /> : <IconBell size={20} />}
                    {enabled ? l.enabled : l.enable}
                </button>

                {/* Gear icon */}
                <button
                    onClick={() => setModalOpen(true)}
                    style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '14px', width: '52px', height: '52px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#a8b8c8', transition: 'all 0.2s',
                    }}
                >
                    <IconSettings size={22} />
                </button>
            </div>

            {/* Settings Modal */}
            {modalOpen && (
                <div
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 5000,
                        background: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>

                    <div
                        onClick={e => e.stopPropagation()}
                        onWheel={e => e.stopPropagation()}
                        style={{
                            background: '#111e2d',
                            borderRadius: '24px 24px 0 0',
                            width: '100%', maxWidth: '480px',
                            padding: '24px 20px',
                            paddingBottom: 'max(32px, env(safe-area-inset-bottom, 20px))',
                            maxHeight: '85vh', overflowY: 'auto',
                            direction: lang === 'ar' ? 'rtl' : 'ltr',
                            scrollbarWidth: 'none' as const,
                            overscrollBehavior: 'contain' as const,

                        }}>
                        {/* Modal header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4f8' }}>{l.settings}</div>
                            <button onClick={() => setModalOpen(false)} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a8b8c8' }}>
                                <IconX size={18} />
                            </button>
                        </div>
                        {/* DEBUG - remove after fix */}
                        <div style={{ fontSize: '11px', color: '#607080', marginBottom: '8px', textAlign: 'center' }}>
                            Permission: {permission} | Enabled: {String(enabled)} | Notification: {typeof Notification !== 'undefined' ? Notification.permission : 'undefined'}
                        </div>

                        {/* Enable toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#162538', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: enabled ? '#22a052' : '#607080' }}><IconBell size={20} /></span>
                                <span style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4f8' }}>{l.enable}</span>
                            </div>
                            <button
                                onClick={enabled ? handleDisable : requestPermission}
                                style={{
                                    width: '52px', height: '28px', borderRadius: '14px',
                                    background: enabled ? '#166534' : 'rgba(255,255,255,0.1)',
                                    border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '3px',
                                    left: enabled ? '26px' : '3px',
                                    width: '22px', height: '22px',
                                    borderRadius: '50%', background: '#fff',
                                    transition: 'all 0.15s',
                                }} />
                            </button>
                        </div>

                        {/* Silent mode */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#162538', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
                            <div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0f4f8' }}>{l.silent}</div>
                                <div style={{ fontSize: '12px', color: '#607080', marginTop: '2px' }}>{l.silentDesc}</div>
                            </div>
                            <button
                                onClick={() => setSilentMode(!silentMode)}
                                style={{
                                    width: '52px', height: '28px', borderRadius: '14px',
                                    background: silentMode ? '#166534' : 'rgba(255,255,255,0.1)',
                                    border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '3px',
                                    left: silentMode ? '26px' : '3px',
                                    width: '22px', height: '22px',
                                    borderRadius: '50%', background: '#fff',
                                    transition: 'all 0.15s',
                                }} />
                            </button>
                        </div>

                        {/* Adhan selection */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>{l.adhanSelect}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {ADHANS.map(adhan => (
                                    <div key={adhan.id} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: selectedAdhan === adhan.id ? 'rgba(22,101,52,0.15)' : '#162538',
                                        border: `1px solid ${selectedAdhan === adhan.id ? 'rgba(22,101,52,0.4)' : 'transparent'}`,
                                        borderRadius: '12px', padding: '12px 14px',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                        onClick={() => setSelectedAdhan(adhan.id)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {/* Radio circle */}
                                            <div style={{
                                                width: '20px', height: '20px', borderRadius: '50%',
                                                border: `2px solid ${selectedAdhan === adhan.id ? '#22a052' : '#607080'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                {selectedAdhan === adhan.id && (
                                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22a052' }} />
                                                )}
                                            </div>
                                            <span style={{ fontSize: '15px', fontWeight: 500, color: '#f0f4f8' }}>{adhan.label}</span>
                                        </div>
                                        {/* Preview button */}
                                        <button
                                            onClick={e => {
                                                e.stopPropagation()

                                                // Stop current playing
                                                if (currentAudioRef.current) {
                                                    currentAudioRef.current.pause()
                                                    currentAudioRef.current.remove()
                                                    currentAudioRef.current = null
                                                }

                                                // If same adhan was playing, just stop it
                                                if (playingId === adhan.id) {
                                                    setPlayingId(null)
                                                    return
                                                }

                                                // Play new adhan
                                                const audio = document.createElement('audio')
                                                audio.src = `${window.location.origin}${adhan.file}`
                                                audio.preload = 'auto'
                                                document.body.appendChild(audio)
                                                currentAudioRef.current = audio
                                                setPlayingId(adhan.id)

                                                audio.play().catch(err => console.error('Preview error:', err))

                                                audio.onended = () => {
                                                    setPlayingId(null)
                                                    currentAudioRef.current = null
                                                    audio.remove()
                                                }

                                                setTimeout(() => {
                                                    if (currentAudioRef.current === audio) {
                                                        audio.pause()
                                                        audio.remove()
                                                        currentAudioRef.current = null
                                                        setPlayingId(null)
                                                    }
                                                }, 30000)
                                            }}
                                            style={{
                                                background: playingId === adhan.id ? 'rgba(22,101,52,0.3)' : 'rgba(255,255,255,0.07)',
                                                border: playingId === adhan.id ? '1px solid rgba(22,101,52,0.5)' : 'none',
                                                borderRadius: '8px', padding: '6px 12px',
                                                color: playingId === adhan.id ? '#22a052' : '#a8b8c8',
                                                fontSize: '12px', fontWeight: 600,
                                                cursor: 'pointer', position: 'relative', zIndex: 10,
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {playingId === adhan.id ? '■ Stop' : `▶ ${l.preview}`}
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Per-prayer toggles */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>{l.perPrayer}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {PRAYERS.map(key => (
                                    <div key={key} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        background: '#162538', borderRadius: '12px', padding: '12px 14px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {prayerToggles[key]
                                                ? <span style={{ color: '#22a052' }}><IconBell size={18} /></span>
                                                : <span style={{ color: '#607080' }}><IconBellOff size={18} /></span>
                                            }
                                            <span style={{ fontSize: '15px', fontWeight: 500, color: '#f0f4f8' }}>
                                                {l.prayers[key]}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => togglePrayer(key)}
                                            style={{
                                                width: '52px', height: '28px', borderRadius: '14px',
                                                background: prayerToggles[key] ? '#166534' : 'rgba(255,255,255,0.1)',
                                                border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                                            }}
                                        >
                                            <div style={{
                                                position: 'absolute', top: '3px',
                                                left: prayerToggles[key] ? '26px' : '3px',
                                                width: '22px', height: '22px',
                                                borderRadius: '50%', background: '#fff',
                                                transition: 'all 0.15s',
                                            }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save button */}
                        <button
                            onClick={handleSave}
                            style={{
                                width: '100%', padding: '16px', borderRadius: '14px',
                                background: 'linear-gradient(135deg, #166534, #1a7a40)',
                                color: '#fff', fontSize: '16px', fontWeight: 700,
                                border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 20px rgba(22,101,52,0.35)',
                            }}
                        >
                            {l.save}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}