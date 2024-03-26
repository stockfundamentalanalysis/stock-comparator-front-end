import Table from '@/components/Pages/AdvancedTable/Table'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { fundamentalAnalysisSelect } from '@/lib/prisma/fundamentalAnalysis'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Table',
  alternates: {
    canonical: canonicalBuilder('advanced-table'),
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Advanced Table',
    url: canonicalBuilder('advanced-table'),
  },
}

export default async function Page() {
  const data = await prisma.fundamentalanalysis.findMany({
    select: fundamentalAnalysisSelect,
  })

  return <Table data={data} />
}
