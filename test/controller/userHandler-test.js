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
            reply.should.equal('I am alive!');
            done();
        });
    });

    it('POST /user/:deviceToken should return 200', function(done) {
        var options = testHelper.options('POST', '/user/123');
        var payload = {
            username: 'tim.tang',
            email: 'tang.jilong@gmail.com',
            password: 'pass'
        };
        testHelper.doRequest(options, payload, function(reply) {
            reply.should.be.ok;
            done();
        });
    });
});
