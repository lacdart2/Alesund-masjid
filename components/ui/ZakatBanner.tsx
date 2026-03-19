
'use client'

import { useLang } from '@/lib/context'
import { useState, useEffect } from 'react'
const EID_DATE = new Date('2026-03-20T00:00:00')
const ZAKAT_VIPPS = '91155143'
const ACCOUNT = '6550.05.90771'

const zakatText = {
    no: {
        label: 'Ramadan 2026',
        title: 'Zakat Al-Fitr',
        amount: '100 kr per person',
        deadline: 'Må betales før Eid-bønnen',
        desc: 'Zakat Al-Fitr er obligatorisk for alle muslimer som har råd. Betal på vegne av deg selv og alle i din husstand.',
        note: 'Ønsker du at din Zakat tas ut som mat i Nigeria (slik Profeten befalte), send til Vipps 91155143.',
        eidNote: 'Eid er i morgen 20. mars — betal før Eid-bønnen kl. 10:00!',
        vippsBtn: 'Betal Zakat via Vipps',
        fallback: 'Sørg for at Vipps er installert på enheten din.',
        copy: 'Kopier',
        copied: '✓ Kopiert!',
        paymentInfo: 'Betalingsinfo',
        account: 'Kontonummer',
    },
    en: {
        label: 'Ramadan 2026',
        title: 'Zakat Al-Fitr',
        amount: '100 NOK per person',
        deadline: 'Must be paid before Eid prayer',
        desc: 'Zakat Al-Fitr is obligatory for every Muslim who is able. Pay on behalf of yourself and every member of your household.',
        note: 'If you want your Zakat distributed as food in Nigeria (as the Prophet commanded), send to Vipps 91155143.',
        eidNote: 'Eid is tomorrow March 20 — pay before the Eid prayer at 10:00!',
        vippsBtn: 'Pay Zakat via Vipps',
        fallback: 'Please make sure Vipps is installed on your device.',
        copy: 'Copy',
        copied: '✓ Copied!',
        paymentInfo: 'Payment info',
        account: 'Account',
    },
    ar: {
        label: 'رمضان 2026',
        title: 'زكاة الفطر',
        amount: '100 كرون لكل شخص',
        deadline: 'يجب دفعها قبل صلاة العيد',
        desc: 'زكاة الفطر واجبة على كل مسلم مستطيع. ادفع عن نفسك وعن كل أفراد أسرتك.',
        note: 'إذا أردت إخراج زكاتك طعاماً في نيجيريا كما أمر النبي ﷺ، أرسل إلى Vipps 91155143.',
        eidNote: 'العيد غداً 20 مارس — ادفع قبل صلاة العيد الساعة 10:00!',
        vippsBtn: 'دفع الزكاة عبر Vipps',
        fallback: 'يرجى التأكد من تثبيت تطبيق Vipps على جهازك.',
        copy: 'نسخ',
        copied: '✓ تم النسخ!',
        paymentInfo: 'معلومات الدفع',
        account: 'رقم الحساب',
    },
}

