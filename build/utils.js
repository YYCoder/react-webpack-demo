const path = require('path')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const nodeObjectHash = require('node-object-hash')
const fs = require('fs')
const shell = require('shelljs')
const childProcess = require('child_process')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function exec(cmd) {
  return childProcess.execSync(cmd).toString().trim()
}

function assetsPath(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.pro.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

function cssLoaders(options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function(loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    // less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'postcss', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'postcss', 'sass?outputStyle=expanded']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
function styleLoaders(options) {
  var output = []
  var loaders = cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

function setEntrys(conf) {

  conf.entry = conf.entry || {}
  conf.plugins = conf.plugins || []

  var isNotDev = 'development' !== process.env.NODE_ENV
  var htmlConfig = {
    minify: {
      removeComments: isNotDev,
      collapseWhitespace: isNotDev,
      removeAttributeQuotes: isNotDev
    }
  }

  var entries = Object.keys(conf.entry)
  entries.map(function(ent) {
    if ('app' !== ent) return;
    conf.plugins.push(new HtmlWebpackPlugin(Object.assign({
      filename: `${path.resolve(config.base.outputRoot, 'views')}/${ent}/index.html`,
      chunks: [ent, 'vendor', 'manifest', 'common'],
      template: config.base.entryTemplate,
      inject: false,
      chunksSortMode: 'dependency',
      module: config.base.moduleName,
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }, htmlConfig)))
  });

  // yuanye：test先不用hard-source
  /*const hardSourceCacheDir = config.base.hardSourceCacheDir
  const envHardSourceCacheDir = `${hardSourceCacheDir}/${process.env.NODE_ENV}`
  // 添加 HardSourceWebpackPlugin 插件优化 webpack 构建速度
  conf.plugins.push(new HardSourceWebpackPlugin({
    cacheDirectory: `${envHardSourceCacheDir}/[confighash]`,
    configHash: function(webpackConfig) {
      return nodeObjectHash({sort: false}).hash(webpackConfig);
    },
    environmentHash: {
      root: process.cwd(),
      directories: [],
      files: ['package-lock.json', 'yarn.lock'],
    }
  }));*/

  return conf;
}
// yuanye：不需要
/*
function entries(opt) {
  // cd src
  shell.cd('./src');
  const ens = shell.ls().map(function(item) {
    const obj = {};
    // 将忽略所有以下划线“_”开头的文件夹
    if (!/^_[\w-]+$/.test(item)) {
      obj[item] = './src/' + item + '/';
    }
    return obj;
  });
  shell.cd('..');

  return Object.assign.apply(null, [].concat(ens, opt));
}
*/
// 利用hash记录当前webpack配置是否与上次相同，若不同则清空hard-source插件缓存目录，重新生成缓存
function hardSourceInit(webpackConfig) {
  const hardSourceCacheDir = config.base.hardSourceCacheDir
  const envHardSourceCacheDir = `${hardSourceCacheDir}/${process.env.NODE_ENV}`

  // 首次使用 HardSourceWebpackPlugin 还不存在 cache 目录，先创建目录
  !fs.existsSync(hardSourceCacheDir) && fs.mkdirSync(hardSourceCacheDir)
  !fs.existsSync(envHardSourceCacheDir) && fs.mkdirSync(envHardSourceCacheDir)

  fs.readFile(`${envHardSourceCacheDir}/webpackHash`, (err, data = '') => {
    const lastHash = data.toString()
    // 记录配置文件hash，用于对比是否需要重新构建并更新缓存
    const newHash = nodeObjectHash({ sort: false }).hash(webpackConfig)
    // 若两次构建配置不同，则清空缓存目录，重新生成缓存，防止目录越来越大
    if (lastHash !== newHash) {
      shell.rm('-rf', `${envHardSourceCacheDir}/*`)
      // 更新webpackHash，用于对比两次构建的配置是否相同，相同则直接使用缓存
      fs.writeFileSync(`${envHardSourceCacheDir}/webpackHash`, newHash)
    }
  })
}


module.exports = {
  resolve,
  exec,
  assetsPath,
  cssLoaders,
  styleLoaders,
  setEntrys,
  // entries,
  hardSourceInit
}


