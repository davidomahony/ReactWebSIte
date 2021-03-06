import React from 'react'
import {Modal, Container, Row, Button, Toast} from 'react-bootstrap'

import StripeCheckout from 'react-stripe-checkout';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './Checkout.scss'

import AddressForm from './AddressForm'
import PaymentCompleteModal from './PaymentCompleteModal'
import OrderInformation from './OrderInformation'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Checkout.scss'

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddressModal: false,
          uuid: '',
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
          showToast: false
        }
    }

    async onToken (token){ 
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
        uploadedPhotos: this.props.uploadedPhotos.map(photo => photo.fileStackUrl),
        cropDetails: this.props.uploadedPhotos.map(photo => photo.isStandardCrop ? "Standard" : JSON.stringify(photo.cropDetails)),
        style: this.props.activeStyle,
        address: this.state.address
      };
      console.log(paymentData);
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
  }

  checkoutHelpInfo(){
    return (this.props.uploadedPhotos.length === 0 ? "Please add some photos before you can check out!" : 
    !this.state.addressUpdated ? "Please update address information before you check out" : "")
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
                    <OrderInformation activeStyle={this.props.activeStyle} uploadedPhotos={this.props.uploadedPhotos}/>
                    <hr/>
                    <Row>
                      {this.props.uploadedPhotos.length === 0 || !this.state.addressUpdated ? 
                      <Button onClick={() => toast.info(this.checkoutHelpInfo())}>
                        Confirm / Pay
                      </Button> :
                      <StripeCheckout
                          token={this.handleSubmitpayment}
                          stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M">
                          <Button>
                            Confirm / Pay
                          </Button>
                      </StripeCheckout>}
                    </Row>
                  </Container>
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
                  <ToastContainer />
            </SlidingPane>
            <PaymentCompleteModal show={this.state.showPaymentModal} 
              success={this.state.paymentSuccess} 
              hidePaymentCompleteModal={() => this.state({showPaymentModal: false})} 
              uploadedPhotos={this.props.uploadedPhotos}/>
      </div>
    )
  }
}

export default Checkout