import * as React from "react";
import { Relation } from "../../mindMap/mindMapHelper";
import { UIState } from "../../state/graph/reducer";
import * as FA from "react-fontawesome";
import { getTagColor } from '../../state/graphUI/helper';

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
  tagColorMap: any;
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
  tags,
  tagColorMap,
}) => {
  //https://stackoverflow.com/a/40795623
  //https://stackoverflow.com/a/44393231
  const renderEdit = () => {
    if (parent === currentEdit) {
      return (
        <form onSubmit={onSubmit(onEdit)} style={{display: 'flex'}}>
          <input style={{display: 'inline'}} className="input" type="text" name="node" placeholder={parent} />
          <button style={{border: "none", background:"none", fontSize: '1.2rem'}} className="category-icon">
            <FA name="pencil" />
          </button>
        </form>
      );
    }
    return <p>{parent}</p>;
  };

  const onSubmit = (fn: any) => (event: any) => {
    event.preventDefault();
    const item = event.target.node.value;
    fn(parent, item);
  };

  const renderTags = () => {
    return tags
      ? tags.map((tag,i) => {
          return <span key={tag + i} style={{backgroundColor: getTagColor(tagColorMap, tag), fontWeight: 400}} className="tag ml-half">{tag}</span>;
        })
      : null;
  };

  return (
    <div >
      <div className="category-parent">
        {renderEdit()}
        {parent === currentEdit ? null : (
          <a onClick={onEditStart(parent)}>
            <FA className="ml-half category-icon" name="pencil" />
          </a>
        )}
        {origin ? null : <a className="ml-half category-icon" onClick={onDelete(parent)}><FA name="trash" /></a>}
        {renderTags()}
        {!tags.includes(currentTag) && UIstate === UIState.TagAdd ? (
          <button className="ml-half" onClick={onAddToTag(parent)}>
            <FA name="plus" /> Add to {currentTag}
          </button>
        ) : null}
      </div>
      {isOpen ? (
        <div className="category-children">
          {children}
          <a className="category-icon"onClick={onAdd(parent)}><FA name="plus" /> Add a node</a>
        </div>
      ) : null}{" "}
    </div>
  );
};



const itemStyle = {
  marginLeft: "20px",
};

export default CategoryItem;
