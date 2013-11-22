//     Hearthstone Server
//     http://timtang.me
//     (c) 2013 Tim Tang
//     Hearthstone may be freely distributed under the GPL v3 license.

// Indexing required models.
// --------------

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
require('./user');
require('./card');
require('./comment');
require('./version');
require('./ability');

exports.User = mongoose.model('User');
exports.Card = mongoose.model('Card');
exports.Comment = mongoose.model('Comment');
exports.Version = mongoose.model('Version');
exports.Ability= mongoose.model('Ability');
