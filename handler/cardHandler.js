/**
 * Card handler for rest api.
 *
 * @author tim.tang
 */

// Hearthstone Card Handler.
// --------------

"use strict";

var cardService = require('../service').CardService,
    versionService = require('../service').VersionService,
    sanitize = require('validator').sanitize,
    check = require('validator').check,
    _ = require('underscore');

var CardHandler = function CardHandler() {};


_.extend(CardHandler.prototype, {

    // Synchronize cards with iOS app.
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
        // Check iOS latest or not.
        versionService.checkSynchronizable(vnumber, function(err, versions) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }

            if (!versions || _.isEmpty(versions)) {
                return res.send({
                    success: true,
                    msg: 'No new cards found!'
                });
            }
            var cardIds = [];
            _.each(versions, function(version) {
                cardIds = _.union(cardIds, version.card_ids);
            });
            // Retrieve latest cards and return to iOS app.
            cardService.getCardsByIds(cardIds, function(err, cards) {
                res.send({
                    success: true,
                    cards: cards
                });
            });
        });
    },

    // Batch import cards into Hearthstone server.
    importCards: function(req, res, next) {
        var cards = req.body.cards;
        if (!cards || _.isEmpty(cards)) {
            return res.send({
                success: false,
                msg: 'Invalid card JSON.'
            });
        }
        var cardIds = [];
        _.each(cards, function(card) {
            // Do save and update cards.
            cardService.saveOrUpdateCard(card, function(err, rcard) {
                if (err) {
                    return res.send({
                        success: false,
                        msg: 'Card title: ' + card.title + "import failure!"
                    });
                }
                cardIds.push(rcard._id);
                // need to refactor with event proxy handling async.
                if (_.size(cardIds) === _.size(cards)) {
                    versionService.updateVersionByNo(cardIds, function(err) {
                        if (err) {
                            return res.send({
                                success: false,
                                msg: err.message
                            });
                        }
                        res.send({
                            success: true,
                            msg: 'Import cards success!'
                        });
                    });
                }
            });
        });
    }
});

var cardHandler = new CardHandler();
module.exports = cardHandler;
