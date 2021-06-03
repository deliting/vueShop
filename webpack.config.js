var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
//webpack压缩代码
// const UglifyJsPlugin=require('uglifyjs-webpack-plugin');



module.exports = {//模块化导出
  entry: './src/main.js',
  
  output: {
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins:[
    
    new htmlWebpackPlugin({
        template: path.join(__dirname,'./src/index.html'),
        filename: 'index.html',
        //favicon:path.resolve('favicon.ico')
    }),
    new vueLoaderPlugin(),
  //   optimization : {
  //     minimizer: [
  //         new UglifyJsPlugin({
  //             uglifyOptions: {
  //                 compress: false
  //             }
  //         })
  //     ]
  // }
  ],
  module:{
      rules:[
          {test:/\.css$/,use:['style-loader','css-loader']},
          {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
          {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
          {test:/\.(jpg|jpeg|png|dmp|gif)$/,use: 'url-loader?limit=7630&name=[hash:8]-[name].[ext]'},
          {test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'},
          { test: /\.js$/, use: 'babel-loader',exclude: /node_modules/} ,
          {test: /\.vue$/,use:'vue-loader'}
        ]
       
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.js"
    }
  },
  devServer: { 
   
  },
  mode: 'development'
}