
import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/context'
import StatusBarInit from '@/components/StatusBarInit'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Ålesund Masjid',
  description: 'Bønnetider, kunngjøringer og arrangementer fra Ålesund Masjid',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#166534',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ålesund Masjid" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
        <Script id="pwa-install-tracking" strategy="afterInteractive">
          {`
        // ✅ Track PWA install
        window.addEventListener('appinstalled', function() {
            gtag('event', 'pwa_installed', {
                event_category: 'PWA',
                event_label: 'App installed to home screen'
            });
        });

        // ✅ Track install prompt shown
        window.addEventListener('beforeinstallprompt', function() {
            gtag('event', 'pwa_install_prompt_shown', {
                event_category: 'PWA',
                event_label: 'Install prompt shown to user'
            });
        });
    `}
        </Script>
      </head>
      <body>
        <LangProvider>
          <StatusBarInit />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}