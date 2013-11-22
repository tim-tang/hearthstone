// Manage version service.
// --------------

var model = require('../model'),
    Version = model.Version,
    _ = require('underscore');

var VersionService = function VersionService() {};

_.extend(VersionService.prototype, {

    // Check is there new version exists.
    checkSynchronizable: function(vnumber, callback) {
        Version.find({
            version_no: {
                $gt: vnumber
            }
        }, callback);
    },

    // Update version by version no.
    updateVersionByNo: function(cardIds, callback) {
        Version.findOne({}, {}, {
            sort: {
                'update_at': -1
            }
        }, function(err, rversion) {
            if (err) {
                return callback(err);
            }
            var version = new Version();
            version.card_ids = [];
            if (rversion) {
                version.version_no = rversion.version_no + 1;
            }
            _.each(cardIds, function(cardId) {
                version.card_ids.push(cardId);
            });
            version.save(callback);
        });
    }
});


var versionService = new VersionService();

/** public version service module **/
module.exports = versionService;
