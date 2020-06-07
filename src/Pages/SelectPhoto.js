import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

import './SelectPhoto.scss'

import {ApiKey, AvailableOptions} from './../Constants'

import StyleOne from "./../Photos/boldIcon.svg";
import StyleTwo from "./../Photos/cleanIcon.svg";
import StyleThree from "./../Photos/everIcon.svg";

import UploadButton from './../Components/UploadButton'
import Header from './../Components/Header'
import Footer from  './../Components/Footer'
import Checkout from '../Components/Checkout';
import { Modal } from 'react-bootstrap';

class SelectPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedPhotos: [],
      availableStyles: AvailableOptions,
      activeStyle: AvailableOptions[0],
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

photoAdded = (uploadInfo) => {
  let currentPhotos = this.state.uploadedPhotos.filter(photo => photo.imgid !== uploadInfo.imgid)
  let cookieName = `Image_${currentPhotos.length}`;
  currentPhotos.push({
    name: uploadInfo.name,
    type: uploadInfo.imageType,
    dateAndTime: uploadInfo.dateAndTime,
    dataUrl: uploadInfo.dataUrl,
    fileStackUrl:uploadInfo.fileStackUrl,
    hasRecievedFileStackUrl: uploadInfo.hasRecievedFileStackUrl,
    isStandardCrop: uploadInfo.isStandardCrop,
    cropDetails: uploadInfo.cropDetails,
    imgid: uploadInfo.imgid,
    cookieName: cookieName,
    file: uploadInfo.file
  })
  console.log(currentPhotos);
  // Whole cookies sitch needs to be cleaned up
  this.setState({uploadedPhotos: currentPhotos})
  // if (cookies.get(`containsImages`) === undefined){
  //   cookies.set(`containsImages`, 1);
  // }
  // else{
  //   let count = cookies.get(`containsImages`)
  //   cookies.set(`containsImages`, count++);
  // }
  // cookies.set(cookieName, uploadInfo.imgid);
}

updateCrop = async (details, url) => {
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === this.state.imageForCrop.imgid)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], dataUrl: url, cropDetails: details, isStandardCrop:false}
  await this.setState({showCropperModal : false})
  console.log(newValues)
  this.setState({uploadedPhotos: newValues})
}

updateInfo = (dataUrl, id) => {
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === id)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], dataUrl: dataUrl}
  console.log(newValues)
  this.setState({uploadedPhotos: newValues})
}

removePhoto = (photo) => {
  let newPhotos = this.state.uploadedPhotos.filter(p => p.imgid !== photo.imgid)
  this.setState({uploadedPhotos: newPhotos})
  cookies.remove(photo.cookieName)
  var count = cookies.get(`containsImages`);
  cookies.set(`containsImages`, count - 1);
}

GetAvailablePreviews = (photos = []) =>{
  let previews = photos.map(photo =>
       <div className="previewImage card" onClick={() => this.showCropperForPhoto(photo)}>
          <img src={this.state.activeStyle.img} className="first"/>
          <img src={photo.dataUrl} className="second" ></img>
      </div>
  )
  return previews;
}

showCropperForPhoto = async (photo) =>{
  this.setState({showCropperModal : true,
  imageForCrop: photo})
}

GetAvailableStyles(){
  return this.state.availableStyles.map(style =>
    <div className={"imageStyleDiv" + this.state.activeStyle === style.name ? " lightblue" : ""} key={style.name}>
      <button className="card" onClick={() => this.setState({activeStyle: style})}>
          <img className="imageStyle" src={style.img}></img>
          {style.name}
      </button>
    </div>
    )
}

hasRecievedUrl = (id, file) =>{
  // need to check if failed
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === id)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], hasRecievedFileStackUrl : true, fileStackUrl: file.url}
  this.setState({uploadedPhotos: newValues})
}

  render() {
    return (
      <div className="pageCard">
        <Header/>
        <div className="scrollmenu">
            <div className="styleHolder">
              {this.GetAvailableStyles()}
            </div>
          </div>
          <div className="scrollmenuPreview">
            <div className="previewContainer">
              {this.GetAvailablePreviews(this.state.uploadedPhotos)}
              <div className="vcentre">
                <UploadButton closeCropper={() => this.setState({showCropperModal: false})}
                  updateFromCrop={this.updateCrop}
                  updateInfo={this.updateInfo}
                  removePhoto={this.removePhoto}
                  showModal={this.state.showCropperModal} hasRecievedUrl={this.hasRecievedUrl}
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