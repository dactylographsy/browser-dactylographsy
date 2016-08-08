import Injector from '../../src/injector';
import { Css, Js } from '../../src/dom';
import Cache from '../../src/cache';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import { DOMUtil } from '../utils';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiString);

var
  fixtureManifests = [{
    package: 'vertical-1',
    packageUrl: 'vertical-1',
    rootUrl: 'example',
    hashes: {
      hash1: {
        id: 1,
        hash: 'hash1',
        file: '1.js',
        extension: '.js'
      },
      hash2: {
        id: 2,
        hash: 'hash2',
        file: '2.js',
        extension: '.js'
      },
      hash3: {
        id: 3,
        hash: 'hash3',
        file: '1.css',
        extension: '.css'
      }
    }
  }, {
    package: 'vertical-2',
    packageUrl: 'vertical-2',
    rootUrl: 'example',
    hashes: {
      hash4: {
        id: 4,
        hash: 'hash4',
        file: '4.js',
        extension: '.js'
      },
      hash5: {
        id: 5,
        hash: 'hash5',
        file: '5.css',
        extension: '.css'
      }
    }
  }, {
    package: 'vertical-3',
    packageUrl: 'vertical-3',
    rootUrl: 'example',
    hashes: {}
  }];

  let
    domUtils,
    expect;

