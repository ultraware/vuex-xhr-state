const path = require('path')
const webpack = require('webpack')
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'vuex-xhr-state.js',
    library: 'vuex-xhr-state',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyEsPlugin({
      compress: { warnings: false }
    })
  ]
}
