const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      pug,
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'      
              },
              {
                loader: 'resolve-url-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ["file-loader?name=[name].[ext]&outputPath=images/",
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(
      {
        filename: 'main.css',
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: false
    }),

 ]
};
module.exports = config;