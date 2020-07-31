import React from 'react';
import HomePage from './HomePage.jsx'
import SelectPhotoPage from './SelectPhoto.jsx'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {      
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={SelectPhotoPage} />
                    <Route path="/Home" exact component={HomePage} />
                    <Route path="/SelectPhotos" exact component={SelectPhotoPage} />
                </Switch>
            </Router>
        </div>
    )
  }
}

export default App