import React, { useState } from 'react'
// import { filterArrayToPathArray, updateListFilter, updateRangeFilter } from '~/lib/filters'

interface Props {
  filter: IFilterList
  onChange: (indexChanged: number, value: boolean) => void
}

const ListFilter = (props: Props): JSX.Element => {
  const { filter, onChange } = props
  const [open, setOpen] = useState(false)

  return (
    <div key={filter.name}>
      <button onClick={() => setOpen(!open)} type="button">
        {filter.displayName}
      </button>
      {open ? (
        <ul>
          {filter.values.map((option, optionIndex) => {
            return (
              <li key={option.value}>
                <input
                  onChange={(e) => onChange(optionIndex, e.target.checked)}
                  type={'checkbox'}
                  checked={option.active}
                  id={option.value}
                />
                <label htmlFor={option.value}>{option.displayValue}</label>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
export default ListFilter
