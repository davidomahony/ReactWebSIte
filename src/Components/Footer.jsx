import React from 'react'
import { Button} from 'react-bootstrap'

import './Footer.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {
    return (
      <div className="footerHolder">
        <div className="footer">
          <Button disabled={this.props.IsButtonDisabled} onClick={this.props.Action} href={this.props.link} className="footerButton">
            {this.props.label}
<<<<<<< HEAD
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
=======
        
>>>>>>> develop
          </Button>
        </div>
      </div>
    )
  }
}

export default Footer
