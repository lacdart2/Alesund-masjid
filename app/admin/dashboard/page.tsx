'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
    IconUsers, IconSpeakerphone, IconDownload, IconSend,
    IconX, IconSearch, IconMail, IconPhone, IconMapPin, IconCalendar, IconLogout, IconTrash
} from '@/components/ui/Icons'
import { useToast } from '@/lib/toastContext'

type Member = {
    id: string
    fornavn: string
    etternavn: string
    personnummer: string
    gender: string
    same_address: boolean
}

type Membership = {
    id: string
    address: string
    post_nr: string
    kommune: string
    sted: string
    phone_mobile: string
    phone_home: string
    email: string
    signature_name: string
    submitted_at: string
    membership_members: Member[]
}

type Lang = 'no' | 'en' | 'ar'

const TEMPLATES = [
    {
        id: 'event', icon: 'calendar',
        label: { no: 'Ny arrangement', en: 'New Event', ar: 'فعالية جديدة' },
        subject: { no: '📅 Nytt arrangement — Ålesund Moske', en: '📅 New Event — Ålesund Moske', ar: '📅 فعالية جديدة — مسجد أولسند' },
        body: { no: 'Kjære medlem,\n\nVi har gleden av å invitere deg til et nytt arrangement i Ålesund Moske.\n\n[Legg til detaljer her]\n\nMvh,\nÅlesund Moske', en: 'Dear member,\n\nWe are pleased to invite you to a new event at Ålesund Moske.\n\n[Add details here]\n\nBest regards,\nÅlesund Moske', ar: 'عزيزي العضو،\n\nيسعدنا دعوتك لحضور فعالية جديدة في مسجد أولسند.\n\n[أضف التفاصيل هنا]\n\nمع التحية،\nمسجد أولسند' }
    },
    {
        id: 'jumuah', icon: 'mosque',
        label: { no: 'Fredagsbønn påminnelse', en: "Jumu'ah Reminder", ar: 'تذكير صلاة الجمعة' },
        subject: { no: '🕌 Fredagsbønn — Ålesund Moske', en: "🕌 Jumu'ah Prayer — Ålesund Moske", ar: '🕌 صلاة الجمعة — مسجد أولسند' },
        body: { no: "Kjære bror/søster,\n\nPåminnelse om fredagsbønn (Jumu'ah) i dag kl. 14:30.\n\nKhutbah på norsk og arabisk. Alle er velkomne.\n\nMvh,\nÅlesund Moske", en: "Dear brother/sister,\n\nReminder for Jumu'ah prayer today at 14:30.\n\nKhutbah in Norwegian and Arabic. All are welcome.\n\nBest regards,\nÅlesund Moske", ar: 'عزيزي الأخ/الأخت،\n\nتذكير بصلاة الجمعة اليوم الساعة 14:30.\n\nالخطبة بالنرويجية والعربية.\n\nمع التحية،\nمسجد أولسند' }
    },
    {
        id: 'announcement', icon: 'speakerphone',
        label: { no: 'Viktig kunngjøring', en: 'Important Announcement', ar: 'إعلان مهم' },
        subject: { no: '📢 Viktig melding — Ålesund Moske', en: '📢 Important Message — Ålesund Moske', ar: '📢 رسالة مهمة — مسجد أولسند' },
        body: { no: 'Kjære medlem,\n\nVi har en viktig melding til deg.\n\n[Legg til melding her]\n\nMvh,\nÅlesund Moske', en: 'Dear member,\n\nWe have an important message for you.\n\n[Add message here]\n\nBest regards,\nÅlesund Moske', ar: 'عزيزي العضو،\n\nلدينا رسالة مهمة لك.\n\n[أضف الرسالة هنا]\n\nمع التحية،\nمسجد أولسند' }
    },
    {
        id: 'eid', icon: 'moon',
        label: { no: 'Eid/Ramadan hilsen', en: 'Eid/Ramadan Greeting', ar: 'تهنئة عيد/رمضان' },
        subject: { no: '🌙 Eid Mubarak — Ålesund Moske', en: '🌙 Eid Mubarak — Ålesund Moske', ar: '🌙 عيد مبارك — مسجد أولسند' },
        body: { no: 'Kjære bror/søster,\n\nÅlesund Moske ønsker deg og din familie Eid Mubarak!\n\nMå Allah akseptere våre bønner og gjerninger.\n\nMvh,\nÅlesund Moske', en: 'Dear brother/sister,\n\nÅlesund Moske wishes you and your family Eid Mubarak!\n\nMay Allah accept our prayers and deeds.\n\nBest regards,\nÅlesund Moske', ar: 'عزيزي الأخ/الأخت،\n\nيهنئكم مسجد أولسند بمناسبة العيد المبارك!\n\nتقبل الله منا ومنكم.\n\nمع التحية،\nمسجد أولسند' }
    },
    {
        id: 'custom', icon: 'edit',
        label: { no: 'Egendefinert melding', en: 'Custom Message', ar: 'رسالة مخصصة' },
        subject: { no: '', en: '', ar: '' },
        body: { no: '', en: '', ar: '' }
    }
]

