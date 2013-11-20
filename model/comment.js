/**
 * Model for comments.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({

    user_id: {
        type: ObjectId,
        index: true
    },
    card_id: {
        type: ObjectId,
        index: true
    },
    star: {
        type: Number,
        default: 0
    },
    content: {
        type: String
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Comment', CommentSchema);
