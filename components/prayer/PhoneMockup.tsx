/* 
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { PrayerTime, PrayerKey } from '@/types'
import { PRAYER_TIMES, getTodayPrayers, getNextPrayer, formatCountdown } from '@/lib/prayer'
import { IconChevronLeft, IconChevronRight } from '@/components/ui/Icons'

const ARABIC: Record<PrayerKey, string> = {
    fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر',
    asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء',
}

const PRAYER_ROWS: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

export default function PhoneMockup() {
    const { lang } = useLang()
    const t = translations[lang]

    const [dateIndex, setDateIndex] = useState<number>(-1)
    const [countdown, setCountdown] = useState('--:--:--')
    const [isMobile, setIsMobile] = useState(false)

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
                width: 'min(300px, 100%)',
                height: '560px',
                background: '#111e2d',
                borderRadius: '38px',
                border: '2px solid rgba(255,255,255,0.09)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
            }}>
            
                <div style={{ width: '84px', height: '22px', background: '#0b1520', borderRadius: '0 0 14px 14px', margin: '0 auto', flexShrink: 0 }} />

            
                <div className="phone-scroll" style={{ flex: 1, overflowY: 'auto', padding: '13px', display: 'flex', flexDirection: 'column', gap: '9px' }}>

               
                    <div style={{
                        background: 'linear-gradient(135deg, #166534, #0e5027)',
                        borderRadius: '14px', padding: '16px',
                        border: '1px solid rgba(22,101,52,0.4)',
                    }}>
                        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '4px' }}>
                            {t.phone.next}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                                {t.prayers.names[next.key]}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '7px', padding: '4px 8px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                                {countdown}
                            </div>
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '3px' }}>
                            {t.phone.highlight}
                        </div>
                        <div style={{ fontSize: '34px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>
                            {next.time}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>
                            {t.phone.sub}
                        </div>
                    </div>

                
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: '#162538', borderRadius: '10px', padding: '8px 12px',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        <button
                            onClick={() => handleNav(-1)}
                            disabled={!canGoPrev}
                            style={{
                                background: 'none', border: 'none', cursor: canGoPrev ? 'pointer' : 'not-allowed',
                                color: canGoPrev ? '#22a052' : 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '28px', height: '28px', borderRadius: '6px',
                                transition: 'all 0.15s',
                            }}
                        >
                            <IconChevronLeft size={14} />
                        </button>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#a8b8c8', letterSpacing: '0.3px' }}>
                                {dateLabel}
                            </div>
                            {isToday && (
                                <div style={{ fontSize: '10px', color: '#22a052', marginTop: '1px' }}>
                                    {t.phone.today}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => handleNav(1)}
                            disabled={!canGoNext}
                            style={{
                                background: 'none', border: 'none', cursor: canGoNext ? 'pointer' : 'not-allowed',
                                color: canGoNext ? '#22a052' : 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '28px', height: '28px', borderRadius: '6px',
                                transition: 'all 0.15s',
                            }}
                        >
                            <IconChevronRight size={14} />
                        </button>
                    </div>

                 
                    {PRAYER_ROWS.map(key => {
                        const isNext = key === next.key && isToday
                        return (
                            <div
                                key={key}
                                style={{
                                    background: isNext ? 'rgba(22,101,52,0.1)' : '#162538',
                                    borderRadius: '9px', padding: '11px 13px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    border: isNext ? '1px solid rgba(22,101,52,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: '14px', fontWeight: isNext ? 600 : 500, color: isNext ? '#fff' : '#a8b8c8' }}>
                                    {t.prayers.names[key]}
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: isNext ? '#22a052' : '#607080' }}>
                                    {displayData[key]}
                                </span>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
} */
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { PrayerTime, PrayerKey } from '@/types'
import { PRAYER_TIMES, getTodayPrayers, getNextPrayer, formatCountdown } from '@/lib/prayer'
import { IconChevronLeft, IconChevronRight } from '@/components/ui/Icons'
import { text } from '@/lib/style'

