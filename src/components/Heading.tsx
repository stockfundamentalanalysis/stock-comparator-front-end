import { cn } from '@/lib/classNames'

type Color = 'black' | 'white'

const textColors: Record<Color, string> = {
  black: 'text-black',
  white: 'text-white',
}

type Size = 'big' | 'medium' | 'small'

const textSizes: Record<Size, string> = {
  big: 'text-3xl leading-8 md:text-5xl sm:tracking-tight',
  medium: 'text-2xl leading-7 sm:text-4xl sm:tracking-tight',
  small: 'text-xl leading-6 sm:text-2xl sm:tracking-tight',
}

interface Props {
  children: React.ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: Color
  size?: Size
  className?: string
}

const Heading = ({
  children,
  as: Tag,
  color = 'black',
  size = 'medium',
  className = '',
}: Props): JSX.Element => {
  return (
    <Tag
      className={cn(
        'font-brockmann font-bold',
        textColors[color],
        textSizes[size],
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading
