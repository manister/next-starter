import { GetStaticProps } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'
import React from 'react'
import ChilliListing from '~/components/chillies/ChillisListing'
import Layout from '~/components/layout/Layout'
import Head from 'next/head'

interface Props {
  chillies: IChilli[]
}

export const getStaticProps: GetStaticProps = async () => {
  const chillies = await getChilliesFromAirtable()
  return {
    props: { chillies },
  }
}

const ChilliPage: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <Head>
      <title>Chillies</title>
    </Head>
    <ChilliListing chillies={props.chillies} />
  </Layout>
)

export default ChilliPage
