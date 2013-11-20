var mongoose = require('mongoose'),
    config = require('../conf/hearthstone-conf').config,
    mongoUrl = process.env.MONGOHQ_URL || config.mongo;

mongoose.connect(mongoUrl, function(err) {
    if (err) {
        console.error('[Mongodb] - connect to %s error: %s', mongoUrl, err.message);
        process.exit(1);
    }
});


require('./user');
require('./card');
require('./comment');
require('./version');

exports.User = mongoose.model('User');
exports.Card = mongoose.model('Card');
exports.Comment = mongoose.model('Comment');
exports.Version = mongoose.model('Version');
