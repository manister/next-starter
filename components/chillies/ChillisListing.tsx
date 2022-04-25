import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IChilli } from '~/lib/types'
import ChilliCard from './ChilliCard'

type Props = {
  chillies: IChilli[]
}
const ChilliListing: React.FunctionComponent<Props> = (props) => {
  const { chillies } = props
  const router = useRouter()

  // const { query } = router
  // const { paths } = query

  const [filterPath, setFilterPath] = useState('')

  return (
    <>
      <input type="text" value={filterPath} onChange={(e) => setFilterPath(e.target.value)} />
      <button onClick={() => router.push(`/chillies/${filterPath}`)}>Set filter path</button>
      <>
        {chillies.map((chilli) => (
          <React.Fragment key={chilli.handle}>
            <ChilliCard {...chilli} />
          </React.Fragment>
        ))}
      </>
    </>
  )
}

export default ChilliListing
