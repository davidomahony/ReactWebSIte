import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import {GenerateImgInformation, AutoCropImageFromSocial, GetCropFromSocial, cropFileStackImage, CropLocalImage } from './../CropUtility'
import {PickerOptions} from './../Constants'
import './UploadButton.scss'

import logoMain from './../Photos/SticPicsLogo.gif'
import ModifyUpload from './ModifyUpload'

import ReactFilestack, {Client} from 'filestack-react';

import * as filestack from 'filestack-js';

const apikey = "AwDUla4uRT3GfDinUA6t9z";
const client = filestack.init(apikey);

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

    UploadButton(){
      return <div className="uploadButtonMouseOver">
        <div className="outer">
        <ReactFilestack
              apikey={"AwDUla4uRT3GfDinUA6t9z"}
              onSuccess={this.fileUploaded}
              actionOptions={this.pickerOptions}
              customRender={({ onPick }) => (
                <div className="fromPC" onClick={onPick}>
                  <i className="fa fa-plus blue fa-3x"></i>
                  <h4 className="uploadFromPcText">
                    Upload Photos
                  </h4>
                </div>
              )}
            />
            <ReactFilestack
              apikey={"AwDUla4uRT3GfDinUA6t9z"}
              onSuccess={this.fileUploaded}
              actionOptions={this.pickerOptionsSocial}
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

    removePhoto = () =>{
      this.props.removePhoto(this.props.imageForCrop)
      this.closeCropper();
    }

    uploadFromInput = async (event) =>{      
      if (event.target.files.length !== 0){
        let file = event.target.files[0];
        let uuid = uuidv4();
        GenerateImgInformation(file).then(res => 
          {
            this.setState({dataUrl: res.crop, unCropped: res.main, cropResult: res.crop})
            this.props.updateInfo(res.crop, this.state.imgid)
          })
        await this.setNewPhoto(file.name, logoMain, Date.now(), logoMain, file.type, true, uuid, file, false) 
        this.props.photoAdded(this.state)
        client.upload(file).then(res => this.props.hasRecievedUrl(this.state.imgid, res)).catch(res => console.log(res))
        console.log("Img complete")
    }
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
    
    fileUploaded = async (response) => {
      console.log(response);
      var uploaded = response.filesUploaded[0]
      if (uploaded !== undefined){
        let res = await GetCropFromSocial(uploaded);
        await this.setNewPhoto(uploaded.filename, uploaded.url, Date.now(), res, uploaded.mimetpe, true, uuidv4(), '', true, uploaded.url)
        this.props.photoAdded(this.state)
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

  UploadButton(){
    return <div className="uploadButtonMouseOver">
      <div className="outer">
        <div htmlFor="fileUpload" onClick={()=> this.refs.fileUploader.click()} className="fromPC">
          <i className="fa fa-plus blue fa-3x"></i>
          <h4 className="uploadFromPcText">
            Upload Photos
          </h4>
          <input type="file" id="fileUpload" ref="fileUploader" onChange={this.uploadFromInput}/>
        </div>
          <ReactFilestack
            apikey={apikey}
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
        <ModifyUpload unCropped={this.state.unCropped} 
          cropImage={(details) => this.cropImage(details)}
          removePhoto={() => this.removePhoto()}
          closeCropper={() => this.closeCropper()} 
          showModifyUpload={this.props.showModal || this.state.showModal}/>
      </div>
    )
  }
}

export default UploadButton