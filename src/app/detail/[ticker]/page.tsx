import ContentArea from '@/components/ContentArea'
import KpiCard from '@/components/Pages/Company/KpiCard'
import Radar from '@/components/Pages/Company/Radar'
import Table from '@/components/Pages/Company/Table'
import { sharedMetadata } from '@/lib/constants'
import { canonicalBuilder } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import { getCompanyDetails } from '@/lib/prisma/company'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { ticker: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await prisma.companies.findFirst({
    where: {
      ticker: {
        contains: params.ticker,
        mode: 'insensitive',
      },
    },
    select: {
      companyname: true,
    },
  })

  if (!company?.companyname) {
    notFound()
  }

  return {
    title: company.companyname,
    alternates: {
      canonical: canonicalBuilder('detail', params.ticker),
    },
    openGraph: {
      ...sharedMetadata.openGraph,
      title: company.companyname,
      url: canonicalBuilder('blog', params.ticker),
    },
  }
}

export default async function Page({ params }: { params: { ticker: string } }) {
  const company = await getCompanyDetails(params.ticker)

  if (!company) {
    notFound()
  }

  return (
    <ContentArea>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <KpiCard title="Company">{company.companyname}</KpiCard>
          <KpiCard title="Sector">{company.sector}</KpiCard>
          <KpiCard title="Target price">
            {company.targetprice?.toFixed(1) ?? '-'} {company.currency}
          </KpiCard>
          <KpiCard title="Current price">
            {company.price?.toFixed(1) ?? '-'} {company.currency}
          </KpiCard>
          {company.potential && (
            <KpiCard title="Potential">
              <span
                style={{
                  color:
                    company.potential > 0.3
                      ? 'green'
                      : company.potential >= -0.1
                        ? 'black'
                        : 'red',
                }}
              >
                {Math.round(company.potential * 100)} %
              </span>
            </KpiCard>
          )}
        </div>

        <Radar company={company} />

        <div>
          <KpiCard title="Company Details">
            <p className="text-sm font-thin">
              {company.longdescription ?? '-'}
            </p>
          </KpiCard>

          <Table company={company} className="mt-4" />
        </div>
      </div>
    </ContentArea>
  )
}
