import * as React from "react";
import * as Modal from "react-modal";
import { GraphState } from '../state/graph/reducer';
import { EncodeJSON, decodeJSON } from '../state/graph/dataEncoder';
import { actionImportData } from '../state/graph/actions';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export interface LoadModalProps {
  dispatch: any
}

export default class LoadModal extends React.Component<LoadModalProps, any> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      json: null,
      encoded: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onLoad = (name:string) => (e:any) => {
    const {json, encoded} = this.state;
    if(name === "json") {
      if(json) {
        try{
        const data = JSON.parse(json);
        this.props.dispatch(actionImportData({data}))
        } catch(err){
          console.error("not a valid json!")
        }
      }
    }
    if(encoded) {
      decodeJSON(encoded).then((res: GraphState)=>{
        this.props.dispatch(actionImportData({data: res}));
      }).catch(err=> console.error("not valid encoded stuff"));
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  handleInput = (name:string) => (e:any) => {
    this.setState({[name]: e.target.value});
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const { json, encoded } = this.state;
    return (
      <div style={{ display: "inline" }}>
        <a
          className="button is-primary ml-half is-outlined is-info"
          onClick={this.openModal}
        >
        Import
        </a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ width: "500px" }}>
            <div  style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>JSON </h3>
              <a onClick={this.onLoad("json")} className="button is-primary">
              Load
              </a>
            </div>
            <input
              id="just-json"
              className="input"
              onChange={this.handleInput("json")}
              style={{overflowY: "scroll", marginTop: '0.5rem' }}
              value={json}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem"
              }}
            >
              <h3>Compressed Json </h3>
              <a onClick={this.onLoad("encoded")} className="button is-primary">
              Load
              </a>
            </div>
            <input
              id="compressed-json"
              className="input"
              onChange={this.handleInput("encoded")}
              style={{ overflowY: "scroll", marginTop: '0.5rem'}}
              value={encoded}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
