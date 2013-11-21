/**
 * Card manage service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Card = model.Card,
    Ability = model.Ability,
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

    saveOrUpdateCard: function(jcard, callback) {
        Card.findOne({
            title: jcard.title
        }, function(err, card) {
            if (err) {
                return callback(err);
            }
            if (!card) {
                card = new Card();
                card.abilities = [];
            } else {
                card.version++;
            }
            card.title = jcard.title;
            card.category = jcard.category;
            card.image_url = jcard.image_url;
            card.content = jcard.content;
            card.abilities = [];
            _.each(jcard.abilities, function(jability){
               var ability = new Ability();
               ability.name =jability.name;
               card.abilities.push(ability);
            });
            card.attack = jcard.attack;
            card.health_power = jcard.health_power;
            card.cost = jcard.cost;
            card.rare = jcard.rare;
            card.occupation = jcard.occupation;
            card.race = jcard.race;
            card.evaluation = jcard.evaluation;
            card.save(callback(err, card));
        });
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
