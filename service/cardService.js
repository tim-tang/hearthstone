// Card manage service.
// --------------

"use strict";
var model = require('../model'),
    Card = model.Card,
    _ = require('underscore');

var CardService = function CardService() {};


_.extend(CardService.prototype, {

    // Retrieve all cards.
    getAllCards: function(callback){
        Card.find({},callback);
    },

    // Retrieve cards by version.
    getCardsByVersion: function(vnumber, callback) {
        Card.find({
            is_active: true,
            version: {
                $gt: vnumber
            }
        }, callback);
    },

    // Retrieve card by card id.
    getCardById: function(id, callback) {
        Card.findOne({
            _id: id
        }, callback);
    },

    // Retrieve cards by card ids.
    getCardsByIds: function(ids, callback) {
        Card.find({
            '_id': {
                '$in': ids
            }
        }, callback);
    },

    // Save or update card.
    saveOrUpdateCard: function(jcard, callback) {
        Card.findOne({
            card_name: jcard.card_name
        }, function(err, card) {
            if (err) {
                return callback(err);
            }
            if (!card) {
                card = new Card();
                //card.abilities = [];
            } else {
                card.version++;
            }
            card.card_name = jcard.card_name;
            card.card_type = jcard.card_type;
            card.occupation = jcard.occupation;
            card.rarity = jcard.rarity;
            card.race = jcard.race;
            card.cost = jcard.cost;
            card.attack = jcard.attack;
            card.health_power = jcard.health_power;
            card.content = jcard.content;
            card.abilities = jcard.abilities;
            card.artist_name = jcard.artist_name;
            card.flavor_text = jcard.flavor_text;
            card.big_icon = jcard.big_icon;
            card.small_icon = jcard.small_icon;
            card.premium_icon = jcard.premium_icon;
            card.evaluation = jcard.evaluation;
            card.save(callback(err, card));
        });
    },

    // Disable one card.
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
