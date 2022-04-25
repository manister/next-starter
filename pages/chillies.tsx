import { GetStaticProps } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'
import React from 'react'
import ChilliListing from '~/components/chillies/ChillisListing'

interface Props {
  chillies: IChilli[]
}

export const getStaticProps: GetStaticProps = async () => {
  const chillies = await getChilliesFromAirtable()
  return {
    props: { chillies },
  }
}

const ChilliPage: React.FunctionComponent<Props> = ChilliListing

export default ChilliPage
