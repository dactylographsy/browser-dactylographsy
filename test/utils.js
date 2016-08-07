export class DOMUtil {
  constructor() {
  }

  findJsByDataUrl(url) {
    return document.querySelectorAll(`script[data-dactylographsy-url="${url}"]`);
  }

  findCssByDataUrl(url) {
    let nodes = [];
    let styles = document.querySelectorAll(`style[data-dactylographsy-url="${url}"]`);
    let links = document.querySelectorAll(`link[data-dactylographsy-url="${url}"]`)

    for (var i = 0; i < styles.length; i++) {
      nodes.push(styles[i]);
    }

    for (var i = 0; i < links.length; i++) {
      nodes.push(links[i]);
    }

    return nodes;
  }

  findAllCss() {
    let nodes = [];
    let styles = document.querySelectorAll(`style[data-dactylographsy-url]`);
    let links = document.querySelectorAll(`link[data-dactylographsy-url]`)

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
    let nodes = [];
    let scripts = this.findAllJs();
    let styles = this.findAllCss();

    for (var i = 0; i < styles.length; i++) {
      let style = styles[i];

      style.parentNode.removeChild(style);
    }

    for (var i = 0; i < scripts.length; i++) {
      let script = scripts[i];

      script.parentNode.removeChild(script);
    }
  }
}
