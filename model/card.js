/**
 * Card model.
 *
 * @author tim.tang
 */

// Model for Card.
// --------------

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Ability = require('./index').Ability,
    ObjectId = Schema.ObjectId;

var CardSchema = new Schema({

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
    abilities: [Ability],
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

mongoose.model('Card', CardSchema);
