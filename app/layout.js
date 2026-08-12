import { Plus_Jakarta_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import './craftwise.css'
import 'swiper/css'
import 'swiper/css/pagination'

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'Master Craftmenship Digitally (Home)',
    template: '%s | CraftWise',
  },
  description: 'Built for the Trades. Designed for People.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#304C61',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${jakartaSans.variable} antialiased`}>
        <NextTopLoader
          color="#cc8640"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #cc8640,0 0 5px #cc8640"
        />
        {children}
      </body>
    </html>
  )
}
