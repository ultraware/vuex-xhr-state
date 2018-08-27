const path = require('path')

module.exports = {
  mode: 'production',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       loader: 'babel-loader',
  //       include: [path.resolve(__dirname, './src')],
  //     },
  //   ],
  // },
  // resolve: {
  //   extensions: ['.js'],
  //   alias: {
  //     src: path.resolve(__dirname, './src'),
  //   },
  // },
  externals: {
    'js-md5': 'js-md5',
    vuex: 'vuex',
    'vue-class-component': 'vue-class-component',
  },
  entry: path.resolve(__dirname, './lib/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'uw-vue-helpers',
  },
}
