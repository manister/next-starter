export interface IChilliAttributes {
  title: string
  species: string
  scovilleMin: number
  scovilleMax: number
}

export interface IChilliData {
  [handle: string]: {
    attributes: IChilliAttributes
    html: string
  }
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
