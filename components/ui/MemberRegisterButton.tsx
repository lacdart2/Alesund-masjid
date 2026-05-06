'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/lib/context'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/lib/toastContext'
import { IconMosque, IconUsers, IconX, IconTrash } from '@/components/ui/Icons'

const LABELS = {
    no: {
        btn: 'Bli medlem',
        close: 'Lukk',
        next: 'Neste',
        back: 'Tilbake',
        submit: 'Send inn',
        success: 'Takk for registreringen! Vi tar kontakt snart.',
        step1: 'Din informasjon',
        step2: 'Adresse og kontakt',
        step3: 'Familiemedlemmer',
        step4: 'Bekreftelse',
        fornavn: 'Fornavn *',
        etternavn: 'Etternavn *',
        personnummer: 'Personnummer *',
        gender: 'Kjønn *',
        mann: 'Mann',
        kvinne: 'Kvinne',
        address: 'Gateadresse *',
        postNr: 'Postnummer *',
        kommune: 'Kommune',
        sted: 'Sted',
        phoneMobile: 'Mobilnummer *',
        phoneHome: 'Hjemmetelefon',
        hasFamily: 'Jeg har familiemedlemmer jeg vil registrere',
        addMember: '+ Legg til familiemedlem',
        sameAddress: 'Bor på samme adresse',
        signatureName: 'Fullt navn (signatur) *',
        declaration: 'Jeg erklærer at overnevnte personer ikke er medlemmer av andre trossamfunn i Norge, og forplikter meg til å rapportere endringer.',
        confirm: 'Jeg bekrefter',
        required: 'Fyll ut alle påkrevde felt',
        submitting: 'Sender...',
        optional: 'Valgfritt',
        stepOf: 'av',
        email: 'E-post'
    },
    en: {
        btn: 'Become a member',
        close: 'Close',
        next: 'Next',
        back: 'Back',
        submit: 'Submit',
        success: 'Thank you for registering! We will be in touch soon.',
        step1: 'Your information',
        step2: 'Address & contact',
        step3: 'Family members',
        step4: 'Confirmation',
        fornavn: 'First name *',
        etternavn: 'Last name *',
        personnummer: 'Personal identification number *',
        gender: 'Gender *',
        mann: 'Male',
        kvinne: 'Female',
        address: 'Street address *',
        postNr: 'Postal code *',
        kommune: 'Municipality',
        sted: 'City',
        phoneMobile: 'Mobile number *',
        phoneHome: 'Home phone',
        hasFamily: 'I have family members I want to register',
        addMember: '+ Add family member',
        sameAddress: 'Lives at same address',
        signatureName: 'Full name (signature) *',
        declaration: 'I declare that the above mentioned persons are not members of other religious communities in Norway, and commit to reporting any changes.',
        confirm: 'I confirm',
        required: 'Please fill in all required fields',
        submitting: 'Submitting...',
        optional: 'Optional',
        stepOf: 'of',
        email: 'Email'
    },
    ar: {
        btn: 'سجّل عضويتك',
        close: 'إغلاق',
        next: 'التالي',
        back: 'رجوع',
        submit: 'إرسال',
        success: 'شكراً على التسجيل! سنتواصل معك قريباً.',
        step1: 'معلوماتك الشخصية',
        step2: 'العنوان والتواصل',
        step3: 'أفراد الأسرة',
        step4: 'التأكيد',
        fornavn: 'الاسم الأول *',
        etternavn: 'اسم العائلة *',
        personnummer: 'رقم التعريف الشخصي *',
        gender: 'الجنس *',
        mann: 'ذكر',
        kvinne: 'أنثى',
        address: 'عنوان الشارع *',
        postNr: 'الرمز البريدي *',
        kommune: 'البلدية',
        sted: 'المدينة',
        phoneMobile: 'رقم الجوال *',
        phoneHome: 'هاتف المنزل',
        hasFamily: 'لدي أفراد أسرة أريد تسجيلهم',
        addMember: '+ إضافة فرد من الأسرة',
        sameAddress: 'يقيم في نفس العنوان',
        signatureName: 'الاسم الكامل (توقيع) *',
        declaration: 'أُقرّ بأن الأشخاص المذكورين أعلاه ليسوا أعضاء في مجتمعات دينية أخرى في النرويج، وأتعهد بالإبلاغ عن أي تغييرات.',
        confirm: 'أؤكد',
        required: 'يرجى ملء جميع الحقول المطلوبة',
        submitting: 'جاري الإرسال...',
        optional: 'اختياري',
        stepOf: 'من',
        email: 'البريد الإلكتروني'
    },
}

