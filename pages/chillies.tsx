import { GetStaticProps } from 'next'
import Head from 'next/head'

import React from 'react'

import ChilliListing from '~/components/chillies/ChillisListing'
import Layout from '~/components/layout/Layout'
import { getChilliPageDataFromPaths } from '~/lib/page-data/chillies'

type Props = IChilliPageData

export const getStaticProps: GetStaticProps = async () => {
  const { chillies, filters } = await getChilliPageDataFromPaths([])
  return {
    props: {
      chillies,
      filters,
    },
    revalidate: false,
  }
}

const ChilliPage = ({ chillies, filters }: Props): JSX.Element => {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Chillies`}</title>
        </Head>
        <ChilliListing filters={filters} chillies={chillies} />
      </Layout>
    </>
  )
}

export default ChilliPage
