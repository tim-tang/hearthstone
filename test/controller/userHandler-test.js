/**
 * User handler integration test cases.
 *
 * @author tim.tang
 */

var should = require('should'),
    testHelper = require('../helper/testHelper');


describe('User API', function() {

    before(function(done){
        require('../../hearthstone');
        done();
    });

    it('POST /user/:deviceToken should return 200', function(done) {
        var options = testHelper.options('/user/123');
        var payload = {
            username: 'tim.tang',
            email: 'tang.jilong@gmail.com',
            password: 'pass'
        };
        testHelper.doRequest(options, payload, function(reply){
            reply.should.be.ok;
            done();
        });
    });
});
