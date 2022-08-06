import { useState } from 'react'
import ChilliCard from './ChilliCard'
import ChilliFilters from './ChilliFilters'

type Props = {
  chillies: IChilli[]
  filters?: IFilter[]
}

const ChilliListing = (props: Props): JSX.Element => {
  const { chillies, filters } = props

  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <>
      {filters && (
        <button type="button" onClick={() => setFiltersOpen(!filtersOpen)}>
          Filters
        </button>
      )}

      {filters && <ChilliFilters setOpen={(val) => setFiltersOpen(val)} open={filtersOpen} filters={filters} />}
      <ul className="flex flex-wrap">
        {chillies.map((chilli) => (
          <li className="xs:w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 pl-2 pr-2" key={chilli.handle}>
            <ChilliCard {...chilli} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChilliListing
