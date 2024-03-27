import Table from '@/app/easy-table/_components/Table'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { simpleAnalysisSelect } from '@/lib/prisma/simpleAnalysis'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Easy Table',
  alternates: {
    canonical: canonicalBuilder('easy-table'),
  },
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Easy Table',
    url: canonicalBuilder('easy-table'),
  },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await prisma.simpleanalysis.findMany({
    select: simpleAnalysisSelect,
  })

  return <Table data={data} />
}
