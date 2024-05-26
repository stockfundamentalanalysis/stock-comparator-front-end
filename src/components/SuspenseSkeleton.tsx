import TailSpinIcon from '@/components/Icons/TailSpinIcon'
import { cn } from '@/lib/classNames'

interface ChartSkeletonProps {
  className?: string
}

const SuspenseSkeleton = ({
  className = '',
}: ChartSkeletonProps): JSX.Element => {
  return (
    <div className={cn('h-auto', className)}>
      <div className="flex h-full items-center justify-center">
        <TailSpinIcon />
      </div>
    </div>
  )
}

export default SuspenseSkeleton
