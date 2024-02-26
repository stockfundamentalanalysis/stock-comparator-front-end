import React from 'react'
import { Box, Grid, styled, Typography } from '@mui/material'
import imgDetail from '../images/working_principle.png'
import Image from 'next/image'

const BigImage = () => {
  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })

  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  })

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 8,
        minHeight: 100, // Ensure minimum height for visual coherence
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Image
        src={imgDetail}
        alt=""
        layout="responsive"
        width={400}
        height={300}
      />
    </Box>
  )
}

export default BigImage
