import HTMLReactParser from 'html-react-parser'
import { GetServerSideProps } from 'next'

import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'
// import { IChilliAttributes, IChilliData } from '~/lib/types'
// import { importAll } from '~/lib/webpack-helpers'

type Props = IChilli

interface IParams extends ParsedUrlQuery {
  handle: string[] | undefined
}

// const chilliData = importAll(require.context('../../_content/chillies', false, /\.md$/)) as IChilliData

// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await getChilliesFromAirtable()
//   const paths = data.map(({ handle }) => {
//     return { params: { handle } }
//   })
//   return { paths, fallback: false }
// }

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const { handle } = params as IParams
  let chilli: IChilli | null = null
  console.log(handle)
  try {
    if (typeof handle !== 'undefined' && handle.length === 1) {
      //we have a single handle, therefore this is a single chilli
      const data = await getChilliesFromAirtable({ filterFormula: `{handle}="${handle[0]}"` })
      chilli = data[0]
    }
    if (typeof handle !== 'undefined' && handle.length === 3 && handle[0] === 'filtered') {
      console.log(handle)
      const key = handle[1]
      const val = handle[2]
      const filterFormula = `FIND("${val}", {${key}/handle})`
      const data = await getChilliesFromAirtable({ filterFormula })
      chilli = data[0]
    }
  } catch (e) {
    console.log(e)
  }
  if (!chilli) {
    res.statusCode = 404
  }
  return {
    props: chilli ?? {},
    notFound: chilli ? false : true,
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
