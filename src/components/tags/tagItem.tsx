import * as React from "react";
import * as FA from "react-fontawesome";

interface Props {
  name: string;
  parent: string;
  onDelete: any;
  color:any;
}

const TagItem: React.SFC<Props> = ({ name, parent, onDelete ,color}) => {
  return (
    <span style={{backgroundColor: color}} className="tag mr-half has-text-grey">
      {name}{" "}
      <a className="ml-half" onClick={onDelete(parent, name)}>
        <FA className="has-text-grey" name="times" />{" "}
      </a>
    </span>
  );
};

export default TagItem;
