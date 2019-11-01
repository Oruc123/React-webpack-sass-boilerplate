const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require("./webpack.config.base.js");

module.exports = webpackMerge(baseConfig,{
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunkcash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          compress: false,
          mangle: true
        }
      }),
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new HtmlWebPackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process_env':{
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
 
  devtool: 'inline-source-map'
})