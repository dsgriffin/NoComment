var path = require('path');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './app/scripts/background.ts',
    content: './app/scripts/content.ts',
    options: './app/scripts/options.ts',
    popup: './app/scripts/popup.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    alias: {
        'jquery-ui': path.join(__dirname, '/node_modules/jquery-ui-dist/jquery-ui.min.js'),
        'datatables': path.join(__dirname, '/node_modules/datatables/media/js/jquery.dataTables.min.js'),
        'jquery-ui-css': path.join(__dirname, '/node_modules/jquery-ui/themes/base/core.css'),
        'datatables-css': path.join(__dirname, '/node_modules/datatables/media/css/jquery.dataTables.min.css')
    }
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([ 
       { from: './app/images', to: path.resolve(__dirname, 'dist') },
       { from: './app/styles', to: path.resolve(__dirname, 'dist') },
       { from: './app/templates', to: path.resolve(__dirname, 'dist') },
       { from: './app/manifest.json', to: path.resolve(__dirname, 'dist') }
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
