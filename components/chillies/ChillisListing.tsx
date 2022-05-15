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

  const [filterPath, setFilterPath] = useState('')

  return (
    <>
      <input type="text" value={filterPath} onChange={(e) => setFilterPath(e.target.value)} />
      <button onClick={() => router.push(`/chillies/${filterPath}`)}>Set filter path</button>
      <ul className="flex flex-wrap">
        {chillies.map((chilli) => (
          <li className="xs:w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 mb-16 pl-8 pr-8" key={chilli.handle}>
            <ChilliCard {...chilli} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChilliListing
