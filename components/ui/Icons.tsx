interface IconProps {
    size?: number
    className?: string
}

const ic = (size: number, cls: string) => ({
    width: size, height: size,
    className: cls,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor' as const,
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
})

export function IconMosque({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M3 21h18M9 21V10.5M15 21V10.5M12 3a3 3 0 0 1 3 3v1l-3 2-3-2V6a3 3 0 0 1 3-3zM6 10.5V8a6 6 0 0 1 12 0v2.5M3 10.5h18" /></svg>
}

export function IconSpeakerphone({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M18 8a3 3 0 0 1 0 6M10 8v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5" /><path d="M12 8H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7l5 3V5l-5 3z" /></svg>
}

export function IconCalendar({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /><circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="12" cy="16" r="1" fill="currentColor" /></svg>
}

export function IconMapPin({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
}

export function IconMail({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
}

export function IconPhone({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
}

export function IconWhatsapp({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10c0 .6.2 1.2.5 1.7l.5.8-1.1 3.2 3.3-1.1.8.4c.5.3 1 .5 1.6.5a4 4 0 0 0 0-8c-2.2 0-4 1.8-4 4z" /></svg>
}

export function IconBuilding({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></svg>
}

export function IconClock({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
}

export function IconMap({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3V7" /><path d="M9 4v13M15 7v13" /></svg>
}

export function IconHeart({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" /></svg>
}

export function IconMoonStars({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /><path d="M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" /></svg>
}

export function IconSun({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
}

export function IconSunrise({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M3 17h1M21 17h1M7.05 10.05l-.7-.7M17.66 10.05l.7-.7M12 3v2M5 21h14M9 17a3 3 0 1 1 6 0" /></svg>
}

export function IconSunset({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M3 17h1M21 17h1M7.05 10.05l-.7-.7M17.66 10.05l.7-.7M12 3v2M5 21h14M9 17a3 3 0 1 1 6 0M3 21h18" /></svg>
}

export function IconMoon({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg>
}

export function IconCloudSun({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M6 16a3 3 0 0 1 0-6 4 4 0 0 1 8 0 3 3 0 0 1 0 6H6z" /></svg>
}

export function IconBook({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
}

export function IconTool({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
}

export function IconChevronLeft({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="m15 18-6-6 6-6" /></svg>
}

export function IconChevronRight({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="m9 18 6-6-6-6" /></svg>
}

export function IconMenu({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
}

export function IconX({ size = 24, className = '' }: IconProps) {
    return <svg {...ic(size, className)}><path d="M18 6 6 18M6 6l12 12" /></svg>
}

export function PrayerIcon({ prayerKey, size = 24 }: { prayerKey: string; size?: number }) {
    const p = { size, className: '' }
    switch (prayerKey) {
        case 'fajr': return <IconMoonStars {...p} />
        case 'sunrise': return <IconSunrise {...p} />
        case 'dhuhr': return <IconSun {...p} />
        case 'asr': return <IconCloudSun {...p} />
        case 'maghrib': return <IconSunset {...p} />
        case 'isha': return <IconMoon {...p} />
        default: return <IconSun {...p} />
    }
}

export function AnnouncementIcon({ icon, size = 20 }: { icon: string; size?: number }) {
    const p = { size, className: '' }
    switch (icon) {
        case 'moon-stars': return <IconMoonStars {...p} />
        case 'book': return <IconBook {...p} />
        case 'tool': return <IconTool {...p} />
        default: return <IconMosque {...p} />
    }
}