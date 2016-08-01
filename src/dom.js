import Cache from './cache';
import Ajax from './ajax';
import Log from './log';
import getUrlParam from './url';

export class Js {
  constructor(config = {}) {
    let {
      enableLogging = false,
      verification = false,
      cacheInLocalStorage = true
    } = config;

    enableLogging = getUrlParam(
      'dactylographsy-enableLogging',
      enableLogging
    );

    cacheInLocalStorage = getUrlParam(
      'dactylographsy-cacheInLocalStorage',
      cacheInLocalStorage
    );

    this.cache = new Cache({
      appPrefix: config.appPrefix,
      enableLogging: enableLogging
    });

    this.cacheDelay = config.cacheDelay || 5000;
    this.verification = verification;
    this.cacheInLocalStorage = cacheInLocalStorage;

    this.log = new Log(enableLogging);
  }

  prepareWithText(text, url) {
    let script = document.createElement('script');

    this.log.info(`Creating <script />-tag with text for ${url}.`);

    script.defer = false;
    script.async = false;

    script.setAttribute('data-dactylographsy-url', url);

    script.text = `
      ${text}
      //# sourceURL=${url}
    `;

    return Promise.resolve(script);
  }

  prepareWithUrl(urls, whichUrl = 'printed') {
    const
      urlKeys = Object.keys(urls).filter((key) => (['printed', 'raw'].indexOf(key) > -1)),
      scriptTags = {};

    urlKeys.forEach((urlKey) => {
      const script = document.createElement('script');
      const url = urls[urlKey];

      this.log.info(`Creating <script />-tag with url: ${url}.`);

      script.async = false;
      script.defer = false;

      script.setAttribute('data-dactylographsy-url', url);
      script.setAttribute('data-dactylographsy-uncached-js', urlKey === 'printed');

      // Bind `load` listener on script element to cache asset
      script.addEventListener('load', () => {
          if (urlKey === 'printed') { this.ensureCache(url, urls.singularBy, this.cacheDelay); }
      });

      script.src = url;

      scriptTags[urlKey] = script;
    });

    return Promise.resolve(scriptTags);
  }

  ensureCache(url, singularBy = false, delay = 0) {
    return new Promise((resolve, reject) => {
        if (this.cache.has(url)) { return resolve(); }
        if (!this.cacheInLocalStorage) { return resolve('Caching in localStorage is disabled'); }

        this.log.info(`Loading JavaScript from ${url} for cache in ${delay}.`);

        window.setTimeout(() => {
          return new Ajax()
            .get(url)
            .then(response => {
              let { text: responseText } = response;

              this.cache.set(responseText, 'js', url, singularBy);

              this.log.info(`Loaded JavaScript from ${url} now cached.`);

              resolve();
            })
            .catch(() => {
              this.log.info(`Failed attempting to cache JavaScript from ${url}.`);
            });
        }, delay);
    });
  }

  hash(hash) {
    return (
      this.verification === true
    ) ? hash : false
  }

  tags(urls) {
    return this.cache.get(
      urls.printed,
      undefined,
      this.hash(urls.id)
    ).then(text => {
      return this.prepareWithText(
        text, urls.printed
      ).then((cached) => ({cached}));
    }, () => {
      return this.prepareWithUrl(urls);
    });
  }
}

export class Css {
  constructor(config = {}) {
    let {
      enableLogging = false,
      verification = false,
      cacheInLocalStorage = true
    } = config;

    enableLogging = getUrlParam(
      'dactylographsy-enableLogging',
      enableLogging
    );

    cacheInLocalStorage = getUrlParam(
      'dactylographsy-cacheInLocalStorage',
      cacheInLocalStorage
    );

    this.cache = new Cache({
      appPrefix: config.appPrefix
    });

    this.cacheDelay = config.cacheDelay || 5000;
    this.verification = verification;
    this.cacheInLocalStorage = cacheInLocalStorage;

    this.log = new Log(enableLogging);
  }

  ensureCache(url, singularBy = false, delay = 0) {
    return new Promise((resolve, reject) => {
      if (this.cache.has(url)) { return resolve(); }
      if (!this.cacheInLocalStorage) { return resolve('Caching in localStorage is disabled'); }

      this.log.info(`Loading CSS from ${url} for cache in ${delay}.`);

      window.setTimeout(() => {
        return new Ajax()
          .get(url)
          .then(response => {
            let { text: responseText } = response;

            this.cache.set(responseText, 'css', url, singularBy);

            this.log.info(`Loaded CSS from ${url} now cached.`);

            resolve();
          }).catch(() => {
            this.log.info(`Failed attempting to cache CSS from ${url}.`);
          });
      }, delay);
    });
  }

  prepareWithUrl(urls) {
    const
      urlKeys = Object.keys(urls).filter((key) => (['printed', 'raw'].indexOf(key) > -1)),
      linkTags = {};

    urlKeys.forEach((urlKey) => {
      const link = document.createElement('link');
      const url = urls[urlKey];

      this.log.info(`Creating <link />-tag with url: ${url}.`);

      link.type = 'text/css';
      link.rel = 'stylesheet';

      link.setAttribute('data-dactylographsy-url', url);
      link.setAttribute('data-dactylographsy-uncached-css', urlKey === 'printed');

      // Bind `load` listener on link element to cache asset
      link.addEventListener('load', () => {
          if (urlKey === 'printed') { this.ensureCache(url, urls.singularBy, this.cacheDelay); }
      });

      link.href = url;

      linkTags[urlKey] = link;
    });

    return Promise.resolve(linkTags);
  }

  prepareWithText(text, url) {
    let
      link = document.createElement('link');

    this.log.info(`Creating <link />-tag with text for url: ${url}.`);

    link = document.createElement('style');

    link.setAttribute('data-dactylographsy-url', url);

    link.textContent = text;

    return Promise.resolve(link);
  }

  hash(hash) {
    return (
      this.verification === true
    ) ? hash : false
  }

  tags(urls) {
    return this.cache.get(
      urls.printed,
      undefined,
      this.hash(urls.id)
    ).then(text => {
      return this.prepareWithText(
        text, urls.printed
      ).then((cached) => ({cached}));
    }, () => {
      return this.prepareWithUrl(urls);
    });
  }
}
