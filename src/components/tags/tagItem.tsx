
import * as React from "react";

interface Props {
  name: string;
  parent: string;
  onDelete: any;
}


const TagItem: React.SFC<Props> = ({name, parent, onDelete}) => {
  return <span>{name} <button onClick={onDelete(parent, name)}>x</button></span>;
}

export default TagItem