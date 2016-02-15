var should = require('should');

var simple_recaptcha = require('../index');

describe('simple_recaptcha', function() {

  it('should return an error when private key is empty', function() {
    simple_recaptcha(null, '127.0.0.1', 'someResponse', function(err) {
      err.message.should.equal('Private key is required');
    });
  });

  it('should return an error when response is empty', function() {
    simple_recaptcha('privKey', '127.0.0.1', null, function(err) {
      err.message.should.equal('Response is required');
    });
  });

  it('should return an error when private key is wrong', function() {
    simple_recaptcha('privKey', '127.0.0.1', 'someResponse', function(err) {
      err.message.should.equal('invalid-site-private-key');
    });
  });

  it('should not return an error when ip is not provided', function(){
    simple_recaptcha('privKey', 'someResponse', function(err) {
      err.message.should.equal(null);
    });
  });

});
