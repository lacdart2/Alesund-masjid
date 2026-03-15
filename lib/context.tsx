'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Lang } from '@/types'

type LangContextType = {
    lang: Lang
    setLang: (l: Lang) => void
    dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextType>({
    lang: 'no',
    setLang: () => { },
    dir: 'ltr',
})

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('no')

    const setLang = (l: Lang) => {
        setLangState(l)
        document.documentElement.lang = l
        document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    }

    useEffect(() => {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }, [lang])

    return (
        <LangContext.Provider value={{ lang, setLang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
            {children}
        </LangContext.Provider>
    )
}

export function useLang() {
    return useContext(LangContext)
}