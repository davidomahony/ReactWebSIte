import React from 'react'
import Cropper from 'react-cropper';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'
import { trackPromise } from 'react-promise-tracker';

import {LoadingIndicator} from './../Utility'
import './UploadButton.scss'
import 'cropperjs/dist/cropper.css';

import FacebookLogin from 'react-facebook-login';

import ReactFilestack from 'filestack-react';


class UploadButton extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            name: null,
            imageType: null,
            dateAndTime: null,
            src: this.props.imageForCrop,
            cropResult: null,
            showModal: this.props.showModal,
            mouseOverUpload: false,
            showSocialModal: false
        }
    } 

    UploadButton(){
      return <div className="uploadButtonMouseOver">
        <div className="outer">
        <ReactFilestack
              apikey={"AOiy6SqVESS2GJf9eKXsDz"}
              onSuccess={this.fileUploaded}
              actionOptions={this.pickerOptions}
              customRender={({ onPick }) => (
                <div className="fromPC" onClick={onPick}>
                  <i className="fa fa-plus blue fa-3x"></i>
                  <h4 className="uploadFromPcText">
                    Upload From PC
                  </h4>
                </div>
              )}
            />
            <ReactFilestack
              apikey={"AOiy6SqVESS2GJf9eKXsDz"}
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
      this.closeCropper()
    }

    fileUploaded = (response) => {
      console.log(response);
      var uploaded = response.filesUploaded[0]
      console.log(response.filesUploaded[0]);
      this.setState({
        fileSrc: response.filesUploaded[0],
        dateAndTime: Date.now(),
        name: response.filesUploaded[0].name,
        imageType: response.filesUploaded[0].type})
        console.log('show modal');
        this.setState({src: response.filesUploaded[0].url, cropResult: response.filesUploaded[0].url})
        this.props.photoAdded(response.filesUploaded[0].url ,this.state.name, this.state.dateAndTime)
    }

    fileTrasformed = (responseUrl) => {
      console.log(responseUrl);
      this.setState({
        fileSrc: responseUrl,
        dateAndTime: Date.now(),
        name: responseUrl})
        console.log('show modal');
        this.setState({src: responseUrl, cropResult: responseUrl})
        this.props.photoAdded(responseUrl ,this.state.name, this.state.dateAndTime)
    }

    pickerOptionsSocial = {
      accept: 'image/*',
      transformations: {
        crop: {
          aspectRatio: 1/1,
          force: true
        }
      },
      fromSources: ['instagram', 'facebook', 'googledrive']
    };

    pickerOptions = {
      accept: 'image/*',
      transformations: {
        crop: {
          aspectRatio: 1/1,
          force: true
        }
      },
      fromSources: ['local_file_system']
    };

  closeCropper = () =>{
    this.props.closeCropper()
    this.setState({showModal: false})
  }

  render() {
    return ( 
    <div>
          {this.UploadButton()}
          <Modal show={this.props.showModal || this.state.showModal}>
              <Modal.Header>
                <Modal.Title> Remove Image </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>
                  Would you like to remove this image?
                </h4>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => this.removePhoto()}>
                  Yes
                </Button>
                <Button variant="primary" onClick={this.closeCropper}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
      </div>
    )
  }
}

export default UploadButton

{/* <div style={{ width: '100%' }}>
<ReactFilestack
  apikey={"AOiy6SqVESS2GJf9eKXsDz"}
  action='transform'
  actionOptions= {{
    resize: {
      width: 250
    },
    flip: true
  }}
  source='https://cdn.filestackcontent.com/S15FKcAYQOq6CVeERHn1'
  onSuccess={this.fileTrasformed}/>
</div> */}