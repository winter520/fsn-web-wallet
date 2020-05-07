const path = require("path")
const resolve = dir => {
  return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const BASE_URL = './'
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/index.scss'),
      ],
    })
}
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
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
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
}
