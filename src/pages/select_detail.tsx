import * as React from 'react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import data from '../data/sfa_easy.json'
import Radar from '../components/radar'
import json from '../data/sfa_easy.json'
import Navbar from '@/components/navbar'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Chip,
} from '@mui/material'
//import '../styles/global.css'

const Post = () => {
  //Filter the json data to get the company detail
  const data = Object.values(json)
  const tickers = data.map((item) => item.Ticker)
  const sectors = Array.from(new Set(data.map((item) => item.Sector)))

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const [tickerName, settickerName] = React.useState<string[]>([])
  const [sectorName, setsectorName] = React.useState<string[]>([])

  const handleChangeTicker = (event: SelectChangeEvent<typeof tickerName>) => {
    const {
      target: { value },
    } = event
    settickerName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleChangeSector = (event: SelectChangeEvent<typeof sectorName>) => {
    const {
      target: { value },
    } = event
    setsectorName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const filteredTickers = useMemo(() => {
    if (sectorName.length > 0) {
      return data
        .filter((item) => sectorName.includes(item.Sector))
        .map((item) => item.Ticker)
    }
    return tickers
  }, [sectorName])

  return (
    <>
      <Navbar></Navbar>
      <Grid container spacing={3}>
        <Grid item md>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Company</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tickerName}
                onChange={handleChangeTicker}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filteredTickers.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Sector</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={sectorName}
                onChange={handleChangeSector}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {sectors.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

/* Post.getInitialProps = async () => {
  const res = await import('../../data/sfa_easy.json')
  const data = Object.values(res)
  return { props: { data } }
}
 */
export default Post
function onlyUnique(
  value: string,
  index: number,
  array: string[]
): value is string {
  throw new Error('Function not implemented.')
}
