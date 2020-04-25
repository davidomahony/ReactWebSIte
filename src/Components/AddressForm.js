import React from 'react'
import {Card, Navbar, Modal, Form, Container, Row, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import './AddressForm.scss'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          modalToShow: null
        }
    }

    handleSubmitAddress = (event) => {
        console.log('Check this out')
        const form = event.currentTarget.parentNode;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

  render() {
    return (
      <div>
        <Form>
            <Form.Group controlId="formBasicEmail" onSubmit={this.handleSubmitAddress}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" 
                defaultValue="David@Hotamil.com"
                id="emailinput"
                placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="validationCustom01">
                <Form.Label> Name </Form.Label>
                <Form.Control type="text"
                placeholder="Name"
                id="emailinput"
                defaultValue="default" />
            </Form.Group>
            <Button variant="primary" onClick={(e) => this.handleSubmitAddress(e)}>
                Submit
            </Button>
        </Form>
      </div>
    )
  }
}

export default AddressForm

