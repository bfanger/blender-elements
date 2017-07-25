const path = require('path')

module.exports = function (config, mode) {
  config.module.rules[0].exclude.push(path.join(__dirname, '../src'), path.join(__dirname, '../dist')) // disable babel
  config.module.rules.push({
    test: /\.scss$/,
    include: [path.join(__dirname, '../src')],
    use: ['css-loader', 'sass-loader']
  }, {
    test: /\.scss$/,
    include: [path.join(__dirname, '../themes'), path.join(__dirname, '../stories')],
    use: ['style-loader', 'css-loader', 'sass-loader']
  }, {
    test: /\.css$/,
    include: [path.join(__dirname, '../dist'), path.join(__dirname, '../node_modules/bootstrap')],
    use: ['style-loader', 'css-loader']
  }, {
    test: /\.(eot|woff|woff2|ttf|svg)$/,
    include: [path.join(__dirname, '../node_modules/bootstrap')],
    use: ['file-loader']
  })
  for(const i in config.plugins) {
    const plugin = config.plugins[i]
    if (plugin.options && plugin.options.compress) {// uglify?
      config.plugins.splice(i, 1)
      break;
    }
  }
  return config
}
