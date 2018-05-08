import { Reducer, Action } from 'redux';
import { Relation } from '../../pages/customData';
import { createCategory } from './helper';
import { getType } from 'typesafe-actions';
import { actionAddCategory } from './actions';
import { isType } from 'typescript-fsa';


const reducer:Reducer<GraphState> = (state = graphState, action:Action<any>): GraphState => {
  // must use if instead of switch to get type safety
  if(isType(action, actionAddCategory)){
    console.log("hi")
    const newCategory = createCategory(state.categories, action.payload.parent, "New Node");
    console.log(newCategory);
    return {
      categories: newCategory,
      ...state
    }
  }
  return state;
}

export interface GraphState {
  categories: Relation[];
  tags: Relation[];
  UItext: string;
  UIstate: string;
  skills: any[];
  editing: string | null;
}

const graphState: GraphState = {
  categories: [
    {
      parent: "Origin",
      children: ["Father"],
      origin: true
    },
    {
      parent: "Father",
      children: ["Child"]
    },
    {
      parent: "Child",
      children: []
    }
  ],
  tags: [],
  UItext: "Start Adding stuff!",
  UIstate: "NORMAL",
  editing: null,
  skills: ["Origin", 5]
};

const initialState = {
  graph: graphState
}


export default reducer;