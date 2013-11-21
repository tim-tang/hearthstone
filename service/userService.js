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

    update: function(id, name, email, avatar, callback) {
        this.getUserById(id, function(err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(new Error('User not exists!'));
            }
            user.name = name;
            user.email = email;
            user.avatar = avatar;
            user.save(callback);
        });
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
    },

    favorite: function(userId, cardId, callback) {
        this.getUserById(userId, function(err, user) {
            if (err) {
                callback(err);
            }
            if (!user) {
                callback(new Error('User not exists!'));
            }
            user.favorites.push(cardId);
            user.save(callback);
        });
    }
});


var userService = new UserService();

/** public user service module **/
module.exports = userService;
