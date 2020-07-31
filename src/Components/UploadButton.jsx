import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ReactFilestack from 'filestack-react';
import * as filestack from 'filestack-js';

import {PickerOptions, ApiKey} from './../Constants'

import './UploadButton.scss'

import logoMain from './../Photos/SticPicsLogo.gif'
import ModifyUpload from './ModifyUpload'
import {GenerateImgInformation, GetCropFromSocial, cropFileStackImage, CropLocalImage } from './../CropUtility'

const client = filestack.init(ApiKey);

class UploadButton extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            name: null,
            imageType: null,
            dateAndTime: null,
            unCropped: '',
            dataUrl: '',
            fileStackUrl: '',
            hasRecievedFileStackUrl: false,
            isStandardCrop: true,
            nonStandardCropDetails: {x: 0, y: 0, length: 0, width: 0},
            cropResult: null,
            mouseOverUpload: false,
            showSocialModal: false,
            imgid: "",
            file: null
        }
    }

    uploadFromInput = async (event) =>{      
      if (event.target.files !== null && event.target.files.length !== 0){
        var files = event.target.files;
        let count = 0;
        for(count =0; count < files.length; count++){
          var file = files[count]
          let uuid = uuidv4();
          GenerateImgInformation(file, uuid).then(res => 
            {
              console.log(res)
              this.setState({dataUrl: res.crop, unCropped: res.main, cropResult: res.crop})
              this.props.updateInfo(res.crop, res.id, res.main)
            })
          await this.setNewPhoto(file.name, logoMain, Date.now(), logoMain, file.type, true, uuid, file, false) 
          this.props.photoAdded(this.state)
          client.upload(file, { onProgress : (event) => this.props.UpdatePrecentage(uuid, event.totalPercent)}).then(res => this.props.hasRecievedUrl(this.state.imgid, res)).catch(res => console.log(res))
          console.log("Img complete")
        }
    }
  }
    
  fileUploaded = async (response) => {
    console.log(response);
    var uploaded = response.filesUploaded;
    if (uploaded !== undefined && uploaded.length > 0){
      let count = 0;
      for(count =0; count < uploaded.length; count++){
        let file = uploaded[count];
        let uuid = uuidv4()
        GetCropFromSocial(file, uuid).then(res => {
          this.setState({dataUrl: res.result, unCropped: res.main, cropResult: res.result})
          this.props.updateInfo(res.result, res.id, res.main)
        });
        await this.setNewPhoto(file.name, logoMain, Date.now(), logoMain, file.type, true, uuid, file, false) 
        this.props.photoAdded(this.state)
      }
    }
  }
    
  removePhoto = () =>{
    this.props.removePhoto(this.props.imageForCrop)
    this.closeCropper()
  }

  closeCropper = () =>{
    this.props.closeCropper()
    this.setState({showModal: false})
  }

  cropImage = async (cropdetails) => {
    var croppedUrl = this.props.imageForCrop.hasRecievedFileStackUrl ? 
      await cropFileStackImage(cropdetails.x, cropdetails.y, cropdetails.width, this.props.imageForCrop.fileStackUrl) : 
      await CropLocalImage(this.props.imageForCrop.file, cropdetails)
    this.props.updateFromCrop(cropdetails, croppedUrl.crop)
  }

  setNewPhoto = async (name, dataUrl, dateAndTime, cropResult, imageType, isStandardCrop, imgid, file, hasRecievedFileStackUrl, fileStackUrl) => {
    await this.setState({
      name: name,
      dataUrl: dataUrl,
      dateAndTime: dateAndTime,
      cropResult: cropResult,
      imageType: imageType,
      isStandardCrop: isStandardCrop,
      imgid: imgid,
      file: file,
      unCropped: hasRecievedFileStackUrl ? fileStackUrl : dataUrl,
      hasRecievedFileStackUrl: hasRecievedFileStackUrl,
      fileStackUrl: fileStackUrl})
  }

  UploadButton(){
    return <div className="uploadButtonMouseOver">
      <div className="outer">
        <div htmlFor="fileUpload" onClick={()=> this.refs.fileUploader.click()} className="fromPC">
          <i className="fa fa-plus blue fa-3x"></i>
          <h4 className="uploadFromPcText">
            Upload Photos
          </h4>
          <input type="file" accept="image/*" multiple autoComplete="off" id="fileUpload" ref="fileUploader" onChange={this.uploadFromInput}/>
        </div>
          <ReactFilestack
            apikey={ApiKey}
            on
            onSuccess={async (e) => this.fileUploaded(e)}
            actionOptions={PickerOptions}
            customRender={({ onPick }) => (
              <div className="fromPC" onClick={onPick}>
                <i className="fa fa-facebook-square blue fa-3x socialIcon" aria-hidden="true"></i>
                <i className="fa fa-instagram fa-3x socialIcon purple" aria-hidden="true"></i>
                <i className="fa fa-google fa-3x socialIcon black" aria-hidden="true"></i>
              </div>
            )}
          />
      </div>
    </div>
    }

  render() {
    return ( 
    <div>
        {this.UploadButton()}
        <ModifyUpload unCropped={this.props.imageForCrop === null ? '' : this.props.imageForCrop.unCropped} 
          cropImage={(details) => this.cropImage(details)}
          closeCropper={() => this.closeCropper()} 
          showModifyUpload={this.props.showModal || this.state.showModal}/>
      </div>
    )
  }
}

export default UploadButton