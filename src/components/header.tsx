import ContentArea from '@/components/ContentArea'
import Heading from '@/components/Heading'
import Paragraph from '@/components/Paragraph'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="min-h-[80vh] bg-black">
      <ContentArea>
        <Heading as="h1" color="white" size="big">
          Stock Comparator
        </Heading>
        <Paragraph color="white" className="mt-6 max-w-2xl text-2xl font-bold">
          Unlock the best stock opportunities across every sector with our
          comprehensive analysis.
        </Paragraph>

        <Paragraph color="white" className="mt-6 max-w-2xl font-semibold">
          Explore over 2000 stocks analyzed and updated daily, employing
          advanced fundamental analysis techniques. Discover the potential for
          appreciation or depreciation in each stock, meticulously evaluated
          based on its financial reports, sector performance, growth outlook,
          and macroeconomic trends. Make informed investment decisions with
          comprehensive insights at your fingertips.
        </Paragraph>

        <div className="mt-12 flex flex-row space-x-4">
          <Link
            href="/select-detail"
            className="rounded-xl bg-gray-400 px-8 py-4 font-semibold text-white hover:bg-gray-500"
          >
            Company Details
          </Link>
          <Link
            href="/easy-table"
            className="rounded-xl border border-white bg-black px-8 py-4 font-semibold text-white hover:bg-white hover:text-black"
          >
            Easy Comparator
          </Link>
        </div>
      </ContentArea>
    </div>
  )
}

export default Header
