import * as  React from 'react';
import * as Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export interface ModalProps {
  buttonText: string;
  onOpen: any;
}

export default class ReactModal extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      json: null,
      id: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    const {onOpen} = this.props;
    if(onOpen){
      onOpen();
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {children, buttonText } = this.props
    return (
      <div style={{display: 'inline'}}>
        <a className="button is-primary ml-half is-outlined is-info" onClick={this.openModal}>{buttonText}</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {children}
        </Modal>
      </div>
    );
  }
}
