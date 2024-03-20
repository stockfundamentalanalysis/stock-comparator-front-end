import { Typography } from '@mui/material'

interface Props {
  text: string
  maxWidth?: string
  mx?: string
  textAlign?: 'left' | 'center' | 'right'
}

const Paragraph = ({ text, maxWidth, mx, textAlign }: Props) => {
  return (
    <Typography
      sx={{
        maxWidth: maxWidth,
        mx: mx,
        textAlign: textAlign,
        py: 3,
        color: '#7b7b7b',
      }}
    >
      {text}
    </Typography>
  )
}

export default Paragraph
