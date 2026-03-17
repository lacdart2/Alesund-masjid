/* 'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/components/layout/HomePage'
import PrayersPage from '@/components/prayer/PrayersPage'
import AnnouncementsPage from '@/components/announcements/AnnouncementsPage'
import EventsPage from '@/components/events/EventsPage'
import AboutPage from '@/components/about/AboutPage'
import ContactPage from '@/components/contact/ContactPage'
import DonatePage from '@/components/donate/DonatePage'
import InstallPrompt from '@/components/ui/InstallPrompt'

export type PageKey = 'home' | 'prayers' | 'announcements' | 'events' | 'about' | 'contact' | 'donate'

export default function App() {
  const [page, setPage] = useState<PageKey>('home')

  const navigate = (p: PageKey) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="geo-pattern" />
      <Navbar currentPage={page} navigate={navigate} />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'prayers' && <PrayersPage />}
        {page === 'announcements' && <AnnouncementsPage />}
        {page === 'events' && <EventsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'donate' && <DonatePage />}
      </main>
      <Footer navigate={navigate} />
      <InstallPrompt />
    </>
  )
} */

'use client'

import { useState } from 'react'
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

export type PageKey = 'home' | 'prayers' | 'announcements' | 'events' | 'about' | 'contact' | 'donate'

export default function App() {
  const [page, setPage] = useState<PageKey>('home')
  // ✅ Modal state lives here — accessible by navbar + donate page
  const [donateModalOpen, setDonateModalOpen] = useState(false)

  const navigate = (p: PageKey) => {
    // ✅ Intercept donate — open modal instead of navigating
    if (p === 'donate') {
      setDonateModalOpen(true)
      return
    }
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="geo-pattern" />
      <Navbar currentPage={page} navigate={navigate} />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>
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

      {/* ✅ Modal renders on top of everything */}
      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
      />
    </>
  )
}