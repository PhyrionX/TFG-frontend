const HtmlWebPackPlugin = require("html-webpack-plugin");
const { rules: scssRules, plugin: extractPlugin } = require('build-tools-webpack-sass/extract');
const { rules: fileRules } = require('build-tools-webpack-files');

module.exports = (env, options) => {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        ...scssRules,
        ...fileRules,
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    resolve: {
      extensions: [ '.js', '.jsx' ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.ejs",
        filename: "./index.html",
        baseUrl: options.mode == 'development'?'/':'/social/'
      })
    ]
  }
};
