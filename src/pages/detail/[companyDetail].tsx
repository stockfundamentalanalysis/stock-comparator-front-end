import * as React from 'react'
import { useRouter } from 'next/router'

import Radar from '../../components/radar'
import json from '../../data/sfa_easy.json'

const Post = () => {
  //Get the current path in company detail page
  const { asPath } = useRouter()
  const cleanPath = asPath.split('#')[0].split('?')[0].split('l/')[1]
  const company_name = cleanPath.toUpperCase()
  //Filter the json data to get the company detail
  const data = Object.values(json)
  const company = data.filter((item) => item.Ticker === company_name)[0]
  console.log(company)
  console.log(String(company_name))

  return (
    <>
      <p>{company_name}</p>
      <Radar company={company}></Radar>
    </>
  )
}

export default Post

/* import Head from 'next/head'
import styles from '@styles/Product.module.scss'

export default function Product({ product }) {
  return (
    <Head>
      <title>{product.name}</title>
      <meta
        name="description"
        content={`Find ${product.name} at Space Jelly Gear`}
      />
    </Head>
  )
} */
/* 
export async function getStaticProps({ params }) {
  const data = await client.query({
    query: gql`
      query PageProduct($slug: String) {
        product(where: { slug: $slug }) {
          id
          image
          name
          price
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    },
  })

  const product = data.data.product

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1.graphcms.com/v2/ckzvrda212z1d01za7m8y55rc/master',
    cache: new InMemoryCache(),
  })

  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          name
          price
          slug
          image
        }
      }
    `,
  })

  const paths = data.data.products.map((product) => {
    return {
      params: {
        productSlug: product.slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
 */
