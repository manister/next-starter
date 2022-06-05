import { IFilter, IFilterList, IFilterRange, IFilterSchema, IFilterValue } from './types'

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

const filterSchemaExample: IFilterSchema[] = [
  {
    type: 'checkbox',
    name: 'species',
    displayName: 'Species',
    values: [
      {
        value: 'annuum',
        displayValue: 'Annuum',
      },
      {
        value: 'chinense',
        displayValue: 'Chinense',
      },
    ],
  },
  {
    type: 'rangerange',
    name: 'scoville',
    displayName: 'Scoville',
    domain: [0, 10000],
  },
  {
    type: 'range',
    name: 'ttm',
    displayName: 'TTM',
    domain: [0, 90],
  },
]

const filterArrayToPathArray = (filterArray: IFilter[]): [string, string][] => {
  return filterArray.map((filter) => {
    const handle = filter.name
    const valueString = ['range', 'rangerange'].includes(filter.type)
      ? (filter as IFilterRange).active.join(':')
      : (filter as IFilterList).values.flatMap((value) => (value.active ? value.value : [])).join('+')
    return [handle, valueString]
  })
}

const filterExample: IFilter[] = [
  {
    type: 'rangerange',
    name: 'scoville',
    displayName: 'Scoville',
    domain: [0, 10000],
    selected: [0, 1000],
    active: [0, 1000],
  },
  {
    type: 'checkbox',
    name: 'species',
    displayName: 'Species',
    values: [
      {
        value: 'annuum',
        displayValue: 'Annuum',
        selected: true,
        active: true,
      },
      {
        value: 'chinense',
        displayValue: 'Chinense',
        selected: true,
        active: true,
      },
    ],
  },
]

const example1 = filterArrayToPathArray(filterExample)

const examplePathArray: [string, string][] = [
  ['scoville', '0:1000'],
  ['species', 'annuum'],
]

const pathArrayToFilterArray = (pathArray: [string, string][], filterSchema: IFilterSchema[]): IFilter[] => {
  const filters = filterSchema.map((filter) => {
    const match = pathArray.find((item) => item[0] === filter.name)

    if (filter.type === 'range' || filter.type === 'rangerange') {
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
      const values = (filter as IFilterList).values.map((value) => {
        return {
          ...value,
          selected: valueStrings.includes(value.value),
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

const example = pathArrayToFilterArray(examplePathArray, filterSchemaExample)

example.map((item) => console.log(item))

// export const getFiltersFromSchemaAndPaths = (filterData: IFilter[], filterPaths: string[]): IFilter[] =>
//   filterData.map((item) => {
//     const index = filterPaths.indexOf(item.name)
//     const value = filterPaths[index + 1]
//     if (value) {
//       const updatedValues = [...item.values]
//       const optionIndex = updatedValues.findIndex((option) => option.value === value)
//       if (updatedValues?.[optionIndex]) {
//         ;(updatedValues[optionIndex] as IFilterValue).active = true
//         ;(updatedValues[optionIndex] as IFilterValue).selected = true
//       }
//       return {
//         ...item,
//         values: updatedValues,
//       }
//     }
//     return item
//   })

// export const routeArrayToFilter = (arr: string[]): string => {
//   const airtableFilter = `AND(${arr.reduce((acca, item, index) => {
//     if (index % 2 !== 0) return acca // skip odds
//     const filterValueString = arr[index + 1]
//     if (!filterValueString) return acca
//     const filterKey = item.toLowerCase() // this is the filter key on odd els

//     if (filterValueString.includes('::')) {
//       const [min, max] = filterValueString.split('::').map(parseFloat)
//       if ((min && isNaN(min)) || (max && isNaN(max)))
//         throw new Error('Range for range values filter must be 2 numbers, seperated by a double-colon.')
//       return `${acca}AND(${filterKey}_max >= ${min}, ${filterKey}_min <= ${max})${index + 2 === arr.length ? '' : ', '}`
//     }

//     if (filterValueString.includes(':')) {
//       const [min, max] = filterValueString.split(':').map(parseFloat)
//       if ((min && isNaN(min)) || (max && isNaN(max)))
//         throw new Error('Range filter for single values must be 2 numbers, seperated by a colon.')
//       return `${acca}AND(${filterKey} >= ${min}, ${filterKey} <= ${max})${index + 2 === arr.length ? '' : ', '}`
//     }

//     // possible seperated by +:
//     const filterValues: string[] = filterValueString.split('+')
//     const orFilter = `OR(${filterValues.reduce((acc, filterValue, i) => {
//       //build up an OR filter
//       return `${acc}FIND("${filterValue}", {${filterKey}/handle})${i + 1 === filterValues.length ? '' : ', '}`
//     }, '')})`
//     //build up an and filter
//     return `${acca}${orFilter}${index + 2 === arr.length ? '' : ', '}`
//   }, '')})`
//   console.log(airtableFilter)
//   return airtableFilter
// }
