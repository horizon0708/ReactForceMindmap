import { createAction } from "typesafe-actions";
import { ActionCreator, Action } from "redux";
import { $Call } from "utility-types"; // From https://github.com/piotrwitek/utility-types

import actionCreatorFactory from "typescript-fsa";
import { Relation } from '../../components/customData/index';
import { GraphState } from '../graph/reducer';

const actionCreator = actionCreatorFactory();

interface GraphUIAction {
  tagColorMap: typeof actionUpdateTagColorMap;
}

export const actionUpdateTagColorMap = actionCreator<{tags: Relation[]}>("UPDATE_TAG_MAP");
export const actionGenerateMindMap = actionCreator<{data: GraphState}>("GENERATE_MIND_MAP")