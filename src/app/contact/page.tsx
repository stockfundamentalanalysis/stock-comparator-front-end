import ContactForm from '@/components/Pages/Contact/ContactForm'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: {
    canonical: canonicalBuilder('contact'),
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Contact',
    url: canonicalBuilder('contact'),
  },
}

export default function Page() {
  return <ContactForm />
}
