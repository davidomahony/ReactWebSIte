import React from 'react'
import {Modal, Button, ProgressBar} from 'react-bootstrap'


class PaymentCompleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    sendMissingInformation = async() => {
      if (this.props.uploadedPhotos.every(item => item.hasRecievedFileStackUrl))
      {
        var info = this.props.information;
        // maybe assemble a url which includes a crop 
        const response = await fetch('https://u5xi7cvkj9.execute-api.eu-west-1.amazonaws.com/dev/updateCheckoutInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(info)})        
        return true;
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
                  <ProgressBar animated now={p.uploadPercent} label={p.hasRecievedFileStackUrl ? "Complete" : `${p.name} - % ${p.uploadPercent}`}/> 
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