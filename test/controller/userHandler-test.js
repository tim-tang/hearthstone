/**
 * User handler integration test cases.
 *
 * @author tim.tang
 */

var should = require('should'),
    testHelper = require('../helper/testHelper');


describe('User API', function() {

    before(function(done) {
        require('../../hearthstone');
        done();
    });

    it('GET /health should return 200', function(done) {
        var options = testHelper.options('GET', '/health');
        testHelper.doRequest(options, null, function(reply) {
            reply.should.equal('I am alive, Ping success!');
            done();
        });
    });


    it('POST /user/:deviceToken should return 200', function(done) {
        var options = testHelper.options('POST', '/user/123');
        var payload = {
            username: 'tim.tang',
            email: '123456',
            password: 'pass'
        };
        testHelper.doRequest(options, payload, function(reply) {
            reply.should.be.ok;
            done();
        });
    });

    it('GET /user/:userKey should return 200', function(done) {
        var options = testHelper.options('GET', '/user/123456');
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('username', 'tim.tang');
            done();
        });
    });
});
