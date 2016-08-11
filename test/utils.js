export class DOMUtil {
  constructor() {
  }

  findJsByDataUrl(url) {
    return document.querySelectorAll(`script[data-dactylographsy-url="${url}"]`);
  }

  eventuallyFindCssByDataUrl(url) {
    return new Promise((resolve, reject) => {
      let interval = window.setInterval(() => {
        let link = document.querySelectorAll(`link[data-dactylographsy-url="${url}"]`);

        if (link.length) {
          window.clearInterval(interval);
          resolve(link);
        }
      }, 50);

      window.setTimeout(() => {
        window.clearInterval(interval);
        reject();
      }, 2000);
    });
  }

  findCssByDataUrl(url) {
    let
      nodes = [],
      styles = document.querySelectorAll(`style[data-dactylographsy-url="${url}"]`),
      links = document.querySelectorAll(`link[data-dactylographsy-url="${url}"]`)

    for (var i = 0; i < styles.length; i++) {
      nodes.push(styles[i]);
    }

    for (var i = 0; i < links.length; i++) {
      nodes.push(links[i]);
    }

    return nodes;
  }

  injectTag(tag, intoNode) {
    if (!intoNode) { return; }

    intoNode.appendChild(tag);

    return tag;
  }

  findAllCss() {
    let
      nodes = [],
      styles = document.querySelectorAll(`style[data-dactylographsy-url]`),
      links = document.querySelectorAll(`link[data-dactylographsy-url]`)

    for (var i = 0; i < styles.length; i++) {
      nodes.push(styles[i]);
    }

    for (var i = 0; i < links.length; i++) {
      nodes.push(links[i]);
    }

    return nodes;
  }

  findAllJs() {
    return document.querySelectorAll(`script[data-dactylographsy-url]`);
  }

  removeAll() {
    let
      nodes = [],
      scripts = this.findAllJs(),
      styles = this.findAllCss();

    for (var i = 0; i < styles.length; i++) {
      let
        style = styles[i];

      style.parentNode.removeChild(style);
    }

    for (var i = 0; i < scripts.length; i++) {
      let
        script = scripts[i];

      script.parentNode.removeChild(script);
    }
  }
}
