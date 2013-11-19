/**
 * Class for user mangement service.
 *
 * @author tim.tang
 */
var model = require('../model'),
    User = model.User,
    constants = require('../common/constants'),
    _ = require('underscore');

var UserService = function UserService() {};

_.extend(UserService.prototype, {

    save: function(name, pass, email, avatar, deviceToken, callback) {
        var user = new User();
        user.name = name;
        user.pass = pass;
        user.email = email;
        user.avatar = avatar;
        user.deviceToken = deviceToken;
        user.save(callback);
    },

    getUserById: function(id, callback) {
        User.findOne({
            _id: id
        }, callback);
    },

    getUserByName: function(name, callback) {
        User.findOne({
            name: name
        }, callback);
    },

    getUserByEmail: function(email, callback) {
        User.findOne({
            email: email
        }, callback);
    }
});


var userService = new UserService();

/** public user service module **/
module.exports = userService;
