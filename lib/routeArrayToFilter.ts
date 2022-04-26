const routeArrayToFilter = (arr: string[]): string => {
  return `AND(${arr.reduce((acca, item, index) => {
    if (index % 2 !== 0) return acca // skip odds
    const filterValueString = arr[index + 1]
    if (!filterValueString) return acca
    const filterKey = item.toLowerCase() // this is the filter key on odd els
    if (filterValueString.includes('::')) {
      const [min, max] = filterValueString.split('::').map(parseFloat)
      if ((min && isNaN(min)) || (max && isNaN(max)))
        throw new Error('Range for range values filter must be 2 numbers, seperated by a double-colon.')
      return `${acca}AND(${filterKey}_max >= ${min}, ${filterKey}_min <= ${max})${index + 2 === arr.length ? '' : ', '}`
    }

    if (filterValueString.includes(':')) {
      const [min, max] = filterValueString.split(':').map(parseFloat)
      if ((min && isNaN(min)) || (max && isNaN(max)))
        throw new Error('Range filter for single values must be 2 numbers, seperated by a colon.')
      return `${acca}AND(${filterKey} >= ${min}, ${filterKey} <= ${max})${index + 2 === arr.length ? '' : ', '}`
    }

    // possible seperated by +:
    const filterValues: string[] = filterValueString.split('+')
    const orFilter = `OR(${filterValues.reduce((acc, filterValue, i) => {
      //build up an OR filter
      return `${acc}FIND("${filterValue}", {${filterKey}/handle})${i + 1 === filterValues.length ? '' : ', '}`
    }, '')})`
    //build up an and filter
    return `${acca}${orFilter}${index + 2 === arr.length ? '' : ', '}`
  }, '')})`
}
export default routeArrayToFilter
