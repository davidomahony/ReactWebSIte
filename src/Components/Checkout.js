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
import cookie from 'react-cookies'

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
          showToast: false,
          updateInformation: ''
        }
    }

    componentDidMount(){
      let tempAddress = this.state.address;
      tempAddress.address = this.CheckValueIsNotNullOrUndefined(cookie.load("address"))
      tempAddress.address2 = this.CheckValueIsNotNullOrUndefined(cookie.load("address2"))
      tempAddress.city = this.CheckValueIsNotNullOrUndefined(cookie.load("city"));
      tempAddress.email = this.CheckValueIsNotNullOrUndefined(cookie.load("email"));
      tempAddress.fullName = this.CheckValueIsNotNullOrUndefined(cookie.load("fullName"));
      tempAddress.postCode = this.CheckValueIsNotNullOrUndefined(cookie.load("postcode"));
      tempAddress.country = this.CheckValueIsNotNullOrUndefined(cookie.load("country"));
      this.setState({address: tempAddress, addressUpdated: true})
    }

    CheckValueIsNotNullOrUndefined(inputString){
      return inputString === undefined || inputString === null ? "" : inputString
    }

    async onToken (token){ 
      console.log('Processing Details')

      var info = {
        email: this.state.address.email,
        uuid: this.props.uuid,
        names: {...this.state.images},
        charge: {
          amount: this.props.uploadedPhotos.length < 3 ? 39990 : 39990 + (((this.props.uploadedPhotos.length - 3) * 10 ) *1000),
          currency: 'eur',
        },
        uploadedPhotos: this.props.uploadedPhotos.map(photo => photo.fileStackUrl),
        cropDetails: this.props.uploadedPhotos.map(photo => photo.isStandardCrop ? "Standard" : JSON.stringify(photo.cropDetails)),
        style: this.props.activeStyle,
        address: this.state.address
      };

      this.setState({updateInformation: info})
      
      const paymentData = { token, ...info };
      console.log(paymentData);
      const response = await fetch('https://u5xi7cvkj9.execute-api.eu-west-1.amazonaws.com/dev/processOrderCompletion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)}).then(r => r.json())
        .then(result => 
        {
          try {
            console.log(result)
            this.setState({showPaymentModal: true, paymentSuccess: result.message === 'Charge processed succesfully!'})
          } 
          catch (error) {
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
    tempAddress.country = value.country;
    this.setState({address: tempAddress, addressUpdated: value.address !== "" || value.address !== null || value.address !== undefined})
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
                        <h4>  {this.state.address.fullName !== undefined && this.state.address.fullName !== "" && this.state.address.fullName !== null?
                         `${this.state.address.fullName}, ${this.state.address.city}` : 'Add Address'} </h4>
                    </Row>
                    <AddressForm AddressSubmitted={this.AddressSubmitted} showModal={this.state.showAddressModal} closeModal={()=> this.setState({showAddressModal: false})}/>
                    <hr/>
                    <OrderInformation activeStyle={this.props.activeStyle} uploadedPhotos={this.props.uploadedPhotos}/>
                    <hr/>
                    <Row>
                      {this.props.uploadedPhotos.length === 0 || !this.state.addressUpdated ? 
                      <Button onClick={() => toast.info(this.checkoutHelpInfo())}>
                        Confirm / Pay
                      </Button> : this.props.uploadedPhotos.length < 3 ? 
                      <Button onClick={() => toast.warn("Minimum order is 3 tiles")}>
                      Confirm / Pay
                      </Button>:
                      <StripeCheckout
                          token={this.handleSubmitpayment}
                          stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M">
                          <Button>
                            Confirm / Pay
                          </Button>
                      </StripeCheckout>}
                    </Row>
                    <hr/>
                    <div>
                      **Minimum order of 3 tiles for €39.99. Each additional tile is €10 there after
                    </div>
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
            <PaymentCompleteModal information={this.state.updateInformation} show={this.state.showPaymentModal} 
              success={this.state.paymentSuccess} 
              hidePaymentCompleteModal={() => this.setState({showPaymentModal: false})} 
              uploadedPhotos={this.props.uploadedPhotos}/>
      </div>
    )
  }
}

export default Checkout