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


    it('POST /user/signup should return 200', function(done) {
        var options = testHelper.options('POST', '/user/signup');
        var payload = {
            name: 'tim.tang',
            pass: '123456',
            email: 'tang.jilong2@gmail.com',
            avatar: 'http://www.timtang.me',
            deviceToken: 'abc123'
        };
        testHelper.doRequest(options, payload, function(reply) {
            reply.should.be.ok;
            done();
        });
    });

    it('GET /user/:name should return 200', function(done) {
        var options = testHelper.options('GET', '/user/tim.tang');
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('name', 'tim.tang');
            done();
        });
    });
});
