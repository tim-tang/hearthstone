/**
 * Card handler for rest api.
 *
 * @author tim.tang
 */

var cardService = require('../service').CardService,
    versionService = require('../service').VersionService,
    sanitize = require('validator').sanitize,
    check = require('validator').check,
    _ = require('underscore');

var CardHandler = function CardHandler(){};


_.extend(CardHandler.prototype, {

    syncCards: function(req, res, next) {
        var vnumber = sanitize(req.params['version']).trim();
        try {
            check(vnumber, 'Version param must be a number!').isInt();
        } catch (e) {
            return res.send({
                success: false,
                msg: e.message
            });
        }
        versionService.checkSychronizable(vnumber, function(err, versions) {
            if (err) {
                return next(err);
            }

            if (!versions || _.isEmpty(versions)) {
                return res.send({
                    success: true,
                    msg: 'No new card found!'
                });
            }

            cardService.getCardsByVersion(vnumber, function(err, cards) {
                res.send({
                    success: true,
                    cards: cards
                });
            });
        });
    }
});

var cardHandler = new CardHandler();
module.exports = cardHandler;
