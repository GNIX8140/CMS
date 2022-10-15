const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack')
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8196,
    https: {
      key: fs.readFileSync('./ssl/server-xing.top.key'),
      cert: fs.readFileSync('./ssl/server-xing.top.crt')
    },
    allowedHosts: [
      'server-xing.top'
    ]
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
