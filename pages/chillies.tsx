import { GetStaticProps } from 'next'
import { getChilliesFromAirtable } from '~/lib/airtable'
import { IChilli } from '~/lib/types'
import React from 'react'
import ChilliCard from '~/components/chillies/ChilliCard'

interface Props {
  chillies: IChilli[]
}

export const getStaticProps: GetStaticProps = async () => {
  const chillies = await getChilliesFromAirtable()
  return {
    props: { chillies },
  }
}

const ChilliPage: React.FunctionComponent<Props> = ({ chillies }) => {
  return (
    <>
      {chillies.map((chilli) => (
        <React.Fragment key={chilli.handle}>
          <ChilliCard {...chilli} />
        </React.Fragment>
      ))}
    </>
  )
}

export default ChilliPage
