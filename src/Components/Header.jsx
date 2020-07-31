import React from 'react'
import { Navbar, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import './Header.scss'
import logoMain from './../Photos/SticPicsLogo.gif'

import ModalProvider from "./ModalProvider"

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

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Button variant="light" href="home">
            <i className="fa fa-angle-left fa-2x blue"></i>
          </Button>
          <Nav className="container-fluid">
            <div className="imageContainer">
              <img className="mainLogo" src={logoMain}></img>
            </div>
            <Nav.Item id="menuPopOver" className="ml-auto">
            <DropdownButton alignRight  variant="light"   id="dropdown-menu-align-right" title={<i className="fa fa-bars blue fa-1x" aria-hidden="true"></i>}>
              <Dropdown.Item onClick={() => this.processDropDownClick('FAQ')}> Frequent Questions</Dropdown.Item>
              <Dropdown.Item onClick={() => this.processDropDownClick('ContactUs')}> Contact us </Dropdown.Item>
              <Dropdown.Item onClick={() => this.processDropDownClick('General')}> General Info </Dropdown.Item>
            </DropdownButton>
            </Nav.Item>
          </Nav>
        </Navbar>
        <ModalProvider 
         modalToShow={this.state.modalToShow}
         showModal={this.state.showModal}
         closeModal={() => this.setState({showModal: false})}/>
      </div>
    )
  }
}

export default Header