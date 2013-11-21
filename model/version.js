/**
 * Manage card versions.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CardId = require('./index').CardId,
    ObjectId = Schema.ObjectId;

var VersionSchema = new Schema({

    version_no: {
        type: Number,
        default: 0
    },
    card_ids: [CardId],
    update_at: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Version', VersionSchema);
