import * as React from "react";
import Tags from "../components/tags";
import Categories from "../components/customData";
import { connect } from "react-redux";
import { navigateTo } from "gatsby-link";
import { EncodeJSON } from "../state/graph/dataEncoder";
import Workbar from "../components/workbar";
import * as FA from "react-fontawesome";
import { actionUpdateTitle } from '../state/graph/actions';

class DataInput extends React.Component<any, any> {
  state = {
    client: false,
    editingTitle: false
  };

  componentDidMount() {
    this.setState({ client: true });
  }

  renderTitle = () => {
    const { editingTitle } = this.state;
    const { title } = this.props.graph.present;
    if (editingTitle) {
      return (
        <form style={{marginTop: '1rem'}}onSubmit={this.onEdit}>
          <input
            style={{ display: "inline", width: '500px'}}
            className="input"
            type="text"
            name="title"
            placeholder={}
          />
          <button
            style={{ border: "none", background: "none", fontSize: "1.5rem" }}
            className="category-icon"
          />
          <FA name="pencil" />{" "}
        </form>
      );
    }
    return <div style={{display: 'flex', marginTop: '1rem'}}>
<p className="title is-3 is-marginless">{title}</p>
     <a className="category-icon" style={{marginLeft:'1rem',fontSize: '1.2rem'}} onClick={this.onEditStart}><FA  className="ml-1" name="pencil" /></a>
      </div>
  };

  onEdit = (e:any) => {
    e.preventDefault();
    const name = e.target.title.value ? e.target.title.value : this.props.graph.present.title;
    this.props.dispatch(actionUpdateTitle({name}));
    this.setState({editingTitle: false});
  };

  onEditStart = () => {
    this.setState({ editingTitle: true });
  };

  render() {
    return this.state.client ? (
      <div style={{ marginTop: "1rem" }}>
        <Workbar />
        {this.renderTitle()}
        <div style={{ paddingTop: "1rem" }} className="columns">
          <div className="column is-two-thirds">
            <Categories />
          </div>
          <div className="column is-one-third">
            <Tags />
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph };
};

export default connect(mapStateToProps)(DataInput);
