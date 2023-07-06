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
const Post = () => {
  // Filter the json data to get the company detail
  const jsonData = Object.values(json)
  const tickers = jsonData.map((item) => item.Ticker)
  const companies = jsonData.map((item) => item.CompanyName)
  const sectors = Array.from(new Set(jsonData.map((item) => item.Sector)))
  const tickerDictionary: { [key: string]: string } = {}
  jsonData.forEach((item) => {
    tickerDictionary[item.CompanyName] = item.Ticker
  })

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

  const [tickerName, setTickerName] = React.useState<string[]>([])
  const [sectorName, setSectorName] = React.useState<string[]>([])
  const [companyName, setCompanyName] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([])

  const handleChangeTicker = (event: SelectChangeEvent<typeof tickerName>) => {
    const {
      target: { value },
    } = event
    setTickerName(typeof value === 'string' ? value.split(',') : value)
    setCompanyName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleChangeSector = (event: SelectChangeEvent<typeof sectorName>) => {
    const {
      target: { value },
    } = event
    setSectorName(typeof value === 'string' ? value.split(',') : value)
  }

  const handleChangeSearchQuery = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
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

  const companyDetailLink = (
    companies: string[],
    tickerDictionary: { [key: string]: string }
  ) => {
    const company = companies[0]
    if (company !== undefined) {
      return `/detail/${tickerDictionary[company]}`
    } else {
      return `/select_detail/`
    }
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        <Grid item md>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Sector</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
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
                onChange={handleChangeTicker}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Chip"
                    onChange={handleChangeSearchQuery}
                    value={searchQuery}
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filteredCompanies
                  .filter((name) =>
                    name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              component={Link}
              href={companyDetailLink(companies, tickerDictionary)}
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
                backgroundColor: 'orange',
                '&&:hover': {
                  backgroundColor: '#343a55',
                },
                '&&:focus': {
                  backgroundColor: '#343a55',
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
