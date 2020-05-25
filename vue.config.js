const path = require("path")
const resolve = dir => {
  return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const BASE_URL = './'
module.exports = {
  publicPath: BASE_URL,
  lintOnSave: false,

  chainWebpack: config => {
    // 删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 压缩代码
    config.optimization.minimize(true)
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@p', resolve('src/pages'))
  },

  productionSourceMap: false,

  configureWebpack: (config)=>{
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 去除console
      config.plugins.push( // 压缩gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/index.scss'),
      ],
    }
  },

  devServer: {
    // https: true,
    open: false, //是否自动弹出浏览器页面
    host: "localhost", 
    port: '8080',
    hotOnly: false, 
    proxy: {
      '/api': {
        target: 'https://whallet.net', //API服务器的地址
        ws: true,  //代理websockets
        secure:false,
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    },
  }
}
