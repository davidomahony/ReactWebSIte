import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './Pages/App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(  
      <CookiesProvider>
        <App/>
      </CookiesProvider>  ,
  document.getElementById('root')
);

serviceWorker.unregister();
