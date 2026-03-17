
'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { translations } from '@/lib/translations'
import { IconCoffee, IconHeartFilled } from '@/components/ui/Icons'

interface DonateModalProps {
    isOpen: boolean
    onClose: () => void
}

const AMOUNTS = [50, 100, 200]
const VIPPS_NUMBER = '553705'
const ACCOUNT = '6550.05.90771'

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
    const { lang } = useLang()
    const m = translations[lang].donate.modal
    const isRtl = lang === 'ar'

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState('')
    const [copiedVipps, setCopiedVipps] = useState(false)
    const [copiedAccount, setCopiedAccount] = useState(false)

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedAmount(null)
            setCustomAmount('')
            setCopiedVipps(false)
            setCopiedAccount(false)
        }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    if (!isOpen) return null

    const activeAmount = customAmount ? customAmount : selectedAmount?.toString() ?? null

    const handleCopy = (text: string, type: 'vipps' | 'account') => {
        navigator.clipboard.writeText(text)
        if (type === 'vipps') {
            setCopiedVipps(true)
            setTimeout(() => setCopiedVipps(false), 2000)
        } else {
            setCopiedAccount(true)
            setTimeout(() => setCopiedAccount(false), 2000)
        }
    }

    const handleOpenVipps = () => {
        window.location.href = 'vipps://'
        setTimeout(() => {
            // If page is hidden, Vipps opened successfully — don't show alert
            if (!document.hidden) {
                alert(m.fallback)
            }
        }, 1500)
    }
    // Copy labels per language
    const copyLabel = lang === 'ar' ? 'نسخ' : lang === 'no' ? 'Kopier' : 'Copy'
    const copiedLabel = lang === 'ar' ? '✓ تم!' : lang === 'no' ? '✓ Kopiert!' : '✓ Copied!'

    return (
        // Backdrop
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 5000,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            {/* Modal box */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#111e2d',
                    border: '1px solid rgba(22,101,52,0.25)',
                    borderRadius: '24px',
                    padding: '32px 28px',
                    width: '100%',
                    maxWidth: '420px',
                    position: 'relative',
                    direction: isRtl ? 'rtl' : 'ltr',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: isRtl ? 'unset' : '16px',
                        left: isRtl ? '16px' : 'unset',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#a8b8c8',
                        fontSize: '16px',
                        lineHeight: 1,
                    }}
                >
                    ✕
                </button>

                {/* Title with heart icon */}
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#f0f4f8', marginBottom: '8px', paddingRight: isRtl ? '0' : '40px', paddingLeft: isRtl ? '40px' : '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.title}
                    <IconHeartFilled size={20} />
                </div>

                {/* Subtitle with coffee icon */}
                <div style={{ fontSize: '14px', color: '#a8b8c8', lineHeight: 1.6, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.sub}
                    <IconCoffee size={16} />
                </div>

                {/* Vipps number + copy */}
                <div style={{
                    background: 'rgba(255,91,36,0.1)',
                    border: '1px solid rgba(255,91,36,0.25)',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#FF5B24', letterSpacing: '0.5px' }}>
                        {m.vippsNumber}
                    </span>
                    <button
                        onClick={() => handleCopy(VIPPS_NUMBER, 'vipps')}
                        style={{
                            background: copiedVipps ? 'rgba(34,160,82,0.2)' : 'rgba(255,91,36,0.15)',
                            border: `1px solid ${copiedVipps ? 'rgba(34,160,82,0.4)' : 'rgba(255,91,36,0.3)'}`,
                            borderRadius: '8px',
                            padding: '5px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: copiedVipps ? '#22a052' : '#FF5B24',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {copiedVipps ? copiedLabel : copyLabel}
                    </button>
                </div>

                {/* Account number + copy */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '10px 16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#a8b8c8', letterSpacing: '0.3px' }}>
                        {ACCOUNT}
                    </span>
                    <button
                        onClick={() => handleCopy(ACCOUNT, 'account')}
                        style={{
                            background: copiedAccount ? 'rgba(34,160,82,0.2)' : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${copiedAccount ? 'rgba(34,160,82,0.4)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '8px',
                            padding: '5px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: copiedAccount ? '#22a052' : '#607080',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {copiedAccount ? copiedLabel : copyLabel}
                    </button>
                </div>

                {/* Amount label */}
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>
                    {m.selectAmount}
                </div>

                {/* Amount buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    {AMOUNTS.map(amount => (
                        <button
                            key={amount}
                            onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
                            style={{
                                flex: 1,
                                padding: '12px 8px',
                                borderRadius: '12px',
                                border: selectedAmount === amount && !customAmount
                                    ? '2px solid #166534'
                                    : '1px solid rgba(255,255,255,0.08)',
                                background: selectedAmount === amount && !customAmount
                                    ? 'rgba(22,101,52,0.2)'
                                    : '#162538',
                                color: selectedAmount === amount && !customAmount ? '#fff' : '#a8b8c8',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {amount} kr
                        </button>
                    ))}
                </div>

                {/* Custom amount input */}
                <input
                    type="number"
                    placeholder={m.custom}
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: customAmount
                            ? '2px solid #166534'
                            : '1px solid rgba(255,255,255,0.08)',
                        background: '#162538',
                        color: '#f0f4f8',
                        fontSize: '15px',
                        marginBottom: '20px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        textAlign: isRtl ? 'right' : 'left',
                    }}
                />

                {/* Dynamic message */}
                {activeAmount && (
                    <div style={{
                        background: 'rgba(22,101,52,0.1)',
                        border: '1px solid rgba(22,101,52,0.2)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        marginBottom: '20px',
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#22a052', marginBottom: '4px' }}>
                            {m.selected(activeAmount)}
                        </div>
                        <div style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.5 }}>
                            {m.instruction(activeAmount)}
                        </div>
                    </div>
                )}

                {/* Open Vipps button */}
                <button
                    onClick={handleOpenVipps}
                    disabled={!activeAmount}
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '14px',
                        border: 'none',
                        background: activeAmount ? '#FF5B24' : 'rgba(255,255,255,0.06)',
                        color: activeAmount ? '#fff' : '#607080',
                        fontSize: '16px',
                        fontWeight: 700,
                        cursor: activeAmount ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        letterSpacing: '-0.2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-1px', fontStyle: 'italic' }}>
                        vipps
                    </span>
                    <span>— {m.openVipps}</span>
                </button>
            </div>
        </div>
    )
}