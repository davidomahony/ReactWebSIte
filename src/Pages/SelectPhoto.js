import React from 'react'
import {Card, Navbar, Nav, Carousel, Form, Button, Popover, NavDropdown, Container, Row, Alert} from 'react-bootstrap'

import './SelectPhoto.scss'

import StyleOne from "./../Photos/boldIcon.svg";
import StyleTwo from "./../Photos/cleanIcon.svg";
import StyleThree from "./../Photos/everIcon.svg";

import UploadButton from './../Components/UploadButton'
import Header from './../Components/Header'
import Footer from  './../Components/Footer'
import Checkout from '../Components/Checkout';

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

removePhoto = (photo) => {
  let newPhotos = this.state.uploadedPhotos.filter(p => p.name !== photo.name)
  this.setState({uploadedPhotos: newPhotos})
}

GetAvailablePreviews = (photos = []) =>{
  let previews = photos.map(photo =>
      <div className="previewImage card" onClick={() => this.showCropperForPhoto(photo)}>
          <img src={this.state.activeStyle.img} className="first"/>
          <img src={photo.croppedSrc} className="second" ></img>
      </div>
  )
  return previews;
}

showCropperForPhoto = (photo) =>{
  console.log('Getn set up')
  this.setState({showCropperModal : true,
  imageForCrop: photo})
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

  render() {
    return (
      <div className="pageCard">
        <Header/>
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
              <UploadButton closeCropper={() => this.setState({showCropperModal: false})} 
                removePhoto={this.removePhoto}
                showModal={this.state.showCropperModal} 
                imageForCrop={this.state.imageForCrop} photoAdded={this.photoAdded}/>
            </div>           
            {this.GetAvailablePreviews(this.state.uploadedPhotos)}
          </div>
          <Checkout showCheckout={this.state.showCheckout} 
            closeCheckout={() => this.setState({showCheckout : false})}
            activeStyle={this.state.activeStyle}
            uploadedPhotos={this.state.uploadedPhotos} />
          <Footer WhatAction="GoToCheckOut" Action={() => this.setState({showCheckout: true})} IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default SelectPhoto