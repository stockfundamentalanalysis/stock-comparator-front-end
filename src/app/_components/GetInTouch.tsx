import ContentArea from '@/components/ContentArea'
import Heading from '@/components/Heading'
import ArrowTrendingUpIcon from '@/components/Icons/ArrowTrendingUpIcon'
import BriefcaseIcon from '@/components/Icons/BriefcaseIcon'
import CalculatorIcon from '@/components/Icons/CalculatorIcon'
import Paragraph from '@/components/Paragraph'
import Link from 'next/link'

const GetInTouch = () => {
  return (
    <div className="bg-black py-24">
      <ContentArea>
        <Heading as="h2" color="white" size="big" className="text-center">
          Stock Comparator Premium
        </Heading>
        <Paragraph
          color="white"
          className="mt-6 text-center text-2xl font-semibold"
        >
          Only for registered users
        </Paragraph>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="flex items-start justify-center rounded-xl bg-white p-8">
              <BriefcaseIcon className="h-20 w-auto text-black" />
            </div>
            <div className="mt-4">
              <p className="text-center text-lg font-semibold text-white">
                Manage your own real or demo portfolio. Get the overall vision
                of its performance.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-center rounded-xl bg-white p-8">
              <CalculatorIcon className="h-20 w-auto text-black" />
            </div>
            <div className="mt-4">
              <p className="text-center text-lg font-semibold text-white">
                Request the target price and potential calculation of any stock
                worldwide.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-start justify-center rounded-xl bg-white p-8">
              <ArrowTrendingUpIcon className="h-20 w-auto text-black" />
            </div>
            <div className="mt-4">
              <p className="text-center text-lg font-semibold text-white">
                Recalculate the target price of any stock based on your own company growth estimates.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 flex justify-center">
          <Link
            href="/contact"
            className="rounded-xl bg-gray-400 px-8 py-4 font-semibold text-white hover:bg-gray-500"
          >
            Get in touch
          </Link>
        </div>
      </ContentArea>
    </div>
  )
}

export default GetInTouch
