import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IChilli, IFilter, IFilterValue } from '~/lib/types'

import ChilliCard from './ChilliCard'

const createPathFromFilters = (filters: IFilter[]): string => {
  return filters.reduce((acca, filter) => {
    const valueString = filter.values.flatMap((value) => (value.selected ? value.value : [])).join('+')
    if (!valueString) return acca
    return `${acca}/${filter.name}/${valueString}`
  }, '/chillies')
}

type Props = {
  chillies: IChilli[]
  filters: IFilter[]
}

const ChilliListing: React.FunctionComponent<Props> = (props) => {
  const { chillies, filters } = props
  const router = useRouter()

  const [currentFilters, setCurrentFilters] = useState(filters)

  // useEffect(() => {
  //   setCurrentFilters(filters)
  // }, [filters])

  return (
    <>
      {currentFilters.map((filter) => (
        <div key={filter.name}>
          <h4>{filter.displayName}</h4>
          <ul>
            {filter.values.map((option, optionIndex) => {
              return (
                <>
                  <input
                    onChange={(e) => {
                      const newFilters = [...currentFilters]

                      if (filter?.values?.[optionIndex]) {
                        ;(filter.values[optionIndex] as IFilterValue).selected = e.target.checked
                      }
                      setCurrentFilters(newFilters)
                    }}
                    type={'checkbox'}
                    checked={option.selected}
                  />
                  <label>{option.displayValue}</label>
                </>
              )
            })}
          </ul>
        </div>
      ))}
      <button onClick={() => router.push(createPathFromFilters(currentFilters))}>Apply</button>
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
