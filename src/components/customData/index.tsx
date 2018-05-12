import * as React from "react";
import CategoryList from "./categoryList";
import { connect } from "react-redux";
import { ApplicationState } from "../../state/index";
import { GraphState, UIState } from "../../state/graph/reducer";
import { Dispatch } from "redux";
import {
  actionAddCategory,
  GraphAction,
  actionDeleteCategory,
  actionUpdateCategory,
  actionCurrentEdit,
  actionAddTagChild
} from "../../state/graph/actions";
import { ReduxProps } from "../../state/types";
import { ListProps } from "./categoryList";
import { getCategory, getCategoryTags, getOriginId } from '../../state/graph/helper';
import { CategoryProps } from "./categoryItem";
import CategoryItem from './categoryItem';
import { getTagColor } from '../../state/graphUI/helper';

export interface Relation {
  parent: string;
  children: string[];
  isOpen?: boolean;
  origin?: boolean;
}

interface Props {}

type AllProps = Props & ApplicationState & ReduxProps;

class CustomData extends React.Component<AllProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  recursiveCategoryRender = (categoryName: string) : any => {
    const {
      categories,
      categoryTags,
      skills,
     
    } = this.props.graph; 
    const {
      currentTag,
      currentEdit,
      UIstate,
      tagColorMap
    } = this.props.graphUI;
    const category = getCategory(categories, categoryName);
    const { onAdd, onEdit, onDelete, onEditStart, onAddToTag } = this;
    if (category) {
      const { parent, isOpen, origin} = category
      const categoryProps: CategoryProps & {key: string} = {
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
          tags: getCategoryTags(categoryTags, category.parent),
          tagColorMap,
          key: parent
      }

      return (
        <CategoryItem {...categoryProps}>
          {category.children.map(child => {
            return this.recursiveCategoryRender(child);
          })}
        </CategoryItem>
      );
    }
      const defaultProps: CategoryProps  & {key: string} = {
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
          UIstate,
          tags: getCategoryTags(categoryTags, categoryName),
          tagColorMap,
          key: categoryName
      }
    return (
      <CategoryItem {...defaultProps}/>
    );
  };

  render() {
    const originParentId = getOriginId(this.props.graph.categories);
    return (
      <div>
        {this.recursiveCategoryRender(originParentId)}
      </div>
    );
  }

  onAddToTag = (name: string) => (event: any) => {
    this.props.dispatch(
      actionAddTagChild({ parentName: this.props.graphUI.currentTag, name })
    );
  };

  onAdd = (parentName: string) => (event: any) => {
    this.props.dispatch(actionAddCategory({ parent: parentName }));
  };

  onEditStart = (name: string) => (event: any) => {
    this.props.dispatch(actionCurrentEdit({ name }));
  };

  onEdit = (name: string, newName: string) => {
    newName
      ? this.props.dispatch(actionUpdateCategory({ name, newName }))
      : null;
    this.props.dispatch(actionCurrentEdit({ name: null }));
  };

  onDelete = (parentName: string) => (event: any) => {
    this.props.dispatch(actionDeleteCategory({ name: parentName }));
    this.props.dispatch(actionCurrentEdit({ name: null }));
  };
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph.present, graphUI: state.graphUI };
};

export default connect(mapStateToProps)(CustomData);
