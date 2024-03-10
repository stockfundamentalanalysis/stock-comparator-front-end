import * as React from 'react'
//import { Link } from 'gatsby'
import { useMemo } from 'react'
//import type { HeadFC } from 'gatsby'
// import data from '../data/sfa_easy.json'
import Header from '../components/header'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import GetStarted from '../components/getstarted'
import BigImage from '../components/bigimage'
import GetInTouch from '../components/getintouch'
import ExplanationFiveGrid from '../components/fivegrid'
import TimeLineComponent from '../components/timelinedescription'
//import '../styles/global.css'

const IndexPage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <GetStarted />
      <BigImage />
      <GetInTouch />
    </>
  )
}
export default IndexPage

//export const Head: HeadFC = () => <title>Home Page</title>
