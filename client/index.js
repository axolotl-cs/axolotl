// This is the entry point for the app
import React from 'react';
import { render } from 'react-dom';
import App from '../client/components/App.jsx'; //don't erase the .jsx
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



render(
  <App />
  , document.getElementById('content'),
);
