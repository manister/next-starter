import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ChilliListing from '~/components/chillies/ChillisListing'
import FullChilliProfile from '~/components/chillies/FullChilliProfile'
import Layout from '~/components/layout/Layout'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { chunk } from '~/lib/data-helpers'
import { filterArrayToAirtableFilter, getFilterSchema, pathArrayToFilterArray } from '~/lib/filters'

//We are either requesting a filter or a handle:
type IRequestType = 'listing' | 'handle' | null

type Props = {
  chillies: IChilli[]
  requestType: IRequestType
  filters: IFilter[]
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
  let requestType: IRequestType = null

  const schema = getFilterSchema()
  let filters = pathArrayToFilterArray([], schema)

  try {
    if (typeof paths === 'undefined' || paths.length == 0) {
      //no paths, load all chillies
      requestType = 'listing'
      chillies = await getChilliesFromAirtable()
    } else {
      //do we have a sort by?
      const last = paths[paths.length - 1]
      const hasSort = last && last?.includes('sort:')
      let sort: { direction: 'asc' | 'desc'; field: string } | null = null

      if (hasSort) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_s, field, dir] = last.split(':')
        if (field && dir) {
          const direction: 'asc' | 'desc' = dir === 'asc' || dir === 'desc' ? dir : 'asc'
          sort = { field, direction }
        }
      }
      const filterPaths = chunk(hasSort ? paths.slice(0, -1) : paths)

      filters = pathArrayToFilterArray(filterPaths, schema)

      //just a handle or a filter path requested:
      requestType = hasSort || filterPaths.length > 0 ? 'listing' : 'handle'

      const filterFormula = requestType === 'listing' ? filterArrayToAirtableFilter(filters) : `{handle}="${paths[0]}"`
      const data = await getChilliesFromAirtable({ filterFormula, ...(sort ? { sort } : {}) })
      // console.log({ data, filterFormula })
      chillies = data
    }
  } catch (e) {
    console.error({ error: e })
  }

  // console.log({requestType})

  return {
    props: {
      chillies,
      requestType,
      filters,
    },
    notFound: requestType === 'handle' && (!chillies || chillies.length < 1),
    revalidate: 10,
  }
}

const ChilliPage = ({ chillies, requestType, filters }: Props): JSX.Element => {
  if (requestType === 'listing') {
    return (
      <Layout>
        <Head>
          <title>
            <>{chillies.length} Chillies Found</>
          </title>
        </Head>
        <p>{chillies.length} Chillies Found</p>
        <ChilliListing filters={filters} chillies={chillies} />
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
  return <></>
}

export default ChilliPage
