const path = require('path')

module.exports = function (config, mode) {
  config.module.rules[0].exclude.push(path.join(__dirname, '../src'), path.join(__dirname, '../dist')) // disable babel
  config.module.rules.push({
    test: /\.css$/,
    include: path.join(__dirname, '../dist'),
    use: ['style-loader', 'css-loader']
  }, {
    test: /\.scss$/,
    include: [path.join(__dirname, '../src')],
    use: ['css-loader', 'sass-loader']
  }, {
    test: /\.scss$/,
    include: [path.join(__dirname, '../themes')],
    use: ['style-loader', 'css-loader', 'sass-loader']
  })
  return config
}
