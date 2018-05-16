import { UIState } from "../graph/reducer";
import { Reducer, Action } from "redux";
import { isType } from "typescript-fsa";
import { actionUpdateTagColorMap, actionGenerateMindMap } from './actions';
import { generateTagColorMap, generateMindMapData } from './helper';
import {
  actionUIChange,
  actionCurrentEdit,
  actionUpdateCurrentTag
} from "../graph/actions";
import { Relation } from "../../components/customData";
import { nameAndSkills } from '../../mindMap/sampleData';

export interface GraphUIState {
  helpText: string;
  UIstate: UIState;
  currentEdit: string | null;
  currentTag: string | null;
  tagColorMap: object;
  generated: boolean 
}

const tagColorRange: string[] = [
  "#abf4cb",
  "#ffb5f0",
  "#f25c5c",
  "#f4c2ab",
  "#a9f466",
  "#b47cea",
  "#ffb349"
];


const initialState: GraphUIState = {
  helpText: "Start Adding stuff!",
  UIstate: UIState.Normal,
  currentEdit: null,
  currentTag: null,
  tagColorMap: {Something: "#abf4cb" },
  generated: false
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

  if (isType(action,actionUpdateTagColorMap)){
    const { tags} = action.payload;
    return {
      ...state,
      tagColorMap: generateTagColorMap(tags,tagColorRange)
    }
  }

  if(isType(action, actionGenerateMindMap)){
    const { data } = action.payload;
    return {
      ...state,
      generated: true
    }
  }

  return state;
};


export default reducer;