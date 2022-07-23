import { GetStaticProps } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli, IFilter } from '~/lib/types'
import React from 'react'
import ChilliListing from '~/components/chillies/ChillisListing'
import Layout from '~/components/layout/Layout'
import Head from 'next/head'
import { getFilterSchema, pathArrayToFilterArray } from '~/lib/filters'

interface Props {
  chillies: IChilli[]
  filters: IFilter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const chillies = await getChilliesFromAirtable()
  const schema = getFilterSchema()
  const filters = pathArrayToFilterArray([], schema)

  return {
    props: { chillies, filters },
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({chillies, filters}) => (
  <Layout>
    <Head>
      <title>Chillies</title>
    </Head>
    <ChilliListing chillies={chillies} filters={filters} />
  </Layout>
)

export default ChilliPage
