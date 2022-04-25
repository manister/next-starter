import { IChilli } from './types'

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shapeChilliData = (el: any): IChilli => {
  const raw = el.fields
  if (!raw.name || !raw.handle) {
    throw new Error('Chilli must have a name and a handle')
  }
  return {
    name: raw.name,
    handle: raw.handle,
    desc: raw.desc ?? '',
    scoville: !isNaN(raw.scoville_min) && !isNaN(raw.scoville_max) ? [raw.scoville_min, raw.scoville_max] : null,
    sowRange: raw.sowmin && raw.sowmax ? [raw.sowmin, raw.sowmax] : null,
    ttm: raw.ttm ?? null,
    colours: ((raw.colours ?? []) as unknown[]).flatMap((_colour, index) => {
      try {
        return {
          name: raw['colours/name'][index],
          handle: raw['colours/handle'][index],
          rgb: ['r', 'g', 'b'].map((char) => raw[`colours/${char}`][index] as number) as [number, number, number],
        }
      } catch (e) {
        console.log(e)
        return []
      }
    }),
    species: ((raw.species ?? []) as unknown[]).flatMap((_species, index) => {
      try {
        return {
          name: raw['species/name'][index],
          handle: raw['species/handle'][index],
        }
      } catch (e) {
        console.log(e)
        return []
      }
    }),
    images: ((raw.image ?? []) as unknown[]).flatMap((_image, index) => {
      try {
        return {
          alt: raw['image/alt'][index],
          attr: raw['image/attr'][index],
          ...raw['image/data'][index],
        }
      } catch (e) {
        console.log(e)
        return []
      }
    }),
    origin: ((raw.origin ?? []) as unknown[]).flatMap((_origin, index) => {
      try {
        return {
          name: raw['origin/name'][index],
          handle: raw['origin/handle'][index],
          images: ((raw['origin/image'] ?? []) as unknown[]).flatMap((_image, i) => {
            try {
              return {
                alt: raw['origin/image/alt'][i],
                attr: raw['origin/image/attribution'][i],
                ...raw['origin/image/data'][i],
              }
            } catch (e) {
              console.log(e)
              return []
            }
          }),
        }
      } catch (e) {
        console.log(e)
        return []
      }
    }),
  }
}

interface IGetChilliesOpts {
  filterFormula?: string
  view?: 'All'
}

const endpoint = new URL(`https://api.airtable.com/v0/appCGefBVp6Wufwz3/Cultivars`)
export const getChilliesFromAirtable = async (opts: IGetChilliesOpts = { view: 'All' }): Promise<IChilli[]> => {
  const view = opts?.view ?? 'All'

  endpoint.searchParams.set('view', view)

  if (opts?.filterFormula) endpoint.searchParams.set('filterByFormula', opts.filterFormula)

  try {
    const res = await fetch(endpoint.toString(), { headers })
    const data = await res.json()
    if (data.records.length < 1) return []
    const chillies = (data.records as unknown[]).flatMap((record) => {
      try {
        return shapeChilliData(record)
      } catch (e) {
        console.log(e)
        return []
      }
    })
    return chillies
  } catch (e) {
    console.log(e)
    return []
  }
}
