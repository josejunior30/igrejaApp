
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const root = document.getElementById('root') as HTMLElement;

window.React =React;

ReactDOM.render(
  <React.StrictMode>
    <App/> 
   
  </React.StrictMode>,
  root
);
