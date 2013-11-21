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
