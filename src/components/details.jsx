import React from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import Title from './title'
import Paragraph from './paragraph'
import { Send } from '@mui/icons-material'
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
      <Title text={'Interesting to buy property'} textAlign={'center'} />
      <Paragraph
        text={
          'If you are interested to buy the property contact us we will call you. \
                Shortly to fulfill you requirements and property.'
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
          variant="contained"
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
            color: 'black',
            backgroundColor: '#14192d',
            '&&:hover': {
              backgroundColor: 'orange',
            },
            '&&:focus': {
              backgroundColor: 'orange',
            },
          }}
        >
          send
        </Button>
      </Box>
    </Stack>
  )
}

export default Details
