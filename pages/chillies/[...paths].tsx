import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import ChilliCard from '~/components/chillies/ChilliCard'
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
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
   )

  try {
    if (typeof paths !== 'undefined' && paths.length > 1) {
      const filterFormula = routeArrayToFilter(paths)
      const data = await getChilliesFromAirtable({ filterFormula })
      chillies = data
    }
  } catch (e) {
    console.log(e)
  }
  if (!chillies || chillies.length < 1) {
    res.statusCode = 404
  }
  return {
    props: {
      chillies,
    },
    notFound: !chillies || chillies.length < 1,
  }
}

const ChilliPage: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()

  const { query } = router
  const { paths } = query

  return (
    <>
      <>
        {props.chillies.map((chilli) => (
          <React.Fragment key={chilli.handle}>
            <ChilliCard {...chilli} />
          </React.Fragment>
        ))}
      </>
    </>
  )
}

export default ChilliPage
