const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack')
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8196,
    https: {
      key: fs.readFileSync('./ssl/cert.key'),
      cert: fs.readFileSync('./ssl/cert.crt')
    },
    // allowedHosts: [
    //   'server-xing.top'
    // ]
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }]);
  },
  publicPath: './'
})
