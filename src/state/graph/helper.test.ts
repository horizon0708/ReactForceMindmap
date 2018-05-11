import * as h from "./helper";
import {
  nameAndSkills,
  langTags,
  langRelations
} from "../../mindMap/sampleData";
import {
  createTagParent,
  updateTagParent,
  deleteTagChild,
  updateCategory
} from "./helper";

describe("Skill", () => {
  const skills = nameAndSkills;
  test("update skill", () => {
    const res = h.updateSkill(skills, "JavaScript", "js", 4);
    expect(res.length).toBe(skills.length);
    expect(res.findIndex(res => res[0] === "JavaScript")).toBe(-1);
    expect(res.findIndex(res => res[0] === "js")).toBeGreaterThan(-1);
    expect(skills).not.toBe(res);
  });

  test("createSkill", () => {
    const res = h.createSkill(skills, "new skill");
    expect(res.length).toBe(skills.length + 1);
    expect(res.findIndex(res => res[0] === "new skill")).toBeGreaterThan(-1);
    expect(res).not.toBe(skills);
  });

  test("delete skill", () => {
    const res = h.deleteSkill(skills, "JavaScript");
    expect(res.length).toBe(skills.length - 1);
    expect(res.findIndex(res => res[0] === "JavaScript")).toBe(-1);
    expect(res).not.toBe(skills);
  });
});

describe("Tag CRUD", () => {
  const tags = langTags;
  test("create parent tag", () => {
    const res = h.createTagParent(tags, "new tag");
    expect(res.length).toBe(tags.length + 1);
    expect(res.findIndex(res => res.parent === "new tag")).toBeGreaterThan(-1);
    expect(res).not.toBe(tags);
  });

  test("create tag child", () => {
    const res = h.createTagChild(tags, "Testing", "ava");
    expect(res.length).toBe(tags.length);
    expect(res.findIndex(res => res.children.includes("ava"))).toBeGreaterThan(
      -1
    );
    expect(res.findIndex(res => res.children.includes("stuff"))).toBe(-1);

    //make sure we didn't mutate the original tags array
    expect(tags.findIndex(res => res.children.includes("ava"))).toBe(-1);
    expect(res).not.toBe(tags);
  });

  test("update tag parent", () => {
    const res = h.updateTagParent(tags, "Testing", "Pesto");
    expect(res.length).toBe(tags.length);
    expect(res.findIndex(res => res.parent === "Pesto")).toBeGreaterThan(-1);
    expect(res.findIndex(res => res.parent === "Testing")).toBe(-1);
    expect(res).not.toBe(tags);
  });

  test("update tag children", () => {
    const res = h.updateTagchild(tags, "Testing", "Chai", "Latte");
    expect(res).not.toBe(tags);
    expect(
      res.findIndex(res => res.children.includes("Latte"))
    ).toBeGreaterThan(-1);
    expect(tags.findIndex(res => res.children.includes("Latte"))).toBe(-1);
    expect(res.findIndex(res => res.children.includes("Chai"))).toBe(-1);
  });

  test("delete tag parent", () => {
    const res = h.deleteTagParent(tags, "Testing");
    expect(res).not.toBe(tags);
    expect(res.length).toBe(tags.length - 1);
    expect(res.findIndex(res => res.parent === "Testing")).toBe(-1);
  });

  test("delete tag children", () => {
    const res = h.deleteTagChild(tags, "Testing", "Chai");
    expect(res).not.toBe(tags);
    expect(res.findIndex(res => res.children.includes("Chai"))).toBe(-1);
    expect(res.findIndex(res => res.parent === "Testing")).toBeGreaterThan(-1);
  });
});

describe("category CRUD", () => {
  const categories = langRelations;

  test("create category", () => {
    const res = h.createCategory(categories, "Web Dev", "new node");
    expect(res).not.toBe(categories);
    expect(res.findIndex(r => r.parent === "new node")).toBeGreaterThan(-1);
    expect(res.find(r => r.children.includes("new node")).parent).toBe(
      "Web Dev"
    );
  });

  test("delete category: get correct names to delete", () => {
    const res = h.getParentsToDeleteRecursively(categories, "React");
  });

  test("delete category", () => {
    const res = h.deleteCategory(categories, "FrontEnd");
    expect(res).not.toBe(categories);
    expect(res.length).toBe(2);
    expect(res.findIndex(r => r.children.includes("FrontEnd"))).toBe(-1);
  });

  test("update category", () => {
    const res = h.updateCategory(categories, "React", "Vue");
    expect(res).not.toBe(categories);
    expect(res.length).toBe(categories.length);
    expect(res.findIndex(r => r.parent === "React")).toBe(-1);
    expect(res.findIndex(r => r.parent === "Vue")).toBeGreaterThan(-1);
    expect(res.findIndex(r => r.children.includes("React"))).toBe(-1);
    expect(res.findIndex(r => r.children.includes("Vue"))).toBeGreaterThan(-1);
  });
});
