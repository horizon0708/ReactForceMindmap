import { GraphState } from './reducer';

export function importState(originalState: GraphState, state: GraphState):GraphState {
  // just basic state check :/ too tired to implement something more robust
  if (
    state.hasOwnProperty("categories") &&
    state.hasOwnProperty("tags") &&
    state.hasOwnProperty("skills")
  ) {
    return state
  }
  return originalState;
}
