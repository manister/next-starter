import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { filterArrayToPathArray, updateListFilter, updateRangeFilter } from '~/lib/filters'
import { useDebounce } from 'use-debounce'
import ListFilter from './ChilliFilters/ListFilter'
import RangeFilter from './ChilliFilters/RangeFilter'

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
    setCurrentFilters(filters)
  }, [filters])

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
            <ListFilter
              key={filter.name}
              filter={filter}
              onChange={(optionIndex, value) => {
                const newFilters = updateListFilter(currentFilters, index, optionIndex, value)
                setCurrentFilters(newFilters)
              }}
            />
          )
        }
        if (filter.type === 'range') {
          return (
            <RangeFilter
              key={filter.name}
              filter={filter}
              sliderChange={(val) => {
                const newFilters = updateRangeFilter(currentFilters, index, val as [number, number])
                setCurrentFilters(newFilters)
              }}
              minChange={(val) => {
                const newFilters = updateRangeFilter(currentFilters, index, [val, null])
                setCurrentFilters(newFilters)
              }}
              maxChange={(val) => {
                const newFilters = updateRangeFilter(currentFilters, index, [null, val])
                setCurrentFilters(newFilters)
              }}
            />
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
