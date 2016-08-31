import Ajax from '../../src/ajax';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import es6Promise from 'es6-promise';

es6Promise.polyfill();

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiString);

const fixtureUrl = 'base/test/src/fixtures/response.json';

describe('Ajax', () => {
  describe('get', () => {
    it('should resolve the promise when fetching a file', () => {
      const request = new Ajax().get(fixtureUrl);

      request.should.be.fulfilled;
    });

    it('should resolve the promise with properties xhr url and text', () => {
      const request = new Ajax().get(fixtureUrl);

      request.should.to.eventually.have.property('xhr');
      request.should.to.eventually.have.property('url');
      request.should.to.eventually.have.property('text');
    });

    it('should expose the url on resolving the promise', () => {
      const request = new Ajax().get(fixtureUrl);

      request.then(result => {
        chai.expect(result.url).to.endsWith(fixtureUrl);
      });
    });

    it('should expose the data on resolving the promise', () => {
      const request = new Ajax().get(fixtureUrl);

      request.then(result => {
        chai.expect(result.text.indexOf('Bob')).to.be.at.least(1);
      });
    });

    it('should reject then promise when not finding a file', () => {
      const request = new Ajax().get(fixtureUrl + '--');

      request.should.be.rejected;
    });

    it('should set the withCredentials flag on the xhr', () => {
      const request = new Ajax().get(fixtureUrl, {
        withCredentials: true
      });

      request.then(result => {
        result.xhr.withCredentials.should.be.true;
      });
    });
  });

  describe('head', () => {
    it('should resolve the promise when checking a file', () => {
      const request = new Ajax().head(fixtureUrl);

      request.should.be.fulfilled;
    });

    it('should resolve the promise with properties xhr url and text', () => {
      const request = new Ajax().head(fixtureUrl);

      request.should.to.eventually.have.property('xhr');
      request.should.to.eventually.have.property('url');
      request.should.to.eventually.have.property('text');
    });

    it('should expose the url on resolving the promise', () => {
      const request = new Ajax().head(fixtureUrl);

      request.then(result => {
        chai.expect(result.url).to.endsWith(fixtureUrl);
      });
    });

    it('should not contain any data', () => {
      const request = new Ajax().head(fixtureUrl);

      request.then(result => {
        chai.expect(result.text).to.be.undefined;
      });
    });

    it('should reject then promise when not finding a file', () => {
      const request = new Ajax().head(fixtureUrl + '--');

      request.should.be.rejected;
    });

    it('should set the withCredentials flag on the xhr', () => {
      const request = new Ajax().head(fixtureUrl, {
        withCredentials: true
      });

      request.then(result => {
        result.xhr.withCredentials.should.be.true;
      });
    });
  });
});
