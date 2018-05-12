import { Relation } from '../../components/customData/index';

// Skills CRUD
export function updateSkill(
  skills: any[],
  id: string,
  newId: string,
  skill: number
): any[] {
  const skillIndex = skills.findIndex(skill => skill[0] === id);
  const head = skills.slice(0, skillIndex);
  const tail = skills.slice(skillIndex + 1);
  return [...head, [newId, skill], ...tail];
}

export function createSkill(
  skills: any[],
  id: string,
  skill: number = 5
): any[] {
  return [...skills, [checkForSkillDuplicate(skills, id), skill]];
}

export function deleteSkill(skills: any[], id: string): any[] {
  return skills.filter(skill => skill[0] !== id);
}

export function getSkill(skills: any[], id: string): number  {
   const skill = skills.find(skill=> skill[0] === id);
  if(skill){
    return skill[1];
  }
  console.error(`skill ${id} was not found, returning 5 as default`);
  return 5;
}

function checkForSkillDuplicate(
  skills: any[],
  id: string,
  counter: number = 0
): string {
  const name = skills.find(skill => skill[0] === id);
  if (name) {
    counter++;
    const split = name[0].split("_");
    return checkForSkillDuplicate(skills, split[0] + "_" + counter, counter);
  }
  return id;
}

// Tags CRUD

export function createTagParent(tags: Relation[], tagName: string) {
  const uniqueName = checkForDuplicate(tagName, tags);
  return tags.concat({
    parent: uniqueName,
    children: []
  });
}
export function createTagChild(
  tags: Relation[],
  parentName: string,
  tagName: string
) {
  const parent = tags.find(tag => tag.parent === parentName);
  if (parent) {
    const parentIndex = tags.findIndex(tag => tag.parent === parentName);
    const newParent = Object.assign(
      {},
      {
        parent: parent.parent,
        children: parent.children.concat(tagName)
      }
    );
    const head = tags.slice(0, parentIndex);
    const tail = tags.slice(parentIndex + 1);
    return [...head, newParent, ...tail];
  }
  return tags;
}

// export function getTags(tags: Relation[], childName: string): string | null {}

export function updateTagParent(
  tags: Relation[],
  target: string,
  newName: string
) {
  const parent = tags.find(tag => tag.parent === target);
  if (parent) {
    const parentIndex = tags.findIndex(tag => tag.parent === target);
    const newParent = Object.assign(
      {},
      {
        parent: newName,
        children: [...parent.children]
      }
    );
    const head = tags.slice(0, parentIndex);
    const tail = tags.slice(parentIndex + 1);
    return [...head, newParent, ...tail];
  }
  return tags;
}

export function updateTagchild(
  tags: Relation[],
  parentName: string,
  target: string,
  newName: string
): Relation[] {
  const parent = tags.find(tag => tag.parent === parentName);
  if (parent) {
    const parentIndex = tags.findIndex(tag => tag.parent === parentName);
    const childIndex = parent.children.findIndex(tag => tag === target);
    if (childIndex > -1) {
      const head = parent.children.slice(0, childIndex);
      const tail = parent.children.slice(childIndex + 1);
      const newParent = Object.assign({}, parent);
      newParent.children = [...head, newName, ...tail];

      const tagHead = tags.slice(0, parentIndex);
      const tagTail = tags.slice(parentIndex + 1);
      return [...tagHead, newParent, ...tagTail];
    }
    return tags;
  }
  return tags;
}

/**
 * Invoked when we need to get rid of all the tags 
 * that was affected by changing category
 * becuase updateTagChild() returns the array if the target is not found, we can just iterate througth arrays and merge them teogether
 */
export function updateMultipleTagChild(
  tags: Relation[],
  target: string,
  newName: string
){
  if(tags.length > 0){
  return tags.map(tag => updateTagchild([tag], tag.parent, target, newName)).reduce((a,b)=>a.concat(b));
  }
  return tags;
}

export function deleteTagParent(tags: Relation[], tagName: string): Relation[] {
  return tags.filter(tag => tag.parent !== tagName);
}



export function deleteTagChild(
  tags: Relation[],
  parentName: string,
  tagName: string
): Relation[] {
  const parent = tags.find(tag => tag.parent === parentName);
  if (parent) {
    const parentIndex = tags.findIndex(tag => tag.parent === parentName);
    const childIndex = parent.children.findIndex(tag => tag === tagName);
    if (childIndex > -1) {
      const head = parent.children.slice(0, childIndex);
      const tail = parent.children.slice(childIndex + 1);
      const newParent = Object.assign({}, parent);
      newParent.children = [...head, ...tail];

      const tagHead = tags.slice(0, parentIndex);
      const tagTail = tags.slice(parentIndex + 1);
      return [...tagHead, newParent, ...tagTail];
    }
    return tags;
  }
  return tags;
}


export function deleteMultipleTagChild(
  tags: Relation[],
  target: string
){
  if(tags.length > 0){
    return tags.map(tag => deleteTagChild([tag], tag.parent, target)).reduce((a,b)=>a.concat(b));
  }
  return tags;
}
// heirachy CURD

