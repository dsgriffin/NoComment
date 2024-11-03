const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './app/scripts/background.ts',
    content: './app/scripts/content.ts',
    options: './app/scripts/options.ts',
    popup: './app/scripts/popup.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', 'node_modules'],
    alias: {
      'jquery-ui': path.join(__dirname, '/node_modules/jquery-ui-dist/jquery-ui.min.js'),
      datatables: path.join(__dirname, '/node_modules/datatables/media/js/jquery.dataTables.min.js')
    }
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(jpe?g|gif|png)$/, loader: 'file-loader?emitFile=false&name=[path][name].[ext]' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './app/images', to: path.resolve(__dirname, 'dist') },
        { from: './app/styles', to: path.resolve(__dirname, 'dist') },
        { from: './app/templates', to: path.resolve(__dirname, 'dist') },
        { from: './app/manifest.json', to: path.resolve(__dirname, 'dist') }
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
