import { getChilliesFromAirtable } from '../airtable'
import { chunk } from '../dataHelpers'
import { filterArrayToAirtableFilter, getFilterSchema, pathArrayToFilterArray } from '../filters'

export const getChilliPaDataFromPaths = async (paths: string[]): Promise<IChilliPageData> => {
  let chillies: IChilli[] = []
  let requestType: IChilliPageData['requestType'] = null

  const schema = await getFilterSchema()

  let filters = pathArrayToFilterArray([], schema)

  try {
    if (paths.length == 0) {
      //no paths, load all chillies
      requestType = 'listing'
      chillies = await getChilliesFromAirtable()
    } else {
      //do we have a sort by?
      const last = paths[paths.length - 1]
      const hasSort = last && last?.includes('sort:')
      let sort: { direction: 'asc' | 'desc'; field: string } | null = null

      if (hasSort) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_s, field, dir] = last.split(':')
        if (field && dir) {
          const direction: 'asc' | 'desc' = dir === 'asc' || dir === 'desc' ? dir : 'asc'
          sort = { field, direction }
        }
      }
      const filterPaths = chunk(hasSort ? paths.slice(0, -1) : paths)

      filters = pathArrayToFilterArray(filterPaths, schema)

      //just a handle or a filter path requested:
      requestType = hasSort || filterPaths.length > 0 ? 'listing' : 'handle'

      const filterFormula = requestType === 'listing' ? filterArrayToAirtableFilter(filters) : `{handle}="${paths[0]}"`
      const data = await getChilliesFromAirtable({ filterFormula, ...(sort ? { sort } : {}) })

      chillies = data
    }
  } catch (e) {
    console.error({ error: e })
  }
  return { chillies, requestType, filters }
}
