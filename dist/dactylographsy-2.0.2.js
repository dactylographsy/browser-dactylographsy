/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {

  // Not level bound logging needed yet
  function Log() {
    var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, Log);

    this.enabled = enabled;

    if (this.enabled) {
      this.console = window.console;
    }
  }

  _createClass(Log, [{
    key: "log",
    value: function log() {
      if (this.enabled) {
        var _console;

        (_console = this.console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "info",
    value: function info() {
      if (this.enabled) {
        var _console2;

        (_console2 = this.console).info.apply(_console2, arguments);
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (this.enabled) {
        var _console3;

        (_console3 = this.console).warn.apply(_console3, arguments);
      }
    }
  }, {
    key: "debug",
    value: function debug() {
      if (this.enabled) {
        var _console4;

        (_console4 = this.console).debug.apply(_console4, arguments);
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (this.enabled) {
        var _console5;

        (_console5 = this.console).error.apply(_console5, arguments);
      }
    }
  }]);

  return Log;
}();

exports.default = Log;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUrlParam;
var getParams = function getParams(url) {
  var query = url;
  var regex = /[?&;](.+?)=([^&;]+)/g;
  var params = {};
  var match = void 0;

  if (query) {
    while (match = regex.exec(query)) {
      params[match[1]] = decodeURIComponent(match[2]);
    }
  }

  return params;
};

function getUrlParam(param) {
  var ifUnset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.search;

  var params = getParams(url);

  if (params.hasOwnProperty(param)) {
    try {
      return JSON.parse(params[param]);
    } catch (e) {
      return encodeURIComponent(params[param]);
    }
  } else {
    return ifUnset;
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, [{
    key: 'get',
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.request(url, options);
    }
  }, {
    key: 'head',
    value: function head(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.request(url, options, 'HEAD');
    }
  }, {
    key: 'request',
    value: function request(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        if ('withCredentials' in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== 'undefined') {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }

        if (options.withCredentials) {
          xhr.withCredentials = true;
        }

        // Response handlers.
        xhr.onload = function () {
          if (xhr.status >= 400) {
            reject(xhr);
          } else {
            resolve({
              xhr: xhr,
              text: xhr.responseText,
              url: xhr.responseURL
            });
          }
        };

        xhr.onerror = function () {
          reject(xhr);
        };

        xhr.send();
      });
    }
  }]);

  return Ajax;
}();

exports.default = Ajax;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

var _stringHash = __webpack_require__(10);

var _stringHash2 = _interopRequireDefault(_stringHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Cache);

    var defaultPrefix = '__dactylographsy';
    var _options$enableLoggin = options.enableLogging,
        enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;


    this.log = new _log2.default((0, _url2.default)('dactylographsy-enableLogging', enableLogging));

    this.options = options;
    this.cachePrefix = this.options.cachePrefix || defaultPrefix;
    this.isSupported = this.supported();

    if (this.options.appPrefix) {
      this.cachePrefix = this.cachePrefix + '--' + this.options.appPrefix;
    } else if (!this.options.cachePrefix) {
      this.cachePrefix += '__';
    }
  }

  _createClass(Cache, [{
    key: 'getPrefix',
    value: function getPrefix() {
      return this.cachePrefix;
    }
  }, {
    key: 'isItemValid',
    value: function isItemValid(code, hash) {
      if (typeof code !== 'string') {
        return false;
      }

      return (0, _stringHash2.default)(code) === hash;
    }
  }, {
    key: 'parse',
    value: function parse(item) {
      return JSON.parse(item);
    }
  }, {
    key: 'get',
    value: function get(key, defaultValue) {
      var _this = this;

      var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return new Promise(function (resolve, reject) {
        if (!_this.isSupported) {
          reject();
        }

        var _item = localStorage.getItem(_this.cachePrefix + '-' + key);

        if (_item === null && defaultValue !== undefined) {
          _this.set(defaultValue, 'plain', key);

          resolve(defaultValue);

          return;
        }

        if (_item !== null && hash !== false) {
          var _parsed = _this.parse(_item);

          _this.log.info('Found item with key: ' + key + ' in cache which needs validation...');

          if (_this.isItemValid(_parsed.code, hash)) {
            _this.log.info('...matches expected hash ' + hash + '.');

            resolve(_parsed.code);
          } else {
            _this.log.info('...does not match expected hash ' + hash + ' - pruning.');

            _this.remove(key);

            reject();
          }
        } else if (_item) {
          _this.log.info('Found item with key: ' + key + ' in cache.');

          resolve(_this.parse(_item).code);
        } else {
          _this.log.info('Couldn\'t find item with key: ' + key + ' in cache.');

          reject();
        }
      });
    }
  }, {
    key: 'has',
    value: function has(key) {
      if (!this.isSupported) {
        return false;
      }

      return localStorage.getItem(this.cachePrefix + '-' + key) !== null;
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      if (!this.isSupported) {
        return false;
      }

      return localStorage.removeItem(this.cachePrefix + '-' + key);;
    }
  }, {
    key: 'set',
    value: function set(code, type, key) {
      var singularBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!this.isSupported) {
        return false;
      }
      if (singularBy) {
        this.dedupe(singularBy);
      }

      var cached = {
        now: +new Date(),
        url: key,
        code: code,
        type: type,
        singularBy: typeof singularBy === 'string' ? singularBy : undefined
      };

      localStorage.setItem(this.cachePrefix + '-' + key, JSON.stringify(cached));

      return cached;
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (!this.isSupported) {
        return false;
      }

      for (var key in localStorage) {
        if (key.indexOf(this.cachePrefix) >= 0) {
          this.log.log('Removing item ' + key + ' requested by flush.');

          localStorage.removeItem(key);
        }
      }

      return true;
    }
  }, {
    key: 'supported',
    value: function supported() {
      var item = '__dactylographsy__feature-detection';

      try {
        localStorage.setItem(item, item);
        localStorage.removeItem(item);

        return true;
      } catch (e) {
        this.log.warn('Localstorage not supported in browser - no caching!');

        return false;
      }
    }
  }, {
    key: 'dedupe',
    value: function dedupe(singularBy) {
      for (var key in localStorage) {
        var dactylographsyItem = key.indexOf(this.cachePrefix) >= 0;

        if (!dactylographsyItem) {
          continue;
        }

        var item = JSON.parse(localStorage.getItem(key));

        if (typeof singularBy === 'string' && typeof item.singularBy === 'string' && item.singularBy === singularBy) {
          this.log.log('Deduping by ' + singularBy + ' before adding dupe in ' + key + '.');

          localStorage.removeItem(key);
        }
      }
    }
  }]);

  return Cache;
}();

exports.default = Cache;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dactylographsy = __webpack_require__(5);

var _dactylographsy2 = _interopRequireDefault(_dactylographsy);

var _es6Promise = __webpack_require__(8);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6Promise2.default.polyfill();

