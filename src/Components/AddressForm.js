import React from 'react'
import {Card, Navbar, Modal, Form, Container, Row, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import './AddressForm.scss'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false
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
        <Modal show={this.props.showModal || this.state.showModal} o>
          <Modal.Header>
            <Modal.Title>Add Address Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ width: '100%' }}>
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
              <Button variant="danger" onClick={this.props.closeModal}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={(e) => this.handleSubmitAddress(e)}>
                  Submit
              </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default AddressForm

