import * as React from 'react'
//import { Link } from 'gatsby'
import { useMemo } from 'react'
//import type { HeadFC } from 'gatsby'
// import data from '../data/sfa_easy.json'
import Header from '../components/header'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import GetStarted from '../components/getstarted'
import GetInTouch from '../components/getintouch'
//import '../styles/global.css'

const IndexPage = () => {
  return (
    <>
      <NavBar />
      <Header />
      <GetStarted />
      <GetInTouch />
      <Footer />
    </>
  )
}
export default IndexPage

//export const Head: HeadFC = () => <title>Home Page</title>