if (typeof window !== 'undefined') {
  window.dactylographsy = new _dactylographsy2.default({
    autorun: true
  });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

var _injector = __webpack_require__(7);

var _injector2 = _interopRequireDefault(_injector);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dactylographsy = function () {
  function Dactylographsy() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Dactylographsy);

    var _options$autorun = options.autorun,
        autorun = _options$autorun === undefined ? false : _options$autorun;
    var _options$enableLoggin = options.enableLogging,
        enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;


    this.log = new _log2.default((0, _url2.default)('dactylographsy-enableLogging', enableLogging));
    this.hookIntoDom();
    this.readConfiguration();

    this.cache = new _cache2.default({
      appPrefix: this.config.appPrefix
    });

    if (autorun) {
      this.run();
    }
  }

  _createClass(Dactylographsy, [{
    key: 'hookIntoDom',
    value: function hookIntoDom() {
      if (typeof document === 'undefined') {
        return;
      }

      this.executingScript = document.getElementById('dactylographsy');
      this.injectInto = document.body || document.head || document.getElementsByTagName('script')[0];
    }
  }, {
    key: 'readConfiguration',
    value: function readConfiguration() {
      this.manifestUrls = this.readAttrOnScript('manifests');
      this.config = this.readAttrOnScript('config');
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this = this;

      var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      return Promise.all(this.manifestUrls.map(function (url) {
        return new _injector.Manifest(url, _this.config).get();
      })).then(function (manifests) {
        _this.log.info('Fetched all manifests, ' + manifests.length + ' in total.');

        if (_this.config.cacheInLocalStorage) {
          _this.cache.set(manifests, 'manifests', 'manifests');
        }

        return new _injector2.default(inject ? _this.injectInto : undefined, manifests, _this.config).inject();
      });
    }
  }, {
    key: 'restore',
    value: function restore() {
      var _this2 = this;

      var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      return this.cache.get('manifests').then(function (manifests) {
        _this2.log.info('Restoring with manifests in cache later refreshing via network (delayed).');

        return new _injector2.default(inject ? _this2.injectInto : undefined, manifests, _this2.config).inject();
      });
    }
  }, {
    key: 'readAttrOnScript',
    value: function readAttrOnScript(attr) {
      if (!this.executingScript) {
        return false;
      }

      var _attr = this.executingScript.getAttribute('data-' + attr);

      return _attr ? JSON.parse(_attr) : undefined;
    }
  }, {
    key: 'run',
    value: function run() {
      var _this3 = this;

      var ttl = (0, _url2.default)('dactylographsy-ttl', this.config.ttl);

      if (!this.config.cacheInLocalStorage) {
        // Remove all cache-keys we might have set in the past and then switched config
        this.log.info('Flushing local-storage due to config-option "cacheInLocalStorage=false"');
        this.cache.flush();
      }

      if (this.config.cacheInLocalStorage && ttl) {
        this.cache.get('clt', 0).then(function (clt) {
          if (clt >= ttl) {
            _this3.log.info('Flushing cache due to exeeding TTL of ' + ttl + '.');

            _this3.cache.flush();
          } else {
            _this3.cache.set(++clt, 'plain', 'clt');
          }
        });
      }

      // Prefetching means fetching all manifests without injecting
      if (this.config.cacheOnly) {
        return this.refresh(false);
      }
      // ...else restore or refresh the app (with injection of dependencies)
      else {
          // Either the configuration of non cached
          // manifests or requested bundle verification
          // forces a refresh of all manifests.
          return this.config.cachedManifests === false || this.config.verification === true || this.config.cacheInLocalStorage === false ? this.refresh() : this.restore().then(function (injectedFromCache) {
            var _config$refreshDelay = _this3.config.refreshDelay,
                refreshDelay = _config$refreshDelay === undefined ? 5000 : _config$refreshDelay;


            return new Promise(function (resolve, reject) {
              window.setTimeout(function () {
                _this3.refresh(injectedFromCache).then(resolve, reject);
              }, refreshDelay);
            });
          }).catch(function () {
            _this3.log.info('No manifests in cache, refreshing via network.');

            return _this3.refresh();
          });
        }
    }
  }]);

  return Dactylographsy;
}();

exports.default = Dactylographsy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Css = exports.Js = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cache = __webpack_require__(3);

var _cache2 = _interopRequireDefault(_cache);

var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _url = __webpack_require__(1);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Js = function () {
  function Js() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Js);

    var _config$verification = config.verification,
        verification = _config$verification === undefined ? false : _config$verification;
    var _config$cacheInLocalS = config.cacheInLocalStorage,
        cacheInLocalStorage = _config$cacheInLocalS === undefined ? true : _config$cacheInLocalS,
        _config$enableLogging = config.enableLogging,
        enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;


    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);

    cacheInLocalStorage = (0, _url2.default)('dactylographsy-cacheInLocalStorage', cacheInLocalStorage);

    this.cache = new _cache2.default({
      appPrefix: config.appPrefix,
      enableLogging: enableLogging
    });

    this.cacheDelay = config.cacheDelay || 5000;
    this.verification = verification;
    this.cacheInLocalStorage = cacheInLocalStorage;

    this.log = new _log2.default(enableLogging);
  }

  _createClass(Js, [{
    key: 'prepareWithText',
    value: function prepareWithText(text, url) {
      var script = document.createElement('script');

      this.log.info('Creating <script />-tag with text for ' + url + '.');

      script.defer = false;
      script.async = false;

      script.setAttribute('data-dactylographsy-url', url);

      script.text = '\n      ' + text + '\n      //# sourceURL=' + url + '\n    ';

      return Promise.resolve(script);
    }
  }, {
    key: 'prepareWithUrl',
    value: function prepareWithUrl(urls) {
      var _this = this;

      var whichUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'printed';

      var urlKeys = Object.keys(urls).filter(function (key) {
        return ['printed', 'raw'].indexOf(key) > -1;
      });
      var scriptTags = {};

      urlKeys.forEach(function (urlKey) {
        var script = document.createElement('script');
        var url = urls[urlKey];

        _this.log.info('Creating <script />-tag with url: ' + url + '.');

        script.async = false;
        script.defer = false;

        script.setAttribute('data-dactylographsy-url', url);
        script.setAttribute('data-dactylographsy-uncached-js', urlKey === 'printed');

        // Bind `load` listener on script element to cache asset
        script.addEventListener('load', function () {
          if (urlKey === 'printed') {
            _this.ensureCache(url, urls.singularBy, _this.cacheDelay);
          }
        });

        script.src = url;

        scriptTags[urlKey] = script;
      });

      return Promise.resolve(scriptTags);
    }
  }, {
    key: 'ensureCache',
    value: function ensureCache(url) {
      var _this2 = this;

      var singularBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return new Promise(function (resolve, reject) {
        if (_this2.cache.has(url)) {
          return resolve();
        }
        if (!_this2.cacheInLocalStorage) {
          return resolve('Caching in localStorage is disabled');
        }

        _this2.log.info('Loading JavaScript from ' + url + ' for cache in ' + delay + '.');

        window.setTimeout(function () {
          return new _ajax2.default().get(url).then(function (response) {
            var responseText = response.text;


            _this2.cache.set(responseText, 'js', url, singularBy);

            _this2.log.info('Loaded JavaScript from ' + url + ' now cached.');

            resolve();
          }).catch(function () {
            _this2.log.info('Failed attempting to cache JavaScript from ' + url + '.');
          });
        }, delay);
      });
    }
  }, {
    key: 'hash',
    value: function hash(_hash) {
      return this.verification === true ? _hash : false;
    }
  }, {
    key: 'tags',
    value: function tags(urls) {
      var _this3 = this;

      return this.cache.get(urls.printed, undefined, this.hash(urls.id)).then(function (text) {
        return _this3.prepareWithText(text, urls.printed).then(function (cached) {
          return {
            cached: cached
          };
        });
      }, function () {
        return _this3.prepareWithUrl(urls);
      });
    }
  }]);

  return Js;
}();

