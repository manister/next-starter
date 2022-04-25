import { GetServerSideProps } from 'next'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ChilliListing from '~/components/chillies/ChillisListing'
import { getChilliesFromAirtable } from '~/lib/airtable'
import routeArrayToFilter from '~/lib/routeArrayToFilter'
import { IChilli } from '~/lib/types'
// import { IChilliAttributes, IChilliData } from '~/lib/types'
// import { importAll } from '~/lib/webpack-helpers'

type Props = {
  chillies: IChilli[]
}

interface IParams extends ParsedUrlQuery {
  paths: string[] | undefined
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const { paths } = params as IParams
  let chillies: IChilli[] = []
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=360')
  try {
    if (typeof paths !== 'undefined' && paths.length > 1) {
      const filterFormula = routeArrayToFilter(paths)
      const data = await getChilliesFromAirtable({ filterFormula })
      chillies = data
    }
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      chillies,
    },
  }
}

const ChilliPage: React.FunctionComponent<Props> = ChilliListing

export default ChilliPage
