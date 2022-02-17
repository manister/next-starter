import { createContext, useContext, useReducer } from 'react'
import { IAppContext } from '~/lib/types'
import createActions from './actions'
import initialState from './initialState'
import reducer from './reducer'

const hook = (): IAppContext => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = createActions(dispatch)
  return {
    state,
    actions,
  }
}

const AppContext = createContext({} as IAppContext)

export const AppWrapper: React.FunctionComponent = ({ children }) => {
  return <AppContext.Provider value={hook()}>{children}</AppContext.Provider>
}

export const useGlobalState = (): IAppContext => useContext(AppContext)
