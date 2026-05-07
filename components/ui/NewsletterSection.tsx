'use client'

import { useState } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/lib/toastContext'
import { IconMail } from '@/components/ui/Icons'

export default function NewsletterSection() {
    const { lang } = useLang()
    const t = translations[lang]
    const { addToast } = useToast()
    const isRTL = lang === 'ar'
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubscribe = async () => {
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return
        setSubmitting(true)
        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert({ email: email.trim(), lang })

            if (error) {
                if (error.code === '23505') {
                    addToast(t.newsletter.duplicate, 'error')
                } else {
                    addToast(t.newsletter.error, 'error')
                }
                return
            }
            addToast(t.newsletter.success, 'success')
            // Notify admin
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: '📧 Ny nyhetsbrevabonnent — Ålesund Moske',
                    html: `<div style="font-family: Arial, sans-serif; padding: 24px;">
                                <h2 style="color: #166534;">Ny abonnent</h2>
                                <p><strong>E-post:</strong> ${email}</p>
                                <p><strong>Språk:</strong> ${lang}</p>
                                <p><strong>Tidspunkt:</strong> ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}</p>
                            </div>`,
                }),
            })
            setEmail('')
        } catch {
            addToast(t.newsletter.error, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0d1f2d 0%, #111e2d 100%)',
            border: '1px solid rgba(22,101,52,0.2)',
            borderRadius: '24px',
            padding: '48px 32px',
            textAlign: 'center',
            direction: isRTL ? 'rtl' : 'ltr',
        }}>
            {/* Icon */}
            <div style={{
                width: '52px', height: '52px',
                background: 'rgba(22,101,52,0.15)',
                border: '1px solid rgba(22,101,52,0.3)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#22a052',
            }}>
                <IconMail size={24} />
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 700,
                color: '#f0f4f8',
                margin: '0 0 10px',
                letterSpacing: '-0.4px',
            }}>
                {t.newsletter.newsletterTitle}
            </h3>

            {/* Subtitle */}
            <p style={{
                fontSize: '14px',
                color: '#607080',
                margin: '0 0 28px',
                lineHeight: 1.6,
                maxWidth: '380px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                {t.newsletter.newsletterSub}
            </p>

            {/* Input row */}
            <div style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '440px',
                margin: '0 auto',
                flexDirection: 'row',
            }}>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    placeholder={t.newsletter.placeholder}
                    style={{
                        flex: 1,
                        background: '#0b1520',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#f0f4f8',
                        outline: 'none',
                    }}
                />
                <button
                    onClick={handleSubscribe}
                    disabled={submitting}
                    style={{
                        background: submitting ? '#607080' : '#166534',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '10px',
                        padding: '12px 22px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#22a052' }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = '#166534' }}
                >
                    {t.newsletter.btn}
                </button>
            </div>
        </div>
    )
}