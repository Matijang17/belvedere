import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Belvedere Properties SA — Luxury Real Estate & Design Studio',
  description:
    'Belvedere Properties SA is a luxury real estate and design studio based in Morcote, Switzerland — architecture, interior design, and bespoke construction.',
  openGraph: {
    title: 'Belvedere Properties SA',
    description: 'Luxury Real Estate & Design Studio — Morcote, Switzerland',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
