// ─── Typography System ────────────────────────────────────────────
// Mobile-first type scale for Ålesund Masjid web app

export const text = {
    appName: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#f0f4f8',
        letterSpacing: '-0.3px',
        lineHeight: 1.2,
    },
    tagline: {
        fontSize: '13px',
        fontWeight: 500,
        color: '#22a052',
        letterSpacing: '0.4px',
    },
    badge: {
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.6px',
        textTransform: 'uppercase' as const,
    },
    heroTitle: {
        fontSize: 'clamp(28px, 8vw, 54px)',
        fontWeight: 700,
        color: '#f0f4f8',
        lineHeight: 1.1,
        letterSpacing: '-1.5px',
    },
    heroParagraph: {
        fontSize: '15px',
        fontWeight: 400,
        color: '#a8b8c8',
        lineHeight: 1.75,
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#f0f4f8',
        letterSpacing: '-0.4px',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#f0f4f8',
    },
    body: {
        fontSize: '14px',
        fontWeight: 400,
        color: '#a8b8c8',
        lineHeight: 1.65,
    },
    label: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#607080',
        letterSpacing: '0.3px',
    },
    labelCaps: {
        fontSize: '11px',
        fontWeight: 700,
        color: '#607080',
        letterSpacing: '1.2px',
        textTransform: 'uppercase' as const,
    },
    prayerName: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#a8b8c8',
    },
    prayerTime: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#f0f4f8',
    },
}