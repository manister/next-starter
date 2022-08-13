import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ChilliListing from '~/components/chillies/ChillisListing'
import FullChilliProfile from '~/components/chillies/FullChilliProfile'
import Layout from '~/components/layout/Layout'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { getChilliPageDataFromPaths } from '~/lib/page-data/chillies'

type Props = IChilliPageData

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
  const { chillies, requestType, filters } = await getChilliPageDataFromPaths(paths ?? [])
  return {
    props: {
      chillies,
      requestType,
      filters,
    },
    notFound: requestType === 'handle',
    // notFound: requestType === 'handle' && (!chillies || chillies.length < 1),
    revalidate: false,
  }
}

const ChilliPage = ({ chillies, requestType, filters }: Props): JSX.Element => {
  if (requestType === 'listing') {
    return (
      <Layout>
        <Head>
          <title>{`${chillies.length} Peppers Found`}</title>
        </Head>
        <ChilliListing filters={filters} chillies={chillies} />
      </Layout>
    )
  } else if (requestType === 'handle' && chillies.length > 0) {
    return (
      <Layout>
        <Head>
          <title>{chillies[0] ? chillies[0].name : ''}</title>
        </Head>
        {chillies[0] && <FullChilliProfile {...chillies[0]} />}
      </Layout>
    )
  }
  return <></>
}

export default ChilliPage
