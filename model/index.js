var mongoose = require('mongoose'),
    config = require('../conf/hearthstone-conf').config;

mongoose.connect(config.mongo, function (err) {
    if (err) {
        console.error('[Mongodb] - connect to %s error: %s', config.db, err.message);
        process.exit(1);
    }
});


require('./user');
exports.User = mongoose.model('User');
