var exports = module.exports = {};
var http = require('http');

var CONSUL_HOSTS = 'consul.svc.b71934f2-d224-cd47-fd4b-ef25fd4ee85f.us-east-1.triton.zone'; //'consul'; // '72.2.114.55';

// query Consul for the upstream services
exports.getUpstreams = function(service, callback) {
  http.get({
    host: CONSUL_HOSTS,
    port: 8500,
    path: '/v1/catalog/service/' + service
  }, function(response) {
    var body = '';
    response.on('data', function(d) { body += d; });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      hosts = []
      for (var i = 0; i < parsed.length; i++) {
        hosts.push({address: parsed[i].ServiceAddress,
                    port: parsed[i].ServicePort});
      }
      callback(hosts);
    });
  });
}
