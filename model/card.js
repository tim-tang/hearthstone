/**
 * Card model.
 *
 * @author tim.tang
 */

// Model for Card.
// --------------

"use strict";
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    var Ability = require('./index').Ability;

    var cardSchema = new Schema({

        card_name: {
            type: String,
            unique: true
        },
        card_type: {
            type: String
        },
        occupation: {
            type: String
        },
        rarity: {
            type: String
        },
        race: {
            type: String
        },
        cost: {
            type: Number
        },
        attack: {
            type: Number
        },
        health_power: {
            type: Number
        },
        content: {
            type: String
        },
        abilities: {
            type: String
        },
        artist_name: {
            type: String
        },
        flavor_text: {
            type: String
        },
        big_icon: {
            type: String
        },
        small_icon: {
            type: String
        },
        premium_icon: {
            type: String
        },
        evaluation: {
            type: String
        },
        is_active: {
            type: Boolean,
            default: true
        },
        version: {
            type: Number,
            default: 0
        },
        update_at: {
            type: Date,
            default: Date.now
        }
    });
    return cardSchema;
};
