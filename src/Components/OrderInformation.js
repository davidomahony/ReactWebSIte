import React from 'react'
import {Modal, Container, Row, Button, Toast} from 'react-bootstrap'
import './Checkout.scss'


class OrderInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {
    return (
    <div>
        <Row>
            <h5> Summary </h5>
        </Row>
        <Row>
            <div className="infoRow">
            <div className="left">
            <h7>
                Photos Added: 
            </h7>
            </div>
            <div className="right">
                {this.props.uploadedPhotos.length}
            </div>
            </div>
        </Row>
        <Row>
        <div className="infoRow">
            <div className="left">
                <h7>
                Style Selected:
                </h7>
            </div>
            <div className="right">
                {this.props.activeStyle.name}
            </div>
            </div>
        </Row>
        <Row>
        <div className="infoRow">
            <div className="left">
                <h7>
                Delivery:
                </h7>
            </div>
            <div className="right">
                $10
            </div>
            </div>
        </Row>
        <Row>
        <div className="infoRow">
            <div className="left">
                <h7>
                Total:
                </h7>
            </div>
            <div className="right">
                ${(this.props.uploadedPhotos.length * 10) + 10}
            </div>
            </div>
        </Row>
    </div>
    )
  }
}

export default OrderInformation