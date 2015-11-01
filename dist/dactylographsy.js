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

	'use strict';
	
	var _dactylographsy = __webpack_require__(1);
	
	var _dactylographsy2 = _interopRequireDefault(_dactylographsy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (typeof window !== 'undefined') {
	  window.dactylographsy = new _dactylographsy2.default({
	    autorun: true
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cache = __webpack_require__(2);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _injector = __webpack_require__(4);
	
	var _injector2 = _interopRequireDefault(_injector);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dactylographsy = (function () {
	  function Dactylographsy() {
	    _classCallCheck(this, Dactylographsy);
	
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _options$autorun = options.autorun;
	
	    var autorun = _options$autorun === undefined ? false : _options$autorun;
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	    this.log = new _log2.default(enableLogging);
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
	
	      if (this.config.ttl) {
	        this.cache.get('clt', 0).then(function (clt) {
	          if (clt >= _this3.config.ttl) {
	            _this3.log.info('Flushing cache due to exeeding TTL of ' + _this3.config.ttl + '.');
	
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
	})();
	
	exports.default = Dactylographsy;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = (function () {
	  function Cache() {
	    _classCallCheck(this, Cache);
	
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var defaultPrefix = '__dactylographsy';
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	    this.log = new _log2.default(enableLogging);
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
	})();
	
	exports.default = Cache;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Log = (function () {
	
	  // Not level bound logging needed yet
	
	  function Log() {
	    _classCallCheck(this, Log);
	
	    var enabled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
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
	})();
	
	exports.default = Log;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Manifest = undefined;
	
	var _dom = __webpack_require__(5);
	
	var _ajax = __webpack_require__(6);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Manifest = exports.Manifest = (function () {
	  function Manifest(url, config) {
	    _classCallCheck(this, Manifest);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
	    this.log = new _log2.default(enableLogging);
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
	})();
	
	var Injector = (function () {
	  function Injector(injectInto, manifests) {
	    var _this2 = this;
	
	    _classCallCheck(this, Injector);
	
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var _options$enableLoggin = options.enableLogging;
	    var enableLogging = _options$enableLoggin === undefined ? false : _options$enableLoggin;
	
	    this.log = new _log2.default(enableLogging);
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
	})();
	
	exports.default = Injector;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Css = exports.Js = undefined;
	
	var _cache = __webpack_require__(2);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _ajax = __webpack_require__(6);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Js = exports.Js = (function () {
	  function Js(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Js);
	
	    var _config$enableLogging = config.enableLogging;
	    var enableLogging = _config$enableLogging === undefined ? false : _config$enableLogging;
	
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
	
	        script.text = text;
	
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
	})();
	
	var Css = exports.Css = (function () {
	  function Css(injectInto) {
	    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Css);
	
	    var _config$enableLogging2 = config.enableLogging;
	    var enableLogging = _config$enableLogging2 === undefined ? false : _config$enableLogging2;
	
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
	})();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ajax = (function () {
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
	})();
	
	exports.default = Ajax;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzljZTRhNjJlN2IzZTc2Mzg2ZGMiLCJ3ZWJwYWNrOi8vL2luZGV4LmpzIiwid2VicGFjazovLy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vY2FjaGUuanMiLCJ3ZWJwYWNrOi8vL2xvZy5qcyIsIndlYnBhY2s6Ly8vaW5qZWN0b3IuanMiLCJ3ZWJwYWNrOi8vL2RvbS5qcyIsIndlYnBhY2s6Ly8vYWpheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcENBLEtBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQ2pDLFNBQU0sQ0FBQyxjQUFjLEdBQUcsNkJBQW1CO0FBQ3pDLFlBQU8sRUFBRSxJQUFJO0lBQ2QsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDRGdCLGNBQWM7QUFDakMsWUFEbUIsY0FBYyxHQUNQOzJCQURQLGNBQWM7O1NBQ3JCLE9BQU8seURBQUcsRUFBRTs0QkFFRSxPQUFPLENBQTNCLE9BQU87O0FBQVQsU0FBRSxPQUFPLG9DQUFHLEtBQUssb0JBQVk7aUNBQ0QsT0FBTyxDQUFqQyxhQUFhO1NBQWIsYUFBYSx5Q0FBRyxLQUFLOztBQUV6QixTQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFRLGFBQWEsQ0FBQyxDQUFDO0FBQ2xDLFNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixTQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUN6QixTQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFVO0FBQ3JCLGdCQUFTLEVBQUUsSUFBSSxD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QztZQUNiLE1BQU07QUFDTCxvQkFBTyxDQUFDO0FBQ04sa0JBQUcsRUFBRSxHQUFHO0FBQ1IsbUJBQUksRUFBRSxHQUFHLENBQUMsWUFBWTtBQUN0QixrQkFBRyxFQUFFLEdBQUcsQ0FBQyxXQUFXO2NBQ3JCLENBQUMsQ0FBQztZQUNKO1VBQ0YsQ0FBQzs7QUFFRixZQUFHLENBQUMsT0FBTyxHQUFHLFlBQU07QUFDbEIsaUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNiLENBQUM7O0FBRUYsWUFBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDO01BQ0o7OztVQTVDa0IsSUFBSTs7O21CQUFKLElBQUksQyIsImZpbGUiOiJkYWN0eWxvZ3JhcGhzeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzljZTRhNjJlN2IzZTc2Mzg2ZGNcbiAqKi8iLCJpbXBvcnQgRGFjdHlsb2dyYXBoc3kgZnJvbSAnLi9kYWN0eWxvZ3JhcGhzeSc7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZGFjdHlsb2dyYXBoc3kgPSBuZXcgRGFjdHlsb2dyYXBoc3koe1xuICAgIGF1dG9ydW46IHRydWVcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBpbmRleC5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBJbmplY3Rvciwge01hbmlmZXN0fSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWN0eWxvZ3JhcGhzeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICB7IGF1dG9ydW4gPSBmYWxzZSB9ID0gb3B0aW9ucyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICAgIHRoaXMuaG9va0ludG9Eb20oKTtcbiAgICB0aGlzLnJlYWRDb25maWd1cmF0aW9uKCk7XG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IHRoaXMuY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgaWYgKGF1dG9ydW4pIHsgdGhpcy5ydW4oKTsgfVxuICB9XG5cbiAgaG9va0ludG9Eb20oKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLmV4ZWN1dGluZ1NjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWN0eWxvZ3JhcGhzeScpO1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIH1cblxuICByZWFkQ29uZmlndXJhdGlvbigpIHtcbiAgICB0aGlzLm1hbmlmZXN0VXJscyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnbWFuaWZlc3RzJyk7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ2NvbmZpZycpO1xuICB9XG5cbiAgcmVmcmVzaChpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMubWFuaWZlc3RVcmxzLm1hcCh1cmwgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdCh1cmwsIHRoaXMuY29uZmlnKS5nZXQoKTtcbiAgICB9KSkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBhbGwgbWFuaWZlc3RzLCAke21hbmlmZXN0cy5sZW5ndGh9IGluIHRvdGFsLmApO1xuXG4gICAgICB0aGlzLmNhY2hlLnNldChtYW5pZmVzdHMsICdtYW5pZmVzdHMnLCAnbWFuaWZlc3RzJyk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgKS5pbmplY3QoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmUoaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCgnbWFuaWZlc3RzJylcbiAgICAgIC50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYFJlc290cmluZyB3aXRoIG1hbmlmZXN0cyBpbiBjYWNoZSBsYXRlciByZWZyZXNoaW5nIHZpYSBuZXR3b3JrIChkZWxheWVkKS5gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICAgIGluamVjdCA/IHRoaXMuaW5qZWN0SW50byA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICAgKS5pbmplY3QoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVhZEF0dHJPblNjcmlwdChhdHRyKSB7XG4gICAgaWYgKCF0aGlzLmV4ZWN1dGluZ1NjcmlwdCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGxldCBfYXR0ciA9IHRoaXMuZXhlY3V0aW5nU2NyaXB0LmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0cik7XG5cbiAgICByZXR1cm4gX2F0dHIgPyBKU09OLnBhcnNlKF9hdHRyKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICBpZiAodGhpcy5jb25maWcudHRsKSB7XG4gICAgICB0aGlzLmNhY2hlLmdldCgnY2x0JywgMClcbiAgICAgICAgLnRoZW4oY2x0ID0+IHtcbiAgICAgICAgICBpZiAoY2x0ID49IHRoaXMuY29uZmlnLnR0bCkge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmx1c2hpbmcgY2FjaGUgZHVlIHRvIGV4ZWVkaW5nIFRUTCBvZiAke3RoaXMuY29uZmlnLnR0bH0uYCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuZmx1c2goKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQoKytjbHQsICdwbGFpbicsICdjbHQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAodGhpcy5jb25maWcuY2FjaGVNYW5pZmVzdHMgPT09IGZhbHNlKSA/IHRoaXMucmVmcmVzaCgpIDogdGhpcy5yZXN0b3JlKClcbiAgICAgIC50aGVuKGluamVjdGVkRnJvbUNhY2hlID0+IHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICByZWZyZXNoRGVsYXkgPSA1MDAwXG4gICAgICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaChpbmplY3RlZEZyb21DYWNoZSlcbiAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCByZWZyZXNoRGVsYXkgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYE5vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay5gKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZGFjdHlsb2dyYXBoc3kuanNcbiAqKi8iLCJpbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgZGVmYXVsdFByZWZpeCA9ICdfX2RhY3R5bG9ncmFwaHN5JyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5jYWNoZVByZWZpeCA9IHRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCB8fCBkZWZhdWx0UHJlZml4O1xuICAgIHRoaXMuaXNTdXBwb3J0ZWQgPSB0aGlzLnN1cHBvcnRlZCgpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hcHBQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggPSBgJHt0aGlzLmNhY2hlUHJlZml4fS0tJHt0aGlzLm9wdGlvbnMuYXBwUHJlZml4fWA7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ICs9ICdfXyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlUHJlZml4O1xuICB9XG5cbiAgZ2V0KGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZWplY3QoKTsgfVxuXG4gICAgICBsZXQgX2l0ZW0gPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKVxuICAgICAgKTtcblxuICAgICAgaWYgKF9pdGVtID09PSBudWxsICYmIGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2V0KGRlZmF1bHRWYWx1ZSwgJ3BsYWluJywga2V5KTtcblxuICAgICAgICByZXNvbHZlKGRlZmF1bHRWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2l0ZW0pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlc29sdmUoX2l0ZW0uY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZG5cXCd0IGZpbmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKSAhPT0gbnVsbDtcbiAgfVxuXG4gIHNldChjb2RlLCB0eXBlLCB1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc2luZ3VsYXJCeSkgeyB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTsgfVxuXG4gICAgbGV0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKCB0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycgKSA/IHNpbmd1bGFyQnkgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmNhY2hlUHJlZml4fS0ke3VybH1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY2FjaGVkKVxuICAgICk7XG5cbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXRcbiAgICAgIGl0ZW0gPSAnX19kYWN0eWxvZ3JhcGhzeV9fZmVhdHVyZS1kZXRlY3Rpb24nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW0sIGl0ZW0pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2cud2FybihgTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchYCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGRhY3R5bG9ncmFwaHN5SXRlbSA9IGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDA7XG4gICAgICBsZXRcbiAgICAgICAgaXRlbTtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHsgY29udGludWU7IH1cblxuICAgICAgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCAodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICkgJiZcbiAgICAgICAgaXRlbS5zaW5ndWxhckJ5ID09PSBzaW5ndWxhckJ5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBEZWR1cGluZyBieSAke3Npbmd1bGFyQnl9IGJlZm9yZSBhZGRpbmcgZHVwZSBpbiAke2tleX0uYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGNhY2hlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIHtcblxuICAvLyBOb3QgbGV2ZWwgYm91bmQgbG9nZ2luZyBuZWVkZWQgeWV0XG4gIGNvbnN0cnVjdG9yKGVuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcblxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgfVxuXG4gIGxvZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgaW5mbygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5pbmZvKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBkZWJ1ZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5kZWJ1ZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBlcnJvcigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpOyB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGxvZy5qc1xuICoqLyIsImltcG9ydCB7Q3NzLCBKc30gZnJvbSAnLi9kb20nO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuXG5leHBvcnQgY2xhc3MgTWFuaWZlc3Qge1xuICBjb25zdHJ1Y3Rvcih1cmwsIGNvbmZpZykge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgIC5nZXQodGhpcy51cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0LFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVcmxcbiAgICAgICAgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgbWFuaWZlc3QgZnJvbSB1cmw6ICR7cmVzcG9uc2VVcmx9LmApO1xuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICB9LCB4aHIgPT4ge1xuICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGQgbm90IGZldGNoIG1hbmlmZXN0IHdpdGggdXJsOiAke3hoci5yZXNwb25zZVVSTH0hYCk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIG1hbmlmZXN0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gICAgdGhpcy5tYW5pZmVzdHMgPSB7fTtcbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgbWFuaWZlc3RzLmZvckVhY2gobWFuaWZlc3QgPT4geyB0aGlzLm1hbmlmZXN0c1ttYW5pZmVzdC5wYWNrYWdlXSA9IG1hbmlmZXN0OyB9KTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5wcmVmaXggPSBvcHRpb25zLnByZWZpeDtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlcjtcbiAgfVxuXG4gIGluamVjdCgpIHtcbiAgICBjb25zdFxuICAgICAgZmxhdHRlbiA9IGxpc3QgPT4gbGlzdC5yZWR1Y2UoXG4gICAgICAgIChhLCBiKSA9PiBhLmNvbmNhdChBcnJheS5pc0FycmF5KGIpID8gZmxhdHRlbihiKSA6IGIpLCBbXVxuICAgICAgKSxcbiAgICAgIGluamVjdEludG9ET00gPSAoZGVwZW5kZW5jaWVzLCBpZHggPSAwKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkZXBlbmRlbmNpZXNbaWR4XTtcblxuICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgICBlbHNlIGlmIChlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycpKSB7XG4gICAgICAgICAgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pO1xuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTtcblxuICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICB0aGlzLm9yZGVyLm1hcChfcGFja2FnZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKSB7XG4gICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkblxcJ3QgZmluZCBwYWNrYWdlICR7X3BhY2thZ2V9IGZyb20gaW5qZWN0aW9uIG9yZGVyLmApO1xuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0TWFuaWZlc3QodGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IGZsYXR0ZW4obWFuaWZlc3RzKTtcblxuICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMpO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlcGVuZGVuY2llcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RNYW5pZmVzdChtYW5pZmVzdCkge1xuICAgIGxldFxuICAgICAgaGFzaGVzID0gT2JqZWN0LmtleXMobWFuaWZlc3QuaGFzaGVzKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChoYXNoZXMubWFwKGhhc2ggPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGRlcGVuZGVuY3kgPSBtYW5pZmVzdC5oYXNoZXNbaGFzaF0sXG4gICAgICAgIHJvb3RVcmw7XG5cbiAgICAgIHJvb3RVcmwgPSBbbWFuaWZlc3Qucm9vdFVybCwgbWFuaWZlc3QucGFja2FnZVVybF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH0pLmpvaW4oJy8nKTtcblxuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0RGVwZW5kZW5jeShcbiAgICAgICAgZGVwZW5kZW5jeSxcbiAgICAgICAgcm9vdFVybFxuICAgICAgKTtcbiAgICB9KSk7XG4gIH1cblxuICBpbmplY3REZXBlbmRlbmN5KGRlcGVuZGVuY3ksIHJvb3RVcmwpIHtcbiAgICBzd2l0Y2ggKGRlcGVuZGVuY3kuZXh0ZW5zaW9uKSB7XG4gICAgICBjYXNlICcuY3NzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBDc3MoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJy5qcyc6XG4gICAgICAgIHJldHVybiBuZXcgSnMoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYmFzZW5hbWUocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UoLy4qXFwvfFxcLlteLl0qJC9nLCAnJyk7XG4gIH1cblxuICB1cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwgPSAnJykge1xuICAgIGxldFxuICAgICAgYmFzZW5hbWUgPSB0aGlzLmJhc2VuYW1lKGRlcGVuZGVuY3kuZmlsZSksXG4gICAgICB1cmw7XG5cbiAgICB1cmwgPSBbdGhpcy5wcmVmaXgsIHJvb3RVcmwsIGRlcGVuZGVuY3kucGF0aF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICk7XG4gICAgfSkuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByaW50ZWQ6IGAvJHt1cmx9LyR7YmFzZW5hbWV9LSR7ZGVwZW5kZW5jeS5oYXNofSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHJhdzogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICBzaW5ndWxhckJ5OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YFxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGluamVjdG9yLmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXgsXG4gICAgICBlbmFibGVMb2dnaW5nOiBlbmFibGVMb2dnaW5nXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgaW5qZWN0V2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIHNjcmlwdC50ZXh0ID0gdGV4dDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykgeyByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTsgfVxuICAgICAgZWxzZSB7IHJlc29sdmUoc2NyaXB0KTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIENyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGl0cyB0eXBlXG4gICAgICBsZXRcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgSmF2YVNjcmlwdCBmcm9tICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycsIHRydWUpO1xuXG4gICAgICAvLyBCaW5kIHRvIHJlYWR5U3RhdGUgb3IgcmVnaXN0ZXIgwrRvbmxvYWTCtCBjYWxsYmFja1xuICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIC8vIENhbGxiYWNrIGZvciBJRSdzIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIChJIGZlZWwgc2Vlc2ljaylcbiAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCaW5kIGBvbmxvYWRgIGNhbGxiYWNrIG9uIHNjcmlwdCBlbGVtZW50XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEluamVjdCB1bnByaW50ZWQgd2l0aG91dCBjYWNoaW5nIGluIGNhc2Ugb2YgZXJyb3JcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIEphdmFTY3JpcHQgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpOyB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7IH1cbiAgICAgIGVsc2UgeyByZXNvbHZlKHNjcmlwdCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXNvbHZlKCk7IH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnanMnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHVybHMucHJpbnRlZClcbiAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVXJsKHVybHMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzcyB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIGNvbmZpZyA9IHt9KSB7XG4gICAgY29uc3QgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IGNvbmZpZztcblxuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYExvYWRpbmcgQ1NTIGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2NzcycsIHVybCwgc2luZ3VsYXJCeSk7XG5cbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBDU1MgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtY3NzJywgdHJ1ZSk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgICAgLy8gRmFsbGJhY2sgdG8gdW5wcmludGVkIGFzc2V0cyBhZnRlciBjYWNoZSBhdHRlbXB0XG4gICAgICAvLyBubyBjYWxsYmFja3MgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9ucyAodGltZW91dHMgYXJlIHdvcnNlLi4uKVxuICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggQ1NTIGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7IHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTsgfVxuICAgICAgZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgbGluay50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpOyB9XG4gICAgICBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQodXJscy5wcmludGVkKVxuICAgICAgLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZG9tLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBnZXQodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBmb3IgSUUuXG4gICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgeGhyOiB4aHIsXG4gICAgICAgICAgICB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgdXJsOiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYWpheC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=