const webpack = require('webpack')
const { resolve } = require('./utils')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },
  output: {
    path: resolve('static/js/lib'),
    filename: 'vendor-react-[chunkhash:7].js?',
    library: '[name]_library'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: resolve('build/vendor-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
