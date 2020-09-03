import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import './ModifyUpload.scss'

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const cropper = React.createRef(null);

class ModifyUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cropDetails: null
        }
    }

  cropUpdated = (crop) =>{
      this.setState({cropDetails: crop.detail})
    }

  render() {
    return (
        <Modal show={this.props.showModifyUpload}>
        <Modal.Header>
          <Button variant="light" onClick={this.props.closeCropper}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </Button>
           Adjust 
          <Button variant="primary" onClick={() => this.props.cropImage(this.state.cropDetails)}>
              Done
          </Button>
        </Modal.Header>
          <Modal.Body>
          <div className="imageContainer">
            <Cropper
                src={this.props.unCropped}
                ref={cropper}
                aspectRatio={1}
                minContainerHeight={200}
                guides={false}
                crop={this.cropUpdated} />
            </div>
          </Modal.Body>
        </Modal>
    )
  }
}

export default ModifyUpload
