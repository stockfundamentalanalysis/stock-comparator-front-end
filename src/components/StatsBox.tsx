interface Props {
  children: React.ReactNode
  backgroundColor?: string
  as?: keyof JSX.IntrinsicElements
}

const StatsBox = ({
  children,
  backgroundColor = undefined,
  as: Tag = 'span',
}: Props): JSX.Element => {
  return (
    <Tag className="rounded-md px-4 py-2" style={{ backgroundColor }}>
      {children}
    </Tag>
  )
}

export default StatsBox
