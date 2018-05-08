import * as React from "react";
import CategoryList from "../components/customData/categoryList";
import { connect } from "react-redux";
import { ApplicationState } from '../state/index';
import { GraphState } from '../state/graph/reducer';
import { Dispatch } from 'redux';
import { actionAddCategory, GraphAction } from '../state/graph/actions';
import { ReduxProps } from "../state/types";


export interface Relation {
  parent: string;
  children: string[];
  origin?: boolean;
}

interface Props {

}

type AllProps = Props & GraphState & ReduxProps

class CustomData extends React.Component<AllProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidUpdate(){
    console.log(this.props);
  }

  render() {
    const { categories, tags, skills, editing} = this.props.graph;
    return (
      <div>
      <CategoryList
        categories={categories}
        onAdd={this.onAdd}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
        currentEdit={editing}
        onEditStart={this.onEditStart}
      />
      <button onClick={()=>console.log(this.props)}>props</button>
      </div>

    );
  }

  onAdd = (parentName:string) => (event: any) => {
    this.props.dispatch(actionAddCategory({parent: parentName}));
  };

  onEditStart = () => {};

  
  onEdit = () => {

  }


  onDelete = () => {};
}


const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actionAddCategory }
}

export default connect(mapStateToProps)(CustomData);
