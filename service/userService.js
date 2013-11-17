/**
 * Class for user mangement service.
 *
 * @author tim.tang
 */

var riak = require('../support/riakManager').makeClient
    _ = require('underscore');

var UserService = function UserService(){};

_.extend(UserService.prototype, {

    saveUser: function(user, onResult){
        riak.save('user-bucket' user.key, user);
        onResult(true);
    }
});


var userService = new UserService();

module.exports = userService;
