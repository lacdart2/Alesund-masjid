'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/context'
import { IconX, IconMosque } from '@/components/ui/Icons'

const labels = {
    no: {
        prayerTime: (name: string) => `Tid for ${name}`,
        stop: 'Stopp',
        dua: 'Måtte Allah akseptere din bønn 🤲',
    },
    en: {
        prayerTime: (name: string) => `Time for ${name}`,
        stop: 'Stop',
        dua: 'May Allah accept your prayer 🤲',
    },
    ar: {
        prayerTime: (name: string) => `حان وقت ${name}`,
        stop: 'إيقاف',
        dua: 'تقبل الله صلاتك 🤲',
    },
}

interface AdhanBannerProps {
    banner: { prayerKey: string; time: string } | null
    onClose: () => void
}

export default function AdhanBanner({ banner, onClose }: AdhanBannerProps) {
    const { lang } = useLang()
    const l = labels[lang]
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const bannerTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Play adhan when banner appears
    useEffect(() => {
        if (banner) {
            // Play adhan
            if (!audioRef.current) {
                audioRef.current = new Audio('/adhan.mp3')
            }
            audioRef.current.currentTime = 0
            audioRef.current.play().catch(() => { })

            // Auto dismiss after 60 seconds
            if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
            bannerTimerRef.current = setTimeout(() => {
                handleClose()
            }, 60000)
        }
        return () => {
            if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
        }
    }, [banner])

    const handleClose = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
        onClose()
    }

    if (!banner) return null

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4000,
            width: 'calc(100% - 32px)',
            maxWidth: '420px',
            background: 'linear-gradient(135deg, #0e5027, #166534)',
            border: '1px solid rgba(34,160,82,0.4)',
            borderRadius: '20px',
            padding: '18px 20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,160,82,0.2)',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            animation: 'slideDown 0.4s ease',
        }}>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                        <IconMosque size={20} />
                    </div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                            {l.prayerTime(banner.prayerKey)}
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1 }}>
                            {banner.time}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}
                >
                    <IconX size={18} />
                </button>
            </div>

            {/* Dua */}
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px', fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : 'inherit' }}>
                {l.dua}
            </div>

            {/* Stop button */}
            <button
                onClick={handleClose}
                style={{
                    width: '100%', padding: '11px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff', fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s',
                    letterSpacing: '-0.2px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
                {l.stop} ■
            </button>
        </div>
    )
}