export interface IChilliDatum {
  title: string
  thumbnail: string
  scoville: number
  content: string
  handle: string
}

export interface IChilliData {
  [handle: string]: IChilliDatum
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
