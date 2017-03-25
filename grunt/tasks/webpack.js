/* globals module */
module.exports = {
  build: {
    target: 'web',
    debug: true,
    devtool: 'inline-source-map',
    entry: [
      './src/index.js'
    ],
    output: {
      path: './dist/',
      filename: 'dactylographsy.js',
    },
    modulesDirectories: [
      'node_modules',
      './src'
    ],
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
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      }]
    }
  }
};
