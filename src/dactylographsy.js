import Cache from './cache';
import Injector, {Manifest} from './injector';
import Log from './log';
import getUrlParam from './url';

export default class Dactylographsy {
  constructor(options = {}) {
    const
      { autorun = false } = options,
      { enableLogging = false } = options;

    this.log = new Log(
      getUrlParam('dactylographsy-enableLogging', enableLogging)
    );
    this.hookIntoDom();
    this.readConfiguration();

    this.cache = new Cache({
      appPrefix: this.config.appPrefix
    });

    if (autorun) { this.run(); }
  }

  hookIntoDom() {
    if (typeof document === 'undefined') { return; }

    this.executingScript = document.getElementById('dactylographsy');
    this.injectInto = document.body || document.head || document.getElementsByTagName('script')[0];
  }

  readConfiguration() {
    this.manifestUrls = this.readAttrOnScript('manifests');
    this.config = this.readAttrOnScript('config');
  }

  refresh(inject = true) {
    return Promise.all(this.manifestUrls.map(url => {
      return new Manifest(url, this.config).get();
    })).then(manifests => {
      this.log.info(`Fetched all manifests, ${manifests.length} in total.`);

      this.cache.set(manifests, 'manifests', 'manifests');

      return new Injector(
        inject ? this.injectInto : undefined,
        manifests,
        this.config
      ).inject();
    });
  }

  restore(inject = true) {
    return this.cache.get('manifests')
      .then(manifests => {
        this.log.info('Resotring with manifests in cache later refreshing via network (delayed).');

        return new Injector(
          inject ? this.injectInto : undefined,
          manifests,
          this.config
        ).inject();
      });
  }

  readAttrOnScript(attr) {
    if (!this.executingScript) { return false; }

    let _attr = this.executingScript.getAttribute('data-' + attr);

    return _attr ? JSON.parse(_attr) : undefined;
  }

  run() {
    const
      ttl = getUrlParam('dactylographsy-ttl', this.config.ttl);

    if (ttl) {
      this.cache.get('clt', 0)
        .then(clt => {
          if (clt >= ttl) {
            this.log.info(`Flushing cache due to exeeding TTL of ${ttl}.`);

            this.cache.flush();
          } else {
            this.cache.set(++clt, 'plain', 'clt');
          }
        });
    }

    // Prefetching means fetching all manifests without injecting
    if (this.config.cacheOnly) { return this.refresh(false); }
    // ...else restore or refresh the app (with injection of dependencies)
    else {
      // Either the configuration of non cached
      // manifests or requested bundle verification
      // forces a refresh or all manifests.
      return (
        this.config.cachedManifests === false ||
        this.config.verification === true
      ) ? this.refresh() : this.restore()
        .then(injectedFromCache => {
          let {
            refreshDelay = 5000
          } = this.config;

          return new Promise((resolve, reject) => {
            window.setTimeout(() => {
              this.refresh(injectedFromCache)
                .then(resolve, reject);
            }, refreshDelay );
          });
        }).catch(() => {
          this.log.info('No manifests in cache, refreshing via network.');

          return this.refresh();
        });
    }
  }
}
