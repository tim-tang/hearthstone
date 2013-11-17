/**
 * Class for user mangement service.
 *
 * @author tim.tang
 */

var riak = require('../support/riakManager').riakClient,
    constants = require('../common/constants'),
    _ = require('underscore');

var UserService = function UserService(){};

_.extend(UserService.prototype, {

    save: function(key, user,onResult){
        riak.save(constants.HS_USER_BUCKET, key, user);
        onResult(true);
    }
});


var userService = new UserService();

module.exports = userService;
