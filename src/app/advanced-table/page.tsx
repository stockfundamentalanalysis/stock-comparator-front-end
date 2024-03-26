import Table from '@/components/Pages/AdvancedTable/Table'
import prisma from '@/lib/prisma/client'
import { fundamentalAnalysisSelect } from '@/lib/prisma/fundamentalAnalysis'

export default async function Page() {
  const data = await prisma.fundamentalanalysis.findMany({
    select: fundamentalAnalysisSelect,
  })

  return <Table data={data} />
}
