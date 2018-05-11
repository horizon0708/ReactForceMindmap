import * as React from "react";
import CategoryItem from "./categoryItem";
import { Relation } from "./index";
import { getOriginId, getCategory } from "../../state/graph/helper";
import { CategoryProps } from './categoryItem'
import { UIState } from '../../state/graph/reducer';

export interface ListProps {
  categories: Relation[];
  onEdit: any;
  onDelete: any;
  onAdd: any;
  onEditStart: any;
  currentEdit: string;
  currentTag: string;
  onAddToTag: any;
  tags: string[];
    UIstate: UIState;
}

const CategoryList: React.SFC<ListProps> = ({
  categories,
  onEditStart,
  onEdit,
  onDelete,
  currentEdit,
  onAdd,
  currentTag, 
    onAddToTag,
    UIstate,
    tags,
}) => {
  const originParentId = getOriginId(categories);

  const recursiveCategories = (
    categoryName: string,
    categories: Relation[]
  ): React.ReactElement<any> => {
    const category = getCategory(categories, categoryName);
      const { parent, isOpen, origin} = category
      const categoryProps: CategoryProps = {
        parent,
          onAdd,
          onEditStart,
          onEdit,
          onDelete,
          currentEdit,
          isOpen,
          origin,
          currentTag,
          onAddToTag,
          UIstate,
          tags,
      }

    if (category) {
      return (
        <CategoryItem {...categoryProps}>
          {category.children.map(child => {
            return recursiveCategories(child, categories);
          })}
        </CategoryItem>
      );
    }
      const defaultProps: CategoryProps = {
          onAdd,
          onEditStart,
          parent: categoryName,
          onEdit,
          onDelete,
          currentEdit,
          isOpen: true,
          origin: false,
          currentTag,
          onAddToTag,
          UIstate
      }
    return (
      <CategoryItem {...defaultProps}/>
    );
  };

  return <div>{recursiveCategories(originParentId, categories)}</div>;
};



export default CategoryList;
