import HTMLReactParser from 'html-react-parser'
import { GetStaticPaths, GetStaticProps } from 'next'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { IChilliAttributes, IChilliData } from '~/lib/types'
import { importAll } from '~/lib/webpack-helpers'

interface Props extends IChilliAttributes {
  handle: string
  html: string
}

interface IParams extends ParsedUrlQuery {
  handle: string
}

const chilliData = importAll(require.context('../../_content/chillies', false, /\.md$/)) as IChilliData

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(chilliData).map((handle) => {
    return { params: { handle } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params as IParams
  const foundChilli = chilliData[handle]
  return {
    props: foundChilli ? { ...foundChilli.attributes, handle, html: foundChilli.html } : {},
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({ scovilleMin, scovilleMax, species, title, handle, html }) => {
  return (
    <>
      {handle}
      {HTMLReactParser(html)}
      {scovilleMin}
      {scovilleMax}
      {species}
      {title}
    </>
  )
}

export default ChilliPage
