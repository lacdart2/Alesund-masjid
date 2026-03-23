'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { Capacitor } from '@capacitor/core'

const MESSAGES = {
    no: 'Android-app kommer snart!',
    en: 'Android app coming soon!',
    ar: 'تطبيق أندرويد قريباً!',
}

export default function AndroidBanner() {
    const { lang } = useLang()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Skip on Capacitor (native app)
        if (Capacitor.isNativePlatform()) return
        // Skip if already dismissed
        if (localStorage.getItem('android-banner-dismissed') === '1') return
        setVisible(true)
    }, [])

    const dismiss = () => {
        localStorage.setItem('android-banner-dismissed', '1')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            background: '#166534',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 -2px 12px rgba(0,0,0,0.3)',
        }}>
            <span>📱 {MESSAGES[lang]}</span>
            <button
                onClick={dismiss}
                style={{
                    position: 'absolute',
                    right: '14px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '18px',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: 0,
                }}
                aria-label="Lukk"
            >
                ×
            </button>
        </div>
    )
}