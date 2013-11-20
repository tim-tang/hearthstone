/**
 * Handle user api invoke.
 *
 * @author tim.tang
 */

var constants = require('../common/constants'),
    _ = require('underscore'),
    sanitize = require('validator').sanitize,
    check = require('validator').check,
    hsHelper = require('../common/hearthstoneHelper'),
    config = require('../conf/hearthstone-conf').config,
    userService = require('../service').UserService,
    cardService = require('../service').CardService;

var UserHandler = function UserHandler() {};


_.extend(UserHandler.prototype, {

    health: function(req, res) {
        res.send('I am alive!');
    },

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
                req.session.user = user;
                return next();
            }
        });
    },

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
        email = email.toLowerCase();
        try {
            check(email, 'Invalid email address.').isEmail();
        } catch (e) {
            res.send({
                success: false,
                msg: e.message,
                name: name,
                email: email
            });
            return;
        }


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
        if (_.isEmpty(avatar)) {
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
            //TODO:
            res.send(user);
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
        var name = req.params['name'];
        name = sanitize(name).trim();
        userService.getUserByName(name, function(err, user) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    },

    favorite: function(req, res, next) {
        var cardId = sanitize(req.body.cardId).trim();
        var userId = sanitize(req.body.userId).trim();
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

    showFavorites: function(req, res, next) {
        var userId = sanitize(req.param['userId']).trim();
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
