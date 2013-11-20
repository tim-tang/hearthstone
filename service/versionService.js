/**
 * Manage version service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Version = model.Version,
    _ = require('underscore');

var VersionService = function VersionService() {};

_.extend(VersionService.prototype, {

    checkSynchronizable: function(vnumber, callback) {
        Version.find({
            version_no: {
                $gt: vnumber
            }
        }, callback);
    },

    updateVersionByNo: function(vnumber, callback) {
        Version.find({
            version_no: {
                $gt: vnumber
            }
        }, function(err, versions) {
            if (err) {
                return callback(err);
            }
            var version;
            if (!versions || _.isEmpty(versions)) {
                version = new Version();
                version.version_no = vnumber;
            } else {
                version = versions[0];
                version.version_no++;
            }
            Version.save(version);
        });
    }

});


var versionService = new VersionService();

/** public version service module **/
module.exports = versionService;
