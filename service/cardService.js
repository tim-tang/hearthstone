/**
 * Card manage service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Card = model.Card,
    _ = require('underscore');

var CardService = function CardService() {};


_.extend(CardService.prototype, {

    getCardsByVersion: function(vnumber, callback) {
        Card.find({
            is_active: true,
            version: {
                $gt: vnumber
            }
        }, callback);
    },

    getCardById: function(id, callback) {
        Card.findOne({
            _id: id
        }, callback);
    },

    getCardsByIds: function(ids, callback) {
        Card.find({
            '_id': {
                '$in': ids
            }
        }, callback);
    },

    saveCard: function(card, callback) {
        card.save(callback);
    },

    inactiveCard: function(cardId, callback) {
        this.getCardById(cardId, function(err, card) {
            if (err) {
                return callback(err);
            }
            if (!card) {
                return callback(new Error('Card not exists!'));
            }
            card.is_active = false;
            card.save(callback);
        });
    }
});

var cardService = new CardService();

/** public card service module **/
module.exports = cardService;
