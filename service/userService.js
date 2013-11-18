/**
 * Class for user mangement service.
 *
 * @author tim.tang
 */

var riak = require('../support/riakManager').riakClient,
    constants = require('../common/constants'),
    _ = require('underscore');

var UserService = function UserService() {};

_.extend(UserService.prototype, {

    ping: function(onResult){
        riak.ping(function(){
            onResult('I am alive, Ping success!');
        });
    },

    save: function(key, user, onResult) {
        riak.save(constants.HS_USER_BUCKET, key, user);
        onResult(true);
    },

    get: function(key, onResult) {
        riak.get(constants.HS_USER_BUCKET, key, function(err, reply){
            //not handle meta data.
            onResult(err, reply);
        });
    },

    remove: function(key, onResult) {
        riak.remove(constants.HS_USER_BUCKET, key, function(err, reply, meta){
            onResult(err, reply);
        });
    }

});


var userService = new UserService();

/** public user service module **/
module.exports = userService;
