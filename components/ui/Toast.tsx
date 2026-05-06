'use client'

import { useEffect } from 'react'
import { IconX } from '@/components/ui/Icons'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
    id: string
    message: string
    type: ToastType
}

interface ToastProps {
    toasts: ToastMessage[]
    removeToast: (id: string) => void
}

export default function Toast({ toasts, removeToast }: ToastProps) {
    return (
        <div style={{
            position: 'fixed', top: '24px', right: '24px',
            zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px',
            maxWidth: '320px', width: '90%',
            direction: 'ltr',
        }}>
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
            ))}
        </div>
    )
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onRemove, 4000)
        return () => clearTimeout(timer)
    }, [])

    const colors = {
        success: { bg: 'rgba(22,101,52,0.95)', border: 'rgba(34,160,82,0.4)', icon: '✓' },
        error: { bg: 'rgba(185,28,28,0.95)', border: 'rgba(239,68,68,0.4)', icon: '✕' },
        info: { bg: 'rgba(17,30,45,0.97)', border: 'rgba(255,255,255,0.12)', icon: 'ℹ' },
    }

    const c = colors[toast.type]

    return (
        <div style={{
            background: c.bg, border: `1px solid ${c.border}`,
            borderRadius: '12px', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            animation: 'slideIn 0.2s ease',
            backdropFilter: 'blur(8px)',
        }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontSize: '13px', color: '#fff', flex: 1, lineHeight: 1.4 }}>{toast.message}</span>
            <button onClick={onRemove} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', padding: 0, flexShrink: 0 }}>
                <IconX size={14} />
            </button>
        </div>
    )
}