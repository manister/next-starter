export interface IChilli {
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

export interface IColour {
  name: string
  handle: string
  rgb: [number, number, number]
}

export interface ISpecies {
  name: string
  handle: string
}

export interface IImage {
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

export interface IOrigin {
  name: string
  handle: string
  images: IImage[]
}

export interface IState {
  count: number
}

export interface IFilterSchemaValue {
  value: string
  displayValue: string
}

export interface IFilterValue extends IFilterSchemaValue {
  active: boolean
}

export interface IFilterSchemaList {
  type: 'list'
  subType: 'checkbox' | 'radio'
  name: string
  displayName: string
  values: IFilterSchemaValue[]
}

export interface IFilterList extends IFilterSchemaList {
  values: IFilterValue[]
}

export interface IFilterSchemaRange {
  type: 'range'
  subType: 'range' | 'rangerange' // rangerange is when values themselves are ranges, eg a 1000-1500 scoville
  name: string
  displayName: string
  domain: [min: number, max: number] // total range of possible values
}

export interface IFilterRange extends IFilterSchemaRange {
  active: [min: number, max: number]
}
export type IFilterSchema = IFilterSchemaList | IFilterSchemaRange
export type IFilter = IFilterList | IFilterRange

export interface IActionIncrementCount {
  type: 'INCREMENT'
  payload: number
}

export interface IActionSetCount {
  type: 'SET_COUNT'
  payload: number
}

export type IAction = IActionIncrementCount | IActionSetCount

export interface IAppContext {
  state: IState
  actions: {
    setCount: (amount: number) => void
    incrementCount: (amount: number) => void
  }
}
