import React from 'react'
import {Card, Navbar, Modal, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          modalToShow: null
        }
    }

  processDropDownClick = (option) => {
    this.setState({showModal: true,
    modalToShow: option})
  }

  displayActionFromDropDown(){
    return(
      <Modal show={this.state.showModal}>
      <Modal.Header>
      <Modal.Title>{this.state.modalToShow}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {this.state.modalToShow === 'FAQ' ? this.FaqContent() : this.state.modalToShow === 'ContactUs' ?this.ContactUsContent() : this.GeneralContent()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => this.setState({showModal: false})}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }

  FaqContent(){
    return(
      <div style={{ width: '100%' }}>
       FAQ Content
      </div>
    )
  }

  ContactUsContent(){
    return(
      <div style={{ width: '100%' }}>
        Contact us
      </div>
    )
  }

  GeneralContent(){
    return(
      <div style={{ width: '100%' }}>
       General
      </div>
    )
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>
            <Button variant="light" href="home">
              <i className="fa fa-angle-left fa-2x blue"></i>
            </Button>
          </Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Item id="menuPopOver" className="ml-auto">
            <DropdownButton alignRight  variant="light"   id="dropdown-menu-align-right" title={<i className="fa fa-bars blue fa-1x" aria-hidden="true"></i>}>
              <Dropdown.Item onClick={() => this.processDropDownClick('FAQ')}> Frequent Questions</Dropdown.Item>
              <Dropdown.Item onClick={() => this.processDropDownClick('ContactUs')}> Contact us </Dropdown.Item>
              <Dropdown.Item onClick={() => this.processDropDownClick('General')}> General Info </Dropdown.Item>
            </DropdownButton>
            </Nav.Item>
          </Nav>
        </Navbar>
        {this.displayActionFromDropDown()}
      </div>
    )
  }
}

export default Header

{
  // this option uses a ddrop down, has unneccessary icon and moves off to the right
  /* <DropdownButton  id="dropdown-basic-button" title={<i class="fa fa-bars" aria-hidden="true"></i>}>
<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> */}