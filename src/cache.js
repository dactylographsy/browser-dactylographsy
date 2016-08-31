import Log from './log';
import getUrlParam from './url';
import stringHash from 'string-hash';

export default class Cache {
  constructor(options = {}) {
    const defaultPrefix = '__dactylographsy';
    const {
      enableLogging = false
    } = options;

    this.log = new Log(
      getUrlParam('dactylographsy-enableLogging', enableLogging)
    );

    this.options = options;
    this.cachePrefix = this.options.cachePrefix || defaultPrefix;
    this.isSupported = this.supported();

    if (this.options.appPrefix) {
      this.cachePrefix = `${this.cachePrefix}--${this.options.appPrefix}`;
    } else if (!this.options.cachePrefix) {
      this.cachePrefix += '__';
    }
  }

  getPrefix() {
    return this.cachePrefix;
  }

  isItemValid(code, hash) {
    if (typeof code !== 'string') {
      return false;
    }

    return (
      stringHash(code) === hash
    );
  }

  parse(item) {
    return JSON.parse(item);
  }

  get(key, defaultValue, hash = false) {
    return new Promise((resolve, reject) => {
      if (!this.isSupported) {
        reject();
      }

      const _item = localStorage.getItem(`${this.cachePrefix}-${key}`);

      if (_item === null && defaultValue !== undefined) {
        this.set(defaultValue, 'plain', key);

        resolve(defaultValue);

        return;
      }

      if (_item !== null && hash !== false) {
        const _parsed = this.parse(_item);

        this.log.info(`Found item with key: ${key} in cache which needs validation...`);

        if (this.isItemValid(_parsed.code, hash)) {
          this.log.info(`...matches expected hash ${hash}.`);

          resolve(_parsed.code);
        } else {
          this.log.info(`...does not match expected hash ${hash} - pruning.`);

          this.remove(key);

          reject();
        }
      } else if (_item) {
        this.log.info(`Found item with key: ${key} in cache.`);

        resolve(this.parse(_item).code);
      } else {
        this.log.info(`Couldn\'t find item with key: ${key} in cache.`);

        reject();
      }
    });
  }

  has(key) {
    if (!this.isSupported) {
      return false;
    }

    return localStorage.getItem(`${this.cachePrefix}-${key}`) !== null;
  }

  remove(key) {
    if (!this.isSupported) {
      return false;
    }

    return localStorage.removeItem(`${this.cachePrefix}-${key}`);;
  }

  set(code, type, key, singularBy = false) {
    if (!this.isSupported) {
      return false;
    }
    if (singularBy) {
      this.dedupe(singularBy);
    }

    const cached = {
      now: +new Date(),
      url: key,
      code: code,
      type: type,
      singularBy: (typeof singularBy === 'string') ? singularBy : undefined
    };

    localStorage.setItem(
      `${this.cachePrefix}-${key}`,
      JSON.stringify(cached)
    );

    return cached;
  }

  flush() {
    if (!this.isSupported) {
      return false;
    }

    for (const key in localStorage) {
      if (key.indexOf(this.cachePrefix) >= 0) {
        this.log.log(`Removing item ${key} requested by flush.`);

        localStorage.removeItem(key);
      }
    }

    return true;
  }

  supported() {
    const item = '__dactylographsy__feature-detection';

    try {
      localStorage.setItem(item, item);
      localStorage.removeItem(item);

      return true;
    } catch (e) {
      this.log.warn('Localstorage not supported in browser - no caching!');

      return false;
    }
  }

  dedupe(singularBy) {
    for (const key in localStorage) {
      const dactylographsyItem = key.indexOf(this.cachePrefix) >= 0;

      if (!dactylographsyItem) {
        continue;
      }

      const item = JSON.parse(localStorage.getItem(key));

      if (
        ((typeof singularBy === 'string') && (typeof item.singularBy === 'string')) &&
        item.singularBy === singularBy
      ) {
        this.log.log(`Deduping by ${singularBy} before adding dupe in ${key}.`);

        localStorage.removeItem(key);
      }
    }
  }
}
