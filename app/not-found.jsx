import Link from 'next/link'

export const metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0A1B28' }}>404 — Page not found</h1>
        <p style={{ color: '#393E41', marginTop: '1rem' }}>
          <Link href="/en" style={{ color: '#CC8640' }}>Go to homepage</Link>
        </p>
      </body>
    </html>
  )
}