const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0b1520',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', padding: '10px 14px',
    fontSize: '14px', color: '#f0f4f8',
    outline: 'none', boxSizing: 'border-box',
}

const thStyle: React.CSSProperties = {
    padding: '10px 16px', textAlign: 'left',
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
    textTransform: 'uppercase', color: '#607080',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
    padding: '12px 16px', fontSize: '13px',
    color: '#a8b8c8', borderBottom: '1px solid rgba(255,255,255,0.04)',
    whiteSpace: 'nowrap',
}

export default function AdminDashboard() {
    const router = useRouter()
    const [memberships, setMemberships] = useState<Membership[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'members' | 'broadcast'>('members')
    const [search, setSearch] = useState('')
    const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null)

    // Broadcast
    const [emailLang, setEmailLang] = useState<Lang>('no')
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0])
    const [subject, setSubject] = useState(TEMPLATES[0].subject.no)
    const [body, setBody] = useState(TEMPLATES[0].body.no)
    const [sending, setSending] = useState(false)
    const [sendResult, setSendResult] = useState('')
    const [recipientMode, setRecipientMode] = useState<'all' | 'one'>('all')
    const [recipientEmail, setRecipientEmail] = useState('')

    // Delete states
    const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null)
    const [deleteMemberName, setDeleteMemberName] = useState('')
    const { addToast } = useToast()
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('admin-auth') !== '1') {
            router.push('/admin')
        }
        document.documentElement.dir = 'ltr'
        document.documentElement.lang = 'no'
    }, [])

    useEffect(() => {
        const fetch_ = async () => {
            const { data, error } = await supabase
                .from('memberships')
                .select('*, membership_members(*)')
                .order('submitted_at', { ascending: false })
            if (!error && data) setMemberships(data)
            setLoading(false)
        }
        fetch_()
    }, [])

    const handleTemplateSelect = (tmpl: typeof TEMPLATES[0]) => {
        setSelectedTemplate(tmpl)
        setSubject(tmpl.subject[emailLang])
        setBody(tmpl.body[emailLang])
    }

    const handleLangChange = (lang: Lang) => {
        setEmailLang(lang)
        setSubject(selectedTemplate.subject[lang])
        setBody(selectedTemplate.body[lang])
    }

    const handleDeleteMember = async () => {
        if (!deleteMemberId || !selectedMembership) return
        const { error } = await supabase.from('membership_members').delete().eq('id', deleteMemberId)
        if (!error) {
            const remaining = selectedMembership.membership_members.filter(m => m.id !== deleteMemberId)
            if (remaining.length === 0) {
                await supabase.from('memberships').delete().eq('id', selectedMembership.id)
                setMemberships(prev => prev.filter(m => m.id !== selectedMembership.id))
                setSelectedMembership(null)
            } else {
                const updated = { ...selectedMembership, membership_members: remaining }
                setSelectedMembership(updated)
                setMemberships(prev => prev.map(m => m.id === selectedMembership.id ? updated : m))
            }
            setDeleteMemberId(null)
            setDeleteMemberName('')
        }
    }

    const downloadCSV = () => {
        const rows = [
            ['Navn', 'Personnummer', 'Kjønn', 'Adresse', 'Postnr', 'Kommune', 'Mobil', 'E-post', 'Registrert'],
            ...memberships.flatMap(m =>
                m.membership_members.map(mem => [
                    `${mem.fornavn} ${mem.etternavn}`,
                    mem.personnummer,
                    mem.gender,
                    m.address,
                    m.post_nr,
                    m.kommune || '',
                    m.phone_mobile,
                    m.email || '',
                    new Date(m.submitted_at).toLocaleDateString('no-NO'),
                ])
            )
        ]
        const csv = rows.map(r => r.map(val => String(val).replace(/"/g, '')).join(';')).join('\n')
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `medlemmer-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
    }

    const handleBroadcast = async () => {
        if (!subject.trim() || !body.trim()) { setSendResult('Fyll ut emne og melding.'); return }
        if (recipientMode === 'one' && !recipientEmail) { setSendResult('Velg et medlem.'); return }
        setSending(true); setSendResult('')
        try {
            const emails = recipientMode === 'all'
                ? memberships.map(m => m.email).filter(Boolean)
                : [recipientEmail]
            if (emails.length === 0) { setSendResult('Ingen e-postadresser funnet.'); setSending(false); return }
            const htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px"><div style="background:#166534;padding:20px;border-radius:12px 12px 0 0;text-align:center"><h1 style="color:#fff;margin:0;font-size:20px">🕌 Ålesund Moske</h1></div><div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb"><h2 style="color:#166534">${subject}</h2><div style="white-space:pre-line;color:#374151;font-size:15px;line-height:1.7">${body}</div><hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb"/><p style="font-size:12px;color:#9ca3af;text-align:center">Ålesund Moske — Latinskolegata 1, 6004 Ålesund</p></div></div>`
            let sent = 0
            for (const email of emails) {
                await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: email, subject, html: htmlBody }) })
                sent++
            }
            setSendResult(`✅ Sendt til ${sent} medlem${sent > 1 ? 'mer' : ''}.`)
            addToast(`Sendt til ${sent} medlem${sent > 1 ? 'mer' : ''}!`, 'success')

        } catch {
            setSendResult('❌ Noe gikk galt.')
            addToast('Noe gikk galt. Prøv igjen.', 'error')
        }
        finally { setSending(false) }
    }

    const filtered = memberships.filter(m =>
        m.signature_name?.toLowerCase().includes(search.toLowerCase()) ||
        m.phone_mobile?.includes(search) ||
        m.email?.toLowerCase().includes(search.toLowerCase())
    )

    const totalMembers = memberships.reduce((acc, m) => acc + m.membership_members.length, 0)
    const newToday = memberships.filter(m => new Date(m.submitted_at).toDateString() === new Date().toDateString()).length
    const newThisWeek = memberships.filter(m => {
        const diff = (new Date().getTime() - new Date(m.submitted_at).getTime()) / (1000 * 60 * 60 * 24)
        return diff <= 7
    }).length

    const recipientCount = recipientMode === 'all'
        ? memberships.filter(m => m.email).length
        : recipientEmail ? 1 : 0

    return (
        <div style={{ minHeight: '100vh', background: '#0b1520', direction: 'ltr' }}>

            {/* Header */}
            <div style={{ background: '#111e2d', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="logo" style={{ width: '34px', height: '34px', objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(522%) hue-rotate(95deg) brightness(96%) contrast(96%)' }} />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f4f8' }}>Ålesund Moske</div>
                        <div style={{ fontSize: '11px', color: '#607080' }}>Admin Dashboard</div>
                    </div>
                </a>
                <button onClick={() => { localStorage.removeItem('admin-auth'); router.push('/admin') }}
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '8px', padding: '7px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconLogout size={14} /> Logg ut
                </button>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
                    {[
                        { label: 'Totalt registreringer', value: memberships.length, color: '#22a052' },
                        { label: 'Totalt medlemmer', value: totalMembers, color: '#22a052' },
                        { label: 'Nye i dag', value: newToday, color: newToday > 0 ? '#f59e0b' : '#607080' },
                        { label: 'Nye denne uken', value: newThisWeek, color: newThisWeek > 0 ? '#3b82f6' : '#607080' },
                    ].map(s => (
                        <div key={s.label} style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px 16px' }}>
                            <div style={{ fontSize: '36px', fontWeight: 800, color: s.color, letterSpacing: '-1px' }}>{s.value}</div>
                            <div style={{ fontSize: '12px', color: '#607080', marginTop: '4px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {[
                        { key: 'members', label: 'Medlemmer', icon: <IconUsers size={15} /> },
                        { key: 'broadcast', label: 'Send e-post', icon: <IconSpeakerphone size={15} /> },
                    ].map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                            style={{ padding: '10px 18px', borderRadius: '10px 10px 0 0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: activeTab === tab.key ? '#166534' : 'transparent', color: activeTab === tab.key ? '#fff' : '#607080', borderBottom: activeTab === tab.key ? '2px solid #22a052' : '2px solid transparent' }}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Members Tab */}
                {activeTab === 'members' && (
                    <div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#607080', display: 'flex', pointerEvents: 'none' }}>
                                    <IconSearch size={15} />
                                </div>
                                <input placeholder="Søk etter navn, mobil eller e-post..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '36px' }} />
                            </div>
                            <button onClick={downloadCSV}
                                style={{ background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', color: '#22a052', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                <IconDownload size={15} /> Last ned CSV
                            </button>
                            <div style={{ fontSize: '13px', color: '#607080', marginLeft: 'auto' }}>
                                {filtered.length} av {memberships.length} registreringer
                            </div>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', color: '#607080', padding: '60px' }}>Laster...</div>
                        ) : (
                            <div style={{ background: '#111e2d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <th style={thStyle}>Navn</th>
                                            <th style={thStyle}>Mobil</th>
                                            <th style={thStyle}>E-post</th>
                                            <th style={thStyle}>Adresse</th>
                                            <th style={thStyle}>Medlemmer</th>
                                            <th style={thStyle}>Registrert</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length === 0 ? (
                                            <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: '#607080' }}>Ingen resultater.</td></tr>
                                        ) : filtered.map(m => (
                                            <tr key={m.id} onClick={() => setSelectedMembership(m)}
                                                style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(22,101,52,0.06)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ ...tdStyle, color: '#f0f4f8', fontWeight: 600 }}>{m.signature_name}</td>
                                                <td style={tdStyle}>{m.phone_mobile}</td>
                                                <td style={tdStyle}>{m.email || '—'}</td>
                                                <td style={tdStyle}>{m.address}, {m.post_nr}</td>
                                                <td style={tdStyle}>
                                                    <span style={{ background: 'rgba(22,101,52,0.15)', color: '#22a052', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>
                                                        {m.membership_members.length}
                                                    </span>
                                                </td>
                                                <td style={{ ...tdStyle, color: '#607080' }}>{new Date(m.submitted_at).toLocaleDateString('no-NO')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Broadcast Tab */}
                {activeTab === 'broadcast' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>

                        {/* Left column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                            {/* Language */}
                            <div style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px' }}>
                                <div style={{ fontSize: '11px', color: '#607080', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Språk</div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {(['no', 'en', 'ar'] as Lang[]).map(l => (
                                        <button key={l} onClick={() => handleLangChange(l)}
                                            style={{ flex: 1, padding: '7px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: 'none', background: emailLang === l ? '#166534' : 'rgba(255,255,255,0.06)', color: emailLang === l ? '#fff' : '#a8b8c8' }}>
                                            {l === 'no' ? '🇳🇴' : l === 'en' ? '🇬🇧' : '🇸🇦'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Templates */}
                            <div style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px' }}>
                                <div style={{ fontSize: '11px', color: '#607080', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Maler</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {TEMPLATES.map(tmpl => (
                                        <button key={tmpl.id} onClick={() => handleTemplateSelect(tmpl)}
                                            style={{ padding: '9px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', border: 'none', background: selectedTemplate.id === tmpl.id ? 'rgba(22,101,52,0.2)' : 'rgba(255,255,255,0.04)', color: selectedTemplate.id === tmpl.id ? '#22a052' : '#a8b8c8', borderLeft: selectedTemplate.id === tmpl.id ? '3px solid #22a052' : '3px solid transparent' }}>
                                            {tmpl.label[emailLang]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recipients */}
                            <div style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px' }}>
                                <div style={{ fontSize: '11px', color: '#607080', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Mottakere</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <button onClick={() => { setRecipientMode('all'); setRecipientEmail('') }}
                                        style={{ padding: '9px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', border: 'none', background: recipientMode === 'all' ? 'rgba(22,101,52,0.2)' : 'rgba(255,255,255,0.04)', color: recipientMode === 'all' ? '#22a052' : '#a8b8c8', borderLeft: recipientMode === 'all' ? '3px solid #22a052' : '3px solid transparent' }}>
                                        Alle medlemmer ({memberships.filter(m => m.email).length})
                                    </button>
                                    <button onClick={() => setRecipientMode('one')}
                                        style={{ padding: '9px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', border: 'none', background: recipientMode === 'one' ? 'rgba(22,101,52,0.2)' : 'rgba(255,255,255,0.04)', color: recipientMode === 'one' ? '#22a052' : '#a8b8c8', borderLeft: recipientMode === 'one' ? '3px solid #22a052' : '3px solid transparent' }}>
                                        Enkelt medlem
                                    </button>
                                    {recipientMode === 'one' && (
                                        <select
                                            value={recipientEmail}
                                            onChange={e => setRecipientEmail(e.target.value)}
                                            style={{ ...inputStyle, marginTop: '4px', cursor: 'pointer' }}
                                        >
                                            <option value=''>Velg medlem...</option>
                                            {memberships.filter(m => m.email).map(m => (
                                                <option key={m.id} value={m.email}>
                                                    {m.signature_name} — {m.email}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right — compose */}
                        <div style={{ background: '#111e2d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ fontSize: '11px', color: '#607080', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Skriv melding</div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#a8b8c8', marginBottom: '5px', display: 'block' }}>Emne</label>
                                <input style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Emne..." />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#a8b8c8', marginBottom: '5px', display: 'block' }}>Melding</label>
                                <textarea value={body} onChange={e => setBody(e.target.value)} rows={10}
                                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                                    placeholder="Skriv melding her..."
                                    dir={emailLang === 'ar' ? 'rtl' : 'ltr'} />
                            </div>
                            <div style={{ background: 'rgba(22,101,52,0.08)', border: '1px solid rgba(22,101,52,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#607080', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <IconMail size={14} />
                                Sender til <strong style={{ color: '#22a052' }}>&nbsp;{recipientCount}&nbsp;</strong>
                                {recipientMode === 'all' ? 'medlemmer med e-postadresse' : recipientEmail ? `(${recipientEmail})` : 'medlem'}
                            </div>
                            {sendResult && (
                                <div style={{ fontSize: '13px', color: sendResult.startsWith('✅') ? '#22a052' : '#ef4444', fontWeight: 600 }}>
                                    {sendResult}
                                </div>
                            )}
                            <button onClick={handleBroadcast} disabled={sending}
                                style={{ background: sending ? '#607080' : '#166534', border: 'none', color: '#fff', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: sending ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <IconSend size={16} /> {sending ? 'Sender...' : recipientMode === 'all' ? 'Send til alle medlemmer' : 'Send til valgt medlem'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Drawer */}
            {selectedMembership && (
                <>
                    <div onClick={() => setSelectedMembership(null)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, backdropFilter: 'blur(4px)' }} />
                    <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '380px', maxWidth: '90vw', background: '#111e2d', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 201, overflowY: 'auto', padding: '24px' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8' }}>Detaljer</div>
                            <button onClick={() => setSelectedMembership(null)}
                                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#a8b8c8', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex' }}>
                                <IconX size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', padding: '16px', background: 'rgba(22,101,52,0.08)', borderRadius: '14px', border: '1px solid rgba(22,101,52,0.2)' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                                {selectedMembership.signature_name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f4f8' }}>{selectedMembership.signature_name}</div>
                                <div style={{ fontSize: '12px', color: '#607080', marginTop: '2px' }}>
                                    {new Date(selectedMembership.submitted_at).toLocaleDateString('no-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                            {[
                                { icon: <IconPhone size={14} />, label: 'Mobil', value: selectedMembership.phone_mobile },
                                { icon: <IconMail size={14} />, label: 'E-post', value: selectedMembership.email || '—' },
                                { icon: <IconMapPin size={14} />, label: 'Adresse', value: `${selectedMembership.address}, ${selectedMembership.post_nr} ${selectedMembership.sted || ''}` },
                                { icon: <IconCalendar size={14} />, label: 'Registrert', value: new Date(selectedMembership.submitted_at).toLocaleDateString('no-NO') },
                            ].map(row => (
                                <div key={row.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#607080', flexShrink: 0, marginTop: '1px' }}>{row.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#607080', marginBottom: '1px' }}>{row.label}</div>
                                        <div style={{ fontSize: '13px', color: '#a8b8c8' }}>{row.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Send email button */}
                        {selectedMembership.email && (
                            <div style={{ marginBottom: '24px' }}>
                                <button
                                    onClick={() => {
                                        setSelectedMembership(null)
                                        setActiveTab('broadcast')
                                        setRecipientMode('one')
                                        setRecipientEmail(selectedMembership.email)
                                    }}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(22,101,52,0.14)', border: '1px solid rgba(22,101,52,0.28)', color: '#22a052', fontSize: '13px', fontWeight: 700, padding: '9px 16px', borderRadius: '10px', cursor: 'pointer' }}>
                                    <IconMail size={14} /> Send e-post til dette medlemmet
                                </button>
                            </div>
                        )}

                        <div>
                            <div style={{ fontSize: '11px', color: '#607080', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>
                                Familiemedlemmer ({selectedMembership.membership_members.length})
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {selectedMembership.membership_members.map((mem) => (
                                    <div key={mem.id} style={{ background: '#0b1520', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4f8', marginBottom: '4px' }}>
                                                {mem.fornavn} {mem.etternavn}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <span style={{ fontSize: '11px', color: '#607080' }}>{mem.personnummer}</span>
                                                <span style={{ fontSize: '11px', color: '#22a052' }}>· {mem.gender}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setDeleteMemberId(mem.id); setDeleteMemberName(`${mem.fornavn} ${mem.etternavn}`) }}
                                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#ef4444', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
                                            <IconTrash size={13} /> Slett
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete single member confirm modal */}
            {deleteMemberId && (
                <>
                    <div onClick={() => setDeleteMemberId(null)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, backdropFilter: 'blur(4px)' }} />
                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 301, width: '90%', maxWidth: '400px', background: '#111e2d', borderRadius: '20px', border: '1px solid rgba(239,68,68,0.2)', padding: '32px 24px', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
                                <IconTrash size={22} />
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4f8', marginBottom: '8px' }}>
                                Slett {deleteMemberName}?
                            </div>
                            <p style={{ fontSize: '13px', color: '#607080', lineHeight: 1.6 }}>
                                Denne personen vil bli permanent slettet. Hvis dette er siste person i husstanden, slettes hele registreringen.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setDeleteMemberId(null)}
                                style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: 'none', color: '#a8b8c8', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                                Avbryt
                            </button>
                            <button onClick={handleDeleteMember}
                                style={{ flex: 1, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                                Ja, slett
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}