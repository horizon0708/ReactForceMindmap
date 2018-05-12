import * as React from "react";
import Tags from "../components/tags";
import Categories from "../components/customData";
import { connect } from "react-redux";
import { navigateTo } from "gatsby-link";
import { EncodeJSON } from "../state/graph/dataEncoder";
import Workbar from '../components/workbar'



class DataInput extends React.Component<any, any> {
  render() {
    return (
      <div style={{marginTop: '1rem'}}>
        <Workbar></Workbar>
        <div style={{paddingTop: '1rem'}} className="columns">
          <div className="column is-two-thirds">
              <Categories />
          </div>
          <div className="column is-one-third">
            <Tags />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph };
};

export default connect(mapStateToProps)(DataInput);
