'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconMapPin, IconBuilding, IconClock, IconMap, IconMail, IconPhone, IconWhatsapp, IconHeart, IconUsers } from '@/components/ui/Icons'
import { useToast } from '@/lib/toastContext'
import NewsletterSection from '@/components/ui/NewsletterSection'

const inputStyle = {
    width: '100%',
    background: '#0b1520',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#f0f4f8',
    outline: 'none',
    boxSizing: 'border-box' as const,
}

const labelStyle = {
    fontSize: '12px',
    color: '#a8b8c8',
    marginBottom: '5px',
    display: 'block',
}

export default function ContactPage() {
    const { lang } = useLang()
    const t = translations[lang]
    const isRTL = lang === 'ar'
    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState<'nikah' | 'visit'>('nikah')

    // Form state
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [groupSize, setGroupSize] = useState('')
    const [sending, setSending] = useState(false)
    const [formError, setFormError] = useState('')
    const { addToast } = useToast()

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Reset form when switching tabs
    const switchTab = (tab: 'nikah' | 'visit') => {
        setActiveTab(tab)
        setName(''); setPhone(''); setEmail(''); setMessage(''); setGroupSize('')
    }

    const handleSubmit = async () => {
        if (!name.trim() || !phone.trim() || !message.trim()) {
            setFormError(t.contact.formRequired)
            return
        }
        if (activeTab === 'visit' && !groupSize.trim()) {
            setFormError(t.contact.formRequired)
            return
        }
        setSending(true)
        setFormError('')
        try {
            const subject = activeTab === 'nikah'
                ? `🕌 Nikah-forespørsel fra ${name}`
                : `🕌 Besøksforespørsel fra ${name}`

            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
                    <div style="background: #166534; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: #fff; margin: 0; font-size: 20px;">🕌 Ålesund Moske</h1>
                        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">
                            ${activeTab === 'nikah' ? 'Nikah-forespørsel' : 'Besøksforespørsel'}
                        </p>
                    </div>
                    <div style="background: #fff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr style="border-bottom: 1px solid #f3f4f6;">
                                <td style="padding: 8px 0; color: #6b7280; width: 40%;">Navn</td>
                                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #f3f4f6;">
                                <td style="padding: 8px 0; color: #6b7280;">Telefon</td>
                                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${phone}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #f3f4f6;">
                                <td style="padding: 8px 0; color: #6b7280;">E-post</td>
                                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${email || '—'}</td>
                            </tr>
                            ${activeTab === 'visit' ? `
                            <tr style="border-bottom: 1px solid #f3f4f6;">
                                <td style="padding: 8px 0; color: #6b7280;">Antall personer</td>
                                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${groupSize}</td>
                            </tr>` : ''}
                            <tr>
                                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Melding</td>
                                <td style="padding: 8px 0; color: #111827;">${message}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 24px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                            <p style="margin: 0; font-size: 13px; color: #166534;">
                                Sendt: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}
                            </p>
                        </div>
                    </div>
                </div>`

            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, html }),
            })

            if (!res.ok) throw new Error('Failed')
            addToast(t.contact.formSent, 'success')

            setName(''); setPhone(''); setEmail(''); setMessage(''); setGroupSize('')
        } catch {
            addToast(t.contact.formError, 'error')
        } finally {
            setSending(false)
        }
    }

    return (
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: isMobile ? '40px 20px' : '64px 40px', direction: isRTL ? 'rtl' : 'ltr' }}>
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#f0f4f8', letterSpacing: '-0.6px' }}>
                    {t.contact.title}
                </h2>
                <div style={{ width: '40px', height: '3px', background: '#166534', borderRadius: '3px', margin: '12px auto 0' }} />
            </div>

            {/* Existing 2 info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div
                    style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '26px' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#22a052', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <IconMapPin size={16} /> {t.contact.findUs}
                    </div>
                    {[
                        { icon: <IconBuilding size={15} />, text: 'Ålesund Jamii Islamic Center' },
                        { icon: <IconMapPin size={15} />, text: t.contact.address },
                        { icon: <IconClock size={15} />, text: t.contact.hours },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#162538', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22a052', flexShrink: 0 }}>
                                {row.icon}
                            </div>
                            <span style={{ fontSize: '13.5px', color: '#a8b8c8' }}>{row.text}</span>
                        </div>
                    ))}
                    <a href="https://maps.google.com/?q=Latinskolegata+1,+6004+Ålesund" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', background: '#162538', border: '1px dashed rgba(22,101,52,0.28)', borderRadius: '10px', height: '112px', marginTop: '14px', fontSize: '13px', fontWeight: 600, color: '#22a052', textDecoration: 'none' }}>
                        <IconMap size={16} /> {t.contact.openMap}
                    </a>
                </div>

                <div
                    style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '26px' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(22,101,52,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#22a052', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <IconMail size={16} /> {t.contact.getInTouch}
                    </div>
                    {[
                        { icon: <IconBuilding size={15} />, text: 'Ålesund Jamii Islamic Center' },
                        { icon: <IconPhone size={15} />, text: t.contact.phone },
                        { icon: <IconWhatsapp size={15} />, text: t.contact.whatsapp },
                        { icon: <IconMail size={15} />, text: t.contact.email },
                    ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '13px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#162538', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22a052', flexShrink: 0 }}>
                                {row.icon}
                            </div>
                            <span style={{ fontSize: '13.5px', color: '#a8b8c8' }}>{row.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact forms section */}
            <div style={{ marginTop: '40px' }}>
                {/* Section title */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4f8' }}>
                        {t.contact.reasonTitle}
                    </p>
                </div>

                {/* Tab toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
                    <div style={{
                        display: 'inline-flex',
                        background: '#0b1520',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '50px',
                        padding: '4px',
                        gap: '4px',
                    }}>
                        {(['nikah', 'visit'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => switchTab(tab)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '50px',
                                    border: 'none',
                                    background: activeTab === tab ? '#166534' : 'transparent',
                                    color: activeTab === tab ? '#fff' : '#607080',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '7px',
                                }}
                            >
                                <span style={{ display: 'flex' }}>
                                    {tab === 'nikah' ? <IconHeart size={15} /> : <IconUsers size={15} />}
                                </span>
                                {tab === 'nikah' ? t.contact.nikahTab : t.contact.visitTab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form card */}
                <div style={{
                    maxWidth: '560px',
                    margin: '0 auto',
                    background: '#111e2d',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '20px',
                    padding: isMobile ? '24px 20px' : '32px',
                }}>
                    {/* Description */}
                    <p style={{ fontSize: '13.5px', color: '#607080', marginBottom: '24px', lineHeight: 1.6 }}>
                        {activeTab === 'nikah' ? t.contact.nikahDesc : t.contact.visitDesc}
                    </p>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={labelStyle}>{t.contact.formName}</label>
                            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.formPhone}</label>
                            <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <label style={labelStyle}>{t.contact.formEmail}</label>
                            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        {activeTab === 'visit' && (
                            <div>
                                <label style={labelStyle}>{t.contact.formGroup}</label>
                                <input style={inputStyle} type="number" min="1" value={groupSize} onChange={e => setGroupSize(e.target.value)} />
                            </div>
                        )}
                        <div>
                            <label style={labelStyle}>{t.contact.formMessage}</label>
                            <textarea
                                style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={sending}
                            style={{
                                background: sending ? '#607080' : '#166534',
                                border: 'none', color: '#fff',
                                borderRadius: '10px', padding: '12px',
                                fontSize: '14px', fontWeight: 700,
                                cursor: sending ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            {sending ? t.contact.formSending : t.contact.formSend}
                        </button>
                    </div>

                </div>
            </div>
            <div style={{ marginTop: '40px' }}>
                <NewsletterSection />
            </div>
        </div>
    )
}
