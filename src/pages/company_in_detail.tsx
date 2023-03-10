import * as React from 'react'
import { Link } from 'gatsby'
import { useMemo } from 'react'
import type { HeadFC } from 'gatsby'
// import data from '../data/sfa_easy.json'
import { useTable } from 'react-table'
import Radar from '../components/radar'
import '../styles/global.css'

const RadarPage = () => {
  return (
    <>
      <Radar />
    </>
  )
}
export default RadarPage

export const Head: HeadFC = () => <title>Home Page</title>
