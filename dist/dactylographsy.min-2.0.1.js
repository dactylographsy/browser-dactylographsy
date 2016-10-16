!function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){a.exports=c(1)},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}var e=c(2),f=d(e),g=c(10),h=d(g);h.default.polyfill(),"undefined"!=typeof window&&(window.dactylographsy=new f.default({autorun:!0}))},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(3),h=d(g),i=c(7),j=d(i),k=c(4),l=d(k),m=c(5),n=d(m),o=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,a);var c=b.autorun,d=void 0!==c&&c,f=b.enableLogging,g=void 0!==f&&f;this.log=new l.default((0,n.default)("dactylographsy-enableLogging",g)),this.hookIntoDom(),this.readConfiguration(),this.cache=new h.default({appPrefix:this.config.appPrefix}),d&&this.run()}return f(a,[{key:"hookIntoDom",value:function(){"undefined"!=typeof document&&(this.executingScript=document.getElementById("dactylographsy"),this.injectInto=document.body||document.head||document.getElementsByTagName("script")[0])}},{key:"readConfiguration",value:function(){this.manifestUrls=this.readAttrOnScript("manifests"),this.config=this.readAttrOnScript("config")}},{key:"refresh",value:function(){var a=this,b=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return Promise.all(this.manifestUrls.map(function(b){return new i.Manifest(b,a.config).get()})).then(function(c){return a.log.info("Fetched all manifests, "+c.length+" in total."),a.config.cacheInLocalStorage&&a.cache.set(c,"manifests","manifests"),new j.default(b?a.injectInto:void 0,c,a.config).inject()})}},{key:"restore",value:function(){var a=this,b=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.cache.get("manifests").then(function(c){return a.log.info("Restoring with manifests in cache later refreshing via network (delayed)."),new j.default(b?a.injectInto:void 0,c,a.config).inject()})}},{key:"readAttrOnScript",value:function(a){if(!this.executingScript)return!1;var b=this.executingScript.getAttribute("data-"+a);return b?JSON.parse(b):void 0}},{key:"run",value:function(){var a=this,b=(0,n.default)("dactylographsy-ttl",this.config.ttl);return this.config.cacheInLocalStorage||(this.log.info('Flushing local-storage due to config-option "cacheInLocalStorage=false"'),this.cache.flush()),this.config.cacheInLocalStorage&&b&&this.cache.get("clt",0).then(function(c){c>=b?(a.log.info("Flushing cache due to exeeding TTL of "+b+"."),a.cache.flush()):a.cache.set(++c,"plain","clt")}),this.config.cacheOnly?this.refresh(!1):this.config.cachedManifests===!1||this.config.verification===!0||this.config.cacheInLocalStorage===!1?this.refresh():this.restore().then(function(b){var c=a.config.refreshDelay,d=void 0===c?5e3:c;return new Promise(function(c,e){window.setTimeout(function(){a.refresh(b).then(c,e)},d)})}).catch(function(){return a.log.info("No manifests in cache, refreshing via network."),a.refresh()})}}]),a}();b.default=o},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(4),h=d(g),i=c(5),j=d(i),k=c(6),l=d(k),m=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,a);var c="__dactylographsy",d=b.enableLogging,f=void 0!==d&&d;this.log=new h.default((0,j.default)("dactylographsy-enableLogging",f)),this.options=b,this.cachePrefix=this.options.cachePrefix||c,this.isSupported=this.supported(),this.options.appPrefix?this.cachePrefix=this.cachePrefix+"--"+this.options.appPrefix:this.options.cachePrefix||(this.cachePrefix+="__")}return f(a,[{key:"getPrefix",value:function(){return this.cachePrefix}},{key:"isItemValid",value:function(a,b){return"string"==typeof a&&(0,l.default)(a)===b}},{key:"parse",value:function(a){return JSON.parse(a)}},{key:"get",value:function(a,b){var c=this,d=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return new Promise(function(e,f){c.isSupported||f();var g=localStorage.getItem(c.cachePrefix+"-"+a);if(null===g&&void 0!==b)return c.set(b,"plain",a),void e(b);if(null!==g&&d!==!1){var h=c.parse(g);c.log.info("Found item with key: "+a+" in cache which needs validation..."),c.isItemValid(h.code,d)?(c.log.info("...matches expected hash "+d+"."),e(h.code)):(c.log.info("...does not match expected hash "+d+" - pruning."),c.remove(a),f())}else g?(c.log.info("Found item with key: "+a+" in cache."),e(c.parse(g).code)):(c.log.info("Couldn't find item with key: "+a+" in cache."),f())})}},{key:"has",value:function(a){return!!this.isSupported&&null!==localStorage.getItem(this.cachePrefix+"-"+a)}},{key:"remove",value:function(a){return!!this.isSupported&&localStorage.removeItem(this.cachePrefix+"-"+a)}},{key:"set",value:function(a,b,c){var d=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!this.isSupported)return!1;d&&this.dedupe(d);var e={now:+new Date,url:c,code:a,type:b,singularBy:"string"==typeof d?d:void 0};return localStorage.setItem(this.cachePrefix+"-"+c,JSON.stringify(e)),e}},{key:"flush",value:function(){if(!this.isSupported)return!1;for(var a in localStorage)a.indexOf(this.cachePrefix)>=0&&(this.log.log("Removing item "+a+" requested by flush."),localStorage.removeItem(a));return!0}},{key:"supported",value:function(){var a="__dactylographsy__feature-detection";try{return localStorage.setItem(a,a),localStorage.removeItem(a),!0}catch(a){return this.log.warn("Localstorage not supported in browser - no caching!"),!1}}},{key:"dedupe",value:function(a){for(var b in localStorage){var c=b.indexOf(this.cachePrefix)>=0;if(c){var d=JSON.parse(localStorage.getItem(b));"string"==typeof a&&"string"==typeof d.singularBy&&d.singularBy===a&&(this.log.log("Deduping by "+a+" before adding dupe in "+b+"."),localStorage.removeItem(b))}}}}]),a}();b.default=m},function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(){var b=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];c(this,a),this.enabled=b,this.enabled&&(this.console=window.console)}return d(a,[{key:"log",value:function(){if(this.enabled){var a;(a=this.console).log.apply(a,arguments)}}},{key:"info",value:function(){if(this.enabled){var a;(a=this.console).info.apply(a,arguments)}}},{key:"warn",value:function(){if(this.enabled){var a;(a=this.console).warn.apply(a,arguments)}}},{key:"debug",value:function(){if(this.enabled){var a;(a=this.console).debug.apply(a,arguments)}}},{key:"error",value:function(){if(this.enabled){var a;(a=this.console).error.apply(a,arguments)}}}]),a}();b.default=e},function(a,b){"use strict";function c(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window.location.search,e=d(c);if(!e.hasOwnProperty(a))return b;try{return JSON.parse(e[a])}catch(b){return encodeURIComponent(e[a])}}Object.defineProperty(b,"__esModule",{value:!0}),b.default=c;var d=function(a){var b=a,c=/[?&;](.+?)=([^&;]+)/g,d={},e=void 0;if(b)for(;e=c.exec(b);)d[e[1]]=decodeURIComponent(e[2]);return d}},function(a,b){a.exports=function(a){for(var b=5381,c=a.length;c;)b=33*b^a.charCodeAt(--c);return b>=0?b:(2147483647&b)+2147483648}},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0}),b.Manifest=void 0;var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(8),h=c(9),i=d(h),j=c(4),k=d(j),l=c(5),m=d(l),n=(b.Manifest=function(){function a(b,c){e(this,a);var d=c.enableLogging,f=void 0!==d&&d;this.log=new k.default((0,m.default)("dactylographsy-enableLogging",f)),this.url=b}return f(a,[{key:"get",value:function(){var a=this;return(new i.default).get(this.url).then(function(b){var c=b.text,d=b.url;return a.log.info("Fetched manifest from url: "+d+"."),JSON.parse(c)},function(b){a.log.error("Could not fetch manifest with url: "+b.responseURL+"!")})}}]),a}(),function(){function a(b,c){var d=this,f=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(this,a);var g=f.enableLogging,h=void 0!==g&&g;this.log=new k.default((0,m.default)("dactylographsy-enableLogging",h)),this.manifests={},this.injectInto=b,c.forEach(function(a){d.manifests[a.package]=a}),this.options=f,this.prefix=f.prefix,this.order=f.order}return f(a,[{key:"inject",value:function(){var a=this,b=function a(b){return b.reduce(function(b,c){return b.concat(Array.isArray(c)?a(c):c)},[])};return Promise.all(this.order.map(function(b){return a.manifests[b]?a.injectManifest(a.manifests[b]):(a.log.error("Couldn't find package "+b+" from injection order."),Promise.reject())})).then(function(c){var d=b(c);return a.injectIntoDOM(d),Promise.resolve(d)})}},{key:"injectManifest",value:function(a){var b=this,c=Object.keys(a.hashes);return Promise.all(c.map(function(c){var d=a.hashes[c],e=[a.rootUrl,a.packageUrl].filter(function(a){return void 0!==a&&null!==a}).join("/");return b.injectDependency(d,e)}))}},{key:"injectDependency",value:function(a,b){switch(a.extension){case".css":return new g.Css(this.options).tags(this.urls(a,b));case".js":return new g.Js(this.options).tags(this.urls(a,b));default:Promise.resolve(!1)}}},{key:"injectIntoDOM",value:function(a){var b=this,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,e=function(a,c){b.injectInto&&(b.log.info("Injecting "+c+" tag",a),b.injectInto.appendChild(a))},f=function(a,c){b.injectIntoDOM(a,++c)},g=function(a,c,d){"raw"!==d?b.injectIntoDOM(a,c,"raw"):(b.injectIntoDOM(a,++c),b.log.error("Failed loading dependency as raw",h))};if(!(c>=a.length)){d=a[c][d]&&d||a[c].cached&&"cached"||a[c].printed&&"printed";var h=a[c][d];if(void 0!==h)if("printed"===d)if(h instanceof HTMLLinkElement){var j=(new i.default).get(h.href);j.then(function(){e(h,d),f(a,c)}).catch(function(){g(a,c,d)})}else e(h,d),h.addEventListener("load",function(){f(a,c)}),h.addEventListener("error",function(){g(a,c,d)});else"cached"!==d&&"raw"!==d||(e(h,d),f(a,c))}}},{key:"basename",value:function(a){return a.replace(/.*\/|\.[^.]*$/g,"")}},{key:"urls",value:function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",c=this.basename(a.file),d=[this.prefix,b,a.path].filter(function(a){return void 0!==a&&null!==a}).join("/");return{id:a.id,printed:"/"+d+"/"+c+"-"+a.hash+a.extension,raw:"/"+d+"/"+c+a.extension,singularBy:"/"+d+"/"+c+a.extension}}}]),a}());b.default=n},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0}),b.Css=b.Js=void 0;var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(3),h=d(g),i=c(9),j=d(i),k=c(4),l=d(k),m=c(5),n=d(m),o=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,a);var c=b.verification,d=void 0!==c&&c,f=b.cacheInLocalStorage,g=void 0===f||f,i=b.enableLogging,j=void 0!==i&&i;j=(0,n.default)("dactylographsy-enableLogging",j),g=(0,n.default)("dactylographsy-cacheInLocalStorage",g),this.cache=new h.default({appPrefix:b.appPrefix,enableLogging:j}),this.cacheDelay=b.cacheDelay||5e3,this.verification=d,this.cacheInLocalStorage=g,this.log=new l.default(j)}return f(a,[{key:"prepareWithText",value:function(a,b){var c=document.createElement("script");return this.log.info("Creating <script />-tag with text for "+b+"."),c.defer=!1,c.async=!1,c.setAttribute("data-dactylographsy-url",b),c.text="\n      "+a+"\n      //# sourceURL="+b+"\n    ",Promise.resolve(c)}},{key:"prepareWithUrl",value:function(a){var b=this,c=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"printed",Object.keys(a).filter(function(a){return["printed","raw"].indexOf(a)>-1})),d={};return c.forEach(function(c){var e=document.createElement("script"),f=a[c];b.log.info("Creating <script />-tag with url: "+f+"."),e.async=!1,e.defer=!1,e.setAttribute("data-dactylographsy-url",f),e.setAttribute("data-dactylographsy-uncached-js","printed"===c),e.addEventListener("load",function(){"printed"===c&&b.ensureCache(f,a.singularBy,b.cacheDelay)}),e.src=f,d[c]=e}),Promise.resolve(d)}},{key:"ensureCache",value:function(a){var b=this,c=arguments.length>1&&void 0!==arguments[1]&&arguments[1],d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return new Promise(function(e,f){return b.cache.has(a)?e():b.cacheInLocalStorage?(b.log.info("Loading JavaScript from "+a+" for cache in "+d+"."),void window.setTimeout(function(){return(new j.default).get(a).then(function(d){var f=d.text;b.cache.set(f,"js",a,c),b.log.info("Loaded JavaScript from "+a+" now cached."),e()}).catch(function(){b.log.info("Failed attempting to cache JavaScript from "+a+".")})},d)):e("Caching in localStorage is disabled")})}},{key:"hash",value:function(a){return this.verification===!0&&a}},{key:"tags",value:function(a){var b=this;return this.cache.get(a.printed,void 0,this.hash(a.id)).then(function(c){return b.prepareWithText(c,a.printed).then(function(a){return{cached:a}})},function(){return b.prepareWithUrl(a)})}}]),a}();b.Js=o;var p=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,a);var c=b.verification,d=void 0!==c&&c,f=b.cacheInLocalStorage,g=void 0===f||f,i=b.enableLogging,j=void 0!==i&&i;j=(0,n.default)("dactylographsy-enableLogging",j),g=(0,n.default)("dactylographsy-cacheInLocalStorage",g),this.cache=new h.default({appPrefix:b.appPrefix}),this.cacheDelay=b.cacheDelay||5e3,this.verification=d,this.cacheInLocalStorage=g,this.log=new l.default(j)}return f(a,[{key:"ensureCache",value:function(a){var b=this,c=arguments.length>1&&void 0!==arguments[1]&&arguments[1],d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return new Promise(function(e,f){return b.cache.has(a)?e():b.cacheInLocalStorage?(b.log.info("Loading CSS from "+a+" for cache in "+d+"."),void window.setTimeout(function(){return(new j.default).get(a).then(function(d){var f=d.text;b.cache.set(f,"css",a,c),b.log.info("Loaded CSS from "+a+" now cached."),e()}).catch(function(){b.log.info("Failed attempting to cache CSS from "+a+".")})},d)):e("Caching in localStorage is disabled")})}},{key:"prepareWithUrl",value:function(a){var b=this,c=Object.keys(a).filter(function(a){return["printed","raw"].indexOf(a)>-1}),d={};return c.forEach(function(c){var e=document.createElement("link"),f=a[c];b.log.info("Creating <link />-tag with url: "+f+"."),e.type="text/css",e.rel="stylesheet",e.setAttribute("data-dactylographsy-url",f),e.setAttribute("data-dactylographsy-uncached-css","printed"===c),e.addEventListener("load",function(){"printed"===c&&b.ensureCache(f,a.singularBy,b.cacheDelay)}),e.href=f,d[c]=e}),Promise.resolve(d)}},{key:"prepareWithText",value:function(a,b){var c=document.createElement("link");return this.log.info("Creating <link />-tag with text for url: "+b+"."),c.setAttribute("data-dactylographsy-url",b),c.textContent=a,Promise.resolve(c)}},{key:"hash",value:function(a){return this.verification===!0&&a}},{key:"tags",value:function(a){var b=this;return this.cache.get(a.printed,void 0,this.hash(a.id)).then(function(c){return b.prepareWithText(c,a.printed).then(function(a){return{cached:a}})},function(){return b.prepareWithUrl(a)})}}]),a}();b.Css=p},function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(){c(this,a)}return d(a,[{key:"get",value:function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.request(a,b)}},{key:"head",value:function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.request(a,b,"HEAD")}},{key:"request",value:function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise(function(d,e){var f=new XMLHttpRequest;"withCredentials"in f?f.open(c,a,!0):"undefined"!=typeof XDomainRequest?(f=new XDomainRequest,f.open(c,a)):f=null,b.withCredentials&&(f.withCredentials=!0),f.onload=function(){f.status>=400?e(f):d({xhr:f,text:f.responseText,url:f.responseURL})},f.onerror=function(){e(f)},f.send()})}}]),a}();b.default=e},function(a,b,c){(function(b,d){!function(b,c){a.exports=c()}(this,function(){"use strict";function a(a){return"function"==typeof a||"object"==typeof a&&null!==a}function e(a){return"function"==typeof a}function f(a){X=a}function g(a){Y=a}function h(){return function(){return b.nextTick(m)}}function i(){return"undefined"!=typeof W?function(){W(m)}:l()}function j(){var a=0,b=new _(m),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function k(){var a=new MessageChannel;return a.port1.onmessage=m,function(){return a.port2.postMessage(0)}}function l(){var a=setTimeout;return function(){return a(m,1)}}function m(){for(var a=0;a<V;a+=2){var b=ca[a],c=ca[a+1];b(c),ca[a]=void 0,ca[a+1]=void 0}V=0}function n(){try{var a=c(12);return W=a.runOnLoop||a.runOnContext,i()}catch(a){return l()}}function o(a,b){var c=arguments,d=this,e=new this.constructor(q);void 0===e[ea]&&J(e);var f=d._state;return f?!function(){var a=c[f-1];Y(function(){return G(f,e,a,d._result)})}():C(d,e,a,b),e}function p(a){var b=this;if(a&&"object"==typeof a&&a.constructor===b)return a;var c=new b(q);return y(c,a),c}function q(){}function r(){return new TypeError("You cannot resolve a promise with itself")}function s(){return new TypeError("A promises callback cannot return that same promise.")}function t(a){try{return a.then}catch(a){return ia.error=a,ia}}function u(a,b,c,d){try{a.call(b,c,d)}catch(a){return a}}function v(a,b,c){Y(function(a){var d=!1,e=u(c,b,function(c){d||(d=!0,b!==c?y(a,c):A(a,c))},function(b){d||(d=!0,B(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,B(a,e))},a)}function w(a,b){b._state===ga?A(a,b._result):b._state===ha?B(a,b._result):C(b,void 0,function(b){return y(a,b)},function(b){return B(a,b)})}function x(a,b,c){b.constructor===a.constructor&&c===o&&b.constructor.resolve===p?w(a,b):c===ia?B(a,ia.error):void 0===c?A(a,b):e(c)?v(a,b,c):A(a,b)}function y(b,c){b===c?B(b,r()):a(c)?x(b,c,t(c)):A(b,c)}function z(a){a._onerror&&a._onerror(a._result),D(a)}function A(a,b){a._state===fa&&(a._result=b,a._state=ga,0!==a._subscribers.length&&Y(D,a))}function B(a,b){a._state===fa&&(a._state=ha,a._result=b,Y(z,a))}function C(a,b,c,d){var e=a._subscribers,f=e.length;a._onerror=null,e[f]=b,e[f+ga]=c,e[f+ha]=d,0===f&&a._state&&Y(D,a)}function D(a){var b=a._subscribers,c=a._state;if(0!==b.length){for(var d=void 0,e=void 0,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?G(c,d,e,f):e(f);a._subscribers.length=0}}function E(){this.error=null}function F(a,b){try{return a(b)}catch(a){return ja.error=a,ja}}function G(a,b,c,d){var f=e(c),g=void 0,h=void 0,i=void 0,j=void 0;if(f){if(g=F(c,d),g===ja?(j=!0,h=g.error,g=null):i=!0,b===g)return void B(b,s())}else g=d,i=!0;b._state!==fa||(f&&i?y(b,g):j?B(b,h):a===ga?A(b,g):a===ha&&B(b,g))}function H(a,b){try{b(function(b){y(a,b)},function(b){B(a,b)})}catch(b){B(a,b)}}function I(){return ka++}function J(a){a[ea]=ka++,a._state=void 0,a._result=void 0,a._subscribers=[]}function K(a,b){this._instanceConstructor=a,this.promise=new a(q),this.promise[ea]||J(this.promise),U(b)?(this._input=b,this.length=b.length,this._remaining=b.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&A(this.promise,this._result))):B(this.promise,L())}function L(){return new Error("Array Methods must be provided an Array")}function M(a){return new K(this,a).promise}function N(a){var b=this;return new b(U(a)?function(c,d){for(var e=a.length,f=0;f<e;f++)b.resolve(a[f]).then(c,d)}:function(a,b){return b(new TypeError("You must pass an array to race."))})}function O(a){var b=this,c=new b(q);return B(c,a),c}function P(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function R(a){this[ea]=I(),this._result=this._state=void 0,this._subscribers=[],q!==a&&("function"!=typeof a&&P(),this instanceof R?H(this,a):Q())}function S(){var a=void 0;if("undefined"!=typeof d)a=d;else if("undefined"!=typeof self)a=self;else try{a=Function("return this")()}catch(a){throw new Error("polyfill failed because global object is unavailable in this environment")}var b=a.Promise;if(b){var c=null;try{c=Object.prototype.toString.call(b.resolve())}catch(a){}if("[object Promise]"===c&&!b.cast)return}a.Promise=R}var T=void 0;T=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};var U=T,V=0,W=void 0,X=void 0,Y=function(a,b){ca[V]=a,ca[V+1]=b,V+=2,2===V&&(X?X(m):da())},Z="undefined"!=typeof window?window:void 0,$=Z||{},_=$.MutationObserver||$.WebKitMutationObserver,aa="undefined"==typeof self&&"undefined"!=typeof b&&"[object process]"==={}.toString.call(b),ba="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ca=new Array(1e3),da=void 0;da=aa?h():_?j():ba?k():void 0===Z?n():l();var ea=Math.random().toString(36).substring(16),fa=void 0,ga=1,ha=2,ia=new E,ja=new E,ka=0;return K.prototype._enumerate=function(){for(var a=this.length,b=this._input,c=0;this._state===fa&&c<a;c++)this._eachEntry(b[c],c)},K.prototype._eachEntry=function(a,b){var c=this._instanceConstructor,d=c.resolve;if(d===p){var e=t(a);if(e===o&&a._state!==fa)this._settledAt(a._state,b,a._result);else if("function"!=typeof e)this._remaining--,this._result[b]=a;else if(c===R){var f=new c(q);x(f,a,e),this._willSettleAt(f,b)}else this._willSettleAt(new c(function(b){return b(a)}),b)}else this._willSettleAt(d(a),b)},K.prototype._settledAt=function(a,b,c){var d=this.promise;d._state===fa&&(this._remaining--,a===ha?B(d,c):this._result[b]=c),0===this._remaining&&A(d,this._result)},K.prototype._willSettleAt=function(a,b){var c=this;C(a,void 0,function(a){return c._settledAt(ga,b,a)},function(a){return c._settledAt(ha,b,a)})},R.all=M,R.race=N,R.resolve=p,R.reject=O,R._setScheduler=f,R._setAsap=g,R._asap=Y,R.prototype={constructor:R,then:o,catch:function(a){return this.then(null,a)}},R.polyfill=S,R.Promise=R,R})}).call(b,c(11),function(){return this}())},function(a,b){function c(){throw new Error("setTimeout has not been defined")}function d(){throw new Error("clearTimeout has not been defined")}function e(a){if(k===setTimeout)return setTimeout(a,0);if((k===c||!k)&&setTimeout)return k=setTimeout,setTimeout(a,0);try{return k(a,0)}catch(b){try{return k.call(null,a,0)}catch(b){return k.call(this,a,0)}}}function f(a){if(l===clearTimeout)return clearTimeout(a);if((l===d||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(a);try{return l(a)}catch(b){try{return l.call(null,a)}catch(b){return l.call(this,a)}}}function g(){p&&n&&(p=!1,n.length?o=n.concat(o):q=-1,o.length&&h())}function h(){if(!p){var a=e(g);p=!0;for(var b=o.length;b;){for(n=o,o=[];++q<b;)n&&n[q].run();q=-1,b=o.length}n=null,p=!1,f(a)}}function i(a,b){this.fun=a,this.array=b}function j(){}var k,l,m=a.exports={};!function(){try{k="function"==typeof setTimeout?setTimeout:c}catch(a){k=c}try{l="function"==typeof clearTimeout?clearTimeout:d}catch(a){l=d}}();var n,o=[],p=!1,q=-1;m.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];o.push(new i(a,b)),1!==o.length||p||e(h)},i.prototype.run=function(){this.fun.apply(null,this.array)},m.title="browser",m.browser=!0,m.env={},m.argv=[],m.version="",m.versions={},m.on=j,m.addListener=j,m.once=j,m.off=j,m.removeListener=j,m.removeAllListeners=j,m.emit=j,m.binding=function(a){throw new Error("process.binding is not supported")},m.cwd=function(){return"/"},m.chdir=function(a){throw new Error("process.chdir is not supported")},m.umask=function(){return 0}},function(a,b){}]);