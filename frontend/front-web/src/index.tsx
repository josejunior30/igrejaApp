
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

window.React =React;

ReactDOM.render(
  <React.StrictMode>
    <App/> 
   
  </React.StrictMode>,
  root
);
