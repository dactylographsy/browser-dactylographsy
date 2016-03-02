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
	
	var _rusha = __webpack_require__(6);
	
	var _rusha2 = _interopRequireDefault(_rusha);
	
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
	    this.rusha = new _rusha2.default();
	
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
	    value: function isItemValid(body, sha1) {
	      return this.rusha.digestFromString(body) === sha1;
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
	
	      var sha1 = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
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
	        if (_item !== null && sha1 !== false) {
	          _this.log.info('Found item with key: ' + key + ' in cache which needs validation...');
	
	          if (_this.isItemValid(_item, sha1)) {
	            _this.log.info('...matches expected sha1 ' + sha1 + '.');
	
	            resolve(_this.parse(_item).code);
	          } else {
	            _this.log.info('...does not match expected sha1 ' + sha1 + ' - pruning.');
	
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
	    value: function remove(url) {
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
	
	      for (var _key in localStorage) {
	        if (_key.indexOf(this.cachePrefix) >= 0) {
	          this.log.log('Removing item ' + _key + ' requested by flush.');
	
	          localStorage.removeItem(_key);
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
	      for (var _key2 in localStorage) {
	        var dactylographsyItem = _key2.indexOf(this.cachePrefix) >= 0;
	        var item = undefined;
	
	        if (!dactylographsyItem) {
	          continue;
	        }
	
	        item = JSON.parse(localStorage.getItem(_key2));
	
	        if (typeof singularBy === 'string' && typeof item.singularBy === 'string' && item.singularBy === singularBy) {
	          this.log.log('Deduping by ' + singularBy + ' before adding dupe in ' + _key2 + '.');
	
	          localStorage.removeItem(_key2);
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

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * Rusha, a JavaScript implementation of the Secure Hash Algorithm, SHA-1,
	 * as defined in FIPS PUB 180-1, tuned for high performance with large inputs.
	 * (http://github.com/srijs/rusha)
	 *
	 * Inspired by Paul Johnstons implementation (http://pajhome.org.uk/crypt/md5).
	 *
	 * Copyright (c) 2013 Sam Rijs (http://awesam.de).
	 * Released under the terms of the MIT license as follows:
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	 * IN THE SOFTWARE.
	 */
	(function () {
	    var util = {
	            getDataType: function (data) {
	                if (typeof data === 'string') {
	                    return 'string';
	                }
	                if (data instanceof Array) {
	                    return 'array';
	                }
	                if (typeof global !== 'undefined' && global.Buffer && global.Buffer.isBuffer(data)) {
	                    return 'buffer';
	                }
	                if (data instanceof ArrayBuffer) {
	                    return 'arraybuffer';
	                }
	                if (data.buffer instanceof ArrayBuffer) {
	                    return 'view';
	                }
	                if (data instanceof Blob) {
	                    return 'blob';
	                }
	                throw new Error('Unsupported data type.');
	            }
	        };
	    // The Rusha object is a wrapper around the low-level RushaCore.
	    // It provides means of converting different inputs to the
	    // format accepted by RushaCore as well as other utility methods.
	    function Rusha(chunkSize) {
	        'use strict';
	        // Private object structure.
	        var self$2 = { fill: 0 };
	        // Calculate the length of buffer that the sha1 routine uses
	        // including the padding.
	        var padlen = function (len) {
	            for (len += 9; len % 64 > 0; len += 1);
	            return len;
	        };
	        var padZeroes = function (bin, len) {
	            for (var i = len >> 2; i < bin.length; i++)
	                bin[i] = 0;
	        };
	        var padData = function (bin, chunkLen, msgLen) {
	            bin[chunkLen >> 2] |= 128 << 24 - (chunkLen % 4 << 3);
	            bin[((chunkLen >> 2) + 2 & ~15) + 14] = msgLen >> 29;
	            bin[((chunkLen >> 2) + 2 & ~15) + 15] = msgLen << 3;
	        };
	        // Convert a binary string and write it to the heap.
	        // A binary string is expected to only contain char codes < 256.
	        var convStr = function (H8, H32, start, len, off) {
	            var str = this, i, om = off % 4, lm = len % 4, j = len - lm;
	            if (j > 0) {
	                switch (om) {
	                case 0:
	                    H8[off + 3 | 0] = str.charCodeAt(start);
	                case 1:
	                    H8[off + 2 | 0] = str.charCodeAt(start + 1);
	                case 2:
	                    H8[off + 1 | 0] = str.charCodeAt(start + 2);
	                case 3:
	                    H8[off | 0] = str.charCodeAt(start + 3);
	                }
	            }
	            for (i = om; i < j; i = i + 4 | 0) {
	                H32[off + i >> 2] = str.charCodeAt(start + i) << 24 | str.charCodeAt(start + i + 1) << 16 | str.charCodeAt(start + i + 2) << 8 | str.charCodeAt(start + i + 3);
	            }
	            switch (lm) {
	            case 3:
	                H8[off + j + 1 | 0] = str.charCodeAt(start + j + 2);
	            case 2:
	                H8[off + j + 2 | 0] = str.charCodeAt(start + j + 1);
	            case 1:
	                H8[off + j + 3 | 0] = str.charCodeAt(start + j);
	            }
	        };
	        // Convert a buffer or array and write it to the heap.
	        // The buffer or array is expected to only contain elements < 256.
	        var convBuf = function (H8, H32, start, len, off) {
	            var buf = this, i, om = off % 4, lm = len % 4, j = len - lm;
	            if (j > 0) {
	                switch (om) {
	                case 0:
	                    H8[off + 3 | 0] = buf[start];
	                case 1:
	                    H8[off + 2 | 0] = buf[start + 1];
	                case 2:
	                    H8[off + 1 | 0] = buf[start + 2];
	                case 3:
	                    H8[off | 0] = buf[start + 3];
	                }
	            }
	            for (i = 4 - om; i < j; i = i += 4 | 0) {
	                H32[off + i >> 2] = buf[start + i] << 24 | buf[start + i + 1] << 16 | buf[start + i + 2] << 8 | buf[start + i + 3];
	            }
	            switch (lm) {
	            case 3:
	                H8[off + j + 1 | 0] = buf[start + j + 2];
	            case 2:
	                H8[off + j + 2 | 0] = buf[start + j + 1];
	            case 1:
	                H8[off + j + 3 | 0] = buf[start + j];
	            }
	        };
	        var convBlob = function (H8, H32, start, len, off) {
	            var blob = this, i, om = off % 4, lm = len % 4, j = len - lm;
	            var buf = new Uint8Array(reader.readAsArrayBuffer(blob.slice(start, start + len)));
	            if (j > 0) {
	                switch (om) {
	                case 0:
	                    H8[off + 3 | 0] = buf[0];
	                case 1:
	                    H8[off + 2 | 0] = buf[1];
	                case 2:
	                    H8[off + 1 | 0] = buf[2];
	                case 3:
	                    H8[off | 0] = buf[3];
	                }
	            }
	            for (i = 4 - om; i < j; i = i += 4 | 0) {
	                H32[off + i >> 2] = buf[i] << 24 | buf[i + 1] << 16 | buf[i + 2] << 8 | buf[i + 3];
	            }
	            switch (lm) {
	            case 3:
	                H8[off + j + 1 | 0] = buf[j + 2];
	            case 2:
	                H8[off + j + 2 | 0] = buf[j + 1];
	            case 1:
	                H8[off + j + 3 | 0] = buf[j];
	            }
	        };
	        var convFn = function (data) {
	            switch (util.getDataType(data)) {
	            case 'string':
	                return convStr.bind(data);
	            case 'array':
	                return convBuf.bind(data);
	            case 'buffer':
	                return convBuf.bind(data);
	            case 'arraybuffer':
	                return convBuf.bind(new Uint8Array(data));
	            case 'view':
	                return convBuf.bind(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
	            case 'blob':
	                return convBlob.bind(data);
	            }
	        };
	        var slice = function (data, offset) {
	            switch (util.getDataType(data)) {
	            case 'string':
	                return data.slice(offset);
	            case 'array':
	                return data.slice(offset);
	            case 'buffer':
	                return data.slice(offset);
	            case 'arraybuffer':
	                return data.slice(offset);
	            case 'view':
	                return data.buffer.slice(offset);
	            }
	        };
	        // Convert an ArrayBuffer into its hexadecimal string representation.
	        var hex = function (arrayBuffer) {
	            var i, x, hex_tab = '0123456789abcdef', res = [], binarray = new Uint8Array(arrayBuffer);
	            for (i = 0; i < binarray.length; i++) {
	                x = binarray[i];
	                res[i] = hex_tab.charAt(x >> 4 & 15) + hex_tab.charAt(x >> 0 & 15);
	            }
	            return res.join('');
	        };
	        var ceilHeapSize = function (v) {
	            // The asm.js spec says:
	            // The heap object's byteLength must be either
	            // 2^n for n in [12, 24) or 2^24 * n for n ≥ 1.
	            // Also, byteLengths smaller than 2^16 are deprecated.
	            var p;
	            // If v is smaller than 2^16, the smallest possible solution
	            // is 2^16.
	            if (v <= 65536)
	                return 65536;
	            // If v < 2^24, we round up to 2^n,
	            // otherwise we round up to 2^24 * n.
	            if (v < 16777216) {
	                for (p = 1; p < v; p = p << 1);
	            } else {
	                for (p = 16777216; p < v; p += 16777216);
	            }
	            return p;
	        };
	        // Initialize the internal data structures to a new capacity.
	        var init = function (size) {
	            if (size % 64 > 0) {
	                throw new Error('Chunk size must be a multiple of 128 bit');
	            }
	            self$2.maxChunkLen = size;
	            self$2.padMaxChunkLen = padlen(size);
	            // The size of the heap is the sum of:
	            // 1. The padded input message size
	            // 2. The extended space the algorithm needs (320 byte)
	            // 3. The 160 bit state the algoritm uses
	            self$2.heap = new ArrayBuffer(ceilHeapSize(self$2.padMaxChunkLen + 320 + 20));
	            self$2.h32 = new Int32Array(self$2.heap);
	            self$2.h8 = new Int8Array(self$2.heap);
	            self$2.core = new Rusha._core({
	                Int32Array: Int32Array,
	                DataView: DataView
	            }, {}, self$2.heap);
	            self$2.buffer = null;
	        };
	        // Iinitializethe datastructures according
	        // to a chunk siyze.
	        init(chunkSize || 64 * 1024);
	        var initState = function (heap, padMsgLen) {
	            var io = new Int32Array(heap, padMsgLen + 320, 5);
	            io[0] = 1732584193;
	            io[1] = -271733879;
	            io[2] = -1732584194;
	            io[3] = 271733878;
	            io[4] = -1009589776;
	        };
	        var padChunk = function (chunkLen, msgLen) {
	            var padChunkLen = padlen(chunkLen);
	            var view = new Int32Array(self$2.heap, 0, padChunkLen >> 2);
	            padZeroes(view, chunkLen);
	            padData(view, chunkLen, msgLen);
	            return padChunkLen;
	        };
	        // Write data to the heap.
	        var write = function (data, chunkOffset, chunkLen) {
	            convFn(data)(self$2.h8, self$2.h32, chunkOffset, chunkLen, 0);
	        };
	        // Initialize and call the RushaCore,
	        // assuming an input buffer of length len * 4.
	        var coreCall = function (data, chunkOffset, chunkLen, msgLen, finalize) {
	            var padChunkLen = chunkLen;
	            if (finalize) {
	                padChunkLen = padChunk(chunkLen, msgLen);
	            }
	            write(data, chunkOffset, chunkLen);
	            self$2.core.hash(padChunkLen, self$2.padMaxChunkLen);
	        };
	        var getRawDigest = function (heap, padMaxChunkLen) {
	            var io = new Int32Array(heap, padMaxChunkLen + 320, 5);
	            var out = new Int32Array(5);
	            var arr = new DataView(out.buffer);
	            arr.setInt32(0, io[0], false);
	            arr.setInt32(4, io[1], false);
	            arr.setInt32(8, io[2], false);
	            arr.setInt32(12, io[3], false);
	            arr.setInt32(16, io[4], false);
	            return out;
	        };
	        // Calculate the hash digest as an array of 5 32bit integers.
	        var rawDigest = this.rawDigest = function (str) {
	                var msgLen = str.byteLength || str.length || str.size || 0;
	                initState(self$2.heap, self$2.padMaxChunkLen);
	                var chunkOffset = 0, chunkLen = self$2.maxChunkLen, last;
	                for (chunkOffset = 0; msgLen > chunkOffset + chunkLen; chunkOffset += chunkLen) {
	                    coreCall(str, chunkOffset, chunkLen, msgLen, false);
	                }
	                coreCall(str, chunkOffset, msgLen - chunkOffset, msgLen, true);
	                return getRawDigest(self$2.heap, self$2.padMaxChunkLen);
	            };
	        // The digest and digestFrom* interface returns the hash digest
	        // as a hex string.
	        this.digest = this.digestFromString = this.digestFromBuffer = this.digestFromArrayBuffer = function (str) {
	            return hex(rawDigest(str).buffer);
	        };
	    }
	    ;
	    // The low-level RushCore module provides the heart of Rusha,
	    // a high-speed sha1 implementation working on an Int32Array heap.
	    // At first glance, the implementation seems complicated, however
	    // with the SHA1 spec at hand, it is obvious this almost a textbook
	    // implementation that has a few functions hand-inlined and a few loops
	    // hand-unrolled.
	    Rusha._core = function RushaCore(stdlib, foreign, heap) {
	        'use asm';
	        var H = new stdlib.Int32Array(heap);
	        function hash(k, x) {
	            // k in bytes
	            k = k | 0;
	            x = x | 0;
	            var i = 0, j = 0, y0 = 0, z0 = 0, y1 = 0, z1 = 0, y2 = 0, z2 = 0, y3 = 0, z3 = 0, y4 = 0, z4 = 0, t0 = 0, t1 = 0;
	            y0 = H[x + 320 >> 2] | 0;
	            y1 = H[x + 324 >> 2] | 0;
	            y2 = H[x + 328 >> 2] | 0;
	            y3 = H[x + 332 >> 2] | 0;
	            y4 = H[x + 336 >> 2] | 0;
	            for (i = 0; (i | 0) < (k | 0); i = i + 64 | 0) {
	                z0 = y0;
	                z1 = y1;
	                z2 = y2;
	                z3 = y3;
	                z4 = y4;
	                for (j = 0; (j | 0) < 64; j = j + 4 | 0) {
	                    t1 = H[i + j >> 2] | 0;
	                    t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;
	                    y4 = y3;
	                    y3 = y2;
	                    y2 = y1 << 30 | y1 >>> 2;
	                    y1 = y0;
	                    y0 = t0;
	                    H[k + j >> 2] = t1;
	                }
	                for (j = k + 64 | 0; (j | 0) < (k + 80 | 0); j = j + 4 | 0) {
	                    t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
	                    t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;
	                    y4 = y3;
	                    y3 = y2;
	                    y2 = y1 << 30 | y1 >>> 2;
	                    y1 = y0;
	                    y0 = t0;
	                    H[j >> 2] = t1;
	                }
	                for (j = k + 80 | 0; (j | 0) < (k + 160 | 0); j = j + 4 | 0) {
	                    t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
	                    t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) + 1859775393 | 0) | 0;
	                    y4 = y3;
	                    y3 = y2;
	                    y2 = y1 << 30 | y1 >>> 2;
	                    y1 = y0;
	                    y0 = t0;
	                    H[j >> 2] = t1;
	                }
	                for (j = k + 160 | 0; (j | 0) < (k + 240 | 0); j = j + 4 | 0) {
	                    t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
	                    t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | y1 & y3 | y2 & y3) | 0) + ((t1 + y4 | 0) - 1894007588 | 0) | 0;
	                    y4 = y3;
	                    y3 = y2;
	                    y2 = y1 << 30 | y1 >>> 2;
	                    y1 = y0;
	                    y0 = t0;
	                    H[j >> 2] = t1;
	                }
	                for (j = k + 240 | 0; (j | 0) < (k + 320 | 0); j = j + 4 | 0) {
	                    t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
	                    t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) - 899497514 | 0) | 0;
	                    y4 = y3;
	                    y3 = y2;
	                    y2 = y1 << 30 | y1 >>> 2;
	                    y1 = y0;
	                    y0 = t0;
	                    H[j >> 2] = t1;
	                }
	                y0 = y0 + z0 | 0;
	                y1 = y1 + z1 | 0;
	                y2 = y2 + z2 | 0;
	                y3 = y3 + z3 | 0;
	                y4 = y4 + z4 | 0;
	            }
	            H[x + 320 >> 2] = y0;
	            H[x + 324 >> 2] = y1;
	            H[x + 328 >> 2] = y2;
	            H[x + 332 >> 2] = y3;
	            H[x + 336 >> 2] = y4;
	        }
	        return { hash: hash };
	    };
	    // If we'e running in Node.JS, export a module.
	    if (true) {
	        module.exports = Rusha;
	    } else if (typeof window !== 'undefined') {
	        window.Rusha = Rusha;
	    }
	    // If we're running in a webworker, accept
	    // messages containing a jobid and a buffer
	    // or blob object, and return the hash result.
	    if (typeof FileReaderSync !== 'undefined') {
	        var reader = new FileReaderSync(), hasher = new Rusha(4 * 1024 * 1024);
	        self.onmessage = function onMessage(event) {
	            var hash, data = event.data.data;
	            try {
	                hash = hasher.digest(data);
	                self.postMessage({
	                    id: event.data.id,
	                    hash: hash
	                });
	            } catch (e) {
	                self.postMessage({
	                    id: event.data.id,
	                    error: e.name
	                });
	            }
	        };
	    }
	}());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQyNjViMDhmOTY3YzAyYzRkOWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vcnVzaGEvcnVzaGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0Esc0JBQVcsUUFBWDs7QUFFQSxLQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixFQUErQjtBQUNqQyxVQUFPLGNBQVAsR0FBd0IsNkJBQW1CO0FBQ3pDLGNBQVMsSUFBVDtJQURzQixDQUF4QixDQURpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGNBQWM7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGdCQUFnQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRTs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsc0JBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFxQiwrQkFBK0I7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsd0JBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFROztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7QUFDMUU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxRQUFROztBQUU3Qzs7QUFFQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCLHFFQUFxRTtBQUMxRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkIsZUFBYyxTQUFTO0FBQ3ZCO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQSxlQUFjLFNBQVM7QUFDdkI7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUIsa0VBQWtFO0FBQ3ZGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsdURBQXNELGdCQUFnQixFQUFFO0FBQ3hFO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUF5Qix3Q0FBd0MsRUFBRTtBQUNuRSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEVBQUM7Ozs7Ozs7OztBQ3g3QkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQzFGdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSxnQjs7Ozs7O0FDQUEsOEJBQTZCLG1EQUFtRCIsImZpbGUiOiJkYWN0eWxvZ3JhcGhzeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTQyNjViMDhmOTY3YzAyYzRkOWFcbiAqKi8iLCJpbXBvcnQgRGFjdHlsb2dyYXBoc3kgZnJvbSAnLi9kYWN0eWxvZ3JhcGhzeSc7XG5pbXBvcnQgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmVzNlByb21pc2UucG9seWZpbGwoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5kYWN0eWxvZ3JhcGhzeSA9IG5ldyBEYWN0eWxvZ3JhcGhzeSh7XG4gICAgYXV0b3J1bjogdHJ1ZVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluamVjdG9yLCB7TWFuaWZlc3R9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWN0eWxvZ3JhcGhzeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICB7IGF1dG9ydW4gPSBmYWxzZSB9ID0gb3B0aW9ucyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ob29rSW50b0RvbSgpO1xuICAgIHRoaXMucmVhZENvbmZpZ3VyYXRpb24oKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiB0aGlzLmNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIGlmIChhdXRvcnVuKSB7IHRoaXMucnVuKCk7IH1cbiAgfVxuXG4gIGhvb2tJbnRvRG9tKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5leGVjdXRpbmdTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFjdHlsb2dyYXBoc3knKTtcbiAgICB0aGlzLmluamVjdEludG8gPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICB9XG5cbiAgcmVhZENvbmZpZ3VyYXRpb24oKSB7XG4gICAgdGhpcy5tYW5pZmVzdFVybHMgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ21hbmlmZXN0cycpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdjb25maWcnKTtcbiAgfVxuXG4gIHJlZnJlc2goaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLm1hbmlmZXN0VXJscy5tYXAodXJsID0+IHtcbiAgICAgIHJldHVybiBuZXcgTWFuaWZlc3QodXJsLCB0aGlzLmNvbmZpZykuZ2V0KCk7XG4gICAgfSkpLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgYWxsIG1hbmlmZXN0cywgJHttYW5pZmVzdHMubGVuZ3RofSBpbiB0b3RhbC5gKTtcblxuICAgICAgdGhpcy5jYWNoZS5zZXQobWFuaWZlc3RzLCAnbWFuaWZlc3RzJywgJ21hbmlmZXN0cycpO1xuXG4gICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICkuaW5qZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoJ21hbmlmZXN0cycpXG4gICAgICAudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCdSZXNvdHJpbmcgd2l0aCBtYW5pZmVzdHMgaW4gY2FjaGUgbGF0ZXIgcmVmcmVzaGluZyB2aWEgbmV0d29yayAoZGVsYXllZCkuJyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICAgIHRoaXMuY29uZmlnXG4gICAgICAgICkuaW5qZWN0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlYWRBdHRyT25TY3JpcHQoYXR0cikge1xuICAgIGlmICghdGhpcy5leGVjdXRpbmdTY3JpcHQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBsZXQgX2F0dHIgPSB0aGlzLmV4ZWN1dGluZ1NjcmlwdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xuXG4gICAgcmV0dXJuIF9hdHRyID8gSlNPTi5wYXJzZShfYXR0cikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBydW4oKSB7XG4gICAgY29uc3RcbiAgICAgIHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKHR0bCkge1xuICAgICAgdGhpcy5jYWNoZS5nZXQoJ2NsdCcsIDApXG4gICAgICAgIC50aGVuKGNsdCA9PiB7XG4gICAgICAgICAgaWYgKGNsdCA+PSB0dGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZsdXNoaW5nIGNhY2hlIGR1ZSB0byBleGVlZGluZyBUVEwgb2YgJHt0dGx9LmApO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLmZsdXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KCsrY2x0LCAncGxhaW4nLCAnY2x0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXRjaGluZyBtZWFucyBmZXRjaGluZyBhbGwgbWFuaWZlc3RzIHdpdGhvdXQgaW5qZWN0aW5nXG4gICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlT25seSkgeyByZXR1cm4gdGhpcy5yZWZyZXNoKGZhbHNlKTsgfVxuICAgIC8vIC4uLmVsc2UgcmVzdG9yZSBvciByZWZyZXNoIHRoZSBhcHAgKHdpdGggaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcylcbiAgICBlbHNlIHtcbiAgICAgIC8vIEVpdGhlciB0aGUgY29uZmlndXJhdGlvbiBvZiBub24gY2FjaGVkXG4gICAgICAvLyBtYW5pZmVzdHMgb3IgcmVxdWVzdGVkIGJ1bmRsZSB2ZXJpZmljYXRpb25cbiAgICAgIC8vIGZvcmNlcyBhIHJlZnJlc2ggb3IgYWxsIG1hbmlmZXN0cy5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgdGhpcy5jb25maWcudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHJlZnJlc2hEZWxheSA9IDUwMDBcbiAgICAgICAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goaW5qZWN0ZWRGcm9tQ2FjaGUpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIHJlZnJlc2hEZWxheSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbygnTm8gbWFuaWZlc3RzIGluIGNhY2hlLCByZWZyZXNoaW5nIHZpYSBuZXR3b3JrLicpO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RhY3R5bG9ncmFwaHN5LmpzXG4gKiovIiwiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuaW1wb3J0IFJ1c2hhIGZyb20gJ3J1c2hhJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgZGVmYXVsdFByZWZpeCA9ICdfX2RhY3R5bG9ncmFwaHN5JyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ydXNoYSA9IG5ldyBSdXNoYSgpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNhY2hlUHJlZml4ID0gdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4IHx8IGRlZmF1bHRQcmVmaXg7XG4gICAgdGhpcy5pc1N1cHBvcnRlZCA9IHRoaXMuc3VwcG9ydGVkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwcFByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCA9IGAke3RoaXMuY2FjaGVQcmVmaXh9LS0ke3RoaXMub3B0aW9ucy5hcHBQcmVmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggKz0gJ19fJztcbiAgICB9XG4gIH1cblxuICBnZXRQcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVQcmVmaXg7XG4gIH1cblxuICBpc0l0ZW1WYWxpZChib2R5LCBzaGExKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucnVzaGEuZGlnZXN0RnJvbVN0cmluZyhib2R5KSA9PT0gc2hhMVxuICAgICk7XG4gIH1cblxuICBwYXJzZShpdGVtKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XG4gIH1cblxuICBnZXQoa2V5LCBkZWZhdWx0VmFsdWUsIHNoYTEgPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmVqZWN0KCk7IH1cblxuICAgICAgbGV0XG4gICAgICAgIF9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7XG5cbiAgICAgIGlmIChfaXRlbSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUsICdwbGFpbicsIGtleSk7XG5cbiAgICAgICAgcmVzb2x2ZShkZWZhdWx0VmFsdWUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChfaXRlbSAhPT0gbnVsbCAmJiBzaGExICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGb3VuZCBpdGVtIHdpdGgga2V5OiAke2tleX0gaW4gY2FjaGUgd2hpY2ggbmVlZHMgdmFsaWRhdGlvbi4uLmApO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSXRlbVZhbGlkKF9pdGVtLCBzaGExKSkge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLm1hdGNoZXMgZXhwZWN0ZWQgc2hhMSAke3NoYTF9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnBhcnNlKF9pdGVtKS5jb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZy5pbmZvKGAuLi5kb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBzaGExICR7c2hhMX0gLSBwcnVuaW5nLmApO1xuXG4gICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcblxuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF9pdGVtKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMucGFyc2UoX2l0ZW0pLmNvZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGRuXFwndCBmaW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZS5gKTtcblxuICAgICAgICByZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCkgIT09IG51bGw7XG4gIH1cblxuICByZW1vdmUodXJsKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWApOztcbiAgfVxuXG4gIHNldChjb2RlLCB0eXBlLCBrZXksIHNpbmd1bGFyQnkgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc2luZ3VsYXJCeSkgeyB0aGlzLmRlZHVwZShzaW5ndWxhckJ5KTsgfVxuXG4gICAgbGV0IGNhY2hlZCA9IHtcbiAgICAgIG5vdzogK25ldyBEYXRlKCksXG4gICAgICB1cmw6IGtleSxcbiAgICAgIGNvZGU6IGNvZGUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgc2luZ3VsYXJCeTogKCB0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycgKSA/IHNpbmd1bGFyQnkgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY2FjaGVkKVxuICAgICk7XG5cbiAgICByZXR1cm4gY2FjaGVkO1xuICB9XG5cbiAgZmx1c2goKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBSZW1vdmluZyBpdGVtICR7a2V5fSByZXF1ZXN0ZWQgYnkgZmx1c2guYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1cHBvcnRlZCgpIHtcbiAgICBsZXRcbiAgICAgIGl0ZW0gPSAnX19kYWN0eWxvZ3JhcGhzeV9fZmVhdHVyZS1kZXRlY3Rpb24nO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGl0ZW0sIGl0ZW0pO1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2cud2FybignTG9jYWxzdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciAtIG5vIGNhY2hpbmchJyk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoc2luZ3VsYXJCeSkge1xuICAgIGZvciAobGV0IGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGRhY3R5bG9ncmFwaHN5SXRlbSA9IGtleS5pbmRleE9mKHRoaXMuY2FjaGVQcmVmaXgpID49IDA7XG4gICAgICBsZXRcbiAgICAgICAgaXRlbTtcblxuICAgICAgaWYgKCFkYWN0eWxvZ3JhcGhzeUl0ZW0pIHsgY29udGludWU7IH1cblxuICAgICAgaXRlbSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKCAodHlwZW9mIHNpbmd1bGFyQnkgPT09ICdzdHJpbmcnKSAmJiAodHlwZW9mIGl0ZW0uc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICkgJiZcbiAgICAgICAgaXRlbS5zaW5ndWxhckJ5ID09PSBzaW5ndWxhckJ5XG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sb2cubG9nKGBEZWR1cGluZyBieSAke3Npbmd1bGFyQnl9IGJlZm9yZSBhZGRpbmcgZHVwZSBpbiAke2tleX0uYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhY2hlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIHtcblxuICAvLyBOb3QgbGV2ZWwgYm91bmQgbG9nZ2luZyBuZWVkZWQgeWV0XG4gIGNvbnN0cnVjdG9yKGVuYWJsZWQgPSB0cnVlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlZDtcblxuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICAgIH1cbiAgfVxuXG4gIGxvZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgaW5mbygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5pbmZvKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkgeyB0aGlzLmNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBkZWJ1ZygpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5kZWJ1ZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBlcnJvcigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpOyB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvZy5qc1xuICoqLyIsImNvbnN0XG4gIGdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIGNvbnN0XG4gICAgICBxdWVyeSA9IHVybCxcbiAgICAgIHJlZ2V4ID0gL1s/JjtdKC4rPyk9KFteJjtdKykvZztcbiAgICBsZXRcbiAgICAgIHBhcmFtcyxcbiAgICAgIG1hdGNoO1xuXG4gICAgcGFyYW1zID0ge307XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4LmV4ZWMocXVlcnkpKSB7XG4gICAgICAgIHBhcmFtc1ttYXRjaFsxXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVybFBhcmFtKHBhcmFtLCBpZlVuc2V0ID0gbnVsbCwgdXJsID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xuICBjb25zdFxuICAgIHBhcmFtcyA9IGdldFBhcmFtcyh1cmwpO1xuXG4gIHJldHVybiBwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pID8gcGFyYW1zW3BhcmFtXSA6IGlmVW5zZXQ7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXJsLmpzXG4gKiovIiwiLypcbiAqIFJ1c2hhLCBhIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsXG4gKiBhcyBkZWZpbmVkIGluIEZJUFMgUFVCIDE4MC0xLCB0dW5lZCBmb3IgaGlnaCBwZXJmb3JtYW5jZSB3aXRoIGxhcmdlIGlucHV0cy5cbiAqIChodHRwOi8vZ2l0aHViLmNvbS9zcmlqcy9ydXNoYSlcbiAqXG4gKiBJbnNwaXJlZCBieSBQYXVsIEpvaG5zdG9ucyBpbXBsZW1lbnRhdGlvbiAoaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSkuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIFNhbSBSaWpzIChodHRwOi8vYXdlc2FtLmRlKS5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIGxpY2Vuc2UgYXMgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuICogY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLFxuICogdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvblxuICogdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsXG4gKiBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcbiAqIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICogSU4gVEhFIFNPRlRXQVJFLlxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciB1dGlsID0ge1xuICAgICAgICAgICAgZ2V0RGF0YVR5cGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdidWZmZXInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ZpZXcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdibG9iJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBkYXRhIHR5cGUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgLy8gVGhlIFJ1c2hhIG9iamVjdCBpcyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBsb3ctbGV2ZWwgUnVzaGFDb3JlLlxuICAgIC8vIEl0IHByb3ZpZGVzIG1lYW5zIG9mIGNvbnZlcnRpbmcgZGlmZmVyZW50IGlucHV0cyB0byB0aGVcbiAgICAvLyBmb3JtYXQgYWNjZXB0ZWQgYnkgUnVzaGFDb3JlIGFzIHdlbGwgYXMgb3RoZXIgdXRpbGl0eSBtZXRob2RzLlxuICAgIGZ1bmN0aW9uIFJ1c2hhKGNodW5rU2l6ZSkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIC8vIFByaXZhdGUgb2JqZWN0IHN0cnVjdHVyZS5cbiAgICAgICAgdmFyIHNlbGYkMiA9IHsgZmlsbDogMCB9O1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiBidWZmZXIgdGhhdCB0aGUgc2hhMSByb3V0aW5lIHVzZXNcbiAgICAgICAgLy8gaW5jbHVkaW5nIHRoZSBwYWRkaW5nLlxuICAgICAgICB2YXIgcGFkbGVuID0gZnVuY3Rpb24gKGxlbikge1xuICAgICAgICAgICAgZm9yIChsZW4gKz0gOTsgbGVuICUgNjQgPiAwOyBsZW4gKz0gMSk7XG4gICAgICAgICAgICByZXR1cm4gbGVuO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGFkWmVyb2VzID0gZnVuY3Rpb24gKGJpbiwgbGVuKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbGVuID4+IDI7IGkgPCBiaW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgYmluW2ldID0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhZERhdGEgPSBmdW5jdGlvbiAoYmluLCBjaHVua0xlbiwgbXNnTGVuKSB7XG4gICAgICAgICAgICBiaW5bY2h1bmtMZW4gPj4gMl0gfD0gMTI4IDw8IDI0IC0gKGNodW5rTGVuICUgNCA8PCAzKTtcbiAgICAgICAgICAgIGJpblsoKGNodW5rTGVuID4+IDIpICsgMiAmIH4xNSkgKyAxNF0gPSBtc2dMZW4gPj4gMjk7XG4gICAgICAgICAgICBiaW5bKChjaHVua0xlbiA+PiAyKSArIDIgJiB+MTUpICsgMTVdID0gbXNnTGVuIDw8IDM7XG4gICAgICAgIH07XG4gICAgICAgIC8vIENvbnZlcnQgYSBiaW5hcnkgc3RyaW5nIGFuZCB3cml0ZSBpdCB0byB0aGUgaGVhcC5cbiAgICAgICAgLy8gQSBiaW5hcnkgc3RyaW5nIGlzIGV4cGVjdGVkIHRvIG9ubHkgY29udGFpbiBjaGFyIGNvZGVzIDwgMjU2LlxuICAgICAgICB2YXIgY29udlN0ciA9IGZ1bmN0aW9uIChIOCwgSDMyLCBzdGFydCwgbGVuLCBvZmYpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSB0aGlzLCBpLCBvbSA9IG9mZiAlIDQsIGxtID0gbGVuICUgNCwgaiA9IGxlbiAtIGxtO1xuICAgICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvbSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMyB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQpO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMiB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyAxKTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiArIDEgfCAwXSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgMik7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgfCAwXSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gb207IGkgPCBqOyBpID0gaSArIDQgfCAwKSB7XG4gICAgICAgICAgICAgICAgSDMyW29mZiArIGkgPj4gMl0gPSBzdHIuY2hhckNvZGVBdChzdGFydCArIGkpIDw8IDI0IHwgc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyBpICsgMSkgPDwgMTYgfCBzdHIuY2hhckNvZGVBdChzdGFydCArIGkgKyAyKSA8PCA4IHwgc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyBpICsgMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGxtKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDEgfCAwXSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgaiArIDIpO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIEg4W29mZiArIGogKyAyIHwgMF0gPSBzdHIuY2hhckNvZGVBdChzdGFydCArIGogKyAxKTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMyB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyBqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ29udmVydCBhIGJ1ZmZlciBvciBhcnJheSBhbmQgd3JpdGUgaXQgdG8gdGhlIGhlYXAuXG4gICAgICAgIC8vIFRoZSBidWZmZXIgb3IgYXJyYXkgaXMgZXhwZWN0ZWQgdG8gb25seSBjb250YWluIGVsZW1lbnRzIDwgMjU2LlxuICAgICAgICB2YXIgY29udkJ1ZiA9IGZ1bmN0aW9uIChIOCwgSDMyLCBzdGFydCwgbGVuLCBvZmYpIHtcbiAgICAgICAgICAgIHZhciBidWYgPSB0aGlzLCBpLCBvbSA9IG9mZiAlIDQsIGxtID0gbGVuICUgNCwgaiA9IGxlbiAtIGxtO1xuICAgICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvbSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMyB8IDBdID0gYnVmW3N0YXJ0XTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiArIDIgfCAwXSA9IGJ1ZltzdGFydCArIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMSB8IDBdID0gYnVmW3N0YXJ0ICsgMl07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgfCAwXSA9IGJ1ZltzdGFydCArIDNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDQgLSBvbTsgaSA8IGo7IGkgPSBpICs9IDQgfCAwKSB7XG4gICAgICAgICAgICAgICAgSDMyW29mZiArIGkgPj4gMl0gPSBidWZbc3RhcnQgKyBpXSA8PCAyNCB8IGJ1ZltzdGFydCArIGkgKyAxXSA8PCAxNiB8IGJ1ZltzdGFydCArIGkgKyAyXSA8PCA4IHwgYnVmW3N0YXJ0ICsgaSArIDNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChsbSkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIEg4W29mZiArIGogKyAxIHwgMF0gPSBidWZbc3RhcnQgKyBqICsgMl07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDIgfCAwXSA9IGJ1ZltzdGFydCArIGogKyAxXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMyB8IDBdID0gYnVmW3N0YXJ0ICsgal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjb252QmxvYiA9IGZ1bmN0aW9uIChIOCwgSDMyLCBzdGFydCwgbGVuLCBvZmYpIHtcbiAgICAgICAgICAgIHZhciBibG9iID0gdGhpcywgaSwgb20gPSBvZmYgJSA0LCBsbSA9IGxlbiAlIDQsIGogPSBsZW4gLSBsbTtcbiAgICAgICAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheShyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYi5zbGljZShzdGFydCwgc3RhcnQgKyBsZW4pKSk7XG4gICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9tKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAzIHwgMF0gPSBidWZbMF07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAyIHwgMF0gPSBidWZbMV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAxIHwgMF0gPSBidWZbMl07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgfCAwXSA9IGJ1ZlszXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSA0IC0gb207IGkgPCBqOyBpID0gaSArPSA0IHwgMCkge1xuICAgICAgICAgICAgICAgIEgzMltvZmYgKyBpID4+IDJdID0gYnVmW2ldIDw8IDI0IHwgYnVmW2kgKyAxXSA8PCAxNiB8IGJ1ZltpICsgMl0gPDwgOCB8IGJ1ZltpICsgM107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGxtKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDEgfCAwXSA9IGJ1ZltqICsgMl07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDIgfCAwXSA9IGJ1ZltqICsgMV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDMgfCAwXSA9IGJ1ZltqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbnZGbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHV0aWwuZ2V0RGF0YVR5cGUoZGF0YSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnZTdHIuYmluZChkYXRhKTtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udkJ1Zi5iaW5kKGRhdGEpO1xuICAgICAgICAgICAgY2FzZSAnYnVmZmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udkJ1Zi5iaW5kKGRhdGEpO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb252QnVmLmJpbmQobmV3IFVpbnQ4QXJyYXkoZGF0YSkpO1xuICAgICAgICAgICAgY2FzZSAndmlldyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnZCdWYuYmluZChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb252QmxvYi5iaW5kKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2xpY2UgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHV0aWwuZ2V0RGF0YVR5cGUoZGF0YSkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5zbGljZShvZmZzZXQpO1xuICAgICAgICAgICAgY2FzZSAnYnVmZmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5zbGljZShvZmZzZXQpO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnNsaWNlKG9mZnNldCk7XG4gICAgICAgICAgICBjYXNlICd2aWV3JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5idWZmZXIuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ29udmVydCBhbiBBcnJheUJ1ZmZlciBpbnRvIGl0cyBoZXhhZGVjaW1hbCBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICAgIHZhciBoZXggPSBmdW5jdGlvbiAoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHZhciBpLCB4LCBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnLCByZXMgPSBbXSwgYmluYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYmluYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB4ID0gYmluYXJyYXlbaV07XG4gICAgICAgICAgICAgICAgcmVzW2ldID0gaGV4X3RhYi5jaGFyQXQoeCA+PiA0ICYgMTUpICsgaGV4X3RhYi5jaGFyQXQoeCA+PiAwICYgMTUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNlaWxIZWFwU2l6ZSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAvLyBUaGUgYXNtLmpzIHNwZWMgc2F5czpcbiAgICAgICAgICAgIC8vIFRoZSBoZWFwIG9iamVjdCdzIGJ5dGVMZW5ndGggbXVzdCBiZSBlaXRoZXJcbiAgICAgICAgICAgIC8vIDJebiBmb3IgbiBpbiBbMTIsIDI0KSBvciAyXjI0ICogbiBmb3IgbiDiiaUgMS5cbiAgICAgICAgICAgIC8vIEFsc28sIGJ5dGVMZW5ndGhzIHNtYWxsZXIgdGhhbiAyXjE2IGFyZSBkZXByZWNhdGVkLlxuICAgICAgICAgICAgdmFyIHA7XG4gICAgICAgICAgICAvLyBJZiB2IGlzIHNtYWxsZXIgdGhhbiAyXjE2LCB0aGUgc21hbGxlc3QgcG9zc2libGUgc29sdXRpb25cbiAgICAgICAgICAgIC8vIGlzIDJeMTYuXG4gICAgICAgICAgICBpZiAodiA8PSA2NTUzNilcbiAgICAgICAgICAgICAgICByZXR1cm4gNjU1MzY7XG4gICAgICAgICAgICAvLyBJZiB2IDwgMl4yNCwgd2Ugcm91bmQgdXAgdG8gMl5uLFxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIHJvdW5kIHVwIHRvIDJeMjQgKiBuLlxuICAgICAgICAgICAgaWYgKHYgPCAxNjc3NzIxNikge1xuICAgICAgICAgICAgICAgIGZvciAocCA9IDE7IHAgPCB2OyBwID0gcCA8PCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChwID0gMTY3NzcyMTY7IHAgPCB2OyBwICs9IDE2Nzc3MjE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZXMgdG8gYSBuZXcgY2FwYWNpdHkuXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgICAgIGlmIChzaXplICUgNjQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaHVuayBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxMjggYml0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmJDIubWF4Q2h1bmtMZW4gPSBzaXplO1xuICAgICAgICAgICAgc2VsZiQyLnBhZE1heENodW5rTGVuID0gcGFkbGVuKHNpemUpO1xuICAgICAgICAgICAgLy8gVGhlIHNpemUgb2YgdGhlIGhlYXAgaXMgdGhlIHN1bSBvZjpcbiAgICAgICAgICAgIC8vIDEuIFRoZSBwYWRkZWQgaW5wdXQgbWVzc2FnZSBzaXplXG4gICAgICAgICAgICAvLyAyLiBUaGUgZXh0ZW5kZWQgc3BhY2UgdGhlIGFsZ29yaXRobSBuZWVkcyAoMzIwIGJ5dGUpXG4gICAgICAgICAgICAvLyAzLiBUaGUgMTYwIGJpdCBzdGF0ZSB0aGUgYWxnb3JpdG0gdXNlc1xuICAgICAgICAgICAgc2VsZiQyLmhlYXAgPSBuZXcgQXJyYXlCdWZmZXIoY2VpbEhlYXBTaXplKHNlbGYkMi5wYWRNYXhDaHVua0xlbiArIDMyMCArIDIwKSk7XG4gICAgICAgICAgICBzZWxmJDIuaDMyID0gbmV3IEludDMyQXJyYXkoc2VsZiQyLmhlYXApO1xuICAgICAgICAgICAgc2VsZiQyLmg4ID0gbmV3IEludDhBcnJheShzZWxmJDIuaGVhcCk7XG4gICAgICAgICAgICBzZWxmJDIuY29yZSA9IG5ldyBSdXNoYS5fY29yZSh7XG4gICAgICAgICAgICAgICAgSW50MzJBcnJheTogSW50MzJBcnJheSxcbiAgICAgICAgICAgICAgICBEYXRhVmlldzogRGF0YVZpZXdcbiAgICAgICAgICAgIH0sIHt9LCBzZWxmJDIuaGVhcCk7XG4gICAgICAgICAgICBzZWxmJDIuYnVmZmVyID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSWluaXRpYWxpemV0aGUgZGF0YXN0cnVjdHVyZXMgYWNjb3JkaW5nXG4gICAgICAgIC8vIHRvIGEgY2h1bmsgc2l5emUuXG4gICAgICAgIGluaXQoY2h1bmtTaXplIHx8IDY0ICogMTAyNCk7XG4gICAgICAgIHZhciBpbml0U3RhdGUgPSBmdW5jdGlvbiAoaGVhcCwgcGFkTXNnTGVuKSB7XG4gICAgICAgICAgICB2YXIgaW8gPSBuZXcgSW50MzJBcnJheShoZWFwLCBwYWRNc2dMZW4gKyAzMjAsIDUpO1xuICAgICAgICAgICAgaW9bMF0gPSAxNzMyNTg0MTkzO1xuICAgICAgICAgICAgaW9bMV0gPSAtMjcxNzMzODc5O1xuICAgICAgICAgICAgaW9bMl0gPSAtMTczMjU4NDE5NDtcbiAgICAgICAgICAgIGlvWzNdID0gMjcxNzMzODc4O1xuICAgICAgICAgICAgaW9bNF0gPSAtMTAwOTU4OTc3NjtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhZENodW5rID0gZnVuY3Rpb24gKGNodW5rTGVuLCBtc2dMZW4pIHtcbiAgICAgICAgICAgIHZhciBwYWRDaHVua0xlbiA9IHBhZGxlbihjaHVua0xlbik7XG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBJbnQzMkFycmF5KHNlbGYkMi5oZWFwLCAwLCBwYWRDaHVua0xlbiA+PiAyKTtcbiAgICAgICAgICAgIHBhZFplcm9lcyh2aWV3LCBjaHVua0xlbik7XG4gICAgICAgICAgICBwYWREYXRhKHZpZXcsIGNodW5rTGVuLCBtc2dMZW4pO1xuICAgICAgICAgICAgcmV0dXJuIHBhZENodW5rTGVuO1xuICAgICAgICB9O1xuICAgICAgICAvLyBXcml0ZSBkYXRhIHRvIHRoZSBoZWFwLlxuICAgICAgICB2YXIgd3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgY2h1bmtPZmZzZXQsIGNodW5rTGVuKSB7XG4gICAgICAgICAgICBjb252Rm4oZGF0YSkoc2VsZiQyLmg4LCBzZWxmJDIuaDMyLCBjaHVua09mZnNldCwgY2h1bmtMZW4sIDApO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJbml0aWFsaXplIGFuZCBjYWxsIHRoZSBSdXNoYUNvcmUsXG4gICAgICAgIC8vIGFzc3VtaW5nIGFuIGlucHV0IGJ1ZmZlciBvZiBsZW5ndGggbGVuICogNC5cbiAgICAgICAgdmFyIGNvcmVDYWxsID0gZnVuY3Rpb24gKGRhdGEsIGNodW5rT2Zmc2V0LCBjaHVua0xlbiwgbXNnTGVuLCBmaW5hbGl6ZSkge1xuICAgICAgICAgICAgdmFyIHBhZENodW5rTGVuID0gY2h1bmtMZW47XG4gICAgICAgICAgICBpZiAoZmluYWxpemUpIHtcbiAgICAgICAgICAgICAgICBwYWRDaHVua0xlbiA9IHBhZENodW5rKGNodW5rTGVuLCBtc2dMZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3JpdGUoZGF0YSwgY2h1bmtPZmZzZXQsIGNodW5rTGVuKTtcbiAgICAgICAgICAgIHNlbGYkMi5jb3JlLmhhc2gocGFkQ2h1bmtMZW4sIHNlbGYkMi5wYWRNYXhDaHVua0xlbik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRSYXdEaWdlc3QgPSBmdW5jdGlvbiAoaGVhcCwgcGFkTWF4Q2h1bmtMZW4pIHtcbiAgICAgICAgICAgIHZhciBpbyA9IG5ldyBJbnQzMkFycmF5KGhlYXAsIHBhZE1heENodW5rTGVuICsgMzIwLCA1KTtcbiAgICAgICAgICAgIHZhciBvdXQgPSBuZXcgSW50MzJBcnJheSg1KTtcbiAgICAgICAgICAgIHZhciBhcnIgPSBuZXcgRGF0YVZpZXcob3V0LmJ1ZmZlcik7XG4gICAgICAgICAgICBhcnIuc2V0SW50MzIoMCwgaW9bMF0sIGZhbHNlKTtcbiAgICAgICAgICAgIGFyci5zZXRJbnQzMig0LCBpb1sxXSwgZmFsc2UpO1xuICAgICAgICAgICAgYXJyLnNldEludDMyKDgsIGlvWzJdLCBmYWxzZSk7XG4gICAgICAgICAgICBhcnIuc2V0SW50MzIoMTIsIGlvWzNdLCBmYWxzZSk7XG4gICAgICAgICAgICBhcnIuc2V0SW50MzIoMTYsIGlvWzRdLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9O1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGhhc2ggZGlnZXN0IGFzIGFuIGFycmF5IG9mIDUgMzJiaXQgaW50ZWdlcnMuXG4gICAgICAgIHZhciByYXdEaWdlc3QgPSB0aGlzLnJhd0RpZ2VzdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbXNnTGVuID0gc3RyLmJ5dGVMZW5ndGggfHwgc3RyLmxlbmd0aCB8fCBzdHIuc2l6ZSB8fCAwO1xuICAgICAgICAgICAgICAgIGluaXRTdGF0ZShzZWxmJDIuaGVhcCwgc2VsZiQyLnBhZE1heENodW5rTGVuKTtcbiAgICAgICAgICAgICAgICB2YXIgY2h1bmtPZmZzZXQgPSAwLCBjaHVua0xlbiA9IHNlbGYkMi5tYXhDaHVua0xlbiwgbGFzdDtcbiAgICAgICAgICAgICAgICBmb3IgKGNodW5rT2Zmc2V0ID0gMDsgbXNnTGVuID4gY2h1bmtPZmZzZXQgKyBjaHVua0xlbjsgY2h1bmtPZmZzZXQgKz0gY2h1bmtMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29yZUNhbGwoc3RyLCBjaHVua09mZnNldCwgY2h1bmtMZW4sIG1zZ0xlbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3JlQ2FsbChzdHIsIGNodW5rT2Zmc2V0LCBtc2dMZW4gLSBjaHVua09mZnNldCwgbXNnTGVuLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0UmF3RGlnZXN0KHNlbGYkMi5oZWFwLCBzZWxmJDIucGFkTWF4Q2h1bmtMZW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgLy8gVGhlIGRpZ2VzdCBhbmQgZGlnZXN0RnJvbSogaW50ZXJmYWNlIHJldHVybnMgdGhlIGhhc2ggZGlnZXN0XG4gICAgICAgIC8vIGFzIGEgaGV4IHN0cmluZy5cbiAgICAgICAgdGhpcy5kaWdlc3QgPSB0aGlzLmRpZ2VzdEZyb21TdHJpbmcgPSB0aGlzLmRpZ2VzdEZyb21CdWZmZXIgPSB0aGlzLmRpZ2VzdEZyb21BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBoZXgocmF3RGlnZXN0KHN0cikuYnVmZmVyKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgO1xuICAgIC8vIFRoZSBsb3ctbGV2ZWwgUnVzaENvcmUgbW9kdWxlIHByb3ZpZGVzIHRoZSBoZWFydCBvZiBSdXNoYSxcbiAgICAvLyBhIGhpZ2gtc3BlZWQgc2hhMSBpbXBsZW1lbnRhdGlvbiB3b3JraW5nIG9uIGFuIEludDMyQXJyYXkgaGVhcC5cbiAgICAvLyBBdCBmaXJzdCBnbGFuY2UsIHRoZSBpbXBsZW1lbnRhdGlvbiBzZWVtcyBjb21wbGljYXRlZCwgaG93ZXZlclxuICAgIC8vIHdpdGggdGhlIFNIQTEgc3BlYyBhdCBoYW5kLCBpdCBpcyBvYnZpb3VzIHRoaXMgYWxtb3N0IGEgdGV4dGJvb2tcbiAgICAvLyBpbXBsZW1lbnRhdGlvbiB0aGF0IGhhcyBhIGZldyBmdW5jdGlvbnMgaGFuZC1pbmxpbmVkIGFuZCBhIGZldyBsb29wc1xuICAgIC8vIGhhbmQtdW5yb2xsZWQuXG4gICAgUnVzaGEuX2NvcmUgPSBmdW5jdGlvbiBSdXNoYUNvcmUoc3RkbGliLCBmb3JlaWduLCBoZWFwKSB7XG4gICAgICAgICd1c2UgYXNtJztcbiAgICAgICAgdmFyIEggPSBuZXcgc3RkbGliLkludDMyQXJyYXkoaGVhcCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhc2goaywgeCkge1xuICAgICAgICAgICAgLy8gayBpbiBieXRlc1xuICAgICAgICAgICAgayA9IGsgfCAwO1xuICAgICAgICAgICAgeCA9IHggfCAwO1xuICAgICAgICAgICAgdmFyIGkgPSAwLCBqID0gMCwgeTAgPSAwLCB6MCA9IDAsIHkxID0gMCwgejEgPSAwLCB5MiA9IDAsIHoyID0gMCwgeTMgPSAwLCB6MyA9IDAsIHk0ID0gMCwgejQgPSAwLCB0MCA9IDAsIHQxID0gMDtcbiAgICAgICAgICAgIHkwID0gSFt4ICsgMzIwID4+IDJdIHwgMDtcbiAgICAgICAgICAgIHkxID0gSFt4ICsgMzI0ID4+IDJdIHwgMDtcbiAgICAgICAgICAgIHkyID0gSFt4ICsgMzI4ID4+IDJdIHwgMDtcbiAgICAgICAgICAgIHkzID0gSFt4ICsgMzMyID4+IDJdIHwgMDtcbiAgICAgICAgICAgIHk0ID0gSFt4ICsgMzM2ID4+IDJdIHwgMDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IChpIHwgMCkgPCAoayB8IDApOyBpID0gaSArIDY0IHwgMCkge1xuICAgICAgICAgICAgICAgIHowID0geTA7XG4gICAgICAgICAgICAgICAgejEgPSB5MTtcbiAgICAgICAgICAgICAgICB6MiA9IHkyO1xuICAgICAgICAgICAgICAgIHozID0geTM7XG4gICAgICAgICAgICAgICAgejQgPSB5NDtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyAoaiB8IDApIDwgNjQ7IGogPSBqICsgNCB8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdDEgPSBIW2kgKyBqID4+IDJdIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdDAgPSAoKHkwIDw8IDUgfCB5MCA+Pj4gMjcpICsgKHkxICYgeTIgfCB+eTEgJiB5MykgfCAwKSArICgodDEgKyB5NCB8IDApICsgMTUxODUwMDI0OSB8IDApIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgeTQgPSB5MztcbiAgICAgICAgICAgICAgICAgICAgeTMgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgeTIgPSB5MSA8PCAzMCB8IHkxID4+PiAyO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHQwO1xuICAgICAgICAgICAgICAgICAgICBIW2sgKyBqID4+IDJdID0gdDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaiA9IGsgKyA2NCB8IDA7IChqIHwgMCkgPCAoayArIDgwIHwgMCk7IGogPSBqICsgNCB8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdDEgPSAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pIDw8IDEgfCAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pID4+PiAzMTtcbiAgICAgICAgICAgICAgICAgICAgdDAgPSAoKHkwIDw8IDUgfCB5MCA+Pj4gMjcpICsgKHkxICYgeTIgfCB+eTEgJiB5MykgfCAwKSArICgodDEgKyB5NCB8IDApICsgMTUxODUwMDI0OSB8IDApIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgeTQgPSB5MztcbiAgICAgICAgICAgICAgICAgICAgeTMgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgeTIgPSB5MSA8PCAzMCB8IHkxID4+PiAyO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHQwO1xuICAgICAgICAgICAgICAgICAgICBIW2ogPj4gMl0gPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChqID0gayArIDgwIHwgMDsgKGogfCAwKSA8IChrICsgMTYwIHwgMCk7IGogPSBqICsgNCB8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdDEgPSAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pIDw8IDEgfCAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pID4+PiAzMTtcbiAgICAgICAgICAgICAgICAgICAgdDAgPSAoKHkwIDw8IDUgfCB5MCA+Pj4gMjcpICsgKHkxIF4geTIgXiB5MykgfCAwKSArICgodDEgKyB5NCB8IDApICsgMTg1OTc3NTM5MyB8IDApIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgeTQgPSB5MztcbiAgICAgICAgICAgICAgICAgICAgeTMgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgeTIgPSB5MSA8PCAzMCB8IHkxID4+PiAyO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHQwO1xuICAgICAgICAgICAgICAgICAgICBIW2ogPj4gMl0gPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChqID0gayArIDE2MCB8IDA7IChqIHwgMCkgPCAoayArIDI0MCB8IDApOyBqID0gaiArIDQgfCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHQxID0gKEhbaiAtIDEyID4+IDJdIF4gSFtqIC0gMzIgPj4gMl0gXiBIW2ogLSA1NiA+PiAyXSBeIEhbaiAtIDY0ID4+IDJdKSA8PCAxIHwgKEhbaiAtIDEyID4+IDJdIF4gSFtqIC0gMzIgPj4gMl0gXiBIW2ogLSA1NiA+PiAyXSBeIEhbaiAtIDY0ID4+IDJdKSA+Pj4gMzE7XG4gICAgICAgICAgICAgICAgICAgIHQwID0gKCh5MCA8PCA1IHwgeTAgPj4+IDI3KSArICh5MSAmIHkyIHwgeTEgJiB5MyB8IHkyICYgeTMpIHwgMCkgKyAoKHQxICsgeTQgfCAwKSAtIDE4OTQwMDc1ODggfCAwKSB8IDA7XG4gICAgICAgICAgICAgICAgICAgIHk0ID0geTM7XG4gICAgICAgICAgICAgICAgICAgIHkzID0geTI7XG4gICAgICAgICAgICAgICAgICAgIHkyID0geTEgPDwgMzAgfCB5MSA+Pj4gMjtcbiAgICAgICAgICAgICAgICAgICAgeTEgPSB5MDtcbiAgICAgICAgICAgICAgICAgICAgeTAgPSB0MDtcbiAgICAgICAgICAgICAgICAgICAgSFtqID4+IDJdID0gdDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaiA9IGsgKyAyNDAgfCAwOyAoaiB8IDApIDwgKGsgKyAzMjAgfCAwKTsgaiA9IGogKyA0IHwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0MSA9IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPDwgMSB8IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPj4+IDMxO1xuICAgICAgICAgICAgICAgICAgICB0MCA9ICgoeTAgPDwgNSB8IHkwID4+PiAyNykgKyAoeTEgXiB5MiBeIHkzKSB8IDApICsgKCh0MSArIHk0IHwgMCkgLSA4OTk0OTc1MTQgfCAwKSB8IDA7XG4gICAgICAgICAgICAgICAgICAgIHk0ID0geTM7XG4gICAgICAgICAgICAgICAgICAgIHkzID0geTI7XG4gICAgICAgICAgICAgICAgICAgIHkyID0geTEgPDwgMzAgfCB5MSA+Pj4gMjtcbiAgICAgICAgICAgICAgICAgICAgeTEgPSB5MDtcbiAgICAgICAgICAgICAgICAgICAgeTAgPSB0MDtcbiAgICAgICAgICAgICAgICAgICAgSFtqID4+IDJdID0gdDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHkwID0geTAgKyB6MCB8IDA7XG4gICAgICAgICAgICAgICAgeTEgPSB5MSArIHoxIHwgMDtcbiAgICAgICAgICAgICAgICB5MiA9IHkyICsgejIgfCAwO1xuICAgICAgICAgICAgICAgIHkzID0geTMgKyB6MyB8IDA7XG4gICAgICAgICAgICAgICAgeTQgPSB5NCArIHo0IHwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEhbeCArIDMyMCA+PiAyXSA9IHkwO1xuICAgICAgICAgICAgSFt4ICsgMzI0ID4+IDJdID0geTE7XG4gICAgICAgICAgICBIW3ggKyAzMjggPj4gMl0gPSB5MjtcbiAgICAgICAgICAgIEhbeCArIDMzMiA+PiAyXSA9IHkzO1xuICAgICAgICAgICAgSFt4ICsgMzM2ID4+IDJdID0geTQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzaDogaGFzaCB9O1xuICAgIH07XG4gICAgLy8gSWYgd2UnZSBydW5uaW5nIGluIE5vZGUuSlMsIGV4cG9ydCBhIG1vZHVsZS5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBSdXNoYTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvdy5SdXNoYSA9IFJ1c2hhO1xuICAgIH1cbiAgICAvLyBJZiB3ZSdyZSBydW5uaW5nIGluIGEgd2Vid29ya2VyLCBhY2NlcHRcbiAgICAvLyBtZXNzYWdlcyBjb250YWluaW5nIGEgam9iaWQgYW5kIGEgYnVmZmVyXG4gICAgLy8gb3IgYmxvYiBvYmplY3QsIGFuZCByZXR1cm4gdGhlIGhhc2ggcmVzdWx0LlxuICAgIGlmICh0eXBlb2YgRmlsZVJlYWRlclN5bmMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlclN5bmMoKSwgaGFzaGVyID0gbmV3IFJ1c2hhKDQgKiAxMDI0ICogMTAyNCk7XG4gICAgICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFzaCwgZGF0YSA9IGV2ZW50LmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IGhhc2hlci5kaWdlc3QoZGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBldmVudC5kYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICBoYXNoOiBoYXNoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBldmVudC5kYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZS5uYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSgpKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ydXNoYS9ydXNoYS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Q3NzLCBKc30gZnJvbSAnLi9kb20nO1xuaW1wb3J0IEFqYXggZnJvbSAnLi9hamF4JztcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGdldFVybFBhcmFtIGZyb20gJy4vdXJsJztcblxuZXhwb3J0IGNsYXNzIE1hbmlmZXN0IHtcbiAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICBjb25zdCB7IGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSB9ID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgLmdldCh0aGlzLnVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICB0ZXh0OiByZXNwb25zZVRleHQsXG4gICAgICAgICAgdXJsOiByZXNwb25zZVVybFxuICAgICAgICB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmV0Y2hlZCBtYW5pZmVzdCBmcm9tIHVybDogJHtyZXNwb25zZVVybH0uYCk7XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcbiAgICAgIH0sIHhociA9PiB7XG4gICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZCBub3QgZmV0Y2ggbWFuaWZlc3Qgd2l0aCB1cmw6ICR7eGhyLnJlc3BvbnNlVVJMfSFgKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgbWFuaWZlc3RzLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2VcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhcbiAgICAgIGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJywgZW5hYmxlTG9nZ2luZylcbiAgICApO1xuXG4gICAgdGhpcy5tYW5pZmVzdHMgPSB7fTtcbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgbWFuaWZlc3RzLmZvckVhY2gobWFuaWZlc3QgPT4geyB0aGlzLm1hbmlmZXN0c1ttYW5pZmVzdC5wYWNrYWdlXSA9IG1hbmlmZXN0OyB9KTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5wcmVmaXggPSBvcHRpb25zLnByZWZpeDtcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlcjtcbiAgfVxuXG4gIGluamVjdCgpIHtcbiAgICBjb25zdFxuICAgICAgZmxhdHRlbiA9IGxpc3QgPT4gbGlzdC5yZWR1Y2UoXG4gICAgICAgIChhLCBiKSA9PiBhLmNvbmNhdChBcnJheS5pc0FycmF5KGIpID8gZmxhdHRlbihiKSA6IGIpLCBbXVxuICAgICAgKSxcbiAgICAgIGluamVjdEludG9ET00gPSAoZGVwZW5kZW5jaWVzLCBpZHggPSAwKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkZXBlbmRlbmNpZXNbaWR4XTtcblxuICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxuICAgICAgICBlbHNlIGlmIChlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbygnSW5qZWN0aW5nIHRhZzonLCBlbGVtKTtcblxuICAgICAgICAgICAgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzLCArK2lkeCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7IHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChlbGVtKTsgfVxuXG4gICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIHRoaXMub3JkZXIubWFwKF9wYWNrYWdlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pIHtcbiAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgQ291bGRuXFwndCBmaW5kIHBhY2thZ2UgJHtfcGFja2FnZX0gZnJvbSBpbmplY3Rpb24gb3JkZXIuYCk7XG5cbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RNYW5pZmVzdCh0aGlzLm1hbmlmZXN0c1tfcGFja2FnZV0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICkudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gZmxhdHRlbihtYW5pZmVzdHMpO1xuXG4gICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcyk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVwZW5kZW5jaWVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdE1hbmlmZXN0KG1hbmlmZXN0KSB7XG4gICAgbGV0XG4gICAgICBoYXNoZXMgPSBPYmplY3Qua2V5cyhtYW5pZmVzdC5oYXNoZXMpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGhhc2hlcy5tYXAoaGFzaCA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgZGVwZW5kZW5jeSA9IG1hbmlmZXN0Lmhhc2hlc1toYXNoXSxcbiAgICAgICAgcm9vdFVybDtcblxuICAgICAgcm9vdFVybCA9IFttYW5pZmVzdC5yb290VXJsLCBtYW5pZmVzdC5wYWNrYWdlVXJsXS5maWx0ZXIoX3VybCA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgX3VybCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgX3VybCAhPT0gbnVsbFxuICAgICAgICApO1xuICAgICAgfSkuam9pbignLycpO1xuXG4gICAgICByZXR1cm4gdGhpcy5pbmplY3REZXBlbmRlbmN5KFxuICAgICAgICBkZXBlbmRlbmN5LFxuICAgICAgICByb290VXJsXG4gICAgICApO1xuICAgIH0pKTtcbiAgfVxuXG4gIGluamVjdERlcGVuZGVuY3koZGVwZW5kZW5jeSwgcm9vdFVybCkge1xuICAgIHN3aXRjaCAoZGVwZW5kZW5jeS5leHRlbnNpb24pIHtcbiAgICAgIGNhc2UgJy5jc3MnOlxuICAgICAgICByZXR1cm4gbmV3IENzcyhcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICkuaW5qZWN0KFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgY2FzZSAnLmpzJzpcbiAgICAgICAgcmV0dXJuIG5ldyBKcyhcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICkuaW5qZWN0KFxuICAgICAgICAgIHRoaXMudXJscyhkZXBlbmRlbmN5LCByb290VXJsKVxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBiYXNlbmFtZShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvLipcXC98XFwuW14uXSokL2csICcnKTtcbiAgfVxuXG4gIHVybHMoZGVwZW5kZW5jeSwgcm9vdFVybCA9ICcnKSB7XG4gICAgbGV0XG4gICAgICBiYXNlbmFtZSA9IHRoaXMuYmFzZW5hbWUoZGVwZW5kZW5jeS5maWxlKSxcbiAgICAgIHVybDtcblxuICAgIC8vIEZpbHRlciBvdXQgcG90ZW50aWFsIG51bGwgdmFsdWVzXG4gICAgLy8gcGFzc2VkIGluIGFzIHZhcmlvdXMgcGFydHMgb2YgYW4gdXJsLlxuICAgIHVybCA9IFt0aGlzLnByZWZpeCwgcm9vdFVybCwgZGVwZW5kZW5jeS5wYXRoXS5maWx0ZXIoX3VybCA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgX3VybCAhPT0gbnVsbFxuICAgICAgKTtcbiAgICB9KS5qb2luKCcvJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGFzaDogZGVwZW5kZW5jeS5oYXNoLFxuICAgICAgcHJpbnRlZDogYC8ke3VybH0vJHtiYXNlbmFtZX0tJHtkZXBlbmRlbmN5Lmhhc2h9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgcmF3OiBgLyR7dXJsfS8ke2Jhc2VuYW1lfSR7ZGVwZW5kZW5jeS5leHRlbnNpb259YCxcbiAgICAgIHNpbmd1bGFyQnk6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gXG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5qZWN0b3IuanNcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgSnMge1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBjb25maWcgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICBlbmFibGVMb2dnaW5nID0gZmFsc2UsXG4gICAgICB2ZXJpZmljYXRpb24gPSBmYWxzZVxuICAgIH0gPSBjb25maWc7XG5cbiAgICBlbmFibGVMb2dnaW5nID0gZ2V0VXJsUGFyYW0oXG4gICAgICAnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsXG4gICAgICBlbmFibGVMb2dnaW5nXG4gICAgKTtcblxuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICB0aGlzLmNhY2hlID0gbmV3IENhY2hlKHtcbiAgICAgIGFwcFByZWZpeDogY29uZmlnLmFwcFByZWZpeCxcbiAgICAgIGVuYWJsZUxvZ2dpbmc6IGVuYWJsZUxvZ2dpbmdcbiAgICB9KTtcblxuICAgIHRoaXMuY2FjaGVEZWxheSA9IGNvbmZpZy5jYWNoZURlbGF5IHx8IDUwMDA7XG4gICAgdGhpcy52ZXJpZmljYXRpb24gPSB2ZXJpZmljYXRpb247XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBpbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdGV4dCBmb3IgJHt1cmx9LmApO1xuXG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuXG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgICAke3RleHR9XG4gICAgICAgIC8vIyBzb3VyY2VVUkw9JHt1cmx9XG4gICAgICBgO1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKHNjcmlwdCkpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShzY3JpcHQpOyB9XG4gICAgfSk7XG4gIH1cblxuICBpbmplY3RXaXRoVXJsKHVybHMsIHdoaWNoVXJsID0gJ3ByaW50ZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgLy8gQ3JlYXRlIHNjcmlwdCBlbGVtZW50IGFuZCBzZXQgaXRzIHR5cGVcbiAgICAgIGxldFxuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSxcbiAgICAgICAgdXJsID0gdXJsc1t3aGljaFVybF07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5hc3luYyA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmRlZmVyID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdW5jYWNoZWQtanMnLCB0cnVlKTtcblxuICAgICAgLy8gQmluZCB0byByZWFkeVN0YXRlIG9yIHJlZ2lzdGVyIMK0b25sb2FkwrQgY2FsbGJhY2tcbiAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSkge1xuICAgICAgICAvLyBDYWxsYmFjayBmb3IgSUUncyBgb25yZWFkeXN0YXRlY2hhbmdlYCAoSSBmZWVsIHNlZXNpY2spXG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlID09PSAnbG9hZGVkJyB8fCBzY3JpcHQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQmluZCBgb25sb2FkYCBjYWxsYmFjayBvbiBzY3JpcHQgZWxlbWVudFxuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7IH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbmplY3QgdW5wcmludGVkIHdpdGhvdXQgY2FjaGluZyBpbiBjYXNlIG9mIGVycm9yXG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkIG5vdCBmZXRjaCBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IC0gZmFsbGluZyBiYWNrIHRvIHVucHJpbnRlZCB2ZXJzaW9uLmApO1xuXG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTsgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8c2NyaXB0IC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKHNjcmlwdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gLi4ubmVlZHMgY2FjaGluZyBtYW51YWxseSBjYXVzZSBuZXZlciBpbmplY3RlZFxuICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpOyB9XG5cbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZW5zdXJlQ2FjaGUodXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UsIGRlbGF5ID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNhY2hlLmhhcyh1cmwpKSB7IHJlc29sdmUoKTsgfVxuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRpbmcgSmF2YVNjcmlwdCBmcm9tICR7dXJsfSBmb3IgY2FjaGUgaW4gJHtkZWxheX0uYCk7XG5cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgbGV0IHsgdGV4dDogcmVzcG9uc2VUZXh0IH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChyZXNwb25zZVRleHQsICdqcycsIHVybCwgc2luZ3VsYXJCeSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIEphdmFTY3JpcHQgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgSmF2YVNjcmlwdCBmcm9tICR7dXJsfS5gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICBpbmplY3QodXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmhhc2gpXG4gICAgKS50aGVuKHRleHQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzcyB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIGNvbmZpZyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSxcbiAgICAgIHZlcmlmaWNhdGlvbiA9IGZhbHNlXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGVuYWJsZUxvZ2dpbmcgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJyxcbiAgICAgIGVuYWJsZUxvZ2dpbmdcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhY2hlRGVsYXkgPSBjb25maWcuY2FjaGVEZWxheSB8fCA1MDAwO1xuICAgIHRoaXMudmVyaWZpY2F0aW9uID0gdmVyaWZpY2F0aW9uO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKGVuYWJsZUxvZ2dpbmcpO1xuICB9XG5cbiAgZW5zdXJlQ2FjaGUodXJsLCBzaW5ndWxhckJ5ID0gZmFsc2UsIGRlbGF5ID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYExvYWRpbmcgQ1NTIGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXgoKVxuICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRleHQ6IHJlc3BvbnNlVGV4dCB9ID0gcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2NzcycsIHVybCwgc2luZ3VsYXJCeSk7XG5cbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYExvYWRlZCBDU1MgZnJvbSAke3VybH0gbm93IGNhY2hlZC5gKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZhaWxlZCBhdHRlbXB0aW5nIHRvIGNhY2hlIENTUyBmcm9tICR7dXJsfS5gKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBsZXRcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSxcbiAgICAgICAgdXJsID0gdXJsc1t3aGljaFVybF07XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1jc3MnLCB0cnVlKTtcblxuICAgICAgbGluay5ocmVmID0gdXJsO1xuXG4gICAgICAvLyBGYWxsYmFjayB0byB1bnByaW50ZWQgYXNzZXRzIGFmdGVyIGNhY2hlIGF0dGVtcHRcbiAgICAgIC8vIG5vIGNhbGxiYWNrcyBmb3Igc3R5bGVzaGVldCBpbmplY3Rpb25zICh0aW1lb3V0cyBhcmUgd29yc2UuLi4pXG4gICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykge1xuICAgICAgICB0aGlzLmVuc3VyZUNhY2hlKHVybCwgdXJscy5zaW5ndWxhckJ5LCB0aGlzLmNhY2hlRGVsYXkpXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYENvdWxkIG5vdCBmZXRjaCBDU1MgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzLCAncmF3Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICB0aGlzLmxvZy5pbmZvKGBDcmVhdGluZyA8bGluayAvPi10YWcgd2l0aCB0ZXh0IGZvciB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVybCcsIHVybCk7XG5cbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYEluamVjdGluZyA8bGluayAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgICByZXNvbHZlKHRoaXMuaW5qZWN0SW50by5hcHBlbmRDaGlsZChsaW5rKSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKGxpbmspOyB9XG4gICAgfSk7XG4gIH1cblxuICBoYXNoKGhhc2gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52ZXJpZmljYXRpb24gPT09IHRydWVcbiAgICApID8gaGFzaCA6IGZhbHNlXG4gIH1cblxuICBpbmplY3QodXJscykge1xuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChcbiAgICAgIHVybHMucHJpbnRlZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHRoaXMuaGFzaCh1cmxzLmhhc2gpXG4gICAgKS50aGVuKHRleHQgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFRleHQodGV4dCwgdXJscy5wcmludGVkKTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVXJsKHVybHMpO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kb20uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIGdldCh1cmwsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgLy8gWEhSIGZvciBDaHJvbWUvRmlyZWZveC9PcGVyYS9TYWZhcmkuXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFhEb21haW5SZXF1ZXN0IGZvciBJRS5cbiAgICAgICAgeGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ09SUyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICB4aHIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIGhhbmRsZXJzLlxuICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICB4aHI6IHhocixcbiAgICAgICAgICAgIHRleHQ6IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICB1cmw6IHhoci5yZXNwb25zZVVSTFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICB9O1xuXG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hamF4LmpzXG4gKiovIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2pha2VhcmNoaWJhbGQvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgMy4xLjJcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyB8fCAodHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNGdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc01heWJlVGhlbmFibGUoeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIGlmICghQXJyYXkuaXNBcnJheSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5ID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRfaXNBcnJheTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQ7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbjtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2xpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW5dID0gY2FsbGJhY2s7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiArIDFdID0gYXJnO1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiArPSAyO1xuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPT09IDIpIHtcbiAgICAgICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgICAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgICAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4obGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRBc2FwKGFzYXBGbikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAgPSBhc2FwRm47XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyB8fCB7fTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuICAgIC8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuICAgIC8vIG5vZGVcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKSB7XG4gICAgICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIHZlcnR4XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVZlcnR4VGltZXIoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgbGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCk7XG4gICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5vZGUuZGF0YSA9IChpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMik7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIHdlYiB3b3JrZXJcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2g7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gsIDEpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbjsgaSs9Mikge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaV07XG4gICAgICAgIHZhciBhcmcgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXTtcblxuICAgICAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2krMV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRsZW4gPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgciA9IHJlcXVpcmU7XG4gICAgICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR2ZXJ0eE5leHQgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVZlcnR4VGltZXIoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2g7XG4gICAgLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbiAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzTm9kZSkge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTmV4dFRpY2soKTtcbiAgICB9IGVsc2UgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXR0ZW1wdFZlcnR4KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZVNldFRpbWVvdXQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHRoZW4kJHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuICAgICAgdmFyIHN0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICAgICAgaWYgKHN0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgJiYgIW9uRnVsZmlsbG1lbnQgfHwgc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEICYmICFvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICB2YXIgcmVzdWx0ID0gcGFyZW50Ll9yZXN1bHQ7XG5cbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbc3RhdGUgLSAxXTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHRoZW4kJHRoZW47XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkcmVzb2x2ZShvYmplY3QpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gICAgICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCgpIHt9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAgID0gdm9pZCAwO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQgPSAxO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCAgPSAyO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SID0gbmV3IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCk7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzZWxmRnVsZmlsbG1lbnQoKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkY2Fubm90UmV0dXJuT3duKCkge1xuICAgICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHByb21pc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4pIHtcbiAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5VGhlbih0aGVuLCB0aGVuYWJsZSwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgaWYgKHNlYWxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICAgICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0sIHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gICAgICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbikge1xuICAgICAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICB0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgIGNvbnN0cnVjdG9yLnJlc29sdmUgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHRoZW4pKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJHV0aWxzJCRvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgICAgIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQ7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaCwgcHJvbWlzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICAgICAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7IHJldHVybjsgfVxuICAgICAgcHJvbWlzZS5fc3RhdGUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRDtcbiAgICAgIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGFzYXAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICAgICAgdmFyIGxlbmd0aCA9IHN1YnNjcmliZXJzLmxlbmd0aDtcblxuICAgICAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICAgICAgc3Vic2NyaWJlcnNbbGVuZ3RoICsgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRF0gID0gb25SZWplY3Rpb247XG5cbiAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwYXJlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gocHJvbWlzZSkge1xuICAgICAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICB2YXIgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRUUllfQ0FUQ0hfRVJST1I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdmFyIGhhc0NhbGxiYWNrID0gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgICAgICB2YWx1ZSwgZXJyb3IsIHN1Y2NlZWRlZCwgZmFpbGVkO1xuXG4gICAgICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICAgICAgdmFsdWUgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgICAgICBpZiAodmFsdWUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZGV0YWlsO1xuICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHtcbiAgICAgICAgLy8gbm9vcFxuICAgICAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKXtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkYWxsKGVudHJpZXMpIHtcbiAgICAgIHJldHVybiBuZXcgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQodGhpcywgZW50cmllcykucHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkYWxsO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJHJhY2UoZW50cmllcykge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoIWxpYiRlczYkcHJvbWlzZSR1dGlscyQkaXNBcnJheShlbnRyaWVzKSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcblxuICAgICAgZnVuY3Rpb24gb25GdWxmaWxsbWVudCh2YWx1ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25SZWplY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgcHJvbWlzZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLCB1bmRlZmluZWQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZTtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdChyZWFzb24pIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRyZWplY3Q7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGNvdW50ZXIgPSAwO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzUmVzb2x2ZXIoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgcmVzb2x2ZXIgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBwcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJG5lZWRzTmV3KCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZTtcbiAgICAvKipcbiAgICAgIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgICAgIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gICAgICByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgICAgIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBUZXJtaW5vbG9neVxuICAgICAgLS0tLS0tLS0tLS1cblxuICAgICAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgICAgIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgICAgIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgICAgIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAgICAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAgICAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgICAgIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICAgICAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgICAgIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgICAgIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gICAgICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgICAgIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgICAgIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICAgICAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICAgICAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICAgICAgQmFzaWMgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgYGBganNcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAgICAgLy8gb24gZmFpbHVyZVxuICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAvLyBvbiByZWplY3Rpb25cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIFVzYWdlOlxuICAgICAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgICAgIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gICAgICBgYGBqc1xuICAgICAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICAgICAgYGBganNcbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gICAgICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICAgICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAY2xhc3MgUHJvbWlzZVxuICAgICAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICAgIEBjb25zdHJ1Y3RvclxuICAgICovXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UocmVzb2x2ZXIpIHtcbiAgICAgIHRoaXMuX2lkID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGNvdW50ZXIrKztcbiAgICAgIHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpO1xuICAgICAgICB0aGlzIGluc3RhbmNlb2YgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UgPyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5hbGwgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRhbGwkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmFjZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVzb2x2ZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucmVqZWN0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVqZWN0JCRkZWZhdWx0O1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRTY2hlZHVsZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyO1xuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLl9zZXRBc2FwID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXA7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX2FzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcDtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbnN0cnVjdG9yOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSxcblxuICAgIC8qKlxuICAgICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gICAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIENoYWluaW5nXG4gICAgICAtLS0tLS0tLVxuXG4gICAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICAgICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcbiAgICAgIH0pO1xuXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gICAgICB9KTtcbiAgICAgIGBgYFxuICAgICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQXNzaW1pbGF0aW9uXG4gICAgICAtLS0tLS0tLS0tLS1cblxuICAgICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgICAtLS0tLS0tLS0tLS0tLVxuXG4gICAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIGF1dGhvciwgYm9va3M7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfVxuICAgICAgYGBgXG5cbiAgICAgIEVycmJhY2sgRXhhbXBsZVxuXG4gICAgICBgYGBqc1xuXG4gICAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcblxuICAgICAgfVxuXG4gICAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAvLyBmYWlsdXJlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBQcm9taXNlIEV4YW1wbGU7XG5cbiAgICAgIGBgYGphdmFzY3JpcHRcbiAgICAgIGZpbmRBdXRob3IoKS5cbiAgICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQG1ldGhvZCB0aGVuXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgdGhlbjogbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQsXG5cbiAgICAvKipcbiAgICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBzeW5jaHJvbm91c1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZEF1dGhvcigpO1xuICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH1cblxuICAgICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIGNhdGNoXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQHJldHVybiB7UHJvbWlzZX1cbiAgICAqL1xuICAgICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvcjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIHRoaXMuX2lucHV0ICAgICA9IGlucHV0O1xuICAgICAgICB0aGlzLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgICAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGggfHwgMDtcbiAgICAgICAgICB0aGlzLl9lbnVtZXJhdGUoKTtcbiAgICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdCh0aGlzLnByb21pc2UsIHRoaXMuX3ZhbGlkYXRpb25FcnJvcigpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRpb25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGVuZ3RoICA9IHRoaXMubGVuZ3RoO1xuICAgICAgdmFyIGlucHV0ICAgPSB0aGlzLl9pbnB1dDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLl9lYWNoRW50cnkoaW5wdXRbaV0sIGkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uKGVudHJ5LCBpKSB7XG4gICAgICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gICAgICB2YXIgcmVzb2x2ZSA9IGMucmVzb2x2ZTtcblxuICAgICAgaWYgKHJlc29sdmUgPT09IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJGRlZmF1bHQpIHtcbiAgICAgICAgdmFyIHRoZW4gPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRnZXRUaGVuKGVudHJ5KTtcblxuICAgICAgICBpZiAodGhlbiA9PT0gbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgJiZcbiAgICAgICAgICAgIGVudHJ5Ll9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQpIHtcbiAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBjKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIHRoZW4pO1xuICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24ocmVzb2x2ZSkgeyByZXNvbHZlKGVudHJ5KTsgfSksIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZShlbnRyeSksIGkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uKHN0YXRlLCBpLCB2YWx1ZSkge1xuICAgICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgICAgICBpZiAoc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl93aWxsU2V0dGxlQXQgPSBmdW5jdGlvbihwcm9taXNlLCBpKSB7XG4gICAgICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRUQsIGksIHZhbHVlKTtcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICBlbnVtZXJhdG9yLl9zZXR0bGVkQXQobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQsIGksIHJlYXNvbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkcG9seWZpbGwoKSB7XG4gICAgICB2YXIgbG9jYWw7XG5cbiAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsb2NhbCA9IHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICAgIGlmIChQICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSkgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9jYWwuUHJvbWlzZSA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0O1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlID0ge1xuICAgICAgJ1Byb21pc2UnOiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCxcbiAgICAgICdwb2x5ZmlsbCc6IGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdFxuICAgIH07XG5cbiAgICAvKiBnbG9iYWwgZGVmaW5lOnRydWUgbW9kdWxlOnRydWUgd2luZG93OiB0cnVlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbGliJGVzNiRwcm9taXNlJHVtZCQkRVM2UHJvbWlzZTsgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGVbJ2V4cG9ydHMnXSkge1xuICAgICAgbW9kdWxlWydleHBvcnRzJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzWydFUzZQcm9taXNlJ10gPSBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlO1xuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwb2x5ZmlsbCQkZGVmYXVsdCgpO1xufSkuY2FsbCh0aGlzKTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogdmVydHggKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcImRlZmluZSBjYW5ub3QgYmUgdXNlZCBpbmRpcmVjdFwiKTsgfTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=