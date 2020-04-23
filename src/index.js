import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App';
import * as serviceWorker from './serviceWorker';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Switch, Route, BrowserRouter  } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import SelectPhotoPage from './Pages/SelectPhoto'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SelectPhotoPage} />
      <Route path="/Home" exact component={HomePage} />
      <Route path="/SelectPhotos" exact component={SelectPhotoPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// const routing = (
//   <Router>
//     <div>
//       <Route path="/" component={SelectPhotoPage} />
//       <Route path="/Home" component={HomePage} />
//       <Route path="/SelectPhotos" component={SelectPhotoPage} />
//     </div>
//   </Router>
// )

//ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
