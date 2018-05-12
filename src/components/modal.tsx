import * as React from "react";
import * as Modal from "react-modal";
import { GraphState } from "../state/graph/reducer";
import { EncodeJSON } from "../state/graph/dataEncoder";

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
  graph: GraphState;
}

export default class SaveModal extends React.Component<any, any> {
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

  openModal() {
    this.setState({ modalIsOpen: true });
    const { graph } = this.props;
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

  render() {
    const { children, buttonText } = this.props;
    const { json, encoded } = this.state;
    return (
      <div style={{ display: "inline" }}>
        <a
          className="button is-primary ml-half is-outlined is-info"
          onClick={this.openModal}
        >
          {buttonText}
        </a>
        <Modal
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
              id="compressed-json"
              className="input"
              style={{ overflowY: "scroll", marginTop: '0.5rem'}}
              value={encoded}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
