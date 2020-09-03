import React from 'react'
// Libraries
import { v4 as uuidv4 } from 'uuid';
import { animation, MenuProvider} from 'react-contexify';
import cookie from 'react-cookies'

import UploadButton from '../Components/UploadButton'
import Header from '../Components/Header'
import Footer from  '../Components/Footer'
import Checkout from '../Components/Checkout';
import ContextMenu from '../Components/ContextMenu'

import './SelectPhoto.scss'
import 'react-contexify/dist/ReactContexify.min.css';

import {AvailableOptions} from '../Constants'

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

photoAdded = (uploadInfo) => {
  let currentPhotos = this.state.uploadedPhotos.filter(photo => photo.imgid !== uploadInfo.imgid)
  currentPhotos.push({
    name: uploadInfo.name,
    type: uploadInfo.imageType,
    dateAndTime: uploadInfo.dateAndTime,
    dataUrl: uploadInfo.dataUrl,
    fileStackUrl:uploadInfo.fileStackUrl,
    hasRecievedFileStackUrl: uploadInfo.hasRecievedFileStackUrl,
    isStandardCrop: uploadInfo.isStandardCrop,
    cropDetails: uploadInfo.cropDetails,
    unCropped: uploadInfo.unCropped,
    imgid: uploadInfo.imgid,
    uploadPercent: 0,
    file: uploadInfo.file
  })
  // Whole cookies sitch needs to be cleaned up
  this.setState({uploadedPhotos: currentPhotos})
}

/////////////////////////// Refactor four methods below into one using key names

updateCrop = async (details, url) => {
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === this.state.imageForCrop.imgid)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], dataUrl: url, cropDetails: details, isStandardCrop:false}
  this.setState({showCropperModal : false})
  this.setState({uploadedPhotos: newValues})
}

updateInfo = (dataUrl, id, unCropped) => {
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === id)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], dataUrl: dataUrl, unCropped: unCropped}
  console.log(newValues)
  this.setState({uploadedPhotos: newValues})
}

hasRecievedUrl = (id, file) =>{
  // need to check if failed
  const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === id)
  var newValues = [...this.state.uploadedPhotos]
  newValues[elementsIndex] = {...newValues[elementsIndex], hasRecievedFileStackUrl : true, fileStackUrl: file.url, uploadPercent: 100}
  this.setState({uploadedPhotos: newValues})
}

updateUploadPercentage = (id, percentage) => {
    // need to check if failed
    const elementsIndex = this.state.uploadedPhotos.findIndex(img => img.imgid === id)
    var newValues = [...this.state.uploadedPhotos]
    newValues[elementsIndex] = {...newValues[elementsIndex], uploadPercent: percentage}
    console.log(id, percentage);
    this.setState({uploadedPhotos: newValues})
}
/////////////////////////////////////////////////////////

removePhoto = () => {
  let newPhotos = this.state.uploadedPhotos.filter(p => p.imgid !== this.state.imageForCrop.imgid)
  this.setState({uploadedPhotos: newPhotos})
  cookie.remove(`image_${this.state.imageForCrop.imgid}`, { path: '/' })
}

GetAvailablePreviews = (photos = []) =>{
  let previews = photos.map(photo =>
      <MenuProvider key={`Preview_${photo.imgid}`} id="menu_id" animation={animation.flip} event="onClick">
        <div key={`Preview_${photo.imgid}`} className="previewImage card" onClick={() => this.setState({imageForCrop: photo})}>
            <img src={this.state.activeStyle.img} className="first"/>
            <img src={photo.dataUrl} className={this.state.activeStyle.name === "Classic" || this.state.activeStyle.name === "Even" ?
            "secondMount" : "second"} ></img>
        </div>
      </MenuProvider>
  )
  return previews;
}

GetAvailableStyles(){
  return this.state.availableStyles.map(style =>
    <div className={"imageStyleDiv" + this.state.activeStyle === style.name ? " lightblue" : ""} key={style.name}>
      <button className="card" onClick={() => this.setState({activeStyle: style})}>
          <img className="imageStyle" src={style.img}></img>
          <div className="imageText">{style.name}</div>
      </button>
    </div>
    )
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
<<<<<<< HEAD
          <div className="scrollmenuPreview">
          <h5 className="gray" >Pick Some Photos! </h5>
            <div className="previewContainer">
              {this.GetAvailablePreviews(this.state.uploadedPhotos)}
              <ContextMenu id="menu_id" removePhoto={() => this.removePhoto()} cropAction={() => this.setState({showCropperModal: true})}/>
              <div className="vcentre">
                <UploadButton closeCropper={() => this.setState({showCropperModal: false})}
                  updateFromCrop={this.updateCrop}
                  updateInfo={this.updateInfo}
                  UpdatePrecentage={this.updateUploadPercentage}
                  showModal={this.state.showCropperModal} hasRecievedUrl={this.hasRecievedUrl}
                  imageForCrop={this.state.imageForCrop} photoAdded={this.photoAdded}/>
              </div> 
            </div>          
=======
          <div className="scrollmenuPreview scrollPreviewAfter">
          <div className="scroll_prev_innr">
            <h5 className="gray" >Pick Some Photos! </h5>
              <div className="previewContainer">
                {this.GetAvailablePreviews(this.state.uploadedPhotos)}
                <ContextMenu id="menu_id" removePhoto={() => this.removePhoto()} cropAction={() => this.setState({showCropperModal: true})}/>
                <div className="vcentre">
                  <UploadButton closeCropper={() => this.setState({showCropperModal: false})}
                    updateFromCrop={this.updateCrop}
                    updateInfo={this.updateInfo}
                    UpdatePrecentage={this.updateUploadPercentage}
                    showModal={this.state.showCropperModal} hasRecievedUrl={this.hasRecievedUrl}
                    imageForCrop={this.state.imageForCrop} photoAdded={this.photoAdded}/>
                </div> 
              </div>   
            </div>       
>>>>>>> develop
          </div>
          <Checkout showCheckout={this.state.showCheckout} 
            closeCheckout={() => this.setState({showCheckout : false})}
            activeStyle={this.state.activeStyle}
            uuid={this.state.uuid} 
            uploadedPhotos={this.state.uploadedPhotos} />
          <Footer WhatAction="GoToCheckOut" label="Checkout" Action={() => this.setState({showCheckout: true, uuid: uuidv4()})} IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default SelectPhoto