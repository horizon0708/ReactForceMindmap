import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import { saveState } from './src/state/localStorage'

exports.replaceRouterComponent = ({ history }) => {
  const store = configureStore()

  // store.subscribe(() => {
  //   saveState({ graph: store.getState().graph })
  // })
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )

  return ConnectedRouterWrapper
}
