import { filterSchemaMock } from '~/tests/mocks'
import { arrShallowEq } from './data-helpers'
import { IFilter, IFilterList, IFilterRange, IFilterSchema } from './types'

export const getFilterSchema = (): IFilterSchema[] => {
  //will have to come from real data
  return filterSchemaMock
}

/*

  3 ways of expressing filters:

  A) As an array of filter objects: IFilter[]

  B) A path array:
  made up of couplets
  for checkbox/radio types: ["filterName.name", "filterValue.value+filterValue.value"]
  or for range types: ["filterName.name", "min:max"]

  C) An airtable string filter string, eg:
  "AND(OR(FIND("annuum", {species/handle}), FIND("chinense", {species/handle})))"

  We need to convert between A and B, in both directions
  We need to be able to convert A/B into C

  Therefore, keeping A as our primary expresssion of the filters, 3 functions are needed
  B <----> A -----> C

  filterArrayToPathArray
  pathArrayToFilterArray
  filterArrayToAirtableFilter

*/

export const filterArrayToPathArray = (filterArray: IFilter[]): [string, string][] => {
  return filterArray.flatMap((filter) => {
    const handle = filter.name
    const valueString =
      filter.type === 'range'
        ? arrShallowEq(filter.active, filter.domain)
          ? ''
          : filter.active.join(':')
        : filter.values.flatMap((value) => (value.active ? value.value : [])).join('+')
    if (valueString.length < 1) return []
    return [[handle, valueString]]
  })
}

export const pathArrayToFilterArray = (pathArray: [string, string][], filterSchema: IFilterSchema[]): IFilter[] => {
  const filters = filterSchema.map((filter) => {
    const match = pathArray.find((item) => item[0] === filter.name)

    if (filter.type === 'range') {
      let active = filter.domain
      if (match) {
        const valueString = match[1]
        const newRange = valueString.split(':').map(parseFloat)
        if (newRange.length === 2) {
          active = newRange as [number, number]
        }
      }
      return {
        ...filter,
        active,
        selected: active,
      } as IFilterRange
    } else {
      const valueStrings = match && match.length === 2 ? match[1].split('+') : []
      const values = filter.values.map((value) => {
        return {
          ...value,
          active: valueStrings.includes(value.value),
        }
      })
      return {
        ...filter,
        values,
      } as IFilterList
    }
  })
  return filters
}

export const filterArrayToAirtableFilter = (filterArray: IFilter[]): string => {
  const airtableArray = filterArray.flatMap((filter) => {
    if (filter.type === 'range') {
      const [min, max] = filter.active
      if (arrShallowEq(filter.domain, filter.active)) return [] //Unselected
      if ((min && isNaN(min)) || (max && isNaN(max))) {
        throw new Error('Range for range values filter must be 2 numbers, seperated by a double-colon.')
      }
      if (filter.subType === 'range') {
        return `AND(${filter.name} >= ${min}, ${filter.name} <= ${max})`
      }
      if (filter.subType === 'rangerange') {
        return `AND(${filter.name}_max >= ${min}, ${filter.name}_min <= ${max})`
      }
      return []
    }
    if (filter.type === 'list') {
      const activeValues = filter.values.filter((value) => value.active)
      if (activeValues.length < 1) return [] // unselected
      return `OR(${activeValues.reduce((acc, filterValue, i) => {
        //build up an OR filter
        return `${acc}FIND("${filterValue.value}", {${filter.name}/handle})${i + 1 === activeValues.length ? '' : ', '}`
      }, '')})`
    }
  })
  const ret = `AND(${airtableArray.join(', ')})`
  console.log(ret)
  return ret
}

export const updateRangeFilter = (filters: IFilter[], filterIndex: number, val: [number | null, number | null]): IFilter[] => {
  const newFilters = [...filters]
  const filter = newFilters[filterIndex]
  if (!filter) {
    console.error(`No filter at index ${filterIndex}`)
    return newFilters
  }
  if (filter.type !== 'range') {
    console.error(`Filter ${filter.name}, at index ${filterIndex} is not a range filter`)
    return newFilters
  }
  const newVal = [...filter.active] as [number, number]
  if (val[0] !== null) {
    newVal[0] = val[0]
  }
  if (val[1] !== null) {
    newVal[1] = val[1]
  }
  filter.active = newVal
  return newFilters
}

export const updateListFilter = (filters: IFilter[], filterIndex: number, optionIndex: number, value: boolean): IFilter[] => {
  const newFilters = [...filters]
  const filter = newFilters[filterIndex]
  if (!filter) {
    console.error(`No filter at index ${filterIndex}`)
    return newFilters
  }
  if (filter.type !== 'list') {
    console.error(`Filter ${filter.name}, at index ${filterIndex} is not a list filter`)
    return newFilters
  }
  const option = filter.values[optionIndex]
  if (option) {
    option.active = value
  }
  return newFilters
}
