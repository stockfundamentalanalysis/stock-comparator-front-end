interface Props {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

const ContentArea = ({ children, as: Tag = 'div' }: Props): JSX.Element => {
  return (
    <Tag className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </Tag>
  )
}

export default ContentArea
