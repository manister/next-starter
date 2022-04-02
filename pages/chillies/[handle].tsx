import HTMLReactParser from 'html-react-parser'
import { GetStaticPaths, GetStaticProps } from 'next'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'
// import { IChilliAttributes, IChilliData } from '~/lib/types'
// import { importAll } from '~/lib/webpack-helpers'

type Props = IChilli

interface IParams extends ParsedUrlQuery {
  handle: string
}

// const chilliData = importAll(require.context('../../_content/chillies', false, /\.md$/)) as IChilliData

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getChilliesFromAirtable()
  const paths = data.map(({ handle }) => {
    return { params: { handle } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getChilliesFromAirtable()
  const { handle } = params as IParams
  const foundChilli = data.find((chilli) => chilli.handle === handle)
  return {
    props: foundChilli ?? {},
  }
}

const ChilliPage: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      {props.handle}
      {HTMLReactParser(props.desc)}
      {props.name}
      {props.scoville[0]} - {props.scoville[1]}
      {props.species[0].name}
    </>
  )
}

export default ChilliPage
