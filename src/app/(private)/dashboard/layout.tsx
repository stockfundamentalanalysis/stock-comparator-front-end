export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-auto flex-shrink-0 flex-row text-gray-800 antialiased">
      <main className="grid h-full flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
