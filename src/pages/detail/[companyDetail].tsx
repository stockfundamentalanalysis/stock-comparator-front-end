import ContentArea from '@/components/ContentArea'
import TailSpinIcon from '@/components/Icons/TailSpinIcon'
import Navbar from '@/components/navbar'
import Radar from '@/components/radar'
import BasicTable from '@/components/table'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface CompanyData {
  companyname: string
  sector: string
  targetprice: number
  longdescription: string
  potential: number
  growthscore: number
  debtqualityscore: number
  earningsscore: number
  profitabilityscore: number
  currency: string
  price: number
  currentper: number
  currentevebitda: number
  currentpricetofreecashflowrate: number
  roic: number
  netdebttoebitda: number
}

const KpiCard = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <div className="truncate text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {children}
      </div>
    </div>
  )
}

const Post = () => {
  const router = useRouter()
  const cleanPath = router.asPath.split('#')[0].split('?')[0].split('l/')[1]
  const company_name = cleanPath.toUpperCase()
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/get-specific-company?ticker=${company_name}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch company data')
        }

        const companyData = await response.json()
        setCompanyData(companyData)
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [company_name])

  const company = companyData ? companyData : null

  if (!company || !companyData) {
    return (
      <>
        <Navbar></Navbar>
        <h1>Company not found</h1>
      </>
    )
  }

  return (
    <>
      <Navbar></Navbar>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <TailSpinIcon />
        </div>
      ) : (
        <ContentArea>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col space-y-4">
              <KpiCard title="Company">{company.companyname}</KpiCard>
              <KpiCard title="Sector">{company.sector}</KpiCard>
              <KpiCard title="Target price">
                {company.targetprice?.toFixed(1)} {company.currency}
              </KpiCard>
              <KpiCard title="Current price">
                {company.price?.toFixed(1)} {company.currency}
              </KpiCard>
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
            </div>

            <div>
              <Radar company={company} />
            </div>

            <div>
              <div className="flex flex-col">
                <div>
                  <KpiCard title="Company Details">
                    <p className="text-sm font-thin">
                      {company.longdescription}
                    </p>
                  </KpiCard>
                </div>

                <div className="mt-4">
                  <BasicTable company={companyData}></BasicTable>
                </div>
              </div>
            </div>
          </div>
        </ContentArea>
      )}
    </>
  )
}

export default Post
