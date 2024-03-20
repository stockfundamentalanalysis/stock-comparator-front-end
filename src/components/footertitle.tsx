import { Typography } from '@mui/material'

interface Props {
  text: string
}

const FooterTitle = ({ text }: Props) => {
  return (
    <Typography
      variant="h6"
      component="h6"
      sx={{
        fontWeight: '700',
        textTransform: 'capitalize',
        pb: 1,
      }}
    >
      {text}
    </Typography>
  )
}

export default FooterTitle
