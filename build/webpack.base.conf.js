const { assetsPath, entries, resolve } = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const theme = require('./antd-theme')

const webpackConfig = {
  cache: true,
  entry: {
    app: './src',
    common: ['./static/css/common/reset.scss']
  },
  output: {
    path: config.pro.assetsRoot,
    filename: assetsPath('js/[name]/build-[hash:7].js'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.pro.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [
      '.js', '.jsx', '.json', 'scss', '.ts'
    ],
    modules: [
      resolve('src'), resolve('static'), resolve('node_modules')
    ],
    alias: {
      'src': resolve('src'),
      'static': resolve('static'),
      'images': resolve('static/images'),
      'components': resolve('src/_components'),
      'style': resolve('static/css/common'),
      'tools': resolve('src/_assets/tools.js'),
      'js': resolve('static/js/common'),
      'assets': resolve('src/_assets'),
      'pages': resolve('src/_pages'),
      'reducers': resolve('src/_reducers'),
      'actions': resolve('src/_actions')
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { modifyVars: theme }
          },
        ],
        include: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory=./babel_cache',
          options: {
            presets: ["env", "react", "es2015", "stage-0"]
          }
        },
        include: [
          resolve('src'), resolve('test'), resolve('static')
        ],
        exclude: [
          resolve('node_modules')
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024 * 10,
          name: assetsPath('image/[name].[ext]?[hash:10]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1024 * 8,
          name: assetsPath('fonts/[name].[ext]?[hash:10]')
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: {
          glob: './build'
        },
        to: `${config.base.outputRoot}`
      }, {
        from: {
          glob: './controller'
        },
        to: `${config.base.outputRoot}`
      }, {
        from: {
          glob: './deploy'
        },
        to: `${config.base.outputRoot}`
      }, {
        from: {
          glob: './mock'
        },
        to: `${config.base.outputRoot}`
      }, {
        from: {
          glob: './views/**/!(_*)'
        },
        to: `${config.base.outputRoot}`
      }, {
        from: {
          glob: './static/**/!(_*)'
        },
        to: `${config.base.outputRoot}`
      }
    ], {
      ignore: ['*.scss', '*.jsx']
    }),
    new webpack.DllReferencePlugin({context: __dirname, manifest: require('./vendor-manifest.json')})
  ]
}

module.exports = webpackConfig;
