import * as React from 'react'
import { useRouter } from 'next/router'

import Radar from '../../components/radar'
import json from '../../data/sfa_easy.json'

const Post = () => {
  //Get the current path in company detail page
  const router = useRouter()
  const cleanPath = router.asPath.split('#')[0].split('?')[0].split('l/')[1]
  const company_name = cleanPath.toUpperCase()
  //Filter the json data to get the company detail
  const data = Object.values(json)
  const company = data.filter((item) => item.Ticker === company_name)[0]
  ///console.log(String(company_name))

  return (
    <>
      <p>{company_name}</p>
      <Radar company={company}></Radar>
    </>
  )
}

Post.getInitialProps = async (ctx) => {
  const res = await import('../../data/sfa_easy.json')
  const data = Object.values(res)
  return { props: { data } }
}

export default Post
