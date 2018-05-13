import * as React from "react";
import * as Modal from "react-modal";
import { GraphState } from "../state/graph/reducer";
import { EncodeJSON } from "../state/graph/dataEncoder";
import { saveState } from '../state/localStorage';
import { Undoable } from "../state";

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

export interface ModalProps {
  buttonText: string;
  graph: Undoable<GraphState>;
}

export default class SaveModal extends React.Component<ModalProps, any> {
  constructor() {
    super();

    this.state = {
      client: false,
      modalIsOpen: false,
      json: null,
      encoded: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({client: true});
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    const graph= this.props.graph.present;
    console.log(graph);
    if (graph) {
      this.setState({ json: JSON.stringify(graph) });
      EncodeJSON(graph)
        .then(res => this.setState({ encoded: res }))
        .catch(err =>
          this.setState({
            encoded: "Sorry there was an error in compressing JSON"
          })
        );
    }
  }

  onCopy = (target: string) => (e: any) => {
    const copyTextarea: HTMLInputElement = document.querySelector(target);
    if (copyTextarea) {
      copyTextarea.focus();
      copyTextarea.select();
      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    }
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  saveToLocalStorage = () => {
    const graph= this.props.graph.present;
    saveState({graph});
  }

  render() {
    const { children, buttonText } = this.props;
    const { client,json, encoded } = this.state;
    return (
      client? <div style={{ display: "inline" }}>
        <a
          className="button is-primary ml-half is-outlined is-info"
          onClick={this.openModal}
        >
          {buttonText}
        </a>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ width: "500px" }}>
            <div  style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>JSON ({encoded? json.length : null}characters)</h3>
              <a onClick={this.onCopy("#just-json")} className="button is-primary">
                Copy to clipboard
              </a>
            </div>
            <input
            readOnly
              id="just-json"
              className="input"
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
              <h3>Compressed Json ({encoded? encoded.length : null}characters)</h3>
              <a onClick={this.onCopy("#compressed-json")} className="button is-primary">
                Copy to clipboard
              </a>
            </div>
            <input
            readOnly
              id="compressed-json"
              className="input"
              style={{ overflowY: "scroll", marginTop: '0.5rem'}}
              value={encoded}
            />
          </div>
          {/* <a style={{marginTop: '1rem', textAlign: 'right'}} onClick={this.saveToLocalStorage}className="button is-primary">Save to local storage</a> */}
        </Modal>
      </div>: null

    )
  }
}
