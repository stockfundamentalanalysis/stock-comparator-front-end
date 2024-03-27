import Table from '@/app/advanced-table/_components/Table'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { fundamentalAnalysisSelect } from '@/lib/prisma/fundamentalAnalysis'
import { Prisma } from '@prisma/client'
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

export const dynamic = 'force-dynamic'

const where = {
  ebitdamargin: {
    gte: -1000,
  },
  netincomemargin: {
    gte: -1000,
  },
} satisfies Prisma.fundamentalanalysisWhereInput

export default async function Page() {
  const data = await prisma.fundamentalanalysis.findMany({
    where,
    select: fundamentalAnalysisSelect,
  })

  return <Table data={data} />
}
