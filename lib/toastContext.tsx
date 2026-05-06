'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ToastMessage, ToastType } from '@/components/ui/Toast'
import Toast from '@/components/ui/Toast'

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ addToast: () => { } })

function ToastDisplay({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: string) => void }) {
    return <Toast toasts={toasts} removeToast={removeToast} />
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([])

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).slice(2)
        setToasts(prev => [...prev, { id, message, type }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastDisplay toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}