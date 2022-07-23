import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { filterArrayToPathArray, updateListFilter, updateRangeFilter } from '~/lib/filters'
import { IChilli, IFilter } from '~/lib/types'

import ChilliCard from './ChilliCard'

type Props = {
  chillies: IChilli[]
  filters: IFilter[]
}

const ChilliListing: React.FunctionComponent<Props> = (props) => {
  const { chillies, filters } = props
  const router = useRouter()

  const [currentFilters, setCurrentFilters] = useState(filters)

  return (
    <>
      {currentFilters.map((filter, index) => {
        if (filter.type === 'list') {
          return (
            <div key={filter.name}>
              <h4>{filter.displayName}</h4>
              <ul>
                {filter.values.map((option, optionIndex) => {
                  return (
                    <li key={option.value}>
                      <input
                        onChange={(e) => {
                          const newFilters = updateListFilter(currentFilters, index, optionIndex, e.target.checked)
                          setCurrentFilters(newFilters)
                        }}
                        type={'checkbox'}
                        checked={option.active}
                      />
                      <label>{option.displayValue}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
        if (filter.type === 'range') {
          return (
            <>
              <Slider
                range
                allowCross={false}
                min={filter.domain[0]}
                max={filter.domain[1]}
                value={filter.active}
                onChange={(val) => {
                  const newFilters = updateRangeFilter(currentFilters, index, val as [number, number])
                  setCurrentFilters(newFilters)
                }}
              />
              <input
                type="number"
                value={filter.active[0]}
                onChange={(e) => {
                  const newFilters = updateRangeFilter(currentFilters, index, [parseFloat(e.target.value), null])
                  setCurrentFilters(newFilters)
                }}
              />
              <input
                type="number"
                value={filter.active[1]}
                onChange={(e) => {
                  const newFilters = updateRangeFilter(currentFilters, index, [null, parseFloat(e.target.value)])
                  setCurrentFilters(newFilters)
                }}
              />
            </>
          )
        }
        return null
      })}
      <button
        onClick={() => {
          const path = `/chillies/${filterArrayToPathArray(currentFilters).flat().join('/')}`
          router.push(path)
        }}
      >
        Apply
      </button>
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
