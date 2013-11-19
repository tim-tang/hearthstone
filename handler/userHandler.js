/**
 * Handle user api invoke.
 *
 * @author tim.tang
 *
 * TODO:
 * - defence check request params.
 * - how to build error response?
 */

var constants = require('../common/constants'),
    _ = require('underscore'),
    sanitize = require('validator').sanitize,
    userService = require('../service').UserService;

var UserHandler = function UserHandler() {
        console.log('User Handler initialized.');
    };


_.extend(UserHandler.prototype, {

    health: function(req, res) {
        res.send('I am alive!');
    },

    //TODO
    //- crypt password.
    //- check user name existence.
    signup: function(req, res, next) {
        var name = sanitize(req.body.name).trim();
        var pass = sanitize(req.body.pass).trim();
        var email = sanitize(req.body.email).trim();
        email = email.toLowerCase();
        var avatar = sanitize(req.body.avart).trim();
        var deviceToken = sanitize(req.body.deviceToken).trim();

        userService.save(name, pass, email, avatar, deviceToken, function(err) {
            if (err) {
                console.log('Save user failure.');
                return next(err);
            }
            res.send('Create user success!');
        });
    },

    //TODO: authenticate user.
    login: function(req, res, next) {
        var name = sanitize(req.body.name).trim().toLowerCase();
        var pass = sanitize(req.body.pass).trim();
        userService.getUserByName(name, function(err, user) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    },

    //TODO: check session existence.
    showinfo: function(req, res, next) {
        var name = req.params['name'];
        name = sanitize(name).trim();
        userService.getUserByName(name, function(err, user) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    }
});

var userHandler = new UserHandler();
module.exports = userHandler;
