import React from 'react'
import {Card, Navbar, Modal, Form, Container, Row, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import StripeCheckout from 'react-stripe-checkout';


import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import './Checkout.scss'
import AddressForm from './AddressForm'

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddressModal: false
        }
    }

handleSubmitPayment = (token) =>{
    console.log('Attempting To Charge Card')
    console.log(token)
    console.log('Processing')
    //this.processInformation(token)
    console.log('Done Processing')
    //this.stripeTokenHandler(token)
    }

    handleSubmitAddress = (event) => {
        const form = event.currentTarget.parentNode;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

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
                        token={this.handleSubmitPayment}
                        stripeKey="pk_test_cFsAVCGnWPQW75xZfBrhg3mf00NWliuU2M"
                      />
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