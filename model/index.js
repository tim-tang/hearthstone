var mongoose = require('mongoose'),
    config = require('../conf/hearthstone-conf').config,
    mongoUrl = process.env.MONGOHQ_URL || config.mongo;

mongoose.connect(mongoUrl, function (err) {
    if (err) {
        console.error('[Mongodb] - connect to %s error: %s', mongoUrl, err.message);
        process.exit(1);
    }
});


require('./user');
exports.User = mongoose.model('User');
