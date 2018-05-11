import { UIState } from "../graph/reducer";
import { Reducer, Action } from "redux";
import { isType } from "typescript-fsa";
import {
  actionUIChange,
  actionCurrentEdit,
  actionUpdateCurrentTag
} from "../graph/actions";

export interface GraphUIState {
  helpText: string;
  UIstate: UIState;
  currentEdit: string | null;
  currentTag: string | null;
}

const initialState: GraphUIState = {
  helpText: "Start Adding stuff!",
  UIstate: UIState.Normal,
  currentEdit: null,
  currentTag: null,
};

const reducer: Reducer<GraphUIState> = (
  state = initialState,
  action: Action<any>
): GraphUIState => {
  const { helpText, UIstate, currentEdit, currentTag } = state;

  if (isType(action, actionCurrentEdit)) {
    return {
      ...state,
      currentEdit: action.payload.name
    };
  }

  if (isType(action, actionUpdateCurrentTag)) {
    const { name } = action.payload;
    return {
      ...state,
      currentTag: name
    };
  }

  if (isType(action, actionUIChange)) {
    const { UIstate } = action.payload;
    return {
      ...state,
      UIstate
    };
  }
  return state;
};


export default reducer;