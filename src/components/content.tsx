import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
// icons
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined'
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'
import WifiPasswordIcon from '@mui/icons-material/WifiPassword'
// components
import Paragraph from './paragraph'
import Title from './title'

const Content = () => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        py: 10,
        px: 2,
      }}
    >
      <Grid item xs={12} sm={12} md={5} component="section">
        <Title text={'What we are offering?'} textAlign="left" />

        <Typography
          variant="h6"
          component="h4"
          sx={{
            fontWeight: '400',
            paddingTop: 1,
          }}
        >
          Property facilities
        </Typography>

        <Paragraph
          text={
            ' We have more 5000 reviews\
                    and our customers trust on out quality\
                    product and trust own our product.'
          }
          maxWidth={'75%'}
          mx="0"
          textAlign="left"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          square={true}
          sx={{
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <CardContent>
            <IconButton>
              <SportsGymnasticsIcon fontSize="large" color="secondary" />
            </IconButton>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              gym
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          square={true}
          sx={{
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <CardContent>
            <IconButton>
              <LocalParkingIcon fontSize="large" color="secondary" />
            </IconButton>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              parking
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={2}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Card
          square={true}
          sx={{
            boxShadow: 'none',
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <CardContent>
            <ArrowCircleRightRoundedIcon fontSize="large" color="secondary" />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          square={true}
          sx={{
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <CardContent>
            <IconButton>
              <FastfoodOutlinedIcon fontSize="large" color="secondary" />
            </IconButton>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              local dining
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          square={true}
          sx={{
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <CardContent>
            <IconButton>
              <PoolOutlinedIcon fontSize="large" color="secondary" />
            </IconButton>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              swimming pool
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          square={true}
          sx={{
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
          }}
        >
          <CardContent>
            <IconButton>
              <WifiPasswordIcon fontSize="large" color="secondary" />
            </IconButton>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              Internet
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Content