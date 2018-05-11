import * as React from "react";
import { Relation } from "../customData/index";
import TagItem from "./tagItem";
import { UIState } from "../../state/graph/reducer";
import * as FA from "react-fontawesome";

export interface TagGroupProps {
  tag: Relation;
  onParentEdit: any;
  onParentEditStart: any;
  onParentDelete: any;
  onChildAdd: any;
  onChildAddEnd: any;
  onChildDelete: any;
  currentTag: string;
  UIstate: UIState;
}

const TagGroup: React.SFC<TagGroupProps> = ({
  currentTag,
  tag,
  onParentEditStart,
  onParentEdit,
  onParentDelete,
  onChildAdd,
  onChildDelete,
  onChildAddEnd,
  UIstate
}) => {
  const { parent, children } = tag;

  const renderEdit = () => {
    if (parent === currentTag && UIstate === UIState.Normal) {
      return (
        <form onSubmit={onSubmit(onParentEdit)}>
          <input type="text" name="tag" placeholder={parent} />
          <button>Edit</button>
        </form>
      );
    }
    return <div>{parent}</div>;
  };

  const onSubmit = (fn: any) => (e: any) => {
    e.preventDefault();
    const item = e.target.tag.value;
    if (item) {
      console.log(fn(parent, item));
      fn(parent, item);
    }
  };
  return (
    <div className="tag-container">
      <div className="tag-parent">
        {renderEdit()}
        
        
        {parent === currentTag && UIstate === UIState.Normal ? null : (
          <a className="category-icon ml-half" onClick={onParentEditStart(parent)}>
            <FA name="pencil" />
          </a>
        )}
        <a className="category-icon ml-half"  onClick={onParentDelete(parent)}><FA name="trash" /></a>
      </div>
      <div className="tag-children">
        {children.map(child => {
          return (
            <TagItem parent={parent} name={child} onDelete={onChildDelete} />
          );
        })}
      </div>
      <div className="tag-footer">
        {parent === currentTag && UIstate === UIState.TagAdd ? (
          <button onClick={onChildAddEnd()}>Stop Tagging!</button>
        ) : (
          <a onClick={onChildAdd(parent)}><FA name="plus"/> Tag nodes</a>
        )}
      </div>
    </div>
  );
};

export default TagGroup;
