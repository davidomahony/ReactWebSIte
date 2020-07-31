import React from 'react'
import { Menu, Item,IconFont, animation,MenuProvider} from 'react-contexify';

import './Footer.scss'
import './../Pages/SelectPhoto.scss'

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {
    return (
        <Menu id={this.props.id}>
            <Item onClick={this.props.removePhoto}>
            <IconFont className="fa fa-trash red"/>Delete
            </Item>
            <Item onClick={this.props.cropAction}> 
            <IconFont className="fa fa-crop blue"/>Crop
            </Item>
            <Item>
            <IconFont className="fa fa-times gray"/>Dismiss
            </Item>
        </Menu>
    )
  }
}

export default ContextMenu
