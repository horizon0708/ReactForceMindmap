import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './src/configureStore';

exports.replaceRouterComponent = ({ history }) => {
    const store = configureStore();

    const ConnectedRouterWrapper = ({ children }) => (
        <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>
    )

    return ConnectedRouterWrapper
}