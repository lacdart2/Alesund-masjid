'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { PrayerTime, PrayerKey } from '@/types'
import { PRAYER_TIMES, getTodayPrayers, getNextPrayer, formatCountdown } from '@/lib/prayer'
import { IconChevronLeft, IconChevronRight } from '@/components/ui/Icons'
import { text } from '@/lib/style'

const PRAYER_ROWS: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

export default function PhoneMockup() {
    const { lang } = useLang()
    const t = translations[lang]
    const isRTL = lang === 'ar'
    const [isMobile, setIsMobile] = useState<boolean | null>(null)
    const [dateIndex, setDateIndex] = useState<number>(-1)
    const [countdown, setCountdown] = useState('--:--:--')

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const todayData = getTodayPrayers()
    const displayData: Omit<PrayerTime, 'id'> = dateIndex === -1
        ? todayData
        : (PRAYER_TIMES[dateIndex] ?? todayData)

    const next = getNextPrayer(todayData)

    useEffect(() => {
        const tick = () => setCountdown(formatCountdown(next.time))
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [next.time])

    if (isMobile === null) return <div style={{ width: '300px', height: '560px', background: '#111e2d', borderRadius: '38px' }} />

    const todayIndex = PRAYER_TIMES.findIndex(p => p.date === todayData.date)
    const resolvedIndex = dateIndex === -1 ? todayIndex : dateIndex
    const canGoPrev = resolvedIndex > 0
    const canGoNext = resolvedIndex < PRAYER_TIMES.length - 1

    const handleNav = (dir: 1 | -1) => {
        const newIndex = Math.max(0, Math.min(PRAYER_TIMES.length - 1, resolvedIndex + dir))
        setDateIndex(newIndex)
    }

    const dateObj = new Date(displayData.date + 'T12:00:00')
    const dayName = t.prayers.dayNames[dateObj.getDay()]
    const day = dateObj.getDate()
    const month = t.prayers.monthNames[dateObj.getMonth()]
    const dateLabel = `${dayName} ${day} ${month}`
    const isToday = displayData.date === todayData.date

    const phoneWidth = isMobile ? 'calc(100vw - 32px)' : '300px'
    const phoneHeight = isMobile ? 'auto' : '560px'
    const phoneMinHeight = isMobile ? '500px' : undefined

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-end',
                width: '100%',
            }}
            className="animate-fade-up-1"
        >
            <div style={{
                width: phoneWidth,
                height: phoneHeight,
                minHeight: phoneMinHeight,
                maxWidth: '430px',
                background: '#111e2d',
                borderRadius: isMobile ? '28px' : '38px',
                border: '2px solid rgba(255,255,255,0.09)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ width: '84px', height: '22px', background: '#0b1520', borderRadius: '0 0 14px 14px', margin: '0 auto', flexShrink: 0 }} />

                <div className="phone-scroll" style={{ flex: 1, overflowY: 'auto', padding: '13px', display: 'flex', flexDirection: 'column', gap: '9px' }}>

                    {/* Green card */}
                    <div style={{ background: 'linear-gradient(135deg, #166534, #0e5027)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(22,101,52,0.4)', direction: isRTL ? 'rtl' : 'ltr' }}>
                        {/* Top row — label + countdown */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ ...text.labelCaps, color: 'rgba(255,255,255,0.45)' }}>
                                {t.phone.next}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '7px', padding: '4px 8px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                                {countdown}
                            </div>
                        </div>

                        {/* Prayer name */}
                        <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2px', marginBottom: '4px' }}>
                            {t.prayers.names[next.key]}
                        </div>

                        {/* Prayer time — dominant */}
                        <div style={{ fontSize: '52px', fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, marginBottom: '8px' }}>
                            {next.time}
                        </div>

                        {/* Mosque name */}
                        <div style={{ ...text.label, color: 'rgba(255,255,255,0.4)' }}>
                            {t.phone.sub}
                        </div>
                    </div>

                    {/* Date navigator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#162538', borderRadius: '10px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.06)', direction: 'ltr' }}>
                        <button
                            onClick={() => handleNav(isRTL ? 1 : -1)}
                            disabled={isRTL ? !canGoNext : !canGoPrev}
                            style={{ background: 'none', border: 'none', cursor: (isRTL ? canGoNext : canGoPrev) ? 'pointer' : 'not-allowed', color: (isRTL ? canGoNext : canGoPrev) ? '#22a052' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', flexShrink: 0 }}
                        >
                            <IconChevronLeft size={16} />
                        </button>
                        <div style={{ textAlign: 'center', flex: 1, padding: '0 4px' }}>
                            <div style={{ ...text.prayerName, fontSize: '13px', color: '#a8b8c8', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {dateLabel}
                            </div>
                            {isToday && (
                                <div style={{ ...text.label, color: '#22a052', marginTop: '1px' }}>
                                    {t.phone.today}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => handleNav(isRTL ? -1 : 1)}
                            disabled={isRTL ? !canGoPrev : !canGoNext}
                            style={{ background: 'none', border: 'none', cursor: (isRTL ? canGoPrev : canGoNext) ? 'pointer' : 'not-allowed', color: (isRTL ? canGoPrev : canGoNext) ? '#22a052' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', flexShrink: 0 }}
                        >
                            <IconChevronRight size={16} />
                        </button>
                    </div>

                    {/* Prayer rows */}
                    {PRAYER_ROWS.map(key => {
                        const isNext = key === next.key && isToday
                        return (
                            <div key={key} style={{ background: isNext ? 'rgba(22,101,52,0.1)' : '#162538', borderRadius: '9px', padding: '13px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: isNext ? '1px solid rgba(22,101,52,0.3)' : '1px solid rgba(255,255,255,0.06)', direction: isRTL ? 'rtl' : 'ltr' }}>
                                <span style={{ ...text.prayerName, fontWeight: isNext ? 700 : 600, color: isNext ? '#fff' : '#a8b8c8', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : 'inherit' }}>
                                    {t.prayers.names[key]}
                                </span>
                                <span style={{ ...text.prayerTime, color: isNext ? '#22a052' : '#607080' }}>
                                    {displayData[key]}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}