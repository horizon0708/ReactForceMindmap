import * as React from "react";
import { Relation } from "../../mindMap/mindMapHelper";
import { UIState } from "../../state/graph/reducer";

export interface CategoryProps {
  parent: string;
  currentEdit: string;
  onEditStart: any;
  onEdit: any;
  onAdd: any;
  onAddToTag: any;
  currentTag: string;
  UIstate: UIState;
  onDelete: any;
  isOpen: boolean;
  origin: boolean | undefined;
  tags: string[];
}

const CategoryItem: React.SFC<CategoryProps> = ({
  parent,
  currentEdit,
  onEditStart,
  onEdit,
  onAdd,
  onAddToTag,
  currentTag,
  onDelete,
  children,
  isOpen,
  origin,
  UIstate,
  tags
}) => {
  //https://stackoverflow.com/a/40795623
  //https://stackoverflow.com/a/44393231
  const renderEdit = () => {
    if (parent === currentEdit) {
      return (
        <form onSubmit={onSubmit(onEdit)}>
          <input type="text" name="node" placeholder={parent} />
          <button>Edit</button>
        </form>
      );
    }
    return <div>{parent}</div>;
  };

  const onSubmit = (fn: any) => (event: any) => {
    event.preventDefault();
    const item = event.target.node.value;
    fn(parent, item);
  };

  const renderTags = () => {
    console.log(tags);
    return tags ? tags.map(tag => {
      return <span>{tag}</span>
    }): null;
  }

  return (
    <div style={itemStyle}>
      <div style={parentStyle}>
        {renderEdit()}
        {parent === currentEdit ? null : (
          <button onClick={onEditStart(parent)}>edit</button>
        )}
        {origin ? null : <button onClick={onDelete(parent)}>delete</button>}
        {renderTags()}
        {!tags.includes(currentTag) && UIstate === UIState.TagAdd ? (
        <button onClick={onAddToTag(parent)}>Add to {currentTag}</button>
      ) : null}
      </div>
      
      {isOpen ? (
        <div>
          {children}
          <button onClick={onAdd(parent)}>Add</button>
        </div>
      ) : null}{" "}
    </div>
  );
};

const parentStyle = {
  display: "flex"
};

const itemStyle = {
  marginLeft: "16px"
};

export default CategoryItem;
