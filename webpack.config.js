const path = require('path')
const Babili = require('babili-webpack-plugin')

module.exports = {
  entry: [ './src/index.js' ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ]
          }
        }
      }
    ]
  },
  plugins: [
    new Babili()
  ],
  externals: [
    'superagent'
  ]
}
