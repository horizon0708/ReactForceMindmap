import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../state/index';
import { EncodeJSON } from '../../state/graph/dataEncoder';
import { navigateTo } from 'gatsby-link';

class Workbar extends React.Component<any, any> {
  encodeAndSend =() =>{
    EncodeJSON(this.props.graph).then(res =>{
      navigateTo(`/?data=${res}`);
    }).catch(err=>{
      console.log("encoding error: could not get encoded JSON!")
    })
  } 
  render(){
    return <div className="container is-marginless">
       <a className="button is-primary">Generate Graph!</a>
       <a className="button is-info is-outlined">Undo</a>
       <a className="button is-info is-outlined">Rndo</a>
       <a className="button is-info is-outlined">Clear All</a>
    </div>
  }
}


const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph };
};

export default connect(mapStateToProps)(Workbar);
