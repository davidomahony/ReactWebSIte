import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

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
      showCheckout: false,
      haveCheckForCookies: false
    }
}

componentDidMount(){
  if (!this.state.haveCheckForCookies){
    let containsImages = cookies.get('containsImages')
    let images = this.state.uploadedPhotos;
    if (containsImages !== undefined || containsImages > 0)
    {
      var count;
      for (count = 0 ; count < (containsImages + 1); count++){
        let foundImage = cookies.get(`Image_${count}`)
        if (foundImage !== undefined)
        {
          images.push({
            url: foundImage,
            name: foundImage,
            dateAndTime: Date.now()
          })
        }
      }
    }
    this.setState({haveCheckForCookies:true, uploadedPhotos: images})
  }
}

photoAdded = (url, name, dateAndTime) => {
  let currentPhotos = this.state.uploadedPhotos.filter(photo => photo.dateAndTime !== dateAndTime)
  let cookieName = `Image_${currentPhotos.length}`;
  currentPhotos.push({
    url: url,
    name: name,
    dateAndTime: dateAndTime,
    cookieName: cookieName
  })
  console.log('And we are back in the room')
  this.setState({uploadedPhotos: currentPhotos})
  if (cookies.get(`containsImages`) === undefined){
    cookies.set(`containsImages`, 1);
  }
  else{
    let count = cookies.get(`containsImages`)
    cookies.set(`containsImages`, count++);
  }
  cookies.set(cookieName, url);
}

removePhoto = (photo) => {
  let newPhotos = this.state.uploadedPhotos.filter(p => p.url !== photo.url)
  this.setState({uploadedPhotos: newPhotos})
  cookies.remove(photo.cookieName)
  var count = cookies.get(`containsImages`);
  cookies.set(`containsImages`, count - 1);
}

GetAvailablePreviews = (photos = []) =>{
  let previews = photos.map(photo =>
      <div className="previewImage card" onClick={() => this.showCropperForPhoto(photo)}>
          <img src={this.state.activeStyle.img} className="first"/>
          <img src={photo.url} className="second" ></img>
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
    <div key={style.name}>
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
          <div className="scrollmenu">
           {this.GetAvailableStyles()}
          </div>
          <div className="scrollmenuPreview">
            <div className="previewContainer">
              {this.GetAvailablePreviews(this.state.uploadedPhotos)}
              <div className="vcentre">
                <UploadButton closeCropper={() => this.setState({showCropperModal: false})} 
                  removePhoto={this.removePhoto}
                  showModal={this.state.showCropperModal} 
                  imageForCrop={this.state.imageForCrop} photoAdded={this.photoAdded}/>
              </div> 
            </div>          
          </div>
          <Checkout showCheckout={this.state.showCheckout} 
            closeCheckout={() => this.setState({showCheckout : false})}
            activeStyle={this.state.activeStyle}
            uuid={this.state.uuid} 
            uploadedPhotos={this.state.uploadedPhotos} />
          <Footer WhatAction="GoToCheckOut" Action={() => this.setState({showCheckout: true, uuid: uuidv4()})} IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default SelectPhoto

const cookies = new Cookies();