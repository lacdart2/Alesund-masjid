'use client'

import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { PrayerTime, PrayerKey } from '@/types'
import { getNextPrayer } from '@/lib/prayer'
import { PrayerIcon } from '@/components/ui/Icons'

const ARABIC: Record<PrayerKey, string> = {
    fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر',
    asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء',
}

const ALL_KEYS: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

interface PrayerGridProps {
    data: Omit<PrayerTime, 'id'>
}

export default function PrayerGrid({ data }: PrayerGridProps) {
    const { lang } = useLang()
    const t = translations[lang]
    const next = getNextPrayer(data)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginBottom: '22px' }}>
            {ALL_KEYS.map(key => {
                const isActive = key === next.key
                return (
                    <div
                        key={key}
                        className="card-top-line"
                        style={{
                            background: isActive ? 'rgba(22,101,52,0.08)' : '#111e2d',
                            border: isActive ? '1px solid #166534' : '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '16px',
                            padding: '20px 14px',
                            textAlign: 'center',
                            transition: 'all 0.25s',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Top accent line for active */}
                        {isActive && (
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#166534' }} />
                        )}

                        {/* Icon */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: '#22a052' }}>
                            <PrayerIcon prayerKey={key} size={22} />
                        </div>

                        {/* Name */}
                        <div style={{ fontSize: '11px', fontWeight: 700, color: isActive ? '#a8b8c8' : '#607080', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
                            {t.prayers.names[key]}
                        </div>

                        {/* Arabic */}
                        <div style={{ fontSize: '13px', color: '#607080', marginBottom: '10px', fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                            {ARABIC[key]}
                        </div>

                        {/* Time */}
                        <div style={{ fontSize: '23px', fontWeight: 700, color: isActive ? '#22a052' : '#f0f4f8', letterSpacing: '-0.5px', lineHeight: 1 }}>
                            {data[key]}
                        </div>

                        {/* Next badge */}
                        {isActive && (
                            <span style={{
                                display: 'inline-block', fontSize: '10px', fontWeight: 700,
                                letterSpacing: '0.8px', textTransform: 'uppercase',
                                background: '#166534', color: '#fff',
                                padding: '3px 8px', borderRadius: '20px', marginTop: '7px',
                            }}>
                                {t.prayers.nextLabel}
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}