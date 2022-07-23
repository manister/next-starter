import { createContext, useContext, useReducer } from 'react'
import { IAppContext } from '~/lib/types'
import createActions from './actions'
import initialState from './initialState'
import reducer from './reducer'

type Props = {
  children: React.ReactNode
}

const Hook = (): IAppContext => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = createActions(dispatch)
  return {
    state,
    actions,
  }
}

const AppContext = createContext({} as IAppContext)

export const AppWrapper = ({ children }: Props): JSX.Element => {
  return <AppContext.Provider value={Hook()}>{children}</AppContext.Provider>
}

export const useGlobalState = (): IAppContext => useContext(AppContext)
