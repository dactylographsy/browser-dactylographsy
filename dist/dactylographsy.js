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
         * @version   3.1.2
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

              if (Array.isArray(input)) {
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
                lib$es6$promise$$internal$$reject(this.promise, this._validationError());
              }
            }

            lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
              return new Error('Array Methods must be provided an Array');
            };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBkNmRlM2MwYjFkM2JhYzFkMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vanNzaGEvc3JjL3NoYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5qZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9+L2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0Esc0JBQVcsUUFBWDs7QUFFQSxLQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixFQUErQjtBQUNqQyxVQUFPLGNBQVAsR0FBd0IsNkJBQW1CO0FBQ3pDLGNBQVMsSUFBVDtJQURzQixDQUF4QixDQURpQzs7Ozs7Ozs7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QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNULHdCQUF1QixRQUFRO0FBQy9COztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBa0UsUUFBUTs7QUFFMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFRO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUMsUUFBUTs7QUFFN0M7O0FBRUEsc0JBQXFCLHdCQUF3QjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFxQixxRUFBcUU7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEEsZ0I7Ozs7OztBQ0FBLDhCQUE2QixtREFBbUQiLCJmaWxlIjoiZGFjdHlsb2dyYXBoc3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMwZDZkZTNjMGIxZDNiYWMxZDE5XG4gKiovIiwiaW1wb3J0IERhY3R5bG9ncmFwaHN5IGZyb20gJy4vZGFjdHlsb2dyYXBoc3knO1xuaW1wb3J0IGVzNlByb21pc2UgZnJvbSAnZXM2LXByb21pc2UnO1xuXG5lczZQcm9taXNlLnBvbHlmaWxsKCk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZGFjdHlsb2dyYXBoc3kgPSBuZXcgRGFjdHlsb2dyYXBoc3koe1xuICAgIGF1dG9ydW46IHRydWVcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBJbmplY3Rvciwge01hbmlmZXN0fSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFjdHlsb2dyYXBoc3kge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgeyBhdXRvcnVuID0gZmFsc2UgfSA9IG9wdGlvbnMsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuICAgIHRoaXMuaG9va0ludG9Eb20oKTtcbiAgICB0aGlzLnJlYWRDb25maWd1cmF0aW9uKCk7XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogdGhpcy5jb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICBpZiAoYXV0b3J1bikgeyB0aGlzLnJ1bigpOyB9XG4gIH1cblxuICBob29rSW50b0RvbSgpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICAgIHRoaXMuZXhlY3V0aW5nU2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhY3R5bG9ncmFwaHN5Jyk7XG4gICAgdGhpcy5pbmplY3RJbnRvID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgfVxuXG4gIHJlYWRDb25maWd1cmF0aW9uKCkge1xuICAgIHRoaXMubWFuaWZlc3RVcmxzID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdtYW5pZmVzdHMnKTtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMucmVhZEF0dHJPblNjcmlwdCgnY29uZmlnJyk7XG4gIH1cblxuICByZWZyZXNoKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGhpcy5tYW5pZmVzdFVybHMubWFwKHVybCA9PiB7XG4gICAgICByZXR1cm4gbmV3IE1hbmlmZXN0KHVybCwgdGhpcy5jb25maWcpLmdldCgpO1xuICAgIH0pKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIGFsbCBtYW5pZmVzdHMsICR7bWFuaWZlc3RzLmxlbmd0aH0gaW4gdG90YWwuYCk7XG5cbiAgICAgIHRoaXMuY2FjaGUuc2V0KG1hbmlmZXN0cywgJ21hbmlmZXN0cycsICdtYW5pZmVzdHMnKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICBtYW5pZmVzdHMsXG4gICAgICAgIHRoaXMuY29uZmlnXG4gICAgICApLmluamVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZShpbmplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KCdtYW5pZmVzdHMnKVxuICAgICAgLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnUmVzb3RyaW5nIHdpdGggbWFuaWZlc3RzIGluIGNhY2hlIGxhdGVyIHJlZnJlc2hpbmcgdmlhIG5ldHdvcmsgKGRlbGF5ZWQpLicpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSW5qZWN0b3IoXG4gICAgICAgICAgaW5qZWN0ID8gdGhpcy5pbmplY3RJbnRvIDogdW5kZWZpbmVkLFxuICAgICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgICB0aGlzLmNvbmZpZ1xuICAgICAgICApLmluamVjdCgpO1xuICAgICAgfSk7XG4gIH1cblxuICByZWFkQXR0ck9uU2NyaXB0KGF0dHIpIHtcbiAgICBpZiAoIXRoaXMuZXhlY3V0aW5nU2NyaXB0KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgbGV0IF9hdHRyID0gdGhpcy5leGVjdXRpbmdTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcblxuICAgIHJldHVybiBfYXR0ciA/IEpTT04ucGFyc2UoX2F0dHIpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGNvbnN0XG4gICAgICB0dGwgPSBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktdHRsJywgdGhpcy5jb25maWcudHRsKTtcblxuICAgIGlmICh0dGwpIHtcbiAgICAgIHRoaXMuY2FjaGUuZ2V0KCdjbHQnLCAwKVxuICAgICAgICAudGhlbihjbHQgPT4ge1xuICAgICAgICAgIGlmIChjbHQgPj0gdHRsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGbHVzaGluZyBjYWNoZSBkdWUgdG8gZXhlZWRpbmcgVFRMIG9mICR7dHRsfS5gKTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5mbHVzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCgrK2NsdCwgJ3BsYWluJywgJ2NsdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2hpbmcgbWVhbnMgZmV0Y2hpbmcgYWxsIG1hbmlmZXN0cyB3aXRob3V0IGluamVjdGluZ1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYWNoZU9ubHkpIHsgcmV0dXJuIHRoaXMucmVmcmVzaChmYWxzZSk7IH1cbiAgICAvLyAuLi5lbHNlIHJlc3RvcmUgb3IgcmVmcmVzaCB0aGUgYXBwICh3aXRoIGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMpXG4gICAgZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgdGhlIGNvbmZpZ3VyYXRpb24gb2Ygbm9uIGNhY2hlZFxuICAgICAgLy8gbWFuaWZlc3RzIG9yIHJlcXVlc3RlZCBidW5kbGUgdmVyaWZpY2F0aW9uXG4gICAgICAvLyBmb3JjZXMgYSByZWZyZXNoIG9yIGFsbCBtYW5pZmVzdHMuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZWRNYW5pZmVzdHMgPT09IGZhbHNlIHx8XG4gICAgICAgIHRoaXMuY29uZmlnLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICAgKSA/IHRoaXMucmVmcmVzaCgpIDogdGhpcy5yZXN0b3JlKClcbiAgICAgICAgLnRoZW4oaW5qZWN0ZWRGcm9tQ2FjaGUgPT4ge1xuICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICByZWZyZXNoRGVsYXkgPSA1MDAwXG4gICAgICAgICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGluamVjdGVkRnJvbUNhY2hlKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCByZWZyZXNoRGVsYXkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oJ05vIG1hbmlmZXN0cyBpbiBjYWNoZSwgcmVmcmVzaGluZyB2aWEgbmV0d29yay4nKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kYWN0eWxvZ3JhcGhzeS5qc1xuICoqLyIsImltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcbmltcG9ydCBqc1NIQSBmcm9tICdqc3NoYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhY2hlIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3RcbiAgICAgIGRlZmF1bHRQcmVmaXggPSAnX19kYWN0eWxvZ3JhcGhzeScsXG4gICAgICB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy5oYXNoZXIgPSBuZXcganNTSEEoJ1NIQS0yNTYnLCAnVEVYVCcpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNhY2hlUHJlZml4ID0gdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4IHx8IGRlZmF1bHRQcmVmaXg7XG4gICAgdGhpcy5pc1N1cHBvcnRlZCA9IHRoaXMuc3VwcG9ydGVkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwcFByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCA9IGAke3RoaXMuY2FjaGVQcmVmaXh9LS0ke3RoaXMub3B0aW9ucy5hcHBQcmVmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggKz0gJ19fJztcbiAgICB9XG4gIH1cblxuICBnZXRQcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVQcmVmaXg7XG4gIH1cblxuICBpc0l0ZW1WYWxpZChjb2RlLCBzaGEyNTYpIHtcbiAgICBpZiAodHlwZW9mIGNvZGUgIT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHRoaXMuaGFzaGVyLnVwZGF0ZShjb2RlKVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmhhc2hlci5nZXRIYXNoKCdIRVgnKSA9PT0gc2hhMjU2XG4gICAgKTtcbiAgfVxuXG4gIHBhcnNlKGl0ZW0pIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcbiAgfVxuXG4gIGdldChrZXksIGRlZmF1bHRWYWx1ZSwgc2hhMjU2ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJlamVjdCgpOyB9XG5cbiAgICAgIGxldFxuICAgICAgICBfaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApO1xuXG4gICAgICBpZiAoX2l0ZW0gPT09IG51bGwgJiYgZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoZGVmYXVsdFZhbHVlLCAncGxhaW4nLCBrZXkpO1xuXG4gICAgICAgIHJlc29sdmUoZGVmYXVsdFZhbHVlKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBzaGEyNTYgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgX3BhcnNlZCA9IHRoaXMucGFyc2UoX2l0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZSB3aGljaCBuZWVkcyB2YWxpZGF0aW9uLi4uYCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmFsaWQoX3BhcnNlZC5jb2RlLCBzaGEyNTYpKSB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgLi4ubWF0Y2hlcyBleHBlY3RlZCBzaGEyNTYgJHtzaGEyNTZ9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZShfcGFyc2VkLmNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLmRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHNoYTI1NiAke3NoYTI1Nn0gLSBwcnVuaW5nLmApO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMucGFyc2UoX2l0ZW0pLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICByZW1vdmUoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApOztcbiAgfVxuXG4gIHNldChjb2RlLCB0eXBlLCBrZXksIHNpbmd1bGFyQnkgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc2luZ3VsYXJCeSkgeyB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTsgfVxuXG4gICAgbGV0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKCB0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycgKSA/IHNpbmd1bGFyQnkgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY2FjaGVkKVxuICAgICk7XG5cbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXRcbiAgICAgIGl0ZW0gPSAnX19kYWN0eWxvZ3JhcGhzeV9fZmVhdHVyZS1kZXRlY3Rpb24nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW0sIGl0ZW0pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2cud2FybignTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGRhY3R5bG9ncmFwaHN5SXRlbSA9IGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDA7XG4gICAgICBsZXRcbiAgICAgICAgaXRlbTtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHsgY29udGludWU7IH1cblxuICAgICAgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCAodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICkgJiZcbiAgICAgICAgaXRlbS5zaW5ndWxhckJ5ID09PSBzaW5ndWxhckJ5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBEZWR1cGluZyBieSAke3Npbmd1bGFyQnl9IGJlZm9yZSBhZGRpbmcgZHVwZSBpbiAke2tleX0uYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhY2hlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIHtcblxuICAvLyBOb3QgbGV2ZWwgYm91bmQgbG9nZ2luZyBuZWVkZWQgeWV0XG4gIGNvbnN0cnVjdG9yKGVuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcblxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgfVxuXG4gIGxvZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgaW5mbygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5pbmZvKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBkZWJ1ZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5kZWJ1ZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBlcnJvcigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpOyB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvZy5qc1xuICoqLyIsImNvbnN0XG4gIGdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0XG4gICAgICBxdWVyeSA9IHVybCxcbiAgICAgIHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgICBsZXRcbiAgICAgIHBhcmFtcyxcbiAgICAgIG1hdGNoO1xuXG4gICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMocXVlcnkpKSB7XG4gICAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdFxuICAgIHBhcmFtcyA9IGdldFBhcmFtcyh1cmwpO1xuXG4gIHJldHVybiBwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pID8gcGFyYW1zW3BhcmFtXSA6IGlmVW5zZXQ7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXJsLmpzXG4gKiovIiwiLypcbiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNIQSBmYW1pbHkgb2YgaGFzaGVzLCBhc1xuIGRlZmluZWQgaW4gRklQUyBQVUIgMTgwLTIgYXMgd2VsbCBhcyB0aGUgY29ycmVzcG9uZGluZyBITUFDIGltcGxlbWVudGF0aW9uXG4gYXMgZGVmaW5lZCBpbiBGSVBTIFBVQiAxOThhXG5cbiBDb3B5cmlnaHQgQnJpYW4gVHVyZWsgMjAwOC0yMDE1XG4gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gU2VlIGh0dHA6Ly9jYWxpZ2F0aW8uZ2l0aHViLmNvbS9qc1NIQS8gZm9yIG1vcmUgaW5mb3JtYXRpb25cblxuIFNldmVyYWwgZnVuY3Rpb25zIHRha2VuIGZyb20gUGF1bCBKb2huc3RvblxuKi9cbid1c2Ugc3RyaWN0JzsoZnVuY3Rpb24oVCl7ZnVuY3Rpb24geShjLGEsZCl7dmFyIGI9MCxmPVtdLGs9MCxnLGUsbixoLG0sdSxyLHA9ITEscT0hMSx0PVtdLHY9W10seCx3PSExO2Q9ZHx8e307Zz1kLmVuY29kaW5nfHxcIlVURjhcIjt4PWQubnVtUm91bmRzfHwxO249SihhLGcpO2lmKHghPT1wYXJzZUludCh4LDEwKXx8MT54KXRocm93IEVycm9yKFwibnVtUm91bmRzIG11c3QgYSBpbnRlZ2VyID49IDFcIik7aWYoXCJTSEEtMVwiPT09YyltPTUxMix1PUsscj1VLGg9MTYwO2Vsc2UgaWYodT1mdW5jdGlvbihhLGQpe3JldHVybiBMKGEsZCxjKX0scj1mdW5jdGlvbihhLGQsYixmKXt2YXIgayxlO2lmKFwiU0hBLTIyNFwiPT09Y3x8XCJTSEEtMjU2XCI9PT1jKWs9KGQrNjU+Pj45PDw0KSsxNSxlPTE2O2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jfHxcIlNIQS01MTJcIj09PWMpaz0oZCsxMjk+Pj4xMDw8NSkrMzEsZT0zMjtlbHNlIHRocm93IEVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBTSEEtMiBpbXBsZW1lbnRhdGlvblwiKTtcbmZvcig7YS5sZW5ndGg8PWs7KWEucHVzaCgwKTthW2Q+Pj41XXw9MTI4PDwyNC1kJTMyO2Fba109ZCtiO2I9YS5sZW5ndGg7Zm9yKGQ9MDtkPGI7ZCs9ZSlmPUwoYS5zbGljZShkLGQrZSksZixjKTtpZihcIlNIQS0yMjRcIj09PWMpYT1bZlswXSxmWzFdLGZbMl0sZlszXSxmWzRdLGZbNV0sZls2XV07ZWxzZSBpZihcIlNIQS0yNTZcIj09PWMpYT1mO2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1jKWE9W2ZbMF0uYSxmWzBdLmIsZlsxXS5hLGZbMV0uYixmWzJdLmEsZlsyXS5iLGZbM10uYSxmWzNdLmIsZls0XS5hLGZbNF0uYixmWzVdLmEsZls1XS5iXTtlbHNlIGlmKFwiU0hBLTUxMlwiPT09YylhPVtmWzBdLmEsZlswXS5iLGZbMV0uYSxmWzFdLmIsZlsyXS5hLGZbMl0uYixmWzNdLmEsZlszXS5iLGZbNF0uYSxmWzRdLmIsZls1XS5hLGZbNV0uYixmWzZdLmEsZls2XS5iLGZbN10uYSxmWzddLmJdO2Vsc2UgdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIFNIQS0yIGltcGxlbWVudGF0aW9uXCIpO1xucmV0dXJuIGF9LFwiU0hBLTIyNFwiPT09YyltPTUxMixoPTIyNDtlbHNlIGlmKFwiU0hBLTI1NlwiPT09YyltPTUxMixoPTI1NjtlbHNlIGlmKFwiU0hBLTM4NFwiPT09YyltPTEwMjQsaD0zODQ7ZWxzZSBpZihcIlNIQS01MTJcIj09PWMpbT0xMDI0LGg9NTEyO2Vsc2UgdGhyb3cgRXJyb3IoXCJDaG9zZW4gU0hBIHZhcmlhbnQgaXMgbm90IHN1cHBvcnRlZFwiKTtlPXooYyk7dGhpcy5zZXRITUFDS2V5PWZ1bmN0aW9uKGEsZCxmKXt2YXIgaztpZighMD09PXEpdGhyb3cgRXJyb3IoXCJITUFDIGtleSBhbHJlYWR5IHNldFwiKTtpZighMD09PXApdGhyb3cgRXJyb3IoXCJDYW5ub3Qgc2V0IEhNQUMga2V5IGFmdGVyIGZpbmFsaXppbmcgaGFzaFwiKTtpZighMD09PXcpdGhyb3cgRXJyb3IoXCJDYW5ub3Qgc2V0IEhNQUMga2V5IGFmdGVyIGNhbGxpbmcgdXBkYXRlXCIpO2c9KGZ8fHt9KS5lbmNvZGluZ3x8XCJVVEY4XCI7ZD1KKGQsZykoYSk7YT1kLmJpbkxlbjtkPWQudmFsdWU7az1tPj4+MztmPWsvNC0xO2lmKGs8XG5hLzgpe2ZvcihkPXIoZCxhLDAseihjKSk7ZC5sZW5ndGg8PWY7KWQucHVzaCgwKTtkW2ZdJj00Mjk0OTY3MDQwfWVsc2UgaWYoaz5hLzgpe2Zvcig7ZC5sZW5ndGg8PWY7KWQucHVzaCgwKTtkW2ZdJj00Mjk0OTY3MDQwfWZvcihhPTA7YTw9ZjthKz0xKXRbYV09ZFthXV45MDk1MjI0ODYsdlthXT1kW2FdXjE1NDk1NTY4Mjg7ZT11KHQsZSk7Yj1tO3E9ITB9O3RoaXMudXBkYXRlPWZ1bmN0aW9uKGEpe3ZhciBjLGQsZyxoPTAscD1tPj4+NTtjPW4oYSxmLGspO2E9Yy5iaW5MZW47ZD1jLnZhbHVlO2M9YT4+PjU7Zm9yKGc9MDtnPGM7Zys9cCloK208PWEmJihlPXUoZC5zbGljZShnLGcrcCksZSksaCs9bSk7Yis9aDtmPWQuc2xpY2UoaD4+PjUpO2s9YSVtO3c9ITB9O3RoaXMuZ2V0SGFzaD1mdW5jdGlvbihhLGQpe3ZhciBnLG0sbjtpZighMD09PXEpdGhyb3cgRXJyb3IoXCJDYW5ub3QgY2FsbCBnZXRIYXNoIGFmdGVyIHNldHRpbmcgSE1BQyBrZXlcIik7bj1NKGQpO3N3aXRjaChhKXtjYXNlIFwiSEVYXCI6Zz1cbmZ1bmN0aW9uKGEpe3JldHVybiBOKGEsbil9O2JyZWFrO2Nhc2UgXCJCNjRcIjpnPWZ1bmN0aW9uKGEpe3JldHVybiBPKGEsbil9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmc9UDticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIG9yIEJZVEVTXCIpO31pZighMT09PXApZm9yKGU9cihmLGssYixlKSxtPTE7bTx4O20rPTEpZT1yKGUsaCwwLHooYykpO3A9ITA7cmV0dXJuIGcoZSl9O3RoaXMuZ2V0SE1BQz1mdW5jdGlvbihhLGQpe3ZhciBnLG4sdDtpZighMT09PXEpdGhyb3cgRXJyb3IoXCJDYW5ub3QgY2FsbCBnZXRITUFDIHdpdGhvdXQgZmlyc3Qgc2V0dGluZyBITUFDIGtleVwiKTt0PU0oZCk7c3dpdGNoKGEpe2Nhc2UgXCJIRVhcIjpnPWZ1bmN0aW9uKGEpe3JldHVybiBOKGEsdCl9O2JyZWFrO2Nhc2UgXCJCNjRcIjpnPWZ1bmN0aW9uKGEpe3JldHVybiBPKGEsdCl9O2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmc9UDticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwib3V0cHV0Rm9ybWF0IG11c3QgYmUgSEVYLCBCNjQsIG9yIEJZVEVTXCIpO1xufSExPT09cCYmKG49cihmLGssYixlKSxlPXUodix6KGMpKSxlPXIobixoLG0sZSkpO3A9ITA7cmV0dXJuIGcoZSl9fWZ1bmN0aW9uIGIoYyxhKXt0aGlzLmE9Yzt0aGlzLmI9YX1mdW5jdGlvbiBWKGMsYSxkKXt2YXIgYj1jLmxlbmd0aCxmLGssZSxsLG47YT1hfHxbMF07ZD1kfHwwO249ZD4+PjM7aWYoMCE9PWIlMil0aHJvdyBFcnJvcihcIlN0cmluZyBvZiBIRVggdHlwZSBtdXN0IGJlIGluIGJ5dGUgaW5jcmVtZW50c1wiKTtmb3IoZj0wO2Y8YjtmKz0yKXtrPXBhcnNlSW50KGMuc3Vic3RyKGYsMiksMTYpO2lmKGlzTmFOKGspKXRocm93IEVycm9yKFwiU3RyaW5nIG9mIEhFWCB0eXBlIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVyc1wiKTtsPShmPj4+MSkrbjtmb3IoZT1sPj4+MjthLmxlbmd0aDw9ZTspYS5wdXNoKDApO2FbZV18PWs8PDgqKDMtbCU0KX1yZXR1cm57dmFsdWU6YSxiaW5MZW46NCpiK2R9fWZ1bmN0aW9uIFcoYyxhLGQpe3ZhciBiPVtdLGYsayxlLGwsYj1hfHxbMF07ZD1cbmR8fDA7az1kPj4+Mztmb3IoZj0wO2Y8Yy5sZW5ndGg7Zis9MSlhPWMuY2hhckNvZGVBdChmKSxsPWYrayxlPWw+Pj4yLGIubGVuZ3RoPD1lJiZiLnB1c2goMCksYltlXXw9YTw8OCooMy1sJTQpO3JldHVybnt2YWx1ZTpiLGJpbkxlbjo4KmMubGVuZ3RoK2R9fWZ1bmN0aW9uIFgoYyxhLGQpe3ZhciBiPVtdLGY9MCxlLGcsbCxuLGgsbSxiPWF8fFswXTtkPWR8fDA7YT1kPj4+MztpZigtMT09PWMuc2VhcmNoKC9eW2EtekEtWjAtOT0rXFwvXSskLykpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBiYXNlLTY0IHN0cmluZ1wiKTtnPWMuaW5kZXhPZihcIj1cIik7Yz1jLnJlcGxhY2UoL1xcPS9nLFwiXCIpO2lmKC0xIT09ZyYmZzxjLmxlbmd0aCl0aHJvdyBFcnJvcihcIkludmFsaWQgJz0nIGZvdW5kIGluIGJhc2UtNjQgc3RyaW5nXCIpO2ZvcihnPTA7ZzxjLmxlbmd0aDtnKz00KXtoPWMuc3Vic3RyKGcsNCk7Zm9yKGw9bj0wO2w8aC5sZW5ndGg7bCs9MSllPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmluZGV4T2YoaFtsXSksXG5ufD1lPDwxOC02Kmw7Zm9yKGw9MDtsPGgubGVuZ3RoLTE7bCs9MSl7bT1mK2E7Zm9yKGU9bT4+PjI7Yi5sZW5ndGg8PWU7KWIucHVzaCgwKTtiW2VdfD0obj4+PjE2LTgqbCYyNTUpPDw4KigzLW0lNCk7Zis9MX19cmV0dXJue3ZhbHVlOmIsYmluTGVuOjgqZitkfX1mdW5jdGlvbiBOKGMsYSl7dmFyIGQ9XCJcIixiPTQqYy5sZW5ndGgsZixlO2ZvcihmPTA7ZjxiO2YrPTEpZT1jW2Y+Pj4yXT4+PjgqKDMtZiU0KSxkKz1cIjAxMjM0NTY3ODlhYmNkZWZcIi5jaGFyQXQoZT4+PjQmMTUpK1wiMDEyMzQ1Njc4OWFiY2RlZlwiLmNoYXJBdChlJjE1KTtyZXR1cm4gYS5vdXRwdXRVcHBlcj9kLnRvVXBwZXJDYXNlKCk6ZH1mdW5jdGlvbiBPKGMsYSl7dmFyIGQ9XCJcIixiPTQqYy5sZW5ndGgsZixlLGc7Zm9yKGY9MDtmPGI7Zis9Mylmb3IoZz1mKzE+Pj4yLGU9Yy5sZW5ndGg8PWc/MDpjW2ddLGc9ZisyPj4+MixnPWMubGVuZ3RoPD1nPzA6Y1tnXSxnPShjW2Y+Pj4yXT4+PjgqKDMtZiU0KSYyNTUpPDwxNnxcbihlPj4+OCooMy0oZisxKSU0KSYyNTUpPDw4fGc+Pj44KigzLShmKzIpJTQpJjI1NSxlPTA7ND5lO2UrPTEpOCpmKzYqZTw9MzIqYy5sZW5ndGg/ZCs9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuY2hhckF0KGc+Pj42KigzLWUpJjYzKTpkKz1hLmI2NFBhZDtyZXR1cm4gZH1mdW5jdGlvbiBQKGMpe3ZhciBhPVwiXCIsZD00KmMubGVuZ3RoLGIsZjtmb3IoYj0wO2I8ZDtiKz0xKWY9Y1tiPj4+Ml0+Pj44KigzLWIlNCkmMjU1LGErPVN0cmluZy5mcm9tQ2hhckNvZGUoZik7cmV0dXJuIGF9ZnVuY3Rpb24gTShjKXt2YXIgYT17b3V0cHV0VXBwZXI6ITEsYjY0UGFkOlwiPVwifTtjPWN8fHt9O2Eub3V0cHV0VXBwZXI9Yy5vdXRwdXRVcHBlcnx8ITE7ITA9PT1jLmhhc093blByb3BlcnR5KFwiYjY0UGFkXCIpJiYoYS5iNjRQYWQ9Yy5iNjRQYWQpO2lmKFwiYm9vbGVhblwiIT09dHlwZW9mIGEub3V0cHV0VXBwZXIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG91dHB1dFVwcGVyIGZvcm1hdHRpbmcgb3B0aW9uXCIpO1xuaWYoXCJzdHJpbmdcIiE9PXR5cGVvZiBhLmI2NFBhZCl0aHJvdyBFcnJvcihcIkludmFsaWQgYjY0UGFkIGZvcm1hdHRpbmcgb3B0aW9uXCIpO3JldHVybiBhfWZ1bmN0aW9uIEooYyxhKXt2YXIgZDtzd2l0Y2goYSl7Y2FzZSBcIlVURjhcIjpjYXNlIFwiVVRGMTZCRVwiOmNhc2UgXCJVVEYxNkxFXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcImVuY29kaW5nIG11c3QgYmUgVVRGOCwgVVRGMTZCRSwgb3IgVVRGMTZMRVwiKTt9c3dpdGNoKGMpe2Nhc2UgXCJIRVhcIjpkPVY7YnJlYWs7Y2FzZSBcIlRFWFRcIjpkPWZ1bmN0aW9uKGMsZCxiKXt2YXIgZT1bXSxsPVtdLG49MCxoLG0sdSxyLHAsZT1kfHxbMF07ZD1ifHwwO3U9ZD4+PjM7aWYoXCJVVEY4XCI9PT1hKWZvcihoPTA7aDxjLmxlbmd0aDtoKz0xKWZvcihiPWMuY2hhckNvZGVBdChoKSxsPVtdLDEyOD5iP2wucHVzaChiKToyMDQ4PmI/KGwucHVzaCgxOTJ8Yj4+PjYpLGwucHVzaCgxMjh8YiY2MykpOjU1Mjk2PmJ8fDU3MzQ0PD1iP2wucHVzaCgyMjR8XG5iPj4+MTIsMTI4fGI+Pj42JjYzLDEyOHxiJjYzKTooaCs9MSxiPTY1NTM2KygoYiYxMDIzKTw8MTB8Yy5jaGFyQ29kZUF0KGgpJjEwMjMpLGwucHVzaCgyNDB8Yj4+PjE4LDEyOHxiPj4+MTImNjMsMTI4fGI+Pj42JjYzLDEyOHxiJjYzKSksbT0wO208bC5sZW5ndGg7bSs9MSl7cD1uK3U7Zm9yKHI9cD4+PjI7ZS5sZW5ndGg8PXI7KWUucHVzaCgwKTtlW3JdfD1sW21dPDw4KigzLXAlNCk7bis9MX1lbHNlIGlmKFwiVVRGMTZCRVwiPT09YXx8XCJVVEYxNkxFXCI9PT1hKWZvcihoPTA7aDxjLmxlbmd0aDtoKz0xKXtiPWMuY2hhckNvZGVBdChoKTtcIlVURjE2TEVcIj09PWEmJihtPWImMjU1LGI9bTw8OHxiPj4+OCk7cD1uK3U7Zm9yKHI9cD4+PjI7ZS5sZW5ndGg8PXI7KWUucHVzaCgwKTtlW3JdfD1iPDw4KigyLXAlNCk7bis9Mn1yZXR1cm57dmFsdWU6ZSxiaW5MZW46OCpuK2R9fTticmVhaztjYXNlIFwiQjY0XCI6ZD1YO2JyZWFrO2Nhc2UgXCJCWVRFU1wiOmQ9VzticmVhaztkZWZhdWx0OnRocm93IEVycm9yKFwiZm9ybWF0IG11c3QgYmUgSEVYLCBURVhULCBCNjQsIG9yIEJZVEVTXCIpO1xufXJldHVybiBkfWZ1bmN0aW9uIHcoYyxhKXtyZXR1cm4gYzw8YXxjPj4+MzItYX1mdW5jdGlvbiBxKGMsYSl7cmV0dXJuIGM+Pj5hfGM8PDMyLWF9ZnVuY3Rpb24gdihjLGEpe3ZhciBkPW51bGwsZD1uZXcgYihjLmEsYy5iKTtyZXR1cm4gZD0zMj49YT9uZXcgYihkLmE+Pj5hfGQuYjw8MzItYSY0Mjk0OTY3Mjk1LGQuYj4+PmF8ZC5hPDwzMi1hJjQyOTQ5NjcyOTUpOm5ldyBiKGQuYj4+PmEtMzJ8ZC5hPDw2NC1hJjQyOTQ5NjcyOTUsZC5hPj4+YS0zMnxkLmI8PDY0LWEmNDI5NDk2NzI5NSl9ZnVuY3Rpb24gUShjLGEpe3ZhciBkPW51bGw7cmV0dXJuIGQ9MzI+PWE/bmV3IGIoYy5hPj4+YSxjLmI+Pj5hfGMuYTw8MzItYSY0Mjk0OTY3Mjk1KTpuZXcgYigwLGMuYT4+PmEtMzIpfWZ1bmN0aW9uIFkoYyxhLGQpe3JldHVybiBjJmFefmMmZH1mdW5jdGlvbiBaKGMsYSxkKXtyZXR1cm4gbmV3IGIoYy5hJmEuYV5+Yy5hJmQuYSxjLmImYS5iXn5jLmImZC5iKX1mdW5jdGlvbiBSKGMsYSxkKXtyZXR1cm4gYyZcbmFeYyZkXmEmZH1mdW5jdGlvbiBhYShjLGEsZCl7cmV0dXJuIG5ldyBiKGMuYSZhLmFeYy5hJmQuYV5hLmEmZC5hLGMuYiZhLmJeYy5iJmQuYl5hLmImZC5iKX1mdW5jdGlvbiBiYShjKXtyZXR1cm4gcShjLDIpXnEoYywxMylecShjLDIyKX1mdW5jdGlvbiBjYShjKXt2YXIgYT12KGMsMjgpLGQ9dihjLDM0KTtjPXYoYywzOSk7cmV0dXJuIG5ldyBiKGEuYV5kLmFeYy5hLGEuYl5kLmJeYy5iKX1mdW5jdGlvbiBkYShjKXtyZXR1cm4gcShjLDYpXnEoYywxMSlecShjLDI1KX1mdW5jdGlvbiBlYShjKXt2YXIgYT12KGMsMTQpLGQ9dihjLDE4KTtjPXYoYyw0MSk7cmV0dXJuIG5ldyBiKGEuYV5kLmFeYy5hLGEuYl5kLmJeYy5iKX1mdW5jdGlvbiBmYShjKXtyZXR1cm4gcShjLDcpXnEoYywxOCleYz4+PjN9ZnVuY3Rpb24gZ2EoYyl7dmFyIGE9dihjLDEpLGQ9dihjLDgpO2M9UShjLDcpO3JldHVybiBuZXcgYihhLmFeZC5hXmMuYSxhLmJeZC5iXmMuYil9ZnVuY3Rpb24gaGEoYyl7cmV0dXJuIHEoYyxcbjE3KV5xKGMsMTkpXmM+Pj4xMH1mdW5jdGlvbiBpYShjKXt2YXIgYT12KGMsMTkpLGQ9dihjLDYxKTtjPVEoYyw2KTtyZXR1cm4gbmV3IGIoYS5hXmQuYV5jLmEsYS5iXmQuYl5jLmIpfWZ1bmN0aW9uIEIoYyxhKXt2YXIgZD0oYyY2NTUzNSkrKGEmNjU1MzUpO3JldHVybigoYz4+PjE2KSsoYT4+PjE2KSsoZD4+PjE2KSY2NTUzNSk8PDE2fGQmNjU1MzV9ZnVuY3Rpb24gamEoYyxhLGQsYil7dmFyIGY9KGMmNjU1MzUpKyhhJjY1NTM1KSsoZCY2NTUzNSkrKGImNjU1MzUpO3JldHVybigoYz4+PjE2KSsoYT4+PjE2KSsoZD4+PjE2KSsoYj4+PjE2KSsoZj4+PjE2KSY2NTUzNSk8PDE2fGYmNjU1MzV9ZnVuY3Rpb24gQyhjLGEsZCxiLGYpe3ZhciBlPShjJjY1NTM1KSsoYSY2NTUzNSkrKGQmNjU1MzUpKyhiJjY1NTM1KSsoZiY2NTUzNSk7cmV0dXJuKChjPj4+MTYpKyhhPj4+MTYpKyhkPj4+MTYpKyhiPj4+MTYpKyhmPj4+MTYpKyhlPj4+MTYpJjY1NTM1KTw8MTZ8ZSY2NTUzNX1mdW5jdGlvbiBrYShjLFxuYSl7dmFyIGQsZSxmO2Q9KGMuYiY2NTUzNSkrKGEuYiY2NTUzNSk7ZT0oYy5iPj4+MTYpKyhhLmI+Pj4xNikrKGQ+Pj4xNik7Zj0oZSY2NTUzNSk8PDE2fGQmNjU1MzU7ZD0oYy5hJjY1NTM1KSsoYS5hJjY1NTM1KSsoZT4+PjE2KTtlPShjLmE+Pj4xNikrKGEuYT4+PjE2KSsoZD4+PjE2KTtyZXR1cm4gbmV3IGIoKGUmNjU1MzUpPDwxNnxkJjY1NTM1LGYpfWZ1bmN0aW9uIGxhKGMsYSxkLGUpe3ZhciBmLGssZztmPShjLmImNjU1MzUpKyhhLmImNjU1MzUpKyhkLmImNjU1MzUpKyhlLmImNjU1MzUpO2s9KGMuYj4+PjE2KSsoYS5iPj4+MTYpKyhkLmI+Pj4xNikrKGUuYj4+PjE2KSsoZj4+PjE2KTtnPShrJjY1NTM1KTw8MTZ8ZiY2NTUzNTtmPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhkLmEmNjU1MzUpKyhlLmEmNjU1MzUpKyhrPj4+MTYpO2s9KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkLmE+Pj4xNikrKGUuYT4+PjE2KSsoZj4+PjE2KTtyZXR1cm4gbmV3IGIoKGsmNjU1MzUpPDwxNnxcbmYmNjU1MzUsZyl9ZnVuY3Rpb24gbWEoYyxhLGQsZSxmKXt2YXIgayxnLGw7az0oYy5iJjY1NTM1KSsoYS5iJjY1NTM1KSsoZC5iJjY1NTM1KSsoZS5iJjY1NTM1KSsoZi5iJjY1NTM1KTtnPShjLmI+Pj4xNikrKGEuYj4+PjE2KSsoZC5iPj4+MTYpKyhlLmI+Pj4xNikrKGYuYj4+PjE2KSsoaz4+PjE2KTtsPShnJjY1NTM1KTw8MTZ8ayY2NTUzNTtrPShjLmEmNjU1MzUpKyhhLmEmNjU1MzUpKyhkLmEmNjU1MzUpKyhlLmEmNjU1MzUpKyhmLmEmNjU1MzUpKyhnPj4+MTYpO2c9KGMuYT4+PjE2KSsoYS5hPj4+MTYpKyhkLmE+Pj4xNikrKGUuYT4+PjE2KSsoZi5hPj4+MTYpKyhrPj4+MTYpO3JldHVybiBuZXcgYigoZyY2NTUzNSk8PDE2fGsmNjU1MzUsbCl9ZnVuY3Rpb24geihjKXt2YXIgYSxkO2lmKFwiU0hBLTFcIj09PWMpYz1bMTczMjU4NDE5Myw0MDIzMjMzNDE3LDI1NjIzODMxMDIsMjcxNzMzODc4LDMyODUzNzc1MjBdO2Vsc2Ugc3dpdGNoKGE9WzMyMzgzNzEwMzIsOTE0MTUwNjYzLFxuODEyNzAyOTk5LDQxNDQ5MTI2OTcsNDI5MDc3NTg1NywxNzUwNjAzMDI1LDE2OTQwNzY4MzksMzIwNDA3NTQyOF0sZD1bMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjVdLGMpe2Nhc2UgXCJTSEEtMjI0XCI6Yz1hO2JyZWFrO2Nhc2UgXCJTSEEtMjU2XCI6Yz1kO2JyZWFrO2Nhc2UgXCJTSEEtMzg0XCI6Yz1bbmV3IGIoMzQxODA3MDM2NSxhWzBdKSxuZXcgYigxNjU0MjcwMjUwLGFbMV0pLG5ldyBiKDI0Mzg1MjkzNzAsYVsyXSksbmV3IGIoMzU1NDYyMzYwLGFbM10pLG5ldyBiKDE3MzE0MDU0MTUsYVs0XSksbmV3IGIoNDEwNDg4ODU4OTUsYVs1XSksbmV3IGIoMzY3NTAwODUyNSxhWzZdKSxuZXcgYigxMjAzMDYyODEzLGFbN10pXTticmVhaztjYXNlIFwiU0hBLTUxMlwiOmM9W25ldyBiKGRbMF0sNDA4OTIzNTcyMCksbmV3IGIoZFsxXSwyMjI3ODczNTk1KSxuZXcgYihkWzJdLDQyNzExNzU3MjMpLFxubmV3IGIoZFszXSwxNTk1NzUwMTI5KSxuZXcgYihkWzRdLDI5MTc1NjUxMzcpLG5ldyBiKGRbNV0sNzI1NTExMTk5KSxuZXcgYihkWzZdLDQyMTUzODk1NDcpLG5ldyBiKGRbN10sMzI3MDMzMjA5KV07YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcIlVua25vd24gU0hBIHZhcmlhbnRcIik7fXJldHVybiBjfWZ1bmN0aW9uIEsoYyxhKXt2YXIgZD1bXSxiLGUsayxnLGwsbixoO2I9YVswXTtlPWFbMV07az1hWzJdO2c9YVszXTtsPWFbNF07Zm9yKGg9MDs4MD5oO2grPTEpZFtoXT0xNj5oP2NbaF06dyhkW2gtM11eZFtoLThdXmRbaC0xNF1eZFtoLTE2XSwxKSxuPTIwPmg/Qyh3KGIsNSksZSZrXn5lJmcsbCwxNTE4NTAwMjQ5LGRbaF0pOjQwPmg/Qyh3KGIsNSksZV5rXmcsbCwxODU5Nzc1MzkzLGRbaF0pOjYwPmg/Qyh3KGIsNSksUihlLGssZyksbCwyNDAwOTU5NzA4LGRbaF0pOkModyhiLDUpLGVea15nLGwsMzM5NTQ2OTc4MixkW2hdKSxsPWcsZz1rLGs9dyhlLDMwKSxlPWIsYj1uO2FbMF09XG5CKGIsYVswXSk7YVsxXT1CKGUsYVsxXSk7YVsyXT1CKGssYVsyXSk7YVszXT1CKGcsYVszXSk7YVs0XT1CKGwsYVs0XSk7cmV0dXJuIGF9ZnVuY3Rpb24gVShjLGEsYixlKXt2YXIgZjtmb3IoZj0oYSs2NT4+Pjk8PDQpKzE1O2MubGVuZ3RoPD1mOyljLnB1c2goMCk7Y1thPj4+NV18PTEyODw8MjQtYSUzMjtjW2ZdPWErYjtiPWMubGVuZ3RoO2ZvcihhPTA7YTxiO2ErPTE2KWU9SyhjLnNsaWNlKGEsYSsxNiksZSk7cmV0dXJuIGV9ZnVuY3Rpb24gTChjLGEsZCl7dmFyIHEsZixrLGcsbCxuLGgsbSx1LHIscCx2LHQsdyx4LHkseixELEUsRixHLEgsQT1bXSxJO2lmKFwiU0hBLTIyNFwiPT09ZHx8XCJTSEEtMjU2XCI9PT1kKXI9NjQsdj0xLEg9TnVtYmVyLHQ9Qix3PWphLHg9Qyx5PWZhLHo9aGEsRD1iYSxFPWRhLEc9UixGPVksST1lO2Vsc2UgaWYoXCJTSEEtMzg0XCI9PT1kfHxcIlNIQS01MTJcIj09PWQpcj04MCx2PTIsSD1iLHQ9a2Esdz1sYSx4PW1hLHk9Z2Esej1pYSxEPWNhLEU9ZWEsRz1hYSxcbkY9WixJPVM7ZWxzZSB0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gU0hBLTIgaW1wbGVtZW50YXRpb25cIik7ZD1hWzBdO3E9YVsxXTtmPWFbMl07az1hWzNdO2c9YVs0XTtsPWFbNV07bj1hWzZdO2g9YVs3XTtmb3IocD0wO3A8cjtwKz0xKTE2PnA/KHU9cCp2LG09Yy5sZW5ndGg8PXU/MDpjW3VdLHU9Yy5sZW5ndGg8PXUrMT8wOmNbdSsxXSxBW3BdPW5ldyBIKG0sdSkpOkFbcF09dyh6KEFbcC0yXSksQVtwLTddLHkoQVtwLTE1XSksQVtwLTE2XSksbT14KGgsRShnKSxGKGcsbCxuKSxJW3BdLEFbcF0pLHU9dChEKGQpLEcoZCxxLGYpKSxoPW4sbj1sLGw9ZyxnPXQoayxtKSxrPWYsZj1xLHE9ZCxkPXQobSx1KTthWzBdPXQoZCxhWzBdKTthWzFdPXQocSxhWzFdKTthWzJdPXQoZixhWzJdKTthWzNdPXQoayxhWzNdKTthWzRdPXQoZyxhWzRdKTthWzVdPXQobCxhWzVdKTthWzZdPXQobixhWzZdKTthWzddPXQoaCxhWzddKTtyZXR1cm4gYX12YXIgZSxTO2U9WzExMTYzNTI0MDgsXG4xODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LDE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LFxuNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOThdO1M9W25ldyBiKGVbMF0sMzYwOTc2NzQ1OCksbmV3IGIoZVsxXSw2MDI4OTE3MjUpLG5ldyBiKGVbMl0sMzk2NDQ4NDM5OSksbmV3IGIoZVszXSwyMTczMjk1NTQ4KSxuZXcgYihlWzRdLDQwODE2Mjg0NzIpLG5ldyBiKGVbNV0sMzA1MzgzNDI2NSksbmV3IGIoZVs2XSwyOTM3NjcxNTc5KSxuZXcgYihlWzddLDM2NjQ2MDk1NjApLG5ldyBiKGVbOF0sMjczNDg4MzM5NCksbmV3IGIoZVs5XSwxMTY0OTk2NTQyKSxuZXcgYihlWzEwXSwxMzIzNjEwNzY0KSxuZXcgYihlWzExXSwzNTkwMzA0OTk0KSxuZXcgYihlWzEyXSw0MDY4MTgyMzgzKSxuZXcgYihlWzEzXSw5OTEzMzYxMTMpLG5ldyBiKGVbMTRdLFxuNjMzODAzMzE3KSxuZXcgYihlWzE1XSwzNDc5Nzc0ODY4KSxuZXcgYihlWzE2XSwyNjY2NjEzNDU4KSxuZXcgYihlWzE3XSw5NDQ3MTExMzkpLG5ldyBiKGVbMThdLDIzNDEyNjI3NzMpLG5ldyBiKGVbMTldLDIwMDc4MDA5MzMpLG5ldyBiKGVbMjBdLDE0OTU5OTA5MDEpLG5ldyBiKGVbMjFdLDE4NTY0MzEyMzUpLG5ldyBiKGVbMjJdLDMxNzUyMTgxMzIpLG5ldyBiKGVbMjNdLDIxOTg5NTA4MzcpLG5ldyBiKGVbMjRdLDM5OTk3MTkzMzkpLG5ldyBiKGVbMjVdLDc2Njc4NDAxNiksbmV3IGIoZVsyNl0sMjU2NjU5NDg3OSksbmV3IGIoZVsyN10sMzIwMzMzNzk1NiksbmV3IGIoZVsyOF0sMTAzNDQ1NzAyNiksbmV3IGIoZVsyOV0sMjQ2Njk0ODkwMSksbmV3IGIoZVszMF0sMzc1ODMyNjM4MyksbmV3IGIoZVszMV0sMTY4NzE3OTM2KSxuZXcgYihlWzMyXSwxMTg4MTc5OTY0KSxuZXcgYihlWzMzXSwxNTQ2MDQ1NzM0KSxuZXcgYihlWzM0XSwxNTIyODA1NDg1KSxuZXcgYihlWzM1XSwyNjQzODMzODIzKSxcbm5ldyBiKGVbMzZdLDIzNDM1MjczOTApLG5ldyBiKGVbMzddLDEwMTQ0Nzc0ODApLG5ldyBiKGVbMzhdLDEyMDY3NTkxNDIpLG5ldyBiKGVbMzldLDM0NDA3NzYyNyksbmV3IGIoZVs0MF0sMTI5MDg2MzQ2MCksbmV3IGIoZVs0MV0sMzE1ODQ1NDI3MyksbmV3IGIoZVs0Ml0sMzUwNTk1MjY1NyksbmV3IGIoZVs0M10sMTA2MjE3MDA4KSxuZXcgYihlWzQ0XSwzNjA2MDA4MzQ0KSxuZXcgYihlWzQ1XSwxNDMyNzI1Nzc2KSxuZXcgYihlWzQ2XSwxNDY3MDMxNTk0KSxuZXcgYihlWzQ3XSw4NTExNjk3MjApLG5ldyBiKGVbNDhdLDMxMDA4MjM3NTIpLG5ldyBiKGVbNDldLDEzNjMyNTgxOTUpLG5ldyBiKGVbNTBdLDM3NTA2ODU1OTMpLG5ldyBiKGVbNTFdLDM3ODUwNTAyODApLG5ldyBiKGVbNTJdLDMzMTgzMDc0MjcpLG5ldyBiKGVbNTNdLDM4MTI3MjM0MDMpLG5ldyBiKGVbNTRdLDIwMDMwMzQ5OTUpLG5ldyBiKGVbNTVdLDM2MDIwMzY4OTkpLG5ldyBiKGVbNTZdLDE1NzU5OTAwMTIpLFxubmV3IGIoZVs1N10sMTEyNTU5MjkyOCksbmV3IGIoZVs1OF0sMjcxNjkwNDMwNiksbmV3IGIoZVs1OV0sNDQyNzc2MDQ0KSxuZXcgYihlWzYwXSw1OTM2OTgzNDQpLG5ldyBiKGVbNjFdLDM3MzMxMTAyNDkpLG5ldyBiKGVbNjJdLDI5OTkzNTE1NzMpLG5ldyBiKGVbNjNdLDM4MTU5MjA0MjcpLG5ldyBiKDMzOTE1Njk2MTQsMzkyODM4MzkwMCksbmV3IGIoMzUxNTI2NzI3MSw1NjYyODA3MTEpLG5ldyBiKDM5NDAxODc2MDYsMzQ1NDA2OTUzNCksbmV3IGIoNDExODYzMDI3MSw0MDAwMjM5OTkyKSxuZXcgYigxMTY0MTg0NzQsMTkxNDEzODU1NCksbmV3IGIoMTc0MjkyNDIxLDI3MzEwNTUyNzApLG5ldyBiKDI4OTM4MDM1NiwzMjAzOTkzMDA2KSxuZXcgYig0NjAzOTMyNjksMzIwNjIwMzE1KSxuZXcgYig2ODU0NzE3MzMsNTg3NDk2ODM2KSxuZXcgYig4NTIxNDI5NzEsMTA4Njc5Mjg1MSksbmV3IGIoMTAxNzAzNjI5OCwzNjU1NDMxMDApLG5ldyBiKDExMjYwMDA1ODAsMjYxODI5NzY3NiksXG5uZXcgYigxMjg4MDMzNDcwLDM0MDk4NTUxNTgpLG5ldyBiKDE1MDE1MDU5NDgsNDIzNDUwOTg2NiksbmV3IGIoMTYwNzE2NzkxNSw5ODcxNjc0NjgpLG5ldyBiKDE4MTY0MDIzMTYsMTI0NjE4OTU5MSldO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIHl9KTpcInVuZGVmaW5lZFwiIT09dHlwZW9mIGV4cG9ydHM/XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWV4cG9ydHM9eTpleHBvcnRzPXk6VC5qc1NIQT15fSkodGhpcyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9qc3NoYS9zcmMvc2hhLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtDc3MsIEpzfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgTWFuaWZlc3Qge1xuICBjb25zdHJ1Y3Rvcih1cmwsIGNvbmZpZykge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAuZ2V0KHRoaXMudXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm1hbmlmZXN0cyA9IHt9O1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICBtYW5pZmVzdHMuZm9yRWFjaChtYW5pZmVzdCA9PiB7IHRoaXMubWFuaWZlc3RzW21hbmlmZXN0LnBhY2thZ2VdID0gbWFuaWZlc3Q7IH0pO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4O1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICB9XG5cbiAgaW5qZWN0KCkge1xuICAgIGNvbnN0XG4gICAgICBmbGF0dGVuID0gbGlzdCA9PiBsaXN0LnJlZHVjZShcbiAgICAgICAgKGEsIGIpID0+IGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBmbGF0dGVuKGIpIDogYiksIFtdXG4gICAgICApLFxuICAgICAgaW5qZWN0SW50b0RPTSA9IChkZXBlbmRlbmNpZXMsIGlkeCA9IDApID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRlcGVuZGVuY2llc1tpZHhdO1xuXG4gICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWpzJykpIHtcbiAgICAgICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdJbmplY3RpbmcgdGFnOicsIGVsZW0pO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pOyB9XG5cbiAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgdGhpcy5vcmRlci5tYXAoX3BhY2thZ2UgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSkge1xuICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZG5cXCd0IGZpbmQgcGFja2FnZSAke19wYWNrYWdlfSBmcm9tIGluamVjdGlvbiBvcmRlci5gKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluamVjdE1hbmlmZXN0KHRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBmbGF0dGVuKG1hbmlmZXN0cyk7XG5cbiAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBsZXRcbiAgICAgIGhhc2hlcyA9IE9iamVjdC5rZXlzKG1hbmlmZXN0Lmhhc2hlcyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoaGFzaGVzLm1hcChoYXNoID0+IHtcbiAgICAgIGxldFxuICAgICAgICBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdLFxuICAgICAgICByb290VXJsO1xuXG4gICAgICByb290VXJsID0gW21hbmlmZXN0LnJvb3RVcmwsIG1hbmlmZXN0LnBhY2thZ2VVcmxdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICAgICk7XG4gICAgICB9KS5qb2luKCcvJyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmluamVjdERlcGVuZGVuY3koXG4gICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgIHJvb3RVcmxcbiAgICAgICk7XG4gICAgfSkpO1xuICB9XG5cbiAgaW5qZWN0RGVwZW5kZW5jeShkZXBlbmRlbmN5LCByb290VXJsKSB7XG4gICAgc3dpdGNoIChkZXBlbmRlbmN5LmV4dGVuc2lvbikge1xuICAgICAgY2FzZSAnLmNzcyc6XG4gICAgICAgIHJldHVybiBuZXcgQ3NzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBjYXNlICcuanMnOlxuICAgICAgICByZXR1cm4gbmV3IEpzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBsZXRcbiAgICAgIGJhc2VuYW1lID0gdGhpcy5iYXNlbmFtZShkZXBlbmRlbmN5LmZpbGUpLFxuICAgICAgdXJsO1xuXG4gICAgLy8gRmlsdGVyIG91dCBwb3RlbnRpYWwgbnVsbCB2YWx1ZXNcbiAgICAvLyBwYXNzZWQgaW4gYXMgdmFyaW91cyBwYXJ0cyBvZiBhbiB1cmwuXG4gICAgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBoYXNoOiBkZXBlbmRlbmN5Lmhhc2gsXG4gICAgICBwcmludGVkOiBgLyR7dXJsfS8ke2Jhc2VuYW1lfS0ke2RlcGVuZGVuY3kuaGFzaH0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICByYXc6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgc2luZ3VsYXJCeTogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWBcbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmplY3Rvci5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBjbGFzcyBKcyB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIGNvbmZpZyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSxcbiAgICAgIHZlcmlmaWNhdGlvbiA9IGZhbHNlXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGVuYWJsZUxvZ2dpbmcgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJyxcbiAgICAgIGVuYWJsZUxvZ2dpbmdcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB0ZXh0IGZvciAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5kZWZlciA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgc2NyaXB0LnRleHQgPSBgXG4gICAgICAgICR7dGV4dH1cbiAgICAgICAgLy8jIHNvdXJjZVVSTD0ke3VybH1cbiAgICAgIGA7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKHNjcmlwdCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBDcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBpdHMgdHlwZVxuICAgICAgbGV0XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycsIHRydWUpO1xuXG4gICAgICAvLyBCaW5kIHRvIHJlYWR5U3RhdGUgb3IgcmVnaXN0ZXIgwrRvbmxvYWTCtCBjYWxsYmFja1xuICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIC8vIENhbGxiYWNrIGZvciBJRSdzIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIChJIGZlZWwgc2Vlc2ljaylcbiAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCaW5kIGBvbmxvYWRgIGNhbGxiYWNrIG9uIHNjcmlwdCBlbGVtZW50XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEluamVjdCB1bnByaW50ZWQgd2l0aG91dCBjYWNoaW5nIGluIGNhc2Ugb2YgZXJyb3JcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIEphdmFTY3JpcHQgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpOyB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAuLi5uZWVkcyBjYWNoaW5nIG1hbnVhbGx5IGNhdXNlIG5ldmVyIGluamVjdGVkXG4gICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7IH1cblxuICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgSmF2YVNjcmlwdCBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGYWlsZWQgYXR0ZW1wdGluZyB0byBjYWNoZSBKYXZhU2NyaXB0IGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KFxuICAgICAgdXJscy5wcmludGVkLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5oYXNoKHVybHMuaGFzaClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIHRoaXMuY2FjaGVEZWxheSA9IGNvbmZpZy5jYWNoZURlbGF5IHx8IDUwMDA7XG4gICAgdGhpcy52ZXJpZmljYXRpb24gPSB2ZXJpZmljYXRpb247XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXNvbHZlKCk7IH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBDU1MgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbGV0IHsgdGV4dDogcmVzcG9uc2VUZXh0IH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnY3NzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIENTUyBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgQ1NTIGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHRydWUpO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIC8vIEZhbGxiYWNrIHRvIHVucHJpbnRlZCBhc3NldHMgYWZ0ZXIgY2FjaGUgYXR0ZW1wdFxuICAgICAgLy8gbm8gY2FsbGJhY2tzIGZvciBzdHlsZXNoZWV0IGluamVjdGlvbnMgKHRpbWVvdXRzIGFyZSB3b3JzZS4uLilcbiAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIENTUyBmcm9tICR7dXJsfSAtIGZhbGxpbmcgYmFjayB0byB1bnByaW50ZWQgdmVyc2lvbi5gKTtcblxuICAgICAgICAgICAgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHRleHQgZm9yIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgbGluay50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KFxuICAgICAgdXJscy5wcmludGVkLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5oYXNoKHVybHMuaGFzaClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDT1JTIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIHhociA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIHVybDogeGhyLnJlc3BvbnNlVVJMXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FqYXguanNcbiAqKi8iLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vamFrZWFyY2hpYmFsZC9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICAzLjEuMlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzTWF5YmVUaGVuYWJsZSh4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID0gMDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbl0gPSBjYWxsYmFjaztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICsgMV0gPSBhcmc7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICs9IDI7XG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9PT0gMikge1xuICAgICAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXAoYXNhcEZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGFzYXBGbjtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogdW5kZWZpbmVkO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93IHx8IHt9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4gICAgLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgLy8gbm9kZVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpIHtcbiAgICAgIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2sobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmVydHhcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2ViIHdvcmtlclxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCwgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuOyBpKz0yKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXTtcbiAgICAgICAgdmFyIGFyZyA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdO1xuXG4gICAgICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByID0gcmVxdWlyZTtcbiAgICAgICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaDtcbiAgICAvLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgICB2YXIgc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCAmJiAhb25GdWxmaWxsbWVudCB8fCBzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQgJiYgIW9uUmVqZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIHZhciByZXN1bHQgPSBwYXJlbnQuX3Jlc3VsdDtcblxuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1tzdGF0ZSAtIDFdO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbigpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHN0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlKG9iamVjdCkge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmU7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKCkge31cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICAgPSB2b2lkIDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCA9IDE7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEICA9IDI7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcignQSBwcm9taXNlcyBjYWxsYmFjayBjYW5ub3QgcmV0dXJuIHRoYXQgc2FtZSBwcm9taXNlLicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4ocHJvbWlzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeVRoZW4odGhlbiwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbikge1xuICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHRoZW5hYmxlLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmIChzZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG5cbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgICAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgICAgIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZSh0aGVuYWJsZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuKSB7XG4gICAgICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgIHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ICYmXG4gICAgICAgICAgY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24odGhlbikpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc2VsZkZ1bGZpbGxtZW50KCkpO1xuICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4odmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICAgICAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICAgICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykgeyByZXR1cm47IH1cblxuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRDtcblxuICAgICAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwcm9taXNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEO1xuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBzdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgbGVuZ3RoID0gc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gICAgICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aCArIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEXSAgPSBvblJlamVjdGlvbjtcblxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gsIHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgICAgIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCkge1xuICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gICAgICB2YXIgaGFzQ2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgICAgIHZhbHVlLCBlcnJvciwgc3VjY2VlZGVkLCBmYWlsZWQ7XG5cbiAgICAgIGlmIChoYXNDYWxsYmFjaykge1xuICAgICAgICB2YWx1ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAvLyBub29wXG4gICAgICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGwoZW50cmllcykge1xuICAgICAgcmV0dXJuIG5ldyBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGw7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZShlbnRyaWVzKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmICghbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuXG4gICAgICBmdW5jdGlvbiBvbkZ1bGZpbGxtZW50KHZhbHVlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblJlamVjdGlvbihyZWFzb24pIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSksIHVuZGVmaW5lZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0KHJlYXNvbikge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlciA9IDA7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlO1xuICAgIC8qKlxuICAgICAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgICAgIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICAgICAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIFRlcm1pbm9sb2d5XG4gICAgICAtLS0tLS0tLS0tLVxuXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAgICAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAgICAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gICAgICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gICAgICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICAgICAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gICAgICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICAgICAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgICAgIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICAgICAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gICAgICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gICAgICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gICAgICBCYXNpYyBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBgYGBqc1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gb24gc3VjY2Vzc1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICAvLyBvbiBmYWlsdXJlXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS0tLS1cblxuICAgICAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICAgICAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gICAgICBgYGBqc1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICAgICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBjbGFzcyBQcm9taXNlXG4gICAgICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZShyZXNvbHZlcikge1xuICAgICAgdGhpcy5faWQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlcisrO1xuICAgICAgdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCk7XG4gICAgICAgIHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSA/IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLmFsbCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yYWNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZXNvbHZlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZWplY3QgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldFNjaGVkdWxlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXI7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldEFzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fYXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwO1xuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucHJvdG90eXBlID0ge1xuICAgICAgY29uc3RydWN0b3I6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLFxuXG4gICAgLyoqXG4gICAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQ2hhaW5pbmdcbiAgICAgIC0tLS0tLS0tXG5cbiAgICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgICAgfSk7XG5cbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICAgIH0pO1xuICAgICAgYGBgXG4gICAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBc3NpbWlsYXRpb25cbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgU2ltcGxlIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgYXV0aG9yLCBib29rcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG5cbiAgICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcblxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuXG4gICAgICB9XG5cbiAgICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZEF1dGhvcigpLlxuICAgICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIHRoZW5cbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICB0aGVuOiBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCxcblxuICAgIC8qKlxuICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHN5bmNocm9ub3VzXG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQXV0aG9yKCk7XG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfVxuXG4gICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgY2F0Y2hcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgdGhpcy5faW5wdXQgICAgID0gaW5wdXQ7XG4gICAgICAgIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgICAgIHRoaXMuX2VudW1lcmF0ZSgpO1xuICAgICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHRoaXMucHJvbWlzZSwgdGhpcy5fdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgaW5wdXQgICA9IHRoaXMuX2lucHV0O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24oZW50cnksIGkpIHtcbiAgICAgIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgICAgIHZhciByZXNvbHZlID0gYy5yZXNvbHZlO1xuXG4gICAgICBpZiAocmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICB2YXIgdGhlbiA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4oZW50cnkpO1xuXG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgICAgZW50cnkuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgICAgfSBlbHNlIGlmIChjID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCkge1xuICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgdGhlbik7XG4gICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbihyZXNvbHZlKSB7IHJlc29sdmUoZW50cnkpOyB9KSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlKGVudHJ5KSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24oc3RhdGUsIGksIHZhbHVlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICAgICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uKHByb21pc2UsIGkpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbCgpIHtcbiAgICAgIHZhciBsb2NhbDtcblxuICAgICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICAgICAgaWYgKFAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKSA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2NhbC5Qcm9taXNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQ7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2UgPSB7XG4gICAgICAnUHJvbWlzZSc6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0LFxuICAgICAgJ3BvbHlmaWxsJzogbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0XG4gICAgfTtcblxuICAgIC8qIGdsb2JhbCBkZWZpbmU6dHJ1ZSBtb2R1bGU6dHJ1ZSB3aW5kb3c6IHRydWUgKi9cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlOyB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZVsnZXhwb3J0cyddKSB7XG4gICAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXNbJ0VTNlByb21pc2UnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0KCk7XG59KS5jYWxsKHRoaXMpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogdmVydHggKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=