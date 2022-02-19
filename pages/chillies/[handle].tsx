import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import matter from 'gray-matter'
import React from 'react'

import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'

const chilliesPath = path.join(process.cwd(), '_content/chillies')

interface Props {
  handle: string
  content: string
  data: Record<string, unknown>
}

interface IParams extends ParsedUrlQuery {
  handle: string
}

const ChilliPage: React.FunctionComponent<Props> = ({ handle, content, data }) => {
  return (
    <>
      {handle}: <ReactMarkdown>{content}</ReactMarkdown>
      {data.scoville}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs.readdirSync(chilliesPath).map((file) => {
    const handle = file.replace('.md', '')
    return { params: { handle } }
  })
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { handle } = params as IParams
  const raw = fs.readFileSync(`${chilliesPath}/${handle}.md`, 'utf-8')
  const { data, content } = matter(raw)
  return {
    props: { handle, content, data },
  }
}

export default ChilliPage
