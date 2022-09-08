import { GetStaticProps } from 'next'

import React from 'react'
import Layout from '~/components/layout/Layout'
import Head from 'next/head'
// import LinkTo from '~/components/global/LinkTo'
import matter from 'gray-matter'

import fs from 'fs'

import Container from '~/components/layout/Container'
import ReactMarkdown from 'react-markdown'
import path from 'path'

interface Props {
  content: string
  title: string
  description: string
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const fileContent = fs.readFileSync(path.join(process.cwd(), 'content/index.md'))
  const { data, content } = matter(fileContent)
  return {
    props: {
      content,
      title: data.title,
      description: data.description,
    },
    revalidate: false,
  }
}

const HomePage = (props: Props): JSX.Element => {
  const { content, description, title } = props
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <section className="py-10">
        <Container>
          <section className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </section>
        </Container>
      </section>
    </Layout>
  )
}
export default HomePage
