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
        Card.save(card, callback);
    }
});

var cardService = new CardService();

/** public card service module **/
module.exports = cardService;
