/**
 * Testing helper for integration tests.
 *
 * @author tim.tang
 */
var _ = require('underscore'),
    hsHelper = require('../../common/hearthstoneHelper'),
    config = require('../../conf/hearthstone-conf').config,
    http = require('http');

var TestHelper = function() {};

_.extend(TestHelper.prototype, {

    /**
     * Fetch http options.
     */
    options: function(user, method, url) {
        var authToken = '';
        if (user) {
            authToken = hsHelper.genAuthToken(user);
        }
        var cookie = config.auth_cookie_name + '=' + authToken;
        var options = {
            hostname: config.DEV_HEARTHSTONE_HOST,
            port: config.DEV_HEARTHSTONE_PORT,
            path: url,
            method: method,
            headers: {
                'Cookie': cookie,
                'Content-Type': config.CONTENT_TYPE,
                'Accept': config.CONTENT_TYPE
            }
        };
        return options;
    },

    /**
     * Do http request.
     *
     * @param {JSON} options
     * @param {JSON} http request pay load.
     * @param {Function} on result callback.
     */
    doRequest: function(options, payload, onResult) {
        var req = http.request(options, function(res) {
            var output = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                output += chunk;
            });

            res.on('end', function() {
                onResult(output);
            });
        });

        req.on('error', function(err) {
            console.log('Got error while do request::%s', err);
        });

        if (!_.isNull(payload)) {
            req.write(JSON.stringify(payload));
        }
        req.end();
    }
});

var testHelper = new TestHelper();

/* Public Spec Helper APIs*/
module.exports = testHelper;
