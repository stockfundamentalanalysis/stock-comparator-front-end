import { ToastProvider } from '@/app/toast'
import { cn } from '@/lib/classNames'
import {
  DEFAULT_SEO_DESCRIPTION,
  SITE_NAME,
  WEB_URL,
  sharedMetadata,
} from '@/lib/constants'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: DEFAULT_SEO_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: SITE_NAME,
    url: WEB_URL,
  },
  applicationName: SITE_NAME,
  referrer: 'strict-origin-when-cross-origin',
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
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, 'scroll-smooth')}>
      <body className="font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
