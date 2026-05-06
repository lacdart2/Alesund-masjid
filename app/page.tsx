'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/components/layout/HomePage'
import PrayersPage from '@/components/prayer/PrayersPage'
import AnnouncementsPage from '@/components/announcements/AnnouncementsPage'
import EventsPage from '@/components/events/EventsPage'
import AboutPage from '@/components/about/AboutPage'
import ContactPage from '@/components/contact/ContactPage'
import DonatePage from '@/components/donate/DonatePage'
import DonateModal from '@/components/donate/DonateModal'
import InstallPrompt from '@/components/ui/InstallPrompt'
import PrayerChecker from '@/components/ui/PrayerChecker'
import AdhanBanner from '@/components/ui/AdhanBanner'
import MemberRegisterButton from '@/components/ui/MemberRegisterButton'

export type PageKey = 'home' | 'prayers' | 'announcements' | 'events' | 'about' | 'contact' | 'donate'

export default function App() {
  const [page, setPage] = useState<PageKey>('home')
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [banner, setBanner] = useState<{ prayerKey: string; time: string } | null>(null)

  const navigate = (p: PageKey) => {
    if (p === 'donate') {
      setDonateModalOpen(true)
      return
    }
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrayerTime = useCallback((prayerKey: string, time: string) => {
    setBanner({ prayerKey, time })
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(`🕌 ${prayerKey}`, {
        body: 'May Allah accept your prayer',
        icon: '/web-app-manifest-192.png',
      })
    }
  }, [])

  return (
    <>
      <div className="geo-pattern" />
      <PrayerChecker onPrayerTime={handlePrayerTime} />
      <AdhanBanner banner={banner} onClose={() => setBanner(null)} />
      <Navbar currentPage={page} navigate={navigate} />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: 'calc(64px + env(safe-area-inset-top))' }}>
        {page === 'home' && <HomePage navigate={navigate} openModal={() => setDonateModalOpen(true)} />}
        {page === 'prayers' && <PrayersPage />}
        {page === 'announcements' && <AnnouncementsPage />}
        {page === 'events' && <EventsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'donate' && <DonatePage openModal={() => setDonateModalOpen(true)} />}
      </main>
      <Footer navigate={navigate} />
      <InstallPrompt />
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />
      <MemberRegisterButton />
    </>
  )
}