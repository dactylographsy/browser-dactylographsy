module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '../',
    frameworks: ['mocha'],
    files: [
      'test/src/**/*.spec.js', {
        pattern: 'test/src/fixtures/**/*.json',
        watched: true,
        served: true,
        included: false
      }
    ],

    preprocessors: {
      'test/src/**/*.js': ['webpack', 'sourcemap']
    },

    reporters: ['progress'],

    webpack: {
      plugins: [],
      devtool: 'inline-source-map',
      resolve: {
        alias: {},
        modulesDirectories: [
          'src',
          'bower_modules',
          'node_modules',
          'test'
        ],
        extensions: ['', '.js']
      },
      externals: {},
      module: {
        loaders: [{
          test: /\.json/,
          loader: 'json-loader'
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }, {
          test: /\.css/,
          loader: 'style-loader!css-loader'
        }]
      }
    },

    webpackMiddleware: {
      noInfo: true,
      quiet: true
    },

    exclude: [],
    port: 9876,

    browserStack: {
      project: 'browser-dactylographsy',
      username: process.env.BS_USERNAME,
      accessKey: process.env.BS_ACCESSKEY
    },

    customLaunchers: {
      bs_win81_ie_11: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_win8_ie_10: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '8'
      },
      bs_mavericks_chrome_44: {
        base: 'BrowserStack',
        device: null,
        os: 'OS X',
        browser_version: '44.0',
        browser: 'chrome',
        os_version: 'Mavericks'
      },
      bs_yosemite_firefox_40: {
        base: 'BrowserStack',
        device: null,
        os: 'OS X',
        browser_version: '40.0',
        browser: 'firefox',
        os_version: 'Yosemite'
      },
      bs_ipad_mini: {
        base: 'BrowserStack',
        device: 'iPad mini Retina',
        os: 'ios',
        os_version: '7.0',
        browser_version: null,
        browser: 'Mobile Safari'
      }
    },

    browsers: [
      'Chrome'
    ],

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-browserstack-launcher',
      'karma-firefox-launcher',
      'karma-mocha-reporter',
      'karma-mocha'
    ],

    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
