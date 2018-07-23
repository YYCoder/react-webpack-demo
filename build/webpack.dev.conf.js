const path = require('path')
const { styleLoaders, assetsPath, setEntrys } = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')

// yuanye：test
/*const loaders = styleLoaders().concat([{
  test: /\.js$/,
  loaders: 'react-hot!babel'
}])
console.log(loaders)*/
const devConfig = {
  /*entry: {
    'webpack-hot-middleware': [
      // 'webpack-hot-middleware/client?http://127.0.0.1:5000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
    ]
  },*/
  watch: true,
  module: {
    // rules: loaders
    rules: styleLoaders()
  },
  output: {
    path: config.dev.assetsRoot,
    filename: assetsPath('js/[name]/build.js'),
    chunkFilename: assetsPath('js/[id]/chunk.js')
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({'process.env': config.dev.env}),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
}
// const entrys = baseWebpackConfig.entry
// const entrylength = Object.keys(entrys).length - 1
// const exportConfig = require('./entry-split.js')(entrylength, baseWebpackConfig, devConfig)

// yuanye：使用HMR，单入口也无需用parallel-webpack
const exportConfig = merge(setEntrys(baseWebpackConfig), devConfig)

module.exports = exportConfig
