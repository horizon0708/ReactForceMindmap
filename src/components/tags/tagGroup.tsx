import * as React from "react";
import { Relation } from "../customData/index";
import TagItem from "./tagItem";
import { UIState } from "../../state/graph/reducer";
import * as FA from "react-fontawesome";
import { darker } from '../../state/graphUI/helper';

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
  color: string;
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
  UIstate,
  color
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
    return <div style={{color: 'white'}}>{parent}</div>;
  };

  const onSubmit = (fn: any) => (e: any) => {
    e.preventDefault();
    const item = e.target.tag.value;
      fn(parent, item);
  };
  return (
    <div style={{borderColor: color, borderWidth: '2px', borderStyle: "solid"}} className="tag-container">
      <div style={{backgroundColor: color}} className="tag-parent">
        {renderEdit()}
        <div>
        {parent === currentTag && UIstate === UIState.Normal ? null : (
          <a style={{color: "white"}} className="category-icon ml-half" onClick={onParentEditStart(parent)}>
            <FA name="pencil" />
          </a>
        )}
        <a style={{color: "white"}} className="category-icon ml-half"  onClick={onParentDelete(parent)}><FA name="trash" /></a>
          </div> 
        
      </div>
      <div className="tag-children">
        {children.map((child,i) => {
          return (
            <TagItem key={child+i} color={color} parent={parent} name={child} onDelete={onChildDelete} />
          );
        })}
      </div>
      <div className="tag-footer">
        {parent === currentTag && UIstate === UIState.TagAdd ? (
          <a style={{color: darker(color)}} onClick={onChildAddEnd()}><FA name="stop-circle"/>   Stop Tagging!</a>
        ) : (
          <a style={{color: darker(color)}} onClick={onChildAdd(parent)}><FA name="plus"/>   Add nodes to {parent}</a>
        )}
      </div>
    </div>
  );
};

export default TagGroup;
