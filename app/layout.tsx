import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/context'
import StatusBarInit from '@/components/StatusBarInit'
import Script from 'next/script'
import AndroidBanner from '@/components/ui/AndroidBanner'
import { ToastProvider } from '@/lib/toastContext'

export const viewport: Viewport = {
  themeColor: '#166534',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alesund-masjid.vercel.app'),
  title: 'Ålesund Moske — Bønnetider, Kunngjøringer & Arrangementer',
  description: 'Offisiell app for Ålesund Moske. Finn bønnetider, kunngjøringer og arrangementer. مواقيت الصلاة والأنشطة في مسجد أولسند، النرويج.',
  manifest: '/manifest.json',
  keywords: ['ålesund Moske', 'bønnetider ålesund', 'moské ålesund', 'islam norge', 'prayer times ålesund', 'مسجد أولسند', 'مواقيت الصلاة'],
  authors: [{ name: 'Ålesund Moske' }],
  openGraph: {
    title: 'Ålesund Moske — Bønnetider & Arrangementer',
    description: 'Offisiell app for Ålesund Moske. Bønnetider, kunngjøringer og arrangementer.',
    url: 'https://alesund-moske.vercel.app',
    siteName: 'Ålesund Moske',
    locale: 'no_NO',
    type: 'website',
    images: [
      {
        url: 'https://alesund-masjid.vercel.app/logo.png',
        width: 512,
        height: 512,
        alt: 'Ålesund Moske',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ålesund Moske — Bønnetider & Arrangementer',
    description: 'Offisiell app for Ålesund Moske. Bønnetider, kunngjøringer og arrangementer.',
    images: ['https://alesund-masjid.vercel.app/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" dir="ltr">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ålesund Moske" />
        <link rel="canonical" href="https://alesund-masjid.vercel.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FY5WD26T1P"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FY5WD26T1P');
          `}
        </Script>
        <Script id="pwa-install-tracking" strategy="afterInteractive">
          {`
            window.addEventListener('appinstalled', function() {
                gtag('event', 'pwa_installed', {
                    event_category: 'PWA',
                    event_label: 'App installed to home screen'
                });
            });
            window.addEventListener('beforeinstallprompt', function() {
                gtag('event', 'pwa_install_prompt_shown', {
                    event_category: 'PWA',
                    event_label: 'Install prompt shown to user'
                });
            });
          `}
        </Script>
        <Script id="schema-org" strategy="beforeInteractive">
          {`{
    "@context": "https://schema.org",
    "@type": "mosque",
    "name": "Ålesund Moske",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Latinskolegata 1",
      "addressLocality": "Ålesund",
      "postalCode": "6004",
      "addressCountry": "NO"
    },
    "telephone": "+4748292763",
    "url": "https://alesundmoske.no",
    "openingHours": "Mo-Su 05:00-23:00",
    "sameAs": "https://www.facebook.com/share/1FU3p6YUzA/"
  }`}
        </Script>
      </head>

      <body>
        <LangProvider>
          <ToastProvider>
            <StatusBarInit />
            <AndroidBanner />
            {children}
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  )
}