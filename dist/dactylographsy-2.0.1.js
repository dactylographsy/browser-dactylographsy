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
	
	      var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	      var type = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
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
	      var rootUrl = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
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
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
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
	
	      var whichUrl = arguments.length <= 1 || arguments[1] === undefined ? 'printed' : arguments[1];
	
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
	
	      var singularBy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
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
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
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
	
	      var singularBy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	      var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
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
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return this.request(url, options);
	    }
	  }, {
	    key: 'head',
	    value: function head(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return this.request(url, options, 'HEAD');
	    }
	  }, {
	    key: 'request',
	    value: function request(url) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var method = arguments.length <= 2 || arguments[2] === undefined ? 'GET' : arguments[2];
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2FjN2Y2Nzg3MmJhMjBmMmZmODUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vc3RyaW5nLWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy92ZXJ0eCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanMiXSwibmFtZXMiOlsicG9seWZpbGwiLCJ3aW5kb3ciLCJkYWN0eWxvZ3JhcGhzeSIsImF1dG9ydW4iLCJEYWN0eWxvZ3JhcGhzeSIsIm9wdGlvbnMiLCJlbmFibGVMb2dnaW5nIiwibG9nIiwiaG9va0ludG9Eb20iLCJyZWFkQ29uZmlndXJhdGlvbiIsImNhY2hlIiwiYXBwUHJlZml4IiwiY29uZmlnIiwicnVuIiwiZG9jdW1lbnQiLCJleGVjdXRpbmdTY3JpcHQiLCJnZXRFbGVtZW50QnlJZCIsImluamVjdEludG8iLCJib2R5IiwiaGVhZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibWFuaWZlc3RVcmxzIiwicmVhZEF0dHJPblNjcmlwdCIsImluamVjdCIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJ1cmwiLCJnZXQiLCJ0aGVuIiwiaW5mbyIsIm1hbmlmZXN0cyIsImxlbmd0aCIsImNhY2hlSW5Mb2NhbFN0b3JhZ2UiLCJzZXQiLCJ1bmRlZmluZWQiLCJhdHRyIiwiX2F0dHIiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJ0dGwiLCJmbHVzaCIsImNsdCIsImNhY2hlT25seSIsInJlZnJlc2giLCJjYWNoZWRNYW5pZmVzdHMiLCJ2ZXJpZmljYXRpb24iLCJyZXN0b3JlIiwicmVmcmVzaERlbGF5IiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJpbmplY3RlZEZyb21DYWNoZSIsImNhdGNoIiwiQ2FjaGUiLCJkZWZhdWx0UHJlZml4IiwiY2FjaGVQcmVmaXgiLCJpc1N1cHBvcnRlZCIsInN1cHBvcnRlZCIsImNvZGUiLCJoYXNoIiwiaXRlbSIsImtleSIsImRlZmF1bHRWYWx1ZSIsIl9pdGVtIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIl9wYXJzZWQiLCJpc0l0ZW1WYWxpZCIsInJlbW92ZSIsInJlbW92ZUl0ZW0iLCJ0eXBlIiwic2luZ3VsYXJCeSIsImRlZHVwZSIsImNhY2hlZCIsIm5vdyIsIkRhdGUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiaW5kZXhPZiIsImUiLCJ3YXJuIiwiZGFjdHlsb2dyYXBoc3lJdGVtIiwiTG9nIiwiZW5hYmxlZCIsImNvbnNvbGUiLCJhcmd1bWVudHMiLCJkZWJ1ZyIsImVycm9yIiwiZ2V0VXJsUGFyYW0iLCJnZXRQYXJhbXMiLCJxdWVyeSIsInJlZ2V4IiwicGFyYW1zIiwibWF0Y2giLCJleGVjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyYW0iLCJpZlVuc2V0IiwibG9jYXRpb24iLCJzZWFyY2giLCJoYXNPd25Qcm9wZXJ0eSIsImVuY29kZVVSSUNvbXBvbmVudCIsIk1hbmlmZXN0IiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2UiLCJ0ZXh0IiwicmVzcG9uc2VVcmwiLCJ4aHIiLCJyZXNwb25zZVVSTCIsIkluamVjdG9yIiwiZm9yRWFjaCIsIm1hbmlmZXN0IiwicGFja2FnZSIsInByZWZpeCIsIm9yZGVyIiwiZmxhdHRlbiIsImxpc3QiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsIkFycmF5IiwiaXNBcnJheSIsIl9wYWNrYWdlIiwiaW5qZWN0TWFuaWZlc3QiLCJkZXBlbmRlbmNpZXMiLCJpbmplY3RJbnRvRE9NIiwiaGFzaGVzIiwiT2JqZWN0Iiwia2V5cyIsImRlcGVuZGVuY3kiLCJyb290VXJsIiwicGFja2FnZVVybCIsImZpbHRlciIsIl91cmwiLCJqb2luIiwiaW5qZWN0RGVwZW5kZW5jeSIsImV4dGVuc2lvbiIsInRhZ3MiLCJ1cmxzIiwiaWR4IiwiZWxlbSIsImFwcGVuZENoaWxkIiwibmV4dCIsImZhbGxiYWNrIiwiSFRNTExpbmtFbGVtZW50IiwicmVxdWVzdCIsImhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwicGF0aCIsInJlcGxhY2UiLCJiYXNlbmFtZSIsImZpbGUiLCJpZCIsInByaW50ZWQiLCJyYXciLCJKcyIsImNhY2hlRGVsYXkiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwiZGVmZXIiLCJhc3luYyIsInNldEF0dHJpYnV0ZSIsIndoaWNoVXJsIiwidXJsS2V5cyIsInNjcmlwdFRhZ3MiLCJ1cmxLZXkiLCJlbnN1cmVDYWNoZSIsInNyYyIsImRlbGF5IiwiaGFzIiwicHJlcGFyZVdpdGhUZXh0IiwicHJlcGFyZVdpdGhVcmwiLCJDc3MiLCJsaW5rVGFncyIsImxpbmsiLCJyZWwiLCJ0ZXh0Q29udGVudCIsIkFqYXgiLCJtZXRob2QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJYRG9tYWluUmVxdWVzdCIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsIm9uZXJyb3IiLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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QUFzQ0Q7Ozs7OzttQkFwRGtCVCxJOzs7Ozs7K0NDQXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyR0FBMEc7O0FBRTFHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHNCQUFzQjs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUIsK0JBQStCO0FBQ3BEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVCx3QkFBdUIsUUFBUTtBQUMvQjs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7O0FBRTFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBa0UsUUFBUTtBQUMxRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXFDLFFBQVE7O0FBRTdDOztBQUVBLHNCQUFxQix3QkFBd0I7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBLDBCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsZUFBYyxTQUFTO0FBQ3ZCLGVBQWMsU0FBUztBQUN2QjtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFxQixrRUFBa0U7QUFDdkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCx1REFBc0QsZ0JBQWdCLEVBQUU7QUFDeEU7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXlCLHdDQUF3QyxFQUFFO0FBQ25FLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7Ozs7Ozs7O0FDNzdCRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDbkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBLGdCOzs7Ozs7QUNBQSw4QkFBNkIsbURBQW1EIiwiZmlsZSI6ImRhY3R5bG9ncmFwaHN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzYWM3ZjY3ODcyYmEyMGYyZmY4NVxuICoqLyIsImltcG9ydCBEYWN0eWxvZ3JhcGhzeSBmcm9tICcuL2RhY3R5bG9ncmFwaHN5JztcbmltcG9ydCBlczZQcm9taXNlIGZyb20gJ2VzNi1wcm9taXNlJztcblxuZXM2UHJvbWlzZS5wb2x5ZmlsbCgpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmRhY3R5bG9ncmFwaHN5ID0gbmV3IERhY3R5bG9ncmFwaHN5KHtcbiAgICBhdXRvcnVuOiB0cnVlXG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5qZWN0b3IsIHtcbiAgTWFuaWZlc3Rcbn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhY3R5bG9ncmFwaHN5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYXV0b3J1biA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcbiAgICB0aGlzLmhvb2tJbnRvRG9tKCk7XG4gICAgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IHRoaXMuY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgaWYgKGF1dG9ydW4pIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgaG9va0ludG9Eb20oKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV4ZWN1dGluZ1NjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWN0eWxvZ3JhcGhzeScpO1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIH1cblxuICByZWFkQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLm1hbmlmZXN0VXJscyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnbWFuaWZlc3RzJyk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ2NvbmZpZycpO1xuICB9XG5cbiAgcmVmcmVzaChpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubWFuaWZlc3RVcmxzLm1hcCh1cmwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdCh1cmwsIHRoaXMuY29uZmlnKS5nZXQoKTtcbiAgICB9KSkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBhbGwgbWFuaWZlc3RzLCAke21hbmlmZXN0cy5sZW5ndGh9IGluIHRvdGFsLmApO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmNhY2hlLnNldChtYW5pZmVzdHMsICdtYW5pZmVzdHMnLCAnbWFuaWZlc3RzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKS5pbmplY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmUoaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCgnbWFuaWZlc3RzJylcbiAgICAgIC50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ1Jlc3RvcmluZyB3aXRoIG1hbmlmZXN0cyBpbiBjYWNoZSBsYXRlciByZWZyZXNoaW5nIHZpYSBuZXR3b3JrIChkZWxheWVkKS4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICAgKS5pbmplY3QoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVhZEF0dHJPblNjcmlwdChhdHRyKSB7XG4gICAgaWYgKCF0aGlzLmV4ZWN1dGluZ1NjcmlwdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0IHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlKSB7XG4gICAgICAvLyBSZW1vdmUgYWxsIGNhY2hlLWtleXMgd2UgbWlnaHQgaGF2ZSBzZXQgaW4gdGhlIHBhc3QgYW5kIHRoZW4gc3dpdGNoZWQgY29uZmlnXG4gICAgICB0aGlzLmxvZy5pbmZvKCdGbHVzaGluZyBsb2NhbC1zdG9yYWdlIGR1ZSB0byBjb25maWctb3B0aW9uIFwiY2FjaGVJbkxvY2FsU3RvcmFnZT1mYWxzZVwiJylcbiAgICAgIHRoaXMuY2FjaGUuZmx1c2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSAmJiB0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goZmFsc2UpO1xuICAgIH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9mIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy52ZXJpZmljYXRpb24gPT09IHRydWUgfHxcbiAgICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlID09PSBmYWxzZVxuICAgICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmVmcmVzaERlbGF5ID0gNTAwMFxuICAgICAgICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaChpbmplY3RlZEZyb21DYWNoZSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgcmVmcmVzaERlbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcbmltcG9ydCBzdHJpbmdIYXNoIGZyb20gJ3N0cmluZy1oYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0UHJlZml4ID0gJ19fZGFjdHlsb2dyYXBoc3knO1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2FjaGVQcmVmaXggPSB0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXggfHwgZGVmYXVsdFByZWZpeDtcbiAgICB0aGlzLmlzU3VwcG9ydGVkID0gdGhpcy5zdXBwb3J0ZWQoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBwUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ID0gYCR7dGhpcy5jYWNoZVByZWZpeH0tLSR7dGhpcy5vcHRpb25zLmFwcFByZWZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCArPSAnX18nO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVByZWZpeDtcbiAgfVxuXG4gIGlzSXRlbVZhbGlkKGNvZGUsIGhhc2gpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHN0cmluZ0hhc2goY29kZSkgPT09IGhhc2hcbiAgICApO1xuICB9XG5cbiAgcGFyc2UoaXRlbSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICB9XG5cbiAgZ2V0KGtleSwgZGVmYXVsdFZhbHVlLCBoYXNoID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBfaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApO1xuXG4gICAgICBpZiAoX2l0ZW0gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoZGVmYXVsdFZhbHVlLCAncGxhaW4nLCBrZXkpO1xuXG4gICAgICAgIHJlc29sdmUoZGVmYXVsdFZhbHVlKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBoYXNoICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfcGFyc2VkID0gdGhpcy5wYXJzZShfaXRlbSk7XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlIHdoaWNoIG5lZWRzIHZhbGlkYXRpb24uLi5gKTtcblxuICAgICAgICBpZiAodGhpcy5pc0l0ZW1WYWxpZChfcGFyc2VkLmNvZGUsIGhhc2gpKSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4ubWF0Y2hlcyBleHBlY3RlZCBoYXNoICR7aGFzaH0uYCk7XG5cbiAgICAgICAgICByZXNvbHZlKF9wYXJzZWQuY29kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4uZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgaGFzaCAke2hhc2h9IC0gcHJ1bmluZy5gKTtcblxuICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG5cbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfaXRlbSkge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGb3VuZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUuYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLnBhcnNlKF9pdGVtKS5jb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkblxcJ3QgZmluZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUuYCk7XG5cbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYXMoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApICE9PSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKTs7XG4gIH1cblxuICBzZXQoY29kZSwgdHlwZSwga2V5LCBzaW5ndWxhckJ5ID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHNpbmd1bGFyQnkpIHtcbiAgICAgIHRoaXMuZGVkdXBlKHNpbmd1bGFyQnkpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgPyBzaW5ndWxhckJ5IDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNhY2hlZClcbiAgICApO1xuXG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBjb25zdCBpdGVtID0gJ19fZGFjdHlsb2dyYXBoc3lfX2ZlYXR1cmUtZGV0ZWN0aW9uJztcblxuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtLCBpdGVtKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGl0ZW0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmxvZy53YXJuKCdMb2NhbHN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIC0gbm8gY2FjaGluZyEnKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZShzaW5ndWxhckJ5KSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zdCBkYWN0eWxvZ3JhcGhzeUl0ZW0gPSBrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwO1xuXG4gICAgICBpZiAoIWRhY3R5bG9ncmFwaHN5SXRlbSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCh0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICYmICh0eXBlb2YgaXRlbS5zaW5ndWxhckJ5ID09PSAnc3RyaW5nJykpICYmXG4gICAgICAgIGl0ZW0uc2luZ3VsYXJCeSA9PT0gc2luZ3VsYXJCeVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgRGVkdXBpbmcgYnkgJHtzaW5ndWxhckJ5fSBiZWZvcmUgYWRkaW5nIGR1cGUgaW4gJHtrZXl9LmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWNoZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG5cbiAgLy8gTm90IGxldmVsIGJvdW5kIGxvZ2dpbmcgbmVlZGVkIHlldFxuICBjb25zdHJ1Y3RvcihlbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gIH1cblxuICBsb2coKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGluZm8oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmluZm8oLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICB3YXJuKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmRlYnVnKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2cuanNcbiAqKi8iLCJjb25zdCBnZXRQYXJhbXMgPSBmdW5jdGlvbih1cmwpIHtcbiAgY29uc3QgcXVlcnkgPSB1cmw7XG4gIGNvbnN0IHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgY29uc3QgcGFyYW1zID0ge307XG4gIGxldCBtYXRjaDtcblxuICBpZiAocXVlcnkpIHtcbiAgICB3aGlsZSAobWF0Y2ggPSByZWdleC5leGVjKHF1ZXJ5KSkge1xuICAgICAgcGFyYW1zW21hdGNoWzFdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsyXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdCBwYXJhbXMgPSBnZXRQYXJhbXModXJsKTtcblxuICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShwYXJhbXNbcGFyYW1dKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twYXJhbV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaWZVbnNldFxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXJsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpIHtcbiAgdmFyIGhhc2ggPSA1MzgxLFxuICAgICAgaSAgICA9IHN0ci5sZW5ndGhcblxuICB3aGlsZShpKVxuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHN0ci5jaGFyQ29kZUF0KC0taSlcblxuICAvKiBKYXZhU2NyaXB0IGRvZXMgYml0d2lzZSBvcGVyYXRpb25zIChsaWtlIFhPUiwgYWJvdmUpIG9uIDMyLWJpdCBzaWduZWRcbiAgICogaW50ZWdlcnMuIFNpbmNlIHdlIHdhbnQgdGhlIHJlc3VsdHMgdG8gYmUgYWx3YXlzIHBvc2l0aXZlLCBpZiB0aGUgaGlnaCBiaXRcbiAgICogaXMgc2V0LCB1bnNldCBpdCBhbmQgYWRkIGl0IGJhY2sgaW4gdGhyb3VnaCAoNjQtYml0IElFRUUpIGFkZGl0aW9uLiAqL1xuICByZXR1cm4gaGFzaCA+PSAwID8gaGFzaCA6IChoYXNoICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHJpbmctaGFzaC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7XG4gIENzcyxcbiAgSnNcbn0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0IHtcbiAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgLmdldCh0aGlzLnVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm1hbmlmZXN0cyA9IHt9O1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICBtYW5pZmVzdHMuZm9yRWFjaChtYW5pZmVzdCA9PiB7XG4gICAgICB0aGlzLm1hbmlmZXN0c1ttYW5pZmVzdC5wYWNrYWdlXSA9IG1hbmlmZXN0O1xuICAgIH0pO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4O1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICB9XG5cbiAgaW5qZWN0KCkge1xuICAgIGNvbnN0IGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgKGEsIGIpID0+IGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBmbGF0dGVuKGIpIDogYiksIFtdXG4gICAgKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIHRoaXMub3JkZXIubWFwKF9wYWNrYWdlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pIHtcbiAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGRuXFwndCBmaW5kIHBhY2thZ2UgJHtfcGFja2FnZX0gZnJvbSBpbmplY3Rpb24gb3JkZXIuYCk7XG5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RNYW5pZmVzdCh0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gZmxhdHRlbihtYW5pZmVzdHMpO1xuXG4gICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBjb25zdCBoYXNoZXMgPSBPYmplY3Qua2V5cyhtYW5pZmVzdC5oYXNoZXMpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGhhc2hlcy5tYXAoaGFzaCA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdO1xuICAgICAgY29uc3Qgcm9vdFVybCA9IFttYW5pZmVzdC5yb290VXJsLCBtYW5pZmVzdC5wYWNrYWdlVXJsXS5maWx0ZXIoX3VybCA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgX3VybCAhPT0gbnVsbFxuICAgICAgICApO1xuICAgICAgfSkuam9pbignLycpO1xuXG4gICAgICByZXR1cm4gdGhpcy5pbmplY3REZXBlbmRlbmN5KFxuICAgICAgICBkZXBlbmRlbmN5LFxuICAgICAgICByb290VXJsXG4gICAgICApO1xuICAgIH0pKTtcbiAgfVxuXG4gIGluamVjdERlcGVuZGVuY3koZGVwZW5kZW5jeSwgcm9vdFVybCkge1xuICAgIHN3aXRjaCAoZGVwZW5kZW5jeS5leHRlbnNpb24pIHtcbiAgICAgIGNhc2UgJy5jc3MnOlxuICAgICAgICByZXR1cm4gbmV3IENzcyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS50YWdzKFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgY2FzZSAnLmpzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBKcyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS50YWdzKFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgaWR4ID0gMCwgdHlwZSA9IG51bGwpIHtcbiAgICBjb25zdCBpbmplY3QgPSAoZWxlbSwgdHlwZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgJHt0eXBlfSB0YWdgLCBlbGVtKTtcblxuICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG5leHQgPSAoZGVwZW5kZW5jaWVzLCBpZHgpID0+IHtcbiAgICAgIHRoaXMuaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmFsbGJhY2sgPSAoZGVwZW5kZW5jaWVzLCBpZHgsIHR5cGUpID0+IHtcbiAgICAgIGlmICh0eXBlICE9PSAncmF3Jykge1xuICAgICAgICB0aGlzLmluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCBpZHgsICdyYXcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcblxuICAgICAgICB0aGlzLmxvZy5lcnJvcignRmFpbGVkIGxvYWRpbmcgZGVwZW5kZW5jeSBhcyByYXcnLCBlbGVtKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGlkeCA+PSBkZXBlbmRlbmNpZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaW5qZWN0IG9yZGVyOiBleHBsaWNpdGx5IHByb3ZpZGVkIDwgY2FjaGVkIGluIGxvY2FsIHN0b3JhZ2UgPCBwcmludGVkXG4gICAgLy8gcmF3IG9ubHkgYXMgZmFsbGJhY2sgaWYgcHJpbnRlZCBmYWlsc1xuICAgIHR5cGUgPSAoZGVwZW5kZW5jaWVzW2lkeF1bdHlwZV0gJiYgdHlwZSkgfHwgKGRlcGVuZGVuY2llc1tpZHhdWydjYWNoZWQnXSAmJiAnY2FjaGVkJykgfHwgwqAoZGVwZW5kZW5jaWVzW2lkeF1bJ3ByaW50ZWQnXSAmJiAncHJpbnRlZCcpO1xuICAgIGNvbnN0IGVsZW0gPSBkZXBlbmRlbmNpZXNbaWR4XVt0eXBlXTtcblxuICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdwcmludGVkJykge1xuICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MTGlua0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBBamF4KCkuZ2V0KGVsZW0uaHJlZik7XG5cbiAgICAgICAgcmVxdWVzdFxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGluamVjdChlbGVtLCB0eXBlKTtcbiAgICAgICAgICAgIG5leHQoZGVwZW5kZW5jaWVzLCBpZHgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIGZhbGxiYWNrKGRlcGVuZGVuY2llcywgaWR4LCB0eXBlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5qZWN0KGVsZW0sIHR5cGUpO1xuXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICBuZXh0KGRlcGVuZGVuY2llcywgaWR4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZmFsbGJhY2sgaW4gY2FzZSBwcmludGVkIHRhZyBjYW5ub3QgYmUgbG9hZGVkXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgZmFsbGJhY2soZGVwZW5kZW5jaWVzLCBpZHgsIHR5cGUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY2FjaGVkJyB8fCDCoHR5cGUgPT09ICdyYXcnKSB7XG4gICAgICBpbmplY3QoZWxlbSwgdHlwZSk7XG4gICAgICBuZXh0KGRlcGVuZGVuY2llcywgaWR4KTtcblxuICAgIH1cblxuICB9O1xuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBjb25zdCBiYXNlbmFtZSA9IHRoaXMuYmFzZW5hbWUoZGVwZW5kZW5jeS5maWxlKTtcbiAgICAvLyBGaWx0ZXIgb3V0IHBvdGVudGlhbCBudWxsIHZhbHVlc1xuICAgIC8vIHBhc3NlZCBpbiBhcyB2YXJpb3VzIHBhcnRzIG9mIGFuIHVybC5cbiAgICBjb25zdCB1cmwgPSBbdGhpcy5wcmVmaXgsIHJvb3RVcmwsIGRlcGVuZGVuY3kucGF0aF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICk7XG4gICAgfSkuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXBlbmRlbmN5LmlkLFxuICAgICAgcHJpbnRlZDogYC8ke3VybH0vJHtiYXNlbmFtZX0tJHtkZXBlbmRlbmN5Lmhhc2h9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgcmF3OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHNpbmd1bGFyQnk6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5qZWN0b3IuanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLmNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBjYWNoZUluTG9jYWxTdG9yYWdlO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB0ZXh0IGZvciAke3VybH0uYCk7XG5cbiAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgJHt0ZXh0fVxuICAgICAgLy8jIHNvdXJjZVVSTD0ke3VybH1cbiAgICBgO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY3JpcHQpO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICBjb25zdCB1cmxLZXlzID0gT2JqZWN0LmtleXModXJscykuZmlsdGVyKChrZXkpID0+IChbJ3ByaW50ZWQnLCAncmF3J10uaW5kZXhPZihrZXkpID4gLTEpKTtcbiAgICBjb25zdCBzY3JpcHRUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBjb25zdCB1cmwgPSB1cmxzW3VybEtleV07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB1cmxLZXkgPT09ICdwcmludGVkJyk7XG5cbiAgICAgIC8vIEJpbmQgYGxvYWRgIGxpc3RlbmVyIG9uIHNjcmlwdCBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHVybEtleSA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIHNjcmlwdFRhZ3NbdXJsS2V5XSA9IHNjcmlwdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NyaXB0VGFncyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIEphdmFTY3JpcHQgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICB0YWdzKHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVwYXJlV2l0aFRleHQoXG4gICAgICAgIHRleHQsIHVybHMucHJpbnRlZFxuICAgICAgKS50aGVuKChjYWNoZWQpID0+ICh7XG4gICAgICAgIGNhY2hlZFxuICAgICAgfSkpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVXJsKHVybHMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3Mge1xuICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuICAgIGxldCB7XG4gICAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlLFxuICAgICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktY2FjaGVJbkxvY2FsU3RvcmFnZScsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlXG4gICAgKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSA9IGNhY2hlSW5Mb2NhbFN0b3JhZ2U7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBDU1MgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnY3NzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIENTUyBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgQ1NTIGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJlcGFyZVdpdGhVcmwodXJscykge1xuICAgIGNvbnN0IHVybEtleXMgPSBPYmplY3Qua2V5cyh1cmxzKS5maWx0ZXIoKGtleSkgPT4gKFsncHJpbnRlZCcsICdyYXcnXS5pbmRleE9mKGtleSkgPiAtMSkpO1xuICAgIGNvbnN0IGxpbmtUYWdzID0ge307XG5cbiAgICB1cmxLZXlzLmZvckVhY2goKHVybEtleSkgPT4ge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGNvbnN0IHVybCA9IHVybHNbdXJsS2V5XTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHVybEtleSA9PT0gJ3ByaW50ZWQnKTtcblxuICAgICAgLy8gQmluZCBgbG9hZGAgbGlzdGVuZXIgb24gbGluayBlbGVtZW50IHRvIGNhY2hlIGFzc2V0XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh1cmxLZXkgPT09ICdwcmludGVkJykge1xuICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIGxpbmtUYWdzW3VybEtleV0gPSBsaW5rO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rVGFncyk7XG4gIH1cblxuICBwcmVwYXJlV2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHRleHQgZm9yIHVybDogJHt1cmx9LmApO1xuXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5rKTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIHRhZ3ModXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmlkKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVXaXRoVGV4dChcbiAgICAgICAgdGV4dCwgdXJscy5wcmludGVkXG4gICAgICApLnRoZW4oKGNhY2hlZCkgPT4gKHtcbiAgICAgICAgY2FjaGVkXG4gICAgICB9KSk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgaGVhZCh1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCBvcHRpb25zLCAnSEVBRCcpO1xuICB9XG5cbiAgcmVxdWVzdCh1cmwsIG9wdGlvbnMgPSB7fSwgbWV0aG9kID0gJ0dFVCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ09SUyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICB4aHIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIGhhbmRsZXJzLlxuICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICB4aHI6IHhocixcbiAgICAgICAgICAgIHRleHQ6IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICB1cmw6IHhoci5yZXNwb25zZVVSTFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICB9O1xuXG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hamF4LmpzXG4gKiovIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2pha2VhcmNoaWJhbGQvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgMy4yLjFcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyB8fCAodHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc01heWJlVGhlbmFibGUoeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIGlmICghQXJyYXkuaXNBcnJheSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5ID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQ7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbjtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2xpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW5dID0gY2FsbGJhY2s7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiArIDFdID0gYXJnO1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiArPSAyO1xuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPT09IDIpIHtcbiAgICAgICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgICAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgICAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4obGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRBc2FwKGFzYXBGbikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAgPSBhc2FwRm47XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyB8fCB7fTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5cbiAgICAvLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAvLyBub2RlXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU5leHRUaWNrKCkge1xuICAgICAgLy8gbm9kZSB2ZXJzaW9uIDAuMTAueCBkaXNwbGF5cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2hlbiBuZXh0VGljayBpcyB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB2ZXJ0eFxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VWZXJ0eFRpbWVyKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICAgICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgICAgdmFyIG9ic2VydmVyID0gbmV3IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlcihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBub2RlLmRhdGEgPSAoaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB3ZWIgd29ya2VyXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoLCAxKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2goKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW47IGkrPTIpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldO1xuICAgICAgICB2YXIgYXJnID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2krMV07XG5cbiAgICAgICAgY2FsbGJhY2soYXJnKTtcblxuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHIgPSByZXF1aXJlO1xuICAgICAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VWZXJ0eFRpbWVyKCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoO1xuICAgIC8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG4gICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU5leHRUaWNrKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc1dvcmtlcikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTWVzc2FnZUNoYW5uZWwoKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93ID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR0aGVuJCR0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcztcblxuICAgICAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmIChjaGlsZFtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG1ha2VQcm9taXNlKGNoaWxkKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1tzdGF0ZSAtIDFdO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbigpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHN0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHBhcmVudC5fcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSR0aGVuJCR0aGVuO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmUob2JqZWN0KSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgaWYgKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QuY29uc3RydWN0b3IgPT09IENvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkcmVzb2x2ZTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKCkge31cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICAgPSB2b2lkIDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCA9IDE7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEICA9IDI7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcignQSBwcm9taXNlcyBjYWxsYmFjayBjYW5ub3QgcmV0dXJuIHRoYXQgc2FtZSBwcm9taXNlLicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4ocHJvbWlzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeVRoZW4odGhlbiwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbikge1xuICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHRoZW5hYmxlLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmIChzZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG5cbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgICAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgICAgIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZSh0aGVuYWJsZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuKSB7XG4gICAgICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgIHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ICYmXG4gICAgICAgICAgY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24odGhlbikpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc2VsZkZ1bGZpbGxtZW50KCkpO1xuICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4odmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICAgICAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICAgICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykgeyByZXR1cm47IH1cblxuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRDtcblxuICAgICAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwcm9taXNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEO1xuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBzdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgbGVuZ3RoID0gc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gICAgICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aCArIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEXSAgPSBvblJlamVjdGlvbjtcblxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gsIHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgICAgIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCkge1xuICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gICAgICB2YXIgaGFzQ2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgICAgIHZhbHVlLCBlcnJvciwgc3VjY2VlZGVkLCBmYWlsZWQ7XG5cbiAgICAgIGlmIChoYXNDYWxsYmFjaykge1xuICAgICAgICB2YWx1ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAvLyBub29wXG4gICAgICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGlkID0gMDtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRuZXh0SWQoKSB7XG4gICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaWQrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gICAgICBwcm9taXNlW2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSURdID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaWQrKztcbiAgICAgIHByb21pc2UuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGFsbChlbnRyaWVzKSB7XG4gICAgICByZXR1cm4gbmV3IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRkZWZhdWx0KHRoaXMsIGVudHJpZXMpLnByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGFsbDtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlKGVudHJpZXMpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gICAgICBpZiAoIWxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheShlbnRyaWVzKSkge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdChyZWFzb24pIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3Q7XG5cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2U7XG4gICAgLyoqXG4gICAgICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gICAgICBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLCB3aGljaFxuICAgICAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXG4gICAgICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICAgICAgVGVybWlub2xvZ3lcbiAgICAgIC0tLS0tLS0tLS0tXG5cbiAgICAgIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gICAgICAtIGB0aGVuYWJsZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGB0aGVuYCBtZXRob2QuXG4gICAgICAtIGB2YWx1ZWAgaXMgYW55IGxlZ2FsIEphdmFTY3JpcHQgdmFsdWUgKGluY2x1ZGluZyB1bmRlZmluZWQsIGEgdGhlbmFibGUsIG9yIGEgcHJvbWlzZSkuXG4gICAgICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgICAgIC0gYHJlYXNvbmAgaXMgYSB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aHkgYSBwcm9taXNlIHdhcyByZWplY3RlZC5cbiAgICAgIC0gYHNldHRsZWRgIHRoZSBmaW5hbCByZXN0aW5nIHN0YXRlIG9mIGEgcHJvbWlzZSwgZnVsZmlsbGVkIG9yIHJlamVjdGVkLlxuXG4gICAgICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgICAgIFByb21pc2VzIHRoYXQgYXJlIGZ1bGZpbGxlZCBoYXZlIGEgZnVsZmlsbG1lbnQgdmFsdWUgYW5kIGFyZSBpbiB0aGUgZnVsZmlsbGVkXG4gICAgICBzdGF0ZS4gIFByb21pc2VzIHRoYXQgYXJlIHJlamVjdGVkIGhhdmUgYSByZWplY3Rpb24gcmVhc29uIGFuZCBhcmUgaW4gdGhlXG4gICAgICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICAgICAgUHJvbWlzZXMgY2FuIGFsc28gYmUgc2FpZCB0byAqcmVzb2x2ZSogYSB2YWx1ZS4gIElmIHRoaXMgdmFsdWUgaXMgYWxzbyBhXG4gICAgICBwcm9taXNlLCB0aGVuIHRoZSBvcmlnaW5hbCBwcm9taXNlJ3Mgc2V0dGxlZCBzdGF0ZSB3aWxsIG1hdGNoIHRoZSB2YWx1ZSdzXG4gICAgICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgICAgIGl0c2VsZiByZWplY3QsIGFuZCBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdpbGxcbiAgICAgIGl0c2VsZiBmdWxmaWxsLlxuXG5cbiAgICAgIEJhc2ljIFVzYWdlOlxuICAgICAgLS0tLS0tLS0tLS0tXG5cbiAgICAgIGBgYGpzXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBvbiBzdWNjZXNzXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgICAgIC8vIG9uIGZhaWx1cmVcbiAgICAgICAgcmVqZWN0KHJlYXNvbik7XG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBZHZhbmNlZCBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXG4gICAgICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGdldEpTT04odXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAvLyBvbiByZWplY3Rpb25cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgICAgICBnZXRKU09OKCcvY29tbWVudHMnKVxuICAgICAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xuICAgICAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgICAgIHZhbHVlc1sxXSAvLyA9PiBjb21tZW50c0pTT05cblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQGNsYXNzIFByb21pc2VcbiAgICAgIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAY29uc3RydWN0b3JcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgICB0aGlzW2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSURdID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbmV4dElkKCk7XG4gICAgICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wICE9PSByZXNvbHZlcikge1xuICAgICAgICB0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicgJiYgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKTtcbiAgICAgICAgdGhpcyBpbnN0YW5jZW9mIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlID8gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuYWxsID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJhY2UgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJlc29sdmUgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJlamVjdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fc2V0U2NoZWR1bGVyID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldFNjaGVkdWxlcjtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fc2V0QXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRBc2FwO1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9hc2FwID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXA7XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5wcm90b3R5cGUgPSB7XG4gICAgICBjb25zdHJ1Y3RvcjogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UsXG5cbiAgICAvKipcbiAgICAgIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICAgICAgd2hpY2ggcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGVcbiAgICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBDaGFpbmluZ1xuICAgICAgLS0tLS0tLS1cblxuICAgICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgICAgIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmaXJzdCBwcm9taXNlJ3MgZnVsZmlsbG1lbnRcbiAgICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiB1c2VyLm5hbWU7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gICAgICB9KTtcblxuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknLlxuICAgICAgfSk7XG4gICAgICBgYGBcbiAgICAgIElmIHRoZSBkb3duc3RyZWFtIHByb21pc2UgZG9lcyBub3Qgc3BlY2lmeSBhIHJlamVjdGlvbiBoYW5kbGVyLCByZWplY3Rpb24gcmVhc29ucyB3aWxsIGJlIHByb3BhZ2F0ZWQgZnVydGhlciBkb3duc3RyZWFtLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFzc2ltaWxhdGlvblxuICAgICAgLS0tLS0tLS0tLS0tXG5cbiAgICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgICByZXRyaWV2ZWQgYXN5bmNocm9ub3VzbHkuIFRoaXMgY2FuIGJlIGFjaGlldmVkIGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gdGhlXG4gICAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICAgICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCBmdWxmaWxscywgd2UnbGwgaGF2ZSB0aGUgdmFsdWUgaGVyZVxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBTaW1wbGUgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH1cbiAgICAgIGBgYFxuXG4gICAgICBFcnJiYWNrIEV4YW1wbGVcblxuICAgICAgYGBganNcbiAgICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgUHJvbWlzZSBFeGFtcGxlO1xuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIHZhciBhdXRob3IsIGJvb2tzO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICAgIGJvb2tzICA9IGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcik7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH1cbiAgICAgIGBgYFxuXG4gICAgICBFcnJiYWNrIEV4YW1wbGVcblxuICAgICAgYGBganNcblxuICAgICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG5cbiAgICAgIH1cblxuICAgICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgUHJvbWlzZSBFeGFtcGxlO1xuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICBmaW5kQXV0aG9yKCkuXG4gICAgICAgIHRoZW4oZmluZEJvb2tzQnlBdXRob3IpLlxuICAgICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgdGhlblxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsZWRcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICAgKi9cbiAgICAgIHRoZW46IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0LFxuXG4gICAgLyoqXG4gICAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuXG4gICAgICBgYGBqc1xuICAgICAgZnVuY3Rpb24gZmluZEF1dGhvcigpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICAgIH1cblxuICAgICAgLy8gc3luY2hyb25vdXNcbiAgICAgIHRyeSB7XG4gICAgICAgIGZpbmRBdXRob3IoKTtcbiAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9XG5cbiAgICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQG1ldGhvZCBjYXRjaFxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICAgKi9cbiAgICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3I7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IoQ29uc3RydWN0b3IsIGlucHV0KSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmICghdGhpcy5wcm9taXNlW2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSURdKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIHRoaXMuX2lucHV0ICAgICA9IGlucHV0O1xuICAgICAgICB0aGlzLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGggfHwgMDtcbiAgICAgICAgICB0aGlzLl9lbnVtZXJhdGUoKTtcbiAgICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdCh0aGlzLnByb21pc2UsIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCR2YWxpZGF0aW9uRXJyb3IoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJHZhbGlkYXRpb25FcnJvcigpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGVuZ3RoICA9IHRoaXMubGVuZ3RoO1xuICAgICAgdmFyIGlucHV0ICAgPSB0aGlzLl9pbnB1dDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLl9lYWNoRW50cnkoaW5wdXRbaV0sIGkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5LCBpKSB7XG4gICAgICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gICAgICB2YXIgcmVzb2x2ZSA9IGMucmVzb2x2ZTtcblxuICAgICAgaWYgKHJlc29sdmUgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQpIHtcbiAgICAgICAgdmFyIHRoZW4gPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKGVudHJ5KTtcblxuICAgICAgICBpZiAodGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgJiZcbiAgICAgICAgICAgIGVudHJ5Ll9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQpIHtcbiAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBjKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIHRoZW4pO1xuICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24ocmVzb2x2ZSkgeyByZXNvbHZlKGVudHJ5KTsgfSksIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZShlbnRyeSksIGkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uKHN0YXRlLCBpLCB2YWx1ZSkge1xuICAgICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgICAgICBpZiAoc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl93aWxsU2V0dGxlQXQgPSBmdW5jdGlvbihwcm9taXNlLCBpKSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQsIGksIHZhbHVlKTtcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQsIGksIHJlYXNvbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGwoKSB7XG4gICAgICB2YXIgbG9jYWw7XG5cbiAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICAgIGlmIChQICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSkgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9jYWwuUHJvbWlzZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0O1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlID0ge1xuICAgICAgJ1Byb21pc2UnOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCxcbiAgICAgICdwb2x5ZmlsbCc6IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdFxuICAgIH07XG5cbiAgICAvKiBnbG9iYWwgZGVmaW5lOnRydWUgbW9kdWxlOnRydWUgd2luZG93OiB0cnVlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTsgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSkge1xuICAgICAgbW9kdWxlWydleHBvcnRzJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzWydFUzZQcm9taXNlJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCgpO1xufSkuY2FsbCh0aGlzKTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogdmVydHggKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=