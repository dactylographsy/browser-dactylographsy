import { Css, Js } from '../../src/dom';
import Cache from '../../src/cache';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { DOMUtil } from '../utils';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

const fixtureUrl = 'base/test/src/fixtures/code.js';
let domUtils;
let expect;

describe('DOM', () => {
  before(() => {
    expect = chai.expect;
    domUtils = new DOMUtil();
  });

  describe('Css', () => {
    describe('API', () => {
      let css;

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css(null, {
          enableLogging: false
        });
      })

      it('should have a function to inject by src or text', () => {
        css.inject.should.be.a('function');
      });

      it('should have a function to inject with src (by url)', () => {
        css.injectWithUrl.should.be.a('function');
      });

      it('should have a function to inject with text', () => {
        css.injectWithText.should.be.a('function');
      });

      it('should have a function to cache an url', () => {
        css.ensureCache.should.be.a('function');
      });
    });

    describe('inject', () => {
      let css;
      const urls = {
        printed: 'hashed-css-inject.css',
        raw: 'raw-css-inject.css'
      };
      const code = '.foo {color: blue}';

      describe('an uncached file', () => {
        beforeEach(() => {
          domUtils.removeAll();

          css = new Css(document.querySelector('body'), {
            enableLogging: false
          });
        });

        it('should inject it by with its url', () => {
          const injection = css.inject(urls);

          injection.should.be.fulfilled;
        });
      });

      describe('with cacheInLocalStorage disabled', () => {
        const cache = new Cache();

        it('should not cache the file in localStorage', () => {
          domUtils.removeAll();

          css = new Css(document.querySelector('body'), {
            enableLogging: false,
            cacheInLocalStorage: false
          });

          const cachePromise = css.ensureCache(urls.printed);

          return cachePromise.then(res => {
            expect(res).to.equal('Caching in localStorage is disabled');
          });
        });
      });

      describe('a cached file', () => {
        const cache = new Cache();

        beforeEach(() => {
          domUtils.removeAll();
          cache.flush();

          css = new Css(document.querySelector('body'), {
            enableLogging: false,
            verification: true
          });
        });

        it('should inject it by with its code inline', () => {
          cache.set(code, 'css', urls.printed);

          const injection = css.inject(urls);

          injection.should.be.fulfilled;

          return injection.then(() => {
            expect(domUtils.findCssByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should not inject an invalid item from cache', () => {
          cache.set(code, 'css', urls.printed);

          const injection = css.inject({
            printed: urls.printed,
            raw: urls.raw,
            id: '123-abc'
          });

          injection.should.be.fulfilled;

          return injection.then(() => {
            expect(domUtils.findCssByDataUrl(urls.printed)[0].textContent).to.not.contain(code);
          });
        });
      });
    });

    describe('injectWithText', () => {
      let css;
      const code = '.foo {color: red}';

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css(document.querySelector('body'), {
          enableLogging: false
        });
      });

      it('should resolve the promise when injecting', () => {
        const injection = css.injectWithText(code, 'css-promise-check.js');

        injection.should.be.fulfilled;
      });

      it('should create a style-tag when injecting', () => {
        const url = 'css-tag-check.css';
        const injection = css.injectWithText(code, url);

        expect(domUtils.findCssByDataUrl(url)).to.have.length.above(0);
      });

      it('should should flag the injection with a data-url', () => {
        const url = 'css-data-url-check.css';
        const injection = css.injectWithText(code, url);

        expect(domUtils.findCssByDataUrl(url)).to.have.length.above(0);
      });

      it('should should inject the code into the script-tag', () => {
        const url = 'css-code-check.css';
        const injection = css.injectWithText(code, url);

        expect(domUtils.findCssByDataUrl(url)[0].textContent).to.equal(code);
      });
    });

    describe('injectWithUrl', () => {
      let css;

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css(document.querySelector('body'), {
          enableLogging: false
        });
      });

      it('should resolve the promise when injecting straight away', () => {
        const urls = {
          raw: 'promise-check.css'
        };
        const injection = css.injectWithUrl(urls, 'raw');

        injection.should.be.fulfilled;
      });

      it('should create a style-tag when injecting', () => {
        const urls = {
          raw: 'css-tag-check.css'
        };
        const injection = css.injectWithUrl(urls, 'raw');

        expect(domUtils.findCssByDataUrl(urls.raw)).to.have.length.above(0);
      });

      it('should should flag the injection with a data-url', () => {
        const urls = {
          raw: 'css-data-url-check.css'
        };
        const injection = css.injectWithUrl(urls, 'raw');

        expect(domUtils.findCssByDataUrl(urls.raw)).to.have.length.above(0);
      });

      it('should should set the href on the script-tag', () => {
        const urls = {
          raw: 'js-src-check.css'
        };
        const injection = css.injectWithUrl(urls, 'raw');

        expect(domUtils.findCssByDataUrl(urls.raw)[0]).to.have.property('href');
      });
    });
  });

  describe('Js', () => {
    describe('API', () => {
      let js;

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js(null, {
          enableLogging: false
        });
      })

      it('should have a function to inject by src or text', () => {
        js.inject.should.be.a('function');
      });

      it('should have a function to inject with src (by url)', () => {
        js.injectWithUrl.should.be.a('function');
      });

      it('should have a function to inject with text', () => {
        js.injectWithText.should.be.a('function');
      });

      it('should have a function to cache an url', () => {
        js.ensureCache.should.be.a('function');
      });
    });

    describe('inject', () => {
      let js;
      const urls = {
        printed: 'hashed-js-inject.js',
        raw: 'raw-js-inject.js'
      };
      const code = 'var a = "b"';

      describe('an uncached file', () => {
        beforeEach(() => {
          domUtils.removeAll();

          js = new Js(document.querySelector('body'), {
            enableLogging: false
          });
        });

        it('should inject it by with its url', () => {
          const injection = js.inject(urls);

          injection.should.be.fulfilled;

          return injection.then(() => {
            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });
      });

      describe('with cacheInLocalStorage disabled', () => {
        const cache = new Cache();

        it('should not cache the file in localStorage', () => {
          domUtils.removeAll();

          js = new Js(document.querySelector('body'), {
            enableLogging: false,
            cacheInLocalStorage: false
          });

          const cachePromise = js.ensureCache(urls.printed);

          return cachePromise.then(res => {
            expect(res).to.equal('Caching in localStorage is disabled');
          });
        });
      });

      describe('a cached file', () => {
        const cache = new Cache();

        beforeEach(() => {
          domUtils.removeAll();
          cache.flush();

          js = new Js(document.querySelector('body'), {
            enableLogging: false,
            verification: true
          });
        });

        it('should inject it by with its code inline', () => {
          cache.set(code, 'js', urls.printed);

          const injection = js.inject(urls);

          injection.should.be.fulfilled;

          return injection.then(() => {
            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should not inject an invalid item from cache', () => {
          cache.set(code, 'js', urls.printed);

          const injection = js.inject({
            printed: urls.printed,
            raw: urls.raw,
            id: '123-abc'
          });

          injection.should.be.fulfilled;

          return injection.then(() => {
            expect(domUtils.findJsByDataUrl(urls.printed)[0].textContent).to.not.contain(code);
          });
        });
      });
    });

    describe('injectWithText', () => {
      let js;
      const code = 'var a="b";';

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js(document.querySelector('body'), {
          enableLogging: false
        });
      });

      it('should resolve the promise when injecting', () => {
        const url = 'promise-check.js';
        const injection = js.injectWithText(code, url);

        injection.should.be.fulfilled;
      });

      it('should create a script-tag when injecting', () => {
        const url = 'js-tag-check.js';
        const injection = js.injectWithText(code, url);

        expect(domUtils.findJsByDataUrl(url)).to.have.length.above(0);
      });

      it('should flag the injection with a data-url', () => {
        const url = 'js-data-url-check.js';
        const injection = js.injectWithText(code, url);

        expect(domUtils.findJsByDataUrl(url)).to.have.length.above(0);
      });

      it('should inject the code into the script-tag', () => {
        const url = 'js-code-check.js';
        const injection = js.injectWithText(code, url);

        expect(domUtils.findJsByDataUrl(url)[0].textContent).to.contain(code);
      });

      it('should amend an "sourceURL" to injected code', () => {
        const url = 'js-sourceurl-check.js';
        const injection = js.injectWithText(code, url);

        expect(domUtils.findJsByDataUrl(url)[0].textContent).to.contain('//# sourceURL=');
      });
    });

    describe('injectWithUrl', () => {
      let js;

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js(document.querySelector('body'), {
          enableLogging: false
        });
      });

      it('should resolve the promise when injecting straight away', () => {
        const urls = {
          raw: 'promise-check.js'
        };
        const injection = js.injectWithUrl(urls, 'raw');

        injection.should.be.fulfilled;
      });

      it('should create a script-tag when injecting', () => {
        const urls = {
          raw: 'js-tag-check.js'
        };
        const injection = js.injectWithUrl(urls, 'raw');

        expect(domUtils.findJsByDataUrl(urls.raw)).to.have.length.above(0);
      });

      it('should should flag the injection with a data-url', () => {
        const urls = {
          raw: 'js-data-url-check.js'
        };
        const injection = js.injectWithUrl(urls, 'raw');

        expect(domUtils.findJsByDataUrl(urls.raw)).to.have.length.above(0);
      });

      it('should should set the src on the script-tag', () => {
        const urls = {
          raw: 'js-src-check.js'
        };
        const injection = js.injectWithUrl(urls, 'raw');

        expect(domUtils.findJsByDataUrl(urls.raw)[0]).to.have.property('src');
      });

      it('should should flag the script not being async', () => {
        const urls = {
          raw: 'js-async-check.js'
        };
        const injection = js.injectWithUrl(urls, 'raw');

        expect(domUtils.findJsByDataUrl(urls.raw)[0].async).to.be.false;
      });
    });
  });
});