const ARABIC: Record<PrayerKey, string> = {
    fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر',
    asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء',
}

const PRAYER_ROWS: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

export default function PhoneMockup() {
    const { lang } = useLang()
    const t = translations[lang]
    const isRTL = lang === 'ar'

    const [dateIndex, setDateIndex] = useState<number>(-1)
    const [countdown, setCountdown] = useState('--:--:--')
    const [isMobile, setIsMobile] = useState(false)

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

    // ✅ Mobile: full width minus padding. Desktop: fixed 300px
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
                {/* Notch */}
                <div style={{
                    width: '84px', height: '22px',
                    background: '#0b1520',
                    borderRadius: '0 0 14px 14px',
                    margin: '0 auto', flexShrink: 0,
                }} />

                {/* Body */}
                <div className="phone-scroll" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '9px',
                }}>
                    {/* Next prayer card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #166534, #0e5027)',
                        borderRadius: '14px',
                        padding: '16px',
                        border: '1px solid rgba(22,101,52,0.4)',
                        direction: isRTL ? 'rtl' : 'ltr',
                    }}>
                        <div style={{ ...text.labelCaps, color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>
                            {t.phone.next}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                                {t.prayers.names[next.key]}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '7px', padding: '4px 8px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                                {countdown}
                            </div>
                        </div>
                        <div style={{ ...text.labelCaps, color: 'rgba(255,255,255,0.4)', marginBottom: '3px' }}>
                            {t.phone.highlight}
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>
                            {next.time}
                        </div>
                        <div style={{ ...text.label, color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>
                            {t.phone.sub}
                        </div>
                    </div>

                    {/* Date navigator */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#162538',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        direction: 'ltr', // always LTR for date nav layout
                    }}>
                        {/* ✅ In RTL, prev = right arrow, next = left arrow */}
                        <button
                            onClick={() => handleNav(isRTL ? 1 : -1)}
                            disabled={isRTL ? !canGoNext : !canGoPrev}
                            style={{
                                background: 'none', border: 'none',
                                cursor: (isRTL ? canGoNext : canGoPrev) ? 'pointer' : 'not-allowed',
                                color: (isRTL ? canGoNext : canGoPrev) ? '#22a052' : 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '32px', height: '32px', borderRadius: '6px',
                                flexShrink: 0,
                            }}
                        >
                            <IconChevronLeft size={16} />
                        </button>

                        {/* ✅ More space for date text */}
                        <div style={{ textAlign: 'center', flex: 1, padding: '0 4px' }}>
                            <div style={{
                                ...text.prayerName,
                                fontSize: '13px',
                                color: '#a8b8c8',
                                fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : 'inherit',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
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
                            style={{
                                background: 'none', border: 'none',
                                cursor: (isRTL ? canGoPrev : canGoNext) ? 'pointer' : 'not-allowed',
                                color: (isRTL ? canGoPrev : canGoNext) ? '#22a052' : 'rgba(255,255,255,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '32px', height: '32px', borderRadius: '6px',
                                flexShrink: 0,
                            }}
                        >
                            <IconChevronRight size={16} />
                        </button>
                    </div>

                    {/* Prayer rows */}
                    {PRAYER_ROWS.map(key => {
                        const isNext = key === next.key && isToday
                        return (
                            <div
                                key={key}
                                style={{
                                    background: isNext ? 'rgba(22,101,52,0.1)' : '#162538',
                                    borderRadius: '9px',
                                    padding: '13px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: isNext ? '1px solid rgba(22,101,52,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                    direction: isRTL ? 'rtl' : 'ltr',
                                }}
                            >
                                <span style={{
                                    ...text.prayerName,
                                    fontWeight: isNext ? 700 : 600,
                                    color: isNext ? '#fff' : '#a8b8c8',
                                    fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : 'inherit',
                                }}>
                                    {t.prayers.names[key]}
                                </span>
                                <span style={{
                                    ...text.prayerTime,
                                    color: isNext ? '#22a052' : '#607080',
                                }}>
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