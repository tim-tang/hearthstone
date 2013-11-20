/**
 * Card model.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CardSchema = new Schema({

    card_id: {
        type: ObjectId,
        index: true
    },
    title: {
        type: String
    },
    image_url: {
        type: String
    },
    content: {
        type: String
    },
    abilities: {
        type: String
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
    version: {
        type: Number
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Card', CardSchema);
