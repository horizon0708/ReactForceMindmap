import { Relation } from "../../pages/customData";

export function isDuplicate(id: string, skills: any[]): boolean {}

// Skills CRUD
export function updateSkill(skills: any[], id: string, skill?: number): any[] {}

export function createSkill(skills: any[], id: string, skill?: number = 5) {}

export function deleteSkill(skills: any[], id: string): any[] {
  return skills.filter(skill => skill[0] !== name);
}

export function getSkill(skills: any[], id: string): number | null {}

// Tags CRUD

export function createTag(tagName: string) {}

export function getTags(tags: Relation[], childName: string): string | null {}

export function updateTag(tags: Relation[], newChildren: string[]) {}

export function deleteTag(tags: Relation[], tagName: string): Relation[] {
  return tags.map(tag => {
    return {
      parent: tag.parent,
      children: tag.children.filter(child => child !== name)
    };
  });
}

// heirachy CURD

export function createCategory(
  categories: Relation[],
  parentName: string,
  name: string
): Relation[] | null {
  const parent = categories.find(category => category.parent === parentName);
  if (parent) {
    return categories.concat({
      parent: name,
      children: []
    }).map(category => {
      if (category.parent === parentName) {
        return {
          parent: category.parent,
          children: category.children.concat(name)
        };
      }
      return {
        parent: category.parent,
        children: category.children
      };
    });
  }
  console.error(`Parent ${parentName} was not found for ${name}.`);
  return null;
}

export function addChild(
  categories: Relation[],
  parentName: string,
  name: string
): Relation | null {
  const parent = categories.find(category => category.parent === parentName);
  if (parent) {
    const output = Object.assign({}, parent);
    output.children.push(name);
    return output;
  }
  console.error(`AddChild failed ${parentName} not found`);
  return parent;
}

// need to delete recursively
// find tags and skills and delete too
export function deleteCategory(
  categories: Relation[],
  tags: Relation[],
  skills: any[],
  name: string
) {
  const children = _deleteCat(categories, tags, skills, name);
  if (children.length > 0) {
    children.forEach(child => _deleteCat(categories, tags, skills, child));
  }
}

function _deleteCat(
  categories: Relation[],
  tags: Relation[],
  skills: any[],
  name: string
): string[] {
  tags = deleteTag(tags, name);
  skills = deleteSkill(skills, name);
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
) {}

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
