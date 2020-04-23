import React from 'react'
import {Card, Navbar, Nav, Carousel, Form, Button, Popover, NavDropdown, Container, Row, Alert} from 'react-bootstrap'

import './SelectPhoto.scss'

import StyleOne from "./../Photos/boldIcon.svg";
import StyleTwo from "./../Photos/cleanIcon.svg";
import StyleThree from "./../Photos/everIcon.svg";

import UploadButton from './../Components/UploadButton'

import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class SelectPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedPhotos: [],
      activeStyle: {
        name: 'StyleOne',
        img: StyleOne
      },
      availableStyles:[{
        name: 'StyleOne',
        img: StyleOne
      },
      {
        name: 'StyleTwo',
        img: StyleTwo
      },
      {
        name: 'StyleThree',
        img: StyleThree
      }]
      ,
      showCropperModal: false,
      imageForCrop: null,
      showAlertForPreview: false,
      showMenuPopOver: false,
      showCheckout: false
    }
}

photoAdded = (photosrc, croppedsrc, name) => {
  let currentPhotos = this.state.uploadedPhotos.filter(photo => photo.name !== name)
  currentPhotos.push({
    photoSrc: photosrc,
    croppedSrc: croppedsrc,
    name: name
  })
  console.log('And we are back in the room')
  this.setState({uploadedPhotos: currentPhotos})
}

GetAvailablePreviews = (photos = []) =>{
  let previews = photos.map(photo =>
      <div className="previewImage card">
        <img src={this.state.activeStyle.img} className="first"/>
        <img src={photo.croppedSrc} className="second" ></img>
      </div>
  )
  return previews;
}

GetAvailableStyles(){
  return this.state.availableStyles.map(style =>
    <div>
      <button className="card" onClick={() => this.setState({activeStyle: style})}>
          {style.name}
          <img src={style.img}></img>
      </button>
    </div>
    )
}

checkOutExit(){
  return(
    <div>
      <i class="fa fa-window-close fa-3x red" aria-hidden="true"></i>
    </div>
  )
  }

  ShowCheckout = () =>{
    this.setState({showCheckout: true})
  }

  render() {
    return (
      <div className="pageCard">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <Button href="home">
              <i className="fa fa-arrow-circle-left"></i>
            </Button>
          </Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Item id="menuPopOver" className="ml-auto">
              <Button>
              <i class="fa fa-bars" aria-hidden="true"></i>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
          <Card.Header>
            <div className="centerHorizontal">
              <h2>
              Select Style 
              </h2>
            </div>
          </Card.Header>
          <div className="scrollmenu">
           {this.GetAvailableStyles()}
          </div>
          <div className="scrollmenuPreview">
            <div className="vcentre">
              <UploadButton showModal={false} imageForCrop={this.state.uploadedPhotos[0]} photoAdded={this.photoAdded}/>
            </div>           
            {this.GetAvailablePreviews(this.state.uploadedPhotos)}
          </div>
          <SlidingPane
                closeIcon={this.checkOutExit()}
                isOpen={ this.state.showCheckout }
                title='CheckOut'
                from='right'
                width='400px'
                onRequestClose={ () => this.setState({ showCheckout: false }) }>
                <div>Check Me Out Bitch</div>
            </SlidingPane>
          <div className="footer">
            <Card.Footer>
              <Button onClick={this.ShowCheckout} className="footerButton">
              Checkout
            </Button>
            </Card.Footer>
          </div>
      </div>
    )
  }
}

export default SelectPhoto