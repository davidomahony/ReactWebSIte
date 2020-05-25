import React from 'react'
import {Modal, Container, Row, Button, Toast} from 'react-bootstrap'

import StripeCheckout from 'react-stripe-checkout';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './Checkout.scss'
import AddressForm from './AddressForm'
import './Checkout.scss'

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddressModal: false,
          uuid: '',
          images: [],
          showSpinner: false,
          showPaymentModal: false,
          resultFromPayment: "",
          paymentSuccess: false,
          address: {
            email: '',
            fullName: '',
            address: '',
            address2: '',
            city: '',
            postCode: '',
            country: ''
          },
          addressUpdated: false,
          showCheckoutHelp : this.props.uploadedPhotos.length === 0 || !this.state.addressUpdated,
          helpInfo: this.props.uploadedPhotos.length === 0 ? "Please add some photos before you can check out!" : 
          !this.state.addressUpdated ? "Please update address information before you check out" : "",
          showToast: false
        }
    }

    async onToken (token){ // On a successful tokenization request,
      console.log('Processing Details')
      const paymentData = {
        token,
        email: this.state.address.email,
        uuid: this.props.uuid,
        names: {...this.state.images},
        charge: {
          amount: this.props.uploadedPhotos.length*1000,
          currency: 'eur',
        },
        uploadedPhotos: this.props.uploadedPhotos.map(photo => photo.url),
        style: this.props.activeStyle,
        address: this.state.address
      };
      console.log('Attempting Communication with Stripe')
      const response = await fetch('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/processOrderCompletion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)}).then(r => r.json())
        .then(result => 
        {
          try {
            if (result.message === 'Charge processed succesfully!')
            {
              // success
              this.setState({showPaymentModal: true,
                paymentSuccess: true
               })
            }
            else
            {
              this.setState({showPaymentModal: true,
                paymentSuccess: false,
                resultFromPayment: result.error })
              console.log(result)
            }
          } catch (error) {
            console.log(result)
            this.setState({showPaymentModal: true,
              paymentSuccess: false,
              resultFromPayment: result.error })
          }
        });
      console.log('Response Recieved')
    }

  handleSubmitpayment = (token) =>{
    console.log('Attempting To Charge Card')
    this.onToken(token)
    console.log('Done Processing')
  }

  displayResultFromPayment(){
    return(
      <Modal show={this.state.showPaymentModal} o>
        <Modal.Header>
         <Modal.Title>{this.state.paymentSuccess ? "Payment Successful" : "Payment Failed"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.paymentSuccess ? "Success info" : "Failure Info"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({showPaymentModal: false})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  AddressSubmitted = (value) =>{
    let tempAddress = this.state.address;
    tempAddress.address = value.address;
    tempAddress.address2 = value.address2;
    tempAddress.city = value.city;
    tempAddress.email = value.email;
    tempAddress.fullName = value.fullName;
    tempAddress.postCode = value.postCode;
    this.setState({address: tempAddress, addressUpdated: true})
    console.log('Address Updated')
    console.log(this.state.address)
  }

  render() {
    return (
      <div>
           <SlidingPane
                isOpen={ this.props.showCheckout }
                title='Checkout'
                from='right'
                width='400px'
                onRequestClose={() => this.props.closeCheckout()}>
                <div>
                <hr/>
                  <Container>
                    <Row onClick={()=> this.setState({showAddressModal: true})}>
                        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                        <h4>  {this.state.addressUpdated ? this.state.address.fullName : 'Add Address'} </h4>
                    </Row>
                    <AddressForm AddressSubmitted={this.AddressSubmitted} showModal={this.state.showAddressModal} closeModal={()=> this.setState({showAddressModal: false})}/>
                    <hr/>
                    <Row>
                      <h5> Summary </h5>
                    </Row>
                    <Row>
                      <div className="infoRow">
                        <div className="left">
                        <h7>
                          Photos Added: 
                        </h7>
                        </div>
                        <div className="right">
                          {this.props.uploadedPhotos.length}
                        </div>
                      </div>
                    </Row>
                    <Row>
                    <div className="infoRow">
                        <div className="left">
                          <h7>
                            Style Selected:
                          </h7>
                        </div>
                        <div className="right">
                          {this.props.activeStyle.name}
                        </div>
                      </div>
                    </Row>
                    <Row>
                    <div className="infoRow">
                        <div className="left">
                          <h7>
                            Delivery:
                          </h7>
                        </div>
                        <div className="right">
                           $10
                        </div>
                      </div>
                    </Row>
                    <Row>
                    <div className="infoRow">
                        <div className="left">
                          <h7>
                            Total:
                          </h7>
                        </div>
                        <div className="right">
                           ${(this.props.uploadedPhotos.length * 10) + 10}
                        </div>
                      </div>
                    </Row>
                    <hr/>
                    <Row>
                      {this.state.showCheckoutHelp ? 
                      <Button onClick={() => this.setState({showToast: true})}>
                        Confirm / Pay
                      </Button> :
                      <StripeCheckout
                          token={this.handleSubmitpayment}
                          stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M">
                          <Button disabled={!this.state.addressUpdated}>
                            Confirm / Pay
                          </Button>
                      </StripeCheckout>}
                    </Row>
                    <Toast autohide={true} delay={1500} 
                        onClose={() => this.setState({showToast: false})} 
                        show={this.state.showToast}>
                      <Toast.Header closeButton={true}>
                        Checkout Info
                      </Toast.Header>
                      {this.state.helpInfo}
                    </Toast>
                  </Container>
                </div>
            </SlidingPane>
            {
              this.displayResultFromPayment()
            }
      </div>
    )
  }
}

export default Checkout