import Header from '@/components/Layout/Header'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="grid h-full flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </>
  )
}
