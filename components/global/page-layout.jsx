import React from 'react'
import { cookies } from 'next/headers'
import Header from './header'
import Footer from './footer'
import AnnouncementBanner from './announcement-banner'
import AnalyticsScripts from './analytics-scripts'
import ConsentProvider from './consent-provider'
import CookieBanner from './cookie-banner'
import { BlogProvider } from '@/lib/BlogContext'
import { getActiveAnnouncement } from '@/lib/announcements'
import { getPublicTrackingSetting } from '@/lib/analytics'
import { readConsentFromCookies } from '@/lib/consent'

const PageLayout = async ({ children , ctaData, ctaDesktopOnly = false, pageKey = "/" , locale = "de" }) => {
  const cookieStore = await cookies()
  const [announcement, tracking] = await Promise.all([
    getActiveAnnouncement({ locale, pageKey, cookieStore }),
    getPublicTrackingSetting(),
  ])

  // Read on the server so the first paint already knows the decision: no banner
  // flash, and no tracking script rendered before consent exists.
  const consent = readConsentFromCookies(cookieStore)

  return (
    <>
    <ConsentProvider initialConsent={consent}>
    <BlogProvider>
      <Header  />
      {announcement ? <AnnouncementBanner announcement={announcement} /> : null}
      {children}
      <Footer ctaData={ctaData} ctaDesktopOnly={ctaDesktopOnly} />
      </BlogProvider>
      <CookieBanner />
      <AnalyticsScripts
        measurementId={tracking.measurementId}
        gtmContainerId={tracking.gtmContainerId}
        consentRequired={tracking.consentRequired}
      />
    </ConsentProvider>
    </>
  )
}

export default PageLayout