describe('Injector', () => {
  before(() => {
    expect = chai.expect,
    domUtils = new DOMUtil();
  });

  describe('inject', () => {
    it('should inject all packages from the configured order', () => {
      let
        injections;
      const
        injector = new Injector(document.querySelector('body'), fixtureManifests, {
          enableLogging: false,
          order: ['vertical-1', 'vertical-2']
        });

      injections = injector.inject().then(packages => {
        let
          manifestDependencies = {};

        Object.assign(manifestDependencies, fixtureManifests[0].hashes);
        Object.assign(manifestDependencies, fixtureManifests[1].hashes);

        packages.should.have.length(5);

        Object.keys(manifestDependencies).map((prop, idx) => {
          packages[idx].printed.getAttribute('data-dactylographsy-url').should.contain(manifestDependencies[prop].hash);
        });
      });
    });
  });

  describe('injectManifest', () => {
    var
      findInjectionBySrc = (injections, itemSrc) => {
        return injections.filter(injection => {
          let hasMatch = false;

          Object.keys(injection).filter((type) => {
            const
              tag = injection[type],
              src = tag.src || tag.href;

            hasMatch = hasMatch || src.indexOf(itemSrc) > -1;
          });

          return hasMatch;
        })
      };

    it('should inject all dependencies from a manifest', () => {
      let
        injections;
      const
        injector = new Injector(document.querySelector('body'), [], {
          enableLogging: false,
          order: []
        });

      injections = injector.injectManifest(fixtureManifests[0]);

      injections.then(injections => {
        findInjectionBySrc(injections, 'hash1').should.have.length(1);
        findInjectionBySrc(injections, 'hash2').should.have.length(1);
        findInjectionBySrc(injections, 'hash3').should.have.length(1);
      });
    });

    it('should generate a url from package- and root url', () => {
      let
        injections;
      const
        injector = new Injector(document.querySelector('body'), [], {
          enableLogging: false,
          order: []
        });

      injections = injector.injectManifest(fixtureManifests[0]);

      injections.then(injections => {
        findInjectionBySrc(injections, fixtureManifests[0].rootUrl).should.have.length(3);
        findInjectionBySrc(injections, fixtureManifests[0].packageUrl).should.have.length(3);
      });
    });
  });

  describe('injectDependency', () => {

  });

  describe('injectIntoDOM', () => {
    let
      css,
      js,
      injector,
      cache,
      code,
      originalEvent;

    before(() => {
      cache = new Cache();

      (function () {
        function CustomEvent ( event, params ) {
          params = params || { bubbles: false, cancelable: false, detail: undefined };
          var evt = document.createEvent( 'CustomEvent' );
          evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        originalEvent = window.Event;
        window.Event = CustomEvent;
      })();

    });

    beforeEach(() => {
      domUtils.removeAll();
      cache.flush();

      css = new Css({
        enableLogging: false
      });

      js = new Js({
        enableLogging: false
      });

      injector = new Injector(document.querySelector('body'), [], {
        enableLogging: false,
        order: []
      });
    });

    after(() => {
      window.Event = originalEvent;
    })

    describe('with cached and uncached dependencies', () => {
      describe('CSS', () => {
        let urls;

        before(() => {
          code = 'foo { color: blue}';
          urls = {
            printed: 'hashed-css-inject.css',
            raw: 'raw-css-inject.css'
          };
        });

        it('should inject fingerprinted CSS into the DOM', () => {
          let tags = css.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            expect(domUtils.findCssByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should inject fallback to non-printed css on error', () => {
          let tags = css.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            let errorEvent = new Event('error');
            domUtils.findCssByDataUrl(urls.printed)[0].dispatchEvent(errorEvent);

            expect(domUtils.findCssByDataUrl(urls.raw)).to.have.length.above(0);

          });
        });

        it('should inject cached version of asset if provided', () => {
          cache.set(code, 'css', urls.printed);

          let tags = css.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            expect(domUtils.findCssByDataUrl(urls.printed)).to.have.length.above(0);
            expect(domUtils.findCssByDataUrl(urls.printed)[0].innerHTML).to.equal(code);
          });
        });
      });

      describe('JS', () => {
        let urls, code;

        before(() => {
          code = 'var a = "b"';
          urls = {
            printed: 'hashed-js-inject.js',
            raw: 'raw-js-inject.js'
          }
        });

        it('should inject fingerprinted JS into the DOM', () => {
          let tags = js.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should inject fallback to non-printed JS on error', () => {
          let tags = js.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            let errorEvent = new Event('error');
            domUtils.findJsByDataUrl(urls.printed)[0].dispatchEvent(errorEvent);

            expect(domUtils.findJsByDataUrl(urls.raw)).to.have.length.above(0);

          });
        });

        it('should inject cached version of asset if provided', () => {
          cache.set(code, 'js', urls.printed);

          let tags = js.tags(urls);

          return tags.then(tags => {
            injector.injectIntoDOM([tags]);
            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
            expect(domUtils.findJsByDataUrl(urls.printed)[0].innerHTML).to.contain(code);
          });
        });
      });

      describe('multiple assets', () => {
        let cssUrls, jsUrls;

        before(() => {
          cssUrls = {
            printed: 'hashed-css-inject.css',
            raw: 'raw-css-inject.css'
          };
          jsUrls = {
            printed: 'hashed-js-inject.js',
            raw: 'raw-js-inject.js'
          };
        });

        it('should inject multiple assets some existing some not as expected', () => {
          return Promise.all([js.tags(jsUrls), css.tags(cssUrls)]).then(tags => {
            injector.injectIntoDOM(tags);

            expect(domUtils.findJsByDataUrl(jsUrls.printed)).to.have.length.above(0);

            let errorEvent = new Event('error');
            domUtils.findJsByDataUrl(jsUrls.printed)[0].dispatchEvent(errorEvent);

            expect(domUtils.findJsByDataUrl(jsUrls.raw)).to.have.length.above(0);
            expect(domUtils.findCssByDataUrl(cssUrls.printed)).to.have.length.above(0);
          })
        });
      });
    });
  });

  describe('urls', () => {
    it('should generate a raw (unprinted) url', () => {
      let
        urls;
      const
        injector = new Injector(document.querySelector('body'), [], {
          enableLogging: false,
          order: []
        });

      urls = injector.urls(fixtureManifests[0].hashes.hash1, 'root');

      urls.raw.should.equal('/root/1.js');
    });

    it('should generate a printed url', () => {
      let
        urls;
      const
        injector = new Injector(document.querySelector('body'), [], {
          enableLogging: false,
          order: []
        });

      urls = injector.urls(fixtureManifests[0].hashes.hash1, 'root');

      urls.printed.should.equal('/root/1-hash1.js');
    });

    it('should generate a singlarBy (file) url', () => {
      let
        urls;
      const
        injector = new Injector(document.querySelector('body'), [], {
          enableLogging: false,
          order: []
        });

      urls = injector.urls(fixtureManifests[0].hashes.hash1, 'root');

      urls.singularBy.should.equal('/root/1.js');
    });
  });
});
