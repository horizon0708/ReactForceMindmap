// ./stc/configureStore.ts

import { createStore, applyMiddleware, Store } from "redux";

// react-router has its own Redux middleware, so we'll use this
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it

// Import the state interface and our combined reducers.
import { ApplicationState, reducers } from "./state";
import { GraphState } from "./state/graph/reducer";
import { tagColorUpdater } from "./state/middleware/tagColorUpdater";
import { composeWithDevTools } from "redux-devtools-extension";
import { tagUpdater } from "./state/middleware/tagUpdater";
import { loadState } from "./state/localStorage";
import ReduxThunk from 'redux-thunk'
export default function configureStore(): Store<ApplicationState> {
  // create the composing function for our middlewares
  const persistedState = loadState();
  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore<any, any, any, any>(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(tagColorUpdater, tagUpdater, ReduxThunk))
    // composeWithDevTools(applyMiddleware( tagUpdater))
  );
}

