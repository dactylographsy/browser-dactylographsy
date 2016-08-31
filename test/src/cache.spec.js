import Cache from '../../src/cache';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Cache', () => {
  beforeEach(function() {});

  describe('supported', () => {
    it('should indicate if local storage is not supported', () => {
      const cache = new Cache();;
      const setItem = Storage.prototype.setItem;

      Storage.prototype.setItem = function() {
        throw false;
      };

      cache.supported().should.be.false;

      Storage.prototype.setItem = setItem;
    });

    it('should indicate if local storage is supported', () => {
      const cache = new Cache();;
      const setItem = Storage.prototype.setItem;
      const removeItem = Storage.prototype.removeItem;

      Storage.prototype.setItem = function() {};
      Storage.prototype.removeItem = function() {};

      cache.supported().should.be.true;

      Storage.prototype.setItem = setItem;
      Storage.prototype.removeItem = removeItem;
    });
  });

  describe('getPrefix', () => {
    it('should have a default prefix', () => {
      const cache = new Cache({
        enableLogging: false,
      });

      cache.getPrefix().should.be.equal('__dactylographsy__');
    });

    it('should allow specifying a custom cache prefix', () => {
      const prefix = '__karma-spec__';
      const cache = new Cache({
        enableLogging: false,
        cachePrefix: prefix
      });

      cache.getPrefix().should.be.equal(prefix);
    });

    it('should allow specifying an app prefix without an cache prefix', () => {
      const prefix = '__karma-runner__';
      const cache = new Cache({
        enableLogging: false,
        appPrefix: prefix
      });

      cache.getPrefix().should.be.equal(`__dactylographsy--${prefix}`);
    });

    it('should allow specifying an app prefix with an cache prefix', () => {
      const appPrefix = '__karma-runner__';
      const cachePrefix = 'karma-spec';
      const cache = new Cache({
        enableLogging: false,
        appPrefix: appPrefix,
        cachePrefix: cachePrefix
      });

      cache.getPrefix().should.be.equal(`${cachePrefix}--${appPrefix}`);
    });
  });

  describe('set', () => {
    let cache;

    beforeEach(() => {
      cache = new Cache({
        cachePrefix: 'karma-spec'
      });

      cache.flush();
    });

    it('should flag items with a date', () => {
      const item = cache.set('foo', 'string', 'karma-spec.com');

      item.should.be.an.object;
      item.now.should.be.an.number;
      item.now.should.be.below(+new Date + 100)
    });

    it('should flag items with the type', () => {
      const item = cache.set('foo', 'string', 'karma-spec.com');

      item.should.be.an.object;
      item.type.should.be.equal('string');
    });

    it('should flag items with the url', () => {
      const item = cache.set('foo', 'string', 'karma-spec.com');

      item.should.be.an.object;
      item.url.should.be.equal('karma-spec.com');
    });

    it('should save the value as code', () => {
      const item = cache.set('foo', 'string', 'karma-spec.com');

      item.should.be.an.object;
      item.code.should.be.equal('foo');
    });

    it('should allow singluarizing items by the singularBy property', () => {
      cache.set('foo', 'string', 'karma-spec-1.com', 'karma');
      cache.set('foo', 'string', 'karma-spec-2.com', 'karma');

      cache.get('karma-spec-2.com').should.be.fulfilled;
      cache.get('karma-spec-1.com').should.be.rejected;

      cache.set('foo', 'string', 'karma-spec-1.com');

      cache.get('karma-spec-1.com').should.be.fulfilled;
    });
  });

  describe('has', () => {
    let cache;

    beforeEach(() => {
      cache = new Cache({
        cachePrefix: 'karma-spec-has'
      });

      cache.flush();
    });

    it('should indicate when finding an entry', () => {
      const item = cache.set('foo', 'string', 'karma-spec.com');

      item.should.be.an.object;

      cache.has('karma-spec.com').should.be.true;
    });

    it('should indicate when not finding an entry', () => {
      cache.has('karma-spec.com-notpresent').should.be.false;
    });
  });

  describe('flush', () => {
    let cache1;
    let cache2;

    beforeEach(() => {
      cache1 = new Cache({
        cachePrefix: 'karma-spec-1'
      });

      cache2 = new Cache({
        cachePrefix: 'karma-spec-2'
      });

      cache1.flush();
      cache2.flush();
    });

    it('should flush the entire cache scoped to the prefix', () => {
      const item1 = cache1.set('foo', 'string', 'karma-spec.com');
      const item2 = cache2.set('foo', 'string', 'karma-spec.com');

      item1.should.be.an.object;
      item2.should.be.an.object;

      cache1.has('karma-spec.com').should.be.true;
      cache2.has('karma-spec.com').should.be.true;

      cache1.flush();
      cache1.has('karma-spec.com').should.be.false;
      cache2.has('karma-spec.com').should.be.true;

      cache2.flush();
      cache2.has('karma-spec.com').should.be.false;
    });
  });

  describe('get', () => {
    let cache;

    beforeEach(() => {
      cache = new Cache({
        cachePrefix: 'karma-spec'
      });

      cache.flush();
    });

    afterEach(() => {
      cache.flush();
    });

    it('should resolve the promise with a hit', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      const item = cache.get('karma-spec.com');

      item.should.be.fulfilled;
    });

    it('should reject the promise without a hit', () => {
      const item = cache.get('karma-spec-not-found');

      item.should.be.rejected;
    });

    it('should resolve the promise with the value', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      cache.get('karma-spec.com').then(value => {
        value.should.equal('foo');
      });
    });

    it('should resolve with the default value when specified', () => {
      cache.get('karma-spec-defaulted.com', 'some-default').then(value => {
        value.should.equal('some-default');
      });

      cache.has('karma-spec-defaulted.com').should.be.true;
    });

    it('should resolve the promise when validation is requested and passes', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      const item = cache.get('karma-spec.com', undefined, 'cdc735c00a1028854ab9e7d568156a293a92fb13');

      item.should.be.resolved;
    });

    it('should reject the promise when validation is requested and fails', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      const item = cache.get('karma-spec.com', undefined, 'cdc735c00a1028854ab9e7d568156a293a92fb14');

      item.should.be.rejected;
    });

    it('should remove invalid items from cache when found', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      cache.get('karma-spec.com', undefined, 'cdc735c00a1028854ab9e7d568156a293a92fb14');

      cache.has('karma-spec.com').should.be.false;
    });
  });

  describe('remove', () => {
    let cache;

    beforeEach(() => {
      cache = new Cache({
        cachePrefix: 'karma-spec'
      });

      cache.flush();
    });

    afterEach(() => {
      cache.flush();
    });

    it('should remove an previously existing key', () => {
      cache.set('foo', 'string', 'karma-spec.com');

      cache.has('karma-spec.com').should.be.true;

      cache.remove('karma-spec.com');

      cache.has('karma-spec.com').should.be.false;
    });

    it('should not fail on removing a non-existing key', () => {
      cache.remove('karma-spec.com');

      cache.has('karma-spec.com').should.be.false;
    });
  });

  describe('isItemValid', () => {
    let cache;

    beforeEach(() => {
      cache = new Cache({
        cachePrefix: 'karma-spec'
      });

      cache.flush();
    });

    afterEach(() => {
      cache.flush();
    });

    it('should indicate an item with correct hash being valid', () => {
      cache.isItemValid('karma-spec.com', 55011414)
        .should.be.true;
    });

    it('should indicate an item being incorrect with non matching sha256', () => {
      cache.isItemValid('karma-spec.com', 55011415).should.be.false;
    });

    it('should not attempt validating non-string values', () => {
      cache.isItemValid(false, 'non-string').should.be.false;
      cache.isItemValid(1, 'non-string').should.be.false;
      cache.isItemValid(1.1, 'non-string').should.be.false;
    });
  });
});
