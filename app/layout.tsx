import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Free Pet Health Tools & Trackers | JustPetem',
  description: 'Free practical pet health tools for pet owners. Track medications, vaccinations, vet visits, and health records for dogs, cats, horses, and more — built from 25 years of real animal care experience.',
  keywords: ['free pet health tools', 'pet health record', 'pet medication tracker', 'pet vaccination tracker', 'vet tools for pet owners', 'animal health records'],
  authors: [{ name: 'JustPetem' }],
  creator: 'JustPetem',
  publisher: 'JustPetem',
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://justpetem.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://justpetem.com',
    siteName: 'JustPetem',
    title: 'Free Pet Health Tools & Trackers | JustPetem',
    description: 'Free practical tools to track your pet\'s health, medications, vaccinations, and vet records. Works for dogs, cats, horses, ferrets, and all animals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JustPetem - Free Pet Health Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pet Health Tools & Trackers | JustPetem',
    description: 'Free practical tools to track your pet\'s health, medications, vaccinations, and vet records.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  other: {
    'theme-color': '#22c55e',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
