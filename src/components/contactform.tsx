import { ValidationError, useForm } from '@formspree/react'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, Stack, TextField } from '@mui/material'
import Paragraph from './paragraph'
import Title from './title'

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xjvnvvkp')

  if (state.succeeded) {
    return (
      <Stack
        //component="section"
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
            'Thanks for joining!'
            // '"Good investment opportunities aren’t going to come along too often and won’t last too long. So you’ve got to be ready to act." '
          }
          textAlign={'center'}
        />
        <Paragraph
          text={'We will contact you as soon as possible.'}
          maxWidth={'sm'}
          mx="0"
          textAlign={'center'}
        />
      </Stack>
    )
  }

  return (
    <Stack
      //component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
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
          mx="0"
          textAlign={'center'}
        />
        <TextField
          fullWidth
          id="email"
          type="email"
          name="email"
          label="Email Address"
          variant="outlined"
          margin="normal"
          error={state.errors?.getFieldErrors('email') != null}
          helperText={
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          }
        />
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          error={state.errors?.getFieldErrors('message') != null}
          helperText={
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          }
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
            borderColor: '#fff',
            color: 'rgb(0,0,0)',
            backgroundColor: 'rgb(130,130,130)',
            '&&:hover': {
              backgroundColor: 'rgb(165,165,165)',
            },
            '&&:focus': {
              backgroundColor: 'rgb(165,165,165)',
            },
          }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={state.submitting}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  )
}

export default ContactForm
