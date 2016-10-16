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
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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

/***/ },
/* 5 */
/***/ function(module, exports) {

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
	
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
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
	  function Js() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Js);
	
	    var _config$verification = config.verification;
	    var verification = _config$verification === undefined ? false : _config$verification;
	    var _config$cacheInLocalS = config.cacheInLocalStorage;
	    var cacheInLocalStorage = _config$cacheInLocalS === undefined ? true : _config$cacheInLocalS;
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
	
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
	
	    var _config$verification2 = config.verification;
	    var verification = _config$verification2 === undefined ? false : _config$verification2;
	    var _config$cacheInLocalS2 = config.cacheInLocalStorage;
	    var cacheInLocalStorage = _config$cacheInLocalS2 === undefined ? true : _config$cacheInLocalS2;
	    var _config$enableLogging2 = config.enableLogging;
	    var enableLogging = _config$enableLogging2 === undefined ? false : _config$enableLogging2;
	
	
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
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
	      value = null;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

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


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2EwNWE1OTU4NTE1YzMwM2VhMzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vc3RyaW5nLWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy92ZXJ0eCAoaWdub3JlZCkiXSwibmFtZXMiOlsicG9seWZpbGwiLCJ3aW5kb3ciLCJkYWN0eWxvZ3JhcGhzeSIsImF1dG9ydW4iLCJEYWN0eWxvZ3JhcGhzeSIsIm9wdGlvbnMiLCJlbmFibGVMb2dnaW5nIiwibG9nIiwiaG9va0ludG9Eb20iLCJyZWFkQ29uZmlndXJhdGlvbiIsImNhY2hlIiwiYXBwUHJlZml4IiwiY29uZmlnIiwicnVuIiwiZG9jdW1lbnQiLCJleGVjdXRpbmdTY3JpcHQiLCJnZXRFbGVtZW50QnlJZCIsImluamVjdEludG8iLCJib2R5IiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibWFuaWZlc3RVcmxzIiwicmVhZEF0dHJPblNjcmlwdCIsImluamVjdCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJ1cmwiLCJnZXQiLCJ0aGVuIiwiaW5mbyIsIm1hbmlmZXN0cyIsImxlbmd0aCIsImNhY2hlSW5Mb2NhbFN0b3JhZ2UiLCJzZXQiLCJ1bmRlZmluZWQiLCJhdHRyIiwiX2F0dHIiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJ0dGwiLCJmbHVzaCIsImNsdCIsImNhY2hlT25seSIsInJlZnJlc2giLCJjYWNoZWRNYW5pZmVzdHMiLCJ2ZXJpZmljYXRpb24iLCJyZXN0b3JlIiwicmVmcmVzaERlbGF5IiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJpbmplY3RlZEZyb21DYWNoZSIsImNhdGNoIiwiQ2FjaGUiLCJkZWZhdWx0UHJlZml4IiwiY2FjaGVQcmVmaXgiLCJpc1N1cHBvcnRlZCIsInN1cHBvcnRlZCIsImNvZGUiLCJoYXNoIiwiaXRlbSIsImtleSIsImRlZmF1bHRWYWx1ZSIsIl9pdGVtIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIl9wYXJzZWQiLCJpc0l0ZW1WYWxpZCIsInJlbW92ZSIsInJlbW92ZUl0ZW0iLCJ0eXBlIiwic2luZ3VsYXJCeSIsImRlZHVwZSIsImNhY2hlZCIsIm5vdyIsIkRhdGUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiaW5kZXhPZiIsImUiLCJ3YXJuIiwiZGFjdHlsb2dyYXBoc3lJdGVtIiwiTG9nIiwiZW5hYmxlZCIsImNvbnNvbGUiLCJhcmd1bWVudHMiLCJkZWJ1ZyIsImVycm9yIiwiZ2V0VXJsUGFyYW0iLCJnZXRQYXJhbXMiLCJxdWVyeSIsInJlZ2V4IiwicGFyYW1zIiwibWF0Y2giLCJleGVjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyYW0iLCJpZlVuc2V0IiwibG9jYXRpb24iLCJzZWFyY2giLCJoYXNPd25Qcm9wZXJ0eSIsImVuY29kZVVSSUNvbXBvbmVudCIsIk1hbmlmZXN0IiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2UiLCJ0ZXh0IiwicmVzcG9uc2VVcmwiLCJ4aHIiLCJyZXNwb25zZVVSTCIsIkluamVjdG9yIiwiZm9yRWFjaCIsIm1hbmlmZXN0IiwicGFja2FnZSIsInByZWZpeCIsIm9yZGVyIiwiZmxhdHRlbiIsImxpc3QiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsIkFycmF5IiwiaXNBcnJheSIsIl9wYWNrYWdlIiwiaW5qZWN0TWFuaWZlc3QiLCJkZXBlbmRlbmNpZXMiLCJpbmplY3RJbnRvRE9NIiwiaGFzaGVzIiwiT2JqZWN0Iiwia2V5cyIsImRlcGVuZGVuY3kiLCJyb290VXJsIiwicGFja2FnZVVybCIsImZpbHRlciIsIl91cmwiLCJqb2luIiwiaW5qZWN0RGVwZW5kZW5jeSIsImV4dGVuc2lvbiIsInRhZ3MiLCJ1cmxzIiwiaWR4IiwiZWxlbSIsImFwcGVuZENoaWxkIiwibmV4dCIsImZhbGxiYWNrIiwiSFRNTExpbmtFbGVtZW50IiwicmVxdWVzdCIsImhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwicGF0aCIsInJlcGxhY2UiLCJiYXNlbmFtZSIsImZpbGUiLCJpZCIsInByaW50ZWQiLCJyYXciLCJKcyIsImNhY2hlRGVsYXkiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwiZGVmZXIiLCJhc3luYyIsInNldEF0dHJpYnV0ZSIsIndoaWNoVXJsIiwidXJsS2V5cyIsInNjcmlwdFRhZ3MiLCJ1cmxLZXkiLCJlbnN1cmVDYWNoZSIsInNyYyIsImRlbGF5IiwiaGFzIiwicHJlcGFyZVdpdGhUZXh0IiwicHJlcGFyZVdpdGhVcmwiLCJDc3MiLCJsaW5rVGFncyIsImxpbmsiLCJyZWwiLCJ0ZXh0Q29udGVudCIsIkFqYXgiLCJtZXRob2QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJYRG9tYWluUmVxdWVzdCIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsIm9uZXJyb3IiLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7Ozs7QUFFQSxzQkFBV0Es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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0ZBQWlGOztBQUVqRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixzQkFBc0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLFNBQVM7QUFDMUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsV0FBVSxJQUFJO0FBQ2Q7QUFDQSxZQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFdBQVUsSUFBSTtBQUNkO0FBQ0EsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLFdBQVUsU0FBUztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsYUFBWSxTQUFTO0FBQ3JCLGFBQVksU0FBUztBQUNyQjtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSxhQUFZLFNBQVM7QUFDckI7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0QscUM7Ozs7Ozs7QUNwb0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUNuTHRDLGdCIiwiZmlsZSI6ImRhY3R5bG9ncmFwaHN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3YTA1YTU5NTg1MTVjMzAzZWEzOFxuICoqLyIsImltcG9ydCBEYWN0eWxvZ3JhcGhzeSBmcm9tICcuL2RhY3R5bG9ncmFwaHN5JztcbmltcG9ydCBlczZQcm9taXNlIGZyb20gJ2VzNi1wcm9taXNlJztcblxuZXM2UHJvbWlzZS5wb2x5ZmlsbCgpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmRhY3R5bG9ncmFwaHN5ID0gbmV3IERhY3R5bG9ncmFwaHN5KHtcbiAgICBhdXRvcnVuOiB0cnVlXG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5qZWN0b3IsIHtcbiAgTWFuaWZlc3Rcbn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhY3R5bG9ncmFwaHN5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYXV0b3J1biA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcbiAgICB0aGlzLmhvb2tJbnRvRG9tKCk7XG4gICAgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IHRoaXMuY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgaWYgKGF1dG9ydW4pIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgaG9va0ludG9Eb20oKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV4ZWN1dGluZ1NjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWN0eWxvZ3JhcGhzeScpO1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIH1cblxuICByZWFkQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLm1hbmlmZXN0VXJscyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnbWFuaWZlc3RzJyk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ2NvbmZpZycpO1xuICB9XG5cbiAgcmVmcmVzaChpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubWFuaWZlc3RVcmxzLm1hcCh1cmwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdCh1cmwsIHRoaXMuY29uZmlnKS5nZXQoKTtcbiAgICB9KSkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBhbGwgbWFuaWZlc3RzLCAke21hbmlmZXN0cy5sZW5ndGh9IGluIHRvdGFsLmApO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmNhY2hlLnNldChtYW5pZmVzdHMsICdtYW5pZmVzdHMnLCAnbWFuaWZlc3RzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKS5pbmplY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmUoaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCgnbWFuaWZlc3RzJylcbiAgICAgIC50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ1Jlc3RvcmluZyB3aXRoIG1hbmlmZXN0cyBpbiBjYWNoZSBsYXRlciByZWZyZXNoaW5nIHZpYSBuZXR3b3JrIChkZWxheWVkKS4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICAgKS5pbmplY3QoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVhZEF0dHJPblNjcmlwdChhdHRyKSB7XG4gICAgaWYgKCF0aGlzLmV4ZWN1dGluZ1NjcmlwdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlKSB7XG4gICAgICAvLyBSZW1vdmUgYWxsIGNhY2hlLWtleXMgd2UgbWlnaHQgaGF2ZSBzZXQgaW4gdGhlIHBhc3QgYW5kIHRoZW4gc3dpdGNoZWQgY29uZmlnXG4gICAgICB0aGlzLmxvZy5pbmZvKCdGbHVzaGluZyBsb2NhbC1zdG9yYWdlIGR1ZSB0byBjb25maWctb3B0aW9uIFwiY2FjaGVJbkxvY2FsU3RvcmFnZT1mYWxzZVwiJylcbiAgICAgIHRoaXMuY2FjaGUuZmx1c2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSAmJiB0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goZmFsc2UpO1xuICAgIH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9mIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy52ZXJpZmljYXRpb24gPT09IHRydWUgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlID09PSBmYWxzZVxuICAgICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmVmcmVzaERlbGF5ID0gNTAwMFxuICAgICAgICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaChpbmplY3RlZEZyb21DYWNoZSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgcmVmcmVzaERlbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcbmltcG9ydCBzdHJpbmdIYXNoIGZyb20gJ3N0cmluZy1oYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0UHJlZml4ID0gJ19fZGFjdHlsb2dyYXBoc3knO1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2FjaGVQcmVmaXggPSB0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXggfHwgZGVmYXVsdFByZWZpeDtcbiAgICB0aGlzLmlzU3VwcG9ydGVkID0gdGhpcy5zdXBwb3J0ZWQoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBwUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ID0gYCR7dGhpcy5jYWNoZVByZWZpeH0tLSR7dGhpcy5vcHRpb25zLmFwcFByZWZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCArPSAnX18nO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVByZWZpeDtcbiAgfVxuXG4gIGlzSXRlbVZhbGlkKGNvZGUsIGhhc2gpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHN0cmluZ0hhc2goY29kZSkgPT09IGhhc2hcbiAgICApO1xuICB9XG5cbiAgcGFyc2UoaXRlbSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICB9XG5cbiAgZ2V0KGtleSwgZGVmYXVsdFZhbHVlLCBoYXNoID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBfaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApO1xuXG4gICAgICBpZiAoX2l0ZW0gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoZGVmYXVsdFZhbHVlLCAncGxhaW4nLCBrZXkpO1xuXG4gICAgICAgIHJlc29sdmUoZGVmYXVsdFZhbHVlKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBoYXNoICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfcGFyc2VkID0gdGhpcy5wYXJzZShfaXRlbSk7XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlIHdoaWNoIG5lZWRzIHZhbGlkYXRpb24uLi5gKTtcblxuICAgICAgICBpZiAodGhpcy5pc0l0ZW1WYWxpZChfcGFyc2VkLmNvZGUsIGhhc2gpKSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4ubWF0Y2hlcyBleHBlY3RlZCBoYXNoICR7aGFzaH0uYCk7XG5cbiAgICAgICAgICByZXNvbHZlKF9wYXJzZWQuY29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4uZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgaGFzaCAke2hhc2h9IC0gcHJ1bmluZy5gKTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfaXRlbSkge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGb3VuZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUuYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLnBhcnNlKF9pdGVtKS5jb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkblxcJ3QgZmluZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUuYCk7XG5cbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYXMoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApICE9PSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKTs7XG4gIH1cblxuICBzZXQoY29kZSwgdHlwZSwga2V5LCBzaW5ndWxhckJ5ID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNpbmd1bGFyQnkpIHtcbiAgICAgIHRoaXMuZGVkdXBlKHNpbmd1bGFyQnkpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgPyBzaW5ndWxhckJ5IDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNhY2hlZClcbiAgICApO1xuXG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBjb25zdCBpdGVtID0gJ19fZGFjdHlsb2dyYXBoc3lfX2ZlYXR1cmUtZGV0ZWN0aW9uJztcblxuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtLCBpdGVtKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGl0ZW0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvZy53YXJuKCdMb2NhbHN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIC0gbm8gY2FjaGluZyEnKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZShzaW5ndWxhckJ5KSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zdCBkYWN0eWxvZ3JhcGhzeUl0ZW0gPSBrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwO1xuXG4gICAgICBpZiAoIWRhY3R5bG9ncmFwaHN5SXRlbSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCh0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICYmICh0eXBlb2YgaXRlbS5zaW5ndWxhckJ5ID09PSAnc3RyaW5nJykpICYmXG4gICAgICAgIGl0ZW0uc2luZ3VsYXJCeSA9PT0gc2luZ3VsYXJCeVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgRGVkdXBpbmcgYnkgJHtzaW5ndWxhckJ5fSBiZWZvcmUgYWRkaW5nIGR1cGUgaW4gJHtrZXl9LmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWNoZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG5cbiAgLy8gTm90IGxldmVsIGJvdW5kIGxvZ2dpbmcgbmVlZGVkIHlldFxuICBjb25zdHJ1Y3RvcihlbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gIH1cblxuICBsb2coKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmluZm8oLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICB3YXJuKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmRlYnVnKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2cuanNcbiAqKi8iLCJjb25zdCBnZXRQYXJhbXMgPSBmdW5jdGlvbih1cmwpIHtcbiAgY29uc3QgcXVlcnkgPSB1cmw7XG4gIGNvbnN0IHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgY29uc3QgcGFyYW1zID0ge307XG4gIGxldCBtYXRjaDtcblxuICBpZiAocXVlcnkpIHtcbiAgICB3aGlsZSAobWF0Y2ggPSByZWdleC5leGVjKHF1ZXJ5KSkge1xuICAgICAgcGFyYW1zW21hdGNoWzFdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsyXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdCBwYXJhbXMgPSBnZXRQYXJhbXModXJsKTtcblxuICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShwYXJhbXNbcGFyYW1dKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twYXJhbV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaWZVbnNldFxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXJsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIGhhc2ggPSA1MzgxLFxuICAgICAgaSAgICA9IHN0ci5sZW5ndGhcblxuICB3aGlsZShpKVxuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHN0ci5jaGFyQ29kZUF0KC0taSlcblxuICAvKiBKYXZhU2NyaXB0IGRvZXMgYml0d2lzZSBvcGVyYXRpb25zIChsaWtlIFhPUiwgYWJvdmUpIG9uIDMyLWJpdCBzaWduZWRcbiAgICogaW50ZWdlcnMuIFNpbmNlIHdlIHdhbnQgdGhlIHJlc3VsdHMgdG8gYmUgYWx3YXlzIHBvc2l0aXZlLCBpZiB0aGUgaGlnaCBiaXRcbiAgICogaXMgc2V0LCB1bnNldCBpdCBhbmQgYWRkIGl0IGJhY2sgaW4gdGhyb3VnaCAoNjQtYml0IElFRUUpIGFkZGl0aW9uLiAqL1xuICByZXR1cm4gaGFzaCA+PSAwID8gaGFzaCA6IChoYXNoICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHJpbmctaGFzaC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7XG4gIENzcyxcbiAgSnNcbn0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0IHtcbiAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgLmdldCh0aGlzLnVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm1hbmlmZXN0cyA9IHt9O1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICBtYW5pZmVzdHMuZm9yRWFjaChtYW5pZmVzdCA9PiB7XG4gICAgICB0aGlzLm1hbmlmZXN0c1ttYW5pZmVzdC5wYWNrYWdlXSA9IG1hbmlmZXN0O1xuICAgIH0pO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4O1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICB9XG5cbiAgaW5qZWN0KCkge1xuICAgIGNvbnN0IGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgKGEsIGIpID0+IGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBmbGF0dGVuKGIpIDogYiksIFtdXG4gICAgKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIHRoaXMub3JkZXIubWFwKF9wYWNrYWdlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pIHtcbiAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGRuXFwndCBmaW5kIHBhY2thZ2UgJHtfcGFja2FnZX0gZnJvbSBpbmplY3Rpb24gb3JkZXIuYCk7XG5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RNYW5pZmVzdCh0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gZmxhdHRlbihtYW5pZmVzdHMpO1xuXG4gICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBjb25zdCBoYXNoZXMgPSBPYmplY3Qua2V5cyhtYW5pZmVzdC5oYXNoZXMpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGhhc2hlcy5tYXAoaGFzaCA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdO1xuICAgICAgY29uc3Qgcm9vdFVybCA9IFttYW5pZmVzdC5yb290VXJsLCBtYW5pZmVzdC5wYWNrYWdlVXJsXS5maWx0ZXIoX3VybCA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgX3VybCAhPT0gbnVsbFxuICAgICAgICApO1xuICAgICAgfSkuam9pbignLycpO1xuXG4gICAgICByZXR1cm4gdGhpcy5pbmplY3REZXBlbmRlbmN5KFxuICAgICAgICBkZXBlbmRlbmN5LFxuICAgICAgICByb290VXJsXG4gICAgICApO1xuICAgIH0pKTtcbiAgfVxuXG4gIGluamVjdERlcGVuZGVuY3koZGVwZW5kZW5jeSwgcm9vdFVybCkge1xuICAgIHN3aXRjaCAoZGVwZW5kZW5jeS5leHRlbnNpb24pIHtcbiAgICAgIGNhc2UgJy5jc3MnOlxuICAgICAgICByZXR1cm4gbmV3IENzcyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS50YWdzKFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgY2FzZSAnLmpzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBKcyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS50YWdzKFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgaWR4ID0gMCwgdHlwZSA9IG51bGwpIHtcbiAgICBjb25zdCBpbmplY3QgPSAoZWxlbSwgdHlwZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgJHt0eXBlfSB0YWdgLCBlbGVtKTtcblxuICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG5leHQgPSAoZGVwZW5kZW5jaWVzLCBpZHgpID0+IHtcbiAgICAgIHRoaXMuaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmFsbGJhY2sgPSAoZGVwZW5kZW5jaWVzLCBpZHgsIHR5cGUpID0+IHtcbiAgICAgIGlmICh0eXBlICE9PSAncmF3Jykge1xuICAgICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCBpZHgsICdyYXcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcblxuICAgICAgICB0aGlzLmxvZy5lcnJvcignRmFpbGVkIGxvYWRpbmcgZGVwZW5kZW5jeSBhcyByYXcnLCBlbGVtKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGlkeCA+PSBkZXBlbmRlbmNpZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaW5qZWN0IG9yZGVyOiBleHBsaWNpdGx5IHByb3ZpZGVkIDwgY2FjaGVkIGluIGxvY2FsIHN0b3JhZ2UgPCBwcmludGVkXG4gICAgLy8gcmF3IG9ubHkgYXMgZmFsbGJhY2sgaWYgcHJpbnRlZCBmYWlsc1xuICAgIHR5cGUgPSAoZGVwZW5kZW5jaWVzW2lkeF1bdHlwZV0gJiYgdHlwZSkgfHwgKGRlcGVuZGVuY2llc1tpZHhdWydjYWNoZWQnXSAmJiAnY2FjaGVkJykgfHwgwqAoZGVwZW5kZW5jaWVzW2lkeF1bJ3ByaW50ZWQnXSAmJiAncHJpbnRlZCcpO1xuICAgIGNvbnN0IGVsZW0gPSBkZXBlbmRlbmNpZXNbaWR4XVt0eXBlXTtcblxuICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwcmludGVkJykge1xuICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MTGlua0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBBamF4KCkuZ2V0KGVsZW0uaHJlZik7XG5cbiAgICAgICAgcmVxdWVzdFxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGluamVjdChlbGVtLCB0eXBlKTtcbiAgICAgICAgICAgIG5leHQoZGVwZW5kZW5jaWVzLCBpZHgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGZhbGxiYWNrKGRlcGVuZGVuY2llcywgaWR4LCB0eXBlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5qZWN0KGVsZW0sIHR5cGUpO1xuXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICBuZXh0KGRlcGVuZGVuY2llcywgaWR4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgaW4gY2FzZSBwcmludGVkIHRhZyBjYW5ub3QgYmUgbG9hZGVkXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgZmFsbGJhY2soZGVwZW5kZW5jaWVzLCBpZHgsIHR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2FjaGVkJyB8fCDCoHR5cGUgPT09ICdyYXcnKSB7XG4gICAgICBpbmplY3QoZWxlbSwgdHlwZSk7XG4gICAgICBuZXh0KGRlcGVuZGVuY2llcywgaWR4KTtcblxuICAgIH1cblxuICB9O1xuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBjb25zdCBiYXNlbmFtZSA9IHRoaXMuYmFzZW5hbWUoZGVwZW5kZW5jeS5maWxlKTtcbiAgICAvLyBGaWx0ZXIgb3V0IHBvdGVudGlhbCBudWxsIHZhbHVlc1xuICAgIC8vIHBhc3NlZCBpbiBhcyB2YXJpb3VzIHBhcnRzIG9mIGFuIHVybC5cbiAgICBjb25zdCB1cmwgPSBbdGhpcy5wcmVmaXgsIHJvb3RVcmwsIGRlcGVuZGVuY3kucGF0aF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICk7XG4gICAgfSkuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXBlbmRlbmN5LmlkLFxuICAgICAgcHJpbnRlZDogYC8ke3VybH0vJHtiYXNlbmFtZX0tJHtkZXBlbmRlbmN5Lmhhc2h9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgcmF3OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHNpbmd1bGFyQnk6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5qZWN0b3IuanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLmNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBjYWNoZUluTG9jYWxTdG9yYWdlO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB0ZXh0IGZvciAke3VybH0uYCk7XG5cbiAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgJHt0ZXh0fVxuICAgICAgLy8jIHNvdXJjZVVSTD0ke3VybH1cbiAgICBgO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY3JpcHQpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICBjb25zdCB1cmxLZXlzID0gT2JqZWN0LmtleXModXJscykuZmlsdGVyKChrZXkpID0+IChbJ3ByaW50ZWQnLCAncmF3J10uaW5kZXhPZihrZXkpID4gLTEpKTtcbiAgICBjb25zdCBzY3JpcHRUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBjb25zdCB1cmwgPSB1cmxzW3VybEtleV07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB1cmxLZXkgPT09ICdwcmludGVkJyk7XG5cbiAgICAgIC8vIEJpbmQgYGxvYWRgIGxpc3RlbmVyIG9uIHNjcmlwdCBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHVybEtleSA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIHNjcmlwdFRhZ3NbdXJsS2V5XSA9IHNjcmlwdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NyaXB0VGFncyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIEphdmFTY3JpcHQgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICB0YWdzKHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVwYXJlV2l0aFRleHQoXG4gICAgICAgIHRleHQsIHVybHMucHJpbnRlZFxuICAgICAgKS50aGVuKChjYWNoZWQpID0+ICh7XG4gICAgICAgIGNhY2hlZFxuICAgICAgfSkpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVXJsKHVybHMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3Mge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSA9IGNhY2hlSW5Mb2NhbFN0b3JhZ2U7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBDU1MgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnY3NzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIENTUyBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgQ1NTIGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscykge1xuICAgIGNvbnN0IHVybEtleXMgPSBPYmplY3Qua2V5cyh1cmxzKS5maWx0ZXIoKGtleSkgPT4gKFsncHJpbnRlZCcsICdyYXcnXS5pbmRleE9mKGtleSkgPiAtMSkpO1xuICAgIGNvbnN0IGxpbmtUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGNvbnN0IHVybCA9IHVybHNbdXJsS2V5XTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHVybEtleSA9PT0gJ3ByaW50ZWQnKTtcblxuICAgICAgLy8gQmluZCBgbG9hZGAgbGlzdGVuZXIgb24gbGluayBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh1cmxLZXkgPT09ICdwcmludGVkJykge1xuICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIGxpbmtUYWdzW3VybEtleV0gPSBsaW5rO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rVGFncyk7XG4gIH1cblxuICBwcmVwYXJlV2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHRleHQgZm9yIHVybDogJHt1cmx9LmApO1xuXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rKTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIHRhZ3ModXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmlkKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVGV4dChcbiAgICAgICAgdGV4dCwgdXJscy5wcmludGVkXG4gICAgICApLnRoZW4oKGNhY2hlZCkgPT4gKHtcbiAgICAgICAgY2FjaGVkXG4gICAgICB9KSk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgaGVhZCh1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBvcHRpb25zLCAnSEVBRCcpO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMgPSB7fSwgbWV0aG9kID0gJ0dFVCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ09SUyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICB4aHIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIGhhbmRsZXJzLlxuICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICB4aHI6IHhocixcbiAgICAgICAgICAgIHRleHQ6IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICB1cmw6IHhoci5yZXNwb25zZVVSTFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICB9O1xuXG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hamF4LmpzXG4gKiovIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICA0LjAuNVxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbC5FUzZQcm9taXNlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG52YXIgX2lzQXJyYXkgPSB1bmRlZmluZWQ7XG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59XG5cbnZhciBpc0FycmF5ID0gX2lzQXJyYXk7XG5cbnZhciBsZW4gPSAwO1xudmFyIHZlcnR4TmV4dCA9IHVuZGVmaW5lZDtcbnZhciBjdXN0b21TY2hlZHVsZXJGbiA9IHVuZGVmaW5lZDtcblxudmFyIGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgbGVuICs9IDI7XG4gIGlmIChsZW4gPT09IDIpIHtcbiAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgaWYgKGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICBjdXN0b21TY2hlZHVsZXJGbihmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gIGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbn1cblxuZnVuY3Rpb24gc2V0QXNhcChhc2FwRm4pIHtcbiAgYXNhcCA9IGFzYXBGbjtcbn1cblxudmFyIGJyb3dzZXJXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbnZhciBicm93c2VyR2xvYmFsID0gYnJvd3NlcldpbmRvdyB8fCB7fTtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAoe30pLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgaWYgKHR5cGVvZiB2ZXJ0eE5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZlcnR4TmV4dChmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBlczYtcHJvbWlzZSB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBnbG9iYWxTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU2V0VGltZW91dChmbHVzaCwgMSk7XG4gIH07XG59XG5cbnZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcblxuICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0VmVydHgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHIgPSByZXF1aXJlO1xuICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICByZXR1cm4gdXNlVmVydHhUaW1lcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG52YXIgc2NoZWR1bGVGbHVzaCA9IHVuZGVmaW5lZDtcbi8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG5pZiAoaXNOb2RlKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xufSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xufSBlbHNlIGlmIChpc1dvcmtlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbn0gZWxzZSBpZiAoYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSBhdHRlbXB0VmVydHgoKTtcbn0gZWxzZSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKGNoaWxkW1BST01JU0VfSURdID09PSB1bmRlZmluZWQpIHtcbiAgICBtYWtlUHJvbWlzZShjaGlsZCk7XG4gIH1cblxuICB2YXIgX3N0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICBpZiAoX3N0YXRlKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IF9hcmd1bWVudHNbX3N0YXRlIC0gMV07XG4gICAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gIH1cblxuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZXNvbHZlYCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlXG4gIHBhc3NlZCBgdmFsdWVgLiBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVzb2x2ZSgxKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoMSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZXNvbHZlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHZhbHVlIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgZnVsZmlsbGVkIHdpdGggdGhlIGdpdmVuXG4gIGB2YWx1ZWBcbiovXG5mdW5jdGlvbiByZXNvbHZlKG9iamVjdCkge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgX3Jlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbnZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDE2KTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBQRU5ESU5HID0gdm9pZCAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xuXG52YXIgR0VUX1RIRU5fRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gc2VsZkZ1bGZpbGxtZW50KCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG59XG5cbmZ1bmN0aW9uIGNhbm5vdFJldHVybk93bigpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbihwcm9taXNlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgIHJldHVybiBHRVRfVEhFTl9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgdHJ5IHtcbiAgICB0aGVuLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgYXNhcChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3IgPSB0cnlUaGVuKHRoZW4sIHRoZW5hYmxlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGVuYWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgX3JlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfVxuICB9LCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gRlVMRklMTEVEKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQpIHtcbiAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiYgdGhlbiQkID09PSB0aGVuICYmIG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSkge1xuICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGVuJCQgPT09IEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIEdFVF9USEVOX0VSUk9SLmVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHRoZW4kJCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGVuJCQpKSB7XG4gICAgICBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgX3JlamVjdChwcm9taXNlLCBzZWxmRnVsZmlsbG1lbnQoKSk7XG4gIH0gZWxzZSBpZiAob2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBnZXRUaGVuKHZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICB9XG5cbiAgcHVibGlzaChwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fc3RhdGUgPSBGVUxGSUxMRUQ7XG5cbiAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgIGFzYXAocHVibGlzaCwgcHJvbWlzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3JlamVjdChwcm9taXNlLCByZWFzb24pIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHByb21pc2UuX3N0YXRlID0gUkVKRUNURUQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICBhc2FwKHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9zdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gIHZhciBsZW5ndGggPSBfc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gIHBhcmVudC5fb25lcnJvciA9IG51bGw7XG5cbiAgX3N1YnNjcmliZXJzW2xlbmd0aF0gPSBjaGlsZDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgUkVKRUNURURdID0gb25SZWplY3Rpb247XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwYXJlbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xuICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgdmFyIHNldHRsZWQgPSBwcm9taXNlLl9zdGF0ZTtcblxuICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQsXG4gICAgICBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9XG4gIH1cblxuICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBFcnJvck9iamVjdCgpIHtcbiAgdGhpcy5lcnJvciA9IG51bGw7XG59XG5cbnZhciBUUllfQ0FUQ0hfRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICB0cnkge1xuICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICByZXR1cm4gVFJZX0NBVENIX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdmFyIGhhc0NhbGxiYWNrID0gaXNGdW5jdGlvbihjYWxsYmFjayksXG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yID0gdW5kZWZpbmVkLFxuICAgICAgc3VjY2VlZGVkID0gdW5kZWZpbmVkLFxuICAgICAgZmFpbGVkID0gdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHZhbHVlID0gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XG5cbiAgICBpZiAodmFsdWUgPT09IFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XG4gICAgICB2YWx1ZSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIC8vIG5vb3BcbiAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgIF9yZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgX3JlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBGVUxGSUxMRUQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gUkVKRUNURUQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgdHJ5IHtcbiAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xuICAgICAgX3Jlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKSB7XG4gICAgICBfcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBfcmVqZWN0KHByb21pc2UsIGUpO1xuICB9XG59XG5cbnZhciBpZCA9IDA7XG5mdW5jdGlvbiBuZXh0SWQoKSB7XG4gIHJldHVybiBpZCsrO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gIHByb21pc2VbUFJPTUlTRV9JRF0gPSBpZCsrO1xuICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xufVxuXG5mdW5jdGlvbiBFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcblxuICBpZiAoIXRoaXMucHJvbWlzZVtQUk9NSVNFX0lEXSkge1xuICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gIH1cblxuICBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMubGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICB0aGlzLl9lbnVtZXJhdGUoKTtcbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIF9yZWplY3QodGhpcy5wcm9taXNlLCB2YWxpZGF0aW9uRXJyb3IoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGlvbkVycm9yKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgdmFyIF9pbnB1dCA9IHRoaXMuX2lucHV0O1xuXG4gIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLl9lYWNoRW50cnkoX2lucHV0W2ldLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gIHZhciByZXNvbHZlJCQgPSBjLnJlc29sdmU7XG5cbiAgaWYgKHJlc29sdmUkJCA9PT0gcmVzb2x2ZSkge1xuICAgIHZhciBfdGhlbiA9IGdldFRoZW4oZW50cnkpO1xuXG4gICAgaWYgKF90aGVuID09PSB0aGVuICYmIGVudHJ5Ll9zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgfSBlbHNlIGlmIChjID09PSBQcm9taXNlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBjKG5vb3ApO1xuICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24gKHJlc29sdmUkJCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSQkKGVudHJ5KTtcbiAgICAgIH0pLCBpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fd2lsbFNldHRsZUF0KHJlc29sdmUkJChlbnRyeSksIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24gKHN0YXRlLCBpLCB2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgIGlmIChzdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgIF9yZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gKHByb21pc2UsIGkpIHtcbiAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gIHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KFJFSkVDVEVELCBpLCByZWFzb24pO1xuICB9KTtcbn07XG5cbi8qKlxuICBgUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSByZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gVGhlIGFycmF5IGhlcmUgd291bGQgYmUgWyAxLCAyLCAzIF07XG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxuICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZWplY3QobmV3IEVycm9yKFwiMlwiKSk7XG4gIGxldCBwcm9taXNlMyA9IHJlamVjdChuZXcgRXJyb3IoXCIzXCIpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbChlbnRyaWVzKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xufVxuXG4vKipcbiAgYFByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDInKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBQcm9taXNlLnJhY2VgIGlzIGRldGVybWluaXN0aWMgaW4gdGhhdCBvbmx5IHRoZSBzdGF0ZSBvZiB0aGUgZmlyc3RcbiAgc2V0dGxlZCBwcm9taXNlIG1hdHRlcnMuIEZvciBleGFtcGxlLCBldmVuIGlmIG90aGVyIHByb21pc2VzIGdpdmVuIHRvIHRoZVxuICBgcHJvbWlzZXNgIGFycmF5IGFyZ3VtZW50IGFyZSByZXNvbHZlZCwgYnV0IHRoZSBmaXJzdCBzZXR0bGVkIHByb21pc2UgaGFzXG4gIGJlY29tZSByZWplY3RlZCBiZWZvcmUgdGhlIG90aGVyIHByb21pc2VzIGJlY2FtZSBmdWxmaWxsZWQsIHRoZSByZXR1cm5lZFxuICBwcm9taXNlIHdpbGwgYmVjb21lIHJlamVjdGVkOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVuc1xuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIHByb21pc2UgMiBiZWNhbWUgcmVqZWN0ZWQgYmVmb3JlXG4gICAgLy8gcHJvbWlzZSAxIGJlY2FtZSBmdWxmaWxsZWRcbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGV4YW1wbGUgcmVhbC13b3JsZCB1c2UgY2FzZSBpcyBpbXBsZW1lbnRpbmcgdGltZW91dHM6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxuICBgYGBcblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZShlbnRyaWVzKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cbiAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgX3JlamVjdChwcm9taXNlLCByZWFzb24pO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gbmVlZHNSZXNvbHZlcigpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xufVxuXG5mdW5jdGlvbiBuZWVkc05ldygpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbn1cblxuLyoqXG4gIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXG4gIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gIFRlcm1pbm9sb2d5XG4gIC0tLS0tLS0tLS0tXG5cbiAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAtIGB2YWx1ZWAgaXMgYW55IGxlZ2FsIEphdmFTY3JpcHQgdmFsdWUgKGluY2x1ZGluZyB1bmRlZmluZWQsIGEgdGhlbmFibGUsIG9yIGEgcHJvbWlzZSkuXG4gIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gIC0gYHNldHRsZWRgIHRoZSBmaW5hbCByZXN0aW5nIHN0YXRlIG9mIGEgcHJvbWlzZSwgZnVsZmlsbGVkIG9yIHJlamVjdGVkLlxuXG4gIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICBzdGF0ZS4gIFByb21pc2VzIHRoYXQgYXJlIHJlamVjdGVkIGhhdmUgYSByZWplY3Rpb24gcmVhc29uIGFuZCBhcmUgaW4gdGhlXG4gIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICBwcm9taXNlLCB0aGVuIHRoZSBvcmlnaW5hbCBwcm9taXNlJ3Mgc2V0dGxlZCBzdGF0ZSB3aWxsIG1hdGNoIHRoZSB2YWx1ZSdzXG4gIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gIGl0c2VsZiBmdWxmaWxsLlxuXG5cbiAgQmFzaWMgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLVxuXG4gIGBgYGpzXG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgLy8gb24gc3VjY2Vzc1xuICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgLy8gb24gZmFpbHVyZVxuICAgIHJlamVjdChyZWFzb24pO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIEFkdmFuY2VkIFVzYWdlOlxuICAtLS0tLS0tLS0tLS0tLS1cblxuICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXG4gIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gIGBgYGpzXG4gIGZ1bmN0aW9uIGdldEpTT04odXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICBgYGBqc1xuICBQcm9taXNlLmFsbChbXG4gICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xuICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9KTtcbiAgYGBgXG5cbiAgQGNsYXNzIFByb21pc2VcbiAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAY29uc3RydWN0b3JcbiovXG5mdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gIHRoaXNbUFJPTUlTRV9JRF0gPSBuZXh0SWQoKTtcbiAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgaWYgKG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcbiAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSA/IGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IG5lZWRzTmV3KCk7XG4gIH1cbn1cblxuUHJvbWlzZS5hbGwgPSBhbGw7XG5Qcm9taXNlLnJhY2UgPSByYWNlO1xuUHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcblByb21pc2UucmVqZWN0ID0gcmVqZWN0O1xuUHJvbWlzZS5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xuUHJvbWlzZS5fc2V0QXNhcCA9IHNldEFzYXA7XG5Qcm9taXNlLl9hc2FwID0gYXNhcDtcblxuUHJvbWlzZS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBQcm9taXNlLFxuXG4gIC8qKlxuICAgIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIENoYWluaW5nXG4gICAgLS0tLS0tLS1cbiAgXG4gICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gICAgfSk7XG4gIFxuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknLlxuICAgIH0pO1xuICAgIGBgYFxuICAgIElmIHRoZSBkb3duc3RyZWFtIHByb21pc2UgZG9lcyBub3Qgc3BlY2lmeSBhIHJlamVjdGlvbiBoYW5kbGVyLCByZWplY3Rpb24gcmVhc29ucyB3aWxsIGJlIHByb3BhZ2F0ZWQgZnVydGhlciBkb3duc3RyZWFtLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBc3NpbWlsYXRpb25cbiAgICAtLS0tLS0tLS0tLS1cbiAgXG4gICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICByZXRyaWV2ZWQgYXN5bmNocm9ub3VzbHkuIFRoaXMgY2FuIGJlIGFjaGlldmVkIGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gdGhlXG4gICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCBmdWxmaWxscywgd2UnbGwgaGF2ZSB0aGUgdmFsdWUgaGVyZVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgU2ltcGxlIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgcmVzdWx0O1xuICBcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgYXV0aG9yLCBib29rcztcbiAgXG4gICAgdHJ5IHtcbiAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgIGJvb2tzICA9IGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcik7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICBcbiAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcbiAgXG4gICAgfVxuICBcbiAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRBdXRob3IoKS5cbiAgICAgIHRoZW4oZmluZEJvb2tzQnlBdXRob3IpLlxuICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgdGhlblxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICB0aGVuOiB0aGVuLFxuXG4gIC8qKlxuICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuICBcbiAgICBgYGBqc1xuICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgIH1cbiAgXG4gICAgLy8gc3luY2hyb25vdXNcbiAgICB0cnkge1xuICAgICAgZmluZEF1dGhvcigpO1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH1cbiAgXG4gICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCBjYXRjaFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gICdjYXRjaCc6IGZ1bmN0aW9uIF9jYXRjaChvblJlamVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgICB2YXIgbG9jYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICBpZiAoUCkge1xuICAgICAgICB2YXIgcHJvbWlzZVRvU3RyaW5nID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb21pc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlVG9TdHJpbmcgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NhbC5Qcm9taXNlID0gUHJvbWlzZTtcbn1cblxuLy8gU3RyYW5nZSBjb21wYXQuLlxuUHJvbWlzZS5wb2x5ZmlsbCA9IHBvbHlmaWxsO1xuUHJvbWlzZS5Qcm9taXNlID0gUHJvbWlzZTtcblxucmV0dXJuIFByb21pc2U7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lczYtcHJvbWlzZS5tYXBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiB2ZXJ0eCAoaWdub3JlZClcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==