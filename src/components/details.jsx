import React from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import Title from './title'
import Paragraph from './paragraph'
import SendIcon from '@mui/icons-material/Send'

const Details = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
  }

  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <Title
        text={
          'Download our premium investment software'
          // '"Good investment opportunities aren’t going to come along too often and won’t last too long. So you’ve got to be ready to act." '
        }
        textAlign={'center'}
      />
      <Paragraph
        text={
          'If you are interested in our premium software version please contact us, we will let you know how to download it.'
        }
        maxWidth={'sm'}
        mx={0}
        textAlign={'center'}
      />

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          py: 2,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone Number"
          type="phone"
          id="phone"
          autoComplete="current-phone"
        />
        <Button
          endIcon={<SendIcon />}
          fullWidth
          size="medium"
          sx={{
            fontSize: '0.9rem',
            textTransform: 'capitalize',
            py: 2,
            px: 4,
            mt: 3,
            mb: 2,
            borderRadius: 0,
            color: 'white',
            backgroundColor: 'orange',
            '&&:hover': {
              backgroundColor: '#343a55',
            },
            '&&:focus': {
              backgroundColor: '#343a55',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Stack>
  )
}

export default Details
