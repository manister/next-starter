import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ChilliListing from '~/components/chillies/ChillisListing'
import FullChilliProfile from '~/components/chillies/FullChilliProfile'
import Layout from '~/components/layout/Layout'
import { getChilliesFromAirtable } from '~/lib/airtable'
import routeArrayToFilter from '~/lib/routeArrayToFilter'
import { IChilli } from '~/lib/types'

//We are either requesting a filter or a handle:
type requestType = 'filter' | 'handle' | null

type Props = {
  chillies: IChilli[]
  requestType: requestType
}
interface IParams extends ParsedUrlQuery {
  paths: string[] | undefined
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getChilliesFromAirtable()
  const paths = data.map(({ handle }) => {
    return { params: { paths: [handle] } }
  })
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { paths } = params as IParams
  let chillies: IChilli[] = []
  let requestType: requestType = null
  try {
    if (typeof paths !== 'undefined' && paths.length > 0) {
      //just a handle or a filter path requested:
      requestType = paths.length > 1 ? 'filter' : 'handle'
      const filterFormula = requestType === 'filter' ? routeArrayToFilter(paths) : `{handle}="${paths[0]}"`
      const data = await getChilliesFromAirtable({ filterFormula })
      chillies = data
    }
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      chillies,
      requestType,
    },
    notFound: requestType === 'handle' && (!chillies || chillies.length < 1),
    // revalidate: 10,
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({ chillies, requestType }) => {
  if (requestType === 'filter') {
    return (
      <Layout>
        <Head>
          <title>{chillies.length} Chillies Found</title>
        </Head>
        <p>{chillies.length} Chillies Found</p>
        <ChilliListing chillies={chillies} />
      </Layout>
    )
  } else if (requestType === 'handle' && chillies.length > 0) {
    return (
      <Layout>
        <Head>
          <title>{chillies[0] && chillies[0].name}</title>
        </Head>
        {chillies[0] && <FullChilliProfile {...chillies[0]} />}
      </Layout>
    )
  }
  return null
}

export default ChilliPage
