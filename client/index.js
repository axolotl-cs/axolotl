// This is the entry point for the app
import React from 'react';
import { render } from 'react-dom';
import App from '../client/components/App.jsx'; //don't erase the .jsx

render(
  <App />
  , document.getElementById('content'),
);
