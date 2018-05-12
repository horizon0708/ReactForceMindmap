import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { ApplicationState } from "../index";
import { actionUpdateTagColorMap } from "../graphUI/actions";


/**
 * Disabled to enable Undo functionality 
*/



export const tagColorUpdater: Middleware = (
  store: ApplicationState & MiddlewareAPI
) => next => action => {
  const previousTags = store.getState().graph.present.tags;
  next(action);
  const nextTags = store.getState().graph.present.tags;
  if (previousTags !== nextTags) {
    store.dispatch(actionUpdateTagColorMap({ tags: nextTags }));
  }
};

