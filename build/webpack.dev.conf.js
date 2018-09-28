// import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');

const express = require("express"); //node.js的内置框架
const app = express();//请求server
let apiRoutes = express.Router(); //express框架的router函数
let appData = require('./db.json');//加载本地数据文件
let NewsList = appData.getNewsList;//获取对应的本地数据并赋值给变量
let login = appData.login;//获取对应的本地数据并赋值给变量
let order = appData.createOrder;//获取对应的本地数据并赋值给变量
let orderList = appData.getOrderList;//获取对应的本地数据并赋值给变量
let price = appData.getPrice;//获取对应的本地数据并赋值给变量
app.use('./api',apiRoutes) //通过路由请求数据

var port = process.env.PORT || config.dev.port
// app.listen(port+1,err=>{
//   if(err){
//     console.log(port)
//   console.log(err)
//     return ;
//   }
// })

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.get('/api/NewsList',(req,res) =>{
        res.json({
          errno:0,
          data:NewsList,
        })
      }),//接口返回json数据，上面配置的数据NewsList就赋值给data请求后调用
      app.get('api/login',(req,res) =>{
        res.json({
          errno:0,
          data:login,
        })
      }),
      app.post('/api/getPrice',(req,res) =>{
        res.json({
          errno:0,
          data:price,
        })
      }),
      app.post('/api/order',(req,res) =>{
        res.json({
          errno:0,
          data:order,
        })
      }),
      app.post('/api/orderList',(req,res) =>{
        res.json({
          errno:0,
          data:orderList,
        })
      })
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
