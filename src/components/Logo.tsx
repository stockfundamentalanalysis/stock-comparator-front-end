import ArrowTrendingUpIcon from '@/components/Icons/ArrowTrendingUpIcon'
import Paragraph from '@/components/Paragraph'

const Logo = () => (
  <div className="flex flex-row items-center space-x-2">
    <ArrowTrendingUpIcon className="h-8 w-auto font-bold text-white" />
    <Paragraph color="white" size="xl">
      Stock Comparator
    </Paragraph>
  </div>
)

export default Logo
