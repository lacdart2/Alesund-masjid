import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/context'

export const metadata: Metadata = {
  title: 'Ålesund Masjid',
  description: 'Ålesund Jamii Islamic Center — Bønnetider, kunngjøringer og arrangementer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" dir="ltr">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}