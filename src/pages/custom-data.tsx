import * as React from 'react';
import Tags from '../components/tags';
import Categories from '../components/customData';
import { connect } from 'react-redux';
import { navigateTo } from 'gatsby-link';
import { EncodeJSON } from '../state/graph/dataEncoder';

class DataInput extends React.Component<any, any>{
  
  encodeAndSend =() =>{
    EncodeJSON(this.props.graph).then(res =>{
      navigateTo(`/?data=${res}`);
    }).catch(err=>{
      console.log("encoding error: could not get encoded JSON!")
    })
  } 
  
  render(){
    return(
      <div>
       <Categories/> 
        <Tags/>
        <button onClick={this.encodeAndSend}> create graph!</button>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph };
};

export default connect(mapStateToProps)(DataInput);
