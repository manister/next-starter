import { IChilli } from './types'

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shapeChilliData = (el: any): IChilli => {
  const raw = el.fields
  return {
    name: raw.name,
    handle: raw.handle,
    desc: raw.desc,
    scoville: [raw.scoville_min, raw.scoville_max],
    sowRange: [raw.sowmin ?? 0, raw.sowmax ?? 0],
    ttm: raw.ttm,
    colours: ((raw.colours ?? []) as unknown[]).map((_colour, index) => ({
      name: raw['colours/name'][index],
      handle: raw['colours/handle'][index],
      rgb: ['r', 'g', 'b'].map((char) => raw[`colours/${char}`][index] as number) as [number, number, number],
    })),
    species: ((raw.species ?? []) as unknown[]).map((_species, index) => ({
      name: raw['species/name'][index],
      handle: raw['species/handle'][index],
    })),
    images: ((raw.image ?? []) as unknown[]).map((_image, index) => ({
      alt: raw['image/alt'][index],
      attr: raw['image/attr'][index],
      ...raw['image/data'][index],
    })),
    origin: ((raw.origin ?? []) as unknown[]).map((_origin, index) => ({
      name: raw['origin/name'][index],
      handle: raw['origin/handle'][index],
      images: ((raw['origin/image'] ?? []) as unknown[]).map((_image, i) => ({
        alt: raw['origin/image/alt'][i],
        attr: raw['origin/image/attribution'][i],
        ...raw['origin/image/data'][i],
      })),
    })),
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
  console.log(endpoint.toString())
  try {
    const res = await fetch(endpoint.toString(), { headers })
    const data = await res.json()
    const chillies = (data.records as unknown[]).map(shapeChilliData)
    return chillies
  } catch (e) {
    // console.log(e)
    return []
  }
}
