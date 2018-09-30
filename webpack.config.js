/* eslint-env node */
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */
const path = require("path");
const ExtractTextPlugin = require("mini-css-extract-plugin");

const srcPath = path.join(__dirname, "src");
const themesPath = path.join(__dirname, "themes");

module.exports = {
  entry: "./src/index.js",
  output: {
    library: "blenderElements",
    filename: "build/blender-elements.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: srcPath,
        use: ["css-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        include: themesPath,
        use: [ExtractTextPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [new ExtractTextPlugin({ filename: "dist/themes/default.css" })]
};
