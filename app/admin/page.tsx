'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function AdminLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.documentElement.lang = 'no'
        document.documentElement.dir = 'ltr'
        document.body.style.direction = 'ltr'
        document.body.style.textAlign = 'left'
    }, [])

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/admin/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem('admin-auth', '1')
                router.push('/admin/dashboard')
            } else {
                setError('Feil e-post eller passord')
            }
        } catch {
            setError('Noe gikk galt. Prøv igjen.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0b1520',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            direction: 'ltr',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: '#111e2d',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '40px 32px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img src="/logo.png" alt="logo" style={{
                            width: '64px', height: '64px', objectFit: 'contain',
                            filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(522%) hue-rotate(95deg) brightness(96%) contrast(96%)',
                            marginBottom: '12px',
                        }} />
                    </a>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4f8' }}>Ålesund Moske</div>
                    <div style={{ fontSize: '13px', color: '#607080', marginTop: '4px' }}>Admin Panel</div>
                </div>

                {/* Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: '#a8b8c8', marginBottom: '5px', display: 'block' }}>
                            E-post
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                width: '100%', background: '#0b1520',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px', padding: '11px 14px',
                                fontSize: '14px', color: '#f0f4f8',
                                outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', color: '#a8b8c8', marginBottom: '5px', display: 'block' }}>
                            Passord
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            style={{
                                width: '100%', background: '#0b1520',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px', padding: '11px 14px',
                                fontSize: '14px', color: '#f0f4f8',
                                outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ fontSize: '13px', color: '#ef4444', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        style={{
                            background: loading ? '#607080' : '#166534',
                            border: 'none', color: '#fff',
                            borderRadius: '10px', padding: '12px',
                            fontSize: '15px', fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '8px',
                        }}
                    >
                        {loading ? 'Logger inn...' : 'Logg inn'}
                    </button>
                </div>
            </div>
        </div>
    )
}