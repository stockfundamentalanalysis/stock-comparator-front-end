import ContentArea from '@/components/ContentArea'
import Navbar from '@/components/navbar'
import { isNotNull } from '@/lib/helpers'
import prisma from '@/lib/prisma/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Select from 'react-select'

interface Props {
  companies: string[]
  sectors: string[]
  data: Record<string, { ticker: string; sector: string | null }>
}

const Post = ({
  data,
  companies,
  sectors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [, setSectorName] = useState<string[]>([])
  const [ticker, setTicker] = useState<string>('')

  const handleChangeSector = (value: string | null) => {
    if (!value) {
      return
    }

    setSectorName([value])
  }

  const handleCompanyChange = (value: string | null) => {
    if (!value) {
      return
    }

    const companyValue = value.split(',')[0]

    setTicker(data[companyValue].ticker)
  }

  const companyDetailLink = () => {
    if (!ticker) {
      return `/select-detail`
    }

    router.push(`/detail/${ticker}`)
  }

  return (
    <>
      <Navbar />
      <ContentArea>
        <div className="mx-auto flex max-w-sm flex-col">
          <div>
            <Select
              name="sectors"
              options={sectors.map((name) => ({ value: name, label: name }))}
              className="basic-select"
              classNamePrefix="select"
              onChange={(newValue) =>
                handleChangeSector(newValue?.value ?? null)
              }
            />
          </div>
          <div className="mt-4">
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="companies"
              options={companies.map((name) => ({ value: name, label: name }))}
              onChange={(newValue) =>
                handleCompanyChange(newValue?.value ?? null)
              }
            />
          </div>
          <button
            onClick={() => companyDetailLink()}
            className="mt-4 rounded-xl bg-gray-600 px-8 py-4 font-semibold text-white hover:bg-gray-500"
          >
            Details
          </button>
        </div>
      </ContentArea>
    </>
  )
}

export const getServerSideProps = (async () => {
  const simpleanalysis = await prisma.simpleanalysis.findMany({
    select: {
      ticker: true,
      companyname: true,
      sector: true,
    },
  })

  const companies = simpleanalysis
    .map((item) => item.companyname)
    .filter(isNotNull)
    .sort()

  const sectors = simpleanalysis
    .map((item) => item.sector)
    .filter(isNotNull)
    .sort()

  const data: Record<string, { ticker: string; sector: string | null }> = {}

  for (const company of companies) {
    const item = simpleanalysis.find((item) => item.companyname === company)

    if (!item?.ticker) {
      continue
    }

    data[company] = {
      ticker: item.ticker,
      sector: item.sector,
    }
  }

  return {
    props: {
      data,
      companies: Array.from(new Set(companies)),
      sectors: Array.from(new Set(sectors)),
    },
  }
}) satisfies GetServerSideProps<Props>

export default Post
