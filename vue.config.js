const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './.cert/cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './.cert/cert.crt')),
    },
    host: 'localhost',
    port: 5173, 
  },
});
