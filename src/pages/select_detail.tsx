import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo } from 'react'
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
  Autocomplete,
  TextField,
} from '@mui/material'
import Link from 'next/link'

interface TickerDictionary {
  [key: string]: string
}
const Post = () => {
  const [simpleAnalysis, setSimpleAnalysis] = useState([])
  const [tickerDictionary, setTickerDictionary] = useState<TickerDictionary>({}) // Provide an initial value with the correct type

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const dataResponse = await fetch('/api/getSectorsAndCompanies')
        if (!dataResponse.ok) {
          throw new Error('Failed to fetch company data')
        }
        const companyData = await dataResponse.json()
        setSimpleAnalysis(companyData)

        // Build a ticker dictionary for later use
        const dictionary: TickerDictionary = {}
        companyData.forEach((item: any) => {
          dictionary[item.CompanyName] = item.Ticker
        })
        setTickerDictionary(dictionary)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchCompanyData()
  }, [])

  const data = Object.values(simpleAnalysis)

  // Filter the json data to get the company detail
  let companies = data.map((item) => item.CompanyName)
  let sectors = data.map((item) => item.Sector)
  const tickers = data.map((item) => item.Ticker)

  // Sort companies alphabetically
  companies = companies.sort((a, b) => a.localeCompare(b))

  // Sort sectors alphabetically
  // Sort sectors alphabetically
  sectors = Array.from(new Set(sectors)).sort((a, b) => {
    // Provide default values for null or undefined
    const sectorA = a || ''
    const sectorB = b || ''
    return sectorA.localeCompare(sectorB)
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

  const handleChangeCompany = (
    event: React.ChangeEvent<any>,
    newValue: string | string[]
  ) => {
    setCompanyName(
      // On autofill, we get a stringified value.
      typeof newValue === 'string' ? newValue.split(',') : newValue
    )
  }

  const handleChangeTicker = (event: SelectChangeEvent<typeof tickerName>) => {
    const {
      target: { value },
    } = event
    setTickerName(
      // On autofill, we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleChangeSector = (event: SelectChangeEvent<typeof sectorName>) => {
    const {
      target: { value },
    } = event
    setSectorName(
      // On autofill, we get a stringified value.
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
  }, [data, sectorName])

  const filteredCompanies = useMemo(() => {
    if (sectorName.length > 0) {
      return data
        .filter((item) => sectorName.includes(item.Sector))
        .map((item) => item.CompanyName)
    }
    return companies
  }, [data, sectorName])

  const companyDetailLink = () => {
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
          <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '50px' }}>
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
              <Autocomplete
                id="demo-multiple-chip"
                options={filteredCompanies}
                onChange={handleChangeCompany}
                renderInput={(params) => (
                  <TextField {...params} label="Company" />
                )}
              />
            </FormControl>
            <Button
              component={Link}
              href={companyDetailLink()}
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
