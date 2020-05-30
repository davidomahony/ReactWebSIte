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
      <div classname="faqheader" style={{ width: '100%' }}>
    
       <div classname="headerText2">How much do SticPics Cost?</div>
       <div classname="faqAnswer">SticPics cost €39.99 for 3 framed pieces. Each SticPic thereafter is €10</div>
       <div classname="faqQuestion">How big is each SticPic?</div>
       <div classname="faqAnswer">Each SticPic has an external measurement of 8 x 8in or 20cm x 20cm</div>
       <div classname="faqQuestion">How long does shipping take?</div>
       <div classname="faqAnswer">Shipping usually takes about a week but you will receive tracking information once the package leaves our factory.</div>
       <div classname="faqQuestion">How are SticPics sustainable?</div>
       <div classname="faqAnswer">We wanted to create a paper based sustainable product. Each SticPic is made completely from paper based raw materials sourced from sustainable forrests.</div>
       <div classname="faqQuestion">How do SticPics work?</div>
       <div classname="faqAnswer">There is a adhesive strip on the back! Peel off the protective paper and stick to your wall!</div>
       <div classname="faqQuestion">Can the tiles be moved?</div>
       <div classname="faqAnswer">SticPics can be moved no problem as it is a repositionable sticky tape.  </div>
       <div classname="faqQuestion">Will the tiles damage my walls?</div>
       <div classname="faqAnswer">Nope the stick tape is designed to be removable. </div>
       <div classname="faqQuestion">Can I use photos from Facebook/Instagram?</div>
       <div classname="faqAnswer">Yes of course you can - our software will allow you to sign in and select photos from these platforms</div>
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