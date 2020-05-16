import React from 'react'
import {Card, Navbar, Modal, NavDropdown, Nav, DropdownButton, Dropdown, Button} from 'react-bootstrap'

import './Footer.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    GetCorrectButton(){
        if (this.props.WhatAction === "GoToCheckOut"){
            return  <Button disabled={this.props.IsButtonDisabled} onClick={this.props.Action} className="footerButton">
            Checkout
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </Button>
        }
        else if (this.props.WhatAction === "GoToSelectPhoto"){
            return <Button disabled={this.props.IsButtonDisabled} href="SelectPhotos" className="footerButton">
            Select Photos 
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </Button>
        }
    }

  render() {
    return (
      <div className="footerHolder">
        <div className="footer">
            <Card.Footer>
            {this.GetCorrectButton()}
            </Card.Footer>
        </div>
      </div>
    )
  }
}

export default Footer
