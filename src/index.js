import Promise from 'bluebird';
import superagent from 'superagent';
import isNode from 'detect-node';

function UniversalApi({ baseUrl = '', jsonp = false, query, body, headers, transformResponse }) {
  this.baseUrl = baseUrl;
  this.jsonp = !!jsonp && !isNode;
  this.query = query;
  this.body = body;
  this.headers = headers;
  this.transformResponse = transformResponse;

  if (this.jsonp) {
    require('superagent-jsonp')(superagent);
  }
};

const fnOrObject = input => {
  if (typeof input === 'function') {
    return input();
  } else {
    return input || {};
  }
};

UniversalApi.prototype.request = function(method, url, query = {}, body = {}, headers = {}) {
  const result = new Promise((resolve, reject) => {
    const req = superagent(method, this.baseUrl + url);

    if (this.jsonp) {
      req.jsonp();
    }

    const requestQuery = {
      ...fnOrObject(this.query),
      ...query
    };

    req.query(requestQuery);

    if (method === 'POST' || method === 'PUT') {
      const requestBody = {
        ...fnOrObject(this.body),
        ...body
      };

      req.send(requestBody);
    }

    const requestHeaders = {
      ...fnOrObject(this.headers),
      ...headers
    };

    req.set(requestHeaders);

    req.end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body);
      }
    });
  });

  if (this.transformResponse) {
    return result.then(this.transformResponse);
  } else {
    return result;
  }
};

UniversalApi.prototype.get = function(url, query = {}, headers = {}) {
  return this.request('GET', url, query, null, headers);
};

UniversalApi.prototype.post = function(url, query = {}, body = {}, headers = {}) {
  return this.request('POST', url, query, body, headers);
};

UniversalApi.prototype.put = function(url, query = {}, body = {}, headers = {}) {
  return this.request('PUT', url, query, body, headers);
};

UniversalApi.prototype.delete = function(url, query = {}, headers = {}) {
  return this.request('DELETE', url, query, null, headers);
};

UniversalApi.prototype.head = function(url, query = {}, headers = {}) {
  return this.request('HEAD', url, query, null, headers);
};

export default UniversalApi;
