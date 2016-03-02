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
            value: function isItemValid(code, sha1) {
              return this.rusha.digestFromString(code) === sha1;
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
                  var _parsed = _this.parse(_item);

                  _this.log.info('Found item with key: ' + key + ' in cache which needs validation...');

                  if (_this.isItemValid(_parsed.code, sha1)) {
                    _this.log.info('...matches expected sha1 ' + sha1 + '.');

                    resolve(_parsed.code);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWMwYzkyNzNkYzYxNTk5ZGRhOGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kYWN0eWxvZ3JhcGhzeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLmpzIiwid2VicGFjazovLy8uL34vcnVzaGEvcnVzaGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0Esc0JBQVcsUUFBWDs7QUFFQSxLQUFJLE9BQU8sTUFBUCxLQUFrQixXQUFsQixFQUErQjtBQUNqQyxVQUFPLGNBQVAsR0FBd0IsNkJBQW1CO0FBQ3pDLGNBQVMsSUFBVDtJQURzQixDQUF4QixDQURpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBZDtBQUNuQixZQURtQixjQUNuQixHQUEwQjtTQUFkLGdFQUFVLGtCQUFJOzsyQkFEUCxnQkFDTzs7NEJBRUEsUUFBcEIsUUFGb0I7O0FBRXRCLFNBQUUsMkNBQVUsd0JBQVosQ0FGc0I7aUNBR00sUUFBMUIsY0FIb0I7U0FHcEIsc0RBQWdCLDhCQUhJOzs7QUFLeEIsVUFBSyxHQUFMLEdBQVcsa0JBQ1QsbUJBQVksOEJBQVosRUFBNEMsYUFBNUMsQ0FEUyxDQUFYLENBTHdCO0FBUXhCLFVBQUssV0FBTCxHQVJ3QjtBQVN4QixVQUFLLGlCQUFMLEdBVHdCOztBQVd4QixVQUFLLEtBQUwsR0FBYSxvQkFBVTtBQUNyQixrQkFBVyxLQUFLLE1BQUwsQ0FBWSxTQUFaO01BREEsQ0FBYixDQVh3Qjs7QUFleEIsU0FBSSxPQUFKLEVBQWE7QUFBRSxZQUFLLEdBQUwsR0FBRjtNQUFiO0lBZkY7O2dCQURtQjs7bUNBbUJMO0FBQ1osV0FBSSxPQUFPLFFBQVAsS0FBb0IsV0FBcEIsRUFBaUM7QUFBRSxnQkFBRjtRQUFyQzs7QUFFQSxZQUFLLGVBQUwsR0FBdUIsU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUF2QixDQUhZO0FBSVosWUFBSyxVQUFMLEdBQWtCLFNBQVMsSUFBVCxJQUFpQixTQUFTLElBQVQsSUFBaUIsU0FBUyxvQkFBVCxDQUE4QixRQUE5QixFQUF3QyxDQUF4QyxDQUFsQyxDQUpOOzs7O3lDQU9NO0FBQ2xCLFlBQUssWUFBTCxHQUFvQixLQUFLLGdCQUFMLENBQXNCLFdBQXRCLENBQXBCLENBRGtCO0FBRWxCLFlBQUssTUFBTCxHQUFjLEtBQUssZ0JBQUwsQ0FBc0IsUUFBdEIsQ0FBZCxDQUZrQjs7OzsrQkFLRzs7O1dBQWYsK0RBQVMsb0JBQU07O0FBQ3JCLGNBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxZQUFMLENBQWtCLEdBQWxCLENBQXNCLGVBQU87QUFDOUMsZ0JBQU8sdUJBQWEsR0FBYixFQUFrQixNQUFLLE1BQUwsQ0FBbEIsQ0FBK0IsR0FBL0IsRUFBUCxDQUQ4QztRQUFQLENBQWxDLEVBRUgsSUFGRyxDQUVFLHFCQUFhO0FBQ3BCLGVBQUssR0FBTCxDQUFTLElBQVQsNkJBQXdDLFVBQVUsTUFBVixlQUF4QyxFQURvQjs7QUFHcEIsZUFBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFNBQWYsRUFBMEIsV0FBMUIsRUFBdUMsV0FBdkMsRUFIb0I7O0FBS3BCLGdCQUFPLHVCQUNMLFNBQVMsTUFBSyxVQUFMLEdBQWtCLFNBQTNCLEVBQ0EsU0FGSyxFQUdMLE1BQUssTUFBTCxDQUhLLENBSUwsTUFKSyxFQUFQLENBTG9CO1FBQWIsQ0FGVCxDQURxQjs7OzsrQkFnQkE7OztXQUFmLCtEQUFTLG9CQUFNOztBQUNyQixjQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxXQUFmLEVBQ0osSUFESSxDQUNDLHFCQUFhO0FBQ2pCLGdCQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsMkVBQWQsRUFEaUI7O0FBR2pCLGdCQUFPLHVCQUNMLFNBQVMsT0FBSyxVQUFMLEdBQWtCLFNBQTNCLEVBQ0EsU0FGSyxFQUdMLE9BQUssTUFBTCxDQUhLLENBSUwsTUFKSyxFQUFQLENBSGlCO1FBQWIsQ0FEUixDQURxQjs7OztzQ0FhTixNQUFNO0FBQ3JCLFdBQUksQ0FBQyxLQUFLLGVBQUwsRUFBc0I7QUFBRSxnQkFBTyxLQUFQLENBQUY7UUFBM0I7O0FBRUEsV0FBSSxRQUFRLEtBQUssZUFBTCxDQUFxQixZQUFyQixDQUFrQyxVQUFVLElBQVYsQ0FBMUMsQ0FIaUI7O0FBS3JCLGNBQU8sUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQVIsR0FBNEIsU0FBNUIsQ0FMYzs7OzsyQkFRakI7OztBQUNKLFdBQ0UsTUFBTSxtQkFBWSxvQkFBWixFQUFrQyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQXhDLENBRkU7O0FBSUosV0FBSSxHQUFKLEVBQVM7QUFDUCxjQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixFQUFzQixDQUF0QixFQUNHLElBREgsQ0FDUSxlQUFPO0FBQ1gsZUFBSSxPQUFPLEdBQVAsRUFBWTtBQUNkLG9CQUFLLEdBQUwsQ0FBUyxJQUFULDRDQUF1RCxTQUF2RCxFQURjOztBQUdkLG9CQUFLLEtBQUwsQ0FBVyxLQUFYLEdBSGM7WUFBaEIsTUFJTztBQUNMLG9CQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsRUFBRSxHQUFGLEVBQU8sT0FBdEIsRUFBK0IsS0FBL0IsRUFESztZQUpQO1VBREksQ0FEUixDQURPO1FBQVQ7OztBQUpJLFdBa0JBLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBdUI7QUFBRSxnQkFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQVAsQ0FBRjs7O0FBQTNCLFlBRUs7Ozs7QUFJSCxrQkFBTyxJQUNMLENBQUssTUFBTCxDQUFZLGVBQVosS0FBZ0MsS0FBaEMsSUFDQSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEtBQTZCLElBQTdCLEdBQ0UsS0FBSyxPQUFMLEVBSEcsR0FHYyxLQUFLLE9BQUwsR0FDbEIsSUFEa0IsQ0FDYiw2QkFBcUI7d0NBR3JCLE9BQUssTUFBTCxDQURGLGFBRnVCO2lCQUV2QixvREFBZSw0QkFGUTs7O0FBS3pCLG9CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsc0JBQU8sVUFBUCxDQUFrQixZQUFNO0FBQ3RCLHdCQUFLLE9BQUwsQ0FBYSxpQkFBYixFQUNHLElBREgsQ0FDUSxPQURSLEVBQ2lCLE1BRGpCLEVBRHNCO2dCQUFOLEVBR2YsWUFISCxFQURzQztjQUFyQixDQUFuQixDQUx5QjtZQUFyQixDQURhLENBWWhCLEtBWmdCLENBWVYsWUFBTTtBQUNiLG9CQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsZ0RBQWQsRUFEYTs7QUFHYixvQkFBTyxPQUFLLE9BQUwsRUFBUCxDQUhhO1lBQU4sQ0FmSixDQUpKO1VBRkw7Ozs7VUF0RmlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NEQTtBQUNuQixZQURtQixLQUNuQixHQUEwQjtTQUFkLGdFQUFVLGtCQUFJOzsyQkFEUCxPQUNPOztBQUV0Qix5QkFBZ0Isa0JBQWhCLENBRnNCO2lDQUdNLFFBQTFCLGNBSG9CO1NBR3BCLHNEQUFnQiw4QkFISTs7O0FBS3hCLFVBQUssR0FBTCxHQUFXLGtCQUNULG1CQUFZLDhCQUFaLEVBQTRDLGFBQTVDLENBRFMsQ0FBWCxDQUx3QjtBQVF4QixVQUFLLEtBQUwsR0FBYSxxQkFBYixDQVJ3Qjs7QUFVeEIsVUFBSyxPQUFMLEdBQWUsT0FBZixDQVZ3QjtBQVd4QixVQUFLLFdBQUwsR0FBbUIsS0FBSyxPQUFMLENBQWEsV0FBYixJQUE0QixhQUE1QixDQVhLO0FBWXhCLFVBQUssV0FBTCxHQUFtQixLQUFLLFNBQUwsRUFBbkIsQ0Fad0I7O0FBY3hCLFNBQUksS0FBSyxPQUFMLENBQWEsU0FBYixFQUF3QjtBQUMxQixZQUFLLFdBQUwsR0FBc0IsS0FBSyxXQUFMLFVBQXFCLEtBQUssT0FBTCxDQUFhLFNBQWIsQ0FEakI7TUFBNUIsTUFFTyxJQUFJLENBQUMsS0FBSyxPQUFMLENBQWEsV0FBYixFQUEwQjtBQUNwQyxZQUFLLFdBQUwsSUFBb0IsSUFBcEIsQ0FEb0M7TUFBL0I7SUFoQlQ7O2dCQURtQjs7aUNBc0JQO0FBQ1YsY0FBTyxLQUFLLFdBQUwsQ0FERzs7OztpQ0FJQSxNQUFNLE1BQU07QUFDdEIsY0FDRSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUNFLElBREYsTUFFTSxJQUZOLENBRm9COzs7OzJCQVFsQixNQUFNO0FBQ1YsY0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVAsQ0FEVTs7Ozt5QkFJUixLQUFLLGNBQTRCOzs7V0FBZCw2REFBTyxxQkFBTzs7QUFDbkMsY0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLGFBQUksQ0FBQyxNQUFLLFdBQUwsRUFBa0I7QUFBRSxvQkFBRjtVQUF2Qjs7QUFFQSxhQUNFLFFBQVEsYUFBYSxPQUFiLENBQXdCLE1BQUssV0FBTCxTQUFvQixHQUE1QyxDQUFSLENBSm9DOztBQU10QyxhQUFJLFVBQVUsSUFBVixJQUFrQixpQkFBaUIsU0FBakIsRUFBNEI7QUFDaEQsaUJBQUssR0FBTCxDQUFTLFlBQVQsRUFBdUIsT0FBdkIsRUFBZ0MsR0FBaEMsRUFEZ0Q7O0FBR2hELG1CQUFRLFlBQVIsRUFIZ0Q7O0FBS2hELGtCQUxnRDtVQUFsRDs7QUFRQSxhQUFJLFVBQVUsSUFBVixJQUFrQixTQUFTLEtBQVQsRUFBZ0I7QUFDcEMsZUFDRSxVQUFVLE1BQUssS0FBTCxDQUFXLEtBQVgsQ0FBVixDQUZrQzs7QUFJcEMsaUJBQUssR0FBTCxDQUFTLElBQVQsMkJBQXNDLDJDQUF0QyxFQUpvQzs7QUFNcEMsZUFBSSxNQUFLLFdBQUwsQ0FBaUIsUUFBUSxJQUFSLEVBQWMsSUFBL0IsQ0FBSixFQUEwQztBQUN4QyxtQkFBSyxHQUFMLENBQVMsSUFBVCwrQkFBMEMsVUFBMUMsRUFEd0M7O0FBR3hDLHFCQUFRLFFBQVEsSUFBUixDQUFSLENBSHdDO1lBQTFDLE1BSU87QUFDTCxtQkFBSyxHQUFMLENBQVMsSUFBVCxzQ0FBaUQsb0JBQWpELEVBREs7O0FBR0wsbUJBQUssTUFBTCxDQUFZLEdBQVosRUFISzs7QUFLTCxzQkFMSztZQUpQO1VBTkYsTUFpQk8sSUFBSSxLQUFKLEVBQVc7QUFDaEIsaUJBQUssR0FBTCxDQUFTLElBQVQsMkJBQXNDLGtCQUF0QyxFQURnQjs7QUFHaEIsbUJBQVEsTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixJQUFsQixDQUFSLENBSGdCO1VBQVgsTUFJQTtBQUNMLGlCQUFLLEdBQUwsQ0FBUyxJQUFULG9DQUErQyxrQkFBL0MsRUFESzs7QUFHTCxvQkFISztVQUpBO1FBL0JVLENBQW5CLENBRG1DOzs7O3lCQTRDakMsS0FBSztBQUNQLFdBQUksQ0FBQyxLQUFLLFdBQUwsRUFBa0I7QUFBRSxnQkFBTyxLQUFQLENBQUY7UUFBdkI7O0FBRUEsY0FBTyxhQUFhLE9BQWIsQ0FBd0IsS0FBSyxXQUFMLFNBQW9CLEdBQTVDLE1BQXVELElBQXZELENBSEE7Ozs7NEJBTUYsS0FBSztBQUNWLFdBQUksQ0FBQyxLQUFLLFdBQUwsRUFBa0I7QUFBRSxnQkFBTyxLQUFQLENBQUY7UUFBdkI7O0FBRUEsY0FBTyxhQUFhLFVBQWIsQ0FBMkIsS0FBSyxXQUFMLFNBQW9CLEdBQS9DLENBQVAsQ0FIVTs7Ozt5QkFNUixNQUFNLE1BQU0sS0FBeUI7V0FBcEIsbUVBQWEscUJBQU87O0FBQ3ZDLFdBQUksQ0FBQyxLQUFLLFdBQUwsRUFBa0I7QUFBRSxnQkFBTyxLQUFQLENBQUY7UUFBdkI7QUFDQSxXQUFJLFVBQUosRUFBZ0I7QUFBRSxjQUFLLE1BQUwsQ0FBWSxVQUFaLEVBQUY7UUFBaEI7O0FBRUEsV0FBSSxTQUFTO0FBQ1gsY0FBSyxDQUFDLElBQUksSUFBSixFQUFEO0FBQ0wsY0FBSyxHQUFMO0FBQ0EsZUFBTSxJQUFOO0FBQ0EsZUFBTSxJQUFOO0FBQ0EscUJBQVksT0FBUyxVQUFQLEtBQXNCLFFBQXRCLEdBQW1DLFVBQXJDLEdBQWtELFNBQWxEO1FBTFYsQ0FKbUM7O0FBWXZDLG9CQUFhLE9BQWIsQ0FDSyxLQUFLLFdBQUwsU0FBb0IsR0FEekIsRUFFRSxLQUFLLFNBQUwsQ0FBZSxNQUFmLENBRkYsRUFadUM7O0FBaUJ2QyxjQUFPLE1BQVAsQ0FqQnVDOzs7OzZCQW9CakM7QUFDTixXQUFJLENBQUMsS0FBSyxXQUFMLEVBQWtCO0FBQUUsZ0JBQU8sS0FBUCxDQUFGO1FBQXZCOztBQUVBLFlBQUssSUFBSSxJQUFKLElBQVcsWUFBaEIsRUFBOEI7QUFDNUIsYUFBSSxLQUFJLE9BQUosQ0FBWSxLQUFLLFdBQUwsQ0FBWixJQUFpQyxDQUFqQyxFQUFvQztBQUN0QyxnQkFBSyxHQUFMLENBQVMsR0FBVCxvQkFBOEIsNkJBQTlCLEVBRHNDOztBQUd0Qyx3QkFBYSxVQUFiLENBQXdCLElBQXhCLEVBSHNDO1VBQXhDO1FBREY7O0FBUUEsY0FBTyxJQUFQLENBWE07Ozs7aUNBY0k7QUFDVixXQUNFLE9BQU8scUNBQVAsQ0FGUTs7QUFJVixXQUFJO0FBQ0Ysc0JBQWEsT0FBYixDQUFxQixJQUFyQixFQUEyQixJQUEzQixFQURFO0FBRUYsc0JBQWEsVUFBYixDQUF3QixJQUF4QixFQUZFOztBQUlGLGdCQUFPLElBQVAsQ0FKRTtRQUFKLENBS0UsT0FBTSxDQUFOLEVBQVM7QUFDVCxjQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMscURBQWQsRUFEUzs7QUFHVCxnQkFBTyxLQUFQLENBSFM7UUFBVDs7Ozs0QkFPRyxZQUFZO0FBQ2pCLFlBQUssSUFBSSxLQUFKLElBQVcsWUFBaEIsRUFBOEI7QUFDNUIsYUFDRSxxQkFBcUIsTUFBSSxPQUFKLENBQVksS0FBSyxXQUFMLENBQVosSUFBaUMsQ0FBakMsQ0FGSztBQUc1QixhQUNFLGdCQURGLENBSDRCOztBQU01QixhQUFJLENBQUMsa0JBQUQsRUFBcUI7QUFBRSxvQkFBRjtVQUF6Qjs7QUFFQSxnQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFhLE9BQWIsQ0FBcUIsS0FBckIsQ0FBWCxDQUFQLENBUjRCOztBQVU1QixhQUNFLE9BQVUsVUFBUCxLQUFzQixRQUF0QixJQUFvQyxPQUFPLEtBQUssVUFBTCxLQUFvQixRQUEzQixJQUN2QyxLQUFLLFVBQUwsS0FBb0IsVUFBcEIsRUFDQTtBQUNBLGdCQUFLLEdBQUwsQ0FBUyxHQUFULGtCQUE0Qix5Q0FBb0MsV0FBaEUsRUFEQTs7QUFHQSx3QkFBYSxVQUFiLENBQXdCLEtBQXhCLEVBSEE7VUFIRjtRQVZGOzs7O1VBakppQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQ0pBOzs7O0FBR25CLFlBSG1CLEdBR25CLEdBQTRCO1NBQWhCLGdFQUFVLG9CQUFNOzsyQkFIVCxLQUdTOztBQUMxQixVQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCOztBQUcxQixTQUFJLEtBQUssT0FBTCxFQUFjO0FBQ2hCLFlBQUssT0FBTCxHQUFlLE9BQU8sT0FBUCxDQURDO01BQWxCO0lBSEY7O2dCQUhtQjs7MkJBV2I7QUFDSixXQUFJLEtBQUssT0FBTCxFQUFjOzs7QUFBRSwwQkFBSyxPQUFMLEVBQWEsR0FBYixpQkFBb0IsU0FBcEIsRUFBRjtRQUFsQjs7Ozs0QkFHSztBQUNMLFdBQUksS0FBSyxPQUFMLEVBQWM7OztBQUFFLDJCQUFLLE9BQUwsRUFBYSxJQUFiLGtCQUFxQixTQUFyQixFQUFGO1FBQWxCOzs7OzRCQUdLO0FBQ0wsV0FBSSxLQUFLLE9BQUwsRUFBYzs7O0FBQUUsMkJBQUssT0FBTCxFQUFhLElBQWIsa0JBQXFCLFNBQXJCLEVBQUY7UUFBbEI7Ozs7NkJBR007QUFDTixXQUFJLEtBQUssT0FBTCxFQUFjOzs7QUFBRSwyQkFBSyxPQUFMLEVBQWEsS0FBYixrQkFBc0IsU0FBdEIsRUFBRjtRQUFsQjs7Ozs2QkFHTTtBQUNOLFdBQUksS0FBSyxPQUFMLEVBQWM7OztBQUFFLDJCQUFLLE9BQUwsRUFBYSxLQUFiLGtCQUFzQixTQUF0QixFQUFGO1FBQWxCOzs7O1VBNUJpQjs7Ozs7Ozs7Ozs7Ozs7bUJDb0JHO0FBcEJ4QixLQUNFLFlBQVksU0FBWixTQUFZLENBQVMsR0FBVCxFQUFjO0FBQ3hCLE9BQ0UsUUFBUSxHQUFSO09BQ0EsUUFBUSxzQkFBUixDQUhzQjtBQUl4QixPQUNFLGtCQURGO09BRUUsaUJBRkYsQ0FKd0I7O0FBUXhCLFlBQVMsRUFBVCxDQVJ3Qjs7QUFVeEIsT0FBSSxLQUFKLEVBQVc7QUFDVCxZQUFPLFFBQVEsTUFBTSxJQUFOLENBQVcsS0FBWCxDQUFSLEVBQTJCO0FBQ2hDLGNBQU8sTUFBTSxDQUFOLENBQVAsSUFBbUIsbUJBQW1CLE1BQU0sQ0FBTixDQUFuQixDQUFuQixDQURnQztNQUFsQztJQURGOztBQU1BLFVBQU8sTUFBUCxDQWhCd0I7RUFBZDs7QUFtQkMsVUFBUyxXQUFULENBQXFCLEtBQXJCLEVBQTBFO09BQTlDLGdFQUFVLG9CQUFvQztPQUE5Qiw0REFBTSxPQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsZ0JBQXdCOztBQUN2RixPQUNFLFNBQVMsVUFBVSxHQUFWLENBQVQsQ0FGcUY7O0FBSXZGLFVBQU8sT0FBTyxjQUFQLENBQXNCLEtBQXRCLElBQStCLE9BQU8sS0FBUCxDQUEvQixHQUErQyxPQUEvQyxDQUpnRjtFQUExRSxDOzs7Ozs7QUNwQmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGNBQWM7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLGdCQUFnQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRTs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsc0JBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFxQiwrQkFBK0I7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsd0JBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1FQUFrRSxRQUFROztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQWtFLFFBQVE7QUFDMUU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxRQUFROztBQUU3Qzs7QUFFQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCLHFFQUFxRTtBQUMxRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLGVBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFD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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYWMwYzkyNzNkYzYxNTk5ZGRhOGVcbiAqKi8iLCJpbXBvcnQgRGFjdHlsb2dyYXBoc3kgZnJvbSAnLi9kYWN0eWxvZ3JhcGhzeSc7XG5pbXBvcnQgZXM2UHJvbWlzZSBmcm9tICdlczYtcHJvbWlzZSc7XG5cbmVzNlByb21pc2UucG9seWZpbGwoKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5kYWN0eWxvZ3JhcGhzeSA9IG5ldyBEYWN0eWxvZ3JhcGhzeSh7XG4gICAgYXV0b3J1bjogdHJ1ZVxuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluamVjdG9yLCB7TWFuaWZlc3R9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWN0eWxvZ3JhcGhzeSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0XG4gICAgICB7IGF1dG9ydW4gPSBmYWxzZSB9ID0gb3B0aW9ucyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ob29rSW50b0RvbSgpO1xuICAgIHRoaXMucmVhZENvbmZpZ3VyYXRpb24oKTtcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiB0aGlzLmNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIGlmIChhdXRvcnVuKSB7IHRoaXMucnVuKCk7IH1cbiAgfVxuXG4gIGhvb2tJbnRvRG9tKCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5leGVjdXRpbmdTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFjdHlsb2dyYXBoc3knKTtcbiAgICB0aGlzLmluamVjdEludG8gPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICB9XG5cbiAgcmVhZENvbmZpZ3VyYXRpb24oKSB7XG4gICAgdGhpcy5tYW5pZmVzdFVybHMgPSB0aGlzLnJlYWRBdHRyT25TY3JpcHQoJ21hbmlmZXN0cycpO1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5yZWFkQXR0ck9uU2NyaXB0KCdjb25maWcnKTtcbiAgfVxuXG4gIHJlZnJlc2goaW5qZWN0ID0gdHJ1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCh0aGlzLm1hbmlmZXN0VXJscy5tYXAodXJsID0+IHtcbiAgICAgIHJldHVybiBuZXcgTWFuaWZlc3QodXJsLCB0aGlzLmNvbmZpZykuZ2V0KCk7XG4gICAgfSkpLnRoZW4obWFuaWZlc3RzID0+IHtcbiAgICAgIHRoaXMubG9nLmluZm8oYEZldGNoZWQgYWxsIG1hbmlmZXN0cywgJHttYW5pZmVzdHMubGVuZ3RofSBpbiB0b3RhbC5gKTtcblxuICAgICAgdGhpcy5jYWNoZS5zZXQobWFuaWZlc3RzLCAnbWFuaWZlc3RzJywgJ21hbmlmZXN0cycpO1xuXG4gICAgICByZXR1cm4gbmV3IEluamVjdG9yKFxuICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgIG1hbmlmZXN0cyxcbiAgICAgICAgdGhpcy5jb25maWdcbiAgICAgICkuaW5qZWN0KCk7XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlKGluamVjdCA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQoJ21hbmlmZXN0cycpXG4gICAgICAudGhlbihtYW5pZmVzdHMgPT4ge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCdSZXNvdHJpbmcgd2l0aCBtYW5pZmVzdHMgaW4gY2FjaGUgbGF0ZXIgcmVmcmVzaGluZyB2aWEgbmV0d29yayAoZGVsYXllZCkuJyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbmplY3RvcihcbiAgICAgICAgICBpbmplY3QgPyB0aGlzLmluamVjdEludG8gOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWFuaWZlc3RzLFxuICAgICAgICAgIHRoaXMuY29uZmlnXG4gICAgICAgICkuaW5qZWN0KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlYWRBdHRyT25TY3JpcHQoYXR0cikge1xuICAgIGlmICghdGhpcy5leGVjdXRpbmdTY3JpcHQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBsZXQgX2F0dHIgPSB0aGlzLmV4ZWN1dGluZ1NjcmlwdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xuXG4gICAgcmV0dXJuIF9hdHRyID8gSlNPTi5wYXJzZShfYXR0cikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBydW4oKSB7XG4gICAgY29uc3RcbiAgICAgIHR0bCA9IGdldFVybFBhcmFtKCdkYWN0eWxvZ3JhcGhzeS10dGwnLCB0aGlzLmNvbmZpZy50dGwpO1xuXG4gICAgaWYgKHR0bCkge1xuICAgICAgdGhpcy5jYWNoZS5nZXQoJ2NsdCcsIDApXG4gICAgICAgIC50aGVuKGNsdCA9PiB7XG4gICAgICAgICAgaWYgKGNsdCA+PSB0dGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYEZsdXNoaW5nIGNhY2hlIGR1ZSB0byBleGVlZGluZyBUVEwgb2YgJHt0dGx9LmApO1xuXG4gICAgICAgICAgICB0aGlzLmNhY2hlLmZsdXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KCsrY2x0LCAncGxhaW4nLCAnY2x0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXRjaGluZyBtZWFucyBmZXRjaGluZyBhbGwgbWFuaWZlc3RzIHdpdGhvdXQgaW5qZWN0aW5nXG4gICAgaWYgKHRoaXMuY29uZmlnLmNhY2hlT25seSkgeyByZXR1cm4gdGhpcy5yZWZyZXNoKGZhbHNlKTsgfVxuICAgIC8vIC4uLmVsc2UgcmVzdG9yZSBvciByZWZyZXNoIHRoZSBhcHAgKHdpdGggaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcylcbiAgICBlbHNlIHtcbiAgICAgIC8vIEVpdGhlciB0aGUgY29uZmlndXJhdGlvbiBvZiBub24gY2FjaGVkXG4gICAgICAvLyBtYW5pZmVzdHMgb3IgcmVxdWVzdGVkIGJ1bmRsZSB2ZXJpZmljYXRpb25cbiAgICAgIC8vIGZvcmNlcyBhIHJlZnJlc2ggb3IgYWxsIG1hbmlmZXN0cy5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuY29uZmlnLmNhY2hlZE1hbmlmZXN0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgdGhpcy5jb25maWcudmVyaWZpY2F0aW9uID09PSB0cnVlXG4gICAgICApID8gdGhpcy5yZWZyZXNoKCkgOiB0aGlzLnJlc3RvcmUoKVxuICAgICAgICAudGhlbihpbmplY3RlZEZyb21DYWNoZSA9PiB7XG4gICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIHJlZnJlc2hEZWxheSA9IDUwMDBcbiAgICAgICAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goaW5qZWN0ZWRGcm9tQ2FjaGUpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIHJlZnJlc2hEZWxheSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbygnTm8gbWFuaWZlc3RzIGluIGNhY2hlLCByZWZyZXNoaW5nIHZpYSBuZXR3b3JrLicpO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RhY3R5bG9ncmFwaHN5LmpzXG4gKiovIiwiaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuaW1wb3J0IFJ1c2hhIGZyb20gJ3J1c2hhJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FjaGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdFxuICAgICAgZGVmYXVsdFByZWZpeCA9ICdfX2RhY3R5bG9ncmFwaHN5JyxcbiAgICAgIHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG4gICAgdGhpcy5ydXNoYSA9IG5ldyBSdXNoYSgpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNhY2hlUHJlZml4ID0gdGhpcy5vcHRpb25zLmNhY2hlUHJlZml4IHx8IGRlZmF1bHRQcmVmaXg7XG4gICAgdGhpcy5pc1N1cHBvcnRlZCA9IHRoaXMuc3VwcG9ydGVkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFwcFByZWZpeCkge1xuICAgICAgdGhpcy5jYWNoZVByZWZpeCA9IGAke3RoaXMuY2FjaGVQcmVmaXh9LS0ke3RoaXMub3B0aW9ucy5hcHBQcmVmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuY2FjaGVQcmVmaXgpIHtcbiAgICAgIHRoaXMuY2FjaGVQcmVmaXggKz0gJ19fJztcbiAgICB9XG4gIH1cblxuICBnZXRQcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVQcmVmaXg7XG4gIH1cblxuICBpc0l0ZW1WYWxpZChjb2RlLCBzaGExKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucnVzaGEuZGlnZXN0RnJvbVN0cmluZyhcbiAgICAgICAgY29kZVxuICAgICAgKSA9PT0gc2hhMVxuICAgICk7XG4gIH1cblxuICBwYXJzZShpdGVtKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XG4gIH1cblxuICBnZXQoa2V5LCBkZWZhdWx0VmFsdWUsIHNoYTEgPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmVqZWN0KCk7IH1cblxuICAgICAgbGV0XG4gICAgICAgIF9pdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7XG5cbiAgICAgIGlmIChfaXRlbSA9PT0gbnVsbCAmJiBkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUsICdwbGFpbicsIGtleSk7XG5cbiAgICAgICAgcmVzb2x2ZShkZWZhdWx0VmFsdWUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pdGVtICE9PSBudWxsICYmIHNoYTEgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgX3BhcnNlZCA9IHRoaXMucGFyc2UoX2l0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nLmluZm8oYEZvdW5kIGl0ZW0gd2l0aCBrZXk6ICR7a2V5fSBpbiBjYWNoZSB3aGljaCBuZWVkcyB2YWxpZGF0aW9uLi4uYCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmFsaWQoX3BhcnNlZC5jb2RlLCBzaGExKSkge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLm1hdGNoZXMgZXhwZWN0ZWQgc2hhMSAke3NoYTF9LmApO1xuXG4gICAgICAgICAgcmVzb2x2ZShfcGFyc2VkLmNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nLmluZm8oYC4uLmRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIHNoYTEgJHtzaGExfSAtIHBydW5pbmcuYCk7XG5cbiAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuXG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoX2l0ZW0pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgRm91bmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5wYXJzZShfaXRlbSkuY29kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBDb3VsZG5cXCd0IGZpbmQgaXRlbSB3aXRoIGtleTogJHtrZXl9IGluIGNhY2hlLmApO1xuXG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNhY2hlUHJlZml4fS0ke2tleX1gKSAhPT0gbnVsbDtcbiAgfVxuXG4gIHJlbW92ZSh1cmwpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7dGhpcy5jYWNoZVByZWZpeH0tJHtrZXl9YCk7O1xuICB9XG5cbiAgc2V0KGNvZGUsIHR5cGUsIGtleSwgc2luZ3VsYXJCeSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChzaW5ndWxhckJ5KSB7IHRoaXMuZGVkdXBlKHNpbmd1bGFyQnkpOyB9XG5cbiAgICBsZXQgY2FjaGVkID0ge1xuICAgICAgbm93OiArbmV3IERhdGUoKSxcbiAgICAgIHVybDoga2V5LFxuICAgICAgY29kZTogY29kZSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBzaW5ndWxhckJ5OiAoIHR5cGVvZiBzaW5ndWxhckJ5ID09PSAnc3RyaW5nJyApID8gc2luZ3VsYXJCeSA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIGAke3RoaXMuY2FjaGVQcmVmaXh9LSR7a2V5fWAsXG4gICAgICBKU09OLnN0cmluZ2lmeShjYWNoZWQpXG4gICAgKTtcblxuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICBmbHVzaCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBmb3IgKGxldCBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5jYWNoZVByZWZpeCkgPj0gMCkge1xuICAgICAgICB0aGlzLmxvZy5sb2coYFJlbW92aW5nIGl0ZW0gJHtrZXl9IHJlcXVlc3RlZCBieSBmbHVzaC5gKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3VwcG9ydGVkKCkge1xuICAgIGxldFxuICAgICAgaXRlbSA9ICdfX2RhY3R5bG9ncmFwaHN5X19mZWF0dXJlLWRldGVjdGlvbic7XG5cbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaXRlbSwgaXRlbSk7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShpdGVtKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLmxvZy53YXJuKCdMb2NhbHN0b3JhZ2Ugbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIC0gbm8gY2FjaGluZyEnKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZShzaW5ndWxhckJ5KSB7XG4gICAgZm9yIChsZXQga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgY29uc3RcbiAgICAgICAgZGFjdHlsb2dyYXBoc3lJdGVtID0ga2V5LmluZGV4T2YodGhpcy5jYWNoZVByZWZpeCkgPj0gMDtcbiAgICAgIGxldFxuICAgICAgICBpdGVtO1xuXG4gICAgICBpZiAoIWRhY3R5bG9ncmFwaHN5SXRlbSkgeyBjb250aW51ZTsgfVxuXG4gICAgICBpdGVtID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcblxuICAgICAgaWYgKFxuICAgICAgICAoICh0eXBlb2Ygc2luZ3VsYXJCeSA9PT0gJ3N0cmluZycpICYmICh0eXBlb2YgaXRlbS5zaW5ndWxhckJ5ID09PSAnc3RyaW5nJykgKSAmJlxuICAgICAgICBpdGVtLnNpbmd1bGFyQnkgPT09IHNpbmd1bGFyQnlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmxvZy5sb2coYERlZHVwaW5nIGJ5ICR7c2luZ3VsYXJCeX0gYmVmb3JlIGFkZGluZyBkdXBlIGluICR7a2V5fS5gKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FjaGUuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2cge1xuXG4gIC8vIE5vdCBsZXZlbCBib3VuZCBsb2dnaW5nIG5lZWRlZCB5ZXRcbiAgY29uc3RydWN0b3IoZW5hYmxlZCA9IHRydWUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy5jb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gICAgfVxuICB9XG5cbiAgbG9nKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpOyB9XG4gIH1cblxuICBpbmZvKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmluZm8oLi4uYXJndW1lbnRzKTsgfVxuICB9XG5cbiAgd2FybigpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7IHRoaXMuY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGRlYnVnKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmRlYnVnKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxuXG4gIGVycm9yKCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHsgdGhpcy5jb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7IH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9nLmpzXG4gKiovIiwiY29uc3RcbiAgZ2V0UGFyYW1zID0gZnVuY3Rpb24odXJsKSB7XG4gICAgY29uc3RcbiAgICAgIHF1ZXJ5ID0gdXJsLFxuICAgICAgcmVnZXggPSAvWz8mO10oLis/KT0oW14mO10rKS9nO1xuICAgIGxldFxuICAgICAgcGFyYW1zLFxuICAgICAgbWF0Y2g7XG5cbiAgICBwYXJhbXMgPSB7fTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgd2hpbGUgKG1hdGNoID0gcmVnZXguZXhlYyhxdWVyeSkpIHtcbiAgICAgICAgcGFyYW1zW21hdGNoWzFdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsyXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VXJsUGFyYW0ocGFyYW0sIGlmVW5zZXQgPSBudWxsLCB1cmwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoKSB7XG4gIGNvbnN0XG4gICAgcGFyYW1zID0gZ2V0UGFyYW1zKHVybCk7XG5cbiAgcmV0dXJuIHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkgPyBwYXJhbXNbcGFyYW1dIDogaWZVbnNldDtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91cmwuanNcbiAqKi8iLCIvKlxuICogUnVzaGEsIGEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMSxcbiAqIGFzIGRlZmluZWQgaW4gRklQUyBQVUIgMTgwLTEsIHR1bmVkIGZvciBoaWdoIHBlcmZvcm1hbmNlIHdpdGggbGFyZ2UgaW5wdXRzLlxuICogKGh0dHA6Ly9naXRodWIuY29tL3NyaWpzL3J1c2hhKVxuICpcbiAqIEluc3BpcmVkIGJ5IFBhdWwgSm9obnN0b25zIGltcGxlbWVudGF0aW9uIChodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1KS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMgU2FtIFJpanMgKGh0dHA6Ly9hd2VzYW0uZGUpLlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNSVQgbGljZW5zZSBhcyBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4gKiBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksXG4gKiB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uXG4gKiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSxcbiAqIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICogU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gKiBJTiBUSEUgU09GVFdBUkUuXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHV0aWwgPSB7XG4gICAgICAgICAgICBnZXREYXRhVHlwZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2J1ZmZlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndmlldyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Jsb2InO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGRhdGEgdHlwZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAvLyBUaGUgUnVzaGEgb2JqZWN0IGlzIGEgd3JhcHBlciBhcm91bmQgdGhlIGxvdy1sZXZlbCBSdXNoYUNvcmUuXG4gICAgLy8gSXQgcHJvdmlkZXMgbWVhbnMgb2YgY29udmVydGluZyBkaWZmZXJlbnQgaW5wdXRzIHRvIHRoZVxuICAgIC8vIGZvcm1hdCBhY2NlcHRlZCBieSBSdXNoYUNvcmUgYXMgd2VsbCBhcyBvdGhlciB1dGlsaXR5IG1ldGhvZHMuXG4gICAgZnVuY3Rpb24gUnVzaGEoY2h1bmtTaXplKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgLy8gUHJpdmF0ZSBvYmplY3Qgc3RydWN0dXJlLlxuICAgICAgICB2YXIgc2VsZiQyID0geyBmaWxsOiAwIH07XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIGJ1ZmZlciB0aGF0IHRoZSBzaGExIHJvdXRpbmUgdXNlc1xuICAgICAgICAvLyBpbmNsdWRpbmcgdGhlIHBhZGRpbmcuXG4gICAgICAgIHZhciBwYWRsZW4gPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgICAgICAgICBmb3IgKGxlbiArPSA5OyBsZW4gJSA2NCA+IDA7IGxlbiArPSAxKTtcbiAgICAgICAgICAgIHJldHVybiBsZW47XG4gICAgICAgIH07XG4gICAgICAgIHZhciBwYWRaZXJvZXMgPSBmdW5jdGlvbiAoYmluLCBsZW4pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBsZW4gPj4gMjsgaSA8IGJpbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICBiaW5baV0gPSAwO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGFkRGF0YSA9IGZ1bmN0aW9uIChiaW4sIGNodW5rTGVuLCBtc2dMZW4pIHtcbiAgICAgICAgICAgIGJpbltjaHVua0xlbiA+PiAyXSB8PSAxMjggPDwgMjQgLSAoY2h1bmtMZW4gJSA0IDw8IDMpO1xuICAgICAgICAgICAgYmluWygoY2h1bmtMZW4gPj4gMikgKyAyICYgfjE1KSArIDE0XSA9IG1zZ0xlbiA+PiAyOTtcbiAgICAgICAgICAgIGJpblsoKGNodW5rTGVuID4+IDIpICsgMiAmIH4xNSkgKyAxNV0gPSBtc2dMZW4gPDwgMztcbiAgICAgICAgfTtcbiAgICAgICAgLy8gQ29udmVydCBhIGJpbmFyeSBzdHJpbmcgYW5kIHdyaXRlIGl0IHRvIHRoZSBoZWFwLlxuICAgICAgICAvLyBBIGJpbmFyeSBzdHJpbmcgaXMgZXhwZWN0ZWQgdG8gb25seSBjb250YWluIGNoYXIgY29kZXMgPCAyNTYuXG4gICAgICAgIHZhciBjb252U3RyID0gZnVuY3Rpb24gKEg4LCBIMzIsIHN0YXJ0LCBsZW4sIG9mZikge1xuICAgICAgICAgICAgdmFyIHN0ciA9IHRoaXMsIGksIG9tID0gb2ZmICUgNCwgbG0gPSBsZW4gJSA0LCBqID0gbGVuIC0gbG07XG4gICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9tKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAzIHwgMF0gPSBzdHIuY2hhckNvZGVBdChzdGFydCk7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAyIHwgMF0gPSBzdHIuY2hhckNvZGVBdChzdGFydCArIDEpO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMSB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyAyKTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyAzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBvbTsgaSA8IGo7IGkgPSBpICsgNCB8IDApIHtcbiAgICAgICAgICAgICAgICBIMzJbb2ZmICsgaSA+PiAyXSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgaSkgPDwgMjQgfCBzdHIuY2hhckNvZGVBdChzdGFydCArIGkgKyAxKSA8PCAxNiB8IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgaSArIDIpIDw8IDggfCBzdHIuY2hhckNvZGVBdChzdGFydCArIGkgKyAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAobG0pIHtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMSB8IDBdID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQgKyBqICsgMik7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDIgfCAwXSA9IHN0ci5jaGFyQ29kZUF0KHN0YXJ0ICsgaiArIDEpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIEg4W29mZiArIGogKyAzIHwgMF0gPSBzdHIuY2hhckNvZGVBdChzdGFydCArIGopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBDb252ZXJ0IGEgYnVmZmVyIG9yIGFycmF5IGFuZCB3cml0ZSBpdCB0byB0aGUgaGVhcC5cbiAgICAgICAgLy8gVGhlIGJ1ZmZlciBvciBhcnJheSBpcyBleHBlY3RlZCB0byBvbmx5IGNvbnRhaW4gZWxlbWVudHMgPCAyNTYuXG4gICAgICAgIHZhciBjb252QnVmID0gZnVuY3Rpb24gKEg4LCBIMzIsIHN0YXJ0LCBsZW4sIG9mZikge1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IHRoaXMsIGksIG9tID0gb2ZmICUgNCwgbG0gPSBsZW4gJSA0LCBqID0gbGVuIC0gbG07XG4gICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9tKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAzIHwgMF0gPSBidWZbc3RhcnRdO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgSDhbb2ZmICsgMiB8IDBdID0gYnVmW3N0YXJ0ICsgMV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBIOFtvZmYgKyAxIHwgMF0gPSBidWZbc3RhcnQgKyAyXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiB8IDBdID0gYnVmW3N0YXJ0ICsgM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gNCAtIG9tOyBpIDwgajsgaSA9IGkgKz0gNCB8IDApIHtcbiAgICAgICAgICAgICAgICBIMzJbb2ZmICsgaSA+PiAyXSA9IGJ1ZltzdGFydCArIGldIDw8IDI0IHwgYnVmW3N0YXJ0ICsgaSArIDFdIDw8IDE2IHwgYnVmW3N0YXJ0ICsgaSArIDJdIDw8IDggfCBidWZbc3RhcnQgKyBpICsgM107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGxtKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgSDhbb2ZmICsgaiArIDEgfCAwXSA9IGJ1ZltzdGFydCArIGogKyAyXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMiB8IDBdID0gYnVmW3N0YXJ0ICsgaiArIDFdO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIEg4W29mZiArIGogKyAzIHwgMF0gPSBidWZbc3RhcnQgKyBqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbnZCbG9iID0gZnVuY3Rpb24gKEg4LCBIMzIsIHN0YXJ0LCBsZW4sIG9mZikge1xuICAgICAgICAgICAgdmFyIGJsb2IgPSB0aGlzLCBpLCBvbSA9IG9mZiAlIDQsIGxtID0gbGVuICUgNCwgaiA9IGxlbiAtIGxtO1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iLnNsaWNlKHN0YXJ0LCBzdGFydCArIGxlbikpKTtcbiAgICAgICAgICAgIGlmIChqID4gMCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAob20pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiArIDMgfCAwXSA9IGJ1ZlswXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiArIDIgfCAwXSA9IGJ1ZlsxXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiArIDEgfCAwXSA9IGJ1ZlsyXTtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIEg4W29mZiB8IDBdID0gYnVmWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDQgLSBvbTsgaSA8IGo7IGkgPSBpICs9IDQgfCAwKSB7XG4gICAgICAgICAgICAgICAgSDMyW29mZiArIGkgPj4gMl0gPSBidWZbaV0gPDwgMjQgfCBidWZbaSArIDFdIDw8IDE2IHwgYnVmW2kgKyAyXSA8PCA4IHwgYnVmW2kgKyAzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAobG0pIHtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMSB8IDBdID0gYnVmW2ogKyAyXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMiB8IDBdID0gYnVmW2ogKyAxXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBIOFtvZmYgKyBqICsgMyB8IDBdID0gYnVmW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgY29udkZuID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodXRpbC5nZXREYXRhVHlwZShkYXRhKSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udlN0ci5iaW5kKGRhdGEpO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb252QnVmLmJpbmQoZGF0YSk7XG4gICAgICAgICAgICBjYXNlICdidWZmZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBjb252QnVmLmJpbmQoZGF0YSk7XG4gICAgICAgICAgICBjYXNlICdhcnJheWJ1ZmZlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnZCdWYuYmluZChuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICBjYXNlICd2aWV3JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udkJ1Zi5iaW5kKG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgY2FzZSAnYmxvYic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnZCbG9iLmJpbmQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzbGljZSA9IGZ1bmN0aW9uIChkYXRhLCBvZmZzZXQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodXRpbC5nZXREYXRhVHlwZShkYXRhKSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5zbGljZShvZmZzZXQpO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnNsaWNlKG9mZnNldCk7XG4gICAgICAgICAgICBjYXNlICdidWZmZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnNsaWNlKG9mZnNldCk7XG4gICAgICAgICAgICBjYXNlICdhcnJheWJ1ZmZlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgICAgIGNhc2UgJ3ZpZXcnOlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlci5zbGljZShvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBDb252ZXJ0IGFuIEFycmF5QnVmZmVyIGludG8gaXRzIGhleGFkZWNpbWFsIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgICAgdmFyIGhleCA9IGZ1bmN0aW9uIChhcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIGksIHgsIGhleF90YWIgPSAnMDEyMzQ1Njc4OWFiY2RlZicsIHJlcyA9IFtdLCBiaW5hcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBiaW5hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHggPSBiaW5hcnJheVtpXTtcbiAgICAgICAgICAgICAgICByZXNbaV0gPSBoZXhfdGFiLmNoYXJBdCh4ID4+IDQgJiAxNSkgKyBoZXhfdGFiLmNoYXJBdCh4ID4+IDAgJiAxNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpvaW4oJycpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2VpbEhlYXBTaXplID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIC8vIFRoZSBhc20uanMgc3BlYyBzYXlzOlxuICAgICAgICAgICAgLy8gVGhlIGhlYXAgb2JqZWN0J3MgYnl0ZUxlbmd0aCBtdXN0IGJlIGVpdGhlclxuICAgICAgICAgICAgLy8gMl5uIGZvciBuIGluIFsxMiwgMjQpIG9yIDJeMjQgKiBuIGZvciBuIOKJpSAxLlxuICAgICAgICAgICAgLy8gQWxzbywgYnl0ZUxlbmd0aHMgc21hbGxlciB0aGFuIDJeMTYgYXJlIGRlcHJlY2F0ZWQuXG4gICAgICAgICAgICB2YXIgcDtcbiAgICAgICAgICAgIC8vIElmIHYgaXMgc21hbGxlciB0aGFuIDJeMTYsIHRoZSBzbWFsbGVzdCBwb3NzaWJsZSBzb2x1dGlvblxuICAgICAgICAgICAgLy8gaXMgMl4xNi5cbiAgICAgICAgICAgIGlmICh2IDw9IDY1NTM2KVxuICAgICAgICAgICAgICAgIHJldHVybiA2NTUzNjtcbiAgICAgICAgICAgIC8vIElmIHYgPCAyXjI0LCB3ZSByb3VuZCB1cCB0byAyXm4sXG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2Ugcm91bmQgdXAgdG8gMl4yNCAqIG4uXG4gICAgICAgICAgICBpZiAodiA8IDE2Nzc3MjE2KSB7XG4gICAgICAgICAgICAgICAgZm9yIChwID0gMTsgcCA8IHY7IHAgPSBwIDw8IDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHAgPSAxNjc3NzIxNjsgcCA8IHY7IHAgKz0gMTY3NzcyMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGludGVybmFsIGRhdGEgc3RydWN0dXJlcyB0byBhIG5ldyBjYXBhY2l0eS5cbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHNpemUgJSA2NCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NodW5rIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDEyOCBiaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYkMi5tYXhDaHVua0xlbiA9IHNpemU7XG4gICAgICAgICAgICBzZWxmJDIucGFkTWF4Q2h1bmtMZW4gPSBwYWRsZW4oc2l6ZSk7XG4gICAgICAgICAgICAvLyBUaGUgc2l6ZSBvZiB0aGUgaGVhcCBpcyB0aGUgc3VtIG9mOlxuICAgICAgICAgICAgLy8gMS4gVGhlIHBhZGRlZCBpbnB1dCBtZXNzYWdlIHNpemVcbiAgICAgICAgICAgIC8vIDIuIFRoZSBleHRlbmRlZCBzcGFjZSB0aGUgYWxnb3JpdGhtIG5lZWRzICgzMjAgYnl0ZSlcbiAgICAgICAgICAgIC8vIDMuIFRoZSAxNjAgYml0IHN0YXRlIHRoZSBhbGdvcml0bSB1c2VzXG4gICAgICAgICAgICBzZWxmJDIuaGVhcCA9IG5ldyBBcnJheUJ1ZmZlcihjZWlsSGVhcFNpemUoc2VsZiQyLnBhZE1heENodW5rTGVuICsgMzIwICsgMjApKTtcbiAgICAgICAgICAgIHNlbGYkMi5oMzIgPSBuZXcgSW50MzJBcnJheShzZWxmJDIuaGVhcCk7XG4gICAgICAgICAgICBzZWxmJDIuaDggPSBuZXcgSW50OEFycmF5KHNlbGYkMi5oZWFwKTtcbiAgICAgICAgICAgIHNlbGYkMi5jb3JlID0gbmV3IFJ1c2hhLl9jb3JlKHtcbiAgICAgICAgICAgICAgICBJbnQzMkFycmF5OiBJbnQzMkFycmF5LFxuICAgICAgICAgICAgICAgIERhdGFWaWV3OiBEYXRhVmlld1xuICAgICAgICAgICAgfSwge30sIHNlbGYkMi5oZWFwKTtcbiAgICAgICAgICAgIHNlbGYkMi5idWZmZXIgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyBJaW5pdGlhbGl6ZXRoZSBkYXRhc3RydWN0dXJlcyBhY2NvcmRpbmdcbiAgICAgICAgLy8gdG8gYSBjaHVuayBzaXl6ZS5cbiAgICAgICAgaW5pdChjaHVua1NpemUgfHwgNjQgKiAxMDI0KTtcbiAgICAgICAgdmFyIGluaXRTdGF0ZSA9IGZ1bmN0aW9uIChoZWFwLCBwYWRNc2dMZW4pIHtcbiAgICAgICAgICAgIHZhciBpbyA9IG5ldyBJbnQzMkFycmF5KGhlYXAsIHBhZE1zZ0xlbiArIDMyMCwgNSk7XG4gICAgICAgICAgICBpb1swXSA9IDE3MzI1ODQxOTM7XG4gICAgICAgICAgICBpb1sxXSA9IC0yNzE3MzM4Nzk7XG4gICAgICAgICAgICBpb1syXSA9IC0xNzMyNTg0MTk0O1xuICAgICAgICAgICAgaW9bM10gPSAyNzE3MzM4Nzg7XG4gICAgICAgICAgICBpb1s0XSA9IC0xMDA5NTg5Nzc2O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcGFkQ2h1bmsgPSBmdW5jdGlvbiAoY2h1bmtMZW4sIG1zZ0xlbikge1xuICAgICAgICAgICAgdmFyIHBhZENodW5rTGVuID0gcGFkbGVuKGNodW5rTGVuKTtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEludDMyQXJyYXkoc2VsZiQyLmhlYXAsIDAsIHBhZENodW5rTGVuID4+IDIpO1xuICAgICAgICAgICAgcGFkWmVyb2VzKHZpZXcsIGNodW5rTGVuKTtcbiAgICAgICAgICAgIHBhZERhdGEodmlldywgY2h1bmtMZW4sIG1zZ0xlbik7XG4gICAgICAgICAgICByZXR1cm4gcGFkQ2h1bmtMZW47XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdyaXRlIGRhdGEgdG8gdGhlIGhlYXAuXG4gICAgICAgIHZhciB3cml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjaHVua09mZnNldCwgY2h1bmtMZW4pIHtcbiAgICAgICAgICAgIGNvbnZGbihkYXRhKShzZWxmJDIuaDgsIHNlbGYkMi5oMzIsIGNodW5rT2Zmc2V0LCBjaHVua0xlbiwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEluaXRpYWxpemUgYW5kIGNhbGwgdGhlIFJ1c2hhQ29yZSxcbiAgICAgICAgLy8gYXNzdW1pbmcgYW4gaW5wdXQgYnVmZmVyIG9mIGxlbmd0aCBsZW4gKiA0LlxuICAgICAgICB2YXIgY29yZUNhbGwgPSBmdW5jdGlvbiAoZGF0YSwgY2h1bmtPZmZzZXQsIGNodW5rTGVuLCBtc2dMZW4sIGZpbmFsaXplKSB7XG4gICAgICAgICAgICB2YXIgcGFkQ2h1bmtMZW4gPSBjaHVua0xlbjtcbiAgICAgICAgICAgIGlmIChmaW5hbGl6ZSkge1xuICAgICAgICAgICAgICAgIHBhZENodW5rTGVuID0gcGFkQ2h1bmsoY2h1bmtMZW4sIG1zZ0xlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3cml0ZShkYXRhLCBjaHVua09mZnNldCwgY2h1bmtMZW4pO1xuICAgICAgICAgICAgc2VsZiQyLmNvcmUuaGFzaChwYWRDaHVua0xlbiwgc2VsZiQyLnBhZE1heENodW5rTGVuKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldFJhd0RpZ2VzdCA9IGZ1bmN0aW9uIChoZWFwLCBwYWRNYXhDaHVua0xlbikge1xuICAgICAgICAgICAgdmFyIGlvID0gbmV3IEludDMyQXJyYXkoaGVhcCwgcGFkTWF4Q2h1bmtMZW4gKyAzMjAsIDUpO1xuICAgICAgICAgICAgdmFyIG91dCA9IG5ldyBJbnQzMkFycmF5KDUpO1xuICAgICAgICAgICAgdmFyIGFyciA9IG5ldyBEYXRhVmlldyhvdXQuYnVmZmVyKTtcbiAgICAgICAgICAgIGFyci5zZXRJbnQzMigwLCBpb1swXSwgZmFsc2UpO1xuICAgICAgICAgICAgYXJyLnNldEludDMyKDQsIGlvWzFdLCBmYWxzZSk7XG4gICAgICAgICAgICBhcnIuc2V0SW50MzIoOCwgaW9bMl0sIGZhbHNlKTtcbiAgICAgICAgICAgIGFyci5zZXRJbnQzMigxMiwgaW9bM10sIGZhbHNlKTtcbiAgICAgICAgICAgIGFyci5zZXRJbnQzMigxNiwgaW9bNF0sIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgaGFzaCBkaWdlc3QgYXMgYW4gYXJyYXkgb2YgNSAzMmJpdCBpbnRlZ2Vycy5cbiAgICAgICAgdmFyIHJhd0RpZ2VzdCA9IHRoaXMucmF3RGlnZXN0ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgICAgIHZhciBtc2dMZW4gPSBzdHIuYnl0ZUxlbmd0aCB8fCBzdHIubGVuZ3RoIHx8IHN0ci5zaXplIHx8IDA7XG4gICAgICAgICAgICAgICAgaW5pdFN0YXRlKHNlbGYkMi5oZWFwLCBzZWxmJDIucGFkTWF4Q2h1bmtMZW4pO1xuICAgICAgICAgICAgICAgIHZhciBjaHVua09mZnNldCA9IDAsIGNodW5rTGVuID0gc2VsZiQyLm1heENodW5rTGVuLCBsYXN0O1xuICAgICAgICAgICAgICAgIGZvciAoY2h1bmtPZmZzZXQgPSAwOyBtc2dMZW4gPiBjaHVua09mZnNldCArIGNodW5rTGVuOyBjaHVua09mZnNldCArPSBjaHVua0xlbikge1xuICAgICAgICAgICAgICAgICAgICBjb3JlQ2FsbChzdHIsIGNodW5rT2Zmc2V0LCBjaHVua0xlbiwgbXNnTGVuLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvcmVDYWxsKHN0ciwgY2h1bmtPZmZzZXQsIG1zZ0xlbiAtIGNodW5rT2Zmc2V0LCBtc2dMZW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRSYXdEaWdlc3Qoc2VsZiQyLmhlYXAsIHNlbGYkMi5wYWRNYXhDaHVua0xlbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAvLyBUaGUgZGlnZXN0IGFuZCBkaWdlc3RGcm9tKiBpbnRlcmZhY2UgcmV0dXJucyB0aGUgaGFzaCBkaWdlc3RcbiAgICAgICAgLy8gYXMgYSBoZXggc3RyaW5nLlxuICAgICAgICB0aGlzLmRpZ2VzdCA9IHRoaXMuZGlnZXN0RnJvbVN0cmluZyA9IHRoaXMuZGlnZXN0RnJvbUJ1ZmZlciA9IHRoaXMuZGlnZXN0RnJvbUFycmF5QnVmZmVyID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIGhleChyYXdEaWdlc3Qoc3RyKS5idWZmZXIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICA7XG4gICAgLy8gVGhlIGxvdy1sZXZlbCBSdXNoQ29yZSBtb2R1bGUgcHJvdmlkZXMgdGhlIGhlYXJ0IG9mIFJ1c2hhLFxuICAgIC8vIGEgaGlnaC1zcGVlZCBzaGExIGltcGxlbWVudGF0aW9uIHdvcmtpbmcgb24gYW4gSW50MzJBcnJheSBoZWFwLlxuICAgIC8vIEF0IGZpcnN0IGdsYW5jZSwgdGhlIGltcGxlbWVudGF0aW9uIHNlZW1zIGNvbXBsaWNhdGVkLCBob3dldmVyXG4gICAgLy8gd2l0aCB0aGUgU0hBMSBzcGVjIGF0IGhhbmQsIGl0IGlzIG9idmlvdXMgdGhpcyBhbG1vc3QgYSB0ZXh0Ym9va1xuICAgIC8vIGltcGxlbWVudGF0aW9uIHRoYXQgaGFzIGEgZmV3IGZ1bmN0aW9ucyBoYW5kLWlubGluZWQgYW5kIGEgZmV3IGxvb3BzXG4gICAgLy8gaGFuZC11bnJvbGxlZC5cbiAgICBSdXNoYS5fY29yZSA9IGZ1bmN0aW9uIFJ1c2hhQ29yZShzdGRsaWIsIGZvcmVpZ24sIGhlYXApIHtcbiAgICAgICAgJ3VzZSBhc20nO1xuICAgICAgICB2YXIgSCA9IG5ldyBzdGRsaWIuSW50MzJBcnJheShoZWFwKTtcbiAgICAgICAgZnVuY3Rpb24gaGFzaChrLCB4KSB7XG4gICAgICAgICAgICAvLyBrIGluIGJ5dGVzXG4gICAgICAgICAgICBrID0gayB8IDA7XG4gICAgICAgICAgICB4ID0geCB8IDA7XG4gICAgICAgICAgICB2YXIgaSA9IDAsIGogPSAwLCB5MCA9IDAsIHowID0gMCwgeTEgPSAwLCB6MSA9IDAsIHkyID0gMCwgejIgPSAwLCB5MyA9IDAsIHozID0gMCwgeTQgPSAwLCB6NCA9IDAsIHQwID0gMCwgdDEgPSAwO1xuICAgICAgICAgICAgeTAgPSBIW3ggKyAzMjAgPj4gMl0gfCAwO1xuICAgICAgICAgICAgeTEgPSBIW3ggKyAzMjQgPj4gMl0gfCAwO1xuICAgICAgICAgICAgeTIgPSBIW3ggKyAzMjggPj4gMl0gfCAwO1xuICAgICAgICAgICAgeTMgPSBIW3ggKyAzMzIgPj4gMl0gfCAwO1xuICAgICAgICAgICAgeTQgPSBIW3ggKyAzMzYgPj4gMl0gfCAwO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgKGkgfCAwKSA8IChrIHwgMCk7IGkgPSBpICsgNjQgfCAwKSB7XG4gICAgICAgICAgICAgICAgejAgPSB5MDtcbiAgICAgICAgICAgICAgICB6MSA9IHkxO1xuICAgICAgICAgICAgICAgIHoyID0geTI7XG4gICAgICAgICAgICAgICAgejMgPSB5MztcbiAgICAgICAgICAgICAgICB6NCA9IHk0O1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IChqIHwgMCkgPCA2NDsgaiA9IGogKyA0IHwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0MSA9IEhbaSArIGogPj4gMl0gfCAwO1xuICAgICAgICAgICAgICAgICAgICB0MCA9ICgoeTAgPDwgNSB8IHkwID4+PiAyNykgKyAoeTEgJiB5MiB8IH55MSAmIHkzKSB8IDApICsgKCh0MSArIHk0IHwgMCkgKyAxNTE4NTAwMjQ5IHwgMCkgfCAwO1xuICAgICAgICAgICAgICAgICAgICB5NCA9IHkzO1xuICAgICAgICAgICAgICAgICAgICB5MyA9IHkyO1xuICAgICAgICAgICAgICAgICAgICB5MiA9IHkxIDw8IDMwIHwgeTEgPj4+IDI7XG4gICAgICAgICAgICAgICAgICAgIHkxID0geTA7XG4gICAgICAgICAgICAgICAgICAgIHkwID0gdDA7XG4gICAgICAgICAgICAgICAgICAgIEhbayArIGogPj4gMl0gPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChqID0gayArIDY0IHwgMDsgKGogfCAwKSA8IChrICsgODAgfCAwKTsgaiA9IGogKyA0IHwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0MSA9IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPDwgMSB8IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPj4+IDMxO1xuICAgICAgICAgICAgICAgICAgICB0MCA9ICgoeTAgPDwgNSB8IHkwID4+PiAyNykgKyAoeTEgJiB5MiB8IH55MSAmIHkzKSB8IDApICsgKCh0MSArIHk0IHwgMCkgKyAxNTE4NTAwMjQ5IHwgMCkgfCAwO1xuICAgICAgICAgICAgICAgICAgICB5NCA9IHkzO1xuICAgICAgICAgICAgICAgICAgICB5MyA9IHkyO1xuICAgICAgICAgICAgICAgICAgICB5MiA9IHkxIDw8IDMwIHwgeTEgPj4+IDI7XG4gICAgICAgICAgICAgICAgICAgIHkxID0geTA7XG4gICAgICAgICAgICAgICAgICAgIHkwID0gdDA7XG4gICAgICAgICAgICAgICAgICAgIEhbaiA+PiAyXSA9IHQxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGogPSBrICsgODAgfCAwOyAoaiB8IDApIDwgKGsgKyAxNjAgfCAwKTsgaiA9IGogKyA0IHwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0MSA9IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPDwgMSB8IChIW2ogLSAxMiA+PiAyXSBeIEhbaiAtIDMyID4+IDJdIF4gSFtqIC0gNTYgPj4gMl0gXiBIW2ogLSA2NCA+PiAyXSkgPj4+IDMxO1xuICAgICAgICAgICAgICAgICAgICB0MCA9ICgoeTAgPDwgNSB8IHkwID4+PiAyNykgKyAoeTEgXiB5MiBeIHkzKSB8IDApICsgKCh0MSArIHk0IHwgMCkgKyAxODU5Nzc1MzkzIHwgMCkgfCAwO1xuICAgICAgICAgICAgICAgICAgICB5NCA9IHkzO1xuICAgICAgICAgICAgICAgICAgICB5MyA9IHkyO1xuICAgICAgICAgICAgICAgICAgICB5MiA9IHkxIDw8IDMwIHwgeTEgPj4+IDI7XG4gICAgICAgICAgICAgICAgICAgIHkxID0geTA7XG4gICAgICAgICAgICAgICAgICAgIHkwID0gdDA7XG4gICAgICAgICAgICAgICAgICAgIEhbaiA+PiAyXSA9IHQxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGogPSBrICsgMTYwIHwgMDsgKGogfCAwKSA8IChrICsgMjQwIHwgMCk7IGogPSBqICsgNCB8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdDEgPSAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pIDw8IDEgfCAoSFtqIC0gMTIgPj4gMl0gXiBIW2ogLSAzMiA+PiAyXSBeIEhbaiAtIDU2ID4+IDJdIF4gSFtqIC0gNjQgPj4gMl0pID4+PiAzMTtcbiAgICAgICAgICAgICAgICAgICAgdDAgPSAoKHkwIDw8IDUgfCB5MCA+Pj4gMjcpICsgKHkxICYgeTIgfCB5MSAmIHkzIHwgeTIgJiB5MykgfCAwKSArICgodDEgKyB5NCB8IDApIC0gMTg5NDAwNzU4OCB8IDApIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgeTQgPSB5MztcbiAgICAgICAgICAgICAgICAgICAgeTMgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgeTIgPSB5MSA8PCAzMCB8IHkxID4+PiAyO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHQwO1xuICAgICAgICAgICAgICAgICAgICBIW2ogPj4gMl0gPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChqID0gayArIDI0MCB8IDA7IChqIHwgMCkgPCAoayArIDMyMCB8IDApOyBqID0gaiArIDQgfCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHQxID0gKEhbaiAtIDEyID4+IDJdIF4gSFtqIC0gMzIgPj4gMl0gXiBIW2ogLSA1NiA+PiAyXSBeIEhbaiAtIDY0ID4+IDJdKSA8PCAxIHwgKEhbaiAtIDEyID4+IDJdIF4gSFtqIC0gMzIgPj4gMl0gXiBIW2ogLSA1NiA+PiAyXSBeIEhbaiAtIDY0ID4+IDJdKSA+Pj4gMzE7XG4gICAgICAgICAgICAgICAgICAgIHQwID0gKCh5MCA8PCA1IHwgeTAgPj4+IDI3KSArICh5MSBeIHkyIF4geTMpIHwgMCkgKyAoKHQxICsgeTQgfCAwKSAtIDg5OTQ5NzUxNCB8IDApIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgeTQgPSB5MztcbiAgICAgICAgICAgICAgICAgICAgeTMgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgeTIgPSB5MSA8PCAzMCB8IHkxID4+PiAyO1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHQwO1xuICAgICAgICAgICAgICAgICAgICBIW2ogPj4gMl0gPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeTAgPSB5MCArIHowIHwgMDtcbiAgICAgICAgICAgICAgICB5MSA9IHkxICsgejEgfCAwO1xuICAgICAgICAgICAgICAgIHkyID0geTIgKyB6MiB8IDA7XG4gICAgICAgICAgICAgICAgeTMgPSB5MyArIHozIHwgMDtcbiAgICAgICAgICAgICAgICB5NCA9IHk0ICsgejQgfCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSFt4ICsgMzIwID4+IDJdID0geTA7XG4gICAgICAgICAgICBIW3ggKyAzMjQgPj4gMl0gPSB5MTtcbiAgICAgICAgICAgIEhbeCArIDMyOCA+PiAyXSA9IHkyO1xuICAgICAgICAgICAgSFt4ICsgMzMyID4+IDJdID0geTM7XG4gICAgICAgICAgICBIW3ggKyAzMzYgPj4gMl0gPSB5NDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXNoOiBoYXNoIH07XG4gICAgfTtcbiAgICAvLyBJZiB3ZSdlIHJ1bm5pbmcgaW4gTm9kZS5KUywgZXhwb3J0IGEgbW9kdWxlLlxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFJ1c2hhO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LlJ1c2hhID0gUnVzaGE7XG4gICAgfVxuICAgIC8vIElmIHdlJ3JlIHJ1bm5pbmcgaW4gYSB3ZWJ3b3JrZXIsIGFjY2VwdFxuICAgIC8vIG1lc3NhZ2VzIGNvbnRhaW5pbmcgYSBqb2JpZCBhbmQgYSBidWZmZXJcbiAgICAvLyBvciBibG9iIG9iamVjdCwgYW5kIHJldHVybiB0aGUgaGFzaCByZXN1bHQuXG4gICAgaWYgKHR5cGVvZiBGaWxlUmVhZGVyU3luYyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyU3luYygpLCBoYXNoZXIgPSBuZXcgUnVzaGEoNCAqIDEwMjQgKiAxMDI0KTtcbiAgICAgICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiBvbk1lc3NhZ2UoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYXNoLCBkYXRhID0gZXZlbnQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBoYXNoID0gaGFzaGVyLmRpZ2VzdChkYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGV2ZW50LmRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgIGhhc2g6IGhhc2hcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGV2ZW50LmRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlLm5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59KCkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3J1c2hhL3J1c2hhLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtDc3MsIEpzfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgZ2V0VXJsUGFyYW0gZnJvbSAnLi91cmwnO1xuXG5leHBvcnQgY2xhc3MgTWFuaWZlc3Qge1xuICBjb25zdHJ1Y3Rvcih1cmwsIGNvbmZpZykge1xuICAgIGNvbnN0IHsgZW5hYmxlTG9nZ2luZyA9IGZhbHNlIH0gPSBjb25maWc7XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coXG4gICAgICBnZXRVcmxQYXJhbSgnZGFjdHlsb2dyYXBoc3ktZW5hYmxlTG9nZ2luZycsIGVuYWJsZUxvZ2dpbmcpXG4gICAgKTtcblxuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAuZ2V0KHRoaXMudXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVXJsXG4gICAgICAgIH0gPSByZXNwb25zZTtcblxuICAgICAgICB0aGlzLmxvZy5pbmZvKGBGZXRjaGVkIG1hbmlmZXN0IGZyb20gdXJsOiAke3Jlc3BvbnNlVXJsfS5gKTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgfSwgeGhyID0+IHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoYENvdWxkIG5vdCBmZXRjaCBtYW5pZmVzdCB3aXRoIHVybDogJHt4aHIucmVzcG9uc2VVUkx9IWApO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihpbmplY3RJbnRvLCBtYW5pZmVzdHMsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgdGhpcy5sb2cgPSBuZXcgTG9nKFxuICAgICAgZ2V0VXJsUGFyYW0oJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLCBlbmFibGVMb2dnaW5nKVxuICAgICk7XG5cbiAgICB0aGlzLm1hbmlmZXN0cyA9IHt9O1xuICAgIHRoaXMuaW5qZWN0SW50byA9IGluamVjdEludG87XG5cbiAgICBtYW5pZmVzdHMuZm9yRWFjaChtYW5pZmVzdCA9PiB7IHRoaXMubWFuaWZlc3RzW21hbmlmZXN0LnBhY2thZ2VdID0gbWFuaWZlc3Q7IH0pO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4O1xuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICB9XG5cbiAgaW5qZWN0KCkge1xuICAgIGNvbnN0XG4gICAgICBmbGF0dGVuID0gbGlzdCA9PiBsaXN0LnJlZHVjZShcbiAgICAgICAgKGEsIGIpID0+IGEuY29uY2F0KEFycmF5LmlzQXJyYXkoYikgPyBmbGF0dGVuKGIpIDogYiksIFtdXG4gICAgICApLFxuICAgICAgaW5qZWN0SW50b0RPTSA9IChkZXBlbmRlbmNpZXMsIGlkeCA9IDApID0+IHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRlcGVuZGVuY2llc1tpZHhdO1xuXG4gICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWpzJykpIHtcbiAgICAgICAgICBpZiAodGhpcy5pbmplY3RJbnRvKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdJbmplY3RpbmcgdGFnOicsIGVsZW0pO1xuXG4gICAgICAgICAgICB0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5qZWN0SW50b0RPTShkZXBlbmRlbmNpZXMsICsraWR4KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHsgdGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGVsZW0pOyB9XG5cbiAgICAgICAgICBpbmplY3RJbnRvRE9NKGRlcGVuZGVuY2llcywgKytpZHgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgdGhpcy5vcmRlci5tYXAoX3BhY2thZ2UgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSkge1xuICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBDb3VsZG5cXCd0IGZpbmQgcGFja2FnZSAke19wYWNrYWdlfSBmcm9tIGluamVjdGlvbiBvcmRlci5gKTtcblxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluamVjdE1hbmlmZXN0KHRoaXMubWFuaWZlc3RzW19wYWNrYWdlXSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKS50aGVuKG1hbmlmZXN0cyA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBmbGF0dGVuKG1hbmlmZXN0cyk7XG5cbiAgICAgIGluamVjdEludG9ET00oZGVwZW5kZW5jaWVzKTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0TWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICBsZXRcbiAgICAgIGhhc2hlcyA9IE9iamVjdC5rZXlzKG1hbmlmZXN0Lmhhc2hlcyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoaGFzaGVzLm1hcChoYXNoID0+IHtcbiAgICAgIGxldFxuICAgICAgICBkZXBlbmRlbmN5ID0gbWFuaWZlc3QuaGFzaGVzW2hhc2hdLFxuICAgICAgICByb290VXJsO1xuXG4gICAgICByb290VXJsID0gW21hbmlmZXN0LnJvb3RVcmwsIG1hbmlmZXN0LnBhY2thZ2VVcmxdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBfdXJsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICAgICk7XG4gICAgICB9KS5qb2luKCcvJyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmluamVjdERlcGVuZGVuY3koXG4gICAgICAgIGRlcGVuZGVuY3ksXG4gICAgICAgIHJvb3RVcmxcbiAgICAgICk7XG4gICAgfSkpO1xuICB9XG5cbiAgaW5qZWN0RGVwZW5kZW5jeShkZXBlbmRlbmN5LCByb290VXJsKSB7XG4gICAgc3dpdGNoIChkZXBlbmRlbmN5LmV4dGVuc2lvbikge1xuICAgICAgY2FzZSAnLmNzcyc6XG4gICAgICAgIHJldHVybiBuZXcgQ3NzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBjYXNlICcuanMnOlxuICAgICAgICByZXR1cm4gbmV3IEpzKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKS5pbmplY3QoXG4gICAgICAgICAgdGhpcy51cmxzKGRlcGVuZGVuY3ksIHJvb3RVcmwpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGJhc2VuYW1lKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC8uKlxcL3xcXC5bXi5dKiQvZywgJycpO1xuICB9XG5cbiAgdXJscyhkZXBlbmRlbmN5LCByb290VXJsID0gJycpIHtcbiAgICBsZXRcbiAgICAgIGJhc2VuYW1lID0gdGhpcy5iYXNlbmFtZShkZXBlbmRlbmN5LmZpbGUpLFxuICAgICAgdXJsO1xuXG4gICAgLy8gRmlsdGVyIG91dCBwb3RlbnRpYWwgbnVsbCB2YWx1ZXNcbiAgICAvLyBwYXNzZWQgaW4gYXMgdmFyaW91cyBwYXJ0cyBvZiBhbiB1cmwuXG4gICAgdXJsID0gW3RoaXMucHJlZml4LCByb290VXJsLCBkZXBlbmRlbmN5LnBhdGhdLmZpbHRlcihfdXJsID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIF91cmwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBfdXJsICE9PSBudWxsXG4gICAgICApO1xuICAgIH0pLmpvaW4oJy8nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBoYXNoOiBkZXBlbmRlbmN5Lmhhc2gsXG4gICAgICBwcmludGVkOiBgLyR7dXJsfS8ke2Jhc2VuYW1lfS0ke2RlcGVuZGVuY3kuaGFzaH0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWAsXG4gICAgICByYXc6IGAvJHt1cmx9LyR7YmFzZW5hbWV9JHtkZXBlbmRlbmN5LmV4dGVuc2lvbn1gLFxuICAgICAgc2luZ3VsYXJCeTogYC8ke3VybH0vJHtiYXNlbmFtZX0ke2RlcGVuZGVuY3kuZXh0ZW5zaW9ufWBcbiAgICB9O1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmplY3Rvci5qc1xuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBamF4IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJztcbmltcG9ydCBnZXRVcmxQYXJhbSBmcm9tICcuL3VybCc7XG5cbmV4cG9ydCBjbGFzcyBKcyB7XG4gIGNvbnN0cnVjdG9yKGluamVjdEludG8sIGNvbmZpZyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIGVuYWJsZUxvZ2dpbmcgPSBmYWxzZSxcbiAgICAgIHZlcmlmaWNhdGlvbiA9IGZhbHNlXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGVuYWJsZUxvZ2dpbmcgPSBnZXRVcmxQYXJhbShcbiAgICAgICdkYWN0eWxvZ3JhcGhzeS1lbmFibGVMb2dnaW5nJyxcbiAgICAgIGVuYWJsZUxvZ2dpbmdcbiAgICApO1xuXG4gICAgdGhpcy5pbmplY3RJbnRvID0gaW5qZWN0SW50bztcblxuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoe1xuICAgICAgYXBwUHJlZml4OiBjb25maWcuYXBwUHJlZml4LFxuICAgICAgZW5hYmxlTG9nZ2luZzogZW5hYmxlTG9nZ2luZ1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYWNoZURlbGF5ID0gY29uZmlnLmNhY2hlRGVsYXkgfHwgNTAwMDtcbiAgICB0aGlzLnZlcmlmaWNhdGlvbiA9IHZlcmlmaWNhdGlvbjtcblxuICAgIHRoaXMubG9nID0gbmV3IExvZyhlbmFibGVMb2dnaW5nKTtcbiAgfVxuXG4gIGluamVjdFdpdGhUZXh0KHRleHQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB0ZXh0IGZvciAke3VybH0uYCk7XG5cbiAgICAgIHNjcmlwdC5kZWZlciA9IGZhbHNlO1xuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG5cbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgc2NyaXB0LnRleHQgPSBgXG4gICAgICAgICR7dGV4dH1cbiAgICAgICAgLy8jIHNvdXJjZVVSTD0ke3VybH1cbiAgICAgIGA7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7XG4gICAgICB9IGVsc2UgeyByZXNvbHZlKHNjcmlwdCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGluamVjdFdpdGhVcmwodXJscywgd2hpY2hVcmwgPSAncHJpbnRlZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvLyBDcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBpdHMgdHlwZVxuICAgICAgbGV0XG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPHNjcmlwdCAvPi10YWcgd2l0aCB1cmw6ICR7dXJsfS5gKTtcblxuICAgICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgICBzY3JpcHQuZGVmZXIgPSBmYWxzZTtcblxuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11cmwnLCB1cmwpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1kYWN0eWxvZ3JhcGhzeS11bmNhY2hlZC1qcycsIHRydWUpO1xuXG4gICAgICAvLyBCaW5kIHRvIHJlYWR5U3RhdGUgb3IgcmVnaXN0ZXIgwrRvbmxvYWTCtCBjYWxsYmFja1xuICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIC8vIENhbGxiYWNrIGZvciBJRSdzIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIChJIGZlZWwgc2Vlc2ljaylcbiAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCaW5kIGBvbmxvYWRgIGNhbGxiYWNrIG9uIHNjcmlwdCBlbGVtZW50XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHdoaWNoVXJsID09PSAncHJpbnRlZCcpIHsgdGhpcy5lbnN1cmVDYWNoZSh1cmwsIHVybHMuc2luZ3VsYXJCeSwgdGhpcy5jYWNoZURlbGF5KTsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEluamVjdCB1bnByaW50ZWQgd2l0aG91dCBjYWNoaW5nIGluIGNhc2Ugb2YgZXJyb3JcbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIEphdmFTY3JpcHQgZnJvbSAke3VybH0gLSBmYWxsaW5nIGJhY2sgdG8gdW5wcmludGVkIHZlcnNpb24uYCk7XG5cbiAgICAgICAgICBpZiAod2hpY2hVcmwgPT09ICdwcmludGVkJykgeyB0aGlzLmluamVjdFdpdGhVcmwodXJscywgJ3JhdycpOyB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxzY3JpcHQgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQoc2NyaXB0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAuLi5uZWVkcyBjYWNoaW5nIG1hbnVhbGx5IGNhdXNlIG5ldmVyIGluamVjdGVkXG4gICAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7IHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSk7IH1cblxuICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGUuaGFzKHVybCkpIHsgcmVzb2x2ZSgpOyB9XG5cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBKYXZhU2NyaXB0IGZyb20gJHt1cmx9IGZvciBjYWNoZSBpbiAke2RlbGF5fS5gKTtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBBamF4KClcbiAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICBsZXQgeyB0ZXh0OiByZXNwb25zZVRleHQgfSA9IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc3BvbnNlVGV4dCwgJ2pzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBMb2FkZWQgSmF2YVNjcmlwdCBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBGYWlsZWQgYXR0ZW1wdGluZyB0byBjYWNoZSBKYXZhU2NyaXB0IGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KFxuICAgICAgdXJscy5wcmludGVkLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5oYXNoKHVybHMuaGFzaClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhUZXh0KHRleHQsIHVybHMucHJpbnRlZCk7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0V2l0aFVybCh1cmxzKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzIHtcbiAgY29uc3RydWN0b3IoaW5qZWN0SW50bywgY29uZmlnID0ge30pIHtcbiAgICBsZXQge1xuICAgICAgZW5hYmxlTG9nZ2luZyA9IGZhbHNlLFxuICAgICAgdmVyaWZpY2F0aW9uID0gZmFsc2VcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgZW5hYmxlTG9nZ2luZyA9IGdldFVybFBhcmFtKFxuICAgICAgJ2RhY3R5bG9ncmFwaHN5LWVuYWJsZUxvZ2dpbmcnLFxuICAgICAgZW5hYmxlTG9nZ2luZ1xuICAgICk7XG5cbiAgICB0aGlzLmluamVjdEludG8gPSBpbmplY3RJbnRvO1xuXG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSh7XG4gICAgICBhcHBQcmVmaXg6IGNvbmZpZy5hcHBQcmVmaXhcbiAgICB9KTtcblxuICAgIHRoaXMuY2FjaGVEZWxheSA9IGNvbmZpZy5jYWNoZURlbGF5IHx8IDUwMDA7XG4gICAgdGhpcy52ZXJpZmljYXRpb24gPSB2ZXJpZmljYXRpb247XG5cbiAgICB0aGlzLmxvZyA9IG5ldyBMb2coZW5hYmxlTG9nZ2luZyk7XG4gIH1cblxuICBlbnN1cmVDYWNoZSh1cmwsIHNpbmd1bGFyQnkgPSBmYWxzZSwgZGVsYXkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAodGhpcy5jYWNoZS5oYXModXJsKSkgeyByZXNvbHZlKCk7IH1cblxuICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGluZyBDU1MgZnJvbSAke3VybH0gZm9yIGNhY2hlIGluICR7ZGVsYXl9LmApO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheCgpXG4gICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbGV0IHsgdGV4dDogcmVzcG9uc2VUZXh0IH0gPSByZXNwb25zZTtcblxuICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQocmVzcG9uc2VUZXh0LCAnY3NzJywgdXJsLCBzaW5ndWxhckJ5KTtcblxuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgTG9hZGVkIENTUyBmcm9tICR7dXJsfSBub3cgY2FjaGVkLmApO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgRmFpbGVkIGF0dGVtcHRpbmcgdG8gY2FjaGUgQ1NTIGZyb20gJHt1cmx9LmApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFVybCh1cmxzLCB3aGljaFVybCA9ICdwcmludGVkJykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldFxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLFxuICAgICAgICB1cmwgPSB1cmxzW3doaWNoVXJsXTtcblxuICAgICAgdGhpcy5sb2cuaW5mbyhgQ3JlYXRpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWRhY3R5bG9ncmFwaHN5LXVuY2FjaGVkLWNzcycsIHRydWUpO1xuXG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG5cbiAgICAgIC8vIEZhbGxiYWNrIHRvIHVucHJpbnRlZCBhc3NldHMgYWZ0ZXIgY2FjaGUgYXR0ZW1wdFxuICAgICAgLy8gbm8gY2FsbGJhY2tzIGZvciBzdHlsZXNoZWV0IGluamVjdGlvbnMgKHRpbWVvdXRzIGFyZSB3b3JzZS4uLilcbiAgICAgIGlmICh3aGljaFVybCA9PT0gJ3ByaW50ZWQnKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQ2FjaGUodXJsLCB1cmxzLnNpbmd1bGFyQnksIHRoaXMuY2FjaGVEZWxheSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgQ291bGQgbm90IGZldGNoIENTUyBmcm9tICR7dXJsfSAtIGZhbGxpbmcgYmFjayB0byB1bnByaW50ZWQgdmVyc2lvbi5gKTtcblxuICAgICAgICAgICAgdGhpcy5pbmplY3RXaXRoVXJsKHVybHMsICdyYXcnKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaW5qZWN0SW50bykge1xuICAgICAgICB0aGlzLmxvZy5pbmZvKGBJbmplY3RpbmcgPGxpbmsgLz4tdGFnIHdpdGggdXJsOiAke3VybH0uYCk7XG5cbiAgICAgICAgcmVzb2x2ZSh0aGlzLmluamVjdEludG8uYXBwZW5kQ2hpbGQobGluaykpO1xuICAgICAgfSBlbHNlIHsgcmVzb2x2ZShsaW5rKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5qZWN0V2l0aFRleHQodGV4dCwgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICAgIHRoaXMubG9nLmluZm8oYENyZWF0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHRleHQgZm9yIHVybDogJHt1cmx9LmApO1xuXG4gICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGFjdHlsb2dyYXBoc3ktdXJsJywgdXJsKTtcblxuICAgICAgbGluay50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICAgIGlmICh0aGlzLmluamVjdEludG8pIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgSW5qZWN0aW5nIDxsaW5rIC8+LXRhZyB3aXRoIHVybDogJHt1cmx9LmApO1xuXG4gICAgICAgIHJlc29sdmUodGhpcy5pbmplY3RJbnRvLmFwcGVuZENoaWxkKGxpbmspKTtcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUobGluayk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhc2goaGFzaCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnZlcmlmaWNhdGlvbiA9PT0gdHJ1ZVxuICAgICkgPyBoYXNoIDogZmFsc2VcbiAgfVxuXG4gIGluamVjdCh1cmxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KFxuICAgICAgdXJscy5wcmludGVkLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgdGhpcy5oYXNoKHVybHMuaGFzaClcbiAgICApLnRoZW4odGV4dCA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbmplY3RXaXRoVGV4dCh0ZXh0LCB1cmxzLnByaW50ZWQpO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdFdpdGhVcmwodXJscyk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RvbS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgZ2V0KHVybCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZm9yIElFLlxuICAgICAgICB4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDT1JTIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIHhociA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIHVybDogeGhyLnJlc3BvbnNlVVJMXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FqYXguanNcbiAqKi8iLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vamFrZWFyY2hpYmFsZC9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICAzLjEuMlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0Z1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzTWF5YmVUaGVuYWJsZSh4KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSR1dGlscyQkX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzQXJyYXkgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJF9pc0FycmF5O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuID0gMDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dDtcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGN1c3RvbVNjaGVkdWxlckZuO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbl0gPSBjYWxsYmFjaztcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICsgMV0gPSBhcmc7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuICs9IDI7XG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9PT0gMikge1xuICAgICAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICAgICAgaWYgKGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbihsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJHNldEFzYXAoYXNhcEZuKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcCA9IGFzYXBGbjtcbiAgICB9XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGJyb3dzZXJXaW5kb3cgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpID8gd2luZG93IDogdW5kZWZpbmVkO1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyV2luZG93IHx8IHt9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRpc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4gICAgLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJGFzYXAkJGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgLy8gbm9kZVxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpIHtcbiAgICAgIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2sobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmVydHhcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dChsaWIkZXM2JHByb21pc2UkYXNhcCQkZmx1c2gpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBsaWIkZXM2JHByb21pc2UkYXNhcCQkQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIobGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKTtcbiAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbm9kZS5kYXRhID0gKGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2ViIHdvcmtlclxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VTZXRUaW1lb3V0KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGxpYiRlczYkcHJvbWlzZSRhc2FwJCRmbHVzaCwgMSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGZsdXNoKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWIkZXM2JHByb21pc2UkYXNhcCQkbGVuOyBpKz0yKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpXTtcbiAgICAgICAgdmFyIGFyZyA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRxdWV1ZVtpKzFdO1xuXG4gICAgICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkcXVldWVbaSsxXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJGxlbiA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJGFzYXAkJGF0dGVtcHRWZXJ0eCgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByID0gcmVxdWlyZTtcbiAgICAgICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlVmVydHhUaW1lcigpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaDtcbiAgICAvLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuICAgIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNOb2RlKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VOZXh0VGljaygpO1xuICAgIH0gZWxzZSBpZiAobGliJGVzNiRwcm9taXNlJGFzYXAkJEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCR1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkaXNXb3JrZXIpIHtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzY2hlZHVsZUZsdXNoID0gbGliJGVzNiRwcm9taXNlJGFzYXAkJHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkYXNhcCQkYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2NoZWR1bGVGbHVzaCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhdHRlbXB0VmVydHgoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGliJGVzNiRwcm9taXNlJGFzYXAkJHNjaGVkdWxlRmx1c2ggPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkdXNlU2V0VGltZW91dCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgICB2YXIgc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gICAgICBpZiAoc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCAmJiAhb25GdWxmaWxsbWVudCB8fCBzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQgJiYgIW9uUmVqZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIHZhciByZXN1bHQgPSBwYXJlbnQuX3Jlc3VsdDtcblxuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1tzdGF0ZSAtIDFdO1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChmdW5jdGlvbigpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGludm9rZUNhbGxiYWNrKHN0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHRoZW4kJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkdGhlbiQkdGhlbjtcbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZXNvbHZlJCRyZXNvbHZlKG9iamVjdCkge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlc29sdmUkJHJlc29sdmU7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKCkge31cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HICAgPSB2b2lkIDA7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCA9IDE7XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEICA9IDI7XG5cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IgPSBuZXcgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkRXJyb3JPYmplY3QoKTtcblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRjYW5ub3RSZXR1cm5Pd24oKSB7XG4gICAgICByZXR1cm4gbmV3IFR5cGVFcnJvcignQSBwcm9taXNlcyBjYWxsYmFjayBjYW5ub3QgcmV0dXJuIHRoYXQgc2FtZSBwcm9taXNlLicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4ocHJvbWlzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEdFVF9USEVOX0VSUk9SO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeVRoZW4odGhlbiwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbikge1xuICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCR0cnlUaGVuKHRoZW4sIHRoZW5hYmxlLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmIChzZWFsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBpZiAoc2VhbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG5cbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgICAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgICAgIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHN1YnNjcmliZSh0aGVuYWJsZSwgdW5kZWZpbmVkLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuKSB7XG4gICAgICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgIHRoZW4gPT09IGxpYiRlczYkcHJvbWlzZSR0aGVuJCRkZWZhdWx0ICYmXG4gICAgICAgICAgY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24odGhlbikpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc2VsZkZ1bGZpbGxtZW50KCkpO1xuICAgICAgfSBlbHNlIGlmIChsaWIkZXM2JHByb21pc2UkdXRpbHMkJG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4odmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICAgICAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICAgICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoKHByb21pc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykgeyByZXR1cm47IH1cblxuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRDtcblxuICAgICAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoLCBwcm9taXNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcpIHsgcmV0dXJuOyB9XG4gICAgICBwcm9taXNlLl9zdGF0ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEO1xuICAgICAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gICAgICBsaWIkZXM2JHByb21pc2UkYXNhcCQkYXNhcChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgICAgIHZhciBzdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gICAgICB2YXIgbGVuZ3RoID0gc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gICAgICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gICAgICBzdWJzY3JpYmVyc1tsZW5ndGggKyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgICAgIHN1YnNjcmliZXJzW2xlbmd0aCArIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFJFSkVDVEVEXSAgPSBvblJlamVjdGlvbjtcblxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHB1Ymxpc2gsIHBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcHVibGlzaChwcm9taXNlKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgICAgIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEVycm9yT2JqZWN0KCkge1xuICAgICAgdGhpcy5lcnJvciA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRFcnJvck9iamVjdCgpO1xuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICAgICAgcmV0dXJuIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFRSWV9DQVRDSF9FUlJPUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gICAgICB2YXIgaGFzQ2FsbGJhY2sgPSBsaWIkZXM2JHByb21pc2UkdXRpbHMkJGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgICAgIHZhbHVlLCBlcnJvciwgc3VjY2VlZGVkLCBmYWlsZWQ7XG5cbiAgICAgIGlmIChoYXNDYWxsYmFjaykge1xuICAgICAgICB2YWx1ZSA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORykge1xuICAgICAgICAvLyBub29wXG4gICAgICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpe1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGwoZW50cmllcykge1xuICAgICAgcmV0dXJuIG5ldyBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xuICAgIH1cbiAgICB2YXIgbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRkZWZhdWx0ID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkYWxsJCRhbGw7XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkcmFjZShlbnRyaWVzKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3IobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG5cbiAgICAgIGlmICghbGliJGVzNiRwcm9taXNlJHV0aWxzJCRpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuXG4gICAgICBmdW5jdGlvbiBvbkZ1bGZpbGxtZW50KHZhbHVlKSB7XG4gICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblJlamVjdGlvbihyZWFzb24pIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBwcm9taXNlLl9zdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUEVORElORyAmJiBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSksIHVuZGVmaW5lZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJhY2UkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyYWNlJCRyYWNlO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJHJlamVjdCQkcmVqZWN0KHJlYXNvbikge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3RvcihsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRub29wKTtcbiAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJHJlamVjdDtcblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlciA9IDA7XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNSZXNvbHZlcigpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkbmVlZHNOZXcoKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xuICAgIH1cblxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlO1xuICAgIC8qKlxuICAgICAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICAgICAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgICAgIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICAgICAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIFRlcm1pbm9sb2d5XG4gICAgICAtLS0tLS0tLS0tLVxuXG4gICAgICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAgICAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAgICAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAgICAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gICAgICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gICAgICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICAgICAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gICAgICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICAgICAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICAgICAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgICAgIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICAgICAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICAgICAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gICAgICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gICAgICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gICAgICBCYXNpYyBVc2FnZTpcbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBgYGBqc1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gb24gc3VjY2Vzc1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICAvLyBvbiBmYWlsdXJlXG4gICAgICAgIHJlamVjdChyZWFzb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBvbiBmdWxmaWxsbWVudFxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIC8vIG9uIHJlamVjdGlvblxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgVXNhZ2U6XG4gICAgICAtLS0tLS0tLS0tLS0tLS1cblxuICAgICAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICAgICAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgLy8gb24gcmVqZWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gICAgICBgYGBqc1xuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICAgICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgICAgIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICAgICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgICAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBjbGFzcyBQcm9taXNlXG4gICAgICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICAgICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgICAgQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZShyZXNvbHZlcikge1xuICAgICAgdGhpcy5faWQgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkY291bnRlcisrO1xuICAgICAgdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gICAgICBpZiAobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc1Jlc29sdmVyKCk7XG4gICAgICAgIHRoaXMgaW5zdGFuY2VvZiBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZSA/IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRuZWVkc05ldygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLmFsbCA9IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJGFsbCQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yYWNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmFjZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZXNvbHZlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5yZWplY3QgPSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSRyZWplY3QkJGRlZmF1bHQ7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldFNjaGVkdWxlciA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRzZXRTY2hlZHVsZXI7XG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UuX3NldEFzYXAgPSBsaWIkZXM2JHByb21pc2UkYXNhcCQkc2V0QXNhcDtcbiAgICBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkUHJvbWlzZS5fYXNhcCA9IGxpYiRlczYkcHJvbWlzZSRhc2FwJCRhc2FwO1xuXG4gICAgbGliJGVzNiRwcm9taXNlJHByb21pc2UkJFByb21pc2UucHJvdG90eXBlID0ge1xuICAgICAgY29uc3RydWN0b3I6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRQcm9taXNlLFxuXG4gICAgLyoqXG4gICAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQ2hhaW5pbmdcbiAgICAgIC0tLS0tLS0tXG5cbiAgICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgICAgfSk7XG5cbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICAgIH0pO1xuICAgICAgYGBgXG4gICAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cblxuICAgICAgYGBganNcbiAgICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBBc3NpbWlsYXRpb25cbiAgICAgIC0tLS0tLS0tLS0tLVxuXG4gICAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuXG4gICAgICBgYGBqc1xuICAgICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgU2ltcGxlIEV4YW1wbGVcbiAgICAgIC0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG4gICAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSk7XG4gICAgICBgYGBcblxuICAgICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgICAgLS0tLS0tLS0tLS0tLS1cblxuICAgICAgU3luY2hyb25vdXMgRXhhbXBsZVxuXG4gICAgICBgYGBqYXZhc2NyaXB0XG4gICAgICB2YXIgYXV0aG9yLCBib29rcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9XG4gICAgICBgYGBcblxuICAgICAgRXJyYmFjayBFeGFtcGxlXG5cbiAgICAgIGBgYGpzXG5cbiAgICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcblxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuXG4gICAgICB9XG5cbiAgICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIC8vIGZhaWx1cmVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIFByb21pc2UgRXhhbXBsZTtcblxuICAgICAgYGBgamF2YXNjcmlwdFxuICAgICAgZmluZEF1dGhvcigpLlxuICAgICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICB9KTtcbiAgICAgIGBgYFxuXG4gICAgICBAbWV0aG9kIHRoZW5cbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICB0aGVuOiBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCxcblxuICAgIC8qKlxuICAgICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cblxuICAgICAgYGBganNcbiAgICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHN5bmNocm9ub3VzXG4gICAgICB0cnkge1xuICAgICAgICBmaW5kQXV0aG9yKCk7XG4gICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgICAgfVxuXG4gICAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIH0pO1xuICAgICAgYGBgXG5cbiAgICAgIEBtZXRob2QgY2F0Y2hcbiAgICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAgICovXG4gICAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkZGVmYXVsdCA9IGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yO1xuICAgIGZ1bmN0aW9uIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJG5vb3ApO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgdGhpcy5faW5wdXQgICAgID0gaW5wdXQ7XG4gICAgICAgIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgICAgIHRoaXMuX2VudW1lcmF0ZSgpO1xuICAgICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkcmVqZWN0KHRoaXMucHJvbWlzZSwgdGhpcy5fdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbiAgICB9O1xuXG4gICAgbGliJGVzNiRwcm9taXNlJGVudW1lcmF0b3IkJEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggID0gdGhpcy5sZW5ndGg7XG4gICAgICB2YXIgaW5wdXQgICA9IHRoaXMuX2lucHV0O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJFBFTkRJTkcgJiYgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24oZW50cnksIGkpIHtcbiAgICAgIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgICAgIHZhciByZXNvbHZlID0gYy5yZXNvbHZlO1xuXG4gICAgICBpZiAocmVzb2x2ZSA9PT0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkcmVzb2x2ZSQkZGVmYXVsdCkge1xuICAgICAgICB2YXIgdGhlbiA9IGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJGdldFRoZW4oZW50cnkpO1xuXG4gICAgICAgIGlmICh0aGVuID09PSBsaWIkZXM2JHByb21pc2UkdGhlbiQkZGVmYXVsdCAmJlxuICAgICAgICAgICAgZW50cnkuX3N0YXRlICE9PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgICAgfSBlbHNlIGlmIChjID09PSBsaWIkZXM2JHByb21pc2UkcHJvbWlzZSQkZGVmYXVsdCkge1xuICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkbm9vcCk7XG4gICAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgdGhlbik7XG4gICAgICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbihyZXNvbHZlKSB7IHJlc29sdmUoZW50cnkpOyB9KSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlKGVudHJ5KSwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYiRlczYkcHJvbWlzZSRlbnVtZXJhdG9yJCRFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24oc3RhdGUsIGksIHZhbHVlKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICAgICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRQRU5ESU5HKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkUkVKRUNURUQpIHtcbiAgICAgICAgICBsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRyZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIkZXM2JHByb21pc2UkZW51bWVyYXRvciQkRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uKHByb21pc2UsIGkpIHtcbiAgICAgIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICAgICAgbGliJGVzNiRwcm9taXNlJCRpbnRlcm5hbCQkc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgZW51bWVyYXRvci5fc2V0dGxlZEF0KGxpYiRlczYkcHJvbWlzZSQkaW50ZXJuYWwkJEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgIGVudW1lcmF0b3IuX3NldHRsZWRBdChsaWIkZXM2JHByb21pc2UkJGludGVybmFsJCRSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRwb2x5ZmlsbCgpIHtcbiAgICAgIHZhciBsb2NhbDtcblxuICAgICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICAgICAgaWYgKFAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKSA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2NhbC5Qcm9taXNlID0gbGliJGVzNiRwcm9taXNlJHByb21pc2UkJGRlZmF1bHQ7XG4gICAgfVxuICAgIHZhciBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJGRlZmF1bHQgPSBsaWIkZXM2JHByb21pc2UkcG9seWZpbGwkJHBvbHlmaWxsO1xuXG4gICAgdmFyIGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2UgPSB7XG4gICAgICAnUHJvbWlzZSc6IGxpYiRlczYkcHJvbWlzZSRwcm9taXNlJCRkZWZhdWx0LFxuICAgICAgJ3BvbHlmaWxsJzogbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0XG4gICAgfTtcblxuICAgIC8qIGdsb2JhbCBkZWZpbmU6dHJ1ZSBtb2R1bGU6dHJ1ZSB3aW5kb3c6IHRydWUgKi9cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBsaWIkZXM2JHByb21pc2UkdW1kJCRFUzZQcm9taXNlOyB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZVsnZXhwb3J0cyddKSB7XG4gICAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXNbJ0VTNlByb21pc2UnXSA9IGxpYiRlczYkcHJvbWlzZSR1bWQkJEVTNlByb21pc2U7XG4gICAgfVxuXG4gICAgbGliJGVzNiRwcm9taXNlJHBvbHlmaWxsJCRkZWZhdWx0KCk7XG59KS5jYWxsKHRoaXMpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiB2ZXJ0eCAoaWdub3JlZClcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpOyB9O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==