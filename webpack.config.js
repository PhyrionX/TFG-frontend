const HtmlWebPackPlugin = require("html-webpack-plugin");
const { rules: scssRules, plugin: extractPlugin } = require('build-tools-webpack-sass/extract');
const { rules: fileRules } = require('build-tools-webpack-files');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
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
  plugins: [htmlPlugin]
};
