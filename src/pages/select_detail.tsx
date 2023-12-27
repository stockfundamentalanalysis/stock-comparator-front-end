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
  Button,
} from '@mui/material'
import Link from 'next/link'
//import '../styles/global.css'

/// NEEDS TO BE CORRECTED TO REMOVE THE JSON

const Post = () => {
  //Filter the json data to get the company detail
  const jsonData = Object.values(json)
  const tickers = jsonData.map((item) => item.Ticker)
  let companies = jsonData.map((item) => item.CompanyName)
  let sectors = Array.from(new Set(jsonData.map((item) => item.Sector)))
  const tickerDictionary: { [key: string]: string } = {}
  jsonData.forEach((item) => {
    tickerDictionary[item.CompanyName] = item.Ticker
  })

  // Sort companies alphabetically
  companies = companies.sort((a, b) => a.localeCompare(b))

  // Sort sectors alphabetically
  sectors = sectors.sort((a, b) => a.localeCompare(b))

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
  const [companyName, setCompanyName] = React.useState<string[]>([])

  const handleChangeCompany = (
    event: SelectChangeEvent<typeof companyName>
  ) => {
    const {
      target: { value },
    } = event
    setCompanyName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

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
      return jsonData
        .filter((item) => sectorName.includes(item.Sector))
        .map((item) => item.Ticker)
    }
    return tickers
  }, [sectorName])

  const filteredCompanies = useMemo(() => {
    if (sectorName.length > 0) {
      return jsonData
        .filter((item) => sectorName.includes(item.Sector))
        .map((item) => item.CompanyName)
    }
    return companies
  }, [sectorName])

  const companyDetailLink = (tickerDictionary: { [key: string]: string }) => {
    const company = companyName[0]
    if (company !== undefined) {
      return `/detail/${tickerDictionary[company]}`
    } else {
      return `/select_detail/`
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <Grid container spacing={3}>
        <Grid item md>
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
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Company</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={companyName}
                onChange={handleChangeCompany}
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
                {filteredCompanies.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              component={Link}
              href={companyDetailLink(tickerDictionary)}
              variant="contained"
              size="medium"
              sx={{
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                py: 2,
                px: 4,
                mt: 3,
                mb: 2,
                borderRadius: 0,
                color: '#fff',
                backgroundColor: 'rgb(130,130,130)',
                '&&:hover': {
                  backgroundColor: 'rgb(165,165,165)',
                },
                '&&:focus': {
                  backgroundColor: 'rgb(165,165,165)',
                },
              }}
            >
              Details
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Post
function onlyUnique(
  value: string,
  index: number,
  array: string[]
): value is string {
  throw new Error('Function not implemented.')
}
