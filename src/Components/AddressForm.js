import React from 'react'
import {Modal} from 'react-bootstrap'
import {Form, Input, Submit} from 'react-smart-form';
import {required, email} from 'react-smart-form/validators';
import './AddressForm.scss'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false
        }
    }

  onSubmit = (values) => {
    console.log(values);
    // Maybe some validation
    this.props.AddressSubmitted(values);
    this.props.closeModal();
  }   

  render() {
    return (
      <div>
        <Modal show={this.props.showModal || this.state.showModal} o>
          <Modal.Header >
            <button className="exitButton" onClick={this.props.closeModal}>
              <i class="fa fa-times exitIcon fa-2x" aria-hidden="true"></i>
            </button>
            <Modal.Title>Address Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mainContainer">
              <div className="formContainer">
                <Form onSubmit={this.onSubmit}>
                    <Input name="email" label="Email" validators={[required('Email is required'), email('This is not a valid email.')]}/>
                    <Input name="fullName" label="Full Name" validators={[required('Full name is required')]} />
                    <Input name="address" label="Address" validators={[required('Address is required')]} />
                    <Input name="address2" label="Address 2"  />
                    <Input name="city"  label="City" validators={[required('City/County is required')]} />
                    <Input name="postCode" label="Post Code" validators={[required('Post code is required')]} />
                    <Input name="country" label="Country" validators={[required('Country is required')]} />
                    <Submit>
                        Submit
                    </Submit>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default AddressForm