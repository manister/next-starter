import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IChilliData, IChilliDatum } from '~/lib/types'

type Props = IChilliDatum

interface IParams extends ParsedUrlQuery {
  handle: string
}

const chilliData = require('../../_data/chilli-data.json') as IChilliData

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
    props: foundChilli ? foundChilli : {},
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({ handle, content, scoville, thumbnail, title }) => {
  return (
    <>
      {handle}: <ReactMarkdown>{content}</ReactMarkdown>
      {scoville}
      {thumbnail}
      {title}
    </>
  )
}

export default ChilliPage
