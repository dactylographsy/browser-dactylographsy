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
	        if (_this3.cache.has(url)) {
	          return resolve();
	        }
	        if (!_this3.cacheInLocalStorage) {
	          return resolve('Caching in localStorage is disabled');
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
	
	      return new Promise(function (resolve, reject) {
	        if (_this5.cache.has(url)) {
	          return resolve();
	        }
	        if (!_this5.cacheInLocalStorage) {
	          return resolve('Caching in localStorage is disabled');
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
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDVmNTFiODFkNzhlMzBhY2U4M2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vc3RyaW5nLWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7Ozs7QUFFQSxzQkFBVyxRQUFYOztBQUVBLEtBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLFVBQU8sY0FBUCxHQUF3Qiw2QkFBbUI7QUFDekMsY0FBUztBQURnQyxJQUFuQixDQUF4QjtBQUdELEU7Ozs7Ozs7Ozs7Ozs7O0FDVEQ7Ozs7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QUFDQTtBQUNBO0FBQ0EsMkdBQTBHOztBQUUxRztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QixzQkFBc0I7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXFCLCtCQUErQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsd0JBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFROztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7QUFDMUU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxRQUFROztBQUU3Qzs7QUFFQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSwwQkFBeUIsWUFBWTtBQUNyQztBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QixlQUFjLFNBQVM7QUFDdkI7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QjtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIsa0VBQWtFO0FBQ3ZGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsdURBQXNELGdCQUFnQixFQUFFO0FBQ3hFO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUF5Qix3Q0FBd0MsRUFBRTtBQUNuRSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEVBQUM7Ozs7Ozs7OztBQzc3QkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDdEh0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBLGdCOzs7Ozs7QUNBQSw4QkFBNkIsbURBQW1EIiwiZmlsZSI6ImRhY3R5bG9ncmFwaHN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NWY1MWI4MWQ3OGUzMGFjZTgzY1xuICoqLyIsImltcG9ydCBEYWN0eWxvZ3JhcGhzeSBmcm9tICcuL2RhY3R5bG9ncmFwaHN5JztcbmltcG9ydCBlczZQcm9taXNlIGZyb20gJ2VzNi1wcm9taXNlJztcblxuZXM2UHJvbWlzZS5wb2x5ZmlsbCgpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmRhY3R5bG9ncmFwaHN5ID0gbmV3IERhY3R5bG9ncmFwaHN5KHtcbiAgICBhdXRvcnVuOiB0cnVlXG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5qZWN0b3IsIHtNYW5pZmVzdH0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhY3R5bG9ncmFwaHN5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3RcbiAgICAgIHsgYXV0b3J1biA9IGZhbHNlIH0gPSBvcHRpb25zLFxuICAgICAgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcbiAgICB0aGlzLmhvb2tJbnRvRG9tKCk7XG4gICAgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IHRoaXMuY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgaWYgKGF1dG9ydW4pIHsgdGhpcy5ydW4oKTsgfVxuICB9XG5cbiAgaG9va0ludG9Eb20oKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLmV4ZWN1dGluZ1NjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWN0eWxvZ3JhcGhzeScpO1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIH1cblxuICByZWFkQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLm1hbmlmZXN0VXJscyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnbWFuaWZlc3RzJyk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ2NvbmZpZycpO1xuICB9XG5cbiAgcmVmcmVzaChpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubWFuaWZlc3RVcmxzLm1hcCh1cmwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdCh1cmwsIHRoaXMuY29uZmlnKS5nZXQoKTtcbiAgICB9KSkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBhbGwgbWFuaWZlc3RzLCAke21hbmlmZXN0cy5sZW5ndGh9IGluIHRvdGFsLmApO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FjaGVJbkxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmNhY2hlLnNldChtYW5pZmVzdHMsICdtYW5pZmVzdHMnLCAnbWFuaWZlc3RzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKS5pbmplY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmUoaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCgnbWFuaWZlc3RzJylcbiAgICAgIC50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ1Jlc3RvcmluZyB3aXRoIG1hbmlmZXN0cyBpbiBjYWNoZSBsYXRlciByZWZyZXNoaW5nIHZpYSBuZXR3b3JrIChkZWxheWVkKS4nKTtcblxuICAgICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICAgKS5pbmplY3QoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVhZEF0dHJPblNjcmlwdChhdHRyKSB7XG4gICAgaWYgKCF0aGlzLmV4ZWN1dGluZ1NjcmlwdCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGxldCBfYXR0ciA9IHRoaXMuZXhlY3V0aW5nU2NyaXB0LmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0cik7XG5cbiAgICByZXR1cm4gX2F0dHIgPyBKU09OLnBhcnNlKF9hdHRyKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICBjb25zdFxuICAgICAgdHRsID0gZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LXR0bCcsIHRoaXMuY29uZmlnLnR0bCk7XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLmNhY2hlSW5Mb2NhbFN0b3JhZ2UpIHtcbiAgICAgIC8vIFJlbW92ZSBhbGwgY2FjaGUta2V5cyB3ZSBtaWdodCBoYXZlIHNldCBpbiB0aGUgcGFzdCBhbmQgdGhlbiBzd2l0Y2hlZCBjb25maWdcbiAgICAgIHRoaXMubG9nLmluZm8oJ0ZsdXNoaW5nIGxvY2FsLXN0b3JhZ2UgZHVlIHRvIGNvbmZpZy1vcHRpb24gXCJjYWNoZUluTG9jYWxTdG9yYWdlPWZhbHNlXCInKVxuICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZUluTG9jYWxTdG9yYWdlICYmIHR0bCkge1xuICAgICAgdGhpcy5jYWNoZS5nZXQoJ2NsdCcsIDApXG4gICAgICAgIC50aGVuKGNsdCA9PiB7XG4gICAgICAgICAgaWYgKGNsdCA+PSB0dGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZsdXNoaW5nIGNhY2hlIGR1ZSB0byBleGVlZGluZyBUVEwgb2YgJHt0dGx9LmApO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLmZsdXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KCsrY2x0LCAncGxhaW4nLCAnY2x0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXRjaGluZyBtZWFucyBmZXRjaGluZyBhbGwgbWFuaWZlc3RzIHdpdGhvdXQgaW5qZWN0aW5nXG4gICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlT25seSkgeyByZXR1cm4gdGhpcy5yZWZyZXNoKGZhbHNlKTsgfVxuICAgIC8vIC4uLmVsc2UgcmVzdG9yZSBvciByZWZyZXNoIHRoZSBhcHAgKHdpdGggaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcylcbiAgICBlbHNlIHtcbiAgICAgIC8vIEVpdGhlciB0aGUgY29uZmlndXJhdGlvbiBvZiBub24gY2FjaGVkXG4gICAgICAvLyBtYW5pZmVzdHMgb3IgcmVxdWVzdGVkIGJ1bmRsZSB2ZXJpZmljYXRpb25cbiAgICAgIC8vIGZvcmNlcyBhIHJlZnJlc2ggb2YgYWxsIG1hbmlmZXN0cy5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgdGhpcy5jb25maWcudmVyaWZpY2F0aW9uID09PSB0cnVlIHx8XG4gICAgICAgIHRoaXMuY29uZmlnLmNhY2hlSW5Mb2NhbFN0b3JhZ2UgPT09IGZhbHNlXG4gICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHJlZnJlc2hEZWxheSA9IDUwMDBcbiAgICAgICAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goaW5qZWN0ZWRGcm9tQ2FjaGUpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIHJlZnJlc2hEZWxheSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbygnTm8gbWFuaWZlc3RzIGluIGNhY2hlLCByZWZyZXNoaW5nIHZpYSBuZXR3b3JrLicpO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RhY3R5bG9ncmFwaHN5LmpzXG4gKiovIiwiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuaW1wb3J0IHN0cmluZ0hhc2ggZnJvbSAnc3RyaW5nLWhhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWNoZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICBkZWZhdWx0UHJlZml4ID0gJ19fZGFjdHlsb2dyYXBoc3knLFxuICAgICAgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5jYWNoZVByZWZpeCA9IHRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCB8fCBkZWZhdWx0UHJlZml4O1xuICAgIHRoaXMuaXNTdXBwb3J0ZWQgPSB0aGlzLnN1cHBvcnRlZCgpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcHBQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggPSBgJHt0aGlzLmNhY2hlUHJlZml4fS0tJHt0aGlzLm9wdGlvbnMuYXBwUHJlZml4fWA7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ICs9ICdfXyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlUHJlZml4O1xuICB9XG5cbiAgaXNJdGVtVmFsaWQoY29kZSwgaGFzaCkge1xuICAgIGlmICh0eXBlb2YgY29kZSAhPT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgc3RyaW5nSGFzaChjb2RlKSA9PT0gaGFzaFxuICAgICk7XG4gIH1cblxuICBwYXJzZShpdGVtKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XG4gIH1cblxuICBnZXQoa2V5LCBkZWZhdWx0VmFsdWUsIGhhc2ggPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmVqZWN0KCk7IH1cblxuICAgICAgbGV0XG4gICAgICAgIF9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7XG5cbiAgICAgIGlmIChfaXRlbSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUsICdwbGFpbicsIGtleSk7XG5cbiAgICAgICAgcmVzb2x2ZShkZWZhdWx0VmFsdWUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pdGVtICE9PSBudWxsICYmIGhhc2ggIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgX3BhcnNlZCA9IHRoaXMucGFyc2UoX2l0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZSB3aGljaCBuZWVkcyB2YWxpZGF0aW9uLi4uYCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmFsaWQoX3BhcnNlZC5jb2RlLCBoYXNoKSkge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLm1hdGNoZXMgZXhwZWN0ZWQgaGFzaCAke2hhc2h9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZShfcGFyc2VkLmNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLmRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGhhc2ggJHtoYXNofSAtIHBydW5pbmcuYCk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuXG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoX2l0ZW0pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5wYXJzZShfaXRlbSkuY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZG5cXCd0IGZpbmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKSAhPT0gbnVsbDtcbiAgfVxuXG4gIHJlbW92ZShrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7O1xuICB9XG5cbiAgc2V0KGNvZGUsIHR5cGUsIGtleSwgc2luZ3VsYXJCeSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChzaW5ndWxhckJ5KSB7IHRoaXMuZGVkdXBlKHNpbmd1bGFyQnkpOyB9XG5cbiAgICBsZXQgY2FjaGVkID0ge1xuICAgICAgbm93OiArbmV3IERhdGUoKSxcbiAgICAgIHVybDoga2V5LFxuICAgICAgY29kZTogY29kZSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBzaW5ndWxhckJ5OiAoIHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJyApID8gc2luZ3VsYXJCeSA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWAsXG4gICAgICBKU09OLnN0cmluZ2lmeShjYWNoZWQpXG4gICAgKTtcblxuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICBmbHVzaCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5jYWNoZVByZWZpeCkgPj0gMCkge1xuICAgICAgICB0aGlzLmxvZy5sb2coYFJlbW92aW5nIGl0ZW0gJHtrZXl9IHJlcXVlc3RlZCBieSBmbHVzaC5gKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3VwcG9ydGVkKCkge1xuICAgIGxldFxuICAgICAgaXRlbSA9ICdfX2RhY3R5bG9ncmFwaHN5X19mZWF0dXJlLWRldGVjdGlvbic7XG5cbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbSwgaXRlbSk7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShpdGVtKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLmxvZy53YXJuKCdMb2NhbHN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIC0gbm8gY2FjaGluZyEnKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZShzaW5ndWxhckJ5KSB7XG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgY29uc3RcbiAgICAgICAgZGFjdHlsb2dyYXBoc3lJdGVtID0ga2V5LmluZGV4T2YodGhpcy5jYWNoZVByZWZpeCkgPj0gMDtcbiAgICAgIGxldFxuICAgICAgICBpdGVtO1xuXG4gICAgICBpZiAoIWRhY3R5bG9ncmFwaHN5SXRlbSkgeyBjb250aW51ZTsgfVxuXG4gICAgICBpdGVtID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcblxuICAgICAgaWYgKFxuICAgICAgICAoICh0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICYmICh0eXBlb2YgaXRlbS5zaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgKSAmJlxuICAgICAgICBpdGVtLnNpbmd1bGFyQnkgPT09IHNpbmd1bGFyQnlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvZy5sb2coYERlZHVwaW5nIGJ5ICR7c2luZ3VsYXJCeX0gYmVmb3JlIGFkZGluZyBkdXBlIGluICR7a2V5fS5gKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FjaGUuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2cge1xuXG4gIC8vIE5vdCBsZXZlbCBib3VuZCBsb2dnaW5nIG5lZWRlZCB5ZXRcbiAgY29uc3RydWN0b3IoZW5hYmxlZCA9IHRydWUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gICAgfVxuICB9XG5cbiAgbG9nKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBpbmZvKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmluZm8oLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgd2FybigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGRlYnVnKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmRlYnVnKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGVycm9yKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9nLmpzXG4gKiovIiwiY29uc3RcbiAgZ2V0UGFyYW1zID0gZnVuY3Rpb24odXJsKSB7XG4gICAgY29uc3RcbiAgICAgIHF1ZXJ5ID0gdXJsLFxuICAgICAgcmVnZXggPSAvWz8mO10oLis/KT0oW14mO10rKS9nO1xuICAgIGxldFxuICAgICAgcGFyYW1zLFxuICAgICAgbWF0Y2g7XG5cbiAgICBwYXJhbXMgPSB7fTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgd2hpbGUgKG1hdGNoID0gcmVnZXguZXhlYyhxdWVyeSkpIHtcbiAgICAgICAgcGFyYW1zW21hdGNoWzFdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsyXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VXJsUGFyYW0ocGFyYW0sIGlmVW5zZXQgPSBudWxsLCB1cmwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoKSB7XG4gIGNvbnN0XG4gICAgcGFyYW1zID0gZ2V0UGFyYW1zKHVybCk7XG5cbiAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocGFyYW1zW3BhcmFtXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbcGFyYW1dKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlmVW5zZXRcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VybC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gIHZhciBoYXNoID0gNTM4MSxcbiAgICAgIGkgICAgPSBzdHIubGVuZ3RoXG5cbiAgd2hpbGUoaSlcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiBzdHIuY2hhckNvZGVBdCgtLWkpXG5cbiAgLyogSmF2YVNjcmlwdCBkb2VzIGJpdHdpc2Ugb3BlcmF0aW9ucyAobGlrZSBYT1IsIGFib3ZlKSBvbiAzMi1iaXQgc2lnbmVkXG4gICAqIGludGVnZXJzLiBTaW5jZSB3ZSB3YW50IHRoZSByZXN1bHRzIHRvIGJlIGFsd2F5cyBwb3NpdGl2ZSwgaWYgdGhlIGhpZ2ggYml0XG4gICAqIGlzIHNldCwgdW5zZXQgaXQgYW5kIGFkZCBpdCBiYWNrIGluIHRocm91Z2ggKDY0LWJpdCBJRUVFKSBhZGRpdGlvbi4gKi9cbiAgcmV0dXJuIGhhc2ggPj0gMCA/IGhhc2ggOiAoaGFzaCAmIDB4N0ZGRkZGRkYpICsgMHg4MDAwMDAwMFxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3RyaW5nLWhhc2gvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0NzcywgSnN9IGZyb20gJy4vZG9tJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBjbGFzcyBNYW5pZmVzdCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgY29uZmlnKSB7XG4gICAgY29uc3QgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IGNvbmZpZztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgIC5nZXQodGhpcy51cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0LFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVcmxcbiAgICAgICAgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgbWFuaWZlc3QgZnJvbSB1cmw6ICR7cmVzcG9uc2VVcmx9LmApO1xuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICB9LCB4aHIgPT4ge1xuICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGQgbm90IGZldGNoIG1hbmlmZXN0IHdpdGggdXJsOiAke3hoci5yZXNwb25zZVVSTH0hYCk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIG1hbmlmZXN0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMubWFuaWZlc3RzID0ge307XG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIG1hbmlmZXN0cy5mb3JFYWNoKG1hbmlmZXN0ID0+IHsgdGhpcy5tYW5pZmVzdHNbbWFuaWZlc3QucGFja2FnZV0gPSBtYW5pZmVzdDsgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXI7XG4gIH1cblxuICBpbmplY3QoKSB7XG4gICAgY29uc3RcbiAgICAgIGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgICAoYSwgYikgPT4gYS5jb25jYXQoQXJyYXkuaXNBcnJheShiKSA/IGZsYXR0ZW4oYikgOiBiKSwgW11cbiAgICAgICksXG4gICAgICBpbmplY3RJbnRvRE9NID0gKGRlcGVuZGVuY2llcywgaWR4ID0gMCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZGVwZW5kZW5jaWVzW2lkeF07XG5cbiAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnKSkge1xuICAgICAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oJ0luamVjdGluZyB0YWc6JywgZWxlbSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykgeyB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7IH1cblxuICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICB0aGlzLm9yZGVyLm1hcChfcGFja2FnZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKSB7XG4gICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkblxcJ3QgZmluZCBwYWNrYWdlICR7X3BhY2thZ2V9IGZyb20gaW5qZWN0aW9uIG9yZGVyLmApO1xuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0TWFuaWZlc3QodGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IGZsYXR0ZW4obWFuaWZlc3RzKTtcblxuICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMpO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlcGVuZGVuY2llcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RNYW5pZmVzdChtYW5pZmVzdCkge1xuICAgIGxldFxuICAgICAgaGFzaGVzID0gT2JqZWN0LmtleXMobWFuaWZlc3QuaGFzaGVzKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChoYXNoZXMubWFwKGhhc2ggPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGRlcGVuZGVuY3kgPSBtYW5pZmVzdC5oYXNoZXNbaGFzaF0sXG4gICAgICAgIHJvb3RVcmw7XG5cbiAgICAgIHJvb3RVcmwgPSBbbWFuaWZlc3Qucm9vdFVybCwgbWFuaWZlc3QucGFja2FnZVVybF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH0pLmpvaW4oJy8nKTtcblxuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0RGVwZW5kZW5jeShcbiAgICAgICAgZGVwZW5kZW5jeSxcbiAgICAgICAgcm9vdFVybFxuICAgICAgKTtcbiAgICB9KSk7XG4gIH1cblxuICBpbmplY3REZXBlbmRlbmN5KGRlcGVuZGVuY3ksIHJvb3RVcmwpIHtcbiAgICBzd2l0Y2ggKGRlcGVuZGVuY3kuZXh0ZW5zaW9uKSB7XG4gICAgICBjYXNlICcuY3NzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBDc3MoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJy5qcyc6XG4gICAgICAgIHJldHVybiBuZXcgSnMoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYmFzZW5hbWUocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UoLy4qXFwvfFxcLlteLl0qJC9nLCAnJyk7XG4gIH1cblxuICB1cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwgPSAnJykge1xuICAgIGxldFxuICAgICAgYmFzZW5hbWUgPSB0aGlzLmJhc2VuYW1lKGRlcGVuZGVuY3kuZmlsZSksXG4gICAgICB1cmw7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHBvdGVudGlhbCBudWxsIHZhbHVlc1xuICAgIC8vIHBhc3NlZCBpbiBhcyB2YXJpb3VzIHBhcnRzIG9mIGFuIHVybC5cbiAgICB1cmwgPSBbdGhpcy5wcmVmaXgsIHJvb3RVcmwsIGRlcGVuZGVuY3kucGF0aF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICk7XG4gICAgfSkuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBkZXBlbmRlbmN5LmlkLFxuICAgICAgcHJpbnRlZDogYC8ke3VybH0vJHtiYXNlbmFtZX0tJHtkZXBlbmRlbmN5Lmhhc2h9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgcmF3OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHNpbmd1bGFyQnk6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5qZWN0b3IuanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBjb25maWcgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2UsXG4gICAgICB2ZXJpZmljYXRpb24gPSBmYWxzZSxcbiAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSB0cnVlXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGVuYWJsZUxvZ2dpbmcgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJyxcbiAgICAgIGVuYWJsZUxvZ2dpbmdcbiAgICApO1xuXG4gICAgY2FjaGVJbkxvY2FsU3RvcmFnZSA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWNhY2hlSW5Mb2NhbFN0b3JhZ2UnLFxuICAgICAgY2FjaGVJbkxvY2FsU3RvcmFnZVxuICAgICk7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXgsXG4gICAgICBlbmFibGVMb2dnaW5nOiBlbmFibGVMb2dnaW5nXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSA9IGNhY2hlSW5Mb2NhbFN0b3JhZ2U7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBpbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdGV4dCBmb3IgJHt1cmx9LmApO1xuXG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgICAke3RleHR9XG4gICAgICAgIC8vIyBzb3VyY2VVUkw9JHt1cmx9XG4gICAgICBgO1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKHNjcmlwdCkpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShzY3JpcHQpOyB9XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVXJsKHVybHMsIHdoaWNoVXJsID0gJ3ByaW50ZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gQ3JlYXRlIHNjcmlwdCBlbGVtZW50IGFuZCBzZXQgaXRzIHR5cGVcbiAgICAgIGxldFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSxcbiAgICAgICAgdXJsID0gdXJsc1t3aGljaFVybF07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB0cnVlKTtcblxuICAgICAgLy8gQmluZCB0byByZWFkeVN0YXRlIG9yIHJlZ2lzdGVyIMK0b25sb2FkwrQgY2FsbGJhY2tcbiAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSkge1xuICAgICAgICAvLyBDYWxsYmFjayBmb3IgSUUncyBgb25yZWFkeXN0YXRlY2hhbmdlYCAoSSBmZWVsIHNlZXNpY2spXG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlID09PSAnbG9hZGVkJyB8fCBzY3JpcHQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQmluZCBgb25sb2FkYCBjYWxsYmFjayBvbiBzY3JpcHQgZWxlbWVudFxuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7IH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbmplY3QgdW5wcmludGVkIHdpdGhvdXQgY2FjaGluZyBpbiBjYXNlIG9mIGVycm9yXG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkIG5vdCBmZXRjaCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTsgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKHNjcmlwdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gLi4ubmVlZHMgY2FjaGluZyBtYW51YWxseSBjYXVzZSBuZXZlciBpbmplY3RlZFxuICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpOyB9XG5cbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZW5zdXJlQ2FjaGUodXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UsIGRlbGF5ID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7IHJldHVybiByZXNvbHZlKCk7IH1cbiAgICAgICAgaWYgKCF0aGlzLmNhY2hlSW5Mb2NhbFN0b3JhZ2UpIHsgcmV0dXJuIHJlc29sdmUoJ0NhY2hpbmcgaW4gbG9jYWxTdG9yYWdlIGlzIGRpc2FibGVkJyk7IH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnanMnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgKSA/IGhhc2ggOiBmYWxzZVxuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2UsXG4gICAgICBjYWNoZUluTG9jYWxTdG9yYWdlID0gdHJ1ZVxuICAgIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2UgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1jYWNoZUluTG9jYWxTdG9yYWdlJyxcbiAgICAgIGNhY2hlSW5Mb2NhbFN0b3JhZ2VcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgZW5zdXJlQ2FjaGUodXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UsIGRlbGF5ID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXR1cm4gcmVzb2x2ZSgpOyB9XG4gICAgICBpZiAoIXRoaXMuY2FjaGVJbkxvY2FsU3RvcmFnZSkgeyByZXR1cm4gcmVzb2x2ZSgnQ2FjaGluZyBpbiBsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQnKTsgfVxuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIENTUyBmcm9tICR7dXJsfSBmb3IgY2FjaGUgaW4gJHtkZWxheX0uYCk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChyZXNwb25zZVRleHQsICdjc3MnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgQ1NTIGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGYWlsZWQgYXR0ZW1wdGluZyB0byBjYWNoZSBDU1MgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVXJsKHVybHMsIHdoaWNoVXJsID0gJ3ByaW50ZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtY3NzJywgdHJ1ZSk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgICAgLy8gRmFsbGJhY2sgdG8gdW5wcmludGVkIGFzc2V0cyBhZnRlciBjYWNoZSBhdHRlbXB0XG4gICAgICAvLyBubyBjYWxsYmFja3MgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9ucyAodGltZW91dHMgYXJlIHdvcnNlLi4uKVxuICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggQ1NTIGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChsaW5rKSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKGxpbmspOyB9XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdGV4dCBmb3IgdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgKSA/IGhhc2ggOiBmYWxzZVxuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5pZClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDT1JTIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIHhociA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIHVybDogeGhyLnJlc3BvbnNlVVJMXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FqYXguanNcbiAqKi8iLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vamFrZWFyY2hpYmFsZC9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICAzLjIuMVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzTWF5YmVUaGVuYWJsZSh4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID0gMDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbl0gPSBjYWxsYmFjaztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICsgMV0gPSBhcmc7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICs9IDI7XG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9PT0gMikge1xuICAgICAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXAoYXNhcEZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGFzYXBGbjtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogdW5kZWZpbmVkO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93IHx8IHt9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuICAgIC8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuICAgIC8vIG5vZGVcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKSB7XG4gICAgICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIHZlcnR4XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVZlcnR4VGltZXIoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgbGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5vZGUuZGF0YSA9IChpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMik7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIHdlYiB3b3JrZXJcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2g7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gsIDEpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbjsgaSs9Mikge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaV07XG4gICAgICAgIHZhciBhcmcgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXTtcblxuICAgICAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2krMV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgciA9IHJlcXVpcmU7XG4gICAgICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVZlcnR4VGltZXIoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2g7XG4gICAgLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbiAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHRoZW4kJHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gICAgICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcblxuICAgICAgaWYgKGNoaWxkW2xpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSURdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbWFrZVByb21pc2UoY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzW3N0YXRlIC0gMV07XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHRoZW4kJHRoZW47XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkcmVzb2x2ZShvYmplY3QpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gICAgICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDE2KTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3AoKSB7fVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcgICA9IHZvaWQgMDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEID0gMTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQgID0gMjtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUiA9IG5ldyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc2VsZkZ1bGZpbGxtZW50KCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbihwcm9taXNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuO1xuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuKSB7XG4gICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvciA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeVRoZW4odGhlbiwgdGhlbmFibGUsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGVuYWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgIGlmIChzZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9LCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICAgICAgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4pIHtcbiAgICAgIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgdGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgJiZcbiAgICAgICAgICBjb25zdHJ1Y3Rvci5yZXNvbHZlID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0KSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbih0aGVuKSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSk7XG4gICAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbih2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gICAgICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgICAgICBwcm9taXNlLl9vbmVycm9yKHByb21pc2UuX3Jlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gocHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7IHJldHVybjsgfVxuXG4gICAgICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3N0YXRlID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEO1xuXG4gICAgICBpZiAocHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gsIHByb21pc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pIHtcbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykgeyByZXR1cm47IH1cbiAgICAgIHByb21pc2UuX3N0YXRlID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQ7XG4gICAgICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICAgICAgdmFyIHN1YnNjcmliZXJzID0gcGFyZW50Ll9zdWJzY3JpYmVycztcbiAgICAgIHZhciBsZW5ndGggPSBzdWJzY3JpYmVycy5sZW5ndGg7XG5cbiAgICAgIHBhcmVudC5fb25lcnJvciA9IG51bGw7XG5cbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aF0gPSBjaGlsZDtcbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aCArIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoICsgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURURdICA9IG9uUmVqZWN0aW9uO1xuXG4gICAgICBpZiAobGVuZ3RoID09PSAwICYmIHBhcmVudC5fc3RhdGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaCwgcGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpIHtcbiAgICAgIHZhciBzdWJzY3JpYmVycyA9IHByb21pc2UuX3N1YnNjcmliZXJzO1xuICAgICAgdmFyIHNldHRsZWQgPSBwcm9taXNlLl9zdGF0ZTtcblxuICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgdmFyIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhkZXRhaWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKSB7XG4gICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IuZXJyb3IgPSBlO1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgICAgIHZhciBoYXNDYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbihjYWxsYmFjayksXG4gICAgICAgICAgdmFsdWUsIGVycm9yLCBzdWNjZWVkZWQsIGZhaWxlZDtcblxuICAgICAgaWYgKGhhc0NhbGxiYWNrKSB7XG4gICAgICAgIHZhbHVlID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XG4gICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkY2Fubm90UmV0dXJuT3duKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGRldGFpbDtcbiAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgIC8vIG5vb3BcbiAgICAgIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSl7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaWQgPSAwO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5leHRJZCgpIHtcbiAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpZCsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG1ha2VQcm9taXNlKHByb21pc2UpIHtcbiAgICAgIHByb21pc2VbbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRF0gPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpZCsrO1xuICAgICAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICBwcm9taXNlLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkYWxsKGVudHJpZXMpIHtcbiAgICAgIHJldHVybiBuZXcgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQodGhpcywgZW50cmllcykucHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkYWxsO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2UoZW50cmllcykge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIGlmICghbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0KHJlYXNvbikge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdDtcblxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgcmVzb2x2ZXIgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBwcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZTtcbiAgICAvKipcbiAgICAgIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgICAgIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gICAgICByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgICAgIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBUZXJtaW5vbG9neVxuICAgICAgLS0tLS0tLS0tLS1cblxuICAgICAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgICAgIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgICAgIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgICAgIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAgICAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAgICAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgICAgIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICAgICAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgICAgIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgICAgIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gICAgICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgICAgIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgICAgIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICAgICAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICAgICAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICAgICAgQmFzaWMgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgYGBganNcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gb24gZmFpbHVyZVxuICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAvLyBvbiByZWplY3Rpb25cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIFVzYWdlOlxuICAgICAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgICAgIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gICAgICBgYGBqc1xuICAgICAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICAgICAgYGBganNcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gICAgICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICAgICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAY2xhc3MgUHJvbWlzZVxuICAgICAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEBjb25zdHJ1Y3RvclxuICAgICovXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICAgIHRoaXNbbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRF0gPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRuZXh0SWQoKTtcbiAgICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpO1xuICAgICAgICB0aGlzIGluc3RhbmNlb2YgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UgPyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5hbGwgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmFjZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVzb2x2ZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVqZWN0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRTY2hlZHVsZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyO1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRBc2FwID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXA7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX2FzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcDtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbnN0cnVjdG9yOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSxcblxuICAgIC8qKlxuICAgICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gICAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIENoYWluaW5nXG4gICAgICAtLS0tLS0tLVxuXG4gICAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICAgICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcbiAgICAgIH0pO1xuXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gICAgICB9KTtcbiAgICAgIGBgYFxuICAgICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQXNzaW1pbGF0aW9uXG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIGF1dGhvciwgYm9va3M7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuXG4gICAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcblxuICAgICAgfVxuXG4gICAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRBdXRob3IoKS5cbiAgICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQG1ldGhvZCB0aGVuXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgdGhlbjogbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQsXG5cbiAgICAvKipcbiAgICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBzeW5jaHJvbm91c1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZEF1dGhvcigpO1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH1cblxuICAgICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIGNhdGNoXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvcjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcblxuICAgICAgaWYgKCF0aGlzLnByb21pc2VbbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRF0pIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbWFrZVByb21pc2UodGhpcy5wcm9taXNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgdGhpcy5faW5wdXQgICAgID0gaW5wdXQ7XG4gICAgICAgIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgICAgIHRoaXMuX2VudW1lcmF0ZSgpO1xuICAgICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHRoaXMucHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJHZhbGlkYXRpb25FcnJvcigpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkdmFsaWRhdGlvbkVycm9yKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgaW5wdXQgICA9IHRoaXMuX2lucHV0O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24oZW50cnksIGkpIHtcbiAgICAgIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgICAgIHZhciByZXNvbHZlID0gYy5yZXNvbHZlO1xuXG4gICAgICBpZiAocmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICB2YXIgdGhlbiA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4oZW50cnkpO1xuXG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgICAgZW50cnkuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgICAgfSBlbHNlIGlmIChjID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCkge1xuICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgdGhlbik7XG4gICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbihyZXNvbHZlKSB7IHJlc29sdmUoZW50cnkpOyB9KSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlKGVudHJ5KSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24oc3RhdGUsIGksIHZhbHVlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICAgICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uKHByb21pc2UsIGkpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbCgpIHtcbiAgICAgIHZhciBsb2NhbDtcblxuICAgICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICAgICAgaWYgKFAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKSA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2NhbC5Qcm9taXNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQ7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2UgPSB7XG4gICAgICAnUHJvbWlzZSc6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0LFxuICAgICAgJ3BvbHlmaWxsJzogbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0XG4gICAgfTtcblxuICAgIC8qIGdsb2JhbCBkZWZpbmU6dHJ1ZSBtb2R1bGU6dHJ1ZSB3aW5kb3c6IHRydWUgKi9cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlOyB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZVsnZXhwb3J0cyddKSB7XG4gICAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXNbJ0VTNlByb21pc2UnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0KCk7XG59KS5jYWxsKHRoaXMpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbn0gKCkpXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBjYWNoZWRTZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiB2ZXJ0eCAoaWdub3JlZClcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpOyB9O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==