export function createCategory(
  categories: Relation[],
  parentName: string,
  name: string
): Relation[] | null {
  const parent = categories.find(category => category.parent === parentName);
  if (parent) {
    return categories
      .concat({
        parent: name,
        children: [],
        isOpen: true
      })
      .map(category => {
        if (category.parent === parentName) {
          return Object.assign({}, category, {
            children: category.children.concat(name),
          });
        }
        return category;
      });
  }
  console.error(`Parent ${parentName} was not found for ${name}.`);
  return null;
}

export function checkForDuplicate(
  name: string,
  categories: Relation[],
  counter: number = 0
): string {
  const node = categories.find(category => category.parent === name);
  if (node) {
    counter++;
    const split = name.split("_");
    return checkForDuplicate(split[0] + "_" + counter, categories, counter);
  }
  return name;
}

// need to delete recursively
// find tags and skills and delete too
export function deleteCategory(categories: Relation[], name: string) {
  // need to elete from children
  const parents = getParentsToDeleteRecursively(categories, name);
  const result = categories.filter(
    category => !parents.includes(category.parent)
  );
  const parentIndex = categories.findIndex(category =>
    category.children.includes(name)
  );

  if (parentIndex > -1) {
    const childIndex = categories[parentIndex].children.findIndex(
      child => child === name
    );
    const childrenHead = categories[parentIndex].children.slice(0, childIndex);
    const childrenTail = categories[parentIndex].children.slice(childIndex + 1);
    const newChildren = [...childrenHead, ...childrenTail];
    const updatedCategory = Object.assign({},categories[parentIndex],{
      parent: categories[parentIndex].parent,
      children: newChildren
    });
    const parentHead = result.slice(0, parentIndex);
    const parentTail = result.slice(parentIndex + 1);

    return [...parentHead, updatedCategory, ...parentTail];
  }
  return result;
}

export function getParentsToDeleteRecursively(
  categories: Relation[],
  name: string,
  list: string[] = []
): string[] {
  const category = categories.find(category => category.parent === name);
  if (category) {
    category.children.forEach(child => {
      list.push(child);
      getParentsToDeleteRecursively(categories, child, list);
    });
  }
  return list.concat(name);
}

function _deleteCat(categories: Relation[], name: string): string[] {
  const category = categories.find(category => category.parent === name);
  if (category) {
    categories = categories.filter(category => category.parent !== name);
    return category.children;
  }
  return [];
}

export function updateCategory(
  categories: Relation[],
  name: string,
  newName: string
) {
  const category = categories.find(category => category.parent === name);
  if (category) {
    const categoryIndex = categories.findIndex(
      category => category.parent === name
    );
    const newCategory = Object.assign(
      {},
      category,
      {
        parent: newName,
        children: [...category.children]
      }
    );
    const head = categories.slice(0, categoryIndex);
    const tail = categories.slice(categoryIndex + 1);
    const afterParentUpdate = [...head, newCategory, ...tail];

    // we also need to update the child
    const parentIndex = afterParentUpdate.findIndex(category =>
      category.children.includes(name)
    );
    if(parentIndex > -1){
      const childIndex = categories[parentIndex].children.findIndex(
        child => child === name
      );
      const childrenHead = afterParentUpdate[parentIndex].children.slice(
        0,
        childIndex
      );
      const childrenTail = afterParentUpdate[parentIndex].children.slice(
        childIndex + 1
      );
      const newChildren = [...childrenHead, newName, ...childrenTail];
      const updatedCategory = Object.assign({}, categories[parentIndex], {
        children: newChildren
      });
      const parentHead = afterParentUpdate.slice(0, parentIndex);
      const parentTail = afterParentUpdate.slice(parentIndex + 1);
  
      return [...parentHead, updatedCategory, ...parentTail];
    }
    return afterParentUpdate;
  }
  return categories;
}

export function getCategory(
  categories: Relation[],
  name: string
): Relation | null {
  const result = categories.find(category => category.parent === name);
  return result ? result : null;
}

export function getOriginId(categories: Relation[]): string | null {
  const result = categories.find(category => category.origin);
  if (result) {
    return result.parent;
  }
  console.error("no origin set");
  return null;
}

export function updateCategoryTags(tags:Relation[]): Relation[]{
  if(tags.length>0){
    // get the list of children; 
    const children = tags.map(tag => tag.children).reduce((a,b)=> a.concat(b));
    const filteredChildren = Array.from(new Set(children));
    return filteredChildren.map(child => {
      const childsTag = tags.filter(tag => tag.children.includes(child)).map(tag=> tag.parent);
      return {
        parent: child,
        children: childsTag
      }
    })
  }
  return [];
}

export function getCategoryTags(categoryTags: Relation[], name:string): string[]{
  const categoryTag = categoryTags.find(tag => tag.parent === name);
  if(categoryTag){
    return categoryTag.children;
  }
  return [];
}