type Member = {
    fornavn: string
    etternavn: string
    personnummer: string
    gender: string
    sameAddress: boolean
}

const emptyMember = (): Member => ({
    fornavn: '', etternavn: '', personnummer: '', gender: '', sameAddress: true
})

const inputStyle = {
    width: '100%',
    background: '#0b1520',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#f0f4f8',
    outline: 'none',
    boxSizing: 'border-box' as const,
}

const labelStyle = {
    fontSize: '12px',
    color: '#607080',
    marginBottom: '5px',
    display: 'block'
}

export default function MemberRegisterButton() {
    const { lang } = useLang()
    const t = LABELS[lang]
    const { addToast } = useToast()
    const isRTL = lang === 'ar'
    const [isMobile, setIsMobile] = useState(false)
    const [bannerVisible, setBannerVisible] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        // Check if android banner is visible
        const dismissed = localStorage.getItem('android-banner-dismissed')
        setBannerVisible(dismissed !== '1')
    }, [])

    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    // Step 1 — main person
    const [fornavn, setFornavn] = useState('')
    const [etternavn, setEtternavn] = useState('')
    const [personnummer, setPersonnummer] = useState('')
    const [gender, setGender] = useState('')

    // Step 2 — address
    const [address, setAddress] = useState('')
    const [postNr, setPostNr] = useState('')
    const [kommune, setKommune] = useState('')
    const [sted, setSted] = useState('')
    const [phoneMobile, setPhoneMobile] = useState('')
    const [phoneHome, setPhoneHome] = useState('')
    const [email, setEmail] = useState('')

    // Step 3 — family
    const [hasFamily, setHasFamily] = useState(false)
    const [members, setMembers] = useState<Member[]>([emptyMember()])

    // Step 4
    const [signatureName, setSignatureName] = useState('')
    const [declared, setDeclared] = useState(false)

    const TOTAL_STEPS = 4

    const reset = () => {
        setStep(1); setError('')
        setFornavn(''); setEtternavn(''); setPersonnummer(''); setGender('')
        setAddress(''); setPostNr(''); setKommune(''); setSted('')
        setPhoneMobile(''); setPhoneHome('')
        setHasFamily(false); setMembers([emptyMember()])
        setSignatureName(''); setDeclared(false)
        setEmail('')
    }

    const updateMember = (i: number, field: keyof Member, val: string | boolean) => {
        setMembers(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: val } : m))
    }
    const validatePersonnummer = (val: string) => /^\d{11}$/.test(val.trim())
    const validateStep1 = () =>
        fornavn.trim() &&
        etternavn.trim() &&
        /^\d{11}$/.test(personnummer.trim()) &&
        gender
    const validateStep2 = () => address.trim() && postNr.trim() && phoneMobile.trim()
    const validateStep3 = () =>
        !hasFamily || members.every(m =>
            m.fornavn.trim() &&
            m.etternavn.trim() &&
            /^\d{11}$/.test(m.personnummer.trim()) &&
            m.gender
        )
    const validateStep4 = () => signatureName.trim() && declared

    const handleNext = () => {
        setError('')
        if (step === 1) {
            if (!fornavn.trim() || !etternavn.trim() || !gender) { setError(t.required); return }
            if (!validatePersonnummer(personnummer)) {
                setError(lang === 'ar' ? 'رقم التعريف الشخصي يجب أن يتكون من 11 رقماً' : lang === 'no' ? 'Personnummer må være 11 siffer' : 'Personal identification number must be 11 digits')
                return
            }
        }
        if (step === 2 && !validateStep2()) { setError(t.required); return }
        if (step === 3 && !validateStep3()) { setError(t.required); return }
        setStep(s => s + 1)
    }

    const handleSubmit = async () => {
        if (!validateStep4()) { setError(t.required); return }
        setSubmitting(true)
        setError('')
        try {
            const { data: membership, error: e1 } = await supabase
                .from('memberships')
                .insert({
                    address,
                    post_nr: postNr,
                    kommune,
                    sted,
                    phone_mobile: phoneMobile,
                    email,
                    phone_home: phoneHome,
                    signature_name: signatureName,
                })
                .select()
                .single()
            if (e1) throw e1

            // Always insert main person as first member
            const allMembers = [
                { membership_id: membership.id, fornavn, etternavn, personnummer, gender, same_address: true },
                ...(hasFamily ? members.map(m => ({
                    membership_id: membership.id,
                    fornavn: m.fornavn,
                    etternavn: m.etternavn,
                    personnummer: m.personnummer,
                    gender: m.gender,
                    same_address: m.sameAddress,
                })) : [])
            ]

            const { error: e2 } = await supabase.from('membership_members').insert(allMembers)
            if (e2) throw e2

            // Send email notification
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
                    subject: '🕌 Ny medlemsregistrering — Ålesund Moske',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
                <div style="background: #166534; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
                    <h1 style="color: #fff; margin: 0; font-size: 20px;">🕌 Ålesund Masjid</h1>
                    <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Ny medlemsregistrering</p>
                </div>
                <div style="background: #fff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
                    <h2 style="color: #166534; font-size: 16px; margin: 0 0 16px;">Ny medlem har registrert seg</h2>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px 0; color: #6b7280; width: 40%;">Navn</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${fornavn} ${etternavn}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px 0; color: #6b7280;">Personnummer</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${personnummer}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px 0; color: #6b7280;">Adresse</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${address}, ${postNr} ${sted}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px 0; color: #6b7280;">Mobil</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${phoneMobile}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px 0; color: #6b7280;">E-post</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${email || '—'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Familiemedlemmer</td>
                            <td style="padding: 8px 0; color: #111827; font-weight: 600;">${hasFamily ? members.length : 0}</td>
                        </tr>
                    </table>
                    ${hasFamily && members.length > 0 ? `
                    <h3 style="color: #166534; font-size: 14px; margin: 20px 0 10px;">Familiemedlemmer:</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr style="background: #f3f4f6;">
                            <th style="padding: 8px; text-align: left;">Navn</th>
                            <th style="padding: 8px; text-align: left;">Personnummer</th>
                            <th style="padding: 8px; text-align: left;">Kjønn</th>
                        </tr>
                        ${members.map(m => `
                        <tr style="border-bottom: 1px solid #f3f4f6;">
                            <td style="padding: 8px;">${m.fornavn} ${m.etternavn}</td>
                            <td style="padding: 8px;">${m.personnummer}</td>
                            <td style="padding: 8px;">${m.gender}</td>
                        </tr>`).join('')}
                    </table>
                    ` : ''}
                    <div style="margin-top: 24px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                        <p style="margin: 0; font-size: 13px; color: #166534;">
                            Registrert: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}
                        </p>
                    </div>
                </div>
                <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 16px;">
                    Ålesund Masjid — alesundmoske.no
                </p>
            </div>
        `,
                }),
            })

            addToast(t.success, 'success')
            setOpen(false)
            reset()
        } catch (err: any) {
            console.error('Submit error:', JSON.stringify(err))
            addToast('Noe gikk galt. Prøv igjen.', 'error')
        }/* catch {
            addToast('Noe gikk galt. Prøv igjen.', 'error')
        }  */finally {
            setSubmitting(false)
        }
    }

    // Bottom offset — move up if android banner visible
    const bottomOffset = bannerVisible ? '56px' : '24px'

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => { setOpen(true); reset() }}
                style={{
                    position: 'fixed',
                    bottom: bottomOffset,
                    right: isMobile ? '12px' : '24px',
                    left: isMobile ? '12px' : 'auto',
                    zIndex: 998,
                    background: '#166534',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: isMobile ? '14px 20px' : '13px 22px',
                    fontSize: isMobile ? '15px' : '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(22,101,52,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    width: isMobile ? 'calc(100% - 24px)' : 'auto',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#22a052'}
                onMouseLeave={e => e.currentTarget.style.background = '#166534'}
            >
                <IconMosque size={18} />
                {t.btn}
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.7)',
                        zIndex: 999,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Modal */}
            {open && (
                <div style={{
                    position: 'fixed',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    width: '90%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    background: '#111e2d',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    direction: isRTL ? 'rtl' : 'ltr',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div>
                            <div style={{ fontSize: '17px', fontWeight: 700, color: '#f0f4f8' }}>
                                {step === 1 ? t.step1 : step === 2 ? t.step2 : step === 3 ? t.step3 : t.step4}
                            </div>
                            <div style={{ fontSize: '12px', color: '#607080', marginTop: '2px' }}>
                                {step} {t.stepOf} {TOTAL_STEPS}
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            style={{ background: 'none', border: 'none', color: '#607080', cursor: 'pointer', display: 'flex' }}
                        >
                            <IconX size={20} />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)' }}>
                        <div style={{
                            height: '100%',
                            width: `${(step / TOTAL_STEPS) * 100}%`,
                            background: '#166534',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>

                    {/* Body */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

                        {/* Step 1 — main person */}
                        {step === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <label style={labelStyle}>{t.fornavn}</label>
                                        <input style={inputStyle} value={fornavn} onChange={e => setFornavn(e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.etternavn}</label>
                                        <input style={inputStyle} value={etternavn} onChange={e => setEtternavn(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.personnummer}</label>
                                    <input style={inputStyle} value={personnummer} onChange={e => setPersonnummer(e.target.value)} />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.gender}</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {(['mann', 'kvinne'] as const).map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setGender(g)}
                                                style={{
                                                    flex: 1, padding: '10px',
                                                    borderRadius: '8px',
                                                    border: gender === g ? '1px solid #22a052' : '1px solid rgba(255,255,255,0.1)',
                                                    background: gender === g ? 'rgba(22,101,52,0.2)' : 'transparent',
                                                    color: gender === g ? '#22a052' : '#607080',
                                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                                }}
                                            >
                                                {g === 'mann' ? t.mann : t.kvinne}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 — address */}
                        {step === 2 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div>
                                    <label style={labelStyle}>{t.address}</label>
                                    <input style={inputStyle} value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <label style={labelStyle}>{t.postNr}</label>
                                        <input style={inputStyle} value={postNr} onChange={e => setPostNr(e.target.value)} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>{t.kommune}</label>
                                        <input
                                            style={inputStyle}
                                            value={kommune}
                                            onChange={e => setKommune(e.target.value)}
                                            placeholder="Ålesund"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.sted}</label>
                                    <input
                                        style={inputStyle}
                                        value={sted}
                                        onChange={e => setSted(e.target.value)}
                                        placeholder="Ålesund"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.phoneMobile}</label>
                                    <input style={inputStyle} value={phoneMobile} onChange={e => setPhoneMobile(e.target.value)} />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.email}</label>
                                    <input
                                        style={inputStyle}
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="navn@example.com"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t.phoneHome}</label>
                                    <input style={inputStyle} value={phoneHome} onChange={e => setPhoneHome(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {/* Step 3 — family (optional) */}
                        {step === 3 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* Toggle */}
                                <div
                                    onClick={() => setHasFamily(p => !p)}
                                    style={{
                                        background: hasFamily ? 'rgba(22,101,52,0.1)' : '#0b1520',
                                        border: hasFamily ? '1px solid rgba(22,101,52,0.4)' : '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '14px', padding: '16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <IconUsers size={18} style={{ color: hasFamily ? '#22a052' : '#607080' }} />
                                        <span style={{ fontSize: '14px', color: hasFamily ? '#f0f4f8' : '#a8b8c8', fontWeight: 600 }}>
                                            {t.hasFamily}
                                        </span>
                                    </div>
                                    {/* Toggle pill */}
                                    <div style={{
                                        width: '44px', height: '24px',
                                        background: hasFamily ? '#166534' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '12px', position: 'relative', transition: 'all 0.2s', flexShrink: 0,
                                    }}>
                                        <div style={{
                                            width: '18px', height: '18px',
                                            background: '#fff', borderRadius: '50%',
                                            position: 'absolute', top: '3px',
                                            left: hasFamily ? '23px' : '3px',
                                            transition: 'left 0.2s',
                                        }} />
                                    </div>
                                </div>

                                {/* Family members */}
                                {hasFamily && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {members.map((m, i) => (
                                            <div key={i} style={{
                                                background: '#0b1520', borderRadius: '14px', padding: '16px',
                                                border: '1px solid rgba(255,255,255,0.06)',
                                            }}>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#22a052', marginBottom: '12px' }}>
                                                    #{i + 1}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                        <div>
                                                            <label style={labelStyle}>{t.fornavn}</label>
                                                            <input style={inputStyle} value={m.fornavn} onChange={e => updateMember(i, 'fornavn', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <label style={labelStyle}>{t.etternavn}</label>
                                                            <input style={inputStyle} value={m.etternavn} onChange={e => updateMember(i, 'etternavn', e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>{t.personnummer}</label>
                                                        <input style={inputStyle} value={m.personnummer} onChange={e => updateMember(i, 'personnummer', e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>{t.gender}</label>
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            {(['mann', 'kvinne'] as const).map(g => (
                                                                <button
                                                                    key={g}
                                                                    onClick={() => updateMember(i, 'gender', g)}
                                                                    style={{
                                                                        flex: 1, padding: '9px', borderRadius: '8px',
                                                                        border: m.gender === g ? '1px solid #22a052' : '1px solid rgba(255,255,255,0.1)',
                                                                        background: m.gender === g ? 'rgba(22,101,52,0.2)' : 'transparent',
                                                                        color: m.gender === g ? '#22a052' : '#607080',
                                                                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    {g === 'mann' ? t.mann : t.kvinne}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Same address checkbox */}
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={m.sameAddress}
                                                            onChange={e => updateMember(i, 'sameAddress', e.target.checked)}
                                                            style={{ accentColor: '#22a052', width: '15px', height: '15px' }}
                                                        />
                                                        <span style={{ fontSize: '13px', color: '#607080' }}>{t.sameAddress}</span>
                                                    </label>
                                                    {members.length > 0 && (
                                                        <button
                                                            onClick={() => setMembers(prev => prev.filter((_, idx) => idx !== i))}
                                                            style={{
                                                                background: 'rgba(239,68,68,0.08)',
                                                                border: '1px solid rgba(239,68,68,0.2)',
                                                                color: '#ef4444', borderRadius: '8px',
                                                                padding: '7px', fontSize: '12px', cursor: 'pointer',
                                                            }}
                                                        >
                                                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                                                <IconTrash size={14} />
                                                                {lang === 'ar' ? 'حذف' : lang === 'no' ? 'Fjern' : 'Remove'}
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => setMembers(prev => [...prev, emptyMember()])}
                                            style={{
                                                background: 'rgba(22,101,52,0.1)',
                                                border: '1px solid rgba(22,101,52,0.28)',
                                                color: '#22a052', borderRadius: '10px',
                                                padding: '11px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                            }}
                                        >
                                            {t.addMember}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4 — confirmation */}
                        {step === 4 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={labelStyle}>{t.signatureName}</label>
                                    <input style={inputStyle} value={signatureName} onChange={e => setSignatureName(e.target.value)} />
                                </div>
                                <div style={{
                                    background: '#0b1520', borderRadius: '12px', padding: '16px',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    <p style={{ fontSize: '13px', color: '#a8b8c8', lineHeight: 1.6, marginBottom: '14px' }}>
                                        {t.declaration}
                                    </p>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={declared}
                                            onChange={e => setDeclared(e.target.checked)}
                                            style={{ accentColor: '#22a052', width: '16px', height: '16px', flexShrink: 0 }}
                                        />
                                        <span style={{ fontSize: '13px', color: '#607080' }}>{t.confirm}</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div style={{ marginTop: '12px', fontSize: '13px', color: '#ef4444' }}>
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '16px 24px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', gap: '10px', justifyContent: 'space-between',
                    }}>
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                style={{
                                    background: 'rgba(255,255,255,0.06)', border: 'none',
                                    color: '#a8b8c8', borderRadius: '10px',
                                    padding: '11px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                }}
                            >
                                {t.back}
                            </button>
                        ) : <div />}

                        {step < TOTAL_STEPS ? (
                            <button
                                onClick={handleNext}
                                style={{
                                    background: '#166534', border: 'none', color: '#fff',
                                    borderRadius: '10px', padding: '11px 24px',
                                    fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                                }}
                            >
                                {t.next}
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                style={{
                                    background: submitting ? '#607080' : '#166534',
                                    border: 'none', color: '#fff', borderRadius: '10px',
                                    padding: '11px 24px', fontSize: '14px', fontWeight: 700,
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {submitting ? t.submitting : t.submit}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}