import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { filterArrayToPathArray, updateListFilter, updateRangeFilter } from '~/lib/filters'
import { useDebounce } from 'use-debounce'

type Props = {
  filters: IFilter[]
}

const ChilliFilters = (props: Props): JSX.Element => {
  const { filters } = props
  const router = useRouter()

  const [currentFilters, setCurrentFilters] = useState(filters)

  const [debouncedFilters] = useDebounce(currentFilters, 300, { leading: true, maxWait: 1500 })

  const [count, setCount] = useState(null as null | number)

  useEffect(() => {
    fetch('/api/count', {
      method: 'POST',
      body: JSON.stringify(debouncedFilters),
    }).then((res) => {
      res.json().then((body) => {
        setCount(body as number)
      })
    })
  }, [debouncedFilters])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const path = `/chillies/${filterArrayToPathArray(currentFilters).flat().join('/')}`
        router.push(path)
      }}
    >
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
                        id={option.value}
                      />
                      <label htmlFor={option.value}>{option.displayValue}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
        if (filter.type === 'range') {
          return (
            <React.Fragment key={filter.name}>
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
            </React.Fragment>
          )
        }
        return null
      })}
      <button disabled={count === 0} type="submit">
        Apply {count !== null ? `(${count})` : ''}
      </button>
    </form>
  )
}

export default ChilliFilters
