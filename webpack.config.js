const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const themesPath = path.join(__dirname, 'themes')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'blenderElements',
    filename: 'dist/blender-elements.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      include: srcPath,
      use: ['css-loader', 'sass-loader']
    }, {
      test: /\.scss$/,
      include: themesPath,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('dist/themes/default.css')
  ]
}
