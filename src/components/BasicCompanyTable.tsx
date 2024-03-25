function createData(key: string, value: number, unit: string) {
  return { key, value, unit }
}

interface Props {
  company: {
    currentper: number
    currentevebitda: number
    currentpricetofreecashflowrate: number
    roic: number
    netdebttoebitda: number
  }
}

const BasicCompanyTable = ({ company }: Props) => {
  const {
    currentper,
    currentevebitda,
    currentpricetofreecashflowrate,
    roic,
    netdebttoebitda,
  } = company

  const rows = [
    createData('PER', currentper, ''),
    createData('EV/EBITDA', currentevebitda, ''),
    createData('Price/Free Cash Flow', currentpricetofreecashflowrate, ''),
    createData('ROIC', roic * 100, '%'),
    createData('Net Debt/EBITDA', netdebttoebitda, ''),
  ]

  return (
    <div className="flow-root">
      <div className="overflow-hidden rounded-lg ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Indicator
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {row.key}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {typeof row.value === 'number'
                    ? row.value.toFixed(1)
                    : row.value}{' '}
                  {row.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BasicCompanyTable
