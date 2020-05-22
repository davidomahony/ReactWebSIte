import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, BrowserRouter  } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import SelectPhotoPage from './Pages/SelectPhoto'
import App from './Pages/App';

ReactDOM.render(
  <div>
    <App/>
  </div>,
  document.getElementById('root')
);

serviceWorker.unregister();
