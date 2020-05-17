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
            fileSrc: null,
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

    onChange = (e) => {
      console.log('Hit me on change')
      this.state.name = '';
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        // Need to ad unique ID
          try {
            axios.post('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/presigned-post-data?name=' + files[0].name).then(response =>{
             try
             {
              axios.put(response.data.signed_url, files[0])
             }
             catch{
               console.log("err")
             }
            
            }).then(response => {
              console.log(response)
            })
          } catch (error) {
            console.error(error)
          }
      
        this.setState({
          fileSrc: files[0],
          dateAndTime: Date.now(),
          name: files[0].name,
          imageType: files[0].type})

        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
        this.setState({showModal: true})
      }
    
      updateCrop = (cropedimage) => {
        console.log('update')
        this.setState({cropResult: cropedimage})
      }

      cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        this.setState({
          cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });

        this.props.photoAdded(this.state.src, this.state.cropResult,this.state.name, this.state.dateAndTime, this.state.imageType)
      }    

    UploadButton(){
    return this.state.mouseOverUpload ? 
    <div className="uploadButtonMouseOver"  onMouseLeave={() => this.setState({mouseOverUpload : false})}>
      <div className="outer">
        <div className="fromPc">
          <label htmlFor="uploader">
            <i className="fa fa-plus blue fa-3x"></i>
          </label>
          <input id="uploader" type="file" onInput={this.onChange}></input>
        </div>
        <div className="fromSocial" onClick={() => this.setState({showSocialModal:true})}>
        <i className="fa fa-facebook-square blue fa-3x socialIcon" aria-hidden="true"></i>
        <i className="fa fa-instagram fa-3x socialIcon black" aria-hidden="true"></i>
        <i className="fa fa-google fa-3x socialIcon blue" aria-hidden="true"></i>
        </div>
      </div>
    </div> : 
    <div className="uploadButton" 
    onMouseOver={() => this.setState({mouseOverUpload: true})}>
      <label color= "blue">
        <i className="fa fa-plus blue fa-4x"></i>
      </label>
    </div>
    }

    closeCropper = () =>{
      this.props.closeCropper()
      this.setState({showModal: false})
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
        // const reader = new FileReader();
        // reader.onload = () => {
        //   this.setState({ src: reader.result });
        // };
        // reader.readAsDataURL(response.filesUploaded[0].url);
        console.log('show modal');
        this.setState({src: response.filesUploaded[0].url, cropResult: response.filesUploaded[0].url})
        this.props.photoAdded(this.state.src, this.state.cropResult,this.state.name, this.state.dateAndTime, this.state.imageType)
    }

    importFromSocialMediaModal(){
      return(
        <Modal show={this.state.showSocialModal}>
        <Modal.Header>
          <Modal.Title>Select Input</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ReactFilestack
            apikey={"AOiy6SqVESS2GJf9eKXsDz"}
            onSuccess={this.fileUploaded}
            actionOptions={this.pickerOptions}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => this.setState({showSocialModal: false})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }

    pickerOptions = {
      accept: 'image/*',
      transformations: {
        crop: {
          aspectRatio: 1/1,
          force: true
        }
      },
      fromSources: ['local_file_system', 'instagram', 'url', 'facebook', 'googledrive']
    };

  render() {
    return (
      <div>
          {this.UploadButton()}
          {this.importFromSocialMediaModal()}
          <Modal show={this.props.showModal || this.state.showModal} o>
              <Modal.Header>
                <Modal.Title>Crop Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{ width: '100%' }}>
                <Cropper
                    style={{ height: 200, width: '100%' }}
                    crop
                    aspectRatio={1}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.src}
                    ready={() => this.cropImage()}
                    cropend={() => this.cropImage()}
                    ref={cropper => { this.cropper = cropper; }}
                />
               <LoadingIndicator/>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={() => this.removePhoto()}>
                  Delete
                </Button>
                <Button variant="primary" onClick={this.closeCropper}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
      </div>
    )
  }
}

export default UploadButton