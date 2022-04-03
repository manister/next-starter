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
    scoville: [raw.scomin, raw.scomax],
    sowRange: [raw.sowmin, raw.sowmax],
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

const endpoint = `https://api.airtable.com/v0/appCGefBVp6Wufwz3/Cultivars?&view=All`
export const getChilliesFromAirtable = async (): Promise<IChilli[]> => {
  try {
    const res = await fetch(endpoint, { headers })
    const data = await res.json()
    const chillies = (data.records as unknown[]).map(shapeChilliData)
    return chillies
  } catch (e) {
    console.log(e)
    return []
  }
}
