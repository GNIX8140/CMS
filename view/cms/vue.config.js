const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port:8196,
    https: {
      key: fs.readFileSync('./ssl/server-xing.top.key'),
      cert: fs.readFileSync('./ssl/server-xing.top.crt')
    },
    allowedHosts: [
      'server-xing.top'
    ]
  },
})
