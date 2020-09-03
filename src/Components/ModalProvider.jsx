import React from 'react'
import { Modal, Button} from 'react-bootstrap'

class ModalProvider extends React.Component {
    constructor(props) {
        super(props);
    }

  // These should probably be there own class but I am too lazy 
  FaqContent(){
    return(
      <div style={{ width: '100%' }}>
       FAQ Content
      </div>
    )
  }

  ContactUsContent(){
    return(
      <div style={{ width: '100%' }}>
        Contact us
      </div>
    )
  }

  GeneralContent(){
    return(
      <div style={{ width: '100%' }}>
       General
      </div>
    )
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal}>
            <Modal.Header>
                <Modal.Title>{this.props.modalToShow}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.modalToShow === 'FAQ' ? this.FaqContent() : this.props.modalToShow === 'ContactUs' ?this.ContactUsContent() : this.GeneralContent()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.closeModal}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalProvider