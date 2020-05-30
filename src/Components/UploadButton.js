import React from 'react'
import Cropper from 'react-cropper';
import {Modal, Button} from 'react-bootstrap'

import {LoadingIndicator, cropUrlToSquare} from './../Utility'
import './UploadButton.scss'
import 'cropperjs/dist/cropper.css';

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
      this.closeCropper()
    }

    fileUploaded = (response) => {
      console.log(response);
      var uploaded = response.filesUploaded[0]
      console.log(response.filesUploaded[0]);

      var img = new Image();

      img.onload = () => {
        var height = img.height;
        var width = img.width;
        let result = '';
        if(height !== width){
          
          result = cropUrlToSquare(height, width, response.filesUploaded[0].url, "AOiy6SqVESS2GJf9eKXsDz")
          console.log(result)
        }
        else{
          result = response.filesUploaded[0].url
        }

        this.setState({
          fileSrc: response.filesUploaded[0],
          dateAndTime: Date.now(),
          name: response.filesUploaded[0].name,
          imageType: response.filesUploaded[0].type})
          this.setState({src: result, cropResult: result})
          this.props.photoAdded(result ,this.state.name, this.state.dateAndTime)
        // code here to use the dimensions
      }

      img.src = response.filesUploaded[0].url
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
      maxFiles: 10,
      transformations: {
        crop: {
          aspectRatio: 1/1
        }
      },
      fromSources: ['instagram', 'facebook', 'googledrive']
    };

    pickerOptions = {
      accept: 'image/*',
      maxFiles: 10,
      transformations: {
        crop: {
          aspectRatio: 1/1
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
            <Modal.Body>
              <h6>
                Would you like to remove this image?
              </h6>
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