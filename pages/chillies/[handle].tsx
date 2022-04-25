import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import FullChilliProfile from '~/components/chillies/FullChilliProfile'
import Layout from '~/components/layout/Layout'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'

type Props = {
  chilli: IChilli
}

interface IParams extends ParsedUrlQuery {
  handle: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getChilliesFromAirtable()
  const paths = data.map(({ handle }) => {
    return { params: { handle } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params as IParams
  let chillies: IChilli[] = []

  try {
    //we have a single handle, therefore this is a single chilli
    const data = await getChilliesFromAirtable({ filterFormula: `{handle}="${handle}"` })
    chillies = data
  } catch (e) {
    console.log(e)
  }
  return {
    props: {
      chilli: chillies[0],
    },
    notFound: !chillies || chillies.length < 1,
  }
}

const ChilliPage: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <Head>
      <title>{props.chilli.name}</title>
    </Head>
    <FullChilliProfile {...props.chilli} />
  </Layout>
)

export default ChilliPage
