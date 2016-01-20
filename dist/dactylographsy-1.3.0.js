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
	
	var _es6Promise = __webpack_require__(9);
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cache = __webpack_require__(3);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _injector = __webpack_require__(5);
	
	var _injector2 = _interopRequireDefault(_injector);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _url = __webpack_require__(8);
	
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
	
	        _this.cache.set(manifests, 'manifests', 'manifests');
	
	        return new _injector2.default(inject ? _this.injectInto : undefined, manifests, _this.config).inject();
	      });
	    }
	  }, {
	    key: 'restore',
	    value: function restore() {
	      var _this2 = this;
	
	      var inject = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      return this.cache.get('manifests').then(function (manifests) {
	        _this2.log.info('Resotring with manifests in cache later refreshing via network (delayed).');
	
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
	
	      if (ttl) {
	        this.cache.get('clt', 0).then(function (clt) {
	          if (clt >= ttl) {
	            _this3.log.info('Flushing cache due to exeeding TTL of ' + ttl + '.');
	
	            _this3.cache.flush();
	          } else {
	            _this3.cache.set(++clt, 'plain', 'clt');
	          }
	        });
	      }
	
	      return this.config.cacheManifests === false ? this.refresh() : this.restore().then(function (injectedFromCache) {
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
	  }]);
	
	  return Dactylographsy;
	}();
	
	exports.default = Dactylographsy;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = function () {
	  function Cache() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Cache);
	
	    var defaultPrefix = '__dactylographsy';
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	    this.log = new _log2.default(getUrlParam('dactylographsy-enableLogging', enableLogging));
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
	    key: 'get',
	    value: function get(key, defaultValue) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        if (!_this.isSupported) {
	          reject();
	        }
	
	        var _item = JSON.parse(localStorage.getItem(_this.cachePrefix + '-' + key));
	
	        if (_item === null && defaultValue !== undefined) {
	          _this.set(defaultValue, 'plain', key);
	
	          resolve(defaultValue);
	
	          return;
	        }
	
	        if (_item) {
	          _this.log.info('Found item with key: ' + key + ' in cache.');
	
	          resolve(_item.code);
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
	    key: 'set',
	    value: function set(code, type, url) {
	      var singularBy = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      if (!this.isSupported) {
	        return false;
	      }
	      if (singularBy) {
	        this.dedupe(singularBy);
	      }
	
	      var cached = {
	        now: +new Date(),
	        url: url,
	        code: code,
	        type: type,
	        singularBy: typeof singularBy === 'string' ? singularBy : undefined
	      };
	
	      localStorage.setItem(this.cachePrefix + '-' + url, JSON.stringify(cached));
	
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
	        var item = undefined;
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Manifest = undefined;
	
	var _dom = __webpack_require__(6);
	
	var _ajax = __webpack_require__(7);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Manifest = exports.Manifest = function () {
	  function Manifest(url, config) {
	    _classCallCheck(this, Manifest);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
	    this.log = new _log2.default(getUrlParam('dactylographsy-enableLogging', enableLogging));
	
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
	
	    this.log = new _log2.default(getUrlParam('dactylographsy-enableLogging', enableLogging));
	
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
	          _this3.injectInto.appendChild(elem);
	
	          elem.addEventListener('load', function () {
	            injectIntoDOM(dependencies, ++idx);
	          });
	
	          elem.addEventListener('error', function () {
	            injectIntoDOM(dependencies, ++idx);
	          });
	        } else {
	          _this3.injectInto.appendChild(elem);
	
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
	            rootUrl = undefined;
	
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
	          url = undefined;
	
	      url = [this.prefix, rootUrl, dependency.path].filter(function (_url) {
	        return _url !== undefined && _url !== null;
	      }).join('/');
	
	      return {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Css = exports.Js = undefined;
	
	var _cache = __webpack_require__(3);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _ajax = __webpack_require__(7);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(4);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Js = exports.Js = function () {
	  function Js(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Js);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
	    enableLogging = getUrlParam('dactylographsy-enableLogging', enableLogging);
	
	    this.injectInto = injectInto;
	
	    this.cache = new _cache2.default({
	      appPrefix: config.appPrefix,
	      enableLogging: enableLogging
	    });
	
	    this.cacheDelay = config.cacheDelay || 5000;
	
	    this.log = new _log2.default(enableLogging);
	  }
	
	  _createClass(Js, [{
	    key: 'injectWithText',
	    value: function injectWithText(text, url) {
	      var _this = this;
	
	      return new Promise(function (resolve) {
	        var script = document.createElement('script');
	
	        script.defer = false;
	        script.async = false;
	
	        script.setAttribute('data-dactylographsy-url', url);
	
	        script.text = '\n        ' + text + '\n        //# sourceURL=' + url + '\n      ';
	
	        if (_this.injectInto) {
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
	
	        _this2.log.info('Injecting JavaScript from ' + url + '.');
	
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
	          resolve(_this2.injectInto.appendChild(script));
	        } else {
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
	          resolve();
	        }
	
	        _this3.log.info('Loading JavaScript from ' + url + ' for cache in ' + delay + '.');
	
	        window.setTimeout(function () {
	          return new _ajax2.default().get(url).then(function (response) {
	            var responseText = response.text;
	
	            _this3.cache.set(responseText, 'js', url, singularBy);
	
	            _this3.log.info('Loaded JavaScript from ' + url + ' now cached.');
	
	            resolve();
	          }).catch(function () {
	            reject();
	          });
	        }, delay);
	      });
	    }
	  }, {
	    key: 'inject',
	    value: function inject(urls) {
	      var _this4 = this;
	
	      return this.cache.get(urls.printed).then(function (text) {
	        return _this4.injectWithText(text, urls.printed);
	      }, function () {
	        return _this4.injectWithUrl(urls);
	      });
	    }
	  }]);
	
	  return Js;
	}();
	
	var Css = exports.Css = function () {
	  function Css(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Css);
	
	    var _config$enableLogging2 = config.enableLogging;
	    var enableLogging = _config$enableLogging2 === undefined ? false : _config$enableLogging2;
	
	    enableLogging = getUrlParam('dactylographsy-enableLogging', enableLogging);
	
	    this.injectInto = injectInto;
	
	    this.cache = new _cache2.default({
	      appPrefix: config.appPrefix
	    });
	
	    this.cacheDelay = config.cacheDelay || 5000;
	
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
	          resolve();
	        }
	
	        _this5.log.info('Loading CSS from ' + url + ' for cache in ' + delay + '.');
	
	        window.setTimeout(function () {
	          return new _ajax2.default().get(url).then(function (response) {
	            var responseText = response.text;
	
	            _this5.cache.set(responseText, 'css', url, singularBy);
	
	            _this5.log.info('Loaded CSS from ' + url + ' now cached.');
	
	            resolve();
	          }).catch(function () {
	            reject();
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
	
	        link = document.createElement('style');
	
	        link.setAttribute('data-dactylographsy-url', url);
	
	        link.textContent = text;
	
	        if (_this7.injectInto) {
	          resolve(_this7.injectInto.appendChild(link));
	        } else {
	          resolve(link);
	        }
	      });
	    }
	  }, {
	    key: 'inject',
	    value: function inject(urls) {
	      var _this8 = this;
	
	      return this.cache.get(urls.printed).then(function (text) {
	        return _this8.injectWithText(text, urls.printed);
	      }, function () {
	        return _this8.injectWithUrl(urls);
	      });
	    }
	  }]);
	
	  return Css;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUrlParam;
	var getParams = function getParams(url) {
	  var query = url,
	      regex = /[?&;](.+?)=([^&;]+)/g;
	  var params = undefined,
	      match = undefined;
	
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
	
	  return params.hasOwnProperty(param) ? params[param] : ifUnset;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
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
	    var lib$es6$promise$asap$$toString = {}.toString;
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
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
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
	        var vertx = __webpack_require__(12);
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
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);
	
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
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
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
	
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;
	
	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;
	
	        enumerator._init();
	
	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;
	
	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;
	
	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }
	
	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
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
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
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
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
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
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }
	
	        lib$es6$promise$$internal$$initializePromise(this, resolver);
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
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
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
	    if ("function" === 'function' && __webpack_require__(13)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), (function() { return this; }()), __webpack_require__(11)(module)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQzZmI0YTcxMGY2NWY4YmE3YTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy92ZXJ0eCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBLHNCQUFXLFFBQVEsRUFBRSxDQUFDOztBQUV0QixLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNqQyxTQUFNLENBQUMsY0FBYyxHQUFHLDZCQUFtQjtBQUN6QyxZQUFPLEVBQUUsSUFBSTtJQUNkLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NIZ0IsY0FBYztBQUNqQyxZQURt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Q0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFROztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7QUFDMUU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxRQUFROztBQUU3Qzs7QUFFQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCLHFFQUFxRTtBQUMxRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIscUVBQXFFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QixlQUFjLFNBQVM7QUFDdkI7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUF5Qix3Q0FBd0MsRUFBRTtBQUNuRSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEVBQUM7Ozs7Ozs7OztBQ3I4QkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQzFGdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSxnQjs7Ozs7O0FDQUEsOEJBQTZCLG1EQUFtRCIsImZpbGUiOiJkYWN0eWxvZ3JhcGhzeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDQzZmI0YTcxMGY2NWY4YmE3YTJcbiAqKi8iLCJpbXBvcnQgRGFjdHlsb2dyYXBoc3kgZnJvbSAnLi9kYWN0eWxvZ3JhcGhzeSc7XG5pbXBvcnQgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmVzNlByb21pc2UucG9seWZpbGwoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5kYWN0eWxvZ3JhcGhzeSA9IG5ldyBEYWN0eWxvZ3JhcGhzeSh7XG4gICAgYXV0b3J1bjogdHJ1ZVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluamVjdG9yLCB7TWFuaWZlc3R9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWN0eWxvZ3JhcGhzeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICB7IGF1dG9ydW4gPSBmYWxzZSB9ID0gb3B0aW9ucyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ob29rSW50b0RvbSgpO1xuICAgIHRoaXMucmVhZENvbmZpZ3VyYXRpb24oKTtcbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogdGhpcy5jb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICBpZiAoYXV0b3J1bikgeyB0aGlzLnJ1bigpOyB9XG4gIH1cblxuICBob29rSW50b0RvbSgpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICAgIHRoaXMuZXhlY3V0aW5nU2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhY3R5bG9ncmFwaHN5Jyk7XG4gICAgdGhpcy5pbmplY3RJbnRvID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgfVxuXG4gIHJlYWRDb25maWd1cmF0aW9uKCkge1xuICAgIHRoaXMubWFuaWZlc3RVcmxzID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdtYW5pZmVzdHMnKTtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnY29uZmlnJyk7XG4gIH1cblxuICByZWZyZXNoKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5tYW5pZmVzdFVybHMubWFwKHVybCA9PiB7XG4gICAgICByZXR1cm4gbmV3IE1hbmlmZXN0KHVybCwgdGhpcy5jb25maWcpLmdldCgpO1xuICAgIH0pKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIGFsbCBtYW5pZmVzdHMsICR7bWFuaWZlc3RzLmxlbmd0aH0gaW4gdG90YWwuYCk7XG5cbiAgICAgIHRoaXMuY2FjaGUuc2V0KG1hbmlmZXN0cywgJ21hbmlmZXN0cycsICdtYW5pZmVzdHMnKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgIHRoaXMuY29uZmlnXG4gICAgICApLmluamVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZShpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KCdtYW5pZmVzdHMnKVxuICAgICAgLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgUmVzb3RyaW5nIHdpdGggbWFuaWZlc3RzIGluIGNhY2hlIGxhdGVyIHJlZnJlc2hpbmcgdmlhIG5ldHdvcmsgKGRlbGF5ZWQpLmApO1xuXG4gICAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgICApLmluamVjdCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWFkQXR0ck9uU2NyaXB0KGF0dHIpIHtcbiAgICBpZiAoIXRoaXMuZXhlY3V0aW5nU2NyaXB0KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgbGV0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0XG4gICAgICB0dGwgPSBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktdHRsJywgdGhpcy5jb25maWcudHRsKTtcblxuICAgIGlmICh0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICh0aGlzLmNvbmZpZy5jYWNoZU1hbmlmZXN0cyA9PT0gZmFsc2UpID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgLnRoZW4oaW5qZWN0ZWRGcm9tQ2FjaGUgPT4ge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHJlZnJlc2hEZWxheSA9IDUwMDBcbiAgICAgICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGluamVjdGVkRnJvbUNhY2hlKVxuICAgICAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIHJlZnJlc2hEZWxheSApO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgTm8gbWFuaWZlc3RzIGluIGNhY2hlLCByZWZyZXNoaW5nIHZpYSBuZXR3b3JrLmApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWNoZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICBkZWZhdWx0UHJlZml4ID0gJ19fZGFjdHlsb2dyYXBoc3knLFxuICAgICAgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2FjaGVQcmVmaXggPSB0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXggfHwgZGVmYXVsdFByZWZpeDtcbiAgICB0aGlzLmlzU3VwcG9ydGVkID0gdGhpcy5zdXBwb3J0ZWQoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBwUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ID0gYCR7dGhpcy5jYWNoZVByZWZpeH0tLSR7dGhpcy5vcHRpb25zLmFwcFByZWZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCArPSAnX18nO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVByZWZpeDtcbiAgfVxuXG4gIGdldChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmVqZWN0KCk7IH1cblxuICAgICAgbGV0IF9pdGVtID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YClcbiAgICAgICk7XG5cbiAgICAgIGlmIChfaXRlbSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUsICdwbGFpbicsIGtleSk7XG5cbiAgICAgICAgcmVzb2x2ZShkZWZhdWx0VmFsdWUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKF9pdGVtLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICBzZXQoY29kZSwgdHlwZSwgdXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHNpbmd1bGFyQnkpIHsgdGhpcy5kZWR1cGUoc2luZ3VsYXJCeSk7IH1cblxuICAgIGxldCBjYWNoZWQgPSB7XG4gICAgICBub3c6ICtuZXcgRGF0ZSgpLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIHNpbmd1bGFyQnk6ICggdHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnICkgPyBzaW5ndWxhckJ5IDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5jYWNoZVByZWZpeH0tJHt1cmx9YCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNhY2hlZClcbiAgICApO1xuXG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgUmVtb3ZpbmcgaXRlbSAke2tleX0gcmVxdWVzdGVkIGJ5IGZsdXNoLmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdXBwb3J0ZWQoKSB7XG4gICAgbGV0XG4gICAgICBpdGVtID0gJ19fZGFjdHlsb2dyYXBoc3lfX2ZlYXR1cmUtZGV0ZWN0aW9uJztcblxuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtLCBpdGVtKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGl0ZW0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMubG9nLndhcm4oYExvY2Fsc3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgLSBubyBjYWNoaW5nIWApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVkdXBlKHNpbmd1bGFyQnkpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zdFxuICAgICAgICBkYWN0eWxvZ3JhcGhzeUl0ZW0gPSBrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwO1xuICAgICAgbGV0XG4gICAgICAgIGl0ZW07XG5cbiAgICAgIGlmICghZGFjdHlsb2dyYXBoc3lJdGVtKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGl0ZW0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICggKHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgJiYgKHR5cGVvZiBpdGVtLnNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSApICYmXG4gICAgICAgIGl0ZW0uc2luZ3VsYXJCeSA9PT0gc2luZ3VsYXJCeVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgRGVkdXBpbmcgYnkgJHtzaW5ndWxhckJ5fSBiZWZvcmUgYWRkaW5nIGR1cGUgaW4gJHtrZXl9LmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWNoZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG5cbiAgLy8gTm90IGxldmVsIGJvdW5kIGxvZ2dpbmcgbmVlZGVkIHlldFxuICBjb25zdHJ1Y3RvcihlbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gIH1cblxuICBsb2coKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGluZm8oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuaW5mbyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICB3YXJuKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgZGVidWcoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuZGVidWcoLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgZXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTsgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2cuanNcbiAqKi8iLCJpbXBvcnQge0NzcywgSnN9IGZyb20gJy4vZG9tJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0IHtcbiAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICBjb25zdCB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgLmdldCh0aGlzLnVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHQsXG4gICAgICAgICAgdXJsOiByZXNwb25zZVVybFxuICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBtYW5pZmVzdCBmcm9tIHVybDogJHtyZXNwb25zZVVybH0uYCk7XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgIH0sIHhociA9PiB7XG4gICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZCBub3QgZmV0Y2ggbWFuaWZlc3Qgd2l0aCB1cmw6ICR7eGhyLnJlc3BvbnNlVVJMfSFgKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgbWFuaWZlc3RzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuICAgIFxuICAgIHRoaXMubWFuaWZlc3RzID0ge307XG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIG1hbmlmZXN0cy5mb3JFYWNoKG1hbmlmZXN0ID0+IHsgdGhpcy5tYW5pZmVzdHNbbWFuaWZlc3QucGFja2FnZV0gPSBtYW5pZmVzdDsgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXI7XG4gIH1cblxuICBpbmplY3QoKSB7XG4gICAgY29uc3RcbiAgICAgIGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgICAoYSwgYikgPT4gYS5jb25jYXQoQXJyYXkuaXNBcnJheShiKSA/IGZsYXR0ZW4oYikgOiBiKSwgW11cbiAgICAgICksXG4gICAgICBpbmplY3RJbnRvRE9NID0gKGRlcGVuZGVuY2llcywgaWR4ID0gMCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZGVwZW5kZW5jaWVzW2lkeF07XG5cbiAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnKSkge1xuICAgICAgICAgIHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG5cbiAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgdGhpcy5vcmRlci5tYXAoX3BhY2thZ2UgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSkge1xuICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZG5cXCd0IGZpbmQgcGFja2FnZSAke19wYWNrYWdlfSBmcm9tIGluamVjdGlvbiBvcmRlci5gKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluamVjdE1hbmlmZXN0KHRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBmbGF0dGVuKG1hbmlmZXN0cyk7XG5cbiAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBsZXRcbiAgICAgIGhhc2hlcyA9IE9iamVjdC5rZXlzKG1hbmlmZXN0Lmhhc2hlcyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoaGFzaGVzLm1hcChoYXNoID0+IHtcbiAgICAgIGxldFxuICAgICAgICBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdLFxuICAgICAgICByb290VXJsO1xuXG4gICAgICByb290VXJsID0gW21hbmlmZXN0LnJvb3RVcmwsIG1hbmlmZXN0LnBhY2thZ2VVcmxdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICAgICk7XG4gICAgICB9KS5qb2luKCcvJyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmluamVjdERlcGVuZGVuY3koXG4gICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgIHJvb3RVcmxcbiAgICAgICk7XG4gICAgfSkpO1xuICB9XG5cbiAgaW5qZWN0RGVwZW5kZW5jeShkZXBlbmRlbmN5LCByb290VXJsKSB7XG4gICAgc3dpdGNoIChkZXBlbmRlbmN5LmV4dGVuc2lvbikge1xuICAgICAgY2FzZSAnLmNzcyc6XG4gICAgICAgIHJldHVybiBuZXcgQ3NzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBjYXNlICcuanMnOlxuICAgICAgICByZXR1cm4gbmV3IEpzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBsZXRcbiAgICAgIGJhc2VuYW1lID0gdGhpcy5iYXNlbmFtZShkZXBlbmRlbmN5LmZpbGUpLFxuICAgICAgdXJsO1xuXG4gICAgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwcmludGVkOiBgLyR7dXJsfS8ke2Jhc2VuYW1lfS0ke2RlcGVuZGVuY3kuaGFzaH0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICByYXc6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgc2luZ3VsYXJCeTogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWBcbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmplY3Rvci5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGNsYXNzIEpzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IGNvbmZpZztcblxuICAgIGVuYWJsZUxvZ2dpbmcgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJyxcbiAgICAgIGVuYWJsZUxvZ2dpbmdcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBzY3JpcHQudGV4dCA9IGBcbiAgICAgICAgJHt0ZXh0fVxuICAgICAgICAvLyMgc291cmNlVVJMPSR7dXJsfVxuICAgICAgYDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykgeyByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTsgfVxuICAgICAgZWxzZSB7IHJlc29sdmUoc2NyaXB0KTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIENyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGl0cyB0eXBlXG4gICAgICBsZXRcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgSmF2YVNjcmlwdCBmcm9tICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycsIHRydWUpO1xuXG4gICAgICAvLyBCaW5kIHRvIHJlYWR5U3RhdGUgb3IgcmVnaXN0ZXIgwrRvbmxvYWTCtCBjYWxsYmFja1xuICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIC8vIENhbGxiYWNrIGZvciBJRSdzIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIChJIGZlZWwgc2Vlc2ljaylcbiAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCaW5kIGBvbmxvYWRgIGNhbGxiYWNrIG9uIHNjcmlwdCBlbGVtZW50XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEluamVjdCB1bnByaW50ZWQgd2l0aG91dCBjYWNoaW5nIGluIGNhc2Ugb2YgZXJyb3JcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIEphdmFTY3JpcHQgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpOyB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7IH1cbiAgICAgIGVsc2UgeyByZXNvbHZlKHNjcmlwdCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXNvbHZlKCk7IH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnanMnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHVybHMucHJpbnRlZClcbiAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVXJsKHVybHMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzcyB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIGNvbmZpZyA9IHt9KSB7XG4gICAgbGV0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYExvYWRpbmcgQ1NTIGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2NzcycsIHVybCwgc2luZ3VsYXJCeSk7XG5cbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBDU1MgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtY3NzJywgdHJ1ZSk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgICAgLy8gRmFsbGJhY2sgdG8gdW5wcmludGVkIGFzc2V0cyBhZnRlciBjYWNoZSBhdHRlbXB0XG4gICAgICAvLyBubyBjYWxsYmFja3MgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9ucyAodGltZW91dHMgYXJlIHdvcnNlLi4uKVxuICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggQ1NTIGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7IHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTsgfVxuICAgICAgZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgbGluay50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpOyB9XG4gICAgICBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQodXJscy5wcmludGVkKVxuICAgICAgLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZG9tLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBnZXQodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBmb3IgSUUuXG4gICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgeGhyOiB4aHIsXG4gICAgICAgICAgICB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgdXJsOiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWpheC5qc1xuICoqLyIsImNvbnN0XG4gIGdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0XG4gICAgICBxdWVyeSA9IHVybCxcbiAgICAgIHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgICBsZXRcbiAgICAgIHBhcmFtcyxcbiAgICAgIG1hdGNoO1xuXG4gICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMocXVlcnkpKSB7XG4gICAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdFxuICAgIHBhcmFtcyA9IGdldFBhcmFtcyh1cmwpO1xuXG4gIHJldHVybiBwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pID8gcGFyYW1zW3BhcmFtXSA6IGlmVW5zZXQ7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXJsLmpzXG4gKiovIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2pha2VhcmNoaWJhbGQvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgMy4wLjJcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyB8fCAodHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc01heWJlVGhlbmFibGUoeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIGlmICghQXJyYXkuaXNBcnJheSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5ID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm47XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuXSA9IGNhbGxiYWNrO1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2xpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKyAxXSA9IGFyZztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKz0gMjtcbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID09PSAyKSB7XG4gICAgICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAgICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcChhc2FwRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gYXNhcEZuO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgfHwge307XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5cbiAgICAvLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAvLyBub2RlXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU5leHRUaWNrKCkge1xuICAgICAgLy8gbm9kZSB2ZXJzaW9uIDAuMTAueCBkaXNwbGF5cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2hlbiBuZXh0VGljayBpcyB1c2VkIHJlY3Vyc2l2ZWx5XG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB2ZXJ0eFxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VWZXJ0eFRpbWVyKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICAgICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgICAgdmFyIG9ic2VydmVyID0gbmV3IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlcihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBub2RlLmRhdGEgPSAoaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDIpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB3ZWIgd29ya2VyXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoLCAxKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2goKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW47IGkrPTIpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldO1xuICAgICAgICB2YXIgYXJnID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2krMV07XG5cbiAgICAgICAgY2FsbGJhY2soYXJnKTtcblxuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHIgPSByZXF1aXJlO1xuICAgICAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VWZXJ0eFRpbWVyKCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoO1xuICAgIC8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG4gICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU5leHRUaWNrKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc1dvcmtlcikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTWVzc2FnZUNoYW5uZWwoKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93ID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCgpIHt9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAgID0gdm9pZCAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgPSAxO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAgPSAyO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkY2Fubm90UmV0dXJuT3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHByb21pc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICAgICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0sIHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gICAgICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSkge1xuICAgICAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGhlbiA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4obWF5YmVUaGVuYWJsZSk7XG5cbiAgICAgICAgaWYgKHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbih0aGVuKSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSkge1xuICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSk7XG4gICAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgICAgIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQ7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaCwgcHJvbWlzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7IHJldHVybjsgfVxuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICAgICAgdmFyIGxlbmd0aCA9IHN1YnNjcmliZXJzLmxlbmd0aDtcblxuICAgICAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoICsgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRF0gID0gb25SZWplY3Rpb247XG5cbiAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwYXJlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gocHJvbWlzZSkge1xuICAgICAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICB2YXIgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdmFyIGhhc0NhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgICAgICB2YWx1ZSwgZXJyb3IsIHN1Y2NlZWRlZCwgZmFpbGVkO1xuXG4gICAgICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICAgICAgdmFsdWUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgICAgICBpZiAodmFsdWUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZGV0YWlsO1xuICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgICAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgICBlbnVtZXJhdG9yLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgICBlbnVtZXJhdG9yLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmIChlbnVtZXJhdG9yLl92YWxpZGF0ZUlucHV0KGlucHV0KSkge1xuICAgICAgICBlbnVtZXJhdG9yLl9pbnB1dCAgICAgPSBpbnB1dDtcbiAgICAgICAgZW51bWVyYXRvci5sZW5ndGggICAgID0gaW5wdXQubGVuZ3RoO1xuICAgICAgICBlbnVtZXJhdG9yLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICAgICAgZW51bWVyYXRvci5faW5pdCgpO1xuXG4gICAgICAgIGlmIChlbnVtZXJhdG9yLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwoZW51bWVyYXRvci5wcm9taXNlLCBlbnVtZXJhdG9yLl9yZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudW1lcmF0b3IubGVuZ3RoID0gZW51bWVyYXRvci5sZW5ndGggfHwgMDtcbiAgICAgICAgICBlbnVtZXJhdG9yLl9lbnVtZXJhdGUoKTtcbiAgICAgICAgICBpZiAoZW51bWVyYXRvci5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKGVudW1lcmF0b3IucHJvbWlzZSwgZW51bWVyYXRvci5fcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChlbnVtZXJhdG9yLnByb21pc2UsIGVudW1lcmF0b3IuX3ZhbGlkYXRpb25FcnJvcigpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlSW5wdXQgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheShpbnB1dCk7XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuICAgIH07XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvcjtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgICAgIHZhciBsZW5ndGggID0gZW51bWVyYXRvci5sZW5ndGg7XG4gICAgICB2YXIgcHJvbWlzZSA9IGVudW1lcmF0b3IucHJvbWlzZTtcbiAgICAgIHZhciBpbnB1dCAgID0gZW51bWVyYXRvci5faW5wdXQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZW51bWVyYXRvci5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbihlbnRyeSwgaSkge1xuICAgICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuICAgICAgdmFyIGMgPSBlbnVtZXJhdG9yLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc01heWJlVGhlbmFibGUoZW50cnkpKSB7XG4gICAgICAgIGlmIChlbnRyeS5jb25zdHJ1Y3RvciA9PT0gYyAmJiBlbnRyeS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgICBlbnRyeS5fb25lcnJvciA9IG51bGw7XG4gICAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW51bWVyYXRvci5fd2lsbFNldHRsZUF0KGMucmVzb2x2ZShlbnRyeSksIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbnVtZXJhdG9yLl9yZW1haW5pbmctLTtcbiAgICAgICAgZW51bWVyYXRvci5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24oc3RhdGUsIGksIHZhbHVlKSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG4gICAgICB2YXIgcHJvbWlzZSA9IGVudW1lcmF0b3IucHJvbWlzZTtcblxuICAgICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3JlbWFpbmluZy0tO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudW1lcmF0b3IuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbnVtZXJhdG9yLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBlbnVtZXJhdG9yLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uKHByb21pc2UsIGkpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGwoZW50cmllcykge1xuICAgICAgcmV0dXJuIG5ldyBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGw7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZShlbnRyaWVzKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmICghbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuXG4gICAgICBmdW5jdGlvbiBvbkZ1bGZpbGxtZW50KHZhbHVlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblJlamVjdGlvbihyZWFzb24pIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSksIHVuZGVmaW5lZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmUob2JqZWN0KSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgaWYgKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QuY29uc3RydWN0b3IgPT09IENvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkcmVzb2x2ZTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdChyZWFzb24pIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3Q7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGNvdW50ZXIgPSAwO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgcmVzb2x2ZXIgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBwcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZTtcbiAgICAvKipcbiAgICAgIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgICAgIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gICAgICByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgICAgIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBUZXJtaW5vbG9neVxuICAgICAgLS0tLS0tLS0tLS1cblxuICAgICAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgICAgIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgICAgIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgICAgIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAgICAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAgICAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgICAgIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICAgICAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgICAgIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgICAgIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gICAgICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgICAgIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgICAgIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICAgICAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICAgICAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICAgICAgQmFzaWMgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgYGBganNcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gb24gZmFpbHVyZVxuICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAvLyBvbiByZWplY3Rpb25cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIFVzYWdlOlxuICAgICAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgICAgIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gICAgICBgYGBqc1xuICAgICAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICAgICAgYGBganNcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gICAgICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICAgICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAY2xhc3MgUHJvbWlzZVxuICAgICAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEBjb25zdHJ1Y3RvclxuICAgICovXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICAgIHRoaXMuX2lkID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGNvdW50ZXIrKztcbiAgICAgIHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgICAgIGlmICghbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHJlc29sdmVyKSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UpKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuYWxsID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJhY2UgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJlc29sdmUgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnJlamVjdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fc2V0U2NoZWR1bGVyID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldFNjaGVkdWxlcjtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fc2V0QXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRBc2FwO1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9hc2FwID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXA7XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5wcm90b3R5cGUgPSB7XG4gICAgICBjb25zdHJ1Y3RvcjogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UsXG5cbiAgICAvKipcbiAgICAgIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICAgICAgd2hpY2ggcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGVcbiAgICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBDaGFpbmluZ1xuICAgICAgLS0tLS0tLS1cblxuICAgICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgICAgIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmaXJzdCBwcm9taXNlJ3MgZnVsZmlsbG1lbnRcbiAgICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiB1c2VyLm5hbWU7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gICAgICB9KTtcblxuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknLlxuICAgICAgfSk7XG4gICAgICBgYGBcbiAgICAgIElmIHRoZSBkb3duc3RyZWFtIHByb21pc2UgZG9lcyBub3Qgc3BlY2lmeSBhIHJlamVjdGlvbiBoYW5kbGVyLCByZWplY3Rpb24gcmVhc29ucyB3aWxsIGJlIHByb3BhZ2F0ZWQgZnVydGhlciBkb3duc3RyZWFtLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFzc2ltaWxhdGlvblxuICAgICAgLS0tLS0tLS0tLS0tXG5cbiAgICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgICByZXRyaWV2ZWQgYXN5bmNocm9ub3VzbHkuIFRoaXMgY2FuIGJlIGFjaGlldmVkIGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gdGhlXG4gICAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICAgICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCBmdWxmaWxscywgd2UnbGwgaGF2ZSB0aGUgdmFsdWUgaGVyZVxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBTaW1wbGUgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH1cbiAgICAgIGBgYFxuXG4gICAgICBFcnJiYWNrIEV4YW1wbGVcblxuICAgICAgYGBganNcbiAgICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgUHJvbWlzZSBFeGFtcGxlO1xuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIHZhciBhdXRob3IsIGJvb2tzO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICAgIGJvb2tzICA9IGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcik7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH1cbiAgICAgIGBgYFxuXG4gICAgICBFcnJiYWNrIEV4YW1wbGVcblxuICAgICAgYGBganNcblxuICAgICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG5cbiAgICAgIH1cblxuICAgICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgUHJvbWlzZSBFeGFtcGxlO1xuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICBmaW5kQXV0aG9yKCkuXG4gICAgICAgIHRoZW4oZmluZEJvb2tzQnlBdXRob3IpLlxuICAgICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgdGhlblxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsZWRcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICAgKi9cbiAgICAgIHRoZW46IGZ1bmN0aW9uKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEICYmICFvbkZ1bGZpbGxtZW50IHx8IHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAmJiAhb25SZWplY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgICB2YXIgcmVzdWx0ID0gcGFyZW50Ll9yZXN1bHQ7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzW3N0YXRlIC0gMV07XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHN0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH0sXG5cbiAgICAvKipcbiAgICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBzeW5jaHJvbm91c1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZEF1dGhvcigpO1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH1cblxuICAgICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIGNhdGNoXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsKCkge1xuICAgICAgdmFyIGxvY2FsO1xuXG4gICAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IGdsb2JhbDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgICBpZiAoUCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvY2FsLlByb21pc2UgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdDtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGw7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZSA9IHtcbiAgICAgICdQcm9taXNlJzogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQsXG4gICAgICAncG9seWZpbGwnOiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHRcbiAgICB9O1xuXG4gICAgLyogZ2xvYmFsIGRlZmluZTp0cnVlIG1vZHVsZTp0cnVlIHdpbmRvdzogdHJ1ZSAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7IH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlWydleHBvcnRzJ10pIHtcbiAgICAgIG1vZHVsZVsnZXhwb3J0cyddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1snRVM2UHJvbWlzZSddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQoKTtcbn0pLmNhbGwodGhpcyk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogdmVydHggKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=