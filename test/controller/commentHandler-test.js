/**
 * Comment handler integration test case.
 *
 * @author tim.tang
 */


var should = require('should'),
    mongoose = require('mongoose'),
    testHelper = require('../common/testHelper'),
    cardId = mongoose.Types.ObjectId(),
    userId = mongoose.Types.ObjectId(),
    comment;

describe('Comment APIs', function() {

    before(function(done) {
        app = require('../../server/restfulServer');
        done();
    });

    it('POST /comment/create should return 200', function(done) {
        var options = testHelper.options(null, 'POST', '/comment/create');
        var payload = {
            userId: userId,
            cardId: cardId,
            content: 'Testing post comment.'
        };

        testHelper.doRequest(options, payload, function(reply) {
            var result = JSON.parse(reply);
            comment = result.comment;
            result.should.have.property('success', true);
            done();
        });
    });

    it('GET /comment/show/:cardId should return 200', function(done) {
        var options = testHelper.options(null, 'GET', '/comment/show/'+ cardId);
        testHelper.doRequest(options, null, function(reply){
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            result.comments.should.have.lengthOf(1);
            done();
        });
    });

    it('GET /comment/:commentId/star/:star should return 200', function(done) {
        var options = testHelper.options(null, 'GET', '/comment/'+comment._id+'/star/5');
        testHelper.doRequest(options, null, function(reply){
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            done();
        });
    });
});
