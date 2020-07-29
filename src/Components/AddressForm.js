import React from 'react'
import {Modal} from 'react-bootstrap'
import {Form, Input, Submit} from 'react-smart-form';
import {required, email} from 'react-smart-form/validators';
import cookie from 'react-cookies'
import './AddressForm.scss'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          email: "",
          address: "",
          address2: "",
          city: "",
          postCode: "",
          country: ""
        }
    }

  componentDidMount(){
    let email = this.IsNullOrUndefined(cookie.load("email"));
    let fullName = this.IsNullOrUndefined(cookie.load("fullName"));
    let address = this.IsNullOrUndefined(cookie.load("address"));
    let address2 = this.IsNullOrUndefined(cookie.load("address2"));
    let city = this.IsNullOrUndefined(cookie.load("city"));
    let postCode = this.IsNullOrUndefined(cookie.load("postcode"));
    let country = this.IsNullOrUndefined(cookie.load("country"));

    this.setState({
      email: email,
      fullName: fullName,
      address: address,
      address2: address2,
      city: city,
      postCode: postCode,
      country: country
    });
  }

  IsNullOrUndefined(string){
    if (string === null || string === undefined){
      return "";
    }
    return string
  }

  onSubmit = (values) => {
    console.log(values);
    // Maybe some validation
    this.props.AddressSubmitted(values);
    this.props.closeModal();
    cookie.save("email", values.email, { path: '/' })
    cookie.save("fullName", values.fullName, { path: '/' })
    cookie.save("address", values.address, { path: '/' })
    cookie.save("address2", values.address2, { path: '/' })
    cookie.save("city", values.city, { path: '/' })
    cookie.save("postcode", values.postCode, { path: '/' })
    cookie.save("country", values.country, { path: '/' })
    this.setState({
      email: values.email,
      fullName: values.fullName,
      address: values.address,
      address2: values.address2,
      city: values.city,
      postCode: values.postCode,
      country: values.country
    });
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
                    <Input defaultValue={this.state.email} name="email" label="Email" validators={[required('Email is required'), email('This is not a valid email.')]}/>
                    <Input defaultValue={this.state.fullName} name="fullName" label="Full Name" validators={[required('Full name is required')]} />
                    <Input defaultValue={this.state.address} name="address" label="Address" validators={[required('Address is required')]} />
                    <Input defaultValue={this.state.address2} name="address2" label="Address 2"  />
                    <Input defaultValue={this.state.city} name="city"  label="City" validators={[required('City/County is required')]} />
                    <Input defaultValue={this.state.postCode} name="postCode" label="Post Code" validators={[required('Post code is required')]} />
                    <Input defaultValue={this.state.country} name="country" label="Country" validators={[required('Country is required')]} />
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