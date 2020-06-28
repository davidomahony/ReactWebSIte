import React from 'react'
import {Modal, Button, ProgressBar} from 'react-bootstrap'


class PaymentCompleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {
    return (
        <Modal show={this.props.show}>
        <Modal.Header>
         <Modal.Title>{this.props.success ? "Payment Successful" : "Payment Failed"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please wait While the Images Are Uploaded
          {this.props.uploadedPhotos.map(p => {
              return (<div>
                  <ProgressBar animated now={p.uploadPercent} label={`${p.name} - % ${p.uploadPercent}`}/> 
                  <br/>
                </div>)
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.hidePaymentCompleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}



export default PaymentCompleteModal