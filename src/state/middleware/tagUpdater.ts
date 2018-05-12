import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { ApplicationState } from "../index";
import { actionUpdateCategoryTags } from '../graph/actions';


/**
 * Disabled to enable Undo functionality 
*/
export const tagUpdater: Middleware = (
  store: ApplicationState & MiddlewareAPI
) => next => action => {
  const previousTags = store.getState().graph.present.tags;
  next(action);
  const nextTags = store.getState().graph.present.tags;
  if (previousTags !== nextTags) {
    store.dispatch(actionUpdateCategoryTags({}));
  }
};
