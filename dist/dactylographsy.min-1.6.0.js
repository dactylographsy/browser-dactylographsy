!function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){a.exports=c(1)},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}var e=c(2),f=d(e),g=c(10),h=d(g);h["default"].polyfill(),"undefined"!=typeof window&&(window.dactylographsy=new f["default"]({autorun:!0}))},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(3),h=d(g),i=c(7),j=d(i),k=c(4),l=d(k),m=c(5),n=d(m),o=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];e(this,a);var c=b.autorun,d=void 0===c?!1:c,f=b.enableLogging,g=void 0===f?!1:f;this.log=new l["default"]((0,n["default"])("dactylographsy-enableLogging",g)),this.hookIntoDom(),this.readConfiguration(),this.cache=new h["default"]({appPrefix:this.config.appPrefix}),d&&this.run()}return f(a,[{key:"hookIntoDom",value:function(){"undefined"!=typeof document&&(this.executingScript=document.getElementById("dactylographsy"),this.injectInto=document.body||document.head||document.getElementsByTagName("script")[0])}},{key:"readConfiguration",value:function(){this.manifestUrls=this.readAttrOnScript("manifests"),this.config=this.readAttrOnScript("config")}},{key:"refresh",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];return Promise.all(this.manifestUrls.map(function(b){return new i.Manifest(b,a.config).get()})).then(function(c){return a.log.info("Fetched all manifests, "+c.length+" in total."),a.cache.set(c,"manifests","manifests"),new j["default"](b?a.injectInto:void 0,c,a.config).inject()})}},{key:"restore",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];return this.cache.get("manifests").then(function(c){return a.log.info("Resotring with manifests in cache later refreshing via network (delayed)."),new j["default"](b?a.injectInto:void 0,c,a.config).inject()})}},{key:"readAttrOnScript",value:function(a){if(!this.executingScript)return!1;var b=this.executingScript.getAttribute("data-"+a);return b?JSON.parse(b):void 0}},{key:"run",value:function(){var a=this,b=(0,n["default"])("dactylographsy-ttl",this.config.ttl);return b&&this.cache.get("clt",0).then(function(c){c>=b?(a.log.info("Flushing cache due to exeeding TTL of "+b+"."),a.cache.flush()):a.cache.set(++c,"plain","clt")}),this.config.cacheOnly?this.refresh(!1):this.config.cachedManifests===!1||this.config.verification===!0?this.refresh():this.restore().then(function(b){var c=a.config.refreshDelay,d=void 0===c?5e3:c;return new Promise(function(c,e){window.setTimeout(function(){a.refresh(b).then(c,e)},d)})})["catch"](function(){return a.log.info("No manifests in cache, refreshing via network."),a.refresh()})}}]),a}();b["default"]=o},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(4),h=d(g),i=c(5),j=d(i),k=c(6),l=d(k),m=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];e(this,a);var c="__dactylographsy",d=b.enableLogging,f=void 0===d?!1:d;this.log=new h["default"]((0,j["default"])("dactylographsy-enableLogging",f)),this.options=b,this.cachePrefix=this.options.cachePrefix||c,this.isSupported=this.supported(),this.options.appPrefix?this.cachePrefix=this.cachePrefix+"--"+this.options.appPrefix:this.options.cachePrefix||(this.cachePrefix+="__")}return f(a,[{key:"getPrefix",value:function(){return this.cachePrefix}},{key:"isItemValid",value:function(a,b){return"string"!=typeof a?!1:(0,l["default"])(a)===b}},{key:"parse",value:function(a){return JSON.parse(a)}},{key:"get",value:function(a,b){var c=this,d=arguments.length<=2||void 0===arguments[2]?!1:arguments[2];return new Promise(function(e,f){c.isSupported||f();var g=localStorage.getItem(c.cachePrefix+"-"+a);if(null===g&&void 0!==b)return c.set(b,"plain",a),void e(b);if(null!==g&&d!==!1){var h=c.parse(g);c.log.info("Found item with key: "+a+" in cache which needs validation..."),c.isItemValid(h.code,d)?(c.log.info("...matches expected hash "+d+"."),e(h.code)):(c.log.info("...does not match expected hash "+d+" - pruning."),c.remove(a),f())}else g?(c.log.info("Found item with key: "+a+" in cache."),e(c.parse(g).code)):(c.log.info("Couldn't find item with key: "+a+" in cache."),f())})}},{key:"has",value:function(a){return this.isSupported?null!==localStorage.getItem(this.cachePrefix+"-"+a):!1}},{key:"remove",value:function(a){return this.isSupported?localStorage.removeItem(this.cachePrefix+"-"+a):!1}},{key:"set",value:function(a,b,c){var d=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];if(!this.isSupported)return!1;d&&this.dedupe(d);var e={now:+new Date,url:c,code:a,type:b,singularBy:"string"==typeof d?d:void 0};return localStorage.setItem(this.cachePrefix+"-"+c,JSON.stringify(e)),e}},{key:"flush",value:function(){if(!this.isSupported)return!1;for(var a in localStorage)a.indexOf(this.cachePrefix)>=0&&(this.log.log("Removing item "+a+" requested by flush."),localStorage.removeItem(a));return!0}},{key:"supported",value:function(){var a="__dactylographsy__feature-detection";try{return localStorage.setItem(a,a),localStorage.removeItem(a),!0}catch(b){return this.log.warn("Localstorage not supported in browser - no caching!"),!1}}},{key:"dedupe",value:function(a){for(var b in localStorage){var c=b.indexOf(this.cachePrefix)>=0,d=void 0;c&&(d=JSON.parse(localStorage.getItem(b)),"string"==typeof a&&"string"==typeof d.singularBy&&d.singularBy===a&&(this.log.log("Deduping by "+a+" before adding dupe in "+b+"."),localStorage.removeItem(b)))}}}]),a}();b["default"]=m},function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];c(this,a),this.enabled=b,this.enabled&&(this.console=window.console)}return d(a,[{key:"log",value:function(){if(this.enabled){var a;(a=this.console).log.apply(a,arguments)}}},{key:"info",value:function(){if(this.enabled){var a;(a=this.console).info.apply(a,arguments)}}},{key:"warn",value:function(){if(this.enabled){var a;(a=this.console).warn.apply(a,arguments)}}},{key:"debug",value:function(){if(this.enabled){var a;(a=this.console).debug.apply(a,arguments)}}},{key:"error",value:function(){if(this.enabled){var a;(a=this.console).error.apply(a,arguments)}}}]),a}();b["default"]=e},function(a,b){"use strict";function c(a){var b=arguments.length<=1||void 0===arguments[1]?null:arguments[1],c=arguments.length<=2||void 0===arguments[2]?window.location.search:arguments[2],e=d(c);if(!e.hasOwnProperty(a))return b;try{return JSON.parse(e[a])}catch(f){return encodeURIComponent(e[a])}}Object.defineProperty(b,"__esModule",{value:!0}),b["default"]=c;var d=function(a){var b=a,c=/[?&;](.+?)=([^&;]+)/g,d=void 0,e=void 0;if(d={},b)for(;e=c.exec(b);)d[e[1]]=decodeURIComponent(e[2]);return d}},function(a,b){a.exports=function(a){for(var b=5381,c=a.length;c;)b=33*b^a.charCodeAt(--c);return b>=0?b:(2147483647&b)+2147483648}},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0}),b.Manifest=void 0;var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(8),h=c(9),i=d(h),j=c(4),k=d(j),l=c(5),m=d(l),n=(b.Manifest=function(){function a(b,c){e(this,a);var d=c.enableLogging,f=void 0===d?!1:d;this.log=new k["default"]((0,m["default"])("dactylographsy-enableLogging",f)),this.url=b}return f(a,[{key:"get",value:function(){var a=this;return(new i["default"]).get(this.url).then(function(b){var c=b.text,d=b.url;return a.log.info("Fetched manifest from url: "+d+"."),JSON.parse(c)},function(b){a.log.error("Could not fetch manifest with url: "+b.responseURL+"!")})}}]),a}(),function(){function a(b,c){var d=this,f=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];e(this,a);var g=f.enableLogging,h=void 0===g?!1:g;this.log=new k["default"]((0,m["default"])("dactylographsy-enableLogging",h)),this.manifests={},this.injectInto=b,c.forEach(function(a){d.manifests[a["package"]]=a}),this.options=f,this.prefix=f.prefix,this.order=f.order}return f(a,[{key:"inject",value:function(){var a=this,b=function d(a){return a.reduce(function(a,b){return a.concat(Array.isArray(b)?d(b):b)},[])},c=function e(b){var c=arguments.length<=1||void 0===arguments[1]?0:arguments[1],d=b[c];void 0!==d&&(d.getAttribute("data-dactylographsy-uncached-js")?(a.injectInto&&(a.log.info("Injecting tag:",d),a.injectInto.appendChild(d)),d.addEventListener("load",function(){e(b,++c)}),d.addEventListener("error",function(){e(b,++c)})):(a.injectInto&&a.injectInto.appendChild(d),e(b,++c)))};return Promise.all(this.order.map(function(b){return a.manifests[b]?a.injectManifest(a.manifests[b]):(a.log.error("Couldn't find package "+b+" from injection order."),Promise.reject())})).then(function(a){var d=b(a);return c(d),Promise.resolve(d)})}},{key:"injectManifest",value:function(a){var b=this,c=Object.keys(a.hashes);return Promise.all(c.map(function(c){var d=a.hashes[c],e=void 0;return e=[a.rootUrl,a.packageUrl].filter(function(a){return void 0!==a&&null!==a}).join("/"),b.injectDependency(d,e)}))}},{key:"injectDependency",value:function(a,b){switch(a.extension){case".css":return new g.Css(void 0,this.options).inject(this.urls(a,b));case".js":return new g.Js(void 0,this.options).inject(this.urls(a,b));default:Promise.resolve(!1)}}},{key:"basename",value:function(a){return a.replace(/.*\/|\.[^.]*$/g,"")}},{key:"urls",value:function(a){var b=arguments.length<=1||void 0===arguments[1]?"":arguments[1],c=this.basename(a.file),d=void 0;return d=[this.prefix,b,a.path].filter(function(a){return void 0!==a&&null!==a}).join("/"),{id:a.id,printed:"/"+d+"/"+c+"-"+a.hash+a.extension,raw:"/"+d+"/"+c+a.extension,singularBy:"/"+d+"/"+c+a.extension}}}]),a}());b["default"]=n},function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0}),b.Css=b.Js=void 0;var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=c(3),h=d(g),i=c(9),j=d(i),k=c(4),l=d(k),m=c(5),n=d(m),o=function(){function a(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];e(this,a);var d=c.enableLogging,f=void 0===d?!1:d,g=c.verification,i=void 0===g?!1:g;f=(0,n["default"])("dactylographsy-enableLogging",f),this.injectInto=b,this.cache=new h["default"]({appPrefix:c.appPrefix,enableLogging:f}),this.cacheDelay=c.cacheDelay||5e3,this.verification=i,this.log=new l["default"](f)}return f(a,[{key:"injectWithText",value:function(a,b){var c=this;return new Promise(function(d){var e=document.createElement("script");c.log.info("Creating <script />-tag with text for "+b+"."),e.defer=!1,e.async=!1,e.setAttribute("data-dactylographsy-url",b),e.text="\n        "+a+"\n        //# sourceURL="+b+"\n      ",c.injectInto?(c.log.info("Injecting <script />-tag with url: "+b+"."),d(c.injectInto.appendChild(e))):d(e)})}},{key:"injectWithUrl",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?"printed":arguments[1];return new Promise(function(d){var e=document.createElement("script"),f=a[c];b.log.info("Creating <script />-tag with url: "+f+"."),e.async=!1,e.defer=!1,e.setAttribute("data-dactylographsy-url",f),e.setAttribute("data-dactylographsy-uncached-js",!0),e.readyState?e.onreadystatechange=function(){"loaded"!==e.readyState&&"complete"!==e.readyState||(e.onreadystatechange=null,b.ensureCache(f,a.singularBy,b.cacheDelay))}:(e.onload=function(){"printed"===c&&b.ensureCache(f,a.singularBy,b.cacheDelay)},e.onerror=function(){b.log.info("Could not fetch JavaScript from "+f+" - falling back to unprinted version."),"printed"===c&&b.injectWithUrl(a,"raw")}),e.src=f,b.injectInto?(b.log.info("Injecting <script />-tag with url: "+f+"."),d(b.injectInto.appendChild(e))):("printed"===c&&b.ensureCache(f,a.singularBy,b.cacheDelay),d(e))})}},{key:"ensureCache",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],d=arguments.length<=2||void 0===arguments[2]?0:arguments[2];return new Promise(function(e,f){b.cache.has(a)&&e(),b.log.info("Loading JavaScript from "+a+" for cache in "+d+"."),window.setTimeout(function(){return(new j["default"]).get(a).then(function(d){var f=d.text;b.cache.set(f,"js",a,c),b.log.info("Loaded JavaScript from "+a+" now cached."),e()})["catch"](function(){b.log.info("Failed attempting to cache JavaScript from "+a+".")})},d)})}},{key:"hash",value:function(a){return this.verification===!0?a:!1}},{key:"inject",value:function(a){var b=this;return this.cache.get(a.printed,void 0,this.hash(a.id)).then(function(c){return b.injectWithText(c,a.printed)},function(){return b.injectWithUrl(a)})}}]),a}();b.Js=o;var p=function(){function a(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];e(this,a);var d=c.enableLogging,f=void 0===d?!1:d,g=c.verification,i=void 0===g?!1:g;f=(0,n["default"])("dactylographsy-enableLogging",f),this.injectInto=b,this.cache=new h["default"]({appPrefix:c.appPrefix}),this.cacheDelay=c.cacheDelay||5e3,this.verification=i,this.log=new l["default"](f)}return f(a,[{key:"ensureCache",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],d=arguments.length<=2||void 0===arguments[2]?0:arguments[2];return new Promise(function(e){b.cache.has(a)&&e(),b.log.info("Loading CSS from "+a+" for cache in "+d+"."),window.setTimeout(function(){return(new j["default"]).get(a).then(function(d){var f=d.text;b.cache.set(f,"css",a,c),b.log.info("Loaded CSS from "+a+" now cached."),e()})["catch"](function(){b.log.info("Failed attempting to cache CSS from "+a+".")})},d)})}},{key:"injectWithUrl",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?"printed":arguments[1];return new Promise(function(d){var e=document.createElement("link"),f=a[c];b.log.info("Creating <link />-tag with url: "+f+"."),e=document.createElement("link"),e.type="text/css",e.rel="stylesheet",e.setAttribute("data-dactylographsy-url",f),e.setAttribute("data-dactylographsy-uncached-css",!0),e.href=f,"printed"===c&&b.ensureCache(f,a.singularBy,b.cacheDelay)["catch"](function(){b.log.info("Could not fetch CSS from "+f+" - falling back to unprinted version."),b.injectWithUrl(a,"raw")}),b.injectInto?(b.log.info("Injecting <link />-tag with url: "+f+"."),d(b.injectInto.appendChild(e))):d(e)})}},{key:"injectWithText",value:function(a,b){var c=this;return new Promise(function(d){var e=document.createElement("link");c.log.info("Creating <link />-tag with text for url: "+b+"."),e=document.createElement("style"),e.setAttribute("data-dactylographsy-url",b),e.textContent=a,c.injectInto?(c.log.info("Injecting <link />-tag with url: "+b+"."),d(c.injectInto.appendChild(e))):d(e)})}},{key:"hash",value:function(a){return this.verification===!0?a:!1}},{key:"inject",value:function(a){var b=this;return this.cache.get(a.printed,void 0,this.hash(a.id)).then(function(c){return b.injectWithText(c,a.printed)},function(){return b.injectWithUrl(a)})}}]),a}();b.Css=p},function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(b,"__esModule",{value:!0});var d=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),e=function(){function a(){c(this,a)}return d(a,[{key:"get",value:function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return new Promise(function(c,d){var e=new XMLHttpRequest;"withCredentials"in e?e.open("GET",a,!0):"undefined"!=typeof XDomainRequest?(e=new XDomainRequest,e.open("GET",a)):e=null,b.withCredentials&&(e.withCredentials=!0),e.onload=function(){e.status>=400?d(e):c({xhr:e,text:e.responseText,url:e.responseURL})},e.onerror=function(){d(e)},e.send()})}}]),a}();b["default"]=e},function(a,b,c){var d;(function(a,e,f){(function(){"use strict";function g(a){return"function"==typeof a||"object"==typeof a&&null!==a}function h(a){return"function"==typeof a}function i(a){Y=a}function j(a){aa=a}function k(){return function(){a.nextTick(p)}}function l(){return function(){X(p)}}function m(){var a=0,b=new da(p),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function n(){var a=new MessageChannel;return a.port1.onmessage=p,function(){a.port2.postMessage(0)}}function o(){return function(){setTimeout(p,1)}}function p(){for(var a=0;_>a;a+=2){var b=ga[a],c=ga[a+1];b(c),ga[a]=void 0,ga[a+1]=void 0}_=0}function q(){try{var a=c(13);return X=a.runOnLoop||a.runOnContext,l()}catch(b){return o()}}function r(a,b){var c=this,d=new this.constructor(t);void 0===d[ja]&&M(d);var e=c._state;if(e){var f=arguments[e-1];aa(function(){J(e,d,f,c._result)})}else F(c,d,a,b);return d}function s(a){var b=this;if(a&&"object"==typeof a&&a.constructor===b)return a;var c=new b(t);return B(c,a),c}function t(){}function u(){return new TypeError("You cannot resolve a promise with itself")}function v(){return new TypeError("A promises callback cannot return that same promise.")}function w(a){try{return a.then}catch(b){return na.error=b,na}}function x(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function y(a,b,c){aa(function(a){var d=!1,e=x(c,b,function(c){d||(d=!0,b!==c?B(a,c):D(a,c))},function(b){d||(d=!0,E(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,E(a,e))},a)}function z(a,b){b._state===la?D(a,b._result):b._state===ma?E(a,b._result):F(b,void 0,function(b){B(a,b)},function(b){E(a,b)})}function A(a,b,c){b.constructor===a.constructor&&c===ha&&constructor.resolve===ia?z(a,b):c===na?E(a,na.error):void 0===c?D(a,b):h(c)?y(a,b,c):D(a,b)}function B(a,b){a===b?E(a,u()):g(b)?A(a,b,w(b)):D(a,b)}function C(a){a._onerror&&a._onerror(a._result),G(a)}function D(a,b){a._state===ka&&(a._result=b,a._state=la,0!==a._subscribers.length&&aa(G,a))}function E(a,b){a._state===ka&&(a._state=ma,a._result=b,aa(C,a))}function F(a,b,c,d){var e=a._subscribers,f=e.length;a._onerror=null,e[f]=b,e[f+la]=c,e[f+ma]=d,0===f&&a._state&&aa(G,a)}function G(a){var b=a._subscribers,c=a._state;if(0!==b.length){for(var d,e,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?J(c,d,e,f):e(f);a._subscribers.length=0}}function H(){this.error=null}function I(a,b){try{return a(b)}catch(c){return oa.error=c,oa}}function J(a,b,c,d){var e,f,g,i,j=h(c);if(j){if(e=I(c,d),e===oa?(i=!0,f=e.error,e=null):g=!0,b===e)return void E(b,v())}else e=d,g=!0;b._state!==ka||(j&&g?B(b,e):i?E(b,f):a===la?D(b,e):a===ma&&E(b,e))}function K(a,b){try{b(function(b){B(a,b)},function(b){E(a,b)})}catch(c){E(a,c)}}function L(){return pa++}function M(a){a[ja]=pa++,a._state=void 0,a._result=void 0,a._subscribers=[]}function N(a){return new ua(this,a).promise}function O(a){var b=this;return new b($(a)?function(c,d){for(var e=a.length,f=0;e>f;f++)b.resolve(a[f]).then(c,d)}:function(a,b){b(new TypeError("You must pass an array to race."))})}function P(a){var b=this,c=new b(t);return E(c,a),c}function Q(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function R(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function S(a){this[ja]=L(),this._result=this._state=void 0,this._subscribers=[],t!==a&&("function"!=typeof a&&Q(),this instanceof S?K(this,a):R())}function T(a,b){this._instanceConstructor=a,this.promise=new a(t),this.promise[ja]||M(this.promise),$(b)?(this._input=b,this.length=b.length,this._remaining=b.length,this._result=new Array(this.length),0===this.length?D(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&D(this.promise,this._result))):E(this.promise,U())}function U(){return new Error("Array Methods must be provided an Array")}function V(){var a;if("undefined"!=typeof e)a=e;else if("undefined"!=typeof self)a=self;else try{a=Function("return this")()}catch(b){throw new Error("polyfill failed because global object is unavailable in this environment")}var c=a.Promise;c&&"[object Promise]"===Object.prototype.toString.call(c.resolve())&&!c.cast||(a.Promise=ta)}var W;W=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};var X,Y,Z,$=W,_=0,aa=function(a,b){ga[_]=a,ga[_+1]=b,_+=2,2===_&&(Y?Y(p):Z())},ba="undefined"!=typeof window?window:void 0,ca=ba||{},da=ca.MutationObserver||ca.WebKitMutationObserver,ea="undefined"==typeof self&&"undefined"!=typeof a&&"[object process]"==={}.toString.call(a),fa="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ga=new Array(1e3);Z=ea?k():da?m():fa?n():void 0===ba?q():o();var ha=r,ia=s,ja=Math.random().toString(36).substring(16),ka=void 0,la=1,ma=2,na=new H,oa=new H,pa=0,qa=N,ra=O,sa=P,ta=S;S.all=qa,S.race=ra,S.resolve=ia,S.reject=sa,S._setScheduler=i,S._setAsap=j,S._asap=aa,S.prototype={constructor:S,then:ha,"catch":function(a){return this.then(null,a)}};var ua=T;T.prototype._enumerate=function(){for(var a=this.length,b=this._input,c=0;this._state===ka&&a>c;c++)this._eachEntry(b[c],c)},T.prototype._eachEntry=function(a,b){var c=this._instanceConstructor,d=c.resolve;if(d===ia){var e=w(a);if(e===ha&&a._state!==ka)this._settledAt(a._state,b,a._result);else if("function"!=typeof e)this._remaining--,this._result[b]=a;else if(c===ta){var f=new c(t);A(f,a,e),this._willSettleAt(f,b)}else this._willSettleAt(new c(function(b){b(a)}),b)}else this._willSettleAt(d(a),b)},T.prototype._settledAt=function(a,b,c){var d=this.promise;d._state===ka&&(this._remaining--,a===ma?E(d,c):this._result[b]=c),0===this._remaining&&D(d,this._result)},T.prototype._willSettleAt=function(a,b){var c=this;F(a,void 0,function(a){c._settledAt(la,b,a)},function(a){c._settledAt(ma,b,a)})};var va=V,wa={Promise:ta,polyfill:va};c(14).amd?(d=function(){return wa}.call(b,c,b,f),!(void 0!==d&&(f.exports=d))):"undefined"!=typeof f&&f.exports?f.exports=wa:"undefined"!=typeof this&&(this.ES6Promise=wa),va()}).call(this)}).call(b,c(11),function(){return this}(),c(12)(a))},function(a,b){function c(){j=!1,g.length?i=g.concat(i):k=-1,i.length&&d()}function d(){if(!j){var a=setTimeout(c);j=!0;for(var b=i.length;b;){for(g=i,i=[];++k<b;)g&&g[k].run();k=-1,b=i.length}g=null,j=!1,clearTimeout(a)}}function e(a,b){this.fun=a,this.array=b}function f(){}var g,h=a.exports={},i=[],j=!1,k=-1;h.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];i.push(new e(a,b)),1!==i.length||j||setTimeout(d,0)},e.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=f,h.addListener=f,h.once=f,h.off=f,h.removeListener=f,h.removeAllListeners=f,h.emit=f,h.binding=function(a){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(a){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},function(a,b){a.exports=function(a){return a.webpackPolyfill||(a.deprecate=function(){},a.paths=[],a.children=[],a.webpackPolyfill=1),a}},function(a,b){},function(a,b){a.exports=function(){throw new Error("define cannot be used indirect")}}]);