import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import LoadingWrapper from '@/components/LoadingWrapper'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.agencymail.qzz.io'),
  title: {
    default: 'Free Temporary Email - AgencyMail',
    template: '%s | AgencyMail'
  },
  description: 'Get free temporary email instantly. Protect your privacy with our fast, secure, and disposable email service. No registration required.',
  keywords: ['temporary email', 'disposable email', 'temp mail', 'fake email', 'anonymous email', 'agencymail', 'privacy', 'secure email'],
  authors: [{ name: 'AgencyMail' }],
  creator: 'AgencyMail',
  publisher: 'AgencyMail',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Free Temporary Email - AgencyMail',
    description: 'Protect your privacy with our free temporary email service. Fast, secure, and easy to use.',
    url: 'https://agencymail.com',
    siteName: 'AgencyMail',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgencyMail - Free Temporary Email',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Temporary Email - AgencyMail',
    description: 'Get free temporary email instantly. Protect your privacy.',
    images: ['/og-image.png'],
    creator: '@agencymail',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://agencymail.com',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9864680842416202"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased selection:bg-primary/30 selection:text-primary`}>
        <Toaster position="bottom-right" />
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  )
}
