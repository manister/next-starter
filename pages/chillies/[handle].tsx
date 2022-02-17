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
}

interface IParams extends ParsedUrlQuery {
  handle: string
}

const ChilliPage: React.FunctionComponent<Props> = ({ handle, content }) => {
  return (
    <>
      {handle}: <ReactMarkdown>{content}</ReactMarkdown>
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { handle } = params as IParams
  const data = fs.readFileSync(`${chilliesPath}/${handle}.md`, 'utf-8')
  const { content } = matter(data)
  return {
    props: { handle, content },
  }
}

export default ChilliPage
