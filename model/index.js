//     Hearthstone Server
//     http://timtang.me
//     (c) 2013 Tim Tang
//     Hearthstone may be freely distributed under the GPL v3 license.

// Indexing required models.
// --------------

"use strict";
var mongoose = require('mongoose'),
    config = require('../conf/hearthstone-conf').config,
    mongoUrl = process.env.MONGOHQ_URL || config.mongo;

// Build monogdb connection by **Hearthstone-conf.js**.
mongoose.connect(mongoUrl, function(err) {
    if (err) {
        console.error('[Mongodb] - connect to %s error: %s', mongoUrl, err.message);
        process.exit(1);
    }
});

// Link all required mongoose models together.
var userSchema = require('./user');
var cardSchema = require('./card');
var commentSchema = require('./comment');
var versionScehma = require('./version');
require('./ability');

exports.User = mongoose.model('User',userSchema(mongoose));
exports.Card = mongoose.model('Card', cardSchema(mongoose));
exports.Comment = mongoose.model('Comment', commentSchema(mongoose));
exports.Version = mongoose.model('Version', versionScehma(mongoose));
exports.Ability= mongoose.model('Ability');
