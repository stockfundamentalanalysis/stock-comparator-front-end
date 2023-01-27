import Head from 'next/head'
import Table from '@/components/Table2'

export default function Home() {
  return (
    <>
      <Head>
        <title>Stock Comparator</title>
        <meta name="description" content="Stock Comparator App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="font-extra-bold text-7xl underline">Hello, World!</h1>
        <div className="mt-4">
          <Table />
        </div>
      </main>
    </>
  )
}
