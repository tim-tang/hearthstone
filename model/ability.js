/**
 * Ability model.
 *
 * @author tim.tang
 */

// Model for Ability.
// --------------

"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AbilitySchema = new Schema({

    name: {
        type: String,
        unique: true
    }
});

mongoose.model('Ability', AbilitySchema);
