import ContentArea from '@/components/ContentArea'
import Heading from '@/components/Heading'
import Paragraph from '@/components/Paragraph'
import imgGrowth from '@/images/growth.jpeg'
import imgDetail from '@/images/prof.jpeg'
import imgProtect from '@/images/protect.jpeg'
import imgSearch from '@/images/search.jpeg'
import imgSector from '@/images/sector.jpeg'
import Image from 'next/image'

const data = [
  {
    id: 'value-investing',
    title: 'Value Investing',
    description:
      'Value investing entails choosing undervalued stocks trading below their intrinsic value or target price. As value investors, we purchase stocks that the market underestimates, indicating they are undervalued, and sell them once they approach their target price.',
    image: {
      src: imgSearch,
      alt: 'Value Investing',
    },
  },
  {
    id: 'sector-adaptation',
    title: 'Sector Adaptation',
    description:
      'Companies are analyzed based on their respective sectors, with considerations for differing characteristics and dynamics. For instance, a bank cannot undergo the same analysis as a technology firm or a cyclical commodity producer.',
    image: {
      src: imgSector,
      alt: 'Sector Adaptation',
    },
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    description:
      "A in depth analysis of a company's fundamental state involves computing key historical financial metrics, including net income, Total Net Debt, Free Cash Flow, EBITDA, ROIC, Liabilities, Cash available, and interest expenses, among others.",
    image: {
      src: imgDetail,
      alt: 'Fundamental Analysis',
    },
  },
  {
    id: 'target-price-potential',
    title: 'Target Price & Potential',
    description:
      "The stock's target price is calculated from sophisticated discounted cash flow techniques that analyze financial reports, future earnings estimates, and sector metrics. This target price reflects the intrinsic value of the stock. The ratio between the target price and the current stock price is the potential for appreciation or depreciation.",
    image: {
      src: imgGrowth,
      alt: 'Target Price & Potential',
    },
  },
  {
    id: 'risk-mitigation-investing-strategy',
    title: 'Risk Mitigation & Investing Strategy',
    description:
      "Through rigorous mathematical analysis of company finances, only investing in high-appreciation potential companies, and selling when they hit close to their target price, investors steer clear of permanent losses. Like Warren Buffett says, 'First rule of investing: Don't lose money. Second rule: Don't forget the first one.'",
    image: {
      src: imgProtect,
      alt: 'Risk Mitigation & Investing Strategy',
    },
  },
]

const GetStarted = () => {
  return (
    <ContentArea>
      <Heading as="h2" className="mt-12 text-center">
        The Approach
      </Heading>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
        {data.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={200}
                height={200}
                className="rounded-full"
              />
              <div className="mt-6">
                <Heading as="h3" size="small" className="text-center">
                  {item.title}
                </Heading>
                <Paragraph size="sm" className="mt-2 text-center">
                  {item.description}
                </Paragraph>
              </div>
            </div>
          )
        })}
      </div>
    </ContentArea>
  )
}

export default GetStarted
