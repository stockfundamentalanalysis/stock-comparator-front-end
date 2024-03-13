import { Link } from '@mui/material'

interface Props {
  text: string
}

const FooterLink = ({ text }: Props) => {
  return (
    <Link
      href="#"
      component="a"
      sx={{
        fontSize: '0.9rem',
        fontWeight: '400',
        textDecoration: 'none',
        color: '#414141',
        textTransform: 'capitalize',
        '&:hover': {
          color: '#1c2859',
        },
      }}
    >
      {text}
    </Link>
  )
}

export default FooterLink
