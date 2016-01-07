const
  getParams = function(url) {
    const
      query = url,
      regex = /[?&;](.+?)=([^&;]+)/g;
    let
      params,
      match;

    params = {};

    if (query) {
      while (match = regex.exec(query)) {
        params[match[1]] = decodeURIComponent(match[2]);
      }
    }

    return params;
  };

export default function getUrlParam(param, ifUnset = null, url = window.location.search) {
  const
    params = getParams(url);

  return params.hasOwnProperty(param) ? params[param] : ifUnset;
};
