export interface IChilli {
  name: string
  handle: string
  desc: string
  scoville: number[]
  sowRange: string[]
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
