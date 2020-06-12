
import { createStore, AnyAction } from 'redux'

import {
  MakeStore, createWrapper, HYDRATE,
} from 'next-redux-wrapper'

import * as immutable from 'object-path-immutable'

import { initialState, State } from '~/store/state'


// create your reducer
const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return immutable.set(state, [], action.payload)
    case 'TOGGLE':
      return immutable.set(state, ['someToggle'], !state.someToggle)
    default:
      return state
  }
}

// create a makeStore function
/* eslint-disable no-underscore-dangle */
const makeStore: MakeStore<State> = () => createStore(reducer,
  typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
/* eslint-enable */
// export an assembled wrapper
const wrapper = createWrapper<State>(makeStore, { debug: true })
export default wrapper
