# Ålesund Masjid — Project Context (Updated May 2026)

## Stack

- Next.js 14, TypeScript, inline styles (no Tailwind)
- Supabase (connected): uvrqwumdzxscxsqnvdyr.supabase.co
- Capacitor (Android native)
- Resend (email)
- Repo: https://github.com/lacdart2/Alesund-masjid.git
- Live: alesund-masjid.vercel.app

## Real Data

- Address: Latinskolegata 1, 6004 Ålesund
- Phone: 48 29 27 63 | Vipps: 553705 | Bank: 6550.05.90771
- Analytics: G-FY5WD26T1P
- Facebook: https://www.facebook.com/share/1FU3p6YUzA/
- Admin email: sagvan_2005@hotmail.com

## ✅ Completed Features

- PWA live on Vercel
- Android native app (Capacitor)
- Background adhan (fires ~40s after prayer time)
- Adhan settings modal (5 muezzins, per-prayer toggles)
- Prayer times Feb 18 – May 31 2026 (including DST, post-midnight Isha fix)
- After-Isha bug fixed — shows tomorrow Fajr with isTomorrow flag
- Name updated to "Ålesund Moske" everywhere
- Android coming soon banner (AndroidBanner.tsx)
- Facebook page card in About page
- Facebook link in footer
- Metadata warnings fixed (viewport export, metadataBase)
- Schema.org structured data for SEO
- Privacy policy page at /personvern
- Toast system (Toast.tsx + toastContext.tsx)
- Member registration form (MemberRegisterButton.tsx) — 4 steps, 3 languages, GDPR consent
- Supabase tables: memberships, membership_members
- Auto email to admin on new member registration (Resend)
- Admin dashboard at /admin + /admin/dashboard
     - Members table with search + CSV download
     - Drawer with member details + individual delete
     - Broadcast email with templates (NO/EN/AR) + recipient selector
     - Send to single member from drawer

## Supabase Tables

```sql
memberships: id, address, post_nr, kommune, sted, phone_home, phone_mobile, email, signature_name, submitted_at
membership_members: id, membership_id, fornavn, etternavn, personnummer, gender, same_address, email
```

## Environment Variables (.env.local + Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://uvrqwumdzxscxsqnvdyr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
NEXT_PUBLIC_ADMIN_EMAIL=sagvan_2005@hotmail.com
ADMIN_EMAIL=sagvan_2005@hotmail.com
ADMIN_PASSWORD=AlesundMoske2026!
```

## Key Files

- lib/supabase.ts — Supabase client
- lib/prayer.ts — prayer times array + helpers (toMinutes handles post-midnight)
- lib/toastContext.tsx — global toast system
- lib/translations.ts — all UI text NO/EN/AR
- lib/data.ts — hardcoded announcements + events
- components/ui/MemberRegisterButton.tsx — registration form + floating button
- components/ui/Toast.tsx — toast component
- components/ui/AndroidBanner.tsx — coming soon banner
- components/ui/Icons.tsx — all Tabler SVG icons
- app/admin/page.tsx — admin login
- app/admin/dashboard/page.tsx — admin dashboard
- app/personvern/page.tsx — privacy policy
- app/api/send-email/route.ts — Resend email API
- app/api/admin/verify/route.ts — admin auth API

## Domain Status

- alesundmoske.no added to Vercel — waiting for DNS from Sagvan (telenor.no)
- DNS records needed: A @ 216.198.79.1, CNAME www a7ed99d862cf1211.vercel-dns-017.com
- Resend domain verification pending — needs alesundmoske.no DNS
- Until domain verified: Resend only sends to lagdarkader@gmail.com

## 🔴 TODO — High Priority

- Verify alesundmoske.no in Resend (after DNS confirmed)
- Create separate Supabase account for mosque (meet with Sagvan + styret)
- Nikah contact form → email to Sheikh Abbas
- Besøk moskeen form → email to Sagvan
- Newsletter subscription form

## 🟡 TODO — Medium Priority

- Footer padding under Android nav bar
- Adhan modal save button padding on Android
- Contact forms (nikah + visit mosque)
- Activities/RSVP improvements

## 📋 TODO — Backlog

- Auto-hide past events
- Push notifications
- OCR pipeline for prayer times
- Password change in admin dashboard
- React Native Expo (future)

## Naming TODO (when confirmed)

- Rename everything from "Masjid" to "Moske"
- New logo
- Rename Supabase project
- Rename Vercel project
- Rename GitHub repo
- Update Android app name

## Coding Rules

- Inline styles only — no Tailwind in components
- Always 'use client' on .tsx files
- Always use Tabler icons from Icons.tsx
- Never use href = { url } with spaces
- Always write <a href="..." on same line
- output: 'export' REMOVED from next.config.js (needed for API routes)
- Short commit messages
- All changes push to main, Vercel auto-deploys

## Android Build

```bash
export PATH=$PATH:~/Library/Android/sdk/platform-tools
adb pair 192.168.1.159:PAIRPORT
adb connect 192.168.1.159:MAINPORT
cd ~/Desktop/alesund-masjid-web && npm run build && npx cap sync && cd android && export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home && export PATH=$JAVA_HOME/bin:$PATH && export PATH=$PATH:~/Library/Android/sdk/platform-tools && ./gradlew assembleDebug && adb -s 192.168.1.159:MAINPORT install app/build/outputs/apk/debug/app-debug.apk
```

- Always uninstall manually before installing. No -r flag.
- Phone IP: 192.168.1.159 — ports change each session

## What NOT to do (Android adhan)

- ❌ exact: true — breaks background firing
- ❌ Sound in notification object — conflicts with channel
- ❌ +02:00 timezone — use +01:00 (CET)
