import { createAction } from "typesafe-actions";
import { ActionCreator, Action } from "redux";
import { $Call } from 'utility-types'; // From https://github.com/piotrwitek/utility-types

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export interface GraphAction {
  actionAddCategory: typeof actionAddCategory
}


export const actionAddCategory= actionCreator<{parent: string}>('CATEGORY_ADD');

