
import * as React from "react";

interface Props {
  name: string;
  parent: string;
  onDelete: any;
}


const TagItem: React.SFC<Props> = ({name, parent, onDelete}) => {
  return <span className="tag mr-half">{name} <a onClick={onDelete(parent, name)}>x</a></span>;
}

export default TagItem