exports.Js = Js;

var Css = function () {
  function Css() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Css);

    var _config$verification2 = config.verification,
        verification = _config$verification2 === undefined ? false : _config$verification2;
    var _config$cacheInLocalS2 = config.cacheInLocalStorage,
        cacheInLocalStorage = _config$cacheInLocalS2 === undefined ? true : _config$cacheInLocalS2,
        _config$enableLogging2 = config.enableLogging,
        enableLogging = _config$enableLogging2 === undefined ? false : _config$enableLogging2;


    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);

    cacheInLocalStorage = (0, _url2.default)('dactylographsy-cacheInLocalStorage', cacheInLocalStorage);

    this.cache = new _cache2.default({
      appPrefix: config.appPrefix
    });

    this.cacheDelay = config.cacheDelay || 5000;
    this.verification = verification;
    this.cacheInLocalStorage = cacheInLocalStorage;

    this.log = new _log2.default(enableLogging);
  }

  _createClass(Css, [{
    key: 'ensureCache',
    value: function ensureCache(url) {
      var _this4 = this;

      var singularBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return new Promise(function (resolve, reject) {
        if (_this4.cache.has(url)) {
          return resolve();
        }
        if (!_this4.cacheInLocalStorage) {
          return resolve('Caching in localStorage is disabled');
        }

        _this4.log.info('Loading CSS from ' + url + ' for cache in ' + delay + '.');

        window.setTimeout(function () {
          return new _ajax2.default().get(url).then(function (response) {
            var responseText = response.text;


            _this4.cache.set(responseText, 'css', url, singularBy);

            _this4.log.info('Loaded CSS from ' + url + ' now cached.');

            resolve();
          }).catch(function () {
            _this4.log.info('Failed attempting to cache CSS from ' + url + '.');
          });
        }, delay);
      });
    }
  }, {
    key: 'prepareWithUrl',
    value: function prepareWithUrl(urls) {
      var _this5 = this;

      var urlKeys = Object.keys(urls).filter(function (key) {
        return ['printed', 'raw'].indexOf(key) > -1;
      });
      var linkTags = {};

      urlKeys.forEach(function (urlKey) {
        var link = document.createElement('link');
        var url = urls[urlKey];

        _this5.log.info('Creating <link />-tag with url: ' + url + '.');

        link.type = 'text/css';
        link.rel = 'stylesheet';

        link.setAttribute('data-dactylographsy-url', url);
        link.setAttribute('data-dactylographsy-uncached-css', urlKey === 'printed');

        // Bind `load` listener on link element to cache asset
        link.addEventListener('load', function () {
          if (urlKey === 'printed') {
            _this5.ensureCache(url, urls.singularBy, _this5.cacheDelay);
          }
        });

        link.href = url;

        linkTags[urlKey] = link;
      });

      return Promise.resolve(linkTags);
    }
  }, {
    key: 'prepareWithText',
    value: function prepareWithText(text, url) {
      var link = document.createElement('link');

      this.log.info('Creating <link />-tag with text for url: ' + url + '.');

      link.setAttribute('data-dactylographsy-url', url);

      link.textContent = text;

      return Promise.resolve(link);
    }
  }, {
    key: 'hash',
    value: function hash(_hash2) {
      return this.verification === true ? _hash2 : false;
    }
  }, {
    key: 'tags',
    value: function tags(urls) {
      var _this6 = this;

      return this.cache.get(urls.printed, undefined, this.hash(urls.id)).then(function (text) {
        return _this6.prepareWithText(text, urls.printed).then(function (cached) {
          return {
            cached: cached
          };
        });
      }, function () {
        return _this6.prepareWithUrl(urls);
      });
    }
  }]);

  return Css;
}();

exports.Css = Css;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manifest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(6);

var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _url2 = __webpack_require__(1);

var _url3 = _interopRequireDefault(_url2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manifest = exports.Manifest = function () {
  function Manifest(url, config) {
    _classCallCheck(this, Manifest);

    var _config$enableLogging = config.enableLogging,
        enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;


    this.log = new _log2.default((0, _url3.default)('dactylographsy-enableLogging', enableLogging));

    this.url = url;
  }

  _createClass(Manifest, [{
    key: 'get',
    value: function get() {
      var _this = this;

      return new _ajax2.default().get(this.url).then(function (response) {
        var responseText = response.text,
            responseUrl = response.url;


        _this.log.info('Fetched manifest from url: ' + responseUrl + '.');

        return JSON.parse(responseText);
      }, function (xhr) {
        _this.log.error('Could not fetch manifest with url: ' + xhr.responseURL + '!');
      });
    }
  }]);

  return Manifest;
}();

var Injector = function () {
  function Injector(injectInto, manifests) {
    var _this2 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Injector);

    var _options$enableLoggin = options.enableLogging,
        enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;


    this.log = new _log2.default((0, _url3.default)('dactylographsy-enableLogging', enableLogging));

    this.manifests = {};
    this.injectInto = injectInto;

    manifests.forEach(function (manifest) {
      _this2.manifests[manifest.package] = manifest;
    });

    this.options = options;
    this.prefix = options.prefix;
    this.order = options.order;
  }

  _createClass(Injector, [{
    key: 'inject',
    value: function inject() {
      var _this3 = this;

      var flatten = function flatten(list) {
        return list.reduce(function (a, b) {
          return a.concat(Array.isArray(b) ? flatten(b) : b);
        }, []);
      };

      return Promise.all(this.order.map(function (_package) {
        if (!_this3.manifests[_package]) {
          _this3.log.error('Couldn\'t find package ' + _package + ' from injection order.');

          return Promise.reject();
        } else {
          return _this3.injectManifest(_this3.manifests[_package]);
        }
      })).then(function (manifests) {
        var dependencies = flatten(manifests);

        _this3.injectIntoDOM(dependencies);

        return Promise.resolve(dependencies);
      });
    }
  }, {
    key: 'injectManifest',
    value: function injectManifest(manifest) {
      var _this4 = this;

      var hashes = Object.keys(manifest.hashes);

      return Promise.all(hashes.map(function (hash) {
        var dependency = manifest.hashes[hash];
        var rootUrl = [manifest.rootUrl, manifest.packageUrl].filter(function (_url) {
          return _url !== undefined && _url !== null;
        }).join('/');

        return _this4.injectDependency(dependency, rootUrl);
      }));
    }
  }, {
    key: 'injectDependency',
    value: function injectDependency(dependency, rootUrl) {
      switch (dependency.extension) {
        case '.css':
          return new _dom.Css(this.options).tags(this.urls(dependency, rootUrl));
        case '.js':
          return new _dom.Js(this.options).tags(this.urls(dependency, rootUrl));
        default:
          Promise.resolve(false);
      }
    }
  }, {
    key: 'injectIntoDOM',
    value: function injectIntoDOM(dependencies) {
      var _this5 = this;

      var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var inject = function inject(elem, type) {
        if (_this5.injectInto) {
          _this5.log.info('Injecting ' + type + ' tag', elem);

          _this5.injectInto.appendChild(elem);
        }
      };

      var next = function next(dependencies, idx) {
        _this5.injectIntoDOM(dependencies, ++idx);
      };

      var fallback = function fallback(dependencies, idx, type) {
        if (type !== 'raw') {
          _this5.injectIntoDOM(dependencies, idx, 'raw');
        } else {
          _this5.injectIntoDOM(dependencies, ++idx);

          _this5.log.error('Failed loading dependency as raw', elem);
        }
      };

      if (idx >= dependencies.length) {
        return;
      }

      // inject order: explicitly provided < cached in local storage < printed
      // raw only as fallback if printed fails
      type = dependencies[idx][type] && type || dependencies[idx]['cached'] && 'cached' || dependencies[idx]['printed'] && 'printed';
      var elem = dependencies[idx][type];

      if (elem === undefined) {
        return;
      } else if (type === 'printed') {
        if (elem instanceof HTMLLinkElement) {
          var request = new _ajax2.default().get(elem.href);

          request.then(function () {
            inject(elem, type);
            next(dependencies, idx);
          }).catch(function () {
            fallback(dependencies, idx, type);
          });
        } else {
          inject(elem, type);

          elem.addEventListener('load', function () {
            next(dependencies, idx);
          });

          // fallback in case printed tag cannot be loaded
          elem.addEventListener('error', function () {
            fallback(dependencies, idx, type);
          });
        }
      } else if (type === 'cached' || type === 'raw') {
        inject(elem, type);
        next(dependencies, idx);
      }
    }
  }, {
    key: 'basename',
    value: function basename(path) {
      return path.replace(/.*\/|\.[^.]*$/g, '');
    }
  }, {
    key: 'urls',
    value: function urls(dependency) {
      var rootUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var basename = this.basename(dependency.file);
      // Filter out potential null values
      // passed in as various parts of an url.
      var url = [this.prefix, rootUrl, dependency.path].filter(function (_url) {
        return _url !== undefined && _url !== null;
      }).join('/');

      return {
        id: dependency.id,
        printed: '/' + url + '/' + basename + '-' + dependency.hash + dependency.extension,
        raw: '/' + url + '/' + basename + dependency.extension,
        singularBy: '/' + url + '/' + basename + dependency.extension
      };
    }
  }]);

  return Injector;
}();

