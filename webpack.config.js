var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    mode:'development',
    entry:'./src/indexjs.js',
    output:{
        path:__dirname+"/dist",
        filename:"index.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|jpg|gif|webp)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192*8
                    },
                  },
                ],
              },
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
      title:"html_webpack_plugin",
      filename:"index.html",
      template:"./src/index.html",
      minify:true
  }),
    new MiniCssExtractPlugin({
      filename:"index.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'static' }
      ]
    }),
    new CleanWebpackPlugin()
  ],
    devServer:{
       port:9980,
       open:true
    },
}