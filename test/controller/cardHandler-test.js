/**
 * Card handler integration test case.
 *
 * @author tim.tang
 */


var should = require('should'),
    fs = require('fs'),
    path = require('path'),
    testHelper = require('../common/testHelper'),
    sampleCards;


describe('Card APIs', function() {

    before(function(done) {
        app = require('../../server/restfulServer');
        sampleCards = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../common/cards.json'), 'UTF-8'));
        done();
    });


    it('POST /card/import should return 200', function(done) {
        var options = testHelper.options(null, 'POST', '/card/import');
        testHelper.doRequest(options, sampleCards, function(reply) {
            var result = JSON.parse(reply);
            // Need admin logon which configured
            result.should.have.property('success', true);
            done();
        });
    });

    it('GET /card/sync/:version should return 200', function(done) {
        var options = testHelper.options(null, 'GET', '/card/sync/-1');
        testHelper.doRequest(options, null, function(reply) {
            console.log(reply)
            var result = JSON.parse(reply);
            result.should.have.property('success', true);
            result.cards.should.have.lengthOf(5);
            done();
        });
    });
});
