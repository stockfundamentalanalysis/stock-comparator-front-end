import CompanySelector from '@/app/select-detail/_components/CompanySelector'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import { getCompanySelector } from '@/lib/prisma/company'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Details',
  alternates: {
    canonical: canonicalBuilder('select-detail'),
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Company Details',
    url: canonicalBuilder('select-detail'),
  },
}

export default async function Page() {
  const { data, companies, sectors } = await getCompanySelector()

  return <CompanySelector data={data} companies={companies} sectors={sectors} />
}
