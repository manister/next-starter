import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { filterArrayToPathArray } from '~/lib/filters'
import { IChilli, IFilter, IFilterValue } from '~/lib/types'

import ChilliCard from './ChilliCard'

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
      {currentFilters.map((filter) => {
        if (filter.type === 'list') {
          return (
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
                            const option = filter.values[optionIndex] as IFilterValue
                            option.active = e.target.checked
                          }
                          setCurrentFilters(newFilters)
                        }}
                        type={'checkbox'}
                        checked={option.active}
                      />
                      <label>{option.displayValue}</label>
                    </>
                  )
                })}
              </ul>
            </div>
          )
        }
        return null
      })}
      <button onClick={() => router.push(filterArrayToPathArray(currentFilters).flat().join('/'))}>Apply</button>
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
