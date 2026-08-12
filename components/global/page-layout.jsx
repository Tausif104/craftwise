import React from 'react'
import { cookies } from 'next/headers'
import Header from './header'
import Footer from './footer'
import AnnouncementBanner from './announcement-banner'
import { BlogProvider } from '@/lib/BlogContext'
import { getActiveAnnouncement } from '@/lib/announcements'

const PageLayout = async ({ children , ctaData, ctaDesktopOnly = false, pageKey = "/" , locale = "de" }) => {
  const cookieStore = await cookies()
  const announcement = await getActiveAnnouncement({ locale, pageKey, cookieStore })
  console.log("announcement", announcement)

  return (
    <>
    <BlogProvider>
      <Header  />
      {announcement ? <AnnouncementBanner announcement={announcement} /> : null}
      {children}
      <Footer ctaData={ctaData} ctaDesktopOnly={ctaDesktopOnly} />
      </BlogProvider>
    </>
  )
}

export default PageLayout
