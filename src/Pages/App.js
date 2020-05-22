import React from 'react';
import HomePage from './HomePage'
import SelectPhotoPage from './SelectPhoto'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 1000)
      }

  render() {      
    return (
        <div>
            {/* {this.state.loading ? 
            <div>
                Loading
            </div>
            : */}
            <Router>
                <Switch>
                    <Route path="/" exact component={SelectPhotoPage} />
                    <Route path="/Home" exact component={HomePage} />
                    <Route path="/SelectPhotos" exact component={SelectPhotoPage} />
                </Switch>
            </Router>
  }
        </div>
    )
  }
}

export default App