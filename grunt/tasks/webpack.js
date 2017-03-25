/* globals module */
const path = require('path');

module.exports = {
  build: {
    target: 'web',
    devtool: 'inline-source-map',
    entry: [
      './src/index.js'
    ],
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: 'dactylographsy.js',
    },
    resolve: {
      modules: [
        'node_modules',
        './src'
      ],
    },
    stats: {
      colors: false,
      modules: true,
      reasons: true
    },
    progress: true,
    failOnError: true,
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }]
    }
  }
};
