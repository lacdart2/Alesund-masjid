import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/context'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Ålesund Masjid',
  description: 'Ålesund Jamii Islamic Center — Bønnetider, kunngjøringer og arrangementer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" dir="ltr">
      <head>
        {/* ✅ Prevents horizontal overflow on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FY5WD26T1P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FY5WD26T1P');
          `}
        </Script>
      </head>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}