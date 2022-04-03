const routeArrayToFilter = (arr: string[]): string => {
  return `AND(${arr.reduce((acca, item, index) => {
    if (index % 2 !== 0) return acca // skip odds
    // or seperated by +:
    const filterValues: string[] = arr[index + 1].split('+')
    const filterKey = item // this is the filter key on odd els
    const orFilter = `OR(${filterValues.reduce((acc, filterValue, i) => {
      //build up an OR filter
      return `${acc}FIND("${filterValue}", {${filterKey}/handle})${i + 1 === filterValues.length ? '' : ', '}`
    }, '')})`
    //build up an and filter
    return `${acca}${orFilter}${index + 2 === arr.length ? '' : ', '}`
  }, '')})`
}
export default routeArrayToFilter
