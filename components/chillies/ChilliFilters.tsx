import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { filterArrayToPathArray, updateListFilter, updateRangeFilter } from '~/lib/filters'
import { useDebounce } from 'use-debounce'
import ListFilter from './ChilliFilters/ListFilter'
import RangeFilter from './ChilliFilters/RangeFilter'
import Button from '../global/Button'

type Props = {
  open: boolean
  filters: IFilter[]
  setOpen: (value: boolean) => void
}

const ChilliFilters = (props: Props): JSX.Element => {
  const { filters, open, setOpen } = props
  const router = useRouter()

  const [currentFilters, setCurrentFilters] = useState(filters)

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keyup', onKeyUp)
    return () => window.removeEventListener('keyup', onKeyUp)
  }, [setOpen])

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
    <>
      <div
        className={`h-full overflow-auto w-1/1 md:max-w-[400px] h-100 fixed left-0 top-0 bottom-0 z-20 bg-white transition-transform ${
          open ? '' : 'translate-x-[-100%]'
        }`}
      >
        <form
          className="h-1/1 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault()
            const path = `/chillies/${filterArrayToPathArray(currentFilters).flat().join('/')}`
            router.push(path)
          }}
        >
          <ul>
            {currentFilters.map((filter, index) => {
              if (filter.type === 'list') {
                return (
                  <li key={filter.name} className="border-b-2 border-slate-200">
                    <ListFilter
                      filter={filter}
                      onChange={(optionIndex, value) => {
                        const newFilters = updateListFilter(currentFilters, index, optionIndex, value)
                        setCurrentFilters(newFilters)
                      }}
                    />
                  </li>
                )
              }
              if (filter.type === 'range') {
                return (
                  <li key={filter.name} className="border-b-2 border-slate-200">
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
                  </li>
                )
              }
              return null
            })}
          </ul>
          <div className="sticky bottom-0 w-1/1  bg-white p-3 mt-auto">
            <Button variant="primary">
              <button onClick={() => setOpen(false)} className="w-1/1" disabled={count === 0} type="submit">
                Apply {count !== null ? `(${count})` : ''}
              </button>
            </Button>
          </div>
        </form>
      </div>
      {open ? (
        <button
          onClick={() => setOpen(false)}
          className="fixed top-0 right-0 bottom-0 left-0 block bg-black opacity-20 z-10 cursor-auto"
        ></button>
      ) : null}
    </>
  )
}

export default ChilliFilters
