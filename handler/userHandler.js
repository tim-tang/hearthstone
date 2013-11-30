/**
 * Handle user api invoke.
 *
 * @author tim.tang
 */

// Hearthstone User Handler.
// --------------

"use strict";
var  _ = require('underscore'),
    sanitize = require('validator').sanitize,
    check = require('validator').check,
    hsHelper = require('../common/hearthstoneHelper'),
    config = require('../conf/hearthstone-conf').config,
    userService = require('../service').UserService,
    cardService = require('../service').CardService;

var UserHandler = function UserHandler() {};


_.extend(UserHandler.prototype, {

    // Do health check on Hearthstone server.
    health: function(req, res) {
        res.send(
            '   ___ ___          .__   .__            .__                            .__   .__                ._.\n' +
            '  /   |  \\   ____  |  |  |  |    ____   |__| _____     _____   _____   |  |  |__|___  __  ____  | |\n' +
            ' /    ~   \\_/ __ \\ |  |  |  |   /  _ \\  |  | \\__  \\   /     \\  \\__  \\  |  |  |  |\\  \\/ /_/ __ \\ | |\n' +
            ' \\    Y   /\\  ___/ |  |__|  |__(  <_> ) |  |  / __ \\_|  Y Y  \\  / __ \\_|  |__|  | \\   / \\  ___/  \\|\n' +
            '  \\___|_ /  \\___  >|____/|____/ \\____/  |__| (____  /|__|_|  / (____  /|____/|__|  \\_/   \\___  > __ \n'
        );
    },

    // Authenticate user logon or not/ is admin.
    authenticate: function(req, res, next) {
        var cookie = req.cookies[config.auth_cookie_name];
        if (_.isEmpty(cookie)) {
            return next();
        }
        var authToken = hsHelper.decrypt(cookie, config.session_secret);
        var auth = authToken.split('\t');
        var userId = auth[0];
        userService.getUserById(userId, function(err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
               if(config.admins[user.name]){
                    user.is_admin = true;
               }
                req.session.user = user;
                return next();
            }
        });
    },

    // Signup a user.
    signup: function(req, res, next) {
        var name = sanitize(req.body.name).trim();
        try {
            check(name, 'User name must be 0-9,a-z,A-Z').isAlphanumeric();
        } catch (e) {
            res.send({
                success: false,
                msg: e.message,
                name: name,
                email: email
            });
            return;
        }

        //check email exists or not.
        userService.getUserByName(name, function(err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                res.send({
                    success: false,
                    msg: 'User Name has been used.',
                    name: name,
                    email: email
                });
                return;
            }
        });

        var email = sanitize(req.body.email).trim();
        // Eamil can be empty.
        //try {
        //    check(email, 'Invalid email address.').isEmail();
        //} catch (e) {
        //    res.send({
        //        success: false,
        //        msg: e.message,
        //        name: name,
        //        email: email
        //    });
        //    return;
        //}
        //email = email.toLowerCase();


        var pass = sanitize(req.body.pass).trim();
        if (name === '' || pass === '' || email === '') {
            res.send({
                success: false,
                msg: 'Incomplete user info.',
                name: name,
                email: email
            });
            return;
        }

        pass = hsHelper.md5(pass);
        var avatar = sanitize(req.body.avatar).trim();
        if (_.isEmpty(avatar) && email) {
            // generate avatar url
            avatar = 'http://www.gravatar.com/avatar/' + hsHelper.md5(email.toLowerCase()) + '?size=48';
        }

        var deviceToken = sanitize(req.body.deviceToken).trim();
        userService.save(name, pass, email, avatar, deviceToken, function(err) {
            if (err) {
                return next(err);
            }
            res.send({
                success: true,
                msg: 'Signup sucess!'
            });
        });
    },

    // Handling user login operation.
    login: function(req, res, next) {
        var name = sanitize(req.body.name).trim();
        var pass = sanitize(req.body.pass).trim();
        if (_.isEmpty(name) || _.isEmpty(pass)) {
            return res.send({
                success: false,
                msg: 'Invalid username or password!',
                name: name,
                pass: pass
            });
        }

        userService.getUserByName(name, function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({
                    success: false,
                    msg: 'User not exists!',
                    name: name,
                    pass: pass
                });
            }
            pass = hsHelper.md5(pass);
            if (!_.isEqual(pass, user.pass)) {
                return res.send({
                    success: false,
                    msg: 'Bad password!',
                    name: name,
                    pass: pass
                });
            }
            hsHelper.popSession(user, res);
            res.send({
                success: true,
                user: user
            });
        });
    },

    logout: function(req, res, next) {
        req.session.destroy();
        hsHelper.clearCookie(res);
        res.send({
            success: true,
            msg: 'Logout success!'
        });
    },

    showinfo: function(req, res, next) {
        var userId = req.params['userId'];
        userId = sanitize(userId).trim();
        userService.getUserById(userId, function(err, user) {
            if (err) {
                return next(err);
            }
            res.send({
                success: true,
                user: user
            });
        });
    },

    // Handling update user.
    updateUser: function(req, res, next) {
        var userId = sanitize(req.body.userId).trim();
        var name = sanitize(req.body.name).trim();
        var email = sanitize(req.body.email).trim();
        var avatar = sanitize(req.body.avatar).trim;
        userService.update(userId, name, email, avatar, function(err) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }

            res.send({
                success: true,
                msg: 'Update user success!'
            });
        });
    },

    // Favorite a card.
    favorite: function(req, res, next) {
        var cardId = sanitize(req.params.cardId).trim();
        var userId = sanitize(req.params.userId).trim();
        userService.favorite(userId, cardId, function(err) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }
            res.send({
                success: true,
                msg: 'Favorite card success!'
            });
        });
    },

    // Retrieve user favorite cards.
    showFavorites: function(req, res, next) {
        var userId = sanitize(req.params['userId']).trim();
        userService.getUserById(userId, function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({
                    success: false,
                    msg: 'User not exists!'
                });
            }
            cardService.getCardsByIds(user.favorites, function(err, cards) {
                if (err) {
                    return next(err);
                }
                res.send({
                    success: true,
                    cards: cards
                });
            });
        });
    }
});

var userHandler = new UserHandler();
module.exports = userHandler;
