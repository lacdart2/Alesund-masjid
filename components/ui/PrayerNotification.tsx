
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { IconBell, IconBellOff } from '@/components/ui/Icons'

const labels = {
    no: {
        enable: 'Aktiver bønnevarsler',
        enabled: 'Varsler aktivert',
        denied: 'Varsler blokkert',
    },
    en: {
        enable: 'Enable prayer alerts',
        enabled: 'Alerts enabled',
        denied: 'Notifications blocked',
    },
    ar: {
        enable: 'تفعيل تنبيهات الصلاة',
        enabled: 'التنبيهات مفعّلة',
        denied: 'التنبيهات محظورة',
    },
}

export default function PrayerNotification() {
    const { lang } = useLang()
    const [permission, setPermission] = useState<NotificationPermission>('default')
    const [enabled, setEnabled] = useState(false)
    const l = labels[lang]

    useEffect(() => {
        if (typeof Notification !== 'undefined') {
            setPermission(Notification.permission)
        }
        const saved = localStorage.getItem('prayerNotifications')
        if (saved === 'true') setEnabled(true)
    }, [])

    /*   const handleEnable = async () => {
          const result = await Notification.requestPermission()
          setPermission(result)
          if (result === 'granted') {
              setEnabled(true)
              localStorage.setItem('prayerNotifications', 'true')
              // ✅ Notify PrayerChecker in same tab
              window.dispatchEvent(new StorageEvent('storage', {
                  key: 'prayerNotifications',
                  newValue: 'true',
              }))
          }
      } */
    const handleEnable = async () => {
        const isCapacitor = typeof (window as any).Capacitor !== 'undefined'

        if (isCapacitor) {
            try {
                const { LocalNotifications } = await import('@capacitor/local-notifications')
                const result = await LocalNotifications.requestPermissions()
                if (result.display === 'granted') {
                    setEnabled(true)
                    setPermission('granted')
                    localStorage.setItem('prayerNotifications', 'true')
                    window.dispatchEvent(new StorageEvent('storage', {
                        key: 'prayerNotifications',
                        newValue: 'true',
                    }))
                }
            } catch (e) {
                console.error('Local notifications error:', e)
            }
        } else {
            const result = await Notification.requestPermission()
            setPermission(result)
            if (result === 'granted') {
                setEnabled(true)
                localStorage.setItem('prayerNotifications', 'true')
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'prayerNotifications',
                    newValue: 'true',
                }))
            }
        }
    }
    const handleDisable = () => {
        setEnabled(false)
        localStorage.setItem('prayerNotifications', 'false')
        // ✅ Notify PrayerChecker in same tab
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'prayerNotifications',
            newValue: 'false',
        }))
    }

    //if (typeof Notification === 'undefined') return null
    const isCapacitor = typeof (window as any).Capacitor !== 'undefined'
    if (typeof Notification === 'undefined' && !isCapacitor) return null
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            {permission === 'denied' ? (
                <div style={{ fontSize: '12px', color: '#607080', textAlign: 'center', padding: '8px' }}>
                    {l.denied}
                </div>
            ) : (
                <button
                    onClick={enabled ? handleDisable : handleEnable}
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
            )}
        </div>
    )
}