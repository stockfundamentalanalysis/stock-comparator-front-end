//import { Link } from 'gatsby'
//import type { HeadFC } from 'gatsby'
// import data from '../data/sfa_easy.json'
import BigImage from '../components/bigimage'
import GetInTouch from '../components/getintouch'
import GetStarted from '../components/getstarted'
import Header from '../components/header'
import NavBar from '../components/navbar'
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
