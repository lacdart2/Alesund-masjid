'use client'

import { useLang } from '@/lib/context'

const EID_DATE = new Date('2026-03-21T00:00:00')

const zakatText = {
    no: {
        label: 'Ramadan 2026',
        title: 'Zakat Al-Fitr',
        amount: '100 kr per person',
        deadline: 'Må betales før Eid-bønnen',
        desc: 'Zakat Al-Fitr er obligatorisk for alle muslimer som har råd. Betal på vegne av deg selv og alle i din husstand.',
    },
    en: {
        label: 'Ramadan 2026',
        title: 'Zakat Al-Fitr',
        amount: '100 NOK per person',
        deadline: 'Must be paid before Eid prayer',
        desc: 'Zakat Al-Fitr is obligatory for every Muslim who is able. Pay on behalf of yourself and every member of your household.',
    },
    ar: {
        label: 'رمضان 2026',
        title: 'زكاة الفطر',
        amount: '100 كرون لكل شخص',
        deadline: 'يجب دفعها قبل صلاة العيد',
        desc: 'زكاة الفطر واجبة على كل مسلم مستطيع. ادفع عن نفسك وعن كل أفراد أسرتك.',
    },
}

export default function ZakatBanner() {
    const { lang } = useLang()
    const isRTL = lang === 'ar'
    const z = zakatText[lang]

    // ✅ Auto-hide on Eid day and after
    const now = new Date()
    if (now >= EID_DATE) return null

    // Days remaining until Eid
    const daysLeft = Math.ceil((EID_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    const daysLabel = {
        no: `${daysLeft} ${daysLeft === 1 ? 'dag' : 'dager'} til Eid`,
        en: `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} until Eid`,
        ar: `${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'} حتى العيد`,
    }

    return (
        <div style={{
            maxWidth: '1120px',
            margin: '32px auto',
            padding: '0 20px',
            direction: isRTL ? 'rtl' : 'ltr',
        }}
            className="px-5 md:px-10"
        >
            <div style={{
                background: 'linear-gradient(135deg, rgba(200,169,107,0.08), rgba(200,169,107,0.03))',
                border: '1px solid rgba(200,169,107,0.35)',
                borderRadius: '20px',
                padding: '24px 28px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background Arabic text watermark */}
                <div style={{
                    position: 'absolute',
                    [isRTL ? 'left' : 'right']: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '80px',
                    color: 'rgba(200,169,107,0.06)',
                    fontFamily: "'Noto Sans Arabic', sans-serif",
                    pointerEvents: 'none',
                    lineHeight: 1,
                }}>
                    زكاة
                </div>

                {/* Top row — label + countdown */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    flexWrap: 'wrap',
                    gap: '8px',
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        background: 'rgba(200,169,107,0.12)',
                        border: '1px solid rgba(200,169,107,0.3)',
                        color: '#c8a96b',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '5px 12px',
                        borderRadius: '20px',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                    }}>
                        🌙 {z.label}
                    </div>

                    {/* Countdown pill */}
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#c8a96b',
                        background: 'rgba(200,169,107,0.1)',
                        border: '1px solid rgba(200,169,107,0.2)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                    }}>
                        {daysLabel[lang]}
                    </div>
                </div>

                {/* Main content */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#c8a96b',
                            letterSpacing: '-0.4px',
                            marginBottom: '6px',
                        }}>
                            {z.title}
                        </h3>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: 800,
                            color: '#f0f4f8',
                            letterSpacing: '-1px',
                            marginBottom: '8px',
                            lineHeight: 1,
                        }}>
                            {z.amount}
                        </div>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#c8a96b',
                            marginBottom: '10px',
                        }}>
                            ⏰ {z.deadline}
                        </div>
                        <p style={{
                            fontSize: '13px',
                            color: '#a8b8c8',
                            lineHeight: 1.65,
                            maxWidth: '480px',
                        }}>
                            {z.desc}
                        </p>
                    </div>

                    {/* Payment info */}
                    <div style={{
                        background: 'rgba(11,21,32,0.6)',
                        border: '1px solid rgba(200,169,107,0.2)',
                        borderRadius: '14px',
                        padding: '16px 20px',
                        flexShrink: 0,
                        minWidth: '200px',
                    }}>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: '#607080',
                            marginBottom: '12px',
                        }}>
                            {lang === 'ar' ? 'معلومات الدفع' : lang === 'en' ? 'Payment info' : 'Betalingsinfo'}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#607080', marginBottom: '2px' }}>
                                    {lang === 'ar' ? 'رقم الحساب' : lang === 'en' ? 'Account' : 'Kontonummer'}
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.3px' }}>
                                    6550.05.90771
                                </div>
                            </div>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                            <div>
                                <div style={{ fontSize: '11px', color: '#607080', marginBottom: '2px' }}>Vipps</div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8' }}>553705</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}