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
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	if (typeof window !== 'undefined') {
	  window.dactylographsy = new _dactylographsy2.default({
	    autorun: true
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _cache = __webpack_require__(2);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _injector = __webpack_require__(4);
	
	var _injector2 = _interopRequireDefault(_injector);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Manifest = undefined;
	
	var _dom = __webpack_require__(5);
	
	var _ajax = __webpack_require__(6);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _log = __webpack_require__(3);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
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
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
	
	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDAyYjEyMmZiN2JjMTUxOWI4ZTEiLCJ3ZWJwYWNrOi8vL2luZGV4LmpzIiwid2VicGFjazovLy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vY2FjaGUuanMiLCJ3ZWJwYWNrOi8vL2xvZy5qcyIsIndlYnBhY2s6Ly8vaW5qZWN0b3IuanMiLCJ3ZWJwYWNrOi8vL2RvbS5qcyIsIndlYnBhY2s6Ly8vYWpheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSxhQUFZLENBQUM7O0FBRWIsS0FBSSxlQUFlLEdBQUcsbUJBQU8sQ0FBQyxDQUFrQixDQUFDLENBQUM7O0FBRWxELEtBQUksZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRS9ELFVBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsVUFBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFBRTs7QUFKL0YsS0FBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDakMsU0FBTSxDQUFDLGNBQWMsR0FBRyw2QkFBbUI7QUFDekMsWUFBTyxFQUFFLElBQUk7SUFDZCxDQUFDLENBQUM7Ozs7Ozs7QUNMTCxhQUFZLENBQUM7O0FBRWIsS0FBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsWUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsVUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxH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LE9BQU8sQ0FBQyxlQUFlLEVBQUU7QUFDM0IsY0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7VUFDNUI7OztBQUFBLFlBR0UsQ0FBQyxNQUFNLEdBQUcsWUFBTTtBQUNqQixlQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3JCLG1CQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDYixNQUFNO0FBQ0wsb0JBQU8sQ0FBQztBQUNOLGtCQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVk7QUFDdEIsa0JBQUcsRUFBRSxHQUFHLENBQUMsV0FBVztjQUNyQixDQUFDLENBQUM7WUFDSjtVQUNGLENBQUM7O0FBRUYsWUFBRyxDQUFDLE9BQU8sR0FBRyxZQUFNO0FBQ2xCLGlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDYixDQUFDOztBQUVGLFlBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQztNQUNKO0lBZUEsQ0FBQyxDQUFDLENBQUM7O0FBRUosVUE3RG1CLElBQUk7RUE4RHhCLEdBQUcsQ0FBQzs7QUFFTCxRQUFPLENBQUMsT0FBTyxHQWhFTSxJQUFJLEMiLCJmaWxlIjoiZGFjdHlsb2dyYXBoc3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQwMmIxMjJmYjdiYzE1MTliOGUxXG4gKiovIiwiaW1wb3J0IERhY3R5bG9ncmFwaHN5IGZyb20gJy4vZGFjdHlsb2dyYXBoc3knO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmRhY3R5bG9ncmFwaHN5ID0gbmV3IERhY3R5bG9ncmFwaHN5KHtcbiAgICBhdXRvcnVuOiB0cnVlXG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5qZWN0b3IsIHtNYW5pZmVzdH0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFjdHlsb2dyYXBoc3kge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgeyBhdXRvcnVuID0gZmFsc2UgfSA9IG9wdGlvbnMsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgICB0aGlzLmhvb2tJbnRvRG9tKCk7XG4gICAgdGhpcy5yZWFkQ29uZmlndXJhdGlvbigpO1xuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiB0aGlzLmNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIGlmIChhdXRvcnVuKSB7IHRoaXMucnVuKCk7IH1cbiAgfVxuXG4gIGhvb2tJbnRvRG9tKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5leGVjdXRpbmdTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFjdHlsb2dyYXBoc3knKTtcbiAgICB0aGlzLmluamVjdEludG8gPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICB9XG5cbiAgcmVhZENvbmZpZ3VyYXRpb24oKSB7XG4gICAgdGhpcy5tYW5pZmVzdFVybHMgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ21hbmlmZXN0cycpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdjb25maWcnKTtcbiAgfVxuXG4gIHJlZnJlc2goaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLm1hbmlmZXN0VXJscy5tYXAodXJsID0+IHtcbiAgICAgIHJldHVybiBuZXcgTWFuaWZlc3QodXJsLCB0aGlzLmNvbmZpZykuZ2V0KCk7XG4gICAgfSkpLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgYWxsIG1hbmlmZXN0cywgJHttYW5pZmVzdHMubGVuZ3RofSBpbiB0b3RhbC5gKTtcblxuICAgICAgdGhpcy5jYWNoZS5zZXQobWFuaWZlc3RzLCAnbWFuaWZlc3RzJywgJ21hbmlmZXN0cycpO1xuXG4gICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICkuaW5qZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoJ21hbmlmZXN0cycpXG4gICAgICAudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBSZXNvdHJpbmcgd2l0aCBtYW5pZmVzdHMgaW4gY2FjaGUgbGF0ZXIgcmVmcmVzaGluZyB2aWEgbmV0d29yayAoZGVsYXllZCkuYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICAgIHRoaXMuY29uZmlnXG4gICAgICAgICkuaW5qZWN0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlYWRBdHRyT25TY3JpcHQoYXR0cikge1xuICAgIGlmICghdGhpcy5leGVjdXRpbmdTY3JpcHQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBsZXQgX2F0dHIgPSB0aGlzLmV4ZWN1dGluZ1NjcmlwdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xuXG4gICAgcmV0dXJuIF9hdHRyID8gSlNPTi5wYXJzZShfYXR0cikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBydW4oKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnR0bCkge1xuICAgICAgdGhpcy5jYWNoZS5nZXQoJ2NsdCcsIDApXG4gICAgICAgIC50aGVuKGNsdCA9PiB7XG4gICAgICAgICAgaWYgKGNsdCA+PSB0aGlzLmNvbmZpZy50dGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZsdXNoaW5nIGNhY2hlIGR1ZSB0byBleGVlZGluZyBUVEwgb2YgJHt0aGlzLmNvbmZpZy50dGx9LmApO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLmZsdXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KCsrY2x0LCAncGxhaW4nLCAnY2x0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHRoaXMuY29uZmlnLmNhY2hlTWFuaWZlc3RzID09PSBmYWxzZSkgPyB0aGlzLnJlZnJlc2goKSA6IHRoaXMucmVzdG9yZSgpXG4gICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgcmVmcmVzaERlbGF5ID0gNTAwMFxuICAgICAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goaW5qZWN0ZWRGcm9tQ2FjaGUpXG4gICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgcmVmcmVzaERlbGF5ICk7XG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBObyBtYW5pZmVzdHMgaW4gY2FjaGUsIHJlZnJlc2hpbmcgdmlhIG5ldHdvcmsuYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGRhY3R5bG9ncmFwaHN5LmpzXG4gKiovIiwiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3RcbiAgICAgIGRlZmF1bHRQcmVmaXggPSAnX19kYWN0eWxvZ3JhcGhzeScsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY2FjaGVQcmVmaXggPSB0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXggfHwgZGVmYXVsdFByZWZpeDtcbiAgICB0aGlzLmlzU3VwcG9ydGVkID0gdGhpcy5zdXBwb3J0ZWQoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXBwUHJlZml4KSB7XG4gICAgICB0aGlzLmNhY2hlUHJlZml4ID0gYCR7dGhpcy5jYWNoZVByZWZpeH0tLSR7dGhpcy5vcHRpb25zLmFwcFByZWZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5jYWNoZVByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCArPSAnX18nO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVByZWZpeDtcbiAgfVxuXG4gIGdldChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmVqZWN0KCk7IH1cblxuICAgICAgbGV0IF9pdGVtID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YClcbiAgICAgICk7XG5cbiAgICAgIGlmIChfaXRlbSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUsICdwbGFpbicsIGtleSk7XG5cbiAgICAgICAgcmVzb2x2ZShkZWZhdWx0VmFsdWUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKF9pdGVtLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICBzZXQoY29kZSwgdHlwZSwgdXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHNpbmd1bGFyQnkpIHsgdGhpcy5kZWR1cGUoc2luZ3VsYXJCeSk7IH1cblxuICAgIGxldCBjYWNoZWQgPSB7XG4gICAgICBub3c6ICtuZXcgRGF0ZSgpLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBjb2RlOiBjb2RlLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIHNpbmd1bGFyQnk6ICggdHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnICkgPyBzaW5ndWxhckJ5IDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgYCR7dGhpcy5jYWNoZVByZWZpeH0tJHt1cmx9YCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNhY2hlZClcbiAgICApO1xuXG4gICAgcmV0dXJuIGNhY2hlZDtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgUmVtb3ZpbmcgaXRlbSAke2tleX0gcmVxdWVzdGVkIGJ5IGZsdXNoLmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdXBwb3J0ZWQoKSB7XG4gICAgbGV0XG4gICAgICBpdGVtID0gJ19fZGFjdHlsb2dyYXBoc3lfX2ZlYXR1cmUtZGV0ZWN0aW9uJztcblxuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpdGVtLCBpdGVtKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGl0ZW0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHRoaXMubG9nLndhcm4oYExvY2Fsc3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgLSBubyBjYWNoaW5nIWApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVkdXBlKHNpbmd1bGFyQnkpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBjb25zdFxuICAgICAgICBkYWN0eWxvZ3JhcGhzeUl0ZW0gPSBrZXkuaW5kZXhPZih0aGlzLmNhY2hlUHJlZml4KSA+PSAwO1xuICAgICAgbGV0XG4gICAgICAgIGl0ZW07XG5cbiAgICAgIGlmICghZGFjdHlsb2dyYXBoc3lJdGVtKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGl0ZW0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICggKHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgJiYgKHR5cGVvZiBpdGVtLnNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSApICYmXG4gICAgICAgIGl0ZW0uc2luZ3VsYXJCeSA9PT0gc2luZ3VsYXJCeVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9nLmxvZyhgRGVkdXBpbmcgYnkgJHtzaW5ndWxhckJ5fSBiZWZvcmUgYWRkaW5nIGR1cGUgaW4gJHtrZXl9LmApO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjYWNoZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyB7XG5cbiAgLy8gTm90IGxldmVsIGJvdW5kIGxvZ2dpbmcgbmVlZGVkIHlldFxuICBjb25zdHJ1Y3RvcihlbmFibGVkID0gdHJ1ZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgICB9XG4gIH1cblxuICBsb2coKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGluZm8oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuaW5mbyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICB3YXJuKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgZGVidWcoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuZGVidWcoLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgZXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTsgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsb2cuanNcbiAqKi8iLCJpbXBvcnQge0NzcywgSnN9IGZyb20gJy4vZG9tJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0IHtcbiAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICBjb25zdCB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAuZ2V0KHRoaXMudXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICAgIHRoaXMubWFuaWZlc3RzID0ge307XG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIG1hbmlmZXN0cy5mb3JFYWNoKG1hbmlmZXN0ID0+IHsgdGhpcy5tYW5pZmVzdHNbbWFuaWZlc3QucGFja2FnZV0gPSBtYW5pZmVzdDsgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXI7XG4gIH1cblxuICBpbmplY3QoKSB7XG4gICAgY29uc3RcbiAgICAgIGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgICAoYSwgYikgPT4gYS5jb25jYXQoQXJyYXkuaXNBcnJheShiKSA/IGZsYXR0ZW4oYikgOiBiKSwgW11cbiAgICAgICksXG4gICAgICBpbmplY3RJbnRvRE9NID0gKGRlcGVuZGVuY2llcywgaWR4ID0gMCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZGVwZW5kZW5jaWVzW2lkeF07XG5cbiAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnKSkge1xuICAgICAgICAgIHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG5cbiAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgdGhpcy5vcmRlci5tYXAoX3BhY2thZ2UgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSkge1xuICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZG5cXCd0IGZpbmQgcGFja2FnZSAke19wYWNrYWdlfSBmcm9tIGluamVjdGlvbiBvcmRlci5gKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluamVjdE1hbmlmZXN0KHRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBmbGF0dGVuKG1hbmlmZXN0cyk7XG5cbiAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBsZXRcbiAgICAgIGhhc2hlcyA9IE9iamVjdC5rZXlzKG1hbmlmZXN0Lmhhc2hlcyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoaGFzaGVzLm1hcChoYXNoID0+IHtcbiAgICAgIGxldFxuICAgICAgICBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdLFxuICAgICAgICByb290VXJsO1xuXG4gICAgICByb290VXJsID0gW21hbmlmZXN0LnJvb3RVcmwsIG1hbmlmZXN0LnBhY2thZ2VVcmxdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICAgICk7XG4gICAgICB9KS5qb2luKCcvJyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmluamVjdERlcGVuZGVuY3koXG4gICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgIHJvb3RVcmxcbiAgICAgICk7XG4gICAgfSkpO1xuICB9XG5cbiAgaW5qZWN0RGVwZW5kZW5jeShkZXBlbmRlbmN5LCByb290VXJsKSB7XG4gICAgc3dpdGNoIChkZXBlbmRlbmN5LmV4dGVuc2lvbikge1xuICAgICAgY2FzZSAnLmNzcyc6XG4gICAgICAgIHJldHVybiBuZXcgQ3NzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBjYXNlICcuanMnOlxuICAgICAgICByZXR1cm4gbmV3IEpzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBsZXRcbiAgICAgIGJhc2VuYW1lID0gdGhpcy5iYXNlbmFtZShkZXBlbmRlbmN5LmZpbGUpLFxuICAgICAgdXJsO1xuXG4gICAgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwcmludGVkOiBgLyR7dXJsfS8ke2Jhc2VuYW1lfS0ke2RlcGVuZGVuY3kuaGFzaH0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICByYXc6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgc2luZ3VsYXJCeTogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWBcbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBpbmplY3Rvci5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGNsYXNzIEpzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBjb25zdCB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBzY3JpcHQudGV4dCA9IHRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7IH1cbiAgICAgIGVsc2UgeyByZXNvbHZlKHNjcmlwdCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBDcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBpdHMgdHlwZVxuICAgICAgbGV0XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB0cnVlKTtcblxuICAgICAgLy8gQmluZCB0byByZWFkeVN0YXRlIG9yIHJlZ2lzdGVyIMK0b25sb2FkwrQgY2FsbGJhY2tcbiAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSkge1xuICAgICAgICAvLyBDYWxsYmFjayBmb3IgSUUncyBgb25yZWFkeXN0YXRlY2hhbmdlYCAoSSBmZWVsIHNlZXNpY2spXG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlID09PSAnbG9hZGVkJyB8fCBzY3JpcHQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQmluZCBgb25sb2FkYCBjYWxsYmFjayBvbiBzY3JpcHQgZWxlbWVudFxuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7IH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbmplY3QgdW5wcmludGVkIHdpdGhvdXQgY2FjaGluZyBpbiBjYXNlIG9mIGVycm9yXG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkIG5vdCBmZXRjaCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTsgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7IHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKHNjcmlwdCkpOyB9XG4gICAgICBlbHNlIHsgcmVzb2x2ZShzY3JpcHQpOyB9XG4gICAgfSk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgSmF2YVNjcmlwdCBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3QodXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldCh1cmxzLnByaW50ZWQpXG4gICAgICAudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFRleHQodGV4dCwgdXJscy5wcmludGVkKTtcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3Mge1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBjb25maWcgPSB7fSkge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIHRoaXMuY2FjaGVEZWxheSA9IGNvbmZpZy5jYWNoZURlbGF5IHx8IDUwMDA7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7IHJlc29sdmUoKTsgfVxuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIENTUyBmcm9tICR7dXJsfSBmb3IgY2FjaGUgaW4gJHtkZWxheX0uYCk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChyZXNwb25zZVRleHQsICdjc3MnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgQ1NTIGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSxcbiAgICAgICAgdXJsID0gdXJsc1t3aGljaFVybF07XG5cbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHRydWUpO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIC8vIEZhbGxiYWNrIHRvIHVucHJpbnRlZCBhc3NldHMgYWZ0ZXIgY2FjaGUgYXR0ZW1wdFxuICAgICAgLy8gbm8gY2FsbGJhY2tzIGZvciBzdHlsZXNoZWV0IGluamVjdGlvbnMgKHRpbWVvdXRzIGFyZSB3b3JzZS4uLilcbiAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIENTUyBmcm9tICR7dXJsfSAtIGZhbGxpbmcgYmFjayB0byB1bnByaW50ZWQgdmVyc2lvbi5gKTtcblxuICAgICAgICAgICAgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykgeyByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChsaW5rKSk7IH1cbiAgICAgIGVsc2UgeyByZXNvbHZlKGxpbmspOyB9XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7IHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTsgfVxuICAgICAgZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHVybHMucHJpbnRlZClcbiAgICAgIC50aGVuKHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVXJsKHVybHMpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGRvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDT1JTIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIHhociA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIHVybDogeGhyLnJlc3BvbnNlVVJMXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFqYXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9