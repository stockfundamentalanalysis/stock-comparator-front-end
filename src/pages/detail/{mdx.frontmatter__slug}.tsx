import * as React from 'react'
//import type { HeadFC } from 'gatsby'

import json from '../../data/sfa_easy.json'
import Radar from '../../components/radar'

const data = Object.values(json)

const RadarPage = () => {
  return (
    <>
      <Radar />
    </>
  )
}
export default RadarPage
//export const Head: HeadFC = () => <title>Home Page</title>
