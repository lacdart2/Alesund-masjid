'use client'

import { useEffect } from 'react'

export default function StatusBarInit() {
    useEffect(() => {
        const init = async () => {
            try {
                const { StatusBar, Style } = await import('@capacitor/status-bar')
                await StatusBar.setStyle({ style: Style.Dark })
                await StatusBar.setBackgroundColor({ color: '#0b1520' })
            } catch {
                // Not running in Capacitor — ignore
            }
        }
        init()
    }, [])

    return null
}