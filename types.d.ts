interface IChilli {
  name: string
  handle: string
  desc: string
  scoville: [number, number] | null
  sowRange: [string, string] | null
  ttm: number
  colours: IColour[]
  species: ISpecies[]
  images: IImage[]
  origin: IOrigin[]
}

interface IColour {
  name: string
  handle: string
  rgb: [number, number, number]
}

interface ISpecies {
  name: string
  handle: string
}

interface IImage {
  alt: string
  attr: string
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
}

interface IOrigin {
  name: string
  handle: string
  images: IImage[]
}

interface IState {
  wishlist: Set<string>
}

interface IFilterSchemaValue {
  value: string
  displayValue: string
}

interface IFilterValue extends IFilterSchemaValue {
  active: boolean
}

interface IFilterSchemaList {
  type: 'list'
  subType: 'checkbox' | 'radio'
  name: string
  displayName: string
  values: IFilterSchemaValue[]
}

interface IFilterList extends IFilterSchemaList {
  values: IFilterValue[]
}

interface IFilterSchemaRange {
  type: 'range'
  subType: 'range' | 'rangerange' // rangerange is when values themselves are ranges, eg a 1000-1500 scoville
  name: string
  displayName: string
  domain: [min: number, max: number] // total range of possible values
}

interface IFilterRange extends IFilterSchemaRange {
  active: [min: number, max: number]
}
type IFilterSchema = IFilterSchemaList | IFilterSchemaRange
type IFilter = IFilterList | IFilterRange

interface IActionAddToWishlist {
  type: 'ADD'
  payload: string
}

interface IActionRemoveFromWishlist {
  type: 'REMOVE'
  payload: string
}

type IAction = IActionIncrementCount | IActionSetCount

interface IAppContext {
  state: IState
  actions: {
    addToWishlist: (handle: string) => void
    removeFromWishlist: (handle: string) => void
    hydrate: (handles: string[]) => void
  }
}
