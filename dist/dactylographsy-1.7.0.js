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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dactylographsy = __webpack_require__(2);
	
	var _dactylographsy2 = _interopRequireDefault(_dactylographsy);
	
	var _es6Promise = __webpack_require__(10);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_es6Promise2.default.polyfill();
	
	if (typeof window !== 'undefined') {
	  window.dactylographsy = new _dactylographsy2.default({
	    autorun: true
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cache = __webpack_require__(3);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _injector = __webpack_require__(7);
	
	var _injector2 = _interopRequireDefault(_injector);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _url = __webpack_require__(5);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dactylographsy = function () {
	  function Dactylographsy() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Dactylographsy);
	
	    var _options$autorun = options.autorun;
	
	    var autorun = _options$autorun === undefined ? false : _options$autorun;
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	
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
	
	      var inject = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
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
	
	      var inject = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
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
	            var _config$refreshDelay = _this3.config.refreshDelay;
	            var refreshDelay = _config$refreshDelay === undefined ? 5000 : _config$refreshDelay;
	
	
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _url = __webpack_require__(5);
	
	var _url2 = _interopRequireDefault(_url);
	
	var _stringHash = __webpack_require__(6);
	
	var _stringHash2 = _interopRequireDefault(_stringHash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = function () {
	  function Cache() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Cache);
	
	    var defaultPrefix = '__dactylographsy';
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	
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
	
	      var hash = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
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
	      var singularBy = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
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
	        var item = void 0;
	
	        if (!dactylographsyItem) {
	          continue;
	        }
	
	        item = JSON.parse(localStorage.getItem(key));
	
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Log = function () {
	
	  // Not level bound logging needed yet
	
	  function Log() {
	    var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUrlParam;
	var getParams = function getParams(url) {
	  var query = url,
	      regex = /[?&;](.+?)=([^&;]+)/g;
	  var params = void 0,
	      match = void 0;
	
	  params = {};
	
	  if (query) {
	    while (match = regex.exec(query)) {
	      params[match[1]] = decodeURIComponent(match[2]);
	    }
	  }
	
	  return params;
	};
	
	function getUrlParam(param) {
	  var ifUnset = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	  var url = arguments.length <= 2 || arguments[2] === undefined ? window.location.search : arguments[2];
	
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(str) {
	  var hash = 5381,
	      i    = str.length
	
	  while(i)
	    hash = (hash * 33) ^ str.charCodeAt(--i)
	
	  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
	   * integers. Since we want the results to be always positive, if the high bit
	   * is set, unset it and add it back in through (64-bit IEEE) addition. */
	  return hash >= 0 ? hash : (hash & 0x7FFFFFFF) + 0x80000000
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Manifest = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dom = __webpack_require__(8);
	
	var _ajax = __webpack_require__(9);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _url2 = __webpack_require__(5);
	
	var _url3 = _interopRequireDefault(_url2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Manifest = exports.Manifest = function () {
	  function Manifest(url, config) {
	    _classCallCheck(this, Manifest);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
	
	    this.log = new _log2.default((0, _url3.default)('dactylographsy-enableLogging', enableLogging));
	
	    this.url = url;
	  }
	
	  _createClass(Manifest, [{
	    key: 'get',
	    value: function get() {
	      var _this = this;
	
	      return new _ajax2.default().get(this.url).then(function (response) {
	        var responseText = response.text;
	        var responseUrl = response.url;
	
	
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
	
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    _classCallCheck(this, Injector);
	
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	
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
	      },
	          injectIntoDOM = function injectIntoDOM(dependencies) {
	        var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        var elem = dependencies[idx];
	
	        if (elem === undefined) {
	          return;
	        } else if (elem.getAttribute('data-dactylographsy-uncached-js')) {
	          if (_this3.injectInto) {
	            _this3.log.info('Injecting tag:', elem);
	
	            _this3.injectInto.appendChild(elem);
	          }
	
	          elem.addEventListener('load', function () {
	            injectIntoDOM(dependencies, ++idx);
	          });
	
	          elem.addEventListener('error', function () {
	            injectIntoDOM(dependencies, ++idx);
	          });
	        } else {
	          if (_this3.injectInto) {
	            _this3.injectInto.appendChild(elem);
	          }
	
	          injectIntoDOM(dependencies, ++idx);
	        }
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
	
	        injectIntoDOM(dependencies);
	
	        return Promise.resolve(dependencies);
	      });
	    }
	  }, {
	    key: 'injectManifest',
	    value: function injectManifest(manifest) {
	      var _this4 = this;
	
	      var hashes = Object.keys(manifest.hashes);
	
	      return Promise.all(hashes.map(function (hash) {
	        var dependency = manifest.hashes[hash],
	            rootUrl = void 0;
	
	        rootUrl = [manifest.rootUrl, manifest.packageUrl].filter(function (_url) {
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
	          return new _dom.Css(undefined, this.options).inject(this.urls(dependency, rootUrl));
	        case '.js':
	          return new _dom.Js(undefined, this.options).inject(this.urls(dependency, rootUrl));
	        default:
	          Promise.resolve(false);
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
	      var rootUrl = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	      var basename = this.basename(dependency.file),
	          url = void 0;
	
	      // Filter out potential null values
	      // passed in as various parts of an url.
	      url = [this.prefix, rootUrl, dependency.path].filter(function (_url) {
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Css = exports.Js = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cache = __webpack_require__(3);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _ajax = __webpack_require__(9);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _url = __webpack_require__(5);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Js = function () {
	  function Js(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Js);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	    var _config$verification = config.verification;
	    var verification = _config$verification === undefined ? false : _config$verification;
	    var _config$cacheInLocalS = config.cacheInLocalStorage;
	    var cacheInLocalStorage = _config$cacheInLocalS === undefined ? true : _config$cacheInLocalS;
	
	
	    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);
	
	    cacheInLocalStorage = (0, _url2.default)('dactylographsy-cacheInLocalStorage', cacheInLocalStorage);
	
	    this.injectInto = injectInto;
	
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
	    key: 'injectWithText',
	    value: function injectWithText(text, url) {
	      var _this = this;
	
	      return new Promise(function (resolve) {
	        var script = document.createElement('script');
	
	        _this.log.info('Creating <script />-tag with text for ' + url + '.');
	
	        script.defer = false;
	        script.async = false;
	
	        script.setAttribute('data-dactylographsy-url', url);
	
	        script.text = '\n        ' + text + '\n        //# sourceURL=' + url + '\n      ';
	
	        if (_this.injectInto) {
	          _this.log.info('Injecting <script />-tag with url: ' + url + '.');
	
	          resolve(_this.injectInto.appendChild(script));
	        } else {
	          resolve(script);
	        }
	      });
	    }
	  }, {
	    key: 'injectWithUrl',
	    value: function injectWithUrl(urls) {
	      var _this2 = this;
	
	      var whichUrl = arguments.length <= 1 || arguments[1] === undefined ? 'printed' : arguments[1];
	
	      return new Promise(function (resolve) {
	        // Create script element and set its type
	        var script = document.createElement('script'),
	            url = urls[whichUrl];
	
	        _this2.log.info('Creating <script />-tag with url: ' + url + '.');
	
	        script.async = false;
	        script.defer = false;
	
	        script.setAttribute('data-dactylographsy-url', url);
	        script.setAttribute('data-dactylographsy-uncached-js', true);
	
	        // Bind to readyState or register ´onload´ callback
	        if (script.readyState) {
	          // Callback for IE's `onreadystatechange` (I feel seesick)
	          script.onreadystatechange = function () {
	            if (script.readyState === 'loaded' || script.readyState === 'complete') {
	              script.onreadystatechange = null;
	
	              _this2.ensureCache(url, urls.singularBy, _this2.cacheDelay);
	            }
	          };
	        } else {
	          // Bind `onload` callback on script element
	          script.onload = function () {
	            if (whichUrl === 'printed') {
	              _this2.ensureCache(url, urls.singularBy, _this2.cacheDelay);
	            }
	          };
	
	          // Inject unprinted without caching in case of error
	          script.onerror = function () {
	            _this2.log.info('Could not fetch JavaScript from ' + url + ' - falling back to unprinted version.');
	
	            if (whichUrl === 'printed') {
	              _this2.injectWithUrl(urls, 'raw');
	            }
	          };
	        }
	
	        script.src = url;
	
	        if (_this2.injectInto) {
	          _this2.log.info('Injecting <script />-tag with url: ' + url + '.');
	
	          resolve(_this2.injectInto.appendChild(script));
	        } else {
	          // ...needs caching manually cause never injected
	          if (whichUrl === 'printed') {
	            _this2.ensureCache(url, urls.singularBy, _this2.cacheDelay);
	          }
	
	          resolve(script);
	        }
	      });
	    }
	  }, {
	    key: 'ensureCache',
	    value: function ensureCache(url) {
	      var _this3 = this;
	
	      var singularBy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	      return new Promise(function (resolve, reject) {
	        if (_this3.cache.has(url) || !_this3.cacheInLocalStorage) {
	          return resolve();
	        }
	
	        _this3.log.info('Loading JavaScript from ' + url + ' for cache in ' + delay + '.');
	
	        window.setTimeout(function () {
	          return new _ajax2.default().get(url).then(function (response) {
	            var responseText = response.text;
	
	
	            _this3.cache.set(responseText, 'js', url, singularBy);
	
	            _this3.log.info('Loaded JavaScript from ' + url + ' now cached.');
	
	            resolve();
	          }).catch(function () {
	            _this3.log.info('Failed attempting to cache JavaScript from ' + url + '.');
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
	    key: 'inject',
	    value: function inject(urls) {
	      var _this4 = this;
	
	      return this.cache.get(urls.printed, undefined, this.hash(urls.id)).then(function (text) {
	        return _this4.injectWithText(text, urls.printed);
	      }, function () {
	        return _this4.injectWithUrl(urls);
	      });
	    }
	  }]);
	
	  return Js;
	}();
	
	exports.Js = Js;
	
	var Css = function () {
	  function Css(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Css);
	
	    var _config$enableLogging2 = config.enableLogging;
	    var enableLogging = _config$enableLogging2 === undefined ? false : _config$enableLogging2;
	    var _config$verification2 = config.verification;
	    var verification = _config$verification2 === undefined ? false : _config$verification2;
	    var _config$cacheInLocalS2 = config.cacheInLocalStorage;
	    var cacheInLocalStorage = _config$cacheInLocalS2 === undefined ? true : _config$cacheInLocalS2;
	
	
	    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);
	
	    cacheInLocalStorage = (0, _url2.default)('dactylographsy-cacheInLocalStorage', cacheInLocalStorage);
	
	    this.injectInto = injectInto;
	
	    this.cache = new _cache2.default({
	      appPrefix: config.appPrefix
	    });
	
	    this.cacheDelay = config.cacheDelay || 5000;
	    this.verification = verification;
	
	    this.log = new _log2.default(enableLogging);
	  }
	
	  _createClass(Css, [{
	    key: 'ensureCache',
	    value: function ensureCache(url) {
	      var _this5 = this;
	
	      var singularBy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
	      return new Promise(function (resolve) {
	        if (_this5.cache.has(url) || !_this5.cacheInLocalStorage) {
	          return resolve();
	        }
	
	        _this5.log.info('Loading CSS from ' + url + ' for cache in ' + delay + '.');
	
	        window.setTimeout(function () {
	          return new _ajax2.default().get(url).then(function (response) {
	            var responseText = response.text;
	
	
	            _this5.cache.set(responseText, 'css', url, singularBy);
	
	            _this5.log.info('Loaded CSS from ' + url + ' now cached.');
	
	            resolve();
	          }).catch(function () {
	            _this5.log.info('Failed attempting to cache CSS from ' + url + '.');
	          });
	        }, delay);
	      });
	    }
	  }, {
	    key: 'injectWithUrl',
	    value: function injectWithUrl(urls) {
	      var _this6 = this;
	
	      var whichUrl = arguments.length <= 1 || arguments[1] === undefined ? 'printed' : arguments[1];
	
	      return new Promise(function (resolve) {
	        var link = document.createElement('link'),
	            url = urls[whichUrl];
	
	        _this6.log.info('Creating <link />-tag with url: ' + url + '.');
	
	        link = document.createElement('link');
	
	        link.type = 'text/css';
	        link.rel = 'stylesheet';
	
	        link.setAttribute('data-dactylographsy-url', url);
	        link.setAttribute('data-dactylographsy-uncached-css', true);
	
	        link.href = url;
	
	        // Fallback to unprinted assets after cache attempt
	        // no callbacks for stylesheet injections (timeouts are worse...)
	        if (whichUrl === 'printed') {
	          _this6.ensureCache(url, urls.singularBy, _this6.cacheDelay).catch(function () {
	            _this6.log.info('Could not fetch CSS from ' + url + ' - falling back to unprinted version.');
	
	            _this6.injectWithUrl(urls, 'raw');
	          });
	        }
	
	        if (_this6.injectInto) {
	          _this6.log.info('Injecting <link />-tag with url: ' + url + '.');
	
	          resolve(_this6.injectInto.appendChild(link));
	        } else {
	          resolve(link);
	        }
	      });
	    }
	  }, {
	    key: 'injectWithText',
	    value: function injectWithText(text, url) {
	      var _this7 = this;
	
	      return new Promise(function (resolve) {
	        var link = document.createElement('link');
	
	        _this7.log.info('Creating <link />-tag with text for url: ' + url + '.');
	
	        link = document.createElement('style');
	
	        link.setAttribute('data-dactylographsy-url', url);
	
	        link.textContent = text;
	
	        if (_this7.injectInto) {
	          _this7.log.info('Injecting <link />-tag with url: ' + url + '.');
	
	          resolve(_this7.injectInto.appendChild(link));
	        } else {
	          resolve(link);
	        }
	      });
	    }
	  }, {
	    key: 'hash',
	    value: function hash(_hash2) {
	      return this.verification === true ? _hash2 : false;
	    }
	  }, {
	    key: 'inject',
	    value: function inject(urls) {
	      var _this8 = this;
	
	      return this.cache.get(urls.printed, undefined, this.hash(urls.id)).then(function (text) {
	        return _this8.injectWithText(text, urls.printed);
	      }, function () {
	        return _this8.injectWithUrl(urls);
	      });
	    }
	  }]);

	  return Css;
	}();

	exports.Css = Css;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
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
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	
	        if ('withCredentials' in xhr) {
	          // XHR for Chrome/Firefox/Opera/Safari.
	          xhr.open('GET', url, true);
	        } else if (typeof XDomainRequest !== 'undefined') {
	          // XDomainRequest for IE.
	          xhr = new XDomainRequest();
	          xhr.open('GET', url);
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(13);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	
	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }
	
	      var state = parent._state;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }
	
	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
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
	      var promise = new Promise(function(resolve, reject) {
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
	          var xhr = new XMLHttpRequest();
	
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
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
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
	      var result;
	
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
	      var author, books;
	
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
	      then: lib$es6$promise$then$$default,
	
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
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }
	
	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }
	
	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
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
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(14)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), (function() { return this; }()), __webpack_require__(12)(module)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDA4MTE4ZDg5OGQ2MjE5MDNiZjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vc3RyaW5nLWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy92ZXJ0eCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7Ozs7O0FBRUEsc0JBQVcsUUFBWDs7QUFFQSxLQUFJLE9BQU8sTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQyxVQUFPLGNBQVAsR0FBd0IsNkJBQW1CO0FBQ3pDLGNBQVM7QUFEZ0MsSUFBbkIsQ0FBeEI7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXFCLCtCQUErQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsd0JBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFROztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7QUFDMUU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxRQUFROztBQUU3Qzs7QUFFQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSwwQkFBeUIsWUFBWTtBQUNyQztBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QixlQUFjLFNBQVM7QUFDdkI7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QjtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIsa0VBQWtFO0FBQ3ZGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsdURBQXNELGdCQUFnQixFQUFFO0FBQ3hFO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUF5Qix3Q0FBd0MsRUFBRTtBQUNuRSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEVBQUM7Ozs7Ozs7OztBQzc3QkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQzdGdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSxnQjs7Ozs7O0FDQUEsOEJBQTZCLG1EQUFtRCIsImZpbGUiOiJkYWN0eWxvZ3JhcGhzeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDA4MTE4ZDg5OGQ2MjE5MDNiZjNcbiAqKi8iLCJpbXBvcnQgRGFjdHlsb2dyYXBoc3kgZnJvbSAnLi9kYWN0eWxvZ3JhcGhzeSc7XG5pbXBvcnQgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmVzNlByb21pc2UucG9seWZpbGwoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5kYWN0eWxvZ3JhcGhzeSA9IG5ldyBEYWN0eWxvZ3JhcGhzeSh7XG4gICAgYXV0b3J1bjogdHJ1ZVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluamVjdG9yLCB7TWFuaWZlc3R9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWN0eWxvZ3JhcGhzeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICB7IGF1dG9ydW4gPSBmYWxzZSB9ID0gb3B0aW9ucyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ob29rSW50b0RvbSgpO1xuICAgIHRoaXMucmVhZENvbmZpZ3VyYXRpb24oKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiB0aGlzLmNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIGlmIChhdXRvcnVuKSB7IHRoaXMucnVuKCk7IH1cbiAgfVxuXG4gIGhvb2tJbnRvRG9tKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5leGVjdXRpbmdTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFjdHlsb2dyYXBoc3knKTtcbiAgICB0aGlzLmluamVjdEludG8gPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICB9XG5cbiAgcmVhZENvbmZpZ3VyYXRpb24oKSB7XG4gICAgdGhpcy5tYW5pZmVzdFVybHMgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ21hbmlmZXN0cycpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdjb25maWcnKTtcbiAgfVxuXG4gIHJlZnJlc2goaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLm1hbmlmZXN0VXJscy5tYXAodXJsID0+IHtcbiAgICAgIHJldHVybiBuZXcgTWFuaWZlc3QodXJsLCB0aGlzLmNvbmZpZykuZ2V0KCk7XG4gICAgfSkpLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgYWxsIG1hbmlmZXN0cywgJHttYW5pZmVzdHMubGVuZ3RofSBpbiB0b3RhbC5gKTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlSW5Mb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy5jYWNoZS5zZXQobWFuaWZlc3RzLCAnbWFuaWZlc3RzJywgJ21hbmlmZXN0cycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICkuaW5qZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoJ21hbmlmZXN0cycpXG4gICAgICAudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCdSZXN0b3Jpbmcgd2l0aCBtYW5pZmVzdHMgaW4gY2FjaGUgbGF0ZXIgcmVmcmVzaGluZyB2aWEgbmV0d29yayAoZGVsYXllZCkuJyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICAgIHRoaXMuY29uZmlnXG4gICAgICAgICkuaW5qZWN0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlYWRBdHRyT25TY3JpcHQoYXR0cikge1xuICAgIGlmICghdGhpcy5leGVjdXRpbmdTY3JpcHQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBsZXQgX2F0dHIgPSB0aGlzLmV4ZWN1dGluZ1NjcmlwdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xuXG4gICAgcmV0dXJuIF9hdHRyID8gSlNPTi5wYXJzZShfYXR0cikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBydW4oKSB7XG4gICAgY29uc3RcbiAgICAgIHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlKSB7XG4gICAgICAvLyBSZW1vdmUgYWxsIGNhY2hlLWtleXMgd2UgbWlnaHQgaGF2ZSBzZXQgaW4gdGhlIHBhc3QgYW5kIHRoZW4gc3dpdGNoZWQgY29uZmlnXG4gICAgICB0aGlzLmxvZy5pbmZvKCdGbHVzaGluZyBsb2NhbC1zdG9yYWdlIGR1ZSB0byBjb25maWctb3B0aW9uIFwiY2FjaGVJbkxvY2FsU3RvcmFnZT1mYWxzZVwiJylcbiAgICAgIHRoaXMuY2FjaGUuZmx1c2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSAmJiB0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHsgcmV0dXJuIHRoaXMucmVmcmVzaChmYWxzZSk7IH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9mIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZWRNYW5pZmVzdHMgPT09IGZhbHNlIHx8XG4gICAgICAgIHRoaXMuY29uZmlnLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZSB8fFxuICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlID09PSBmYWxzZVxuICAgICAgKSA/IHRoaXMucmVmcmVzaCgpIDogdGhpcy5yZXN0b3JlKClcbiAgICAgICAgLnRoZW4oaW5qZWN0ZWRGcm9tQ2FjaGUgPT4ge1xuICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICByZWZyZXNoRGVsYXkgPSA1MDAwXG4gICAgICAgICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGluamVjdGVkRnJvbUNhY2hlKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCByZWZyZXNoRGVsYXkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcbmltcG9ydCBzdHJpbmdIYXNoIGZyb20gJ3N0cmluZy1oYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgZGVmYXVsdFByZWZpeCA9ICdfX2RhY3R5bG9ncmFwaHN5JyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2FjaGVQcmVmaXggPSB0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXggfHwgZGVmYXVsdFByZWZpeDtcbiAgICB0aGlzLmlzU3VwcG9ydGVkID0gdGhpcy5zdXBwb3J0ZWQoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBwUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ID0gYCR7dGhpcy5jYWNoZVByZWZpeH0tLSR7dGhpcy5vcHRpb25zLmFwcFByZWZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCArPSAnX18nO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVByZWZpeDtcbiAgfVxuXG4gIGlzSXRlbVZhbGlkKGNvZGUsIGhhc2gpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgIT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHN0cmluZ0hhc2goY29kZSkgPT09IGhhc2hcbiAgICApO1xuICB9XG5cbiAgcGFyc2UoaXRlbSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICB9XG5cbiAgZ2V0KGtleSwgZGVmYXVsdFZhbHVlLCBoYXNoID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJlamVjdCgpOyB9XG5cbiAgICAgIGxldFxuICAgICAgICBfaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApO1xuXG4gICAgICBpZiAoX2l0ZW0gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoZGVmYXVsdFZhbHVlLCAncGxhaW4nLCBrZXkpO1xuXG4gICAgICAgIHJlc29sdmUoZGVmYXVsdFZhbHVlKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBoYXNoICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIF9wYXJzZWQgPSB0aGlzLnBhcnNlKF9pdGVtKTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGb3VuZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUgd2hpY2ggbmVlZHMgdmFsaWRhdGlvbi4uLmApO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSXRlbVZhbGlkKF9wYXJzZWQuY29kZSwgaGFzaCkpIHtcbiAgICAgICAgICB0aGlzLmxvZy5pbmZvKGAuLi5tYXRjaGVzIGV4cGVjdGVkIGhhc2ggJHtoYXNofS5gKTtcblxuICAgICAgICAgIHJlc29sdmUoX3BhcnNlZC5jb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZy5pbmZvKGAuLi5kb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBoYXNoICR7aGFzaH0gLSBwcnVuaW5nLmApO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMucGFyc2UoX2l0ZW0pLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICByZW1vdmUoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApOztcbiAgfVxuXG4gIHNldChjb2RlLCB0eXBlLCBrZXksIHNpbmd1bGFyQnkgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc2luZ3VsYXJCeSkgeyB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTsgfVxuXG4gICAgbGV0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKCB0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycgKSA/IHNpbmd1bGFyQnkgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY2FjaGVkKVxuICAgICk7XG5cbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXRcbiAgICAgIGl0ZW0gPSAnX19kYWN0eWxvZ3JhcGhzeV9fZmVhdHVyZS1kZXRlY3Rpb24nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW0sIGl0ZW0pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2cud2FybignTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGRhY3R5bG9ncmFwaHN5SXRlbSA9IGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDA7XG4gICAgICBsZXRcbiAgICAgICAgaXRlbTtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHsgY29udGludWU7IH1cblxuICAgICAgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCAodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICkgJiZcbiAgICAgICAgaXRlbS5zaW5ndWxhckJ5ID09PSBzaW5ndWxhckJ5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBEZWR1cGluZyBieSAke3Npbmd1bGFyQnl9IGJlZm9yZSBhZGRpbmcgZHVwZSBpbiAke2tleX0uYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhY2hlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIHtcblxuICAvLyBOb3QgbGV2ZWwgYm91bmQgbG9nZ2luZyBuZWVkZWQgeWV0XG4gIGNvbnN0cnVjdG9yKGVuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcblxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgfVxuXG4gIGxvZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgaW5mbygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5pbmZvKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBkZWJ1ZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5kZWJ1ZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBlcnJvcigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpOyB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvZy5qc1xuICoqLyIsImNvbnN0XG4gIGdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0XG4gICAgICBxdWVyeSA9IHVybCxcbiAgICAgIHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgICBsZXRcbiAgICAgIHBhcmFtcyxcbiAgICAgIG1hdGNoO1xuXG4gICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMocXVlcnkpKSB7XG4gICAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdFxuICAgIHBhcmFtcyA9IGdldFBhcmFtcyh1cmwpO1xuXG4gIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHBhcmFtc1twYXJhbV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW3BhcmFtXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBpZlVuc2V0XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cmwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICB2YXIgaGFzaCA9IDUzODEsXG4gICAgICBpICAgID0gc3RyLmxlbmd0aFxuXG4gIHdoaWxlKGkpXG4gICAgaGFzaCA9IChoYXNoICogMzMpIF4gc3RyLmNoYXJDb2RlQXQoLS1pKVxuXG4gIC8qIEphdmFTY3JpcHQgZG9lcyBiaXR3aXNlIG9wZXJhdGlvbnMgKGxpa2UgWE9SLCBhYm92ZSkgb24gMzItYml0IHNpZ25lZFxuICAgKiBpbnRlZ2Vycy4gU2luY2Ugd2Ugd2FudCB0aGUgcmVzdWx0cyB0byBiZSBhbHdheXMgcG9zaXRpdmUsIGlmIHRoZSBoaWdoIGJpdFxuICAgKiBpcyBzZXQsIHVuc2V0IGl0IGFuZCBhZGQgaXQgYmFjayBpbiB0aHJvdWdoICg2NC1iaXQgSUVFRSkgYWRkaXRpb24uICovXG4gIHJldHVybiBoYXNoID49IDAgPyBoYXNoIDogKGhhc2ggJiAweDdGRkZGRkZGKSArIDB4ODAwMDAwMDBcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0cmluZy1oYXNoL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtDc3MsIEpzfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgTWFuaWZlc3Qge1xuICBjb25zdHJ1Y3Rvcih1cmwsIGNvbmZpZykge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAuZ2V0KHRoaXMudXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm1hbmlmZXN0cyA9IHt9O1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICBtYW5pZmVzdHMuZm9yRWFjaChtYW5pZmVzdCA9PiB7IHRoaXMubWFuaWZlc3RzW21hbmlmZXN0LnBhY2thZ2VdID0gbWFuaWZlc3Q7IH0pO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4O1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICB9XG5cbiAgaW5qZWN0KCkge1xuICAgIGNvbnN0XG4gICAgICBmbGF0dGVuID0gbGlzdCA9PiBsaXN0LnJlZHVjZShcbiAgICAgICAgKGEsIGIpID0+IGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBmbGF0dGVuKGIpIDogYiksIFtdXG4gICAgICApLFxuICAgICAgaW5qZWN0SW50b0RPTSA9IChkZXBlbmRlbmNpZXMsIGlkeCA9IDApID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRlcGVuZGVuY2llc1tpZHhdO1xuXG4gICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWpzJykpIHtcbiAgICAgICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdJbmplY3RpbmcgdGFnOicsIGVsZW0pO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pOyB9XG5cbiAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgdGhpcy5vcmRlci5tYXAoX3BhY2thZ2UgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSkge1xuICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZG5cXCd0IGZpbmQgcGFja2FnZSAke19wYWNrYWdlfSBmcm9tIGluamVjdGlvbiBvcmRlci5gKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluamVjdE1hbmlmZXN0KHRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBmbGF0dGVuKG1hbmlmZXN0cyk7XG5cbiAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBsZXRcbiAgICAgIGhhc2hlcyA9IE9iamVjdC5rZXlzKG1hbmlmZXN0Lmhhc2hlcyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoaGFzaGVzLm1hcChoYXNoID0+IHtcbiAgICAgIGxldFxuICAgICAgICBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdLFxuICAgICAgICByb290VXJsO1xuXG4gICAgICByb290VXJsID0gW21hbmlmZXN0LnJvb3RVcmwsIG1hbmlmZXN0LnBhY2thZ2VVcmxdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICAgICk7XG4gICAgICB9KS5qb2luKCcvJyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmluamVjdERlcGVuZGVuY3koXG4gICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgIHJvb3RVcmxcbiAgICAgICk7XG4gICAgfSkpO1xuICB9XG5cbiAgaW5qZWN0RGVwZW5kZW5jeShkZXBlbmRlbmN5LCByb290VXJsKSB7XG4gICAgc3dpdGNoIChkZXBlbmRlbmN5LmV4dGVuc2lvbikge1xuICAgICAgY2FzZSAnLmNzcyc6XG4gICAgICAgIHJldHVybiBuZXcgQ3NzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBjYXNlICcuanMnOlxuICAgICAgICByZXR1cm4gbmV3IEpzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBsZXRcbiAgICAgIGJhc2VuYW1lID0gdGhpcy5iYXNlbmFtZShkZXBlbmRlbmN5LmZpbGUpLFxuICAgICAgdXJsO1xuXG4gICAgLy8gRmlsdGVyIG91dCBwb3RlbnRpYWwgbnVsbCB2YWx1ZXNcbiAgICAvLyBwYXNzZWQgaW4gYXMgdmFyaW91cyBwYXJ0cyBvZiBhbiB1cmwuXG4gICAgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZDogZGVwZW5kZW5jeS5pZCxcbiAgICAgIHByaW50ZWQ6IGAvJHt1cmx9LyR7YmFzZW5hbWV9LSR7ZGVwZW5kZW5jeS5oYXNofSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHJhdzogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICBzaW5ndWxhckJ5OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YFxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luamVjdG9yLmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGNsYXNzIEpzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2UsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gdHJ1ZVxuICAgIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1jYWNoZUluTG9jYWxTdG9yYWdlJyxcbiAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2VcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLmNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBjYWNoZUluTG9jYWxTdG9yYWdlO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgaW5qZWN0V2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHRleHQgZm9yICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBzY3JpcHQudGV4dCA9IGBcbiAgICAgICAgJHt0ZXh0fVxuICAgICAgICAvLyMgc291cmNlVVJMPSR7dXJsfVxuICAgICAgYDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUoc2NyaXB0KTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIENyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGl0cyB0eXBlXG4gICAgICBsZXRcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcbiAgICAgIHNjcmlwdC5kZWZlciA9IGZhbHNlO1xuXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWpzJywgdHJ1ZSk7XG5cbiAgICAgIC8vIEJpbmQgdG8gcmVhZHlTdGF0ZSBvciByZWdpc3RlciDCtG9ubG9hZMK0IGNhbGxiYWNrXG4gICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpIHtcbiAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIElFJ3MgYG9ucmVhZHlzdGF0ZWNoYW5nZWAgKEkgZmVlbCBzZWVzaWNrKVxuICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRlZCcgfHwgc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJpbmQgYG9ubG9hZGAgY2FsbGJhY2sgb24gc2NyaXB0IGVsZW1lbnRcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpOyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW5qZWN0IHVucHJpbnRlZCB3aXRob3V0IGNhY2hpbmcgaW4gY2FzZSBvZiBlcnJvclxuICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggSmF2YVNjcmlwdCBmcm9tICR7dXJsfSAtIGZhbGxpbmcgYmFjayB0byB1bnByaW50ZWQgdmVyc2lvbi5gKTtcblxuICAgICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzLCAncmF3Jyk7IH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgc2NyaXB0LnNyYyA9IHVybDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIC4uLm5lZWRzIGNhY2hpbmcgbWFudWFsbHkgY2F1c2UgbmV2ZXIgaW5qZWN0ZWRcbiAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSB8fCAhdGhpcy5jYWNoZUluTG9jYWxTdG9yYWdlKSB7IHJldHVybiByZXNvbHZlKCk7IH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnanMnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgKSA/IGhhc2ggOiBmYWxzZVxuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2UsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gdHJ1ZVxuICAgIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1jYWNoZUluTG9jYWxTdG9yYWdlJyxcbiAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2VcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgZW5zdXJlQ2FjaGUodXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UsIGRlbGF5ID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkgfHwgIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkgeyByZXR1cm4gcmVzb2x2ZSgpOyB9XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYExvYWRpbmcgQ1NTIGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2NzcycsIHVybCwgc2luZ3VsYXJCeSk7XG5cbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBDU1MgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIENTUyBmcm9tICR7dXJsfS5gKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSxcbiAgICAgICAgdXJsID0gdXJsc1t3aGljaFVybF07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1jc3MnLCB0cnVlKTtcblxuICAgICAgbGluay5ocmVmID0gdXJsO1xuXG4gICAgICAvLyBGYWxsYmFjayB0byB1bnByaW50ZWQgYXNzZXRzIGFmdGVyIGNhY2hlIGF0dGVtcHRcbiAgICAgIC8vIG5vIGNhbGxiYWNrcyBmb3Igc3R5bGVzaGVldCBpbmplY3Rpb25zICh0aW1lb3V0cyBhcmUgd29yc2UuLi4pXG4gICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykge1xuICAgICAgICB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkIG5vdCBmZXRjaCBDU1MgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzLCAncmF3Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8bGluayAvPi10YWcgd2l0aCB0ZXh0IGZvciB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChsaW5rKSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKGxpbmspOyB9XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICBpbmplY3QodXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmlkKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZG9tLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBnZXQodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBmb3IgSUUuXG4gICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgeGhyOiB4aHIsXG4gICAgICAgICAgICB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgdXJsOiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWpheC5qc1xuICoqLyIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qYWtlYXJjaGliYWxkL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDMuMi4xXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNNYXliZVRoZW5hYmxlKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheSA9IGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPSAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm47XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuXSA9IGNhbGxiYWNrO1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2xpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKyAxXSA9IGFyZztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKz0gMjtcbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID09PSAyKSB7XG4gICAgICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAgICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcChhc2FwRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gYXNhcEZuO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgfHwge307XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4gICAgLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgLy8gbm9kZVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpIHtcbiAgICAgIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2sobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmVydHhcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2ViIHdvcmtlclxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCwgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuOyBpKz0yKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXTtcbiAgICAgICAgdmFyIGFyZyA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdO1xuXG4gICAgICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByID0gcmVxdWlyZTtcbiAgICAgICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaDtcbiAgICAvLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgICAgIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoY2hpbGRbbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRtYWtlUHJvbWlzZShjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbc3RhdGUgLSAxXTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlKG9iamVjdCkge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmU7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMTYpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCgpIHt9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAgID0gdm9pZCAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgPSAxO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAgPSAyO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkY2Fubm90UmV0dXJuT3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHByb21pc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICAgICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0sIHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gICAgICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbikge1xuICAgICAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICB0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgIGNvbnN0cnVjdG9yLnJlc29sdmUgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHRoZW4pKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgICAgIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQ7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaCwgcHJvbWlzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7IHJldHVybjsgfVxuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICAgICAgdmFyIGxlbmd0aCA9IHN1YnNjcmliZXJzLmxlbmd0aDtcblxuICAgICAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoICsgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRF0gID0gb25SZWplY3Rpb247XG5cbiAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwYXJlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gocHJvbWlzZSkge1xuICAgICAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICB2YXIgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdmFyIGhhc0NhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgICAgICB2YWx1ZSwgZXJyb3IsIHN1Y2NlZWRlZCwgZmFpbGVkO1xuXG4gICAgICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICAgICAgdmFsdWUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgICAgICBpZiAodmFsdWUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZGV0YWlsO1xuICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgICAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpZCA9IDA7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbmV4dElkKCkge1xuICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGlkKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbWFrZVByb21pc2UocHJvbWlzZSkge1xuICAgICAgcHJvbWlzZVtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGlkKys7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGwoZW50cmllcykge1xuICAgICAgcmV0dXJuIG5ldyBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGw7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZShlbnRyaWVzKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgaWYgKCFsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoZW50cmllcykpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2U7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3QocmVhc29uKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0O1xuXG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlO1xuICAgIC8qKlxuICAgICAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgICAgIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICAgICAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIFRlcm1pbm9sb2d5XG4gICAgICAtLS0tLS0tLS0tLVxuXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAgICAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAgICAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gICAgICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gICAgICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICAgICAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gICAgICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICAgICAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgICAgIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICAgICAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gICAgICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gICAgICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gICAgICBCYXNpYyBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBgYGBqc1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gb24gc3VjY2Vzc1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICAvLyBvbiBmYWlsdXJlXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS0tLS1cblxuICAgICAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICAgICAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gICAgICBgYGBqc1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICAgICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBjbGFzcyBQcm9taXNlXG4gICAgICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZShyZXNvbHZlcikge1xuICAgICAgdGhpc1tsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5leHRJZCgpO1xuICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCk7XG4gICAgICAgIHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSA/IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLmFsbCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yYWNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZXNvbHZlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZWplY3QgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldFNjaGVkdWxlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXI7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldEFzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fYXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwO1xuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucHJvdG90eXBlID0ge1xuICAgICAgY29uc3RydWN0b3I6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLFxuXG4gICAgLyoqXG4gICAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQ2hhaW5pbmdcbiAgICAgIC0tLS0tLS0tXG5cbiAgICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgICAgfSk7XG5cbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICAgIH0pO1xuICAgICAgYGBgXG4gICAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBc3NpbWlsYXRpb25cbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgU2ltcGxlIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgYXV0aG9yLCBib29rcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG5cbiAgICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcblxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuXG4gICAgICB9XG5cbiAgICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZEF1dGhvcigpLlxuICAgICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIHRoZW5cbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICB0aGVuOiBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCxcblxuICAgIC8qKlxuICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHN5bmNocm9ub3VzXG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQXV0aG9yKCk7XG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfVxuXG4gICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgY2F0Y2hcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoIXRoaXMucHJvbWlzZVtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGlucHV0KSkge1xuICAgICAgICB0aGlzLl9pbnB1dCAgICAgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5sZW5ndGggICAgID0gaW5wdXQubGVuZ3RoO1xuICAgICAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QodGhpcy5wcm9taXNlLCBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCR2YWxpZGF0aW9uRXJyb3IoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxlbmd0aCAgPSB0aGlzLmxlbmd0aDtcbiAgICAgIHZhciBpbnB1dCAgID0gdGhpcy5faW5wdXQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbihlbnRyeSwgaSkge1xuICAgICAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICAgICAgdmFyIHJlc29sdmUgPSBjLnJlc29sdmU7XG5cbiAgICAgIGlmIChyZXNvbHZlID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0KSB7XG4gICAgICAgIHZhciB0aGVuID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbihlbnRyeSk7XG5cbiAgICAgICAgaWYgKHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ICYmXG4gICAgICAgICAgICBlbnRyeS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgICAgICB9IGVsc2UgaWYgKGMgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0KSB7XG4gICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIGVudHJ5LCB0aGVuKTtcbiAgICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQocHJvbWlzZSwgaSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uKHJlc29sdmUpIHsgcmVzb2x2ZShlbnRyeSk7IH0pLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHJlc29sdmUoZW50cnkpLCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbihzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICAgICAgaWYgKHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24ocHJvbWlzZSwgaSkge1xuICAgICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVELCBpLCByZWFzb24pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsKCkge1xuICAgICAgdmFyIGxvY2FsO1xuXG4gICAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IGdsb2JhbDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgICBpZiAoUCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvY2FsLlByb21pc2UgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdDtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGw7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZSA9IHtcbiAgICAgICdQcm9taXNlJzogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQsXG4gICAgICAncG9seWZpbGwnOiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHRcbiAgICB9O1xuXG4gICAgLyogZ2xvYmFsIGRlZmluZTp0cnVlIG1vZHVsZTp0cnVlIHdpbmRvdzogdHJ1ZSAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7IH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlWydleHBvcnRzJ10pIHtcbiAgICAgIG1vZHVsZVsnZXhwb3J0cyddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1snRVM2UHJvbWlzZSddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQoKTtcbn0pLmNhbGwodGhpcyk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiB2ZXJ0eCAoaWdub3JlZClcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpOyB9O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==