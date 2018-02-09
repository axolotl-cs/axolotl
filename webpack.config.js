const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './client');

const config = {
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
        }]
    }]
  }
};

module.exports = config;
