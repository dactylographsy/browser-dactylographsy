import getUrlParam from '../../src/url';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import es6Promise from 'es6-promise';

es6Promise.polyfill();

let
  should = chai.should();

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiString);

describe('Url', () => {
  describe('getUrlParam', () => {
    it('should return null on undefined urls without default value', () => {
      let param = getUrlParam('__dactylographsy__', null, 'http://localhost');
      let param2 = getUrlParam('__dactylographsy__', null, 'http://localhost?foo=bar');

      should.not.exist(param);
      should.not.exist(param2);
    });

    it('should return the default value on urls with default value', () => {
      let param = getUrlParam('__dactylographsy__', 'bar3', 'http://localhost?foo=bar&foo=bar2');

      param.should.equal('bar3');
    });

    it('should return the value on urls without default value', () => {
      let param = getUrlParam('foo', null, 'http://localhost?foo=bar');

      param.should.equal('bar');
    });

    it('should return the last value on urls without default value', () => {
      let param = getUrlParam('foo', null, 'http://localhost?foo=bar&foo=bar2');

      param.should.equal('bar2');
    });

    it('should return the value on urls with default value', () => {
      let param = getUrlParam('foo', 'bar', 'http://localhost?foo=bar&foo=bar2');

      param.should.equal('bar2');
    });

    it('should maintain types of values within the url', () => {
      let param1 = getUrlParam('foo', null, 'http://localhost?foo=true');
      let param2 = getUrlParam('bar', null, 'http://localhost?bar=3');

      param1.should.equal(true);
      param2.should.equal(3);
    });

    it('should return encoded version of strings', () => {
      let param = getUrlParam('foo', null, 'http://localhost?foo=<script>alert(document.cookie)</script>');

      param.should.equal('%3Cscript%3Ealert(document.cookie)%3C%2Fscript%3E');
    });
  });
});
