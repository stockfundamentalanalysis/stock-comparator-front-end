import { Metadata } from 'next'

export const WEB_URL = String(
  process.env.WEB_URL ?? 'https://www.stockcomparator.com'
)
export const SITE_NAME = 'Stock Comparator'
export const DEFAULT_SEO_DESCRIPTION =
  'Unlock the best stock opportunities across every sector with our comprehensive analysis.'

interface SharedMetadata {
  openGraph: Metadata['openGraph']
}

export const sharedMetadata: SharedMetadata = {
  openGraph: {
    description: DEFAULT_SEO_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en',
    type: 'website',
  },
}
