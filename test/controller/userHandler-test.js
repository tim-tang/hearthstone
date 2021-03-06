/**
 * User handler integration test cases.
 *
 * @author tim.tang
 */

var should = require('should'),
    testHelper = require('../common/testHelper'),
    hsHelper = require('../../common/hearthstoneHelper'),
    mongoose = require('mongoose'),
    cardId = mongoose.Types.ObjectId(),
    randomName = hsHelper.randomString(8),
    randomEmail = randomName + '@gmail.com',
    logonUser,
    app;


describe('User APIs', function() {

    before(function(done) {
        app = require('../../server/restfulServer');
        done();
    });

    it('GET /health should return 200', function(done) {
        var options = testHelper.options(null, 'GET', '/health');
        testHelper.doRequest(options, null, function(reply) {
            reply.should.be.ok;
            done();
        });
    });


    it('POST /user/signup should return 200', function(done) {
        var payload = {
            name: randomName,
            pass: '345',
            email: randomEmail,
            avatar: '',
            deviceToken: 'abc123'
        };
        var options = testHelper.options(null, 'POST', '/user/signup');
        testHelper.doRequest(options, payload, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });

    it('POST /user/login should return 200', function(done) {
        var options = testHelper.options(null, 'POST', '/user/login');
        var payload = {
            name: randomName,
            pass: '345'
        };
        testHelper.doRequest(options, payload, function(reply) {
            var result = JSON.parse(reply);
            logonUser = result.user;
            result.should.have.property('success', true);
            done();
        });
    });

    it('GET /user/info/:userId should return 200', function(done) {
        var options = testHelper.options(logonUser, 'GET', '/user/info/'+logonUser._id);
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            result.user.should.have.property('deviceToken', 'abc123');
            done();
        });
    });

    it('PUT /user/update should return 200', function(done){
        var options = testHelper.options(logonUser, 'PUT', '/user/update');
        var payload = {
            userId: logonUser._id,
            name: randomName,
            email: randomEmail
        };
        testHelper.doRequest(options, payload, function(reply){
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });

    it('GET /user/:userId/card/:cardId should return 200', function(done){
        var options = testHelper.options(logonUser, 'GET', '/user/'+logonUser._id+'/card/'+cardId);
        testHelper.doRequest(options, null, function(reply){
            var result = JSON.parse(reply);
            result.should.have.property('success',true);
            done();
        });
    });

    it('GET /user/favorite/:userId should return 200', function(done){
        var options = testHelper.options(logonUser, 'GET', '/user/favorite/'+logonUser._id);
        testHelper.doRequest(options, null, function(reply){
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            //TODO:
            result.cards.should.have.length(0);
            done();
        });
    });

    it('GET /user/logout should resturn 200', function(done) {
        var options = testHelper.options(null, 'GET', '/user/logout');
        testHelper.doRequest(options, null, function(reply) {
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });
});
