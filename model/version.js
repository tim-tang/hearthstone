/**
 * Manage card versions.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var VersionSchema = new Schema({

    version_no: {
        type: Number,
        unique: true
    }
});

mongoose.model('Version', VersionSchema);
