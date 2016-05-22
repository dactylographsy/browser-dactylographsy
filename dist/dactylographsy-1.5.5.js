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
	
	      // Prefetching means fetching all manifests without injecting
	      if (this.config.cacheOnly) {
	        return this.refresh(false);
	      }
	      // ...else restore or refresh the app (with injection of dependencies)
	      else {
	          // Either the configuration of non cached
	          // manifests or requested bundle verification
	          // forces a refresh or all manifests.
	          return this.config.cachedManifests === false || this.config.verification === true ? this.refresh() : this.restore().then(function (injectedFromCache) {
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
	
	var _jssha = __webpack_require__(6);
	
	var _jssha2 = _interopRequireDefault(_jssha);
	
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
	
	    this.hasher = new _jssha2.default('SHA-256', 'TEXT');
	
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
	    value: function isItemValid(code, sha256) {
	      if (typeof code !== 'string') {
	        return false;
	      }
	      this.hasher.update(code);
	      return this.hasher.getHash('HEX') === sha256;
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
	
	      var sha256 = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
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
	
	        if (_item !== null && sha256 !== false) {
	          var _parsed = _this.parse(_item);
	
	          _this.log.info('Found item with key: ' + key + ' in cache which needs validation...');
	
	          if (_this.isItemValid(_parsed.code, sha256)) {
	            _this.log.info('...matches expected sha256 ' + sha256 + '.');
	
	            resolve(_parsed.code);
	          } else {
	            _this.log.info('...does not match expected sha256 ' + sha256 + ' - pruning.');
	
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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 A JavaScript implementation of the SHA family of hashes, as
	 defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
	 as defined in FIPS PUB 198a
	
	 Copyright Brian Turek 2008-2015
	 Distributed under the BSD License
	 See http://caligatio.github.com/jsSHA/ for more information
	
	 Several functions taken from Paul Johnston
	*/
	'use strict';(function(T){function y(c,a,d){var b=0,f=[],k=0,g,e,n,h,m,u,r,p=!1,q=!1,t=[],v=[],x,w=!1;d=d||{};g=d.encoding||"UTF8";x=d.numRounds||1;n=J(a,g);if(x!==parseInt(x,10)||1>x)throw Error("numRounds must a integer >= 1");if("SHA-1"===c)m=512,u=K,r=U,h=160;else if(u=function(a,d){return L(a,d,c)},r=function(a,d,b,f){var k,e;if("SHA-224"===c||"SHA-256"===c)k=(d+65>>>9<<4)+15,e=16;else if("SHA-384"===c||"SHA-512"===c)k=(d+129>>>10<<5)+31,e=32;else throw Error("Unexpected error in SHA-2 implementation");
	for(;a.length<=k;)a.push(0);a[d>>>5]|=128<<24-d%32;a[k]=d+b;b=a.length;for(d=0;d<b;d+=e)f=L(a.slice(d,d+e),f,c);if("SHA-224"===c)a=[f[0],f[1],f[2],f[3],f[4],f[5],f[6]];else if("SHA-256"===c)a=f;else if("SHA-384"===c)a=[f[0].a,f[0].b,f[1].a,f[1].b,f[2].a,f[2].b,f[3].a,f[3].b,f[4].a,f[4].b,f[5].a,f[5].b];else if("SHA-512"===c)a=[f[0].a,f[0].b,f[1].a,f[1].b,f[2].a,f[2].b,f[3].a,f[3].b,f[4].a,f[4].b,f[5].a,f[5].b,f[6].a,f[6].b,f[7].a,f[7].b];else throw Error("Unexpected error in SHA-2 implementation");
	return a},"SHA-224"===c)m=512,h=224;else if("SHA-256"===c)m=512,h=256;else if("SHA-384"===c)m=1024,h=384;else if("SHA-512"===c)m=1024,h=512;else throw Error("Chosen SHA variant is not supported");e=z(c);this.setHMACKey=function(a,d,f){var k;if(!0===q)throw Error("HMAC key already set");if(!0===p)throw Error("Cannot set HMAC key after finalizing hash");if(!0===w)throw Error("Cannot set HMAC key after calling update");g=(f||{}).encoding||"UTF8";d=J(d,g)(a);a=d.binLen;d=d.value;k=m>>>3;f=k/4-1;if(k<
	a/8){for(d=r(d,a,0,z(c));d.length<=f;)d.push(0);d[f]&=4294967040}else if(k>a/8){for(;d.length<=f;)d.push(0);d[f]&=4294967040}for(a=0;a<=f;a+=1)t[a]=d[a]^909522486,v[a]=d[a]^1549556828;e=u(t,e);b=m;q=!0};this.update=function(a){var c,d,g,h=0,p=m>>>5;c=n(a,f,k);a=c.binLen;d=c.value;c=a>>>5;for(g=0;g<c;g+=p)h+m<=a&&(e=u(d.slice(g,g+p),e),h+=m);b+=h;f=d.slice(h>>>5);k=a%m;w=!0};this.getHash=function(a,d){var g,m,n;if(!0===q)throw Error("Cannot call getHash after setting HMAC key");n=M(d);switch(a){case "HEX":g=
	function(a){return N(a,n)};break;case "B64":g=function(a){return O(a,n)};break;case "BYTES":g=P;break;default:throw Error("format must be HEX, B64, or BYTES");}if(!1===p)for(e=r(f,k,b,e),m=1;m<x;m+=1)e=r(e,h,0,z(c));p=!0;return g(e)};this.getHMAC=function(a,d){var g,n,t;if(!1===q)throw Error("Cannot call getHMAC without first setting HMAC key");t=M(d);switch(a){case "HEX":g=function(a){return N(a,t)};break;case "B64":g=function(a){return O(a,t)};break;case "BYTES":g=P;break;default:throw Error("outputFormat must be HEX, B64, or BYTES");
	}!1===p&&(n=r(f,k,b,e),e=u(v,z(c)),e=r(n,h,m,e));p=!0;return g(e)}}function b(c,a){this.a=c;this.b=a}function V(c,a,d){var b=c.length,f,k,e,l,n;a=a||[0];d=d||0;n=d>>>3;if(0!==b%2)throw Error("String of HEX type must be in byte increments");for(f=0;f<b;f+=2){k=parseInt(c.substr(f,2),16);if(isNaN(k))throw Error("String of HEX type contains invalid characters");l=(f>>>1)+n;for(e=l>>>2;a.length<=e;)a.push(0);a[e]|=k<<8*(3-l%4)}return{value:a,binLen:4*b+d}}function W(c,a,d){var b=[],f,k,e,l,b=a||[0];d=
	d||0;k=d>>>3;for(f=0;f<c.length;f+=1)a=c.charCodeAt(f),l=f+k,e=l>>>2,b.length<=e&&b.push(0),b[e]|=a<<8*(3-l%4);return{value:b,binLen:8*c.length+d}}function X(c,a,d){var b=[],f=0,e,g,l,n,h,m,b=a||[0];d=d||0;a=d>>>3;if(-1===c.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");g=c.indexOf("=");c=c.replace(/\=/g,"");if(-1!==g&&g<c.length)throw Error("Invalid '=' found in base-64 string");for(g=0;g<c.length;g+=4){h=c.substr(g,4);for(l=n=0;l<h.length;l+=1)e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[l]),
	n|=e<<18-6*l;for(l=0;l<h.length-1;l+=1){m=f+a;for(e=m>>>2;b.length<=e;)b.push(0);b[e]|=(n>>>16-8*l&255)<<8*(3-m%4);f+=1}}return{value:b,binLen:8*f+d}}function N(c,a){var d="",b=4*c.length,f,e;for(f=0;f<b;f+=1)e=c[f>>>2]>>>8*(3-f%4),d+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(e&15);return a.outputUpper?d.toUpperCase():d}function O(c,a){var d="",b=4*c.length,f,e,g;for(f=0;f<b;f+=3)for(g=f+1>>>2,e=c.length<=g?0:c[g],g=f+2>>>2,g=c.length<=g?0:c[g],g=(c[f>>>2]>>>8*(3-f%4)&255)<<16|
	(e>>>8*(3-(f+1)%4)&255)<<8|g>>>8*(3-(f+2)%4)&255,e=0;4>e;e+=1)8*f+6*e<=32*c.length?d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g>>>6*(3-e)&63):d+=a.b64Pad;return d}function P(c){var a="",d=4*c.length,b,f;for(b=0;b<d;b+=1)f=c[b>>>2]>>>8*(3-b%4)&255,a+=String.fromCharCode(f);return a}function M(c){var a={outputUpper:!1,b64Pad:"="};c=c||{};a.outputUpper=c.outputUpper||!1;!0===c.hasOwnProperty("b64Pad")&&(a.b64Pad=c.b64Pad);if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");
	if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function J(c,a){var d;switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(c){case "HEX":d=V;break;case "TEXT":d=function(c,d,b){var e=[],l=[],n=0,h,m,u,r,p,e=d||[0];d=b||0;u=d>>>3;if("UTF8"===a)for(h=0;h<c.length;h+=1)for(b=c.charCodeAt(h),l=[],128>b?l.push(b):2048>b?(l.push(192|b>>>6),l.push(128|b&63)):55296>b||57344<=b?l.push(224|
	b>>>12,128|b>>>6&63,128|b&63):(h+=1,b=65536+((b&1023)<<10|c.charCodeAt(h)&1023),l.push(240|b>>>18,128|b>>>12&63,128|b>>>6&63,128|b&63)),m=0;m<l.length;m+=1){p=n+u;for(r=p>>>2;e.length<=r;)e.push(0);e[r]|=l[m]<<8*(3-p%4);n+=1}else if("UTF16BE"===a||"UTF16LE"===a)for(h=0;h<c.length;h+=1){b=c.charCodeAt(h);"UTF16LE"===a&&(m=b&255,b=m<<8|b>>>8);p=n+u;for(r=p>>>2;e.length<=r;)e.push(0);e[r]|=b<<8*(2-p%4);n+=2}return{value:e,binLen:8*n+d}};break;case "B64":d=X;break;case "BYTES":d=W;break;default:throw Error("format must be HEX, TEXT, B64, or BYTES");
	}return d}function w(c,a){return c<<a|c>>>32-a}function q(c,a){return c>>>a|c<<32-a}function v(c,a){var d=null,d=new b(c.a,c.b);return d=32>=a?new b(d.a>>>a|d.b<<32-a&4294967295,d.b>>>a|d.a<<32-a&4294967295):new b(d.b>>>a-32|d.a<<64-a&4294967295,d.a>>>a-32|d.b<<64-a&4294967295)}function Q(c,a){var d=null;return d=32>=a?new b(c.a>>>a,c.b>>>a|c.a<<32-a&4294967295):new b(0,c.a>>>a-32)}function Y(c,a,d){return c&a^~c&d}function Z(c,a,d){return new b(c.a&a.a^~c.a&d.a,c.b&a.b^~c.b&d.b)}function R(c,a,d){return c&
	a^c&d^a&d}function aa(c,a,d){return new b(c.a&a.a^c.a&d.a^a.a&d.a,c.b&a.b^c.b&d.b^a.b&d.b)}function ba(c){return q(c,2)^q(c,13)^q(c,22)}function ca(c){var a=v(c,28),d=v(c,34);c=v(c,39);return new b(a.a^d.a^c.a,a.b^d.b^c.b)}function da(c){return q(c,6)^q(c,11)^q(c,25)}function ea(c){var a=v(c,14),d=v(c,18);c=v(c,41);return new b(a.a^d.a^c.a,a.b^d.b^c.b)}function fa(c){return q(c,7)^q(c,18)^c>>>3}function ga(c){var a=v(c,1),d=v(c,8);c=Q(c,7);return new b(a.a^d.a^c.a,a.b^d.b^c.b)}function ha(c){return q(c,
	17)^q(c,19)^c>>>10}function ia(c){var a=v(c,19),d=v(c,61);c=Q(c,6);return new b(a.a^d.a^c.a,a.b^d.b^c.b)}function B(c,a){var d=(c&65535)+(a&65535);return((c>>>16)+(a>>>16)+(d>>>16)&65535)<<16|d&65535}function ja(c,a,d,b){var f=(c&65535)+(a&65535)+(d&65535)+(b&65535);return((c>>>16)+(a>>>16)+(d>>>16)+(b>>>16)+(f>>>16)&65535)<<16|f&65535}function C(c,a,d,b,f){var e=(c&65535)+(a&65535)+(d&65535)+(b&65535)+(f&65535);return((c>>>16)+(a>>>16)+(d>>>16)+(b>>>16)+(f>>>16)+(e>>>16)&65535)<<16|e&65535}function ka(c,
	a){var d,e,f;d=(c.b&65535)+(a.b&65535);e=(c.b>>>16)+(a.b>>>16)+(d>>>16);f=(e&65535)<<16|d&65535;d=(c.a&65535)+(a.a&65535)+(e>>>16);e=(c.a>>>16)+(a.a>>>16)+(d>>>16);return new b((e&65535)<<16|d&65535,f)}function la(c,a,d,e){var f,k,g;f=(c.b&65535)+(a.b&65535)+(d.b&65535)+(e.b&65535);k=(c.b>>>16)+(a.b>>>16)+(d.b>>>16)+(e.b>>>16)+(f>>>16);g=(k&65535)<<16|f&65535;f=(c.a&65535)+(a.a&65535)+(d.a&65535)+(e.a&65535)+(k>>>16);k=(c.a>>>16)+(a.a>>>16)+(d.a>>>16)+(e.a>>>16)+(f>>>16);return new b((k&65535)<<16|
	f&65535,g)}function ma(c,a,d,e,f){var k,g,l;k=(c.b&65535)+(a.b&65535)+(d.b&65535)+(e.b&65535)+(f.b&65535);g=(c.b>>>16)+(a.b>>>16)+(d.b>>>16)+(e.b>>>16)+(f.b>>>16)+(k>>>16);l=(g&65535)<<16|k&65535;k=(c.a&65535)+(a.a&65535)+(d.a&65535)+(e.a&65535)+(f.a&65535)+(g>>>16);g=(c.a>>>16)+(a.a>>>16)+(d.a>>>16)+(e.a>>>16)+(f.a>>>16)+(k>>>16);return new b((g&65535)<<16|k&65535,l)}function z(c){var a,d;if("SHA-1"===c)c=[1732584193,4023233417,2562383102,271733878,3285377520];else switch(a=[3238371032,914150663,
	812702999,4144912697,4290775857,1750603025,1694076839,3204075428],d=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],c){case "SHA-224":c=a;break;case "SHA-256":c=d;break;case "SHA-384":c=[new b(3418070365,a[0]),new b(1654270250,a[1]),new b(2438529370,a[2]),new b(355462360,a[3]),new b(1731405415,a[4]),new b(41048885895,a[5]),new b(3675008525,a[6]),new b(1203062813,a[7])];break;case "SHA-512":c=[new b(d[0],4089235720),new b(d[1],2227873595),new b(d[2],4271175723),
	new b(d[3],1595750129),new b(d[4],2917565137),new b(d[5],725511199),new b(d[6],4215389547),new b(d[7],327033209)];break;default:throw Error("Unknown SHA variant");}return c}function K(c,a){var d=[],b,e,k,g,l,n,h;b=a[0];e=a[1];k=a[2];g=a[3];l=a[4];for(h=0;80>h;h+=1)d[h]=16>h?c[h]:w(d[h-3]^d[h-8]^d[h-14]^d[h-16],1),n=20>h?C(w(b,5),e&k^~e&g,l,1518500249,d[h]):40>h?C(w(b,5),e^k^g,l,1859775393,d[h]):60>h?C(w(b,5),R(e,k,g),l,2400959708,d[h]):C(w(b,5),e^k^g,l,3395469782,d[h]),l=g,g=k,k=w(e,30),e=b,b=n;a[0]=
	B(b,a[0]);a[1]=B(e,a[1]);a[2]=B(k,a[2]);a[3]=B(g,a[3]);a[4]=B(l,a[4]);return a}function U(c,a,b,e){var f;for(f=(a+65>>>9<<4)+15;c.length<=f;)c.push(0);c[a>>>5]|=128<<24-a%32;c[f]=a+b;b=c.length;for(a=0;a<b;a+=16)e=K(c.slice(a,a+16),e);return e}function L(c,a,d){var q,f,k,g,l,n,h,m,u,r,p,v,t,w,x,y,z,D,E,F,G,H,A=[],I;if("SHA-224"===d||"SHA-256"===d)r=64,v=1,H=Number,t=B,w=ja,x=C,y=fa,z=ha,D=ba,E=da,G=R,F=Y,I=e;else if("SHA-384"===d||"SHA-512"===d)r=80,v=2,H=b,t=ka,w=la,x=ma,y=ga,z=ia,D=ca,E=ea,G=aa,
	F=Z,I=S;else throw Error("Unexpected error in SHA-2 implementation");d=a[0];q=a[1];f=a[2];k=a[3];g=a[4];l=a[5];n=a[6];h=a[7];for(p=0;p<r;p+=1)16>p?(u=p*v,m=c.length<=u?0:c[u],u=c.length<=u+1?0:c[u+1],A[p]=new H(m,u)):A[p]=w(z(A[p-2]),A[p-7],y(A[p-15]),A[p-16]),m=x(h,E(g),F(g,l,n),I[p],A[p]),u=t(D(d),G(d,q,f)),h=n,n=l,l=g,g=t(k,m),k=f,f=q,q=d,d=t(m,u);a[0]=t(d,a[0]);a[1]=t(q,a[1]);a[2]=t(f,a[2]);a[3]=t(k,a[3]);a[4]=t(g,a[4]);a[5]=t(l,a[5]);a[6]=t(n,a[6]);a[7]=t(h,a[7]);return a}var e,S;e=[1116352408,
	1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,
	430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];S=[new b(e[0],3609767458),new b(e[1],602891725),new b(e[2],3964484399),new b(e[3],2173295548),new b(e[4],4081628472),new b(e[5],3053834265),new b(e[6],2937671579),new b(e[7],3664609560),new b(e[8],2734883394),new b(e[9],1164996542),new b(e[10],1323610764),new b(e[11],3590304994),new b(e[12],4068182383),new b(e[13],991336113),new b(e[14],
	633803317),new b(e[15],3479774868),new b(e[16],2666613458),new b(e[17],944711139),new b(e[18],2341262773),new b(e[19],2007800933),new b(e[20],1495990901),new b(e[21],1856431235),new b(e[22],3175218132),new b(e[23],2198950837),new b(e[24],3999719339),new b(e[25],766784016),new b(e[26],2566594879),new b(e[27],3203337956),new b(e[28],1034457026),new b(e[29],2466948901),new b(e[30],3758326383),new b(e[31],168717936),new b(e[32],1188179964),new b(e[33],1546045734),new b(e[34],1522805485),new b(e[35],2643833823),
	new b(e[36],2343527390),new b(e[37],1014477480),new b(e[38],1206759142),new b(e[39],344077627),new b(e[40],1290863460),new b(e[41],3158454273),new b(e[42],3505952657),new b(e[43],106217008),new b(e[44],3606008344),new b(e[45],1432725776),new b(e[46],1467031594),new b(e[47],851169720),new b(e[48],3100823752),new b(e[49],1363258195),new b(e[50],3750685593),new b(e[51],3785050280),new b(e[52],3318307427),new b(e[53],3812723403),new b(e[54],2003034995),new b(e[55],3602036899),new b(e[56],1575990012),
	new b(e[57],1125592928),new b(e[58],2716904306),new b(e[59],442776044),new b(e[60],593698344),new b(e[61],3733110249),new b(e[62],2999351573),new b(e[63],3815920427),new b(3391569614,3928383900),new b(3515267271,566280711),new b(3940187606,3454069534),new b(4118630271,4000239992),new b(116418474,1914138554),new b(174292421,2731055270),new b(289380356,3203993006),new b(460393269,320620315),new b(685471733,587496836),new b(852142971,1086792851),new b(1017036298,365543100),new b(1126000580,2618297676),
	new b(1288033470,3409855158),new b(1501505948,4234509866),new b(1607167915,987167468),new b(1816402316,1246189591)]; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return y}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=y:exports=y:T.jsSHA=y})(this);


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
	        hash: dependency.hash,
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
	
	
	    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);
	
	    this.injectInto = injectInto;
	
	    this.cache = new _cache2.default({
	      appPrefix: config.appPrefix,
	      enableLogging: enableLogging
	    });
	
	    this.cacheDelay = config.cacheDelay || 5000;
	    this.verification = verification;
	
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
	
	      return this.cache.get(urls.printed, undefined, this.hash(urls.hash)).then(function (text) {
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
	
	
	    enableLogging = (0, _url2.default)('dactylographsy-enableLogging', enableLogging);
	
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
	
	      return this.cache.get(urls.printed, undefined, this.hash(urls.hash)).then(function (text) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGRhMTkyNmQ4YjY2MWQ3M2U0YTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vanNzaGEvc3JjL3NoYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7OztBQUVBLHNCQUFXLFFBQVg7O0FBRUEsS0FBSSxPQUFPLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsVUFBTyxjQUFQLEdBQXdCLDZCQUFtQjtBQUN6QyxjQUFTO0FBRGdDLElBQW5CLENBQXhCO0FBR0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNURDs7OztBQUNB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QTtBQUNBLDJHQUEwRzs7QUFFMUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsc0JBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFxQiwrQkFBK0I7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNULHdCQUF1QixRQUFRO0FBQy9COztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBa0UsUUFBUTs7QUFFMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFRO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUMsUUFBUTs7QUFFN0M7O0FBRUEsc0JBQXFCLHdCQUF3QjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsMEJBQXlCLFlBQVk7QUFDckM7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkIsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkI7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCLGtFQUFrRTtBQUN2RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULHVEQUFzRCxnQkFBZ0IsRUFBRTtBQUN4RTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBeUIsd0NBQXdDLEVBQUU7QUFDbkUsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOzs7Ozs7Ozs7QUM3N0JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEEsZ0I7Ozs7OztBQ0FBLDhCQUE2QixtREFBbUQiLCJmaWxlIjoiZGFjdHlsb2dyYXBoc3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRkYTE5MjZkOGI2NjFkNzNlNGE4XG4gKiovIiwiaW1wb3J0IERhY3R5bG9ncmFwaHN5IGZyb20gJy4vZGFjdHlsb2dyYXBoc3knO1xuaW1wb3J0IGVzNlByb21pc2UgZnJvbSAnZXM2LXByb21pc2UnO1xuXG5lczZQcm9taXNlLnBvbHlmaWxsKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZGFjdHlsb2dyYXBoc3kgPSBuZXcgRGFjdHlsb2dyYXBoc3koe1xuICAgIGF1dG9ydW46IHRydWVcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBJbmplY3Rvciwge01hbmlmZXN0fSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFjdHlsb2dyYXBoc3kge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgeyBhdXRvcnVuID0gZmFsc2UgfSA9IG9wdGlvbnMsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuICAgIHRoaXMuaG9va0ludG9Eb20oKTtcbiAgICB0aGlzLnJlYWRDb25maWd1cmF0aW9uKCk7XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogdGhpcy5jb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICBpZiAoYXV0b3J1bikgeyB0aGlzLnJ1bigpOyB9XG4gIH1cblxuICBob29rSW50b0RvbSgpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICAgIHRoaXMuZXhlY3V0aW5nU2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhY3R5bG9ncmFwaHN5Jyk7XG4gICAgdGhpcy5pbmplY3RJbnRvID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgfVxuXG4gIHJlYWRDb25maWd1cmF0aW9uKCkge1xuICAgIHRoaXMubWFuaWZlc3RVcmxzID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdtYW5pZmVzdHMnKTtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnY29uZmlnJyk7XG4gIH1cblxuICByZWZyZXNoKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5tYW5pZmVzdFVybHMubWFwKHVybCA9PiB7XG4gICAgICByZXR1cm4gbmV3IE1hbmlmZXN0KHVybCwgdGhpcy5jb25maWcpLmdldCgpO1xuICAgIH0pKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIGFsbCBtYW5pZmVzdHMsICR7bWFuaWZlc3RzLmxlbmd0aH0gaW4gdG90YWwuYCk7XG5cbiAgICAgIHRoaXMuY2FjaGUuc2V0KG1hbmlmZXN0cywgJ21hbmlmZXN0cycsICdtYW5pZmVzdHMnKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgIHRoaXMuY29uZmlnXG4gICAgICApLmluamVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZShpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KCdtYW5pZmVzdHMnKVxuICAgICAgLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnUmVzb3RyaW5nIHdpdGggbWFuaWZlc3RzIGluIGNhY2hlIGxhdGVyIHJlZnJlc2hpbmcgdmlhIG5ldHdvcmsgKGRlbGF5ZWQpLicpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgICApLmluamVjdCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWFkQXR0ck9uU2NyaXB0KGF0dHIpIHtcbiAgICBpZiAoIXRoaXMuZXhlY3V0aW5nU2NyaXB0KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgbGV0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0XG4gICAgICB0dGwgPSBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktdHRsJywgdGhpcy5jb25maWcudHRsKTtcblxuICAgIGlmICh0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHsgcmV0dXJuIHRoaXMucmVmcmVzaChmYWxzZSk7IH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9yIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZWRNYW5pZmVzdHMgPT09IGZhbHNlIHx8XG4gICAgICAgIHRoaXMuY29uZmlnLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICAgKSA/IHRoaXMucmVmcmVzaCgpIDogdGhpcy5yZXN0b3JlKClcbiAgICAgICAgLnRoZW4oaW5qZWN0ZWRGcm9tQ2FjaGUgPT4ge1xuICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICByZWZyZXNoRGVsYXkgPSA1MDAwXG4gICAgICAgICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGluamVjdGVkRnJvbUNhY2hlKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCByZWZyZXNoRGVsYXkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcbmltcG9ydCBqc1NIQSBmcm9tICdqc3NoYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3RcbiAgICAgIGRlZmF1bHRQcmVmaXggPSAnX19kYWN0eWxvZ3JhcGhzeScsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy5oYXNoZXIgPSBuZXcganNTSEEoJ1NIQS0yNTYnLCAnVEVYVCcpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNhY2hlUHJlZml4ID0gdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4IHx8IGRlZmF1bHRQcmVmaXg7XG4gICAgdGhpcy5pc1N1cHBvcnRlZCA9IHRoaXMuc3VwcG9ydGVkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwcFByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCA9IGAke3RoaXMuY2FjaGVQcmVmaXh9LS0ke3RoaXMub3B0aW9ucy5hcHBQcmVmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggKz0gJ19fJztcbiAgICB9XG4gIH1cblxuICBnZXRQcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVQcmVmaXg7XG4gIH1cblxuICBpc0l0ZW1WYWxpZChjb2RlLCBzaGEyNTYpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgIT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHRoaXMuaGFzaGVyLnVwZGF0ZShjb2RlKVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmhhc2hlci5nZXRIYXNoKCdIRVgnKSA9PT0gc2hhMjU2XG4gICAgKTtcbiAgfVxuXG4gIHBhcnNlKGl0ZW0pIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcbiAgfVxuXG4gIGdldChrZXksIGRlZmF1bHRWYWx1ZSwgc2hhMjU2ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJlamVjdCgpOyB9XG5cbiAgICAgIGxldFxuICAgICAgICBfaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApO1xuXG4gICAgICBpZiAoX2l0ZW0gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoZGVmYXVsdFZhbHVlLCAncGxhaW4nLCBrZXkpO1xuXG4gICAgICAgIHJlc29sdmUoZGVmYXVsdFZhbHVlKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBzaGEyNTYgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgX3BhcnNlZCA9IHRoaXMucGFyc2UoX2l0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZSB3aGljaCBuZWVkcyB2YWxpZGF0aW9uLi4uYCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmFsaWQoX3BhcnNlZC5jb2RlLCBzaGEyNTYpKSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4ubWF0Y2hlcyBleHBlY3RlZCBzaGEyNTYgJHtzaGEyNTZ9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZShfcGFyc2VkLmNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLmRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHNoYTI1NiAke3NoYTI1Nn0gLSBwcnVuaW5nLmApO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMucGFyc2UoX2l0ZW0pLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICByZW1vdmUoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApOztcbiAgfVxuXG4gIHNldChjb2RlLCB0eXBlLCBrZXksIHNpbmd1bGFyQnkgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc2luZ3VsYXJCeSkgeyB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTsgfVxuXG4gICAgbGV0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKCB0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycgKSA/IHNpbmd1bGFyQnkgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY2FjaGVkKVxuICAgICk7XG5cbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXRcbiAgICAgIGl0ZW0gPSAnX19kYWN0eWxvZ3JhcGhzeV9fZmVhdHVyZS1kZXRlY3Rpb24nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW0sIGl0ZW0pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2cud2FybignTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGRhY3R5bG9ncmFwaHN5SXRlbSA9IGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDA7XG4gICAgICBsZXRcbiAgICAgICAgaXRlbTtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHsgY29udGludWU7IH1cblxuICAgICAgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCAodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICkgJiZcbiAgICAgICAgaXRlbS5zaW5ndWxhckJ5ID09PSBzaW5ndWxhckJ5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBEZWR1cGluZyBieSAke3Npbmd1bGFyQnl9IGJlZm9yZSBhZGRpbmcgZHVwZSBpbiAke2tleX0uYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhY2hlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIHtcblxuICAvLyBOb3QgbGV2ZWwgYm91bmQgbG9nZ2luZyBuZWVkZWQgeWV0XG4gIGNvbnN0cnVjdG9yKGVuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcblxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgfVxuXG4gIGxvZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgaW5mbygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5pbmZvKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBkZWJ1ZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5kZWJ1ZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBlcnJvcigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpOyB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvZy5qc1xuICoqLyIsImNvbnN0XG4gIGdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0XG4gICAgICBxdWVyeSA9IHVybCxcbiAgICAgIHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgICBsZXRcbiAgICAgIHBhcmFtcyxcbiAgICAgIG1hdGNoO1xuXG4gICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMocXVlcnkpKSB7XG4gICAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdFxuICAgIHBhcmFtcyA9IGdldFBhcmFtcyh1cmwpO1xuXG4gIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHBhcmFtc1twYXJhbV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW3BhcmFtXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBpZlVuc2V0XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cmwuanNcbiAqKi8iLCIvKlxuIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU0hBIGZhbWlseSBvZiBoYXNoZXMsIGFzXG4gZGVmaW5lZCBpbiBGSVBTIFBVQiAxODAtMiBhcyB3ZWxsIGFzIHRoZSBjb3JyZXNwb25kaW5nIEhNQUMgaW1wbGVtZW50YXRpb25cbiBhcyBkZWZpbmVkIGluIEZJUFMgUFVCIDE5OGFcblxuIENvcHlyaWdodCBCcmlhbiBUdXJlayAyMDA4LTIwMTVcbiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiBTZWUgaHR0cDovL2NhbGlnYXRpby5naXRodWIuY29tL2pzU0hBLyBmb3IgbW9yZSBpbmZvcm1hdGlvblxuXG4gU2V2ZXJhbCBmdW5jdGlvbnMgdGFrZW4gZnJvbSBQYXVsIEpvaG5zdG9uXG4qL1xuJ3VzZSBzdHJpY3QnOyhmdW5jdGlvbihUKXtmdW5jdGlvbiB5KGMsYSxkKXt2YXIgYj0wLGY9W10saz0wLGcsZSxuLGgsbSx1LHIscD0hMSxxPSExLHQ9W10sdj1bXSx4LHc9ITE7ZD1kfHx7fTtnPWQuZW5jb2Rpbmd8fFwiVVRGOFwiO3g9ZC5udW1Sb3VuZHN8fDE7bj1KKGEsZyk7aWYoeCE9PXBhcnNlSW50KHgsMTApfHwxPngpdGhyb3cgRXJyb3IoXCJudW1Sb3VuZHMgbXVzdCBhIGludGVnZXIgPj0gMVwiKTtpZihcIlNIQS0xXCI9PT1jKW09NTEyLHU9SyxyPVUsaD0xNjA7ZWxzZSBpZih1PWZ1bmN0aW9uKGEsZCl7cmV0dXJuIEwoYSxkLGMpfSxyPWZ1bmN0aW9uKGEsZCxiLGYpe3ZhciBrLGU7aWYoXCJTSEEtMjI0XCI9PT1jfHxcIlNIQS0yNTZcIj09PWMpaz0oZCs2NT4+Pjk8PDQpKzE1LGU9MTY7ZWxzZSBpZihcIlNIQS0zODRcIj09PWN8fFwiU0hBLTUxMlwiPT09YylrPShkKzEyOT4+PjEwPDw1KSszMSxlPTMyO2Vsc2UgdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIFNIQS0yIGltcGxlbWVudGF0aW9uXCIpO1xuZm9yKDthLmxlbmd0aDw9azspYS5wdXNoKDApO2FbZD4+PjVdfD0xMjg8PDI0LWQlMzI7YVtrXT1kK2I7Yj1hLmxlbmd0aDtmb3IoZD0wO2Q8YjtkKz1lKWY9TChhLnNsaWNlKGQsZCtlKSxmLGMpO2lmKFwiU0hBLTIyNFwiPT09YylhPVtmWzBdLGZbMV0sZlsyXSxmWzNdLGZbNF0sZls1XSxmWzZdXTtlbHNlIGlmKFwiU0hBLTI1NlwiPT09YylhPWY7ZWxzZSBpZihcIlNIQS0zODRcIj09PWMpYT1bZlswXS5hLGZbMF0uYixmWzFdLmEsZlsxXS5iLGZbMl0uYSxmWzJdLmIsZlszXS5hLGZbM10uYixmWzRdLmEsZls0XS5iLGZbNV0uYSxmWzVdLmJdO2Vsc2UgaWYoXCJTSEEtNTEyXCI9PT1jKWE9W2ZbMF0uYSxmWzBdLmIsZlsxXS5hLGZbMV0uYixmWzJdLmEsZlsyXS5iLGZbM10uYSxmWzNdLmIsZls0XS5hLGZbNF0uYixmWzVdLmEsZls1XS5iLGZbNl0uYSxmWzZdLmIsZls3XS5hLGZbN10uYl07ZWxzZSB0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gU0hBLTIgaW1wbGVtZW50YXRpb25cIik7XG5yZXR1cm4gYX0sXCJTSEEtMjI0XCI9PT1jKW09NTEyLGg9MjI0O2Vsc2UgaWYoXCJTSEEtMjU2XCI9PT1jKW09NTEyLGg9MjU2O2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jKW09MTAyNCxoPTM4NDtlbHNlIGlmKFwiU0hBLTUxMlwiPT09YyltPTEwMjQsaD01MTI7ZWxzZSB0aHJvdyBFcnJvcihcIkNob3NlbiBTSEEgdmFyaWFudCBpcyBub3Qgc3VwcG9ydGVkXCIpO2U9eihjKTt0aGlzLnNldEhNQUNLZXk9ZnVuY3Rpb24oYSxkLGYpe3ZhciBrO2lmKCEwPT09cSl0aHJvdyBFcnJvcihcIkhNQUMga2V5IGFscmVhZHkgc2V0XCIpO2lmKCEwPT09cCl0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgZmluYWxpemluZyBoYXNoXCIpO2lmKCEwPT09dyl0aHJvdyBFcnJvcihcIkNhbm5vdCBzZXQgSE1BQyBrZXkgYWZ0ZXIgY2FsbGluZyB1cGRhdGVcIik7Zz0oZnx8e30pLmVuY29kaW5nfHxcIlVURjhcIjtkPUooZCxnKShhKTthPWQuYmluTGVuO2Q9ZC52YWx1ZTtrPW0+Pj4zO2Y9ay80LTE7aWYoazxcbmEvOCl7Zm9yKGQ9cihkLGEsMCx6KGMpKTtkLmxlbmd0aDw9ZjspZC5wdXNoKDApO2RbZl0mPTQyOTQ5NjcwNDB9ZWxzZSBpZihrPmEvOCl7Zm9yKDtkLmxlbmd0aDw9ZjspZC5wdXNoKDApO2RbZl0mPTQyOTQ5NjcwNDB9Zm9yKGE9MDthPD1mO2ErPTEpdFthXT1kW2FdXjkwOTUyMjQ4Nix2W2FdPWRbYV1eMTU0OTU1NjgyODtlPXUodCxlKTtiPW07cT0hMH07dGhpcy51cGRhdGU9ZnVuY3Rpb24oYSl7dmFyIGMsZCxnLGg9MCxwPW0+Pj41O2M9bihhLGYsayk7YT1jLmJpbkxlbjtkPWMudmFsdWU7Yz1hPj4+NTtmb3IoZz0wO2c8YztnKz1wKWgrbTw9YSYmKGU9dShkLnNsaWNlKGcsZytwKSxlKSxoKz1tKTtiKz1oO2Y9ZC5zbGljZShoPj4+NSk7az1hJW07dz0hMH07dGhpcy5nZXRIYXNoPWZ1bmN0aW9uKGEsZCl7dmFyIGcsbSxuO2lmKCEwPT09cSl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhhc2ggYWZ0ZXIgc2V0dGluZyBITUFDIGtleVwiKTtuPU0oZCk7c3dpdGNoKGEpe2Nhc2UgXCJIRVhcIjpnPVxuZnVuY3Rpb24oYSl7cmV0dXJuIE4oYSxuKX07YnJlYWs7Y2FzZSBcIkI2NFwiOmc9ZnVuY3Rpb24oYSl7cmV0dXJuIE8oYSxuKX07YnJlYWs7Y2FzZSBcIkJZVEVTXCI6Zz1QO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgb3IgQllURVNcIik7fWlmKCExPT09cClmb3IoZT1yKGYsayxiLGUpLG09MTttPHg7bSs9MSllPXIoZSxoLDAseihjKSk7cD0hMDtyZXR1cm4gZyhlKX07dGhpcy5nZXRITUFDPWZ1bmN0aW9uKGEsZCl7dmFyIGcsbix0O2lmKCExPT09cSl0aHJvdyBFcnJvcihcIkNhbm5vdCBjYWxsIGdldEhNQUMgd2l0aG91dCBmaXJzdCBzZXR0aW5nIEhNQUMga2V5XCIpO3Q9TShkKTtzd2l0Y2goYSl7Y2FzZSBcIkhFWFwiOmc9ZnVuY3Rpb24oYSl7cmV0dXJuIE4oYSx0KX07YnJlYWs7Y2FzZSBcIkI2NFwiOmc9ZnVuY3Rpb24oYSl7cmV0dXJuIE8oYSx0KX07YnJlYWs7Y2FzZSBcIkJZVEVTXCI6Zz1QO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJvdXRwdXRGb3JtYXQgbXVzdCBiZSBIRVgsIEI2NCwgb3IgQllURVNcIik7XG59ITE9PT1wJiYobj1yKGYsayxiLGUpLGU9dSh2LHooYykpLGU9cihuLGgsbSxlKSk7cD0hMDtyZXR1cm4gZyhlKX19ZnVuY3Rpb24gYihjLGEpe3RoaXMuYT1jO3RoaXMuYj1hfWZ1bmN0aW9uIFYoYyxhLGQpe3ZhciBiPWMubGVuZ3RoLGYsayxlLGwsbjthPWF8fFswXTtkPWR8fDA7bj1kPj4+MztpZigwIT09YiUyKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIG11c3QgYmUgaW4gYnl0ZSBpbmNyZW1lbnRzXCIpO2ZvcihmPTA7ZjxiO2YrPTIpe2s9cGFyc2VJbnQoYy5zdWJzdHIoZiwyKSwxNik7aWYoaXNOYU4oaykpdGhyb3cgRXJyb3IoXCJTdHJpbmcgb2YgSEVYIHR5cGUgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzXCIpO2w9KGY+Pj4xKStuO2ZvcihlPWw+Pj4yO2EubGVuZ3RoPD1lOylhLnB1c2goMCk7YVtlXXw9azw8OCooMy1sJTQpfXJldHVybnt2YWx1ZTphLGJpbkxlbjo0KmIrZH19ZnVuY3Rpb24gVyhjLGEsZCl7dmFyIGI9W10sZixrLGUsbCxiPWF8fFswXTtkPVxuZHx8MDtrPWQ+Pj4zO2ZvcihmPTA7ZjxjLmxlbmd0aDtmKz0xKWE9Yy5jaGFyQ29kZUF0KGYpLGw9ZitrLGU9bD4+PjIsYi5sZW5ndGg8PWUmJmIucHVzaCgwKSxiW2VdfD1hPDw4KigzLWwlNCk7cmV0dXJue3ZhbHVlOmIsYmluTGVuOjgqYy5sZW5ndGgrZH19ZnVuY3Rpb24gWChjLGEsZCl7dmFyIGI9W10sZj0wLGUsZyxsLG4saCxtLGI9YXx8WzBdO2Q9ZHx8MDthPWQ+Pj4zO2lmKC0xPT09Yy5zZWFyY2goL15bYS16QS1aMC05PStcXC9dKyQvKSl0aHJvdyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIGJhc2UtNjQgc3RyaW5nXCIpO2c9Yy5pbmRleE9mKFwiPVwiKTtjPWMucmVwbGFjZSgvXFw9L2csXCJcIik7aWYoLTEhPT1nJiZnPGMubGVuZ3RoKXRocm93IEVycm9yKFwiSW52YWxpZCAnPScgZm91bmQgaW4gYmFzZS02NCBzdHJpbmdcIik7Zm9yKGc9MDtnPGMubGVuZ3RoO2crPTQpe2g9Yy5zdWJzdHIoZyw0KTtmb3IobD1uPTA7bDxoLmxlbmd0aDtsKz0xKWU9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuaW5kZXhPZihoW2xdKSxcbm58PWU8PDE4LTYqbDtmb3IobD0wO2w8aC5sZW5ndGgtMTtsKz0xKXttPWYrYTtmb3IoZT1tPj4+MjtiLmxlbmd0aDw9ZTspYi5wdXNoKDApO2JbZV18PShuPj4+MTYtOCpsJjI1NSk8PDgqKDMtbSU0KTtmKz0xfX1yZXR1cm57dmFsdWU6YixiaW5MZW46OCpmK2R9fWZ1bmN0aW9uIE4oYyxhKXt2YXIgZD1cIlwiLGI9NCpjLmxlbmd0aCxmLGU7Zm9yKGY9MDtmPGI7Zis9MSllPWNbZj4+PjJdPj4+OCooMy1mJTQpLGQrPVwiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChlPj4+NCYxNSkrXCIwMTIzNDU2Nzg5YWJjZGVmXCIuY2hhckF0KGUmMTUpO3JldHVybiBhLm91dHB1dFVwcGVyP2QudG9VcHBlckNhc2UoKTpkfWZ1bmN0aW9uIE8oYyxhKXt2YXIgZD1cIlwiLGI9NCpjLmxlbmd0aCxmLGUsZztmb3IoZj0wO2Y8YjtmKz0zKWZvcihnPWYrMT4+PjIsZT1jLmxlbmd0aDw9Zz8wOmNbZ10sZz1mKzI+Pj4yLGc9Yy5sZW5ndGg8PWc/MDpjW2ddLGc9KGNbZj4+PjJdPj4+OCooMy1mJTQpJjI1NSk8PDE2fFxuKGU+Pj44KigzLShmKzEpJTQpJjI1NSk8PDh8Zz4+PjgqKDMtKGYrMiklNCkmMjU1LGU9MDs0PmU7ZSs9MSk4KmYrNiplPD0zMipjLmxlbmd0aD9kKz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQoZz4+PjYqKDMtZSkmNjMpOmQrPWEuYjY0UGFkO3JldHVybiBkfWZ1bmN0aW9uIFAoYyl7dmFyIGE9XCJcIixkPTQqYy5sZW5ndGgsYixmO2ZvcihiPTA7YjxkO2IrPTEpZj1jW2I+Pj4yXT4+PjgqKDMtYiU0KSYyNTUsYSs9U3RyaW5nLmZyb21DaGFyQ29kZShmKTtyZXR1cm4gYX1mdW5jdGlvbiBNKGMpe3ZhciBhPXtvdXRwdXRVcHBlcjohMSxiNjRQYWQ6XCI9XCJ9O2M9Y3x8e307YS5vdXRwdXRVcHBlcj1jLm91dHB1dFVwcGVyfHwhMTshMD09PWMuaGFzT3duUHJvcGVydHkoXCJiNjRQYWRcIikmJihhLmI2NFBhZD1jLmI2NFBhZCk7aWYoXCJib29sZWFuXCIhPT10eXBlb2YgYS5vdXRwdXRVcHBlcil0aHJvdyBFcnJvcihcIkludmFsaWQgb3V0cHV0VXBwZXIgZm9ybWF0dGluZyBvcHRpb25cIik7XG5pZihcInN0cmluZ1wiIT09dHlwZW9mIGEuYjY0UGFkKXRocm93IEVycm9yKFwiSW52YWxpZCBiNjRQYWQgZm9ybWF0dGluZyBvcHRpb25cIik7cmV0dXJuIGF9ZnVuY3Rpb24gSihjLGEpe3ZhciBkO3N3aXRjaChhKXtjYXNlIFwiVVRGOFwiOmNhc2UgXCJVVEYxNkJFXCI6Y2FzZSBcIlVURjE2TEVcIjpicmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZW5jb2RpbmcgbXVzdCBiZSBVVEY4LCBVVEYxNkJFLCBvciBVVEYxNkxFXCIpO31zd2l0Y2goYyl7Y2FzZSBcIkhFWFwiOmQ9VjticmVhaztjYXNlIFwiVEVYVFwiOmQ9ZnVuY3Rpb24oYyxkLGIpe3ZhciBlPVtdLGw9W10sbj0wLGgsbSx1LHIscCxlPWR8fFswXTtkPWJ8fDA7dT1kPj4+MztpZihcIlVURjhcIj09PWEpZm9yKGg9MDtoPGMubGVuZ3RoO2grPTEpZm9yKGI9Yy5jaGFyQ29kZUF0KGgpLGw9W10sMTI4PmI/bC5wdXNoKGIpOjIwNDg+Yj8obC5wdXNoKDE5MnxiPj4+NiksbC5wdXNoKDEyOHxiJjYzKSk6NTUyOTY+Ynx8NTczNDQ8PWI/bC5wdXNoKDIyNHxcbmI+Pj4xMiwxMjh8Yj4+PjYmNjMsMTI4fGImNjMpOihoKz0xLGI9NjU1MzYrKChiJjEwMjMpPDwxMHxjLmNoYXJDb2RlQXQoaCkmMTAyMyksbC5wdXNoKDI0MHxiPj4+MTgsMTI4fGI+Pj4xMiY2MywxMjh8Yj4+PjYmNjMsMTI4fGImNjMpKSxtPTA7bTxsLmxlbmd0aDttKz0xKXtwPW4rdTtmb3Iocj1wPj4+MjtlLmxlbmd0aDw9cjspZS5wdXNoKDApO2Vbcl18PWxbbV08PDgqKDMtcCU0KTtuKz0xfWVsc2UgaWYoXCJVVEYxNkJFXCI9PT1hfHxcIlVURjE2TEVcIj09PWEpZm9yKGg9MDtoPGMubGVuZ3RoO2grPTEpe2I9Yy5jaGFyQ29kZUF0KGgpO1wiVVRGMTZMRVwiPT09YSYmKG09YiYyNTUsYj1tPDw4fGI+Pj44KTtwPW4rdTtmb3Iocj1wPj4+MjtlLmxlbmd0aDw9cjspZS5wdXNoKDApO2Vbcl18PWI8PDgqKDItcCU0KTtuKz0yfXJldHVybnt2YWx1ZTplLGJpbkxlbjo4Km4rZH19O2JyZWFrO2Nhc2UgXCJCNjRcIjpkPVg7YnJlYWs7Y2FzZSBcIkJZVEVTXCI6ZD1XO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJmb3JtYXQgbXVzdCBiZSBIRVgsIFRFWFQsIEI2NCwgb3IgQllURVNcIik7XG59cmV0dXJuIGR9ZnVuY3Rpb24gdyhjLGEpe3JldHVybiBjPDxhfGM+Pj4zMi1hfWZ1bmN0aW9uIHEoYyxhKXtyZXR1cm4gYz4+PmF8Yzw8MzItYX1mdW5jdGlvbiB2KGMsYSl7dmFyIGQ9bnVsbCxkPW5ldyBiKGMuYSxjLmIpO3JldHVybiBkPTMyPj1hP25ldyBiKGQuYT4+PmF8ZC5iPDwzMi1hJjQyOTQ5NjcyOTUsZC5iPj4+YXxkLmE8PDMyLWEmNDI5NDk2NzI5NSk6bmV3IGIoZC5iPj4+YS0zMnxkLmE8PDY0LWEmNDI5NDk2NzI5NSxkLmE+Pj5hLTMyfGQuYjw8NjQtYSY0Mjk0OTY3Mjk1KX1mdW5jdGlvbiBRKGMsYSl7dmFyIGQ9bnVsbDtyZXR1cm4gZD0zMj49YT9uZXcgYihjLmE+Pj5hLGMuYj4+PmF8Yy5hPDwzMi1hJjQyOTQ5NjcyOTUpOm5ldyBiKDAsYy5hPj4+YS0zMil9ZnVuY3Rpb24gWShjLGEsZCl7cmV0dXJuIGMmYV5+YyZkfWZ1bmN0aW9uIFooYyxhLGQpe3JldHVybiBuZXcgYihjLmEmYS5hXn5jLmEmZC5hLGMuYiZhLmJefmMuYiZkLmIpfWZ1bmN0aW9uIFIoYyxhLGQpe3JldHVybiBjJlxuYV5jJmReYSZkfWZ1bmN0aW9uIGFhKGMsYSxkKXtyZXR1cm4gbmV3IGIoYy5hJmEuYV5jLmEmZC5hXmEuYSZkLmEsYy5iJmEuYl5jLmImZC5iXmEuYiZkLmIpfWZ1bmN0aW9uIGJhKGMpe3JldHVybiBxKGMsMilecShjLDEzKV5xKGMsMjIpfWZ1bmN0aW9uIGNhKGMpe3ZhciBhPXYoYywyOCksZD12KGMsMzQpO2M9dihjLDM5KTtyZXR1cm4gbmV3IGIoYS5hXmQuYV5jLmEsYS5iXmQuYl5jLmIpfWZ1bmN0aW9uIGRhKGMpe3JldHVybiBxKGMsNilecShjLDExKV5xKGMsMjUpfWZ1bmN0aW9uIGVhKGMpe3ZhciBhPXYoYywxNCksZD12KGMsMTgpO2M9dihjLDQxKTtyZXR1cm4gbmV3IGIoYS5hXmQuYV5jLmEsYS5iXmQuYl5jLmIpfWZ1bmN0aW9uIGZhKGMpe3JldHVybiBxKGMsNylecShjLDE4KV5jPj4+M31mdW5jdGlvbiBnYShjKXt2YXIgYT12KGMsMSksZD12KGMsOCk7Yz1RKGMsNyk7cmV0dXJuIG5ldyBiKGEuYV5kLmFeYy5hLGEuYl5kLmJeYy5iKX1mdW5jdGlvbiBoYShjKXtyZXR1cm4gcShjLFxuMTcpXnEoYywxOSleYz4+PjEwfWZ1bmN0aW9uIGlhKGMpe3ZhciBhPXYoYywxOSksZD12KGMsNjEpO2M9UShjLDYpO3JldHVybiBuZXcgYihhLmFeZC5hXmMuYSxhLmJeZC5iXmMuYil9ZnVuY3Rpb24gQihjLGEpe3ZhciBkPShjJjY1NTM1KSsoYSY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhkPj4+MTYpJjY1NTM1KTw8MTZ8ZCY2NTUzNX1mdW5jdGlvbiBqYShjLGEsZCxiKXt2YXIgZj0oYyY2NTUzNSkrKGEmNjU1MzUpKyhkJjY1NTM1KSsoYiY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhkPj4+MTYpKyhiPj4+MTYpKyhmPj4+MTYpJjY1NTM1KTw8MTZ8ZiY2NTUzNX1mdW5jdGlvbiBDKGMsYSxkLGIsZil7dmFyIGU9KGMmNjU1MzUpKyhhJjY1NTM1KSsoZCY2NTUzNSkrKGImNjU1MzUpKyhmJjY1NTM1KTtyZXR1cm4oKGM+Pj4xNikrKGE+Pj4xNikrKGQ+Pj4xNikrKGI+Pj4xNikrKGY+Pj4xNikrKGU+Pj4xNikmNjU1MzUpPDwxNnxlJjY1NTM1fWZ1bmN0aW9uIGthKGMsXG5hKXt2YXIgZCxlLGY7ZD0oYy5iJjY1NTM1KSsoYS5iJjY1NTM1KTtlPShjLmI+Pj4xNikrKGEuYj4+PjE2KSsoZD4+PjE2KTtmPShlJjY1NTM1KTw8MTZ8ZCY2NTUzNTtkPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhlPj4+MTYpO2U9KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkPj4+MTYpO3JldHVybiBuZXcgYigoZSY2NTUzNSk8PDE2fGQmNjU1MzUsZil9ZnVuY3Rpb24gbGEoYyxhLGQsZSl7dmFyIGYsayxnO2Y9KGMuYiY2NTUzNSkrKGEuYiY2NTUzNSkrKGQuYiY2NTUzNSkrKGUuYiY2NTUzNSk7az0oYy5iPj4+MTYpKyhhLmI+Pj4xNikrKGQuYj4+PjE2KSsoZS5iPj4+MTYpKyhmPj4+MTYpO2c9KGsmNjU1MzUpPDwxNnxmJjY1NTM1O2Y9KGMuYSY2NTUzNSkrKGEuYSY2NTUzNSkrKGQuYSY2NTUzNSkrKGUuYSY2NTUzNSkrKGs+Pj4xNik7az0oYy5hPj4+MTYpKyhhLmE+Pj4xNikrKGQuYT4+PjE2KSsoZS5hPj4+MTYpKyhmPj4+MTYpO3JldHVybiBuZXcgYigoayY2NTUzNSk8PDE2fFxuZiY2NTUzNSxnKX1mdW5jdGlvbiBtYShjLGEsZCxlLGYpe3ZhciBrLGcsbDtrPShjLmImNjU1MzUpKyhhLmImNjU1MzUpKyhkLmImNjU1MzUpKyhlLmImNjU1MzUpKyhmLmImNjU1MzUpO2c9KGMuYj4+PjE2KSsoYS5iPj4+MTYpKyhkLmI+Pj4xNikrKGUuYj4+PjE2KSsoZi5iPj4+MTYpKyhrPj4+MTYpO2w9KGcmNjU1MzUpPDwxNnxrJjY1NTM1O2s9KGMuYSY2NTUzNSkrKGEuYSY2NTUzNSkrKGQuYSY2NTUzNSkrKGUuYSY2NTUzNSkrKGYuYSY2NTUzNSkrKGc+Pj4xNik7Zz0oYy5hPj4+MTYpKyhhLmE+Pj4xNikrKGQuYT4+PjE2KSsoZS5hPj4+MTYpKyhmLmE+Pj4xNikrKGs+Pj4xNik7cmV0dXJuIG5ldyBiKChnJjY1NTM1KTw8MTZ8ayY2NTUzNSxsKX1mdW5jdGlvbiB6KGMpe3ZhciBhLGQ7aWYoXCJTSEEtMVwiPT09YyljPVsxNzMyNTg0MTkzLDQwMjMyMzM0MTcsMjU2MjM4MzEwMiwyNzE3MzM4NzgsMzI4NTM3NzUyMF07ZWxzZSBzd2l0Y2goYT1bMzIzODM3MTAzMiw5MTQxNTA2NjMsXG44MTI3MDI5OTksNDE0NDkxMjY5Nyw0MjkwNzc1ODU3LDE3NTA2MDMwMjUsMTY5NDA3NjgzOSwzMjA0MDc1NDI4XSxkPVsxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNV0sYyl7Y2FzZSBcIlNIQS0yMjRcIjpjPWE7YnJlYWs7Y2FzZSBcIlNIQS0yNTZcIjpjPWQ7YnJlYWs7Y2FzZSBcIlNIQS0zODRcIjpjPVtuZXcgYigzNDE4MDcwMzY1LGFbMF0pLG5ldyBiKDE2NTQyNzAyNTAsYVsxXSksbmV3IGIoMjQzODUyOTM3MCxhWzJdKSxuZXcgYigzNTU0NjIzNjAsYVszXSksbmV3IGIoMTczMTQwNTQxNSxhWzRdKSxuZXcgYig0MTA0ODg4NTg5NSxhWzVdKSxuZXcgYigzNjc1MDA4NTI1LGFbNl0pLG5ldyBiKDEyMDMwNjI4MTMsYVs3XSldO2JyZWFrO2Nhc2UgXCJTSEEtNTEyXCI6Yz1bbmV3IGIoZFswXSw0MDg5MjM1NzIwKSxuZXcgYihkWzFdLDIyMjc4NzM1OTUpLG5ldyBiKGRbMl0sNDI3MTE3NTcyMyksXG5uZXcgYihkWzNdLDE1OTU3NTAxMjkpLG5ldyBiKGRbNF0sMjkxNzU2NTEzNyksbmV3IGIoZFs1XSw3MjU1MTExOTkpLG5ldyBiKGRbNl0sNDIxNTM4OTU0NyksbmV3IGIoZFs3XSwzMjcwMzMyMDkpXTticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiVW5rbm93biBTSEEgdmFyaWFudFwiKTt9cmV0dXJuIGN9ZnVuY3Rpb24gSyhjLGEpe3ZhciBkPVtdLGIsZSxrLGcsbCxuLGg7Yj1hWzBdO2U9YVsxXTtrPWFbMl07Zz1hWzNdO2w9YVs0XTtmb3IoaD0wOzgwPmg7aCs9MSlkW2hdPTE2Pmg/Y1toXTp3KGRbaC0zXV5kW2gtOF1eZFtoLTE0XV5kW2gtMTZdLDEpLG49MjA+aD9DKHcoYiw1KSxlJmtefmUmZyxsLDE1MTg1MDAyNDksZFtoXSk6NDA+aD9DKHcoYiw1KSxlXmteZyxsLDE4NTk3NzUzOTMsZFtoXSk6NjA+aD9DKHcoYiw1KSxSKGUsayxnKSxsLDI0MDA5NTk3MDgsZFtoXSk6Qyh3KGIsNSksZV5rXmcsbCwzMzk1NDY5NzgyLGRbaF0pLGw9ZyxnPWssaz13KGUsMzApLGU9YixiPW47YVswXT1cbkIoYixhWzBdKTthWzFdPUIoZSxhWzFdKTthWzJdPUIoayxhWzJdKTthWzNdPUIoZyxhWzNdKTthWzRdPUIobCxhWzRdKTtyZXR1cm4gYX1mdW5jdGlvbiBVKGMsYSxiLGUpe3ZhciBmO2ZvcihmPShhKzY1Pj4+OTw8NCkrMTU7Yy5sZW5ndGg8PWY7KWMucHVzaCgwKTtjW2E+Pj41XXw9MTI4PDwyNC1hJTMyO2NbZl09YStiO2I9Yy5sZW5ndGg7Zm9yKGE9MDthPGI7YSs9MTYpZT1LKGMuc2xpY2UoYSxhKzE2KSxlKTtyZXR1cm4gZX1mdW5jdGlvbiBMKGMsYSxkKXt2YXIgcSxmLGssZyxsLG4saCxtLHUscixwLHYsdCx3LHgseSx6LEQsRSxGLEcsSCxBPVtdLEk7aWYoXCJTSEEtMjI0XCI9PT1kfHxcIlNIQS0yNTZcIj09PWQpcj02NCx2PTEsSD1OdW1iZXIsdD1CLHc9amEseD1DLHk9ZmEsej1oYSxEPWJhLEU9ZGEsRz1SLEY9WSxJPWU7ZWxzZSBpZihcIlNIQS0zODRcIj09PWR8fFwiU0hBLTUxMlwiPT09ZClyPTgwLHY9MixIPWIsdD1rYSx3PWxhLHg9bWEseT1nYSx6PWlhLEQ9Y2EsRT1lYSxHPWFhLFxuRj1aLEk9UztlbHNlIHRocm93IEVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBTSEEtMiBpbXBsZW1lbnRhdGlvblwiKTtkPWFbMF07cT1hWzFdO2Y9YVsyXTtrPWFbM107Zz1hWzRdO2w9YVs1XTtuPWFbNl07aD1hWzddO2ZvcihwPTA7cDxyO3ArPTEpMTY+cD8odT1wKnYsbT1jLmxlbmd0aDw9dT8wOmNbdV0sdT1jLmxlbmd0aDw9dSsxPzA6Y1t1KzFdLEFbcF09bmV3IEgobSx1KSk6QVtwXT13KHooQVtwLTJdKSxBW3AtN10seShBW3AtMTVdKSxBW3AtMTZdKSxtPXgoaCxFKGcpLEYoZyxsLG4pLElbcF0sQVtwXSksdT10KEQoZCksRyhkLHEsZikpLGg9bixuPWwsbD1nLGc9dChrLG0pLGs9ZixmPXEscT1kLGQ9dChtLHUpO2FbMF09dChkLGFbMF0pO2FbMV09dChxLGFbMV0pO2FbMl09dChmLGFbMl0pO2FbM109dChrLGFbM10pO2FbNF09dChnLGFbNF0pO2FbNV09dChsLGFbNV0pO2FbNl09dChuLGFbNl0pO2FbN109dChoLGFbN10pO3JldHVybiBhfXZhciBlLFM7ZT1bMTExNjM1MjQwOCxcbjE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsXG40MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OF07Uz1bbmV3IGIoZVswXSwzNjA5NzY3NDU4KSxuZXcgYihlWzFdLDYwMjg5MTcyNSksbmV3IGIoZVsyXSwzOTY0NDg0Mzk5KSxuZXcgYihlWzNdLDIxNzMyOTU1NDgpLG5ldyBiKGVbNF0sNDA4MTYyODQ3MiksbmV3IGIoZVs1XSwzMDUzODM0MjY1KSxuZXcgYihlWzZdLDI5Mzc2NzE1NzkpLG5ldyBiKGVbN10sMzY2NDYwOTU2MCksbmV3IGIoZVs4XSwyNzM0ODgzMzk0KSxuZXcgYihlWzldLDExNjQ5OTY1NDIpLG5ldyBiKGVbMTBdLDEzMjM2MTA3NjQpLG5ldyBiKGVbMTFdLDM1OTAzMDQ5OTQpLG5ldyBiKGVbMTJdLDQwNjgxODIzODMpLG5ldyBiKGVbMTNdLDk5MTMzNjExMyksbmV3IGIoZVsxNF0sXG42MzM4MDMzMTcpLG5ldyBiKGVbMTVdLDM0Nzk3NzQ4NjgpLG5ldyBiKGVbMTZdLDI2NjY2MTM0NTgpLG5ldyBiKGVbMTddLDk0NDcxMTEzOSksbmV3IGIoZVsxOF0sMjM0MTI2Mjc3MyksbmV3IGIoZVsxOV0sMjAwNzgwMDkzMyksbmV3IGIoZVsyMF0sMTQ5NTk5MDkwMSksbmV3IGIoZVsyMV0sMTg1NjQzMTIzNSksbmV3IGIoZVsyMl0sMzE3NTIxODEzMiksbmV3IGIoZVsyM10sMjE5ODk1MDgzNyksbmV3IGIoZVsyNF0sMzk5OTcxOTMzOSksbmV3IGIoZVsyNV0sNzY2Nzg0MDE2KSxuZXcgYihlWzI2XSwyNTY2NTk0ODc5KSxuZXcgYihlWzI3XSwzMjAzMzM3OTU2KSxuZXcgYihlWzI4XSwxMDM0NDU3MDI2KSxuZXcgYihlWzI5XSwyNDY2OTQ4OTAxKSxuZXcgYihlWzMwXSwzNzU4MzI2MzgzKSxuZXcgYihlWzMxXSwxNjg3MTc5MzYpLG5ldyBiKGVbMzJdLDExODgxNzk5NjQpLG5ldyBiKGVbMzNdLDE1NDYwNDU3MzQpLG5ldyBiKGVbMzRdLDE1MjI4MDU0ODUpLG5ldyBiKGVbMzVdLDI2NDM4MzM4MjMpLFxubmV3IGIoZVszNl0sMjM0MzUyNzM5MCksbmV3IGIoZVszN10sMTAxNDQ3NzQ4MCksbmV3IGIoZVszOF0sMTIwNjc1OTE0MiksbmV3IGIoZVszOV0sMzQ0MDc3NjI3KSxuZXcgYihlWzQwXSwxMjkwODYzNDYwKSxuZXcgYihlWzQxXSwzMTU4NDU0MjczKSxuZXcgYihlWzQyXSwzNTA1OTUyNjU3KSxuZXcgYihlWzQzXSwxMDYyMTcwMDgpLG5ldyBiKGVbNDRdLDM2MDYwMDgzNDQpLG5ldyBiKGVbNDVdLDE0MzI3MjU3NzYpLG5ldyBiKGVbNDZdLDE0NjcwMzE1OTQpLG5ldyBiKGVbNDddLDg1MTE2OTcyMCksbmV3IGIoZVs0OF0sMzEwMDgyMzc1MiksbmV3IGIoZVs0OV0sMTM2MzI1ODE5NSksbmV3IGIoZVs1MF0sMzc1MDY4NTU5MyksbmV3IGIoZVs1MV0sMzc4NTA1MDI4MCksbmV3IGIoZVs1Ml0sMzMxODMwNzQyNyksbmV3IGIoZVs1M10sMzgxMjcyMzQwMyksbmV3IGIoZVs1NF0sMjAwMzAzNDk5NSksbmV3IGIoZVs1NV0sMzYwMjAzNjg5OSksbmV3IGIoZVs1Nl0sMTU3NTk5MDAxMiksXG5uZXcgYihlWzU3XSwxMTI1NTkyOTI4KSxuZXcgYihlWzU4XSwyNzE2OTA0MzA2KSxuZXcgYihlWzU5XSw0NDI3NzYwNDQpLG5ldyBiKGVbNjBdLDU5MzY5ODM0NCksbmV3IGIoZVs2MV0sMzczMzExMDI0OSksbmV3IGIoZVs2Ml0sMjk5OTM1MTU3MyksbmV3IGIoZVs2M10sMzgxNTkyMDQyNyksbmV3IGIoMzM5MTU2OTYxNCwzOTI4MzgzOTAwKSxuZXcgYigzNTE1MjY3MjcxLDU2NjI4MDcxMSksbmV3IGIoMzk0MDE4NzYwNiwzNDU0MDY5NTM0KSxuZXcgYig0MTE4NjMwMjcxLDQwMDAyMzk5OTIpLG5ldyBiKDExNjQxODQ3NCwxOTE0MTM4NTU0KSxuZXcgYigxNzQyOTI0MjEsMjczMTA1NTI3MCksbmV3IGIoMjg5MzgwMzU2LDMyMDM5OTMwMDYpLG5ldyBiKDQ2MDM5MzI2OSwzMjA2MjAzMTUpLG5ldyBiKDY4NTQ3MTczMyw1ODc0OTY4MzYpLG5ldyBiKDg1MjE0Mjk3MSwxMDg2NzkyODUxKSxuZXcgYigxMDE3MDM2Mjk4LDM2NTU0MzEwMCksbmV3IGIoMTEyNjAwMDU4MCwyNjE4Mjk3Njc2KSxcbm5ldyBiKDEyODgwMzM0NzAsMzQwOTg1NTE1OCksbmV3IGIoMTUwMTUwNTk0OCw0MjM0NTA5ODY2KSxuZXcgYigxNjA3MTY3OTE1LDk4NzE2NzQ2OCksbmV3IGIoMTgxNjQwMjMxNiwxMjQ2MTg5NTkxKV07XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4geX0pOlwidW5kZWZpbmVkXCIhPT10eXBlb2YgZXhwb3J0cz9cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZXhwb3J0cz15OmV4cG9ydHM9eTpULmpzU0hBPXl9KSh0aGlzKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2pzc2hhL3NyYy9zaGEuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge0NzcywgSnN9IGZyb20gJy4vZG9tJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBjbGFzcyBNYW5pZmVzdCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgY29uZmlnKSB7XG4gICAgY29uc3QgeyBlbmFibGVMb2dnaW5nID0gZmFsc2UgfSA9IGNvbmZpZztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgIC5nZXQodGhpcy51cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0LFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVcmxcbiAgICAgICAgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgbWFuaWZlc3QgZnJvbSB1cmw6ICR7cmVzcG9uc2VVcmx9LmApO1xuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XG4gICAgICB9LCB4aHIgPT4ge1xuICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGQgbm90IGZldGNoIG1hbmlmZXN0IHdpdGggdXJsOiAke3hoci5yZXNwb25zZVVSTH0hYCk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIG1hbmlmZXN0cywgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlXG4gICAgfSA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMubWFuaWZlc3RzID0ge307XG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIG1hbmlmZXN0cy5mb3JFYWNoKG1hbmlmZXN0ID0+IHsgdGhpcy5tYW5pZmVzdHNbbWFuaWZlc3QucGFja2FnZV0gPSBtYW5pZmVzdDsgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gICAgdGhpcy5vcmRlciA9IG9wdGlvbnMub3JkZXI7XG4gIH1cblxuICBpbmplY3QoKSB7XG4gICAgY29uc3RcbiAgICAgIGZsYXR0ZW4gPSBsaXN0ID0+IGxpc3QucmVkdWNlKFxuICAgICAgICAoYSwgYikgPT4gYS5jb25jYXQoQXJyYXkuaXNBcnJheShiKSA/IGZsYXR0ZW4oYikgOiBiKSwgW11cbiAgICAgICksXG4gICAgICBpbmplY3RJbnRvRE9NID0gKGRlcGVuZGVuY2llcywgaWR4ID0gMCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtID0gZGVwZW5kZW5jaWVzW2lkeF07XG5cbiAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnKSkge1xuICAgICAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oJ0luamVjdGluZyB0YWc6JywgZWxlbSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykgeyB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7IH1cblxuICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICB0aGlzLm9yZGVyLm1hcChfcGFja2FnZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKSB7XG4gICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkblxcJ3QgZmluZCBwYWNrYWdlICR7X3BhY2thZ2V9IGZyb20gaW5qZWN0aW9uIG9yZGVyLmApO1xuXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0TWFuaWZlc3QodGhpcy5tYW5pZmVzdHNbX3BhY2thZ2VdKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IGZsYXR0ZW4obWFuaWZlc3RzKTtcblxuICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMpO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlcGVuZGVuY2llcyk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RNYW5pZmVzdChtYW5pZmVzdCkge1xuICAgIGxldFxuICAgICAgaGFzaGVzID0gT2JqZWN0LmtleXMobWFuaWZlc3QuaGFzaGVzKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChoYXNoZXMubWFwKGhhc2ggPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGRlcGVuZGVuY3kgPSBtYW5pZmVzdC5oYXNoZXNbaGFzaF0sXG4gICAgICAgIHJvb3RVcmw7XG5cbiAgICAgIHJvb3RVcmwgPSBbbWFuaWZlc3Qucm9vdFVybCwgbWFuaWZlc3QucGFja2FnZVVybF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH0pLmpvaW4oJy8nKTtcblxuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0RGVwZW5kZW5jeShcbiAgICAgICAgZGVwZW5kZW5jeSxcbiAgICAgICAgcm9vdFVybFxuICAgICAgKTtcbiAgICB9KSk7XG4gIH1cblxuICBpbmplY3REZXBlbmRlbmN5KGRlcGVuZGVuY3ksIHJvb3RVcmwpIHtcbiAgICBzd2l0Y2ggKGRlcGVuZGVuY3kuZXh0ZW5zaW9uKSB7XG4gICAgICBjYXNlICcuY3NzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBDc3MoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJy5qcyc6XG4gICAgICAgIHJldHVybiBuZXcgSnMoXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApLmluamVjdChcbiAgICAgICAgICB0aGlzLnVybHMoZGVwZW5kZW5jeSwgcm9vdFVybClcbiAgICAgICAgKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYmFzZW5hbWUocGF0aCkge1xuICAgIHJldHVybiBwYXRoLnJlcGxhY2UoLy4qXFwvfFxcLlteLl0qJC9nLCAnJyk7XG4gIH1cblxuICB1cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwgPSAnJykge1xuICAgIGxldFxuICAgICAgYmFzZW5hbWUgPSB0aGlzLmJhc2VuYW1lKGRlcGVuZGVuY3kuZmlsZSksXG4gICAgICB1cmw7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHBvdGVudGlhbCBudWxsIHZhbHVlc1xuICAgIC8vIHBhc3NlZCBpbiBhcyB2YXJpb3VzIHBhcnRzIG9mIGFuIHVybC5cbiAgICB1cmwgPSBbdGhpcy5wcmVmaXgsIHJvb3RVcmwsIGRlcGVuZGVuY3kucGF0aF0uZmlsdGVyKF91cmwgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIF91cmwgIT09IG51bGxcbiAgICAgICk7XG4gICAgfSkuam9pbignLycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc2g6IGRlcGVuZGVuY3kuaGFzaCxcbiAgICAgIHByaW50ZWQ6IGAvJHt1cmx9LyR7YmFzZW5hbWV9LSR7ZGVwZW5kZW5jeS5oYXNofSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHJhdzogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICBzaW5ndWxhckJ5OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YFxuICAgIH07XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luamVjdG9yLmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGNsYXNzIEpzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXgsXG4gICAgICBlbmFibGVMb2dnaW5nOiBlbmFibGVMb2dnaW5nXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgaW5qZWN0V2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHRleHQgZm9yICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBzY3JpcHQudGV4dCA9IGBcbiAgICAgICAgJHt0ZXh0fVxuICAgICAgICAvLyMgc291cmNlVVJMPSR7dXJsfVxuICAgICAgYDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUoc2NyaXB0KTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIC8vIENyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGl0cyB0eXBlXG4gICAgICBsZXRcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBzY3JpcHQuYXN5bmMgPSBmYWxzZTtcbiAgICAgIHNjcmlwdC5kZWZlciA9IGZhbHNlO1xuXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWpzJywgdHJ1ZSk7XG5cbiAgICAgIC8vIEJpbmQgdG8gcmVhZHlTdGF0ZSBvciByZWdpc3RlciDCtG9ubG9hZMK0IGNhbGxiYWNrXG4gICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpIHtcbiAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIElFJ3MgYG9ucmVhZHlzdGF0ZWNoYW5nZWAgKEkgZmVlbCBzZWVzaWNrKVxuICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRlZCcgfHwgc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJpbmQgYG9ubG9hZGAgY2FsbGJhY2sgb24gc2NyaXB0IGVsZW1lbnRcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpOyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW5qZWN0IHVucHJpbnRlZCB3aXRob3V0IGNhY2hpbmcgaW4gY2FzZSBvZiBlcnJvclxuICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggSmF2YVNjcmlwdCBmcm9tICR7dXJsfSAtIGZhbGxpbmcgYmFjayB0byB1bnByaW50ZWQgdmVyc2lvbi5gKTtcblxuICAgICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzLCAncmF3Jyk7IH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgc2NyaXB0LnNyYyA9IHVybDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChzY3JpcHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIC4uLm5lZWRzIGNhY2hpbmcgbWFudWFsbHkgY2F1c2UgbmV2ZXIgaW5qZWN0ZWRcbiAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXNvbHZlKCk7IH1cblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIEphdmFTY3JpcHQgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnanMnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIEphdmFTY3JpcHQgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgKSA/IGhhc2ggOiBmYWxzZVxuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5oYXNoKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFRleHQodGV4dCwgdXJscy5wcmludGVkKTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVXJsKHVybHMpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3Mge1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBjb25maWcgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2UsXG4gICAgICB2ZXJpZmljYXRpb24gPSBmYWxzZVxuICAgIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogY29uZmlnLmFwcFByZWZpeFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGVuc3VyZUNhY2hlKHVybCwgc2luZ3VsYXJCeSA9IGZhbHNlLCBkZWxheSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7IHJlc29sdmUoKTsgfVxuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkaW5nIENTUyBmcm9tICR7dXJsfSBmb3IgY2FjaGUgaW4gJHtkZWxheX0uYCk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChyZXNwb25zZVRleHQsICdjc3MnLCB1cmwsIHNpbmd1bGFyQnkpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgQ1NTIGZyb20gJHt1cmx9IG5vdyBjYWNoZWQuYCk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGYWlsZWQgYXR0ZW1wdGluZyB0byBjYWNoZSBDU1MgZnJvbSAke3VybH0uYCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVXJsKHVybHMsIHdoaWNoVXJsID0gJ3ByaW50ZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyksXG4gICAgICAgIHVybCA9IHVybHNbd2hpY2hVcmxdO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtY3NzJywgdHJ1ZSk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcblxuICAgICAgLy8gRmFsbGJhY2sgdG8gdW5wcmludGVkIGFzc2V0cyBhZnRlciBjYWNoZSBhdHRlbXB0XG4gICAgICAvLyBubyBjYWxsYmFja3MgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9ucyAodGltZW91dHMgYXJlIHdvcnNlLi4uKVxuICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZCBub3QgZmV0Y2ggQ1NTIGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChsaW5rKSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKGxpbmspOyB9XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdGV4dCBmb3IgdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzaChoYXNoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgKSA/IGhhc2ggOiBmYWxzZVxuICB9XG5cbiAgaW5qZWN0KHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoXG4gICAgICB1cmxzLnByaW50ZWQsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICB0aGlzLmhhc2godXJscy5oYXNoKVxuICAgICkudGhlbih0ZXh0ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZG9tLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBnZXQodXJsLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgIC8vIFhIUiBmb3IgQ2hyb21lL0ZpcmVmb3gvT3BlcmEvU2FmYXJpLlxuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBmb3IgSUUuXG4gICAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENPUlMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgeGhyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25zZSBoYW5kbGVycy5cbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgeGhyOiB4aHIsXG4gICAgICAgICAgICB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgdXJsOiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYWpheC5qc1xuICoqLyIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9qYWtlYXJjaGliYWxkL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDMuMi4xXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNNYXliZVRoZW5hYmxlKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheSA9IGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPSAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkdmVydHhOZXh0O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm47XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuXSA9IGNhbGxiYWNrO1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2xpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKyAxXSA9IGFyZztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gKz0gMjtcbiAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID09PSAyKSB7XG4gICAgICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAgICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcChhc2FwRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gYXNhcEZuO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgfHwge307XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4gICAgLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgLy8gbm9kZVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpIHtcbiAgICAgIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2sobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmVydHhcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2ViIHdvcmtlclxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCwgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuOyBpKz0yKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXTtcbiAgICAgICAgdmFyIGFyZyA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdO1xuXG4gICAgICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByID0gcmVxdWlyZTtcbiAgICAgICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaDtcbiAgICAvLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgICAgIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoY2hpbGRbbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUFJPTUlTRV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRtYWtlUHJvbWlzZShjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbc3RhdGUgLSAxXTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlKG9iamVjdCkge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmU7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBST01JU0VfSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMTYpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCgpIHt9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAgID0gdm9pZCAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgPSAxO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAgPSAyO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkY2Fubm90UmV0dXJuT3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHByb21pc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICAgICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0sIHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gICAgICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbikge1xuICAgICAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICB0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgIGNvbnN0cnVjdG9yLnJlc29sdmUgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHRoZW4pKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgICAgIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQ7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaCwgcHJvbWlzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7IHJldHVybjsgfVxuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICAgICAgdmFyIGxlbmd0aCA9IHN1YnNjcmliZXJzLmxlbmd0aDtcblxuICAgICAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoICsgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRF0gID0gb25SZWplY3Rpb247XG5cbiAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwYXJlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gocHJvbWlzZSkge1xuICAgICAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICB2YXIgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdmFyIGhhc0NhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgICAgICB2YWx1ZSwgZXJyb3IsIHN1Y2NlZWRlZCwgZmFpbGVkO1xuXG4gICAgICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICAgICAgdmFsdWUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgICAgICBpZiAodmFsdWUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZGV0YWlsO1xuICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgICAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpZCA9IDA7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbmV4dElkKCkge1xuICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGlkKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbWFrZVByb21pc2UocHJvbWlzZSkge1xuICAgICAgcHJvbWlzZVtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGlkKys7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGwoZW50cmllcykge1xuICAgICAgcmV0dXJuIG5ldyBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGw7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZShlbnRyaWVzKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgaWYgKCFsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkoZW50cmllcykpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2U7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3QocmVhc29uKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0O1xuXG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlO1xuICAgIC8qKlxuICAgICAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgICAgIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICAgICAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIFRlcm1pbm9sb2d5XG4gICAgICAtLS0tLS0tLS0tLVxuXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAgICAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAgICAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gICAgICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gICAgICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICAgICAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gICAgICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICAgICAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgICAgIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICAgICAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gICAgICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gICAgICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gICAgICBCYXNpYyBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBgYGBqc1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gb24gc3VjY2Vzc1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICAvLyBvbiBmYWlsdXJlXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS0tLS1cblxuICAgICAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICAgICAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gICAgICBgYGBqc1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICAgICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBjbGFzcyBQcm9taXNlXG4gICAgICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZShyZXNvbHZlcikge1xuICAgICAgdGhpc1tsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5leHRJZCgpO1xuICAgICAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCk7XG4gICAgICAgIHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSA/IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLmFsbCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yYWNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZXNvbHZlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZWplY3QgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldFNjaGVkdWxlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXI7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldEFzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fYXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwO1xuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucHJvdG90eXBlID0ge1xuICAgICAgY29uc3RydWN0b3I6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLFxuXG4gICAgLyoqXG4gICAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQ2hhaW5pbmdcbiAgICAgIC0tLS0tLS0tXG5cbiAgICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgICAgfSk7XG5cbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICAgIH0pO1xuICAgICAgYGBgXG4gICAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBc3NpbWlsYXRpb25cbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgU2ltcGxlIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgYXV0aG9yLCBib29rcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG5cbiAgICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcblxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuXG4gICAgICB9XG5cbiAgICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZEF1dGhvcigpLlxuICAgICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIHRoZW5cbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICB0aGVuOiBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCxcblxuICAgIC8qKlxuICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHN5bmNocm9ub3VzXG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQXV0aG9yKCk7XG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfVxuXG4gICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgY2F0Y2hcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoIXRoaXMucHJvbWlzZVtsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQUk9NSVNFX0lEXSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGlucHV0KSkge1xuICAgICAgICB0aGlzLl9pbnB1dCAgICAgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5sZW5ndGggICAgID0gaW5wdXQubGVuZ3RoO1xuICAgICAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICAgICAgdGhpcy5fZW51bWVyYXRlKCk7XG4gICAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QodGhpcy5wcm9taXNlLCBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCR2YWxpZGF0aW9uRXJyb3IoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxlbmd0aCAgPSB0aGlzLmxlbmd0aDtcbiAgICAgIHZhciBpbnB1dCAgID0gdGhpcy5faW5wdXQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbihlbnRyeSwgaSkge1xuICAgICAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICAgICAgdmFyIHJlc29sdmUgPSBjLnJlc29sdmU7XG5cbiAgICAgIGlmIChyZXNvbHZlID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRkZWZhdWx0KSB7XG4gICAgICAgIHZhciB0aGVuID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZ2V0VGhlbihlbnRyeSk7XG5cbiAgICAgICAgaWYgKHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ICYmXG4gICAgICAgICAgICBlbnRyeS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgICAgICB9IGVsc2UgaWYgKGMgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0KSB7XG4gICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIGVudHJ5LCB0aGVuKTtcbiAgICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQocHJvbWlzZSwgaSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uKHJlc29sdmUpIHsgcmVzb2x2ZShlbnRyeSk7IH0pLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHJlc29sdmUoZW50cnkpLCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbihzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICAgICAgaWYgKHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24ocHJvbWlzZSwgaSkge1xuICAgICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVELCBpLCByZWFzb24pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsKCkge1xuICAgICAgdmFyIGxvY2FsO1xuXG4gICAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IGdsb2JhbDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgICBpZiAoUCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvY2FsLlByb21pc2UgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdDtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGw7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZSA9IHtcbiAgICAgICdQcm9taXNlJzogbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQsXG4gICAgICAncG9seWZpbGwnOiBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHRcbiAgICB9O1xuXG4gICAgLyogZ2xvYmFsIGRlZmluZTp0cnVlIG1vZHVsZTp0cnVlIHdpbmRvdzogdHJ1ZSAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7IH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlWydleHBvcnRzJ10pIHtcbiAgICAgIG1vZHVsZVsnZXhwb3J0cyddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1snRVM2UHJvbWlzZSddID0gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTtcbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQoKTtcbn0pLmNhbGwodGhpcyk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIHZlcnR4IChpZ25vcmVkKVxuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7IH07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9