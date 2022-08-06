import { GetStaticProps } from 'next'

import React from 'react'
import ChilliListing from '~/components/chillies/ChillisListing'
import Layout from '~/components/layout/Layout'
import Head from 'next/head'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { shuffle } from '~/lib/dataHelpers'
import LinkTo from '~/components/global/LinkTo'
import Button from '~/components/global/Button'

interface Props {
  chillies: IChilli[]
}

export const getStaticProps: GetStaticProps = async () => {
  const chillies = await getChilliesFromAirtable()
  const todaysChillies = shuffle(chillies).slice(0, 8)
  return {
    props: { chillies: todaysChillies },
    revalidate: 86400,
  }
}

const HomePage: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <Head>
      <title>Pepper town: The guide to all varieties of chilli pepper</title>
    </Head>
    <section className="py-10">
      <h2 className="text-center mb-10 font-display text-3xl">Explore Cultivars</h2>
      <ChilliListing chillies={props.chillies} />
      <div className="text-center py-2">
        <Button variant="primary">
          <LinkTo href="/chillies">View All</LinkTo>
        </Button>
      </div>
    </section>
  </Layout>
)
export default HomePage
