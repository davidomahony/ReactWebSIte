import React from 'react'
import Cropper from 'react-cropper';

import {Card, Navbar, Modal, Button} from 'react-bootstrap'

import './UploadButton.scss'
import 'cropperjs/dist/cropper.css';

class UploadButton extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            src: this.props.imageForCrop,
            cropResult: null,
            showModal: this.props.showModal,
            mouseOverUpload: false,
            name: null
        }
    }

    onChange = (e) => {
      this.state.name = '';
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
        this.state.name = Date.now();
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

        this.props.photoAdded(this.state.src, this.state.cropResult, this.state.name === '' ? Date.now() : this.state.name)
      }

    UploadButton(){
    return this.state.mouseOverUpload ? 
    <div className="uploadButtonMouseOver"  onMouseLeave={() => this.setState({mouseOverUpload : false})}>
      <div className="outer">
        <div className="fromPc">
          <label htmlFor="uploader">
            <i class="fa fa-upload blue fa-3x"></i>
          </label>
          <input id="uploader" type="file" onChange={this.onChange}></input>
        </div>
        <div className="fromSocial">
        <i class="fa fa-facebook-square blue fa-3x socialIcon" aria-hidden="true"></i>
        <i class="fa fa-instagram fa-3x socialIcon black" aria-hidden="true"></i>
        <i class="fa fa-google fa-3x socialIcon blue" aria-hidden="true"></i>
        </div>
      </div>
    </div> : 
    <div className="uploadButton" 
    onMouseOver={() => this.setState({mouseOverUpload: true})}>
      <label color= "blue">
        <i class="fa fa-upload blue fa-4x"></i>
      </label>
    </div>
    }

    // UploadButton(){
    //   return this.state.mouseOverUpload ? 
    //   <div className="uploadButton"  onMouseLeave={() => this.setState({mouseOverUpload : false})}>
    //     <div className="fromPc">
    //       <label className="width" htmlFor="uploader">
    //       <i class="fa fa-upload blue fa-3x"></i>
    //       </label>
    //         <input id="uploader" type="file" onChange={this.onChange}></input>
    //   </div>
    //   <div className="fromSocial">
    //   <button>
    //       <i class="fa fa-facebook-square blue fa-3x" aria-hidden="true"></i>
    //       </button>
    //     </div>
    //   </div> : 
    //   <div className="uploadButton" 
    //   onMouseOver={() => this.setState({mouseOverUpload: true})}>
    //     <label color= "blue">
    //       <i class="fa fa-upload blue fa-4x"></i>
    //     </label>
    //   </div>
    //   }
  
    closeCropper = () =>{
      this.props.closeCropper()
      this.setState({showModal: false})
    }

    removePhoto = () =>{
      this.props.removePhoto(this.props.imageForCrop)
      this.closeCropper()
    }

  render() {
    return (
      <div>
          {this.UploadButton()}
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