/**
 * Card model.
 *
 * @author tim.tang
 */

// Model for Card.
// --------------
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    var Ability = require('./index').Ability;

    var cardSchema = new Schema({

        title: {
            type: String,
            unique: true
        },
        category: {
            type: String
        },
        image_url: {
            type: String
        },
        content: {
            type: String
        },
        abilities: {
            type: Array
        },
        attack: {
            type: Number
        },
        health_power: {
            type: Number
        },
        cost: {
            type: Number
        },
        rare: {
            type: String
        },
        occupation: {
            type: String
        },
        race: {
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
