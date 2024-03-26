'use client'

import ContentArea from '@/components/ContentArea'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Select from 'react-select'

interface Props {
  data: Record<string, { ticker: string; sector: string | null }>
  companies: string[]
  sectors: string[]
}

const CompanySelector = ({ data, companies, sectors }: Props) => {
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

  return (
    <ContentArea>
      <div className="mx-auto flex max-w-sm flex-col">
        <div>
          <Select
            name="sectors"
            options={sectors.map((name) => ({ value: name, label: name }))}
            className="basic-select"
            classNamePrefix="select"
            onChange={(newValue) => handleChangeSector(newValue?.value ?? null)}
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
          onClick={() => router.push(`/detail/${ticker.toLowerCase()}`)}
          disabled={!ticker}
          className="mt-4 rounded-xl bg-gray-600 px-8 py-4 font-semibold text-white hover:bg-gray-500"
        >
          Details
        </button>
      </div>
    </ContentArea>
  )
}

export default CompanySelector
