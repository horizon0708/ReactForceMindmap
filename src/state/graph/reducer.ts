import { Reducer, Action } from "redux";
import { Relation } from "../../components/customData/index";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  deleteMultipleTagChild,
  deleteSkill,
  updateMultipleTagChild,
  updateSkill,
  getSkill,
  createSkill,
  checkForDuplicate,
  createTagChild,
  updateTagParent
} from "./helper";
import { getType } from "typesafe-actions";
import {
  actionAddCategory,
  actionUpdateSkill,
  actionUpdateCategory,
  actionDeleteCategory,
  actionAddTagChild,
  actionUpdateTagChild,
  actionUpdateTagParent,
  actionDeleteTagParent,
  actionDeleteTagChild,
  actionAddSkill,
  actionDeleteSkill,
  actionAddTagParent
} from "./actions";
import { isType } from "typescript-fsa";
import { createTagParent, deleteTagParent, deleteTagChild, updateCategoryTags } from './helper';
import { actionUpdateCurrentTag, actionCurrentEdit, actionUIChange, actionUpdateCategoryTags, actionClearAll } from './actions';

const reducer: Reducer<GraphState> = (
  state = graphState,
  action: Action<any>
): GraphState => {
  const { tags, categories, skills } = state;
  // must use if instead of switch to get type safety
  if (isType(action, actionAddCategory)) {
    const uniqueName = checkForDuplicate("New Node", state.categories);
    const newCategory = createCategory(
      state.categories,
      action.payload.parent,
      uniqueName
    );
    return {
      ...state,
      categories: newCategory,
      skills: createSkill(state.skills, uniqueName, 5)
    };
  }
  if (isType(action, actionUpdateCategory)) {
    const uniqueName = checkForDuplicate(
      action.payload.newName,
      state.categories
    );
    const skill = getSkill(state.skills, action.payload.name);
    return {
      ...state,
      categories: updateCategory(
        state.categories,
        action.payload.name,
        uniqueName
      ),
      tags: updateMultipleTagChild(state.tags, action.payload.name, uniqueName),
      skills: updateSkill(
        state.skills,
        action.payload.name,
        action.payload.newName,
        skill
      )
    };
  }
  if (isType(action, actionDeleteCategory)) {
    return {
      ...state,
      categories: deleteCategory(state.categories, action.payload.name),
      tags: deleteMultipleTagChild(state.tags, action.payload.name),
      skills: deleteSkill(state.skills, action.payload.name)
    };
  }
  

  // Tags
  if (isType(action, actionAddTagChild)) {
    const { parentName, name } = action.payload;
    const newTags = createTagChild(tags, parentName, name);
    return {
      ...state,
      tags: newTags,
    };
  }
  if (isType(action, actionAddTagParent)) {
    const { name } = action.payload;
    const newTags = createTagParent(tags, name); 
    return {
      ...state,
      tags: newTags,
    }
  }
  if (isType(action, actionUpdateTagParent)) {
    const { name , newName} = action.payload;
     const newTags = updateTagParent(tags, name, newName);
    return {
      ...state,
      tags: newTags,
    }
  }
  if (isType(action, actionDeleteTagParent)) {
    const { name } = action.payload;
      const newTags =  deleteTagParent(tags, name);
    return {
      ...state,
      tags: newTags,
    }
  }
 if (isType(action, actionDeleteTagChild)) {
    const { parentName, name } = action.payload;
     const newTags = deleteTagChild(tags, parentName, name);
    return {
      ...state,
      tags: newTags,
    }
  }
  

  /**
   * Skills
   */
  if (isType(action, actionAddSkill)) {
  }
  if (isType(action, actionUpdateSkill)) {
  }
  if (isType(action, actionDeleteSkill)) {
  }


  if(isType(action, actionClearAll)){
    return Object.assign({},clearedState);
  }

   if(isType(action, actionUpdateCategoryTags)){
     return {
       ...state,
       categoryTags: updateCategoryTags(state.tags)
     }
   }

  return state;
};

export interface GraphState {
  categories: Relation[];
  tags: Relation[];
  categoryTags: Relation[]
  skills: any[];
}

export enum UIState {
  Normal,
  TagAdd
}

const graphState: GraphState = {
  categories: [
    {
      parent: "Origin",
      children: ["Father"],
      origin: true,
      isOpen: true
    },
    {
      parent: "Father",
      children: ["Child"],
      isOpen: true
    },
    {
      parent: "Child",
      children: [],
      isOpen: true
    }
  ],
  tags: [
    {
      parent: "Something",
      children: ["Child", "Father"]
    }
  ],
  categoryTags: [
    { parent: "Child",
     children: ["Something"]  
  },
  {
    parent: "Father",
    children: ["Something"]
  }
  ],
  skills: [["Origin", 5], ["Father", 5], ["Child", 5]],
};

const clearedState: GraphState = {
  categories: [
    {
      parent: "Origin",
      children: [],
      origin: true,
      isOpen: true
    }
  ],
  tags: [],
  categoryTags: [],
  skills: [["Origin", 5]]
}

export default reducer;