exports.default = Injector;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(12);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9), __webpack_require__(11)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTFhMmJlMzA5MDY5ODg2YTg1YjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL3NyYy9hamF4LmpzIiwid2VicGFjazovLy8uL3NyYy9jYWNoZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhY3R5bG9ncmFwaHN5LmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL34vZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0cmluZy1oYXNoL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSJdLCJuYW1lcyI6WyJMb2ciLCJlbmFibGVkIiwiY29uc29sZSIsIndpbmRvdyIsImxvZyIsImFyZ3VtZW50cyIsImluZm8iLCJ3YXJuIiwiZGVidWciLCJlcnJvciIsImdldFVybFBhcmFtIiwiZ2V0UGFyYW1zIiwidXJsIiwicXVlcnkiLCJyZWdleCIsInBhcmFtcyIsIm1hdGNoIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcmFtIiwiaWZVbnNldCIsImxvY2F0aW9uIiwic2VhcmNoIiwiaGFzT3duUHJvcGVydHkiLCJKU09OIiwicGFyc2UiLCJlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiQWpheCIsIm9wdGlvbnMiLCJyZXF1ZXN0IiwibWV0aG9kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJYRG9tYWluUmVxdWVzdCIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsInRleHQiLCJyZXNwb25zZVRleHQiLCJyZXNwb25zZVVSTCIsIm9uZXJyb3IiLCJzZW5kIiwiQ2FjaGUiLCJkZWZhdWx0UHJlZml4IiwiZW5hYmxlTG9nZ2luZyIsImNhY2hlUHJlZml4IiwiaXNTdXBwb3J0ZWQiLCJzdXBwb3J0ZWQiLCJhcHBQcmVmaXgiLCJjb2RlIiwiaGFzaCIsIml0ZW0iLCJrZXkiLCJkZWZhdWx0VmFsdWUiLCJfaXRlbSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ1bmRlZmluZWQiLCJzZXQiLCJfcGFyc2VkIiwiaXNJdGVtVmFsaWQiLCJyZW1vdmUiLCJyZW1vdmVJdGVtIiwidHlwZSIsInNpbmd1bGFyQnkiLCJkZWR1cGUiLCJjYWNoZWQiLCJub3ciLCJEYXRlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImluZGV4T2YiLCJkYWN0eWxvZ3JhcGhzeUl0ZW0iLCJwb2x5ZmlsbCIsImRhY3R5bG9ncmFwaHN5IiwiYXV0b3J1biIsIkRhY3R5bG9ncmFwaHN5IiwiaG9va0ludG9Eb20iLCJyZWFkQ29uZmlndXJhdGlvbiIsImNhY2hlIiwiY29uZmlnIiwicnVuIiwiZG9jdW1lbnQiLCJleGVjdXRpbmdTY3JpcHQiLCJnZXRFbGVtZW50QnlJZCIsImluamVjdEludG8iLCJib2R5IiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibWFuaWZlc3RVcmxzIiwicmVhZEF0dHJPblNjcmlwdCIsImluamVjdCIsImFsbCIsIm1hcCIsImdldCIsInRoZW4iLCJtYW5pZmVzdHMiLCJsZW5ndGgiLCJjYWNoZUluTG9jYWxTdG9yYWdlIiwiYXR0ciIsIl9hdHRyIiwiZ2V0QXR0cmlidXRlIiwidHRsIiwiZmx1c2giLCJjbHQiLCJjYWNoZU9ubHkiLCJyZWZyZXNoIiwiY2FjaGVkTWFuaWZlc3RzIiwidmVyaWZpY2F0aW9uIiwicmVzdG9yZSIsInJlZnJlc2hEZWxheSIsInNldFRpbWVvdXQiLCJpbmplY3RlZEZyb21DYWNoZSIsImNhdGNoIiwiSnMiLCJjYWNoZURlbGF5Iiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsImRlZmVyIiwiYXN5bmMiLCJzZXRBdHRyaWJ1dGUiLCJ1cmxzIiwid2hpY2hVcmwiLCJ1cmxLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInNjcmlwdFRhZ3MiLCJmb3JFYWNoIiwidXJsS2V5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuc3VyZUNhY2hlIiwic3JjIiwiZGVsYXkiLCJoYXMiLCJyZXNwb25zZSIsInByaW50ZWQiLCJpZCIsInByZXBhcmVXaXRoVGV4dCIsInByZXBhcmVXaXRoVXJsIiwiQ3NzIiwibGlua1RhZ3MiLCJsaW5rIiwicmVsIiwiaHJlZiIsInRleHRDb250ZW50IiwiTWFuaWZlc3QiLCJyZXNwb25zZVVybCIsIkluamVjdG9yIiwibWFuaWZlc3QiLCJwYWNrYWdlIiwicHJlZml4Iiwib3JkZXIiLCJmbGF0dGVuIiwibGlzdCIsInJlZHVjZSIsImEiLCJiIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwiX3BhY2thZ2UiLCJpbmplY3RNYW5pZmVzdCIsImRlcGVuZGVuY2llcyIsImluamVjdEludG9ET00iLCJoYXNoZXMiLCJkZXBlbmRlbmN5Iiwicm9vdFVybCIsInBhY2thZ2VVcmwiLCJfdXJsIiwiam9pbiIsImluamVjdERlcGVuZGVuY3kiLCJleHRlbnNpb24iLCJ0YWdzIiwiaWR4IiwiZWxlbSIsImFwcGVuZENoaWxkIiwibmV4dCIsImZhbGxiYWNrIiwiSFRNTExpbmtFbGVtZW50IiwicGF0aCIsInJlcGxhY2UiLCJiYXNlbmFtZSIsImZpbGUiLCJyYXciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFD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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxZQUFZLFNBQVM7QUFDckIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7QUFDRDs7Ozs7Ozs7QUNyb0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDbkx0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNoQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkEsZSIsImZpbGUiOiJkYWN0eWxvZ3JhcGhzeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MWEyYmUzMDkwNjk4ODZhODViNSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG5cbiAgLy8gTm90IGxldmVsIGJvdW5kIGxvZ2dpbmcgbmVlZGVkIHlldFxuICBjb25zdHJ1Y3RvcihlbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gIH1cblxuICBsb2coKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmluZm8oLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICB3YXJuKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmRlYnVnKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbG9nLmpzIiwiY29uc3QgZ2V0UGFyYW1zID0gZnVuY3Rpb24odXJsKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gdXJsO1xuICBjb25zdCByZWdleCA9IC9bPyY7XSguKz8pPShbXiY7XSspL2c7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuICBsZXQgbWF0Y2g7XG5cbiAgaWYgKHF1ZXJ5KSB7XG4gICAgd2hpbGUgKG1hdGNoID0gcmVnZXguZXhlYyhxdWVyeSkpIHtcbiAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVcmxQYXJhbShwYXJhbSwgaWZVbnNldCA9IG51bGwsIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpIHtcbiAgY29uc3QgcGFyYW1zID0gZ2V0UGFyYW1zKHVybCk7XG5cbiAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocGFyYW1zW3BhcmFtXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbcGFyYW1dKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlmVW5zZXRcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cmwuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIGdldCh1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIGhlYWQodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCwgb3B0aW9ucywgJ0hFQUQnKTtcbiAgfVxuXG4gIHJlcXVlc3QodXJsLCBvcHRpb25zID0ge30sIG1ldGhvZCA9ICdHRVQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFhEb21haW5SZXF1ZXN0IGZvciBJRS5cbiAgICAgICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgeGhyOiB4aHIsXG4gICAgICAgICAgICB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgdXJsOiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FqYXguanMiLCJpbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5pbXBvcnQgc3RyaW5nSGFzaCBmcm9tICdzdHJpbmctaGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdFByZWZpeCA9ICdfX2RhY3R5bG9ncmFwaHN5JztcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNhY2hlUHJlZml4ID0gdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4IHx8IGRlZmF1bHRQcmVmaXg7XG4gICAgdGhpcy5pc1N1cHBvcnRlZCA9IHRoaXMuc3VwcG9ydGVkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwcFByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCA9IGAke3RoaXMuY2FjaGVQcmVmaXh9LS0ke3RoaXMub3B0aW9ucy5hcHBQcmVmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggKz0gJ19fJztcbiAgICB9XG4gIH1cblxuICBnZXRQcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVQcmVmaXg7XG4gIH1cblxuICBpc0l0ZW1WYWxpZChjb2RlLCBoYXNoKSB7XG4gICAgaWYgKHR5cGVvZiBjb2RlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBzdHJpbmdIYXNoKGNvZGUpID09PSBoYXNoXG4gICAgKTtcbiAgfVxuXG4gIHBhcnNlKGl0ZW0pIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcbiAgfVxuXG4gIGdldChrZXksIGRlZmF1bHRWYWx1ZSwgaGFzaCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgX2l0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKTtcblxuICAgICAgaWYgKF9pdGVtID09PSBudWxsICYmIGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2V0KGRlZmF1bHRWYWx1ZSwgJ3BsYWluJywga2V5KTtcblxuICAgICAgICByZXNvbHZlKGRlZmF1bHRWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2l0ZW0gIT09IG51bGwgJiYgaGFzaCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgX3BhcnNlZCA9IHRoaXMucGFyc2UoX2l0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZSB3aGljaCBuZWVkcyB2YWxpZGF0aW9uLi4uYCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmFsaWQoX3BhcnNlZC5jb2RlLCBoYXNoKSkge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLm1hdGNoZXMgZXhwZWN0ZWQgaGFzaCAke2hhc2h9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZShfcGFyc2VkLmNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLmRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGhhc2ggJHtoYXNofSAtIHBydW5pbmcuYCk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuXG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoX2l0ZW0pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5wYXJzZShfaXRlbSkuY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZG5cXCd0IGZpbmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKSAhPT0gbnVsbDtcbiAgfVxuXG4gIHJlbW92ZShrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7O1xuICB9XG5cbiAgc2V0KGNvZGUsIHR5cGUsIGtleSwgc2luZ3VsYXJCeSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzaW5ndWxhckJ5KSB7XG4gICAgICB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZWQgPSB7XG4gICAgICBub3c6ICtuZXcgRGF0ZSgpLFxuICAgICAgdXJsOiBrZXksXG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIHNpbmd1bGFyQnk6ICh0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpID8gc2luZ3VsYXJCeSA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWAsXG4gICAgICBKU09OLnN0cmluZ2lmeShjYWNoZWQpXG4gICAgKTtcblxuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICBmbHVzaCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgUmVtb3ZpbmcgaXRlbSAke2tleX0gcmVxdWVzdGVkIGJ5IGZsdXNoLmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdXBwb3J0ZWQoKSB7XG4gICAgY29uc3QgaXRlbSA9ICdfX2RhY3R5bG9ncmFwaHN5X19mZWF0dXJlLWRldGVjdGlvbic7XG5cbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbSwgaXRlbSk7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShpdGVtKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2cud2FybignTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgY29uc3QgZGFjdHlsb2dyYXBoc3lJdGVtID0ga2V5LmluZGV4T2YodGhpcy5jYWNoZVByZWZpeCkgPj0gMDtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGl0ZW0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICgodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpKSAmJlxuICAgICAgICBpdGVtLnNpbmd1bGFyQnkgPT09IHNpbmd1bGFyQnlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvZy5sb2coYERlZHVwaW5nIGJ5ICR7c2luZ3VsYXJCeX0gYmVmb3JlIGFkZGluZyBkdXBlIGluICR7a2V5fS5gKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NhY2hlLmpzIiwiaW1wb3J0IERhY3R5bG9ncmFwaHN5IGZyb20gJy4vZGFjdHlsb2dyYXBoc3knO1xuaW1wb3J0IGVzNlByb21pc2UgZnJvbSAnZXM2LXByb21pc2UnO1xuXG5lczZQcm9taXNlLnBvbHlmaWxsKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZGFjdHlsb2dyYXBoc3kgPSBuZXcgRGFjdHlsb2dyYXBoc3koe1xuICAgIGF1dG9ydW46IHRydWVcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5qZWN0b3IsIHtcbiAgTWFuaWZlc3Rcbn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhY3R5bG9ncmFwaHN5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYXV0b3J1biA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcbiAgICB0aGlzLmhvb2tJbnRvRG9tKCk7XG4gICAgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IHRoaXMuY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgaWYgKGF1dG9ydW4pIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgaG9va0ludG9Eb20oKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV4ZWN1dGluZ1NjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWN0eWxvZ3JhcGhzeScpO1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIH1cblxuICByZWFkQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLm1hbmlmZXN0VXJscyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnbWFuaWZlc3RzJyk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ2NvbmZpZycpO1xuICB9XG5cbiAgcmVmcmVzaChpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubWFuaWZlc3RVcmxzLm1hcCh1cmwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdCh1cmwsIHRoaXMuY29uZmlnKS5nZXQoKTtcbiAgICB9KSkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBhbGwgbWFuaWZlc3RzLCAke21hbmlmZXN0cy5sZW5ndGh9IGluIHRvdGFsLmApO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmNhY2hlLnNldChtYW5pZmVzdHMsICdtYW5pZmVzdHMnLCAnbWFuaWZlc3RzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKS5pbmplY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmUoaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCgnbWFuaWZlc3RzJylcbiAgICAgIC50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ1Jlc3RvcmluZyB3aXRoIG1hbmlmZXN0cyBpbiBjYWNoZSBsYXRlciByZWZyZXNoaW5nIHZpYSBuZXR3b3JrIChkZWxheWVkKS4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICAgKS5pbmplY3QoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVhZEF0dHJPblNjcmlwdChhdHRyKSB7XG4gICAgaWYgKCF0aGlzLmV4ZWN1dGluZ1NjcmlwdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlKSB7XG4gICAgICAvLyBSZW1vdmUgYWxsIGNhY2hlLWtleXMgd2UgbWlnaHQgaGF2ZSBzZXQgaW4gdGhlIHBhc3QgYW5kIHRoZW4gc3dpdGNoZWQgY29uZmlnXG4gICAgICB0aGlzLmxvZy5pbmZvKCdGbHVzaGluZyBsb2NhbC1zdG9yYWdlIGR1ZSB0byBjb25maWctb3B0aW9uIFwiY2FjaGVJbkxvY2FsU3RvcmFnZT1mYWxzZVwiJylcbiAgICAgIHRoaXMuY2FjaGUuZmx1c2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSAmJiB0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goZmFsc2UpO1xuICAgIH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9mIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy52ZXJpZmljYXRpb24gPT09IHRydWUgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlID09PSBmYWxzZVxuICAgICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmVmcmVzaERlbGF5ID0gNTAwMFxuICAgICAgICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaChpbmplY3RlZEZyb21DYWNoZSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgcmVmcmVzaERlbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGFjdHlsb2dyYXBoc3kuanMiLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLmNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBjYWNoZUluTG9jYWxTdG9yYWdlO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB0ZXh0IGZvciAke3VybH0uYCk7XG5cbiAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgJHt0ZXh0fVxuICAgICAgLy8jIHNvdXJjZVVSTD0ke3VybH1cbiAgICBgO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY3JpcHQpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICBjb25zdCB1cmxLZXlzID0gT2JqZWN0LmtleXModXJscykuZmlsdGVyKChrZXkpID0+IChbJ3ByaW50ZWQnLCAncmF3J10uaW5kZXhPZihrZXkpID4gLTEpKTtcbiAgICBjb25zdCBzY3JpcHRUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBjb25zdCB1cmwgPSB1cmxzW3VybEtleV07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB1cmxLZXkgPT09ICdwcmludGVkJyk7XG5cbiAgICAgIC8vIEJpbmQgYGxvYWRgIGxpc3RlbmVyIG9uIHNjcmlwdCBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHVybEtleSA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIHNjcmlwdFRhZ3NbdXJsS2V5XSA9IHNjcmlwdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NyaXB0VGFncyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIEphdmFTY3JpcHQgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICB0YWdzKHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVwYXJlV2l0aFRleHQoXG4gICAgICAgIHRleHQsIHVybHMucHJpbnRlZFxuICAgICAgKS50aGVuKChjYWNoZWQpID0+ICh7XG4gICAgICAgIGNhY2hlZFxuICAgICAgfSkpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVXJsKHVybHMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3Mge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSA9IGNhY2hlSW5Mb2NhbFN0b3JhZ2U7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBDU1MgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnY3NzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIENTUyBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgQ1NTIGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscykge1xuICAgIGNvbnN0IHVybEtleXMgPSBPYmplY3Qua2V5cyh1cmxzKS5maWx0ZXIoKGtleSkgPT4gKFsncHJpbnRlZCcsICdyYXcnXS5pbmRleE9mKGtleSkgPiAtMSkpO1xuICAgIGNvbnN0IGxpbmtUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGNvbnN0IHVybCA9IHVybHNbdXJsS2V5XTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHVybEtleSA9PT0gJ3ByaW50ZWQnKTtcblxuICAgICAgLy8gQmluZCBgbG9hZGAgbGlzdGVuZXIgb24gbGluayBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh1cmxLZXkgPT09ICdwcmludGVkJykge1xuICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIGxpbmtUYWdzW3VybEtleV0gPSBsaW5rO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rVGFncyk7XG4gIH1cblxuICBwcmVwYXJlV2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHRleHQgZm9yIHVybDogJHt1cmx9LmApO1xuXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rKTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIHRhZ3ModXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmlkKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVGV4dChcbiAgICAgICAgdGV4dCwgdXJscy5wcmludGVkXG4gICAgICApLnRoZW4oKGNhY2hlZCkgPT4gKHtcbiAgICAgICAgY2FjaGVkXG4gICAgICB9KSk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb20uanMiLCJpbXBvcnQge1xuICBDc3MsXG4gIEpzXG59IGZyb20gJy4vZG9tJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBjbGFzcyBNYW5pZmVzdCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgY29uZmlnKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IGNvbmZpZztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgIC5nZXQodGhpcy51cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHQsXG4gICAgICAgICAgdXJsOiByZXNwb25zZVVybFxuICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBtYW5pZmVzdCBmcm9tIHVybDogJHtyZXNwb25zZVVybH0uYCk7XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgIH0sIHhociA9PiB7XG4gICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZCBub3QgZmV0Y2ggbWFuaWZlc3Qgd2l0aCB1cmw6ICR7eGhyLnJlc3BvbnNlVVJMfSFgKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgbWFuaWZlc3RzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy5tYW5pZmVzdHMgPSB7fTtcbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgbWFuaWZlc3RzLmZvckVhY2gobWFuaWZlc3QgPT4ge1xuICAgICAgdGhpcy5tYW5pZmVzdHNbbWFuaWZlc3QucGFja2FnZV0gPSBtYW5pZmVzdDtcbiAgICB9KTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5wcmVmaXggPSBvcHRpb25zLnByZWZpeDtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlcjtcbiAgfVxuXG4gIGluamVjdCgpIHtcbiAgICBjb25zdCBmbGF0dGVuID0gbGlzdCA9PiBsaXN0LnJlZHVjZShcbiAgICAgIChhLCBiKSA9PiBhLmNvbmNhdChBcnJheS5pc0FycmF5KGIpID8gZmxhdHRlbihiKSA6IGIpLCBbXVxuICAgICk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICB0aGlzLm9yZGVyLm1hcChfcGFja2FnZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKSB7XG4gICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkblxcJ3QgZmluZCBwYWNrYWdlICR7X3BhY2thZ2V9IGZyb20gaW5qZWN0aW9uIG9yZGVyLmApO1xuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0TWFuaWZlc3QodGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IGZsYXR0ZW4obWFuaWZlc3RzKTtcblxuICAgICAgdGhpcy5pbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcyk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVwZW5kZW5jaWVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdE1hbmlmZXN0KG1hbmlmZXN0KSB7XG4gICAgY29uc3QgaGFzaGVzID0gT2JqZWN0LmtleXMobWFuaWZlc3QuaGFzaGVzKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChoYXNoZXMubWFwKGhhc2ggPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IG1hbmlmZXN0Lmhhc2hlc1toYXNoXTtcbiAgICAgIGNvbnN0IHJvb3RVcmwgPSBbbWFuaWZlc3Qucm9vdFVybCwgbWFuaWZlc3QucGFja2FnZVVybF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH0pLmpvaW4oJy8nKTtcblxuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0RGVwZW5kZW5jeShcbiAgICAgICAgZGVwZW5kZW5jeSxcbiAgICAgICAgcm9vdFVybFxuICAgICAgKTtcbiAgICB9KSk7XG4gIH1cblxuICBpbmplY3REZXBlbmRlbmN5KGRlcGVuZGVuY3ksIHJvb3RVcmwpIHtcbiAgICBzd2l0Y2ggKGRlcGVuZGVuY3kuZXh0ZW5zaW9uKSB7XG4gICAgICBjYXNlICcuY3NzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBDc3MoXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICkudGFncyhcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJy5qcyc6XG4gICAgICAgIHJldHVybiBuZXcgSnMoXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICkudGFncyhcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsIGlkeCA9IDAsIHR5cGUgPSBudWxsKSB7XG4gICAgY29uc3QgaW5qZWN0ID0gKGVsZW0sIHR5cGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nICR7dHlwZX0gdGFnYCwgZWxlbSk7XG5cbiAgICAgICAgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBuZXh0ID0gKGRlcGVuZGVuY2llcywgaWR4KSA9PiB7XG4gICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZhbGxiYWNrID0gKGRlcGVuZGVuY2llcywgaWR4LCB0eXBlKSA9PiB7XG4gICAgICBpZiAodHlwZSAhPT0gJ3JhdycpIHtcbiAgICAgICAgdGhpcy5pbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgaWR4LCAncmF3Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG5cbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ0ZhaWxlZCBsb2FkaW5nIGRlcGVuZGVuY3kgYXMgcmF3JywgZWxlbSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChpZHggPj0gZGVwZW5kZW5jaWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGluamVjdCBvcmRlcjogZXhwbGljaXRseSBwcm92aWRlZCA8IGNhY2hlZCBpbiBsb2NhbCBzdG9yYWdlIDwgcHJpbnRlZFxuICAgIC8vIHJhdyBvbmx5IGFzIGZhbGxiYWNrIGlmIHByaW50ZWQgZmFpbHNcbiAgICB0eXBlID0gKGRlcGVuZGVuY2llc1tpZHhdW3R5cGVdICYmIHR5cGUpIHx8IChkZXBlbmRlbmNpZXNbaWR4XVsnY2FjaGVkJ10gJiYgJ2NhY2hlZCcpIHx8IMKgKGRlcGVuZGVuY2llc1tpZHhdWydwcmludGVkJ10gJiYgJ3ByaW50ZWQnKTtcbiAgICBjb25zdCBlbGVtID0gZGVwZW5kZW5jaWVzW2lkeF1bdHlwZV07XG5cbiAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncHJpbnRlZCcpIHtcbiAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgSFRNTExpbmtFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgQWpheCgpLmdldChlbGVtLmhyZWYpO1xuXG4gICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3QoZWxlbSwgdHlwZSk7XG4gICAgICAgICAgICBuZXh0KGRlcGVuZGVuY2llcywgaWR4KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBmYWxsYmFjayhkZXBlbmRlbmNpZXMsIGlkeCwgdHlwZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluamVjdChlbGVtLCB0eXBlKTtcblxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgbmV4dChkZXBlbmRlbmNpZXMsIGlkeCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZhbGxiYWNrIGluIGNhc2UgcHJpbnRlZCB0YWcgY2Fubm90IGJlIGxvYWRlZFxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgIGZhbGxiYWNrKGRlcGVuZGVuY2llcywgaWR4LCB0eXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NhY2hlZCcgfHwgwqB0eXBlID09PSAncmF3Jykge1xuICAgICAgaW5qZWN0KGVsZW0sIHR5cGUpO1xuICAgICAgbmV4dChkZXBlbmRlbmNpZXMsIGlkeCk7XG5cbiAgICB9XG5cbiAgfTtcblxuICBiYXNlbmFtZShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvLipcXC98XFwuW14uXSokL2csICcnKTtcbiAgfVxuXG4gIHVybHMoZGVwZW5kZW5jeSwgcm9vdFVybCA9ICcnKSB7XG4gICAgY29uc3QgYmFzZW5hbWUgPSB0aGlzLmJhc2VuYW1lKGRlcGVuZGVuY3kuZmlsZSk7XG4gICAgLy8gRmlsdGVyIG91dCBwb3RlbnRpYWwgbnVsbCB2YWx1ZXNcbiAgICAvLyBwYXNzZWQgaW4gYXMgdmFyaW91cyBwYXJ0cyBvZiBhbiB1cmwuXG4gICAgY29uc3QgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZDogZGVwZW5kZW5jeS5pZCxcbiAgICAgIHByaW50ZWQ6IGAvJHt1cmx9LyR7YmFzZW5hbWV9LSR7ZGVwZW5kZW5jeS5oYXNofSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHJhdzogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICBzaW5ndWxhckJ5OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YFxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmplY3Rvci5qcyIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zdGVmYW5wZW5uZXIvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgNC4xLjBcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwuRVM2UHJvbWlzZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxudmFyIF9pc0FycmF5ID0gdW5kZWZpbmVkO1xuaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gIF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufSBlbHNlIHtcbiAgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xufVxuXG52YXIgaXNBcnJheSA9IF9pc0FycmF5O1xuXG52YXIgbGVuID0gMDtcbnZhciB2ZXJ0eE5leHQgPSB1bmRlZmluZWQ7XG52YXIgY3VzdG9tU2NoZWR1bGVyRm4gPSB1bmRlZmluZWQ7XG5cbnZhciBhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gIGxlbiArPSAyO1xuICBpZiAobGVuID09PSAyKSB7XG4gICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgIGlmIChjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgY3VzdG9tU2NoZWR1bGVyRm4oZmx1c2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICBjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG59XG5cbmZ1bmN0aW9uIHNldEFzYXAoYXNhcEZuKSB7XG4gIGFzYXAgPSBhc2FwRm47XG59XG5cbnZhciBicm93c2VyV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG52YXIgYnJvd3Nlckdsb2JhbCA9IGJyb3dzZXJXaW5kb3cgfHwge307XG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHt9KS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5cbi8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXG52YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBub2RlXG5mdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgLy8gbm9kZSB2ZXJzaW9uIDAuMTAueCBkaXNwbGF5cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2hlbiBuZXh0VGljayBpcyB1c2VkIHJlY3Vyc2l2ZWx5XG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbn1cblxuLy8gdmVydHhcbmZ1bmN0aW9uIHVzZVZlcnR4VGltZXIoKSB7XG4gIGlmICh0eXBlb2YgdmVydHhOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG5vZGUuZGF0YSA9IGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyO1xuICB9O1xufVxuXG4vLyB3ZWIgd29ya2VyXG5mdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgZ2xvYmFsU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICB9O1xufVxuXG52YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdFZlcnR4KCkge1xuICB0cnkge1xuICAgIHZhciByID0gcmVxdWlyZTtcbiAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB1bmRlZmluZWQ7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgaWYgKF9zdGF0ZSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBfYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhfc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxudmFyIEdFVF9USEVOX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW4ocHJvbWlzZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICByZXR1cm4gR0VUX1RIRU5fRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKSB7XG4gIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmIHRoZW4kJCA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUpIHtcbiAgICBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhlbiQkID09PSBHRVRfVEhFTl9FUlJPUikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGVuJCQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIF9yZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gRXJyb3JPYmplY3QoKSB7XG4gIHRoaXMuZXJyb3IgPSBudWxsO1xufVxuXG52YXIgVFJZX0NBVENIX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICBlcnJvciA9IHVuZGVmaW5lZCxcbiAgICAgIHN1Y2NlZWRlZCA9IHVuZGVmaW5lZCxcbiAgICAgIGZhaWxlZCA9IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICB2YWx1ZSA9IHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgaWYgKHZhbHVlID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgdmFsdWUuZXJyb3IgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICBfcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gRlVMRklMTEVEKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG52YXIgaWQgPSAwO1xuZnVuY3Rpb24gbmV4dElkKCkge1xuICByZXR1cm4gaWQrKztcbn1cblxuZnVuY3Rpb24gbWFrZVByb21pc2UocHJvbWlzZSkge1xuICBwcm9taXNlW1BST01JU0VfSURdID0gaWQrKztcbiAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICBtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBfcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIHZhciBfaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fZWFjaEVudHJ5KF9pbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICB2YXIgcmVzb2x2ZSQkID0gYy5yZXNvbHZlO1xuXG4gIGlmIChyZXNvbHZlJCQgPT09IHJlc29sdmUpIHtcbiAgICB2YXIgX3RoZW4gPSBnZXRUaGVuKGVudHJ5KTtcblxuICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIF90aGVuKTtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJChlbnRyeSk7XG4gICAgICB9KSwgaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQoZW50cnkpLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFByb21pc2UuYWxsYCBhY2NlcHRzIGFuIGFycmF5IG9mIHByb21pc2VzLCBhbmQgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoXG4gIGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBwcm9taXNlcywgb3JcbiAgcmVqZWN0ZWQgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBiZSByZWplY3RlZC4gSXQgY2FzdHMgYWxsXG4gIGVsZW1lbnRzIG9mIHRoZSBwYXNzZWQgaXRlcmFibGUgdG8gcHJvbWlzZXMgYXMgaXQgcnVucyB0aGlzIGFsZ29yaXRobS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIFRoZSBhcnJheSBoZXJlIHdvdWxkIGJlIFsgMSwgMiwgMyBdO1xuICB9KTtcbiAgYGBgXG5cbiAgSWYgYW55IG9mIHRoZSBgcHJvbWlzZXNgIGdpdmVuIHRvIGBhbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVqZWN0KG5ldyBFcnJvcihcIjJcIikpO1xuICBsZXQgcHJvbWlzZTMgPSByZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAvLyBlcnJvci5tZXNzYWdlID09PSBcIjJcIlxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBhbGxcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cbiAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBhbGwoZW50cmllcykge1xuICByZXR1cm4gbmV3IEVudW1lcmF0b3IodGhpcywgZW50cmllcykucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJhY2VgIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaCBpcyBzZXR0bGVkIGluIHRoZSBzYW1lIHdheSBhcyB0aGVcbiAgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gc2V0dGxlLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0ID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIGl0IHdhcyByZXNvbHZlZCBiZWZvcmUgcHJvbWlzZTFcbiAgICAvLyB3YXMgcmVzb2x2ZWQuXG4gIH0pO1xuICBgYGBcblxuICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XG4gIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcbiAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xuICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdwcm9taXNlIDInKSk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxuICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXG4gIH0pO1xuICBgYGBcblxuICBBbiBleGFtcGxlIHJlYWwtd29ybGQgdXNlIGNhc2UgaXMgaW1wbGVtZW50aW5nIHRpbWVvdXRzOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXG4gIHByb21pc2UgdG8gc2V0dGxlLlxuKi9cbmZ1bmN0aW9uIHJhY2UoZW50cmllcykge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAgYFByb21pc2UucmVqZWN0YCByZXR1cm5zIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgYHJlYXNvbmAuXG4gIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlamVjdFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIGdpdmVuIGByZWFzb25gLlxuKi9cbmZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIF9yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UgPyBpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBuZWVkc05ldygpO1xuICB9XG59XG5cblByb21pc2UuYWxsID0gYWxsO1xuUHJvbWlzZS5yYWNlID0gcmFjZTtcblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5Qcm9taXNlLnJlamVjdCA9IHJlamVjdDtcblByb21pc2UuX3NldFNjaGVkdWxlciA9IHNldFNjaGVkdWxlcjtcblByb21pc2UuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZS5fYXNhcCA9IGFzYXA7XG5cblByb21pc2UucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUHJvbWlzZSxcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICB9KTtcbiAgICBgYGBcbiAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQXNzaW1pbGF0aW9uXG4gICAgLS0tLS0tLS0tLS0tXG4gIFxuICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IHJlc3VsdDtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IGF1dGhvciwgYm9va3M7XG4gIFxuICAgIHRyeSB7XG4gICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgXG4gICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICBcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kQXV0aG9yKCkuXG4gICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIHRoZW5cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgdGhlbjogdGhlbixcblxuICAvKipcbiAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cbiAgXG4gICAgYGBganNcbiAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gICAgdmFyIGxvY2FsID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgaWYgKFApIHtcbiAgICAgICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2U7XG59XG5cbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UucG9seWZpbGwgPSBwb2x5ZmlsbDtcblByb21pc2UuUHJvbWlzZSA9IFByb21pc2U7XG5cbnJldHVybiBQcm9taXNlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXM2LXByb21pc2UubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgdmFyIGhhc2ggPSA1MzgxLFxuICAgICAgaSAgICA9IHN0ci5sZW5ndGg7XG5cbiAgd2hpbGUoaSkge1xuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHN0ci5jaGFyQ29kZUF0KC0taSk7XG4gIH1cblxuICAvKiBKYXZhU2NyaXB0IGRvZXMgYml0d2lzZSBvcGVyYXRpb25zIChsaWtlIFhPUiwgYWJvdmUpIG9uIDMyLWJpdCBzaWduZWRcbiAgICogaW50ZWdlcnMuIFNpbmNlIHdlIHdhbnQgdGhlIHJlc3VsdHMgdG8gYmUgYWx3YXlzIHBvc2l0aXZlLCBjb252ZXJ0IHRoZVxuICAgKiBzaWduZWQgaW50IHRvIGFuIHVuc2lnbmVkIGJ5IGRvaW5nIGFuIHVuc2lnbmVkIGJpdHNoaWZ0LiAqL1xuICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N0cmluZy1oYXNoL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIHZlcnR4IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==