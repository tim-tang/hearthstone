/**
 * Manage card versions.
 *
 * @author tim.tang
 */

// Model for version.
// --------------

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Version to control cards sync and import.
var VersionSchema = new Schema({

    version_no: {
        type: Number,
        default: 0
    },
    card_ids: [{
        card_id: ObjectId
    }],
    update_at: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Version', VersionSchema);
