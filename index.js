var https = require('https');

var options = {
  host: 'www.google.com',
  port: 443,
  path: '/recaptcha/api/siteverify?',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

module.exports = function(privateKey, remoteIP, response, cb) {
  if( arguments.length < 4 && typeof(response) === 'function') {
    cb = response;
    response = remoteIP;
    remoteIP = undefined;
  }

  var error = null;

  if (!privateKey) {
    error = 'Private key is required';
  } else if (!response) {
    error = 'Response is required';
  }

  if (error) {
    return cb(new Error(error));
  }

  options.path = '/recaptcha/api/siteverify?secret=' + privateKey + '&response=' + response;
  if (remoteIP) {
    options.path += '&remoteip=' + remoteIP;
  }

  var request = https.request(options, function(response) {
    var body = '';

    response.on('error', function(err) {
      return cb(new Error(err));
    });

    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      var data = JSON.parse( body );
      if (!data.success) return cb(new Error(data['error-codes']));
      cb(null);
    });

  });

  request.on('error', function(err) {
    return cb(new Error(err));
  });

  request.end();

};
