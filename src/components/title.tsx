import { Typography } from '@mui/material'

interface Props {
  text: string
  textAlign: 'left' | 'center' | 'right'
}

const Title = ({ text, textAlign }: Props) => {
  return (
    <Typography
      variant="h4"
      component="h3"
      sx={{
        fontWeight: '700',
        textAlign: textAlign,
      }}
    >
      {text}
    </Typography>
  )
}

export default Title
