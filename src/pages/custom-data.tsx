import * as React from 'react';
import Tags from '../components/tags';
import Categories from '../components/customData';
import { connect } from 'react-redux';
import { navigateTo } from 'gatsby-link';
import { EncodeJSON } from '../state/graph/dataEncoder';

class DataInput extends React.Component<any, any>{
  
  
  
  render(){
    return(
      <div className="columns">
        <div></div>
        <div className="column is-two-thirds">
         <Categories/> 
        </div>
        <div className="column is-one-third">
        <Tags/>
        </div>
        <button onClick={this.encodeAndSend}> create graph!</button>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph };
};

export default connect(mapStateToProps)(DataInput);
