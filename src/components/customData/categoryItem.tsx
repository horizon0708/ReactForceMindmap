import * as React from "react";
import { Relation } from "../../mindMap/mindMapHelper";

interface CategoryProps {
  parent: string;
  currentEdit: string;
  onEditStart: any;
  onEdit: any;
  onAdd: any;
  onDelete: any;
}

const CategoryItem: React.SFC<CategoryProps> = ({
  parent,
  currentEdit,
  onEditStart,
  onEdit,
  onAdd,
  onDelete,
  children 
}) => {

  //https://stackoverflow.com/a/40795623
  //https://stackoverflow.com/a/44393231
  const renderEdit = () => {
    if(parent === currentEdit){
      return <form onSubmit={onEdit}>
        <input type="text" name={parent} placeholder={parent}/> 
        <button>Edit</button>
      </form>
    }
    return <div>{parent}</div>
  }

  return (
    <div>
      <div style={parentStyle}>
        {renderEdit()} 
        <button onClick={onEditStart(parent)}>edit</button>
        <button onClick={onDelete(parent)}>delete</button>
      </div>
      <div>{children}
        <button onClick={onAdd(parent)}>Add</button> 
      </div>
    </div>
  );
};

const parentStyle = {
  display: "flex"
};

export default CategoryItem;