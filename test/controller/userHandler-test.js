/**
 * User handler integration test cases.
 *
 * @author tim.tang
 */

var should = require('should'),
    testHelper = require('../helper/testHelper'),
    hsHelper = require('../../common/hearthstoneHelper'),
    randomName = hsHelper.randomString(8),
    randomEmail = randomName + '@gmail.com',
    app;


describe('User API', function() {

    before(function(done) {
        app = require('../../server/restfulServer');
        done();
    });

    // after(function() {
    //     app.shutdown();
    // });
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
            name: randomName,
            pass: '345',
            email: randomEmail,
            avatar: '',
            deviceToken: 'abc123'
        };
        testHelper.doRequest(options, payload, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });

    it('POST /user/login should return 200', function(done) {
        var options = testHelper.options('POST', '/user/login');
        var payload = {
            name: randomName,
            pass: '345'
        };
        testHelper.doRequest(options, payload, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('deviceToken', 'abc123');
            done();
        });
    });

    it('GET /user/:name should return 200', function(done) {
        var options = testHelper.options('GET', '/user/info/'+randomName);
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('deviceToken', 'abc123');
            done();
        });
    });

    it('GET /user/logout should resturn 200', function(done) {
        var options = testHelper.options('GET', '/user/logout');
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });
});
