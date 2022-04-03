import { GetServerSideProps } from 'next'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import ChilliCard from '~/components/chillies/ChilliCard'
import FullChilliProfile from '~/components/chillies/FullChilliProfile'
import { getChilliesFromAirtable } from '~/lib/airtable'
import routeArrayToFilter from '~/lib/routeArrayToFilter'
import { IChilli } from '~/lib/types'
// import { IChilliAttributes, IChilliData } from '~/lib/types'
// import { importAll } from '~/lib/webpack-helpers'

type Props = {
  chillies: IChilli[]
  view: 'single' | 'multi'
}

interface IParams extends ParsedUrlQuery {
  handle: string[] | undefined
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const { handle } = params as IParams
  let chillies: IChilli[] = []
  let view = 'single'
  try {
    if (typeof handle !== 'undefined' && handle.length === 1) {
      //we have a single handle, therefore this is a single chilli
      const data = await getChilliesFromAirtable({ filterFormula: `{handle}="${handle[0]}"` })
      chillies = data
    }
    if (typeof handle !== 'undefined' && handle.length > 2 && handle[0] === 'filtered') {
      view = 'multi'
      const filterFormula = routeArrayToFilter(handle.slice(1))
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
      view,
    },
    notFound: !chillies || chillies.length < 1,
  }
}

const ChilliPage: React.FunctionComponent<Props> = (props) => {
  if (props.view === 'multi') {
    const chillies = props.chillies
    return (
      <>
        {chillies.map((chilli) => (
          <React.Fragment key={chilli.handle}>
            <ChilliCard {...chilli} />
          </React.Fragment>
        ))}
      </>
    )
  } else {
    const chilli = props.chillies[0]
    return <FullChilliProfile {...chilli} />
  }
}

export default ChilliPage
