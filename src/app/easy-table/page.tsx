import Table from '@/components/Pages/EasyTable/Table'
import prisma from '@/lib/prisma/client'
import { simpleAnalysisSelect } from '@/lib/prisma/simpleAnalysis'

export default async function Page() {
  const data = await prisma.simpleanalysis.findMany({
    select: simpleAnalysisSelect,
  })

  return <Table data={data} />
}
