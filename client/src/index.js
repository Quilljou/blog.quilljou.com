import {render} from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import  './index.css'
import App from './views/App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
