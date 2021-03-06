import { GraphState } from "./graph/reducer";
import { Undoable } from './index';

export const saveState = (state: Undoable<GraphState>) => {
  try{
    const serialized = JSON.stringify(state);
    localStorage.setItem('state', serialized);
  }catch(err){
    console.error(err);
  }
}
export const loadState = () => {
  try{
    const state = localStorage.getItem('state');
    if(state === null){
      return undefined
    }
    return JSON.parse(state);
  }
  catch(err){
    return undefined;
  }
}