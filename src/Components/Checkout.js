import React from 'react'
import {Modal, Container, Row, Button} from 'react-bootstrap'

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {ConvertUrlToFile} from './../Utility'
import { trackPromise } from 'react-promise-tracker';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './Checkout.scss'
import AddressForm from './AddressForm'

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
          paymentSuccess: false
        }
    }

    async onToken (token){ // On a successful tokenization request,
      console.log('Processing Details')
      const paymentData = {
        token,
        email: 'Daverock914@gmail.com',
        uuid: this.props.uuid,
        names: {...this.state.images},
        charge: {
          amount: this.props.uploadedPhotos.length*1000,
          currency: 'eur',
        },
        uploadedPhotos: this.props.uploadedPhotos.map(photo => photo.url),
        style: this.props.activeStyle,
        address:{
          lineOne: "lineOne",
          lineTwo: "lineTwo",
          city: 'Cork',
          country: "ireland"
        }
      };
      console.log(paymentData);
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

  handleSubmitAddress = (event) => {
      const form = event.currentTarget.parentNode;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

  handleSubmitpayment = (token) =>{
    console.log('Attempting To Charge Card')
    console.log(token)
    console.log('Processing')
    this.onToken(token)
    console.log('Done Processing')
    //this.stripeTokenHandler(token)
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
                        <h4>  Add Address </h4>
                    </Row>
                    <AddressForm showModal={this.state.showAddressModal} closeModal={()=> this.setState({showAddressModal: false})}/>
                    <hr/>
                    <Row>
                      <h5> Summary </h5>
                    </Row>
                    <Row>
                      <h7>
                        Number of Images : {this.props.uploadedPhotos.length}
                      </h7>
                    </Row>
                    <Row>
                    <h7>
                       Style Selected: {this.props.activeStyle.name}
                      </h7>
                    </Row>
                    <hr/>
                    <Row>
                    <StripeCheckout
                        token={this.handleSubmitpayment}
                        stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M"
                      />
                    </Row>
                    <Row>
                      <Button onClick={this.handleTestCheckout}>
                      </Button>
                    </Row>
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