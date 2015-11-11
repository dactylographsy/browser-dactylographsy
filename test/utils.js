export class DOMUtil {
  constructor() {
  }

  findJsByDataUrl(url) {
    return document.querySelectorAll(`script[data-dactylographsy-url="${url}"]`);
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
      nodes.push(styles[i]);
    }

    for (var i = 0; i < scripts.length; i++) {
      nodes.push(scripts[i]);
    }

    for (let node of nodes) {
      node.parentNode.removeChild(node);
    }
  }
}
