import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Celestial Guidance - AI Spiritual Readings by Aetheria Nexus',
  description:
    'Get the most precise spiritual reading combining palm reading, astrology, tarot, and numerology into one deeply personal AI-powered experience.',
  keywords: [
    'spiritual reading',
    'astrology',
    'tarot reading',
    'numerology',
    'palm reading',
    'AI spiritual guidance',
    'birth chart',
    'horoscope',
  ],
  openGraph: {
    title: 'Celestial Guidance - AI Spiritual Readings',
    description:
      'Cross-referenced palm reading, astrology, tarot & numerology in one deeply personal reading.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Celestial Guidance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celestial Guidance - AI Spiritual Readings',
    description:
      'Cross-referenced palm reading, astrology, tarot & numerology in one deeply personal reading.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
    <body className="antialiased">{children}</body>
  </html>
)

export default RootLayout
