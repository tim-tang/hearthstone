// Class for user mangement service.
// --------------

var model = require('../model'),
    User = model.User,
    _ = require('underscore');

var UserService = function UserService() {};

_.extend(UserService.prototype, {

    // Save one user.
    save: function(name, pass, email, avatar, deviceToken, callback) {
        var user = new User();
        user.name = name;
        user.pass = pass;
        user.email = email;
        user.avatar = avatar;
        user.deviceToken = deviceToken;
        user.save(callback);
    },

    // Update user.
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

    // Retrieve user by user id.
    getUserById: function(id, callback) {
        User.findOne({
            _id: id
        }, callback);
    },

    // Retrieve user by user name.
    getUserByName: function(name, callback) {
        User.findOne({
            name: name
        }, callback);
    },

    // Retrieve user by email.
    getUserByEmail: function(email, callback) {
        User.findOne({
            email: email
        }, callback);
    },

    // Favorite comment.
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
