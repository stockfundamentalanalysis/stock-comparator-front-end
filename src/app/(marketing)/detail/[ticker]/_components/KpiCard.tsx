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

export default KpiCard
