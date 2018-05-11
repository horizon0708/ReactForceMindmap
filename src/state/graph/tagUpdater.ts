import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { ApplicationState } from "../index";
import { actionUpdateCategoryTags } from './actions';

export const TagUpdater: Middleware = (
  store: ApplicationState & MiddlewareAPI
) => next => action => {
  const previousTags = store.getState().graph.tags;
  next(action);
  const nextTags = store.getState().graph.tags;
  if (previousTags !== nextTags) {
    store.dispatch(actionUpdateCategoryTags({}));
  }
};
