import { Dispatch } from 'react'
import { IAction, IAppContext } from '~/lib/types'

const createActions = (dispatch: Dispatch<IAction>): IAppContext['actions'] => {
  return {
    //all actions here
    incrementCount: (amount: number): void => {
      dispatch({ type: 'INCREMENT', payload: amount })
    },

    setCount: (amount: number): void => {
      dispatch({ type: 'SET_COUNT', payload: amount })
    },
  }
}

export default createActions
