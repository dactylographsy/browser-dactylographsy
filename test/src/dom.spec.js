import {
  Css,
  Js
} from '../../src/dom';
import Cache from '../../src/cache';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import {
  DOMUtil
} from '../utils';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

const fixtureUrl = 'base/test/src/fixtures/code.js';
let domUtils;
let expect;

describe('DOM', () => {
  let rootElem;

  before(() => {
    expect = chai.expect;
    domUtils = new DOMUtil();

    rootElem = document.querySelector('body');
  });

  describe('Css', () => {
    describe('API', () => {
      let css;

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css({
          enableLogging: false
        });
      })

      it('should have a function to tags by src or text', () => {
        css.tags.should.be.a('function');
      });

      it('should have a function to prepare with src (by url)', () => {
        css.prepareWithUrl.should.be.a('function');
      });

      it('should have a function to prepare with text', () => {
        css.prepareWithText.should.be.a('function');
      });

      it('should have a function to cache an url', () => {
        css.ensureCache.should.be.a('function');
      });
    });

    describe('tags', () => {
      const urls = {
        printed: 'hashed-css-inject.css',
        raw: 'raw-css-inject.css'
      };
      const code = '.foo {color: blue}';
      let css;

      describe('an uncached file', () => {
        beforeEach(() => {
          domUtils.removeAll();

          css = new Css({
            enableLogging: false
          });
        });

        it('should resolve tags with only the printed and the unprinted version', () => {
          const tags = css.tags(urls);

          tags.should.be.fulfilled;

          return tags.then(res => {
            expect(res.printed).to.be.defined;
            expect(res.raw).to.be.defined;
            expect(res.hash).to.not.be.defined;
            expect(res.singularBy).to.not.be.defined;
            expect(res.printed.href).to.equal('http://localhost:9876/hashed-css-inject.css');
            expect(res.raw.href).to.equal('http://localhost:9876/raw-css-inject.css');

            domUtils.injectTag(res.printed, document.querySelector('body'));
            expect(domUtils.findCssByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });
      });

      describe('with cacheInLocalStorage disabled', () => {
        const cache = new Cache();

        it('should not cache the file in localStorage', () => {
          domUtils.removeAll();

          css = new Css({
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

          css = new Css({
            enableLogging: false,
            verification: true
          });
        });

        it('should resolve with tag with code inline whenever cached', () => {
          cache.set(code, 'css', urls.printed);

          const tags = css.tags(urls);

          tags.should.be.fulfilled;

          return tags.then((tags) => {
            expect(tags.cached).to.be.defined;
            expect(tags.raw).to.not.be.defined;
            expect(tags.printed).to.not.be.defined;

            domUtils.injectTag(tags.cached, document.querySelector('body'));

            expect(domUtils.findCssByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should not resolve with an invalid tag from cache', () => {
          cache.set(code, 'css', urls.printed);

          const tags = css.tags({
            printed: urls.printed,
            raw: urls.raw,
            id: '123-abc'
          });

          tags.should.be.fulfilled;

          return tags.then((tags) => {
            domUtils.injectTag(tags.printed, document.querySelector('body'));

            expect(domUtils.findCssByDataUrl(urls.printed)[0].textContent).to.not.contain(code);
          });
        });
      });
    });

    describe('prepareWithText', () => {
      let css;
      const code = '.foo {color: red}';

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css({
          enableLogging: false
        });
      });

      it('should resolve the promise when preparing', () => {
        const preparation = css.prepareWithText(code, 'css-promise-check.js');

        preparation.should.be.fulfilled;
      });

      it('should create a style-tag when preparing', () => {
        const url = 'css-tag-check.css';
        const preparation = css.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(url)).to.have.length.above(0);
        });
      });

      it('should flag the tag with a data-url', () => {
        const url = 'css-data-url-check.css';
        const preparation = css.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(url)).to.have.length.above(0);
        });
      });

      it('should inject the code into the script-tag', () => {
        const url = 'css-code-check.css';
        const preparation = css.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(url)[0].textContent).to.equal(code);
        });
      });
    });

    describe('prepareWithUrl', () => {
      let css;

      beforeEach(() => {
        domUtils.removeAll();

        css = new Css({
          enableLogging: false
        });
      });

      it('should resolve the promise when creating tags straight away', () => {
        const urls = {
          raw: 'promise-check.css'
        };
        const preparations = css.prepareWithUrl(urls);

        preparations.should.be.fulfilled;
      });

      it('should create a style-tag', () => {
        const urls = {
          raw: 'css-tag-check.css'
        };
        const preparations = css.prepareWithUrl(urls);

        return preparations.then((tags) => {
          expect(tags.printed).to.be.defined;
          expect(tags.raw).to.be.defined;

          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(urls.raw)).to.have.length.above(0);
        });
      });

      it('should should flag the tag with a data-url', () => {
        const urls = {
          raw: 'css-data-url-check.css'
        };
        const preparations = css.prepareWithUrl(urls);

        return preparations.then((tags) => {
          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(urls.raw)).to.have.length.above(0);
        });
      });

      it('should should set the href on the script-tag', () => {
        const urls = {
          raw: 'js-src-check.css'
        };
        const preparations = css.prepareWithUrl(urls);

        return preparations.then((tags) => {
          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findCssByDataUrl(urls.raw)[0]).to.have.property('href');
        });
      });
    });
  });


  describe('Js', () => {
    describe('API', () => {
      let js;

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js({
          enableLogging: false
        });
      })

      it('should have a function to create tags by src and text', () => {
        js.tags.should.be.a('function');
      });

      it('should have a function to prepare with src (by url)', () => {
        js.prepareWithUrl.should.be.a('function');
      });

      it('should have a function to prepare with text', () => {
        js.prepareWithText.should.be.a('function');
      });

      it('should have a function to cache an url', () => {
        js.ensureCache.should.be.a('function');
      });
    });

    describe('tags', () => {
      const urls = {
        printed: 'hashed-js-inject.js',
        raw: 'raw-js-inject.js'
      };
      const code = 'var a = "b"';
      let js;

      describe('an uncached file', () => {
        beforeEach(() => {
          domUtils.removeAll();

          js = new Js({
            enableLogging: false
          });
        });

        it('should create tags by with its url', () => {
          const tags = js.tags(urls);

          tags.should.be.fulfilled;

          return tags.then((tags) => {
            expect(tags.printed).to.be.defined;
            expect(tags.raw).to.be.defined;
            expect(tags.hash).to.not.be.defined;
            expect(tags.singularBy).to.not.be.defined;
            expect(tags.printed.src).to.equal('http://localhost:9876/hashed-js-inject.js')
            expect(tags.raw.src).to.equal('http://localhost:9876/raw-js-inject.js')

            domUtils.injectTag(tags.printed, document.querySelector('body'));

            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });
      });

      describe('with cacheInLocalStorage disabled', () => {
        const cache = new Cache();

        it('should not cache the file in localStorage', () => {
          domUtils.removeAll();

          js = new Js({
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

          js = new Js({
            enableLogging: false,
            verification: true
          });
        });

        it('should create tags with its code inline whenever cached', () => {
          cache.set(code, 'js', urls.printed);

          const tags = js.tags(urls);

          tags.should.be.fulfilled;

          return tags.then((tags) => {
            expect(tags.cached).to.be.defined;
            expect(tags.raw).to.not.be.defined;
            expect(tags.printed).to.not.be.defined;

            domUtils.injectTag(tags.cached, document.querySelector('body'));

            expect(domUtils.findJsByDataUrl(urls.printed)).to.have.length.above(0);
          });
        });

        it('should not create tags with an invalid item from cache', () => {
          cache.set(code, 'js', urls.printed);

          const tags = js.tags({
            printed: urls.printed,
            raw: urls.raw,
            id: '123-abc'
          });

          tags.should.be.fulfilled;

          return tags.then((tags) => {
            domUtils.injectTag(tags.printed, document.querySelector('body'));

            expect(domUtils.findJsByDataUrl(urls.printed)[0].textContent).to.not.contain(code);
          });
        });
      });
    });

    describe('prepareWithText', () => {
      const code = 'var a="b";';
      let js;

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js({
          enableLogging: false
        });
      });

      it('should resolve the promise when preparing', () => {
        const url = 'promise-check.js';
        const preparation = js.prepareWithText(code, url);

        preparation.should.be.fulfilled;
      });

      it('should create a script-tag when preparing', () => {
        const url = 'js-tag-check.js';
        const preparation = js.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(url)).to.have.length.above(0);
        });
      });

      it('should flag the tag with a data-url', () => {
        const url = 'js-data-url-check.js';
        const preparation = js.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(url)).to.have.length.above(0);
        });
      });

      it('should inject the code into the script-tag', () => {
        const url = 'js-code-check.js';
        const preparation = js.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(url)[0].textContent).to.contain(code);
        });
      });

      it('should amend an "sourceURL" to injected code', () => {
        const url = 'js-sourceurl-check.js';
        const preparation = js.prepareWithText(code, url);

        return preparation.then((tag) => {
          domUtils.injectTag(tag, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(url)[0].textContent).to.contain('//# sourceURL=');
        });
      });
    });

    describe('prepareWithUrl', () => {
      let js;

      beforeEach(() => {
        domUtils.removeAll();

        js = new Js({
          enableLogging: false
        });
      });

      it('should resolve the promise when preparing straight away', () => {
        const urls = {
          raw: 'promise-check.js'
        };
        const preparations = js.prepareWithUrl(urls);

        preparations.should.be.fulfilled;
      });

      it('should create a script-tag when preparing', () => {
        const urls = {
          raw: 'js-tag-check.js'
        };
        const preparations = js.prepareWithUrl(urls);

        return preparations.then((tags) => {
          expect(tags.printed).to.be.defined;
          expect(tags.raw).to.be.defined;

          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(urls.raw)).to.have.length.above(0);
        });
      });

      it('should should flag the tag with a data-url', () => {
        const urls = {
          raw: 'js-data-url-check.js'
        };
        const preparations = js.prepareWithUrl(urls);

        return preparations.then((tags) => {
          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(urls.raw)).to.have.length.above(0);
        });
      });

      it('should should set the src on the script-tag', () => {
        const urls = {
          raw: 'js-src-check.js'
        };
        const preparations = js.prepareWithUrl(urls);

        return preparations.then((tags) => {
          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(urls.raw)[0]).to.have.property('src');
        });
      });

      it('should should flag the script not being async', () => {
        const urls = {
          raw: 'js-async-check.js'
        };
        const preparations = js.prepareWithUrl(urls);

        return preparations.then((tags) => {
          domUtils.injectTag(tags.raw, document.querySelector('body'));

          expect(domUtils.findJsByDataUrl(urls.raw)[0].async).to.be.false;
        });
      });
    });
  });
});
