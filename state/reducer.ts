import { IAction, IState } from '~/lib/types'

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload,
      }
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload,
      }
    default:
      return state
  }
}

export default reducer
