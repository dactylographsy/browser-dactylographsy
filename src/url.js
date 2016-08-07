const getParams = function(url) {
    const query = url;
    const regex = /[?&;](.+?)=([^&;]+)/g;
    let params;
    let match;

    params = {};

    if (query) {
      while (match = regex.exec(query)) {
        params[match[1]] = decodeURIComponent(match[2]);
      }
    }

    return params;
  };

export default function getUrlParam(param, ifUnset = null, url = window.location.search) {
  const params = getParams(url);

  if (params.hasOwnProperty(param)) {
    try {
      return JSON.parse(params[param]);
    } catch (e) {
      return encodeURIComponent(params[param]);
    }
  } else {
    return ifUnset
  }
};
