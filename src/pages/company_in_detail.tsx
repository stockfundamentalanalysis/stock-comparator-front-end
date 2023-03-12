import * as React from 'react'
import { useMemo } from 'react'
import data from '../data/sfa_easy.json'
import Radar from '../components/radar'
import json from '../data/sfa_easy.json'
//import '../styles/global.css'

const RadarPage = () => {
  const data = Object.values(json)
  const company = data.filter((item) => item.Ticker === 'AAPL')[0]
  return (
    <>
      <Radar company={company}></Radar>
    </>
  )
}
export default RadarPage
