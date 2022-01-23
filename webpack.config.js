const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
  path: path.join(__dirname, '/build'),
  filename: 'bundle.js'
},
devServer: {
  static: {
    directory: path.join(__dirname, 'public'),
  },
  port: 3000
},
resolve: {
  alias: {
    canvas: path.resolve(__dirname, '/src/canvas'),
    common: path.resolve(__dirname, '/src/common'),
    colorspace: path.resolve(__dirname, '/src/colorspace')
  },
  extensions: ['.js', 'jsx', 'sass', 'scss']
},
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.s[ac]ss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
},
plugins: [new HtmlWebpackPlugin({ 
  favicon: './src/static/imgs/favicon.ico',
  template: './src/index.html',
  inject: 'body'
})],
}