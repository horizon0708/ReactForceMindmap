import * as React from "react";
import CategoryItem from "./categoryItem";
import { Relation } from "../../pages/customData";
import { getOriginId, getCategory } from "../../state/graph/helper";

interface ListProps {
  categories: Relation[];
  onEdit: any;
  onDelete: any;
  onAdd: any;
  onEditStart: any;
  currentEdit: string;
}

const CategoryList: React.SFC<ListProps> = ({
  categories,
  onEditStart,
  onEdit,
  onDelete,
  currentEdit,
  onAdd
}) => {
  const originParentId = getOriginId(categories);

  const recursiveCategories = (
    categoryName: string,
    categories: Relation[]
  ): React.ReactElement<any> => {
    const category = getCategory(categories, categoryName);
    if (category) {
      return (
        <CategoryItem
          onAdd={onAdd}
          onEditStart={onEditStart}
          parent={category.parent}
          onEdit={onEdit}
          onDelete={onDelete}
          currentEdit={currentEdit}
        >
          {category.children.map(child => {
            return recursiveCategories(child, categories);
          })}
        </CategoryItem>
      );
    }
    return (
      <CategoryItem
        onAdd={onAdd}
        onEditStart={onEditStart}
        parent={categoryName}
        onEdit={onEdit}
        onDelete={onDelete}
        currentEdit={currentEdit}
      />
    );
  };

  return <div>{recursiveCategories(originParentId, categories)}</div>;
};

export default CategoryList;
