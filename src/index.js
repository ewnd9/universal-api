var Promise = require('bluebird');

var request = require('superagent');
var isNode = require('detect-node');

export default function(baseUrl, options) {
  options = options || {};

  var verbose = options.verbose;
  var api = {};

  api.transformRequest = (method, params, isNode) => params;
  api.transformResponse = (res, resolve, reject) => resolve(res);

  api.jsonp = options.jsonp || false;

  if (!isNode && api.jsonp) {
    require('superagent-jsonp')(request);
  }

  api.apiRequest = function(method, params, libParams) {
    libParams = libParams || {};

    return new Promise(function(resolve, reject) {
      var url = baseUrl + method;

      if (verbose) {
        console.log(url);
      }

      var req = request.get(url);

      if (options.transformRequest && libParams.transformRequest !== false) {
        req = req.query(options.transformRequest(method, params || {}, isNode));
      } else {
        req = req.query(api.transformRequest(method, params || {}, isNode));
      }

      if (!isNode && api.jsonp) {
        req = req.jsonp();
      }

      req.end(function(err, res) {
        if (err) {
          reject(err);
        } else {
          if (options.transformResponse && libParams.transformResponse !== false) {
            options.transformResponse(res, resolve, reject);
          } else {
            api.transformResponse(res, resolve, reject);
          }
        }
      });
    });
  };

  return api;
};