export default function ZakatBanner() {
    const { lang } = useLang()
    const isRTL = lang === 'ar'
    const z = zakatText[lang]
    const [isMobile, setIsMobile] = useState(false)
    const [copiedVipps, setCopiedVipps] = useState(false)
    const [copiedAccount, setCopiedAccount] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const now = new Date()
    if (now >= EID_DATE) return null

    const daysLeft = Math.ceil((EID_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    const daysLabel = {
        no: `${daysLeft} ${daysLeft === 1 ? 'dag' : 'dager'} til Eid`,
        en: `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} until Eid`,
        ar: `${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'} حتى العيد`,
    }

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

    const handleVipps = () => {
        window.location.href = 'vipps://'
        setTimeout(() => {
            if (!document.hidden) {
                alert(z.fallback)
            }
        }, 1500)
    }
    return (
        <div style={{ maxWidth: '1120px', margin: '32px auto', padding: '0 20px', direction: isRTL ? 'rtl' : 'ltr' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(200,169,107,0.08), rgba(200,169,107,0.03))', border: '1px solid rgba(200,169,107,0.35)', borderRadius: '20px', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>

                {/* Background watermark */}
                <div style={{ position: 'absolute', [isRTL ? 'left' : 'right']: '24px', top: '50%', transform: 'translateY(-50%)', fontSize: '80px', color: 'rgba(200,169,107,0.06)', fontFamily: "'Noto Sans Arabic', sans-serif", pointerEvents: 'none', lineHeight: 1 }}>
                    زكاة
                </div>

                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(200,169,107,0.12)', border: '1px solid rgba(200,169,107,0.3)', color: '#c8a96b', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                        🌙 {z.label}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#c8a96b', background: 'rgba(200,169,107,0.1)', border: '1px solid rgba(200,169,107,0.2)', padding: '5px 12px', borderRadius: '20px' }}>
                        {daysLabel[lang]}
                    </div>
                </div>

                {/* Main content */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#c8a96b', letterSpacing: '-0.4px', marginBottom: '6px' }}>{z.title}</h3>
                        <div style={{ fontSize: '28px', fontWeight: 800, color: '#f0f4f8', letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1 }}>{z.amount}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#c8a96b', marginBottom: '10px' }}>⏰ {z.deadline}</div>
                        <p style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.65, maxWidth: '480px', marginBottom: '12px' }}>{z.desc}</p>

                        {/* Eid uncertainty note */}
                        <div style={{ fontSize: '12px', color: '#eab308', background: 'rgba(234,179,8,0.07)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '10px', padding: '8px 12px', marginBottom: '12px', display: 'inline-block' }}>
                            ⚠️ {z.eidNote}
                        </div>

                        {/* Nigeria note */}
                        <p style={{ fontSize: '12px', color: '#607080', lineHeight: 1.6, maxWidth: '480px', marginBottom: '16px', fontStyle: 'italic' }}>{z.note}</p>

                        {/* Vipps button */}
                        <button
                            onClick={handleVipps}
                            style={{ background: '#FF5B24', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '13px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontStyle: 'italic', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,91,36,0.4)' }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                        >
                            <span style={{ fontSize: '16px', fontWeight: 900 }}>vipps</span>
                            <span style={{ fontStyle: 'normal', fontWeight: 600 }}>— {z.vippsBtn}</span>
                        </button>
                    </div>

                    {/* Payment info box */}
                    <div style={{ background: 'rgba(11,21,32,0.6)', border: '1px solid rgba(200,169,107,0.2)', borderRadius: '14px', padding: '16px 20px', width: isMobile ? '100%' : 'auto', minWidth: isMobile ? 'unset' : '380px', flexShrink: 0, boxSizing: 'border-box' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#607080', marginBottom: '12px' }}>
                            {z.paymentInfo}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            {/* Account number + copy */}
                            <div>
                                <div style={{ fontSize: '11px', color: '#607080', marginBottom: '4px' }}>{z.account}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.3px' }}>{ACCOUNT}</span>
                                    <button
                                        onClick={() => handleCopy(ACCOUNT, 'account')}
                                        style={{ background: copiedAccount ? 'rgba(34,160,82,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${copiedAccount ? 'rgba(34,160,82,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: 600, color: copiedAccount ? '#22a052' : '#607080', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                                    >
                                        {copiedAccount ? z.copied : z.copy}
                                    </button>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                            {/* Vipps number + copy */}
                            <div>
                                <div style={{ fontSize: '11px', color: '#607080', marginBottom: '4px' }}>Vipps</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#FF5B24' }}>{ZAKAT_VIPPS}</span>
                                    <button
                                        onClick={() => handleCopy(ZAKAT_VIPPS, 'vipps')}
                                        style={{ background: copiedVipps ? 'rgba(34,160,82,0.2)' : 'rgba(255,91,36,0.1)', border: `1px solid ${copiedVipps ? 'rgba(34,160,82,0.4)' : 'rgba(255,91,36,0.25)'}`, borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: 600, color: copiedVipps ? '#22a052' : '#FF5B24', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                                    >
                                        {copiedVipps ? z.copied : z.copy}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}