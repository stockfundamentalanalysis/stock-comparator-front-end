import { cn } from '@/lib/classNames'

type Color = 'black' | 'white'

const textColors: Record<Color, string> = {
  black: 'text-black',
  white: 'text-white',
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const textSizes: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

interface Props {
  color?: Color
  size?: Size
  className?: string
  children: React.ReactNode
}

const Paragraph = ({
  color = 'black',
  size = 'md',
  className = '',
  children,
}: Props): JSX.Element => {
  return (
    <p className={cn(textColors[color], textSizes[size], className)}>
      {children}
    </p>
  )
}

export default Paragraph
