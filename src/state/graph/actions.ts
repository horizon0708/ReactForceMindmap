import { createAction } from "typesafe-actions";
import { ActionCreator, Action } from "redux";
import { $Call } from "utility-types"; // From https://github.com/piotrwitek/utility-types

import actionCreatorFactory from "typescript-fsa";
import { UIState, GraphState } from './reducer';


const actionCreator = actionCreatorFactory();

export interface GraphAction {
  actionAddCategory: typeof actionAddCategory;
  actionDeleteCategory: typeof actionDeleteCategory;
  actionUpdateCategory: typeof actionUpdateCategory;
  actionAddTagParent: typeof actionAddTagParent;
  actionAddTagChild: typeof actionAddTagChild;
  actionDeleteTagParent: typeof actionDeleteTagParent;
  actionDeleteTagChild: typeof actionDeleteTagChild;
  actionUpdateTagParent: typeof actionUpdateTagParent;
  actionUpdateTagChild: typeof actionUpdateTagChild;
  actionAddSkill: typeof actionAddSkill;
  actionDeleteSkill: typeof actionDeleteSkill;
  actionUpdateSkill: typeof actionUpdateSkill;
  actionUpdateCurrentTag: typeof actionUpdateCurrentTag;
  actionUIChange: typeof actionUIChange;
  actionUpdateCategoryTags: typeof actionUpdateCategoryTags;
  actionClearAll: typeof actionClearAll;
  actionImportData: typeof actionImportData;
}

export const actionUpdateTitle = actionCreator<{name: string}>("CHANGE_TITLE");

export const actionImportData = actionCreator<{ data: GraphState }>(
  "IMPORT_DATA"
);

export const actionUIChange = actionCreator<{ UIstate: UIState }>("UI_CHANGE");

export const actionCurrentEdit = actionCreator<{ name: string | null }>(
  "CATEGORY_CURRENT_EDIT"
);

export const actionAddCategory = actionCreator<{ parent: string }>(
  "CATEGORY_ADD"
);
export const actionDeleteCategory = actionCreator<{ name: string }>(
  "CATEGORY_DELETE"
);
export const actionUpdateCategory = actionCreator<{
  name: string;
  newName: string;
}>("CATEGORY_UPDATE");

export const actionAddTagParent = actionCreator<{ name: string }>(
  "TAG_ADD_PARENT"
);
export const actionAddTagChild = actionCreator<{
  parentName: string;
  name: string;
}>("TAG_ADD_CHILD");
export const actionDeleteTagParent = actionCreator<{ name: string }>(
  "TAG_DELETE_PARENT"
);
export const actionDeleteTagChild = actionCreator<{
  parentName: string;
  name: string;
}>("TAG_DELETE_CHILD");
export const actionUpdateTagParent = actionCreator<{
  name: string;
  newName: string;
}>("TAG_UPDATE_PARENT");
export const actionUpdateTagChild = actionCreator<{
  parentName: string;
  name: string;
  newChild: string;
}>("TAG_UPDATE_CHILD");

export const actionAddSkill = actionCreator<{ name: string }>("SKILL_ADD");
export const actionDeleteSkill = actionCreator<{ name: string }>(
  "SKILL_DELETE"
);
export const actionUpdateSkill = actionCreator<{
  name: string;
  newName: string;
  skill: number;
}>("SKILL_UPDATE");

export const actionUpdateCurrentTag = actionCreator<{ name: string | null }>(
  "TAG_CURRENT_UPDATE"
);

export const actionUpdateCategoryTags = actionCreator<{}>(
  "CATEGORY_TAG_UPDATE"
);
export const actionClearAll = actionCreator<{}>("CLEAR_ALL");

