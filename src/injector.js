import {Css, Js} from './dom';
import Ajax from './ajax';
import Log from './log';
import getUrlParam from './url';

export class Manifest {
  constructor(url, config) {
    const { enableLogging = false } = config;

    this.log = new Log(
      getUrlParam('dactylographsy-enableLogging', enableLogging)
    );

    this.url = url;
  }

  get() {
    return new Ajax()
      .get(this.url)
      .then(response => {
        let {
          text: responseText,
          url: responseUrl
        } = response;

        this.log.info(`Fetched manifest from url: ${responseUrl}.`);

        return JSON.parse(responseText);
      }, xhr => {
        this.log.error(`Could not fetch manifest with url: ${xhr.responseURL}!`);
      });
  }
}

export default class Injector {
  constructor(injectInto, manifests, options = {}) {
    const {
      enableLogging = false
    } = options;

    this.log = new Log(
      getUrlParam('dactylographsy-enableLogging', enableLogging)
    );

    this.manifests = {};
    this.injectInto = injectInto;

    manifests.forEach(manifest => { this.manifests[manifest.package] = manifest; });

    this.options = options;
    this.prefix = options.prefix;
    this.order = options.order;
  }

  inject() {
    const
      flatten = list => list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
      );

    return Promise.all(
      this.order.map(_package => {
        if (!this.manifests[_package]) {
          this.log.error(`Couldn\'t find package ${_package} from injection order.`);

          return Promise.reject();
        } else {
          return this.injectManifest(this.manifests[_package]);
        }
      })
    ).then(manifests => {
      const dependencies = flatten(manifests);

      this.injectIntoDOM(dependencies);

      return Promise.resolve(dependencies);
    });
  }

  injectManifest(manifest) {
    let
      hashes = Object.keys(manifest.hashes);

    return Promise.all(hashes.map(hash => {
      let
        dependency = manifest.hashes[hash],
        rootUrl;

      rootUrl = [manifest.rootUrl, manifest.packageUrl].filter(_url => {
        return (
          _url !== undefined &&
          _url !== null
        );
      }).join('/');

      return this.injectDependency(
        dependency,
        rootUrl
      );
    }));
  }

  injectDependency(dependency, rootUrl) {
    switch (dependency.extension) {
      case '.css':
        return new Css(
          this.options
        ).tags(
          this.urls(dependency, rootUrl)
        );
      case '.js':
        return new Js(
          this.options
        ).tags(
          this.urls(dependency, rootUrl)
        );
      default:
        Promise.resolve(false);
    }
  }

  injectIntoDOM(dependencies, idx = 0, type = null) {
    const inject = (elem, type) => {
      if (this.injectInto) {
        this.log.info(`Injecting ${type} tag`, elem);

        this.injectInto.appendChild(elem);
      }
    };

    const next = (dependencies, idx) => {
      this.injectIntoDOM(dependencies, ++idx);
    };

    const fallback = (dependencies, idx, type) => {
      if (type !== 'raw') {
          this.injectIntoDOM(dependencies, idx, 'raw');
      } else {
        this.injectIntoDOM(dependencies, ++idx);

        this.log.error('Failed loading dependency as raw', elem);
      }
    };

    if (idx >= dependencies.length) { return; }

    // inject order: explicitly provided < cached in local storage < printed
    // raw only as fallback if printed fails
    type = (dependencies[idx][type] && type) || (dependencies[idx]['cached'] && 'cached') || (dependencies[idx]['printed'] && 'printed');
    const elem = dependencies[idx][type];

    if (elem === undefined) { return; }
    else if (type === 'printed') {
      if (elem instanceof HTMLLinkElement) {
        let request = new Ajax().get(elem.href);

        request
          .then(() => {
            inject(elem, type);
            next(dependencies, idx);
          })
          .catch(() => {
            fallback(dependencies, idx, type);
          });

      } else {
        inject(elem, type);

        elem.addEventListener('load', () => {
          next(dependencies, idx);
        });

        // fallback in case printed tag cannot be loaded
        elem.addEventListener('error', () => {
          fallback(dependencies, idx, type);
        });

      }

    } else if (type === 'cached' || type === 'raw') {
      inject(elem, type);
      next(dependencies, idx);

    }

  };

  basename(path) {
    return path.replace(/.*\/|\.[^.]*$/g, '');
  }

  urls(dependency, rootUrl = '') {
    let
      basename = this.basename(dependency.file),
      url;

    // Filter out potential null values
    // passed in as various parts of an url.
    url = [this.prefix, rootUrl, dependency.path].filter(_url => {
      return (
        _url !== undefined &&
        _url !== null
      );
    }).join('/');

    return {
      id: dependency.id,
      printed: `/${url}/${basename}-${dependency.hash}${dependency.extension}`,
      raw: `/${url}/${basename}${dependency.extension}`,
      singularBy: `/${url}/${basename}${dependency.extension}`
    };
  }
}
