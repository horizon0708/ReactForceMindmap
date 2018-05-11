import * as React from "react";
import { Relation } from "../customData/index";
import TagItem from "./tagItem";
import { UIState } from '../../state/graph/reducer';

export interface TagGroupProps {
  tag: Relation;
  onParentEdit: any;
  onParentEditStart: any;
  onParentDelete: any;
  onChildAdd: any;
  onChildAddEnd:any;
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
      console.log(fn(parent,item))
      fn(parent, item);
    }
  };
  return (
    <div>
      <div>
        {renderEdit()}
        {parent === currentTag && UIstate === UIState.Normal? null : (
          <button onClick={onParentEditStart(parent)}>Edit</button>
        )}
        <button onClick={onParentDelete(parent)}>Delete</button>
      </div>
      <div>
        {parent === currentTag && UIstate === UIState.TagAdd ? 
           <button onClick={onChildAddEnd()}>Stop Tagging!</button>
          : <button onClick={onChildAdd(parent)}>Tag nodes</button>}
        {children.map(child => {
          return <TagItem parent={parent} name={child} onDelete={onChildDelete} />;
        })}
      </div>
    </div>
  );
};

export default TagGroup;
