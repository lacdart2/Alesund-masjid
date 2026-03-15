self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request))
})

// ✅ Handle push notification
self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {}
    event.waitUntil(
        self.registration.showNotification(data.title ?? 'Ålesund Masjid', {
            body: data.body ?? 'Tid for bønn',
            icon: '/web-app-manifest-192.png',
            badge: '/web-app-manifest-192.png',
            tag: 'prayer-time',
            renotify: true,
            data: { url: '/' },
        })
    )
})

// ✅ Click notification → open app
self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    event.waitUntil(
        clients.openWindow(event.notification.data?.url ?? '/')
    )
})