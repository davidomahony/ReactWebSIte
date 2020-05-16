import React from 'react'
import {Card, Navbar, Modal, Form, Container, Row, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {ConvertUrlToFile} from './../Utility'

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
          showSpinner: false
        }
    }

    async onToken (token){ // On a successful tokenization request,
      console.log('Attempting To Charge Card')
      console.log(token)
      console.log('Processing')
      const paymentData = {
        token,
        email: 'Daverock914@gmail.com',
        uuid: this.props.uuid,
        names: {...this.state.images},
        charge: {
          amount: this.props.uploadedPhotos.length*1000,
          currency: 'eur',
        },
        style: this.props.activeStyle
      };
      console.log('Sending Post')
      const response = await fetch('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/processOrderCompletion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData),
      });
      console.log('Response Recieved')
      let returned = response.json()
      console.log(returned)
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

  handleTestCheckout = () =>{
    console.log('Testcheckout')
    this.setState({showSpinner : true})
    let images = [];
    for (let i = 0 ; i < this.props.uploadedPhotos.length; i++){
      // Upload Cropped Files To Checkout Bucket
      let imageName = `${this.props.uuid}_${this.props.uploadedPhotos[i].dateAndTime}_${this.props.uploadedPhotos[i].name}`;
      console.log(imageName)
      let file = ConvertUrlToFile(this.props.uploadedPhotos[i].croppedSrc, this.props.uploadedPhotos[i].imageType, imageName)
      try {
        axios.post('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/presigned-post-data?name=' + "Images/" + `${this.props.uuid}/` + file.name).then(response =>{
         try
         {
          axios.put(response.data.signed_url, file)
          images.push(imageName);
         }
         catch{
           console.log("err")
         }
        
        }).then(response => {
          console.log(response)
        })
      } catch (error) {
        console.error(error)
      }
    }
    this.setState({images: images, showSpinner: false})
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
                      <LoadingOverlay
                        active={this.state.showSpinner}
                        spinner={<BounceLoader />}>
                        Testing
                      </LoadingOverlay>
                      </Button>
                    </Row>
                  </Container>
                </div>
            </SlidingPane>
      </div>
    )
  }
}

export default Checkout

{
  // this option uses a ddrop down, has unneccessary icon and moves off to the right
  /* <DropdownButton  id="dropdown-basic-button" title={<i class="fa fa-bars" aria-hidden="true"></i>}>
<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> */}