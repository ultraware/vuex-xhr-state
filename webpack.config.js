const path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'uw-vue-helpers',
  },
}
